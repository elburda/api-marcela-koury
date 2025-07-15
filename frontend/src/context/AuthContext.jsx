
import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser as apiLoginUser } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    } else {
      setUser(null);
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await apiLoginUser(email, password);

    const plainUser = {
      id: res.user._id,
      nombre: res.user.nombre,
      apellido: res.user.apellido,
      email: res.user.email,
      rol: res.user.rol
    };

    setUser(plainUser);
    setToken(res.token);

    localStorage.setItem('user', JSON.stringify(plainUser));
    localStorage.setItem('token', res.token);

    return res;
  };

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
