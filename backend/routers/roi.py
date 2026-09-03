from fastapi import APIRouter
from typing import Dict, Any, List
from backend.models.schemas import ROICalculateRequest, ROICalculateResponse
from backend.services.analytics import calculate_plant_roi

router = APIRouter(prefix="/roi", tags=["Plant Audit & ROI Calculator"])

@router.post("/calculate", response_model=ROICalculateResponse)
def calculate_roi(req: ROICalculateRequest):
    """
    Computes projected OEE boost, monthly downtime savings, power optimization,
    payback period (months), and 3-year net ROI for retrofitting legacy machinery.
    """
    return calculate_plant_roi(req)

@router.get("/benchmarks")
def get_industry_benchmarks():
    """Returns sector-specific manufacturing benchmarks for Industry 4.0 digitization."""
    return {
        "benchmarks": [
            {
                "sector": "Automotive Component Manufacturing",
                "typical_legacy_oee": "68% - 74%",
                "xtrail_target_oee": "86% - 91%",
                "avg_unplanned_downtime_hrs_per_month": 48.0,
                "avg_payback_months": 3.8
            },
            {
                "sector": "Precision CNC & Powertrain Machining",
                "typical_legacy_oee": "70% - 76%",
                "xtrail_target_oee": "88% - 93%",
                "avg_unplanned_downtime_hrs_per_month": 36.0,
                "avg_payback_months": 4.2
            },
            {
                "sector": "Heavy Stamping & Hydraulic Press",
                "typical_legacy_oee": "62% - 69%",
                "xtrail_target_oee": "84% - 89%",
                "avg_unplanned_downtime_hrs_per_month": 64.0,
                "avg_payback_months": 3.2
            },
            {
                "sector": "Plastic Injection & Die Casting",
                "typical_legacy_oee": "72% - 78%",
                "xtrail_target_oee": "89% - 94%",
                "avg_unplanned_downtime_hrs_per_month": 32.0,
                "avg_payback_months": 4.5
            }
        ]
    }

@router.get("/sample", response_model=ROICalculateResponse)
def get_sample_calculation():
    """Pre-calculated reference evaluation for a 35-machine automotive tier-1 plant."""
    sample_request = ROICalculateRequest(
        plant_name="Tier-1 Powertrain Components Ltd",
        sector="Automotive Component Manufacturing",
        machine_count=35,
        avg_machine_age_years=28.0,
        current_oee_pct=71.5,
        downtime_hours_per_month=52.0,
        hourly_downtime_cost_inr=14500.0,
        monthly_energy_bill_inr=850000.0
    )
    return calculate_plant_roi(sample_request)
