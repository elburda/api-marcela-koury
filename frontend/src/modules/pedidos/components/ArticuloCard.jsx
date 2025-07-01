import React from 'react';
import Button from '../../../components/Button';
import './ArticuloCard.scss';

const ArticuloCard = ({ articulo, cantidad, onCantidadChange, onAgregar, onEliminar, tipo = 'listado' }) => {
    return (
        <div className="articulo-card">
        <h4>{articulo.title}</h4>
        <p>{articulo.description}</p>

        {tipo === 'listado' ? (
            <>
            <input
                type="number"
                min="1"
                value={cantidad || 1}
                onChange={(e) => onCantidadChange(articulo._id, e.target.value)}
            />
            <Button className="info small" onClick={() => onAgregar(articulo)}>
                Agregar
            </Button>
            </>
        ) : (
            <>
            <p>
                <strong>Cantidad:</strong> {articulo.cantidad}
            </p>
            <Button className="danger small" onClick={() => onEliminar(articulo._id)}>
                Quitar
            </Button>
            </>
        )}
        </div>
    );
};

export default ArticuloCard;
