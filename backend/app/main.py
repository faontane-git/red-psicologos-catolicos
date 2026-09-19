import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import engine, Base, SessionLocal
from app.models.models import * # Ensure all models are registered
from app.seed import seed_database
import os
from starlette.staticfiles import StaticFiles
from app.routes import directory_router, admission_router, admin_router, specialties_router, auth_router, upload_router

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(name)s - %(message)s")
logger = logging.getLogger("main")

def init_db():
    logger.info("Inicializando modelos y tablas de base de datos...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        logger.info("Verificando datos iniciales de la Red...")
        seed_database(db)
        logger.info("Base de datos lista para operar.")
    except Exception as e:
        logger.error(f"Error al sembrar datos iniciales: {e}")
    finally:
        db.close()

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield

app = FastAPI(
    title="Red de Psicólogos Católicos API",
    description="API oficial para la Red de Psicólogos Católicos de Latinoamérica. Proyecto ideado por Ing. Fabrizzio Ontaneda.",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(auth_router, prefix=settings.API_V1_STR)
app.include_router(upload_router, prefix=settings.API_V1_STR)
app.include_router(directory_router, prefix=settings.API_V1_STR)
app.include_router(admission_router, prefix=settings.API_V1_STR)
app.include_router(admin_router, prefix=settings.API_V1_STR)
app.include_router(specialties_router, prefix=settings.API_V1_STR)

# Mount uploads static directory
UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

@app.get("/")
def read_root():
    return {
        "project": "Red de Psicólogos Católicos",
        "description": "Plataforma de conexión profesional con respaldo ético, moral y eclesial católico para Latinoamérica.",
        "author": "Ing. Fabrizzio Ontaneda",
        "version": "1.0.0",
        "docs_url": "/docs",
        "health": "healthy"
    }

if __name__ == "__main__":
    import uvicorn
    init_db()
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
