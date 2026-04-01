import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios.js";
import { useAuth } from "../../context/AuthContext.jsx";

const AppointmentForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    dni: "",
    email: "",
    telefono: "",
    doctor: "",
    fecha: "",
    hora: "",
    consulta: "",
  });

  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensaje({ texto: "", tipo: "" });

    // Si no está logueado, redirigir al login
    if (!user) {
      navigate("/login");
      return;
    }

    // Combinamos los datos del usuario logueado con el formulario
    const formData = {
      nombrePaciente: user.nombre,
      apellidoPaciente: user.apellido,
      dni: form.dni,
      email: user.email || form.email,
      telefono: form.telefono,
      profesional: form.doctor,
      fecha: form.fecha,
      hora: form.hora,
      motivo: form.consulta,
    };

    console.log("Datos que estoy a punto de enviar:", formData);

    try {
      await api.post("/turnos", formData);
      setMensaje({
        texto: "¡Turno solicitado con éxito! Nuestra asistente te contactará para confirmar.",
        tipo: "success",
      });
      setForm({
        dni: "",
        email: "",
        telefono: "",
        doctor: "",
        fecha: "",
        hora: "",
        consulta: "",
      });
    } catch (error) {
      console.error("Error al solicitar el turno:", error);
      setMensaje({
        texto: "Hubo un error al procesar tu solicitud. Por favor, intenta de nuevo o contáctanos por WhatsApp.",
        tipo: "error",
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/90 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-xl max-w-2xl mx-auto space-y-6 border border-secondary/60 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="text-center space-y-2">
        <p className="text-sm font-semibold tracking-[0.25em] uppercase text-primary/80">
          Reservá tu visita
        </p>
        <h2 className="text-3xl font-bold text-primary">
          Solicitar turno odontológico
        </h2>
        <p className="text-sm text-text/80">
          Completá tus datos y nos pondremos en contacto para confirmar el
          horario más conveniente.
        </p>
      </div>

      {/* Mensaje inline de éxito o error */}
      {mensaje.texto && (
        <div
          className={`flex items-start gap-3 p-4 rounded-xl text-sm font-semibold border ${
            mensaje.tipo === "success"
              ? "bg-green-50 border-green-200 text-green-700"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          <span className="text-lg leading-none">
            {mensaje.tipo === "success" ? "✅" : "❌"}
          </span>
          <span>{mensaje.texto}</span>
        </div>
      )}

      {/* Badge de usuario logueado o campos de nombre/apellido */}
      {user ? (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/5 border border-primary/20">
          <div className="bg-primary text-white w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0">
            {user.nombre?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <p className="text-xs font-semibold text-text/60 uppercase tracking-wide">Paciente</p>
            <p className="text-sm font-bold text-primary">
              {user.nombre} {user.apellido}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label htmlFor="nombre" className="block text-sm font-medium text-text/90">
              Nombre
            </label>
            <input
              id="nombre"
              name="nombre"
              placeholder="Ej: Juan"
              onChange={handleChange}
              className="w-full rounded-xl border border-accent/40 bg-white px-3 py-2.5 text-sm font-bold text-accent-orange shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              required
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="apellido" className="block text-sm font-medium text-text/90">
              Apellido
            </label>
            <input
              id="apellido"
              name="apellido"
              placeholder="Ej: Pérez"
              onChange={handleChange}
              className="w-full rounded-xl border border-accent/40 bg-white px-3 py-2.5 text-sm font-bold text-accent-orange shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              required
            />
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label
            htmlFor="dni"
            className="block text-sm font-medium text-text/90"
          >
            DNI
          </label>
          <input
            id="dni"
            name="dni"
            value={form.dni}
            placeholder="Ej: 12345678"
            onChange={handleChange}
            className="w-full rounded-xl border border-accent/40 bg-white px-3 py-2.5 text-sm font-bold text-accent-orange shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
            required
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="telefono"
            className="block text-sm font-medium text-text/90"
          >
            Teléfono de contacto
          </label>
          <input
            id="telefono"
            name="telefono"
            value={form.telefono}
            placeholder="Ej: +54 9 11 1234 5678"
            onChange={handleChange}
            className="w-full rounded-xl border border-accent/40 bg-white px-3 py-2.5 text-sm font-bold text-accent-orange shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
            required
          />
        </div>

        {/* Mostrar email solo si el usuario NO está logueado (si está, ya lo tenemos) */}
        {!user && (
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-text/90"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              placeholder="tu correo@ejemplo.com"
              onChange={handleChange}
              className="w-full rounded-xl border border-accent/40 bg-white px-3 py-2.5 text-sm font-bold text-accent-orange shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              required
            />
          </div>
        )}

        <div className="space-y-1">
          <label
            htmlFor="doctor"
            className="block text-sm font-medium text-text/90"
          >
            Profesional
          </label>
          <select
            id="doctor"
            name="doctor"
            value={form.doctor}
            onChange={handleChange}
            className="w-full rounded-xl border border-accent/40 bg-white px-3 py-2.5 text-sm font-bold text-accent-orange shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
            required
          >
            <option value="">Seleccionar profesional</option>
            <option value="dr_perez">Dr. Pérez — Odontología general</option>
            <option value="dra_gomez">Dra. Gómez — Ortodoncia</option>
            <option value="dr_fernandez">
              Dr. Fernández — Implantes y cirugía
            </option>
          </select>
        </div>

        <div className="space-y-1">
          <label
            htmlFor="fecha"
            className="block text-sm font-medium text-text/90"
          >
            Fecha tentativa
          </label>
          <input
            id="fecha"
            type="date"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
            className="w-full rounded-xl border border-accent/40 bg-white px-3 py-2.5 text-sm font-bold text-accent-orange shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
            required
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="hora"
            className="block text-sm font-medium text-text/90"
          >
            Hora tentativa
          </label>
          <input
            id="hora"
            type="time"
            name="hora"
            value={form.hora}
            onChange={handleChange}
            className="w-full rounded-xl border border-accent/40 bg-white px-3 py-2.5 text-sm font-bold text-accent-orange shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
            required
          />
        </div>
      </div>

      <div className="space-y-1">
        <label
          htmlFor="consulta"
          className="block text-sm font-medium text-text/90"
        >
          Motivo de consulta
        </label>
        <textarea
          id="consulta"
          name="consulta"
          value={form.consulta}
          placeholder="Contanos brevemente qué te gustaría consultar (dolor, limpieza, control, ortodoncia, etc.)."
          onChange={handleChange}
          className="w-full rounded-xl border border-accent/40 bg-white px-3 py-2.5 text-sm font-bold text-accent-orange shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
          rows={4}
        />
        <p className="text-xs text-text/70">
          Estos datos serán revisados por el equipo administrativo para
          coordinar tu turno con el profesional adecuado.
        </p>
      </div>

      <button
        type="submit"
        disabled={cargando}
        className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-md transition hover:bg-accent hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {cargando ? "Enviando..." : "Solicitar turno"}
      </button>
    </form>
  );
};

export default AppointmentForm;