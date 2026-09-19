"""
Test script to verify FastAPI endpoints, authentication, file uploads, and database initialization
"""
import io
import sys
from fastapi.testclient import TestClient
from app.main import app, init_db

def test_api():
    init_db()
    with TestClient(app) as client:
        # 1. Test Root
        res = client.get("/")
        print("GET / -> Status:", res.status_code, res.json().get("project"))
        assert res.status_code == 200

        # 2. Test Auth Login
        login_res = client.post("/api/v1/auth/login", json={
            "email": "comite@redpsicologos.org",
            "password": "ComiteCatolico2026*"
        })
        assert login_res.status_code == 200
        token = login_res.json()["access_token"]
        auth_headers = {"Authorization": f"Bearer {token}"}
        print("Login exitoso. Token JWT generado.")

        # 3. Test Uploading Photo (Obligatorio)
        fake_photo = io.BytesIO(b"\xff\xd8\xff\xe0\x00\x10JFIF fake image data")
        photo_res = client.post(
            "/api/v1/upload/photo",
            files={"file": ("profile.jpg", fake_photo, "image/jpeg")}
        )
        print("POST /api/v1/upload/photo -> Status:", photo_res.status_code, photo_res.json())
        assert photo_res.status_code == 200
        photo_url = photo_res.json()["url"]

        # 4. Test Uploading CV in PDF format (Obligatorio)
        fake_pdf = io.BytesIO(b"%PDF-1.4\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n%%EOF")
        cv_res = client.post(
            "/api/v1/upload/cv",
            files={"file": ("curriculum_vitae.pdf", fake_pdf, "application/pdf")}
        )
        print("POST /api/v1/upload/cv -> Status:", cv_res.status_code, cv_res.json())
        assert cv_res.status_code == 200
        cv_url = cv_res.json()["url"]

        # 4b. Test Rejecting Non-PDF CV
        fake_docx = io.BytesIO(b"fake docx")
        bad_cv_res = client.post(
            "/api/v1/upload/cv",
            files={"file": ("curriculum.docx", fake_docx, "application/vnd.openxmlformats-officedocument.wordprocessingml.document")}
        )
        print("POST /api/v1/upload/cv (non-pdf) -> Status:", bad_cv_res.status_code)
        assert bad_cv_res.status_code == 400

        # 5. Test Submitting Admission with required photo and PDF CV
        import time
        ts = int(time.time())
        applicant = {
            "full_name": f"Lic. Teresa Noboa {ts}",
            "email": f"teresa.noboa.{ts}@ejemplo.com",
            "phone": "+593 98 765 4321",
            "whatsapp": "593987654321",
            "country": "Ecuador",
            "city": "Quito",
            "bio": "Psicóloga clínica con maestría en neuropsicología y terapia conyugal católica.",
            "therapeutic_approach": "Logoterapia y Terapia Cognitivo-Conductual",
            "modality": "mixta",
            "photo_url": photo_url,
            "cv_url": cv_url,
            "years_experience": 8,
            "specialty_ids": [1, 5],
            "credentials": [
                {
                    "degree_title": "Licenciada en Psicología Clínica",
                    "institution": "Pontificia Universidad Católica del Ecuador",
                    "license_number": f"MSP-QUITO-{ts}",
                    "graduation_year": 2016
                }
            ],
            "endorsement": {
                "parish_name": "Parroquia Nuestra Señora de la Paz",
                "diocese": "Arquidiócesis de Quito",
                "movement_or_community": "Pastoral Familiar",
                "priest_reference_name": "Pbro. Manuel Echeverría",
                "priest_contact": "+593 2 224 8899",
                "moral_commitment_accepted": True
            }
        }
        adm_res = client.post("/api/v1/admission", json=applicant)
        print("POST /api/v1/admission con foto y CV PDF -> Status:", adm_res.status_code, adm_res.json())
        assert adm_res.status_code == 201
        new_id = adm_res.json()["psychologist_id"]

        # 6. Test Admin inspecting application and confirming photo and CV presence
        app_detail = client.get(f"/api/v1/admin/applications/{new_id}", headers=auth_headers)
        assert app_detail.status_code == 200
        detail_data = app_detail.json()
        assert detail_data["photo_url"] == photo_url
        assert detail_data["cv_url"] == cv_url
        print("Verificación de expediente del comité: Foto y CV PDF presentes correctamente.")

    print("\n[EXITO] TODAS LAS PRUEBAS DE CARGA DE ARCHIVOS Y VALIDACION PASARON EXITOSAMENTE!")

if __name__ == "__main__":
    test_api()
