import { useState, useEffect } from "react";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  ClipboardList,
  CalendarDays,
  Check,
  ChevronRight,
  ChevronLeft,
  Phone,
  ShieldCheck,
  Clock,
  Send,
  Sparkles,
  Info,
  Activity
} from 'lucide-react';

const Turnos = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const hoy = new Date();
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    dni: "",
    doctor: "",
    fechaDia: String(hoy.getDate()).padStart(2, '0'),
    fechaMes: String(hoy.getMonth() + 1).padStart(2, '0'),
    fechaAno: "2026",
    turnoFranja: "Mañana",
    horaTentativa: "09:00",
    motivo: "",
  });

  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });
  const [cargando, setCargando] = useState(false);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await api.get('/configuracion');
        setConfig(res.data);
      } catch (err) {
        console.error("No se pudo cargar la configuración:", err);
      }
    };
    fetchConfig();
  }, []);

  useEffect(() => {
    if (user) {
      setForm(prev => ({
        ...prev,
        nombre: user.nombre || "",
        apellido: user.apellido || "",
        email: user.email || "",
        telefono: user.telefono || "",
        dni: user.dni || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!form.motivo || !form.doctor) {
      setMensaje({ texto: "Por favor complete todos los campos requeridos.", tipo: "error" });
      return;
    }

    setCargando(true);
    const telefonoCompleto = `+549${form.telefono.replace(/\s+/g, '').replace(/^\+?549?/, '')}`;
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
      estado: 'Pendiente',
      pacienteId: user?._id || user?.id || null,
    };

    try {
      await api.post("/turnos", formDataBackend);

      const numeroWhatsApp = "5493816242482";
      const textoMensaje = `🦷 *NUEVA ORDEN DE CITA - C&M*
---------------------------------------
👤 *PACIENTE:* ${form.nombre.toUpperCase()} ${form.apellido.toUpperCase()}
📇 *DNI:* ${form.dni}
📱 *TEL:* ${telefonoCompleto}

🏢 *CATEGORÍA:* ${form.motivo.toUpperCase()}
👨‍⚕️ *PROFESIONAL:* ${form.doctor.toUpperCase()}
📅 *AGENDA:* ${form.fechaDia}/${form.fechaMes}/${form.fechaAno}
⏰ *HORARIO:* ${form.horaTentativa} HS (${form.turnoFranja})

_Enviado desde el Portal Oficial de Turnos._`;

      const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoMensaje)}`;
      setMensaje({ texto: "¡Solicitud procesada con éxito!", tipo: "success" });
      setTimeout(() => {
        window.open(url, '_blank');
      }, 1200);

    } catch (error) {
      setMensaje({ texto: "Error de red. Intente WhatsApp directo.", tipo: "error" });
    } finally {
      setCargando(false);
    }
  };

  const consultationTypes = config?.servicios?.map(s => s.nombre) || [
    "Consulta General",
    "Limpieza Dental",
    "Ortodoncia"
  ];

  // Generar horarios dinámicos basados en la configuración
  const generarHorarios = () => {
    if (!config) return ["09:00", "10:00", "11:00"];
    
    const { apertura, cierre, intervalo } = config.horarios;
    const slots = [];
    let curr = new Date(`2026-01-01T${apertura}:00`);
    const end = new Date(`2026-01-01T${cierre}:00`);
    const stepMin = parseInt(intervalo);

    while (curr < end) {
      const h = String(curr.getHours()).padStart(2, '0');
      const m = String(curr.getMinutes()).padStart(2, '0');
      const timeStr = `${h}:${m}`;
      
      if (form.turnoFranja === 'Mañana' && curr.getHours() < 13) {
        slots.push(timeStr);
      } else if (form.turnoFranja === 'Tarde' && curr.getHours() >= 13) {
        slots.push(timeStr);
      }
      
      curr.setMinutes(curr.getMinutes() + stepMin);
    }
    return slots;
  };

  const dynamicSlots = generarHorarios();

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#2D1F16] selection:bg-accent-orange/10 flex flex-col">
      <main className="pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto w-full flex-1">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* COLUMNA IZQUIERDA: STEPPER */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-2 mb-10">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-orange">Gestión de Citas 2026</span>
              <h1 className="text-4xl font-black uppercase tracking-tighter italic leading-none">Nueva <span className="text-accent-orange">Solicitud</span></h1>
            </div>

            {/* Indicador de Pasos */}
            <div className="flex gap-2 max-w-xs mb-8">
              {[1, 2, 3].map(i => (
                <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-accent-orange shadow-[0_0_10px_rgba(255,120,0,0.4)]' : 'bg-[#EADDCA]'}`}></div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-[#EADDCA]/60 shadow-sm space-y-8">
                  <div className="flex items-center gap-3">
                    <User className="text-accent-orange" />
                    <h2 className="text-xs font-black uppercase tracking-widest text-[#5C4D42]">01. Identificación</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input name="nombre" value={form.nombre} onChange={handleChange} className="w-full bg-[#FAF9F6] p-4 rounded-xl outline-none font-bold text-sm focus:ring-2 ring-accent-orange/20" placeholder="Nombre" />
                    <input name="apellido" value={form.apellido} onChange={handleChange} className="w-full bg-[#FAF9F6] p-4 rounded-xl outline-none font-bold text-sm focus:ring-2 ring-accent-orange/20" placeholder="Apellido" />
                    <input name="dni" value={form.dni} onChange={handleChange} className="w-full bg-[#FAF9F6] p-4 rounded-xl outline-none font-bold text-sm focus:ring-2 ring-accent-orange/20" placeholder="DNI / Documento" />
                    <input name="telefono" value={form.telefono} onChange={handleChange} className="w-full bg-[#FAF9F6] p-4 rounded-xl outline-none font-bold text-sm text-green-700 focus:ring-2 ring-accent-orange/20" placeholder="WhatsApp (Sin 0 ni 15)" />
                    <input name="email" value={form.email} onChange={handleChange} className="w-full bg-[#FAF9F6] p-4 rounded-xl outline-none font-bold text-sm md:col-span-2 focus:ring-2 ring-accent-orange/20" placeholder="Correo Electrónico" />
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-[#EADDCA]/60 shadow-sm space-y-8">
                  <div className="flex items-center gap-3">
                    <ClipboardList className="text-accent-orange" />
                    <h2 className="text-xs font-black uppercase tracking-widest text-[#5C4D42]">02. Profesional</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {['Dr. Adolfo Martinez', 'Dra. Erina Carcara'].map(name => (
                      <div key={name} onClick={() => setForm({ ...form, doctor: name })} className={`cursor-pointer p-6 rounded-4xl border-2 transition-all flex items-center justify-between ${form.doctor === name ? 'bg-accent-orange text-white border-accent-orange shadow-lg shadow-accent-orange/20' : 'bg-[#FAF9F6] border-transparent hover:border-[#EADDCA]'}`}>
                        <span className="font-black text-[10px] uppercase tracking-widest">{name}</span>
                        {form.doctor === name && <Check size={16} />}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-[#EADDCA]/60 shadow-sm space-y-8">
                  <div className="flex items-center gap-3">
                    <CalendarDays className="text-accent-orange" />
                    <h2 className="text-xs font-black uppercase tracking-widest text-[#5C4D42]">03. Planificación</h2>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-accent-orange tracking-widest ml-1">Motivo de Consulta</label>
                    <select name="motivo" value={form.motivo} onChange={handleChange} className="w-full bg-[#FAF9F6] p-4 rounded-xl font-bold text-sm outline-none border-2 border-transparent focus:border-accent-orange transition-all">
                      <option value="" disabled>Seleccione una opción</option>
                      {consultationTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Generación dinámica de meses y días */}
                      <div className="bg-[#FAF9F6] p-4 rounded-xl flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#5C4D42]">Mes</span>
                        <span className="font-black text-xs uppercase text-accent-orange">
                          {new Date(2026, parseInt(form.fechaMes) - 1).toLocaleString('es-ES', { month: 'long' })}
                        </span>
                      </div>
                      
                      <select 
                        name="fechaDia" 
                        value={form.fechaDia} 
                        onChange={(e) => {
                          const selectedDay = e.target.value;
                          const offset = e.target.selectedIndex;
                          const d = new Date();
                          d.setDate(d.getDate() + offset);
                          const mesStr = String(d.getMonth() + 1).padStart(2, '0');
                          setForm({ ...form, fechaDia: selectedDay, fechaMes: mesStr });
                        }} 
                        className="bg-[#FAF9F6] p-4 rounded-xl outline-none font-black text-xs border-2 border-transparent focus:border-accent-orange transition-all"
                      >
                        {Array.from({ length: 14 }, (_, i) => {
                          const d = new Date();
                          d.setDate(d.getDate() + i);
                          const diaStr = String(d.getDate()).padStart(2, '0');
                          const mesStr = String(d.getMonth() + 1).padStart(2, '0');
                          const diaNombre = d.toLocaleString('es-ES', { weekday: 'short' });
                          return (
                            <option key={i} value={diaStr}>
                              {diaNombre.toUpperCase()} {diaStr}/{mesStr}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className="flex gap-4">
                      {['Mañana', 'Tarde'].map(f => (
                        <button 
                          key={f} 
                          type="button" 
                          onClick={() => {
                            const d = new Date(); 
                            // Actualizar mes si el día seleccionado corresponde al mes siguiente
                            setForm({ 
                              ...form, 
                              turnoFranja: f, 
                              horaTentativa: f === 'Mañana' ? '09:00' : '15:00' 
                            });
                          }} 
                          className={`flex-1 p-4 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all ${form.turnoFranja === f ? 'bg-[#1A110B] text-white shadow-xl shadow-black/20' : 'bg-[#FAF9F6] text-[#5C4D42] hover:bg-[#EADDCA]/30'}`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>

                  <select name="horaTentativa" value={form.horaTentativa} onChange={handleChange} className="w-full bg-[#FAF9F6] p-4 rounded-xl font-black text-xs text-center border-none outline-none">
                    {dynamicSlots.map(h => <option key={h} value={h}>{h} HS</option>)}
                    {dynamicSlots.length === 0 && <option disabled>No hay turnos disponibles en esta franja</option>}
                  </select>
                </motion.div>
              )}
            </AnimatePresence>

            {/* BOTONES DE ACCIÓN (Naranjas con efectos) */}
            <div className="mt-8 flex items-center gap-4">
              {step > 1 && (
                <button onClick={handleBack} className="w-14 h-14 rounded-2xl bg-white border border-[#EADDCA] flex items-center justify-center text-[#5C4D42] hover:bg-white/60 transition-colors">
                  <ChevronLeft size={20} />
                </button>
              )}
              {step < totalSteps ? (
                <button
                  onClick={handleNext}
                  className="flex-1 h-14 rounded-3xl bg-accent-orange text-white font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-2 hover:brightness-110 hover:shadow-[0_10px_30px_rgba(255,120,0,0.3)] active:scale-[0.98] transition-all"
                >
                  Continuar <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={cargando}
                  className="flex-1 h-14 rounded-3xl bg-accent-orange text-white font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-2 hover:brightness-110 hover:shadow-[0_10px_30px_rgba(255,120,0,0.4)] active:scale-[0.98] transition-all"
                >
                  {cargando ? 'Transmitiendo...' : 'Registrar y Enviar'} <Send size={16} />
                </button>
              )}
            </div>
          </div>

          {/* COLUMNA DERECHA: RESUMEN (Siempre visible) */}
          <div className="lg:col-span-5 sticky top-32">
            <div className="bg-[#1A110B] p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden border border-white/5 space-y-8">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-orange/10 rounded-full blur-[60px] -mr-16 -mt-16"></div>

              <div className="flex items-center gap-4 border-b border-white/5 pb-8">
                <ShieldCheck className="text-accent-orange" size={32} />
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tighter">Orden de Consulta</h3>
                  <p className="text-[8px] uppercase font-bold text-white/30 tracking-widest">Estado: Calibrando Datos</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <p className="text-[8px] font-black uppercase text-white/20 tracking-[0.3em]">Paciente</p>
                    <p className="font-black text-sm uppercase tracking-tight italic">{form.nombre || '...'} {form.apellido || ''}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <p className="text-[8px] font-black uppercase text-white/20 tracking-[0.3em]">DNI</p>
                    <p className="font-black text-sm uppercase tracking-tight">{form.dni || '---'}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <p className="text-[8px] font-black uppercase text-white/20 tracking-[0.3em]">Email</p>
                    <p className="font-black text-[10px] lowercase tracking-tight opacity-80">{form.email || '---'}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <p className="text-[8px] font-black uppercase text-white/20 tracking-[0.3em]">Profesional</p>
                    <p className="font-black text-sm uppercase tracking-tight italic text-accent-orange">{form.doctor || 'Sin asignar'}</p>
                  </div>
                </div>

                <div className="bg-white/5 p-5 rounded-2xl border border-white/5 space-y-4">
                  <div className="flex items-center gap-4">
                    <Clock className="text-accent-orange/40" size={18} />
                    <div>
                      <p className="text-[7px] font-black uppercase text-white/30 tracking-widest">Agenda Solicitada</p>
                      <p className="font-bold text-xs tracking-widest">{form.fechaDia}/{form.fechaMes}/26 — {form.horaTentativa} HS</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Activity className="text-accent-orange/40" size={18} />
                    <div>
                      <p className="text-[7px] font-black uppercase text-white/30 tracking-widest">Motivo</p>
                      <p className="font-bold text-xs tracking-widest uppercase line-clamp-1">{form.motivo || 'No definido'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col items-center gap-4">
                <div className="w-1.5 h-1.5 bg-accent-orange rounded-full animate-ping"></div>
                <p className="text-[7px] text-center font-bold text-white/20 uppercase tracking-[0.4em] leading-relaxed">
                  Confirmación requerida vía WhatsApp <br /> según protocolo institucional Carcara & Martínez.
                </p>
              </div>
            </div>

            {mensaje.texto && (
              <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest ${mensaje.tipo === "success" ? "text-green-500 bg-green-500/5 border border-green-500/20" : "text-red-500 bg-red-500/5 border border-red-500/20"}`}>
                <Info size={14} /> {mensaje.texto}
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Footer Fijo Mobile */}
      <footer className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-[#EADDCA] p-4 flex justify-between items-center z-50">
        <div className="flex flex-col">
          <span className="text-[8px] font-black uppercase text-accent-orange">Paso {step}/3</span>
        </div>
        <button onClick={handleSubmit} disabled={cargando} className="bg-accent-orange text-white px-6 py-2 rounded-full font-black text-[9px] uppercase tracking-widest shadow-lg">Enviar WhatsApp</button>
      </footer>
    </div>
  );
};

export default Turnos;