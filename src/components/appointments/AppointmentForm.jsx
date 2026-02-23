import { useState } from "react";

const AppointmentForm = () => {
  const [form, setForm] = useState({
    nombre: "",
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
      className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto space-y-4"
    >
      <h2 className="text-2xl font-bold text-primary text-center">
        Solicitar Turno
      </h2>

      <input
        name="nombre"
        placeholder="Nombre completo"
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
        required
      />

      <input
        name="telefono"
        placeholder="Teléfono"
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
        required
      />

      <select
        name="doctor"
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
        required
      >
        <option value="">Seleccionar profesional</option>
        <option value="dr_perez">Dr. Pérez</option>
        <option value="dra_gomez">Dra. Gómez</option>
      </select>

      <input
        type="date"
        name="fecha"
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
        required
      />

      <textarea
        name="consulta"
        placeholder="Motivo de consulta"
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
        rows={3}
      />

      <button
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90"
      >
        Solicitar turno
      </button>
    </form>
  );
};

export default AppointmentForm;