# MANUAL TÉCNICO
## SISTEMA DE BIBLIOTECA VIRTUAL DE INGENIERÍA URP
### ExamURP - Repositorio de Exámenes

**Versión:** 1.0  
**Fecha:** Diciembre 2025  
**Universidad Ricardo Palma - Facultad de Ingeniería**

---

## TABLA DE CONTENIDOS

1. Introducción
2. Descripción General del Sistema
3. Arquitectura del Sistema
4. Tecnologías Utilizadas
5. Estructura del Proyecto
6. Módulos y Componentes
7. Base de Datos
8. Flujo de Autenticación
9. Configuración e Instalación
10. Despliegue
11. Mantenimiento y Soporte
12. Conclusiones

---

## 1. INTRODUCCIÓN

### 1.1 Propósito del Documento
Este manual técnico proporciona información detallada sobre la arquitectura, implementación y funcionamiento del Sistema de Biblioteca Virtual de Ingeniería (ExamURP) de la Universidad Ricardo Palma. Está dirigido a desarrolladores, administradores de sistemas y personal técnico responsable del mantenimiento y evolución de la aplicación.

### 1.2 Alcance del Sistema
ExamURP es una aplicación web serverless que permite a los estudiantes de la Facultad de Ingeniería de la URP acceder, buscar y descargar exámenes pasados organizados por carrera, ciclo y curso. El sistema incluye un panel de administración completo para gestionar el contenido.

### 1.3 Definiciones y Acrónimos
- **SPA**: Single Page Application
- **BaaS**: Backend as a Service
- **CRUD**: Create, Read, Update, Delete
- **JWT**: JSON Web Token
- **RLS**: Row Level Security
- **API**: Application Programming Interface

---

## 2. DESCRIPCIÓN GENERAL DEL SISTEMA

### 2.1 Objetivos del Sistema
- Centralizar el acceso a exámenes pasados de todas las carreras de Ingeniería
- Facilitar la búsqueda y filtrado de material académico
- Proporcionar herramientas administrativas para gestión de contenido
- Ofrecer estadísticas de uso en tiempo real
- Garantizar seguridad en la gestión de contenido

### 2.2 Características Principales

**Para Estudiantes:**
- Navegación por carreras: Civil, Electrónica, Industrial, Informática, Mecatrónica, Cursos Generales
- Filtros avanzados por carrera, ciclo (1-10) y curso
- Visualización de exámenes por tipo (Parcial, Final, Sustitutorio)
- Acceso directo a documentos mediante enlaces externos
- Interfaz responsive adaptable a dispositivos móviles

**Para Administradores:**
- Panel de autenticación seguro con Supabase Auth
- Dashboard de estadísticas en tiempo real
- Subida de nuevos exámenes con formulario validado
- Gestión CRUD completa de exámenes
- Visualización de estadísticas por carrera y ciclo

### 2.3 Usuarios del Sistema
- **Estudiantes**: Acceso público de solo lectura
- **Administradores**: Acceso completo con autenticación requerida

---

## 3. ARQUITECTURA DEL SISTEMA

### 3.1 Tipo de Arquitectura
El sistema implementa una **arquitectura serverless** moderna con las siguientes características:

**Frontend Serverless:**
- Aplicación React SPA compilada a archivos estáticos
- Hospedada en Vercel (plataforma serverless)
- Sin servidor web tradicional
- Entrega mediante CDN global

**Backend Serverless:**
- Supabase como BaaS (Backend as a Service)
- Base de datos PostgreSQL gestionada
- APIs RESTful automáticas
- Autenticación integrada
- Sin infraestructura de servidor a mantener

### 3.2 Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                    USUARIO FINAL                         │
│              (Navegador Web/Mobile)                      │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ HTTPS
                     ↓
┌─────────────────────────────────────────────────────────┐
│                  VERCEL CDN                              │
│          (Hosting Serverless Frontend)                   │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │   React SPA (Build estático)                     │  │
│  │   - Componentes React                            │  │
│  │   - React Router (HashRouter)                    │  │
│  │   - Tailwind CSS                                 │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ API REST (HTTPS)
                     ↓
