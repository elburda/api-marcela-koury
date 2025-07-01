import React, { useEffect, useState } from 'react';
import { getPedidosPorVendedor, eliminarPedido } from '../../services/pedidosService';
import PedidoCard from './components/PedidoCard';
import Nav from '../../components/Nav';
import Toast from '../../components/Toast';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import './PedidosPage.scss';


const PedidosAdminPage = () => {
    const [pedidosPorVendedor, setPedidosPorVendedor] = useState([]);
    const [toast, setToast] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPedidosPorVendedor();
                setPedidosPorVendedor(data);
            } catch (err) {
                console.error('Error al obtener pedidos:', err);
            }
        };

        fetchData();
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
                await eliminarPedido(id); // ✅ corregido
                setPedidosPorVendedor(prev =>
                    prev.map(v => ({
                        ...v,
                        pedidos: v.pedidos.filter(p => p._id !== id)
                    }))
                );
                Swal.fire('Eliminado', 'El pedido fue eliminado correctamente.', 'success');
            } catch (err) {
                console.error('Error al eliminar pedido:', err);
                Swal.fire('Error', 'No se pudo eliminar el pedido', 'error');
            }
        }
    };

    return (
        <>
            <Nav />
            {toast && <Toast {...toast} />}
            <div className="pedidos-container">
                <h1 className="titulo-pedidos">Pedidos por Vendedor</h1>
                <div className="cards-container">
                    {pedidosPorVendedor.map(({ vendedor, pedidos }) => (
                        <PedidoCard
                            key={vendedor._id}
                            vendedor={vendedor}
                            pedidos={pedidos}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default PedidosAdminPage;
