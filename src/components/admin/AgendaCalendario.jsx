import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { es } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import api from '../../api/axios';
import { FaWhatsapp, FaTimes, FaUser, FaStethoscope, FaEnvelope, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// ─── Configuración de idioma (Español) ───────────────────────
const locales = { 'es': es };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

// ─── Componente personalizado para dibujar el bloque del turno ─
const CustomEvent = ({ event }) => {
  return (
    <div className="p-1 h-full flex flex-col justify-start leading-tight overflow-hidden">
      <span className="font-black text-xs md:text-sm truncate block">
        {event.resource.nombrePaciente} {event.resource.apellidoPaciente}
      </span>
      <span className="text-[10px] md:text-xs opacity-90 truncate block font-medium mt-0.5">
        🦷 {event.resource.motivo || 'Consulta'}
      </span>
    </div>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const AgendaCalendario = () => {
  const [eventos, setEventos] = useState([]);
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [procesando, setProcesando] = useState(false);

  // ─── Cargar turnos y adaptarlos al formato de react-big-calendar ─
  const cargarTurnos = async () => {
    setCargando(true);
    try {
      const { data } = await api.get('/turnos');

      const turnosFormateados = data
        .filter(t => t.estado !== 'Cancelado')
        .map(turno => {
          let startHour = 9;
          let startMinute = 0;

          // Parseo inteligente: "16:30", "09:00 hs", etc.
          if (turno.hora && turno.hora.includes(':')) {
            const timeMatch = turno.hora.match(/(\d{1,2}):(\d{2})/);
            if (timeMatch) {
              startHour = parseInt(timeMatch[1], 10);
              startMinute = parseInt(timeMatch[2], 10);
            }
          }

          const [year, month, day] = turno.fecha.split('-');
          const startDate = new Date(year, month - 1, day, startHour, startMinute);
          // 30 min de duración por defecto
          const endDate = new Date(startDate.getTime() + 30 * 60000);

          return {
            id: turno._id,
            title: turno.nombrePaciente,
            start: startDate,
            end: endDate,
            resource: turno,
          };
        });

      setEventos(turnosFormateados);
    } catch (error) {
      console.error("Error al cargar la agenda:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => { cargarTurnos(); }, []);

  // ─── Colores dinámicos por estado ───────────────────────────
  const eventStyleGetter = (event) => {
    const estado = event.resource.estado;
    let backgroundColor = '#f97316';
    if (estado === 'Confirmado') backgroundColor = '#22c55e';
    if (estado === 'Cancelado') backgroundColor = '#ef4444';
    if (estado === 'Completado') backgroundColor = '#3b82f6';

    return {
      style: {
        backgroundColor,
        borderRadius: '6px',
        opacity: 1,
        color: 'white',
        border: 'none',
        display: 'block',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      },
    };
  };

  // ─── Helper: Generar enlace de Google Calendar ──────────────
  const generarGoogleCalendarUrl = (turnoData) => {
    let horaInicioStr = '09:00';
    const timeMatch = turnoData.hora?.match(/(\d{1,2}:\d{2})/);
    if (timeMatch) horaInicioStr = timeMatch[1];

    const [year, month, day] = turnoData.fecha.split('-');
    const [hour, minute] = horaInicioStr.split(':');

    const startDate = new Date(year, month - 1, day, hour, minute);
    const endDate = new Date(startDate.getTime() + 30 * 60000);

    // Formato Google Calendar local: YYYYMMDDTHHmmss
    const formatGCal = (date) => {
      const pad = n => String(n).padStart(2, '0');
      return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
    };

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Turno Odontológico - ${turnoData.profesional}`)}&dates=${formatGCal(startDate)}/${formatGCal(endDate)}&details=${encodeURIComponent(`Motivo: ${turnoData.motivo || 'Consulta general'}\nPaciente: ${turnoData.nombrePaciente} ${turnoData.apellidoPaciente}`)}&location=${encodeURIComponent('Jose Rondeau 827, San Miguel de Tucumán')}`;
  };

  // ─── Helper: URLs de notificación (WhatsApp + Email + Calendar) ─
  const generarUrlsNotificacion = (turnoData, googleCalUrl) => {
    const fechaLegible = turnoData.fecha ? turnoData.fecha.split('-').reverse().join('/') : '';
    // Normalizar teléfono: quitar todo menos dígitos, asegurar prefijo argentino
    let telefonoLimpio = turnoData.telefono ? turnoData.telefono.replace(/\D/g, '') : '';
    if (telefonoLimpio.startsWith('0')) telefonoLimpio = '549' + telefonoLimpio.substring(1);
    if (telefonoLimpio.startsWith('15')) telefonoLimpio = '549381' + telefonoLimpio.substring(2);
    if (telefonoLimpio.length > 0 && telefonoLimpio.length <= 10 && !telefonoLimpio.startsWith('54')) {
      telefonoLimpio = '549' + telefonoLimpio;
    }

    let waUrl = '';
    let mailUrl = '';

    if (telefonoLimpio) {
      const mensaje = `¡Hola ${turnoData.nombrePaciente}! 🦷\nTe escribimos de *C&M Centro Odontológico*.\n\nTu turno ha sido *CONFIRMADO* ✅\n\n👨‍⚕️ Profesional: ${turnoData.profesional}\n📅 Fecha: ${fechaLegible}\n⏰ Horario: ${turnoData.hora}\n🦷 Motivo: ${turnoData.motivo || 'Consulta general'}\n📍 Jose Rondeau 827, S.M. de Tucumán\n\n🗓️ *Agendalo en tu celular:*\n${googleCalUrl}\n\n¡Te esperamos!`;
      waUrl = `https://wa.me/${telefonoLimpio}?text=${encodeURIComponent(mensaje)}`;
    }

    if (turnoData.email) {
      const asunto = encodeURIComponent(`✅ Turno Confirmado - C&M Dental (${fechaLegible})`);
      const cuerpo = encodeURIComponent(`Hola ${turnoData.nombrePaciente},\n\nTu turno fue confirmado exitosamente.\n\nProfesional: ${turnoData.profesional}\nFecha: ${fechaLegible}\nHorario: ${turnoData.hora}\nMotivo: ${turnoData.motivo || 'Consulta general'}\n\n📅 Agrega este turno a tu calendario:\n${googleCalUrl}\n\nDirección: Jose Rondeau 827, San Miguel de Tucumán\n\n¡Te esperamos!\nEquipo C&M Dental`);
      mailUrl = `mailto:${turnoData.email}?subject=${asunto}&body=${cuerpo}`;
    }

    return { waUrl, mailUrl, googleCalUrl, nombrePaciente: turnoData.nombrePaciente, telefono: turnoData.telefono, email: turnoData.email };
  };

  // ─── Confirmar Turno (PATCH + Google Calendar + Notificación) ─
  const confirmarTurno = async () => {
    setProcesando(true);
    const turno = turnoSeleccionado.resource;

    try {
      // 1. ACTUALIZAR ESTADO EN BASE DE DATOS
      await api.patch(`/turnos/${turno._id}/estado`, { estado: 'Confirmado' });

      // 2. GENERAR ENLACE DE GOOGLE CALENDAR
      const googleCalUrl = generarGoogleCalendarUrl(turno);

      // 3. PREPARAR URLS DE NOTIFICACIÓN (WhatsApp + Email + Calendar)
      const urls = generarUrlsNotificacion(turno, googleCalUrl);

      // 4. CERRAR MODAL Y MOSTRAR ALERTA
      setTurnoSeleccionado(null);
      alert('¡Turno confirmado y enviado correctamente!');
      
      if (urls.waUrl) {
        window.open(urls.waUrl, '_blank');
      }
      
      await cargarTurnos();

    } catch (error) {
      console.error("Error al confirmar el turno:", error);
      alert("Hubo un error al confirmar. Revisa la consola.");
    } finally {
      setProcesando(false);
    }
  };

  // ─── Cancelar Turno ────────────────────────────────────────
  const cancelarTurno = async () => {
    setProcesando(true);
    const turno = turnoSeleccionado.resource;
    try {
      await api.patch(`/turnos/${turno._id}/estado`, { estado: 'Cancelado' });
      setTurnoSeleccionado(null);
      await cargarTurnos();
    } catch (error) {
      console.error("Error al cancelar:", error);
      alert("Hubo un error al cancelar.");
    } finally {
      setProcesando(false);
    }
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // RENDER
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  return (
    <div className="p-2 md:p-6 bg-background min-h-screen flex flex-col">
      <div className="max-w-[1600px] w-full mx-auto flex-1 flex flex-col">

        {/* Header + Leyenda */}
        <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-primary uppercase">Agenda Clínica</h1>
            <p className="text-text-light font-medium text-sm">Gestión visual de citas y confirmaciones</p>
          </div>
          <div className="flex flex-wrap gap-3 text-xs font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-orange-500" /> Pendiente</span>
            <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-green-500" /> Confirmado</span>
            <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-blue-500" /> Completado</span>
          </div>
        </div>

        {/* ════ CALENDARIO EXPANDIDO ════ */}
        <div className="bg-white p-2 sm:p-4 rounded-2xl shadow-xl border border-secondary/20 flex-1 min-h-[80vh] flex flex-col calendar-container overflow-hidden">
          {cargando ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-3">
              <div className="w-10 h-10 border-3 border-accent-orange border-t-transparent rounded-full animate-spin" />
              <p className="font-bold text-primary/50 text-sm uppercase tracking-widest">Cargando agenda...</p>
            </div>
          ) : (
            <div className="flex-1 overflow-x-auto overflow-y-hidden custom-scrollbar">
              <div className="min-w-[800px] h-full">
                <Calendar
                  localizer={localizer}
                  events={eventos}
                  startAccessor="start"
                  endAccessor="end"
                  culture="es"
                  defaultView="week"
                  views={['month', 'week', 'day', 'agenda']}
                  min={new Date(2020, 1, 1, 8, 0)}
                  max={new Date(2020, 1, 1, 21, 0)}
                  step={15}
                  timeslots={4}
                  messages={{
                    next: "Sig",
                    previous: "Ant",
                    today: "Hoy",
                    month: "Mes",
                    week: "Semana",
                    day: "Día",
                    agenda: "Lista",
                    date: "Fecha",
                    time: "Hora",
                    event: "Turno",
                    noEventsInRange: "No hay turnos en este rango.",
                    showMore: (total) => `+${total} más`,
                  }}
                  onSelectEvent={(event) => setTurnoSeleccionado(event)}
                  eventPropGetter={eventStyleGetter}
                  components={{ event: CustomEvent }}
                  className="font-sans text-sm text-primary h-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          MODAL DE DETALLES DEL TURNO
          ══════════════════════════════════════════════════════ */}
      {turnoSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setTurnoSeleccionado(null)}>
          <div className="bg-white rounded-4xl w-full max-w-lg shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>

            {/* Header */}
            <div className="bg-primary p-6 text-white relative">
              <button onClick={() => setTurnoSeleccionado(null)} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
                <FaTimes className="text-xl" />
              </button>
              <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 ${turnoSeleccionado.resource.estado === 'Confirmado' ? 'bg-green-500 text-white' : 'bg-accent-orange text-white'
                }`}>
                Estado: {turnoSeleccionado.resource.estado}
              </span>
              <h2 className="text-2xl font-black uppercase leading-tight">
                {turnoSeleccionado.resource.nombrePaciente} {turnoSeleccionado.resource.apellidoPaciente}
              </h2>
              <p className="text-white/70 font-medium text-sm mt-1">{turnoSeleccionado.resource.telefono || 'Sin teléfono'}</p>
            </div>

            {/* Body */}
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary/10 p-4 rounded-2xl border border-secondary/20">
                  <p className="text-[10px] font-black text-primary/40 uppercase tracking-widest mb-1 flex items-center gap-1"><FaStethoscope /> Motivo</p>
                  <p className="font-bold text-primary text-sm">{turnoSeleccionado.resource.motivo || 'Consulta general'}</p>
                </div>
                <div className="bg-secondary/10 p-4 rounded-2xl border border-secondary/20">
                  <p className="text-[10px] font-black text-primary/40 uppercase tracking-widest mb-1 flex items-center gap-1"><FaUser /> Profesional</p>
                  <p className="font-bold text-primary text-sm">{turnoSeleccionado.resource.profesional}</p>
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-accent-orange uppercase tracking-widest mb-1">Fecha Programada</p>
                  <p className="font-black text-primary">{turnoSeleccionado.resource.fecha ? turnoSeleccionado.resource.fecha.split('-').reverse().join('/') : '-'}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-accent-orange uppercase tracking-widest mb-1">Horario</p>
                  <p className="font-black text-primary text-sm">{turnoSeleccionado.resource.hora}</p>
                </div>
              </div>

              {/* Acciones para Pendientes */}
              {turnoSeleccionado.resource.estado === 'Pendiente' && (
                <div className="flex flex-col gap-3">
                  <button
                    onClick={confirmarTurno}
                    disabled={procesando}
                    className="w-full flex items-center justify-center gap-3 bg-green-500 text-white p-4 rounded-xl font-black uppercase tracking-widest hover:bg-green-600 transition-colors shadow-lg shadow-green-500/30 disabled:opacity-50"
                  >
                    {procesando ? "Procesando..." : <><FaCheckCircle className="text-xl" /> Confirmar y Notificar</>}
                  </button>
                  <button
                    onClick={cancelarTurno}
                    disabled={procesando}
                    className="w-full flex items-center justify-center gap-3 bg-red-500 text-white p-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-red-600 transition-colors disabled:opacity-50"
                  >
                    {procesando ? "..." : <><FaTimesCircle className="text-lg" /> Cancelar Turno</>}
                  </button>
                </div>
              )}

              {turnoSeleccionado.resource.estado === 'Confirmado' && (
                <div className="text-center py-2">
                  <span className="inline-flex items-center gap-2 text-green-600 font-bold text-sm">
                    <FaCheckCircle className="text-xl" /> Turno ya confirmado
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AgendaCalendario;
