import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const PrivacyBanner: React.FC = () => {
  return (
    <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-5 mb-8 text-emerald-950">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-sm tracking-tight text-emerald-900">
              Garantía de Confidencialidad y Privacidad (Modelo Puente)
            </span>
            <span className="bg-emerald-200 text-emerald-800 text-[11px] font-semibold px-2 py-0.5 rounded-full">
              Sin intermediarios
            </span>
          </div>
          <p className="text-xs text-emerald-800 leading-relaxed">
            Nuestra plataforma no solicita historiales clínicos ni almacena datos de pacientes. Al pulsar en el contacto del especialista, eres dirigido inmediatamente a su canal privado (WhatsApp o Correo), garantizando el secreto profesional desde el primer contacto.
          </p>
        </div>
      </div>
    </div>
  );
};
