import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useStats } from './StatsContext';

const CAREERS_MAP = {
  civil: { name: "Ingeniería Civil", color: "#10b981" }, // emerald-500
  electricidad: { name: "Ingeniería Electrónica", color: "#3b82f6" }, // blue-500
  industrial: { name: "Ingeniería Industrial", color: "#f59e0b" }, // amber-500
  informatica: { name: "Ingeniería Informática", color: "#8b5cf6" }, // violet-500
  mecatronica: { name: "Ingeniería Mecatrónica", color: "#14b8a6" }, // teal-500
};

export function StatsDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { stats, loadStats } = useStats();

  useEffect(() => {
    loadStats();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const getCareerName = (key) => CAREERS_MAP[key]?.name || key;
  const getCareerColor = (key) => CAREERS_MAP[key]?.color || "gray";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src="/Logo_verde.png" 
                alt="Universidad Ricardo Palma" 
                className="w-12 h-12"
              />
              <div>
                <h1 className="text-xl font-bold text-slate-800">Dashboard de Estadísticas</h1>
                <p className="text-sm text-slate-600">Panel de Administración</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/admin/upload')}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Subir Exámenes
              </button>
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Ver Sitio
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {stats.loading ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600">Cargando estadísticas...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Resumen General */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Total de Exámenes */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-medium">Total de Exámenes</p>
                    <p className="text-4xl font-bold text-slate-800">{stats.totalExams}</p>
                    <p className="text-xs text-slate-500 mt-1">En todas las carreras</p>
                  </div>
                </div>
              </div>

              {/* Total de Visualizaciones */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-medium">Total de Visualizaciones</p>
                    <p className="text-4xl font-bold text-slate-800">{stats.totalClicks}</p>
                    <p className="text-xs text-slate-500 mt-1">Clics en "Ver Examen"</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Exámenes por Carrera */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Exámenes por Carrera</h2>
                  <p className="text-sm text-slate-600">Distribución de exámenes disponibles</p>
                </div>
              </div>

              {stats.examsByCareer.length === 0 ? (
                <p className="text-center text-slate-500 py-8">No hay datos disponibles</p>
              ) : (
                <div className="space-y-2">
                  {/* Encontrar el valor máximo para escalar las barras */}
                  {(() => {
                    const maxCount = Math.max(...stats.examsByCareer.map(item => item.count));
                    const sortedData = [...stats.examsByCareer].sort((a, b) => b.count - a.count);
                    
                    return sortedData.map((item) => {
                      const barWidth = maxCount > 0 ? (item.count / maxCount) * 100 : 0;
                      const colorClass = getCareerColor(item.career);
                      
                      return (
                        <div key={item.career} className="group">
                          <div className="flex items-center gap-3">
                            {/* Nombre de la carrera */}
                            <div className="w-48 text-sm font-medium text-slate-700 truncate">
                              {getCareerName(item.career)}
                            </div>
                            
                            {/* Barra del gráfico */}
                            <div className="flex-1 flex items-center gap-2">
                              <div className="flex-1 bg-slate-100 rounded-full h-8 overflow-hidden">
                                <div 
                                  className={`h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-700 ease-out flex items-center justify-end px-3`}
                                  style={{ width: `${barWidth}%` }}
                                >
                                  <span className="text-white text-sm font-bold">{item.count}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              )}
            </div>

            {/* Visualizaciones por Carrera */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Visualizaciones por Carrera</h2>
                  <p className="text-sm text-slate-600">Clics en "Ver Examen" por carrera</p>
                </div>
              </div>

              {stats.clicksByCareer.length === 0 ? (
                <p className="text-center text-slate-500 py-8">No hay datos de visualizaciones aún</p>
              ) : (
                <div className="space-y-2">
                  {/* Encontrar el valor máximo para escalar las barras */}
                  {(() => {
                    const maxCount = Math.max(...stats.clicksByCareer.map(item => item.count));
                    const sortedData = [...stats.clicksByCareer].sort((a, b) => b.count - a.count);
                    
                    return sortedData.map((item) => {
                      const barWidth = maxCount > 0 ? (item.count / maxCount) * 100 : 0;
                      const colorClass = getCareerColor(item.career);
                      
                      return (
                        <div key={item.career} className="group">
                          <div className="flex items-center gap-3">
                            {/* Nombre de la carrera */}
                            <div className="w-48 text-sm font-medium text-slate-700 truncate">
                              {getCareerName(item.career)}
                            </div>
                            
                            {/* Barra del gráfico */}
                            <div className="flex-1 flex items-center gap-2">
                              <div className="flex-1 bg-slate-100 rounded-full h-8 overflow-hidden">
                                <div 
                                  className={`h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-700 ease-out flex items-center justify-end px-3`}
                                  style={{ width: `${barWidth}%` }}
                                >
                                  <span className="text-white text-sm font-bold">{item.count}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              )}
            </div>

            {/* Ratio de Visualización */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Ratio de Visualización</h2>
                  <p className="text-sm text-slate-600">Promedio de visualizaciones por examen</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stats.examsByCareer.map((examData) => {
                  const clickData = stats.clicksByCareer.find(c => c.career === examData.career);
                  const clicks = clickData ? clickData.count : 0;
                  const ratio = examData.count > 0 ? (clicks / examData.count).toFixed(2) : '0.00';
                  const colorClass = getCareerColor(examData.career);

                  return (
                    <div 
                      key={examData.career}
                      className="border border-slate-200 rounded-xl p-4 hover:border-slate-300 hover:shadow-md transition-all"
                    >
                      <p className="text-sm font-medium text-slate-600 mb-2">
                        {getCareerName(examData.career)}
                      </p>
                      <p className="text-3xl font-bold text-slate-800 mb-1">
                        {ratio}
                      </p>
                      <p className="text-xs text-slate-500">
                        {clicks} vistas / {examData.count} exámenes
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
