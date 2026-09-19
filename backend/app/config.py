import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Red de Psicólogos Católicos API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Database configuration
    # Default to PostgreSQL, with fallback support
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "postgresql://postgres:postgrespassword@localhost:5432/red_psicologos"
    )
    
    # Admin committee security key / token (for JWT and signatures)
    COMMITTEE_SECRET_KEY: str = os.getenv(
        "COMMITTEE_SECRET_KEY", 
        "comite-validador-red-catolica-latam-2026-segura-key-32bytes"
    )
    
    # CORS Origins
    CORS_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "*"
    ]

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
