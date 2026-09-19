from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, EmailStr, Field

# --- Specialty Schemas ---
class SpecialtyBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None

class SpecialtyOut(SpecialtyBase):
    id: int

    class Config:
        from_attributes = True

# --- Academic Credential Schemas ---
class AcademicCredentialCreate(BaseModel):
    degree_title: str = Field(..., description="Ej. Licenciatura en Psicología Clínica")
    institution: str = Field(..., description="Universidad o institución emisora")
    license_number: str = Field(..., description="Número de colegiatura o registro profesional")
    graduation_year: Optional[int] = None
    document_url: Optional[str] = None

class AcademicCredentialOut(AcademicCredentialCreate):
    id: int
    verified: bool

    class Config:
        from_attributes = True

# --- Ecclesial Endorsement Schemas ---
class EcclesialEndorsementCreate(BaseModel):
    parish_name: str = Field(..., description="Parroquia habitual de asistencia")
    diocese: str = Field(..., description="Diócesis o Arquidiócesis")
    movement_or_community: Optional[str] = Field(None, description="Movimiento eclesial o apostolado")
    priest_reference_name: str = Field(..., description="Nombre del sacerdote o párroco de referencia")
    priest_contact: str = Field(..., description="Teléfono o correo del sacerdote de referencia")
    document_url: Optional[str] = Field(None, description="Enlace a carta o certificado de aval")
    moral_commitment_accepted: bool = Field(..., description="Aceptación de la antropología y moral católica")

class EcclesialEndorsementOut(EcclesialEndorsementCreate):
    id: int
    verified: bool

    class Config:
        from_attributes = True

# --- Psychologist Schemas ---
class AdmissionCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    whatsapp: str
    country: str
    city: str
    bio: str
    therapeutic_approach: str
    modality: str # virtual, presencial, mixta
    address: Optional[str] = None
    photo_url: str = Field(..., min_length=5, description="Foto obligatoria del profesional a presentarse en el directorio")
    cv_url: str = Field(..., min_length=5, description="Curriculum Vitae en formato PDF obligatorio")
    years_experience: int = 1
    specialty_ids: List[int] = []
    credentials: List[AcademicCredentialCreate]
    endorsement: EcclesialEndorsementCreate

class PsychologistPublicOut(BaseModel):
    id: int
    full_name: str
    country: str
    city: str
    bio: str
    therapeutic_approach: str
    modality: str
    address: Optional[str] = None
    photo_url: Optional[str] = None
    cv_url: Optional[str] = None
    years_experience: int
    whatsapp: str
    email: str
    specialties: List[SpecialtyOut]
    credentials: List[AcademicCredentialOut]
    parish_summary: Optional[str] = None

    class Config:
        from_attributes = True

class PsychologistAdminOut(BaseModel):
    id: int
    full_name: str
    email: str
    phone: str
    whatsapp: str
    country: str
    city: str
    bio: str
    therapeutic_approach: str
    modality: str
    address: Optional[str] = None
    photo_url: Optional[str] = None
    cv_url: Optional[str] = None
    years_experience: int
    status: str
    committee_notes: Optional[str] = None
    verified_at: Optional[datetime] = None
    created_at: datetime
    specialties: List[SpecialtyOut]
    credentials: List[AcademicCredentialOut]
    endorsement: Optional[EcclesialEndorsementOut] = None

    class Config:
        from_attributes = True

class StatusUpdateSchema(BaseModel):
    status: str = Field(..., description="APPROVED, REJECTED, CHANGES_REQUESTED, PENDING")
    committee_notes: Optional[str] = None

class LatamStatsOut(BaseModel):
    total_approved: int
    total_pending: int
    countries_count: int
    specialties_count: int

# --- Auth Schemas ---
class LoginRequest(BaseModel):
    email: str = Field(..., description="Correo del miembro del comité")
    password: str = Field(..., description="Contraseña de acceso")

class CommitteeMemberOut(BaseModel):
    id: int
    email: str
    full_name: str
    role: str

    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: CommitteeMemberOut
