<div align="center">

# 🕹️ ⚡ LA BUHARDILLA RETRO ⚡ 🕹️
### *El portal definitivo de reliquias, tecnología analógica y estética synthwave.*

<br>

![React](https://img.shields.io/badge/React_19-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/Vite_8-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![JSON Server](https://img.shields.io/badge/JSON_Server-000000?style=for-the-badge&logo=json&logoColor=%2300f0ff)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)

<p align="center">
  <b>Una Single Page Application (SPA) temática y responsiva con gestión CRUD en tiempo real, diseño neón retrofuturista de los 80s y suite de testing automatizada.</b>
</p>

</div>

## 🌆 Tabla de Contenidos

1. [✨ Características Principales](#-características-principales)
2. [🛸 Vistas y Módulos de la Aplicación](#-vistas-y-módulos-de-la-aplicación)
3. [🏛️ Arquitectura y Atomic Design ("Carpeteo")](#️-arquitectura-y-atomic-design-carpeteo)
4. [🛠️ Stack Tecnológico](#️-stack-tecnológico)
5. [🚀 Instalación y Puesta en Marcha](#-instalación-y-puesta-en-marcha)
6. [🧪 Suite de Testing y Calidad](#-suite-de-testing-y-calidad)
7. [👩‍💻 Autora y Contacto](#-autora-y-contacto)

---

## ✨ Características Principales

- **🎮 Estética Neón & Synthwave:** Paleta de colores seleccionada en cian `#00f0ff`, magenta `#ff007f` y amarillo `#ffe600` con sombras de resplandor (*neon glow*), degradados y fondos inmersivos.
- **⚡ Showcase Carrusel con Auto-Play:** Rotación automática de las reliquias más valiosas cada 4 segundos, con pausa inteligente al pasar el ratón (`hover`), flechas de navegación y barra interactiva de miniaturas.
- **🔄 CRUD Integral en Tiempo Real:** Creación (`POST`), lectura (`GET`), actualización (`PUT`) y eliminación (`DELETE`) conectadas a una API REST mockeada con **JSON Server**.
- **📱 100% Responsive & Adaptable:** Cuadrículas fluidas (`CSS Grid` con `minmax` y `auto-fit`) optimizadas para teléfonos móviles (desde 320px), tablets y pantallas 4K.
- **🌤️ Widget de Clima en Directo:** Integración con API meteorológica para mostrar la ubicación y temperatura en tiempo real en la cabecera.
- **🧪 Testing Automatizado:** Pruebas unitarias e integración con **Vitest** y **React Testing Library** con cobertura del 100% en componentes clave.

---

## 🛸 Vistas y Módulos de la Aplicación

| Página | Ruta | Descripción |
| :--- | :---: | :--- |
| **🏠 Inicio (Home)** | `/` | Hero principal, formulario de registro rápido y el **Showcase Carrusel Dinámico** de las joyas más valiosas del catálogo. |
| **🛍️ Vitrina de Productos** | `/products` | Catálogo completo distribuido en **filas de 3 columnas**, con formulario modal para altas y edición `PUT` en caliente. |
| **👥 Equipo de Vendedores** | `/vendors` | Cuadrícula simétrica equilibrada **4 arriba y 4 abajo** (8 especialistas), con gestión de bajas y perfiles. |
| **📖 Historia de la Marca** | `/history` | Manifiesto de origen en Sevilla y **línea temporal interactiva** con los 4 grandes hitos de la tienda. |
| **👤 Gestión de Usuarios** | `/users` | Panel de administración de cuentas de la comunidad con control de roles y altas/bajas. |

---

## 🏛️ Arquitectura y Atomic Design ("Carpeteo")

El proyecto implementa la metodología **Atomic Design** junto a una estricta convención de nomenclatura (`camelCase` para variables/funciones y `PascalCase` para componentes):

```text
la-buhardilla-retro/
├── public/                     # Archivos estáticos públicos
├── src/
│   ├── assets/                 # Recursos gráficos e imágenes
│   ├── components/             # Jerarquía Atomic Design
│   │   ├── atoms/              # Componentes indivisibles (RetroImage.jsx, etc.)
│   │   ├── molecules/          # Combinaciones modulares de átomos
│   │   └── organisms/          # Estructuras complejas de interfaz (Header.jsx, Footer.jsx)
│   ├── data/                   # Base de datos mockeada local (products.json, users.json)
│   ├── hooks/                  # Custom hooks reutilizables
│   ├── pages/                  # Vistas principales de React Router
│   │   ├── History.jsx         # Página de historia y timeline
│   │   ├── Home.jsx            # Página principal con carrusel
│   │   ├── Products.jsx        # Vitrina de productos y CRUD
│   │   ├── Users.jsx           # Panel de gestión de usuarios
│   │   └── Vendors.jsx         # Plantilla del equipo de expertos
│   ├── services/               # Clientes HTTP y llamadas API (api.js, weatherService.js)
│   ├── styles/                 # Estilos y variables CSS globales
│   ├── App.css                 # Estilos complementarios
│   ├── App.jsx                 # Router principal y layout de la SPA
│   ├── index.css               # Estilos globales y reset
│   ├── main.jsx                # Punto de entrada de la aplicación
│   └── setupTests.js           # Configuración de Jest-DOM para Vitest
├── eslint.config.js            # Configuración de ESLint 10
├── index.html                  # Plantilla HTML con tipografía y meta tags
├── package.json                # Dependencias y scripts de ejecución
├── vite.config.js              # Configuración de Vite y entorno de pruebas
└── README.md                   # Documentación oficial del proyecto
```

---

## 🛠️ Stack Tecnológico

- **Frontend Core:** [React 19](https://react.dev/) + [Vite 8](https://vite.dev/)
- **Enrutamiento:** [React Router DOM v7](https://reactrouter.com/)
- **Peticiones HTTP:** [Axios](https://axios-http.com/)
- **Backend Mock:** [JSON Server](https://github.com/typicode/json-server) (Puerto `3001`)
- **Testing:** [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/) + [Jest-DOM](https://github.com/testing-library/jest-dom)
- **Linter & Formato:** [ESLint 10](https://eslint.org/)

---

## 🌐 APIs Utilizadas y Endpoints

La aplicación consume dos servicios de datos:

### 1. 🗄️ API REST Local (JSON Server en Puerto 3001)
Servidor mockeado que gestiona la persistencia de datos en `src/data/products.json`:

| Recurso | Método | Endpoint | Descripción |
| :--- | :---: | :--- | :--- |
| **Productos** | `GET` | `http://localhost:3001/products` | Obtener todas las reliquias del catálogo |
| **Productos** | `POST` | `http://localhost:3001/products` | Registrar una nueva reliquia |
| **Productos** | `PUT` | `http://localhost:3001/products/:id` | Modificar un producto existente |
| **Productos** | `DELETE` | `http://localhost:3001/products/:id` | Eliminar un producto del catálogo |
| **Vendedores** | `GET` | `http://localhost:3001/vendedores` | Listar los miembros y expertos del equipo |
| **Vendedores** | `POST` | `http://localhost:3001/vendedores` | Dar de alta a un nuevo vendedor |
| **Vendedores** | `PUT` | `http://localhost:3001/vendedores/:id` | Actualizar los datos de un vendedor |
| **Vendedores** | `DELETE` | `http://localhost:3001/vendedores/:id` | Dar de baja a un miembro |
| **Usuarios** | `GET` | `http://localhost:3001/users` | Listar usuarios registrados de la comunidad |
| **Usuarios** | `POST` | `http://localhost:3001/users` | Crear un nuevo usuario |
| **Usuarios** | `PUT` | `http://localhost:3001/users/:id` | Actualizar rol o perfil de usuario |
| **Usuarios** | `DELETE` | `http://localhost:3001/users/:id` | Eliminar cuenta de usuario |

### 2. 🌤️ API Pública Externa de Clima (Open-Meteo)
Consulta meteorológica en tiempo real sin autenticación para el widget de cabecera:
- **Proveedor:** [Open-Meteo Weather Forecast API](https://open-meteo.com/)
- **Endpoint:** `https://api.open-meteo.com/v1/forecast?latitude=37.3881&longitude=-5.9823&current=temperature_2m,weather_code`
- **Ubicación:** Sevilla, España (`37.3881° N, -5.9823° W`)
- **Implementación:** Archivo de servicio en [`src/services/weatherService.js`](file:///c:/Proyectos/la-buhardilla-retro/src/services/weatherService.js)


---

## 🚀 Instalación y Puesta en Marcha

Sigue estos sencillos pasos para levantar el proyecto localmente:

### 1. Clonar el repositorio
```bash
git clone https://github.com/apariciodiazpatricia-cell/la-buhardilla-retro.git
cd la-buhardilla-retro
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Iniciar la API Mock (Terminal 1)
Inicia la base de datos local en el puerto `3001`:
```bash
npm run api
```

### 4. Iniciar el servidor de desarrollo (Terminal 2)
Inicia el entorno de desarrollo con Vite:
```bash
npm run dev
```

Abre tu navegador en `http://localhost:5173` para sumergirte en **La Buhardilla Retro**.

---

## 🧪 Suite de Testing y Calidad

El proyecto cuenta con pruebas automatizadas que verifican el renderizado, navegación, categorías y componentes:

```bash
# Ejecutar todas las pruebas unitarias
npm test

# Ejecutar pruebas en modo observador (watch)
npm run test:watch

# Comprobar la calidad y formato del código con ESLint
npm run lint

# Compilar para producción
npm run build
```

---

## 👩‍💻 Autora y Contacto

Proyecto diseñado y desarrollado con pasión retro por **Patricia Aparicio**.

<div align="center">

<a href="https://github.com/apariciodiazpatricia-cell" target="_blank">
  <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
</a>
&nbsp;&nbsp;
<a href="https://www.linkedin.com/in/patriciaapariciodiaz/">
  <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
</a>

<br/><br/>


<p align="center">
  ______________________________________<br>
  / &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\ <br>
  | &nbsp;&nbsp; 🕹️ GRACIAS POR VISITAR LA BUHARDILLA RETRO 🕹️ &nbsp;&nbsp; |<br>
  \______________________________________/
</p>
