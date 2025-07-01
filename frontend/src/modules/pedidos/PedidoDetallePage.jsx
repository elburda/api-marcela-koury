import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Nav from '../../components/Nav';
import Button from '../../components/Button';
import './PedidoDetallePage.scss';

const PedidoDetallePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const pedido = location.state?.pedido;

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

            <div style={{ marginTop: '2rem' }}>
            <Button className="secondary" onClick={() => navigate(-1)}>Volver</Button>
            </div>
        </div>
        </>
    );
};

export default PedidoDetallePage;
