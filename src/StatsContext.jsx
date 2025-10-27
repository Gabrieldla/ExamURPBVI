import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

const StatsContext = createContext();

export function StatsProvider({ children }) {
  const [stats, setStats] = useState({
    examsByCareer: [],
    clicksByCareer: [],
    totalExams: 0,
    totalClicks: 0,
    loading: true
  });

  // Función para registrar un clic en "Ver Examen"
  const recordExamView = async (examId, careerKey) => {
    try {
      const { error } = await supabase
        .from('exam_views')
        .insert([
          {
            exam_id: examId,
            career: careerKey,
            viewed_at: new Date().toISOString()
          }
        ]);

      if (error) {
        console.error('Error recording exam view:', error);
      }
    } catch (err) {
      console.error('Error recording exam view:', err);
    }
  };

  // Cargar estadísticas
  const loadStats = async () => {
    try {
      setStats(prev => ({ ...prev, loading: true }));

      // Obtener total de exámenes por carrera
      const { data: exams, error: examsError } = await supabase
        .from('exams')
        .select('career');

      if (examsError) throw examsError;

      // Contar exámenes por carrera
      const examsByCareer = {};
      exams.forEach(exam => {
        examsByCareer[exam.career] = (examsByCareer[exam.career] || 0) + 1;
      });

      // Obtener total de vistas por carrera
      const { data: views, error: viewsError } = await supabase
        .from('exam_views')
        .select('career');

      if (viewsError) {
        console.error('Error loading views:', viewsError);
      }

      // Contar vistas por carrera
      const clicksByCareer = {};
      if (views) {
        views.forEach(view => {
          clicksByCareer[view.career] = (clicksByCareer[view.career] || 0) + 1;
        });
      }

      // Convertir a arrays
      const examsByCareerArray = Object.entries(examsByCareer).map(([career, count]) => ({
        career,
        count
      }));

      const clicksByCareerArray = Object.entries(clicksByCareer).map(([career, count]) => ({
        career,
        count
      }));

      setStats({
        examsByCareer: examsByCareerArray,
        clicksByCareer: clicksByCareerArray,
        totalExams: exams.length,
        totalClicks: views ? views.length : 0,
        loading: false
      });
    } catch (error) {
      console.error('Error loading stats:', error);
      setStats(prev => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <StatsContext.Provider value={{ stats, recordExamView, loadStats }}>
      {children}
    </StatsContext.Provider>
  );
}

export function useStats() {
  const context = useContext(StatsContext);
  if (!context) {
    throw new Error('useStats must be used within a StatsProvider');
  }
  return context;
}
