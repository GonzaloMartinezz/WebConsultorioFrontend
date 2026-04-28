import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import { FaGoogle, FaEnvelope, FaLock, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { useGoogleLogin, GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isRegistro, setIsRegistro] = useState(true);
  const [modoRecuperar, setModoRecuperar] = useState(false);

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    dni: "",
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

  // =============================================
  // LOGICA LOGIN/REGISTRO CON GOOGLE (Secure flow)
  // =============================================
  const handleGoogleSuccess = async (tokenResponse) => {
    setCargando(true);
    setError("");
    try {
      // Enviamos el Token Seguro de Google al Backend
      const respuesta = await api.post('/auth/google', {
        idToken: tokenResponse.credential
      });

      const usuarioLogueado = respuesta.data.usuario || respuesta.data;
      login(respuesta.data);
      if (respuesta.data.token) localStorage.setItem('token', respuesta.data.token);
      localStorage.setItem('perfilUsuario', JSON.stringify(usuarioLogueado));

      // 3. Redirigir segun el rol
      if (usuarioLogueado && usuarioLogueado.rol && usuarioLogueado.rol.toLowerCase() === 'admin') {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Error Google Login:", err);
      setError("Fallo la vinculación con Google. Verifique el servidor.");
    } finally {
      setCargando(false);
    }
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
          dni: form.dni, // Clave para vincular con Historia Clínica
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
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden font-sans">

      {/* =========================================
          FONDO INTEGRAL CON IMAGEN Y DIFUMINADOS
          ========================================= */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{ backgroundImage: "url('/escritorio erina 3.jpeg')" }}
      >
        <div className="absolute inset-0 bg-linear-to-br from-black/95 via-black/80 to-[#FF7800]/30 mix-blend-multiply"></div>
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
        <div className="hidden lg:flex flex-col items-center animate-fade-in-left group lg:mt-12 lg:translate-y-8">
          <div className="w-56 h-56 md:w-72 md:h-72 rounded-full p-2 bg-linear-to-br from-white/10 to-transparent backdrop-blur-3xl border border-white/10 shadow-[0_0_80px_rgba(255,120,0,0.1)] relative overflow-hidden flex items-center justify-center">
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
        <div className="w-full max-w-[520px] animate-fade-in-up">
          <div className="bg-black/20 backdrop-blur-3xl border border-white/5 p-6 md:p-8 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.4)] relative overflow-hidden group">

            {/* Blushes internos al form */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-orange/10 rounded-full blur-[60px] -mr-16 -mt-16"></div>

            <div className="relative z-10">
              <div className="flex bg-white/5 p-1 rounded-xl mb-4 border border-white/5">
                <button 
                  onClick={() => toggleModo('registro')}
                  className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${isRegistro && !modoRecuperar ? 'bg-accent-orange text-white shadow-lg' : 'text-white/40 hover:text-white/60'}`}
                >
                  Registro
                </button>
                <button 
                  onClick={() => toggleModo('login')}
                  className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${!isRegistro && !modoRecuperar ? 'bg-accent-orange text-white shadow-lg' : 'text-white/40 hover:text-white/60'}`}
                >
                  Ingreso
                </button>
              </div>

              <div className="mb-4 text-center">
                <h1 className="text-2xl font-black text-white mb-1 tracking-tighter leading-none">
                  {modoRecuperar ? 'Recuperar Clave' : isRegistro ? 'Bienvenido' : 'Hola de Nuevo'}
                </h1>
                <p className="text-white/40 font-bold text-[9px] uppercase tracking-widest opacity-80">
                  {modoRecuperar ? 'Ingresa tus nuevos datos' : isRegistro ? 'Crea tu perfil clínico digital' : 'Accede a tu cuenta de paciente'}
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
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase tracking-widest text-white/30 px-1 italic">Nombre</label>
                        <input name="nombre" value={form.nombre} onChange={handleChange} required className="w-full bg-white/3 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white focus:bg-white/8 focus:border-accent-orange/50 transition-all outline-none" placeholder="JUAN" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase tracking-widest text-white/30 px-1 italic">Apellido</label>
                        <input name="apellido" value={form.apellido} onChange={handleChange} required className="w-full bg-white/3 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white focus:bg-white/8 focus:border-accent-orange/50 transition-all outline-none" placeholder="MARTÍNEZ" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase tracking-widest text-accent-orange px-1">Identidad (DNI)</label>
                        <input name="dni" value={form.dni} onChange={handleChange} required className="w-full bg-white/5 border border-accent-orange/20 rounded-xl px-4 py-2.5 text-xs text-white focus:bg-white/10 focus:border-accent-orange outline-none shadow-[0_0_15px_rgba(255,145,0,0.1)]" placeholder="12345678" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase tracking-widest text-white/30 px-1 italic">Teléfono</label>
                        <input name="telefono" value={form.telefono} onChange={handleChange} required className="w-full bg-white/3 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white focus:bg-white/8 focus:border-accent-orange/50 transition-all outline-none" placeholder="381" />
                      </div>
                    </div>
                  </div>
                )}


                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-white/30 px-1 italic">Correo Electrónico</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-orange/40 text-[10px]" />
                    <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full bg-white/3 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:bg-white/8 focus:border-accent-orange/50 transition-all outline-none" placeholder="CORREO@EJEMPLO.COM" />
                  </div>
                </div>

                {!modoRecuperar && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase tracking-widest text-white/30 px-1 italic">Contraseña</label>
                      <div className="relative">
                        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-orange/40 text-[10px]" />
                        <input name="password" type="password" value={form.password} onChange={handleChange} required className="w-full bg-white/3 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:bg-white/8 focus:border-accent-orange/50 transition-all outline-none" placeholder="••••" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase tracking-widest text-white/30 px-1 italic">Repetir</label>
                      <div className="relative">
                        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-orange/40 text-[10px]" />
                        <input name="confirmarPassword" type="password" value={form.confirmarPassword} onChange={handleChange} required className="w-full bg-white/3 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:bg-white/8 focus:border-accent-orange/50 transition-all outline-none" placeholder="••••" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <button disabled={cargando} className="w-full relative group/btn overflow-hidden bg-accent-orange text-white py-3.5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all hover:brightness-110 active:scale-[0.98] shadow-[0_10px_30px_rgba(255,120,0,0.4)] disabled:opacity-50">
                    <div className="absolute inset-0 bg-linear-to-r from-orange-400 to-orange-600 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500"></div>
                    <span className="relative z-10">{cargando ? 'MODO SEGURO...' : modoRecuperar ? 'ACTUALIZAR' : isRegistro ? 'CREAR MI CUENTA' : 'INGRESAR'}</span>
                  </button>
                </div>
              </form>


              {/* GOOGLE AUTH COMO BOTON PREMIUM */}
              <div className="mt-4 flex flex-col items-center gap-3">
                <div className="flex items-center w-full gap-4 opacity-10">
                  <div className="h-px bg-white grow"></div>
                  <span className="text-[9px] text-white font-black uppercase tracking-widest">o</span>
                  <div className="h-px bg-white grow"></div>
                </div>
                
                <div className="w-full flex justify-center scale-90">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => setError("Error al conectar con Google")}
                    useOneTap
                    theme="filled_blue"
                    shape="pill"
                    size="large"
                    text="continue_with"
                    width="320"
                    locale="es"
                  />
                </div>
              </div>

              <div className="mt-4 text-center flex flex-col gap-2">
                <button onClick={() => toggleModo(isRegistro ? 'login' : 'registro')} className="text-[10px] font-black text-white/30 hover:text-accent-orange transition-all uppercase tracking-widest">
                  {isRegistro ? '¿YA TENÉS CUENTA? INICIÁ SESIÓN' : '¿SOS NUEVO? REGISTRATE AQUÍ'}
                </button>
                {!isRegistro && (
                  <button onClick={() => setModoRecuperar(true)} className="text-[8px] font-black text-white/5 hover:text-white transition-all uppercase tracking-widest">¿Olvidaste tu contraseña de acceso?</button>
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
