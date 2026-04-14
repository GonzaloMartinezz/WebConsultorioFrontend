import { useState, useEffect } from 'react';
import LayoutAdmin from "../../components/layouts/LayoutAdmin.jsx";
import { FaCalendarDay, FaUserClock, FaPlus, FaCheckCircle, FaTimesCircle, FaPen, FaEnvelope, FaTrash, FaWhatsapp } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios.js';

const AdminDashboard = () => {
  const [turnos, setTurnos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [turnoAEditar, setTurnoAEditar] = useState(null);
  const [editForm, setEditForm] = useState({ fechaDia: '', fechaMes: '', fechaAno: '', hora: '09:00' });
  const [notificacionPendiente, setNotificacionPendiente] = useState(null);

  const navigate = useNavigate();

  // ========================================================
  // EL CEREBRO MATEMÁTICO (Cálculos Dinámicos en Tiempo Real)
  // ========================================================

  // A. Obtener la fecha de hoy exacta en formato YYYY-MM-DD
  const fechaHoy = new Date().toISOString().split('T')[0];

  // B. Calcular Turnos para Hoy (Filtramos los que coinciden con la fecha)
  const turnosHoy = turnos.filter(turno => turno.fecha === fechaHoy).length;

  // C. Calcular Consultas Pendientes GLOBALES (Filtramos por estado)
  const consultasPendientes = turnos.filter(turno => turno.estado === 'Pendiente').length;

  // Array de stats dinámico (solo 2 cards compactas)
  const stats = [
    { name: "Turnos Hoy", value: cargando ? '-' : turnosHoy.toString(), icon: FaCalendarDay, color: "text-primary" },
    { name: "Pendientes", value: cargando ? '-' : consultasPendientes.toString(), icon: FaUserClock, color: "text-red-500" },
  ];

  useEffect(() => {
    const obtenerTurnosDeBD = async () => {
      try {
        const respuesta = await api.get('/turnos');
        setTurnos(respuesta.data);
      } catch (error) {
        console.error("Error al cargar los turnos:", error);

        // EL GUARDIÁN: Si el backend dice 401 (Sin llave) o 403 (No es admin)...
        if (error.response?.status === 401 || error.response?.status === 403) {
          // ...lo expulsamos a la pantalla de login de inmediato.
          navigate('/login');
        }
      } finally {
        setCargando(false);
      }
    };

    obtenerTurnosDeBD();

    // Sincronización en tiempo real cada 10 segundos
    const interval = setInterval(() => {
      obtenerTurnosDeBD();
    }, 10000);

    return () => clearInterval(interval);
  }, [navigate]);

  // Toast System Nativo
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000);
  };

  // ====== HELPER: Obtener rangos horarios para Google Calendar ======
  const obtenerRangoHorario = (turnoHora) => {
    switch (turnoHora) {
      case 'Temprano': return { start: '080000', end: '100000' };
      case 'Media mañana': return { start: '100000', end: '130000' };
      case 'Tarde': return { start: '140000', end: '180000' };
      case 'Noche': return { start: '180000', end: '210000' };
      default:
        if (turnoHora && turnoHora.includes(':')) {
          const p = turnoHora.replace(/[^0-9:]/g, '').split(':');
          if (p.length >= 2) {
            const s = `${p[0].padStart(2, '0')}${p[1].padStart(2, '0')}00`;
            const eH = (parseInt(p[0]) + 1).toString().padStart(2, '0');
            return { start: s, end: `${eH}${p[1].padStart(2, '0')}00` };
          }
        }
        return { start: '090000', end: '130000' };
    }
  };

  // ====== HELPER: Generar URLs de notificación ======
  const generarUrlsNotificacion = (turnoData, fechaLegible, horarioTexto) => {
    const telefonoLimpio = turnoData.telefono ? turnoData.telefono.replace(/\D/g, '') : '';
    let waUrl = '';
    let mailUrl = '';

    if (telefonoLimpio) {
      const mensaje = `Hola ${turnoData.nombrePaciente}, tu turno ha sido confirmado!\n\nProfesional: ${turnoData.profesional}\nFecha: ${fechaLegible}\nHorario: ${horarioTexto}\n\nTe esperamos!\nC&M Dental`;
      waUrl = `https://wa.me/${telefonoLimpio}?text=${encodeURIComponent(mensaje)}`;
    }

    if (turnoData.email) {
      const asunto = encodeURIComponent(`Turno Confirmado - C&M Dental (${fechaLegible})`);
      const cuerpo = encodeURIComponent(`Hola ${turnoData.nombrePaciente}, tu turno fue confirmado.\n\nProfesional: ${turnoData.profesional}\nFecha: ${fechaLegible}\nHorario: ${horarioTexto}\nMotivo: ${turnoData.motivo || 'Consulta general'}\n\nTe esperamos!\nC&M Dental`);
      mailUrl = `mailto:${turnoData.email}?subject=${asunto}&body=${cuerpo}`;
    }

    return { waUrl, mailUrl, nombrePaciente: turnoData.nombrePaciente, telefono: turnoData.telefono, email: turnoData.email };
  };

  // Acciones Funcionales
  const handleApprove = async (turno) => {
    const id = turno._id;
    try {
      await api.patch(`/turnos/${id}/estado`, { estado: 'Confirmado' });
      setTurnos(prevTurnos =>
        prevTurnos.map(t => t._id === id ? { ...t, estado: 'Confirmado' } : t)
      );

      const fechaLegible = turno.fecha ? turno.fecha.split('-').reverse().join('/') : '';
      const urls = generarUrlsNotificacion(turno, fechaLegible, turno.hora);
      setNotificacionPendiente(urls);
      showToast('Turno confirmado. Enviá las notificaciones abajo.', 'success');

    } catch (error) {
      showToast('Error al confirmar el turno.', 'error');
    }
  };

  const handleReject = async (id) => {
    try {
      await api.patch(`/turnos/${id}/estado`, { estado: 'Cancelado' });
      setTurnos(prevTurnos =>
        prevTurnos.map(turno => turno._id === id ? { ...turno, estado: 'Cancelado' } : turno)
      );
      showToast('Turno Cancelado.', 'error');
    } catch (error) {
      showToast('Error al cancelar el turno.', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este turno definitivamente?')) return;
    try {
      await api.delete(`/turnos/${id}`);
      setTurnos(prevTurnos => prevTurnos.filter(t => t._id !== id));
      showToast('Turno eliminado.', 'success');
    } catch (error) {
      showToast('Error al eliminar.', 'error');
    }
  };

  const abrirModalEdicion = (turno) => {
    setTurnoAEditar(turno);
    // Parsear la fecha existente del turno en día/mes/año
    const partes = turno.fecha ? turno.fecha.split('-') : ['', '', ''];
    setEditForm({
      fechaAno: partes[0] || new Date().getFullYear().toString(),
      fechaMes: partes[1] || '',
      fechaDia: partes[2] ? parseInt(partes[2]).toString() : '',
      hora: turno.hora || '09:00'
    });
    setModalEditOpen(true);
  };

  const handleConfirmEdit = async () => {
    if (!turnoAEditar) return;
    if (!editForm.fechaDia || !editForm.fechaMes || !editForm.fechaAno) {
      showToast('Seleccioná día, mes y año.', 'error');
      return;
    }

    const fechaCompleta = `${editForm.fechaAno}-${editForm.fechaMes.padStart(2, '0')}-${String(editForm.fechaDia).padStart(2, '0')}`;

    try {
      await api.patch(`/turnos/${turnoAEditar._id}/estado`, {
        estado: 'Confirmado',
        fecha: fechaCompleta,
        hora: editForm.hora
      });

      setTurnos(prevTurnos =>
        prevTurnos.map(t => t._id === turnoAEditar._id ? { ...t, estado: 'Confirmado', fecha: fechaCompleta, hora: editForm.hora } : t)
      );

      setModalEditOpen(false);

      const fechaLegible = `${editForm.fechaDia}/${editForm.fechaMes}/${editForm.fechaAno}`;
      const urls = generarUrlsNotificacion(turnoAEditar, fechaLegible, editForm.hora);
      setNotificacionPendiente(urls);

      showToast(`Turno confirmado para el ${fechaLegible} a las ${editForm.hora}.`, 'success');
    } catch (error) {
      console.error("Error editando turno:", error);
      showToast('Hubo un error al guardar los cambios.', 'error');
    }
  };

  return (
    <LayoutAdmin>
      {/* 
        SISTEMA NATIVO DE NOTIFICACIONES (TOASTS) 
        El usuario quería "Alerta visual de nuevos, aceptado y rechazado"
      */}
      {toast.show && (
        <div className={`fixed top-10 right-10 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl font-bold animate-fade-in text-white tracking-wide border-2 
          ${toast.type === 'success' ? 'bg-green-500 border-green-400' : toast.type === 'error' ? 'bg-red-500 border-red-400' : 'bg-primary border-accent-orange'}`}
        >
          {toast.type === 'success' ? <FaCheckCircle className="text-2xl" /> : <FaTimesCircle className="text-2xl" />}
          {toast.message}
        </div>
      )}

      {/* ======================================================== */}
      {/* TÍTULO ESTRICTAMENTE ARRIBA (Por el feedback del usuario) */}
      {/* ======================================================== */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6" data-aos="fade-down">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-orange mb-1">Bienvenido, Administrador</p>
          <h1 className="text-3xl lg:text-4xl font-black text-primary tracking-tight">
            Panel de Administración <span className="text-accent-orange text-xl lg:text-2xl ml-2">C&M</span>
          </h1>
        </div>
        <Link
          to="/turnos"
          className="w-full md:w-auto px-8 py-3.5 text-white font-bold text-sm rounded-xl bg-primary shadow-lg hover:bg-primary/90 active:scale-95 transition-all uppercase tracking-wide flex items-center justify-center gap-3 hover:-translate-y-1 hover:shadow-xl"
        >
          <FaPlus /> Crear Nuevo Turno
        </Link>
      </header>

      <main className="space-y-6 pb-10">

        {/* STATS COMPACTAS - solo 2 cards */}
        <section className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-5 shadow-sm border border-secondary/60 flex items-center justify-between hover:border-accent-orange transition-colors group">
                <div>
                  <p className="text-text-light text-[10px] font-black uppercase tracking-widest mb-1">{stat.name}</p>
                  <p className="text-text text-3xl font-black leading-none">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-secondary/30 ${stat.color}`}>
                  <Icon className="text-2xl" />
                </div>
              </div>
            );
          })}
        </section>

        {/* TABLA AGENDA */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-primary text-xl font-black uppercase tracking-tight">Agenda y Pendientes</h2>
            <Link to="/admin/pendientes" className="text-xs font-bold text-accent-orange hover:underline flex items-center gap-1.5">
              Ver Pendientes <span className="bg-red-500 text-white rounded-full px-1.5 py-0.5 text-[10px]">{consultasPendientes}</span>
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-secondary/50 w-full">
            <table className="w-full text-left border-collapse">
              <thead className="border-b-2 border-primary/10">
                <tr>
                  <th className="px-3 py-3 text-[10px] font-black uppercase tracking-widest text-primary">Fecha</th>
                  <th className="px-3 py-3 text-[10px] font-black uppercase tracking-widest text-primary">Hora</th>
                  <th className="px-3 py-3 text-[10px] font-black uppercase tracking-widest text-primary">Paciente</th>
                  <th className="px-3 py-3 text-[10px] font-black uppercase tracking-widest text-primary hidden md:table-cell">Profesional</th>
                  <th className="px-3 py-3 text-[10px] font-black uppercase tracking-widest text-primary hidden lg:table-cell">Motivo</th>
                  <th className="px-3 py-3 text-[10px] font-black uppercase tracking-widest text-primary">Estado</th>
                  <th className="px-3 py-3 text-[10px] font-black uppercase tracking-widest text-primary text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {turnos
                  .filter(turno => {
                    // Ocultar cancelados siempre
                    if (turno.estado === 'Cancelado') return false;
                    
                    // Si la fecha del turno es ANTERIOR a hoy, lo ocultamos automáticamente
                    // Así "se borran" de la vista al día siguiente
                    if (turno.fecha && turno.fecha < fechaHoy) return false;

                    // Mostrar los de hoy en adelante (Pendientes y Confirmados)
                    return true;
                  })
                  .sort((a, b) => {
                    // Pendientes primero, luego por fecha
                    if (a.estado === 'Pendiente' && b.estado !== 'Pendiente') return -1;
                    if (a.estado !== 'Pendiente' && b.estado === 'Pendiente') return 1;
                    return (a.fecha || '').localeCompare(b.fecha || '');
                  })
                  .map((turno) => (
                    <tr key={turno._id} className="border-b border-secondary/20 hover:bg-secondary/10 transition-colors group">
                      <td className="px-3 py-3 font-bold text-text-light text-xs">
                        {turno.fecha ? turno.fecha.split('-').reverse().join('/') : '-'}
                      </td>
                      <td className="px-3 py-3 font-black text-primary text-sm">{turno.hora}</td>
                      <td className="px-3 py-3 font-bold text-text text-sm">{turno.nombrePaciente} {turno.apellidoPaciente}</td>
                      <td className="px-3 py-3 font-semibold text-text-light text-xs hidden md:table-cell">{turno.profesional}</td>
                      <td className="px-3 py-3 text-text-light text-xs hidden lg:table-cell">{turno.motivo}</td>
                      <td className="px-3 py-3">
                        <span className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider
                        ${turno.estado === 'Confirmado' ? 'bg-green-100 text-green-700 border border-green-200' :
                            'bg-yellow-100 text-yellow-700 border border-yellow-200'}`}>
                          {turno.estado}
                        </span>
                      </td>

                      <td className="px-3 py-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {turno.estado === 'Pendiente' && (
                            <button onClick={() => handleApprove(turno)} className="text-green-600 bg-green-50 hover:bg-green-100 p-2 rounded-lg hover:scale-110 transition-transform" title="Confirmar">
                              <FaCheckCircle className="text-sm" />
                            </button>
                          )}
                          {turno.estado === 'Pendiente' && (
                            <button onClick={() => handleReject(turno._id)} className="text-red-500 bg-red-50 hover:bg-red-100 p-2 rounded-lg hover:scale-110 transition-transform" title="Cancelar">
                              <FaTimesCircle className="text-sm" />
                            </button>
                          )}
                          <button onClick={() => abrirModalEdicion(turno)} className="text-primary bg-secondary/30 hover:bg-secondary/50 p-2 rounded-lg hover:scale-110 transition-transform" title="Reagendar">
                            <FaPen className="text-sm" />
                          </button>
                          <button onClick={() => handleDelete(turno._id)} className="text-gray-400 bg-gray-50 hover:bg-gray-100 p-2 rounded-lg hover:scale-110 transition-transform" title="Eliminar">
                            <FaTrash className="text-sm" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {turnos.filter(t => t.estado !== 'Cancelado' && (t.estado === 'Pendiente' || t.fecha >= fechaHoy)).length === 0 && (
              <p className="text-center text-text-light text-sm font-bold py-8">No hay turnos pendientes ni futuros.</p>
            )}
          </div>
        </div>

      </main>

      {/* MODAL DE NOTIFICACIONES POST-CONFIRMACIÓN */}
      {notificacionPendiente && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden shadow-2xl relative border border-secondary/30 flex flex-col">
            
            <div className="bg-green-500 px-6 pt-8 pb-6 text-white relative text-center">
              <button onClick={() => setNotificacionPendiente(null)} className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors">
                <FaTimesCircle className="text-2xl" />
              </button>
              <FaCheckCircle className="text-6xl mx-auto mb-4 text-white drop-shadow-md" />
              <h2 className="text-2xl font-black uppercase tracking-tight">
                ¡Turno Confirmado!
              </h2>
              <p className="mt-2 text-green-100 text-sm font-medium">
                El turno de <span className="font-bold">{notificacionPendiente.nombrePaciente}</span> se ha guardado exitosamente.
              </p>
            </div>

            <div className="p-6 space-y-4 bg-gray-50 flex-1">
              <h3 className="text-xs font-black text-primary uppercase tracking-widest text-center mb-2">Notificar al Paciente</h3>
              
              <div className="grid grid-cols-1 gap-3">
                {notificacionPendiente.waUrl ? (
                  <a
                    href={notificacionPendiente.waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full p-4 bg-white hover:bg-green-50 border-2 border-green-500 rounded-xl text-green-700 font-bold text-base transition-all hover:scale-[1.02] active:scale-95 shadow-sm"
                  >
                    <FaWhatsapp className="text-2xl text-green-500" />
                    Enviar WhatsApp
                  </a>
                ) : (
                  <div className="flex items-center justify-center gap-3 w-full p-4 bg-gray-100 border-2 border-gray-200 rounded-xl text-gray-400 font-bold text-base cursor-not-allowed">
                    <FaWhatsapp className="text-2xl" />
                    Sin WhatsApp registrado
                  </div>
                )}
                
                {notificacionPendiente.mailUrl ? (
                  <a
                    href={notificacionPendiente.mailUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full p-4 bg-white hover:bg-blue-50 border-2 border-blue-500 rounded-xl text-blue-700 font-bold text-base transition-all hover:scale-[1.02] active:scale-95 shadow-sm"
                  >
                    <FaEnvelope className="text-2xl text-blue-500" />
                    Enviar Email
                  </a>
                ) : (
                  <div className="flex items-center justify-center gap-3 w-full p-4 bg-gray-100 border-2 border-gray-200 rounded-xl text-gray-400 font-bold text-base cursor-not-allowed">
                    <FaEnvelope className="text-2xl" />
                    Sin Email registrado
                  </div>
                )}
              </div>
              
              <p className="text-[10px] text-text-light font-bold mt-4 text-center uppercase tracking-widest">
                La ventana abrirá la aplicación correspondiente.
              </p>
            </div>

            <div className="p-4 bg-white border-t border-gray-100">
               <button 
                  onClick={() => setNotificacionPendiente(null)}
                  className="w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-xl transition-colors uppercase text-sm tracking-wider"
               >
                 Cerrar y volver al panel
               </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL DE REAGENDAR */}
      {modalEditOpen && turnoAEditar && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-sm max-h-[90vh] overflow-y-auto shadow-2xl relative border border-secondary/30">

            <div className="bg-primary px-5 pt-5 pb-4 text-white relative">
              <button onClick={() => setModalEditOpen(false)} className="absolute top-3 right-3 text-white/50 hover:text-accent-orange transition-colors">
                <FaTimesCircle className="text-xl" />
              </button>
              <h2 className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
                <FaCalendarDay className="text-accent-orange text-xl" /> Reagendar Cita
              </h2>
              <div className="mt-3 bg-white/10 border border-white/20 p-2.5 rounded-lg flex items-center justify-between text-xs">
                <div>
                  <p className="text-[9px] uppercase font-bold text-white/50 tracking-widest">Paciente</p>
                  <p className="font-bold text-white text-sm">{turnoAEditar.nombrePaciente} {turnoAEditar.apellidoPaciente}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] uppercase font-bold text-white/50 tracking-widest">Profesional</p>
                  <p className="font-semibold text-white/90 text-xs">{turnoAEditar.profesional}</p>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-4">
              {/* Fecha */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1.5">
                  <FaCalendarDay className="text-accent-orange" /> Fecha
                </label>
                <div className="flex gap-1.5">
                  <select value={editForm.fechaDia} onChange={(e) => setEditForm({ ...editForm, fechaDia: e.target.value })} className="w-1/3 px-2 py-2.5 bg-secondary/10 border-2 border-secondary/40 rounded-lg font-bold text-primary text-sm focus:border-accent-orange outline-none transition-all appearance-none text-center cursor-pointer">
                    <option value="" disabled>Día</option>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  <select value={editForm.fechaMes} onChange={(e) => setEditForm({ ...editForm, fechaMes: e.target.value })} className="w-1/3 px-2 py-2.5 bg-secondary/10 border-2 border-secondary/40 rounded-lg font-bold text-primary text-sm focus:border-accent-orange outline-none transition-all appearance-none text-center cursor-pointer">
                    <option value="" disabled>Mes</option>
                    {["01","02","03","04","05","06","07","08","09","10","11","12"].map((m, idx) => <option key={m} value={m}>{['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'][idx]}</option>)}
                  </select>
                  <select value={editForm.fechaAno} onChange={(e) => setEditForm({ ...editForm, fechaAno: e.target.value })} className="w-1/3 px-2 py-2.5 bg-secondary/10 border-2 border-secondary/40 rounded-lg font-bold text-primary text-sm focus:border-accent-orange outline-none transition-all appearance-none text-center cursor-pointer">
                    <option value="" disabled>Año</option>
                    {Array.from({ length: 3 }, (_, i) => new Date().getFullYear() + i).map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>

              {/* Hora exacta */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1.5">
                  <FaUserClock className="text-accent-orange" /> Horario
                </label>
                <select
                  value={editForm.hora}
                  onChange={(e) => setEditForm({ ...editForm, hora: e.target.value })}
                  className="w-full px-3 py-2.5 bg-secondary/10 border-2 border-secondary/40 rounded-lg font-bold text-primary text-sm focus:border-accent-orange outline-none transition-all appearance-none cursor-pointer"
                >
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

              {/* Info contacto */}
              <div className="space-y-1.5">
                {turnoAEditar?.telefono && (
                  <div className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                    <FaWhatsapp className="text-green-600" />
                    <p className="text-xs font-bold text-green-800">{turnoAEditar.telefono}</p>
                  </div>
                )}
                {turnoAEditar?.email && (
                  <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                    <FaEnvelope className="text-blue-500" />
                    <p className="text-xs font-bold text-blue-800">{turnoAEditar.email}</p>
                  </div>
                )}
              </div>

              {/* Botones */}
              <div className="flex gap-2 pt-1">
                <button type="button" onClick={() => setModalEditOpen(false)} className="flex-1 py-3 px-3 rounded-xl border border-secondary-dark text-text-light font-black uppercase text-xs hover:bg-secondary/30 transition-colors">
                  Cancelar
                </button>
                <button type="button" onClick={handleConfirmEdit} className="flex-1 py-3 px-3 rounded-xl bg-accent-orange text-white font-black uppercase text-xs shadow-lg hover:scale-[1.03] active:scale-[0.98] transition-all flex justify-center items-center gap-1.5">
                  <FaCheckCircle /> Confirmar
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