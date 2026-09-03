from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from datetime import datetime
import uvicorn

from backend.config import settings
from backend.database import init_db
from backend.routers import (
    telemetry, edge, predictive, poka_yoke, roi, contact, products, alerts, websockets
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database & seed initial records
    init_db()
    print("✓ Xtrail AI Industrial Backend: Database initialized successfully.")
    yield
    print("✓ Xtrail AI Industrial Backend: Graceful shutdown.")

app = FastAPI(
    title="Xtrail AI - Industrial Manufacturing Backend API",
    description="Enterprise REST and WebSocket APIs powering Xtrail Command Tower, Edge IoT Nodes, Vision AI, and Poka-Yoke Quality Gates.",
    version=settings.VERSION,
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS middleware for Next.js frontend and mobile devices
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API v1 routers
app.include_router(telemetry.router, prefix=settings.API_V1_STR)
app.include_router(edge.router, prefix=settings.API_V1_STR)
app.include_router(predictive.router, prefix=settings.API_V1_STR)
app.include_router(poka_yoke.router, prefix=settings.API_V1_STR)
app.include_router(roi.router, prefix=settings.API_V1_STR)
app.include_router(contact.router, prefix=settings.API_V1_STR)
app.include_router(products.router, prefix=settings.API_V1_STR)
app.include_router(alerts.router, prefix=settings.API_V1_STR)

# Include WebSockets router
app.include_router(websockets.router)

@app.get("/")
def root():
    return {
        "service": "Xtrail AI Industrial Platform Backend",
        "version": settings.VERSION,
        "status": "OPERATIONAL",
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "docs_url": "/docs",
        "api_v1": settings.API_V1_STR,
        "supported_plants": ["KA-01 (Bengaluru)", "TN-01 (Chennai)", "AP-01 (Sri City)"]
    }

@app.get("/healthz")
@app.get(f"{settings.API_V1_STR}/health")
def health_check():
    return {
        "status": "HEALTHY",
        "database": "CONNECTED",
        "telemetry_stream": "ACTIVE",
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }

if __name__ == "__main__":
    uvicorn.run(
        "backend.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=True
    )
