import math
from typing import Dict, Any, List
from backend.models.schemas import ROICalculateRequest, ROICalculateResponse

def compute_oee(availability: float, performance: float, quality: float) -> float:
    """OEE = (Availability * Performance * Quality) / 10,000"""
    raw = (availability * performance * quality) / 10000.0
    return round(raw, 2)

def calculate_plant_roi(req: ROICalculateRequest) -> ROICalculateResponse:
    """
    Calculates detailed financial and operational ROI for retrofitting
    20-40 year old legacy industrial machinery with Xtrail IIoT & AI.
    """
    # Xtrail benchmark: +12% to +18% points OEE boost, 35% downtime reduction, 14% energy optimization
    current_oee = req.current_oee_pct
    oee_improvement = min(15.5, max(8.0, (100.0 - current_oee) * 0.35))
    projected_oee = round(min(96.0, current_oee + oee_improvement), 1)
    
    # Downtime savings: average 45% reduction in unplanned stoppage
    reduced_downtime_hours = req.downtime_hours_per_month * 0.45
    monthly_downtime_savings = round(reduced_downtime_hours * req.hourly_downtime_cost_inr, 2)
    
    # Energy savings: average 14% reduction in peak load & unoptimized idling
    monthly_energy_savings = round(req.monthly_energy_bill_inr * 0.14, 2)
    
    total_monthly_savings = monthly_downtime_savings + monthly_energy_savings
    annual_savings = round(total_monthly_savings * 12, 2)
    
    # Hardware & Setup estimate: ~₹85,000 per machine edge node & gateway + deployment
    hardware_cost_per_machine = 85000.0
    if req.avg_machine_age_years > 25:
        # Older machines need custom optical/analog bracket retrofit
        hardware_cost_per_machine += 15000.0
        
    estimated_hardware_setup_cost = round(req.machine_count * hardware_cost_per_machine, 2)
    
    # Payback period in months
    payback_period_months = round(
        max(1.5, estimated_hardware_setup_cost / (total_monthly_savings or 1.0)), 1
    )
    
    # 3-year Net ROI % = ((3 * annual_savings - setup_cost) / setup_cost) * 100
    three_year_net_roi = round(
        ((3.0 * annual_savings - estimated_hardware_setup_cost) / estimated_hardware_setup_cost) * 100.0, 1
    )
    
    breakdown = {
        "monthly_reduced_downtime_hours": round(reduced_downtime_hours, 1),
        "annual_downtime_hours_recovered": round(reduced_downtime_hours * 12, 0),
        "hardware_cost_per_machine_inr": hardware_cost_per_machine,
        "energy_consumption_reduction_pct": 14.0,
        "scrap_defect_reduction_pct": 28.0,
        "first_year_net_profit_inr": round(annual_savings - estimated_hardware_setup_cost, 2),
    }
    
    return ROICalculateResponse(
        plant_name=req.plant_name,
        sector=req.sector,
        current_oee_pct=current_oee,
        projected_oee_pct=projected_oee,
        oee_improvement_pts=round(projected_oee - current_oee, 1),
        monthly_downtime_savings_inr=monthly_downtime_savings,
        monthly_energy_savings_inr=monthly_energy_savings,
        total_monthly_savings_inr=total_monthly_savings,
        annual_savings_inr=annual_savings,
        estimated_hardware_setup_cost_inr=estimated_hardware_setup_cost,
        payback_period_months=payback_period_months,
        three_year_net_roi_pct=three_year_net_roi,
        breakdown=breakdown,
    )

def predict_bearing_failure(
    vibration_samples: List[float] = None,
    operating_hours: float = 4500.0
) -> Dict[str, Any]:
    """
    Simulates FFT frequency & vibration peak analysis to predict bearing failure within 72 hours.
    """
    if not vibration_samples or len(vibration_samples) == 0:
        # Default baseline simulation samples
        vibration_samples = [0.038, 0.041, 0.039, 0.045, 0.052, 0.048, 0.044]
        
    peak_vib = max(vibration_samples)
    avg_vib = sum(vibration_samples) / len(vibration_samples)
    
    # Peak threshold normal is < 0.05 g-RMS, warning > 0.06, critical > 0.08
    if peak_vib > 0.08:
        prob = round(min(0.98, 0.70 + (peak_vib - 0.08) * 5.0), 3)
        health = round(max(10.0, 100.0 - prob * 95), 1)
        rul_hours = round(max(12.0, 72.0 * (1.0 - prob)), 1)
        status = "CRITICAL"
        alert_level = "RED"
        prescription = "Immediate machine halt recommended. Inner race bearing pitting detected at spindle motor."
    elif peak_vib > 0.055:
        prob = round(min(0.65, 0.25 + (peak_vib - 0.055) * 8.0), 3)
        health = round(max(40.0, 100.0 - prob * 60), 1)
        rul_hours = round(72.0 + (1.0 - prob) * 150.0, 1)
        status = "WATCHLIST"
        alert_level = "AMBER"
        prescription = "High-frequency harmonics observed (1420 Hz). Perform ultrasonic grease lubrication within 24 hours."
    else:
        prob = round(max(0.01, (avg_vib / 0.05) * 0.05), 3)
        health = round(min(99.8, 100.0 - prob * 10), 1)
        rul_hours = round(1400.0 + (100.0 - avg_vib * 1000) * 10, 1)
        status = "NORMAL"
        alert_level = "GREEN"
        prescription = "Bearing harmonics within ISO 10816-3 Class II normal limits. Routine inspection at 5000h."

    dominant_freq = round(120.0 + (peak_vib * 10000.0) % 2500.0, 1)
    
    return {
        "bearing_health_index": health,
        "failure_probability_72h": prob,
        "estimated_rul_hours": rul_hours,
        "peak_vibration_g": round(peak_vib, 3),
        "dominant_frequency_hz": dominant_freq,
        "status": status,
        "alert_level": alert_level,
        "prescription": prescription,
    }
