import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios.js';

const PortalAcceso = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ nombre: '', apellido: '', email: '', password: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      try {
        const res = await api.post('/auth/login', { email: formData.email, password: formData.password });
        navigate('/inicio');
      } catch (error) {
        alert("Error al iniciar sesión. Comprueba tus credenciales.");
        console.error(error);
      }
    } else {
      // Petición real para crear en la base de datos
      try {
        await api.post('/auth/register', { 
          nombre: formData.nombre, 
          apellido: formData.apellido, 
          email: formData.email, 
          password: formData.password 
        });
        alert("¡Cuenta creada exitosamente! Ahora ingresa tus datos para iniciar sesión.");
        toggleMode(); // Cambia a Iniciar Sesión y vacía los inputs
      } catch (error) {
        alert("Error al registrar. Verifica los datos o puede que el correo ya exista.");
        console.error(error);
      }
    }
  };

  return (
    <main className="relative bg-[#3E2723] overflow-hidden min-h-screen flex items-center justify-center p-4">
      {/* Fondo decorativo radial sutil */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_top_left,white,transparent_50%)]"></div>
      
      <div className="mx-auto w-full max-w-5xl z-10 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* COLUMNA IZQUIERDA: Formulario de Registro / Ingreso */}
          {/* Tarjeta translúcida para visibilidad sobre fondo marrón oscuro */}
          <div className="bg-black/20 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-white/20" data-aos="fade-right">
            <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 text-white font-extrabold text-xs mb-3 tracking-wide shadow-sm border border-white/10">
              Portal de Pacientes
            </span>
            <h2 className="text-2xl md:text-3xl font-black mb-1 text-white uppercase tracking-tight drop-shadow-md">
              {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
            </h2>
            <p className="text-white/90 mb-6 text-sm font-medium">
              {isLogin 
                ? "Ingresa para acceder a todos los beneficios y gestionar tus turnos." 
                : "Regístrate gratis para empezar a usar la plataforma."}
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              {!isLogin && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-white/90 mb-1 uppercase tracking-widest">Nombre</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required className="w-full rounded-xl bg-white/10 border border-white/20 px-3 py-2.5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-orange font-bold text-sm transition-all" placeholder="Ej. Juan" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-white/90 mb-1 uppercase tracking-widest">Apellido</label>
                    <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} required className="w-full rounded-xl bg-white/10 border border-white/20 px-3 py-2.5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-orange font-bold text-sm transition-all" placeholder="Ej. Pérez" />
                  </div>
                </div>
              )}
              <div>
                <label className="block text-xs font-bold text-white/90 mb-1 uppercase tracking-widest">Correo Electrónico</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full rounded-xl bg-white/10 border border-white/20 px-3 py-2.5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-orange font-bold text-sm transition-all" placeholder="tucorreo@email.com" />
              </div>
              <div>
                <label className="block text-xs font-bold text-white/90 mb-1 uppercase tracking-widest">Contraseña</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full rounded-xl bg-white/10 border border-white/20 px-3 py-2.5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-orange font-bold text-sm transition-all" placeholder="••••••••" />
              </div>
              
              <button type="submit" className="w-full mt-4 bg-accent-orange hover:bg-white text-white hover:text-accent-orange font-black py-3 rounded-xl shadow-lg transition-all active:scale-95 uppercase tracking-widest text-sm">
                {isLogin ? "Ingresar a la Plataforma" : "Registrarse ahora"}
              </button>
            </form>

            <div className="mt-5 text-center pt-4 border-t border-white/20">
              <button onClick={toggleMode} type="button" className="text-xs font-bold text-white/80 hover:text-white transition-colors underline decoration-white/30 underline-offset-4">
                {isLogin ? "¿No tienes cuenta? Regístrate aquí" : "¿Ya tienes cuenta? Inicia sesión"}
              </button>
            </div>
            
            <div className="mt-3 text-center">
               <button type="button" onClick={() => navigate('/inicio')} className="text-xs font-extrabold text-white/50 hover:text-white transition-colors">
                 O continuar como invitado &rarr;
               </button>
            </div>
          </div>

          {/* COLUMNA DERECHA: Logo Grande y Centrado con fondo negro/oscuro */}
          <div className="flex flex-col items-center justify-center text-center" data-aos="fade-left" data-aos-delay="200">
            {/* Usamos bg-primary (el color oscuro del navbar) */}
            <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-full bg-primary flex items-center justify-center shadow-2xl border-4 border-accent-orange/80 overflow-hidden relative transform hover:scale-105 transition-transform duration-500">
              <img src="/Logo Principal.png" alt="Logo Centro Odontológico" className="w-full h-full object-contain p-4 scale-110 translate-y-2" />
            </div>
            <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Centro Clínico
            </h1>
            <p className="text-lg sm:text-lg lg:text-xl text-white font-extrabold uppercase tracking-[0.2em] mt-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Carcara • Martínez
            </p>
          </div>

        </div>
      </div>
    </main>
  );
};

export default PortalAcceso;
