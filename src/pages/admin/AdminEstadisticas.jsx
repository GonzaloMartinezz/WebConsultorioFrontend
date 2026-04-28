import { useState, useEffect } from "react";
import LayoutAdmin from "../../components/layouts/LayoutAdmin.jsx";
import {
  FaUsers, FaCalendarCheck, FaClock, FaUserCheck, FaUserTimes,
  FaChartBar, FaStethoscope, FaChartPie, FaChartLine
} from 'react-icons/fa';
import api from "../../api/axios.js";

const AdminEstadisticas = () => {
  const [stats, setStats] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/estadisticas');
        setStats(res.data);
      } catch (error) {
        console.error("Error al obtener estadísticas:", error);
      } finally {
        setCargando(false);
      }
    };
    fetchStats();
  }, []);

  if (cargando) {
    return (
      <LayoutAdmin>
        <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-secondary/20 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-accent-orange border-t-transparent rounded-full animate-spin absolute inset-0"></div>
          </div>
          <p className="text-text-light font-black text-sm uppercase tracking-widest animate-pulse mt-4">Analizando datos reales...</p>
        </div>
      </LayoutAdmin>
    );
  }

  if (!stats) return (
    <LayoutAdmin>
      <div className="text-center py-20">
        <p className="text-text-light font-bold">No se pudieron cargar las estadísticas.</p>
      </div>
    </LayoutAdmin>
  );

  const {
    pacientesTotales,
    turnosTotales,
    turnosPendientes,
    turnosConfirmados,
    turnosCancelados,
    turnosAtendidos,
    cargaProfesionales,
    motivosConsulta,
    motivosDetalle,
    turnosPorMes,
    listaUsuarios = [],
    listaTurnosConfirmados = [],
    listaTurnosCancelados = []
  } = stats;

  // Cálculos reales
  const totalEfectivos = turnosConfirmados + turnosAtendidos;
  const tasaAsistencia = turnosTotales > 0 ? ((totalEfectivos / turnosTotales) * 100).toFixed(1) : 0;

  // Meses ordenados
  const mesesNombres = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  const dataMeses = Object.entries(turnosPorMes || {}).map(([key, count]) => {
    const [year, month] = key.split('-');
    return {
      label: `${mesesNombres[parseInt(month) - 1]} ${year?.slice(-2)}`,
      fullLabel: `${mesesNombres[parseInt(month) - 1]} ${year}`,
      count
    };
  }).sort((a, b) => a.fullLabel.localeCompare(b.fullLabel));

  const maxMes = Math.max(...dataMeses.map(d => d.count), 1);

  // Motivos: mapa legible + gradientes
  const motivosConfig = {
    general: { label: 'Consulta General', color: 'from-blue-400 to-blue-600', dot: '#3b82f6' },
    limpieza: { label: 'Limpieza Dental', color: 'from-teal-400 to-teal-600', dot: '#14b8a6' },
    ortodoncia: { label: 'Ortodoncia', color: 'from-orange-400 to-orange-600', dot: '#f97316' },
    implantologia: { label: 'Implantología', color: 'from-purple-400 to-purple-600', dot: '#a855f7' },
    endodoncia: { label: 'Endodoncia', color: 'from-yellow-400 to-yellow-600', dot: '#eab308' },
    cirugia: { label: 'Cirugía Oral', color: 'from-red-400 to-red-600', dot: '#ef4444' },
    urgencia: { label: 'Urgencia / Dolor', color: 'from-rose-500 to-rose-700', dot: '#f43f5e' },
    estetica: { label: 'Estética Dental', color: 'from-pink-400 to-pink-600', dot: '#ec4899' },
    blanqueamiento: { label: 'Blanqueamiento', color: 'from-sky-400 to-sky-600', dot: '#0ea5e9' },
    protesis: { label: 'Prótesis / Coronas', color: 'from-emerald-400 to-emerald-600', dot: '#10b981' },
    periodoncia: { label: 'Periodoncia', color: 'from-lime-500 to-lime-700', dot: '#84cc16' },
    radiografia: { label: 'Radiografía', color: 'from-slate-400 to-slate-600', dot: '#94a3b8' },
    otros: { label: 'Otros', color: 'from-gray-400 to-gray-600', dot: '#9ca3af' },
  };

  const motivosList = Object.entries(motivosConsulta || {})
    .filter(([_, count]) => count > 0)
    .sort((a, b) => b[1] - a[1]);

  const maxMotivo = Math.max(...motivosList.map(([_, c]) => c), 1);

  // Profesionales: dinámico (viene tal cual de la BD)
  const profList = Object.entries(cargaProfesionales || {}).sort((a, b) => b[1] - a[1]);
  const maxProf = Math.max(...profList.map(([_, c]) => c), 1);
  const profGradients = [
    'from-blue-400 to-blue-600',
    'from-orange-400 to-orange-600',
    'from-purple-400 to-purple-600',
    'from-teal-400 to-teal-600',
    'from-green-400 to-green-600',
  ];

  // Motivos no clasificados (string real)
  const detalleList = Object.entries(motivosDetalle || {}).sort((a, b) => b[1] - a[1]).slice(0, 8);

  return (
    <LayoutAdmin>
      <header className="mb-8">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-orange mb-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-orange animate-pulse"></span> Analytics en Tiempo Real
        </p>
        <h1 className="text-3xl lg:text-4xl font-black text-primary tracking-tight">Rendimiento Clínico</h1>
        <p className="text-text-light font-medium text-sm mt-1">
          Métricas calculadas en tiempo real desde tu base de datos. {turnosTotales} turnos analizados.
        </p>
      </header>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {[
          { label: "Pacientes", val: pacientesTotales, icon: FaUsers, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Histórico", val: turnosTotales, icon: FaCalendarCheck, color: "text-primary", bg: "bg-primary/10" },
          { label: "Pendientes", val: turnosPendientes, icon: FaClock, color: "text-amber-500", bg: "bg-amber-500/10" },
          { label: "Efectivos", val: totalEfectivos, icon: FaUserCheck, color: "text-green-500", bg: "bg-green-500/10" },
          { label: "Cancelados", val: turnosCancelados, icon: FaUserTimes, color: "text-red-500", bg: "bg-red-500/10" },
          { label: "Tasa de Éxito", val: `${tasaAsistencia}%`, icon: FaChartBar, color: "text-accent-orange", bg: "bg-accent-orange/10" }
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-5 rounded-4xl shadow-sm border border-secondary/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center justify-center text-center">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-3 ${kpi.bg} group-hover:scale-110 transition-transform duration-300`}>
              <kpi.icon className={`text-lg ${kpi.color}`} />
            </div>
            <p className="text-3xl font-black text-primary tracking-tighter">{kpi.val}</p>
            <p className="text-[9px] font-black text-text-light uppercase tracking-widest mt-1">{kpi.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Carga por Profesional — DINÁMICA */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-secondary/10 hover:shadow-lg transition-all">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-11 h-11 bg-primary/5 rounded-2xl flex items-center justify-center">
              <FaStethoscope className="text-xl text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-black text-primary">Carga Operativa</h2>
              <p className="text-[10px] font-bold text-text-light uppercase tracking-widest">Por Profesional · {profList.length} registrados</p>
            </div>
          </div>

          {profList.length > 0 ? (
            <div className="space-y-5">
              {profList.map(([prof, count], idx) => {
                const perc = turnosTotales > 0 ? ((count / turnosTotales) * 100).toFixed(1) : 0;
                return (
                  <div key={prof}>
                    <div className="flex justify-between items-end mb-1.5">
                      <span className="font-bold text-sm text-primary leading-tight max-w-[60%]">{prof}</span>
                      <div className="flex items-baseline gap-2 shrink-0">
                        <span className="text-[10px] font-bold text-text-light">{count} citas</span>
                        <span className="font-black text-lg text-primary">{perc}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-secondary/10 rounded-full h-4 overflow-hidden shadow-inner">
                      <div
                        className={`bg-linear-to-r ${profGradients[idx % profGradients.length]} h-full rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${(count / maxProf) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-secondary/5 rounded-2xl">
              <p className="text-text-light font-bold text-sm">Sin datos de profesionales aún.</p>
            </div>
          )}
        </div>

        {/* Motivos de Consulta — 12 categorías */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-secondary/10 hover:shadow-lg transition-all">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-11 h-11 bg-accent-orange/10 rounded-2xl flex items-center justify-center">
              <FaChartPie className="text-xl text-accent-orange" />
            </div>
            <div>
              <h2 className="text-lg font-black text-primary">Motivos de Consulta</h2>
              <p className="text-[10px] font-bold text-text-light uppercase tracking-widest">{motivosList.length} categorías detectadas</p>
            </div>
          </div>

          {motivosList.length > 0 ? (
            <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-1">
              {motivosList.map(([key, count]) => {
                const cfg = motivosConfig[key] || { label: key, color: 'from-gray-400 to-gray-600', dot: '#9ca3af' };
                const perc = ((count / maxMotivo) * 100).toFixed(0);
                return (
                  <div key={key} className="flex items-center gap-3 group">
                    <div className="flex items-center gap-1.5 w-36 shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cfg.dot }}></div>
                      <span className="text-[10px] font-black uppercase tracking-wide text-text-light group-hover:text-primary transition-colors truncate">{cfg.label}</span>
                    </div>
                    <div className="flex-1 bg-secondary/10 h-3 rounded-full overflow-hidden shadow-inner">
                      <div className={`bg-linear-to-r ${cfg.color} h-full rounded-full transition-all duration-1000 ease-out`} style={{ width: `${perc}%` }}></div>
                    </div>
                    <span className="w-8 text-right font-black text-primary text-sm shrink-0">{count}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-secondary/5 rounded-2xl">
              <p className="text-text-light font-bold text-sm">Sin datos de tratamientos aún.</p>
            </div>
          )}

          {/* Detalle de motivos no clasificados */}
          {detalleList.length > 0 && (
            <div className="mt-6 pt-5 border-t border-secondary/10">
              <p className="text-[9px] font-black text-text-light/50 uppercase tracking-[0.2em] mb-3">Otros motivos literales del sistema</p>
              <div className="flex flex-wrap gap-2">
                {detalleList.map(([motivo, count]) => (
                  <span key={motivo} className="text-[9px] font-bold text-text-light bg-secondary/5 border border-secondary/10 px-2.5 py-1 rounded-full">
                    {motivo} <span className="font-black text-primary">({count})</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Análisis Asistencia vs Deserción */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-secondary/10 hover:shadow-lg transition-all flex flex-col md:flex-row items-center gap-10">
          <div className="relative w-44 h-44 shrink-0">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
              <circle cx="18" cy="18" r="15.915" fill="none" stroke="#fee2e2" strokeWidth="4.5"></circle>
              <circle
                cx="18" cy="18" r="15.915" fill="none" stroke="#10b981" strokeWidth="4.5"
                strokeDasharray={`${tasaAsistencia} ${100 - tasaAsistencia}`}
                strokeLinecap="round"
              ></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-primary tracking-tighter">{tasaAsistencia}%</span>
              <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Éxito</span>
            </div>
          </div>
          <div className="flex-1 w-full">
            <h2 className="text-lg font-black text-primary mb-1">Asistencia vs Deserción</h2>
            <p className="text-[10px] font-bold text-text-light uppercase tracking-widest mb-5">Adherencia de pacientes</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-green-50/60 p-4 rounded-2xl border border-green-100">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] font-black text-green-600 uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span> Efectivas
                  </span>
                  <span className="text-2xl font-black text-green-700">{totalEfectivos}</span>
                </div>
                <p className="text-[10px] text-green-600/70 font-bold">Confirmados + Atendidos</p>
              </div>
              <div className="bg-red-50/60 p-4 rounded-2xl border border-red-100">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] font-black text-red-600 uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span> Cancelados
                  </span>
                  <span className="text-2xl font-black text-red-700">{turnosCancelados}</span>
                </div>
                <p className="text-[10px] text-red-600/70 font-bold">Cancelados o eliminados</p>
              </div>
              <div className="sm:col-span-2 p-4 bg-background rounded-2xl border border-secondary/10 flex justify-between items-center">
                <div>
                  <p className="text-xs font-black text-primary">Pendientes de confirmar</p>
                  <p className="text-[10px] text-text-light font-bold">Aguardando acción administrativa</p>
                </div>
                <span className="text-2xl font-black text-amber-500">{turnosPendientes}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Volumen Mensual */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-secondary/10 hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-blue-500/10 rounded-2xl flex items-center justify-center">
                <FaChartLine className="text-xl text-blue-500" />
              </div>
              <div>
                <h2 className="text-lg font-black text-primary">Volumen Mensual</h2>
                <p className="text-[10px] font-bold text-text-light uppercase tracking-widest">{dataMeses.length} meses con actividad</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black text-primary">{turnosTotales}</p>
              <p className="text-[9px] font-bold text-text-light uppercase tracking-widest">Total</p>
            </div>
          </div>

          {dataMeses.length > 0 ? (
            <div className="flex items-end gap-2 h-52 mt-8">
              {dataMeses.slice(-10).map((data, idx) => {
                const heightPerc = (data.count / maxMes) * 100;
                return (
                  <div key={data.fullLabel} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                    <div className="absolute bottom-[105%] opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-white text-[10px] font-black px-2.5 py-1.5 rounded-xl shadow-xl pointer-events-none whitespace-nowrap">
                      {data.count} turno{data.count !== 1 ? 's' : ''}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-primary"></div>
                    </div>
                    <div
                      className="w-full bg-linear-to-t from-accent-orange to-accent-orange/40 hover:from-orange-500 hover:to-orange-300 rounded-t-xl transition-all duration-700 ease-out min-h-[4px]"
                      style={{ height: `${heightPerc}%`, transitionDelay: `${idx * 60}ms` }}
                    ></div>
                    <span className="text-[9px] font-black text-text-light/50 mt-2 uppercase truncate w-full text-center">{data.label}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-secondary/5 rounded-2xl">
              <p className="text-text-light font-bold text-sm">Sin datos mensuales aún.</p>
            </div>
          )}
        </div>

      </div>

      {/* ════════════ DATOS DETALLADOS: PACIENTES Y TURNOS ════════════ */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Pacientes Registrados */}
        <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-secondary/10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-blue-500/10 rounded-2xl flex items-center justify-center">
                <FaUsers className="text-xl text-blue-500" />
              </div>
              <div>
                <h2 className="text-lg font-black text-primary">Directorio de Pacientes</h2>
                <p className="text-[10px] font-bold text-text-light uppercase tracking-widest">{listaUsuarios.length} usuarios registrados en la app</p>
              </div>
            </div>
            <span className="text-xs font-black text-text-light bg-secondary/10 px-3 py-1 rounded-lg">A - Z</span>
          </div>
          
          <div className="max-h-[500px] overflow-y-auto custom-scrollbar pr-2 space-y-3">
            {listaUsuarios.length > 0 ? listaUsuarios.map(u => (
              <div key={u._id} className="p-4 rounded-2xl bg-background border border-secondary/10 flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-[10px] font-black text-primary shrink-0 uppercase">
                  {u.nombre?.charAt(0)}{u.apellido?.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-primary truncate">{u.nombre} {u.apellido}</p>
                  <p className="text-[10px] text-text-light font-bold truncate">
                    {u.email} {u.telefono ? `· ${u.telefono}` : ''}
                  </p>
                </div>
              </div>
            )) : (
               <div className="flex flex-col items-center justify-center py-12 text-text-light/50">
                 <FaUsers className="text-4xl mb-3" />
                 <p className="font-bold text-sm">No hay usuarios registrados</p>
               </div>
            )}
          </div>
        </div>

        {/* Turnos Confirmados y Cancelados */}
        <div className="flex flex-col gap-6">
          
          {/* Confirmados */}
          <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-green-500/20 flex-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-11 h-11 bg-green-500/10 rounded-2xl flex items-center justify-center">
                <FaCalendarCheck className="text-xl text-green-500" />
              </div>
              <div>
                <h2 className="text-lg font-black text-green-700">Citas Confirmadas</h2>
                <p className="text-[10px] font-bold text-green-600/70 uppercase tracking-widest">{listaTurnosConfirmados.length} pacientes asistieron o asistirán</p>
              </div>
            </div>
            <div className="max-h-[200px] overflow-y-auto custom-scrollbar pr-2 space-y-3">
              {listaTurnosConfirmados.length > 0 ? listaTurnosConfirmados.map(t => (
                <div key={t._id} className="p-3.5 rounded-2xl bg-green-50/50 border border-green-100 flex flex-col gap-1.5 text-xs">
                  <div className="flex justify-between items-center">
                    <p className="font-black text-green-800 uppercase truncate">{t.nombrePaciente} {t.apellidoPaciente}</p>
                    <span className="text-[9px] font-black text-green-600 bg-green-100 px-2 py-0.5 rounded-md shrink-0">{t.fecha}</span>
                  </div>
                  <div className="flex items-center gap-4 text-green-700/80 font-bold text-[10px] uppercase tracking-wider">
                    <span>⏰ {t.hora}hs</span>
                    <span className="truncate">👨‍⚕️ {t.profesional}</span>
                  </div>
                  <p className="font-bold text-green-600/80 text-[11px] truncate">🦷 {t.motivo}</p>
                </div>
              )) : (
                 <p className="text-green-600/50 font-bold text-sm text-center py-4">Sin confirmaciones</p>
              )}
            </div>
          </div>

          {/* Cancelados */}
          <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-red-500/20 flex-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-11 h-11 bg-red-500/10 rounded-2xl flex items-center justify-center">
                <FaUserTimes className="text-xl text-red-500" />
              </div>
              <div>
                <h2 className="text-lg font-black text-red-700">Citas Canceladas</h2>
                <p className="text-[10px] font-bold text-red-600/70 uppercase tracking-widest">{listaTurnosCancelados.length} pacientes no asistieron</p>
              </div>
            </div>
            <div className="max-h-[200px] overflow-y-auto custom-scrollbar pr-2 space-y-3">
              {listaTurnosCancelados.length > 0 ? listaTurnosCancelados.map(t => (
                <div key={t._id} className="p-3.5 rounded-2xl bg-red-50/50 border border-red-100 flex flex-col gap-1.5 text-xs">
                  <div className="flex justify-between items-center">
                    <p className="font-black text-red-800 uppercase truncate">{t.nombrePaciente} {t.apellidoPaciente}</p>
                    <span className="text-[9px] font-black text-red-600 bg-red-100 px-2 py-0.5 rounded-md shrink-0">{t.fecha}</span>
                  </div>
                  <div className="flex items-center gap-4 text-red-700/80 font-bold text-[10px] uppercase tracking-wider">
                    <span>⏰ {t.hora}hs</span>
                    <span className="truncate">👨‍⚕️ {t.profesional}</span>
                  </div>
                  <p className="font-bold text-red-600/80 text-[11px] truncate">🦷 {t.motivo}</p>
                </div>
              )) : (
                 <p className="text-red-600/50 font-bold text-sm text-center py-4">Sin cancelaciones</p>
              )}
            </div>
          </div>

        </div>
      </div>

    </LayoutAdmin>
  );
};

export default AdminEstadisticas;
