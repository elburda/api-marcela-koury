
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getMiLocal } from '../../services/localesService';
import Nav from '../../components/Nav';
import Toast from '../../components/Toast';
import './LocalVendedorPage.scss';

const LocalVendedorPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [local, setLocal] = useState(null);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        const fetchLocal = async () => {
            try {
                const data = await getMiLocal();
                setLocal(data);
            } catch (error) {
                console.error('Error al obtener el local asignado:', error);
                if (error.response?.data?.message) {
                    console.error('Mensaje del backend:', error.response.data.message);
                }

                setToast({
                    message: error.response?.data?.message || 'No se pudo cargar el local asignado.',
                    state: 'danger'
                });
            }
        };

        fetchLocal();
    }, []);

    return (
        <div>
            <Nav />
            {toast && <Toast {...toast} />}
            <div className="local-vendedor-card">
                <h2>Mi Local Asignado</h2>

                {local ? (
                    <>
                        <p><strong>Nombre:</strong> {local.nombre}</p>
                        <p><strong>Dirección:</strong> {local.direccion}</p>
                        <p>
                            <strong>Compañeros vendedores:</strong>{' '}
                            {local.vendedores?.length > 0
                                ? local.vendedores.map(v => `${v.nombre} ${v.apellido}`).join(', ')
                                : 'Ninguno'}
                        </p>

                        <button
                            className="btn-crear"
                            onClick={() => navigate('/pedidos/crear')}
                        >
                            Crear Pedido
                        </button>
                    </>
                ) : (
                    <p className="texto-cargando">Cargando datos del local...</p>
                )}
            </div>
        </div>
    );
};

export default LocalVendedorPage;

