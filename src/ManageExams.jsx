import React, { useState, useMemo } from 'react';
import { AdminLayout } from './AdminComponents';

// ---- Manage Exams Component ----
export function ManageExamsPage() {
  // En una app real, estos datos vendrían de una API
  const [exams, setExams] = useState([
    {
      id: 1,
      title: "Base de Datos - Parcial A",
      course: "Base de Datos",
      career: "informatica",
      cycle: "III",
      type: "Parcial",
      period: "1",
      year: 2024,
      professor: "Dr. García López",
      difficulty: "Intermedio",
      downloads: 156,
      rating: 4.2,
      status: "published",
      uploadDate: "2024-08-15",
      tags: ["SQL", "Normalización", "ER"]
    },
    {
      id: 2,
      title: "Algoritmos - Final B",
      course: "Algoritmos y Estructuras de Datos",
      career: "informatica",
      cycle: "II",
      type: "Final",
      period: "2",
      year: 2023,
      professor: "Mg. Rodríguez Silva",
      difficulty: "Avanzado",
      downloads: 203,
      rating: 4.8,
      status: "published",
      uploadDate: "2024-07-20",
      tags: ["Recursión", "Grafos", "Complejidad"]
    },
    {
      id: 3,
      title: "Sistemas Operativos - Sustitutorio",
      course: "Sistemas Operativos",
      career: "informatica",
      cycle: "V",
      type: "Sustitutorio",
      period: "2",
      year: 2022,
      professor: "Dr. Mendoza Torres",
      difficulty: "Avanzado",
      downloads: 89,
      rating: 3.9,
      status: "pending",
      uploadDate: "2024-09-01",
      tags: ["Procesos", "Memoria", "Sincronización"]
    }
  ]);

  const [filters, setFilters] = useState({
    search: '',
    career: '',
    status: '',
    difficulty: ''
  });
  
  const [selectedExams, setSelectedExams] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingExam, setEditingExam] = useState(null);

  const careers = [
    { key: "informatica", name: "Ingeniería Informática" },
    { key: "civil", name: "Ingeniería Civil" },
    { key: "mecatronica", name: "Ingeniería Mecatrónica" },
    { key: "industrial", name: "Ingeniería Industrial" },
    { key: "electricidad", name: "Ingeniería Electrónica" },
  ];

  const filteredExams = useMemo(() => {
    return exams.filter(exam => {
      const matchesSearch = filters.search === '' || 
        exam.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        exam.course.toLowerCase().includes(filters.search.toLowerCase()) ||
        exam.professor.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesCareer = filters.career === '' || exam.career === filters.career;
      const matchesStatus = filters.status === '' || exam.status === filters.status;
      const matchesDifficulty = filters.difficulty === '' || exam.difficulty === filters.difficulty;
      
      return matchesSearch && matchesCareer && matchesStatus && matchesDifficulty;
    });
  }, [exams, filters]);

  const handleSelectExam = (examId) => {
    setSelectedExams(prev => 
      prev.includes(examId) 
        ? prev.filter(id => id !== examId)
        : [...prev, examId]
    );
  };

  const handleSelectAll = () => {
    if (selectedExams.length === filteredExams.length) {
      setSelectedExams([]);
    } else {
      setSelectedExams(filteredExams.map(exam => exam.id));
    }
  };

  const handleStatusChange = (examId, newStatus) => {
    setExams(prev => prev.map(exam => 
      exam.id === examId ? { ...exam, status: newStatus } : exam
    ));
  };

  const handleDeleteExams = () => {
    setExams(prev => prev.filter(exam => !selectedExams.includes(exam.id)));
    setSelectedExams([]);
    setShowDeleteModal(false);
  };

  const getStatusBadge = (status) => {
    const styles = {
      published: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      draft: "bg-gray-100 text-gray-800 border-gray-200",
      rejected: "bg-red-100 text-red-800 border-red-200"
    };
    
    const labels = {
      published: "Publicado",
      pending: "Pendiente",
      draft: "Borrador",
      rejected: "Rechazado"
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const getDifficultyBadge = (difficulty) => {
    const styles = {
      "Básico": "bg-green-100 text-green-800 border-green-200",
      "Intermedio": "bg-yellow-100 text-yellow-800 border-yellow-200",
      "Avanzado": "bg-red-100 text-red-800 border-red-200"
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[difficulty]}`}>
        {difficulty}
      </span>
    );
  };

  return (
    <AdminLayout title="Gestionar exámenes del repositorio">
      <div className="space-y-6">
        {/* Header with actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Gestionar Exámenes</h1>
            <p className="text-slate-600">
              {filteredExams.length} exámenes {selectedExams.length > 0 && `(${selectedExams.length} seleccionados)`}
            </p>
          </div>
          
          <div className="flex gap-3">
            {selectedExams.length > 0 && (
              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors"
              >
                Eliminar ({selectedExams.length})
              </button>
            )}
            <button
              onClick={() => window.location.href = '/admin/upload'}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-medium transition-all"
            >
              + Nuevo Examen
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Buscar</label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                placeholder="Título, curso, profesor..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Carrera</label>
              <select
                value={filters.career}
                onChange={(e) => setFilters(prev => ({ ...prev, career: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="">Todas las carreras</option>
                {careers.map(career => (
                  <option key={career.key} value={career.key}>{career.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Estado</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="">Todos los estados</option>
                <option value="published">Publicado</option>
                <option value="pending">Pendiente</option>
                <option value="draft">Borrador</option>
                <option value="rejected">Rechazado</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Dificultad</label>
              <select
                value={filters.difficulty}
                onChange={(e) => setFilters(prev => ({ ...prev, difficulty: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="">Todas las dificultades</option>
                <option value="Básico">Básico</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
              </select>
            </div>
          </div>
        </div>

        {/* Exams Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedExams.length === filteredExams.length && filteredExams.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Examen</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Detalles</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Estado</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Métricas</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredExams.map((exam) => (
                  <tr key={exam.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedExams.includes(exam.id)}
                        onChange={() => handleSelectExam(exam.id)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-slate-800">{exam.title}</p>
                        <p className="text-sm text-slate-600">{exam.course}</p>
                        <p className="text-xs text-slate-500">Prof. {exam.professor}</p>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {getDifficultyBadge(exam.difficulty)}
                          <span className="text-xs text-slate-500">Ciclo {exam.cycle}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {exam.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-blue-50 text-blue-700 border border-blue-200">
                              #{tag}
                            </span>
                          ))}
                          {exam.tags.length > 2 && (
                            <span className="text-xs text-slate-400">+{exam.tags.length - 2}</span>
                          )}
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        {getStatusBadge(exam.status)}
                        <p className="text-xs text-slate-500">
                          Subido: {new Date(exam.uploadDate).toLocaleDateString()}
                        </p>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs text-slate-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                          </svg>
                          {exam.downloads}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-600">
                          <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {exam.rating}
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <select
                          value={exam.status}
                          onChange={(e) => handleStatusChange(exam.id, e.target.value)}
                          className="text-xs px-2 py-1 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="published">Publicado</option>
                          <option value="pending">Pendiente</option>
                          <option value="draft">Borrador</option>
                          <option value="rejected">Rechazado</option>
                        </select>
                        
                        <button
                          onClick={() => setEditingExam(exam)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        
                        <button
                          onClick={() => {
                            setSelectedExams([exam.id]);
                            setShowDeleteModal(true);
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredExams.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">No se encontraron exámenes</h3>
              <p className="text-slate-600">Intenta ajustar los filtros o crear un nuevo examen.</p>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Confirmar eliminación</h3>
                <p className="text-slate-600 mb-6">
                  ¿Estás seguro de que quieres eliminar {selectedExams.length === 1 ? 'este examen' : `estos ${selectedExams.length} exámenes`}? 
                  Esta acción no se puede deshacer.
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleDeleteExams}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
