🧪 Tecnologías utilizadas
Este proyecto está desarrollado con:

Backend (/api)
Node.js

Express

MongoDB + Mongoose

JWT (autenticación)

Joi (validaciones)

dotenv

nodemon

cors

Frontend (/frontend)
React + Vite

React Router

React Hook Form + Yup

SCSS

Context API (para sesión)

SweetAlert2 (confirmaciones)

Toast personalizado

⚙️ Requisitos previos
Antes de comenzar, asegurate de tener instalados:

Node.js (v18 o superior recomendado)

MongoDB en tu máquina local (o usar MongoDB Atlas)

npm (v9 o superior)

📁 Estructura del proyecto
Copiar
Editar
MK-pedidos-v1.0/
│
├── api/               → Backend (Express + MongoDB)
└── frontend/          → Frontend (React + Vite)
🔧 Instalación y configuración
1. Clonar el repositorio
bash
Copiar
Editar
git clone https://github.com/tu-usuario/MK-pedidos-v1.0.git
cd MK-pedidos-v1.0
2. Configurar el Backend (/api)
bash
Copiar
Editar
cd api
npm install
Crear un archivo .env con la siguiente variable:

env
Copiar
Editar
MONGODB_URI=mongodb://127.0.0.1:27017/proyecto_node
3. Cargar los datos iniciales (usuarios + artículos)
Ejecutar el script seed:

bash
Copiar
Editar
node seed.js
Esto creará:

Un usuario admin

Un usuario vendedor

10 artículos de prueba

4. Iniciar el servidor backend
bash
Copiar
Editar
npm run dev
El servidor se ejecutará por defecto en:

arduino
Copiar
Editar
http://localhost:3000
5. Configurar el Frontend (/frontend)
bash
Copiar
Editar
cd ../frontend
npm install
6. Iniciar el frontend
bash
Copiar
Editar
npm run dev
Vite ejecutará la app en:

arduino
Copiar
Editar
http://localhost:5173
🔐 Usuarios de prueba
Podés iniciar sesión con:

👑 Usuario Admin
Correo: nicolasb@test.com

Clave: 123456

🧑‍💼 Usuario Vendedor
Correo: dariob@test.com

Clave: 123456

🚀 Listo para usar
El admin puede ver pedidos por vendedor, gestionar artículos (crear, editar, eliminar).

El vendedor puede crear pedidos, ver los propios y ver detalle.