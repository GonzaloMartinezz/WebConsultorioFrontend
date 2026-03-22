import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCalendarAlt, FaUserInjured, FaTeeth, FaCog, FaChartLine, FaSignOutAlt, FaChevronLeft, FaChevronRight, FaBars, FaTimes } from 'react-icons/fa';

const AdminLayout = ({ children }) => {
  // Estado para PC: Colapsar/Expandir
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(true);
  // Estado para Móvil: Menú abierto/cerrado
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const location = useLocation();

  // Cerramos el menú móvil automáticamente si cambiamos de ruta
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const menuItems = [
    { name: "Dashboard Diario", path: "/admin", icon: FaChartLine },
    { name: "Odontograma Digital", path: "/admin/odontograma", icon: FaTeeth },
    { name: "Pacientes", path: "/admin/pacientes", icon: FaUserInjured },
    { name: "Configuración", path: "/admin/configuracion", icon: FaCog },
  ];

  return (
    <div className="flex min-h-screen bg-background overflow-hidden relative">
      
      {/* ========================================== */}
      {/* OVERLAY OSCURO PARA MÓVILES */}
      {/* ========================================== */}
      {/* Aparece solo en celulares cuando el menú está abierto */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* ========================================== */}
      {/* BARRA LATERAL (Responsive: Fixed en móvil, Relative en PC) */}
      {/* ========================================== */}
      <aside 
        className={`bg-primary text-background flex flex-col z-50 shadow-2xl border-r-4 border-accent-orange/50 transition-all duration-300 ease-in-out
          /* Comportamiento Móvil: Fijo, superpuesto, entra por la izquierda */
          fixed inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0 w-3/4 max-w-[300px]' : '-translate-x-full w-3/4'}
          /* Comportamiento PC (lg): Vuelve a ser estático, se colapsa con botón */
          lg:relative lg:translate-x-0 ${isDesktopExpanded ? 'lg:w-1/4 lg:min-w-[260px]' : 'lg:w-20'}
        `}
      >
        {/* Header del Menú */}
        <div className="h-20 flex items-center justify-between lg:justify-center border-b border-secondary/10 p-4 shrink-0">
          {(isDesktopExpanded || isMobileMenuOpen) ? (
            <div className="text-center">
              <span className="text-xl font-black text-white leading-none">C&M</span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Administración</span>
            </div>
          ) : (
            <span className="text-xl font-black text-white hidden lg:block">C&M</span>
          )}

          {/* Botón Cerrar (Solo Móvil) */}
          <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-white/70 hover:text-white p-2">
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Botón flotante para PC (Oculto en móvil) */}
        <button 
          onClick={() => setIsDesktopExpanded(!isDesktopExpanded)}
          className="hidden lg:flex absolute top-24 -right-4 bg-accent-orange text-text w-8 h-8 rounded-full items-center justify-center shadow-lg hover:scale-110 transition-transform focus:outline-none"
        >
          {isDesktopExpanded ? <FaChevronLeft /> : <FaChevronRight />}
        </button>

        {/* Navegación */}
        <nav className="flex-grow p-4 mt-4 lg:mt-8 flex flex-col gap-3 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            // Evaluamos si debe mostrar el texto (Abierto en móvil o expandido en PC)
            const showText = isMobileMenuOpen || isDesktopExpanded;
            
            return (
              <Link 
                key={item.name} 
                to={item.path} 
                className={`group flex items-center gap-4 px-4 py-4 rounded-xl font-semibold transition-all duration-200 
                  ${isActive ? 'bg-accent-orange text-text shadow-md' : 'text-secondary hover:bg-white/10 hover:text-white'} 
                  ${!showText && 'lg:justify-center'}
                `}
              >
                <Icon className={`text-2xl shrink-0 transition-colors ${isActive ? 'text-text' : 'text-accent-orange'}`} />
                {showText && <span className="tracking-wide text-sm whitespace-nowrap">{item.name}</span>}
                
                {/* Tooltip (Solo PC colapsado) */}
                {!isDesktopExpanded && (
                  <div className="hidden lg:block absolute left-24 bg-primary text-background text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none shadow-lg border border-secondary/20 transition-opacity">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Cerrar Sesión */}
        <div className="p-4 border-t border-secondary/10 shrink-0">
          <button className={`w-full flex items-center gap-4 px-4 py-3 text-secondary-dark hover:text-red-400 transition-colors ${!(isMobileMenuOpen || isDesktopExpanded) && 'lg:justify-center'}`}>
            <FaSignOutAlt className="text-2xl shrink-0" />
            {(isMobileMenuOpen || isDesktopExpanded) && <span className="font-semibold text-sm">Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      {/* ========================================== */}
      {/* ÁREA PRINCIPAL */}
      {/* ========================================== */}
      <main className="flex-1 overflow-y-auto z-10 w-full">
        
        {/* Header Superior Móvil (Hamburguesa) */}
        <div className="lg:hidden bg-primary text-white p-4 flex items-center justify-between sticky top-0 z-30 shadow-md">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 focus:outline-none">
              <FaBars className="text-2xl text-accent-orange" />
            </button>
            <span className="font-black text-lg">C&M Admin</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-accent-orange font-bold text-xs border border-accent-orange/50">
            A
          </div>
        </div>

        {/* Contenido inyectado */}
        <div className="py-6 px-4 sm:px-8 md:px-10 lg:px-12 w-full max-w-[100vw]">
          {children}
        </div>
      </main>

    </div>
  );
};

export default AdminLayout;
