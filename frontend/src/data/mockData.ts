import type { Psychologist, Specialty, PsychologistAdmin } from '../types';

export const LATAM_COUNTRIES = [
  "Todos",
  "Argentina",
  "Bolivia",
  "Chile",
  "Colombia",
  "Costa Rica",
  "Ecuador",
  "El Salvador",
  "Guatemala",
  "Honduras",
  "México",
  "Nicaragua",
  "Panamá",
  "Paraguay",
  "Perú",
  "República Dominicana",
  "Uruguay",
  "Venezuela"
];

export const INITIAL_SPECIALTIES: Specialty[] = [
  {
    id: 1,
    name: "Matrimonio y Familia",
    slug: "matrimonio-y-familia",
    description: "Terapia conyugal, resolución de conflictos de pareja, crianza conyugal y fortalecimiento del vínculo sacramental."
  },
  {
    id: 2,
    name: "Jóvenes y Adolescentes",
    slug: "jovenes-y-adolescentes",
    description: "Crisis de identidad, relación con los padres, autoestima, sentido de vida y manejo emocional en la juventud."
  },
  {
    id: 3,
    name: "Adicciones y Conductas Compulsivas",
    slug: "adicciones",
    description: "Tratamiento de adicciones químicas, pornografía, ludopatía y dependencias afectivas bajo una mirada restaurativa."
  },
  {
    id: 4,
    name: "Duelo y Pérdida",
    slug: "duelo-y-perdida",
    description: "Acompañamiento ante el fallecimiento de seres queridos, rupturas, aborto y pérdidas significativas con esperanza cristiana."
  },
  {
    id: 5,
    name: "Ansiedad y Depresión",
    slug: "ansiedad-y-depresion",
    description: "Herramientas clínicas cognitivas y existenciales para el alivio de la angustia, ataques de pánico y estados depresivos."
  },
  {
    id: 6,
    name: "Orientación Vocacional",
    slug: "orientacion-vocacional",
    description: "Discernimiento del proyecto de vida personal, profesional y estado de vida (matrimonio, vida consagrada, laicado)."
  },
  {
    id: 7,
    name: "Acompañamiento Espiritual y Psicológico",
    slug: "acompanamiento-espiritual-psicologico",
    description: "Integración de la dimensión psicológica con la vida de oración, escrupulosidad y heridas interiores."
  }
];

