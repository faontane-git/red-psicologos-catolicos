from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import Psychologist, Specialty, AcademicCredential, EcclesialEndorsement
from app.schemas.schemas import AdmissionCreate, PsychologistAdminOut

router = APIRouter(prefix="/admission", tags=["Admisión y Validación"])

@router.post("", status_code=status.HTTP_201_CREATED)
def submit_admission(data: AdmissionCreate, db: Session = Depends(get_db)):
    # 1. Check if email already registered
    existing = db.query(Psychologist).filter(Psychologist.email == data.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ya existe una postulación o registro con este correo electrónico."
        )

    # 2. Require photo
    if not data.photo_url or len(data.photo_url.strip()) < 5:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="La fotografía profesional del psicólogo es obligatoria para su presentación en el directorio."
        )

    # 3. Require CV in PDF format
    if not data.cv_url or not data.cv_url.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El Curriculum Vitae (CV) en formato PDF (.pdf) es de carácter obligatorio."
        )

    # 4. Require moral commitment acceptance
    if not data.endorsement.moral_commitment_accepted:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Es requisito indispensable aceptar el compromiso ético y antropológico cristiano."
        )

    # 5. Create Psychologist profile in PENDING status
    new_psychologist = Psychologist(
        full_name=data.full_name,
        email=data.email,
        phone=data.phone,
        whatsapp=data.whatsapp,
        country=data.country,
        city=data.city,
        bio=data.bio,
        therapeutic_approach=data.therapeutic_approach,
        modality=data.modality,
        address=data.address,
        photo_url=data.photo_url.strip(),
        cv_url=data.cv_url.strip(),
        years_experience=data.years_experience,
        status="PENDING"
    )
    db.add(new_psychologist)
    db.flush() # obtain generated id

    # 4. Attach Specialties
    if data.specialty_ids:
        specs = db.query(Specialty).filter(Specialty.id.in_(data.specialty_ids)).all()
        new_psychologist.specialties = specs

    # 5. Attach Academic Credentials
    for cred_data in data.credentials:
        cred = AcademicCredential(
            psychologist_id=new_psychologist.id,
            degree_title=cred_data.degree_title,
            institution=cred_data.institution,
            license_number=cred_data.license_number,
            graduation_year=cred_data.graduation_year,
            document_url=cred_data.document_url,
            verified=False
        )
        db.add(cred)

    # 6. Attach Ecclesial Endorsement
    endorsement = EcclesialEndorsement(
        psychologist_id=new_psychologist.id,
        parish_name=data.endorsement.parish_name,
        diocese=data.endorsement.diocese,
        movement_or_community=data.endorsement.movement_or_community,
        priest_reference_name=data.endorsement.priest_reference_name,
        priest_contact=data.endorsement.priest_contact,
        document_url=data.endorsement.document_url,
        moral_commitment_accepted=data.endorsement.moral_commitment_accepted,
        verified=False
    )
    db.add(endorsement)

    db.commit()
    db.refresh(new_psychologist)

    return {
        "success": True,
        "message": "Postulación recibida exitosamente. El comité revisará su título profesional y aval eclesial.",
        "psychologist_id": new_psychologist.id,
        "status": new_psychologist.status
    }
