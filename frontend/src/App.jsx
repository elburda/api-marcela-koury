
import { useAuth } from './context/AuthContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './modules/home/LoginPage';
import PedidosAdminPage from './modules/pedidos/PedidosAdminPage';
import PedidosVendedorPage from './modules/pedidos/PedidosVendedorPage';
import CrearPedidoPage from './modules/pedidos/CrearPedidoPage';
import PedidoDetallePage from './modules/pedidos/PedidoDetallePage';
import ArticulosAdminPage from './modules/articulos/ArticulosAdminPage';
import CrearArticuloPage from './modules/articulos/CrearArticuloPage';
import EditarArticuloPage from './modules/articulos/EditarArticuloPage';
import LocalesAdminPage from './modules/locales/LocalesAdminPage';
import CrearLocalPage from './modules/locales/CrearLocalPage';
import EditarLocalPage from './modules/locales/EditarLocalPage';
import LocalVendedorPage from './modules/locales/LocalVendedorPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { user, loading } = useAuth();

  if (loading) return <div>Cargando Sesión...</div>;

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route
        path="/pedidos/admin"
        element={
          <ProtectedRoute roles={['admin']}>
            <PedidosAdminPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pedidos"
        element={
          <ProtectedRoute roles={['vendedor']}>
            <PedidosVendedorPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pedidos/crear"
        element={
          <ProtectedRoute roles={['vendedor']}>
            <CrearPedidoPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pedidos/:id"
        element={user ? <PedidoDetallePage /> : <Navigate to="/" />}
      />

      <Route
        path="/articulos"
        element={
          <ProtectedRoute roles={['admin']}>
            <ArticulosAdminPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/articulos/crear"
        element={
          <ProtectedRoute roles={['admin']}>
            <CrearArticuloPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/articulos/:id/editar"
        element={
          <ProtectedRoute roles={['admin']}>
            <EditarArticuloPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/locales"
        element={
          <ProtectedRoute roles={['admin']}>
            <LocalesAdminPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/locales/crear"
        element={
          <ProtectedRoute roles={['admin']}>
            <CrearLocalPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/locales/:id/editar"
        element={
          <ProtectedRoute roles={['admin']}>
            <EditarLocalPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/locales/mi-local"
        element={
          <ProtectedRoute roles={['vendedor']}>
            <LocalVendedorPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;