┌─────────────────────────────────────────────────────────┐
│               SUPABASE (BaaS)                            │
│                                                          │
│  ┌─────────────────┐  ┌─────────────────┐              │
│  │   PostgreSQL    │  │   Supabase      │              │
│  │   Database      │  │   Auth          │              │
│  │                 │  │   (JWT)         │              │
│  │   - Tabla exams │  │                 │              │
│  │   - RLS         │  │   - Login       │              │
│  └─────────────────┘  │   - Session     │              │
│                       │   - Logout      │              │
│                       └─────────────────┘              │
└─────────────────────────────────────────────────────────┘
```

### 3.3 Flujo de Datos

**Lectura de Exámenes (Público):**
1. Usuario accede a la aplicación
2. React solicita datos a Supabase API
3. Supabase retorna lista de exámenes
4. React renderiza los datos con filtros

**Operaciones Administrativas:**
1. Administrador inicia sesión (Supabase Auth)
2. Obtiene token JWT
3. Realiza operaciones CRUD con token
4. Supabase valida permisos (RLS)
5. Ejecuta operación en PostgreSQL
6. Retorna resultado actualizado

---

## 4. TECNOLOGÍAS UTILIZADAS

### 4.1 Frontend

**React 19.1.1**
- Biblioteca JavaScript para interfaces de usuario
- Componentes funcionales con Hooks
- Context API para gestión de estado global
- Justificación: Ecosistema maduro, rendimiento óptimo, gran comunidad

**Vite 7.1.2**
- Herramienta de build ultrarrápida
- Hot Module Replacement (HMR)
- Optimización de producción automática
- Justificación: Velocidad de desarrollo, builds optimizados

**React Router DOM 7.8.2**
- Librería de enrutamiento para SPA
- Navegación declarativa
- Protección de rutas
- Justificación: Estándar de la industria para routing en React

**Tailwind CSS 4.1.13**
- Framework CSS utility-first
- Diseño responsive
- Sistema de diseño consistente
- Justificación: Desarrollo rápido, personalización sencilla, tamaño optimizado

**Supabase JS Client 2.57.4**
- SDK oficial de Supabase
- Cliente JavaScript para API REST
- Gestión de autenticación
- Justificación: Integración nativa con Supabase

**Otras Librerías:**
- `react-hook-form` (7.62.0): Validación de formularios
- `react-dropzone` (14.3.8): Upload de archivos
- `@vercel/speed-insights` (1.2.0): Métricas de rendimiento

### 4.2 Backend (Supabase)

**PostgreSQL**
- Base de datos relacional robusta
- Soporte para consultas complejas
- Integridad referencial
- Justificación: Confiabilidad, rendimiento, características avanzadas

**Supabase Auth**
- Sistema de autenticación basado en JWT
- Gestión de sesiones
- Seguridad integrada
- Justificación: Implementación rápida, seguridad probada

**Supabase REST API**
- APIs generadas automáticamente
- Operaciones CRUD out-of-the-box
- Real-time subscriptions
- Justificación: Desarrollo acelerado, menos código backend

**Row Level Security (RLS)**
- Políticas de seguridad a nivel de fila
- Control granular de acceso
- Justificación: Seguridad robusta sin lógica adicional

### 4.3 Infraestructura

**Vercel**
- Plataforma de hosting serverless
- Deploy automático desde Git
- CDN global
- HTTPS automático
- Justificación: Deployment simple, alta disponibilidad, escalabilidad automática

### 4.4 Herramientas de Desarrollo

- **ESLint**: Linting de código JavaScript
- **Git**: Control de versiones
- **npm**: Gestor de paquetes

---

## 5. ESTRUCTURA DEL PROYECTO

### 5.1 Árbol de Directorios

```
my-project/
├── public/                      # Archivos estáticos
│   ├── logo_urp_blanco.png     # Logo URP blanco
│   └── Logo_verde.png          # Logo URP verde
│
├── src/                         # Código fuente
│   ├── assets/                 # Recursos multimedia
│   │
│   ├── main.jsx                # Punto de entrada
│   ├── App.jsx                 # Componente principal
│   ├── App.css                 # Estilos globales
│   ├── index.css               # Estilos base + Tailwind
│   │
│   ├── supabaseClient.js       # Configuración Supabase
│   │
│   ├── AuthContext.jsx         # Context de autenticación
│   ├── ExamsContext.jsx        # Context de exámenes
│   ├── StatsContext.jsx        # Context de estadísticas
│   │
│   ├── AdminComponents.jsx     # Componentes admin
│   ├── UploadExam.jsx          # Página subir exámenes
│   ├── ManageExams.jsx         # Página gestión exámenes
│   ├── StatsDashboard.jsx      # Dashboard estadísticas
│   ├── ProtectedRoute.jsx      # HOC rutas protegidas
│   │
├── .env.local                  # Variables de entorno
├── .gitignore                  # Archivos ignorados por Git
├── eslint.config.js            # Configuración ESLint
├── index.html                  # HTML raíz
├── package.json                # Dependencias
├── package-lock.json           # Lock de dependencias
├── README.md                   # Documentación
├── vercel.json                 # Configuración Vercel
└── vite.config.js              # Configuración Vite
```

### 5.2 Descripción de Archivos Clave

**index.html**
- Archivo HTML raíz
- Punto de montaje de la aplicación React
- Inclusión de metadatos y favicon

**main.jsx**
- Punto de entrada de React
- Renderiza el componente App
- Configura Providers globales

**App.jsx**
- Componente raíz de la aplicación
- Configuración de React Router
- Definición de rutas públicas y protegidas
- Layout principal

**supabaseClient.js**
- Inicialización del cliente Supabase
- Configuración de credenciales
- Opciones de autenticación

**vite.config.js**
- Configuración de Vite
- Plugins (React, Tailwind)

**vercel.json**
- Configuración de rewrites para SPA
- Redirección de todas las rutas a index.html

---

## 6. MÓDULOS Y COMPONENTES

### 6.1 Contextos (State Management)

#### 6.1.1 AuthContext
**Archivo:** `src/AuthContext.jsx`

**Responsabilidad:**
- Gestión de estado de autenticación global
- Manejo de sesiones de usuario
- Funciones de login/logout

**Estado:**
```javascript
{
  user: {
    id: string,
    email: string,
    name: string,
    avatar: string
  } | null,
  loading: boolean
}
```

**Funciones principales:**
- `login(email, password)`: Autentica usuario
- `logout()`: Cierra sesión
- `useAuth()`: Hook para consumir el contexto

**Implementación:**
```javascript
// Listener de cambios de autenticación
supabase.auth.onAuthStateChange((event, session) => {
  if (session?.user) {
    setUser({
      id: session.user.id,
      email: session.user.email,
      name: session.user.user_metadata?.name,
      avatar: ''
    });
  } else {
    setUser(null);
  }
});
```

#### 6.1.2 ExamsContext
**Archivo:** `src/ExamsContext.jsx`

**Responsabilidad:**
- Gestión CRUD de exámenes
- Cache local de exámenes
- Sincronización con Supabase

**Estado:**
```javascript
{
  exams: Array<Exam>,
  loading: boolean,
  error: string | null
}
```

**Funciones principales:**
- `loadExams()`: Carga todos los exámenes
- `addExam(examData)`: Crea nuevo examen
- `updateExam(id, data)`: Actualiza examen
- `deleteExam(id)`: Elimina examen

**Modelo de datos Exam:**
```javascript
{
  id: number,
  title: string,
  course: string,
  career: string,
  cycle: string,
  type: string,
  period: string,
  year: number,
  exam_url: string,
  created_at: timestamp
}
```

#### 6.1.3 StatsContext
**Archivo:** `src/StatsContext.jsx`

**Responsabilidad:**
- Cálculo de estadísticas del sistema
- Agregación de datos por carrera/ciclo
- Cache de estadísticas

**Estado:**
```javascript
{
  stats: {
    totalExams: number,
    examsByCareer: Object,
    examsByCycle: Object,
    examsByType: Object,
    recentExams: Array
  },
  loading: boolean
}
```

**Funciones principales:**
- `loadStats()`: Carga y calcula estadísticas
- `getStatsByCareer(career)`: Stats por carrera
- `getStatsByCycle(cycle)`: Stats por ciclo

### 6.2 Componentes de Páginas

#### 6.2.1 HomePage
**Ubicación:** `App.jsx`

**Descripción:**
Página principal con navegación por carreras.

**Elementos:**
- Header con logo y navegación
- Grid de tarjetas de carreras
- Footer con información de contacto
- Modal de contacto

**Carreras soportadas:**
1. Ingeniería Civil
2. Ingeniería Electrónica
3. Ingeniería Industrial
4. Ingeniería Informática
5. Ingeniería Mecatrónica
6. Cursos Generales

#### 6.2.2 CareerPage
**Ubicación:** `App.jsx`

**Descripción:**
Vista de exámenes de una carrera específica con filtros.

**Funcionalidades:**
- Filtro por ciclo (1-10)
- Filtro por curso (autocompletado)
- Búsqueda en tiempo real
- Lista de exámenes paginada
- Contador de resultados

**Algoritmo de filtrado:**
```javascript
filteredExams = exams.filter(exam => {
  const matchesCareer = exam.career === careerKey;
  const matchesCycle = !selectedCycle || exam.cycle === selectedCycle;
  const matchesCourse = !selectedCourse || exam.course === selectedCourse;
  return matchesCareer && matchesCycle && matchesCourse;
});
```

#### 6.2.3 LoginPage
**Ubicación:** `AdminComponents.jsx`

**Descripción:**
Página de autenticación para administradores.

**Funcionalidades:**
- Formulario de login (email/password)
- Validación de campos
- Manejo de errores
- Redirección post-login

**Validaciones:**
- Email formato válido
- Password mínimo 6 caracteres
- Mensajes de error descriptivos

#### 6.2.4 UploadExamPage
**Archivo:** `UploadExam.jsx`

**Descripción:**
Formulario para subir nuevos exámenes al sistema.

**Campos del formulario:**
- Título del examen (text)
- Curso (text)
- Carrera (select)
- Ciclo (select 1-10)
- Tipo (select: Parcial/Final/Sustitutorio)
- Período (select: 1/2)
- Año (number)
- URL del examen (url)

**Proceso de subida:**
1. Validación de campos requeridos
2. Validación de URL válida
3. Envío a Supabase mediante `addExam()`
4. Confirmación visual
5. Reset del formulario

**Validación de URL:**
```javascript
const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
```

#### 6.2.5 StatsDashboard
**Archivo:** `StatsDashboard.jsx`

**Descripción:**
Dashboard con estadísticas del sistema.

**Métricas mostradas:**
- Total de exámenes en el sistema
- Exámenes por carrera (gráfico)
- Exámenes por ciclo (distribución)
- Exámenes por tipo (Parcial/Final/Sustitutorio)
- Exámenes recientes (últimos 10)

**Visualizaciones:**
- Tarjetas informativas
- Gráficos de barras
- Listas con datos agregados
- Indicadores de crecimiento

### 6.3 Componentes Utilitarios

#### 6.3.1 ProtectedRoute
**Archivo:** `ProtectedRoute.jsx`

**Descripción:**
Higher Order Component para proteger rutas administrativas.

**Lógica:**
```javascript
if (loading) return <LoadingScreen />;
if (!user) return <Navigate to="/admin/login" />;
return <Outlet />;
```

**Uso:**
```javascript
<Route element={<ProtectedRoute />}>
  <Route path="/admin/upload" element={<UploadExamPage />} />
  <Route path="/admin/stats" element={<StatsDashboard />} />
