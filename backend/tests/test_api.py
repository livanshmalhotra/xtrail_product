import pytest
from fastapi.testclient import TestClient
from backend.main import app
from backend.database import init_db

@pytest.fixture(scope="session", autouse=True)
def setup_database():
    init_db()

@pytest.fixture
def client():
    with TestClient(app) as c:
        yield c

def test_root_and_health(client):
    res = client.get("/")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "OPERATIONAL"
    assert "version" in data
    
    res_health = client.get("/healthz")
    assert res_health.status_code == 200
    assert res_health.json()["status"] == "HEALTHY"

def test_telemetry_endpoints(client):
    # Live telemetry
    res = client.get("/api/v1/telemetry/live")
    assert res.status_code == 200
    data = res.json()
    assert "oee_index" in data
    assert "power_savings_pct" in data
    assert "vibration_rms" in data
    
    # Plants list
    res = client.get("/api/v1/telemetry/plants")
    assert res.status_code == 200
    plants = res.json()
    assert len(plants) >= 3
    plant_ids = [p["plant_id"] for p in plants]
    assert "KA-01" in plant_ids
    assert "TN-01" in plant_ids
    assert "AP-01" in plant_ids
    
    # Machines for plant
    res = client.get("/api/v1/telemetry/plants/KA-01/machines")
    assert res.status_code == 200
    machines = res.json()
    assert len(machines) > 0
    assert machines[0]["plant_id"] == "KA-01"
    
    # Single machine
    machine_id = machines[0]["machine_id"]
    res = client.get(f"/api/v1/telemetry/machines/{machine_id}")
    assert res.status_code == 200
    assert res.json()["machine_id"] == machine_id
    
    # Machine history
    res = client.get(f"/api/v1/telemetry/machines/{machine_id}/history?hours=12")
    assert res.status_code == 200
    assert "history" in res.json()
    assert len(res.json()["history"]) == 13

def test_telemetry_ingest(client):
    payload = {
        "node_id": "NODE-8472",
        "machine_id": "M-KA-01",
        "readings": {
            "oee": 92.4,
            "availability": 96.0,
            "performance": 97.0,
            "quality": 99.2,
            "vibration_g_rms": 0.036,
            "temperature_c": 59.4,
            "power_kw": 19.2,
            "status": "RUNNING"
        }
    }
    res = client.post("/api/v1/telemetry/ingest", json=payload)
    assert res.status_code == 200
    assert res.json()["status"] == "INGESTED"

def test_edge_endpoints(client):
    # List nodes
    res = client.get("/api/v1/edge/nodes")
    assert res.status_code == 200
    nodes = res.json()
    assert len(nodes) >= 4
    
    # Heartbeat
    res = client.post("/api/v1/edge/heartbeat/NODE-8472?latency_ms=3.8")
    assert res.status_code == 200
    assert res.json()["status"] == "ACK"
    
    # Protocols
    res = client.get("/api/v1/edge/protocols")
    assert res.status_code == 200
    assert len(res.json()["protocols"]) >= 5

def test_predictive_ai(client):
    # Vision inspect
    inspect_payload = {
        "camera_id": "CAM-THERM-01",
        "machine_id": "M-TN-02",
        "inspection_type": "THERMAL_IR",
        "current_temp_c": 84.5,
        "ambient_temp_c": 30.0
    }
    res = client.post("/api/v1/predictive/vision/inspect", json=inspect_payload)
    assert res.status_code == 200
    data = res.json()
    assert data["anomaly_detected"] is True
    assert data["severity"] == "CRITICAL"
    
    # Bearing analysis
    bearing_payload = {
        "machine_id": "M-KA-01",
        "vibration_samples": [0.038, 0.040, 0.042, 0.041],
        "operating_hours": 4200.0
    }
    res = client.post("/api/v1/predictive/bearing-analysis", json=bearing_payload)
    assert res.status_code == 200
    b_data = res.json()
    assert "failure_probability_72h" in b_data
    assert "bearing_health_index" in b_data
    assert b_data["status"] == "NORMAL"
    
    # Model info
    res = client.get("/api/v1/predictive/model-info")
    assert res.status_code == 200
    assert "Xtrail" in res.json()["model_name"]

