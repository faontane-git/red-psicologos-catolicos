from datetime import datetime
from sqlalchemy import (
    Column, Integer, String, Text, Boolean, DateTime, ForeignKey, Table
)
from sqlalchemy.orm import relationship
from app.database import Base

# Association table for psychologists and specialties
psychologist_specialties = Table(
    "psychologist_specialties",
    Base.metadata,
    Column("psychologist_id", Integer, ForeignKey("psychologists.id", ondelete="CASCADE"), primary_key=True),
    Column("specialty_id", Integer, ForeignKey("specialties.id", ondelete="CASCADE"), primary_key=True),
)

class Specialty(Base):
    __tablename__ = "specialties"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), unique=True, nullable=False, index=True)
    slug = Column(String(120), unique=True, nullable=False)
    description = Column(Text, nullable=True)

    psychologists = relationship("Psychologist", secondary=psychologist_specialties, back_populates="specialties")


class AcademicCredential(Base):
    __tablename__ = "academic_credentials"

    id = Column(Integer, primary_key=True, index=True)
    psychologist_id = Column(Integer, ForeignKey("psychologists.id", ondelete="CASCADE"), nullable=False)
    degree_title = Column(String(200), nullable=False)
    institution = Column(String(200), nullable=False)
    license_number = Column(String(100), nullable=False)
    graduation_year = Column(Integer, nullable=True)
    document_url = Column(String(500), nullable=True)
    verified = Column(Boolean, default=False)

    psychologist = relationship("Psychologist", back_populates="credentials")


class EcclesialEndorsement(Base):
    __tablename__ = "ecclesial_endorsements"

    id = Column(Integer, primary_key=True, index=True)
    psychologist_id = Column(Integer, ForeignKey("psychologists.id", ondelete="CASCADE"), nullable=False, unique=True)
    parish_name = Column(String(200), nullable=False)
    diocese = Column(String(200), nullable=False)
    movement_or_community = Column(String(200), nullable=True)
    priest_reference_name = Column(String(200), nullable=False)
    priest_contact = Column(String(150), nullable=False)
    document_url = Column(String(500), nullable=True)
    moral_commitment_accepted = Column(Boolean, default=False, nullable=False)
    verified = Column(Boolean, default=False)

    psychologist = relationship("Psychologist", back_populates="endorsement")


class Psychologist(Base):
    __tablename__ = "psychologists"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(180), nullable=False, index=True)
    email = Column(String(150), unique=True, nullable=False, index=True)
    phone = Column(String(50), nullable=False)
    whatsapp = Column(String(50), nullable=False)
    country = Column(String(80), nullable=False, index=True)
    city = Column(String(100), nullable=False, index=True)
    bio = Column(Text, nullable=False)
    therapeutic_approach = Column(String(250), nullable=False)
    modality = Column(String(50), nullable=False, index=True) # virtual, presencial, mixta
    address = Column(String(250), nullable=True)
    photo_url = Column(String(500), nullable=False)
    cv_url = Column(String(500), nullable=True) # Archivo PDF del Curriculum Vitae
    years_experience = Column(Integer, default=1)
    
    # Validation status: PENDING, APPROVED, REJECTED, CHANGES_REQUESTED
    status = Column(String(40), default="PENDING", nullable=False, index=True)
    committee_notes = Column(Text, nullable=True)
    verified_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    specialties = relationship("Specialty", secondary=psychologist_specialties, back_populates="psychologists")
    credentials = relationship("AcademicCredential", back_populates="psychologist", cascade="all, delete-orphan")
    endorsement = relationship("EcclesialEndorsement", uselist=False, back_populates="psychologist", cascade="all, delete-orphan")


class CommitteeMember(Base):
    __tablename__ = "committee_members"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(150), unique=True, nullable=False, index=True)
    full_name = Column(String(180), nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(50), default="ADMIN", nullable=False) # ADMIN, REVIEWER
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
