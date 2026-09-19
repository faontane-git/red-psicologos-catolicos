import React from 'react';
import { ShieldCheck, MapPin, Video, Building, MessageCircle, ArrowRight, Award } from 'lucide-react';
import type { Psychologist } from '../types';

interface PsychologistCardProps {
  psychologist: Psychologist;
  onSelect: (psychologist: Psychologist) => void;
}

export const PsychologistCard: React.FC<PsychologistCardProps> = ({ psychologist, onSelect }) => {
  const defaultPhoto = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80";

  const getModalityBadge = () => {
    switch (psychologist.modality) {
      case 'virtual':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
            <Video className="w-3 h-3" /> Virtual / Online
          </span>
        );
      case 'presencial':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            <Building className="w-3 h-3" /> Presencial
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
            <Video className="w-3 h-3" /> Presencial y Virtual
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between overflow-hidden group">
      
      {/* Top Header info */}
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <img
            src={psychologist.photo_url || defaultPhoto}
            alt={psychologist.full_name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-100 shadow-xs shrink-0 group-hover:scale-105 transition"
            onError={(e) => {
              (e.target as HTMLImageElement).src = defaultPhoto;
            }}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 mb-1 text-emerald-700 font-medium text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="truncate">Validado por Comité</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition leading-snug">
              {psychologist.full_name}
            </h3>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{psychologist.city}, <strong>{psychologist.country}</strong></span>
            </p>
          </div>
        </div>

        {/* Badges de Modalidad y Años */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {getModalityBadge()}
          <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Award className="w-3 h-3 text-slate-400" />
            {psychologist.years_experience} años de exp.
          </span>
        </div>

        {/* Enfoque y Resumen */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-slate-700 mb-1">
            Enfoque: <span className="font-normal text-slate-600">{psychologist.therapeutic_approach}</span>
          </p>
          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
            {psychologist.bio}
          </p>
        </div>

        {/* Especialidades */}
        <div className="space-y-1.5 pt-3 border-t border-slate-100">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Áreas de Atención
          </span>
          <div className="flex flex-wrap gap-1.5">
            {psychologist.specialties.slice(0, 3).map((spec) => (
              <span
                key={spec.id}
                className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium"
              >
                {spec.name}
              </span>
            ))}
            {psychologist.specialties.length > 3 && (
              <span className="text-[11px] bg-slate-50 text-slate-500 px-1.5 py-0.5 rounded-md">
                +{psychologist.specialties.length - 3} más
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer con Botón de Contacto Directo */}
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          onClick={() => onSelect(psychologist)}
          className="flex-1 text-center py-2 px-3 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer"
        >
          <span>Ver Ficha y Contactar</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <a
          href={`https://wa.me/${psychologist.whatsapp}?text=${encodeURIComponent(
            `Hola Lic. ${psychologist.full_name}, le contacto desde el directorio de la Red de Psicólogos Católicos. Quisiera consultar información sobre disponibilidad para atención terapéutica.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Contactar directamente por WhatsApp"
          className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition flex items-center justify-center shadow-xs cursor-pointer"
        >
          <MessageCircle className="w-4 h-4" />
        </a>
      </div>

    </div>
  );
};
