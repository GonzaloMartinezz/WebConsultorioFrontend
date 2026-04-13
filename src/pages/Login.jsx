import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios.js";
import { FaLock } from 'react-icons/fa';
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Estado para alternar entre "Iniciar Sesión", "Registrarse" y "Recuperar"
  const [isRegistro, setIsRegistro] = useState(false);
  const [modoRecuperar, setModoRecuperar] = useState(false);

  // Estado del formulario
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensajeExito("");
    setCargando(true);

    try {
      if (modoRecuperar) {
        // VALIDACIÓN DE RECUPERACIÓN
        if (!form.email || !form.password || !form.confirmarPassword) {
          setError("Por favor, completa todos los campos.");
          setCargando(false);
          return;
        }

        if (form.password !== form.confirmarPassword) {
          setError("Las contraseñas no coinciden.");
          setCargando(false);
          return;
        }

        await api.post('/auth/recuperar-password', {
          email: form.email.toLowerCase(),
          nuevaPassword: form.password
        });

        setMensajeExito("¡Contraseña actualizada! Ya puedes iniciar sesión.");
        setTimeout(() => toggleModo('login'), 3000);

      } else if (isRegistro) {
        // VALIDACIÓN DE REGISTRO
        if (!form.nombre || !form.apellido || !form.email || !form.password) {
          setError("Por favor, completa todos los campos del registro.");
          setCargando(false);
          return;
        }

        // 1. Mandamos petición de registro
        const respuesta = await api.post('/auth/register', {
          nombre: form.nombre,
          apellido: form.apellido,
          email: form.email.toLowerCase(),
          password: form.password,
          rol: "paciente"
        });

        // 2. Guardamos sesión vía AuthContext (actualiza React state + localStorage)
        login(respuesta.data);

        // 3. Volvemos al portal de pacientes
        navigate("/");

      } else {
        // VALIDACIÓN DE INGRESO
        if (!form.email || !form.password) {
          setError("Por favor, ingresa tu correo y contraseña.");
          setCargando(false);
          return;
        }

        // 1. Mandamos petición de Login
        const respuesta = await api.post('/auth/login', {
          email: form.email.toLowerCase(),
          password: form.password
        });

        // 🕵️‍♂️ EL CHIVATO: Esto nos dirá qué manda el backend exactamente (Míralo en F12)
        console.log("Datos que llegaron del servidor:", respuesta.data);

        // 2. Guardamos la sesión vía AuthContext
        // Cubrimos ambas posibilidades: por si tu backend lo llama "usuario", "user" o viene directo
        const usuarioLogueado = respuesta.data.usuario || respuesta.data.user || respuesta.data;

        login(respuesta.data); // Mantiene compatibilidad con AuthContext

        // Guardamos explícitamente para mayor seguridad
        if (respuesta.data.token) localStorage.setItem('token', respuesta.data.token);
        localStorage.setItem('perfilUsuario', JSON.stringify(usuarioLogueado));

        // 3. Redirección Inteligente y a prueba de mayúsculas
        if (usuarioLogueado && usuarioLogueado.rol && usuarioLogueado.rol.toLowerCase() === 'admin') {
          navigate("/admin/dashboard"); // Si es admin
        } else {
          navigate("/"); // Si es un PACIENTE, lo mandamos al Inicio
        }
      }
    } catch (err) {
      console.error("Error en login:", err);
      setError(
        err.response?.data?.error ||
        (modoRecuperar ? "Error al recuperar cuenta." : isRegistro ? "Error al crear cuenta. Puede que el correo ya exista." : "Error al Iniciar Sesión. Verifica tus datos.")
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0f0f0f] flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans text-gray-200">

      {/* Subtle Data Grid Background Pattern */}
    <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

    {/* HEADER LOGO */}
    <div className="z-10 flex flex-col items-center mb-8 animate-fade-in">
      <div className="w-14 h-14 bg-gradient-to-br from-orange-300 to-orange-500 rounded-2xl flex items-center justify-center mb-4 shadow-[0_0_40px_rgba(251,146,60,0.3)]">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
      </div>
      <h1 className="text-2xl font-black text-orange-200 tracking-[0.2em] uppercase">C&M Dental Core</h1>
      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] mt-1">Clinical Intelligence Unit</p>
    </div>

    {/* AUTH CARD */}
    <div className="z-10 w-full max-w-[420px] bg-[#141414] border border-zinc-800/80 rounded-2xl p-8 shadow-2xl relative">

      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-2">
          {modoRecuperar ? 'Password Recovery Protocol' : isRegistro ? 'System Registration' : 'System Authentication'}
        </h2>
        <p className="text-xs font-medium text-gray-500">
          {modoRecuperar ? 'Establish a new secure key for your credentials.' : isRegistro ? 'Request new clearance to access the database.' : 'Initialize secure session via encrypted gateway.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Mensajes de Sistema */}
        {error && (
          <div className="bg-red-950/40 border border-red-900/50 text-red-500 p-3 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> {error}
          </div>
        )}
        {mensajeExito && (
          <div className="bg-green-950/40 border border-green-900/50 text-green-500 p-3 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> {mensajeExito}
          </div>
        )}

        {/* CAMPOS REGISTRO EXTRAS */}
        {isRegistro && !modoRecuperar && (
          <div className="flex gap-4">
            <div className="w-1/2 space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Operator Name</label>
              <input
                name="nombre" type="text" value={form.nombre} onChange={handleChange} required
                className="w-full bg-[#1e1e1e] border border-zinc-800 rounded-lg px-4 py-3 text-sm text-gray-200 outline-none focus:border-orange-500/50 transition-colors"
              />
            </div>
            <div className="w-1/2 space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Surname</label>
              <input
                name="apellido" type="text" value={form.apellido} onChange={handleChange} required
                className="w-full bg-[#1e1e1e] border border-zinc-800 rounded-lg px-4 py-3 text-sm text-gray-200 outline-none focus:border-orange-500/50 transition-colors"
              />
            </div>
          </div>
        )}

        {/* USER EMAIL */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {isRegistro ? 'Network Email' : 'Terminal ID / Email'}
          </label>
          <div className="relative">
            <input
              name="email" type="email" value={form.email} onChange={handleChange} required
              placeholder="operator@cm-dental.net"
              className="w-full bg-[#1e1e1e] border border-zinc-800 rounded-lg pl-10 pr-4 py-3 text-sm text-gray-200 outline-none focus:border-orange-500/50 transition-colors placeholder:text-zinc-700 font-mono"
            />
            <svg className="absolute top-1/2 left-4 transform -translate-y-1/2 text-zinc-600" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" /></svg>
          </div>
        </div>

        {/* PASSWORD */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-end">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              {modoRecuperar ? 'New Access Key' : 'Access Key'}
            </label>
            {!isRegistro && !modoRecuperar && (
              <button type="button" onClick={() => toggleModo('recuperar')} className="text-[9px] font-bold text-orange-400 hover:text-orange-300 uppercase tracking-widest transition-colors">
                Recover Key
              </button>
            )}
            {modoRecuperar && (
              <button type="button" onClick={() => toggleModo('login')} className="text-[9px] font-bold text-orange-400 hover:text-orange-300 uppercase tracking-widest transition-colors">
                Cancel Auth Override
              </button>
            )}
          </div>
          <div className="relative">
            <input
              name="password" type="password" value={form.password} onChange={handleChange} required minLength={4}
              placeholder="••••••••••••"
              className="w-full bg-[#1e1e1e] border border-zinc-800 rounded-lg pl-10 pr-10 py-3 text-sm text-gray-200 outline-none focus:border-orange-500/50 transition-colors placeholder:text-zinc-700 font-mono tracking-widest"
            />
            <svg className="absolute top-1/2 left-4 transform -translate-y-1/2 text-zinc-600" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </div>
        </div>

        {/* CONFIRMAR PASSWORD */}
        {modoRecuperar && (
          <div className="space-y-1.5 pt-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Confirm New Key</label>
            <input
              name="confirmarPassword" type="password" value={form.confirmarPassword} onChange={handleChange} required minLength={4}
              placeholder="••••••••••••"
              className="w-full bg-[#1e1e1e] border border-zinc-800 rounded-lg pl-10 py-3 text-sm text-gray-200 outline-none focus:border-orange-500/50 transition-colors placeholder:text-zinc-700 font-mono tracking-widest"
            />
          </div>
        )}

        {/* MAIN BUTTON */}
        <div className="pt-4">
          <button
            type="submit" disabled={cargando}
            className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-orange-950 px-4 py-3.5 rounded-lg font-black text-sm uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(251,146,60,0.15)] disabled:opacity-50"
          >
            {cargando ? 'PROCESSING...' : modoRecuperar ? 'UPDATE CLEARANCE' : isRegistro ? 'INITIALIZE NODE' : 'EXECUTE ACCESS'}
            {!cargando && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" /></svg>}
          </button>
        </div>

        {/* ALTERNATIVE PROTOCOLS (Solo UI Visual como en el Mockup) */}
        {!modoRecuperar && !isRegistro && (
          <div className="pt-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px bg-zinc-800 flex-1"></div>
              <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest bg-[#141414] px-2">Alternative Protocols</span>
              <div className="h-px bg-zinc-800 flex-1"></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="bg-[#1a1a1a] border border-zinc-800 text-gray-400 hover:text-gray-200 py-3 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:border-zinc-700 transition-colors flex-col xl:flex-row shadow-inner">
                Google Auth
              </button>
              <button type="button" className="bg-[#1a1a1a] border border-zinc-800 text-gray-400 hover:text-gray-200 py-3 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:border-zinc-700 transition-colors flex-col xl:flex-row shadow-inner">
                Biometric
              </button>
            </div>
          </div>
        )}

      </form>
    </div>

    {/* FOOTER SWITCHER */}
    <div className="mt-8 text-center z-10 flex flex-col gap-4 items-center">
      <p className="text-xs text-gray-500 font-medium">
        {isRegistro ? 'Current clearance authorized?' : 'Unregistered terminal?'}
        <button onClick={() => toggleModo(isRegistro ? 'login' : 'registro')} className="ml-2 font-bold text-orange-400 hover:text-orange-300 transition-colors">
          {isRegistro ? 'Initialize Session' : 'Request Credentials'}
        </button>
      </p>

      <div className="flex gap-6 mt-4 opacity-50">
        <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500 flex items-center gap-1.5"><span className="w-1 h-1 bg-gray-500 rounded-full"></span> AES-256 SECURED</p>
        <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500">SYSTEM V4.0.2</p>
      </div>
    </div>

    {/* TELEMETRY ABSOLUTE CORNER */}
    <div className="absolute bottom-6 left-6 z-10 hidden md:block">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Live Telemetry</p>
      <p className="text-[9px] font-mono text-gray-600 uppercase flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
        NODE_CONNECTED: PAR-04
      </p>
    </div>

    <div className="absolute top-6 left-6 z-10 hidden md:block">
      <Link to="/" className="text-[10px] font-bold text-gray-500 hover:text-orange-400 uppercase tracking-widest transition-colors flex items-center gap-2">
        &larr; Exit Secure Node
      </Link>
    </div>
  </main> 
  );
};

export default Login;
