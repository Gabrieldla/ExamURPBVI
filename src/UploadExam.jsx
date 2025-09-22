import React, { useState, useCallback } from 'react';
import { AdminLayout } from './AdminComponents';
import { useExams } from './ExamsContext';

// ---- Upload Exam Component ----
export function UploadExamPage() {
  const { addExam } = useExams();
  const [formData, setFormData] = useState({
    title: '',
    course: '',
    career: '',
    cycle: '',
    type: '',
    period: '',
    year: new Date().getFullYear(),
    examUrl: ''
  });
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const careers = [
    { key: "informatica", name: "Ingeniería Informática" },
    { key: "civil", name: "Ingeniería Civil" },
    { key: "mecatronica", name: "Ingeniería Mecatrónica" },
    { key: "industrial", name: "Ingeniería Industrial" },
    { key: "electricidad", name: "Ingeniería de Electricidad" },
  ];

  const cycles = ["1","2","3","4","5","6","7","8","9","10"];
  const examTypes = ["Parcial", "Final", "Sustitutorio"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError('');

    try {
      // Preparar datos para Supabase
      const examData = {
        title: formData.title,
        course: formData.course,
        career: formData.career,
        cycle: formData.cycle,
        type: formData.type,
        period: formData.period,
        year: parseInt(formData.year),
        exam_url: formData.examUrl
      };

      // Guardar en Supabase
      const result = await addExam(examData);
      
      if (result.success) {
        setSuccess(true);
        
        // Reset form
        setFormData({
          title: '',
          course: '',
          career: '',
          cycle: '',
          type: '',
          period: '',
          year: new Date().getFullYear(),
          examUrl: ''
        });
        
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(result.error || 'Error al guardar el examen');
      }
    } catch (error) {
      console.error('Error al subir:', error);
      setError('Error al guardar el examen');
    } finally {
      setUploading(false);
    }
  };



  return (
    <AdminLayout title="Subir nuevo examen">
      <div className="max-w-4xl mx-auto">
        {success && (
          <div className="mb-8 bg-green-50 border border-green-200 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-800">¡Examen guardado exitosamente!</h3>
                <p className="text-green-700">El examen ha sido agregado a la base de datos y está disponible para los estudiantes.</p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-800">Error al guardar</h3>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Subir Nuevo Examen</h1>
            <p className="text-slate-600">Completa la información del examen y sube los archivos correspondientes.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Información Básica */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                Información del Examen
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Título del Examen *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Ej: Algoritmos - Parcial A"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nombre del Curso *
                  </label>
                  <input
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Ej: Algoritmos y Estructuras de Datos"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Carrera *
                  </label>
                  <select
                    name="career"
                    value={formData.career}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                    required
                  >
                    <option value="">Seleccionar carrera</option>
                    {careers.map(career => (
                      <option key={career.key} value={career.key}>{career.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Ciclo *
                  </label>
                  <select
                    name="cycle"
                    value={formData.cycle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                    required
                  >
                    <option value="">Seleccionar</option>
                    {cycles.map(cycle => (
                      <option key={cycle} value={cycle}>{cycle}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Tipo de Examen *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                    required
                  >
                    <option value="">Seleccionar</option>
                    {examTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Período *
                  </label>
                  <select
                    name="period"
                    value={formData.period}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                    required
                  >
                    <option value="">Seleccionar</option>
                    <option value="1">1er Período</option>
                    <option value="2">2do Período</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Año *
                  </label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    min="2020"
                    max={new Date().getFullYear() + 1}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* URL del Examen */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                URL del Examen
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Enlace al Examen en el Repositorio URP *
                  </label>
                  <input
                    type="url"
                    name="examUrl"
                    value={formData.examUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="https://repositorio.urp.edu.pe/handle/123456789/examen-matematica-2024.pdf"
                    required
                  />
                  <p className="text-sm text-slate-500 mt-2">
                    Pega aquí el enlace directo al examen desde el repositorio oficial de la universidad
                  </p>
                </div>

                {/* Vista previa de la URL */}
                {formData.examUrl && validateUrl(formData.examUrl) && (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-emerald-800">URL válida detectada</p>
                        <p className="text-xs text-emerald-700 break-all">{formData.examUrl}</p>
                      </div>
                      <a
                        href={formData.examUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-emerald-500 text-white text-xs rounded-lg hover:bg-emerald-600 transition-colors"
                      >
                        Probar enlace
                      </a>
                    </div>
                  </div>
                )}

                {formData.examUrl && !validateUrl(formData.examUrl) && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-red-800">URL no válida</p>
                        <p className="text-xs text-red-700">Por favor ingresa una URL completa y válida</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200">
              <button
                type="button"
                className="px-6 py-3 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors"
                onClick={() => {
                  setFormData({
                    title: '', course: '', career: '', cycle: '', type: '', period: '', 
                    year: new Date().getFullYear(), examUrl: ''
                  });
                }}
              >
                Limpiar Formulario
              </button>
              
              <button
                type="submit"
                disabled={uploading || !formData.title || !formData.course || !formData.career || !formData.examUrl || !validateUrl(formData.examUrl)}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {uploading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Subiendo...
                  </div>
                ) : (
                  'Subir Examen'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
