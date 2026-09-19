from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import CommitteeMember
from app.schemas.schemas import LoginRequest, TokenResponse, CommitteeMemberOut
from app.auth import verify_password, create_access_token, get_current_committee_member

router = APIRouter(prefix="/auth", tags=["Autenticación del Comité"])

@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    email = payload.email.strip().lower()
    user = db.query(CommitteeMember).filter(
        CommitteeMember.email == email,
        CommitteeMember.is_active == True
    ).first()

    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales incorrectas. Verifique su correo o contraseña del comité.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Generate token
    token = create_access_token(data={"sub": user.email, "role": user.role, "name": user.full_name})
    
    return TokenResponse(
        access_token=token,
        token_type="bearer",
        user=CommitteeMemberOut(
            id=user.id,
            email=user.email,
            full_name=user.full_name,
            role=user.role
        )
    )

@router.get("/me", response_model=CommitteeMemberOut)
def get_current_user(current_user: CommitteeMember = Depends(get_current_committee_member)):
    return current_user
