from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import List
import asyncio
import json
from backend.services.simulator import simulator

router = APIRouter(tags=["Real-time WebSockets"])

class ConnectionManager:
    def __init__(self):
        self.active_telemetry_connections: List[WebSocket] = []
        self.active_alerts_connections: List[WebSocket] = []

    async def connect_telemetry(self, websocket: WebSocket):
        await websocket.accept()
        self.active_telemetry_connections.append(websocket)

    def disconnect_telemetry(self, websocket: WebSocket):
        if websocket in self.active_telemetry_connections:
            self.active_telemetry_connections.remove(websocket)

    async def connect_alerts(self, websocket: WebSocket):
        await websocket.accept()
        self.active_alerts_connections.append(websocket)

    def disconnect_alerts(self, websocket: WebSocket):
        if websocket in self.active_alerts_connections:
            self.active_alerts_connections.remove(websocket)

    async def broadcast_alert(self, message: dict):
        for connection in list(self.active_alerts_connections):
            try:
                await connection.send_text(json.dumps(message))
            except Exception:
                self.disconnect_alerts(connection)

manager = ConnectionManager()

@router.websocket("/ws/telemetry")
async def websocket_telemetry_endpoint(websocket: WebSocket):
    """
    Real-time streaming WebSocket broadcasting live OEE, vibration, and energy savings
    every 2 seconds for high-performance dashboard visualization.
    """
    await manager.connect_telemetry(websocket)
    try:
        while True:
            metrics = simulator.get_live_metrics()
            await websocket.send_text(metrics.model_dump_json())
            await asyncio.sleep(2.0)
    except WebSocketDisconnect:
        manager.disconnect_telemetry(websocket)
    except Exception:
        manager.disconnect_telemetry(websocket)

@router.websocket("/ws/alerts")
async def websocket_alerts_endpoint(websocket: WebSocket):
    """
    Push channel sending instantaneous alert events to operator consoles.
    """
    await manager.connect_alerts(websocket)
    try:
        # Send initial confirmation
        await websocket.send_text(json.dumps({
            "event": "CONNECTED",
            "message": "Subscribed to real-time industrial alert stream."
        }))
        while True:
            # Keepalive / ping
            data = await websocket.receive_text()
            if data == "ping":
                await websocket.send_text(json.dumps({"event": "pong"}))
    except WebSocketDisconnect:
        manager.disconnect_alerts(websocket)
    except Exception:
        manager.disconnect_alerts(websocket)
