import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser as apiLoginUser } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [token, setToken] = useState(() => localStorage.getItem('token') || '');

    const login = async (email, password) => {
        const res = await apiLoginUser(email, password);
        setUser(res.user);
        setToken(res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('token', res.token);
        return res;
    };

    const logout = () => {
        setUser(null);
        setToken('');
        localStorage.clear();
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
