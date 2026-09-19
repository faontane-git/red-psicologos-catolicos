from datetime import datetime
from sqlalchemy.orm import Session
from app.models.models import Psychologist, Specialty, AcademicCredential, EcclesialEndorsement, CommitteeMember

def seed_database(db: Session):
    # 0. Ensure Committee Admin User exists
    admin_user = db.query(CommitteeMember).filter(CommitteeMember.email == "comite@redpsicologos.org").first()
    if not admin_user:
        from app.auth import hash_password
        admin_member = CommitteeMember(
            email="comite@redpsicologos.org",
            full_name="Comité de Validación Central",
            hashed_password=hash_password("ComiteCatolico2026*"),
            role="ADMIN",
            is_active=True
        )
        db.add(admin_member)
        db.commit()

    # Check if specialties already seeded
    if db.query(Specialty).count() > 0:
        return

    # 1. Create Specialties
    specialties_data = [
        {
            "name": "Matrimonio y Familia",
            "slug": "matrimonio-y-familia",
            "description": "Terapia conyugal, resolución de conflictos de pareja, crianza conyugal y fortalecimiento del vínculo sacramental."
        },
        {
            "name": "Jóvenes y Adolescentes",
            "slug": "jovenes-y-adolescentes",
            "description": "Crisis de identidad, relación con los padres, autoestima, sentido de vida y manejo emocional en la juventud."
        },
        {
            "name": "Adicciones y Conductas Compulsivas",
            "slug": "adicciones",
            "description": "Tratamiento de adicciones químicas, pornografía, ludopatía y dependencias afectivas bajo una mirada restaurativa."
        },
        {
            "name": "Duelo y Pérdida",
            "slug": "duelo-y-perdida",
            "description": "Acompañamiento ante el fallecimiento de seres queridos, rupturas, aborto y pérdidas significativas con esperanza cristiana."
        },
        {
            "name": "Ansiedad y Depresión",
            "slug": "ansiedad-y-depresion",
            "description": "Herramientas clínicas cognitivas y existenciales para el alivio de la angustia, ataques de pánico y estados depresivos."
        },
        {
            "name": "Orientación Vocacional",
            "slug": "orientacion-vocacional",
            "description": "Discernimiento del proyecto de vida personal, profesional y estado de vida (matrimonio, vida consagrada, laicado)."
        },
        {
            "name": "Acompañamiento Espiritual y Psicológico",
            "slug": "acompanamiento-espiritual-psicologico",
            "description": "Integración de la dimensión psicológica con la vida de oración, escrupulosidad y heridas interiores."
        }
    ]

    specs_map = {}
    for item in specialties_data:
        spec = Specialty(**item)
        db.add(spec)
        db.flush()
        specs_map[item["slug"]] = spec

    # 2. Seed Approved Psychologists across Latam
    psychologists_data = [
        {
            "full_name": "Dra. María Elena Benalcázar",
            "email": "m.benalcazar@redpsicologos.org",
            "phone": "+593 98 445 1209",
            "whatsapp": "593984451209",
            "country": "Ecuador",
            "city": "Quito",
            "bio": "Psicóloga clínica y terapeuta conyugal con más de 12 años de trayectoria. Dedicada a restaurar matrimonios y familias bajo el magisterio de la Iglesia Católica y la Teología del Cuerpo de San Juan Pablo II. Su enfoque integra la terapia sistémica con la visión trascendente del ser humano.",
            "therapeutic_approach": "Terapia Sistémica Familiar y Logoterapia Cristiana",
            "modality": "mixta",
            "address": "Av. González Suárez y Coruña, Edificio La Floresta, Consultorio 402, Quito",
            "photo_url": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
            "years_experience": 12,
            "status": "APPROVED",
            "committee_notes": "Título y acreditación colegiada validados. Aval firmado por párroco Pbro. Patricio V.",
            "verified_at": datetime.utcnow(),
            "specialty_slugs": ["matrimonio-y-familia", "duelo-y-perdida", "acompanamiento-espiritual-psicologico"],
            "credential": {
                "degree_title": "Licenciada en Psicología Clínica y Magíster en Ciencias del Matrimonio y Familia",
                "institution": "Pontificia Universidad Católica del Ecuador (PUCE) e Instituto Juan Pablo II",
                "license_number": "MSP-17092834-CL",
                "graduation_year": 2012,
                "verified": True
            },
            "endorsement": {
                "parish_name": "Parroquia San Juan María Vianney",
                "diocese": "Arquidiócesis de Quito",
                "movement_or_community": "Pastoral Familiar Arquidiocesana / Regnum Christi",
                "priest_reference_name": "Pbro. Patricio Valdivieso (Párroco)",
                "priest_contact": "+593 2 245 9901 / p.patricio@arquidiocesisquito.ec",
                "moral_commitment_accepted": True,
                "verified": True
            }
        },
        {
            "full_name": "Lic. Carlos Morales Sotomayor",
            "email": "carlos.morales@redpsicologos.org",
            "phone": "+52 55 4120 7890",
            "whatsapp": "525541207890",
            "country": "México",
            "city": "Ciudad de México",
            "bio": "Especialista en psicología de las adicciones, conductas compulsivas y salud mental en jóvenes. Su trabajo se enfoca en sanar heridas afectivas profundas y acompañar a personas en proceso de liberación y resignificación de su identidad.",
            "therapeutic_approach": "Terapia Cognitivo-Conductual y Acompañamiento Integral",
            "modality": "virtual",
            "address": None,
            "photo_url": "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80",
            "years_experience": 9,
            "status": "APPROVED",
            "committee_notes": "Cédula profesional verificada en SEP. Aval del asesor de Pastoral Universitaria.",
            "verified_at": datetime.utcnow(),
            "specialty_slugs": ["adicciones", "jovenes-y-adolescentes", "ansiedad-y-depresion"],
            "credential": {
                "degree_title": "Licenciado en Psicología con especialidad en Neuropsicología de Adicciones",
                "institution": "Universidad Panamericana, México",
                "license_number": "CED-PROF-9837190",
                "graduation_year": 2015,
                "verified": True
            },
            "endorsement": {
                "parish_name": "Parroquia San Josemaría Escrivá",
                "diocese": "Arquidiócesis Primada de México",
                "movement_or_community": "Pastoral Universitaria México",
                "priest_reference_name": "Pbro. Alberto Treviño",
                "priest_contact": "+52 55 5280 4321",
                "moral_commitment_accepted": True,
                "verified": True
            }
        },
        {
            "full_name": "Dra. Lucía Gómez Restrepo",
            "email": "lucia.gomez@redpsicologos.org",
            "phone": "+57 310 555 4321",
            "whatsapp": "573105554321",
            "country": "Colombia",
            "city": "Bogotá",
            "bio": "Psicóloga clínica enfocada en el tratamiento del duelo complicado, angustia existencial y trastornos del estado de ánimo. Trabaja desde una antropología integral que concibe a la persona como unidad biológica, psicológica y espiritual creada para el amor.",
            "therapeutic_approach": "Logoterapia y Análisis Existencial de Viktor Frankl",
            "modality": "mixta",
            "address": "Carrera 7 # 116-50, Consultorio 601, Usaquén, Bogotá",
            "photo_url": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
            "years_experience": 15,
            "status": "APPROVED",
            "committee_notes": "Tarjeta profesional COLPSIC vigente. Certificado de recomendación eclesial presentado.",
            "verified_at": datetime.utcnow(),
            "specialty_slugs": ["duelo-y-perdida", "ansiedad-y-depresion", "acompanamiento-espiritual-psicologico"],
            "credential": {
                "degree_title": "Psicóloga y Especialista en Psicología de la Salud",
                "institution": "Pontificia Universidad Javeriana, Bogotá",
                "license_number": "COLPSIC-110482",
                "graduation_year": 2009,
                "verified": True
            },
            "endorsement": {
                "parish_name": "Parroquia Santa Bárbara de Usaquén",
                "diocese": "Arquidiócesis de Bogotá",
                "movement_or_community": "Comunidad Canção Nova / Emaús Mujeres",
                "priest_reference_name": "Mons. Rafael Obregón",
                "priest_contact": "+57 1 619 4022",
                "moral_commitment_accepted": True,
                "verified": True
            }
        },
        {
            "full_name": "Lic. Mateo Rossi",
            "email": "mateo.rossi@redpsicologos.org",
            "phone": "+54 9 11 6789 0123",
            "whatsapp": "5491167890123",
            "country": "Argentina",
            "city": "Buenos Aires",
            "bio": "Psicólogo dedicado a la orientación de jóvenes y adultos en procesos de crisis vitales, escrupulosidad religiosa y discernimiento vocacional. Coopera estrechamente con directores espirituales respetando los ámbitos propios de la psicología y la confesión sacramental.",
            "therapeutic_approach": "Psicología Tomista y Enfoque Fenomenológico Existencial",
            "modality": "virtual",
            "address": None,
            "photo_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
            "years_experience": 8,
            "status": "APPROVED",
            "committee_notes": "Matrícula Nacional verificada. Avalado por abadía benedictina.",
            "verified_at": datetime.utcnow(),
            "specialty_slugs": ["orientacion-vocacional", "acompanamiento-espiritual-psicologico", "jovenes-y-adolescentes"],
            "credential": {
                "degree_title": "Licenciado en Psicología",
                "institution": "Pontificia Universidad Católica Argentina (UCA)",
                "license_number": "MN-54210",
                "graduation_year": 2016,
                "verified": True
            },
            "endorsement": {
                "parish_name": "Parroquia San Benito Abad",
                "diocese": "Arquidiócesis de Buenos Aires",
                "movement_or_community": "Movimiento de la Palabra de Dios",
                "priest_reference_name": "Pbro. Fernando Sánchez",
                "priest_contact": "+54 11 4771 2309",
                "moral_commitment_accepted": True,
                "verified": True
            }
        },
        {
            "full_name": "Lic. Valeria Mendoza Hurtado",
            "email": "valeria.mendoza@redpsicologos.org",
            "phone": "+51 993 456 781",
            "whatsapp": "51993456781",
            "country": "Perú",
            "city": "Lima",
            "bio": "Psicoterapeuta familiar y formadora en talleres de noviazgo y paternidad responsable. Brinda acompañamiento respetando los ritmos de cada persona y promoviendo la reconciliación interior.",
            "therapeutic_approach": "Psicoterapia Centrada en la Persona con Enfoque Católico",
            "modality": "mixta",
            "address": "Calle Los Laureles 320, San Isidro, Lima",
            "photo_url": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
            "years_experience": 11,
            "status": "APPROVED",
            "committee_notes": "Colegio de Psicólogos del Perú (C.Ps.P. 18239). Aval parroquial verificado.",
            "verified_at": datetime.utcnow(),
            "specialty_slugs": ["matrimonio-y-familia", "jovenes-y-adolescentes", "ansiedad-y-depresion"],
            "credential": {
                "degree_title": "Licenciada en Psicología con mención en Terapia de Pareja",
                "institution": "Universidad de Piura (UDEP), Campus Lima",
                "license_number": "C.Ps.P. 18239",
                "graduation_year": 2013,
                "verified": True
            },
            "endorsement": {
                "parish_name": "Parroquia Nuestra Señora de la Reconciliación",
                "diocese": "Arquidiócesis de Lima",
                "movement_or_community": "Familia Sodálite / Pastoral Matrimonial",
                "priest_reference_name": "Pbro. Juan Pablo Morán",
                "priest_contact": "+51 1 435 6090",
                "moral_commitment_accepted": True,
                "verified": True
            }
        }
    ]

    for p_data in psychologists_data:
        spec_slugs = p_data.pop("specialty_slugs")
        cred_data = p_data.pop("credential")
        end_data = p_data.pop("endorsement")

        p = Psychologist(**p_data)
        db.add(p)
        db.flush()

        # Add specialties
        for slug in spec_slugs:
            if slug in specs_map:
                p.specialties.append(specs_map[slug])

        # Add credential
        cred = AcademicCredential(psychologist_id=p.id, **cred_data)
        db.add(cred)

        # Add endorsement
        endorsement = EcclesialEndorsement(psychologist_id=p.id, **end_data)
        db.add(endorsement)

    # 3. Add a PENDING application for Committee testing
    pending_data = {
        "full_name": "Lic. Francisco Javier Viteri",
        "email": "francisco.viteri@ejemplo.com",
        "phone": "+593 99 876 5432",
        "whatsapp": "593998765432",
        "country": "Ecuador",
        "city": "Guayaquil",
        "bio": "Psicólogo clínico con formación en manejo de estrés laboral, duelo y orientación a jóvenes. Postulante a la Red de Psicólogos Católicos para ofrecer atención presencial en Guayaquil y online para Latinoamérica.",
        "therapeutic_approach": "Terapia Racional Emotiva y Enfoque Personalista Cristiano",
        "modality": "mixta",
        "address": "Urdesa Central, Calle Guayacanes 412, Guayaquil",
        "photo_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
        "years_experience": 6,
        "status": "PENDING",
        "committee_notes": "Solicitud recibida. Pendiente de cotejo de número de registro en SENESCYT y llamada al párroco de San Antonio María Claret.",
        "verified_at": None,
    }
    pending_p = Psychologist(**pending_data)
    db.add(pending_p)
    db.flush()
    pending_p.specialties.append(specs_map["jovenes-y-adolescentes"])
    pending_p.specialties.append(specs_map["ansiedad-y-depresion"])

    pending_cred = AcademicCredential(
        psychologist_id=pending_p.id,
        degree_title="Licenciado en Psicología",
        institution="Universidad Católica de Santiago de Guayaquil (UCSG)",
        license_number="SENESCYT-1002-18-847291",
        graduation_year=2018,
        verified=False
    )
    db.add(pending_cred)

    pending_end = EcclesialEndorsement(
        psychologist_id=pending_p.id,
        parish_name="Parroquia San Antonio María Claret",
        diocese="Arquidiócesis de Guayaquil",
        movement_or_community="Encuentro Matrimonial / Catequesis de Confirmación",
        priest_reference_name="Pbro. Diego Alarcón",
        priest_contact="+593 4 238 9011",
        moral_commitment_accepted=True,
        verified=False
    )
    db.add(pending_end)

    db.commit()
