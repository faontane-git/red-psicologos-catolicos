from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import Specialty
from app.schemas.schemas import SpecialtyOut

router = APIRouter(prefix="/specialties", tags=["Especialidades"])

@router.get("", response_model=List[SpecialtyOut])
def get_specialties(db: Session = Depends(get_db)):
    return db.query(Specialty).order_by(Specialty.name.asc()).all()
