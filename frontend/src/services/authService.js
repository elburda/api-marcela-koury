// src/services/authService.js
import api from './api';

const TOKEN_KEY = 'token';

export const loginUser = async (email, password) => {
    const res = await api.post('/users/login', { email, password });
    console.log('RESPUESTA LOGIN:', res.data);

    const { token } = res.data;
    if (token) {
    localStorage.setItem(TOKEN_KEY, token);
    }
    return res.data;
};


// Obtiene el perfil del usuario autenticado
export const getUserProfile = async () => {
    const res = await api.get('/auth/profile');
    return res.data;
};

// Cierra sesión: elimina el token
export const logoutUser = () => {
    localStorage.removeItem(TOKEN_KEY);
};
