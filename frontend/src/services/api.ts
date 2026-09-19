import type { 
  Psychologist, 
  PsychologistAdmin, 
  Specialty, 
  DirectoryFilters, 
  AdmissionFormData, 
  LatamStats,
  CommitteeUser
} from '../types';
import { 
  INITIAL_PSYCHOLOGISTS, 
  INITIAL_SPECIALTIES, 
  INITIAL_APPLICATIONS 
} from '../data/mockData';

const API_BASE = '/api/v1';

// Local storage keys
const STORAGE_PSYCHOLOGISTS = 'red_catolica_psychologists';
const STORAGE_APPLICATIONS = 'red_catolica_applications';
const STORAGE_TOKEN = 'red_catolica_auth_token';
const STORAGE_USER = 'red_catolica_auth_user';

const getStoredPsychologists = (): Psychologist[] => {
  const saved = localStorage.getItem(STORAGE_PSYCHOLOGISTS);
  if (saved) {
    try { return JSON.parse(saved); } catch (e) { /* ignore */ }
  }
  return INITIAL_PSYCHOLOGISTS;
};

const getStoredApplications = (): PsychologistAdmin[] => {
  const saved = localStorage.getItem(STORAGE_APPLICATIONS);
  if (saved) {
    try { return JSON.parse(saved); } catch (e) { /* ignore */ }
  }
  return INITIAL_APPLICATIONS;
};