</Route>
```

#### 6.3.2 Page
**Ubicación:** `App.jsx`

**Descripción:**
Componente de layout compartido para todas las páginas.

**Props:**
- `title`: Título de la página
- `children`: Contenido de la página
- `backTo`: Ruta de navegación hacia atrás

**Elementos:**
- Header sticky con logo y navegación
- Botón "Volver" condicional
- Botones de admin (si autenticado)
- Contenedor de contenido
- Footer

#### 6.3.3 AdminLayout
**Ubicación:** `AdminComponents.jsx`

**Descripción:**
Layout específico para páginas administrativas.

**Características:**
- Sidebar de navegación
- Header con usuario
- Contenido principal
- Acciones rápidas

---

## 7. BASE DE DATOS

### 7.1 Esquema de Base de Datos

**Tabla: exams**

```sql
CREATE TABLE exams (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  course TEXT NOT NULL,
  career TEXT NOT NULL,
  cycle TEXT NOT NULL,
  type TEXT NOT NULL,
  period TEXT NOT NULL,
  year INTEGER NOT NULL,
  exam_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Índices:**
```sql
CREATE INDEX idx_exams_career ON exams(career);
CREATE INDEX idx_exams_cycle ON exams(cycle);
CREATE INDEX idx_exams_course ON exams(course);
CREATE INDEX idx_exams_year ON exams(year DESC);
CREATE INDEX idx_exams_created_at ON exams(created_at DESC);
```

### 7.2 Diccionario de Datos

| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|-------------|
| id | BIGSERIAL | PRIMARY KEY | Identificador único |
| title | TEXT | NOT NULL | Título del examen |
| course | TEXT | NOT NULL | Nombre del curso |
| career | TEXT | NOT NULL | Código de carrera |
| cycle | TEXT | NOT NULL | Ciclo académico (1-10) |
| type | TEXT | NOT NULL | Tipo (Parcial/Final/Sustitutorio) |
| period | TEXT | NOT NULL | Período (1/2) |
| year | INTEGER | NOT NULL | Año académico |
| exam_url | TEXT | NOT NULL | URL del documento |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Fecha de creación |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() | Última modificación |

### 7.3 Valores Válidos

**Carreras (career):**
- `informatica`: Ingeniería Informática
- `civil`: Ingeniería Civil
- `mecatronica`: Ingeniería Mecatrónica
- `industrial`: Ingeniería Industrial
- `electricidad`: Ingeniería Electrónica
- `generales`: Cursos Generales

**Ciclos (cycle):**
- `"1"` a `"10"` (como string)

**Tipos (type):**
- `Parcial`
- `Final`
- `Sustitutorio`

**Períodos (period):**
- `"1"`: Primer semestre
- `"2"`: Segundo semestre

### 7.4 Políticas de Seguridad (RLS)

**Lectura pública:**
```sql
CREATE POLICY "Allow public read access"
ON exams FOR SELECT
USING (true);
```

**Escritura autenticada:**
```sql
CREATE POLICY "Allow authenticated users to insert"
ON exams FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update"
ON exams FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated users to delete"
ON exams FOR DELETE
TO authenticated
USING (true);
```

### 7.5 Triggers

**Actualización automática de updated_at:**
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_exams_updated_at
BEFORE UPDATE ON exams
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
```

---

## 8. FLUJO DE AUTENTICACIÓN

### 8.1 Proceso de Login

**Secuencia:**

1. **Inicio de sesión**
   ```javascript
   const { data, error } = await supabase.auth.signInWithPassword({
     email: email,
     password: password
   });
   ```

2. **Validación de credenciales**
   - Supabase verifica email/password
   - Genera JWT si credenciales correctas

3. **Almacenamiento de sesión**
   - Token JWT almacenado en localStorage
   - Cookie de sesión (opcional)
   - User data en AuthContext

4. **Redirección**
   - Usuario redirigido a `/admin/stats`
   - ProtectedRoute valida autenticación

### 8.2 Persistencia de Sesión

**Configuración:**
```javascript
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
});
```

**Características:**
- Auto-refresh de tokens antes de expiración
- Persistencia en localStorage
- Recuperación automática al recargar página

### 8.3 Proceso de Logout

**Secuencia:**

1. **Llamada a logout**
   ```javascript
   const { error } = await supabase.auth.signOut();
   ```

2. **Limpieza de sesión**
   - Eliminación de token de localStorage
   - Limpieza de estado en AuthContext

3. **Redirección**
   - Usuario redirigido a `/`
   - Acceso a rutas protegidas bloqueado

### 8.4 Validación de Rutas

**Implementación en ProtectedRoute:**

```javascript
export const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};
```

**Flujo:**
1. Verificar si está cargando estado de auth
2. Si no hay usuario, redirigir a login
3. Si hay usuario, permitir acceso

---

## 9. CONFIGURACIÓN E INSTALACIÓN

### 9.1 Requisitos Previos

**Software requerido:**
- Node.js 18.0.0 o superior
- npm 9.0.0 o superior
- Git 2.30.0 o superior
- Navegador web moderno (Chrome, Firefox, Edge)

**Cuentas necesarias:**
- Cuenta de Supabase (gratuita)
- Cuenta de Vercel (opcional, para despliegue)
- Cuenta de GitHub (opcional, para versionamiento)

### 9.2 Instalación Local

**Paso 1: Clonar repositorio**
```powershell
git clone https://github.com/Gabrieldla/ExamURPBVI.git
cd ExamURPBVI
```

**Paso 2: Instalar dependencias**
```powershell
npm install
```

**Paso 3: Configurar variables de entorno**

Crear archivo `.env.local`:
```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

