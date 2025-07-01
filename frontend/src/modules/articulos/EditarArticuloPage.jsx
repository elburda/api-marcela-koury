import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getArticuloById, actualizarArticulo } from '../../services/articulosService';
import Nav from '../../components/Nav';
import Button from '../../components/Button';
import Toast from '../../components/Toast';
import './CrearArticuloPage.scss';

const schema = yup.object().shape({
    title: yup.string().min(3).max(50).required('El título es obligatorio'),
    description: yup.string().min(10).required('La descripción es obligatoria'),
    price: yup.number().typeError('Debe ser un número').required('El precio es obligatorio'),
    tags: yup.string().optional(),
    color: yup.string().max(20),
    stock: yup.number().typeError('Debe ser un número').optional(),
    });

    const EditarArticuloPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const [toast, setToast] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (user?.rol !== 'admin') {
        navigate('/');
        return;
        }

        const fetchArticulo = async () => {
        try {
            const data = await getArticuloById(id);
            reset({
            title: data.title,
            description: data.description,
            price: data.price,
            tags: data.tags?.join(', ') || '',
            stock: data.stock || '',
            color: data.color || '',
            });
        } catch (err) {
            console.error('❌ Error al cargar artículo:', err);
            setToast({
            message: 'No se pudo cargar el artículo',
            state: 'danger',
            position: 'top-right',
            });
        }
        };

        fetchArticulo();
    }, [id, reset, navigate, user]);

    const onSubmit = async (data) => {
        try {
        const datosActualizados = {
            ...data,
            tags: data.tags?.split(',').map((t) => t.trim()) || [],
        };
        await actualizarArticulo(id, datosActualizados);
        setToast({
            message: '✅ Artículo actualizado correctamente',
            state: 'success',
            position: 'top-right',
        });
        setTimeout(() => navigate('/articulos'), 2000);
        } catch (err) {
        console.error('❌ Error al actualizar artículo:', err);
        setToast({
            message: 'Ocurrió un error al actualizar',
            state: 'danger',
            position: 'top-right',
        });
        }
    };

    return (
        <>
        <Nav />
        {toast && <Toast {...toast} />}
        <div className="crear-articulo-container">
            <h1 className="titulo">Editar Artículo</h1>
            <form className="formulario" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid-doble">
                <div className="campo">
                <label>Título *</label>
                <input type="text" {...register('title')} />
                {errors.title && <p className="error">{errors.title.message}</p>}
                </div>

                <div className="campo">
                <label>Descripción *</label>
                <textarea {...register('description')} rows={3} />
                {errors.description && <p className="error">{errors.description.message}</p>}
                </div>

                <div className="campo">
                <label>Precio *</label>
                <input type="number" step="0.01" {...register('price')} />
                {errors.price && <p className="error">{errors.price.message}</p>}
                </div>

                <div className="campo">
                <label>Stock</label>
                <input type="number" {...register('stock')} />
                </div>

                <div className="campo">
                <label>Color</label>
                <input type="text" {...register('color')} />
                {errors.color && <p className="error">{errors.color.message}</p>}
                </div>

                <div className="campo">
                <label>Tags (separados por coma)</label>
                <input type="text" {...register('tags')} />
                </div>
            </div>

            <Button className="primary boton" type="submit">
                Actualizar Artículo
            </Button>
            </form>
        </div>
        </>
    );
};

export default EditarArticuloPage;
