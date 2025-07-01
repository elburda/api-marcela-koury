import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './modules/home/LoginPage';
import PedidosAdminPage from './modules/pedidos/PedidosAdminPage';
import PedidosVendedorPage from './modules/pedidos/PedidosVendedorPage';
import CrearPedidoPage from './modules/pedidos/CrearPedidoPage';
import PedidoDetallePage from './modules/pedidos/PedidoDetallePage';
import ArticulosAdminPage from './modules/articulos/ArticulosAdminPage';
import CrearArticuloPage from './modules/articulos/CrearArticuloPage';
import { useAuth } from './context/AuthContext';
import EditarArticuloPage from './modules/articulos/EditarArticuloPage';


function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route
        path="/pedidos/admin"
        element={
          user?.rol === 'admin' ? <PedidosAdminPage /> : <Navigate to="/" />
        }
      />
      <Route
        path="/pedidos"
        element={
          user?.rol === 'vendedor' ? <PedidosVendedorPage /> : <Navigate to="/" />
        }
      />
      <Route
        path="/pedidos/crear"
        element={
          user?.rol === 'vendedor' ? <CrearPedidoPage /> : <Navigate to="/" />
        }
      />
      <Route
        path="/pedidos/detalle"
        element={
          user?.rol === 'vendedor' || user?.rol === 'admin'
            ? <PedidoDetallePage />
            : <Navigate to="/" />
        }
      />
      <Route
        path="/articulos"
        element={
          user?.rol === 'admin' ? <ArticulosAdminPage /> : <Navigate to="/" />
        }
      />
      <Route
        path="/articulos/crear"
        element={
          user?.rol === 'admin' ? <CrearArticuloPage /> : <Navigate to="/" />
        }
      />
      <Route
        path="/articulos/editar/:id"
        element={
          user?.rol === 'admin' ? <EditarArticuloPage /> : <Navigate to="/" />
        }
      />
      <Route
        path="*"
        element={
          user?.rol === 'admin'
            ? <Navigate to="/pedidos/admin" />
            : user?.rol === 'vendedor'
            ? <Navigate to="/pedidos" />
            : <Navigate to="/" />
        }
      />
    </Routes>
  );
}

export default App;