def test_poka_yoke(client):
    # List stations
    res = client.get("/api/v1/poka-yoke/stations")
    assert res.status_code == 200
    stations = res.json()
    assert len(stations) >= 3
    
    station_id = stations[0]["station_id"]
    
    # Trigger interlock
    trigger_payload = {
        "station_id": station_id,
        "reason": "Missing retaining clip detected by laser profile sensor",
        "defect_code": "ERR-CLIP-402",
        "operator_id": "OP-721"
    }
    res = client.post("/api/v1/poka-yoke/trigger-interlock", json=trigger_payload)
    assert res.status_code == 200
    assert res.json()["interlock_state"] == "INTERLOCKED"
    
    # Reset interlock
    reset_payload = {
        "station_id": station_id,
        "operator_id": "OP-721",
        "supervisor_pin": "9942",
        "resolution_notes": "Clip placed correctly. Part inspected and cleared."
    }
    res = client.post("/api/v1/poka-yoke/reset", json=reset_payload)
    assert res.status_code == 200
    assert res.json()["status"] == "ARMED"

def test_roi_calculator(client):
    payload = {
        "plant_name": "Bengaluru Automotive Tech",
        "sector": "Automotive Component Manufacturing",
        "machine_count": 25,
        "avg_machine_age_years": 22.0,
        "current_oee_pct": 72.0,
        "downtime_hours_per_month": 40.0,
        "hourly_downtime_cost_inr": 12000.0,
        "monthly_energy_bill_inr": 600000.0
    }
    res = client.post("/api/v1/roi/calculate", json=payload)
    assert res.status_code == 200
    roi = res.json()
    assert roi["projected_oee_pct"] > 72.0
    assert roi["annual_savings_inr"] > 0
    assert roi["payback_period_months"] < 12.0
    
    # Benchmarks
    res = client.get("/api/v1/roi/benchmarks")
    assert res.status_code == 200
    assert len(res.json()["benchmarks"]) >= 4

def test_contact_and_assessment(client):
    payload = {
        "name": "Rajesh Sharma",
        "email": "rajesh@autocrafts.in",
        "company": "AutoCraft Precision Pvt Ltd",
        "phone": "+91 98450 12345",
        "plant_location": "Peenya Industrial Area, Bengaluru, Karnataka",
        "machine_count": 30,
        "primary_challenge": "High unplanned downtime on 25-year-old hydraulic presses",
        "preferred_date": "Next Monday"
    }
    res = client.post("/api/v1/contact/assessment", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "CONFIRMED"
    assert "Bengaluru" in data["scheduled_team"]
    
    # List assessments
    res = client.get("/api/v1/contact/assessments")
    assert res.status_code == 200
    assert len(res.json()) >= 1

def test_products_and_services(client):
    res = client.get("/api/v1/products")
    assert res.status_code == 200
    prods = res.json()
    assert len(prods) == 4
    
    res = client.get("/api/v1/products/command-tower")
    assert res.status_code == 200
    assert res.json()["title"] == "Xtrail Command Tower™"
    
    res = client.get("/api/v1/services")
    assert res.status_code == 200
    assert len(res.json()) == 3

def test_alerts(client):
    res = client.get("/api/v1/alerts")
    assert res.status_code == 200
    alerts = res.json()
    assert len(alerts) >= 1
    
    alert_id = alerts[0]["id"]
    res = client.post(
        f"/api/v1/alerts/{alert_id}/acknowledge",
        json={"acknowledged_by": "Vikram Sen (Maintenance Lead)", "notes": "Dispatched technician"}
    )
    assert res.status_code == 200
    assert res.json()["status"] == "ACKNOWLEDGED"
