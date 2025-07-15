
import './Nav.scss';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Nav = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handlePedidosClick = () => {
        if (user?.rol === 'admin') {
            navigate('/pedidos/admin');
        } else if (user?.rol === 'vendedor') {
            navigate('/pedidos');
        } else {
            navigate('/');
        }
    };

    const isActivePedidos =
        (user?.rol === 'admin' && location.pathname === '/pedidos/admin') ||
        (user?.rol === 'vendedor' && location.pathname === '/pedidos');

    return (
        <nav className="nav-bar">
            <div className="nav-logo">
                <img src="/Logo.png" alt="Logo" />
            </div>

            <ul className="nav-links">
                <li>
                    <button
                        className={isActivePedidos ? 'active nav-button' : 'nav-button'}
                        onClick={handlePedidosClick}
                    >
                        Pedidos
                    </button>
                </li>

                {user?.rol === 'admin' && (
                    <>
                        <li>
                            <NavLink
                                to="/articulos"
                                className={({ isActive }) => (isActive ? 'active' : '')}
                            >
                                Artículos
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/locales"
                                className={({ isActive }) => (isActive ? 'active' : '')}
                            >
                                Local
                            </NavLink>
                        </li>
                    </>
                )}

                {user?.rol === 'vendedor' && (
                    <li>
                        <NavLink
                            to="/locales/mi-local"
                            className={({ isActive }) => (isActive ? 'active' : '')}
                        >
                            Local
                        </NavLink>
                    </li>
                )}
            </ul>

            <div className="user-actions">
                {user?.nombre && <span className="user-name">{user.nombre}</span>}
                <button onClick={handleLogout} className="logout-button-icon" title="Cerrar sesión">
                    <FontAwesomeIcon icon={faRightFromBracket} />
                </button>
            </div>
        </nav>
    );
};

export default Nav;
