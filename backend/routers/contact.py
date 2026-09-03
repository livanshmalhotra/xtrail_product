from fastapi import APIRouter, HTTPException
from typing import List
from datetime import datetime
import uuid
from backend.models.schemas import AssessmentRequest, AssessmentResponse
from backend.database import get_db_connection

router = APIRouter(prefix="/contact", tags=["Plant Assessment & Lead Capture"])

@router.post("/assessment", response_model=AssessmentResponse)
def book_plant_assessment(req: AssessmentRequest):
    """
    Submits a request for an on-site 7-day plant audit by Xtrail's engineering team
    to map machine sensors and calculate zero-downtime retrofit ROI.
    """
    conn = get_db_connection()
    cursor = conn.cursor()
    now = datetime.utcnow().isoformat() + "Z"
    assessment_id = f"AUDIT-{uuid.uuid4().hex[:6].upper()}"
    
    # Assign field engineering team based on location
    location_lower = req.plant_location.lower()
    if "bangalore" in location_lower or "bengaluru" in location_lower or "karnataka" in location_lower:
        team = "KA Field Engineering Unit (Bengaluru Hub)"
    elif "chennai" in location_lower or "tamil nadu" in location_lower or "coimbatore" in location_lower:
        team = "TN Field Engineering Unit (Chennai Hub)"
    elif "andhra" in location_lower or "sri city" in location_lower or "hyderabad" in location_lower:
        team = "AP Field Engineering Unit (Sri City Hub)"
    else:
        team = "National Industrial Deployment Squad"
        
    cursor.execute("""
    INSERT INTO assessments (
        id, name, email, company, phone, plant_location, machine_count,
        primary_challenge, preferred_date, status, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'PENDING_DISPATCH', ?)
    """, (
        assessment_id, req.name, req.email, req.company, req.phone,
        req.plant_location, req.machine_count, req.primary_challenge,
        req.preferred_date or "Within 7 business days", now
    ))
    
    conn.commit()
    conn.close()
    
    return AssessmentResponse(
        id=assessment_id,
        status="CONFIRMED",
        message=f"Plant assessment request received for {req.company}. Our engineering team will arrive within 7 business days with non-invasive test sensors.",
        company=req.company,
        scheduled_team=team,
        created_at=now
    )

@router.get("/assessments", response_model=List[AssessmentResponse])
def list_assessments():
    """Admin endpoint to retrieve submitted plant assessment booking leads."""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM assessments ORDER BY created_at DESC")
    rows = cursor.fetchall()
    conn.close()
    
    return [
        AssessmentResponse(
            id=r["id"],
            status=r["status"],
            message=f"Assessment for {r['machine_count']} machines at {r['plant_location']}",
            company=r["company"],
            scheduled_team="Industrial Field Ops",
            created_at=r["created_at"]
        )
        for r in rows
    ]
