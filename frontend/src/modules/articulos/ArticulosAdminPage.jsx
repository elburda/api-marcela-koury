import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getArticulos, deleteArticulo } from '../../services/articulosService';
import { useAuth } from '../../context/AuthContext';
import Nav from '../../components/Nav';
import Button from '../../components/Button';
import Swal from 'sweetalert2';
import './ArticulosAdminPage.scss';

const ArticulosAdminPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [articulos, setArticulos] = useState([]);
    const [search, setSearch] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const articulosPorPagina = 10;

    const fetchArticulos = async () => {
        try {
        const res = await getArticulos();
        setArticulos(res.data || res);
        } catch (err) {
        console.error('Error al cargar artículos:', err);
        }
    };

    useEffect(() => {
        if (user?.rol !== 'admin') {
        navigate('/');
        return;
        }

        fetchArticulos();
    }, [user, navigate, location.state]);

    const handleEliminar = async (id) => {
        const confirm = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esto eliminará el artículo permanentemente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
        });

        if (confirm.isConfirmed) {
        try {
            await deleteArticulo(id);
            setArticulos(prev => prev.filter(art => art._id !== id));
        } catch (err) {
            console.error('❌ Error al eliminar artículo:', err);
            Swal.fire('Error', 'No se pudo eliminar el artículo', 'error');
        }
        }
    };

    const handleEditar = (id) => {
        navigate(`/articulos/editar/${id}`);
    };

    const articulosFiltrados = articulos.filter((art) =>
        art.title.toLowerCase().includes(search.toLowerCase())
    );

    const totalPaginas = Math.ceil(articulosFiltrados.length / articulosPorPagina);
    const indexInicio = (paginaActual - 1) * articulosPorPagina;
    const articulosPaginados = articulosFiltrados.slice(indexInicio, indexInicio + articulosPorPagina);

    return (
        <>
        <Nav />
        <div className="articulos-admin-container">
            <div className="articulos-card">
            <div className="header">
                <h1>Gestión de Artículos</h1>
                <input
                type="text"
                placeholder="Buscar por título..."
                className="buscador"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
                <Button className="primary crear-btn" onClick={() => navigate('/articulos/crear')}>
                Crear artículo
                </Button>
            </div>

            {articulosFiltrados.length > 0 ? (
                <>
                <table>
                    <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Descripción</th>
                        <th>Tags</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {articulosPaginados.map((art) => (
                        <tr key={art._id}>
                        <td>{new Date(art.createdAt).toLocaleDateString()}</td>
                        <td>{art._id}</td>
                        <td>{art.title}</td>
                        <td>{art.description}</td>
                        <td>{Array.isArray(art.tags) ? art.tags.join(', ') : ''}</td>
                        <td>{art.stock}</td>
                        <td>
                            <div className="btn-group">
                            <Button className="secondary small" onClick={() => handleEditar(art._id)}>
                                Editar
                            </Button>
                            <Button className="danger small" onClick={() => handleEliminar(art._id)}>
                                Eliminar
                            </Button>
                            </div>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="paginado">
                    {paginaActual > 1 && (
                    <Button className="secondary small" onClick={() => setPaginaActual(p => p - 1)}>Anterior</Button>
                    )}
                    <span>Página {paginaActual} de {totalPaginas}</span>
                    {paginaActual < totalPaginas && (
                    <Button className="secondary small" onClick={() => setPaginaActual(p => p + 1)}>Siguiente</Button>
                    )}
                </div>
                </>
            ) : (
                <p className="no-articulos">No se encontraron artículos.</p>
            )}
            </div>
        </div>
        </>
    );
};

export default ArticulosAdminPage;
