import React, { useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  MessageCircle, 
  Mail, 
  MapPin, 
  GraduationCap, 
  Church, 
  CheckCircle, 
  Lock, 
  Video, 
  Building 
} from 'lucide-react';
import type { Psychologist } from '../types';

interface ProfileModalProps {
  psychologist: Psychologist | null;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ psychologist, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (psychologist) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [psychologist, onClose]);

  if (!psychologist) return null;

  const defaultPhoto = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80";

  const waMessage = encodeURIComponent(
    `Hola Lic. ${psychologist.full_name}, le escribo cordialmente desde el directorio de la Red de Psicólogos Católicos. Me gustaría consultar sobre sus horarios disponibles y modalidad de consulta.`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      
      {/* Modal Container */}
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-950 text-white p-6 sm:p-8 rounded-t-3xl relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl"></div>
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 relative z-10">
            <img
              src={psychologist.photo_url || defaultPhoto}
              alt={psychologist.full_name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-white/20 shadow-lg shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).src = defaultPhoto;
              }}
            />
            <div className="text-center sm:text-left flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Perfil Validado por Comité Católico</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                {psychologist.full_name}
              </h2>
              <p className="text-blue-200 text-sm flex items-center justify-center sm:justify-start gap-1.5 mt-1">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>{psychologist.city}, <strong>{psychologist.country}</strong></span>
              </p>
              <p className="text-xs text-blue-300 mt-2 font-medium">
                {psychologist.years_experience} años de experiencia clínica profesional
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">

          {/* Banner de Privacidad */}
          <div className="bg-blue-50/80 border border-blue-100 rounded-xl p-3.5 text-xs text-blue-900 flex items-center gap-3">
            <Lock className="w-5 h-5 text-blue-800 shrink-0" />
            <span>
              <strong>Contacto Seguro Directo:</strong> Su comunicación se realiza directamente con el profesional. La Red de Psicólogos Católicos no almacena historiales ni interviene en el secreto profesional.
            </span>
          </div>

          {/* Biografía y Enfoque */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Presentación y Marco de Acompañamiento
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {psychologist.bio}
            </p>
            <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
              <span className="font-bold text-blue-900">Enfoque Terapéutico: </span>
              {psychologist.therapeutic_approach}
            </div>
          </div>

          {/* Acreditación Académica y Colegiatura */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-blue-800" />
              Acreditación Profesional Verificada
            </h3>
            <div className="space-y-2">
              {psychologist.credentials.map((cred, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <div className="text-xs">
                    <p className="font-bold text-slate-900">{cred.degree_title}</p>
                    <p className="text-slate-600">{cred.institution} {cred.graduation_year ? `(${cred.graduation_year})` : ''}</p>
                    <p className="text-slate-500 font-mono mt-0.5">Registro / Licencia: {cred.license_number}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Aval Eclesial */}
          {psychologist.parish_summary && (
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Church className="w-4 h-4 text-blue-800" />
                Referencia y Aval Eclesial
              </h3>
              <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs text-amber-950 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0" />
                <div>
                  <p className="font-bold">Comunidad Parroquial de Referencia</p>
                  <p className="text-amber-900">{psychologist.parish_summary}</p>
                  <p className="text-[11px] text-amber-800 mt-0.5">
                    Aval eclesial y compromiso deontológico y moral católico cotejado por el comité.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Especialidades */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Especialidades Clínicas
            </h3>
            <div className="flex flex-wrap gap-2">
              {psychologist.specialties.map((spec) => (
                <span
                  key={spec.id}
                  className="px-3 py-1 bg-slate-100 text-slate-800 rounded-lg text-xs font-medium"
                >
                  {spec.name}
                </span>
              ))}
            </div>
          </div>

          {/* Modalidad y Ubicación */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="font-semibold text-slate-500 block mb-1">Modalidad de Atención:</span>
              <span className="font-bold text-slate-800 flex items-center gap-1.5 capitalize">
                {psychologist.modality === 'virtual' && <Video className="w-4 h-4 text-indigo-600" />}
                {psychologist.modality === 'presencial' && <Building className="w-4 h-4 text-amber-600" />}
                {psychologist.modality === 'mixta' && <Video className="w-4 h-4 text-emerald-600" />}
                {psychologist.modality}
              </span>
            </div>
            {psychologist.address && (
              <div>
                <span className="font-semibold text-slate-500 block mb-1">Dirección de Consultorio:</span>
                <span className="text-slate-700">{psychologist.address}</span>
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer: Acciones de Contacto */}
        <div className="p-6 bg-slate-100 border-t border-slate-200 rounded-b-3xl flex flex-col sm:flex-row items-center gap-3">
          <a
            href={`https://wa.me/${psychologist.whatsapp}?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Contactar por WhatsApp</span>
          </a>

          <a
            href={`mailto:${psychologist.email}?subject=${encodeURIComponent(
              'Consulta desde la Red de Psicólogos Católicos'
            )}`}
            className="w-full sm:w-auto py-3 px-5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
          >
            <Mail className="w-4 h-4 text-slate-600" />
            <span>Enviar Correo</span>
          </a>
        </div>

      </div>
    </div>
  );
};
