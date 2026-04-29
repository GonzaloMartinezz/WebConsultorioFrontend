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
          ? "bg-orange-50/90 backdrop-blur-md border border-accent-orange/30 shadow-[0_10px_25px_rgba(249,115,22,0.15)] rounded-full py-4 px-4 sm:px-8"
          : "bg-transparent py-6 px-4 sm:px-8 lg:px-12"
          }`}
        >

          {/* LADO IZQUIERDO: LOGO */}
          <Link to="/" className="shrink-0 outline-none">
            <BrandLogo scrolled={scrolled} />
          </Link>

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

        {/* MENÚ MÓVIL DESPLEGABLE FULL SCREEN PREMIUM */}
        <div
          className={`lg:hidden fixed inset-0 z-60 flex flex-col justify-center p-8 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${menuOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
            }`}
        >
          {/* Fondo Glassmorphism Extremo */}
          <div className="absolute inset-0 bg-[#050505]/80 backdrop-blur-[50px]"></div>

          {/* Círculos de luz elegantes */}
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#FF7800]/15 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

          {/* Botón Cerrar Flotante */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-8 right-8 h-12 w-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white backdrop-blur-md hover:bg-white/10 transition-colors active:scale-90 z-10"
          >
            <FaTimes className="text-xl" />
          </button>

          {/* Contenedor de Enlaces */}
          <div className="relative z-10 flex flex-col items-center w-full max-w-sm mx-auto space-y-2">
            {[
              { to: "/", icon: <FaHome />, label: "Inicio" },
              { to: "/especialistas", icon: <FaUserMd />, label: "Especialistas" },
              { to: "/odontologia-digital", icon: <FaTooth />, label: "Odontología" },
              { to: "/contacto", icon: <FaEnvelope />, label: "Contacto" }
            ].map((item, idx) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-6 w-full p-4 rounded-3xl transition-all duration-700 ease-out group ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                  }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
                onClick={() => setMenuOpen(false)}
              >
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF7800] text-2xl group-hover:bg-[#FF7800] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(255,120,0,0.4)] transition-all duration-500">
                  {item.icon}
                </div>
                <span className="text-[1.35rem] sm:text-2xl font-black text-white uppercase tracking-[0.15em] group-hover:translate-x-3 transition-transform duration-500 leading-tight">
                  {item.label}
                </span>
              </Link>
            ))}

            {/* Separador */}
            <div
              className={`h-px w-3/4 bg-linear-to-r from-transparent via-white/20 to-transparent my-8 transition-all duration-1000 ${menuOpen ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                }`}
              style={{ transitionDelay: '400ms' }}
            ></div>

            {/* Botones de Acción */}
            <div
              className={`w-full flex flex-col gap-4 mt-2 transition-all duration-700 ease-out ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
              style={{ transitionDelay: '500ms' }}
            >
              {usuario ? (
                <>
                  <Link to="/mi-perfil" className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white p-5 rounded-4xl flex items-center justify-center gap-3 font-bold uppercase tracking-widest active:scale-95 transition-transform" onClick={() => setMenuOpen(false)}>
                    <div className="w-8 h-8 rounded-full bg-accent-orange text-white flex items-center justify-center text-[10px] font-black tracking-widest">
                      {getInitials()}
                    </div>
                    Mi Perfil
                  </Link>
                  <button onClick={() => { setMenuOpen(false); handleLogout(); }} className="w-full text-red-400 font-bold p-4 text-center uppercase tracking-widest text-sm hover:text-red-300 transition-colors">
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="w-full bg-linear-to-r from-[#FF7800] to-[#E66A00] text-white font-black p-5 rounded-4xl text-center uppercase tracking-widest shadow-[0_10px_30px_rgba(255,120,0,0.3)] active:scale-95 transition-transform flex items-center justify-center gap-3" onClick={() => setMenuOpen(false)}>
                    <FaSignInAlt className="text-xl" /> Iniciar Sesión
                  </Link>
                  <Link to="/turnos" className="w-full bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold p-5 rounded-4xl text-center uppercase tracking-widest hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center gap-3" onClick={() => setMenuOpen(false)}>
                    <FaCalendarPlus className="text-xl text-[#FF7800]" /> Solicitar Turno
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Logo al pie */}
          <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 opacity-20 scale-75 grayscale invert transition-all duration-1000 ${menuOpen ? "opacity-30 translate-y-0" : "opacity-0 translate-y-10"
            }`} style={{ transitionDelay: '600ms' }}>
            <BrandLogo />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;