import sqlite3
import json
from datetime import datetime
from backend.config import settings

def get_db_connection():
    conn = sqlite3.connect(settings.DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # 1. Plants table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS plants (
        plant_id TEXT PRIMARY KEY,
        plant_name TEXT NOT NULL,
        state TEXT NOT NULL,
        city TEXT NOT NULL,
        machine_count INTEGER NOT NULL,
        status TEXT NOT NULL
    )
    """)
    
    # 2. Machines table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS machines (
        machine_id TEXT PRIMARY KEY,
        machine_name TEXT NOT NULL,
        plant_id TEXT NOT NULL,
        status TEXT NOT NULL,
        oee REAL NOT NULL,
        availability REAL NOT NULL,
        performance REAL NOT NULL,
        quality REAL NOT NULL,
        vibration_g_rms REAL NOT NULL,
        temperature_c REAL NOT NULL,
        power_kw REAL NOT NULL,
        rpm INTEGER NOT NULL,
        cycle_time_sec REAL NOT NULL,
        defect_count INTEGER DEFAULT 0,
        updated_at TEXT NOT NULL,
        FOREIGN KEY (plant_id) REFERENCES plants(plant_id)
    )
    """)
    
    # 3. Edge Nodes table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS edge_nodes (
        node_id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        plant_id TEXT NOT NULL,
        location TEXT NOT NULL,
        protocol TEXT NOT NULL,
        channels_count INTEGER NOT NULL,
        firmware_version TEXT NOT NULL,
        ip_address TEXT NOT NULL,
        status TEXT NOT NULL,
        last_ping TEXT NOT NULL,
        latency_ms REAL NOT NULL,
        packets_transmitted INTEGER DEFAULT 0
    )
    """)
    
    # 4. Poka-Yoke Stations table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS poka_yoke_stations (
        station_id TEXT PRIMARY KEY,
        station_name TEXT NOT NULL,
        line_id TEXT NOT NULL,
        plant_id TEXT NOT NULL,
        state TEXT NOT NULL,
        sensor_type TEXT NOT NULL,
        last_defect_prevented TEXT,
        total_prevented_defects INTEGER DEFAULT 0,
        cycle_time_target_sec REAL DEFAULT 45.0,
        last_cycle_time_sec REAL DEFAULT 44.2
    )
    """)
    
    # 5. Defect logs table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS defect_logs (
        defect_id TEXT PRIMARY KEY,
        station_id TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        defect_type TEXT NOT NULL,
        prevented_escape INTEGER NOT NULL,
        notes TEXT
    )
    """)
    
    # 6. Alerts table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS alerts (
        id TEXT PRIMARY KEY,
        plant_id TEXT NOT NULL,
        plant_name TEXT NOT NULL,
        machine_id TEXT NOT NULL,
        severity TEXT NOT NULL,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        acknowledged INTEGER DEFAULT 0,
        acknowledged_by TEXT,
        acknowledged_at TEXT
    )
    """)
    
    # 7. Plant Assessment Bookings table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS assessments (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        company TEXT NOT NULL,
        phone TEXT NOT NULL,
        plant_location TEXT NOT NULL,
        machine_count INTEGER NOT NULL,
        primary_challenge TEXT NOT NULL,
        preferred_date TEXT,
        status TEXT NOT NULL,
        created_at TEXT NOT NULL
    )
    """)
    
    # 8. Seed Initial Data if empty
    cursor.execute("SELECT COUNT(*) FROM plants")
    if cursor.fetchone()[0] == 0:
        seed_data(cursor)
        
    conn.commit()
    conn.close()

def seed_data(cursor):
    now = datetime.utcnow().isoformat() + "Z"
    
    # Seed Plants
    plants = [
        ("KA-01", "Bengaluru Smart Robotics & Stamping Plant", "KA", "Bengaluru, Karnataka", 32, "OPERATIONAL"),
        ("TN-01", "Chennai Heavy Powertrain Machining Plant", "TN", "Chennai, Tamil Nadu", 48, "OPERATIONAL"),
        ("AP-01", "Sri City Precision Casting & Extrusion Plant", "AP", "Sri City, Andhra Pradesh", 24, "OPERATIONAL"),
    ]
    cursor.executemany(
        "INSERT INTO plants VALUES (?, ?, ?, ?, ?, ?)",
        plants
    )
    
    # Seed Machines
    machines = [
        ("M-KA-01", "5-Axis CNC Milling Center #1", "KA-01", "RUNNING", 91.2, 95.0, 97.0, 99.0, 0.038, 58.2, 18.4, 3200, 38.5, 0, now),
        ("M-KA-02", "Automated Robotic Welding Cell #4", "KA-01", "RUNNING", 88.5, 92.0, 96.5, 99.7, 0.042, 64.0, 24.1, 0, 52.0, 1, now),
        ("M-TN-01", "1200T Hydraulic Stamping Press #2", "TN-01", "RUNNING", 86.4, 90.5, 95.8, 99.6, 0.048, 71.5, 62.0, 1450, 68.2, 2, now),
        ("M-TN-02", "Twin Spindle Turning Center #8", "TN-01", "MAINTENANCE", 74.2, 80.0, 93.0, 99.8, 0.065, 82.4, 15.2, 2800, 42.0, 4, now),
        ("M-AP-01", "High-Pressure Die Casting Unit #3", "AP-01", "RUNNING", 92.8, 96.0, 97.2, 99.5, 0.035, 66.8, 48.5, 1200, 95.0, 0, now),
        ("M-AP-02", "Aluminum Extrusion Line #1", "AP-01", "RUNNING", 89.1, 93.5, 96.0, 99.3, 0.041, 69.2, 54.0, 1800, 84.5, 1, now),
    ]
    cursor.executemany(
        "INSERT INTO machines VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        machines
    )
    
    # Seed Edge Nodes
    nodes = [
        ("NODE-8472", "Xtrail Edge Gateway - Milling Bay", "KA-01", "Bay A / CNC Line 1", "OPC-UA", 32, "v2.4.1-edge", "192.168.10.101", "ONLINE", now, 4.2, 842910),
        ("NODE-8473", "Xtrail Edge Gateway - Robotic Cell", "KA-01", "Bay B / Weld Station", "Modbus RTU", 32, "v2.4.1-edge", "192.168.10.102", "ONLINE", now, 5.8, 723490),
        ("NODE-8474", "Xtrail Edge Gateway - Press Section", "TN-01", "Bay C / 1200T Press", "RS485", 32, "v2.4.1-edge", "192.168.20.105", "ONLINE", now, 6.1, 912840),
        ("NODE-8475", "Xtrail Edge Gateway - Casting Hub", "AP-01", "Bay D / Die Casting", "Analog 4-20mA", 32, "v2.4.1-edge", "192.168.30.110", "ONLINE", now, 3.9, 654200),
    ]
    cursor.executemany(
        "INSERT INTO edge_nodes VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        nodes
    )
    
    # Seed Poka-Yoke Stations
    stations = [
        ("QG-STATION-A", "Final Torquing & Fastener Gate", "LINE-01", "KA-01", "ARMED", "Photoelectric + Pneumatic Interlock", "Torque Angle Under-rotation Blocked", 47, 45.0, 43.8),
        ("QG-STATION-B", "Gasket Presence & Alignment Sensor", "LINE-02", "TN-01", "ARMED", "Laser Profiler + Conveyor Halt", "Missing O-ring Seal Detected", 92, 30.0, 29.5),
        ("QG-STATION-C", "PCB Connector Pin Seating Gate", "LINE-03", "AP-01", "ARMED", "Capacitive Distance Sensor", "Unseated Pin Lock Detected", 34, 25.0, 24.1),
    ]
    cursor.executemany(
        "INSERT INTO poka_yoke_stations VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        stations
    )
    
    # Seed Active Alerts
    alerts = [
        ("ALT-1001", "TN-01", "Chennai Heavy Powertrain Machining Plant", "M-TN-02", "MEDIUM", "Spindle Bearing Thermal Rise", "Bearing temp reached 82.4°C (threshold: 80.0°C). Schedule grease cycle.", now, 0, None, None),
        ("ALT-1002", "KA-01", "Bengaluru Smart Robotics & Stamping Plant", "M-KA-02", "LOW", "Weld Tip Consumable Advisory", "Tip cycle count at 92% of rated life. Maintenance due next shift.", now, 0, None, None),
    ]
    cursor.executemany(
        "INSERT INTO alerts VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        alerts
    )
