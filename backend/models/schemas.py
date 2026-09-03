from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
from enum import Enum
from datetime import datetime

# --- Enums ---

class MachineStatus(str, Enum):
    RUNNING = "RUNNING"
    IDLE = "IDLE"
    ERROR = "ERROR"
    MAINTENANCE = "MAINTENANCE"

class ProtocolType(str, Enum):
    MODBUS_RTU = "Modbus RTU"
    OPC_UA = "OPC-UA"
    RS485 = "RS485"
    ANALOG = "Analog 4-20mA"
    MQTT = "MQTT"

class AlertSeverity(str, Enum):
    INFO = "INFO"
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"

class InterlockState(str, Enum):
    ARMED = "ARMED"
    INTERLOCKED = "INTERLOCKED"
    BYPASSED = "BYPASSED"

# --- Telemetry & Command Tower Schemas ---

class MachineTelemetry(BaseModel):
    machine_id: str
    machine_name: str
    plant_id: str
    timestamp: str
    oee: float = Field(..., ge=0, le=100)
    availability: float = Field(..., ge=0, le=100)
    performance: float = Field(..., ge=0, le=100)
    quality: float = Field(..., ge=0, le=100)
    vibration_g_rms: float
    temperature_c: float
    power_kw: float
    rpm: int
    cycle_time_sec: float
    status: MachineStatus
    defect_count: int = 0

class PlantSummary(BaseModel):
    plant_id: str
    plant_name: str
    state: str # KA / TN / AP
    city: str
    machine_count: int
    active_machines: int
    avg_oee: float
    total_power_kw: float
    alerts_count: int
    status: str

class LiveAggregateMetrics(BaseModel):
    oee_index: float
    power_savings_pct: float
    vibration_rms: float
    active_nodes: int
    total_nodes: int
    uptime_pct: float
    timestamp: str
    node_status: str

# --- Edge IoT Gateway Schemas ---

class EdgeNodeRegister(BaseModel):
    node_id: str
    name: str
    plant_id: str
    location: str
    protocol: ProtocolType
    channels_count: int = 32
    firmware_version: str = "v2.4.1-edge"
    ip_address: Optional[str] = "192.168.10.100"

class EdgeNode(BaseModel):
    node_id: str
    name: str
    plant_id: str
    location: str
    protocol: str
    channels_count: int
    firmware_version: str
    ip_address: str
    status: str
    last_ping: str
    latency_ms: float
    packets_transmitted: int

class TelemetryIngest(BaseModel):
    node_id: str
    machine_id: str
    timestamp: Optional[str] = None
    readings: Dict[str, Any]

class BatchTelemetryIngest(BaseModel):
    node_id: str
    batch_size: int
    records: List[Dict[str, Any]]

# --- Vision AI & Predictive Schemas ---

class VisionInspectRequest(BaseModel):
    camera_id: str
    machine_id: str
    inspection_type: str = "THERMAL_IR" # THERMAL_IR, OPTICAL_QUALITY, ACOUSTIC_FFT
    image_base64: Optional[str] = None
    current_temp_c: Optional[float] = 78.5
    ambient_temp_c: Optional[float] = 31.0

class VisionInspectResponse(BaseModel):
    inspection_id: str
    machine_id: str
    timestamp: str
    anomaly_detected: bool
    severity: AlertSeverity
    anomaly_score: float # 0.0 to 1.0
    detected_hotspots: List[Dict[str, Any]]
    recommended_action: str
    status: str

class BearingAnalysisRequest(BaseModel):
    machine_id: str
    vibration_samples: Optional[List[float]] = None
    sampling_rate_hz: int = 10000
    operating_hours: float = 4500.0

class BearingAnalysisResponse(BaseModel):
    machine_id: str
    timestamp: str
    bearing_health_index: float # 0 - 100%
    failure_probability_72h: float # 0.0 to 1.0
    estimated_rul_hours: float # Remaining Useful Life
    peak_vibration_g: float
    dominant_frequency_hz: float
    status: str # NORMAL, WATCHLIST, CRITICAL
    alert_level: str
    prescription: str

# --- Poka-Yoke & Quality Gate Schemas ---

class StationInfo(BaseModel):
    station_id: str
    station_name: str
    line_id: str
    plant_id: str
    state: InterlockState
    sensor_type: str
    last_defect_prevented: Optional[str] = None
    total_prevented_defects: int = 0
    cycle_time_target_sec: float = 45.0
    last_cycle_time_sec: float = 44.2

class InterlockTriggerRequest(BaseModel):
    station_id: str
    reason: str
    defect_code: str
    operator_id: Optional[str] = "OP-104"

class InterlockResetRequest(BaseModel):
    station_id: str
    operator_id: str
    supervisor_pin: str
    resolution_notes: str

class DefectLogEntry(BaseModel):
    defect_id: str
    station_id: str
    timestamp: str
    defect_type: str
    prevented_escape: bool
    notes: str

# --- ROI Calculator Schemas ---

class ROICalculateRequest(BaseModel):
    plant_name: str
    sector: str = "Automotive Component Manufacturing"
    machine_count: int = Field(..., ge=1, le=500)
    avg_machine_age_years: float = Field(..., ge=1, le=50)
    current_oee_pct: float = Field(..., ge=20, le=95)
    downtime_hours_per_month: float = Field(..., ge=0)
    hourly_downtime_cost_inr: float = Field(..., ge=500)
    monthly_energy_bill_inr: float = Field(..., ge=10000)

class ROICalculateResponse(BaseModel):
    plant_name: str
    sector: str
    current_oee_pct: float
    projected_oee_pct: float
    oee_improvement_pts: float
    monthly_downtime_savings_inr: float
    monthly_energy_savings_inr: float
    total_monthly_savings_inr: float
    annual_savings_inr: float
    estimated_hardware_setup_cost_inr: float
    payback_period_months: float
    three_year_net_roi_pct: float
    breakdown: Dict[str, Any]

# --- Plant Assessment / Contact Schemas ---

class AssessmentRequest(BaseModel):
    name: str
    email: str
    company: str
    phone: str
    plant_location: str
    machine_count: int
    primary_challenge: str
    preferred_date: Optional[str] = None

class AssessmentResponse(BaseModel):
    id: str
    status: str
    message: str
    company: str
    scheduled_team: str
    created_at: str

# --- Products & Services Schemas ---

class ProductMetric(BaseModel):
    value: str
    label: str

class ProductItem(BaseModel):
    id: str
    tag: str
    title: str
    tagline: str
    desc: str
    iconName: str
    visualType: str
    metrics: ProductMetric
    specs: List[str]
    active_deployments: int
    protocol_compatibility: List[str]

class ServiceItem(BaseModel):
    num: str
    tag: str
    title: str
    desc: str
    items: List[str]

# --- Alert Notifications ---

class AlertItem(BaseModel):
    id: str
    plant_id: str
    plant_name: str
    machine_id: str
    severity: AlertSeverity
    title: str
    message: str
    timestamp: str
    acknowledged: bool = False
    acknowledged_by: Optional[str] = None
    acknowledged_at: Optional[str] = None

class AlertAcknowledgeRequest(BaseModel):
    acknowledged_by: str
    notes: Optional[str] = None
