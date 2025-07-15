
import React, { useEffect, useState } from 'react';
import { getMisPedidos, eliminarPedido } from '../../services/pedidosService';
import Nav from '../../components/Nav';
import { useNavigate, useLocation } from 'react-router-dom';
import Toast from '../../components/Toast';
import Swal from 'sweetalert2';
import { io } from 'socket.io-client';
import './PedidosVendedorPage.scss';

const socket = io('http://localhost:3000');

const PedidosVendedorPage = () => {
    const [pedidos, setPedidos] = useState([]);
    const [toast, setToast] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const fetchPedidos = async () => {
        try {
            const data = await getMisPedidos();
            setPedidos(data);
        } catch (err) {
            console.error('❌ Error al obtener pedidos del vendedor:', err);
        }
    };

    useEffect(() => {
        fetchPedidos();

        socket.on('nuevo-pedido', fetchPedidos);
        socket.on('pedido-actualizado', fetchPedidos);
        socket.on('pedido-eliminado', fetchPedidos);

        return () => {
            socket.off('nuevo-pedido');
            socket.off('pedido-actualizado');
            socket.off('pedido-eliminado');
        };
    }, []);

    useEffect(() => {
        if (location.state?.toast) {
            setToast(location.state.toast);
            setTimeout(() => setToast(null), 4000);
            window.history.replaceState({}, document.title);
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
                await fetchPedidos();
                setToast({ message: 'Pedido eliminado correctamente.', state: 'success' });
                setTimeout(() => setToast(null), 4000);
            } catch (err) {
                console.error('Error al eliminar pedido:', err);
            }
        }
    };

    const handleCrearPedido = () => {
        navigate('/pedidos/crear');
    };

    const handleVerDetalle = (pedido) => {
        navigate(`/pedidos/${pedido._id}`, { state: { pedido } });
    };

    return (
        <div>
            <Nav />
            {toast && <Toast {...toast} />}
            <div className="vendedor-container">
                <div className="vendedor-header">
                    <h2 className="vendedor-title">Mis Pedidos</h2>
                    <button onClick={handleCrearPedido} className="btn-crear">Crear Pedido</button>
                </div>

                {pedidos.length > 0 ? (
                    <div className="pedido-grid">
                        {pedidos.map((pedido) => (
                            <div key={pedido._id} className="pedido-card">
                                <p><strong>Fecha:</strong> {pedido.fechaPedido ? new Date(pedido.fechaPedido).toLocaleString() : 'Sin fecha'}</p>
                                <p><strong>Estado:</strong> {pedido.estado}</p>

                                <div className="acciones-local">
                                    <button className="btn-ver" onClick={() => handleVerDetalle(pedido)}>
                                        Ver
                                    </button>
                                    <button className="btn-borrar" onClick={() => handleDelete(pedido._id)}>
                                        <i className="fas fa-trash-alt"></i> Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-pedidos">No hay pedidos para mostrar.</p>
                )}
            </div>
        </div>
    );
};

export default PedidosVendedorPage;
