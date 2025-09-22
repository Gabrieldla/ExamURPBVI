import React, { useMemo, useState } from "react";
import { HashRouter, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { AuthProvider } from "./AuthContext";
import { ExamsProvider, useExams } from "./ExamsContext";
import { useAuth } from "./AuthContext";
import { LoginPage } from "./AdminComponents";
import { UploadExamPage } from "./UploadExam";
import { ProtectedRoute } from "./ProtectedRoute";

// ---- Mock Data ----
const CAREERS = [
  { key: "informatica", name: "Ingeniería Informática", color: "from-emerald-500 to-teal-600" },
  { key: "civil", name: "Ingeniería Civil", color: "from-emerald-600 to-teal-500" },
  { key: "mecatronica", name: "Ingeniería Mecatrónica", color: "from-teal-500 to-emerald-600" },
  { key: "industrial", name: "Ingeniería Industrial", color: "from-teal-600 to-emerald-500" },
  { key: "electricidad", name: "Ingeniería Electrónica", color: "from-emerald-500 to-teal-500" },
];



// ---- UI Primitives ----
function Page({ title, children, backTo }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          {backTo ? (
            <button
              onClick={() => navigate(backTo)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver
            </button>
          ) : null}
          <div className="flex items-center gap-3">
            <img 
              src="/logo_bvi-2021.png" 
              alt="Universidad Ricardo Palma" 
              className="w-10 h-10"
            />
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {title}
            </h1>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <span className="text-sm text-slate-500 hidden sm:block">ExamURP</span>
            
            {user && user.id ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="hidden sm:block">{user.avatar}</span>
                  <span className="hidden md:block">{user.name}</span>
                </div>
                <Link
                  to="/admin"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-600 transition-colors text-sm font-medium"
                  title="Panel de Administración"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                  <span className="hidden sm:block">Admin</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-600 transition-colors text-sm font-medium"
                  title="Cerrar sesión"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="hidden sm:block">Salir</span>
                </button>
              </div>
            ) : (
              <Link 
                to="/admin/login"
                className="text-sm text-slate-600 hover:text-emerald-600 transition-colors"
                title="Panel de Administración"
              >
                Admin
              </Link>
            )}
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
      <footer className="max-w-7xl mx-auto px-4 py-8 text-center text-sm text-slate-500 border-t border-slate-200 bg-white/50">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Gabriel De La Rivera - BVI Universidad Ricardo Palma</p>
        </div>
      </footer>
    </div>
  );
}

function Card({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`group text-left bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-lg rounded-2xl p-6 shadow-sm transition-all duration-300 w-full transform hover:-translate-y-1 ${className}`}
    >
      {children}
    </button>
  );
}

function StatsCard({ title, value, subtitle }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 text-center max-w-sm">
      <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <p className="text-sm text-slate-500 mb-2">{title}</p>
      <p className="text-3xl font-bold text-slate-800 mb-1">{value}</p>
      <p className="text-xs text-slate-400">{subtitle}</p>
    </div>
  );
}

