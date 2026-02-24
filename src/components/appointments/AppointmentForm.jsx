import { useState } from "react";

const AppointmentForm = () => {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    doctor: "",
    fecha: "",
    consulta: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
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

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label
            htmlFor="nombre"
            className="block text-sm font-medium text-text/90"
          >
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            placeholder="Ej: Juan"
            onChange={handleChange}
            className="w-full rounded-xl border border-accent/40 bg-white px-3 py-2.5 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
            required
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="apellido"
            className="block text-sm font-medium text-text/90"
          >
            Apellido
          </label>
          <input
            id="apellido"
            name="apellido"
            placeholder="Ej: Pérez"
            onChange={handleChange}
            className="w-full rounded-xl border border-accent/40 bg-white px-3 py-2.5 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
            required
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
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
            placeholder="tu correo@ejemplo.com"
            onChange={handleChange}
            className="w-full rounded-xl border border-accent/40 bg-white px-3 py-2.5 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
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
            placeholder="Ej: +54 9 11 1234 5678"
            onChange={handleChange}
            className="w-full rounded-xl border border-accent/40 bg-white px-3 py-2.5 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
            required
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
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
            onChange={handleChange}
            className="w-full rounded-xl border border-accent/40 bg-white px-3 py-2.5 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
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
            onChange={handleChange}
            className="w-full rounded-xl border border-accent/40 bg-white px-3 py-2.5 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
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
          placeholder="Contanos brevemente qué te gustaría consultar (dolor, limpieza, control, ortodoncia, etc.)."
          onChange={handleChange}
          className="w-full rounded-xl border border-accent/40 bg-white px-3 py-2.5 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
          rows={4}
        />
        <p className="text-xs text-text/70">
          Estos datos serán revisados por el equipo administrativo para
          coordinar tu turno con el profesional adecuado.
        </p>
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-md transition hover:bg-accent hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 focus:ring-offset-background"
      >
        Solicitar turno
      </button>
    </form>
  );
};

export default AppointmentForm;