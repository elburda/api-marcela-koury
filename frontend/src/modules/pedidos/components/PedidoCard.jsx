// import React from 'react';
// import Button from '../../../components/Button';
// import './PedidoCard.scss';

// const PedidoCard = ({ vendedor, pedidos, onEdit, onDelete, onView }) => {
//     return (
//         <div className="pedido-card">
//         <h5>{vendedor.nombre} {vendedor.apellido}</h5>
//         <p><strong>Email:</strong> {vendedor.email}</p>
//         <p><strong>Total pedidos:</strong> {pedidos.length}</p>

//         <ul>
//             {pedidos.map(pedido => (
//             <li key={pedido._id} className="pedido-item">
//                 <span
//                 className="pedido-id"
//                 onClick={() => console.log("Artículos del pedido:", pedido)}
//                 >
//                 {pedido._id}
//                 </span>
//                 <div className="btn-group">
//                 <Button className="info small" onClick={() => onView(pedido)}>Ver</Button>
//                 <Button className="secondary small" onClick={() => onEdit(pedido._id)}>Editar</Button>
//                 <Button className="danger small" onClick={() => onDelete(pedido._id)}>Eliminar</Button>
//                 </div>
//             </li>
//             ))}
//         </ul>
//         </div>
//     );
// };

// export default PedidoCard;

// import React from 'react';
// import Button from '../../../components/Button';
// import './PedidoCard.scss';
// import { useNavigate } from 'react-router-dom';

// const PedidoCard = ({ vendedor, pedidos, onEdit, onDelete }) => {
//     const navigate = useNavigate();

//     const handleView = (pedido) => {
//         navigate('/pedidos/detalle', {
//             state: { pedido }  // ✅ Pasamos el pedido completo
//         });
//     };

//     return (
//         <div className="pedido-card">
//             <h5>{vendedor.nombre} {vendedor.apellido}</h5>
//             <p><strong>Email:</strong> {vendedor.email}</p>
//             <p><strong>Total pedidos:</strong> {pedidos.length}</p>

//             <ul>
//                 {pedidos.map(pedido => (
//                     <li key={pedido._id} className="pedido-item">
//                         <span
//                             className="pedido-id"
//                             onClick={() => console.log("Artículos del pedido:", pedido)}
//                         >
//                             {pedido._id}
//                         </span>
//                         <div className="btn-group">
//                             <Button className="info small" onClick={() => handleView(pedido)}>Ver</Button>
//                             <Button className="secondary small" onClick={() => onEdit(pedido._id)}>Editar</Button>
//                             <Button className="danger small" onClick={() => onDelete(pedido._id)}>Eliminar</Button>
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default PedidoCard;
// import React from 'react';
// import Button from '../../../components/Button';
// import './PedidoCard.scss';
// import { useNavigate } from 'react-router-dom';

// const PedidoCard = ({ vendedor, pedidos, onDelete }) => {
//     const navigate = useNavigate();

//     const handleView = (pedido) => {
//         navigate('/pedidos/detalle', {
//             state: { pedido }
//         });
//     };

//     return (
//         <div className="pedido-card">
//             <h5>{vendedor.nombre} {vendedor.apellido}</h5>
//             <p><strong>Email:</strong> {vendedor.email}</p>
//             <p><strong>Total pedidos:</strong> {pedidos.length}</p>

//             <ul>
//                 {pedidos.map(pedido => (
//                     <li key={pedido._id} className="pedido-item">
//                         <span className="pedido-id">
//                             {pedido._id}
//                         </span>
//                         <div className="btn-group">
//                             <Button className="info small" onClick={() => handleView(pedido)}>Ver</Button>
//                             <Button className="danger small" onClick={() => onDelete(pedido._id)}>Eliminar</Button>
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default PedidoCard;
import React from 'react';
import Button from '../../../components/Button';
import './PedidoCard.scss';
import { useNavigate } from 'react-router-dom';

const PedidoCard = ({ vendedor, pedidos, onDelete }) => {
    const navigate = useNavigate();

    const handleView = (pedido) => {
        navigate('/pedidos/detalle', {
            state: { pedido }  // ✅ Pasamos el pedido completo
        });
    };

    return (
        <div className="pedido-card">
            <h5>{vendedor.nombre} {vendedor.apellido}</h5>
            <p><strong>Email:</strong> {vendedor.email}</p>
            <p><strong>Total pedidos:</strong> {pedidos.length}</p>

            <ul>
                {pedidos.map(pedido => (
                    <li key={pedido._id} className="pedido-item">
                        <span className="pedido-id">
                            {pedido._id}
                        </span>
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

