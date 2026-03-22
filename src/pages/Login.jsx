import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.nombre || !form.apellido) return;
    login({
      nombre: form.nombre,
      apellido: form.apellido,
      email: form.email,
    });
    navigate("/turnos");
  };

  return (
    <main className="grow bg-background flex flex-col">
      <section className="bg-primary text-background pt-10 pb-20 lg:pt-16 lg:pb-32 px-4 sm:px-6 lg:px-8 border-b-8 border-accent-orange relative overflow-hidden flex-1 sm:min-h-[calc(100vh-80px)]">
        {/* Decoración de fondo */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[radial-gradient(circle_at_top_left,white,transparent_50%)]"></div>

        <div className="mx-auto max-w-7xl w-full relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">

            {/* Lado Izquierdo: Título y descripción */}
            <div className="w-full lg:w-5/12 space-y-6 text-center lg:text-left" data-aos="fade-right">
              <span className="inline-block px-4 py-1.5 rounded-full border border-accent-orange text-accent-orange font-bold text-xs uppercase tracking-wider shadow-sm">
                Portal de Pacientes
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-none">
                Accedé a tu <span className="text-accent-orange">Cuenta</span>
              </h1>
              <p className="text-base sm:text-lg text-secondary/90 font-medium leading-relaxed max-w-2xl mx-auto">
                Gestioná tus turnos y mantené al día tu historia clínica de manera rápida y segura.
              </p>

              <div className="pt-4 hidden lg:block">
                <Link to="/" className="inline-block text-secondary hover:text-white transition-colors font-semibold text-sm">
                  &larr; Volver al inicio
                </Link>
              </div>
            </div>

            {/* Separador vertical sutil */}
            <div className="hidden lg:block w-px h-80 bg-secondary/20 shrink-0"></div>

            {/* Lado Derecho: Formulario (Tarjeta Gris Más Oscura) */}
            <div className="w-full lg:w-6/12 relative max-w-md mx-auto lg:mx-0" data-aos="fade-left">
              <div className="rounded-3xl border border-secondary/30 bg-gray-200 p-8 sm:p-10 shadow-2xl relative z-10">
                <div className="mb-8 text-center text-primary">
                  <h2 className="text-3xl font-black uppercase tracking-tight">Iniciar sesión</h2>
                  <p className="mt-2 text-sm font-medium text-text-light">
                    Completá tus datos para reservar.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-bold text-text mb-1 uppercase tracking-wide">
                      Nombre
                    </label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      value={form.nombre}
                      onChange={handleChange}
                      className="w-full rounded-xl border-2 border-secondary/20 bg-white px-4 py-3 text-sm font-bold text-accent-orange placeholder-text-light outline-none transition-all focus:border-accent-orange focus:ring-4 focus:ring-accent-orange/20 shadow-sm"
                      required
                      placeholder="Ej. Juan"
                    />
                  </div>

                  <div>
                    <label htmlFor="apellido" className="block text-sm font-bold text-text mb-1 uppercase tracking-wide">
                      Apellido
                    </label>
                    <input
                      id="apellido"
                      name="apellido"
                      type="text"
                      value={form.apellido}
                      onChange={handleChange}
                      className="w-full rounded-xl border-2 border-secondary/20 bg-white px-4 py-3 text-sm font-bold text-accent-orange placeholder-text-light outline-none transition-all focus:border-accent-orange focus:ring-4 focus:ring-accent-orange/20 shadow-sm"
                      required
                      placeholder="Ej. Pérez"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-text mb-1 uppercase tracking-wide">
                      Correo electrónico
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full rounded-xl border-2 border-secondary/20 bg-white px-4 py-3 text-sm font-bold text-accent-orange placeholder-text-light outline-none transition-all focus:border-accent-orange focus:ring-4 focus:ring-accent-orange/20 shadow-sm"
                      required
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-bold text-text mb-1 uppercase tracking-wide">
                      Contraseña
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={form.password}
                      onChange={handleChange}
                      className="w-full rounded-xl border-2 border-secondary/20 bg-white px-4 py-3 text-sm font-bold text-accent-orange placeholder-text-light outline-none transition-all focus:border-accent-orange focus:ring-4 focus:ring-accent-orange/20 shadow-sm"
                      required
                      minLength={4}
                      placeholder="••••••••"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full rounded-xl bg-primary text-white py-3.5 text-sm font-bold uppercase tracking-wide shadow-lg transition-all duration-300 hover:brightness-110 hover:-translate-y-1 hover:shadow-xl active:scale-95"
                    >
                      Entrar
                    </button>
                  </div>
                </form>

                <p className="mt-6 text-center text-xs font-medium text-text-light">
                  Tus datos se guardan de forma segura para identificarte como paciente del consultorio.
                </p>

                <div className="mt-6 text-center lg:hidden">
                  <Link to="/" className="text-xs text-text-light font-bold hover:text-primary transition-colors">
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

