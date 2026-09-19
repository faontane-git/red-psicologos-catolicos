import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-8 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800 text-sm">
          
          {/* Columna 1: Identidad y Autor */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-800 flex items-center justify-center text-amber-400">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M7 7h10" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Red de Psicólogos Católicos
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-lg">
              Espacio de confianza concebido para conectar a los fieles católicos de Latinoamérica con profesionales de la salud mental rigurosamente validados. Garantizamos una psicoterapia que integra la fe, la moral y la visión antropológica del ser humano creado a imagen y semejanza de Dios.
            </p>
            <div className="pt-2 text-xs text-amber-300 font-medium">
              Propuesta y Dirección de Proyecto: <span className="text-white font-semibold">Ing. Fabrizzio Ontaneda</span>
            </div>
          </div>

          {/* Columna 2: Pilares Fase 1 */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold tracking-wide text-xs uppercase">
              Pilares de Confianza
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Filtro de Admisión Estricto</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Aval Eclesial Verificado</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Modelo Puente Seguro</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Confidencialidad Absoluta</span>
              </li>
            </ul>
          </div>

          {/* Columna 3: Cobertura */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold tracking-wide text-xs uppercase">
              Cobertura Latam
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Atención presencial en las principales diócesis y ciudades, y acompañamiento virtual para toda la comunidad hispanohablante de América Latina.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1 text-xs text-slate-300">
              <span className="bg-slate-800 px-2 py-0.5 rounded-sm">Ecuador</span>
              <span className="bg-slate-800 px-2 py-0.5 rounded-sm">México</span>
              <span className="bg-slate-800 px-2 py-0.5 rounded-sm">Colombia</span>
              <span className="bg-slate-800 px-2 py-0.5 rounded-sm">Argentina</span>
              <span className="bg-slate-800 px-2 py-0.5 rounded-sm">Perú</span>
              <span className="bg-slate-800 px-2 py-0.5 rounded-sm">+ Latam</span>
            </div>
          </div>

        </div>

        {/* Disclaimer y Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Red de Psicólogos Católicos. Todos los derechos reservados.
          </p>
          <p className="text-center sm:text-right">
            La plataforma funciona como un puente de verificación. La relación terapéutica se desenvuelve exclusivamente bajo el secreto profesional en el consultorio del especialista.
          </p>
        </div>
      </div>
    </footer>
  );
};
