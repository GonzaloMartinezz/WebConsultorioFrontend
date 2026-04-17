import { useState, useEffect } from "react";
import LayoutAdmin from "../../components/layouts/LayoutAdmin.jsx";
import { FaUsers, FaChartPie, FaStethoscope, FaCalendarCheck, FaCalendarTimes, FaClock, FaChartBar, FaSpinner, FaUserCheck, FaUserTimes, FaChartLine, FaSmileBeam } from 'react-icons/fa';
import api from "../../api/axios.js";

const AdminEstadisticas = () => {
  const [turnos, setTurnos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [turnosRes, pacientesRes] = await Promise.all([
          api.get('/turnos'),
          api.get('/pacientes').catch(() => ({ data: [] }))
        ]);
        setTurnos(turnosRes.data);
        setPacientes(pacientesRes.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setCargando(false);
      }
    };
    fetchData();
  }, []);

  if (cargando) {
    return (
      <LayoutAdmin>
        <div className="flex flex-col justify-center items-center h-64 gap-4">
          <FaSpinner className="text-4xl text-accent-orange animate-spin" />
          <p className="text-text-light font-bold text-sm uppercase tracking-widest">Calculando métricas...</p>
        </div>
      </LayoutAdmin>
    );
  }

  // ============================================================
  // CÁLCULOS DINÁMICOS DESDE DATOS REALES
  // ============================================================

  const totalTurnos = turnos.length;
  const turnosSolicitados = turnos.filter(t => t.estado === 'Pendiente').length;
  const turnosConfirmados = turnos.filter(t => t.estado === 'Confirmado').length;
  const turnosCancelados = turnos.filter(t => t.estado === 'Cancelado').length;
  const turnosAtendidos = turnos.filter(t => ['Atendido', 'Completado', 'Finalizado'].includes(t.estado)).length;
  const turnosNoAsistieron = turnosCancelados; // Pacientes que cancelaron o no fueron
  const totalPacientes = pacientes.length;

  // Tasa de asistencia
  const turnosFinalizados = turnosConfirmados + turnosAtendidos;
  const tasaAsistencia = totalTurnos > 0 ? ((turnosFinalizados / totalTurnos) * 100).toFixed(1) : '0';

  // Distribución por profesional
  const turnosPorProfesional = {};
  turnos.forEach(t => {
    const prof = t.profesional || 'Sin asignar';
    turnosPorProfesional[prof] = (turnosPorProfesional[prof] || 0) + 1;
  });

  // Motivos de consulta completos
  const motivosCategorias = {
    'Consulta General': 0,
    'Limpieza Dental': 0,
    'Ortodoncia': 0,
    'Implantología': 0,
    'Endodoncia': 0,
    'Cirugía': 0,
    'Urgencia': 0,
    'Estética': 0,
    'Otros': 0
  };

  turnos.forEach(t => {
    const m = (t.motivo || '').toLowerCase();
    if (m.includes('general') || m.includes('control')) motivosCategorias['Consulta General']++;
    else if (m.includes('limpieza')) motivosCategorias['Limpieza Dental']++;
    else if (m.includes('ortodoncia') || m.includes('bracket')) motivosCategorias['Ortodoncia']++;
    else if (m.includes('implant')) motivosCategorias['Implantología']++;
    else if (m.includes('endodoncia') || m.includes('conducto')) motivosCategorias['Endodoncia']++;
    else if (m.includes('cirug') || m.includes('extracci')) motivosCategorias['Cirugía']++;
    else if (m.includes('dolor') || m.includes('urgencia')) motivosCategorias['Urgencia']++;
    else if (m.includes('est') || m.includes('blanquea')) motivosCategorias['Estética']++;
    else motivosCategorias['Otros']++;
  });

  // Turnos por mes (últimos 6 meses)
  const turnosPorMes = {};
  const mesesNombres = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  turnos.forEach(t => {
    if (t.fecha) {
      const partes = t.fecha.split('-');
      const mesKey = `${mesesNombres[parseInt(partes[1]) - 1]} ${partes[0]}`;
      turnosPorMes[mesKey] = (turnosPorMes[mesKey] || 0) + 1;
    }
  });

  // Colores para motivos
  const motivosColores = {
    'Consulta General': 'bg-blue-500',
    'Limpieza Dental': 'bg-teal-500',
    'Ortodoncia': 'bg-accent-orange',
    'Implantología': 'bg-purple-500',
    'Endodoncia': 'bg-yellow-500',
    'Cirugía': 'bg-red-500',
    'Urgencia': 'bg-rose-600',
    'Estética': 'bg-pink-400',
    'Otros': 'bg-gray-400'
  };

  const maxMotivo = Math.max(...Object.values(motivosCategorias), 1);

  return (
    <LayoutAdmin>
      <header className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <FaChartLine className="text-accent-orange text-2xl" />
          <h1 className="text-3xl font-black text-primary tracking-tight">Rendimiento Clínico 2026</h1>
        </div>
        <p className="text-text-light font-medium text-sm">Métricas de atención calculadas en tiempo real desde la base de datos.</p>
      </header>

      {/* ═══════ KPIs PRINCIPALES (6 cards) ═══════ */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-secondary/20 text-center">
          <FaUsers className="text-xl text-blue-500 mx-auto mb-2" />
          <p className="text-2xl font-black text-primary">{totalPacientes}</p>
          <p className="text-[9px] font-bold text-text-light uppercase tracking-widest mt-1">Pacientes Totales</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-secondary/20 text-center">
          <FaCalendarCheck className="text-xl text-green-500 mx-auto mb-2" />
          <p className="text-2xl font-black text-primary">{totalTurnos}</p>
          <p className="text-[9px] font-bold text-text-light uppercase tracking-widest mt-1">Volumen Gestión</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-secondary/20 text-center">
          <FaClock className="text-xl text-amber-500 mx-auto mb-2" />
          <p className="text-2xl font-black text-amber-600">{turnosSolicitados}</p>
          <p className="text-[9px] font-bold text-text-light uppercase tracking-widest mt-1">Nuevos/Pendientes</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-secondary/20 text-center">
          <FaUserCheck className="text-xl text-emerald-500 mx-auto mb-2" />
          <p className="text-2xl font-black text-emerald-600">{turnosConfirmados + turnosAtendidos}</p>
          <p className="text-[9px] font-bold text-text-light uppercase tracking-widest mt-1">Citas Efectivas</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-secondary/20 text-center">
          <FaUserTimes className="text-xl text-red-500 mx-auto mb-2" />
          <p className="text-2xl font-black text-red-600">{turnosCancelados}</p>
          <p className="text-[9px] font-bold text-text-light uppercase tracking-widest mt-1">Canc./Eliminados</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-secondary/20 text-center">
          <FaChartBar className="text-xl text-primary mx-auto mb-2" />
          <p className="text-2xl font-black text-primary">{tasaAsistencia}%</p>
          <p className="text-[9px] font-bold text-text-light uppercase tracking-widest mt-1">Eficacia Agenda</p>
        </div>
      </div>

      {/* ═══════ GRÁFICOS ═══════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* ── Distribución por Profesional ── */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-secondary/20">
          <h2 className="text-lg font-black text-primary mb-5 flex items-center gap-2">
            <FaStethoscope className="text-accent-orange" /> Carga por Profesional
          </h2>

          <div className="space-y-5">
            {Object.entries(turnosPorProfesional).map(([prof, count], idx) => {
              const perc = totalTurnos > 0 ? ((count / totalTurnos) * 100).toFixed(0) : 0;
              const colors = ['bg-blue-500', 'bg-pink-500', 'bg-purple-500', 'bg-teal-500'];
              return (
                <div key={prof}>
                  <div className="flex justify-between mb-1.5">
                    <span className="font-bold text-text text-sm">{prof}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-text-light">{count} turnos</span>
                      <span className="font-black text-primary text-sm">{perc}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-secondary/15 rounded-full h-3.5 overflow-hidden">
                    <div className={`${colors[idx % colors.length]} h-3.5 rounded-full transition-all duration-1000`} style={{ width: `${perc}%` }}></div>
                  </div>
                </div>
              );
            })}
            {Object.keys(turnosPorProfesional).length === 0 && (
              <p className="text-text-light font-medium text-sm text-center py-4">Sin datos de profesionales aún.</p>
            )}
          </div>
        </div>

        {/* ── Motivos de Consulta (Gráfico de barras horizontales) ── */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-secondary/20">
          <h2 className="text-lg font-black text-primary mb-5 flex items-center gap-2">
            <FaChartPie className="text-accent-orange" /> Motivos de Consulta
          </h2>

          <div className="space-y-3">
            {Object.entries(motivosCategorias)
              .filter(([_, count]) => count > 0)
              .sort((a, b) => b[1] - a[1])
              .map(([motivo, count]) => {
                const perc = ((count / maxMotivo) * 100).toFixed(0);
                return (
                  <div key={motivo} className="flex items-center gap-3">
                    <div className="w-28 text-xs font-bold text-text-light truncate shrink-0">{motivo}</div>
                    <div className="flex-1 bg-secondary/15 h-5 rounded overflow-hidden">
                      <div className={`${motivosColores[motivo]} h-5 transition-all duration-1000 rounded`} style={{ width: `${perc}%` }}></div>
                    </div>
                    <div className="w-8 text-right font-black text-primary text-sm">{count}</div>
                  </div>
                );
              })}
            {Object.values(motivosCategorias).every(v => v === 0) && (
              <p className="text-text-light font-medium text-sm text-center py-4">Sin datos de motivos aún.</p>
            )}
          </div>
        </div>

        {/* ── Estado de Turnos (Donut visual) ── */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-secondary/20">
          <h2 className="text-lg font-black text-primary mb-5 flex items-center gap-2">
            <FaCalendarCheck className="text-accent-orange" /> Estado de Turnos
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 text-center">
              <p className="text-3xl font-black text-amber-600">{turnosSolicitados}</p>
              <p className="text-[10px] font-bold text-amber-700 uppercase tracking-widest mt-1">Pendientes</p>
              <div className="w-full bg-amber-200 h-1.5 rounded-full mt-2"><div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${totalTurnos > 0 ? (turnosSolicitados / totalTurnos * 100) : 0}%` }}></div></div>
            </div>
            <div className="bg-green-50 p-4 rounded-xl border border-green-100 text-center">
              <p className="text-3xl font-black text-green-600">{turnosConfirmados}</p>
              <p className="text-[10px] font-bold text-green-700 uppercase tracking-widest mt-1">Confirmados</p>
              <div className="w-full bg-green-200 h-1.5 rounded-full mt-2"><div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${totalTurnos > 0 ? (turnosConfirmados / totalTurnos * 100) : 0}%` }}></div></div>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-center">
              <p className="text-3xl font-black text-blue-600">{turnosAtendidos}</p>
              <p className="text-[10px] font-bold text-blue-700 uppercase tracking-widest mt-1">Atendidos</p>
              <div className="w-full bg-blue-200 h-1.5 rounded-full mt-2"><div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${totalTurnos > 0 ? (turnosAtendidos / totalTurnos * 100) : 0}%` }}></div></div>
            </div>
            <div className="bg-red-50 p-4 rounded-xl border border-red-100 text-center">
              <p className="text-3xl font-black text-red-600">{turnosCancelados}</p>
              <p className="text-[10px] font-bold text-red-700 uppercase tracking-widest mt-1">Cancelados</p>
              <div className="w-full bg-red-200 h-1.5 rounded-full mt-2"><div className="bg-red-500 h-1.5 rounded-full" style={{ width: `${totalTurnos > 0 ? (turnosCancelados / totalTurnos * 100) : 0}%` }}></div></div>
            </div>
          </div>
        </div>

        {/* ── Turnos por Mes ── */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-secondary/20">
          <h2 className="text-lg font-black text-primary mb-5 flex items-center gap-2">
            <FaChartBar className="text-accent-orange" /> Volumen Mensual
          </h2>

          {Object.keys(turnosPorMes).length > 0 ? (
            <div className="flex items-end gap-3 h-48">
              {Object.entries(turnosPorMes).slice(-8).map(([mes, count]) => {
                const maxMes = Math.max(...Object.values(turnosPorMes), 1);
                const heightPerc = (count / maxMes) * 100;
                return (
                  <div key={mes} className="flex-1 flex flex-col items-center justify-end h-full">
                    <span className="text-xs font-black text-primary mb-1">{count}</span>
                    <div
                      className="w-full bg-linear-to-t from-accent-orange to-orange-300 rounded-t-lg transition-all duration-1000 min-h-[4px]"
                      style={{ height: `${heightPerc}%` }}
                    ></div>
                    <span className="text-[9px] font-bold text-text-light mt-2 uppercase">{mes}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-text-light font-medium text-sm text-center py-8">Sin datos de turnos por mes aún.</p>
          )}
        </div>

        {/* ── COMPARATIVA DE EFICIENCIA (Asistencia vs Cancelación) ── */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-secondary/20 lg:col-span-2">
          <h2 className="text-lg font-black text-primary mb-6 flex items-center gap-2">
            <FaSmileBeam className="text-accent-orange" /> Análisis de Asistencia vs Deserción
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Gráfico Visual */}
            <div className="relative w-48 h-48 shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                {/* Círculo Base (Cancelados/Otros) - Rojo */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#fee2e2" strokeWidth="3"></circle>
                {/* Círculo Asistencia - Verde */}
                <circle
                  cx="18" cy="18" r="15.915" fill="none" stroke="#10b981" strokeWidth="3"
                  strokeDasharray={`${tasaAsistencia} ${100 - tasaAsistencia}`}
                  strokeDashoffset="0"
                  className="transition-all duration-1000"
                ></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-primary leading-none">{tasaAsistencia}%</span>
                <span className="text-[9px] font-bold text-green-600 uppercase tracking-widest">Éxito</span>
              </div>
            </div>

            {/* Leyenda y Detalles */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div className="bg-green-50 p-4 rounded-2xl border border-green-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm shadow-green-500/50"></div>
                  <span className="text-xs font-black text-green-700 uppercase">Citas Efectivas</span>
                </div>
                <p className="text-2xl font-black text-primary">{turnosConfirmados + turnosAtendidos}</p>
                <p className="text-[10px] text-green-600 font-medium">Pacientes que asistieron o tienen cita confirmada.</p>
              </div>

              <div className="bg-red-50 p-4 rounded-2xl border border-red-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-400 shadow-sm shadow-red-500/50"></div>
                  <span className="text-xs font-black text-red-700 uppercase">Perdida / Cancelado</span>
                </div>
                <p className="text-2xl font-black text-primary">{turnosCancelados}</p>
                <p className="text-[10px] text-red-500 font-medium">Citas perdidas, canceladas o eliminadas de la agenda.</p>
              </div>

              <div className="sm:col-span-2 p-4 bg-background/50 rounded-2xl border border-secondary/20 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-primary">Margen de Mejora</p>
                  <p className="text-[10px] text-text-light">Basado en el volumen total de {totalTurnos} gestiones.</p>
                </div>
                <span className="text-xl font-black text-accent-orange">{(100 - tasaAsistencia).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </LayoutAdmin>
  );
};

export default AdminEstadisticas;
