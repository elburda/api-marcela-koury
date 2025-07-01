import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser as apiLoginUser } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined); // undefined para control de carga
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    } else {
      setUser(null);
    }
  }, []);

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
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
