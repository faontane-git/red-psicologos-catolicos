from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import Psychologist, AcademicCredential, EcclesialEndorsement, CommitteeMember
from app.schemas.schemas import PsychologistAdminOut, StatusUpdateSchema
from app.auth import get_current_committee_member

router = APIRouter(prefix="/admin", tags=["Comité de Validación"])

@router.get("/applications", response_model=List[PsychologistAdminOut])
def list_applications(
    status: Optional[str] = Query(None, description="Filtrar por PENDING, APPROVED, REJECTED"),
    db: Session = Depends(get_db),
    current_user: CommitteeMember = Depends(get_current_committee_member)
):
    query = db.query(Psychologist)
    if status and status.upper() != "ALL":
        query = query.filter(Psychologist.status == status.upper())
    
    return query.order_by(Psychologist.created_at.desc()).all()

@router.get("/applications/{psychologist_id}", response_model=PsychologistAdminOut)
def get_application_detail(
    psychologist_id: int,
    db: Session = Depends(get_db),
    current_user: CommitteeMember = Depends(get_current_committee_member)
):
    p = db.query(Psychologist).filter(Psychologist.id == psychologist_id).first()
    if not p:
        raise HTTPException(status_code=404, detail="Postulación no encontrada")
    return p

@router.patch("/applications/{psychologist_id}/status")
def update_application_status(
    psychologist_id: int,
    payload: StatusUpdateSchema,
    db: Session = Depends(get_db),
    current_user: CommitteeMember = Depends(get_current_committee_member)
):
    p = db.query(Psychologist).filter(Psychologist.id == psychologist_id).first()
    if not p:
        raise HTTPException(status_code=404, detail="Postulación no encontrada")

    new_status = payload.status.upper()
    valid_statuses = ["PENDING", "APPROVED", "REJECTED", "CHANGES_REQUESTED"]
    if new_status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Estado inválido. Debe ser uno de: {valid_statuses}")

    p.status = new_status
    if payload.committee_notes is not None:
        p.committee_notes = payload.committee_notes

    if new_status == "APPROVED":
        p.verified_at = datetime.utcnow()
        # Mark credentials & endorsement as verified
        for cred in p.credentials:
            cred.verified = True
        if p.endorsement:
            p.endorsement.verified = True
    elif new_status in ["REJECTED", "PENDING"]:
        for cred in p.credentials:
            cred.verified = False
        if p.endorsement:
            p.endorsement.verified = False

    db.commit()
    db.refresh(p)

    return {
        "success": True,
        "psychologist_id": p.id,
        "new_status": p.status,
        "verified_at": p.verified_at,
        "committee_notes": p.committee_notes,
        "reviewed_by": current_user.full_name,
        "message": f"Estado actualizado exitosamente a '{p.status}' por {current_user.full_name}."
    }
