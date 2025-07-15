import React, { useEffect, useState } from 'react';
import { getArticulos } from '../../services/articulosService';
import { createPedido } from '../../services/pedidosService';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Toast from '../../components/Toast';
import Nav from '../../components/Nav';
import ArticuloCard from './components/ArticuloCard';
import './CrearPedidoPage.scss';
import './components/ArticuloCard.scss';

const CrearPedidoPage = () => {
    const { user } = useAuth();
    console.log("🟢 user desde AuthContext:", user);
    const navigate = useNavigate();
    const [articulos, setArticulos] = useState([]);
    const [search, setSearch] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const [articulosPorPagina] = useState(5);
    const [cantidades, setCantidades] = useState({});
    const [pedido, setPedido] = useState([]);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        const fetchArticulos = async () => {
        try {
            const res = await getArticulos();
            setArticulos(res.data);
        } catch (error) {
            console.error('Error al obtener artículos:', error);
        }
        };
        fetchArticulos();
    }, []);

    const showToast = (message, state = 'success') => {
        setToast({ message, state, position: 'top-right' });
        setTimeout(() => setToast(null), 4000);
    };

    const handleCantidadChange = (id, value) => {
        setCantidades({ ...cantidades, [id]: value });
    };

    const handleAgregar = (articulo) => {
        const nuevaCantidad = parseInt(cantidades[articulo._id] || 1);

        setPedido(prevPedido => {
        const index = prevPedido.findIndex(item => item._id === articulo._id);

        if (index !== -1) {
            const nuevoPedido = [...prevPedido];
            nuevoPedido[index].cantidad = nuevaCantidad;
            return nuevoPedido;
        } else {
            return [...prevPedido, { ...articulo, cantidad: nuevaCantidad }];
        }
        });

        setCantidades(prev => ({ ...prev, [articulo._id]: 1 }));
    };

    const handleEliminar = (id) => {
        setPedido(pedido.filter(item => item._id !== id));
    };

    const handleActualizarCantidadEnPedido = (id, nuevaCantidad) => {
        setPedido(prev =>
        prev.map(item =>
            item._id === id ? { ...item, cantidad: parseInt(nuevaCantidad) } : item
        )
        );
    };

    const handleCrearPedido = async () => {
        if (pedido.length === 0) {
        showToast('Debes agregar al menos un artículo al pedido.', 'danger');
        return;
        }

        try {
        const datosPedido = {
            vendedorId: user.id,
            articulos: pedido.map(item => ({ articulo: item._id, cantidad: item.cantidad }))
        };
        await createPedido(datosPedido);
        navigate('/pedidos', {
            state: {
            toast: {
                message: '✅ Pedido creado con éxito',
                state: 'success',
                position: 'top-right'
            }
            }
        });
        } catch (err) {
        console.error('❌ Error al crear el pedido:', err);
        showToast('Ocurrió un error al crear el pedido', 'danger');
        }
    };

    const articulosFiltrados = articulos.filter(a =>
        a.title?.toLowerCase().includes(search.toLowerCase())
    );

    const totalPaginas = Math.ceil(articulosFiltrados.length / articulosPorPagina);
    const indexInicio = (paginaActual - 1) * articulosPorPagina;
    const indexFin = indexInicio + articulosPorPagina;
    const articulosPaginados = articulosFiltrados.slice(indexInicio, indexFin);

    const fechaActual = new Date().toLocaleDateString();

    return (
        <>
        <Nav />
        <div className="crear-pedido-container">
            <h1 className="titulo">Crear Pedido</h1>
            {toast && <Toast {...toast} />}

            <div className="crear-pedido-grid">
            <div className="columna-articulos">
                <input
                type="text"
                placeholder="Buscar artículos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="buscador"
                />
                <div className="lista-articulos">
                {articulosPaginados.map((articulo) => (
                    <ArticuloCard
                    key={articulo._id}
                    articulo={articulo}
                    cantidad={cantidades[articulo._id] || 1}
                    onCantidadChange={handleCantidadChange}
                    onAgregar={() => handleAgregar(articulo)}
                    />
                ))}
                </div>
                <div className="paginado">
                {paginaActual > 1 && (
                    <Button className="secondary small" onClick={() => setPaginaActual(p => p - 1)}>Anterior</Button>
                )}
                <span className="pagina-actual">Página {paginaActual} de {totalPaginas}</span>
                {paginaActual < totalPaginas && (
                    <Button className="secondary small" onClick={() => setPaginaActual(p => p + 1)}>Siguiente</Button>
                )}
                </div>
            </div>

            <div className="columna-pedido">
                <div className="pedido-header">
                <h2>Nuevo Pedido</h2>
                <Button className="primary" onClick={handleCrearPedido}>Crear Pedido</Button>
                <p><strong>Vendedor:</strong> {user?.email || 'Cargando...'}</p>
                <p><strong>Fecha:</strong> {new Date().toLocaleString()}</p>
                </div>

                <div className="lista-pedido">
                {pedido.map(item => (
                    <div key={item._id} className="articulo-card compacto">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                    <p><strong>Precio unitario:</strong> ${item.price?.toFixed(2)}</p>
                    <label>
                        <strong>Cantidad:</strong>
                        <input
                        type="number"
                        min="1"
                        value={item.cantidad}
                        onChange={(e) => handleActualizarCantidadEnPedido(item._id, e.target.value)}
                        style={{ width: '60px', marginLeft: '10px' }}
                        />
                    </label>
                    <p><strong>Subtotal:</strong> ${(item.price * item.cantidad).toFixed(2)}</p>
                    <div className="articulo-actions">
                        <Button className="danger small" onClick={() => handleEliminar(item._id)}>Quitar</Button>
                    </div>
                    </div>
                ))}
                </div>

            </div>
            </div>
        </div>
        </>
    );
};

export default CrearPedidoPage;
