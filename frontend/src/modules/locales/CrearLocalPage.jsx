
import React, { useState, useEffect } from 'react';
import './CrearLocalPage.scss';
import { crearLocal, obtenerVendedores } from '../../services/localesService';
import { useNavigate } from 'react-router-dom';
import Toast from '../../components/Toast';
import Nav from '../../components/Nav';
import { useValidation } from '../../hooks/useValidation';

const CrearLocalPage = () => {
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [vendedores, setVendedores] = useState([]);
    const [vendedorSeleccionado, setVendedorSeleccionado] = useState('');
    const [toast, setToast] = useState(null);
    const { errors, validate, setErrors } = useValidation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVendedores = async () => {
            try {
                const data = await obtenerVendedores();
                const conAsignacion = data.map(v => ({
                    ...v,
                    yaAsignado: v.localAsignado !== null
                }));
                setVendedores(conAsignacion);
            } catch (error) {
                console.error('Error al obtener vendedores:', error);
            }
        };
        fetchVendedores();
    }, []);

    useEffect(() => {
        if (nombre && errors.nombre) setErrors(prev => ({ ...prev, nombre: undefined }));
    }, [nombre]);

    useEffect(() => {
        if (direccion && errors.direccion) setErrors(prev => ({ ...prev, direccion: undefined }));
    }, [direccion]);

    useEffect(() => {
        if (vendedorSeleccionado && errors.vendedor) setErrors(prev => ({ ...prev, vendedor: undefined }));
    }, [vendedorSeleccionado]);

    const handleCheckboxChange = (id) => {
        if (vendedorSeleccionado === id) {
            setVendedorSeleccionado('');
        } else if (vendedorSeleccionado === '') {
            setVendedorSeleccionado(id);
        } else {
            setToast({ message: 'Solo se puede asignar un vendedor', state: 'danger' });
            setTimeout(() => setToast(null), 3000);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const esValido = validate(
            { nombre, direccion, vendedor: vendedorSeleccionado },
            { nombre: 'required', direccion: 'required', vendedor: 'required' }
        );
        if (!esValido) return;

        try {
            await crearLocal({
                nombre,
                direccion,
                vendedores: [vendedorSeleccionado]
            });

            setToast({ message: 'Local creado correctamente', state: 'success' });
            setTimeout(() => {
                setToast(null);
                navigate('/locales');
            }, 2000);
        } catch (error) {
            console.error('Error al crear local:', error);
            setToast({ message: 'Error al crear local', state: 'danger' });
        }
    };

    return (
        <div>
            <Nav />
            {toast && <Toast {...toast} />}
            <div className="crear-local-card">
                <h2>Crear Nuevo Local</h2>
                <form onSubmit={handleSubmit} className="formulario-local">

                    {/* Nombre */}
                    <div className="form-group">
                        <label>Nombre del Local:</label>
                        <input
                            type="text"
                            className={errors.nombre ? 'input-error' : ''}
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                        {errors.nombre && <p className="error-text">{errors.nombre}</p>}
                    </div>

                    {/* Dirección */}
                    <div className="form-group">
                        <label>Dirección:</label>
                        <input
                            type="text"
                            className={errors.direccion ? 'input-error' : ''}
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                        />
                        {errors.direccion && <p className="error-text">{errors.direccion}</p>}
                    </div>

                    {/* Vendedor */}
                    <div className="form-group">
                        <label>Asignar Vendedor (máx 1):</label>
                        <div className={`checkbox-list ${errors.vendedor ? 'input-error' : ''}`}>
                            {vendedores.map((v) => (
                                <label
                                    key={v._id}
                                    className={`checkbox-item ${v.yaAsignado ? 'deshabilitado' : ''}`}
                                >
                                    <input
                                        type="checkbox"
                                        value={v._id}
                                        checked={vendedorSeleccionado === v._id}
                                        disabled={v.yaAsignado}
                                        onChange={() => handleCheckboxChange(v._id)}
                                    />
                                    {v.nombre} {v.apellido}
                                    {v.yaAsignado && <span className="info-text"> (ya asignado)</span>}
                                </label>
                            ))}
                        </div>
                        {errors.vendedor && <p className="error-text">{errors.vendedor}</p>}
                    </div>

                    <button type="submit" className="btn-success">
                        Crear Local
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CrearLocalPage;
