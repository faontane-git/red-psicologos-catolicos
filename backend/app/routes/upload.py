import os
import shutil
import uuid
from fastapi import APIRouter, UploadFile, File, HTTPException, status

router = APIRouter(prefix="/upload", tags=["Carga de Archivos"])

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")
PHOTOS_DIR = os.path.join(UPLOAD_DIR, "photos")
CVS_DIR = os.path.join(UPLOAD_DIR, "cvs")

os.makedirs(PHOTOS_DIR, exist_ok=True)
os.makedirs(CVS_DIR, exist_ok=True)

ALLOWED_PHOTO_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}

@router.post("/photo")
async def upload_photo(file: UploadFile = File(...)):
    # 1. Validate file extension
    filename = file.filename or ""
    _, ext = os.path.splitext(filename.lower())
    if ext not in ALLOWED_PHOTO_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Formato de imagen no permitido ({ext}). Debe ser JPG, JPEG, PNG o WEBP."
        )

    # 2. Generate unique filename and save
    unique_name = f"photo_{uuid.uuid4().hex[:12]}{ext}"
    dest_path = os.path.join(PHOTOS_DIR, unique_name)

    with open(dest_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "success": True,
        "url": f"/uploads/photos/{unique_name}",
        "filename": unique_name,
        "original_name": filename
    }

@router.post("/cv")
async def upload_cv(file: UploadFile = File(...)):
    # 1. Validate PDF extension
    filename = file.filename or ""
    _, ext = os.path.splitext(filename.lower())
    if ext != ".pdf":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Formato inválido ({ext}). El Curriculum Vitae debe ser obligatoriamente un archivo en formato PDF (.pdf)."
        )

    # 2. Generate unique filename and save
    unique_name = f"cv_{uuid.uuid4().hex[:12]}.pdf"
    dest_path = os.path.join(CVS_DIR, unique_name)

    with open(dest_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "success": True,
        "url": f"/uploads/cvs/{unique_name}",
        "filename": unique_name,
        "original_name": filename
    }
