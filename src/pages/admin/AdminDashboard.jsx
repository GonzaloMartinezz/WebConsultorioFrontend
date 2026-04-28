import { useState, useEffect } from 'react';
import LayoutAdmin from "../../components/layouts/LayoutAdmin.jsx";
import { FaCalendarDay, FaUserClock, FaPlus, FaCheckCircle, FaTimesCircle, FaPen, FaEnvelope, FaTrash, FaWhatsapp, FaFileMedical, FaUserAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios.js';

const AdminDashboard = () => {
  const [turnos, setTurnos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [turnoAEditar, setTurnoAEditar] = useState(null);
  const [editForm, setEditForm] = useState({ fechaDia: '', fechaMes: '', fechaAno: '', hora: '09:00', profesional: 'Dra. Erina' });
  const [notificacionPendiente, setNotificacionPendiente] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const navigate = useNavigate();
  const d = new Date();
  const fechaHoy = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  const fetchTurnos = async () => {
    try {
      const respuesta = await api.get('/turnos');
      setTurnos(respuesta.data);
    } catch (error) {
      console.error("Error al cargar los turnos:", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate('/login');
      }
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchTurnos();
    const interval = setInterval(fetchTurnos, 15000);
    return () => clearInterval(interval);
  }, [navigate]);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000);
  };

  // ====== HELPERS ======
  const obtenerRangoHorario = (turnoHora) => {
    if (turnoHora && turnoHora.includes(':')) {
      const p = turnoHora.replace(/[^0-9:]/g, '').split(':');
      if (p.length >= 2) {
        const s = `${p[0].padStart(2, '0')}${p[1].padStart(2, '0')}00`;
        const eH = (parseInt(p[0]) + 1).toString().padStart(2, '0');
        return { start: s, end: `${eH}${p[1].padStart(2, '0')}00` };
      }
    }
    return { start: '090000', end: '100000' };
  };

  const generarUrlsNotificacion = (turnoData, fechaLegible, horarioTexto, fechaISO, profesionalUpdate) => {
    let telefonoLimpio = turnoData.telefono ? turnoData.telefono.replace(/\D/g, '') : '';
    if (telefonoLimpio.startsWith('0')) telefonoLimpio = '549' + telefonoLimpio.substring(1);
    if (telefonoLimpio.startsWith('15')) telefonoLimpio = '549381' + telefonoLimpio.substring(2);
    if (telefonoLimpio.length > 0 && telefonoLimpio.length <= 10 && !telefonoLimpio.startsWith('54')) {
      telefonoLimpio = '549' + telefonoLimpio;
    }

    const rango = obtenerRangoHorario(horarioTexto);
    const fechaBase = fechaISO || turnoData.fecha;
    const fechaLimpia = fechaBase ? fechaBase.replace(/-/g, '') : '';
    const loc = 'Jose Rondeau 827, San Miguel de Tucumán';

    const prof = profesionalUpdate || turnoData.profesional || 'Por asignar';
    const title = `Turno Dental: ${turnoData.nombrePaciente}`;
    const desc = `C&M Centro Odontológico\nProfesional: ${prof}\nProcedimiento: ${turnoData.motivo || 'Consulta'}`;
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${fechaLimpia}T${rango.start}/${fechaLimpia}T${rango.end}&details=${encodeURIComponent(desc)}&location=${encodeURIComponent(loc)}`;
    
    const gcalAdminUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Cita: ${turnoData.nombrePaciente} ${turnoData.apellidoPaciente}`)}&dates=${fechaLimpia}T${rango.start}/${fechaLimpia}T${rango.end}&details=${encodeURIComponent(`Motivo: ${turnoData.motivo}\nWhatsApp: ${turnoData.telefono}`)}&location=${encodeURIComponent(loc)}&reminder=120`;

    const mensajeWA = `*¡Hola ${turnoData.nombrePaciente}!* 🦷✨\nTe confirmamos tu cita en *C&M Centro Odontológico*.\n\n📅 *Fecha:* ${fechaLegible}\n⏰ *Horario:* ${horarioTexto} hs\n👩‍⚕️ *Profesional:* ${prof}\n🦷 *Motivo:* ${turnoData.motivo || 'Consulta'}\n\n📍 *Ubicación:* ${loc}\n\n👇 *Agendalo en tu calendario:* \n${gcalUrl}\n\n¡Te esperamos!`;
    const waUrl = telefonoLimpio ? `https://wa.me/${telefonoLimpio}?text=${encodeURIComponent(mensajeWA)}` : '';

    const asunto = encodeURIComponent(`✅ Turno Confirmado - C&M Dental (${fechaLegible})`);
    const cuerpo = encodeURIComponent(`Hola ${turnoData.nombrePaciente},\n\nTu cita ha sido agendada correctamente para el ${fechaLegible} a las ${horarioTexto} hs.\n\nLink para tu calendario: ${gcalUrl}\n\n¡Te esperamos!\n\nEquipo C&M Centro Odontológico`);
    const mailUrl = turnoData.email ? `mailto:${turnoData.email}?subject=${asunto}&body=${cuerpo}` : '';

    return { waUrl, mailUrl, gcalAdminUrl, nombrePaciente: turnoData.nombrePaciente };
  };

  // ====== ACCIONES ======
  const handleApprove = async (turno) => {
    try {
      await api.patch(`/turnos/${turno._id}/estado`, { estado: 'Confirmado' });
      showToast('✅ Turno confirmado', 'success');
      fetchTurnos();

      const fechaLeg = turno.fecha ? turno.fecha.split('-').reverse().join('/') : '';
      const urls = generarUrlsNotificacion(turno, fechaLeg, turno.hora, turno.fecha);

      if (urls.waUrl) window.open(urls.waUrl, '_blank');
      setNotificacionPendiente(urls);
    } catch (error) {
      showToast('Error al confirmar', 'error');
    }
  };

  const handleConfirmEdit = async () => {
    if (!turnoAEditar || !editForm.fechaDia || !editForm.fechaMes || !editForm.fechaAno) {
      showToast('Completa la fecha', 'error');
      return;
    }
    const fechaFinal = `${editForm.fechaAno}-${editForm.fechaMes.padStart(2, '0')}-${String(editForm.fechaDia).padStart(2, '0')}`;
    try {
      await api.patch(`/turnos/${turnoAEditar._id}/estado`, {
        estado: 'Confirmado',
        fecha: fechaFinal,
        hora: editForm.hora,
        profesional: editForm.profesional,
        nombrePaciente: editForm.nombrePaciente,
        apellidoPaciente: editForm.apellidoPaciente,
        dni: editForm.dni,
        email: editForm.email,
        telefono: editForm.telefono
      });
      showToast('✅ Reagendado y confirmado', 'success');
      fetchTurnos();
      setModalEditOpen(false);

      const urls = generarUrlsNotificacion(turnoAEditar, `${editForm.fechaDia}/${editForm.fechaMes}/${editForm.fechaAno}`, editForm.hora, fechaFinal, editForm.profesional);
      if (urls.waUrl) window.open(urls.waUrl, '_blank');
      setNotificacionPendiente(urls);
    } catch (error) {
      showToast('Error al editar', 'error');
    }
  };

  const handleReject = async (id) => {
    try {
      await api.patch(`/turnos/${id}/estado`, { estado: 'Cancelado' });
      showToast('Turno Cancelado', 'error');
      fetchTurnos();
    } catch (error) { showToast('Error', 'error'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar definitivamente?')) return;
    try {
      await api.delete(`/turnos/${id}`);
      showToast('Eliminado', 'success');
      fetchTurnos();
    } catch (error) { showToast('Error', 'error'); }
  };

  const abrirModalEdicion = (turno) => {
    setTurnoAEditar(turno);
    const partes = turno.fecha ? turno.fecha.split('-') : ['', '', ''];
    setEditForm({
      fechaAno: partes[0] || new Date().getFullYear().toString(),
      fechaMes: partes[1] || '',
      fechaDia: partes[2] ? parseInt(partes[2]).toString() : '',
      hora: turno.hora || '09:00',
      profesional: turno.profesional || 'Dra. Erina',
      nombrePaciente: turno.nombrePaciente || '',
      apellidoPaciente: turno.apellidoPaciente || '',
      dni: turno.dni || '',
      email: turno.email || '',
      telefono: turno.telefono || ''
    });
    setModalEditOpen(true);
  };

  return (
    <LayoutAdmin>
      {toast.show && (
        <div className={`fixed top-6 right-6 z-[200] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl font-black text-sm text-white border animate-fade-in backdrop-blur-md
          ${toast.type === 'success' ? 'bg-green-500/90 border-green-400/50' : 'bg-red-500/90 border-red-400/50'}`}
        >
          {toast.type === 'success' ? <FaCheckCircle className="text-lg" /> : <FaTimesCircle className="text-lg" />}
          {toast.message}
        </div>
      )}

      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-orange mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-orange animate-pulse"></span> Centro Odontológico C&M
          </p>
          <h1 className="text-3xl lg:text-4xl font-black text-primary tracking-tight">Panel de Control</h1>
          <p className="text-text-light text-sm font-medium mt-1">
            {new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/agenda" className="px-6 py-3 bg-white text-primary font-bold rounded-xl shadow-sm border border-secondary/20 hover:border-accent-orange/30 hover:shadow-md transition-all flex items-center gap-2 text-sm">
            <FaCalendarDay className="text-accent-orange" /> Agenda
          </Link>
          <Link to="/turnos" className="px-6 py-3 bg-primary text-white font-black rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all flex items-center gap-2 text-sm">
            <FaPlus /> Nuevo Turno
          </Link>
        </div>
      </header>

      <main className="space-y-6">
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-secondary/10 hover:shadow-lg hover:border-accent-orange/20 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-accent-orange/10 rounded-xl flex items-center justify-center group-hover:bg-accent-orange/20 transition-colors">
                <FaCalendarDay className="text-accent-orange" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-accent-orange bg-accent-orange/5 px-2 py-1 rounded-full">Hoy</span>
            </div>
            <p className="text-3xl font-black text-primary">{turnos.filter(t => t.fecha && t.fecha.startsWith(fechaHoy) && t.estado !== 'Cancelado').length}</p>
            <p className="text-[10px] font-bold text-text-light uppercase tracking-wider mt-1">Turnos Agendados</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-secondary/10 hover:shadow-lg hover:border-amber-200 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                <FaUserClock className="text-amber-500" />
              </div>
              {turnos.filter(t => t.estado === 'Pendiente').length > 0 && (
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse shadow-sm shadow-amber-500/50"></span>
              )}
            </div>
            <p className="text-3xl font-black text-amber-600">{turnos.filter(t => t.estado === 'Pendiente').length}</p>
            <p className="text-[10px] font-bold text-text-light uppercase tracking-wider mt-1">Por Confirmar</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-secondary/10 hover:shadow-lg hover:border-green-200 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center group-hover:bg-green-100 transition-colors">
                <FaCheckCircle className="text-green-500" />
              </div>
            </div>
            <p className="text-3xl font-black text-green-600">{turnos.filter(t => t.estado === 'Confirmado').length}</p>
            <p className="text-[10px] font-bold text-text-light uppercase tracking-wider mt-1">Confirmados</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-secondary/10 hover:shadow-lg hover:border-blue-200 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <FaUserAlt className="text-blue-500" />
              </div>
            </div>
            <p className="text-3xl font-black text-blue-600">{new Set(turnos.filter(t => t.estado !== 'Cancelado').map(t => t.dni || t.email || t.nombrePaciente)).size}</p>
            <p className="text-[10px] font-bold text-text-light uppercase tracking-wider mt-1">Pacientes Únicos</p>
          </div>
        </section>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-secondary/10 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-accent-orange rounded-full"></div>
              <h2 className="text-primary font-black uppercase tracking-widest text-sm">Agenda de Pacientes</h2>
            </div>
            <Link to="/admin/pendientes" className="text-[10px] font-black text-accent-orange hover:text-primary uppercase tracking-widest bg-accent-orange/5 px-4 py-2 rounded-full hover:bg-accent-orange/10 transition-all">
              Solicitudes Web →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-secondary/10">
                  <th className="py-3 px-3 text-[9px] font-black uppercase tracking-[0.15em] text-text-light/50">Fecha</th>
                  <th className="py-3 px-3 text-[9px] font-black uppercase tracking-[0.15em] text-text-light/50">Hora</th>
                  <th className="py-3 px-3 text-[9px] font-black uppercase tracking-[0.15em] text-text-light/50">Paciente</th>
                  <th className="py-3 px-3 text-[9px] font-black uppercase tracking-[0.15em] text-text-light/50 hidden md:table-cell">DNI</th>
                  <th className="py-3 px-3 text-[9px] font-black uppercase tracking-[0.15em] text-text-light/50 hidden lg:table-cell">Motivo</th>
                  <th className="py-3 px-3 text-[9px] font-black uppercase tracking-[0.15em] text-text-light/50">Estado</th>
                  <th className="py-3 px-3 text-right text-[9px] font-black uppercase tracking-[0.15em] text-text-light/50">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary/5">
                {turnos
                  .filter(t => t.estado !== 'Cancelado' && t.fecha && t.fecha >= fechaHoy)
                  .sort((a, b) => a.fecha.localeCompare(b.fecha) || (a.hora || '').localeCompare(b.hora || ''))
                  .map(turno => (
                    <tr key={turno._id} className="hover:bg-background/50 transition-colors group">
                      <td className="py-4 px-3">
                        <span className={`text-xs font-bold ${turno.fecha === fechaHoy ? 'text-accent-orange' : 'text-text'}`}>
                          {turno.fecha?.split('T')[0].split('-').reverse().join('/')}
                        </span>
                        {turno.fecha === fechaHoy && <span className="block text-[8px] font-black text-accent-orange uppercase">Hoy</span>}
                      </td>
                      <td className="py-4 px-3 text-sm font-black text-primary">{turno.hora}</td>
                      <td className="py-4 px-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-[10px] font-black text-primary shrink-0">
                            {turno.nombrePaciente?.charAt(0)}{turno.apellidoPaciente?.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-primary">{turno.nombrePaciente} {turno.apellidoPaciente}</p>
                            {turno.telefono && <p className="text-[10px] text-text-light font-medium hidden xl:block">{turno.telefono}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-3 text-[11px] font-medium text-text-light hidden md:table-cell">{turno.dni || '—'}</td>
                      <td className="py-4 px-3 hidden lg:table-cell">
                        <span className="text-[10px] font-bold text-text-light bg-background px-2.5 py-1 rounded-lg">{turno.motivo || 'Consulta'}</span>
                      </td>
                      <td className="py-4 px-3">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider inline-flex items-center gap-1.5
                          ${turno.estado === 'Confirmado' ? 'bg-green-50 text-green-700 border border-green-200' : 
                            turno.estado === 'Pendiente' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                            'bg-blue-50 text-blue-700 border border-blue-200'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${turno.estado === 'Confirmado' ? 'bg-green-500' : turno.estado === 'Pendiente' ? 'bg-amber-500 animate-pulse' : 'bg-blue-500'}`}></span>
                          {turno.estado}
                        </span>
                      </td>
                      <td className="py-4 px-3 text-right">
                        <div className="flex justify-end gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                          {turno.estado === 'Pendiente' && (
                            <button onClick={() => handleApprove(turno)} title="Confirmar" className="p-2 text-green-600 bg-green-50 rounded-xl hover:bg-green-100 hover:shadow-sm transition-all"><FaCheckCircle /></button>
                          )}
                          <Link to={`/admin/paciente/${turno.pacienteId?._id || turno.pacienteId}`} title="Ficha" className="p-2 text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 hover:shadow-sm transition-all"><FaFileMedical /></Link>
                          <button onClick={() => abrirModalEdicion(turno)} title="Editar" className="p-2 text-primary bg-secondary/10 rounded-xl hover:bg-secondary/20 hover:shadow-sm transition-all"><FaPen /></button>
                          <button onClick={() => handleDelete(turno._id)} title="Eliminar" className="p-2 text-red-400 bg-red-50 rounded-xl hover:bg-red-100 hover:shadow-sm transition-all"><FaTrash /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                {turnos.filter(t => t.estado !== 'Cancelado' && t.fecha && t.fecha >= fechaHoy).length === 0 && (
                  <tr>
                    <td colSpan="7" className="py-16 text-center">
                      <p className="text-text-light/40 font-bold text-sm">No hay turnos próximos</p>
                      <Link to="/turnos" className="text-accent-orange text-xs font-black uppercase mt-2 inline-block hover:underline">Agendar uno →</Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {notificacionPendiente && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xl flex items-center justify-center z-[300] p-4 animate-fade-in">
          <div className="bg-white rounded-[2rem] w-full max-w-sm overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 text-center text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/20">
                  <FaCheckCircle className="text-3xl text-white" />
                </div>
                <h2 className="text-xl font-black uppercase tracking-tight">¡Turno Confirmado!</h2>
                <p className="text-white/70 text-xs mt-2 font-bold">Notificá al paciente por el medio que prefieras</p>
              </div>
            </div>

            <div className="p-6 space-y-3">
              <a href={notificacionPendiente.waUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full py-4 px-5 bg-[#25D366]/10 text-[#25D366] rounded-2xl font-black text-sm hover:bg-[#25D366] hover:text-white transition-all border border-[#25D366]/20">
                <FaWhatsapp className="text-xl" /> Enviar WhatsApp
              </a>
              <a href={notificacionPendiente.mailUrl} className="flex items-center gap-3 w-full py-4 px-5 bg-blue-50 text-blue-600 rounded-2xl font-black text-sm hover:bg-blue-500 hover:text-white transition-all border border-blue-200">
                <FaEnvelope /> Enviar Email
              </a>
              <a href={notificacionPendiente.gcalAdminUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full py-3 px-5 bg-background text-text-light rounded-2xl font-bold text-sm hover:bg-accent-orange/10 hover:text-accent-orange transition-all border border-secondary/10">
                📅 Agendar en mi Calendario
              </a>
              <button onClick={() => setNotificacionPendiente(null)} className="w-full py-3 text-text-light/40 font-bold text-[10px] uppercase tracking-widest mt-2 hover:text-primary transition-colors">Cerrar</button>
            </div>
          </div>
        </div>
      )}

      {modalEditOpen && turnoAEditar && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xl flex items-center justify-center z-[300] p-4 animate-fade-in" onClick={() => setModalEditOpen(false)}>
          <div className="bg-white rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="bg-gradient-to-br from-primary to-[#3a2e25] p-6 text-white text-center relative overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,120,0,0.15),transparent_60%)]"></div>
              <div className="relative z-10">
                <button onClick={() => setModalEditOpen(false)} className="absolute top-0 right-0 w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all">
                  <FaTimesCircle className="text-sm" />
                </button>
                <h2 className="font-black uppercase tracking-wider text-lg">Gestionar Cita</h2>
                <p className="text-[10px] text-white/50 font-bold uppercase tracking-[0.2em] mt-1">Edición Administrativa</p>
              </div>
            </div>
            <div className="p-6 space-y-5 overflow-y-auto custom-scrollbar">
              <div>
                <p className="text-[9px] font-black text-text-light/40 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                  <span className="w-1 h-3 bg-accent-orange rounded-full"></span> Datos del Paciente
                </p>
                <div className="bg-background/50 p-4 rounded-2xl border border-secondary/10 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[9px] font-black text-text-light/50 uppercase mb-1 block">Nombre</label>
                      <input type="text" value={editForm.nombrePaciente} onChange={e => setEditForm({...editForm, nombrePaciente: e.target.value})}
                        className="w-full p-2.5 bg-white rounded-xl font-bold text-xs border border-secondary/10 focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/10 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="text-[9px] font-black text-text-light/50 uppercase mb-1 block">Apellido</label>
                      <input type="text" value={editForm.apellidoPaciente} onChange={e => setEditForm({...editForm, apellidoPaciente: e.target.value})}
                        className="w-full p-2.5 bg-white rounded-xl font-bold text-xs border border-secondary/10 focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/10 outline-none transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-text-light/50 uppercase mb-1 block">DNI</label>
                    <input type="text" value={editForm.dni} onChange={e => setEditForm({...editForm, dni: e.target.value})} placeholder="Sin puntos ni espacios"
                      className="w-full p-2.5 bg-white rounded-xl font-bold text-sm border border-accent-orange/20 focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/10 outline-none transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[9px] font-black text-text-light/50 uppercase mb-1 block">WhatsApp</label>
                      <input type="text" value={editForm.telefono} onChange={e => setEditForm({...editForm, telefono: e.target.value})}
                        className="w-full p-2.5 bg-white rounded-xl font-bold text-xs border border-secondary/10 focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/10 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="text-[9px] font-black text-text-light/50 uppercase mb-1 block">Email</label>
                      <input type="text" value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})}
                        className="w-full p-2.5 bg-white rounded-xl font-bold text-[10px] border border-secondary/10 focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/10 outline-none transition-all" />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[9px] font-black text-text-light/40 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                  <span className="w-1 h-3 bg-primary rounded-full"></span> Datos de la Cita
                </p>
                <div className="space-y-3">
                  <div>
                    <label className="text-[9px] font-black text-text-light/50 uppercase mb-1 block">Fecha</label>
                    <div className="grid grid-cols-3 gap-2">
                      <select value={editForm.fechaDia} onChange={e => setEditForm({ ...editForm, fechaDia: e.target.value })} 
                        className="p-2.5 bg-background rounded-xl font-bold text-center text-xs border border-secondary/10 focus:border-accent-orange outline-none appearance-none">
                        {Array.from({ length: 31 }, (_, i) => i + 1)
                          .filter(d => { const hoy = new Date(); const mSelected = parseInt(editForm.fechaMes); if (mSelected > hoy.getMonth() + 1) return true; return d >= hoy.getDate(); })
                          .map(d => (<option key={d} value={d}>{d}</option>))}
                      </select>
                      <select value={editForm.fechaMes} onChange={e => setEditForm({ ...editForm, fechaMes: e.target.value })} 
                        className="p-2.5 bg-background rounded-xl font-bold text-center text-xs border border-secondary/10 focus:border-accent-orange outline-none appearance-none">
                        {Array.from({ length: 12 }, (_, i) => i + 1)
                          .filter(m => m >= new Date().getMonth() + 1)
                          .map(m => (<option key={m} value={m}>{new Date(2026, m-1).toLocaleString('es', { month: 'long' }).toUpperCase()}</option>))}
                      </select>
                      <div className="p-2.5 bg-secondary/5 rounded-xl font-bold text-center text-xs text-text-light/40 flex items-center justify-center border border-secondary/10">2026</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[9px] font-black text-text-light/50 uppercase mb-1 block">Horario</label>
                      <select value={editForm.hora} onChange={e => setEditForm({ ...editForm, hora: e.target.value })} 
                        className="w-full p-2.5 bg-background rounded-xl font-bold text-center text-xs border border-secondary/10 focus:border-accent-orange outline-none appearance-none">
                        {["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"]
                          .filter(h => { const fechaFormat = `${editForm.fechaAno}-${editForm.fechaMes.padStart(2, '0')}-${String(editForm.fechaDia).padStart(2, '0')}`; return !turnos.some(t => t.fecha === fechaFormat && t.hora === h && t._id !== turnoAEditar?._id); })
                          .map(h => (<option key={h} value={h}>{h} hs</option>))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[9px] font-black text-text-light/50 uppercase mb-1 block">Profesional</label>
                      <select value={editForm.profesional} onChange={e => setEditForm({ ...editForm, profesional: e.target.value })} 
                        className="w-full p-2.5 bg-background rounded-xl font-bold text-xs border border-secondary/10 focus:border-accent-orange outline-none appearance-none">
                        <option value="Dra. Erina">Dra. Erina</option>
                        <option value="Dr. Adolfo">Dr. Adolfo</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    const leg = `${editForm.fechaDia}/${editForm.fechaMes}/${editForm.fechaAno}`;
                    const iso = `${editForm.fechaAno}-${editForm.fechaMes.padStart(2, '0')}-${String(editForm.fechaDia).padStart(2, '0')}`;
                    const urls = generarUrlsNotificacion(turnoAEditar, leg, editForm.hora, iso, editForm.profesional);
                    window.open(urls.gcalAdminUrl, '_blank');
                  }}
                  className="w-full py-3 bg-background text-text-light rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-secondary/10 transition-colors flex items-center justify-center gap-2 border border-secondary/10"
                >
                  📅 Agendar en mi Google Calendar
                </button>
                <button onClick={handleConfirmEdit} className="w-full py-4 bg-gradient-to-r from-accent-orange to-orange-500 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-lg shadow-orange-500/20 active:scale-[0.98] hover:shadow-xl transition-all">
                  Confirmar y Notificar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </LayoutAdmin>
  );
};

export default AdminDashboard;