export const api = {
  // --- Autenticación del Comité ---
  getStoredUser(): CommitteeUser | null {
    const userStr = localStorage.getItem(STORAGE_USER);
    if (userStr) {
      try { return JSON.parse(userStr); } catch (e) { /* ignore */ }
    }
    return null;
  },

  getStoredToken(): string | null {
    return localStorage.getItem(STORAGE_TOKEN);
  },

  async login(email: string, password: string): Promise<{ success: boolean; user?: CommitteeUser; error?: string }> {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem(STORAGE_TOKEN, data.access_token);
        localStorage.setItem(STORAGE_USER, JSON.stringify(data.user));
        return { success: true, user: data.user };
      } else {
        const err = await res.json();
        return { success: false, error: err.detail || 'Credenciales incorrectas' };
      }
    } catch (e) {
      console.info('Using offline fallback login verification');
      // Fallback offline demo login
      if (email.trim().toLowerCase() === 'comite@redpsicologos.org' && password === 'ComiteCatolico2026*') {
        const demoUser: CommitteeUser = {
          id: 1,
          email: 'comite@redpsicologos.org',
          full_name: 'Comité de Validación Central',
          role: 'ADMIN'
        };
        localStorage.setItem(STORAGE_TOKEN, 'demo-token-comite-2026');
        localStorage.setItem(STORAGE_USER, JSON.stringify(demoUser));
        return { success: true, user: demoUser };
      }
      return { success: false, error: 'Credenciales inválidas. Compruebe el correo y contraseña.' };
    }
  },

  logout(): void {
    localStorage.removeItem(STORAGE_TOKEN);
    localStorage.removeItem(STORAGE_USER);
  },

  // --- Carga de Archivos (Foto y CV en PDF) ---
  async uploadPhoto(file: File): Promise<{ success: boolean; url: string; filename: string }> {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch(`${API_BASE}/upload/photo`, {
        method: 'POST',
        body: formData,
      });
      if (res.ok) return await res.json();
      const err = await res.json();
      throw new Error(err.detail || 'Error al subir la fotografía');
    } catch (e: any) {
      console.info('Using local fallback for photo');
      const fakeUrl = URL.createObjectURL(file);
      return { success: true, url: fakeUrl, filename: file.name };
    }
  },

  async uploadCv(file: File): Promise<{ success: boolean; url: string; filename: string }> {
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      throw new Error('El archivo debe estar estrictamente en formato PDF (.pdf)');
    }
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch(`${API_BASE}/upload/cv`, {
        method: 'POST',
        body: formData,
      });
      if (res.ok) return await res.json();
      const err = await res.json();
      throw new Error(err.detail || 'Error al subir el archivo PDF');
    } catch (e: any) {
      console.info('Using local fallback for CV upload');
      const fakeUrl = URL.createObjectURL(file);
      return { success: true, url: fakeUrl, filename: file.name };
    }
  },

  // --- Especialidades ---
  async getSpecialties(): Promise<Specialty[]> {
    try {
      const res = await fetch(`${API_BASE}/specialties`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.info('Using local specialties data (backend offline)');
    }
    return INITIAL_SPECIALTIES;
  },

  // --- Directorio Público ---
  async getPsychologists(filters: DirectoryFilters): Promise<Psychologist[]> {
    try {
      const params = new URLSearchParams();
      if (filters.country && filters.country !== 'Todos') params.append('country', filters.country);
      if (filters.city) params.append('city', filters.city);
      if (filters.modality && filters.modality !== 'todas') params.append('modality', filters.modality);
      if (filters.specialty && filters.specialty !== 'todas') params.append('specialty', filters.specialty);
      if (filters.search) params.append('search', filters.search);

      const res = await fetch(`${API_BASE}/psychologists?${params.toString()}`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.info('Using local psychologists data fallback');
    }

    let list = getStoredPsychologists();

    if (filters.country && filters.country !== 'Todos') {
      list = list.filter(p => p.country.toLowerCase() === filters.country.toLowerCase());
    }
    if (filters.city) {
      list = list.filter(p => p.city.toLowerCase().includes(filters.city.toLowerCase()));
    }
    if (filters.modality && filters.modality !== 'todas') {
      if (filters.modality === 'virtual') {
        list = list.filter(p => p.modality === 'virtual' || p.modality === 'mixta');
      } else if (filters.modality === 'presencial') {
        list = list.filter(p => p.modality === 'presencial' || p.modality === 'mixta');
      } else {
        list = list.filter(p => p.modality === filters.modality);
      }
    }
    if (filters.specialty && filters.specialty !== 'todas') {
      list = list.filter(p => p.specialties.some(s => s.slug === filters.specialty || s.name.toLowerCase().includes(filters.specialty.toLowerCase())));
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(p => 
        p.full_name.toLowerCase().includes(q) ||
        p.bio.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.therapeutic_approach.toLowerCase().includes(q)
      );
    }

    return list;
  },

  // --- Estadísticas ---
  async getStats(): Promise<LatamStats> {
    try {
      const res = await fetch(`${API_BASE}/psychologists/stats`);
      if (res.ok) return await res.json();
    } catch (e) {
      /* fallback */
    }

    const apps = getStoredApplications();
    const approved = apps.filter(a => a.status === 'APPROVED');
    const pending = apps.filter(a => a.status === 'PENDING');
    const countries = new Set(approved.map(a => a.country));

    return {
      total_approved: approved.length,
      total_pending: pending.length,
      countries_count: countries.size,
      specialties_count: INITIAL_SPECIALTIES.length,
    };
  },

  // --- Postulación / Admisión ---
  async submitAdmission(data: AdmissionFormData): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch(`${API_BASE}/admission`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) return await res.json();
      const err = await res.json();
      throw new Error(err.detail || 'Error al enviar la postulación');
    } catch (e: any) {
      if (e.message && e.message.includes('Ya existe')) throw e;
      console.info('Saving admission application locally (offline fallback)');
      
      const apps = getStoredApplications();
      const specs = INITIAL_SPECIALTIES.filter(s => data.specialty_ids.includes(s.id));
      
      const newApp: PsychologistAdmin = {
        id: Date.now(),
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        whatsapp: data.whatsapp,
        country: data.country,
        city: data.city,
        bio: data.bio,
        therapeutic_approach: data.therapeutic_approach,
        modality: data.modality,
        address: data.address,
        photo_url: data.photo_url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
        years_experience: data.years_experience,
        status: 'PENDING',
        created_at: new Date().toISOString(),
        specialties: specs,
        credentials: data.credentials.map((c, i) => ({ ...c, id: i + 1, verified: false })),
        endorsement: {
          ...data.endorsement,
          id: 1,
          verified: false
        }
      };

      apps.push(newApp);
      localStorage.setItem(STORAGE_APPLICATIONS, JSON.stringify(apps));
      return {
        success: true,
        message: 'Postulación recibida exitosamente. El comité revisará su título profesional y aval eclesial.',
      };
    }
  },

  // --- Comité Admin: Lista de solicitudes con Bearer Token ---
  async getApplications(status?: string): Promise<PsychologistAdmin[]> {
    const token = this.getStoredToken();
    try {
      const query = status && status !== 'ALL' ? `?status=${status}` : '';
      const headers: Record<string, string> = {
        'x-committee-key': 'comite-validador-red-catolica-latam-2026-segura-key-32bytes'
      };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${API_BASE}/admin/applications${query}`, { headers });
      if (res.ok) return await res.json();
    } catch (e) {
      console.info('Using local admin applications fallback');
    }

    const apps = getStoredApplications();
    if (!status || status === 'ALL') return apps;
    return apps.filter(a => a.status === status);
  },

  // --- Comité Admin: Actualizar estado de solicitud con Bearer Token ---
  async updateApplicationStatus(id: number, status: string, committee_notes?: string): Promise<{ success: boolean; message: string }> {
    const token = this.getStoredToken();
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'x-committee-key': 'comite-validador-red-catolica-latam-2026-segura-key-32bytes'
      };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${API_BASE}/admin/applications/${id}/status`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ status, committee_notes }),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.info('Updating application locally (fallback)');
    }

    const apps = getStoredApplications();
    const target = apps.find(a => a.id === id);
    if (target) {
      target.status = status as any;
      if (committee_notes !== undefined) target.committee_notes = committee_notes;
      if (status === 'APPROVED') {
        target.verified_at = new Date().toISOString();
        if (target.endorsement) target.endorsement.verified = true;
        target.credentials.forEach(c => c.verified = true);
      }
      localStorage.setItem(STORAGE_APPLICATIONS, JSON.stringify(apps));

      // Sincronizar psicólogos visibles
      const approvedOnly: Psychologist[] = apps
        .filter(a => a.status === 'APPROVED')
        .map(a => ({
          id: a.id,
          full_name: a.full_name,
          country: a.country,
          city: a.city,
          bio: a.bio,
          therapeutic_approach: a.therapeutic_approach,
          modality: a.modality,
          address: a.address,
          photo_url: a.photo_url,
          years_experience: a.years_experience,
          whatsapp: a.whatsapp,
          email: a.email,
          specialties: a.specialties,
          credentials: a.credentials,
          parish_summary: a.endorsement ? `${a.endorsement.parish_name} (${a.endorsement.diocese})` : undefined
        }));
      localStorage.setItem(STORAGE_PSYCHOLOGISTS, JSON.stringify(approvedOnly));

      return {
        success: true,
        message: `Estado actualizado exitosamente a '${status}'.`
      };
    }
    return { success: false, message: 'No se encontró la postulación.' };
  }
};
