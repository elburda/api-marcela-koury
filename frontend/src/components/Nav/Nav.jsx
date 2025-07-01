import React from 'react';
import './Nav.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Nav = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handlePedidosClick = (e) => {
        e.preventDefault();
        if (user?.rol === 'admin') {
            navigate('/pedidos/admin');
        } else if (user?.rol === 'vendedor') {
            navigate('/pedidos');
        } else {
            navigate('/');
        }
    };

    return (
        <nav className="nav-bar">
            <ul className="nav-links">
                <li>
                    <a
                        href="#"
                        className={({ isActive }) => isActive ? 'active' : ''}
                        onClick={handlePedidosClick}
                    >
                        Pedidos
                    </a>
                </li>
                <li>
                    <NavLink to="/articulos" className={({ isActive }) => isActive ? 'active' : ''}>
                        Artículos
                    </NavLink>
                </li>
                {user?.rol === 'admin' && (
                    <li>
                        <NavLink to="/articulos/crear" className={({ isActive }) => isActive ? 'active' : ''}>
                            Crear Artículo
                        </NavLink>
                    </li>
                )}
            </ul>

            <div className="user-actions">
                {user?.nombre && <span className="user-name">{user.nombre}</span>}
                <button onClick={handleLogout} className="logout-button">Cerrar sesión</button>
            </div>
        </nav>
    );
};

export default Nav;
