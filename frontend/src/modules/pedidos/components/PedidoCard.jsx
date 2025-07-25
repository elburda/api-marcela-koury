
import React from 'react';
import Button from '../../../components/Button';
import './PedidoCard.scss';
import { useNavigate } from 'react-router-dom';

const PedidoCard = ({ vendedor, pedidos, onDelete }) => {
    const navigate = useNavigate();

    const handleView = (pedido) => {
        navigate('/pedidos/detalle', {
        state: { pedido }
        });
    };

    return (
        <div className="pedido-card">
        <h5>{vendedor?.nombre} {vendedor?.apellido}</h5>
        <p><strong>Email:</strong> {vendedor?.email || 'No disponible'}</p>
        <p><strong>Total pedidos:</strong> {pedidos?.length || 0}</p>

        <ul>
            {pedidos.map((pedido) => (
            <li key={pedido._id} className="pedido-item">
                <span className="pedido-id">{pedido._id}</span>
                <div className="btn-group">
                <Button className="info small" onClick={() => handleView(pedido)}>Ver</Button>
                <Button className="danger small" onClick={() => onDelete(pedido._id)}>Eliminar</Button>
                </div>
            </li>
            ))}
        </ul>
        </div>
    );
};

export default PedidoCard;
