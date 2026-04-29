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

  const navigate = useNavigate();

  // ─── Fetch turnos ─────────────────────────────────────────
  const fetchTurnos = async () => {
    try {
      setCargando(true);
      const res = await api.get('/turnos');
      const hoyStr = new Date().toISOString().split('T')[0];

      // Filtramos turnos que no sean cancelados y que sean de hoy en adelante (comparación de strings segura)
      const turnosFiltrados = res.data.filter(t => {
        return t.estado !== 'Cancelado' && t.fecha >= hoyStr;
      });

      setTurnos(turnosFiltrados);
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

  // Rango de horas para la agenda
  const HORARIOS = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
    "18:00", "18:30", "19:00", "19:30", "20:00"
  ];

  const moverSemana = (dir) => {
    const nueva = new Date(fechaActual);
    nueva.setDate(nueva.getDate() + (dir * 7));

    // Evitar navegar a semanas pasadas si el usuario quiere "desde hoy en adelante"
    const hoy = new Date();
    const inicioHoy = obtenerInicioSemana(hoy);
    if (dir < 0 && nueva < inicioHoy) {
      setFechaActual(hoy);
      return;
    }
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
    let telefonoLimpio = turnoData.telefono ? turnoData.telefono.replace(/\D/g, '') : '';
    if (telefonoLimpio.startsWith('0')) telefonoLimpio = '549' + telefonoLimpio.substring(1);
    if (telefonoLimpio.startsWith('15')) telefonoLimpio = '549381' + telefonoLimpio.substring(2);
    if (telefonoLimpio.length > 0 && telefonoLimpio.length <= 10 && !telefonoLimpio.startsWith('54')) {
      telefonoLimpio = '549' + telefonoLimpio;
    }

    let waUrl = '';
    let mailUrl = '';

    if (telefonoLimpio) {
      const msg = `¡Hola ${turnoData.nombrePaciente}! 🦷\nTe escribimos de *C&M Centro Odontológico*.\n\nTu turno ha sido *CONFIRMADO* ✅\n\n📅 Fecha: ${fechaLegible}\n⏰ Horario: ${turnoData.hora}\n🦷 Motivo: ${turnoData.motivo || 'Consulta'}\n\n¡Te esperamos!`;
      waUrl = `https://wa.me/${telefonoLimpio}?text=${encodeURIComponent(msg)}`;
    }

    if (turnoData.email) {
      const asunto = encodeURIComponent(`✅ Turno Confirmado - C&M Dental (${fechaLegible})`);
      const cuerpo = encodeURIComponent(`Hola ${turnoData.nombrePaciente},\n\nTu turno fue confirmado exitosamente.\n\n📅 Detalles de tu cita:\n- Profesional: ${turnoData.profesional}\n- Fecha: ${fechaLegible}\n- Horario: ${turnoData.hora} hs\n- Motivo: ${turnoData.motivo || 'Consulta general'}\n\n📍 Ubicación: Jose Rondeau 827, San Miguel de Tucumán\n\n📌 Recordatorio: Te sugerimos configurar una notificación en tu calendario 24hs antes del turno.\n\n¡Te esperamos!\n\nEquipo C&M Centro Odontológico`);
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
      
      alert('¡Turno confirmado y enviado correctamente!');
      if (urls.waUrl) {
        window.open(urls.waUrl, '_blank');
      }
      
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
    const pId = turno.pacienteId?._id || turno.pacienteId;
    if (pId) {
      navigate(`/admin/historia-clinica/${pId}`, {
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
            <div className="bg-primary/10 p-2.5 rounded-xl text-primary font-black">
              <FaCalendarCheck className="text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-black text-primary capitalize leading-tight">
                {meses[fechaActual.getMonth()]} {fechaActual.getFullYear()}
              </h1>
              <p className="text-[10px] font-bold text-text-light uppercase tracking-widest">Panel de Agenda Digital</p>
            </div>
          </div>

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

          <div className="hidden md:flex items-center gap-4 text-[9px] font-black uppercase tracking-widest">
            <span className="flex items-center gap-2 p-2 bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Dra. Erina C.
            </span>
            <span className="flex items-center gap-2 p-2 bg-blue-50 text-blue-600 rounded-lg border border-blue-100">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> Dr. Adolfo M.
            </span>
          </div>
        </header>

        {/* ══════ GRILLA TIPO CALENDARIO ══════ */}
        <div className="flex-1 bg-white rounded-3xl shadow-xl border border-secondary/10 overflow-hidden flex flex-col relative">

          {/* Wrapper con scroll horizontal para móviles */}
          <div className="flex-1 overflow-x-auto overflow-y-hidden flex flex-col custom-scrollbar">

            {/* Cabecera de días */}
            <div className="flex border-b border-secondary/10 bg-background/20 shrink-0 ml-[80px] min-w-[900px]">
              {diasSemana.map((dia, index) => (
                <div key={index} className={`flex-1 py-4 text-center border-r border-secondary/5 last:border-0 ${esHoy(dia) ? 'bg-primary/5 relative' : ''}`}>
                  <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${esHoy(dia) ? 'text-accent-orange' : 'text-text-light/60'}`}>{nombresDias[index]}</p>
                  <p className={`text-2xl font-black ${esHoy(dia) ? 'text-primary' : 'text-text'}`}>{dia.getDate()}</p>
                  {esHoy(dia) && <div className="absolute bottom-0 left-0 w-full h-1 bg-accent-orange"></div>}
                </div>
              ))}
            </div>

            {/* Cuerpo con Scroll y Horas a la izquierda */}
            <div className="flex-1 overflow-y-auto custom-scrollbar relative flex bg-gray-50/30 min-w-[980px]">

              {/* Columna de Horas */}
              <div className="w-[80px] bg-white border-r border-secondary/10 shadow-sm sticky left-0 z-10 shrink-0">
                {HORARIOS.map((hora) => (
                  <div key={hora} className="h-[100px] border-b border-secondary/5 flex items-start justify-center pt-3 relative">
                    <span className="text-[10px] font-black text-primary/40 tracking-tighter bg-white px-2 rounded-full border border-secondary/5 shadow-xs">
                      {hora}
                    </span>
                    {/* Línea horizontal que cruza */}
                    <div className="absolute top-0 left-[80px] w-[2000px] h-px bg-secondary/5 pointer-events-none"></div>
                  </div>
                ))}
              </div>

              {/* Columnas de los Días */}
              <div className="flex flex-1">
                {diasSemana.map((dia) => {
                  const turnosDelDia = turnos.filter(t => t.fecha === formatearFechaDB(dia));

                  return (
                    <div key={dia} className={`flex-1 border-r border-secondary/5 last:border-0 relative ${esHoy(dia) ? 'bg-primary/2' : ''}`}>
                      {HORARIOS.map(hora => {
                        const turnoEnHora = turnosDelDia.find(t => t.hora === hora);

                        return (
                          <div key={`${dia}-${hora}`} className="h-[100px] p-1.5 border-b border-secondary/5 relative group">
                            {turnoEnHora ? (
                              <div
                                onClick={() => { setTurnoSeleccionado(turnoEnHora); setConfirmarCancelar(false); }}
                                className={`h-full w-full rounded-2xl p-3 shadow-md border-l-[6px] transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between hover:scale-[1.03] hover:shadow-xl z-20 group
                                  ${turnoEnHora.profesional?.toLowerCase().includes('erina')
                                    ? 'bg-emerald-50 border-l-emerald-500 hover:bg-emerald-100/80 shadow-emerald-500/10'
                                    : 'bg-blue-50 border-l-blue-500 hover:bg-blue-100/80 shadow-blue-500/10'}`}
                              >
                                <div className="flex justify-between items-start gap-1">
                                  <div>
                                    <p className="text-[10px] font-black text-primary/40 uppercase tracking-widest">{turnoEnHora.hora}</p>
                                    <p className="font-black text-primary text-[11px] leading-tight uppercase mt-1 truncate max-w-[120px]">
                                      {turnoEnHora.nombrePaciente} {turnoEnHora.apellidoPaciente}
                                    </p>
                                  </div>
                                  <div className={`p-1 rounded-lg ${turnoEnHora.estado === 'Confirmado' ? 'bg-green-500/20 text-green-600' : 'bg-amber-500/20 text-amber-600'}`}>
                                    <FaCheckCircle className="text-xs" />
                                  </div>
                                </div>
                                <div className="mt-1 flex items-center justify-between">
                                  <p className="text-[9px] font-bold text-primary/60 truncate italic">🦷 {turnoEnHora.motivo || 'Consulta'}</p>
                                  <div className={`text-[8px] font-black px-2 py-0.5 rounded-full text-white ${turnoEnHora.profesional?.toLowerCase().includes('erina') ? 'bg-emerald-500' : 'bg-blue-500'}`}>
                                    {turnoEnHora.profesional?.includes('Adolfo') ? 'DR. AM' : 'DRA. EC'}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                <span className="text-[9px] font-black text-primary/10 tracking-[0.3em] uppercase">Horario Libre</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          MODAL DETALLE DEL TURNO (con acciones)
          ════════════════════════════════════════════════════════════ */}
      {turnoSeleccionado && !confirmarCancelar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setTurnoSeleccionado(null)}>
          <div className="bg-white rounded-4xl w-full max-w-lg shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>

            {/* Header */}
            <div className="bg-primary p-6 text-white relative">
              <button onClick={() => setTurnoSeleccionado(null)} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
                <FaTimes className="text-xl" />
              </button>
              <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 ${turnoSeleccionado.estado === 'Confirmado' ? 'bg-green-500' : 'bg-accent-orange'
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

    </LayoutAdmin>
  );
};

export default AdminAgenda;
