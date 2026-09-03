from fastapi import APIRouter, HTTPException, Depends
from typing import List, Dict, Any
from datetime import datetime, timedelta
import random
from backend.models.schemas import (
    LiveAggregateMetrics, PlantSummary, MachineTelemetry, TelemetryIngest, MachineStatus
)
from backend.database import get_db_connection
from backend.services.simulator import simulator
from backend.services.analytics import compute_oee

router = APIRouter(prefix="/telemetry", tags=["Telemetry & Command Tower"])

@router.get("/live", response_model=LiveAggregateMetrics)
def get_live_telemetry():
    """Returns real-time aggregate plant metrics (OEE index, power savings, vibration RMS, active nodes)."""
    return simulator.get_live_metrics()

@router.get("/plants", response_model=List[PlantSummary])
def list_plants():
    """Lists manufacturing plants across Karnataka (KA), Tamil Nadu (TN), and Andhra Pradesh (AP)."""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM plants")
    plant_rows = cursor.fetchall()
    
    results = []
    for p in plant_rows:
        cursor.execute(
            "SELECT COUNT(*), AVG(oee), SUM(power_kw) FROM machines WHERE plant_id = ?",
            (p["plant_id"],)
        )
        stats = cursor.fetchone()
        
        cursor.execute(
            "SELECT COUNT(*) FROM alerts WHERE plant_id = ? AND acknowledged = 0",
            (p["plant_id"],)
        )
        alerts_count = cursor.fetchone()[0]
        
        results.append(PlantSummary(
            plant_id=p["plant_id"],
            plant_name=p["plant_name"],
            state=p["state"],
            city=p["city"],
            machine_count=p["machine_count"],
            active_machines=stats[0] or p["machine_count"],
            avg_oee=round(stats[1] or 88.5, 1),
            total_power_kw=round(stats[2] or 120.0, 1),
            alerts_count=alerts_count,
            status=p["status"]
        ))
    conn.close()
    return results

@router.get("/plants/{plant_id}/machines", response_model=List[MachineTelemetry])
def get_plant_machines(plant_id: str):
    """Retrieves all machines and their live telemetry for a given plant."""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM machines WHERE plant_id = ?", (plant_id,))
    rows = cursor.fetchall()
    conn.close()
    
    if not rows:
        raise HTTPException(status_code=404, detail=f"No machines found for plant {plant_id}")
        
    return [
        MachineTelemetry(
            machine_id=r["machine_id"],
            machine_name=r["machine_name"],
            plant_id=r["plant_id"],
            status=r["status"],
            oee=r["oee"],
            availability=r["availability"],
            performance=r["performance"],
            quality=r["quality"],
            vibration_g_rms=r["vibration_g_rms"],
            temperature_c=r["temperature_c"],
            power_kw=r["power_kw"],
            rpm=r["rpm"],
            cycle_time_sec=r["cycle_time_sec"],
            defect_count=r["defect_count"],
            timestamp=r["updated_at"]
        )
        for r in rows
    ]

@router.get("/machines/{machine_id}", response_model=MachineTelemetry)
def get_machine(machine_id: str):
    """Fetch real-time telemetry for a specific industrial machine."""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM machines WHERE machine_id = ?", (machine_id,))
    r = cursor.fetchone()
    conn.close()
    
    if not r:
        raise HTTPException(status_code=404, detail=f"Machine {machine_id} not found")
        
    return MachineTelemetry(
        machine_id=r["machine_id"],
        machine_name=r["machine_name"],
        plant_id=r["plant_id"],
        status=r["status"],
        oee=r["oee"],
        availability=r["availability"],
        performance=r["performance"],
        quality=r["quality"],
        vibration_g_rms=r["vibration_g_rms"],
        temperature_c=r["temperature_c"],
        power_kw=r["power_kw"],
        rpm=r["rpm"],
        cycle_time_sec=r["cycle_time_sec"],
        defect_count=r["defect_count"],
        timestamp=r["updated_at"]
    )

@router.get("/machines/{machine_id}/history")
def get_machine_history(machine_id: str, hours: int = 24):
    """Generates time-series historical data points for OEE, vibration, and temperature charts."""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM machines WHERE machine_id = ?", (machine_id,))
    m = cursor.fetchone()
    conn.close()
    
    if not m:
        raise HTTPException(status_code=404, detail=f"Machine {machine_id} not found")
        
    base_oee = m["oee"]
    base_temp = m["temperature_c"]
    base_vib = m["vibration_g_rms"]
    
    history = []
    now = datetime.utcnow()
    for i in range(hours, -1, -1):
        point_time = (now - timedelta(hours=i)).strftime("%H:%M")
        history.append({
            "time": point_time,
            "oee": round(base_oee + (random.random() * 4.0 - 2.0), 1),
            "temperature_c": round(base_temp + (random.random() * 3.0 - 1.5), 1),
            "vibration_rms": round(base_vib + (random.random() * 0.008 - 0.004), 3),
            "power_kw": round(m["power_kw"] + (random.random() * 2.0 - 1.0), 1)
        })
        
    return {
        "machine_id": machine_id,
        "plant_id": m["plant_id"],
        "data_points": len(history),
        "history": history
    }

@router.post("/ingest")
def ingest_machine_telemetry(payload: TelemetryIngest):
    """Ingest live telemetry from Edge IoT Gateway."""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    now = payload.timestamp or (datetime.utcnow().isoformat() + "Z")
    r = payload.readings
    
    oee = r.get("oee", 89.0)
    avail = r.get("availability", 94.0)
    perf = r.get("performance", 96.0)
    qual = r.get("quality", 99.0)
    vibration = r.get("vibration_g_rms", 0.040)
    temp = r.get("temperature_c", 65.0)
    power = r.get("power_kw", 22.0)
    rpm = r.get("rpm", 2500)
    cycle_time = r.get("cycle_time_sec", 42.0)
    status = r.get("status", "RUNNING")
    
    cursor.execute("""
    UPDATE machines SET 
        status = ?, oee = ?, availability = ?, performance = ?, quality = ?,
        vibration_g_rms = ?, temperature_c = ?, power_kw = ?, rpm = ?,
        cycle_time_sec = ?, updated_at = ?
    WHERE machine_id = ?
    """, (status, oee, avail, perf, qual, vibration, temp, power, rpm, cycle_time, now, payload.machine_id))
    
    if cursor.rowcount == 0:
        # Insert if newly discovered machine
        cursor.execute("""
        INSERT INTO machines (
            machine_id, machine_name, plant_id, status, oee, availability, performance, quality,
            vibration_g_rms, temperature_c, power_kw, rpm, cycle_time_sec, defect_count, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?)
        """, (
            payload.machine_id, f"Machine {payload.machine_id}", "KA-01", status,
            oee, avail, perf, qual, vibration, temp, power, rpm, cycle_time, now
        ))
        
    conn.commit()
    conn.close()
    
    return {"status": "INGESTED", "machine_id": payload.machine_id, "timestamp": now}
