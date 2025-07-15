
import React, { useEffect, useState } from 'react';
import { getLocales, eliminarLocal } from '../../services/localesService';
import Nav from '../../components/Nav';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './LocalesAdminPage.scss';

const LocalesAdminPage = () => {
    const [locales, setLocales] = useState([]);
    const navigate = useNavigate();

    const fetchLocales = async () => {
        try {
        const data = await getLocales();
        setLocales(data);
        } catch (err) {
        console.error('Error al obtener locales:', err);
        }
    };

    useEffect(() => {
        fetchLocales();
    }, []);

    const handleEliminar = async (local) => {
        const confirm = await Swal.fire({
        title: '¿Estás seguro?',
        html: `
            <p>Estás por eliminar el local:</p>
            <strong>${local.nombre}</strong><br/>
            <small>${local.direccion}</small>
            <p style="margin-top: 10px; color: red;">¡Esta acción no se puede deshacer!</p>
        `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        });

        if (confirm.isConfirmed) {
        try {
            await eliminarLocal(local._id);
            Swal.fire('Eliminado', 'El local fue eliminado correctamente.', 'success');
            fetchLocales();
        } catch (error) {
            console.error('Error al eliminar local:', error);
            Swal.fire('Error', 'Hubo un problema al eliminar el local.', 'error');
        }
        }
    };

    return (
        <div>
        <Nav />
        <div className="locales-container">
            <div className="locales-header">
            <h1>Locales</h1>
            <button className="btn-crear" onClick={() => navigate('/locales/crear')}>
                Crear Local
            </button>
            </div>

            <div className="locales-grid">
            {locales.map((local) => (
                <div key={local._id} className="local-card">
                <h2>{local.nombre}</h2>
                <p><strong>Dirección:</strong> {local.direccion}</p>
                <p>
                    <strong>Vendedores:</strong>{' '}
                    {local.vendedores && local.vendedores.length > 0
                    ? local.vendedores.map((v) => `${v.nombre} ${v.apellido}`).join(', ')
                    : 'Ninguno'}
                </p>

                <div className="acciones-local">
                    <button
                    className="btn-editar"
                    onClick={() => navigate(`/locales/${local._id}/editar`)}
                    >
                    <i className="fas fa-pen"></i> Editar
                    </button>
                    <button className="btn-borrar" onClick={() => handleEliminar(local)}>
                    <i className="fas fa-trash"></i> Borrar
                    </button>
                </div>
                </div>
            ))}
            </div>
        </div>
        </div>
    );
};

export default LocalesAdminPage;

