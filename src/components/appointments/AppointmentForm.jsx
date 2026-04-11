import { useState, useEffect } from "react";
import api from "../../api/axios.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { FaUser, FaIdCard, FaEnvelope, FaWhatsapp, FaUserMd, FaCalendarAlt, FaClock, FaStethoscope } from "react-icons/fa";

const AppointmentForm = () => {
  const { user } = useAuth();

  const fechaHoy = new Date().toISOString().split('T')[0];

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

    // 1. Limpiamos el teléfono
    const telefonoCompleto = `+549${form.telefono.replace(/\s+/g, '')}`;

    const formDataBackend = {
      nombrePaciente: form.nombre,
      apellidoPaciente: form.apellido,
      dni: form.dni,
      email: form.email,
      telefono: telefonoCompleto,
      profesional: form.doctor,
      fecha: form.fecha,
      hora: form.horaTentativa, 
      motivo: form.motivo,
      estado: 'Pendiente'
    };

    try {
      // 2. Guardamos en la Base de Datos (Aquí tu backend en Node.js debería enviar el Email)
      await api.post("/turnos", formDataBackend);

      // 3. Preparamos el mensaje de WhatsApp
      const numeroWhatsApp = "5493816242482";
      const textoMensaje = `Hola, quiero solicitar un turno online.
*Mis datos:*
- Nombre: ${form.nombre} ${form.apellido}
- DNI: ${form.dni}
- Teléfono: ${telefonoCompleto}
- Email: ${form.email}

*Detalles del turno:*
- Profesional: ${form.doctor}
- Fecha Tentativa: ${form.fecha.split('-').reverse().join('/')}
- Turno: ${form.horaTentativa}
- Motivo: ${form.motivo}`;

      const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoMensaje)}`;

      setMensaje({
        texto: "¡Solicitud creada! Abriendo WhatsApp...",
        tipo: "success",
      });

      setForm({
        ...form,
        dni: "", doctor: "", fecha: "", horaTentativa: "", motivo: "",
      });

      // 4. LA MAGIA PARA QUE NO SE BLOQUEE: Redirigimos la pestaña actual
      window.location.href = url;

    } catch (error) {
      console.error("Error al registrar el turno:", error);
      setMensaje({
        texto: "Hubo un error de conexión. Contáctanos por WhatsApp.",
        tipo: "error",
      });
    } finally {
      setCargando(false);
    }
  };

  // Componente Input Reutilizable (Para mantener el código limpio)
  const InputGroup = ({ icon: Icon, label, id, children }) => (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2 mb-2">
        <Icon className="text-accent-orange text-sm" /> {label}
      </label>
      {children}
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 sm:p-10 lg:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] w-full max-w-4xl mx-auto border border-secondary/20 relative overflow-hidden"
    >
      {/* Detalle decorativo superior */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent-orange via-primary to-accent-orange"></div>

      {/* CABECERA DEL FORMULARIO */}
      <div className="text-center mb-10 md:mb-14">
        <span className="inline-block py-1.5 px-5 rounded-full bg-accent-orange/10 text-accent-orange font-black text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-4 border border-accent-orange/20">
          Reserva Rápida
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-primary leading-tight tracking-tighter uppercase">
          Solicitar <span className="text-accent-orange">Turno</span>
        </h2>
        <p className="text-sm sm:text-base text-text-light font-medium mt-3 max-w-xl mx-auto">
          Completá tus datos y nuestro equipo te contactará para confirmar tu cita.
        </p>
      </div>

      {/* MENSAJE DE ESTADO */}
      {mensaje.texto && (
        <div className={`mb-8 p-4 rounded-2xl flex items-center gap-4 border ${
            mensaje.tipo === "success" ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          <div className={`p-2 rounded-full text-white shrink-0 ${mensaje.tipo === "success" ? "bg-green-500" : "bg-red-500"}`}>
            {mensaje.tipo === "success" ? "✓" : "✕"}
          </div>
          <span className="font-bold text-sm">{mensaje.texto}</span>
        </div>
      )}

      <div className="space-y-10 md:space-y-12">
        
        {/* BLOQUE 1: DATOS PERSONALES */}
        <div className="bg-secondary/5 rounded-3xl p-6 md:p-8 border border-secondary/20">
          <h3 className="text-lg font-black text-primary uppercase tracking-tight mb-6 border-b border-secondary/20 pb-4">
            1. Datos Personales
          </h3>
          
          <div className="grid gap-6 md:grid-cols-2">
            <InputGroup icon={FaUser} label="Nombre" id="nombre">
              <input id="nombre" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ej: Juan" required
                className="w-full bg-white border border-secondary/30 rounded-xl px-4 py-3.5 text-sm font-bold text-primary placeholder-primary/30 outline-none transition-all focus:border-accent-orange focus:ring-4 focus:ring-accent-orange/10 shadow-sm"
              />
            </InputGroup>

            <InputGroup icon={FaUser} label="Apellido" id="apellido">
              <input id="apellido" name="apellido" value={form.apellido} onChange={handleChange} placeholder="Ej: Pérez" required
                className="w-full bg-white border border-secondary/30 rounded-xl px-4 py-3.5 text-sm font-bold text-primary placeholder-primary/30 outline-none transition-all focus:border-accent-orange focus:ring-4 focus:ring-accent-orange/10 shadow-sm"
              />
            </InputGroup>

            <InputGroup icon={FaIdCard} label="Documento (DNI)" id="dni">
              <input id="dni" name="dni" value={form.dni} onChange={handleChange} placeholder="Ej: 12345678" required
                className="w-full bg-white border border-secondary/30 rounded-xl px-4 py-3.5 text-sm font-bold text-primary placeholder-primary/30 outline-none transition-all focus:border-accent-orange focus:ring-4 focus:ring-accent-orange/10 shadow-sm"
              />
            </InputGroup>

            <InputGroup icon={FaEnvelope} label="Correo Electrónico" id="email">
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="correo@ejemplo.com" required
                className="w-full bg-white border border-secondary/30 rounded-xl px-4 py-3.5 text-sm font-bold text-primary placeholder-primary/30 outline-none transition-all focus:border-accent-orange focus:ring-4 focus:ring-accent-orange/10 shadow-sm"
              />
            </InputGroup>
            
            <div className="md:col-span-2">
              <InputGroup icon={FaWhatsapp} label="Teléfono / WhatsApp" id="telefono">
                <div className="flex items-stretch rounded-xl border border-secondary/30 bg-white shadow-sm transition-all focus-within:border-accent-orange focus-within:ring-4 focus-within:ring-accent-orange/10 overflow-hidden">
                  <div className="bg-primary/5 px-5 flex items-center justify-center border-r border-secondary/30 select-none">
                    <span className="text-sm font-black text-primary/60 tracking-widest">+54 9</span>
                  </div>
                  <input id="telefono" name="telefono" value={form.telefono} onChange={handleChange} placeholder="381 123 4567" required
                    className="w-full bg-transparent px-4 py-3.5 text-sm font-black text-accent-orange outline-none"
                  />
                </div>
              </InputGroup>
            </div>
          </div>
        </div>

        {/* BLOQUE 2: DETALLES DEL TURNO */}
        <div className="bg-secondary/5 rounded-3xl p-6 md:p-8 border border-secondary/20">
          <h3 className="text-lg font-black text-primary uppercase tracking-tight mb-6 border-b border-secondary/20 pb-4">
            2. Detalles de la Consulta
          </h3>

          <div className="grid gap-6 md:grid-cols-2">
            
            <div className="md:col-span-2">
              <InputGroup icon={FaUserMd} label="Especialista Preferido" id="doctor">
                <select id="doctor" name="doctor" value={form.doctor} onChange={handleChange} required
                  className="w-full bg-white border border-secondary/30 rounded-xl px-4 py-3.5 text-sm font-bold text-primary outline-none transition-all focus:border-accent-orange focus:ring-4 focus:ring-accent-orange/10 shadow-sm cursor-pointer appearance-none"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 1rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em` }}
                >
                  <option value="" disabled className="text-primary/50">Seleccione un doctor...</option>
                  <option value="Dr. Adolfo Martinez" className="font-bold py-2">👨⚕️ Dr. Adolfo Martinez (Implantología / Cirugía)</option>
                  <option value="Dra. Erina Carcara" className="font-bold py-2">👩⚕️ Dra. Erina Carcara (Ortodoncia)</option>
                </select>
              </InputGroup>
            </div>

            <InputGroup icon={FaCalendarAlt} label="Día Tentativo" id="fecha">
              <input id="fecha" type="date" name="fecha" min={fechaHoy} value={form.fecha} onChange={handleChange} required
                className="w-full bg-white border border-secondary/30 rounded-xl px-4 py-3.5 text-sm font-bold text-primary outline-none transition-all focus:border-accent-orange focus:ring-4 focus:ring-accent-orange/10 shadow-sm cursor-pointer"
              />
            </InputGroup>

            <InputGroup icon={FaClock} label="Franja Horaria" id="horaTentativa">
              <select id="horaTentativa" name="horaTentativa" value={form.horaTentativa} onChange={handleChange} required
                className="w-full bg-white border border-secondary/30 rounded-xl px-4 py-3.5 text-sm font-bold text-primary outline-none transition-all focus:border-accent-orange focus:ring-4 focus:ring-accent-orange/10 shadow-sm cursor-pointer appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 1rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em` }}
              >
                <option value="" disabled>Elegir horario...</option>
                <option value="Mañana (09:00 - 13:00)">🌅 Mañana (09:00 - 13:00)</option>
                <option value="Tarde (16:00 - 20:00)">🌇 Tarde (16:00 - 20:00)</option>
              </select>
            </InputGroup>

            <div className="md:col-span-2">
              <InputGroup icon={FaStethoscope} label="Motivo de la Consulta" id="motivo">
                <select id="motivo" name="motivo" value={form.motivo} onChange={handleChange} required
                  className="w-full bg-white border border-secondary/30 rounded-xl px-4 py-3.5 text-sm font-bold text-primary outline-none transition-all focus:border-accent-orange focus:ring-4 focus:ring-accent-orange/10 shadow-sm cursor-pointer appearance-none"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 1rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em` }}
                >
                  <option value="" disabled>Seleccione el motivo principal...</option>
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
              </InputGroup>
            </div>
            
          </div>
        </div>

      </div>

      {/* FOOTER DEL FORMULARIO / BOTÓN DE ENVÍO */}
      <div className="mt-12 flex flex-col items-center">
        <button
          type="submit"
          disabled={cargando}
          className="w-full sm:w-auto min-w-[300px] rounded-full bg-accent-orange px-8 py-5 text-base md:text-lg font-black uppercase tracking-widest text-white shadow-xl shadow-accent-orange/30 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent-orange/40 hover:brightness-110 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {cargando ? "Procesando Solicitud..." : "Confirmar Turno"}
        </button>
        <p className="text-xs text-text-light font-bold mt-4 flex items-center justify-center gap-2">
          <FaWhatsapp className="text-green-500 text-lg" />
          Al enviar, se abrirá WhatsApp para finalizar la reserva.
        </p>
      </div>
    </form>
  );
};

export default AppointmentForm;