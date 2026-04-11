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
          navigate("/admin");
          window.location.reload(); // Forzamos carga limpia para resetear estados globales
        } else {
          navigate("/");
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
    <main className="grow bg-background flex flex-col">
      <section className="bg-primary text-background pt-10 pb-20 lg:pt-16 lg:pb-32 px-4 sm:px-6 lg:px-8 border-b-8 border-accent-orange relative overflow-hidden flex-1 sm:min-h-[calc(100vh-80px)]">
        {/* Decoración de fondo */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[radial-gradient(circle_at_top_left,white,transparent_50%)]"></div>

        <div className="mx-auto max-w-7xl w-full relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">

            {/* Lado Izquierdo: Título y descripción con estilo */}
            <div className="w-full lg:w-5/12 space-y-6 text-center lg:text-left animate-fade-in">
              <span className="inline-block px-4 py-1.5 rounded-full border border-accent-orange text-accent-orange font-bold text-xs uppercase tracking-wider shadow-sm">
                Portal de Pacientes
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-none">
                {modoRecuperar ? 'Recuperá tu' : 'Accedé a tu'} <span className="text-accent-orange">{modoRecuperar ? 'Acceso' : 'Sistema'}</span>
              </h1>
              <p className="text-base sm:text-lg text-secondary/90 font-medium leading-relaxed max-w-2xl mx-auto">
                {modoRecuperar 
                  ? "Ingresá tu correo electrónico y establecé una nueva contraseña para volver a entrar al sistema."
                  : "Gestioná tus turnos en tiempo real, mantené al día tu historia clínica y conectate con nuestros profesionales. Todo de manera rápida, segura e intuitiva."
                }
              </p>

              <div className="pt-4 hidden lg:block">
                <Link to="/" className="inline-block text-secondary hover:text-white transition-colors font-semibold py-2 px-6 border-2 border-secondary/50 rounded-full hover:border-white">
                  &larr; Volver a la página web
                </Link>
              </div>
            </div>

            {/* Separador vertical sutil */}
            <div className="hidden lg:block w-px h-[400px] bg-secondary/20 shrink-0"></div>

            {/* Lado Derecho: Formulario (Tarjeta Gris Más Oscura con Tabs) */}
            <div className="w-full lg:w-6/12 relative max-w-md mx-auto lg:mx-0 animate-scale-up">

              <div className="rounded-4xl border border-secondary/30 bg-gray-200 p-8 sm:p-10 shadow-2xl relative z-10 overflow-hidden">

                {/* Switcher TABS (Login / Registro) - Ocultar si está en modo recuperar */}
                {!modoRecuperar && (
                  <div className="flex bg-gray-300 rounded-full p-1 mb-8 shadow-inner">
                    <button
                      onClick={() => toggleModo('login')}
                      className={`flex-1 py-2 text-sm font-black uppercase tracking-wider rounded-full transition-all duration-300 ${!isRegistro ? 'bg-primary text-white shadow-md' : 'text-primary/70 hover:text-primary'}`}
                    >
                      Iniciar Sesión
                    </button>
                    <button
                      onClick={() => toggleModo('registro')}
                      className={`flex-1 py-2 text-sm font-black uppercase tracking-wider rounded-full transition-all duration-300 ${isRegistro ? 'bg-primary text-white shadow-md' : 'text-primary/70 hover:text-primary'}`}
                    >
                      Registrarse
                    </button>
                  </div>
                )}

                {modoRecuperar && (
                  <button 
                    onClick={() => toggleModo('login')}
                    className="mb-6 text-xs font-black uppercase tracking-widest text-primary hover:text-accent-orange transition-colors flex items-center"
                  >
                    &larr; Volver al ingreso
                  </button>
                )}

                <div className="mb-6 text-center text-primary">
                  <h2 className="text-2xl font-black uppercase tracking-tight">
                    {modoRecuperar ? 'Reiniciar Clave' : isRegistro ? 'Crea tu nueva cuenta' : 'Ingresa a tu cuenta'}
                  </h2>
                  <p className="mt-2 text-sm font-medium text-text-light">
                    {modoRecuperar ? 'Ingresá los datos para el reseteo.' : isRegistro ? 'Únete a nuestra clínica hoy mismo.' : 'Completá tus datos para acceder.'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Mensaje de Error Dinámico */}
                  {error && (
                    <div className="bg-red-100/90 border-l-4 border-red-500 text-red-700 p-3 rounded text-sm font-bold text-center animate-pulse shadow-sm">
                      {error}
                    </div>
                  )}

                  {/* Mensaje de Éxito */}
                  {mensajeExito && (
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-3 rounded text-sm font-bold text-center shadow-sm">
                      {mensajeExito}
                    </div>
                  )}

                  {/* Campos EXTRAS si es REGISTRO */}
                  {isRegistro && !modoRecuperar && (
                    <div className="flex gap-4">
                      <div className="w-1/2">
                        <label htmlFor="nombre" className="block text-xs font-black text-text mb-1 uppercase tracking-wide">
                          Nombre
                        </label>
                        <input
                          id="nombre"
                          name="nombre"
                          type="text"
                          value={form.nombre}
                          onChange={handleChange}
                          className="w-full rounded-xl border-2 border-secondary/20 bg-white px-4 py-3 text-sm font-bold text-text placeholder-text-light outline-none transition-all focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/30 shadow-sm"
                          placeholder="Tu nombre"
                        />
                      </div>
                      <div className="w-1/2">
                        <label htmlFor="apellido" className="block text-xs font-black text-text mb-1 uppercase tracking-wide">
                          Apellido
                        </label>
                        <input
                          id="apellido"
                          name="apellido"
                          type="text"
                          value={form.apellido}
                          onChange={handleChange}
                          className="w-full rounded-xl border-2 border-secondary/20 bg-white px-4 py-3 text-sm font-bold text-text placeholder-text-light outline-none transition-all focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/30 shadow-sm"
                          placeholder="Tu apellido"
                        />
                      </div>
                    </div>
                  )}

                  {/* CAMPOS COMUNES (Email) */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-black text-text mb-1 uppercase tracking-wide">
                      Correo electrónico
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full rounded-xl border-2 border-secondary/20 bg-white px-4 py-3 text-sm font-bold text-text placeholder-text-light outline-none transition-all focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/30 shadow-sm"
                      required
                      placeholder="tu@email.com"
                    />
                  </div>

                  {/* Campo Contraseña (Nueva Password en caso de recuperar) */}
                  <div>
                    <label htmlFor="password" className="block text-xs font-black text-text mb-1 uppercase tracking-wide">
                      {modoRecuperar ? 'Nueva Contraseña' : 'Contraseña'}
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={form.password}
                      onChange={handleChange}
                      className="w-full rounded-xl border-2 border-secondary/20 bg-white px-4 py-3 text-sm font-bold text-text placeholder-text-light outline-none transition-all focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/30 shadow-sm"
                      required
                      minLength={4}
                      placeholder="••••••••"
                    />
                  </div>

                  {/* Campo Confirmar Contraseña solo en Recuperar */}
                  {modoRecuperar && (
                    <div>
                      <label htmlFor="confirmarPassword" className="block text-xs font-black text-text mb-1 uppercase tracking-wide">
                        Confirmar Nueva Contraseña
                      </label>
                      <input
                        id="confirmarPassword"
                        name="confirmarPassword"
                        type="password"
                        value={form.confirmarPassword}
                        onChange={handleChange}
                        className="w-full rounded-xl border-2 border-secondary/20 bg-white px-4 py-3 text-sm font-bold text-text placeholder-text-light outline-none transition-all focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/30 shadow-sm"
                        required
                        minLength={4}
                        placeholder="••••••••"
                      />
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={cargando}
                      className="w-full rounded-xl bg-accent-orange text-white py-3.5 text-sm font-bold uppercase tracking-wide shadow-lg transition-all duration-300 hover:brightness-110 hover:-translate-y-1 hover:shadow-xl active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {cargando ? 'Procesando...' : (modoRecuperar ? 'Actualizar Contraseña' : isRegistro ? 'Crear mi Cuenta' : 'Entrar al panel')}
                    </button>
                  </div>
                </form>

                {/* Link para Olvidé mi clave (Solo mostrar en Login) */}
                {!isRegistro && !modoRecuperar && (
                  <div className="mt-4 text-center">
                    <button 
                      onClick={() => toggleModo('recuperar')}
                      className="text-xs font-bold text-primary hover:text-accent-orange transition-colors"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>
                )}

                <p className="mt-6 text-center text-[10px] font-bold uppercase tracking-wider text-text-light">
                  <FaLock className="inline mb-1 mr-1" /> Tus datos se encuentran protegidos y encriptados.
                </p>

                <div className="mt-6 text-center lg:hidden">
                  <Link to="/" className="text-xs text-text-light font-bold hover:text-accent-orange transition-colors">
                    &larr; Volver al inicio
                  </Link>
                </div>
              </div>

              {/* Elementos decorativos flotantes de la tarjeta */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent-orange rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
