
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
        socket.on('nuevo-pedido', () => {
            cargarPedidos();
        });

        return () => socket.off('nuevo-pedido');
    }, []);

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: '¿Eliminar pedido?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (confirm.isConfirmed) {
            try {
                await eliminarPedido(id);
                setToast({ message: 'Pedido eliminado', state: 'success' });
                cargarPedidos();
            } catch (err) {
                console.error('Error al eliminar pedido:', err);
                setToast({ message: 'Error al eliminar', state: 'error' });
            }
        }
    };

    const handleVerPedido = (pedido) => {
        navigate(`/pedidos/${pedido._id}`, { state: { pedido } });
    };

    return (
        <>
            <Nav />
            <div className="tabla-container">
                <h1>Pedidos a Fábrica</h1>
                <table className="tabla-pedidos">
                    <thead>
                        <tr>
                            <th>Vendedor</th>
                            <th>Email</th>
                            <th>Dirección</th>
                            <th>ID de Pedido</th>
                            <th>Estado</th>
                            <th>Total del Pedido</th>
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
                {toast && <Toast message={toast.message} state={toast.state} />}
            </div>
        </>
    );
};

export default PedidosAdminPage;
