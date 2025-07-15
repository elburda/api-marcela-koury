// import React, { useEffect, useState } from 'react';
// import { getPedidosPorVendedor, eliminarPedido } from '../../services/pedidosService';
// import Nav from '../../components/Nav';
// import Toast from '../../components/Toast';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import { io } from 'socket.io-client';
// import './PedidosPage.scss';

// const socket = io('http://localhost:3000');

// const PedidosAdminPage = () => {
//     const [pedidosPorVendedor, setPedidosPorVendedor] = useState([]);
//     const [toast, setToast] = useState(null);
//     const location = useLocation();
//     const navigate = useNavigate();

//     const cargarPedidos = async () => {
//         try {
//         const data = await getPedidosPorVendedor();
//         setPedidosPorVendedor(data);
//         } catch (err) {
//         console.error('Error al obtener pedidos:', err);
//         }
//     };

//     useEffect(() => {
//         cargarPedidos();

//         socket.on('nuevo-pedido', cargarPedidos);
//         socket.on('pedido-actualizado', cargarPedidos);
//         socket.on('pedido-eliminado', cargarPedidos);

//         return () => {
//         socket.off('nuevo-pedido', cargarPedidos);
//         socket.off('pedido-actualizado', cargarPedidos);
//         socket.off('pedido-eliminado', cargarPedidos);
//         };
//     }, []);

//     useEffect(() => {
//         if (location.state?.toast) {
//         setToast(location.state.toast);
//         setTimeout(() => setToast(null), 4000);
//         }
//     }, [location.state]);

//     const handleDelete = async (id) => {
//         const confirm = await Swal.fire({
//         title: '¿Estás seguro?',
//         text: 'Esta acción eliminará el pedido permanentemente.',
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonText: 'Sí, eliminar',
//         cancelButtonText: 'Cancelar',
//         });

//         if (confirm.isConfirmed) {
//         try {
//             await eliminarPedido(id);
//             await cargarPedidos();
//             setToast({ message: 'Pedido eliminado correctamente.', state: 'success' });
//             setTimeout(() => setToast(null), 4000);
//         } catch (err) {
//             console.error('Error al eliminar pedido:', err);
//         }
//         }
//     };

//     const handleVerPedido = (pedido) => {
//         navigate(`/pedidos/${pedido._id}`, { state: { pedido } });
//     };

//     return (
//         <div>
//         <Nav />
//         {toast && <Toast {...toast} />}
//         <div className="pedidos-container">
//             <h2 className="titulo-pedidos">Pedidos a Fábrica</h2>
//             <div className="tabla-wrapper">
//             
<table className="tabla-pedidos">
    <thead>
        <tr>
            <th>Vendedor</th>
            <th>Email</th>
            <th>Dirección</th>
            <th>ID de Pedido</th>
            <th>Estado</th>
            <th>Total</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
        {pedidosPorVendedor.map(({ vendedor, pedidos }) =>
            pedidos.map((pedido, index) => {
                const total = pedido.articulos?.reduce((acc, item) => {
                    const precio = item?.articulo?.price || 0;
                    const cantidad = item?.cantidad || 0;
                    return acc + cantidad * precio;
                }, 0) || 0;

                return (
                    <tr key={pedido._id} className={index % 2 === 0 ? 'fila-alterna' : ''}>
                        <td>{vendedor.nombre} {vendedor.apellido}</td>
                        <td>{vendedor.email}</td>
                        <td>{vendedor.direccion || '—'}</td>
                        <td>{pedido._id}</td>
                        <td>{pedido.estado || 'pendiente'}</td>
                        <td>${total.toFixed(2)}</td>
                        <td className="acciones">
                            <button className="btn-ver" onClick={() => handleVerPedido(pedido)}>Ver</button>
                            <button className="btn-eliminar" onClick={() => handleDelete(pedido._id)}>Eliminar</button>
                        </td>
                    </tr>
                );
            })
        )}
    </tbody>
</table>

//             </div>
//         </div>
//         </div>
//     );
// };

// export default PedidosAdminPage;

import React, { useEffect, useState } from 'react';
import { getPedidosPorVendedor, eliminarPedido } from '../../services/pedidosService';
import Nav from '../../components/Nav';
import Toast from '../../components/Toast';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { io } from 'socket.io-client';
import './PedidosPage.scss';

const socket = io('http://localhost:3000');

const PedidosAdminPage = () => {
    const [pedidosPorVendedor, setPedidosPorVendedor] = useState([]);
    const [toast, setToast] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const cargarPedidos = async () => {
        try {
        const data = await getPedidosPorVendedor();
        setPedidosPorVendedor(data);
        } catch (err) {
        console.error('Error al obtener pedidos:', err);
        }
    };

    useEffect(() => {
        cargarPedidos();

        socket.on('nuevo-pedido', cargarPedidos);
        socket.on('pedido-actualizado', cargarPedidos);
        socket.on('pedido-eliminado', cargarPedidos);

        return () => {
        socket.off('nuevo-pedido', cargarPedidos);
        socket.off('pedido-actualizado', cargarPedidos);
        socket.off('pedido-eliminado', cargarPedidos);
        };
    }, []);

    useEffect(() => {
        if (location.state?.toast) {
        setToast(location.state.toast);
        setTimeout(() => setToast(null), 4000);
        }
    }, [location.state]);

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará el pedido permanentemente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        });

        if (confirm.isConfirmed) {
        try {
            await eliminarPedido(id);
            await cargarPedidos();
            setToast({ message: 'Pedido eliminado correctamente.', state: 'success' });
            setTimeout(() => setToast(null), 4000);
        } catch (err) {
            console.error('Error al eliminar pedido:', err);
        }
        }
    };

    const handleVerPedido = (pedido) => {
        navigate(`/pedidos/${pedido._id}`, { state: { pedido } });
    };

    return (
        <div>
        <Nav />
        {toast && <Toast {...toast} />}
        <div className="pedidos-container">
            <h2 className="titulo-pedidos">Pedidos a Fábrica</h2>
            <div className="tabla-wrapper">
            <table className="tabla-pedidos">
                <thead>
                <tr>
                    <th>Vendedor</th>
                    <th>Email</th>
                    <th>ID de Pedido</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {pedidosPorVendedor.map(({ vendedor, pedidos }) =>
                    pedidos.map((pedido) => (
                    <tr key={pedido._id}>
                        <td>{vendedor.nombre} {vendedor.apellido}</td>
                        <td>{vendedor.email}</td>
                        <td>{pedido._id}</td>
                        <td className="acciones">
                        <button className="btn-ver" onClick={() => handleVerPedido(pedido)}>
                            <i className="fas fa-eye"></i> Ver
                        </button>
                        <button className="btn-eliminar" onClick={() => handleDelete(pedido._id)}>
                            <i className="fas fa-trash-alt"></i> Eliminar
                        </button>
                        </td>
                    </tr>
                    ))
                )}
                </tbody>
            </table>
            </div>
        </div>
        </div>
    );
};

export default PedidosAdminPage;
