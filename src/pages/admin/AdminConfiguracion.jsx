import { useState, useEffect } from 'react';
import LayoutAdmin from "../../components/layouts/LayoutAdmin.jsx";
import { FaCog, FaClock, FaListUl, FaPlus, FaTrash, FaSave, FaBell, FaWhatsapp, FaEnvelope, FaPaperPlane, FaCalendarCheck, FaCheckCircle, FaTimesCircle, FaUsers } from 'react-icons/fa';
import api from '../../api/axios.js';

const AdminConfiguracion = () => {
  const [horarios, setHorarios] = useState({ apertura: '09:00', cierre: '18:00', intervalo: '30' });
  const [servicios, setServicios] = useState([
    { id: 1, nombre: 'Consulta General / Diagnóstico', duracion: 30 },
    { id: 2, nombre: 'Limpieza Dental Profunda', duracion: 45 },
    { id: 3, nombre: 'Ortodoncia (Brackets/Alineadores)', duracion: 30 },
    { id: 4, nombre: 'Implantología', duracion: 60 },
    { id: 5, nombre: 'Cirugía Oral / Extracción', duracion: 60 },
    { id: 6, nombre: 'Endodoncia (Tratamiento de Conducto)', duracion: 90 },
    { id: 7, nombre: 'Estética / Blanqueamiento', duracion: 60 },
    { id: 8, nombre: 'Prótesis Fija / Coronas', duracion: 60 },
    { id: 9, nombre: 'Periodoncia', duracion: 45 },
    { id: 10, nombre: 'Urgencia / Dolor', duracion: 30 }
  ]);
  const [nuevoServicio, setNuevoServicio] = useState({ nombre: '', duracion: 30 });
  const [turnosManana, setTurnosManana] = useState([]);
  const [loadingTurnos, setLoadingTurnos] = useState(false);
  const [enviandoMasivo, setEnviandoMasivo] = useState(false);
  const [enviandoIdx, setEnviandoIdx] = useState(-1);
  const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });
  const [guardando, setGuardando] = useState(false);

  const showToast = (msg, type = 'success') => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 4000);
  };

  useEffect(() => {
    fetchConfiguracion();
    fetchTurnosManana();
  }, []);

  const fetchConfiguracion = async () => {
    try {
      const res = await api.get('/configuracion');
      if (res.data) {
        setHorarios(res.data.horarios || horarios);
        
        // Si la base de datos solo tiene los 3 antiguos, forzamos los 10 nuevos
        if (!res.data.servicios || res.data.servicios.length <= 3) {
          const nuevosServicios = [
            { id: 1, nombre: 'Consulta General / Diagnóstico', duracion: 30 },
            { id: 2, nombre: 'Limpieza Dental Profunda', duracion: 45 },
            { id: 3, nombre: 'Ortodoncia (Brackets/Alineadores)', duracion: 30 },
            { id: 4, nombre: 'Implantología', duracion: 60 },
            { id: 5, nombre: 'Cirugía Oral / Extracción', duracion: 60 },
            { id: 6, nombre: 'Endodoncia (Tratamiento de Conducto)', duracion: 90 },
            { id: 7, nombre: 'Estética / Blanqueamiento', duracion: 60 },
            { id: 8, nombre: 'Prótesis Fija / Coronas', duracion: 60 },
            { id: 9, nombre: 'Periodoncia', duracion: 45 },
            { id: 10, nombre: 'Urgencia / Dolor', duracion: 30 }
          ];
          setServicios(nuevosServicios);
          // Opcional: Autoguardado silencioso para actualizar la DB
          api.put('/configuracion', { horarios: res.data.horarios || horarios, servicios: nuevosServicios }).catch(()=>{});
        } else {
          setServicios(res.data.servicios);
        }
      }
    } catch { }
  };

  const fetchTurnosManana = async () => {
    setLoadingTurnos(true);
    try {
      const res = await api.get('/turnos');
      const manana = new Date();
      manana.setDate(manana.getDate() + 1);
      const mananaStr = `${manana.getFullYear()}-${String(manana.getMonth() + 1).padStart(2, '0')}-${String(manana.getDate()).padStart(2, '0')}`;
      const filtrados = res.data
        .filter(t => t.fecha?.startsWith(mananaStr) && ['Pendiente', 'Confirmado'].includes(t.estado))
        .sort((a, b) => a.hora?.localeCompare(b.hora));
      setTurnosManana(filtrados);
    } catch { }
    finally { setLoadingTurnos(false); }
  };

  const handleAddServicio = (e) => {
    e.preventDefault();
    if (!nuevoServicio.nombre.trim()) return;
    setServicios([...servicios, { id: Date.now(), ...nuevoServicio }]);
    setNuevoServicio({ nombre: '', duracion: 30 });
  };

  const handleGuardarTodo = async () => {
    setGuardando(true);
    try {
      await api.put('/configuracion', { horarios, servicios });
      showToast('¡Configuración guardada exitosamente!', 'success');
    } catch {
      showToast('Error al guardar la configuración.', 'error');
    } finally { setGuardando(false); }
  };

  const buildMensaje = (turno) => {
    const partes = turno.fecha?.split('-') || [];
    const fechaFmt = partes.length === 3 ? `${partes[2]}/${partes[1]}/${partes[0]}` : turno.fecha;
    return `Hola ${turno.nombrePaciente} ${turno.apellidoPaciente}, te recordamos tu turno en Centro Odontológico C&M para mañana ${fechaFmt} a las ${turno.hora} hs. Motivo: ${turno.motivo}. ¡Te esperamos! 😊🦷`;
  };

  const limpiarTelefono = (telefono) => {
    let tel = telefono ? telefono.replace(/\D/g, '') : '';
    if (!tel) return '';
    // Lógica de formateo para Argentina / Tucumán
    if (tel.startsWith('0')) tel = '549' + tel.substring(1);
    if (tel.startsWith('15')) tel = '549381' + tel.substring(2);
    if (tel.length > 0 && tel.length <= 10 && !tel.startsWith('54')) {
      tel = '549' + tel;
    }
    return tel;
  };

  const enviarWhatsApp = (turno) => {
    const tel = limpiarTelefono(turno.telefono);
    if (!tel) return showToast(`${turno.nombrePaciente} no tiene teléfono válido.`, 'error');
    window.open(`https://wa.me/${tel}?text=${encodeURIComponent(buildMensaje(turno))}`, '_blank');
  };

  const enviarEmail = (turno) => {
    if (!turno.email) return showToast(`${turno.nombrePaciente} no tiene email registrado.`, 'error');
    window.open(`mailto:${turno.email}?subject=Recordatorio de Turno - Centro Odontológico C%26M&body=${encodeURIComponent(buildMensaje(turno))}`, '_blank');
  };

  const handleRecordatoriosMasivos = async () => {
    if (turnosManana.length === 0) return showToast('No hay turnos para mañana.', 'error');
    if (!window.confirm(`¿Enviar recordatorio a ${turnosManana.length} paciente(s)? Se abrirán pestañas de WhatsApp y Email secuencialmente.`)) return;
    
    setEnviandoMasivo(true);
    let i = 0;
    
    const interval = setInterval(() => {
      if (i >= turnosManana.length) {
        clearInterval(interval);
        setEnviandoMasivo(false);
        setEnviandoIdx(-1);
        showToast(`✅ Proceso de recordatorios finalizado.`, 'success');
        api.post('/notificaciones/recordatorios-manana').catch(() => { });
        return;
      }

      const t = turnosManana[i];
      setEnviandoIdx(i);
      
      // Enviamos por ambos canales si están disponibles
      if (t.telefono) enviarWhatsApp(t);
      if (t.email) setTimeout(() => enviarEmail(t), 400); // Pequeño delay para no saturar al abrir pestañas

      i++;
    }, 2000); // Aumentamos a 2s para dar tiempo al navegador
  };

  const mananaLabel = (() => {
    const d = new Date(); d.setDate(d.getDate() + 1);
    return d.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' });
  })();

  return (
    <LayoutAdmin>
      {toast.show && (
        <div className={`fixed top-6 right-6 z-200 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl font-black text-sm text-white border animate-fade-in backdrop-blur-md
          ${toast.type === 'success' ? 'bg-green-500/90 border-green-400/50' : 'bg-red-500/90 border-red-400/50'}`}>
          {toast.type === 'success' ? <FaCheckCircle className="text-lg shrink-0" /> : <FaTimesCircle className="text-lg shrink-0" />}
          {toast.msg}
        </div>
      )}

      <header className="mb-6 md:mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-orange mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-orange animate-pulse"></span> Panel Administrativo
          </p>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-primary tracking-tight">Configuración</h1>
          <p className="text-text-light font-medium text-xs md:text-sm mt-1">Parámetros operativos y notificaciones del centro.</p>
        </div>
        <button
          onClick={handleGuardarTodo}
          disabled={guardando}
          className="w-full md:w-auto flex justify-center items-center gap-2 px-6 py-3.5 bg-linear-to-r from-green-500 to-emerald-600 text-white font-black rounded-2xl shadow-lg shadow-green-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-60 text-sm"
        >
          <FaSave className={guardando ? 'animate-spin' : ''} />
          {guardando ? 'Guardando...' : 'Guardar Todo'}
        </button>
      </header>

      {/* ══════════════════════════════════════════════════
          SECCIÓN RECORDATORIOS — ARRIBA Y PRINCIPAL
      ══════════════════════════════════════════════════ */}
      <section className="mb-8">
        {/* Hero Card de Acción Masiva */}
        <div className="bg-linear-to-br from-primary via-[#3a2e25] to-[#2a1f16] rounded-[2.5rem] p-8 md:p-10 text-white relative overflow-hidden mb-5 shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,120,0,0.2),transparent_60%)] pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 opacity-[0.04]">
            <FaBell className="w-full h-full" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-accent-orange/20 rounded-2xl flex items-center justify-center border border-accent-orange/30">
                  <FaBell className="text-accent-orange text-xl" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-orange">Centro Odontológico C&M</p>
                  <h2 className="text-2xl font-black tracking-tight">Recordatorios Automáticos</h2>
                </div>
              </div>
              <p className="text-white/60 text-sm font-medium max-w-lg">
                Con un solo clic, se envían mensajes personalizados de WhatsApp y Email a todos los pacientes agendados para <span className="text-accent-orange font-black capitalize">{mananaLabel}</span>.
              </p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/10">
                  <FaUsers className="text-accent-orange text-sm" />
                  <span className="text-sm font-black">{loadingTurnos ? '...' : turnosManana.length} pacientes</span>
                </div>
                <div className="flex items-center gap-2 text-white/40 text-xs font-bold">
                  <FaWhatsapp className="text-green-400" /> WhatsApp
                  <span className="text-white/20">·</span>
                  <FaEnvelope className="text-blue-400" /> Email
                </div>
              </div>
            </div>

            <button
              onClick={handleRecordatoriosMasivos}
              disabled={enviandoMasivo || loadingTurnos || turnosManana.length === 0}
              className={`w-full md:w-auto shrink-0 flex flex-row md:flex-col items-center justify-center gap-2 px-6 md:px-10 py-4 md:py-6 rounded-2xl md:rounded-3xl font-black transition-all border-2 shadow-2xl
                ${turnosManana.length === 0
                  ? 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed'
                  : enviandoMasivo
                    ? 'bg-accent-orange/20 border-accent-orange/50 text-accent-orange cursor-wait'
                    : 'bg-accent-orange border-accent-orange text-white hover:bg-orange-500 hover:shadow-orange-500/30 hover:-translate-y-1 active:scale-95'
                }`}
            >
              {enviandoMasivo ? (
                <>
                  <div className="w-6 h-6 md:w-8 md:h-8 border-3 border-accent-orange border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xs uppercase tracking-widest">Enviando {enviandoIdx + 1}/{turnosManana.length}</span>
                </>
              ) : (
                <>
                  <FaPaperPlane className="text-xl md:text-2xl" />
                  <span className="text-xs uppercase tracking-widest">Enviar a Todos</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tabla de pacientes de mañana */}
        <div className="bg-white rounded-4xl shadow-sm border border-secondary/10 overflow-hidden">
          <div className="flex items-center justify-between px-8 py-5 border-b border-secondary/10">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-accent-orange rounded-full"></div>
              <div>
                <h3 className="font-black text-primary capitalize">Pacientes de {mananaLabel}</h3>
                <p className="text-[10px] font-bold text-text-light uppercase tracking-widest">{turnosManana.length} turnos confirmados / pendientes</p>
              </div>
            </div>
            <button onClick={fetchTurnosManana} className="text-[10px] font-black text-accent-orange uppercase tracking-widest bg-accent-orange/5 px-4 py-2 rounded-full hover:bg-accent-orange/10 transition-all">
              Actualizar
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-secondary/5">
                  <th className="py-3 px-6 text-[9px] font-black uppercase tracking-[0.15em] text-text-light/50">Paciente</th>
                  <th className="py-3 px-6 text-[9px] font-black uppercase tracking-[0.15em] text-text-light/50 hidden sm:table-cell">Hora</th>
                  <th className="py-3 px-6 text-[9px] font-black uppercase tracking-[0.15em] text-text-light/50 hidden md:table-cell">Tratamiento</th>
                  <th className="py-3 px-6 text-[9px] font-black uppercase tracking-[0.15em] text-text-light/50 hidden lg:table-cell">Contacto</th>
                  <th className="py-3 px-6 text-[9px] font-black uppercase tracking-[0.15em] text-text-light/50 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary/5">
                {loadingTurnos ? (
                  <tr><td colSpan="5" className="py-12 text-center text-text-light font-bold text-sm animate-pulse">Cargando turnos...</td></tr>
                ) : turnosManana.length > 0 ? turnosManana.map((turno, idx) => (
                  <tr key={turno._id} className={`hover:bg-background/50 transition-colors group ${enviandoIdx === idx ? 'bg-accent-orange/5' : ''}`}>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center text-[10px] font-black text-primary shrink-0">
                          {turno.nombrePaciente?.charAt(0)}{turno.apellidoPaciente?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-black text-primary text-sm">{turno.nombrePaciente} {turno.apellidoPaciente}</p>
                          <p className="text-[10px] text-text-light font-medium">{turno.estado}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 hidden sm:table-cell">
                      <span className="font-black text-primary">{turno.hora}</span>
                      <span className="text-text-light font-bold text-xs"> hs</span>
                    </td>
                    <td className="py-4 px-6 hidden md:table-cell">
                      <span className="text-[10px] font-bold text-text-light bg-secondary/5 border border-secondary/10 px-2.5 py-1 rounded-lg">{turno.motivo}</span>
                    </td>
                    <td className="py-4 px-6 hidden lg:table-cell">
                      <div className="flex flex-col gap-0.5">
                        {turno.telefono && <span className="text-[10px] font-bold text-green-600 flex items-center gap-1"><FaWhatsapp /> {turno.telefono}</span>}
                        {turno.email && <span className="text-[10px] font-bold text-blue-500 flex items-center gap-1"><FaEnvelope /> {turno.email}</span>}
                        {!turno.telefono && !turno.email && <span className="text-[10px] font-bold text-red-400">Sin contacto</span>}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => enviarWhatsApp(turno)}
                          disabled={!turno.telefono}
                          title={turno.telefono ? 'Enviar WhatsApp' : 'Sin teléfono'}
                          className="flex items-center gap-1.5 px-3 py-2 bg-green-50 text-green-600 rounded-xl hover:bg-green-500 hover:text-white transition-all text-xs font-black disabled:opacity-30 disabled:cursor-not-allowed border border-green-200/50"
                        >
                          <FaWhatsapp className="text-sm" /> WA
                        </button>
                        <button
                          onClick={() => enviarEmail(turno)}
                          disabled={!turno.email}
                          title={turno.email ? 'Enviar Email' : 'Sin email'}
                          className="flex items-center gap-1.5 px-3 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-500 hover:text-white transition-all text-xs font-black disabled:opacity-30 disabled:cursor-not-allowed border border-blue-200/50"
                        >
                          <FaEnvelope className="text-sm" /> Mail
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" className="py-16 text-center">
                      <div className="w-12 h-12 bg-secondary/5 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <FaCalendarCheck className="text-xl text-text-light/30" />
                      </div>
                      <p className="text-text-light font-bold text-sm">No hay turnos agendados para mañana.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CONFIGURACIÓN OPERATIVA
      ══════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Horarios */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-secondary/10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-11 h-11 bg-primary/5 rounded-2xl flex items-center justify-center">
              <FaClock className="text-xl text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-black text-primary">Horarios de Atención</h2>
              <p className="text-[10px] font-bold text-text-light uppercase tracking-widest">Configuración del calendario</p>
            </div>
          </div>
          <div className="space-y-5">
            {[
              { label: 'Apertura del Consultorio', key: 'apertura', type: 'time' },
              { label: 'Cierre del Consultorio', key: 'cierre', type: 'time' },
            ].map(({ label, key, type }) => (
              <div key={key}>
                <label className="block text-[9px] font-black text-text-light/50 uppercase tracking-[0.2em] mb-2">{label}</label>
                <input
                  type={type}
                  value={horarios[key]}
                  onChange={e => setHorarios({ ...horarios, [key]: e.target.value })}
                  className="w-full p-3.5 bg-background rounded-2xl font-bold text-primary border border-secondary/10 focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/10 outline-none transition-all"
                />
              </div>
            ))}

          </div>
        </div>

        {/* Servicios */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-secondary/10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-11 h-11 bg-accent-orange/10 rounded-2xl flex items-center justify-center">
              <FaListUl className="text-xl text-accent-orange" />
            </div>
            <div>
              <h2 className="text-lg font-black text-primary">Catálogo de Servicios</h2>
              <p className="text-[10px] font-bold text-text-light uppercase tracking-widest">{servicios.length} servicios activos</p>
            </div>
          </div>

          <form onSubmit={handleAddServicio} className="flex gap-2 mb-6 bg-background/60 p-3 rounded-2xl border border-secondary/10">
            <input
              type="text"
              placeholder="Ej: Blanqueamiento dental"
              value={nuevoServicio.nombre}
              onChange={e => setNuevoServicio({ ...nuevoServicio, nombre: e.target.value })}
              className="flex-1 p-2.5 bg-white rounded-xl font-bold text-sm border border-secondary/10 focus:border-accent-orange outline-none transition-all"
            />
            <select
              value={nuevoServicio.duracion}
              onChange={e => setNuevoServicio({ ...nuevoServicio, duracion: Number(e.target.value) })}
              className="w-24 p-2.5 bg-white rounded-xl font-bold text-sm border border-secondary/10 focus:border-accent-orange outline-none appearance-none text-center"
            >
              {[15, 30, 45, 60, 90].map(m => <option key={m} value={m}>{m}min</option>)}
            </select>
            <button type="submit" className="w-11 h-11 bg-accent-orange text-white rounded-xl flex items-center justify-center hover:bg-orange-500 transition-all shadow-md shadow-orange-500/20 shrink-0">
              <FaPlus />
            </button>
          </form>

          <div className="space-y-2 max-h-[260px] overflow-y-auto custom-scrollbar pr-1">
            {servicios.map(s => (
              <div key={s.id} className="flex items-center justify-between p-4 bg-background/40 rounded-2xl border border-secondary/5 group hover:border-accent-orange/20 transition-all">
                <div>
                  <p className="font-bold text-primary text-sm">{s.nombre}</p>
                  <p className="text-[10px] text-text-light font-bold uppercase tracking-wider">{s.duracion} minutos</p>
                </div>
                <button
                  onClick={() => setServicios(servicios.filter(x => x.id !== s.id))}
                  className="w-8 h-8 text-red-400 bg-red-50 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all border border-red-100"
                >
                  <FaTrash className="text-xs" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default AdminConfiguracion;
