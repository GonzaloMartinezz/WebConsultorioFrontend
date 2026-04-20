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
        <div className={`fixed top-10 right-10 z-200 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl font-bold animate-fade-in text-white border-2 
          ${toast.type === 'success' ? 'bg-green-500 border-green-400' : 'bg-red-500 border-red-400'}`}
        >
          {toast.type === 'success' ? <FaCheckCircle /> : <FaTimesCircle />}
          {toast.message}
        </div>
      )}

      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-orange mb-1">Administración</p>
          <h1 className="text-3xl lg:text-4xl font-black text-primary tracking-tight">Panel de Control</h1>
        </div>
        <Link to="/turnos" className="px-8 py-3.5 bg-primary text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-all flex items-center gap-2">
          <FaPlus /> Nuevo Turno
        </Link>
      </header>

      <main className="space-y-6">
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-secondary/60 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Turnos Hoy</p>
              <p className="text-2xl font-black text-primary">{turnos.filter(t => t.fecha && t.fecha.startsWith(fechaHoy) && t.estado !== 'Cancelado').length}</p>
            </div>
            <FaCalendarDay className="text-2xl text-primary opacity-20" />
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-secondary/60 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Pendientes</p>
              <p className="text-2xl font-black text-red-500">{turnos.filter(t => t.estado === 'Pendiente').length}</p>
            </div>
            <FaUserClock className="text-2xl text-red-500 opacity-20" />
          </div>
        </section>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-secondary/40 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-primary font-black uppercase tracking-widest text-sm">Agenda de Pacientes</h2>
            <Link to="/admin/pendientes" className="text-xs font-bold text-accent-orange hover:underline">Solicitudes Web</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-primary/5">
                  <th className="py-4 px-2 text-[10px] font-black uppercase tracking-widest text-gray-400">Fecha</th>
                  <th className="py-4 px-2 text-[10px] font-black uppercase tracking-widest text-gray-400">Hora</th>
                  <th className="py-4 px-2 text-[10px] font-black uppercase tracking-widest text-gray-400">Paciente</th>
                  <th className="py-4 px-2 text-[10px] font-black uppercase tracking-widest text-gray-400">DNI</th>
                  <th className="py-4 px-2 text-[10px] font-black uppercase tracking-widest text-gray-400">Motivo</th>
                  <th className="py-4 px-2 text-[10px] font-black uppercase tracking-widest text-gray-400">Estado</th>
                  <th className="py-4 px-2 text-right text-[10px] font-black uppercase tracking-widest text-gray-400">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {turnos
                  .filter(t => t.estado !== 'Cancelado' && t.fecha && t.fecha >= fechaHoy)
                  .sort((a, b) => a.fecha.localeCompare(b.fecha))
                  .map(turno => (
                    <tr key={turno._id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-2 text-xs font-bold">{turno.fecha?.split('T')[0].split('-').reverse().join('/')}</td>
                      <td className="py-4 px-2 text-sm font-black text-primary">{turno.hora}</td>
                      <td className="py-4 px-2 text-sm font-bold text-gray-700">{turno.nombrePaciente} {turno.apellidoPaciente}</td>
                      <td className="py-4 px-2 text-[11px] font-medium text-gray-500">{turno.dni || '-'}</td>
                      <td className="py-4 px-2 text-[11px] font-medium text-gray-500">{turno.motivo || 'Consulta'}</td>
                      <td className="py-4 px-2">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${turno.estado === 'Confirmado' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {turno.estado}
                        </span>
                      </td>
                      <td className="py-4 px-2 text-right">
                        <div className="flex justify-end gap-2">
                          {turno.estado === 'Pendiente' && (
                            <button onClick={() => handleApprove(turno)} className="p-2 text-green-600 bg-green-50 rounded-lg"><FaCheckCircle /></button>
                          )}
                          <Link to={`/admin/paciente/${turno.pacienteId?._id || turno.pacienteId}`} className="p-2 text-blue-600 bg-blue-50 rounded-lg"><FaFileMedical /></Link>
                          <button onClick={() => abrirModalEdicion(turno)} className="p-2 text-primary bg-secondary/20 rounded-lg"><FaPen /></button>
                          <button onClick={() => handleDelete(turno._id)} className="p-2 text-red-400 bg-red-50 rounded-lg"><FaTrash /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {notificacionPendiente && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-300 p-4 scale-up">
          <div className="bg-white rounded-[2.5rem] w-full max-w-sm overflow-hidden shadow-2xl border-4 border-white">
            <div className="bg-primary p-8 text-center text-white">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/30">
                <FaCheckCircle className="text-3xl text-accent-orange" />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tighter">Turno Procesado</h2>
              <p className="text-white/60 text-xs mt-2 font-bold uppercase tracking-widest">Acciones Administrativas</p>
            </div>

            <div className="p-8 space-y-4">
              <a href={notificacionPendiente.waUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] text-white rounded-2xl font-black text-sm shadow-xl hover:scale-105 transition-transform">
                <FaWhatsapp className="text-xl" /> ENVIAR WHATSAPP
              </a>
              <a href={notificacionPendiente.mailUrl} className="flex items-center justify-center gap-3 w-full py-4 bg-primary text-white rounded-2xl font-black text-sm shadow-xl hover:scale-105 transition-transform">
                <FaEnvelope /> REVISAR EMAIL
              </a>
              <div className="h-px bg-gray-100 my-2" />
              <a href={notificacionPendiente.gcalAdminUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full py-4 bg-white border-2 border-accent-orange text-primary rounded-2xl font-black text-sm hover:bg-orange-50 transition-colors">
                📅 MI CALENDARIO ADMIN
              </a>
              <button onClick={() => setNotificacionPendiente(null)} className="w-full py-4 text-gray-400 font-bold text-xs uppercase tracking-widest mt-4">Cerrar</button>
            </div>
          </div>
        </div>
      )}

      {modalEditOpen && turnoAEditar && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-300 p-4">
          <div className="bg-white rounded-4xl w-full max-w-sm overflow-hidden shadow-2xl">
            <div className="bg-primary p-6 text-white text-center relative">
              <button onClick={() => setModalEditOpen(false)} className="absolute top-4 right-4 text-white/50"><FaTimesCircle /></button>
              <h2 className="font-black uppercase tracking-widest">Gestionar Cita</h2>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em] mt-1">Edición Administrativa</p>
            </div>
            <div className="p-6 space-y-4">
              {/* FICHA PACIENTE EDITABLE (NUEVO) */}
              <div className="bg-gray-50 p-4 rounded-3xl border border-secondary/20 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block px-1">Nombre</label>
                    <input 
                      type="text"
                      value={editForm.nombrePaciente}
                      onChange={e => setEditForm({...editForm, nombrePaciente: e.target.value})}
                      className="w-full p-2.5 bg-white rounded-xl font-bold text-xs border-2 border-transparent focus:border-accent-orange outline-none shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block px-1">Apellido</label>
                    <input 
                      type="text"
                      value={editForm.apellidoPaciente}
                      onChange={e => setEditForm({...editForm, apellidoPaciente: e.target.value})}
                      className="w-full p-2.5 bg-white rounded-xl font-bold text-xs border-2 border-transparent focus:border-accent-orange outline-none shadow-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block px-1">DNI (Clave para su Perfil)</label>
                  <input 
                    type="text"
                    value={editForm.dni}
                    onChange={e => setEditForm({...editForm, dni: e.target.value})}
                    className="w-full p-2.5 bg-white rounded-xl font-bold text-sm border-2 border-accent-orange/30 focus:border-accent-orange outline-none shadow-sm ring-4 ring-orange-500/5"
                    placeholder="Sin puntos ni espacios"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block px-1">WhatsApp</label>
                    <input 
                      type="text"
                      value={editForm.telefono}
                      onChange={e => setEditForm({...editForm, telefono: e.target.value})}
                      className="w-full p-2.5 bg-white rounded-xl font-bold text-xs border-2 border-transparent focus:border-accent-orange outline-none shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block px-1">Email</label>
                    <input 
                      type="text"
                      value={editForm.email}
                      onChange={e => setEditForm({...editForm, email: e.target.value})}
                      className="w-full p-2.5 bg-white rounded-xl font-bold text-[10px] border-2 border-transparent focus:border-accent-orange outline-none shadow-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-2 border-t border-gray-100">
                <div>
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 block px-1">Fecha de la Cita</label>
                  <div className="grid grid-cols-3 gap-2">
                    <select 
                      value={editForm.fechaDia} 
                      onChange={e => setEditForm({ ...editForm, fechaDia: e.target.value })} 
                      className="p-2 bg-gray-50 rounded-xl font-bold text-center text-xs border-2 border-transparent focus:border-accent-orange outline-none h-[40px] appearance-none"
                    >
                      {Array.from({ length: 31 }, (_, i) => i + 1)
                        .filter(d => {
                          const hoy = new Date();
                          const mSelected = parseInt(editForm.fechaMes);
                          if (mSelected > hoy.getMonth() + 1) return true;
                          return d >= hoy.getDate();
                        })
                        .map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                    </select>
                    <select 
                      value={editForm.fechaMes} 
                      onChange={e => setEditForm({ ...editForm, fechaMes: e.target.value })} 
                      className="p-2 bg-gray-50 rounded-xl font-bold text-center text-xs border-2 border-transparent focus:border-accent-orange outline-none h-[40px] appearance-none"
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1)
                        .filter(m => m >= new Date().getMonth() + 1)
                        .map(m => (
                          <option key={m} value={m}>{new Date(2026, m-1).toLocaleString('es', { month: 'long' }).toUpperCase()}</option>
                        ))}
                    </select>
                    <div className="p-2 bg-gray-100/50 rounded-xl font-bold text-center text-xs text-gray-400 flex items-center justify-center border-2 border-transparent h-[40px]">2026</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 block px-1">Horario Disponible</label>
                    <select 
                      value={editForm.hora} 
                      onChange={e => setEditForm({ ...editForm, hora: e.target.value })} 
                      className="w-full p-2 bg-gray-50 rounded-xl font-bold text-center text-[10px] border-2 border-transparent focus:border-accent-orange outline-none h-[40px] appearance-none"
                    >
                      {["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"]
                        .filter(h => {
                           const fechaFormat = `${editForm.fechaAno}-${editForm.fechaMes.padStart(2, '0')}-${String(editForm.fechaDia).padStart(2, '0')}`;
                           return !turnos.some(t => t.fecha === fechaFormat && t.hora === h && t._id !== turnoAEditar?._id);
                        })
                        .map(h => (
                          <option key={h} value={h}>{h} hs</option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 block px-1">Profesional</label>
                    <select 
                      value={editForm.profesional} 
                      onChange={e => setEditForm({ ...editForm, profesional: e.target.value })} 
                      className="w-full p-2 bg-gray-50 rounded-xl font-bold text-[10px] border-2 border-transparent focus:border-accent-orange outline-none h-[40px] appearance-none"
                    >
                      <option value="Dra. Erina">Dra. Erina</option>
                      <option value="Dr. Adolfo">Dr. Adolfo</option>
                    </select>
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
                  className="w-full py-3 border-2 border-primary/20 text-primary rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                >
                  📅 Agendar en mi Google Calendar
                </button>
                <button onClick={handleConfirmEdit} className="w-full py-4 bg-accent-orange text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-orange-500/20 active:scale-95 transition-all">
                  CONFIRMAR Y NOTIFICAR
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