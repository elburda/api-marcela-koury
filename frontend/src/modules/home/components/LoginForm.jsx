import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputField from './InputField';
import Button from '../../../components/Button';

const schema = yup.object().shape({
    email: yup.string().email('Debe ser un email válido').required('El email es obligatorio'),
    password: yup.string().required('La contraseña es obligatoria'),
});

const LoginForm = ({ onLogin }) => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(schema),
    });

    // Recuperar email desde localStorage al cargar
    useEffect(() => {
        const savedEmail = localStorage.getItem('rememberedEmail');
        if (savedEmail) {
        setValue('email', savedEmail);
        }
    }, [setValue]);

    // Guardar email al escribir
    const emailValue = watch('email');
    useEffect(() => {
        if (emailValue) {
        localStorage.setItem('rememberedEmail', emailValue);
        }
    }, [emailValue]);

    const onSubmit = async (data) => {
        await onLogin(data.email, data.password);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <InputField
            label="Email"
            type="email"
            name="email"
            register={register}
            error={errors.email}
        />
        <InputField
            label="Contraseña"
            type="password"
            name="password"
            register={register}
            error={errors.password}
        />
        <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Iniciando...' : 'Iniciar sesión'}
        </Button>
        </form>
    );
};

export default LoginForm;
