import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios.js'; // El puente mágico que creamos
import { FaLock, FaUserShield, FaArrowLeft } from 'react-icons/fa';

const PortalAcceso = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Limpiamos errores anteriores
    setCargando(true); // Activamos el estado de carga

    try {
      // 1. Tocamos la puerta del backend para pedir acceso
      const respuesta = await api.post('/auth/login', { email, password });
      
      // 2. Si el backend responde OK (Status 200), la cookie de seguridad 
      // se guarda automáticamente en el navegador gracias a axios.
      const usuarioLogueado = respuesta.data;
      console.log(`¡Acceso concedido! Hola ${usuarioLogueado.nombre}`);
      
      localStorage.setItem('perfilUsuario', JSON.stringify(usuarioLogueado));

      // 3. Redirigimos al usuario a su panel de administración (tu foto)
      if (usuarioLogueado.rol === 'admin') {
        navigate('/admin');
      } else {
        navigate('/'); // O redirigir a una vista de paciente 
      }

    } catch (err) {
      // Si el backend nos rebota (Status 401), mostramos el error exacto
      console.error("Error de login:", err);
      setError(
        err.response?.data?.error || 
        'No se pudo conectar con el servidor. Verifica que el backend esté encendido.'
      );
    } finally {
      setCargando(false); // Apagamos el estado de carga
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative">
      
      {/* Botón para volver a la página web pública */}
      <Link to="/" className="absolute top-6 left-6 text-text-light hover:text-accent-orange flex items-center gap-2 font-bold transition-colors">
        <FaArrowLeft /> Volver a la web
      </Link>

      <div className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-2xl border-t-8 border-accent-orange">
        
        {/* Encabezado del Login */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <FaUserShield className="text-4xl text-accent-orange" />
          </div>
          <h1 className="text-3xl font-black text-primary tracking-tight">C&M Dental</h1>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-text-light mt-1">
            Portal de Acceso
          </p>
        </div>

        {/* Mensaje de Error (Se muestra solo si hay falla) */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg text-sm font-bold mb-6 shadow-sm animate-pulse">
            {error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-text-light mb-2">
              Correo Electrónico
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-5 py-4 rounded-xl border border-secondary bg-background/50 focus:border-accent-orange focus:ring-1 focus:ring-accent-orange outline-none transition-colors font-medium text-text"
              placeholder="admin@carcara.com o tu email"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-text-light mb-2">
              Contraseña
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-5 py-4 rounded-xl border border-secondary bg-background/50 focus:border-accent-orange focus:ring-1 focus:ring-accent-orange outline-none transition-colors font-medium text-text"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={cargando}
            className="w-full bg-primary text-white font-black text-sm py-4 rounded-xl shadow-md hover:bg-primary-dark active:scale-95 transition-all uppercase tracking-wide flex items-center justify-center gap-2 disabled:opacity-70 mt-4"
          >
            {cargando ? (
              'Verificando...'
            ) : (
              <> <FaLock /> Ingresar al Sistema </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};

export default PortalAcceso;
