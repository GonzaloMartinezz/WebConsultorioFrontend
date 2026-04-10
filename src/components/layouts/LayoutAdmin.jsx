import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import api from '../../api/axios.js';
import {
  FaHome, FaBell, FaCalendarAlt, FaUserInjured, FaFileMedical,
  FaTeeth, FaChartLine, FaSmileBeam, FaCogs, FaSignOutAlt,
  FaChevronLeft, FaChevronRight, FaBars, FaTimes
} from 'react-icons/fa';

const LayoutAdmin = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mostrarModalLogout, setMostrarModalLogout] = useState(false);
  const [turnosPendientesCount, setTurnosPendientesCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // Alerta de turnos pendientes
  useEffect(() => {
    const fetchTurnosAlert = async () => {
      try {
        const respuesta = await api.get('/turnos');
        const count = respuesta.data.filter(t => t.estado === 'Pendiente').length;
        setTurnosPendientesCount(count);
      } catch (error) {
        // Silencio en Layout
      }
    };
    
    fetchTurnosAlert();
    const interval = setInterval(fetchTurnosAlert, 10000);
    return () => clearInterval(interval);
  }, []);

  // ====== LÓGICA DE CIERRE DE SESIÓN INFALIBLE ======
  const confirmarLogout = async () => {
    try {
      // Opcional: avisar al backend
      await api.post('/auth/logout').catch(() => {}); 
    } finally {
      // LO IMPORTANTE: Destruir la sesión en el navegador sí o sí
      localStorage.removeItem('token');
      localStorage.removeItem('perfilUsuario');
      setMostrarModalLogout(false);
      navigate('/login');
      window.location.reload(); // Limpia la memoria caché de React
    }
  };

  // ====== MENÚ ACTUALIZADO (Sin Odontograma suelto) ======
  const menuItems = [
    { name: "Panel Principal", path: "/admin", icon: FaHome },
    { name: "Turnos Pendientes", path: "/admin/pendientes", icon: FaBell },
    { name: "Agenda (Calendario)", path: "/admin/agenda", icon: FaCalendarAlt },
    { name: "Directorio Pacientes", path: "/admin/pacientes", icon: FaUserInjured },
    { name: "Historia Clínica", path: "/admin/historia-clinica", icon: FaFileMedical },
    { name: "Odontograma", path: "/admin/odontograma-avanzado", icon: FaTeeth },
    { name: "Estadísticas", path: "/admin/estadisticas", icon: FaChartLine },
    { name: "Resultados (Encuestas)", path: "/admin/encuestas", icon: FaSmileBeam },
    { name: "Configuración", path: "/admin/configuracion", icon: FaCogs },
  ];

  return (
    <div className="flex min-h-screen bg-background overflow-hidden relative">

      {/* MOBILE HEADER */}
      <div className="md:hidden flex items-center justify-between bg-primary p-4 text-white z-20 absolute top-0 w-full shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-xl font-black leading-none">C&M</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-accent-orange">Admin</span>
        </div>
        <button className="text-white hover:text-accent-orange transition-colors" onClick={() => setIsMobileOpen(true)}>
          <FaBars className="text-2xl" />
        </button>
      </div>

      {/* MOBILE OVERLAY */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden animate-fade-in"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`bg-primary text-background flex flex-col transition-all duration-300 shadow-2xl md:border-r-4 border-accent-orange/50 
          fixed md:relative inset-y-0 left-0 z-40 md:z-30 transform h-screen md:h-auto
          ${isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'} 
          ${isExpanded ? 'md:w-1/4 md:min-w-[280px]' : 'md:w-[88px]'}
        `}
      >
        {/* ====== LOGO CORREGIDO ====== */}
        <div className="h-20 md:h-24 flex items-center justify-center border-b border-secondary/10 p-4 shrink-0 transition-all relative">
          
          {/* Logo Completo (Solo visible si está expandido o en móvil) */}
          {(isExpanded || isMobileOpen) && (
            <div className="text-center animate-fade-in">
              <span className="text-2xl font-black text-white leading-none tracking-wider">C<span className="text-accent-orange">&</span>M</span>
              <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-accent-orange mt-1">Dental Admin</span>
            </div>
          )}

          {/* Mini Logo (Solo visible en PC cuando está colapsado) */}
          {(!isExpanded && !isMobileOpen) && (
            <div className="hidden md:block text-center animate-fade-in">
              <span className="text-2xl font-black text-white hover:text-accent-orange cursor-pointer tracking-wider">C<span className="text-accent-orange">&</span>M</span>
            </div>
          )}

          {/* Boton cerrar mobile */}
          <button className="md:hidden absolute right-4 text-white/70 hover:text-white" onClick={() => setIsMobileOpen(false)}>
            <FaTimes className="text-2xl" />
          </button>
        </div>

        {/* TOGGLE BUTTON DESKTOP */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="hidden md:flex absolute top-24 -right-4 bg-accent-orange text-white w-8 h-8 rounded-full items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform focus:outline-none ring-4 ring-background"
        >
          {isExpanded ? <FaChevronLeft className="text-sm" /> : <FaChevronRight className="text-sm" />}
        </button>

        {/* LISTA DE ÍTEMS DEL MENÚ */}
        <nav className="grow p-3 md:p-4 mt-2 md:mt-4 flex flex-col gap-1 md:gap-2 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`group flex items-center gap-4 px-4 py-3 md:py-3.5 rounded-xl font-bold transition-all duration-300 relative overflow-hidden
                  ${isActive
                    ? 'bg-accent-orange text-text shadow-md'
                    : 'text-secondary hover:bg-white/10 hover:text-white'
                  } 
                  ${(!isExpanded && !isMobileOpen) && 'md:justify-center'}
                `}
              >
                {!isActive && <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity"></div>}

                <Icon className={`text-xl shrink-0 transition-all duration-300 ${isActive ? 'text-text scale-110' : 'text-accent-orange group-hover:scale-110'}`} />

                <span className={`tracking-wide text-[13px] whitespace-nowrap transition-all duration-300 ${(isExpanded || isMobileOpen) ? 'opacity-100 w-auto' : 'hidden'}`}>{item.name}</span>

                {/* Badges de Turnos Pendientes */}
                {(isExpanded || isMobileOpen) && item.name === "Turnos Pendientes" && turnosPendientesCount > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow-sm animate-pulse-slow">{turnosPendientesCount}</span>
                )}
                {(!isExpanded && !isMobileOpen) && item.name === "Turnos Pendientes" && turnosPendientesCount > 0 && (
                  <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-primary animate-pulse-slow"></span>
                )}

                {/* Tooltip colapsado (solo desktop) */}
                {(!isExpanded && !isMobileOpen) && (
                  <div className="hidden md:block absolute left-20 bg-text text-white font-bold text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none shadow-xl transition-all duration-200 z-50 transform translate-x-1 group-hover:translate-x-0">
                    {item.name}
                    <div className="absolute top-1/2 -left-1 w-2 h-2 bg-text transform -translate-y-1/2 rotate-45"></div>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* CERRAR SESIÓN */}
        <div className="p-4 border-t border-secondary/10 shrink-0">
          <button onClick={() => setMostrarModalLogout(true)} className={`w-full flex items-center gap-4 px-4 py-3 text-secondary-dark hover:text-red-400 font-bold transition-all hover:bg-white/5 rounded-xl ${(!isExpanded && !isMobileOpen) && 'md:justify-center'}`}>
            <FaSignOutAlt className="text-xl shrink-0" />
            <span className={`text-[13px] transition-all duration-300 ${(isExpanded || isMobileOpen) ? 'opacity-100' : 'hidden md:hidden'}`}>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* ÁREA DE CONTENIDO */}
      <main className="flex-1 h-screen overflow-y-auto bg-background/50 pt-[72px] md:pt-0 relative z-10 w-full">
        <div className="py-6 md:py-10 px-4 sm:px-8 md:px-12 xl:px-16 max-w-[1600px] mx-auto w-full overflow-x-hidden">
          {children}
        </div>
      </main>

      {/* MODAL DE CONFIRMACIÓN DE CERRAR SESIÓN */}
      {mostrarModalLogout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl animate-scale-up text-center border-t-8 border-accent-orange">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-inner">
              <FaSignOutAlt className="text-3xl md:text-4xl text-red-500 ml-1 md:ml-2" />
            </div>
            
            <h3 className="text-xl md:text-2xl font-black text-primary mb-2">¿Cerrar Sesión?</h3>
            <p className="text-text-light text-xs md:text-sm font-medium mb-6 md:mb-8 px-2">
              Tendrás que volver a ingresar tus credenciales para acceder al panel de C&M Dental.
            </p>
            
            <div className="flex flex-col gap-2 md:gap-3">
              <button 
                onClick={confirmarLogout}
                className="w-full bg-red-500 text-white font-bold py-3 md:py-3.5 text-sm md:text-base rounded-xl hover:bg-red-600 active:scale-95 transition-all shadow-md"
              >
                Sí, cerrar sesión
              </button>
              
              <button 
                onClick={() => setMostrarModalLogout(false)}
                className="w-full bg-background text-text font-bold py-3 md:py-3.5 text-sm md:text-base rounded-xl hover:bg-secondary/20 active:scale-95 transition-all"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default LayoutAdmin;
