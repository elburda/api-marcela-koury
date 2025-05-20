# API BitGuard - Gestión de artículos y pedidos

## 👤 Autores

**Burda Nicolás**  
**Burda Dario** 
**Proyecto: API BitGuard - Aplicaciones Híbridas**

---

## 📌 Descripción

Esta es una API RESTful desarrollada en Node.js para gestionar artículos de lencería y sus pedidos. Permite operaciones CRUD, búsqueda, filtrado, paginado y autenticación (a implementar).

---

## 🚀 Tecnologías utilizadas

- **Node.js**
- **Express**
- **MongoDB con Mongoose**
- **ESModules (`"type": "module"`)**
- **Nodemon**
- **Joi** – Validaciones
- **dotenv** – Variables de entorno

---

## 📁 Estructura de carpetas

├── controllers/
├── models/
├── routes/
├── services/
├── validation/
├── data/
├── public/
├── .env
├── main.js
└── package.json

---

## ⚙️ Instalación

TODO:```bash
npm install

Luego, creá un archivo .env y poner copiar lo siguiente:

DB_USER=root
DB_Password=1234
BASE_URL=https://github.com/elburda/api-bitguard.git

JWT_SECRET=miClaveSecreta

MONGODB_URI=mongodb://127.0.0.1:27017/proyecto_node
TODO:

##Cómo iniciar el proyecto
npm start

cargar en la base de datos MONGODB:

articulos ejemplo:

[
  {
    "title": "Conjunto deportivo Verde",
    "tags": ["deportivo"],
    "description": "Conjunto deportivo cómodo y transpirable ideal para entrenamientos.",
    "price": 7998,
    "size": "S",
    "color": "verde",
    "stock": 25
  },
  {
    "title": "Corpiño deportivo Azul",
    "tags": ["deportivo", "corpiño"],
    "description": "Corpiño deportivo con buen soporte y ajuste, ideal para actividades físicas.",
    "price": 5590,
    "size": "M",
    "color": "azul",
    "stock": 40
  },
  {
    "title": "Bombacha clásica Negra",
    "tags": ["clásico", "bombacha"],
    "description": "Bombacha básica de algodón suave y cómoda para uso diario.",
    "price": 2990,
    "size": "L",
    "color": "negro",
    "stock": 60
  },
  {
    "title": "Body de encaje Blanco",
    "tags": ["sexy", "body"],
    "description": "Body sensual de encaje blanco con detalles delicados.",
    "price": 9990,
    "size": "M",
    "color": "blanco",
    "stock": 18
  },
  {
    "title": "Conjunto casual Rosa",
    "tags": ["casual", "conjunto"],
    "description": "Conjunto cómodo para uso diario, con estilo fresco y colorido.",
    "price": 6799,
    "size": "S",
    "color": "rosa",
    "stock": 30
  }
]


# # api-bitguard
# >>>>>>> da29f68e08c60aa4c0750d3e8a0cdd7bfbfca5e7