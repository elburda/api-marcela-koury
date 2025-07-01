import api from './api';

// Obtener artículos con paginación
export const getArticulos = async (page = 1, limit = 1000) => {
    const res = await api.get(`/articulos?page=${page}&limit=${limit}`);
    return res.data;
};

// Crear un nuevo artículo
export const crearArticulo = async (datos) => {
    const res = await api.post('/articulos', datos);
    return res.data;
};

// Eliminar un artículo
export const deleteArticulo = async (id) => {
    const res = await api.delete(`/articulos/${id}`);
    return res.data;
};

// Actualizar un artículo
export const actualizarArticulo = async (id, datos) => {
    const res = await api.put(`/articulos/${id}`, datos);
    return res.data;
};

// Obtener un artículo por ID
export const getArticuloById = async (id) => {
    const res = await api.get(`/articulos/${id}`);
    return res.data;
};
