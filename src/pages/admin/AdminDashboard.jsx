import { useState, useEffect } from 'react';
import LayoutAdmin from "../../components/layouts/LayoutAdmin.jsx";
import { FaCalendarDay, FaUserClock, FaHistory, FaPlus, FaCheckCircle, FaTimesCircle, FaPen, FaFileInvoiceDollar } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios.js';

const AdminDashboard = () => {
  const [turnos, setTurnos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [turnoAEditar, setTurnoAEditar] = useState(null);
  const [editForm, setEditForm] = useState({ fecha: '', hora: '' });

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

  // D. Calcular Ingresos Estimados de Hoy
  const ticketPromedio = 37500;
  const calculoIngresos = (turnosHoy * ticketPromedio);
  
  // Formateamos el número
  const ingresosEstimadosTexto = calculoIngresos === 0 
    ? "$0" 
    : calculoIngresos > 999999 
      ? `$${(calculoIngresos / 1000000).toFixed(1)}M` 
      : `$${(calculoIngresos / 1000).toFixed(0)}k`;

  // Array de stats dinámico
  const stats = [
    { name: "Turnos para Hoy", value: cargando ? '-' : turnosHoy.toString(), icon: FaCalendarDay, color: "text-primary" },
    { name: "Consultas Pendientes", value: cargando ? '-' : consultasPendientes.toString(), icon: FaUserClock, color: "text-red-500" },
    { name: "Ingresos Estimados", value: cargando ? '-' : ingresosEstimadosTexto, icon: FaFileInvoiceDollar, color: "text-green-600" },
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

  // Acciones Funcionales Reales Visualmente
  const handleApprove = async (turno) => {
    const id = turno._id;
    try {
      await api.patch(`/turnos/${id}/estado`, { estado: 'Confirmado' });
      setTurnos(prevTurnos => 
        prevTurnos.map(t => t._id === id ? { ...t, estado: 'Confirmado' } : t)
      );
      showToast('¡Turno Confirmado! Guardado en la agenda oficial.', 'success');

      // --- INTEGRACIÓN: Generar Link de Google Calendar ---
      let startTime = '090000';
      let endTime = '130000';
      if (turno.hora && turno.hora.includes('Tarde')) {
          startTime = '160000';
          endTime = '200000';
      }
      
      const fechaLimpia = turno.fecha ? turno.fecha.replace(/-/g, '') : '';
      const gcalLink = fechaLimpia 
          ? `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Turno Odontológico: ' + turno.profesional)}&dates=${fechaLimpia}T${startTime}/${fechaLimpia}T${endTime}&details=${encodeURIComponent('Consulta por: ' + turno.motivo)}`
          : '';

      // --- INTEGRACIÓN: Redirigir a WhatsApp al paciente ---
      const telefonoLimpio = turno.telefono ? turno.telefono.replace(/\D/g, '') : '';
      if (telefonoLimpio) {
          const fechaLegible = turno.fecha ? turno.fecha.split('-').reverse().join('/') : '';
          const mensaje = `Hola ${turno.nombrePaciente}, ¡tu turno ha sido confirmado! ✅\n\n🦷 *Profesional:* ${turno.profesional}\n📅 *Fecha:* ${fechaLegible}\n⏰ *Horario:* ${turno.hora}\n\nAgendalo en tu Google Calendar para no olvidarte:\n👉 ${gcalLink}\n\n¡Te esperamos!`;
          const waUrl = `https://wa.me/${telefonoLimpio}?text=${encodeURIComponent(mensaje)}`;
          window.open(waUrl, '_blank');
      } else {
          showToast('Advertencia: El paciente no dejó un teléfono.', 'error');
      }

    } catch (error) {
      alert("Hubo un error al confirmar el turno");
    }
  };

  const handleReject = async (id) => {
    try {
      await api.patch(`/turnos/${id}/estado`, { estado: 'Cancelado' });
      setTurnos(prevTurnos => 
        prevTurnos.map(turno => turno._id === id ? { ...turno, estado: 'Cancelado' } : turno)
      );
      showToast('Turno Rechazado y espacio liberado de la agenda.', 'error');
    } catch (error) {
      alert("Hubo un error al rechazar el turno");
    }
  };

  const abrirModalEdicion = (turno) => {
    setTurnoAEditar(turno);
    setEditForm({ fecha: turno.fecha, hora: turno.hora });
    setModalEditOpen(true);
  };

  const handleConfirmEdit = async (e) => {
    e.preventDefault();
    if (!turnoAEditar) return;
    
    try {
      await api.patch(`/turnos/${turnoAEditar._id}/estado`, { 
        estado: 'Confirmado', // Lo validamos como confirmado oficialmente
        fecha: editForm.fecha, 
        hora: editForm.hora 
      });

      setTurnos(prevTurnos => 
        prevTurnos.map(t => t._id === turnoAEditar._id ? { ...t, estado: 'Confirmado', fecha: editForm.fecha, hora: editForm.hora } : t)
      );
      
      // --- INTEGRACIÓN: Generar Link de Google Calendar ---
      let startTime = '090000';
      let endTime = '130000';
      if (editForm.hora.includes(':')) {
          const partes = editForm.hora.replace(/[^0-9:]/g, '').split(':');
          if (partes.length >= 2) {
              startTime = `${partes[0].padStart(2, '0')}${partes[1].padStart(2, '0')}00`;
              const endH = (parseInt(partes[0]) + 1).toString().padStart(2, '0');
              endTime = `${endH}${partes[1].padStart(2, '0')}00`;
          }
      } else if (editForm.hora.includes('Tarde')) {
          startTime = '160000';
          endTime = '200000';
      }
      
      const fechaLimpia = editForm.fecha ? editForm.fecha.replace(/-/g, '') : '';
      const gcalLink = fechaLimpia 
          ? `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Turno Odontológico: ' + turnoAEditar.profesional)}&dates=${fechaLimpia}T${startTime}/${fechaLimpia}T${endTime}&details=${encodeURIComponent('Consulta por: ' + turnoAEditar.motivo)}`
          : '';

      // --- INTEGRACIÓN: Redirigir a WhatsApp al paciente ---
      const telefonoLimpio = turnoAEditar.telefono ? turnoAEditar.telefono.replace(/\D/g, '') : '';
      if (telefonoLimpio) {
          const fechaLegible = editForm.fecha ? editForm.fecha.split('-').reverse().join('/') : '';
          const mensaje = `Hola ${turnoAEditar.nombrePaciente}, ¡tu turno ha sido asignado y confirmado! ✅\n\n🦷 *Profesional:* ${turnoAEditar.profesional}\n📅 *Fecha:* ${fechaLegible}\n⏰ *Horario:* ${editForm.hora}\n\nAgendalo en tu Google Calendar para no olvidarte:\n👉 ${gcalLink}\n\n¡Te esperamos!`;
          const waUrl = `https://wa.me/${telefonoLimpio}?text=${encodeURIComponent(mensaje)}`;
          window.open(waUrl, '_blank');
      }

      showToast(`Turno confirmado para el ${editForm.fecha} a las ${editForm.hora}.`, 'success');
      setModalEditOpen(false);
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
          <FaPlus /> Crear Nuevo Turno FrontDesk
        </Link>
      </header>

      <main className="space-y-10 pb-10">

        {/* ======================================================== */}
        {/* CARDS ESTRICTAMENTE ABAJO DEL TÍTULO */}
        {/* ======================================================== */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6" data-aos="fade-up" data-aos-delay="100">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-4xl p-8 shadow-sm border border-secondary/60 flex items-center justify-between hover:border-accent-orange transition-colors group cursor-pointer">
                <div>
                  <p className="text-text-light text-xs font-black uppercase tracking-widest mb-2">{stat.name}</p>
                  <p className="text-text text-5xl font-black leading-none tracking-tighter">{stat.value}</p>
                </div>
                <div className={`p-4 rounded-full bg-secondary/30 ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="text-4xl" />
                </div>
              </div>
            );
          })}
        </section>

        {/* ======================================================== */}
        {/* TABLA DE LA AGENDA DE HOY (Con interactividad real en memoria) */}
        {/* ======================================================== */}
        <div data-aos="fade-up" data-aos-delay="200" className="pt-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-primary text-2xl font-black uppercase tracking-tight">Agenda Completa y Pendientes</h2>
            <Link to="/admin/pendientes" className="text-sm font-bold text-accent-orange hover:underline flex items-center gap-2">
              Ver Todos los Pendientes <span className="bg-red-500 text-white rounded-full px-2 py-0.5 text-xs">{consultasPendientes}</span>
            </Link>
          </div>

          <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-secondary/50 overflow-hidden w-full overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="border-b-2 border-primary/10">
                <tr>
                  <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-primary">Hora</th>
                  <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-primary">Paciente</th>
                  <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-primary">Profesional</th>
                  <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-primary">Motivo</th>
                  <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-primary">Estado</th>
                  <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-primary text-right">Acciones Rápidas</th>
                </tr>
              </thead>
              <tbody>
                {turnos
                  .filter(turno => {
                    // Mostrar turnos pendientes SIEMPRE (para que no se pierdan)
                    // y mostrar turnos confirmados/atendidos desde HOY en adelante
                    if (turno.estado === 'Pendiente') return true;
                    return turno.fecha >= fechaHoy;
                  }) 
                  .map((turno) => (
                  <tr key={turno._id} className="border-b border-secondary/20 hover:bg-secondary/10 transition-colors group">
                    <td className="px-6 py-5 font-black text-primary text-lg">{turno.hora}</td>
                    <td className="px-6 py-5 font-bold text-text text-base">{turno.nombrePaciente} {turno.apellidoPaciente}</td>
                    <td className="px-6 py-5 font-semibold text-text-light text-sm">{turno.profesional}</td>
                    <td className="px-6 py-5 text-text-light text-sm">{turno.motivo}</td>
                    <td className="px-6 py-5">
                      <span className={`inline-block px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider
                        ${turno.estado === 'Confirmado' ? 'bg-green-100 text-green-700 border border-green-200' :
                          turno.estado === 'Cancelado' ? 'bg-red-100 text-red-700 border border-red-200' :
                            'bg-yellow-100 text-yellow-700 border border-yellow-200 shadow-inner'}`}>
                        {turno.estado}
                      </span>
                    </td>

                    {/* FUNCIONALIDAD DE BOTONES QUE ALTERA EL ESTADO (y lanza las alertas) */}
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-90 group-hover:opacity-100 transition-opacity">
                        {turno.estado !== 'Confirmado' && (
                          <button onClick={() => handleApprove(turno)} className="text-green-600 bg-green-50 hover:bg-green-100 p-2.5 rounded-xl hover:scale-110 transition-transform shadow-sm" title="Aprobar Turno y Notificar">
                            <FaCheckCircle className="text-xl" />
                          </button>
                        )}
                        {turno.estado !== 'Cancelado' && (
                          <button onClick={() => handleReject(turno._id)} className="text-red-500 bg-red-50 hover:bg-red-100 p-2.5 rounded-xl hover:scale-110 transition-transform shadow-sm" title="Rechazar Turno">
                            <FaTimesCircle className="text-xl" />
                          </button>
                        )}
                        <button onClick={() => abrirModalEdicion(turno)} className="text-primary bg-secondary/30 hover:bg-secondary/50 p-2.5 rounded-xl hover:scale-110 transition-transform shadow-sm" title="Reagendar (Feha y Hora)">
                          <FaPen className="text-xl" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* ======================================================== */}
      {/* MODAL DE EDICIÓN PROFESIONAL DE HORARIOS                 */}
      {/* ======================================================== */}
      {modalEditOpen && turnoAEditar && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-4xl w-full max-w-md overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative border border-secondary/30" data-aos="zoom-in" data-aos-duration="300">
            
            {/* Cabecera del modal */}
            <div className="bg-primary px-8 pt-8 pb-6 text-white relative">
              <button 
                onClick={() => setModalEditOpen(false)}
                className="absolute top-5 right-5 text-white/50 hover:text-accent-orange transition-colors"
                aria-label="Cerrar modal"
              >
                <FaTimesCircle className="text-2xl" />
              </button>
              <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                <FaCalendarDay className="text-accent-orange text-3xl" /> Reagendar Cita
              </h2>
              <div className="mt-4 bg-white/10 border border-white/20 p-3 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase font-bold text-white/60 tracking-widest">Paciente</p>
                  <p className="font-bold text-white">{turnoAEditar.nombrePaciente} {turnoAEditar.apellidoPaciente}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase font-bold text-white/60 tracking-widest">Profesional</p>
                  <p className="font-semibold text-white/90 text-sm">{turnoAEditar.profesional}</p>
                </div>
              </div>
            </div>

            {/* Cuerpo del Formulario */}
            <form onSubmit={handleConfirmEdit} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-2">
                  <FaCalendarDay className="text-accent-orange" /> Fecha de Atención
                </label>
                <input 
                  type="date" 
                  required
                  value={editForm.fecha}
                  onChange={(e) => setEditForm({...editForm, fecha: e.target.value})}
                  className="w-full px-4 py-3.5 bg-secondary/10 border-2 border-secondary/40 rounded-xl font-bold text-primary focus:border-accent-orange focus:bg-white outline-none transition-all shadow-inner"
                />
              </div>

              <div className="space-y-2 relative">
                <label className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-2">
                  <FaUserClock className="text-accent-orange" /> Horario Exacto
                </label>
                <select 
                  required
                  value={editForm.hora}
                  onChange={(e) => setEditForm({...editForm, hora: e.target.value})}
                  className="w-full px-4 py-3.5 bg-secondary/10 border-2 border-secondary/40 rounded-xl font-bold text-primary focus:border-accent-orange focus:bg-white outline-none transition-all shadow-inner appearance-none cursor-pointer"
                >
                  <option value="" disabled>Seleccionar un horario preciso...</option>
                  <optgroup label="Turno Mañana">
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
                  <optgroup label="Turno Tarde">
                    <option value="16:00">16:00 hs</option>
                    <option value="16:30">16:30 hs</option>
                    <option value="17:00">17:00 hs</option>
                    <option value="17:30">17:30 hs</option>
                    <option value="18:00">18:00 hs</option>
                    <option value="18:30">18:30 hs</option>
                    <option value="19:00">19:00 hs</option>
                    <option value="19:30">19:30 hs</option>
                    <option value="20:00">20:00 hs</option>
                  </optgroup>
                </select>
                <div className="absolute right-4 top-[38px] pointer-events-none text-primary/60">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>

              {/* Botones */}
              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setModalEditOpen(false)}
                  className="flex-1 py-4 px-4 rounded-xl border border-secondary-dark text-text-light font-black uppercase text-sm hover:bg-secondary/30 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-4 px-4 rounded-xl bg-accent-orange text-white font-black uppercase text-sm shadow-lg shadow-accent-orange/30 hover:scale-[1.03] active:scale-[0.98] transition-all flex justify-center items-center gap-2"
                >
                  <FaCheckCircle className="text-lg" /> Asignar y Confirmar Turno
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </LayoutAdmin>
  );
};

export default AdminDashboard;