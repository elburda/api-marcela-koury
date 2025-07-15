
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Nav from '../../components/Nav';
import Button from '../../components/Button';
import Swal from 'sweetalert2';
import { actualizarEstadoPedido } from '../../services/pedidosService';
import { useAuth } from '../../context/AuthContext';
import './PedidoDetallePage.scss';

const PedidoDetallePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [pedido, setPedido] = useState(location.state?.pedido);

    if (!pedido) {
        return (
            <div className="detalle-container">
                <p>⚠️ No se proporcionó un pedido válido.</p>
                <Button className="secondary" onClick={() => navigate(-1)}>Volver</Button>
            </div>
        );
    }

    const total = pedido.articulos?.reduce((acc, item) => {
        const precio = item?.articulo?.price || 0;
        const cantidad = item?.cantidad || 0;
        return acc + cantidad * precio;
    }, 0) || 0;

    const handleEnviarPedido = async () => {
        const confirm = await Swal.fire({
            title: '¿Confirmar envío?',
            text: '¿Querés marcar este pedido como completado?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, enviar',
            cancelButtonText: 'Cancelar'
        });

        if (confirm.isConfirmed) {
            try {
                const resultado = await actualizarEstadoPedido(pedido._id, 'completado');

                if (resultado && resultado.pedido) {
                    setPedido(resultado.pedido);
                    Swal.fire('¡Éxito!', 'El pedido fue marcado como completado.', 'success');
                } else {
                    throw new Error('Respuesta inesperada del servidor');
                }
            } catch (err) {
                console.error('❌ Error al actualizar estado:', err);
                Swal.fire('Error', 'No se pudo actualizar el estado del pedido.', 'error');
            }
        }
    };

    return (
        <>
            <Nav />
            <div className="detalle-container">
                <div className="detalle-header">
                    <h1>Detalle del Pedido</h1>
                </div>

                <div className="detalle-info">
                    <p><strong>ID Pedido:</strong> {pedido._id}</p>
                    <p><strong>Vendedor:</strong> {pedido.vendedor?.nombre}</p>
                    <p><strong>Email:</strong> {pedido.vendedor?.email}</p>
                    <p><strong>Fecha:</strong> {pedido.fechaPedido ? new Date(pedido.fechaPedido).toLocaleString() : 'Sin fecha'}</p>
                    <p><strong>Estado:</strong> {pedido.estado}</p>
                </div>

                <div className="detalle-articulos">
                    <h2>Artículos</h2>
                    {pedido.articulos?.map((item, index) => {
                        const art = item.articulo;
                        const cantidad = item.cantidad;
                        const precio = art?.price || 0;
                        return (
                            <div key={index} className="detalle-item">
                                <div>
                                    <h4>{art?.title || 'Sin título'}</h4>
                                    <p>{art?.description || 'Sin descripción'}</p>
                                </div>
                                <div className="detalle-item-datos">
                                    <p><strong>Cantidad:</strong> {cantidad}</p>
                                    <p><strong>Precio:</strong> ${precio.toFixed(2)}</p>
                                    <p><strong>Subtotal:</strong> ${(cantidad * precio).toFixed(2)}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="detalle-total">
                    <h3>Total del Pedido: ${total.toFixed(2)}</h3>
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                    <Button className="secondary" onClick={() => navigate(-1)}>Volver</Button>
                    {/* Solo el admin puede ver este botón */}
                    {user?.rol === 'admin' && pedido.estado === 'pendiente' && (
                        <Button className="primary" onClick={handleEnviarPedido}>Enviar Pedido</Button>
                    )}
                </div>
            </div>
        </>
    );
};

export default PedidoDetallePage;
