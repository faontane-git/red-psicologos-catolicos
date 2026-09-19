import React from 'react';
import { HeartHandshake, FileText, UserPlus, Lock } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Name */}
          <button 
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-3 text-left group focus:outline-hidden cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-blue-900 flex items-center justify-center text-amber-400 shadow-md group-hover:bg-blue-950 transition">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M7 7h10" />
              </svg>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-blue-950 block">
                Red de Psicólogos Católicos
              </span>
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-widest flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Latinoamérica
              </span>
            </div>
          </button>

          {/* Navigation Items */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setCurrentTab('directory')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 cursor-pointer ${
                currentTab === 'directory'
                  ? 'bg-blue-50 text-blue-900 font-semibold'
                  : 'text-slate-600 hover:text-blue-900 hover:bg-slate-100'
              }`}
            >
              <HeartHandshake className="w-4 h-4 text-blue-700" />
              Directorio Latam
            </button>

            <button
              onClick={() => setCurrentTab('ethics')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 cursor-pointer ${
                currentTab === 'ethics'
                  ? 'bg-blue-50 text-blue-900 font-semibold'
                  : 'text-slate-600 hover:text-blue-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4 text-blue-700" />
              Antropología y Fe
            </button>

            <button
              onClick={() => setCurrentTab('admission')}
              className={`ml-2 px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 shadow-xs cursor-pointer ${
                currentTab === 'admission'
                  ? 'bg-blue-900 text-white'
                  : 'bg-slate-900 text-white hover:bg-blue-900'
              }`}
            >
              <UserPlus className="w-4 h-4 text-amber-400" />
              Postular como Especialista
            </button>

            <button
              onClick={() => setCurrentTab('admin')}
              title="Acceso exclusivo para el Comité de Admisión"
              className={`ml-1 p-2 rounded-lg text-xs font-medium transition border flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'admin'
                  ? 'bg-amber-50 text-amber-900 border-amber-300'
                  : 'text-slate-500 border-slate-200 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden lg:inline">Comité</span>
            </button>
          </nav>

          {/* Mobile Menu Icon */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setCurrentTab('directory')}
              className={`p-2 rounded-lg text-xs font-semibold ${
                currentTab === 'directory' ? 'bg-blue-100 text-blue-900' : 'text-slate-700'
              }`}
            >
              Directorio
            </button>
            <button
              onClick={() => setCurrentTab('admission')}
              className="bg-blue-900 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1"
            >
              <UserPlus className="w-3 h-3 text-amber-400" />
              Postular
            </button>
            <button
              onClick={() => setCurrentTab('admin')}
              className="p-1.5 border rounded-lg text-slate-600"
            >
              <Lock className="w-3.5 h-3.5 text-amber-600" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
