import React, { useState, useEffect } from 'react';
import { SearchFilters } from '../components/SearchFilters';
import { PsychologistCard } from '../components/PsychologistCard';
import { ProfileModal } from '../components/ProfileModal';
import { PrivacyBanner } from '../components/PrivacyBanner';
import type { Psychologist, Specialty, DirectoryFilters } from '../types';
import { api } from '../services/api';
import { Loader2, AlertCircle } from 'lucide-react';

export const DirectoryPage: React.FC = () => {
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPsychologist, setSelectedPsychologist] = useState<Psychologist | null>(null);

  const initialFilters: DirectoryFilters = {
    country: 'Todos',
    city: '',
    modality: 'todas',
    specialty: 'todas',
    search: '',
  };

  const [filters, setFilters] = useState<DirectoryFilters>(initialFilters);

  // Load initial specialties
  useEffect(() => {
    api.getSpecialties().then(setSpecialties);
  }, []);

  // Fetch psychologists when filters change
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    api.getPsychologists(filters).then((data) => {
      if (isMounted) {
        setPsychologists(data);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [filters]);

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <div className="py-6 space-y-6 animate-in fade-in duration-150">
      
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Directorio de Psicólogos Católicos Validados
        </h1>
        <p className="text-sm text-slate-600">
          Encuentra especialistas con sólida formación científica y fidelidad al Magisterio de la Iglesia para acompañarte en tu proceso terapéutico.
        </p>
      </div>

      {/* Garantía de Privacidad */}
      <PrivacyBanner />

      {/* Barra de Filtros */}
      <SearchFilters
        filters={filters}
        specialties={specialties}
        onChange={setFilters}
        onReset={handleResetFilters}
        totalResults={psychologists.length}
      />

      {/* Contenido Principal / Resultados */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-900" />
          <p className="text-xs font-medium">Buscando especialistas validados...</p>
        </div>
      ) : psychologists.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {psychologists.map((psychologist) => (
            <PsychologistCard
              key={psychologist.id}
              psychologist={psychologist}
              onSelect={setSelectedPsychologist}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">No encontramos resultados con esos filtros</h3>
            <p className="text-xs text-slate-500 mt-1">
              Prueba seleccionando "Toda Latinoamérica" o buscando por modalidad virtual para acceder a psicólogos de otros países.
            </p>
          </div>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-semibold hover:bg-blue-950 transition cursor-pointer"
          >
            Restablecer todos los filtros
          </button>
        </div>
      )}

      {/* Modal de Detalle y Contacto */}
      <ProfileModal
        psychologist={selectedPsychologist}
        onClose={() => setSelectedPsychologist(null)}
      />

    </div>
  );
};
