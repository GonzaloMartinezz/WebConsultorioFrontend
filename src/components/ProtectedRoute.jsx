import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const token = localStorage.getItem('token');
  const perfilString = localStorage.getItem('perfilUsuario');
  
  if (!token || !perfilString) {
    return <Navigate to="/login" replace />;
  }

  const usuario = JSON.parse(perfilString);

  // Le agregamos toLowerCase() y un "?" por si acaso para máxima tolerancia
  if (requireAdmin && usuario?.rol?.toLowerCase() !== 'admin') {
    return <Navigate to="/mi-perfil" replace />;
  }

  return children;
};

export default ProtectedRoute;
