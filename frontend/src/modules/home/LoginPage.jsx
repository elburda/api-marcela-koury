
import React, { useState } from 'react';
import './LoginStyles.scss';
import LoginForm from './components/LoginForm';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Toast from '../../components/Toast';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [toast, setToast] = useState(null);

    const showToast = (message, state = 'danger') => {
        setToast({ message, state, position: 'top-right' });
        setTimeout(() => setToast(null), 4000);
    };

    const handleLogin = async (email, password) => {
        try {
            const res = await login(email, password);
            const { user } = res;

            const toastData = {
                message: '✅ Inicio de sesión exitoso',
                state: 'success',
                position: 'top-right',
            };

            if (user.rol === 'admin') {
                navigate('/pedidos/admin', { state: { toast: toastData } });
            } else if (user.rol === 'vendedor') {
                navigate('/pedidos', { state: { toast: toastData } });
            } else {
                showToast('Rol no permitido', 'danger');
            }
        } catch (error) {
            console.error('Error de login:', error);
            showToast('❌ Credenciales incorrectas o error de conexión');
        }
    };

    return (
        <div className="login-container">
            <div className="login-left">
                <div className="card">
                    <h1 className="title">Iniciar Sesión</h1>
                    {toast && <Toast {...toast} />}
                    <LoginForm onLogin={handleLogin} />
                </div>
            </div>
            <div className="login-right" />
        </div>
    );
};

export default LoginPage;
