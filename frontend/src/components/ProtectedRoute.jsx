import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roles }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Cargando...</div>;

    if (!user) {
        return <Navigate to="/" />;
    }

    if (roles && !roles.includes(user.rol)) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;

