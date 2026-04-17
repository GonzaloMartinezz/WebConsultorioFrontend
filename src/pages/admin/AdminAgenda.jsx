import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutAdmin from '../../components/layouts/LayoutAdmin';
import api from '../../api/axios';
import {
  FaCalendarCheck, FaClock, FaUser, FaStethoscope,
  FaChevronLeft, FaChevronRight, FaCalendarDay,
  FaWhatsapp, FaEnvelope, FaCheckCircle, FaTimesCircle, FaTimes,
  FaExclamationTriangle
} from 'react-icons/fa';

const AdminAgenda = () => {
  const [turnos, setTurnos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [fechaActual, setFechaActual] = useState(new Date());
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
  const [confirmarCancelar, setConfirmarCancelar] = useState(false);
  const [procesando, setProcesando] = useState(false);
  const [notificacionPendiente, setNotificacionPendiente] = useState(null);

  const navigate = useNavigate();

  // ─── Fetch turnos ─────────────────────────────────────────
  const fetchTurnos = async () => {
    try {
      setCargando(true);
      const res = await api.get('/turnos');
      setTurnos(res.data.filter(t => t.estado !== 'Cancelado'));
    } catch (error) {
      console.error("Error al cargar agenda", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => { fetchTurnos(); }, []);

  // ─── Helpers de fecha ────────────────────────────────────
  const obtenerInicioSemana = (fecha) => {
    const d = new Date(fecha);
    const dia = d.getDay();
    const diff = d.getDate() - dia + (dia === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  const formatearFechaDB = (fecha) => {
    const d = new Date(fecha);
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mes}-${dia}`;
  };

  const generarDiasSemana = () => {
    const inicio = obtenerInicioSemana(fechaActual);
    return Array.from({ length: 6 }, (_, i) => {
      const f = new Date(inicio);
      f.setDate(inicio.getDate() + i);
      return f;
    });
  };

  const diasSemana = generarDiasSemana();
  const nombresDias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const moverSemana = (dir) => {
    const nueva = new Date(fechaActual);
    nueva.setDate(nueva.getDate() + (dir * 7));
    setFechaActual(nueva);
  };

  const moverMes = (dir) => {
    const nueva = new Date(fechaActual);
    nueva.setMonth(nueva.getMonth() + dir);
    setFechaActual(nueva);
  };

  const esHoy = (fecha) => new Date().toDateString() === fecha.toDateString();

  // ─── URLs de notificación ────────────────────────────────
  const generarUrlsNotificacion = (turnoData) => {
    const fechaLegible = turnoData.fecha ? turnoData.fecha.split('-').reverse().join('/') : '';
    const telefonoLimpio = turnoData.telefono ? turnoData.telefono.replace(/\D/g, '') : '';
    let waUrl = '';
    let mailUrl = '';

    if (telefonoLimpio) {
      const msg = `¡Hola ${turnoData.nombrePaciente}! 🦷\nTe escribimos de *Carcara • Martínez Centro Odontológico*.\n\nTu turno ha sido *CONFIRMADO* ✅:\n- 👨‍⚕️ Profesional: ${turnoData.profesional}\n- 📅 Fecha: ${fechaLegible}\n- ⏰ Horario: ${turnoData.hora}\n\nTe esperamos en Jose Rondeau 827. ¡Que tengas un excelente día!`;
      waUrl = `https://wa.me/${telefonoLimpio}?text=${encodeURIComponent(msg)}`;
    }

    if (turnoData.email) {
      const asunto = encodeURIComponent(`Turno Confirmado - C&M Dental (${fechaLegible})`);
      const cuerpo = encodeURIComponent(`Hola ${turnoData.nombrePaciente}, tu turno fue confirmado.\n\nProfesional: ${turnoData.profesional}\nFecha: ${fechaLegible}\nHorario: ${turnoData.hora}\nMotivo: ${turnoData.motivo || 'Consulta'}\n\nTe esperamos!\nC&M Dental`);
      mailUrl = `mailto:${turnoData.email}?subject=${asunto}&body=${cuerpo}`;
    }

    return { waUrl, mailUrl, nombrePaciente: turnoData.nombrePaciente, telefono: turnoData.telefono, email: turnoData.email };
  };

  // ─── Acciones sobre turnos ───────────────────────────────
  const handleConfirmar = async () => {
    if (!turnoSeleccionado) return;
    setProcesando(true);
    try {
      await api.patch(`/turnos/${turnoSeleccionado._id}/estado`, { estado: 'Confirmado' });
      const urls = generarUrlsNotificacion(turnoSeleccionado);
      setTurnoSeleccionado(null);
      setNotificacionPendiente(urls);
      await fetchTurnos();
    } catch (error) {
      console.error("Error al confirmar:", error);
      alert("Error al confirmar el turno.");
    } finally {
      setProcesando(false);
    }
  };

  const handleCancelarDefinitivo = async () => {
    if (!turnoSeleccionado) return;
    setProcesando(true);
    try {
      await api.patch(`/turnos/${turnoSeleccionado._id}/estado`, { estado: 'Cancelado' });
      setConfirmarCancelar(false);
      setTurnoSeleccionado(null);
      await fetchTurnos();
    } catch (error) {
      console.error("Error al cancelar:", error);
      alert("Error al cancelar el turno.");
    } finally {
      setProcesando(false);
    }
  };

  const irAHistoriaClinica = (turno) => {
    if (turno.pacienteId) {
      navigate(`/admin/historia-clinica/${turno.pacienteId}`, {
        state: { nombreBusqueda: turno.nombrePaciente }
      });
    } else {
      navigate('/admin/historia-clinica', {
        state: { nombreBusqueda: turno.nombrePaciente }
      });
    }
  };

  // ─── RENDER ───────────────────────────────────────────────
  return (
    <LayoutAdmin>
      <div className="max-w-[1600px] mx-auto flex flex-col h-[calc(100vh-100px)]">

        {/* ══════ HEADER ══════ */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4 bg-white p-4 rounded-2xl shadow-sm border border-secondary/20 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2.5 rounded-xl">
              <FaCalendarCheck className="text-xl text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-black text-primary capitalize leading-tight">
                {meses[fechaActual.getMonth()]} {fechaActual.getFullYear()}
              </h1>
              <p className="text-[10px] font-bold text-text-light uppercase tracking-widest">Agenda Clínica</p>
            </div>
          </div>

          {/* Navegación */}
          <div className="flex items-center gap-2 bg-background/50 p-1.5 rounded-lg border border-secondary/30">
            <button onClick={() => moverMes(-1)} className="p-1.5 hover:bg-white rounded text-text-light hover:text-primary transition-colors">
              <FaChevronLeft className="text-[10px]" />
            </button>
            <span className="text-[10px] font-bold text-text px-1 uppercase">Mes</span>
            <button onClick={() => moverMes(1)} className="p-1.5 hover:bg-white rounded text-text-light hover:text-primary transition-colors">
              <FaChevronRight className="text-[10px]" />
            </button>
            <div className="w-px h-4 bg-secondary/30 mx-1"></div>
            <button onClick={() => moverSemana(-1)} className="p-1.5 bg-white hover:bg-primary hover:text-white rounded text-text shadow-sm border border-secondary/20 transition-colors">
              <FaChevronLeft className="text-xs" />
            </button>
            <button onClick={() => setFechaActual(new Date())} className="px-3 py-1 bg-white hover:bg-accent-orange hover:text-white rounded text-primary font-bold text-xs shadow-sm border border-secondary/20 flex items-center gap-1 transition-colors">
              <FaCalendarDay /> Hoy
            </button>
            <button onClick={() => moverSemana(1)} className="p-1.5 bg-white hover:bg-primary hover:text-white rounded text-text shadow-sm border border-secondary/20 transition-colors">
              <FaChevronRight className="text-xs" />
            </button>
          </div>

          {/* Leyenda */}
          <div className="hidden md:flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Pendiente</span>
            <span className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-full bg-green-500" /> Confirmado</span>
          </div>
        </header>

        {/* ══════ GRILLA DE LA SEMANA ══════ */}
        <div className="flex-1 bg-white rounded-2xl shadow-md border border-secondary/20 overflow-hidden flex flex-col">

          {/* Cabecera de días */}
          <div className="grid grid-cols-1 md:grid-cols-6 border-b border-secondary/20 bg-background/30 shrink-0">
            {diasSemana.map((dia, index) => (
              <div key={index} className={`py-2.5 text-center border-r border-secondary/10 last:border-0 ${esHoy(dia) ? 'bg-primary/5 border-b-2 border-b-accent-orange' : ''}`}>
                <p className={`text-[10px] font-bold uppercase tracking-wider ${esHoy(dia) ? 'text-accent-orange' : 'text-text-light'}`}>{nombresDias[index]}</p>
                <p className={`text-xl font-black ${esHoy(dia) ? 'text-primary' : 'text-text'}`}>{dia.getDate()}</p>
              </div>
            ))}
          </div>

          {/* Contenido */}
          <div className="flex-1 overflow-y-auto custom-scrollbar bg-gray-50/50">
            {cargando ? (
              <div className="flex flex-col items-center justify-center h-full gap-2">
                <div className="w-8 h-8 border-2 border-accent-orange border-t-transparent rounded-full animate-spin"></div>
                <p className="text-[10px] font-black text-text-light uppercase tracking-widest">Sincronizando...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-6 min-h-full">
                {diasSemana.map((dia, index) => {
                  const turnosDelDia = turnos
                    .filter(t => t.fecha === formatearFechaDB(dia))
                    .sort((a, b) => (a.hora || '').localeCompare(b.hora || ''));

                  return (
                    <div key={index} className={`border-r border-secondary/10 last:border-0 p-1.5 min-h-[400px] ${esHoy(dia) ? 'bg-primary/[0.03]' : ''}`}>
                      {turnosDelDia.length === 0 ? (
                        <p className="text-[10px] font-bold text-center text-secondary mt-8 opacity-30 uppercase tracking-widest">- Libre -</p>
                      ) : (
                        <div className="flex flex-col gap-1.5">
                          {turnosDelDia.map(turno => (
                            <div
                              key={turno._id}
                              onClick={() => { setTurnoSeleccionado(turno); setConfirmarCancelar(false); }}
                              className={`p-2.5 rounded-xl border shadow-sm hover:shadow-lg transition-all cursor-pointer group hover:-translate-y-0.5 relative overflow-hidden
                                ${turno.estado === 'Confirmado'
                                  ? 'bg-white border-l-4 border-l-green-500 hover:border-l-green-600'
                                  : 'bg-amber-50 border-l-4 border-l-amber-500 hover:border-l-amber-600'
                                }`}
                            >
                              {/* ─── HORA (pequeña) ─── */}
                              <div className="flex justify-between items-center mb-1.5">
                                <p className="text-[10px] font-black text-text-light flex items-center gap-1">
                                  <FaClock className={turno.estado === 'Confirmado' ? 'text-green-500' : 'text-amber-600'} />
                                  {turno.hora}
                                </p>
                                <span className="text-[8px] font-bold text-text-light bg-background/80 px-1.5 py-0.5 rounded uppercase tracking-tighter">
                                  {turno.profesional?.includes('Adolfo') ? 'DR. AM' : 'DRA. EC'}
                                </span>
                              </div>

                              {/* ─── NOMBRE Y APELLIDO (prominente) ─── */}
                              <p className="font-black text-primary text-sm leading-tight group-hover:text-accent-orange transition-colors uppercase tracking-tight">
                                {turno.nombrePaciente}
                              </p>
                              <p className="font-bold text-primary/70 text-xs leading-tight uppercase tracking-tight">
                                {turno.apellidoPaciente || ''}
                              </p>

                              {/* ─── MOTIVO DE CONSULTA ─── */}
                              <p className="text-[10px] font-medium text-text mt-1 truncate opacity-70 italic leading-tight">
                                🦷 {turno.motivo || 'Consulta general'}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          MODAL DETALLE DEL TURNO (con acciones)
          ════════════════════════════════════════════════════════════ */}
      {turnoSeleccionado && !confirmarCancelar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setTurnoSeleccionado(null)}>
          <div className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>

            {/* Header */}
            <div className="bg-primary p-6 text-white relative">
              <button onClick={() => setTurnoSeleccionado(null)} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
                <FaTimes className="text-xl" />
              </button>
              <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 ${
                turnoSeleccionado.estado === 'Confirmado' ? 'bg-green-500' : 'bg-accent-orange'
              } text-white`}>
                {turnoSeleccionado.estado}
              </span>
              <h2 className="text-2xl font-black uppercase leading-tight">
                {turnoSeleccionado.nombrePaciente} {turnoSeleccionado.apellidoPaciente}
              </h2>
              <p className="text-white/70 font-medium text-sm mt-1">{turnoSeleccionado.email || turnoSeleccionado.telefono || 'Sin contacto'}</p>
            </div>

            {/* Body */}
            <div className="p-6 md:p-8 space-y-5">

              {/* Info cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-secondary/10 p-3.5 rounded-2xl border border-secondary/20">
                  <p className="text-[10px] font-black text-primary/40 uppercase tracking-widest mb-1 flex items-center gap-1"><FaStethoscope /> Motivo</p>
                  <p className="font-bold text-primary text-sm">{turnoSeleccionado.motivo || 'Consulta general'}</p>
                </div>
                <div className="bg-secondary/10 p-3.5 rounded-2xl border border-secondary/20">
                  <p className="text-[10px] font-black text-primary/40 uppercase tracking-widest mb-1 flex items-center gap-1"><FaUser /> Profesional</p>
                  <p className="font-bold text-primary text-sm">{turnoSeleccionado.profesional}</p>
                </div>
              </div>

              {/* Fecha / Hora */}
              <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-accent-orange uppercase tracking-widest mb-1">Fecha</p>
                  <p className="font-black text-primary">{turnoSeleccionado.fecha ? turnoSeleccionado.fecha.split('-').reverse().join('/') : '-'}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-accent-orange uppercase tracking-widest mb-1">Horario</p>
                  <p className="font-black text-primary">{turnoSeleccionado.hora}</p>
                </div>
              </div>

              {/* Contacto */}
              {(turnoSeleccionado.telefono || turnoSeleccionado.email) && (
                <div className="flex flex-wrap gap-2">
                  {turnoSeleccionado.telefono && (
                    <span className="text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                      <FaWhatsapp /> {turnoSeleccionado.telefono}
                    </span>
                  )}
                  {turnoSeleccionado.email && (
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                      <FaEnvelope /> {turnoSeleccionado.email}
                    </span>
                  )}
                </div>
              )}

              {/* Acciones */}
              {turnoSeleccionado.estado === 'Pendiente' && (
                <div className="flex flex-col gap-2.5 pt-2">
                  <button
                    onClick={handleConfirmar}
                    disabled={procesando}
                    className="w-full flex items-center justify-center gap-3 bg-green-500 text-white p-4 rounded-xl font-black uppercase tracking-widest hover:bg-green-600 transition-colors shadow-lg shadow-green-500/30 disabled:opacity-50"
                  >
                    {procesando ? "Procesando..." : <><FaCheckCircle className="text-xl" /> Confirmar y Notificar</>}
                  </button>
                  <button
                    onClick={() => setConfirmarCancelar(true)}
                    disabled={procesando}
                    className="w-full flex items-center justify-center gap-3 bg-white text-red-500 p-3 rounded-xl font-bold uppercase tracking-widest text-sm border-2 border-red-200 hover:bg-red-50 hover:border-red-400 transition-colors disabled:opacity-50"
                  >
                    <FaTimesCircle className="text-lg" /> Cancelar Turno
                  </button>
                </div>
              )}

              {turnoSeleccionado.estado === 'Confirmado' && (
                <div className="flex flex-col gap-2.5 pt-2">
                  <div className="text-center py-2">
                    <span className="inline-flex items-center gap-2 text-green-600 font-bold text-sm"><FaCheckCircle className="text-xl" /> Turno ya confirmado</span>
                  </div>
                  <button
                    onClick={() => irAHistoriaClinica(turnoSeleccionado)}
                    className="w-full flex items-center justify-center gap-2 bg-primary text-white p-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-primary-hover transition-colors"
                  >
                    Ver Historia Clínica
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════
          MODAL CONFIRMAR CANCELACIÓN (ROJO SUAVE)
          ════════════════════════════════════════════════════════════ */}
      {confirmarCancelar && turnoSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden text-center border-t-8 border-red-500">

            <div className="p-8 space-y-5">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <FaExclamationTriangle className="text-4xl text-red-500" />
              </div>

              <div>
                <h3 className="text-xl font-black text-primary mb-2">¿Cancelar este turno?</h3>
                <p className="text-text-light text-sm font-medium">
                  Estás por cancelar el turno de <span className="font-black text-primary">{turnoSeleccionado.nombrePaciente} {turnoSeleccionado.apellidoPaciente}</span> programado para el <span className="font-bold">{turnoSeleccionado.fecha?.split('-').reverse().join('/')}</span> a las <span className="font-bold">{turnoSeleccionado.hora}</span>.
                </p>
                <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-3">
                  Esta acción no se puede deshacer
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                <button
                  onClick={handleCancelarDefinitivo}
                  disabled={procesando}
                  className="w-full bg-red-500 text-white font-black py-3.5 rounded-xl uppercase tracking-widest hover:bg-red-600 active:scale-95 transition-all shadow-lg shadow-red-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {procesando ? "Cancelando..." : <><FaTimesCircle /> Sí, Cancelar Definitivamente</>}
                </button>
                <button
                  onClick={() => setConfirmarCancelar(false)}
                  className="w-full bg-background text-text font-bold py-3 rounded-xl hover:bg-secondary/20 active:scale-95 transition-all uppercase text-sm tracking-wider"
                >
                  No, Volver Atrás
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════
          MODAL NOTIFICACIONES POST-CONFIRMACIÓN
          ════════════════════════════════════════════════════════════ */}
      {notificacionPendiente && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden shadow-2xl relative border border-secondary/30 flex flex-col">

            <div className="bg-green-500 px-6 pt-8 pb-6 text-white relative text-center">
              <button onClick={() => setNotificacionPendiente(null)} className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors">
                <FaTimesCircle className="text-2xl" />
              </button>
              <FaCheckCircle className="text-6xl mx-auto mb-4 text-white drop-shadow-md" />
              <h2 className="text-2xl font-black uppercase tracking-tight">¡Turno Confirmado!</h2>
              <p className="mt-2 text-green-100 text-sm font-medium">
                El turno de <span className="font-bold">{notificacionPendiente.nombrePaciente}</span> se ha guardado exitosamente.
              </p>
            </div>

            <div className="p-6 space-y-4 bg-gray-50 flex-1">
              <h3 className="text-xs font-black text-primary uppercase tracking-widest text-center mb-2">Notificar al Paciente</h3>
              <div className="grid grid-cols-1 gap-3">
                {notificacionPendiente.waUrl ? (
                  <a href={notificacionPendiente.waUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full p-4 bg-white hover:bg-green-50 border-2 border-green-500 rounded-xl text-green-700 font-bold text-base transition-all hover:scale-[1.02] active:scale-95 shadow-sm">
                    <FaWhatsapp className="text-2xl text-green-500" /> Enviar WhatsApp
                  </a>
                ) : (
                  <div className="flex items-center justify-center gap-3 w-full p-4 bg-gray-100 border-2 border-gray-200 rounded-xl text-gray-400 font-bold text-base cursor-not-allowed">
                    <FaWhatsapp className="text-2xl" /> Sin WhatsApp registrado
                  </div>
                )}
                {notificacionPendiente.mailUrl ? (
                  <a href={notificacionPendiente.mailUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full p-4 bg-white hover:bg-blue-50 border-2 border-blue-500 rounded-xl text-blue-700 font-bold text-base transition-all hover:scale-[1.02] active:scale-95 shadow-sm">
                    <FaEnvelope className="text-2xl text-blue-500" /> Enviar Email
                  </a>
                ) : (
                  <div className="flex items-center justify-center gap-3 w-full p-4 bg-gray-100 border-2 border-gray-200 rounded-xl text-gray-400 font-bold text-base cursor-not-allowed">
                    <FaEnvelope className="text-2xl" /> Sin Email registrado
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-white border-t border-gray-100">
              <button onClick={() => setNotificacionPendiente(null)}
                className="w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-xl transition-colors uppercase text-sm tracking-wider">
                Cerrar y volver al calendario
              </button>
            </div>
          </div>
        </div>
      )}

    </LayoutAdmin>
  );
};

export default AdminAgenda;
