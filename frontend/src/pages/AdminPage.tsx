import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  GraduationCap, 
  Church, 
  Eye, 
  Loader2, 
  RefreshCw,
  Lock,
  Mail,
  KeyRound,
  LogOut,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  FileText,
  Download
} from 'lucide-react';
import type { PsychologistAdmin, CommitteeUser } from '../types';
import { api } from '../services/api';

export const AdminPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<CommitteeUser | null>(api.getStoredUser());
  const [loginEmail, setLoginEmail] = useState('comite@redpsicologos.org');
  const [loginPassword, setLoginPassword] = useState('ComiteCatolico2026*');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  const [applications, setApplications] = useState<PsychologistAdmin[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<PsychologistAdmin | null>(null);
  const [actionNotes, setActionNotes] = useState('');
  const [updating, setUpdating] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const fetchApplications = () => {
    if (!currentUser) return;
    setLoading(true);
    api.getApplications(statusFilter).then((data) => {
      setApplications(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (currentUser) {
      fetchApplications();
    }
  }, [statusFilter, currentUser]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);
    const res = await api.login(loginEmail, loginPassword);
    setLoginLoading(false);

    if (res.success && res.user) {
      setCurrentUser(res.user);
      setToastMsg(`Bienvenido, ${res.user.full_name}`);
      setTimeout(() => setToastMsg(null), 3500);
    } else {
      setLoginError(res.error || 'Credenciales incorrectas');
    }
  };

  const handleLogout = () => {
    api.logout();
    setCurrentUser(null);
    setApplications([]);
    setSelectedApp(null);
  };

  const handleUpdateStatus = async (appId: number, newStatus: string) => {
    setUpdating(true);
    const res = await api.updateApplicationStatus(appId, newStatus, actionNotes || undefined);
    setUpdating(false);
    if (res.success) {
      setToastMsg(`Postulación actualizada a "${newStatus}"`);
      setTimeout(() => setToastMsg(null), 4000);
      setSelectedApp(null);
      setActionNotes('');
      fetchApplications();
    }
  };

  // --- VISTA DE LOGIN SI NO HAY SESIÓN ACTIVA ---
  if (!currentUser) {
    return (
      <div className="py-12 max-w-md mx-auto space-y-6 animate-in fade-in duration-200">
        
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-blue-900 text-amber-400 mx-auto flex items-center justify-center shadow-md">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Acceso al Comité de Admisión
          </h1>
          <p className="text-xs text-slate-500">
            Módulo restringido para los miembros del comité encargados de revisar títulos y avales eclesiales en Latinoamérica.
          </p>
        </div>

        {loginError && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{loginError}</span>
          </div>
        )}

        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
          <form onSubmit={handleLogin} className="space-y-4">
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-900" />
                Correo Institucional del Comité
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="comite@redpsicologos.org"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800"
                required
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-blue-900" />
                  Contraseña de Seguridad
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[11px] text-blue-800 hover:underline cursor-pointer"
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 px-4 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loginLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verificando credenciales...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Ingresar al Panel del Comité</span>
                </>
              )}
            </button>
          </form>

          {/* Botón de ayuda para pruebas rápidas */}
          <div className="pt-3 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={() => {
                setLoginEmail('comite@redpsicologos.org');
                setLoginPassword('ComiteCatolico2026*');
              }}
              className="text-xs text-slate-500 hover:text-blue-900 font-medium inline-flex items-center gap-1 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Autocompletar credenciales de demostración</span>
            </button>
          </div>
        </div>

      </div>
    );
  }

  // --- VISTA DEL PANEL ADMINISTRATIVO (USUARIO AUTENTICADO) ---
  const pendingCount = applications.filter(a => a.status === 'PENDING').length;
  const approvedCount = applications.filter(a => a.status === 'APPROVED').length;
  const rejectedCount = applications.filter(a => a.status === 'REJECTED').length;

  return (
    <div className="py-8 space-y-8 animate-in fade-in duration-150">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-slate-800 text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-bottom duration-200">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header con Perfil de Usuario y Logout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Sesión activa: <strong className="text-blue-950">{currentUser.full_name}</strong> ({currentUser.role})
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Comité de Validación Eclesial y Profesional
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Revisión manual de títulos habilitantes, números de colegiatura y avales parroquiales para Latinoamérica.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            onClick={fetchApplications}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition shadow-xs cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Actualizar</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-3.5 py-2 bg-slate-100 hover:bg-red-50 hover:text-red-700 hover:border-red-200 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>

      {/* Metrics Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Total Recibidas</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{applications.length}</div>
        </div>

        <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200 shadow-xs">
          <div className="text-xs font-semibold text-amber-800 uppercase tracking-wide flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            Pendientes de Revisión
          </div>
          <div className="text-2xl font-black text-amber-950 mt-1">{pendingCount}</div>
        </div>

        <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200 shadow-xs">
          <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wide flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5" />
            Aprobadas (Publicadas)
          </div>
          <div className="text-2xl font-black text-emerald-950 mt-1">{approvedCount}</div>
        </div>

        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
            <XCircle className="w-3.5 h-3.5" />
            Rechazadas / Observadas
          </div>
          <div className="text-2xl font-black text-slate-700 mt-1">{rejectedCount}</div>
        </div>
      </div>

      {/* Tabs Filter */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'ALL', label: 'Todas las Solicitudes' },
          { id: 'PENDING', label: `Pendientes (${pendingCount})` },
          { id: 'APPROVED', label: `Aprobadas (${approvedCount})` },
          { id: 'REJECTED', label: `Rechazadas (${rejectedCount})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setStatusFilter(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              statusFilter === tab.id
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Applications List */}
      {loading ? (
        <div className="py-20 text-center flex flex-col items-center justify-center text-slate-400 gap-2">
          <Loader2 className="w-7 h-7 animate-spin text-blue-900" />
          <p className="text-xs">Cargando bandeja de postulaciones...</p>
        </div>
      ) : applications.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 text-xs">
          No hay postulaciones registradas en esta categoría.
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map((app) => {
            const isPending = app.status === 'PENDING';
            const isApproved = app.status === 'APPROVED';

            return (
              <div
                key={app.id}
                className={`bg-white rounded-2xl border p-5 transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs ${
                  isPending ? 'border-amber-300 bg-amber-50/20' : 'border-slate-200'
                }`}
              >
                <div className="flex items-start gap-4 min-w-0">
                  <img
                    src={app.photo_url || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150"}
                    alt={app.full_name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-slate-900">{app.full_name}</h3>
                      
                      {isPending && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                          ⏳ Pendiente de Aprobación
                        </span>
                      )}
                      {isApproved && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          ✓ Aprobado y Visible
                        </span>
                      )}
                      {app.status === 'REJECTED' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800 border border-red-200">
                          ✕ Rechazado
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 mt-0.5">
                      {app.city}, <strong>{app.country}</strong> • {app.modality} • {app.email}
                    </p>

                    {/* Resumen de acreditación */}
                    <div className="flex items-center gap-4 mt-2 text-[11px] text-slate-600 flex-wrap">
                      <span className="flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5 text-blue-800" />
                        {app.credentials[0]?.license_number || 'Sin registro'}
                      </span>
                      {app.endorsement && (
                        <span className="flex items-center gap-1 text-slate-700">
                          <Church className="w-3.5 h-3.5 text-amber-700" />
                          {app.endorsement.parish_name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 w-full md:w-auto justify-end pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <button
                    onClick={() => {
                      setSelectedApp(app);
                      setActionNotes(app.committee_notes || '');
                    }}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Revisar Expediente</span>
                  </button>

                  {isPending && (
                    <button
                      onClick={() => handleUpdateStatus(app.id, 'APPROVED')}
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Aprobar</span>
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Modal de Inspección del Expediente */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100">
            
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-4">
                {selectedApp.photo_url ? (
                  <img
                    src={selectedApp.photo_url}
                    alt={selectedApp.full_name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-900/10 shadow-sm shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-xs text-slate-400 font-bold shrink-0">
                    Sin foto
                  </div>
                )}
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Expediente de Validación # {selectedApp.id}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 mt-1">
                    {selectedApp.full_name}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {selectedApp.city}, {selectedApp.country} • {selectedApp.email} • {selectedApp.phone}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Curriculum Vitae en PDF */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-red-600" />
                  Curriculum Vitae Obligatorio (Formato PDF)
                </h3>
                <span className="px-2 py-0.5 rounded-md bg-red-100 text-red-800 font-bold text-[10px] uppercase tracking-wider">
                  PDF Verificado
                </span>
              </div>
              {selectedApp.cv_url ? (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 font-extrabold text-xs border border-red-100">
                      PDF
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {selectedApp.cv_url.split('/').pop() || 'Curriculum_Vitae.pdf'}
                      </p>
                      <p className="text-[11px] text-slate-500">Documento de trayectoria profesional del postulante</p>
                    </div>
                  </div>
                  <a
                    href={selectedApp.cv_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-bold transition shrink-0 shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Ver / Descargar PDF</span>
                  </a>
                </div>
              ) : (
                <p className="text-xs text-amber-700 font-medium bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                  ⚠️ No se encontró documento PDF registrado para este expediente.
                </p>
              )}
            </div>

            {/* Acreditación Académica */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-blue-900" />
                1. Título Universitario y Licencia
              </h3>
              {selectedApp.credentials.map((c, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <p className="font-bold text-slate-900">{c.degree_title}</p>
                  <p className="text-slate-600">Universidad: {c.institution}</p>
                  <p className="font-mono text-blue-900 font-semibold">Registro Oficial / Colegiatura: {c.license_number}</p>
                </div>
              ))}
            </div>

            {/* Aval Eclesial */}
            {selectedApp.endorsement && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Church className="w-4 h-4 text-amber-700" />
                  2. Aval Parroquial y Referencia Sacerdotal
                </h3>
                <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200 text-xs space-y-2 text-amber-950">
                  <p><strong>Parroquia:</strong> {selectedApp.endorsement.parish_name}</p>
                  <p><strong>Diócesis:</strong> {selectedApp.endorsement.diocese}</p>
                  {selectedApp.endorsement.movement_or_community && (
                    <p><strong>Movimiento / Apostolado:</strong> {selectedApp.endorsement.movement_or_community}</p>
                  )}
                  <div className="pt-2 border-t border-amber-200">
                    <p className="font-bold">Sacerdote / Párroco de Referencia:</p>
                    <p>{selectedApp.endorsement.priest_reference_name}</p>
                    <p className="font-mono text-amber-900 mt-0.5">Contacto directo: {selectedApp.endorsement.priest_contact}</p>
                  </div>
                  <div className="pt-2 text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Compromiso deontológico y moral católico expresamente aceptado.</span>
                  </div>
                </div>
              </div>
            )}

            {/* Presentación y Enfoque */}
            <div className="space-y-1.5 text-xs">
              <h3 className="font-bold text-slate-900 uppercase tracking-wider">
                3. Presentación Profesional y Enfoque
              </h3>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 space-y-1">
                <p><strong>Enfoque:</strong> {selectedApp.therapeutic_approach}</p>
                <p><strong>Biografía:</strong> {selectedApp.bio}</p>
              </div>
            </div>

            {/* Notas del Comité */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Notas y Dictamen del Comité de Validación
              </label>
              <textarea
                rows={2}
                placeholder="Observaciones sobre la verificación del título o llamada al párroco..."
                value={actionNotes}
                onChange={(e) => setActionNotes(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800"
              />
            </div>

            {/* Botones de Dictamen */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 text-slate-600 hover:text-slate-900 text-xs font-semibold cursor-pointer"
              >
                Cerrar sin cambios
              </button>

              <div className="flex items-center gap-2">
                <button
                  disabled={updating}
                  onClick={() => handleUpdateStatus(selectedApp.id, 'REJECTED')}
                  className="px-3.5 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-xl text-xs font-bold transition disabled:opacity-50 cursor-pointer"
                >
                  Rechazar
                </button>

                <button
                  disabled={updating}
                  onClick={() => handleUpdateStatus(selectedApp.id, 'APPROVED')}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-xs disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>{updating ? 'Procesando...' : 'Aprobar y Publicar'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
