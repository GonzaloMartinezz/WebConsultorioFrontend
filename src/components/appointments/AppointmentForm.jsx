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

      // 4. LA MAGIA PARA QUE NO SE BLOQUEE: Abrimos en pestaña nueva
      window.open(url, '_blank');

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

  // Funciones de manejo
  const handleFranjaHoraria = (franja) => {
    setForm({ ...form, horaTentativa: franja });
  };

  return (
    <div className="bg-[#141414] min-h-screen py-12 px-4 sm:px-6 flex flex-col items-center font-sans text-gray-200">
      
      {/* HEADER PAGE */}
      <div className="text-center mb-10 w-full max-w-3xl animate-fade-down">
         <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tighter uppercase mb-3">
           SOLICITUD DE TURNO ONLINE
         </h1>
         <p className="text-gray-400 font-medium text-sm sm:text-base">
           Complete el formulario para coordinar su próxima visita
         </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl space-y-8 animate-fade-up"
      >
        {/* MENSAJE DE ESTADO */}
        {mensaje.texto && (
          <div className={`p-4 rounded-xl flex items-center gap-4 text-xs font-bold uppercase tracking-widest ${mensaje.tipo === "success" ? "bg-emerald-950/40 text-emerald-500 border border-emerald-900/50" : "bg-red-950/40 text-red-500 border border-red-900/50"}`}>
            <span className={`w-2 h-2 rounded-full animate-pulse ${mensaje.tipo === "success" ? "bg-emerald-500" : "bg-red-500"}`}></span> 
            {mensaje.texto}
          </div>
        )}

        {/* SECTION 1: DATOS PERSONALES */}
        <div className="bg-[#1a1a1a] rounded-2xl p-6 md:p-8 border-l-4 border-l-orange-500 border-y border-r border-zinc-800/80 shadow-2xl relative overflow-hidden">
          <h2 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-3 mb-8">
            <FaUser className="text-orange-400 text-lg" /> DATOS PERSONALES
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
               <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Nombre</label>
               <input id="nombre" name="nombre" value={form.nombre} onChange={handleChange} required placeholder="Ej. Juan"
                 className="w-full bg-[#141414] border border-zinc-800 rounded-lg px-4 py-3.5 text-sm text-gray-200 outline-none focus:border-orange-500/50 transition-colors placeholder:text-zinc-700"
               />
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Apellido</label>
               <input id="apellido" name="apellido" value={form.apellido} onChange={handleChange} required placeholder="Ej. Pérez"
                 className="w-full bg-[#141414] border border-zinc-800 rounded-lg px-4 py-3.5 text-sm text-gray-200 outline-none focus:border-orange-500/50 transition-colors placeholder:text-zinc-700"
               />
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Documento (DNI)</label>
               <input id="dni" name="dni" value={form.dni} onChange={handleChange} required placeholder="Ej. 34.567.890"
                 className="w-full bg-[#141414] border border-zinc-800 rounded-lg px-4 py-3.5 text-sm text-gray-200 outline-none focus:border-orange-500/50 transition-colors placeholder:text-zinc-700"
               />
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Correo Electrónico</label>
               <input id="email" type="email" name="email" value={form.email} onChange={handleChange} required placeholder="juan@ejemplo.com"
                 className="w-full bg-[#141414] border border-zinc-800 rounded-lg px-4 py-3.5 text-sm text-gray-200 outline-none focus:border-orange-500/50 transition-colors placeholder:text-zinc-700"
               />
            </div>

            <div className="md:col-span-2 space-y-2">
               <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Teléfono / WhatsApp</label>
               <div className="flex bg-[#141414] border border-zinc-800 rounded-lg overflow-hidden focus-within:border-orange-500/50 transition-colors">
                  <div className="px-4 py-3.5 bg-zinc-900/50 text-gray-500 font-bold text-sm border-r border-zinc-800 flex items-center justify-center select-none">
                    +54
                  </div>
                  <input id="telefono" name="telefono" value={form.telefono} onChange={handleChange} required placeholder="11 2345-6789"
                    className="w-full bg-transparent px-4 py-3.5 text-sm font-black text-gray-200 tracking-widest outline-none placeholder:text-zinc-700 placeholder:font-medium"
                  />
               </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: DETALLES DE LA CONSULTA */}
        <div className="bg-[#1a1a1a] rounded-2xl p-6 md:p-8 border-l-4 border-l-[#2b88ff] border-y border-r border-zinc-800/80 shadow-2xl relative overflow-hidden">
          <h2 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-3 mb-8">
            <FaStethoscope className="text-[#2b88ff] text-lg" /> DETALLES DE LA CONSULTA
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            
            <div className="space-y-2">
               <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Especialista Preferido</label>
               <select id="doctor" name="doctor" value={form.doctor} onChange={handleChange} required
                 className="w-full bg-[#141414] border border-zinc-800 rounded-lg px-4 py-3.5 text-sm font-bold text-gray-300 outline-none focus:border-[#2b88ff]/50 transition-colors appearance-none cursor-pointer"
                 style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 1rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.2em 1.2em` }}
               >
                 <option value="" disabled className="text-gray-500">Seleccionar profesional...</option>
                 <option value="Dr. Adolfo Martinez" className="bg-[#1a1a1a]">Dr. Adolfo Martinez</option>
                 <option value="Dra. Erina Carcara" className="bg-[#1a1a1a]">Dra. Erina Carcara</option>
               </select>
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Día Tentativo</label>
               <input id="fecha" type="date" name="fecha" min={fechaHoy} value={form.fecha} onChange={handleChange} required
                 className="w-full bg-[#141414] border border-zinc-800 rounded-lg px-4 py-3.5 text-sm font-bold text-gray-300 outline-none focus:border-[#2b88ff]/50 transition-colors uppercase cursor-pointer"
                 style={{ colorScheme: 'dark' }}
               />
            </div>

            <div className="md:col-span-2 space-y-2 pt-2">
               <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Franja Horaria</label>
               <div className="grid grid-cols-3 gap-3">
                 <button type="button" onClick={() => handleFranjaHoraria('Mañana (09:00 - 13:00)')}
                   className={`flex flex-col items-center justify-center gap-2 py-4 rounded-lg border transition-all ${form.horaTentativa === 'Mañana (09:00 - 13:00)' ? 'bg-[#2b88ff]/10 border-[#2b88ff] text-[#2b88ff]' : 'bg-[#141414] border-zinc-800 text-gray-400 hover:text-gray-200 hover:border-zinc-700'}`}
                 >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                    <span className="text-[10px] font-bold uppercase tracking-widest">Mañana</span>
                 </button>
                 <button type="button" onClick={() => handleFranjaHoraria('Tarde (16:00 - 20:00)')}
                   className={`flex flex-col items-center justify-center gap-2 py-4 rounded-lg border transition-all ${form.horaTentativa === 'Tarde (16:00 - 20:00)' ? 'bg-[#2b88ff]/10 border-[#2b88ff] text-[#2b88ff]' : 'bg-[#141414] border-zinc-800 text-gray-400 hover:text-gray-200 hover:border-zinc-700'}`}
                 >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/><path d="M14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/></svg>
                    <span className="text-[10px] font-bold uppercase tracking-widest">Tarde</span>
                 </button>
                 <button type="button" onClick={() => handleFranjaHoraria('Noche (20:00 - 23:00)')}
                   className={`flex flex-col items-center justify-center gap-2 py-4 rounded-lg border transition-all ${form.horaTentativa === 'Noche (20:00 - 23:00)' ? 'bg-[#2b88ff]/10 border-[#2b88ff] text-[#2b88ff]' : 'bg-[#141414] border-zinc-800 text-gray-400 hover:text-gray-200 hover:border-zinc-700'}`}
                 >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                    <span className="text-[10px] font-bold uppercase tracking-widest">Noche</span>
                 </button>
               </div>
            </div>

            <div className="md:col-span-2 space-y-2 pt-2">
               <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Motivo de la Consulta</label>
               <select id="motivo" name="motivo" value={form.motivo} onChange={handleChange} required
                 className="w-full h-24 bg-[#141414] border border-zinc-800 rounded-lg px-4 py-3.5 text-sm font-bold text-gray-300 outline-none focus:border-[#2b88ff]/50 transition-colors appearance-none cursor-pointer whitespace-normal"
                 style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 1rem top 1rem`, backgroundRepeat: `no-repeat`, backgroundSize: `1.2em 1.2em` }}
               >
                 <option value="" disabled className="text-gray-500">Describa brevemente su síntoma o tratamiento deseado...</option>
                 <option value="Consulta General / Control" className="bg-[#1a1a1a]">Consulta General / Control</option>
                 <option value="Limpieza Dental" className="bg-[#1a1a1a]">Limpieza Dental</option>
                 <option value="Ortodoncia" className="bg-[#1a1a1a]">Ortodoncia (Brackets/Alineadores)</option>
                 <option value="Implantología" className="bg-[#1a1a1a]">Implantología</option>
                 <option value="Endodoncia" className="bg-[#1a1a1a]">Endodoncia (Tratamiento de conducto)</option>
                 <option value="Cirugía" className="bg-[#1a1a1a]">Extracción / Cirugía</option>
                 <option value="Urgencia" className="bg-[#1a1a1a]">Urgencia / Dolor</option>
                 <option value="Estética" className="bg-[#1a1a1a]">Estética / Blanqueamiento</option>
               </select>
            </div>

          </div>
        </div>

        {/* BUTTON BLOCK */}
        <div className="flex flex-col items-center pt-4">
           <button
             type="submit" disabled={cargando}
             className="w-full bg-[#ff7a00] text-black px-6 py-4 rounded-xl font-black text-lg uppercase tracking-widest hover:bg-[#ff8a1c] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-[0_0_30px_rgba(255,122,0,0.2)]"
           >
             {cargando ? "PROCESANDO..." : "CONFIRMAR TURNO"}
             {!cargando && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
           </button>
           <p className="text-[11px] font-medium italic text-gray-500 mt-6 mb-8 text-center max-w-sm">
             Al enviar, se abrirá WhatsApp para finalizar la reserva con el equipo de atención.
           </p>

           <div className="flex gap-4 items-center mb-8">
             <span className="w-1.5 h-1.5 rounded-full bg-zinc-600"></span>
             <span className="w-1.5 h-1.5 rounded-full bg-zinc-600"></span>
             <span className="w-1.5 h-1.5 rounded-full bg-zinc-600"></span>
           </div>
           <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em]">
             C&M DENTAL MANAGEMENT SYSTEMS
           </p>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;