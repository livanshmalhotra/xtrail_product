from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from datetime import datetime
from backend.models.schemas import EdgeNode, EdgeNodeRegister, BatchTelemetryIngest
from backend.database import get_db_connection

router = APIRouter(prefix="/edge", tags=["Edge IoT Node Gateway"])

@router.get("/nodes", response_model=List[EdgeNode])
def list_edge_nodes():
    """Returns all registered industrial Edge IoT nodes and their live connectivity status."""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM edge_nodes")
    rows = cursor.fetchall()
    conn.close()
    
    return [
        EdgeNode(
            node_id=r["node_id"],
            name=r["name"],
            plant_id=r["plant_id"],
            location=r["location"],
            protocol=r["protocol"],
            channels_count=r["channels_count"],
            firmware_version=r["firmware_version"],
            ip_address=r["ip_address"],
            status=r["status"],
            last_ping=r["last_ping"],
            latency_ms=r["latency_ms"],
            packets_transmitted=r["packets_transmitted"]
        )
        for r in rows
    ]

@router.get("/nodes/{node_id}", response_model=EdgeNode)
def get_edge_node(node_id: str):
    """Retrieve details, channel mapping, and health stats of a specific Edge Node."""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM edge_nodes WHERE node_id = ?", (node_id,))
    r = cursor.fetchone()
    conn.close()
    
    if not r:
        raise HTTPException(status_code=404, detail=f"Edge Node {node_id} not found")
        
    return EdgeNode(
        node_id=r["node_id"],
        name=r["name"],
        plant_id=r["plant_id"],
        location=r["location"],
        protocol=r["protocol"],
        channels_count=r["channels_count"],
        firmware_version=r["firmware_version"],
        ip_address=r["ip_address"],
        status=r["status"],
        last_ping=r["last_ping"],
        latency_ms=r["latency_ms"],
        packets_transmitted=r["packets_transmitted"]
    )

@router.post("/register", response_model=EdgeNode)
def register_edge_node(req: EdgeNodeRegister):
    """Registers a new Xtrail Edge IoT Node on the plant floor."""
    conn = get_db_connection()
    cursor = conn.cursor()
    now = datetime.utcnow().isoformat() + "Z"
    
    cursor.execute("""
    INSERT OR REPLACE INTO edge_nodes (
        node_id, name, plant_id, location, protocol, channels_count, firmware_version,
        ip_address, status, last_ping, latency_ms, packets_transmitted
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'ONLINE', ?, 4.5, 0)
    """, (
        req.node_id, req.name, req.plant_id, req.location, req.protocol.value,
        req.channels_count, req.firmware_version, req.ip_address or "192.168.1.100", now
    ))
    conn.commit()
    
    cursor.execute("SELECT * FROM edge_nodes WHERE node_id = ?", (req.node_id,))
    r = cursor.fetchone()
    conn.close()
    
    return EdgeNode(
        node_id=r["node_id"],
        name=r["name"],
        plant_id=r["plant_id"],
        location=r["location"],
        protocol=r["protocol"],
        channels_count=r["channels_count"],
        firmware_version=r["firmware_version"],
        ip_address=r["ip_address"],
        status=r["status"],
        last_ping=r["last_ping"],
        latency_ms=r["latency_ms"],
        packets_transmitted=r["packets_transmitted"]
    )

@router.post("/heartbeat/{node_id}")
def node_heartbeat(node_id: str, latency_ms: float = 4.2):
    """Sub-second heartbeat keeping node status ONLINE and recording network latency."""
    conn = get_db_connection()
    cursor = conn.cursor()
    now = datetime.utcnow().isoformat() + "Z"
    
    cursor.execute("""
    UPDATE edge_nodes 
    SET last_ping = ?, latency_ms = ?, status = 'ONLINE', packets_transmitted = packets_transmitted + 1
    WHERE node_id = ?
    """, (now, latency_ms, node_id))
    
    if cursor.rowcount == 0:
        conn.close()
        raise HTTPException(status_code=404, detail=f"Node {node_id} not registered")
        
    conn.commit()
    conn.close()
    return {"status": "ACK", "node_id": node_id, "timestamp": now, "latency_ms": latency_ms}

@router.post("/batch-telemetry")
def batch_ingest(payload: BatchTelemetryIngest):
    """High-throughput batch telemetry ingestion from Edge nodes (up to 100ms resolution)."""
    conn = get_db_connection()
    cursor = conn.cursor()
    now = datetime.utcnow().isoformat() + "Z"
    
    cursor.execute("""
    UPDATE edge_nodes 
    SET packets_transmitted = packets_transmitted + ?, last_ping = ?
    WHERE node_id = ?
    """, (payload.batch_size, now, payload.node_id))
    
    conn.commit()
    conn.close()
    
    return {
        "status": "BATCH_PROCESSED",
        "node_id": payload.node_id,
        "records_received": len(payload.records),
        "timestamp": now
    }

@router.get("/protocols")
def get_supported_protocols():
    """Returns supported industrial legacy and modern fieldbus communication protocols."""
    return {
        "protocols": [
            {
                "name": "Modbus RTU",
                "interface": "RS-485 Serial 2-Wire",
                "baud_rates": [9600, 19200, 38400, 115200],
                "description": "Standard serial bus for retrofitting legacy PLCs (Mitsubishi, Delta, Omron, Siemens S7-200)."
            },
            {
                "name": "OPC-UA",
                "interface": "Ethernet TCP/IP",
                "encryption": "Basic256Sha256 / AES-128",
                "description": "Industrial interoperability standard for modern smart machines and SCADA backbones."
            },
            {
                "name": "RS485 / ASCII",
                "interface": "Differential balanced line",
                "description": "Custom ASCII string protocol parser for weigh-scales, bar-code scanners, and CNC DROs."
            },
            {
                "name": "Analog 4-20mA & 0-10V",
                "interface": "Direct ADC non-invasive sensor clamps",
                "description": "Retrofit current clamps, pressure transducers, thermistors on machines with zero PLC access."
            },
            {
                "name": "MQTT / Sparkplug B",
                "interface": "TLS Encrypted TCP",
                "description": "Lightweight publish-subscribe telemetry streaming to cloud or on-prem Xtrail Command Tower."
            }
        ]
    }