**Paso 4: Iniciar servidor de desarrollo**
```powershell
npm run dev
```

Aplicación disponible en: `http://localhost:5173`

### 9.3 Configuración de Supabase

**Paso 1: Crear proyecto**
1. Ir a [supabase.com](https://supabase.com)
2. Click en "New Project"
3. Completar datos del proyecto
4. Esperar inicialización (1-2 minutos)

**Paso 2: Crear tabla exams**

Ejecutar en SQL Editor:
```sql
CREATE TABLE exams (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  course TEXT NOT NULL,
  career TEXT NOT NULL,
  cycle TEXT NOT NULL,
  type TEXT NOT NULL,
  period TEXT NOT NULL,
  year INTEGER NOT NULL,
  exam_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_exams_career ON exams(career);
CREATE INDEX idx_exams_cycle ON exams(cycle);
CREATE INDEX idx_exams_course ON exams(course);

-- Habilitar RLS
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;

-- Política de lectura pública
CREATE POLICY "Allow public read"
ON exams FOR SELECT
USING (true);

-- Políticas para usuarios autenticados
CREATE POLICY "Allow auth insert"
ON exams FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow auth update"
ON exams FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Allow auth delete"
ON exams FOR DELETE
TO authenticated
USING (true);
```

**Paso 3: Crear usuario administrador**

Ir a Authentication > Users > Invite User:
- Email: admin@urp.edu.pe
- Contraseña: (definir contraseña segura)
- Confirmar email manualmente

**Paso 4: Obtener credenciales**

Ir a Settings > API:
- Copiar `Project URL` → VITE_SUPABASE_URL
- Copiar `anon public` key → VITE_SUPABASE_ANON_KEY

### 9.4 Scripts Disponibles

**Desarrollo:**
```powershell
npm run dev
```
Inicia servidor de desarrollo con HMR

**Build:**
```powershell
npm run build
```
Compila aplicación para producción en `/dist`

**Preview:**
```powershell
npm run preview
```
Previsualiza build de producción localmente

**Lint:**
```powershell
npm run lint
```
Ejecuta ESLint para verificar código

---

## 10. DESPLIEGUE

### 10.1 Despliegue en Vercel

**Método 1: Desde GitHub (Recomendado)**

1. **Conectar repositorio:**
   - Ir a [vercel.com](https://vercel.com)
   - Click en "Import Project"
   - Autorizar acceso a GitHub
   - Seleccionar repositorio `ExamURPBVI`

2. **Configurar proyecto:**
   - Framework Preset: Vite
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Configurar variables de entorno:**
   ```
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-anon-key
   ```

4. **Deploy:**
   - Click en "Deploy"
   - Esperar build (1-2 minutos)
   - Aplicación disponible en URL de Vercel

**Método 2: Desde CLI**

```powershell
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy a producción
vercel --prod
```

**Configuración automática:**
```json
// vercel.json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### 10.2 Despliegue en Netlify

**Paso 1: Configurar build**

Crear `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Paso 2: Deploy desde UI**
1. Ir a [netlify.com](https://netlify.com)
2. "Add new site" > "Import existing project"
3. Conectar GitHub
4. Configurar variables de entorno
5. Deploy

### 10.3 Configuración de Dominio Personalizado

**En Vercel:**
1. Ir a proyecto > Settings > Domains
2. Agregar dominio personalizado
3. Configurar DNS:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

**SSL/TLS:**
- Automático con Vercel/Netlify
- Certificado Let's Encrypt
- Renovación automática

### 10.4 CI/CD Pipeline

**Proceso automático:**

1. **Push a GitHub**
   ```powershell
   git add .
   git commit -m "feat: nueva funcionalidad"
   git push origin main
   ```

2. **Vercel detecta cambios**
   - Webhook activa build
   - Ejecuta `npm install`
   - Ejecuta `npm run build`

3. **Tests (opcional)**
   - Ejecutar tests unitarios
   - Validar build exitoso

4. **Deploy automático**
   - Build success → Deploy a preview
   - Merge a main → Deploy a producción

5. **Rollback automático**
   - Si build falla, mantiene versión anterior
   - Notificación de error

---

## 11. MANTENIMIENTO Y SOPORTE

### 11.1 Monitoreo

**Métricas clave a monitorear:**

**Rendimiento:**
- Time to First Byte (TTFB): < 200ms
- First Contentful Paint (FCP): < 1s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1

**Disponibilidad:**
- Uptime: > 99.9%
- Error rate: < 0.1%
- API response time: < 500ms

**Herramientas:**
- Vercel Analytics (integrado)
- Supabase Dashboard (métricas de DB)
- Google Lighthouse (auditorías)
- @vercel/speed-insights (incluido en el proyecto)

### 11.2 Logs y Debugging

**Logs de Vercel:**
```powershell
vercel logs [deployment-url]
```

**Logs de Supabase:**
- Dashboard > Logs Explorer
- Filtrar por nivel: error, warn, info
- Búsqueda por timestamp

**Debugging local:**
```javascript
// Habilitar modo debug en supabaseClient.js
export const supabase = createClient(url, key, {
  auth: {
    debug: true  // Logs detallados en consola
  }
});
```

### 11.3 Backup y Recuperación

**Base de datos:**

**Backup automático (Supabase):**
- Daily backups (últimos 7 días)
- Point-in-time recovery (PITR)
- Acceso: Dashboard > Database > Backups

**Backup manual:**
```sql
-- Exportar datos
COPY exams TO '/tmp/exams_backup.csv' CSV HEADER;
```

**Restauración:**
```sql
-- Importar datos
COPY exams FROM '/tmp/exams_backup.csv' CSV HEADER;
```

**Código fuente:**
- Control de versiones con Git
- Repository backups automáticos (GitHub)
- Tags para versiones estables

### 11.4 Actualizaciones

**Dependencias:**

**Verificar actualizaciones:**
```powershell
npm outdated
```

**Actualizar paquetes:**
```powershell
# Actualizaciones menores
npm update

# Actualización manual
npm install react@latest react-dom@latest
```

**Testing post-actualización:**
1. Ejecutar en local: `npm run dev`
2. Verificar funcionalidades críticas
3. Build de prueba: `npm run build`
4. Deploy a preview en Vercel
5. Si todo OK, merge a producción

**Calendario recomendado:**
- Seguridad: Inmediato
- Dependencias críticas: Semanal
- Dependencias normales: Mensual
- Framework/libraries mayores: Trimestral

### 11.5 Solución de Problemas Comunes

**Problema: Error de autenticación**
```
Error: Invalid credentials
```
**Solución:**
- Verificar variables de entorno
- Confirmar email de usuario en Supabase
- Revisar políticas RLS

**Problema: Exámenes no se muestran**
**Solución:**
- Verificar conexión a Supabase
- Revisar políticas de lectura (RLS)
- Verificar índices de tabla
- Console del navegador para errores JS

**Problema: Build falla**
```
Error: Cannot resolve module
```
**Solución:**
- Limpiar cache: `rm -rf node_modules package-lock.json`
- Reinstalar: `npm install`
- Verificar versiones de Node.js

**Problema: Slow loading**
**Solución:**
- Optimizar imágenes
- Implementar lazy loading
- Revisar bundle size
- Agregar caching

### 11.6 Escalabilidad

**Límites actuales (Plan Free Supabase):**
- 500MB de base de datos
- 1GB de file storage
- 2GB de bandwidth/mes
- 50,000 monthly active users

**Plan de escalamiento:**

**Fase 1 (< 1000 usuarios):**
- Plan Free Supabase
- Vercel Hobby
- Sin cambios arquitectónicos

**Fase 2 (1000-10000 usuarios):**
- Upgrade a Supabase Pro ($25/mes)
- Vercel Pro si es necesario
- Implementar caching con Redis
- CDN para archivos estáticos

**Fase 3 (> 10000 usuarios):**
- Supabase Team/Enterprise
- Múltiples réplicas de lectura
- Load balancing
- Separación de servicios

---

## 12. CONCLUSIONES

### 12.1 Logros del Proyecto

El Sistema de Biblioteca Virtual de Ingeniería URP (ExamURP) cumple exitosamente con los objetivos planteados:

1. **Centralización efectiva:** Repositorio único para exámenes de todas las carreras de Ingeniería
2. **Accesibilidad:** Interfaz intuitiva y responsive accesible desde cualquier dispositivo
3. **Gestión eficiente:** Panel administrativo completo con CRUD y estadísticas
4. **Arquitectura moderna:** Implementación serverless que minimiza costos y maximiza escalabilidad
5. **Seguridad robusta:** Autenticación integrada y políticas de acceso granulares

### 12.2 Ventajas de la Arquitectura Serverless

**Técnicas:**
- Sin gestión de servidores
- Escalabilidad automática
- Alta disponibilidad (99.9%+)
- Deploy instantáneo
- Infraestructura global (CDN)

**Económicas:**
- Costos reducidos (pay-per-use)
- Sin inversión inicial en infraestructura
- Mantenimiento mínimo
- Plan gratuito suficiente para inicio

**Operativas:**
- Desarrollo acelerado
- Focus en funcionalidades, no en infraestructura
- Actualizaciones sin downtime
- Backups automáticos

### 12.3 Mejoras Futuras Recomendadas

**Corto plazo (1-3 meses):**
1. Implementar sistema de comentarios/ratings en exámenes
2. Agregar búsqueda avanzada con filtros combinados
3. Exportar estadísticas a PDF/Excel
4. Notificaciones para administradores
5. Sistema de caché para mejorar rendimiento

**Mediano plazo (3-6 meses):**
1. Módulo de upload directo de archivos (Storage de Supabase)
2. Historial de cambios en exámenes
3. Sistema de permisos granulares (roles)
4. API pública para integraciones
5. App móvil nativa (React Native)

**Largo plazo (6-12 meses):**
1. Machine Learning para recomendaciones
2. Sistema de resolución colaborativa
3. Integración con sistema académico URP
4. Analytics avanzado con dashboards interactivos
5. Gamificación (badges, rankings)

### 12.4 Consideraciones de Seguridad

**Implementadas:**
- HTTPS en todas las comunicaciones
- Autenticación JWT con Supabase Auth
- Row Level Security (RLS) en base de datos
- Validación de inputs en frontend
- Variables de entorno para secretos
- Políticas de CORS configuradas

**Recomendaciones adicionales:**
- Implementar rate limiting
- Agregar CAPTCHA en login
- Auditoría de logs de acceso
- 2FA para administradores
- Encriptación de datos sensibles
- Política de passwords robusta

### 12.5 Mantenibilidad del Código

**Buenas prácticas implementadas:**
- Componentes modulares y reutilizables
- Separación de concerns (Context, Components, Utils)
- Nomenclatura consistente
- Comentarios en código complejo
- Estructura de carpetas lógica

**Recomendaciones:**
- Agregar tests unitarios (Jest, React Testing Library)
- Tests de integración (Cypress)
- Documentación inline con JSDoc
- Linting estricto
- Code reviews obligatorios

### 12.6 Impacto Esperado

**Para estudiantes:**
- Acceso centralizado y rápido a material de estudio
- Mejor preparación para exámenes
- Reducción de tiempo de búsqueda

**Para la universidad:**
- Digitalización de recursos académicos
- Mejor gestión de contenido educativo
- Datos analytics sobre uso de material

**Para administradores:**
- Gestión eficiente de contenido
- Visibilidad clara de estadísticas
- Proceso simplificado de carga

---

## ANEXOS

### Anexo A: Glosario de Términos

- **BaaS**: Backend as a Service - plataforma que proporciona backend preconfigurado
- **CDN**: Content Delivery Network - red de servidores distribuidos globalmente
- **CRUD**: Create, Read, Update, Delete - operaciones básicas de base de datos
- **HMR**: Hot Module Replacement - recarga de módulos sin refresh completo
- **JWT**: JSON Web Token - estándar de tokens de autenticación
- **RLS**: Row Level Security - seguridad a nivel de fila en PostgreSQL
- **SPA**: Single Page Application - aplicación web de una sola página
- **SSR**: Server Side Rendering - renderizado en servidor

### Anexo B: Referencias

**Documentación oficial:**
- React: https://react.dev
- Vite: https://vitejs.dev
- Supabase: https://supabase.com/docs
- Vercel: https://vercel.com/docs
- Tailwind CSS: https://tailwindcss.com/docs

**Recursos adicionales:**
- MDN Web Docs: https://developer.mozilla.org
- React Router: https://reactrouter.com
- PostgreSQL: https://www.postgresql.org/docs

### Anexo C: Contacto y Soporte

**Desarrollador:**
- Repositorio: https://github.com/Gabrieldla/ExamURPBVI
- Issues: https://github.com/Gabrieldla/ExamURPBVI/issues

**Universidad Ricardo Palma:**
- Sitio web: https://www.urp.edu.pe
- Facultad de Ingeniería: https://www.urp.edu.pe/pregrado/facultad-de-ingenieria
- BVI: https://www.urp.edu.pe/pregrado/facultad-de-ingenieria/bvi

---

**Fin del Manual Técnico**

*Versión 1.0 - Diciembre 2025*  
*Universidad Ricardo Palma - Facultad de Ingeniería*
