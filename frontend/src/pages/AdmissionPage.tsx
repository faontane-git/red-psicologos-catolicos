import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  User, 
  GraduationCap, 
  Church, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Send, 
  AlertCircle,
  Camera,
  UploadCloud,
  FileText,
  Sparkles
} from 'lucide-react';
import type { AdmissionFormData, Specialty } from '../types';
import { LATAM_COUNTRIES } from '../data/mockData';
import { api } from '../services/api';

interface AdmissionPageProps {
  onSuccessNavigate?: () => void;
}

export const AdmissionPage: React.FC<AdmissionPageProps> = ({ onSuccessNavigate }) => {
  const [step, setStep] = useState(1);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Estados para carga de archivos
  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoFileName, setPhotoFileName] = useState('');
  const [cvUploading, setCvUploading] = useState(false);
  const [cvFileName, setCvFileName] = useState('');
  const [cvFileSize, setCvFileSize] = useState('');

  const [form, setForm] = useState<AdmissionFormData>({
    full_name: '',
    email: '',
    phone: '',
    whatsapp: '',
    country: 'Ecuador',
    city: '',
    bio: '',
    therapeutic_approach: 'Logoterapia y Terapia Cognitivo-Conductual con Antropología Cristiana',
    modality: 'mixta',
    address: '',
    photo_url: '',
    cv_url: '',
    years_experience: 5,
    specialty_ids: [1],
    credentials: [
      {
        degree_title: '',
        institution: '',
        license_number: '',
        graduation_year: new Date().getFullYear() - 5,
        document_url: ''
      }
    ],
    endorsement: {
      parish_name: '',
      diocese: '',
      movement_or_community: '',
      priest_reference_name: '',
      priest_contact: '',
      document_url: '',
      moral_commitment_accepted: false
    }
  });

  useEffect(() => {
    api.getSpecialties().then(setSpecialties);
  }, []);

  const handleSpecialtyToggle = (id: number) => {
    setForm(prev => {
      const exists = prev.specialty_ids.includes(id);
      return {
        ...prev,
        specialty_ids: exists 
          ? prev.specialty_ids.filter(sId => sId !== id)
          : [...prev.specialty_ids, id]
      };
    });
  };

  const handlePhotoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setErrorMsg(null);
    setPhotoUploading(true);
    try {
      const res = await api.uploadPhoto(file);
      setForm(prev => ({ ...prev, photo_url: res.url }));
      setPhotoFileName(file.name);
    } catch (err: any) {
      setErrorMsg(err.message || "Error al subir la fotografía.");
    } finally {
      setPhotoUploading(false);
    }
  };

  const handleSetSamplePhoto = () => {
    setForm(prev => ({
      ...prev,
      photo_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600'
    }));
    setPhotoFileName('foto_profesional_ejemplo.jpg');
    setErrorMsg(null);
  };

  const handleCvFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setErrorMsg(null);
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setErrorMsg("El Curriculum Vitae debe ser obligatoriamente en formato PDF (.pdf).");
      return;
    }
    setCvUploading(true);
    try {
      const res = await api.uploadCv(file);
      setForm(prev => ({ ...prev, cv_url: res.url }));
      setCvFileName(file.name);
      setCvFileSize((file.size / 1024).toFixed(1) + ' KB');
    } catch (err: any) {
      setErrorMsg(err.message || "Error al subir el archivo PDF del Curriculum Vitae.");
    } finally {
      setCvUploading(false);
    }
  };

  const handleSetSampleCv = () => {
    setForm(prev => ({
      ...prev,
      cv_url: '/uploads/cvs/CV_Ejemplo_Acreditacion_Profesional.pdf'
    }));
    setCvFileName('CV_Ejemplo_Acreditacion_Profesional.pdf');
    setCvFileSize('145.2 KB');
    setErrorMsg(null);
  };

  const validateStep1 = () => {
    if (!form.photo_url || !form.photo_url.trim()) return "La fotografía de presentación del psicólogo es obligatoria.";
    if (!form.full_name.trim()) return "Por favor ingrese su nombre completo.";
    if (!form.email.trim() || !form.email.includes('@')) return "Por favor ingrese un correo electrónico válido.";
    if (!form.whatsapp.trim()) return "Por favor ingrese su número de WhatsApp con código de país.";
    if (!form.city.trim()) return "Por favor ingrese su ciudad.";
    if (!form.bio.trim() || form.bio.length < 30) return "Por favor describa brevemente su presentación profesional (mínimo 30 caracteres).";
    return null;
  };

  const validateStep2 = () => {
    if (!form.cv_url || !form.cv_url.trim() || !form.cv_url.toLowerCase().endsWith('.pdf')) {
      return "El Curriculum Vitae en formato PDF (.pdf) es obligatorio para cotejar su formación.";
    }
    const cred = form.credentials[0];
    if (!cred.degree_title.trim()) return "Por favor indique su título universitario habilitante.";
    if (!cred.institution.trim()) return "Por favor indique la universidad que otorgó el título.";
    if (!cred.license_number.trim()) return "Por favor indique su número de colegiatura o registro profesional.";
    if (form.specialty_ids.length === 0) return "Seleccione al menos un área de atención.";
    return null;
  };

  const validateStep3 = () => {
    if (!form.endorsement.parish_name.trim()) return "Indique su parroquia habitual de asistencia.";
    if (!form.endorsement.diocese.trim()) return "Indique su Diócesis o Arquidiócesis.";
    if (!form.endorsement.priest_reference_name.trim()) return "Indique el nombre del sacerdote o párroco de referencia.";
    if (!form.endorsement.priest_contact.trim()) return "Indique el teléfono o correo del sacerdote de referencia.";
    if (!form.endorsement.moral_commitment_accepted) return "Debe aceptar el compromiso ético y antropológico cristiano.";
    return null;
  };

  const handleNext = () => {
    setErrorMsg(null);
    if (step === 1) {
      const err = validateStep1();
      if (err) { setErrorMsg(err); return; }
      setStep(2);
    } else if (step === 2) {
      const err = validateStep2();
      if (err) { setErrorMsg(err); return; }
      setStep(3);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const err = validateStep3();
    if (err) { setErrorMsg(err); return; }

    setLoading(true);
    try {
      await api.submitAdmission(form);
      setSubmitted(true);
    } catch (e: any) {
      setErrorMsg(e.message || "Ocurrió un error al enviar la postulación. Inténtelo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="py-12 max-w-xl mx-auto text-center space-y-6 animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-xs">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            ¡Postulación Registrada Exitosamente!
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Estimado/a <strong>{form.full_name}</strong>, su solicitud ha sido ingresada en la bandeja del <strong>Comité de Validación</strong>.
          </p>
        </div>

        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs text-slate-600 space-y-2.5">
          <p className="font-bold text-slate-800 text-sm">Próximos pasos:</p>
          <div className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-900 font-bold flex items-center justify-center shrink-0">1</span>
            <span>El comité revisará la validez del título universitario y número de colegiatura ({form.credentials[0].license_number}).</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-900 font-bold flex items-center justify-center shrink-0">2</span>
            <span>Se cotejará la referencia con el párroco o sacerdote designado ({form.endorsement.priest_reference_name}).</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-900 font-bold flex items-center justify-center shrink-0">3</span>
            <span>Una vez aprobado, su perfil se activará inmediatamente en el directorio público de Latinoamérica.</span>
          </div>
        </div>

        <button
          onClick={() => {
            setSubmitted(false);
            setStep(1);
            if (onSuccessNavigate) onSuccessNavigate();
          }}
          className="px-6 py-2.5 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
        >
          Volver al Inicio
        </button>
      </div>
    );
  }

  return (
    <div className="py-8 max-w-3xl mx-auto space-y-8 animate-in fade-in duration-150">
      
      {/* Header Info */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-amber-700" />
          <span>Filtro de Admisión Riguroso</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Postulación a la Red de Psicólogos Católicos
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Para garantizar la máxima tranquilidad y rectitud doctrinal a los fieles, todos los aspirantes deben presentar acreditación profesional y aval eclesial.
        </p>
      </div>

      {/* Stepper Progress */}
      <div className="flex items-center justify-between relative max-w-lg mx-auto px-4">
        <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 -z-10"></div>
        
        <div className="flex flex-col items-center gap-1.5">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition ${
            step >= 1 ? 'bg-blue-900 text-white shadow-xs' : 'bg-slate-200 text-slate-600'
          }`}>
            1
          </div>
          <span className="text-[11px] font-semibold text-slate-700">Datos Personales</span>
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition ${
            step >= 2 ? 'bg-blue-900 text-white shadow-xs' : 'bg-slate-200 text-slate-600'
          }`}>
            2
          </div>
          <span className="text-[11px] font-semibold text-slate-700">Acreditación</span>
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition ${
            step >= 3 ? 'bg-blue-900 text-white shadow-xs' : 'bg-slate-200 text-slate-600'
          }`}>
            3
          </div>
          <span className="text-[11px] font-semibold text-slate-700">Aval Eclesial</span>
        </div>
      </div>

      {/* Error alert if any */}
      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-2xl text-xs flex items-center gap-2.5">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Form Container */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
        
        {/* PASO 1: Datos Personales */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div className="border-b border-slate-100 pb-4 mb-2">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-900" />
                Paso 1: Información Personal y de Contacto
              </h2>
              <p className="text-xs text-slate-500">
                Estos datos permitirán a los pacientes de Latinoamérica contactarte de forma directa y respetuosa.
              </p>
            </div>

            {/* Fotografía Oficial de Presentación (OBLIGATORIA) */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-blue-900" />
                    Fotografía de Presentación Profesional *
                  </label>
                  <p className="text-[11px] text-slate-500">
                    Imagen oficial de presentación visible para los pacientes en el directorio público de Latinoamérica.
                  </p>
                </div>
                {form.photo_url && (
                  <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase flex items-center gap-1 shadow-2xs">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Foto Adjunta
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-1">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-slate-200 border-2 border-dashed border-slate-300 flex items-center justify-center shrink-0 shadow-xs">
                  {form.photo_url ? (
                    <img
                      src={form.photo_url}
                      alt="Vista previa"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-2 text-slate-400">
                      <Camera className="w-6 h-6 mx-auto mb-1 opacity-60" />
                      <span className="text-[9px] font-semibold block leading-tight">Sin foto</span>
                    </div>
                  )}
                  {photoUploading && (
                    <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>

                <div className="space-y-2 flex-1 text-center sm:text-left">
                  <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                    <label
                      htmlFor="photo-file-input"
                      className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-bold transition inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <UploadCloud className="w-4 h-4" />
                      <span>{photoUploading ? 'Subiendo imagen...' : form.photo_url ? 'Cambiar Fotografía' : 'Subir Fotografía Oficial *'}</span>
                    </label>
                    <input
                      id="photo-file-input"
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      onChange={handlePhotoFileChange}
                      className="hidden"
                    />

                    <button
                      type="button"
                      onClick={handleSetSamplePhoto}
                      className="px-3 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Usar foto de muestra</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Formatos: <strong>JPG, PNG, WebP</strong> (Máx. 5MB). Se solicita vestimenta y encuadre profesional.
                  </p>
                  {photoFileName && (
                    <p className="text-[11px] text-emerald-700 font-medium">
                      Archivo cargado: <strong>{photoFileName}</strong>
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700">Nombre Completo y Títulos *</label>
                <input
                  type="text"
                  placeholder="Ej. Dra. María Elena Benalcázar"
                  value={form.full_name}
                  onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Correo Electrónico *</label>
                <input
                  type="email"
                  placeholder="ejemplo@correo.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">WhatsApp Directo (con código de país) *</label>
                <input
                  type="text"
                  placeholder="Ej. 593984451209 (sin espacios ni signos)"
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">País de Residencia *</label>
                <select
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800"
                >
                  {LATAM_COUNTRIES.filter(c => c !== 'Todos').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Ciudad *</label>
                <input
                  type="text"
                  placeholder="Ej. Quito, Bogotá, Santiago..."
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Modalidad de Consulta *</label>
                <select
                  value={form.modality}
                  onChange={(e) => setForm({ ...form, modality: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800"
                >
                  <option value="virtual">🌐 Solo Virtual / Online (Para toda Latam)</option>
                  <option value="presencial">🏥 Solo Presencial en Consultorio</option>
                  <option value="mixta">🔄 Mixta (Virtual y Presencial)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Años de Ejercicio Profesional</label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={form.years_experience}
                  onChange={(e) => setForm({ ...form, years_experience: parseInt(e.target.value) || 1 })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700">Dirección del Consultorio (si aplica presencial)</label>
                <input
                  type="text"
                  placeholder="Ej. Av. González Suárez y Coruña, Consultorio 402"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700">Resumen Profesional y Motivación *</label>
                <textarea
                  rows={3}
                  placeholder="Describa su trayectoria y cómo integra la visión cristiana de la persona en su práctica clínica..."
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800"
                  required
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="py-2.5 px-6 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Siguiente: Acreditación</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* PASO 2: Acreditación Profesional */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div className="border-b border-slate-100 pb-4 mb-2">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-900" />
                Paso 2: Acreditación Profesional y Áreas de Atención
              </h2>
              <p className="text-xs text-slate-500">
                El comité verificará que poseas título legalmente habilitado para el ejercicio de la psicoterapia.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700">Título Universitario Habilitante *</label>
                <input
                  type="text"
                  placeholder="Ej. Licenciatura en Psicología Clínica / Magíster en Terapia Familiar"
                  value={form.credentials[0].degree_title}
                  onChange={(e) => {
                    const creds = [...form.credentials];
                    creds[0].degree_title = e.target.value;
                    setForm({ ...form, credentials: creds });
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Universidad o Institución Emisora *</label>
                <input
                  type="text"
                  placeholder="Ej. Pontificia Universidad Católica"
                  value={form.credentials[0].institution}
                  onChange={(e) => {
                    const creds = [...form.credentials];
                    creds[0].institution = e.target.value;
                    setForm({ ...form, credentials: creds });
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Número de Colegiatura o Registro Oficial *</label>
                <input
                  type="text"
                  placeholder="Ej. MSP-17092834 / C.Ps.P 18239"
                  value={form.credentials[0].license_number}
                  onChange={(e) => {
                    const creds = [...form.credentials];
                    creds[0].license_number = e.target.value;
                    setForm({ ...form, credentials: creds });
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800"
                  required
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700">Enfoque Terapéutico Principal *</label>
                <input
                  type="text"
                  placeholder="Ej. Terapia Sistémica Familiar, Logoterapia, Cognitivo-Conductual..."
                  value={form.therapeutic_approach}
                  onChange={(e) => setForm({ ...form, therapeutic_approach: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800"
                  required
                />
              </div>
            </div>

            {/* Curriculum Vitae Obligatorio en Formato PDF */}
            <div className="p-5 bg-blue-50/40 rounded-2xl border-2 border-blue-900/20 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-xs font-bold text-blue-950 uppercase tracking-wide flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-red-600" />
                    Curriculum Vitae Oficial (Obligatorio en formato PDF) *
                  </h3>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    El Comité de Validación requiere su CV completo en PDF para constatar trayectoria clínica y antecedentes profesionales.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-red-100 text-red-800 font-bold text-[10px] uppercase tracking-wider shrink-0 shadow-2xs">
                  Requisito .PDF
                </span>
              </div>

              {form.cv_url ? (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-blue-200 shadow-xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center shrink-0 font-extrabold text-xs border border-red-200">
                      PDF
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {cvFileName || form.cv_url.split('/').pop() || 'Curriculum_Vitae.pdf'}
                      </p>
                      <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Curriculum Vitae adjunto con éxito {cvFileSize ? `(${cvFileSize})` : ''}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <label
                      htmlFor="cv-file-input"
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition cursor-pointer"
                    >
                      Reemplazar PDF
                    </label>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-blue-300/80 bg-white/80 rounded-xl p-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto border border-red-100">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      Cargue su Curriculum Vitae en formato PDF
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Únicamente se admiten archivos con extensión <strong>.pdf</strong> (Máx. 15MB)
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                    <label
                      htmlFor="cv-file-input"
                      className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-bold transition inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <UploadCloud className="w-4 h-4" />
                      <span>{cvUploading ? 'Cargando archivo PDF...' : 'Subir Curriculum Vitae (PDF) *'}</span>
                    </label>

                    <button
                      type="button"
                      onClick={handleSetSampleCv}
                      className="px-3 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Usar CV de muestra</span>
                    </button>
                  </div>
                </div>
              )}

              <input
                id="cv-file-input"
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleCvFileChange}
                className="hidden"
              />
            </div>

            {/* Selector de Especialidades */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-semibold text-slate-700 block">
                Selecciona tus Áreas de Atención Clínicas (Especialidades) *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {specialties.map((spec) => {
                  const isChecked = form.specialty_ids.includes(spec.id);
                  return (
                    <div
                      key={spec.id}
                      onClick={() => handleSpecialtyToggle(spec.id)}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition flex items-start gap-2.5 ${
                        isChecked
                          ? 'border-blue-900 bg-blue-50/70 text-blue-950 font-medium'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}} // Handled by container
                        className="mt-0.5 rounded-sm text-blue-900 focus:ring-blue-800"
                      />
                      <div>
                        <p className="font-bold">{spec.name}</p>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{spec.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-2 px-4 text-slate-600 hover:text-slate-900 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Atrás</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="py-2.5 px-6 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Siguiente: Aval Eclesial</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* PASO 3: Aval Eclesial y Deontología */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in duration-150">
            <div className="border-b border-slate-100 pb-4 mb-2">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Church className="w-5 h-5 text-blue-900" />
                Paso 3: Aval Eclesial y Compromiso Moral Cristiano
              </h2>
              <p className="text-xs text-slate-500">
                La piedra angular de la Red es asegurar que la terapia no entrará en conflicto con los valores de la Iglesia.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Parroquia habitual de asistencia *</label>
                <input
                  type="text"
                  placeholder="Ej. Parroquia San Juan María Vianney"
                  value={form.endorsement.parish_name}
                  onChange={(e) => setForm({
                    ...form,
                    endorsement: { ...form.endorsement, parish_name: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Diócesis o Arquidiócesis *</label>
                <input
                  type="text"
                  placeholder="Ej. Arquidiócesis de Quito"
                  value={form.endorsement.diocese}
                  onChange={(e) => setForm({
                    ...form,
                    endorsement: { ...form.endorsement, diocese: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800"
                  required
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700">Movimiento Apostólico o Pastoral (Opcional)</label>
                <input
                  type="text"
                  placeholder="Ej. Regnum Christi, Camino Neocatecumenal, Emaús, Pastoral Familiar..."
                  value={form.endorsement.movement_or_community}
                  onChange={(e) => setForm({
                    ...form,
                    endorsement: { ...form.endorsement, movement_or_community: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Nombre del Sacerdote o Párroco de Referencia *</label>
                <input
                  type="text"
                  placeholder="Ej. Pbro. Patricio Valdivieso"
                  value={form.endorsement.priest_reference_name}
                  onChange={(e) => setForm({
                    ...form,
                    endorsement: { ...form.endorsement, priest_reference_name: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Teléfono o Correo del Sacerdote *</label>
                <input
                  type="text"
                  placeholder="Ej. +593 2 245 9901 / parroquia@diocesis.ec"
                  value={form.endorsement.priest_contact}
                  onChange={(e) => setForm({
                    ...form,
                    endorsement: { ...form.endorsement, priest_contact: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800"
                  required
                />
              </div>
            </div>

            {/* Declaración y Compromiso Deontológico */}
            <div className="mt-4 p-4.5 bg-amber-50/70 rounded-2xl border border-amber-200/80 space-y-3">
              <div className="flex items-center gap-2 text-amber-950 font-bold text-xs uppercase tracking-wide">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>Compromiso Deontológico y Antropológico Cristiano</span>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed">
                Como miembro postulante de la Red de Psicólogos Católicos, me comprometo formalmente a ejercer la psicoterapia conforme a la dignidad inviolable de la persona humana creada a imagen de Dios, respetando la santidad de la vida, el sacramento del matrimonio y la moral católica, diferenciando fielmente el ámbito clínico del sacramental.
              </p>
              <label className="flex items-start gap-2.5 pt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.endorsement.moral_commitment_accepted}
                  onChange={(e) => setForm({
                    ...form,
                    endorsement: { ...form.endorsement, moral_commitment_accepted: e.target.checked }
                  })}
                  className="mt-0.5 rounded-sm text-blue-900 focus:ring-blue-800"
                  required
                />
                <span className="text-xs font-semibold text-slate-800">
                  Acepto y ratifico conscientemente este compromiso deontológico ante Dios y la comunidad eclesial. *
                </span>
              </label>
            </div>

            <div className="pt-4 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="py-2 px-4 text-slate-600 hover:text-slate-900 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Atrás</span>
              </button>

              <button
                type="submit"
                disabled={loading}
                className="py-3 px-7 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'Enviando postulación...' : 'Enviar Postulación al Comité'}</span>
              </button>
            </div>
          </form>
        )}

      </div>

    </div>
  );
};