export const INITIAL_PSYCHOLOGISTS: Psychologist[] = [
  {
    id: 1,
    full_name: "Dra. María Elena Benalcázar",
    country: "Ecuador",
    city: "Quito",
    bio: "Psicóloga clínica y terapeuta conyugal con más de 12 años de trayectoria. Dedicada a restaurar matrimonios y familias bajo el magisterio de la Iglesia Católica y la Teología del Cuerpo de San Juan Pablo II. Su enfoque integra la terapia sistémica con la visión trascendente del ser humano.",
    therapeutic_approach: "Terapia Sistémica Familiar y Logoterapia Cristiana",
    modality: "mixta",
    address: "Av. González Suárez y Coruña, Edificio La Floresta, Consultorio 402, Quito",
    photo_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    years_experience: 12,
    whatsapp: "593984451209",
    email: "m.benalcazar@redpsicologos.org",
    parish_summary: "Parroquia San Juan María Vianney (Arquidiócesis de Quito)",
    specialties: [
      { id: 1, name: "Matrimonio y Familia", slug: "matrimonio-y-familia" },
      { id: 4, name: "Duelo y Pérdida", slug: "duelo-y-perdida" },
      { id: 7, name: "Acompañamiento Espiritual y Psicológico", slug: "acompanamiento-espiritual-psicologico" }
    ],
    credentials: [
      {
        id: 1,
        degree_title: "Licenciada en Psicología Clínica y Magíster en Ciencias del Matrimonio y Familia",
        institution: "Pontificia Universidad Católica del Ecuador (PUCE) e Instituto Juan Pablo II",
        license_number: "MSP-17092834-CL",
        graduation_year: 2012,
        verified: true
      }
    ]
  },
  {
    id: 2,
    full_name: "Lic. Carlos Morales Sotomayor",
    country: "México",
    city: "Ciudad de México",
    bio: "Especialista en psicología de las adicciones, conductas compulsivas y salud mental en jóvenes. Su trabajo se enfoca en sanar heridas afectivas profundas y acompañar a personas en proceso de liberación y resignificación de su identidad.",
    therapeutic_approach: "Terapia Cognitivo-Conductual y Acompañamiento Integral",
    modality: "virtual",
    address: undefined,
    photo_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80",
    years_experience: 9,
    whatsapp: "525541207890",
    email: "carlos.morales@redpsicologos.org",
    parish_summary: "Parroquia San Josemaría Escrivá (Arquidiócesis de México)",
    specialties: [
      { id: 3, name: "Adicciones y Conductas Compulsivas", slug: "adicciones" },
      { id: 2, name: "Jóvenes y Adolescentes", slug: "jovenes-y-adolescentes" },
      { id: 5, name: "Ansiedad y Depresión", slug: "ansiedad-y-depresion" }
    ],
    credentials: [
      {
        id: 2,
        degree_title: "Licenciado en Psicología con especialidad en Neuropsicología de Adicciones",
        institution: "Universidad Panamericana, México",
        license_number: "CED-PROF-9837190",
        graduation_year: 2015,
        verified: true
      }
    ]
  },
  {
    id: 3,
    full_name: "Dra. Lucía Gómez Restrepo",
    country: "Colombia",
    city: "Bogotá",
    bio: "Psicóloga clínica enfocada en el tratamiento del duelo complicado, angustia existencial y trastornos del estado de ánimo. Trabaja desde una antropología integral que concibe a la persona como unidad biológica, psicológica y espiritual creada para el amor.",
    therapeutic_approach: "Logoterapia y Análisis Existencial de Viktor Frankl",
    modality: "mixta",
    address: "Carrera 7 # 116-50, Consultorio 601, Usaquén, Bogotá",
    photo_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    years_experience: 15,
    whatsapp: "573105554321",
    email: "lucia.gomez@redpsicologos.org",
    parish_summary: "Parroquia Santa Bárbara de Usaquén (Arquidiócesis de Bogotá)",
    specialties: [
      { id: 4, name: "Duelo y Pérdida", slug: "duelo-y-perdida" },
      { id: 5, name: "Ansiedad y Depresión", slug: "ansiedad-y-depresion" },
      { id: 7, name: "Acompañamiento Espiritual y Psicológico", slug: "acompanamiento-espiritual-psicologico" }
    ],
    credentials: [
      {
        id: 3,
        degree_title: "Psicóloga y Especialista en Psicología de la Salud",
        institution: "Pontificia Universidad Javeriana, Bogotá",
        license_number: "COLPSIC-110482",
        graduation_year: 2009,
        verified: true
      }
    ]
  },
  {
    id: 4,
    full_name: "Lic. Mateo Rossi",
    country: "Argentina",
    city: "Buenos Aires",
    bio: "Psicólogo dedicado a la orientación de jóvenes y adultos en procesos de crisis vitales, escrupulosidad religiosa y discernimiento vocacional. Coopera estrechamente con directores espirituales respetando los ámbitos propios de la psicología y la confesión sacramental.",
    therapeutic_approach: "Psicología Tomista y Enfoque Fenomenológico Existencial",
    modality: "virtual",
    address: undefined,
    photo_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    years_experience: 8,
    whatsapp: "5491167890123",
    email: "mateo.rossi@redpsicologos.org",
    parish_summary: "Parroquia San Benito Abad (Arquidiócesis de Buenos Aires)",
    specialties: [
      { id: 6, name: "Orientación Vocacional", slug: "orientacion-vocacional" },
      { id: 7, name: "Acompañamiento Espiritual y Psicológico", slug: "acompanamiento-espiritual-psicologico" },
      { id: 2, name: "Jóvenes y Adolescentes", slug: "jovenes-y-adolescentes" }
    ],
    credentials: [
      {
        id: 4,
        degree_title: "Licenciado en Psicología",
        institution: "Pontificia Universidad Católica Argentina (UCA)",
        license_number: "MN-54210",
        graduation_year: 2016,
        verified: true
      }
    ]
  },
  {
    id: 5,
    full_name: "Lic. Valeria Mendoza Hurtado",
    country: "Perú",
    city: "Lima",
    bio: "Psicoterapeuta familiar y formadora en talleres de noviazgo y paternidad responsable. Brinda acompañamiento respetando los ritmos de cada persona y promoviendo la reconciliación interior.",
    therapeutic_approach: "Psicoterapia Centrada en la Persona con Enfoque Católico",
    modality: "mixta",
    address: "Calle Los Laureles 320, San Isidro, Lima",
    photo_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    years_experience: 11,
    whatsapp: "51993456781",
    email: "valeria.mendoza@redpsicologos.org",
    parish_summary: "Parroquia Nuestra Señora de la Reconciliación (Arquidiócesis de Lima)",
    specialties: [
      { id: 1, name: "Matrimonio y Familia", slug: "matrimonio-y-familia" },
      { id: 2, name: "Jóvenes y Adolescentes", slug: "jovenes-y-adolescentes" },
      { id: 5, name: "Ansiedad y Depresión", slug: "ansiedad-y-depresion" }
    ],
    credentials: [
      {
        id: 5,
        degree_title: "Licenciada en Psicología con mención en Terapia de Pareja",
        institution: "Universidad de Piura (UDEP), Campus Lima",
        license_number: "C.Ps.P. 18239",
        graduation_year: 2013,
        verified: true
      }
    ]
  }
];

