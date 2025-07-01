import React, { useEffect, useState } from 'react';
import { getMisPedidos, deletePedido } from '../../services/pedidosService';
import Button from '../../components/Button';
import Nav from '../../components/Nav';
import { useNavigate, useLocation } from 'react-router-dom';
import Toast from '../../components/Toast';
import './PedidosVendedorPage.scss';

const PedidosVendedorPage = () => {
    const [pedidos, setPedidos] = useState([]);
    const [toast, setToast] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const data = await getMisPedidos();
                setPedidos(data);
            } catch (err) {
                console.error('❌ Error al obtener pedidos del vendedor:', err);
            }
        };
        fetchPedidos();
    }, []);

    useEffect(() => {
        if (location.state?.toast) {
            setToast(location.state.toast);
            setTimeout(() => setToast(null), 4000);
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    const handleEdit = (id) => {
        alert(`📝 Mostrar JSON de pedido con ID: ${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await deletePedido(id);
            setPedidos((prev) => prev.filter((p) => p._id !== id));
        } catch (err) {
            console.error('❌ Error al eliminar pedido:', err);
        }
    };

    const handleView = (pedido) => {
        navigate('/pedidos/detalle', {
            state: { pedido } // ✅ pasamos el objeto completo
        });
    };

    return (
        <>
            <Nav />
            {toast && <Toast {...toast} />}
            <div className="vendedor-container">
                <div className="vendedor-header">
                    <h1 className="vendedor-title">Mis Pedidos</h1>
                    <Button className="primary" onClick={() => navigate('/pedidos/crear')}>
                        Crear pedido
                    </Button>
                </div>

                {pedidos.length === 0 ? (
                    <p className="no-pedidos">No tienes pedidos aún.</p>
                ) : (
                    <div className="pedido-grid">
                        {pedidos.map((pedido) => (
                            <div key={pedido._id} className="pedido-card">
                                <p><strong>ID:</strong> {pedido._id}</p>
                                <p><strong>Estado:</strong> {pedido.estado}</p>
                                <div className="btn-group">
                                    <Button className="info small" onClick={() => handleView(pedido)}>Ver</Button>
                                    <Button className="secondary small" onClick={() => handleEdit(pedido._id)}>Editar</Button>
                                    <Button className="danger small" onClick={() => handleDelete(pedido._id)}>Eliminar</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default PedidosVendedorPage;
