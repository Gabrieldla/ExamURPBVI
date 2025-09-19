import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

const ExamsContext = createContext();

export function ExamsProvider({ children }) {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar exámenes desde Supabase
  const loadExams = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('exams')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setExams(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Agregar nuevo examen
  const addExam = async (examData) => {
    try {
      const { data, error } = await supabase
        .from('exams')
        .insert([examData])
        .select();

      if (error) throw error;

      // Agregar a la lista local
      setExams(prev => [data[0], ...prev]);
      return { success: true, data: data[0] };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };



  // Cargar exámenes al montar el componente
  useEffect(() => {
    loadExams();
  }, []);



  // Eliminar examen
  const deleteExam = async (examId) => {
    try {
      const { error } = await supabase
        .from('exams')
        .delete()
        .eq('id', examId);

      if (error) throw error;

      // Remover de la lista local
      setExams(prev => prev.filter(exam => exam.id !== examId));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Actualizar examen
  const updateExam = async (examId, examData) => {
    try {
      const { data, error } = await supabase
        .from('exams')
        .update(examData)
        .eq('id', examId)
        .select();

      if (error) throw error;

      // Actualizar en la lista local
      setExams(prev => 
        prev.map(exam => 
          exam.id === examId ? data[0] : exam
        )
      );
      return { success: true, data: data[0] };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const value = {
    exams,
    loading,
    error,
    addExam,
    loadExams,
    deleteExam,
    updateExam
  };

  return (
    <ExamsContext.Provider value={value}>
      {children}
    </ExamsContext.Provider>
  );
}

export function useExams() {
  const context = useContext(ExamsContext);
  if (!context) {
    throw new Error('useExams must be used within an ExamsProvider');
  }
  return context;
}