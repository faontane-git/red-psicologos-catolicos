export type Modality = 'virtual' | 'presencial' | 'mixta' | 'todas';

export type ApplicationStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CHANGES_REQUESTED';

export interface Specialty {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export interface AcademicCredential {
  id?: number;
  degree_title: string;
  institution: string;
  license_number: string;
  graduation_year?: number;
  document_url?: string;
  verified?: boolean;
}

export interface EcclesialEndorsement {
  id?: number;
  parish_name: string;
  diocese: string;
  movement_or_community?: string;
  priest_reference_name: string;
  priest_contact: string;
  document_url?: string;
  moral_commitment_accepted: boolean;
  verified?: boolean;
}

export interface Psychologist {
  id: number;
  full_name: string;
  country: string;
  city: string;
  bio: string;
  therapeutic_approach: string;
  modality: 'virtual' | 'presencial' | 'mixta';
  address?: string;
  photo_url: string;
  cv_url?: string;
  years_experience: number;
  whatsapp: string;
  email: string;
  specialties: Specialty[];
  credentials: AcademicCredential[];
  parish_summary?: string;
}

export interface PsychologistAdmin extends Psychologist {
  phone: string;
  status: ApplicationStatus;
  committee_notes?: string;
  verified_at?: string;
  created_at: string;
  endorsement?: EcclesialEndorsement;
}

export interface AdmissionFormData {
  full_name: string;
  email: string;
  phone: string;
  whatsapp: string;
  country: string;
  city: string;
  bio: string;
  therapeutic_approach: string;
  modality: 'virtual' | 'presencial' | 'mixta';
  address?: string;
  photo_url: string;
  cv_url: string;
  years_experience: number;
  specialty_ids: number[];
  credentials: {
    degree_title: string;
    institution: string;
    license_number: string;
    graduation_year?: number;
    document_url?: string;
  }[];
  endorsement: {
    parish_name: string;
    diocese: string;
    movement_or_community?: string;
    priest_reference_name: string;
    priest_contact: string;
    document_url?: string;
    moral_commitment_accepted: boolean;
  };
}

export interface DirectoryFilters {
  country: string;
  city: string;
  modality: string;
  specialty: string;
  search: string;
}

export interface LatamStats {
  total_approved: number;
  total_pending: number;
  countries_count: number;
  specialties_count: number;
}

export interface CommitteeUser {
  id: number;
  email: string;
  full_name: string;
  role: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  user: CommitteeUser;
}
