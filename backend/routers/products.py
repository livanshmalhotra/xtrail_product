from fastapi import APIRouter, HTTPException
from typing import List
from backend.models.schemas import ProductItem, ServiceItem, ProductMetric

router = APIRouter(tags=["Products & Services Catalog"])

PRODUCTS_DATA = [
    ProductItem(
        id="command-tower",
        tag="FLAGSHIP SOFTWARE PLATFORM",
        title="Xtrail Command Tower™",
        tagline="Multi-Factory Operations Control & OEE Engine",
        desc="A centralized real-time dashboard unifying production counts, shift targets, OEE, energy consumption, and downtime alerts across all your manufacturing plants.",
        iconName="dashboard",
        visualType="dashboard",
        metrics=ProductMetric(value="89.4%", label="AVG OEE BOOST"),
        specs=[
            "Real-time OEE & TEEP Capacity Analytics with multi-plant views (KA / TN / AP)",
            "Automated shift downtime classification & bottleneck diagnostic engines",
            "Python API & WebSocket real-time data stream adapters built for custom ML backends",
            "Role-based access control for plant managers, operators, and CXO executives"
        ],
        active_deployments=42,
        protocol_compatibility=["REST", "WebSocket", "GraphQL", "MQTT"]
    ),
    ProductItem(
        id="edge-gateway",
        tag="HARDWARE & EDGE COMPUTE",
        title="Xtrail Edge IoT Node™",
        tagline="Industrial Protocol Translator & Edge Gateway",
        desc="Plug-and-play industrial hardware supporting Modbus RTU, OPC-UA, RS485, and analog sensor inputs. Transmits encrypted telemetry every 100ms.",
        iconName="hardware",
        visualType="hardware",
        metrics=ProductMetric(value="<100ms", label="DATA LATENCY"),
        specs=[
            "Sub-second high frequency data sampling (100ms resolution across 32 channels)",
            "Non-invasive zero-downtime installation on 20-40 year old legacy machines",
            "Industrial DIN-rail rugged aluminum enclosure (IP67 vibration & heat resistant)",
            "MQTT / HTTP REST endpoint connectivity ready for Python data pipelines"
        ],
        active_deployments=1850,
        protocol_compatibility=["Modbus RTU", "OPC-UA", "RS485", "Analog 4-20mA"]
    ),
    ProductItem(
        id="vision-ai",
        tag="AI PREDICTIVE ENGINE",
        title="Xtrail Vision AI™",
        tagline="Predictive Maintenance & Thermal Anomaly Detection",
        desc="Neural network models monitoring high-frequency vibration signatures and infrared thermal patterns to predict mechanical bearing wear 72 hours prior to breakdown.",
        iconName="ai",
        visualType="ai",
        metrics=ProductMetric(value="99.2%", label="AI ACCURACY"),
        specs=[
            "72-hour early failure detection accuracy for critical bearings and motor spindles",
            "Automated thermal anomaly severity scoring & instant SMS / Telegram alerts",
            "Integrates with thermal IR, acoustic vibration, and surface thermistor sensors",
            "Native Python PyTorch / ONNX ML backend compatibility for edge AI models"
        ],
        active_deployments=148,
        protocol_compatibility=["RTSP", "Thermal IR", "ONNX", "PyTorch"]
    ),
    ProductItem(
        id="poka-yoke",
        tag="AUTOMATION & SAFETY",
        title="Xtrail Poka-Yoke Sense™",
        tagline="Modular Quality Gate & Interlock System",
        desc="Poka-yoke assembly line automation incorporating photoelectric sensors, conveyor interlocks, and automated stop-guards to prevent defect propagation.",
        iconName="safety",
        visualType="safety",
        metrics=ProductMetric(value="0.0%", label="DEFECT ESCAPE"),
        specs=[
            "Instant conveyor halt on defect detection before assembly line propagation",
            "Operator activity cycle tracking & automated station time logging",
            "Modular pneumatic & hydraulic actuator upgrades for legacy machinery",
            "Zero-error assembly verification with automated audit logging"
        ],
        active_deployments=310,
        protocol_compatibility=["Photoelectric IO", "Pneumatic 24V", "Relay Interlock"]
    )
]

SERVICES_DATA = [
    ServiceItem(
        num="01",
        tag="LEGACY DX",
        title="Digital Transformation Consulting",
        desc="Strategic roadmap for 20–40 year old legacy manufacturing plants.",
        items=[
            "Plant Audit & ROI Calculator",
            "Legacy Machine Assessment",
            "Phased Digital Roadmap (Visibility → Automation → AI)",
            "Multi-state rollout strategy (KA / TN / AP)"
        ]
    ),
    ServiceItem(
        num="02",
        tag="RETROFIT",
        title="Sensorization & Automation Services",
        desc="Non-invasive IIoT retrofit for silent industrial machinery.",
        items=[
            "Condition Monitoring Sensors (Vibration + Temperature)",
            "Energy Monitoring (CT Clamps & Power Analyzers)",
            "Modular Conveyors & Hydraulic/Pneumatic Upgrades",
            "Poka-Yoke Safety Systems & Quality Gates"
        ]
    ),
    ServiceItem(
        num="03",
        tag="AI INTELLIGENCE",
        title="Centralized Control Tower",
        desc="Turn raw factory data into automated, predictive decision-making.",
        items=[
            "Centralized Command Center & Multi-Factory Dashboards",
            "Predictive & Prescriptive Maintenance AI",
            "Anomaly Detection & Real-time Diagnostics AI",
            "OEE Tracking + TEEP Capacity Optimization"
        ]
    )
]

@router.get("/products", response_model=List[ProductItem])
def list_products():
    """Returns the complete Xtrail AI industrial product catalog."""
    return PRODUCTS_DATA

@router.get("/products/{product_id}", response_model=ProductItem)
def get_product(product_id: str):
    """Retrieve detailed specifications for a single product."""
    for p in PRODUCTS_DATA:
        if p.id == product_id:
            return p
    raise HTTPException(status_code=404, detail=f"Product {product_id} not found")

@router.get("/services", response_model=List[ServiceItem])
def list_services():
    """Returns the consulting and engineering services catalog."""
    return SERVICES_DATA
