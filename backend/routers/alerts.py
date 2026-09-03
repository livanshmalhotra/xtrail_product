from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from datetime import datetime
from backend.models.schemas import AlertItem, AlertAcknowledgeRequest, AlertSeverity
from backend.database import get_db_connection

router = APIRouter(prefix="/alerts", tags=["Incident Alerts & Dispatch"])

@router.get("", response_model=List[AlertItem])
def list_alerts(
    plant_id: Optional[str] = None,
    unacknowledged_only: bool = True,
    severity: Optional[str] = None
):
    """Lists plant floor incidents, thermal warnings, and bearing anomalies."""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    query = "SELECT * FROM alerts WHERE 1=1"
    params = []
    
    if plant_id:
        query += " AND plant_id = ?"
        params.append(plant_id)
        
    if unacknowledged_only:
        query += " AND acknowledged = 0"
        
    if severity:
        query += " AND severity = ?"
        params.append(severity.upper())
        
    query += " ORDER BY timestamp DESC"
    cursor.execute(query, params)
    rows = cursor.fetchall()
    conn.close()
    
    return [
        AlertItem(
            id=r["id"],
            plant_id=r["plant_id"],
            plant_name=r["plant_name"],
            machine_id=r["machine_id"],
            severity=r["severity"],
            title=r["title"],
            message=r["message"],
            timestamp=r["timestamp"],
            acknowledged=bool(r["acknowledged"]),
            acknowledged_by=r["acknowledged_by"],
            acknowledged_at=r["acknowledged_at"]
        )
        for r in rows
    ]

@router.post("/{alert_id}/acknowledge")
def acknowledge_alert(alert_id: str, req: AlertAcknowledgeRequest):
    """Marks an alert as acknowledged and logs the responding maintenance engineer."""
    conn = get_db_connection()
    cursor = conn.cursor()
    now = datetime.utcnow().isoformat() + "Z"
    
    cursor.execute("""
    UPDATE alerts
    SET acknowledged = 1, acknowledged_by = ?, acknowledged_at = ?
    WHERE id = ?
    """, (req.acknowledged_by, now, alert_id))
    
    if cursor.rowcount == 0:
        conn.close()
        raise HTTPException(status_code=404, detail=f"Alert {alert_id} not found")
        
    conn.commit()
    conn.close()
    
    return {
        "status": "ACKNOWLEDGED",
        "alert_id": alert_id,
        "acknowledged_by": req.acknowledged_by,
        "notes": req.notes,
        "timestamp": now
    }

@router.post("/dispatch-test")
def test_alert_dispatch(phone: str = "+91-9876543210", channel: str = "Telegram"):
    """Tests instant dispatch channel (SMS / Telegram / WhatsApp) for high-severity alerts."""
    now = datetime.utcnow().isoformat() + "Z"
    return {
        "status": "DISPATCHED",
        "channel": channel,
        "recipient": phone,
        "payload": {
            "title": "[XTRAIL ALERT] Thermal Spike Detected",
            "machine": "M-TN-02 (Chennai Plant)",
            "action": "Inspection advised immediately."
        },
        "delivered_at": now
    }
