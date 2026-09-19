import React from 'react';
import { 
  ShieldCheck, 
  Search, 
  UserPlus, 
  Sparkles, 
  ArrowRight, 
  Lock, 
  BookOpen 
} from 'lucide-react';
import type { LatamStats } from '../types';

interface HomePageProps {
  onNavigate: (tab: string) => void;
  stats: LatamStats;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, stats }) => {
  return (
    <div className="space-y-16 py-6 animate-in fade-in duration-200">
      
      {/* Hero Section */}
      <section className="relative rounded-3xl bg-gradient-to-b from-blue-950 via-blue-900 to-slate-900 text-white p-8 sm:p-14 overflow-hidden shadow-xl">
        <div className="absolute -right-16 -top-16 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-16 -bottom-16 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-3xl relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-800/60 border border-blue-700/60 text-amber-300 text-xs font-semibold uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fase 1: Directorio Seguro y Proceso de Validación</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
            Terapia psicológica profesional que respeta y abraza tu <span className="text-amber-400">fe católica</span>
          </h1>

          <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed font-normal">
            Eliminamos la barrera del miedo a recibir terapias que entren en conflicto con la moral y la antropología cristiana. Conectamos a los fieles de toda Latinoamérica con psicólogos rigurosamente avalados profesional y eclesialmente.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('directory')}
              className="py-3.5 px-6 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Explorar Directorio Latam</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('admission')}
              className="py-3.5 px-6 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold rounded-xl text-sm transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <UserPlus className="w-4 h-4 text-amber-400" />
              <span>Postular como Psicólogo</span>
            </button>
          </div>

          <div className="pt-4 text-xs text-blue-300 flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Modelo Puente Seguro: contacto privado directo hacia WhatsApp o correo del especialista sin almacenar historiales.</span>
          </div>
        </div>
      </section>

      {/* Métricas y Cobertura */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center">
          <div className="text-3xl font-extrabold text-blue-900 mb-1">{stats.total_approved}</div>
          <div className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Especialistas Validados</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center">
          <div className="text-3xl font-extrabold text-blue-900 mb-1">{stats.countries_count}</div>
          <div className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Países de Latam</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center">
          <div className="text-3xl font-extrabold text-blue-900 mb-1">{stats.specialties_count}</div>
          <div className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Áreas Clínicas</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center">
          <div className="text-3xl font-extrabold text-emerald-600 mb-1">100%</div>
          <div className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Revisión Manual por Comité</div>
        </div>
      </section>

      {/* Los 3 Pilares del Proyecto */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            ¿Cómo garantiza confianza la Red?
          </h2>
          <p className="text-sm text-slate-600">
            Diseñada meticulosamente para proteger la salud integral (psíquica y espiritual) del consultante.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Pilar 1 */}
          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 transition space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-lg">
              <ShieldCheck className="w-6 h-6 text-blue-800" />
            </div>
            <h3 className="text-base font-bold text-slate-900">1. Filtro de Admisión Estricto</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Los profesionales no pueden registrarse libremente. Deben consignar su título universitario habilitante, registro profesional y un <strong>aval eclesial</strong> (carta del párroco o movimiento). Cada perfil es revisado manualmente por el comité.
            </p>
          </div>

          {/* Pilar 2 */}
          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 transition space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold text-lg">
              <Search className="w-6 h-6 text-emerald-700" />
            </div>
            <h3 className="text-base font-bold text-slate-900">2. Buscador Amigable para Latam</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Filtra rápidamente por país (Ecuador, México, Colombia, etc.), ciudad, área de especialidad (matrimonio, jóvenes, adicciones, duelo) y modalidad (presencial en consultorio o virtual para cualquier lugar de América Latina).
            </p>
          </div>

          {/* Pilar 3 */}
          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 transition space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-lg">
              <Lock className="w-6 h-6 text-amber-700" />
            </div>
            <h3 className="text-base font-bold text-slate-900">3. Contacto Privado y Directo</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Para proteger la intimidad del paciente, la plataforma actúa como un puente confiable. Con un solo clic contactas directamente al WhatsApp o correo del terapeuta, delegando la cita al ámbito sagrado del consultorio.
            </p>
          </div>

        </div>
      </section>

      {/* Cita San Juan Pablo II */}
      <section className="bg-slate-100/80 rounded-3xl p-8 sm:p-10 border border-slate-200 text-slate-800 flex flex-col md:flex-row items-center gap-8">
        <div className="w-16 h-16 rounded-2xl bg-blue-900 text-amber-400 flex items-center justify-center shrink-0 shadow-md">
          <BookOpen className="w-8 h-8" />
        </div>
        <div className="space-y-2 text-center md:text-left">
          <blockquote className="text-sm sm:text-base font-medium italic text-slate-800 leading-relaxed">
            «La fe y la razón son como las dos alas con las cuales el espíritu humano se eleva hacia la contemplación de la verdad.»
          </blockquote>
          <cite className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">
            — San Juan Pablo II, Carta Encíclica *Fides et Ratio*
          </cite>
          <p className="text-xs text-slate-600 pt-1">
            En la Red de Psicólogos Católicos entendemos que la ciencia psicológica y la gracia divina no compiten, sino que cooperan armónicamente para la sanación integral de la persona humana.
          </p>
        </div>
      </section>

      {/* CTA Final para Profesionales */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white text-center space-y-5 shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          ¿Eres psicólogo católico y ejerces en Latinoamérica?
        </h2>
        <p className="text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
          Suma tu vocación profesional a una red de acompañamiento que miles de fieles necesitan. Postula enviando tus credenciales y el aval de tu comunidad eclesial.
        </p>
        <button
          onClick={() => onNavigate('admission')}
          className="py-3 px-6 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-sm transition shadow-md inline-flex items-center gap-2 cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>Iniciar Proceso de Postulación</span>
        </button>
      </section>

    </div>
  );
};
