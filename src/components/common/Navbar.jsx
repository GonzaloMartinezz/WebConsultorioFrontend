import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios.js";
import BrandLogo from "../BrandLogo.jsx";
import { FaTimes, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

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
        <div className={`w-full max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 ${scrolled
          ? "bg-orange-50/90 backdrop-blur-md border border-accent-orange/30 shadow-[0_10px_25px_rgba(249,115,22,0.15)] rounded-full py-2 px-4 sm:px-6"
          : "bg-transparent py-5 px-4 sm:px-6 lg:px-8"
          }`}
        >

          {/* LADO IZQUIERDO: LOGO */}
          <Link to="/" className="shrink-0 outline-none">
            <BrandLogo scrolled={scrolled} />
          </Link>

          <div className="hidden lg:flex items-center gap-10 font-bold text-sm">
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
                <Link to="/login" className={`btn-expand px-6 py-2.5 rounded-full font-bold text-sm flex items-center justify-center overflow-hidden z-10 border border-transparent ${scrolled
                  ? 'bg-accent-orange text-white'
                  : 'bg-white/20 backdrop-blur-md text-white'
                  }`}>
                  Iniciar Sesión
                </Link>
                <Link to="/turnos" className="btn-expand px-6 py-2.5 rounded-full font-bold text-sm flex items-center justify-center bg-primary text-white overflow-hidden z-10 border border-transparent">
                  Solicitar Turno
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/mi-perfil" className={`flex items-center gap-2 font-bold text-sm transition-all ${scrolled ? 'text-primary hover:text-accent-orange' : 'text-white hover:text-accent-orange drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'}`}>
                  <FaUserCircle className="text-xl" /> Mi Perfil
                </Link>
                <button onClick={handleLogout} className={`p-2.5 rounded-full transition-all ${scrolled ? 'bg-red-50 text-red-500 hover:bg-red-500 hover:text-white' : 'bg-red-500/80 backdrop-blur-sm text-white hover:bg-red-600 border border-white/20 drop-shadow-md'}`} title="Cerrar Sesión">
                  <FaSignOutAlt />
                </button>
              </div>
            )}
          </div>

          {/* Botón Hamburguesa (MÓVIL) */}
          <button onClick={() => setMenuOpen(!menuOpen)} className={`lg:hidden flex h-10 w-10 items-center justify-center rounded-xl transition-all ${scrolled ? 'bg-accent-orange/10 text-accent-orange' : 'bg-white/20 text-white backdrop-blur-md border border-white/20 shadow-md drop-shadow-md'}`}>
            {menuOpen ? <FaTimes className="text-xl" /> : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>

        {/* MENÚ MÓVIL DESPLEGABLE */}
        {menuOpen && (
          <div className="lg:hidden fixed top-20 left-4 right-4 bg-white/95 backdrop-blur-2xl rounded-3xl border border-secondary/20 shadow-2xl overflow-hidden animate-fade-in z-50">
            <div className="flex flex-col p-6 space-y-6">
              <Link to="/" className="text-xl font-black text-primary uppercase" onClick={() => setMenuOpen(false)}>Inicio</Link>
              <Link to="/especialistas" className="text-xl font-black text-primary uppercase" onClick={() => setMenuOpen(false)}>Especialistas</Link>
              <Link to="/odontologia-digital" className="text-xl font-black text-primary uppercase" onClick={() => setMenuOpen(false)}>Odontología Digital</Link>
              <Link to="/contacto" className="text-xl font-black text-primary uppercase" onClick={() => setMenuOpen(false)}>Contacto</Link>

              <div className="h-px w-full bg-secondary/30"></div>
              {usuario ? (
                <div className="flex flex-col gap-3">
                  <Link to="/mi-perfil" className="bg-primary text-white p-4 rounded-2xl flex items-center justify-between" onClick={() => setMenuOpen(false)}>
                    <span className="font-bold">Mi Perfil ({usuario.nombre})</span>
                    <span className="bg-white/10 p-2 rounded-full">&rarr;</span>
                  </Link>
                  <button onClick={() => { setMenuOpen(false); handleLogout(); }} className="bg-red-50 text-red-500 font-bold p-4 rounded-2xl text-center">Cerrar Sesión</button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link to="/login" className="bg-accent-orange text-white font-bold p-4 rounded-2xl text-center uppercase transition-all duration-300 hover:scale-105 active:scale-95" onClick={() => setMenuOpen(false)}>Iniciar Sesión</Link>
                  <Link to="/turnos" className="bg-primary text-white font-bold p-4 rounded-2xl text-center uppercase shadow-md transition-all duration-300 hover:scale-105 active:scale-95" onClick={() => setMenuOpen(false)}>Solicitar Turno</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;