# MK-pedidos-v1.0

Gestión de pedidos y artículos con backend en Node.js + MongoDB y frontend en React + Vite. Pensado para administrar productos, usuarios y pedidos con roles diferenciados (admin y vendedor).

---

## Tecnologías utilizadas

### Backend (`/api`)
- Node.js
- Express
- MongoDB + Mongoose
- JWT (autenticación)
- Joi (validaciones)
- dotenv
- nodemon
- cors

### Frontend (`/frontend`)
- React + Vite
- React Router
- React Hook Form + Yup
- SCSS
- Context API (para sesión)
- SweetAlert2 (confirmaciones)
- Toast personalizado

---

## Requisitos previos

Antes de comenzar, asegurate de tener instalados:

- Node.js (v18 o superior recomendado)
- MongoDB local o MongoDB Atlas
- npm (v9 o superior)

---

## Estructura del proyecto

```
MK-pedidos-v1.0/
│
├── api/               → Backend (Express + MongoDB)
└── frontend/          → Frontend (React + Vite)
```

---

## Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/MK-pedidos-v1.0.git
cd MK-pedidos-v1.0
```

### 2. Configurar el Backend (`/api`)

```bash
cd api
npm install
```

Crear un archivo `.env` en la raíz de `/api` con el siguiente contenido:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/proyecto_node
```

> Asegurate de que MongoDB esté corriendo localmente o usá tu URI de MongoDB Atlas.

---

### 3. Cargar los datos iniciales (usuarios + artículos)


 cd.. api/ node main.js

Ejecutar el script de seed:

```bash
node seed.js
```

Este script:

- Crea un usuario **admin** y uno **vendedor** (si no existen)
- Inserta 10 artículos de prueba (sin duplicarlos si ya existen)
- Puede ejecutarse varias veces sin borrar datos existentes

---

### 4. Iniciar el servidor Backend

```bash
npm run dev
```

El backend estará disponible en:

```
http://localhost:3000
```

---

### 5. Configurar el Frontend (`/frontend`)

```bash
cd ../frontend
npm install
```

---

### 6. Iniciar el Frontend

```bash
npm run dev
```

La aplicación se abrirá en:

```
http://localhost:5173
```

---

##  Usuarios de prueba

| Rol      | Correo                  | Clave   |
|----------|-------------------------|---------|
|  Admin     | nicolasb@test.com       | 123456  |
|  Vendedor | marcela@test.com        | 123456  |

---

##  Funcionalidades

- **Admin**:
  - Ver pedidos por vendedor
  - Crear, editar y eliminar artículos

- **Vendedor**:
  - Crear nuevos pedidos
  - Ver lista y detalles de sus pedidos