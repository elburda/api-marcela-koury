
import React, { useState, useEffect } from 'react';
import './CrearLocalPage.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerLocalPorId, actualizarLocal, obtenerVendedores } from '../../services/localesService';
import Toast from '../../components/Toast';
import Nav from '../../components/Nav';
import { useValidation } from '../../hooks/useValidation';

const EditarLocalPage = () => {
  const { id } = useParams();
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [vendedores, setVendedores] = useState([]);
  const [vendedorSeleccionado, setVendedorSeleccionado] = useState('');
  const [vendedorOriginal, setVendedorOriginal] = useState('');
  const [toast, setToast] = useState(null);
  const { errors, validate, setErrors } = useValidation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [local, todosLosVendedores] = await Promise.all([
          obtenerLocalPorId(id),
          obtenerVendedores()
        ]);

        const conAsignacion = todosLosVendedores.map(v => ({
          ...v,
          yaAsignado: v.localAsignado !== null && v.localAsignado !== id
        }));

        setNombre(local.nombre);
        setDireccion(local.direccion);
        setVendedores(conAsignacion);

        const asignado = local.vendedores[0]?._id || '';
        setVendedorSeleccionado(asignado);   // Inicial
        setVendedorOriginal(asignado);       // Para restaurar si se desmarca
      } catch (error) {
        console.error('Error al cargar datos del local:', error);
        setToast({ message: 'Error al cargar datos', state: 'danger' });
      }
    };
    fetchData();
  }, [id]);

  const handleCheckboxChange = (id) => {
    if (vendedorSeleccionado === id) {
      setVendedorSeleccionado('');  // Se desmarca
    } else {
      setVendedorSeleccionado(id);  // Se selecciona
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const esValido = validate(
      { nombre, direccion },
      { nombre: 'required', direccion: 'required' }
    );
    if (!esValido) return;

    try {
      //  Usa el vendedor original si no se seleccionó uno nuevo ni se quitó
      const vendedorFinal = vendedorSeleccionado || vendedorOriginal;

      const data = {
        nombre,
        direccion,
        vendedores: vendedorFinal ? [vendedorFinal] : []
      };

      await actualizarLocal(id, data);

      setToast({ message: 'Local actualizado correctamente', state: 'success' });
      setTimeout(() => {
        setToast(null);
        navigate('/locales');
      }, 1500);
    } catch (error) {
      console.error('Error al actualizar local:', error);
      setToast({
        message:
          error?.response?.data?.message ||
          'Error al actualizar local',
        state: 'danger'
      });
    }
  };

  return (
    <div>
      <Nav />
      {toast && <Toast {...toast} />}
      <div className="crear-local-card">
        <h2>Editar Local</h2>
        <form onSubmit={handleSubmit} className="formulario-local">
          <div className="form-group">
            <label>Nombre del local:</label>
            <input
              type="text"
              className={errors.nombre ? 'input-error' : ''}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            {errors.nombre && <p className="error-text">{errors.nombre}</p>}
          </div>
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

          <div className="form-group">
            <label>Vendedor asignado:</label>
            <div className="checkbox-list">
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
          </div>

          <button type="submit" className="btn-success">
            Guardar cambios
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditarLocalPage;

