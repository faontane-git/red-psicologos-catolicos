import hashlib
import os
import secrets
from datetime import datetime, timedelta
from typing import Optional
import jwt
from fastapi import Depends, HTTPException, Header, status
from sqlalchemy.orm import Session
from app.config import settings
from app.database import get_db
from app.models.models import CommitteeMember

JWT_SECRET = settings.COMMITTEE_SECRET_KEY
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 # 24 horas

def hash_password(password: str) -> str:
    salt = secrets.token_hex(16)
    key = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt.encode("utf-8"), 100000)
    return f"{salt}${key.hex()}"

def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        salt, key = hashed_password.split("$", 1)
        new_key = hashlib.pbkdf2_hmac("sha256", plain_password.encode("utf-8"), salt.encode("utf-8"), 100000)
        return secrets.compare_digest(new_key.hex(), key)
    except Exception:
        return False

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET, algorithm=ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str) -> Optional[dict]:
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[ALGORITHM])
        return payload
    except Exception:
        return None

def get_current_committee_member(
    authorization: Optional[str] = Header(None),
    x_committee_key: Optional[str] = Header(None),
    db: Session = Depends(get_db)
) -> CommitteeMember:
    # 1. Check Bearer JWT Token
    if authorization and authorization.startswith("Bearer "):
        token = authorization.split(" ", 1)[1].strip()
        payload = decode_access_token(token)
        if payload and "sub" in payload:
            email = payload["sub"]
            user = db.query(CommitteeMember).filter(
                CommitteeMember.email == email,
                CommitteeMember.is_active == True
            ).first()
            if user:
                return user

    # 2. Check fallback x-committee-key header
    if x_committee_key and x_committee_key == settings.COMMITTEE_SECRET_KEY:
        user = db.query(CommitteeMember).first()
        if user:
            return user
        return CommitteeMember(
            id=1,
            email="comite@redpsicologos.org",
            full_name="Comité de Validación Central",
            role="ADMIN"
        )

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Acceso no autorizado. Inicie sesión como miembro del comité.",
        headers={"WWW-Authenticate": "Bearer"}
    )
