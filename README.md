# ExamURP - Repositorio de Exámenes URP

Sistema web moderno para gestionar y acceder a exámenes pasados de la Universidad Ricardo Palma.

## 📋 Características

- ✅ **Navegación intuitiva** por carreras y materias
- ✅ **Filtros avanzados** por carrera, ciclo y materia
- ✅ **Panel de administración** seguro
- ✅ **Sistema de autenticación** con Supabase
- ✅ **Base de datos en tiempo real** con Supabase
- ✅ **Interfaz responsive** con Tailwind CSS
- ✅ **Diseño profesional** con colores URP
- ✅ **CRUD completo** para administradores

## 🚀 Tecnologías Utilizadas

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth)
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Build Tool**: Vite

## 🛠️ Instalación y Configuración

### Prerequisitos
- Node.js 18+ 
- npm o yarn
- Cuenta de Supabase

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/TU-USUARIO/examurp-frontend.git
   cd examurp-frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar Supabase**
   - Crear un proyecto en [supabase.com](https://supabase.com)
   - Configurar las credenciales en `src/supabaseClient.js`

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

5. **Construir para producción**
   ```bash
   npm run build
   ```

## 🎨 Funcionalidades

### Para Estudiantes
- Ver exámenes por carrera
- Filtrar por ciclo y materia
- Acceder a repositorios de GitHub
- Interfaz limpia y profesional

### Para Administradores
- Login seguro con Supabase Auth
- Subir nuevos exámenes
- Editar información de exámenes
- Eliminar exámenes con confirmación
- Sesión persistente

## 🏫 Universidad Ricardo Palma

Desarrollado para facilitar el acceso a recursos académicos de la URP.

---

© 2024 ExamURP - Universidad Ricardo Palma
