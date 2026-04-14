import { useState, useEffect } from "react";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

const Turnos = () => {
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
    horaTentativa: "Mañana",
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

  const handleSelectDoctor = (doc) => {
    setForm({ ...form, doctor: doc });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensaje({ texto: "", tipo: "" });

    if (!form.nombre || !form.apellido || !form.dni || !form.telefono || !form.doctor || !form.fecha || !form.motivo) {
        setMensaje({ texto: "Por favor complete todos los datos requeridos.", tipo: "error" });
        setCargando(false);
        return;
    }

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
      await api.post("/turnos", formDataBackend);

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
        dni: "", doctor: "", fecha: "", horaTentativa: "Mañana", motivo: "",
      });

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

  return (
    <div className="bg-[#fff8f5] text-[#2b1704] font-sans min-h-screen selection:bg-[#ffdbc8] selection:text-[#321200]">
      <main className="pt-28 pb-20 px-6 max-w-6xl mx-auto">
        
        {/* Progress Ribbon */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4 px-2">
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest text-[#584235] font-bold">Reserva Online</span>
              <h1 className="text-3xl font-bold text-[#2b1704] tracking-tight">Detalles de la Consulta</h1>
            </div>
            <div className="hidden sm:flex gap-2">
              <div className="h-1.5 w-16 rounded-full bg-accent-orange"></div>
              <div className="h-1.5 w-16 rounded-full bg-accent-orange opacity-40"></div>
            </div>
          </div>
          <div className="w-full h-1 bg-[#ffdcc2] rounded-full overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-[#994700] to-[#ff7a23]"></div>
          </div>
        </div>

        {mensaje.texto && (
          <div className={`mb-8 p-4 rounded-xl flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-widest ${mensaje.tipo === "success" ? "bg-green-100 text-green-700 border border-green-200" : "bg-red-100 text-red-700 border border-red-200"}`}>
            <span className={`w-2 h-2 rounded-full animate-pulse ${mensaje.tipo === "success" ? "bg-green-500" : "bg-red-500"}`}></span> 
            {mensaje.texto}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Booking Form Section */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Section: Personal Info */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#994700]">person</span>
                <h2 className="text-xl font-bold">Datos Personales</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <input name="nombre" value={form.nombre} onChange={handleChange} required placeholder="Nombre" className="w-full bg-[#fff1e9] border-none rounded-xl py-4 px-5 focus:ring-0 focus:bg-[#ffdcc2] transition-colors text-[#2b1704] font-medium outline-none" />
                 <input name="apellido" value={form.apellido} onChange={handleChange} required placeholder="Apellido" className="w-full bg-[#fff1e9] border-none rounded-xl py-4 px-5 focus:ring-0 focus:bg-[#ffdcc2] transition-colors text-[#2b1704] font-medium outline-none" />
                 <input name="dni" value={form.dni} onChange={handleChange} required placeholder="DNI" className="w-full bg-[#fff1e9] border-none rounded-xl py-4 px-5 focus:ring-0 focus:bg-[#ffdcc2] transition-colors text-[#2b1704] font-medium outline-none" />
                 <input name="telefono" value={form.telefono} onChange={handleChange} required placeholder="Teléfono" className="w-full bg-[#fff1e9] border-none rounded-xl py-4 px-5 focus:ring-0 focus:bg-[#ffdcc2] transition-colors text-[#2b1704] font-medium outline-none" type="tel" />
                 <input name="email" value={form.email} onChange={handleChange} required placeholder="Correo Electrónico" className="w-full md:col-span-2 bg-[#fff1e9] border-none rounded-xl py-4 px-5 focus:ring-0 focus:bg-[#ffdcc2] transition-colors text-[#2b1704] font-medium outline-none" type="email" />
              </div>
            </section>

            {/* Section: Specialist Selection */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#994700]">clinical_notes</span>
                <h2 className="text-xl font-bold">Elegir Profesional</h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                
                <div onClick={() => handleSelectDoctor('Dr. Adolfo Martinez')} className={`group relative flex items-center p-4 rounded-[1.5rem] border-2 transition-all cursor-pointer ${form.doctor === 'Dr. Adolfo Martinez' ? 'bg-[#ffffff] border-[#ff7a00]' : 'bg-[#fff1e9] border-transparent hover:border-[#e0c0af]'}`}>
                  <div className="h-14 w-14 rounded-xl overflow-hidden mr-4 bg-orange-100 flex items-center justify-center text-2xl border border-orange-200">
                    👨‍⚕️
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-[#2b1704]">Dr. Adolfo Martinez</p>
                    <p className="text-xs text-[#584235]">Implantología & Cirugía</p>
                  </div>
                  <span className="material-symbols-outlined text-[#994700]" style={{fontVariationSettings: form.doctor === 'Dr. Adolfo Martinez' ? "'FILL' 1" : "'FILL' 0"}}>
                    {form.doctor === 'Dr. Adolfo Martinez' ? 'check_circle' : 'radio_button_unchecked'}
                  </span>
                </div>

                <div onClick={() => handleSelectDoctor('Dra. Erina Carcara')} className={`group relative flex items-center p-4 rounded-[1.5rem] border-2 transition-all cursor-pointer ${form.doctor === 'Dra. Erina Carcara' ? 'bg-[#ffffff] border-[#ff7a00]' : 'bg-[#fff1e9] border-transparent hover:border-[#e0c0af]'}`}>
                  <div className="h-14 w-14 rounded-xl overflow-hidden mr-4 opacity-80 bg-orange-100 flex items-center justify-center text-2xl border border-orange-200">
                    👩‍⚕️
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-[#2b1704]">Dra. Erina Carcara</p>
                    <p className="text-xs text-[#584235]">Ortodoncia & Estética</p>
                  </div>
                  <span className="material-symbols-outlined text-[#994700]" style={{fontVariationSettings: form.doctor === 'Dra. Erina Carcara' ? "'FILL' 1" : "'FILL' 0"}}>
                    {form.doctor === 'Dra. Erina Carcara' ? 'check_circle' : 'radio_button_unchecked'}
                  </span>
                </div>

              </div>
            </section>

            {/* Section: Date & Time */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#994700]">calendar_today</span>
                <h2 className="text-xl font-bold">Fecha Preferida</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-[#584235] ml-1">Fecha</label>
                  <div className="relative">
                    <input name="fecha" value={form.fecha} onChange={handleChange} min={fechaHoy} required className="w-full bg-[#fff1e9] border-none outline-none rounded-xl py-4 px-5 focus:ring-0 focus:bg-[#ffdcc2] transition-colors text-[#2b1704] font-medium" type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-[#584235] ml-1">Turno</label>
                  <select name="horaTentativa" value={form.horaTentativa} onChange={handleChange} required className="w-full bg-[#fff1e9] border-none outline-none rounded-xl py-4 px-5 focus:ring-0 focus:bg-[#ffdcc2] transition-colors text-[#2b1704] font-medium appearance-none">
                    <option value="Mañana">Mañana (09:00 - 13:00)</option>
                    <option value="Tarde">Tarde (16:00 - 20:00)</option>
                    <option value="Noche">Noche (20:00 - 23:00)</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Section: Motive */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#994700]">edit_note</span>
                <h2 className="text-xl font-bold">Motivo de Consulta</h2>
              </div>
              <textarea name="motivo" value={form.motivo} onChange={handleChange} required className="w-full bg-[#fff1e9] border-none outline-none rounded-[1.5rem] py-4 px-5 focus:ring-0 focus:bg-[#ffdcc2] transition-colors text-[#2b1704] resize-none" placeholder="Por favor describa brevemente el síntoma o la razón de su visita..." rows="4"></textarea>
            </section>

          </div>

          {/* Side Summary Panel (Asymmetric Editorial Style) */}
          <div className="lg:col-span-5 sticky top-32">
            <div className="bg-white rounded-[1.5rem] p-8 shadow-xl shadow-[#2b1704]/5 border border-[#e0c0af]/30 relative overflow-hidden">
              {/* Subtle brand background element */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-[#ffdbc8]/40 rounded-full blur-3xl"></div>
              
              <h3 className="text-2xl font-bold mb-8 relative z-10 text-primary">Resumen del Turno</h3>
              
              <div className="space-y-8 relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-[#584235] mb-1">Paciente</p>
                    <p className="font-bold text-lg">{form.nombre || 'Nombre'} {form.apellido || 'Apellido'}</p>
                    <p className="text-sm text-[#584235]">{form.telefono || '+54 9...'}</p>
                  </div>
                  <span className="material-symbols-outlined text-[#8c7263]">person</span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-[#fff1e9] rounded-xl">
                    <span className="material-symbols-outlined text-[#994700] p-2 bg-white rounded-lg shadow-sm">event</span>
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-[#584235]">Fecha y Hora</p>
                      <p className="font-semibold text-sm">{form.fecha ? form.fecha.split('-').reverse().join('/') : 'Sin definir'} — {form.horaTentativa}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-[#fff1e9] rounded-xl">
                    <span className="material-symbols-outlined text-[#994700] p-2 bg-white rounded-lg shadow-sm">medication</span>
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-[#584235]">Servicio</p>
                      <p className="font-semibold text-sm line-clamp-1">{form.doctor || 'Profesional a asignar'}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#e0c0af]/30">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-[#e6f4ea] text-[#137333] p-1.5 rounded-full shrink-0">
                      <svg className="w-4 h-4 fill-current"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.767 5.767 0 3.18 2.586 5.766 5.767 5.766 3.18 0 5.766-2.586 5.766-5.766 0-3.181-2.586-5.767-5.766-5.767zm0 10.511c-2.615 0-4.744-2.129-4.744-4.744 0-2.615 2.129-4.744 4.744-4.744 2.615 0 4.744 2.129 4.744 4.744 0 2.615-2.129 4.744-4.744 4.744zm5.031-10.741c.427 0 .773-.346.773-.773s-.346-.773-.773-.773-.773.346-.773.773.346.773.773.773zm-10.062 0c.427 0 .773-.346.773-.773s-.346-.773-.773-.773-.773.346-.773.773.346.773.773.773zm11.531 1.5c.346 0 .627-.281.627-.627s-.281-.627-.627-.627-.627.281-.627.627.281.627.627.627zm-13 0c.346 0 .627-.281.627-.627s-.281-.627-.627-.627-.627.281-.627.627.281.627.627.627zm11.469 11.5c.346 0 .627-.281.627-.627s-.281-.627-.627-.627-.627.281-.627.627.281.627.627.627zm-10 0c.346 0 .627-.281.627-.627s-.281-.627-.627-.627-.627.281-.627.627.281.627.627.627z"></path></svg>
                    </div>
                    <span className="text-xs text-[#584235] leading-tight">Su confirmación se realizará vía <span className="font-bold">WhatsApp</span>.</span>
                  </div>

                  <button onClick={handleSubmit} disabled={cargando} className="w-full bg-[#ff7a00] text-white py-5 rounded-xl font-bold text-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-[#ff7a00]/20 disabled:opacity-50">
                    {cargando ? 'PROCESANDO...' : 'Confirmar Turno'}
                  </button>
                  <p className="text-center mt-4 text-[10px] text-[#8c7263] uppercase tracking-widest">
                    Al confirmar, acepta nuestros Términos de Servicio.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Turnos;