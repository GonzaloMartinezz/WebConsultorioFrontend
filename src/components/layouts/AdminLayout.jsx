import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import api from '../../api/axios.js';
import {
  FaHome, FaBell, FaCalendarAlt, FaUserInjured, FaFileMedical,
  FaTeeth, FaChartLine, FaSmileBeam, FaCogs, FaSignOutAlt,
  FaChevronLeft, FaChevronRight, FaFileInvoiceDollar, FaChartPie,
  FaBars, FaTimes
} from 'react-icons/fa';

const LayoutAdmin = ({ children }) => {
  // Estado para PC: Colapsar/Expandir
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(true);
  // Estado para Móvil: Menú abierto/cerrado
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Estado para el Modal de Logout
  const [mostrarModalLogout, setMostrarModalLogout] = useState(false);
  // Estado para las iniciales
  const [iniciales, setIniciales] = useState('AD');

  const location = useLocation();
  const navigate = useNavigate();

  // Cerramos el menú móvil automáticamente si cambiamos de ruta
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Buscamos las iniciales del usuario logueado
  useEffect(() => {
    const perfilGuardado = localStorage.getItem('perfilUsuario');
    if (perfilGuardado) {
      const usuario = JSON.parse(perfilGuardado);
      setIniciales(usuario.nombre.charAt(0).toUpperCase() + usuario.apellido.charAt(0).toUpperCase());
    }
  }, []);

  const confirmarLogout = async () => {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('perfilUsuario');
      navigate('/');
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  // ==========================================
  // EL MENÚ CONECTADO AL APP.JSX
  // ==========================================
  const menuItems = [
    { name: "Panel Principal", path: "/admin", icon: FaHome },
    { name: "Agenda (Calendario)", path: "/admin/agenda", icon: FaCalendarAlt },
    { name: "Directorio Pacientes", path: "/admin/lista-pacientes", icon: FaUserInjured },
    { name: "Historia Clínica", path: "/admin/historia-clinica", icon: FaFileMedical },
    { name: "Odontograma", path: "/admin/odontograma-avanzado", icon: FaTeeth },
    { name: "Analytics & KPIs", path: "/admin/analytics", icon: FaChartPie }, 
    { name: "Ingresos vs Gastos", path: "/admin/finanzas", icon: FaFileInvoiceDollar },
    { name: "Resultados (NPS)", path: "/admin/encuestas", icon: FaSmileBeam },
    { name: "Automatizaciones", path: "/admin/configuracion", icon: FaCogs },
  ];

  return (
    <div className="flex min-h-screen bg-background overflow-hidden relative">

      {/* ========================================== */}
      {/* OVERLAY OSCURO PARA MÓVILES                */}
      {/* ========================================== */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* ========================================== */}
      {/* BARRA LATERAL (Responsive)                 */}
      {/* ========================================== */}
      <aside
        className={`bg-primary text-background flex flex-col z-50 shadow-2xl border-r-4 border-accent-orange/50 transition-all duration-300 ease-in-out
          /* Comportamiento Móvil: Fijo, superpuesto, entra por la izquierda */
          fixed inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0 w-[280px]' : '-translate-x-full w-[280px]'}
          /* Comportamiento PC (lg): Vuelve a ser estático, se colapsa con botón */
          lg:relative lg:translate-x-0 ${isDesktopExpanded ? 'lg:w-[280px]' : 'lg:w-[88px]'}
        `}
      >
        {/* Header del Menú */}
        <div className="h-20 flex items-center justify-between lg:justify-center border-b border-secondary/10 p-4 shrink-0">
          {(isDesktopExpanded || isMobileMenuOpen) ? (
            <div className="text-center">
              <span className="text-2xl font-black text-white leading-none">C&M</span>
              <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-accent-orange mt-1">Dental Admin</span>
            </div>
          ) : (
            <span className="text-xl font-black text-white hidden lg:block hover:text-accent-orange transition-colors">C&M</span>
          )}

          {/* Botón Cerrar (Solo Móvil) */}
          <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-white/70 hover:text-white p-2">
            <FaTimes className="text-2xl" />
          </button>
        </div>

        {/* Botón flotante para PC (Oculto en móvil) */}
        <button
          onClick={() => setIsDesktopExpanded(!isDesktopExpanded)}
          className="hidden lg:flex absolute top-24 -right-4 bg-accent-orange text-white w-8 h-8 rounded-full items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform focus:outline-none ring-4 ring-background"
        >
          {isDesktopExpanded ? <FaChevronLeft className="text-sm" /> : <FaChevronRight className="text-sm" />}
        </button>

        {/* Navegación */}
        <nav className="grow p-4 mt-2 flex flex-col gap-2 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            // Mostramos texto si está en móvil (siempre abierto si se ve) o si está expandido en PC
            const showText = isMobileMenuOpen || isDesktopExpanded;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`group flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold transition-all duration-300 relative overflow-hidden
                  ${isActive ? 'bg-accent-orange text-text shadow-md' : 'text-secondary hover:bg-white/10 hover:text-white'} 
                  ${!showText && 'lg:justify-center'}
                `}
              >
                {!isActive && <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity"></div>}

                <Icon className={`text-xl shrink-0 transition-all duration-300 ${isActive ? 'text-text scale-110' : 'text-accent-orange group-hover:scale-110'}`} />
                
                {showText && <span className="tracking-wide text-[13px] whitespace-nowrap">{item.name}</span>}

                {/* Tooltip (Solo PC colapsado) */}
                {!isDesktopExpanded && (
                  <div className="hidden lg:block absolute left-20 bg-text text-white font-bold text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none shadow-xl transition-all duration-200 z-50 transform translate-x-1 group-hover:translate-x-0">
                    {item.name}
                    <div className="absolute top-1/2 -left-1 w-2 h-2 bg-text transform -translate-y-1/2 rotate-45"></div>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Cerrar Sesión */}
        <div className="p-4 border-t border-secondary/10 shrink-0">
          <button 
            onClick={() => setMostrarModalLogout(true)} 
            className={`w-full flex items-center gap-4 px-4 py-3 text-secondary-dark hover:text-red-400 transition-colors font-bold rounded-xl hover:bg-white/5 
            ${!(isMobileMenuOpen || isDesktopExpanded) && 'lg:justify-center'}`}
          >
            <FaSignOutAlt className="text-xl shrink-0" />
            {(isMobileMenuOpen || isDesktopExpanded) && <span className="text-[13px]">Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      {/* ========================================== */}
      {/* ÁREA PRINCIPAL                             */}
      {/* ========================================== */}
      <main className="flex-1 overflow-y-auto z-10 w-full bg-background/50">

        {/* Header Superior Móvil (Hamburguesa) */}
        <div className="lg:hidden bg-primary text-white p-4 flex items-center justify-between sticky top-0 z-30 shadow-md">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 focus:outline-none active:scale-95 transition-transform">
              <FaBars className="text-2xl text-accent-orange" />
            </button>
            <span className="font-black text-lg">C&M Admin</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-accent-orange flex items-center justify-center text-white font-black text-sm border-2 border-white shadow-sm">
            {iniciales}
          </div>
        </div>

        {/* Contenido inyectado */}
        <div className="py-8 px-4 sm:px-8 md:px-10 lg:px-12 w-full max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>

      {/* ========================================= */}
      {/* MODAL DE CONFIRMACIÓN DE CERRAR SESIÓN    */}
      {/* ========================================= */}
      {mostrarModalLogout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in px-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-scale-up text-center border-t-8 border-accent-orange">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <FaSignOutAlt className="text-4xl text-red-500 ml-2" />
            </div>
            <h3 className="text-2xl font-black text-primary mb-2">¿Cerrar Sesión?</h3>
            <p className="text-text-light text-sm font-medium mb-8 px-2">
              Tendrás que volver a ingresar tus credenciales para acceder al panel.
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
