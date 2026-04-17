import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import { FaGoogle, FaEnvelope, FaLock, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isRegistro, setIsRegistro] = useState(false);
  const [modoRecuperar, setModoRecuperar] = useState(false);

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    password: "",
    confirmarPassword: "",
  });
  const [error, setError] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleModo = (modo) => {
    if (modo === 'registro') {
      setIsRegistro(true);
      setModoRecuperar(false);
    } else if (modo === 'login') {
      setIsRegistro(false);
      setModoRecuperar(false);
    } else if (modo === 'recuperar') {
      setModoRecuperar(true);
    }
    setError("");
    setMensajeExito("");
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensajeExito("");

    if (form.password !== form.confirmarPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setCargando(true);
    try {
      if (modoRecuperar) {
        await api.post('/auth/recuperar-password', {
          email: form.email.toLowerCase(),
          nuevaPassword: form.password
        });
        setMensajeExito("¡Contraseña actualizada!");
        setTimeout(() => toggleModo('login'), 2000);
      } else if (isRegistro) {
        const respuesta = await api.post('/auth/register', {
          nombre: form.nombre,
          apellido: form.apellido,
          email: form.email.toLowerCase(),
          telefono: form.telefono || '',
          password: form.password,
          rol: "paciente"
        });
        login(respuesta.data);
        if (respuesta.data.token) localStorage.setItem('token', respuesta.data.token);
        localStorage.setItem('perfilUsuario', JSON.stringify(respuesta.data.usuario || respuesta.data));
        navigate("/");
      } else {
        const respuesta = await api.post('/auth/login', {
          email: form.email.toLowerCase(),
          password: form.password
        });
        const usuarioLogueado = respuesta.data.usuario || respuesta.data.user || respuesta.data;
        login(respuesta.data);
        if (respuesta.data.token) localStorage.setItem('token', respuesta.data.token);
        localStorage.setItem('perfilUsuario', JSON.stringify(usuarioLogueado));
        if (usuarioLogueado && usuarioLogueado.rol && usuarioLogueado.rol.toLowerCase() === 'admin') {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || "Error en los datos ingresados.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans">

      {/* =========================================
          FONDO INTEGRAL CON IMAGEN Y DIFUMINADOS
          ========================================= */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{ backgroundImage: "url('/escritorio erina 3.jpeg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/80 to-[#FF7800]/30 mix-blend-multiply"></div>
        {/* Difuminados Naranja y Negro extendidos */}
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-accent-orange/10 rounded-full blur-[180px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-accent-orange/15 rounded-full blur-[200px]"></div>
      </div>

      {/* Branding superior - Mas sutil */}
      <div className="absolute top-8 left-8 flex items-center gap-2 group cursor-pointer transition-all hover:scale-105 z-50 text-white/40 hover:text-white" onClick={() => navigate('/')}>
        <div className="w-8 h-8 rounded-lg bg-accent-orange/20 border border-white/10 flex items-center justify-center text-white">
          <FaLock className="text-xs" />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">C&M Dental Admin V4.0</span>
      </div>

      {/* =========================================
          CONTENIDO PRINCIPAL: LOGO IZQ + FORM CENTRO
          ========================================= */}
      <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col lg:flex-row items-center justify-between gap-12">

        {/* LADO IZQUIERDO: LOGO CIRCULAR GIGANTE Y ESTETICO */}
        <div className="hidden lg:flex flex-col items-center animate-fade-in-left group">
          <div className="w-56 h-56 md:w-72 md:h-72 rounded-full p-2 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-3xl border border-white/10 shadow-[0_0_80px_rgba(255,120,0,0.1)] relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-accent-orange/5 group-hover:bg-accent-orange/15 transition-all duration-700"></div>
            {/* Imagen del logo que cubre los bordes del circulo */}
            <img
              src="/Logo Principal marron 2.png"
              alt="Logo Oficial"
              className="w-full h-full object-cover scale-110"
            />
          </div>
          <div className="mt-8 text-center">
            <h2 className="text-4xl font-black text-white leading-tight uppercase tracking-[0.3em] drop-shadow-lg">
              C<span className="text-accent-orange">ARCARA</span> • M<span className="text-accent-orange">ARTÍNEZ</span>
            </h2>
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.8em] mt-2">Centro Odontológico</p>
          </div>
        </div>

        {/* CENTRO: FORMULARIO GLASSMORPHISM INTEGRADO (SI MODAL) */}
        <div className="w-full max-w-[440px] animate-fade-in-up">
          <div className="bg-black/10 backdrop-blur-2xl border border-white/5 p-8 md:p-12 rounded-[3.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.3)] relative overflow-hidden group">

            {/* Blushes internos al form */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-orange/10 rounded-full blur-[60px] -mr-16 -mt-16"></div>

            <div className="relative z-10">
              <div className="mb-10 text-center">
                <h1 className="text-4xl font-black text-white mb-3 tracking-tighter leading-none">
                  {modoRecuperar ? 'Recuperar' : isRegistro ? 'Crea tu Cuenta' : 'Siguiente Paso'}
                </h1>
                <p className="text-white/40 font-bold text-xs uppercase tracking-widest opacity-80">
                  {isRegistro ? 'Portal Digital del Paciente' : 'Acceso al historial clínico digital'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="bg-red-500/10 border-l-4 border-red-500 text-red-400 p-4 rounded-2xl text-[10px] font-black flex items-center gap-3 animate-shake">
                    <FaExclamationCircle /> {error.toUpperCase()}
                  </div>
                )}
                {mensajeExito && (
                  <div className="bg-green-500/10 border-l-4 border-green-500 text-green-400 p-4 rounded-2xl text-[10px] font-black flex items-center gap-3">
                    <FaCheckCircle /> {mensajeExito.toUpperCase()}
                  </div>
                )}

                {isRegistro && !modoRecuperar && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30 px-1 italic">Nombre</label>
                      <input name="nombre" value={form.nombre} onChange={handleChange} required className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-sm text-white focus:bg-white/[0.08] focus:border-accent-orange/50 transition-all outline-none" placeholder="JUAN" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30 px-1 italic">Apellido</label>
                      <input name="apellido" value={form.apellido} onChange={handleChange} required className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-sm text-white focus:bg-white/[0.08] focus:border-accent-orange/50 transition-all outline-none" placeholder="MARTÍNEZ" />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 px-1 italic">Correo Electrónico</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-accent-orange/40" />
                    <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-12 pr-5 py-4 text-sm text-white focus:bg-white/[0.08] focus:border-accent-orange/50 transition-all outline-none" placeholder="CORREO@EJEMPLO.COM" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 px-1 italic">Contraseña</label>
                  <div className="relative">
                    <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-accent-orange/40" />
                    <input name="password" type="password" value={form.password} onChange={handleChange} required className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-12 pr-5 py-4 text-sm text-white focus:bg-white/[0.08] focus:border-accent-orange/50 transition-all outline-none" placeholder="••••••••" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 px-1 italic">Confirmar Clave</label>
                  <div className="relative">
                    <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-accent-orange/40" />
                    <input name="confirmarPassword" type="password" value={form.confirmarPassword} onChange={handleChange} required className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-12 pr-5 py-4 text-sm text-white focus:bg-white/[0.08] focus:border-accent-orange/50 transition-all outline-none" placeholder="••••••••" />
                  </div>
                </div>

                <div className="pt-4">
                  <button disabled={cargando} className="w-full relative group/btn overflow-hidden bg-accent-orange text-white py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[11px] transition-all hover:brightness-110 active:scale-[0.98] shadow-[0_15px_40px_rgba(255,120,0,0.4)] disabled:opacity-50">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-500"></div>
                    <span className="relative z-10">{cargando ? 'MODO SEGURO...' : modoRecuperar ? 'ACTUALIZAR' : isRegistro ? 'CREAR MI CUENTA' : 'INGRESAR'}</span>
                  </button>
                </div>
              </form>

              {/* GOOGLE AUTH AL FINAL COMO BOTON PREMIUM */}
              <button onClick={handleGoogleLogin} className="w-full mt-6 bg-white/[0.02] border border-white/5 hover:bg-white/[0.08] py-4 rounded-2xl flex items-center justify-center gap-4 text-white font-black text-[10px] uppercase tracking-widest transition-all group/google">
                <FaGoogle className="text-accent-orange text-lg group-hover/google:scale-110 transition-transform" /> Iniciar con Google
              </button>

              <div className="mt-8 text-center flex flex-col gap-3">
                <button onClick={() => toggleModo(isRegistro ? 'login' : 'registro')} className="text-xs font-black text-white/40 hover:text-accent-orange transition-all uppercase tracking-widest">
                  {isRegistro ? '¿YA TENÉS CUENTA? INICIÁ SESIÓN' : '¿SOS NUEVO? REGISTRATE AQUÍ'}
                </button>
                {!isRegistro && (
                  <button onClick={() => setModoRecuperar(true)} className="text-[9px] font-black text-white/10 hover:text-white transition-all uppercase tracking-widest">¿Olvidaste tu contraseña de acceso?</button>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Login;
