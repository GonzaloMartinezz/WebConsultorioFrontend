import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [mostrarModalExito, setMostrarModalExito] = useState(false);

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
      setMostrarModalExito(true);
      
      setTimeout(() => {
        window.open(url, '_blank');
        navigate('/');
      }, 3000);

    } catch (error) {
      setMensaje({ texto: "Error de red. Intente WhatsApp directo.", tipo: "error" });
    } finally {
      setCargando(false);
    }
  };

  const consultationTypes = config?.servicios?.map(s => s.nombre) || [
    "Consulta General / Diagnóstico",
    "Limpieza Dental Profunda",
    "Ortodoncia (Brackets/Alineadores)",
    "Implantología",
    "Cirugía Oral / Extracción",
    "Endodoncia (Tratamiento de Conducto)",
    "Estética / Blanqueamiento",
    "Prótesis Fija / Coronas",
    "Periodoncia",
    "Urgencia / Dolor"
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
    <div className="bg-[#FAF9F6] min-h-screen text-[#2D1F16] selection:bg-accent-orange/20 flex flex-col relative overflow-hidden font-sans">

      {/* Glow Effects - Fondo difuminado orgánico premium más vibrante */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] bg-linear-to-br from-white to-transparent rounded-full blur-[140px] opacity-90"></div>
        <div className="absolute bottom-[-10%] -right-[10%] w-[800px] h-[800px] bg-linear-to-tl from-accent-orange/60 via-orange-400/30 to-transparent rounded-full blur-[160px]"></div>
        <div className="absolute top-[20%] left-[30%] w-[600px] h-[600px] bg-accent-orange/15 rounded-full blur-[180px]"></div>
      </div>

      <main className="pt-32 pb-24 px-4 md:px-8 max-w-[1200px] mx-auto w-full flex-1 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start">

          {/* COLUMNA IZQUIERDA: STEPPER PREMIUM */}
          <div className="space-y-8">
            <div className="space-y-3 mb-12">
              <div className="flex items-center gap-3">
                <span className="w-8 h-[2px] bg-accent-orange"></span>
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-accent-orange">Gestión de Citas 2026</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight text-primary pb-2">
                Nueva <span className="text-transparent bg-clip-text bg-linear-to-r from-accent-orange to-orange-500 italic pr-2">Solicitud</span>
              </h1>
            </div>

            {/* Indicador de Pasos Premium */}
            <div className="flex items-center gap-3 max-w-xs mb-10">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex-1 h-2 relative rounded-full overflow-hidden bg-[#EADDCA]/40">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: step >= i ? '100%' : '0%' }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute top-0 left-0 h-full bg-linear-to-r from-accent-orange to-orange-400 shadow-[0_0_12px_rgba(255,120,0,0.6)]"
                  />
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, ease: "easeOut" }} className="bg-white/80 backdrop-blur-2xl p-8 md:p-12 rounded-[3rem] border border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] space-y-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-accent-orange/5 to-transparent rounded-full blur-2xl pointer-events-none"></div>

                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-accent-orange/20 to-accent-orange/5 flex items-center justify-center border border-accent-orange/10 shadow-inner">
                      <User className="text-accent-orange" size={20} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary">01. Identificación</h2>
                      <p className="text-[10px] font-bold text-text-light/60 tracking-wider mt-0.5">Datos del paciente</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                    {[
                      { name: 'nombre', label: 'Nombre' },
                      { name: 'apellido', label: 'Apellido' },
                      { name: 'dni', label: 'DNI / Documento' },
                      { name: 'telefono', label: 'WhatsApp (Sin 0 ni 15)' }
                    ].map(({ name, label }) => (
                      <div key={name} className="relative group">
                        <label className="absolute -top-2 left-4 bg-white px-2 text-[8px] font-black uppercase tracking-widest text-text-light/70 z-10 transition-colors group-focus-within:text-accent-orange shadow-sm rounded-full">
                          {label}
                        </label>
                        <input name={name} value={form[name]} onChange={handleChange} className="w-full bg-white/50 p-4 pt-5 rounded-2xl outline-none font-bold text-sm text-primary border border-[#EADDCA]/50 focus:border-accent-orange focus:bg-white transition-all shadow-inner focus:shadow-[0_0_0_4px_rgba(255,120,0,0.1)]" placeholder="..." />
                      </div>
                    ))}
                    <div className="relative group md:col-span-2">
                      <label className="absolute -top-2 left-4 bg-white px-2 text-[8px] font-black uppercase tracking-widest text-text-light/70 z-10 group-focus-within:text-accent-orange shadow-sm rounded-full">Correo Electrónico</label>
                      <input name="email" value={form.email} onChange={handleChange} className="w-full bg-white/50 p-4 pt-5 rounded-2xl outline-none font-bold text-sm text-primary border border-[#EADDCA]/50 focus:border-accent-orange focus:bg-white transition-all shadow-inner focus:shadow-[0_0_0_4px_rgba(255,120,0,0.1)]" placeholder="..." />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="bg-white/80 backdrop-blur-2xl p-8 md:p-12 rounded-[3rem] border border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] space-y-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-accent-orange/5 to-transparent rounded-full blur-2xl pointer-events-none"></div>

                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-accent-orange/20 to-accent-orange/5 flex items-center justify-center border border-accent-orange/10 shadow-inner">
                      <ClipboardList className="text-accent-orange" size={20} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary">02. Profesional</h2>
                      <p className="text-[10px] font-bold text-text-light/60 tracking-wider mt-0.5">Selección de especialista</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 relative z-10">
                    {['Dr. Adolfo Martinez', 'Dra. Erina Carcara'].map(name => (
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} key={name} onClick={() => setForm({ ...form, doctor: name })} className={`cursor-pointer p-6 rounded-3xl border-2 transition-all duration-300 flex items-center justify-between group ${form.doctor === name ? 'bg-linear-to-r from-accent-orange to-orange-500 text-white border-transparent shadow-[0_15px_30px_-10px_rgba(255,120,0,0.4)]' : 'bg-white/50 border-[#EADDCA]/50 hover:bg-white hover:border-accent-orange/30 hover:shadow-xl'}`}>
                        <div className="flex items-center gap-5">
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center font-black text-sm shadow-inner transition-colors ${form.doctor === name ? 'bg-white/20 text-white' : 'bg-primary/5 text-primary group-hover:bg-accent-orange/10 group-hover:text-accent-orange'}`}>
                            {name.split(' ')[1][0]}{name.split(' ')[2][0]}
                          </div>
                          <span className="font-black text-xs md:text-sm uppercase tracking-widest">{name}</span>
                        </div>
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${form.doctor === name ? 'bg-white text-accent-orange scale-110 shadow-sm' : 'bg-transparent border-2 border-[#EADDCA] group-hover:border-accent-orange/30'}`}>
                          {form.doctor === name && <Check size={14} strokeWidth={4} />}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="bg-white/80 backdrop-blur-2xl p-8 md:p-12 rounded-[3rem] border border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] space-y-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-accent-orange/5 to-transparent rounded-full blur-2xl pointer-events-none"></div>

                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-accent-orange/20 to-accent-orange/5 flex items-center justify-center border border-accent-orange/10 shadow-inner">
                      <CalendarDays className="text-accent-orange" size={20} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary">03. Planificación</h2>
                      <p className="text-[10px] font-bold text-text-light/60 tracking-wider mt-0.5">Agenda clínica</p>
                    </div>
                  </div>

                  <div className="space-y-6 relative z-10">
                    <div className="relative group">
                      <label className="absolute -top-2 left-4 bg-white px-2 text-[8px] font-black uppercase tracking-widest text-text-light/70 z-10 group-focus-within:text-accent-orange shadow-sm rounded-full">Motivo Clínico</label>
                      <select name="motivo" value={form.motivo} onChange={handleChange} className="w-full bg-white/50 p-4 pt-5 rounded-2xl font-bold text-sm text-primary border border-[#EADDCA]/50 focus:border-accent-orange outline-none transition-all shadow-inner cursor-pointer focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,120,0,0.1)]">
                        <option value="" disabled>Seleccione el tratamiento</option>
                        {consultationTypes.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div className="bg-white/50 p-4 rounded-2xl flex flex-col justify-center border border-[#EADDCA]/50 shadow-inner text-center">
                        <span className="text-[9px] font-black uppercase tracking-widest text-text-light/60 mb-1">Mes en curso</span>
                        <span className="font-black text-sm uppercase text-primary">
                          {new Date(2026, parseInt(form.fechaMes) - 1).toLocaleString('es-ES', { month: 'long' })}
                        </span>
                      </div>

                      <div className="relative group">
                        <label className="absolute -top-2 left-4 bg-white px-2 text-[8px] font-black uppercase tracking-widest text-text-light/70 z-10 group-focus-within:text-accent-orange shadow-sm rounded-full">Día</label>
                        <select name="fechaDia" value={form.fechaDia} onChange={(e) => {
                          const offset = e.target.selectedIndex;
                          const d = new Date(); d.setDate(d.getDate() + offset);
                          setForm({ ...form, fechaDia: e.target.value, fechaMes: String(d.getMonth() + 1).padStart(2, '0') });
                        }} className="w-full h-full bg-white/50 p-4 pt-5 rounded-2xl font-black text-sm text-primary border border-[#EADDCA]/50 focus:border-accent-orange outline-none transition-all shadow-inner cursor-pointer focus:bg-white text-center focus:shadow-[0_0_0_4px_rgba(255,120,0,0.1)]">
                          {Array.from({ length: 14 }, (_, i) => {
                            const d = new Date(); d.setDate(d.getDate() + i);
                            return <option key={i} value={String(d.getDate()).padStart(2, '0')}>
                              {d.toLocaleString('es-ES', { weekday: 'short' }).toUpperCase()} {String(d.getDate()).padStart(2, '0')}
                            </option>
                          })}
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-4 p-1.5 bg-white/60 rounded-2xl border border-[#EADDCA]/50 backdrop-blur-sm shadow-inner">
                      {['Mañana', 'Tarde'].map(f => (
                        <button key={f} type="button" onClick={() => setForm({ ...form, turnoFranja: f, horaTentativa: f === 'Mañana' ? '09:00' : '15:00' })} className={`flex-1 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 ${form.turnoFranja === f ? 'bg-white shadow-[0_5px_15px_rgba(0,0,0,0.05)] text-accent-orange' : 'bg-transparent text-text-light/60 hover:text-primary hover:bg-white/30'}`}>
                          {f}
                        </button>
                      ))}
                    </div>

                    <div className="relative group">
                      <label className="absolute -top-2 left-4 bg-white px-2 text-[8px] font-black uppercase tracking-widest text-text-light/70 z-10 group-focus-within:text-accent-orange shadow-sm rounded-full">Horario Disponible</label>
                      <select name="horaTentativa" value={form.horaTentativa} onChange={handleChange} className="w-full bg-white/50 p-4 pt-5 rounded-2xl font-black text-sm md:text-base text-primary text-center border border-[#EADDCA]/50 focus:border-accent-orange outline-none shadow-inner cursor-pointer transition-all focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,120,0,0.1)]">
                        {dynamicSlots.map(h => <option key={h} value={h}>{h} HS</option>)}
                        {dynamicSlots.length === 0 && <option disabled>No hay disponibilidad</option>}
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* BOTONES DE ACCIÓN (Microinteracciones Senior) */}
            <div className="mt-10 flex items-center gap-4">
              {step > 1 && (
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleBack} className="w-16 h-16 rounded-[1.2rem] bg-white border border-[#EADDCA]/80 flex items-center justify-center text-text-light hover:text-primary shadow-sm hover:shadow-md transition-all">
                  <ChevronLeft size={22} strokeWidth={2.5} />
                </motion.button>
              )}
              {step < totalSteps ? (
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={handleNext}
                  className="flex-1 h-16 rounded-[1.2rem] bg-linear-to-r from-accent-orange to-orange-500 text-white font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(255,120,0,0.25)] hover:shadow-[0_15px_40px_rgba(255,120,0,0.4)] transition-all"
                >
                  Continuar <ChevronRight size={18} strokeWidth={2.5} />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={cargando}
                  className="flex-1 h-16 rounded-[1.2rem] bg-linear-to-r from-accent-orange to-orange-500 text-white font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(255,120,0,0.25)] hover:shadow-[0_15px_40px_rgba(255,120,0,0.4)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {cargando ? 'Procesando...' : 'Confirmar Orden'} <Send size={18} strokeWidth={2.5} />
                </motion.button>
              )}
            </div>
          </div>

          {/* COLUMNA DERECHA: RESUMEN LUXURY */}
          <div className="sticky top-32">
            <div className="bg-linear-to-br from-[#2D1F16] to-[#160d09] p-10 md:p-12 rounded-[3rem] text-white shadow-[0_30px_60px_-15px_rgba(45,31,22,0.6)] relative overflow-hidden border border-white/5 space-y-10 group">
              {/* Luxury Textures & Glows */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>
              <div className="absolute -top-32 -right-32 w-80 h-80 bg-accent-orange/10 rounded-full blur-[70px] group-hover:bg-accent-orange/20 transition-all duration-1000 pointer-events-none"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/5 rounded-full blur-[60px] pointer-events-none"></div>

              <div className="flex items-start justify-between border-b border-white/10 pb-8 relative z-10">
                <div>
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-2 text-transparent bg-clip-text bg-linear-to-r from-white to-white/60">Orden Clínica</h3>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-orange opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-orange"></span>
                    </span>
                    <p className="text-[8px] uppercase font-black text-white/40 tracking-[0.2em]">Enlace en tiempo real</p>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-inner">
                  <ShieldCheck className="text-accent-orange" size={24} strokeWidth={1.5} />
                </div>
              </div>

              <div className="space-y-8 relative z-10">
                <div className="space-y-5">
                  <div className="flex justify-between items-end group/item">
                    <p className="text-[9px] font-black uppercase text-white/30 tracking-[0.3em] group-hover/item:text-white/50 transition-colors">Paciente</p>
                    <p className="font-black text-sm uppercase tracking-tight">{form.nombre || '...'} <span className="text-white/60">{form.apellido || ''}</span></p>
                  </div>
                  <div className="flex justify-between items-end group/item">
                    <p className="text-[9px] font-black uppercase text-white/30 tracking-[0.3em] group-hover/item:text-white/50 transition-colors">DNI</p>
                    <p className="font-black text-sm uppercase tracking-widest">{form.dni || '---'}</p>
                  </div>
                  <div className="flex justify-between items-end group/item">
                    <p className="text-[9px] font-black uppercase text-white/30 tracking-[0.3em] group-hover/item:text-white/50 transition-colors">Contacto</p>
                    <p className="font-bold text-xs lowercase tracking-wider text-white/70">{form.email || form.telefono || '---'}</p>
                  </div>

                  {/* Doctor Highlight */}
                  <div className="flex justify-between items-center bg-white/5 p-5 rounded-2xl border border-white/5 mt-4 backdrop-blur-sm">
                    <p className="text-[9px] font-black uppercase text-white/40 tracking-[0.3em]">Dr / Dra</p>
                    <p className="font-black text-sm uppercase tracking-tight text-accent-orange">{form.doctor || 'Sin asignar'}</p>
                  </div>
                </div>

                {/* Planificación Highlight */}
                <div className="bg-linear-to-br from-white/10 to-white/5 p-6 md:p-7 rounded-3xl border border-white/10 space-y-6 backdrop-blur-md shadow-inner">
                  <div className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-full bg-accent-orange/20 flex items-center justify-center border border-accent-orange/10">
                      <Clock className="text-accent-orange" size={16} />
                    </div>
                    <div>
                      <p className="text-[8px] font-black uppercase text-white/40 tracking-[0.2em] mb-1">Agenda Solicitada</p>
                      <p className="font-black text-xs md:text-sm tracking-widest">{form.fechaDia}/{form.fechaMes}/26 <span className="text-accent-orange mx-1.5">•</span> {form.horaTentativa} HS</p>
                    </div>
                  </div>
                  <div className="h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent"></div>
                  <div className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/5">
                      <Activity className="text-white/70" size={16} />
                    </div>
                    <div>
                      <p className="text-[8px] font-black uppercase text-white/40 tracking-[0.2em] mb-1">Tratamiento</p>
                      <p className="font-bold text-[10px] md:text-xs tracking-wider uppercase text-white/90 line-clamp-1">{form.motivo || 'Pendiente de selección'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 text-center relative z-10">
                <p className="text-[8px] font-bold text-white/30 uppercase tracking-[0.3em] leading-relaxed">
                  Cita sujeta a confirmación médica<br />Centro Odontológico Boutique
                </p>
              </div>
            </div>

            <AnimatePresence>
              {mensaje.texto && (
                <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className={`mt-6 p-5 rounded-2xl flex items-start gap-4 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl backdrop-blur-md ${mensaje.tipo === "success" ? "text-green-400 bg-green-500/10 border border-green-500/20" : "text-red-400 bg-red-500/10 border border-red-500/20"}`}>
                  <Info size={18} className="shrink-0 mt-0.5" /> <span className="leading-relaxed">{mensaje.texto}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </main>

      {/* Footer Fijo Mobile Premium */}
      <footer className="md:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-[#EADDCA]/50 p-4 pb-safe flex justify-between items-center z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col">
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-text-light/60">Progreso</span>
          <span className="text-xs font-black uppercase text-accent-orange">Paso {step} de 3</span>
        </div>
        {step < totalSteps ? (
          <button onClick={handleNext} className="bg-linear-to-r from-accent-orange to-orange-500 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-orange-500/30 flex items-center gap-2">Siguiente <ChevronRight size={14} /></button>
        ) : (
          <button onClick={handleSubmit} disabled={cargando} className="bg-linear-to-r from-accent-orange to-orange-500 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-orange-500/30 flex items-center gap-2">{cargando ? '...' : 'Enviar WA'} <Send size={14} /></button>
        )}
      </footer>

      {/* Modal de Éxito Full Screen */}
      <AnimatePresence>
        {mostrarModalExito && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              className="bg-white rounded-[3rem] p-10 max-w-sm w-full relative z-10 flex flex-col items-center text-center shadow-2xl border border-white/20"
            >
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
                <Check className="text-green-500 w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-primary uppercase tracking-tighter mb-2">¡Turno Solicitado!</h3>
              <p className="text-text-light/70 text-xs font-bold leading-relaxed mb-8">
                Tu solicitud ha sido enviada al sistema. Redirigiendo al inicio para continuar...
              </p>
              <div className="w-full h-1.5 bg-[#FAF9F6] rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: "100%" }} 
                  transition={{ duration: 3 }} 
                  className="h-full bg-green-500"
                ></motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Turnos;