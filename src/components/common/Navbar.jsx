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

  const [mostrarModal, setMostrarModal] = useState(false);
  const [misTurnos, setMisTurnos] = useState([]);
  const [cargandoTurnos, setCargandoTurnos] = useState(false);

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

  const abrirModalPerfil = async () => {
    setMostrarModal(true);
    setCargandoTurnos(true);
    
    try {
      // Obtenemos el token guardado del localStorage
      const token = localStorage.getItem('token');
      
      // Hacemos la petición a la API enviando el token (por si el backend lo exige)
      const respuesta = await api.get('/turnos', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Filtramos solo los turnos del paciente logueado
      const filtrados = respuesta.data.filter(t =>
        t.nombrePaciente?.trim().toLowerCase() === usuario.nombre?.trim().toLowerCase() &&
        t.apellidoPaciente?.trim().toLowerCase() === usuario.apellido?.trim().toLowerCase()
      );
      
      setMisTurnos(filtrados);
      
    } catch (error) {
      // ¡AQUÍ CAPTURAMOS EL ERROR PARA QUE NO ROMPA LA APP!
      console.error("Error exacto de Axios al cargar turnos:", error.response || error);
      
      // Si da un error de permisos (401 o 403), vaciamos la lista de turnos para que no quede cargando infinito
      setMisTurnos([]); 
    } finally {
      setCargandoTurnos(false);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout').catch(() => { });
      localStorage.removeItem('token');
      localStorage.removeItem('perfilUsuario');
      setUsuario(null);
      setMostrarModal(false);
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
            <Link to="/" className={`transition-colors ${scrolled ? 'text-primary hover:text-accent-orange' : 'text-white hover:text-accent-orange drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'}`}>Inicio</Link>
            <Link to="/acerca" className={`transition-colors ${scrolled ? 'text-primary hover:text-accent-orange' : 'text-white hover:text-accent-orange drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'}`}>Nosotros</Link>
            <Link to="/estructura" className={`transition-colors ${scrolled ? 'text-primary hover:text-accent-orange' : 'text-white hover:text-accent-orange drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'}`}>Estructura</Link>
            <Link to="/contacto" className={`transition-colors ${scrolled ? 'text-primary hover:text-accent-orange' : 'text-white hover:text-accent-orange drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'}`}>Contacto</Link>
          </div>

          {/* LADO DERECHO: Botones de Sesión */}
          <div className="hidden lg:flex items-center gap-3">
            {!usuario ? (
              <>
                <Link to="/login" className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-md active:scale-95 flex items-center justify-center ${scrolled
                    ? 'bg-accent-orange text-white hover:brightness-110 shadow-accent-orange/30'
                    : 'bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-primary border border-white/30 drop-shadow-md'
                  }`}>
                  Iniciar Sesión
                </Link>
                <Link to="/turnos" className="px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-md active:scale-95 flex items-center justify-center bg-primary text-white hover:bg-primary/90 shadow-primary/30">
                  Solicitar Turno
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <button onClick={abrirModalPerfil} className={`flex items-center gap-2 font-bold text-sm transition-all ${scrolled ? 'text-primary hover:text-accent-orange' : 'text-white hover:text-accent-orange drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'}`}>
                  <FaUserCircle className="text-xl" /> Mi Perfil
                </button>
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
              <Link to="/acerca" className="text-xl font-black text-primary uppercase" onClick={() => setMenuOpen(false)}>Nosotros</Link>
              <Link to="/estructura" className="text-xl font-black text-primary uppercase" onClick={() => setMenuOpen(false)}>Estructura</Link>
              <Link to="/contacto" className="text-xl font-black text-primary uppercase" onClick={() => setMenuOpen(false)}>Contacto</Link>

              <div className="h-px w-full bg-secondary/30"></div>
              {usuario ? (
                <div className="flex flex-col gap-3">
                  <button className="bg-primary text-white p-4 rounded-2xl flex items-center justify-between" onClick={() => { setMenuOpen(false); abrirModalPerfil(); }}>
                    <span className="font-bold">Mi Perfil ({usuario.nombre})</span>
                    <span className="bg-white/10 p-2 rounded-full">&rarr;</span>
                  </button>
                  <button onClick={() => { setMenuOpen(false); handleLogout(); }} className="bg-red-50 text-red-500 font-bold p-4 rounded-2xl text-center">Cerrar Sesión</button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link to="/login" className="bg-accent-orange text-white font-bold p-4 rounded-2xl text-center uppercase" onClick={() => setMenuOpen(false)}>Iniciar Sesión</Link>
                  <Link to="/turnos" className="bg-primary text-white font-bold p-4 rounded-2xl text-center uppercase shadow-md" onClick={() => setMenuOpen(false)}>Solicitar Turno</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* MODAL DEL PERFIL */}
      {mostrarModal && usuario && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fade-in" onClick={() => setMostrarModal(false)}>
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden relative animate-scale-up border-t-8 border-accent-orange flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <button onClick={() => setMostrarModal(false)} className="absolute top-4 right-4 text-primary/40 hover:text-red-500 transition-colors bg-secondary/30 p-2 rounded-full z-10"><FaTimes /></button>
            <div className="p-8 text-center bg-secondary/10 border-b border-secondary/20">
              <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center font-black text-4xl shadow-xl mx-auto mb-4">
                {usuario.nombre?.charAt(0)?.toUpperCase()}
              </div>
              <h2 className="text-2xl font-black text-primary leading-tight uppercase tracking-tight">{usuario.nombre} {usuario.apellido}</h2>
              <p className="text-accent-orange font-bold text-xs uppercase tracking-widest mt-2 flex items-center justify-center gap-2"><FaUserCircle /> {usuario.email}</p>
            </div>
            <div className="p-8 bg-white overflow-y-auto grow">
              <h3 className="text-xs font-black text-primary/40 uppercase tracking-widest mb-6 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-accent-orange"></div> Próximas Citas</h3>
              <div className="space-y-4">
                {cargandoTurnos ? (<p className="text-center text-primary/50 font-bold animate-pulse py-8">Buscando turnos...</p>) : misTurnos.length === 0 ? (
                  <div className="bg-secondary/10 rounded-2xl p-8 text-center border border-dashed border-secondary/30">
                    <p className="text-primary/60 font-bold text-xs uppercase">No tienes citas programadas.</p>
                    <Link to="/turnos" onClick={() => setMostrarModal(false)} className="bg-accent-orange text-white text-[10px] font-black uppercase px-6 py-2 rounded-full mt-4 inline-block shadow-md">Solicitar Nueva</Link>
                  </div>
                ) : (
                  misTurnos.map((turno) => (
                    <div key={turno._id} className="bg-secondary/5 rounded-2xl p-5 border border-secondary/20 flex justify-between items-center">
                      <div>
                        <p className="font-black text-primary text-sm uppercase">{turno.motivo}</p>
                        <p className="text-[10px] text-primary/60 font-bold uppercase mt-1">📅 {turno.fecha?.split('-').reverse().join('/')} • ⏰ {turno.hora}hs</p>
                      </div>
                      <span className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase shadow-sm ${turno.estado === 'Confirmado' ? 'bg-green-500 text-white' : turno.estado === 'Cancelado' ? 'bg-red-500 text-white' : 'bg-accent-orange text-white'}`}>
                        {turno.estado}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;