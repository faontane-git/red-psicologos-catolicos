import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { DirectoryPage } from './pages/DirectoryPage';
import { AdmissionPage } from './pages/AdmissionPage';
import { EthicsPage } from './pages/EthicsPage';
import { AdminPage } from './pages/AdminPage';
import type { LatamStats } from './types';
import { api } from './services/api';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [stats, setStats] = useState<LatamStats>({
    total_approved: 5,
    total_pending: 1,
    countries_count: 5,
    specialties_count: 7,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  useEffect(() => {
    api.getStats().then(setStats);
  }, [currentTab]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 selection:bg-blue-900 selection:text-white">
      {/* Barra de navegación superior */}
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Contenedor principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentTab === 'home' && (
          <HomePage onNavigate={setCurrentTab} stats={stats} />
        )}
        {currentTab === 'directory' && <DirectoryPage />}
        {currentTab === 'admission' && (
          <AdmissionPage onSuccessNavigate={() => setCurrentTab('directory')} />
        )}
        {currentTab === 'ethics' && <EthicsPage />}
        {currentTab === 'admin' && <AdminPage />}
      </main>

      {/* Pie de página institucional */}
      <Footer />
    </div>
  );
};

export default App;
