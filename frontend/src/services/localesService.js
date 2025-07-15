import api from './api';

// Obtener todos los locales (admin)
export const getLocales = async () => {
    const res = await api.get('/locales');
    return res.data;
};

// Crear nuevo local (admin)
export const crearLocal = async (localData) => {
    const res = await api.post('/locales', localData);
    return res.data;
};

// Asignar artículos a un local (admin)
export const asignarArticulosALocal = async (localId, articulos) => {
    const res = await api.post(`/locales/${localId}/articulos`, { articulos });
    return res.data;
};

// Asignar un local a un vendedor
export const asignarLocalAVendedor = async (userId, localId) => {
    const res = await api.post(`/locales/asignar-local`, { userId, localId });
    return res.data;
};

// Obtener artículos del local asignado (vendedor)
export const getArticulosDeMiLocal = async () => {
    const res = await api.get('/locales/mis-articulos');
    return res.data;
};
// ObtenerVendedores
export const obtenerVendedores = async () => {
    const res = await api.get('/locales/vendedores');
    return res.data;
};

// Obtener un local por ID
export const obtenerLocalPorId = async (id) => {
    const res = await api.get(`/locales/${id}`);
    return res.data;
};

// Actualizar un local
export const actualizarLocal = async (id, data) => {
    const res = await api.put(`/locales/${id}`, data);
    return res.data;
};

// Eliminar un local
export const eliminarLocal = async (id) => {
    const res = await api.delete(`/locales/${id}`);
    return res.data;
};

// Obtener el local asignado al vendedor logueado
export const getMiLocal = async () => {
    const res = await api.get('/locales/mi-local');
    return res.data;
};
