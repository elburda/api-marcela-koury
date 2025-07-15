
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { crearArticulo } from '../../services/articulosService';
import Nav from '../../components/Nav';
import Button from '../../components/Button';
import Toast from '../../components/Toast';
import './CrearArticuloPage.scss';

const schema = yup.object().shape({
    title: yup.string().min(3, 'Mínimo 3 caracteres').max(50).required('El título es obligatorio'),
    description: yup.string().min(10, 'Mínimo 10 caracteres').required('La descripción es obligatoria'),
    price: yup.number().typeError('Debe ser un número').required('El precio es obligatorio'),
    stock: yup.number().typeError('Debe ser un número').optional(),
    color: yup.string().max(20, 'Máximo 20 caracteres').optional(),
    tags: yup.string().optional()
    });

    const CrearArticuloPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [toast, setToast] = useState(null);
    const [allowed, setAllowed] = useState(null);

    useEffect(() => {
        if (user?.rol === 'admin') {
        setAllowed(true);
        } else {
        navigate('/');
        }
    }, [user]);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        try {
        const formattedData = {
            ...data,
            tags: data.tags?.split(',').map(tag => tag.trim()) || []
        };

        await crearArticulo(formattedData);

        setToast({
            message: '✅ Artículo creado correctamente',
            state: 'success',
            position: 'top-right'
        });

        setTimeout(() => {
            navigate('/articulos', {
            state: { refetch: true }
            });
        }, 2000);
        } catch (err) {
        console.error('❌ Error al crear artículo:', err);
        setToast({
            message: 'Ocurrió un error al crear el artículo',
            state: 'danger',
            position: 'top-right'
        });
        }
    };

    if (!allowed) return null;

    return (
        <>
        <Nav />
        {toast && <Toast {...toast} />}
        <div className="crear-articulo-container">
            <h1 className="titulo">Crear Artículo</h1>

            <form className="formulario" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid-doble">

                {/* Título */}
                <div className="campo">
                <label>Título *</label>
                <input
                    type="text"
                    {...register('title')}
                    className={errors.title ? 'input-error' : ''}
                />
                {errors.title && <p className="error">{errors.title.message}</p>}
                </div>

                {/* Descripción */}
                <div className="campo">
                <label>Descripción *</label>
                <textarea
                    rows={3}
                    {...register('description')}
                    className={errors.description ? 'input-error' : ''}
                />
                {errors.description && <p className="error">{errors.description.message}</p>}
                </div>

                {/* Precio */}
                <div className="campo">
                <label>Precio *</label>
                <input
                    type="number"
                    step="0.01"
                    {...register('price')}
                    className={errors.price ? 'input-error' : ''}
                />
                {errors.price && <p className="error">{errors.price.message}</p>}
                </div>

                {/* Stock */}
                <div className="campo">
                <label>Stock</label>
                <input
                    type="number"
                    {...register('stock')}
                    className={errors.stock ? 'input-error' : ''}
                />
                {errors.stock && <p className="error">{errors.stock.message}</p>}
                </div>

                {/* Color */}
                <div className="campo">
                <label>Color</label>
                <input
                    type="text"
                    {...register('color')}
                    className={errors.color ? 'input-error' : ''}
                />
                {errors.color && <p className="error">{errors.color.message}</p>}
                </div>

                {/* Tags */}
                <div className="campo">
                <label>Tags (separados por coma)</label>
                <input
                    type="text"
                    {...register('tags')}
                    placeholder="ej: ropa,verano,promo"
                />
                </div>
            </div>

            <Button className="primary boton" type="submit">
                Crear Artículo
            </Button>
            </form>
        </div>
        </>
    );
};

export default CrearArticuloPage;
