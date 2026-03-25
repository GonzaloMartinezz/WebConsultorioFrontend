import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import api from "../../api/axios.js";
import BrandLogo from "../BrandLogo.jsx";
import { FaTimes, FaCalendarAlt, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [usuario, setUsuario] = useState(null);

  // Estados para el Modal del Paciente
  const [mostrarModal, setMostrarModal] = useState(false);
  const [misTurnos, setMisTurnos] = useState([]);
  const [cargandoTurnos, setCargandoTurnos] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Al cargar la página, revisamos si hay alguien logueado
  useEffect(() => {
    const perfilGuardado = localStorage.getItem('perfilUsuario');
    if (perfilGuardado) {
      setUsuario(JSON.parse(perfilGuardado));
    }
  }, []);

  // Función para abrir el modal y buscar los turnos de este paciente exacto
  const abrirModalPerfil = async () => {
    setMostrarModal(true);
    setCargandoTurnos(true);
    try {
      const respuesta = await api.get(`/turnos/paciente/${usuario.nombre}/${usuario.apellido}`);
      setMisTurnos(respuesta.data);
    } catch (error) {
      console.error("Error al cargar los turnos:", error);
    } finally {
      setCargandoTurnos(false);
    }
  };

  // Función para cerrar sesión
  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('perfilUsuario');
      setUsuario(null);
      setMostrarModal(false);
      navigate('/');
      setMenuOpen(false);
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b transition-all duration-300 ${
        scrolled
          ? "bg-background/95 shadow-md border-secondary/50 backdrop-blur-sm"
          : "bg-background border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        {/* LADO IZQUIERDO: El nuevo logo compuesto y el nombre */}
        <Link to="/" className="shrink-0 outline-none focus:outline-none rounded-lg p-1">
          <BrandLogo />
        </Link>

        {/* CENTRO: Menú Desktop */}
        <div className="hidden md:flex items-center gap-10">
          <Link to="/" className="relative text-[1.25rem] font-medium text-text-light hover:text-primary transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">
            Inicio
          </Link>
          <Link to="/acerca" className="relative text-[1.25rem] font-medium text-text-light hover:text-primary transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">
            Acerca de nosotros
          </Link>
          <Link to="/contacto" className="relative text-[1.25rem] font-medium text-text-light hover:text-primary transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">
            Contacto
          </Link>
        </div>

        {/* LADO DERECHO: Botones Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {usuario ? (
            // CÍRCULO DE PERFIL CLICKEABLE
            <button 
              onClick={abrirModalPerfil}
              className="w-11 h-11 rounded-full bg-accent-orange text-white flex items-center justify-center font-black text-lg shadow-md hover:scale-105 transition-transform cursor-pointer border-2 border-white ring-2 ring-accent-orange/30 delay-75"
              title="Mi Perfil"
            >
              {usuario.nombre?.charAt(0)?.toUpperCase() || ''}{usuario.apellido?.charAt(0)?.toUpperCase() || ''}
            </button>
          ) : (
            <Link to="/login" className="px-5 py-2.5 border-2 border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-all text-sm">
              Iniciar Sesión
            </Link>
          )}

          <Link to="/turnos" className="bg-accent-orange text-white font-bold px-6 py-2 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95 uppercase text-sm tracking-wide">
            Reservar Turno
          </Link>
        </div>

        {/* Botón Hamburguesa (MÓVIL SOLAMENTE) */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex h-11 w-11 items-center justify-center rounded-lg bg-secondary text-primary focus:outline-none focus:ring-2 focus:ring-primary ml-auto"
          aria-label="Menú principal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Menú Desplegable Móvil */}
      {menuOpen && (
        <div className="md:hidden border-t border-secondary bg-background shadow-lg absolute w-full left-0">
          <div className="flex flex-col px-4 py-4 space-y-2">
            <Link to="/" className="block rounded-lg px-4 py-3 text-lg font-medium text-text hover:bg-secondary" onClick={() => setMenuOpen(false)}>Inicio</Link>
            <Link to="/acerca" className="block rounded-lg px-4 py-3 text-lg font-medium text-text hover:bg-secondary" onClick={() => setMenuOpen(false)}>Acerca de nosotros</Link>
            <Link to="/contacto" className="block rounded-lg px-4 py-3 text-lg font-medium text-text hover:bg-secondary" onClick={() => setMenuOpen(false)}>Contacto</Link>

            <div className="h-px w-full bg-secondary my-2"></div>

            {/* Acciones en Móvil */}
            <div className="flex flex-col gap-3 mt-2">
              {usuario ? (
                <div 
                  className="flex items-center justify-between bg-secondary/10 px-4 py-3 rounded-2xl w-full cursor-pointer hover:bg-secondary/20 transition-colors border border-secondary/20" 
                  onClick={() => { setMenuOpen(false); abrirModalPerfil(); }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent-orange text-white flex items-center justify-center font-black text-lg shadow-sm">
                      {usuario.nombre?.charAt(0)?.toUpperCase() || ''}{usuario.apellido?.charAt(0)?.toUpperCase() || ''}
                    </div>
                    <p className="text-sm font-bold text-primary capitalize">{usuario.nombre} {usuario.apellido}</p>
                  </div>
                  <span className="text-xs text-accent-orange font-bold">Ver Perfil &rarr;</span>
                </div>
              ) : (
                <Link to="/login" className="block rounded-full border-2 border-primary py-3 text-center text-lg font-bold text-primary hover:bg-primary hover:text-white transition-all" onClick={() => setMenuOpen(false)}>
                  Iniciar sesión
                </Link>
              )}

              <Link to="/turnos" className="block rounded-full bg-accent-orange py-3 text-center text-lg font-bold text-white shadow-md hover:-translate-y-1 transition-transform uppercase tracking-wide" onClick={() => setMenuOpen(false)}>
                Reservar turno
              </Link>
            </div>
          </div>
        </div>
      )}

      </header>

      {/* ========================================= */}
      {/* MODAL DEL PERFIL DEL PACIENTE             */}
      {/* ========================================= */}
      {mostrarModal && usuario && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          
          <div className="bg-white rounded-4xl w-full max-w-md shadow-2xl overflow-hidden relative animate-scale-up border-t-8 border-accent-orange flex flex-col max-h-[90vh]">
            
            {/* Botón Cerrar Modal */}
            <button 
              onClick={() => setMostrarModal(false)}
              className="absolute top-4 right-4 text-secondary hover:text-red-500 transition-colors bg-background p-2 rounded-full z-10"
            >
              <FaTimes />
            </button>

            {/* CABECERA DEL PERFIL */}
            <div className="p-8 text-center bg-background/50 border-b border-secondary/20 shrink-0">
              <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center font-black text-3xl shadow-lg mx-auto mb-4">
                {usuario.nombre?.charAt(0)?.toUpperCase() || ''}{usuario.apellido?.charAt(0)?.toUpperCase() || ''}
              </div>
              <h2 className="text-2xl font-black text-primary capitalize">{usuario.nombre} {usuario.apellido}</h2>
              <p className="text-text-light font-medium flex items-center justify-center gap-2 mt-1">
                <FaUserCircle /> {usuario.email}
              </p>
            </div>

            {/* SECCIÓN: MIS TURNOS */}
            <div className="p-6 bg-white overflow-y-auto grow">
              <h3 className="text-sm font-black text-text uppercase tracking-wider mb-4 flex items-center gap-2">
                <FaCalendarAlt className="text-accent-orange" /> Historial de Turnos
              </h3>
              
              <div className="space-y-3">
                {cargandoTurnos ? (
                  <p className="text-center text-secondary font-bold text-sm py-4">Buscando tus turnos...</p>
                ) : misTurnos.length === 0 ? (
                  <div className="bg-background/80 rounded-xl p-5 text-center border border-dashed border-secondary/50">
                    <p className="text-text-light font-medium text-sm">Aún no has solicitado ningún turno.</p>
                    <Link to="/turnos" onClick={() => setMostrarModal(false)} className="text-accent-orange text-sm font-bold mt-2 inline-block hover:underline">
                      ¡Solicita uno ahora!
                    </Link>
                  </div>
                ) : (
                  misTurnos.map((turno) => (
                    <div key={turno._id} className="bg-background rounded-xl p-4 border border-secondary/20 flex justify-between items-center shadow-sm">
                      <div>
                        <p className="font-bold text-primary text-sm capitalize">{turno.motivo}</p>
                        <p className="text-xs text-text-light font-semibold mt-1">
                          {turno.fecha ? turno.fecha.split('-').reverse().join('/') : 'Sin fecha'} | {turno.hora || 'Sin hora'}
                        </p>
                      </div>
                      <span className={`text-xs font-black px-3 py-1 rounded-full ${
                        turno.estado === 'Confirmado' ? 'bg-green-100 text-green-700' : 
                        turno.estado === 'Cancelado' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {turno.estado}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* BOTÓN CERRAR SESIÓN */}
            <div className="p-6 bg-background/50 border-t border-secondary/20 shrink-0">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-white border-2 border-red-100 text-red-500 font-bold py-3.5 rounded-xl hover:bg-red-50 hover:border-red-200 transition-all shadow-sm"
              >
                <FaSignOutAlt /> Cerrar Sesión
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
