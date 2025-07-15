
import api from './api';

const TOKEN_KEY = 'token';

export const loginUser = async (email, password) => {
    const res = await api.post('/usuarios/login', { email, password });
    console.log('RESPUESTA LOGIN:', res.data);

    const { token, user } = res.data;

    if (token) {
        localStorage.setItem(TOKEN_KEY, token);
    }

    // Aseguramos que devolvemos el objeto con nombre incluido
    return {
        token,
        user: {
            id: user._id,
            nombre: user.nombre,
            email: user.email,
            rol: user.rol
        }
    };
};

export const getUserProfile = async () => {
    const res = await api.get('/auth/profile');
    return res.data;
};

export const logoutUser = () => {
    localStorage.removeItem(TOKEN_KEY);
};
