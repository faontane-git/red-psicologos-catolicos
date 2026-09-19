import React from 'react';
import { Search, Globe, UserCheck, RotateCcw, SlidersHorizontal, MapPin } from 'lucide-react';
import type { DirectoryFilters, Specialty } from '../types';
import { LATAM_COUNTRIES } from '../data/mockData';

interface SearchFiltersProps {
  filters: DirectoryFilters;
  specialties: Specialty[];
  onChange: (filters: DirectoryFilters) => void;
  onReset: () => void;
  totalResults: number;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  specialties,
  onChange,
  onReset,
  totalResults
}) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, search: e.target.value });
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, country: e.target.value });
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, city: e.target.value });
  };

  const handleModalityChange = (modality: string) => {
    onChange({ ...filters, modality });
  };

  const handleSpecialtyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, specialty: e.target.value });
  };

  const hasActiveFilters = 
    filters.search !== '' || 
    filters.country !== 'Todos' || 
    filters.city !== '' || 
    filters.modality !== 'todas' || 
    filters.specialty !== 'todas';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8 transition-all">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-blue-800" />
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Buscador de Especialistas en Latinoamérica
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-900 rounded-full border border-blue-100">
            {totalResults} {totalResults === 1 ? 'psicólogo validado' : 'psicólogos validados'}
          </span>
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="text-xs font-medium text-slate-500 hover:text-red-600 flex items-center gap-1 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* 1. Búsqueda por palabra clave */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            Palabra clave o Nombre
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Ej. María Elena, Logoterapia..."
              value={filters.search}
              onChange={handleTextChange}
              className="w-full pl-3 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800 transition"
            />
            {filters.search && (
              <button
                onClick={() => onChange({ ...filters, search: '' })}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* 2. Filtro por País de Latam */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-blue-700" />
            País (Latinoamérica)
          </label>
          <select
            value={filters.country}
            onChange={handleCountryChange}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800 transition"
          >
            {LATAM_COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c === 'Todos' ? '🌎 Toda Latinoamérica' : c}
              </option>
            ))}
          </select>
        </div>

        {/* 3. Filtro por Especialidad */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
            Área de Atención
          </label>
          <select
            value={filters.specialty}
            onChange={handleSpecialtyChange}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800 transition"
          >
            <option value="todas">✨ Todas las áreas de atención</option>
            {specialties.map((s) => (
              <option key={s.id} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* 4. Filtro por Ciudad / Localidad */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            Ciudad
          </label>
          <input
            type="text"
            placeholder="Ej. Quito, Bogotá, CDMX..."
            value={filters.city}
            onChange={handleCityChange}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800 transition"
          />
        </div>

      </div>

      {/* Selector de Modalidad */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-500 mr-2">Modalidad:</span>
        {[
          { id: 'todas', label: 'Cualquiera' },
          { id: 'virtual', label: '🌐 Online / Virtual' },
          { id: 'presencial', label: '🏥 Presencial en Consultorio' },
          { id: 'mixta', label: '🔄 Mixta (Virtual / Presencial)' }
        ].map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => handleModalityChange(m.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
              filters.modality === m.id
                ? 'bg-blue-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
    </div>
  );
};
