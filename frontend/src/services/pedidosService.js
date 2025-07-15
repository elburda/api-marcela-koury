// import api from './api';

// // Admin: obtiene pedidos agrupados por vendedor
// export const getPedidosPorVendedor = async () => {
//     const res = await api.get('/pedidos/admin');
//     return res.data;
// };

// // Vendedor: obtiene sus propios pedidos
// export const getMisPedidos = async () => {
//     const token = localStorage.getItem('token');
//     const res = await api.get('/pedidos', {
//         headers: {
//         Authorization: `Bearer ${token}`
//         }
//     });
//     return res.data;
// };

// // Crear un nuevo pedido
// export const createPedido = async (datos) => {
//     const token = localStorage.getItem('token');
//     const res = await api.post('/pedidos', datos, {
//         headers: {
//         Authorization: `Bearer ${token}`
//         }
//     });
//     return res.data;
// };
// export const eliminarPedido = async (id) => {
//     const token = localStorage.getItem('token');

//     if (!token) {
//         throw new Error('Token no encontrado en localStorage');
//     }

//     const res = await api.delete(`/pedidos/${id}`, {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     });

//     return res.data;
// };

// const getAuthHeaders = () => {
//     const token = localStorage.getItem('token');
//     return {
//         headers: {
//         Authorization: `Bearer ${token}`
//         }
//     };
// };



// // Actualizar estado de un pedido
// export const updatePedido = async (id, datos) => {
//     const token = localStorage.getItem('token');
//     const res = await api.put(`/pedidos/${id}`, datos, {
//         headers: {
//         Authorization: `Bearer ${token}`
//         }
//     });
//     return res.data;
// };

// // Obtener un pedido por su ID (detalle)
//     export const getPedidoById = async (id) => {
//     const token = localStorage.getItem('token');
//     const res = await api.get(`/pedidos/${id}`, {
//         headers: {
//         Authorization: `Bearer ${token}`
//         }
//     });
//     return res.data;
// };
// // Cambiar solo el estado del pedido
// export const actualizarEstadoPedido = async (id, nuevoEstado) => {
//     const token = localStorage.getItem('token');
//     const res = await api.put(`/pedidos/${id}`, { estado: nuevoEstado }, {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     });
//     return res.data;
// };


// src/services/pedidosService.js
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

// Eliminar pedido
export const eliminarPedido = async (id) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('Token no encontrado en localStorage');
    }

    const res = await api.delete(`/pedidos/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.data;
};

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

// Actualizar un pedido completo (no se usa para estado solo)
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

//  Cambiar solo el estado del pedido (usa ruta correcta /pedidos/:id/estado)
export const actualizarEstadoPedido = async (id, nuevoEstado) => {
    const token = localStorage.getItem('token');
    const res = await api.put(`/pedidos/${id}/estado`, { estado: nuevoEstado }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
};
