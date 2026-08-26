import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios.js";
import BrandLogo from "../BrandLogo.jsx";
import { FaTimes, FaSignOutAlt, FaUserCircle, FaHome, FaUserMd, FaTooth, FaEnvelope, FaCalendarPlus, FaSignInAlt } from 'react-icons/fa';
import { HiMenuAlt3 } from 'react-icons/hi';

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const perfilGuardado = localStorage.getItem('perfilUsuario');
    if (perfilGuardado) {
      setUsuario(JSON.parse(perfilGuardado));
    }
  }, []);

  const getInitials = () => {
    if (!usuario) return "";
    const n = usuario.nombre ? usuario.nombre.charAt(0).toUpperCase() : "";
    const a = usuario.apellido ? usuario.apellido.charAt(0).toUpperCase() : "";
    return n + a || <FaUserCircle />;
  };

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout').catch(() => { });
      localStorage.removeItem('token');
      localStorage.removeItem('perfilUsuario');
      setUsuario(null);
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 flex justify-center ${scrolled ? "top-4 px-4" : "top-0 px-0"}`}>
        <div className={`w-full max-w-[95%] mx-auto flex items-center justify-between transition-all duration-500 ${scrolled
          ? "py-2 px-2 sm:px-4"
          : "bg-transparent py-6 px-4 sm:px-8 lg:px-12"
          }`}
        >

          {/* LADO IZQUIERDO: LOGO */}
          <Link to="/" className="shrink-0 outline-none" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <BrandLogo scrolled={scrolled} />
          </Link>

          {/* CONTENEDOR DERECHO: Links y Botones (Aquí va el redondeado) */}
          <div className={`flex items-center gap-6 transition-all duration-500 ${scrolled ? "bg-orange-50/90 backdrop-blur-md border border-accent-orange/30 shadow-[0_10px_25px_rgba(249,115,22,0.15)] rounded-full px-6 py-3" : ""}`}>
            
            <div className="hidden lg:flex items-center gap-8 font-bold text-base">
            <Link to="/" className={`hover-sweep relative py-1 transition-all duration-300 font-bold ${scrolled ? 'text-primary hover:text-primary-hover' : 'text-white hover:text-white/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'}`}>
              Inicio
            </Link>
            <Link to="/especialistas" className={`hover-sweep relative py-1 transition-all duration-300 font-bold ${scrolled ? 'text-primary hover:text-primary-hover' : 'text-white hover:text-white/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'}`}>
              Especialistas
            </Link>
            <Link to="/odontologia-digital" className={`hover-sweep relative py-1 transition-all duration-300 font-bold ${scrolled ? 'text-primary hover:text-primary-hover' : 'text-white hover:text-white/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'}`}>
              Odontología Digital
            </Link>
            <Link to="/contacto" className={`hover-sweep relative py-1 transition-all duration-300 font-bold ${scrolled ? 'text-primary hover:text-primary-hover' : 'text-white hover:text-white/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'}`}>
              Contacto
            </Link>
          </div>

          {/* LADO DERECHO: Botones de Sesión */}
          <div className="hidden lg:flex items-center gap-3">
            {!usuario ? (
              <>
                <Link to="/login" className={`btn-expand px-6 py-2 rounded-full font-bold text-base flex items-center justify-center overflow-hidden z-10 border border-transparent ${scrolled
                  ? 'bg-accent-orange text-white'
                  : 'bg-white/20 backdrop-blur-md text-white'
                  }`}>
                  Iniciar Sesión
                </Link>
                <Link to="/turnos" className="btn-expand px-6 py-2 rounded-full font-bold text-base flex items-center justify-center bg-primary text-white overflow-hidden z-10 border border-transparent">
                  Solicitar Turno
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/mi-perfil" className={`flex items-center gap-2 font-bold text-base transition-all ${scrolled ? 'text-primary hover:text-accent-orange' : 'text-white hover:text-accent-orange drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'}`}>
                  <div className="w-8 h-8 rounded-full bg-accent-orange text-white flex items-center justify-center text-[10px] font-black tracking-widest border border-white/20 shadow-md">
                    {getInitials()}
                  </div>
                  Mi Perfil
                </Link>
                <button onClick={handleLogout} className={`p-2.5 rounded-full transition-all ${scrolled ? 'bg-red-50 text-red-500 hover:bg-red-500 hover:text-white' : 'bg-red-500/80 backdrop-blur-sm text-white hover:bg-red-600 border border-white/20 drop-shadow-md'}`} title="Cerrar Sesión">
                  <FaSignOutAlt />
                </button>
              </div>
            )}
          </div>

            {/* Botón Hamburguesa (MÓVIL) */}
            <button onClick={() => setMenuOpen(!menuOpen)} className={`lg:hidden flex h-11 w-11 items-center justify-center rounded-2xl transition-all duration-300 ${scrolled ? 'bg-accent-orange text-white shadow-lg' : 'bg-white/20 text-white backdrop-blur-md border border-white/20 shadow-md drop-shadow-md'}`}>
              {menuOpen ? <FaTimes className="text-2xl" /> : (
                <HiMenuAlt3 className="text-3xl" />
              )}
            </button>
          </div>
        </div>

        {/* MENÚ MÓVIL DESPLEGABLE FULL SCREEN PREMIUM */}
        <div
          className={`lg:hidden fixed inset-0 z-[100] flex flex-col justify-center p-8 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${menuOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
            }`}
        >
          {/* Fondo Claro/Crema Minimalista */}
          <div className="absolute inset-0 bg-[#FAF9F6] md:bg-white/95 md:backdrop-blur-xl"></div>

          {/* Patrón de puntos sutil oscuro */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000000 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

          {/* Destellos de luz (difuminado anaranjado en el fondo) */}
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-linear-to-bl from-[#FF7800]/25 to-transparent rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-[-20%] left-[-20%] w-[70%] h-[70%] bg-linear-to-tr from-[#FF7800]/15 to-transparent rounded-full blur-3xl pointer-events-none"></div>

          {/* ENCABEZADO DEL MENÚ: Logo + Botón Cerrar */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
            <Link to="/" onClick={() => setMenuOpen(false)} className="outline-none w-32 filter drop-shadow-sm">
              <BrandLogo forceDark={true} />
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              className="h-12 w-12 flex items-center justify-center rounded-full bg-black/5 border border-black/10 text-primary backdrop-blur-lg hover:bg-black/10 transition-all active:scale-90 shadow-sm"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* CONTENEDOR DE ENLACES PRINCIPALES */}
          <div className="relative z-10 flex flex-col items-start w-full max-w-sm mx-auto space-y-4 mt-12">
            {[
              { to: "/", icon: <FaHome />, label: "Inicio" },
              { to: "/especialistas", icon: <FaUserMd />, label: "Especialistas" },
              { to: "/odontologia-digital", icon: <FaTooth />, label: "Odontología" },
              { to: "/contacto", icon: <FaEnvelope />, label: "Contacto" }
            ].map((item, idx) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-5 w-full p-2 group transition-all duration-700 ease-out ${menuOpen ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
                  }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
                onClick={() => setMenuOpen(false)}
              >
                <div className="w-14 h-14 shrink-0 rounded-full bg-white border border-primary/10 flex items-center justify-center text-primary text-2xl group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-hover:border-primary shadow-sm group-hover:shadow-[0_10px_20px_rgba(74,59,50,0.2)] transition-all duration-500">
                  {item.icon}
                </div>
                <span className="text-xl sm:text-2xl font-black text-primary uppercase tracking-widest group-hover:text-accent-orange group-hover:translate-x-2 transition-transform duration-500">
                  {item.label}
                </span>
              </Link>
            ))}

            {/* Separador */}
            <div
              className={`h-px w-full bg-linear-to-r from-transparent via-primary/20 to-transparent my-6 transition-all duration-1000 ${menuOpen ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                }`}
              style={{ transitionDelay: '400ms' }}
            ></div>

            {/* BOTONES DE ACCIÓN SECUNDARIOS */}
            <div
              className={`w-full flex flex-col gap-5 mt-2 transition-all duration-700 ease-out ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
              style={{ transitionDelay: '500ms' }}
            >
              {usuario ? (
                <>
                  <Link to="/mi-perfil" className="w-full bg-white border border-primary/10 text-primary p-4 rounded-full flex items-center justify-center gap-4 font-bold uppercase tracking-widest active:scale-95 transition-transform shadow-md hover:bg-gray-50" onClick={() => setMenuOpen(false)}>
                    <div className="w-8 h-8 rounded-full bg-accent-orange text-white flex items-center justify-center text-[10px] font-black tracking-widest shadow-md">
                      {getInitials()}
                    </div>
                    Mi Perfil
                  </Link>
                  <button onClick={() => { setMenuOpen(false); handleLogout(); }} className="w-full text-red-500 font-bold p-2 text-center uppercase tracking-widest text-sm hover:text-red-600 transition-colors">
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="w-full bg-linear-to-r from-[#FF7800] to-orange-500 text-white font-black py-4 px-6 rounded-full text-center uppercase tracking-widest shadow-[0_10px_30px_rgba(255,120,0,0.3)] active:scale-95 hover:scale-105 transition-all flex items-center justify-center gap-3" onClick={() => setMenuOpen(false)}>
                    <FaSignInAlt className="text-xl" /> Iniciar Sesión
                  </Link>
                  <Link to="/turnos" className="w-full bg-white border border-primary/10 text-primary font-bold py-4 px-6 rounded-full text-center uppercase tracking-widest hover:bg-gray-50 active:scale-95 hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-md" onClick={() => setMenuOpen(false)}>
                    <FaCalendarPlus className="text-xl text-primary" /> Solicitar Turno
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;