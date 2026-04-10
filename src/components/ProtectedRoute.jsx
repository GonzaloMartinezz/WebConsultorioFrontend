import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const token = localStorage.getItem('token');
  const perfilString = localStorage.getItem('perfilUsuario');
  
  // 1. Si no hay sesión iniciada, patada al login
  if (!token || !perfilString) {
    return <Navigate to="/login" replace />;
  }

  const usuario = JSON.parse(perfilString);

  // 2. Si la ruta es solo para Administradores, y el usuario es un paciente
  if (requireAdmin && usuario.rol !== 'admin') {
    return <Navigate to="/mi-perfil" replace />;
  }

  // 3. Si todo está bien, lo dejamos pasar al componente que pidió
  return children;
};

export default ProtectedRoute;
