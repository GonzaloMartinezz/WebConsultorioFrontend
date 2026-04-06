import { useState, useEffect } from "react";
import api from "../../api/axios.js";
import { useAuth } from "../../context/AuthContext.jsx";

const AppointmentForm = () => {
  const { user } = useAuth();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    email: "",
    telefono: "",
    doctor: "",
    fecha: "",
    horaTentativa: "",
    motivo: "",
  });

  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        nombre: user.nombre || prev.nombre,
        apellido: user.apellido || prev.apellido,
        email: user.email || prev.email,
        telefono: user.telefono || prev.telefono,
      }));
    }
  }, [user]);

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

    // Preparar objeto para el Backend (DB)
    const formDataBackend = {
      nombrePaciente: form.nombre,
      apellidoPaciente: form.apellido,
      dni: form.dni,
      email: form.email,
      telefono: form.telefono,
      profesional: form.doctor,
      fecha: form.fecha,
      hora: form.horaTentativa, // Grabamos la franja horaria en la DB
      motivo: form.motivo,
      estado: 'Pendiente'
    };

    try {
      // 1. Guardar primero en MongoDB para la Agenda Admin y la Historia Clínica
      await api.post("/turnos", formDataBackend);

      // 2. Si guardó bien, redirigir a WhatsApp para el contacto rápido
      const numeroWhatsApp = "5493816242482";
      const textoMensaje = `Hola, quiero solicitar un turno online.
*Mis datos:*
- Nombre: ${form.nombre} ${form.apellido}
- DNI: ${form.dni}
- Teléfono: ${form.telefono}
- Email: ${form.email}

*Detalles del turno:*
- Profesional: ${form.doctor}
- Fecha Tentativa: ${form.fecha.split('-').reverse().join('/')}
- Turno: ${form.horaTentativa}
- Motivo: ${form.motivo}

Espero su confirmación por este medio. ¡Muchas gracias!`;

      const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoMensaje)}`;
      window.open(url, "_blank");

      setMensaje({
        texto: "¡Solicitud creada en nuestro sistema! Te redirigimos a WhatsApp...",
        tipo: "success",
      });

      setForm({
        ...form,
        dni: "", doctor: "", fecha: "", horaTentativa: "", motivo: "",
      });
    } catch (error) {
      console.error("Error al registrar el turno:", error);
      setMensaje({
        texto: "Hubo un error de conexión con la base de datos. Podes contactarnos usando el botón directo de WhatsApp.",
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

      {/* Campos de nombre/apellido (siempre visibles) */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label htmlFor="nombre" className="block text-sm font-medium text-text/90">
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            value={form.nombre}
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
            value={form.apellido}
            placeholder="Ej: Pérez"
            onChange={handleChange}
            className="w-full rounded-xl border border-accent/40 bg-white px-3 py-2.5 text-sm font-bold text-accent-orange shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
            required
          />
        </div>
      </div>

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

        {/* Mostrar email siempre */}
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
            <option value="Dr. Adolfo Martinez">Dr. Adolfo Martinez (Implantología y Cirugía)</option>
            <option value="Dra. Erina Carcara">Dra. Erina Carcara (Ortodoncia)</option>
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
            min="2026-04-04"
            value={form.fecha}
            onChange={handleChange}
            className="w-full rounded-xl border border-accent/40 bg-white px-3 py-2.5 text-sm font-bold text-accent-orange shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
            required
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="horaTentativa"
            className="block text-sm font-medium text-text/90"
          >
            Turno tentativo
          </label>
          <select
            id="horaTentativa"
            name="horaTentativa"
            value={form.horaTentativa}
            onChange={handleChange}
            className="w-full rounded-xl border border-accent/40 bg-white px-3 py-2.5 text-sm font-bold text-accent-orange shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
            required
          >
            <option value="">Seleccionar turno</option>
            <option value="Mañana (09:00 - 13:00)">Mañana (09:00 - 13:00)</option>
            <option value="Tarde (16:00 - 20:00)">Tarde (16:00 - 20:00)</option>
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label
          htmlFor="motivo"
          className="block text-sm font-medium text-text/90"
        >
          Motivo de consulta
        </label>
        <select
          id="motivo"
          name="motivo"
          value={form.motivo}
          onChange={handleChange}
          className="w-full rounded-xl border border-accent/40 bg-white px-3 py-2.5 text-sm font-bold text-accent-orange shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
          required
        >
          <option value="">Seleccionar motivo</option>
          <option value="Consulta General / Control">Consulta General / Control</option>
          <option value="Limpieza Dental">Limpieza Dental</option>
          <option value="Ortodoncia (Brackets/Alineadores)">Ortodoncia (Brackets/Alineadores)</option>
          <option value="Implantología">Implantología</option>
          <option value="Endodoncia (Tratamiento de conducto)">Endodoncia (Tratamiento de conducto)</option>
          <option value="Extracción / Cirugía">Extracción / Cirugía</option>
          <option value="Urgencia / Dolor">Urgencia / Dolor</option>
          <option value="Estética / Blanqueamiento">Estética / Blanqueamiento</option>
          <option value="Odontopediatría (Niños)">Odontopediatría (Niños)</option>
          <option value="Otro">Otro motivo</option>
        </select>
        <p className="text-xs text-text/70 mt-1">
          Al solicitar el turno se abrirá automáticamente WhatsApp para procesar tu reserva.
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