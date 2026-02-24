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
    <section className="py-10 sm:py-14 md:py-16">
      <div className="mx-auto max-w-md px-4">
        <div className="rounded-3xl border border-secondary/80 bg-white p-8 shadow-xl">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-primary">Iniciar sesión</h1>
            <p className="mt-1 text-sm text-text/80">
              Completá tus datos para reservar turnos en Martínez Cárcara.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-text"
              >
                Nombre
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                value={form.nombre}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-secondary/80 bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                required
              />
            </div>

            <div>
              <label
                htmlFor="apellido"
                className="block text-sm font-medium text-text"
              >
                Apellido
              </label>
              <input
                id="apellido"
                name="apellido"
                type="text"
                value={form.apellido}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-secondary/80 bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text"
              >
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-secondary/80 bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-text"
              >
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-secondary/80 bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                required
                minLength={4}
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-primary py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-md transition hover:bg-accent"
            >
              Entrar
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-text/70">
            Los datos se guardan solo en este navegador para identificarte como
            paciente.
          </p>

          <p className="mt-4 text-center">
            <Link to="/" className="text-xs text-text/70 hover:text-primary">
              ← Volver al inicio
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;

