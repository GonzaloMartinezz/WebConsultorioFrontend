import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import api from '../../api/axios.js';
// Importamos iconos profesionales para todas las nuevas secciones
import {
  FaHome, FaBell, FaCalendarAlt, FaUserInjured, FaFileMedical,
  FaTeeth, FaChartLine, FaSmileBeam, FaCogs, FaSignOutAlt,
  FaChevronLeft, FaChevronRight
} from 'react-icons/fa';

const LayoutAdmin = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [mostrarModalLogout, setMostrarModalLogout] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const confirmarLogout = async () => {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('perfilUsuario');
      navigate('/');
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  // El menú gigante expandido basado en tus fotos
  const menuItems = [
    { name: "Panel Principal", path: "/admin", icon: FaHome },
    { name: "Turnos Pendientes", path: "/admin/pendientes", icon: FaBell },
    { name: "Agenda (Calendario)", path: "/admin/agenda", icon: FaCalendarAlt },
    { name: "Directorio Pacientes", path: "/admin/pacientes", icon: FaUserInjured },
    { name: "Historia Clínica", path: "/admin/historia-clinica", icon: FaFileMedical },
    { name: "Odontograma Real", path: "/admin/odontograma", icon: FaTeeth },
    { name: "Ingresos vs Gastos", path: "/admin/finanzas", icon: FaChartLine },
    { name: "Resultados (Encuestas)", path: "/admin/encuestas", icon: FaSmileBeam },
    { name: "Automatizaciones", path: "/admin/configuracion", icon: FaCogs },
  ];

  return (
    <div className="flex min-h-screen bg-background overflow-hidden relative">

      {/* SIDEBAR */}
      <aside
        className={`bg-primary text-background flex flex-col transition-all duration-300 relative z-30 shadow-2xl border-r-4 border-accent-orange/50 
          ${isExpanded ? 'w-1/4 min-w-[280px]' : 'w-[88px]'}`}
      >
        {/* LOGO */}
        <div className="h-24 flex items-center justify-center border-b border-secondary/10 p-4 shrink-0 transition-all">
          {isExpanded ? (
            <div className="text-center animate-fade-in">
              <span className="text-2xl font-black text-white leading-none">C&M</span>
              <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-accent-orange mt-1">Dental Admin</span>
            </div>
          ) : (
            <span className="text-2xl font-black text-white hover:text-accent-orange transition-colors cursor-pointer">C&M</span>
          )}
        </div>

        {/* TOGGLE BUTTON */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute top-24 -right-4 bg-accent-orange text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform focus:outline-none ring-4 ring-background"
        >
          {isExpanded ? <FaChevronLeft className="text-sm" /> : <FaChevronRight className="text-sm" />}
        </button>

        {/* LISTA DE ÍTEMS DEL MENÚ (Scrollable si son muchos) */}
        <nav className="grow p-4 mt-4 flex flex-col gap-2 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`group flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold transition-all duration-300 relative overflow-hidden
                  ${isActive
                    ? 'bg-accent-orange text-text shadow-md'
                    : 'text-secondary hover:bg-white/10 hover:text-white'
                  } 
                  ${!isExpanded && 'justify-center'}
                `}
              >
                {/* Animación de fondo al hacer hover */}
                {!isActive && <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity"></div>}

                <Icon className={`text-xl shrink-0 transition-all duration-300 ${isActive ? 'text-text scale-110' : 'text-accent-orange group-hover:scale-110'}`} />

                {isExpanded && (
                  <span className="tracking-wide text-[13px] whitespace-nowrap">{item.name}</span>
                )}

                {/* Ícono de Alerta para Turnos Pendientes (Badge rojo) */}
                {isExpanded && item.name === "Turnos Pendientes" && (
                  <span className="ml-auto bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow-sm animate-pulse-slow">3</span>
                )}
                {!isExpanded && item.name === "Turnos Pendientes" && (
                  <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-primary animate-pulse-slow"></span>
                )}

                {/* Tooltip colapsado */}
                {!isExpanded && (
                  <div className="absolute left-20 bg-text text-white font-bold text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none shadow-xl transition-all duration-200 z-50 transform translate-x-1 group-hover:translate-x-0">
                    {item.name}
                    {/* Triangulito del tooltip */}
                    <div className="absolute top-1/2 -left-1 w-2 h-2 bg-text transform -translate-y-1/2 rotate-45"></div>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* CERRAR SESIÓN */}
        <div className="p-4 border-t border-secondary/10 shrink-0">
          <button onClick={() => setMostrarModalLogout(true)} className={`w-full flex items-center gap-4 px-4 py-3 text-secondary-dark hover:text-red-400 font-bold transition-all hover:bg-white/5 rounded-xl ${!isExpanded && 'justify-center'}`}>
            <FaSignOutAlt className="text-xl shrink-0" />
            {isExpanded && <span className="text-[13px]">Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      {/* ÁREA DE CONTENIDO */}
      <main className="flex-1 overflow-y-auto z-10 bg-background/50">
        <div className="py-10 px-6 sm:px-8 md:px-12 xl:px-16 max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>

      {/* ========================================= */}
      {/* MODAL DE CONFIRMACIÓN DE CERRAR SESIÓN    */}
      {/* ========================================= */}
      {mostrarModalLogout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 shadow-2xl animate-scale-up text-center border-t-8 border-accent-orange">
            
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <FaSignOutAlt className="text-4xl text-red-500 ml-2" />
            </div>
            
            <h3 className="text-2xl font-black text-primary mb-2">¿Cerrar Sesión?</h3>
            <p className="text-text-light text-sm font-medium mb-8 px-2">
              Tendrás que volver a ingresar tus credenciales para acceder al panel de C&M Dental.
            </p>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={confirmarLogout}
                className="w-full bg-red-500 text-white font-bold py-3.5 rounded-xl hover:bg-red-600 active:scale-95 transition-all shadow-md"
              >
                Sí, cerrar sesión
              </button>
              
              <button 
                onClick={() => setMostrarModalLogout(false)}
                className="w-full bg-background text-text font-bold py-3.5 rounded-xl hover:bg-secondary/20 active:scale-95 transition-all"
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
