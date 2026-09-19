# Red de Psicólogos Católicos (Latinoamérica)

**Propuesta de Proyecto:** Red de Psicólogos Católicos  
**Preparado y Dirigido por:** Ing. Fabrizzio Ontaneda  
**Fase 1:** Directorio Seguro y Proceso de Validación Eclesial y Profesional

---

## 📌 Propósito de la Plataforma

Crear un espacio de confianza donde los fieles católicos de toda Latinoamérica puedan encontrar ayuda psicológica profesional, con la absoluta tranquilidad de que la terapia respetará e integrará la fe, la moral y la antropología cristiana.

### Pilares Fundamentales (Fase 1)
1. **Filtro de Admisión Riguroso:** Los profesionales no se registran libremente; presentan su título profesional habilitante y aval eclesial (carta del párroco o movimiento). El comité de validación revisa y aprueba cada perfil manualmente.
2. **Buscador Especializado para Latam:** Búsqueda rápida filtrando por país (Ecuador, México, Colombia, Argentina, Perú, etc.), ciudad, área de especialidad (Matrimonio y Familia, Jóvenes, Adicciones, Duelo, etc.) y modalidad (Virtual o Presencial).
3. **Contacto Privado y Directo (Modelo Puente):** La plataforma actúa como un puente seguro. El consultante contacta directamente al WhatsApp o correo del especialista mediante un mensaje cordial y profesional predefinido, sin almacenar historiales ni datos clínicos de pacientes en la web.
4. **Comité de Validación:** Panel interno con métricas en tiempo real para aprobar, rechazar u observar postulaciones.

---

## 🛠️ Stack Tecnológico

- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS + Lucide Icons
- **Backend:** FastAPI (Python) + Pydantic v2 + SQLAlchemy ORM
- **Base de Datos:** PostgreSQL 16 (con `docker-compose.yml` y fallback automático SQLite para desarrollo instantáneo)
- **Despliegue / Contenedores:** Docker Compose

---

## 🔐 Credenciales del Comité de Admisión (Acceso Inicial)

- **URL de Acceso:** Pestaña "Comité" en la barra de navegación (`http://localhost:5173`)
- **Correo Institucional:** `comite@redpsicologos.org`
- **Contraseña:** `ComiteCatolico2026*`
*(En la interfaz encontrará un botón de autocompletado para ingresar con un solo clic durante demostraciones).*
---

## 🚀 Instrucciones de Ejecución

### 1. Iniciar Base de Datos PostgreSQL (Opcional si usas Docker)
```bash
docker-compose up -d
```
*(Si no tienes Docker encendido, el backend se conectará automáticamente a SQLite local para pruebas inmediatas).*

### 2. Iniciar el Backend (FastAPI)
```bash
cd backend
# Activar entorno virtual existente
.\venv\Scripts\activate
# Iniciar servidor Uvicorn
uvicorn app.main:app --reload --port 8000
```
- API pública y endpoints: `http://localhost:8000`
- Documentación interactiva Swagger UI: `http://localhost:8000/docs`

### 3. Iniciar el Frontend (React + Vite)
En una nueva terminal:
```bash
cd frontend
npm run dev
```
- Abrir en el navegador: `http://localhost:5173`

---

## 📋 Estructura del Proyecto

```
red-psicologos-catolicos/
├── docker-compose.yml             # Servicio PostgreSQL 16
├── backend/
│   ├── app/
│   │   ├── main.py                # Servidor FastAPI, CORS, montaje de /uploads
│   │   ├── config.py              # Variables de entorno y ajustes
│   │   ├── database.py            # Motor SQLAlchemy con soporte dual PostgreSQL/SQLite
│   │   ├── auth.py                # Autenticación JWT y hashing PBKDF2
│   │   ├── models/                # Modelos ORM (Psychologist, CommitteeMember, Specialty, etc.)
│   │   ├── schemas/               # Modelos Pydantic v2 (admisión con photo_url y cv_url)
│   │   ├── routes/                # Endpoints (directory, admission, admin, specialties, auth, upload)
│   │   └── seed.py                # Datos iniciales e integrantes del comité
│   ├── uploads/                   # Directorio estático de fotos y CVs en PDF
│   │   ├── photos/
│   │   └── cvs/
│   ├── requirements.txt           # Dependencias Python
│   └── test_api.py                # Suite de pruebas automatizadas
└── frontend/
    ├── src/
    │   ├── types/                 # Tipos TypeScript
    │   ├── services/              # Cliente API y fallback de almacenamiento local
    │   ├── data/                  # Datos iniciales para desarrollo
    │   ├── components/            # Navbar, Footer, SearchFilters, PsychologistCard, ProfileModal, PrivacyBanner
    │   └── pages/                 # HomePage, DirectoryPage, AdmissionPage, EthicsPage, AdminPage
    └── package.json
```
