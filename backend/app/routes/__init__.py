from app.routes.directory import router as directory_router
from app.routes.admission import router as admission_router
from app.routes.admin import router as admin_router
from app.routes.specialties import router as specialties_router
from app.routes.auth import router as auth_router
from app.routes.upload import router as upload_router

__all__ = ["directory_router", "admission_router", "admin_router", "specialties_router", "auth_router", "upload_router"]
