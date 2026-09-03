import random
import asyncio
from datetime import datetime, timezone
from typing import Dict, Any, List
from backend.models.schemas import LiveAggregateMetrics

class PlantSimulator:
    def __init__(self):
        self.oee_index: float = 89.4
        self.power_savings_pct: float = 24.8
        self.vibration_rms: float = 0.041
        self.active_nodes: int = 104
        self.total_nodes: int = 104
        self.uptime_pct: float = 99.85
        self.last_updated: str = datetime.now(timezone.utc).isoformat()
        self._running: bool = False
        self._task: asyncio.Task = None

    def tick(self):
        """Simulates minor sensor jitter and realistic operational fluctuation"""
        # Slight drift with mean reversion around 89.4%
        oee_delta = (random.random() * 0.4 - 0.2)
        self.oee_index = round(max(85.0, min(94.0, self.oee_index + oee_delta)), 1)
        
        savings_delta = (random.random() * 0.2 - 0.1)
        self.power_savings_pct = round(max(20.0, min(30.0, self.power_savings_pct + savings_delta)), 1)
        
        self.vibration_rms = round(max(0.025, min(0.065, 0.040 + (random.random() * 0.015 - 0.007))), 3)
        self.last_updated = datetime.now(timezone.utc).isoformat()

    def get_live_metrics(self) -> LiveAggregateMetrics:
        self.tick()
        return LiveAggregateMetrics(
            oee_index=self.oee_index,
            power_savings_pct=self.power_savings_pct,
            vibration_rms=self.vibration_rms,
            active_nodes=self.active_nodes,
            total_nodes=self.total_nodes,
            uptime_pct=self.uptime_pct,
            timestamp=self.last_updated,
            node_status="ALL_SYSTEMS_NOMINAL" if self.vibration_rms < 0.055 else "ATTENTION_REQUIRED"
        )

simulator = PlantSimulator()
