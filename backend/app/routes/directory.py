from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.database import get_db
from app.models.models import Psychologist, Specialty, EcclesialEndorsement
from app.schemas.schemas import PsychologistPublicOut, LatamStatsOut

router = APIRouter(prefix="/psychologists", tags=["Directorio Público"])

@router.get("", response_model=List[PsychologistPublicOut])
def list_approved_psychologists(
    country: Optional[str] = Query(None, description="Filtrar por país de Latinoamérica"),
    city: Optional[str] = Query(None, description="Filtrar por ciudad"),
    modality: Optional[str] = Query(None, description="virtual, presencial o mixta"),
    specialty: Optional[str] = Query(None, description="Slug o nombre de especialidad"),
    search: Optional[str] = Query(None, description="Término de búsqueda en nombre o biografía"),
    db: Session = Depends(get_db)
):
    query = db.query(Psychologist).filter(Psychologist.status == "APPROVED")

    if country and country.lower() != "todos":
        query = query.filter(Psychologist.country.ilike(f"%{country}%"))

    if city:
        query = query.filter(Psychologist.city.ilike(f"%{city}%"))

    if modality and modality.lower() != "todas":
        if modality.lower() == "virtual":
            query = query.filter(or_(Psychologist.modality == "virtual", Psychologist.modality == "mixta"))
        elif modality.lower() == "presencial":
            query = query.filter(or_(Psychologist.modality == "presencial", Psychologist.modality == "mixta"))
        else:
            query = query.filter(Psychologist.modality.ilike(f"%{modality}%"))

    if specialty and specialty.lower() != "todas":
        query = query.join(Psychologist.specialties).filter(
            or_(Specialty.slug == specialty, Specialty.name.ilike(f"%{specialty}%"))
        )

    if search:
        search_term = f"%{search}%"
        query = query.filter(
            or_(
                Psychologist.full_name.ilike(search_term),
                Psychologist.bio.ilike(search_term),
                Psychologist.city.ilike(search_term),
                Psychologist.therapeutic_approach.ilike(search_term),
            )
        )

    psychologists = query.order_by(Psychologist.full_name.asc()).all()
    
    # Format response adding parish summary if available
    result = []
    for p in psychologists:
        parish_info = None
        if p.endorsement:
            parish_info = f"{p.endorsement.parish_name} ({p.endorsement.diocese})"
        item = PsychologistPublicOut(
            id=p.id,
            full_name=p.full_name,
            country=p.country,
            city=p.city,
            bio=p.bio,
            therapeutic_approach=p.therapeutic_approach,
            modality=p.modality,
            address=p.address,
            photo_url=p.photo_url,
            years_experience=p.years_experience,
            whatsapp=p.whatsapp,
            email=p.email,
            specialties=p.specialties,
            credentials=p.credentials,
            parish_summary=parish_info
        )
        result.append(item)
    return result

@router.get("/stats", response_model=LatamStatsOut)
def get_directory_stats(db: Session = Depends(get_db)):
    approved_count = db.query(Psychologist).filter(Psychologist.status == "APPROVED").count()
    pending_count = db.query(Psychologist).filter(Psychologist.status == "PENDING").count()
    
    # Distinct countries
    countries = db.query(Psychologist.country).filter(Psychologist.status == "APPROVED").distinct().all()
    specialties_count = db.query(Specialty).count()

    return LatamStatsOut(
        total_approved=approved_count,
        total_pending=pending_count,
        countries_count=len(countries),
        specialties_count=specialties_count
    )

@router.get("/{psychologist_id}", response_model=PsychologistPublicOut)
def get_psychologist_detail(psychologist_id: int, db: Session = Depends(get_db)):
    p = db.query(Psychologist).filter(
        Psychologist.id == psychologist_id,
        Psychologist.status == "APPROVED"
    ).first()
    if not p:
        raise HTTPException(status_code=404, detail="Especialista no encontrado o aún no validado por el comité")
    
    parish_info = None
    if p.endorsement:
        parish_info = f"{p.endorsement.parish_name} ({p.endorsement.diocese})"

    return PsychologistPublicOut(
        id=p.id,
        full_name=p.full_name,
        country=p.country,
        city=p.city,
        bio=p.bio,
        therapeutic_approach=p.therapeutic_approach,
        modality=p.modality,
        address=p.address,
        photo_url=p.photo_url,
        years_experience=p.years_experience,
        whatsapp=p.whatsapp,
        email=p.email,
        specialties=p.specialties,
        credentials=p.credentials,
        parish_summary=parish_info
    )
