import api from './api';

// Admin: obtiene pedidos agrupados por vendedor
export const getPedidosPorVendedor = async () => {
    const res = await api.get('/pedidos/admin');
    return res.data;
};

// Vendedor: obtiene sus propios pedidos
export const getMisPedidos = async () => {
    const token = localStorage.getItem('token');
    const res = await api.get('/pedidos', {
        headers: {
        Authorization: `Bearer ${token}`
        }
    });
    return res.data;
};

// Crear un nuevo pedido
export const createPedido = async (datos) => {
    const token = localStorage.getItem('token');
    const res = await api.post('/pedidos', datos, {
        headers: {
        Authorization: `Bearer ${token}`
        }
    });
    return res.data;
};

// Eliminar un pedido
export const deletePedido = async (id) => {
    const token = localStorage.getItem('token');
    const res = await api.delete(`/pedidos/${id}`, {
        headers: {
        Authorization: `Bearer ${token}`
        }
    });
    return res.data;
};

// Actualizar estado de un pedido
export const updatePedido = async (id, datos) => {
    const token = localStorage.getItem('token');
    const res = await api.put(`/pedidos/${id}`, datos, {
        headers: {
        Authorization: `Bearer ${token}`
        }
    });
    return res.data;
};

// Obtener un pedido por su ID (detalle)
    export const getPedidoById = async (id) => {
    const token = localStorage.getItem('token');
    const res = await api.get(`/pedidos/${id}`, {
        headers: {
        Authorization: `Bearer ${token}`
        }
    });
    return res.data;
};
