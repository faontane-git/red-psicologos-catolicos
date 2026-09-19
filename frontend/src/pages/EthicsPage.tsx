import React from 'react';
import { ShieldCheck, Sparkles, Church } from 'lucide-react';

export const EthicsPage: React.FC = () => {
  return (
    <div className="py-8 max-w-4xl mx-auto space-y-12 animate-in fade-in duration-150">
      
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold">
          <Church className="w-4 h-4 text-blue-700" />
          <span>Marco Antropológico y Doctrinal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Fe, Razón y Antropología Cristiana
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
          Por qué la Red de Psicólogos Católicos responde a una necesidad vital de los fieles en Latinoamérica.
        </p>
      </div>

      {/* Declaración Central */}
      <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
          1. El Miedo a la Terapia Relativista: Una Barrera Real
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed">
          Muchos fieles católicos posponen la búsqueda de ayuda profesional ante crisis matrimoniales, depresiones o heridas emocionales por un temor comprensible: encontrarse con terapeutas imbuidos de corrientes relativistas que sugieran el divorcio a la ligera, justifiquen conductas moralmente lesivas o invaliden su dimensión de fe tratándola como una represión o patología.
        </p>
        <p className="text-sm text-slate-700 leading-relaxed">
          Nuestra red nace precisamente para <strong>eliminar esta barrera</strong>, ofreciendo un entorno donde la vocación a la santidad y la salud mental caminan de la mano.
        </p>
      </section>

      {/* Visión Integral */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-blue-800" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Visión Integral de la Persona</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            El ser humano no es un mero conjunto de pulsiones químicas ni un mecanismo de estímulo-respuesta. Es una unidad sustancial de cuerpo, psique y alma inmortal, creada por amor y para el amor. La psicología clínica católica atiende la herida psíquica reconociendo esta dignidad trascendente.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center">
            <Church className="w-5 h-5 text-emerald-700" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Psicoterapia vs. Dirección Espiritual</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Respetamos con rigor la distinción de competencias: la confesión y dirección espiritual corresponden al sacerdote y al ámbito de la gracia; el tratamiento de traumas, trastornos afectivos y dinámicas familiares corresponde al terapeuta competente. Ambos ámbitos se respetan y colaboran armónicamente.
          </p>
        </div>
      </section>

      {/* Manifiesto Deontológico */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg space-y-6">
        <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-amber-400" />
          Los 5 Compromisos de los Especialistas de la Red
        </h2>
        <div className="space-y-4 text-xs sm:text-sm text-slate-300">
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-blue-800 text-amber-300 font-bold flex items-center justify-center shrink-0">1</span>
            <p><strong className="text-white">Rigor Científico y Clínico:</strong> Ejercicio profesional basado en la evidencia y en modelos de probada eficacia terapéutica (logoterapia, cognitiva, sistémica).</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-blue-800 text-amber-300 font-bold flex items-center justify-center shrink-0">2</span>
            <p><strong className="text-white">Defensa Inquebrantable de la Vida y la Familia:</strong> Acompañamiento matrimonial orientado a la reconciliación y fortalecimiento del vínculo sagrado conyugal.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-blue-800 text-amber-300 font-bold flex items-center justify-center shrink-0">3</span>
            <p><strong className="text-white">Comunión Eclesial Verificada:</strong> Pertenencia activa y aval de una comunidad o parroquia en su respectiva diócesis en Latinoamérica.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-blue-800 text-amber-300 font-bold flex items-center justify-center shrink-0">4</span>
            <p><strong className="text-white">Secreto Profesional y Modelo Puente:</strong> Resguardo absoluto de la confidencialidad de los consultantes.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-blue-800 text-amber-300 font-bold flex items-center justify-center shrink-0">5</span>
            <p><strong className="text-white">Humildad Terapéutica:</strong> Reconocimiento de que el profesional es un instrumento al servicio de la restauración integral de la persona.</p>
          </div>
        </div>
      </section>

    </div>
  );
};
