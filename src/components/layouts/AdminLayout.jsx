import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// Iconos profesionales modernos
import { FaCalendarAlt, FaUserInjured, FaTeeth, FaCog, FaChartLine, FaSignOutAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const AdminLayout = ({ children }) => {
  // Estado para colapsar/expandir el menú
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation(); // Para saber qué link está activo

  // LISTA DE ÍTEMS DEL MENÚ ACTUALIZADA (PPartes iguales/Distribución prolija)
  const menuItems = [
    { name: "Dashboard Diario", path: "/admin", icon: FaChartLine },
    { name: "Odontograma Digital", path: "/admin/odontograma", icon: FaTeeth }, // NUEVO ÍTEM PROFESIONAL
    { name: "Pacientes", path: "/admin/pacientes", icon: FaUserInjured },
    { name: "Configuración", path: "/admin/configuracion", icon: FaCog },
  ];

  return (
    // Contenedor principal flex full-screen
    <div className="flex min-h-screen bg-background overflow-hidden">
      
      {/* ======================================================== */}
      {/* 1. BARRA LATERAL VERTICAL (Sidebar) - bg-primary (Nogal) */}
      {/* ======================================================== */}
      <aside 
        className={`bg-primary text-background flex flex-col transition-all duration-300 relative z-20 shadow-xl border-r-4 border-accent-orange/50 
          ${isExpanded ? 'w-1/4 min-w-[260px]' : 'w-20'}`}
      >
        {/* Encabezado del menú: Logo text colapsable */}
        <div className="h-20 flex items-center justify-center border-b border-secondary/10 p-4 shrink-0">
          {isExpanded ? (
            <div className="text-center">
              <span className="text-xl font-black text-white leading-none">C&M</span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Administración</span>
            </div>
          ) : (
            <span className="text-xl font-black text-white">C&M</span>
          )}
        </div>

        {/* Botón flotante para colapsar/expandir */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute top-24 -right-4 bg-accent-orange text-text w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform focus:outline-none"
        >
          {isExpanded ? <FaChevronLeft /> : <FaChevronRight />}
        </button>

        {/* LISTA DE ÍTEMS DEL MENÚ (Secciones iguales) */}
        {/* Usamos flex-grow y justify-around o justify-start con gap para ordenar */}
        <nav className="flex-grow p-4 mt-8 flex flex-col gap-3">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.name} 
                to={item.path} 
                className={`group flex items-center gap-4 px-4 py-4 rounded-xl font-semibold transition-all duration-200 
                  ${isActive 
                    ? 'bg-accent-orange text-text shadow-md' // Estado activo
                    : 'text-secondary hover:bg-white/10 hover:text-white' // Estado normal
                  } 
                  ${!isExpanded && 'justify-center'} /* Centrado si está colapsado */
                `}
              >
                <Icon className={`text-2xl shrink-0 transition-colors ${isActive ? 'text-text' : 'text-accent-orange'}`} />
                {isExpanded && (
                  <span className="tracking-wide text-sm whitespace-nowrap">{item.name}</span>
                )}
                {/* Tooltip para cuando está colapsado */}
                {!isExpanded && (
                  <div className="absolute left-24 bg-primary text-background text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none shadow-lg border border-secondary/20 transition-opacity">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Botón de cerrar sesión al final */}
        <div className="p-4 border-t border-secondary/10 shrink-0">
          <button className={`w-full flex items-center gap-4 px-4 py-3 text-secondary-dark hover:text-red-400 transition-colors ${!isExpanded && 'justify-center'}`}>
            <FaSignOutAlt className="text-2xl shrink-0" />
            {isExpanded && <span className="font-semibold text-sm">Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      {/* ======================================================== */}
      {/* 2. ÁREA DE CONTENIDO PRINCIPAL (Donde fluyen las páginas) */}
      {/* ======================================================== */}
      <main className="flex-1 overflow-y-auto z-10">
        {/* Contenedor adaptado para pantalla full-width */}
        <div className="py-8 px-6 sm:px-8 md:px-10 lg:px-12">
          {children}
        </div>
      </main>

    </div>
  );
};

export default AdminLayout;
