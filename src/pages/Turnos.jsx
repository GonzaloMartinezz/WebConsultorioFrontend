import { useState, useEffect } from "react";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import { User, ClipboardList, CheckCircle2, Circle, CalendarDays, FileEdit, Calendar, Pill } from 'lucide-react';

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
    fechaDia: "",
    fechaMes: "",
    fechaAno: "",
    horaTentativa: "09:00",
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

    if (!form.nombre || !form.apellido || !form.dni || !form.telefono || !form.doctor || !form.fechaDia || !form.fechaMes || !form.fechaAno || !form.motivo) {
        setMensaje({ texto: "Por favor complete todos los datos requeridos.", tipo: "error" });
        setCargando(false);
        return;
    }

    const telefonoCompleto = `+549${form.telefono.replace(/\s+/g, '')}`;
    const fechaCompleta = `${form.fechaAno}-${form.fechaMes.padStart(2, '0')}-${String(form.fechaDia).padStart(2, '0')}`;

    const formDataBackend = {
      nombrePaciente: form.nombre,
      apellidoPaciente: form.apellido,
      dni: form.dni,
      email: form.email,
      telefono: telefonoCompleto,
      profesional: form.doctor,
      fecha: fechaCompleta,
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
- Fecha Tentativa: ${form.fechaDia}/${form.fechaMes}/${form.fechaAno}
- Turno: ${form.horaTentativa}
- Motivo: ${form.motivo}`;

      const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoMensaje)}`;

      setMensaje({
        texto: "¡Solicitud creada! Abriendo WhatsApp...",
        tipo: "success",
      });

      setForm({
        ...form,
        dni: "", doctor: "", fechaDia: "", fechaMes: "", fechaAno: "", horaTentativa: "Temprano", motivo: "",
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
                <User className="text-[#994700]" size={28} />
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
                <ClipboardList className="text-[#994700]" size={28} />
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
                  {form.doctor === 'Dr. Adolfo Martinez' ? <CheckCircle2 className="text-[#ff7a00]" size={28} /> : <Circle className="text-[#994700]" size={28} />}
                </div>

                <div onClick={() => handleSelectDoctor('Dra. Erina Carcara')} className={`group relative flex items-center p-4 rounded-[1.5rem] border-2 transition-all cursor-pointer ${form.doctor === 'Dra. Erina Carcara' ? 'bg-[#ffffff] border-[#ff7a00]' : 'bg-[#fff1e9] border-transparent hover:border-[#e0c0af]'}`}>
                  <div className="h-14 w-14 rounded-xl overflow-hidden mr-4 opacity-80 bg-orange-100 flex items-center justify-center text-2xl border border-orange-200">
                    👩‍⚕️
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-[#2b1704]">Dra. Erina Carcara</p>
                    <p className="text-xs text-[#584235]">Ortodoncia & Estética</p>
                  </div>
                  {form.doctor === 'Dra. Erina Carcara' ? <CheckCircle2 className="text-[#ff7a00]" size={28} /> : <Circle className="text-[#994700]" size={28} />}
                </div>

              </div>
            </section>

            {/* Section: Date & Time */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <CalendarDays className="text-[#994700]" size={28} />
                <h2 className="text-xl font-bold">Fecha Preferida</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-[#584235] ml-1">Fecha</label>
                  <div className="flex gap-2">
                    <select name="fechaDia" value={form.fechaDia} onChange={handleChange} required className="w-1/3 bg-[#fff1e9] border-none outline-none rounded-xl py-4 px-3 focus:ring-0 focus:bg-[#ffdcc2] transition-colors text-[#2b1704] font-medium appearance-none text-center cursor-pointer">
                      <option value="" disabled>Día</option>
                      {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    <select name="fechaMes" value={form.fechaMes} onChange={handleChange} required className="w-1/3 bg-[#fff1e9] border-none outline-none rounded-xl py-4 px-3 focus:ring-0 focus:bg-[#ffdcc2] transition-colors text-[#2b1704] font-medium appearance-none text-center cursor-pointer">
                      <option value="" disabled>Mes</option>
                      {["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"].map((m, idx) => (
                        <option key={m} value={m}>{['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'][idx]}</option>
                      ))}
                    </select>
                    <select name="fechaAno" value={form.fechaAno} onChange={handleChange} required className="w-1/3 bg-[#fff1e9] border-none outline-none rounded-xl py-4 px-3 focus:ring-0 focus:bg-[#ffdcc2] transition-colors text-[#2b1704] font-medium appearance-none text-center cursor-pointer">
                      <option value="" disabled>Año</option>
                      {Array.from({ length: 3 }, (_, i) => new Date().getFullYear() + i).map(y => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-[#584235] ml-1">Horario</label>
                  <select name="horaTentativa" value={form.horaTentativa} onChange={handleChange} required className="w-full bg-[#fff1e9] border-none outline-none rounded-xl py-4 px-5 focus:ring-0 focus:bg-[#ffdcc2] transition-colors text-[#2b1704] font-medium appearance-none cursor-pointer">
                    <optgroup label="Mañana">
                      <option value="09:00">09:00 hs</option>
                      <option value="09:30">09:30 hs</option>
                      <option value="10:00">10:00 hs</option>
                      <option value="10:30">10:30 hs</option>
                      <option value="11:00">11:00 hs</option>
                      <option value="11:30">11:30 hs</option>
                      <option value="12:00">12:00 hs</option>
                      <option value="12:30">12:30 hs</option>
                      <option value="13:00">13:00 hs</option>
                    </optgroup>
                    <optgroup label="Tarde">
                      <option value="14:00">14:00 hs</option>
                      <option value="14:30">14:30 hs</option>
                      <option value="15:00">15:00 hs</option>
                      <option value="15:30">15:30 hs</option>
                      <option value="16:00">16:00 hs</option>
                      <option value="16:30">16:30 hs</option>
                      <option value="17:00">17:00 hs</option>
                      <option value="17:30">17:30 hs</option>
                      <option value="18:00">18:00 hs</option>
                    </optgroup>
                    <optgroup label="Noche">
                      <option value="18:30">18:30 hs</option>
                      <option value="19:00">19:00 hs</option>
                      <option value="19:30">19:30 hs</option>
                      <option value="20:00">20:00 hs</option>
                    </optgroup>
                  </select>
                </div>
              </div>
            </section>

            {/* Section: Motive */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <FileEdit className="text-[#994700]" size={28} />
                <h2 className="text-xl font-bold">Motivo de Consulta</h2>
              </div>
              <select name="motivo" value={form.motivo} onChange={handleChange} required className="w-full bg-[#fff1e9] border-none outline-none rounded-[1.5rem] py-4 px-5 focus:ring-0 focus:bg-[#ffdcc2] transition-colors text-[#2b1704] font-medium appearance-none cursor-pointer">
                <option value="" disabled>Seleccione el motivo de su visita</option>
                <option value="Consulta de control general">Consulta de control general</option>
                <option value="Limpieza dental profunda">Limpieza dental profunda</option>
                <option value="Dolor o molestia urgente">Dolor o molestia urgente</option>
                <option value="Evaluación para ortodoncia">Evaluación para ortodoncia</option>
                <option value="Implantes o prótesis">Implantes o prótesis</option>
                <option value="Estética dental (blanqueamiento, carillas)">Estética dental (blanqueamiento, carillas)</option>
                <option value="Otro">Otro especialista</option>
              </select>
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
                  <User className="text-[#8c7263]" size={24} />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-[#fff1e9] rounded-xl">
                    <Calendar className="text-[#994700] p-2 bg-white rounded-xl shadow-sm w-10 h-10" />
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-[#584235]">Fecha y Hora</p>
                      <p className="font-semibold text-sm">{(form.fechaDia && form.fechaMes && form.fechaAno) ? `${form.fechaDia}/${form.fechaMes}/${form.fechaAno}` : 'Sin definir'} — {form.horaTentativa}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-[#fff1e9] rounded-xl">
                    <Pill className="text-[#994700] p-2 bg-white rounded-xl shadow-sm w-10 h-10" />
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