// ---- Pages ----
function CareersPage() {
  const navigate = useNavigate();
  const { exams, loading } = useExams();
  const totalExams = exams.length;
  
  return (
    <Page title="Repositorio de Exámenes - URP">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-slate-800 mb-4">
          Repositorio de Exámenes Pasados
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Accede a una colección de exámenes organizados por carrera y ciclo académico. 
          Prepárate mejor para tus evaluaciones.
        </p>
      </div>

      {/* Stats */}
      <div className="flex justify-center mb-12">
        <StatsCard 
          title="Total de Exámenes Disponibles" 
          value={totalExams} 
          subtitle="Listos para descargar"
        />
      </div>

      {/* Careers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CAREERS.map((career, index) => (
          <Card 
            key={career.key} 
            onClick={() => navigate(`/career/${career.key}`)}
            className="group-hover:scale-105"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-4">
              <div className={`w-16 h-16 bg-gradient-to-r ${career.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-lg font-bold text-slate-800 mb-2">{career.name}</div>
                <p className="text-sm text-slate-500 mb-3">
                  Explora exámenes pasados organizados por ciclo y tipo de evaluación.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    {exams.filter(exam => exam.career === career.key).length} exámenes
                  </span>
                  <div className="flex items-center gap-1 text-xs text-emerald-600">
                    <span>Ver exámenes</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Page>
  );
}

function FilterBar({ value, onChange }) {
  const { exams } = useExams();
  const setField = (k, v) => onChange({ ...value, [k]: v });

  const cycles = ["1","2","3","4","5","6","7","8","9","10"];
  const years = Array.from(new Set(exams.map(e => e.year))).sort((a,b) => b-a);

  return (
    <div className="bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 rounded-2xl p-6 shadow-sm mb-8">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <span className="font-medium text-slate-700">Filtros de búsqueda</span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Search Input */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-medium text-slate-700 mb-2">Buscar examen</label>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={value.q}
              onChange={(e) => setField("q", e.target.value)}
              placeholder="Curso, tema o palabra clave..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Ciclo</label>
          <select
            value={value.cycle}
            onChange={(e) => setField("cycle", e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white transition-colors text-sm"
          >
            <option value="">Todos</option>
            {cycles.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Tipo</label>
          <select
            value={value.type}
            onChange={(e) => setField("type", e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white transition-colors text-sm"
          >
            <option value="">Todos</option>
            <option value="Parcial">Parcial</option>
            <option value="Final">Final</option>
            <option value="Susti">Sustitutorio</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Periodo</label>
          <select
            value={value.period}
            onChange={(e) => setField("period", e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white transition-colors text-sm"
          >
            <option value="">Todos</option>
            <option value="1">1er Período</option>
            <option value="2">2do Período</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Año</label>
          <select
            value={value.year}
            onChange={(e) => setField("year", e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white transition-colors text-sm"
          >
            <option value="">Todos</option>
            {years.map(y => <option key={y} value={String(y)}>{y}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}

function ExamCard({ exam }) {
  const { deleteExam } = useExams();
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const { openEditModal } = useEditModal();
  const { showConfirm } = useConfirmDialog();
  const [deleting, setDeleting] = useState(false);

  const handleDownload = () => {
    if (exam.exam_url) {
      // Abrir enlace
      window.open(exam.exam_url, '_blank', 'noopener,noreferrer');
    } else {
      alert('Enlace del examen no disponible');
    }
  };

  const handleDelete = async () => {
    const confirmed = await showConfirm(
      `¿Estás seguro de que quieres eliminar el examen "${exam.title}"?`,
      () => {}, // onConfirm callback (vacío porque manejamos con el return)
      () => {} // onCancel callback (vacío porque manejamos con el return)
    );

    if (!confirmed) {
      return;
    }

    setDeleting(true);
    const result = await deleteExam(exam.id);
    
    // Pequeño delay para asegurar que la notificación se muestre correctamente
    setTimeout(() => {
      if (!result.success) {
        addNotification('Error al eliminar el examen: ' + result.error, 'error');
      } else {
        addNotification('Examen eliminado exitosamente', 'success');
      }
    }, 100);
    
    setDeleting(false);
  };

  const handleEdit = () => {
    openEditModal(exam);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-emerald-300 transition-all duration-300 hover:-translate-y-1 group">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-800 group-hover:text-emerald-600 transition-colors mb-2">
            {exam.title}
          </h3>
          <p className="text-sm text-slate-600 mb-1">{exam.course}</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleDownload}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium text-sm shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            Ver Examen
          </button>
          
          {/* Botones de admin - solo mostrar si está autenticado */}
          {user && user.id && (
            <div className="flex gap-1">
              <button
                onClick={handleEdit}
                className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors"
                title="Editar examen"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition-colors disabled:opacity-50"
                title="Eliminar examen"
              >
                {deleting ? (
                  <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-xs">
        <div className="bg-slate-50 rounded-lg p-2 text-center">
          <p className="text-slate-500">Ciclo</p>
          <p className="font-semibold text-slate-800">{exam.cycle}</p>
        </div>
        <div className="bg-slate-50 rounded-lg p-2 text-center">
          <p className="text-slate-500">Tipo</p>
          <p className="font-semibold text-slate-800">{exam.type}</p>
        </div>
        <div className="bg-slate-50 rounded-lg p-2 text-center">
          <p className="text-slate-500">Período</p>
          <p className="font-semibold text-slate-800">{exam.period}</p>
        </div>
        <div className="bg-slate-50 rounded-lg p-2 text-center">
          <p className="text-slate-500">Año</p>
          <p className="font-semibold text-slate-800">{exam.year}</p>
        </div>
      </div>
    </div>
  );
}

function ExamsPage() {
  const { careerKey } = useParams();
  const career = CAREERS.find(c => c.key === careerKey);
  const { exams: allExams, loading } = useExams();
  const [filters, setFilters] = useState({ q: "", cycle: "", type: "", period: "", year: "" });
  const [sortBy, setSortBy] = useState("newest");

  const exams = useMemo(() => allExams.filter(e => e.career === careerKey), [allExams, careerKey]);

  const filtered = useMemo(() => {
    let result = exams.filter(e => {
      const matchesQ = filters.q
        ? (e.title.toLowerCase().includes(filters.q.toLowerCase()) ||
           e.course.toLowerCase().includes(filters.q.toLowerCase()))
        : true;
      const matchesCycle = filters.cycle ? e.cycle === filters.cycle : true;
      const matchesType = filters.type ? e.type === filters.type : true;
      const matchesPeriod = filters.period ? e.period === filters.period : true;
      const matchesYear = filters.year ? String(e.year) === filters.year : true;
      return matchesQ && matchesCycle && matchesType && matchesPeriod && matchesYear;
    });

    // Apply sorting
    switch (sortBy) {
      case "oldest":
        result.sort((a, b) => a.year - b.year);
        break;

      case "newest":
      default:
        result.sort((a, b) => b.year - a.year);
        break;
    }

    return result;
  }, [exams, filters, sortBy]);

  if (!career) {
    return (
      <Page title="Carrera no encontrada" backTo="/">
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Carrera no encontrada</h2>
          <p className="text-slate-600 mb-6">La carrera que buscas no existe o ha sido movida.</p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            </svg>
            Ver todas las carreras
          </Link>
        </div>
      </Page>
    );
  }

  return (
    <Page title={`${career.name} - Exámenes`} backTo="/">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-slate-600">
        <Link to="/" className="text-emerald-600 hover:text-emerald-800 transition-colors">Carreras</Link>
        <span className="mx-2 text-slate-400">/</span>
        <span className="text-slate-800 font-medium">{career.name}</span>
      </div>

      {/* Career Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-16 h-16 bg-gradient-to-r ${career.color} rounded-2xl flex items-center justify-center shadow-lg`}>
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{career.name}</h1>
            <p className="text-slate-600">Explora exámenes pasados y prepárate para tus evaluaciones</p>
          </div>
        </div>
        
        <div className="text-center pt-4 border-t border-slate-100">
          <p className="text-2xl font-bold text-emerald-600">{exams.length}</p>
          <p className="text-sm text-slate-500">Exámenes disponibles</p>
        </div>
      </div>

      {/* Filters */}
      <FilterBar value={filters} onChange={setFilters} />

      {/* Results Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <p className="text-lg font-semibold text-slate-800">
            {filtered.length} exámenes encontrados
          </p>
          {Object.values(filters).some(v => v) && (
            <p className="text-sm text-slate-500">
              Mostrando resultados filtrados
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-700">Ordenar por:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-sm"
          >
            <option value="newest">Más recientes</option>
            <option value="oldest">Más antiguos</option>
          </select>
        </div>
      </div>

      {/* Results Grid */}
      {loading ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Cargando exámenes...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.length === 0 ? (
          <div className="col-span-full">
            <div className="text-center py-16 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">No se encontraron exámenes</h3>
              <p className="text-slate-600 mb-6">
                {Object.values(filters).some(v => v) 
                  ? "Intenta ajustar los filtros para encontrar más resultados."
                  : "Aún no hay exámenes disponibles para esta carrera."
                }
              </p>
              {Object.values(filters).some(v => v) && (
                <button
                  onClick={() => setFilters({ q: "", cycle: "", type: "", period: "", year: "" })}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Limpiar filtros
                </button>
              )}
            </div>
          </div>
        ) : (
          filtered.map((exam, index) => (
            <div 
              key={exam.id} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ExamCard exam={exam} />
            </div>
          ))
        )}
        </div>
      )}
    </Page>
  );
}

// ---- Confirm Dialog System ----
const ConfirmDialogContext = React.createContext();

function ConfirmDialogProvider({ children }) {
  const [confirmDialog, setConfirmDialog] = useState(null);
  
  const showConfirm = (message, onConfirm, onCancel = () => {}) => {
    return new Promise((resolve) => {
      setConfirmDialog({
        message,
        onConfirm: () => {
          onConfirm();
          setConfirmDialog(null);
          resolve(true);
        },
        onCancel: () => {
          onCancel();
          setConfirmDialog(null);
          resolve(false);
        }
      });
    });
  };

  return (
    <ConfirmDialogContext.Provider value={{ showConfirm }}>
      {children}
      {confirmDialog && <ConfirmDialog {...confirmDialog} />}
    </ConfirmDialogContext.Provider>
  );
}

function ConfirmDialog({ message, onConfirm, onCancel }) {
  // Cerrar con tecla Escape
  React.useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onCancel]);

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 1100
      }}
      onClick={onCancel}
    >
      <div 
        className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-md border border-slate-200"
        style={{ zIndex: 1101 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">Confirmar acción</h3>
            <p className="text-slate-600 text-sm">Esta acción no se puede deshacer</p>
          </div>
        </div>
        
        <p className="text-slate-700 mb-6 leading-relaxed">{message}</p>
        
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium rounded-xl transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

function useConfirmDialog() {
  const context = React.useContext(ConfirmDialogContext);
  if (!context) {
    return {
      showConfirm: (message) => {
        return Promise.resolve(window.confirm(message));
      }
    };
  }
  return context;
}

// ---- Edit Modal System ----
const EditModalContext = React.createContext();

function EditModalProvider({ children }) {
  const [editingExam, setEditingExam] = useState(null);
  
  const openEditModal = (exam) => {
    setEditingExam(exam);
  };
  
  const closeEditModal = () => {
    setEditingExam(null);
  };

  return (
    <EditModalContext.Provider value={{ openEditModal, closeEditModal }}>
      {children}
      {/* Portal para asegurar que la modal se renderice correctamente */}
      {editingExam && (
        <div id="modal-root">
          <EditModal exam={editingExam} onClose={closeEditModal} />
        </div>
      )}
    </EditModalContext.Provider>
  );
}

function EditModal({ exam, onClose }) {
  const { updateExam } = useExams();
  const { addNotification } = useNotifications();
  const [editData, setEditData] = useState({
    title: exam.title,
    course: exam.course,
    cycle: exam.cycle,
    type: exam.type,
    period: exam.period,
    year: exam.year,
    exam_url: exam.exam_url
  });

  // Cerrar modal con tecla Escape y prevenir scroll
  React.useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        onClose();
      }
    };

    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [onClose]);

  const handleSave = async () => {
    const result = await updateExam(exam.id, editData);
    
    if (result.success) {
      addNotification('Examen actualizado exitosamente', 'success');
      onClose();
    } else {
      addNotification('Error al actualizar el examen: ' + result.error, 'error');
    }
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <div 
        className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto relative border border-slate-200"
        style={{ zIndex: 1001 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-slate-800 mb-4">Editar Examen</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Título</label>
            <input
              type="text"
              value={editData.title}
              onChange={(e) => setEditData({...editData, title: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Curso</label>
            <input
              type="text"
              value={editData.course}
              onChange={(e) => setEditData({...editData, course: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Ciclo</label>
              <select
                value={editData.cycle}
                onChange={(e) => setEditData({...editData, cycle: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {["I","II","III","IV","V","VI","VII","VIII","IX","X"].map(c => 
                  <option key={c} value={c}>{c}</option>
                )}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tipo</label>
              <select
                value={editData.type}
                onChange={(e) => setEditData({...editData, type: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Parcial">Parcial</option>
                <option value="Final">Final</option>
                <option value="Sustitutorio">Sustitutorio</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Período</label>
              <select
                value={editData.period}
                onChange={(e) => setEditData({...editData, period: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="1">1er Período</option>
                <option value="2">2do Período</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Año</label>
              <input
                type="number"
                value={editData.year}
                onChange={(e) => setEditData({...editData, year: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                min="2020"
                max="2030"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">URL del Examen</label>
            <input
              type="url"
              value={editData.exam_url}
              onChange={(e) => setEditData({...editData, exam_url: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="https://..."
            />
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium py-2 px-4 rounded-xl transition-colors"
          >
            Guardar
          </button>
          <button
            onClick={onClose}
            className="flex-1 border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium py-2 px-4 rounded-xl transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

function useEditModal() {
  const context = React.useContext(EditModalContext);
  if (!context) {
    // Fallback si no hay contexto disponible
    return {
      openEditModal: () => {
        console.warn('EditModalContext not available');
        alert('Función de edición no disponible');
      },
      closeEditModal: () => {}
    };
  }
  return context;
}

// ---- Notification System ----
function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    const notification = { id, message, type };
    
    setNotifications(prev => [...prev, notification]);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <NotificationContainer notifications={notifications} onRemove={removeNotification} />
    </NotificationContext.Provider>
  );
}

const NotificationContext = React.createContext();

function NotificationContainer({ notifications, onRemove }) {
  if (notifications.length === 0) return null;

  // Agregar estilos de animación al head si no existen
  React.useEffect(() => {
    if (!document.getElementById('notification-styles')) {
      const style = document.createElement('style');
      style.id = 'notification-styles';
      style.textContent = `
        @keyframes slideInFromRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slideInFromRight 0.3s ease-out;
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);
  
  return (
    <div 
      className="fixed space-y-3" 
      style={{ 
        position: 'fixed',
        zIndex: 1050,
        top: '20px',
        right: '20px',
        maxWidth: 'calc(100vw - 40px)'
      }}
    >
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`w-80 bg-white shadow-xl rounded-xl border-l-4 p-4 transition-all duration-300 transform hover:scale-105 animate-slide-in ${
            notification.type === 'success' 
              ? 'border-emerald-500' 
              : notification.type === 'error'
              ? 'border-red-500'
              : 'border-blue-500'
          }`}
          style={{
            position: 'relative',
            zIndex: 1051,
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            animation: 'slideInFromRight 0.3s ease-out'
          }}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              {notification.type === 'success' && (
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                  <svg className="h-4 w-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              {notification.type === 'error' && (
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="h-4 w-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800 break-words leading-relaxed">
                {notification.message}
              </p>
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={() => onRemove(notification.id)}
                className="inline-flex items-center justify-center w-6 h-6 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function useNotifications() {
  const context = React.useContext(NotificationContext);
  if (!context) {
    // Fallback si no hay contexto disponible
    return {
      addNotification: (message, type) => {
        console.warn('NotificationContext not available, falling back to alert:', message);
        alert(message);
      }
    };
  }
  return context;
}

// ---- App Shell ----
function AppRoutes() {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="min-h-screen bg-white">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<CareersPage />} />
            <Route path="/career/:careerKey" element={<ExamsPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<LoginPage />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <UploadExamPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/upload" 
              element={
                <ProtectedRoute>
                  <UploadExamPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Fallback */}
            <Route path="*" element={<CareersPage />} />
          </Routes>
        </div>
      </HashRouter>
    </AuthProvider>
  );
}

export default function App() {
  return (
    <NotificationProvider>
      <ConfirmDialogProvider>
        <ExamsProvider>
          <EditModalProvider>
            <AppRoutes />
            <SpeedInsights />
          </EditModalProvider>
        </ExamsProvider>
      </ConfirmDialogProvider>
    </NotificationProvider>
  );
}