export const INITIAL_APPLICATIONS: PsychologistAdmin[] = [
  ...INITIAL_PSYCHOLOGISTS.map((p) => ({
    ...p,
    phone: p.whatsapp,
    status: 'APPROVED' as const,
    committee_notes: 'Validación de título universitario y aval eclesial completada satisfactoriamente.',
    verified_at: '2026-03-01T10:00:00Z',
    created_at: '2026-02-15T10:00:00Z',
    endorsement: {
      parish_name: p.parish_summary || 'Parroquia local',
      diocese: p.country,
      priest_reference_name: 'Párroco Titular',
      priest_contact: 'Contacto verificado',
      moral_commitment_accepted: true,
      verified: true
    }
  })),
  {
    id: 6,
    full_name: "Lic. Francisco Javier Viteri",
    country: "Ecuador",
    city: "Guayaquil",
    bio: "Psicólogo clínico con formación en manejo de estrés laboral, duelo y orientación a jóvenes. Postulante a la Red de Psicólogos Católicos para ofrecer atención presencial en Guayaquil y online para Latinoamérica.",
    therapeutic_approach: "Terapia Racional Emotiva y Enfoque Personalista Cristiano",
    modality: "mixta",
    address: "Urdesa Central, Calle Guayacanes 412, Guayaquil",
    photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    years_experience: 6,
    whatsapp: "593998765432",
    phone: "+593 99 876 5432",
    email: "francisco.viteri@ejemplo.com",
    status: 'PENDING',
    committee_notes: "Solicitud recibida. Pendiente de cotejo de número de registro en SENESCYT y llamada al párroco de San Antonio María Claret.",
    created_at: '2026-09-18T15:30:00Z',
    specialties: [
      { id: 2, name: "Jóvenes y Adolescentes", slug: "jovenes-y-adolescentes" },
      { id: 5, name: "Ansiedad y Depresión", slug: "ansiedad-y-depresion" }
    ],
    credentials: [
      {
        id: 6,
        degree_title: "Licenciado en Psicología",
        institution: "Universidad Católica de Santiago de Guayaquil (UCSG)",
        license_number: "SENESCYT-1002-18-847291",
        graduation_year: 2018,
        verified: false
      }
    ],
    endorsement: {
      parish_name: "Parroquia San Antonio María Claret",
      diocese: "Arquidiócesis de Guayaquil",
      movement_or_community: "Encuentro Matrimonial / Catequesis de Confirmación",
      priest_reference_name: "Pbro. Diego Alarcón",
      priest_contact: "+593 4 238 9011",
      moral_commitment_accepted: true,
      verified: false
    }
  }
];
