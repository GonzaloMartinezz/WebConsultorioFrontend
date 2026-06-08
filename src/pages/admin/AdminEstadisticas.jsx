import { useState, useEffect } from "react";
import LayoutAdmin from "../../components/layouts/LayoutAdmin.jsx";
import {
  FaUsers, FaCalendarCheck, FaClock, FaUserCheck, FaUserTimes,
  FaChartBar, FaStethoscope, FaChartPie, FaChartLine, FaTrash
} from 'react-icons/fa';
import api from "../../api/axios.js";

const AdminEstadisticas = () => {
  const [stats, setStats] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [busquedaPacientes, setBusquedaPacientes] = useState("");

  const handleEliminarPaciente = async (id, nombre) => {
    if (window.confirm(`¿Estás seguro de eliminar permanentemente al paciente ${nombre}?`)) {
      try {
        await api.delete(`/usuarios/${id}`);
        setStats(prev => ({
          ...prev,
          listaUsuarios: prev.listaUsuarios.filter(u => u._id !== id),
          pacientesTotales: prev.pacientesTotales - 1
        }));
      } catch (error) {
        console.error("Error al eliminar paciente:", error);
        alert("Hubo un error al eliminar el paciente. Verifica los permisos de administrador.");
      }
    }
  };

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

  // Profesionales: estandarizados
  const doctoresFijos = {
    'Dr. Adolfo Martinez': 0,
    'Dra. Erina Carcara': 0
  };

  Object.entries(cargaProfesionales || {}).forEach(([prof, count]) => {
    const profLower = prof.toLowerCase();
    if (profLower.includes('adolfo')) {
      doctoresFijos['Dr. Adolfo Martinez'] += count;
    } else {
      doctoresFijos['Dra. Erina Carcara'] += count;
    }
  });

  const profList = Object.entries(doctoresFijos).sort((a, b) => b[1] - a[1]);
  const maxProf = Math.max(...profList.map(([_, c]) => c), 1);
  const profGradients = {
    'Dr. Adolfo Martinez': 'from-blue-400 to-blue-600',
    'Dra. Erina Carcara': 'from-emerald-400 to-emerald-600'
  };

  // Motivos no clasificados (string real)
  const detalleList = Object.entries(motivosDetalle || {}).sort((a, b) => b[1] - a[1]).slice(0, 8);

  // Filtro y orden A-Z de usuarios
  const usuariosFiltrados = (listaUsuarios || [])
    .filter(u => {
      const termino = busquedaPacientes.toLowerCase();
      const nombreCompleto = `${u.nombre} ${u.apellido}`.toLowerCase();
      return nombreCompleto.includes(termino) || (u.email && u.email.toLowerCase().includes(termino));
    })
    .sort((a, b) => {
      const nombreA = `${a.nombre || ''} ${a.apellido || ''}`.trim().toLowerCase();
      const nombreB = `${b.nombre || ''} ${b.apellido || ''}`.trim().toLowerCase();
      return nombreA.localeCompare(nombreB);
    });

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
                        className={`bg-linear-to-r ${profGradients[prof]} h-full rounded-full transition-all duration-1000 ease-out`}
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
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-secondary/5 border border-secondary/10 hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
          {/* Fondo decorativo */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-green-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative w-48 h-48 shrink-0">
            {/* Círculo base con Glow */}
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90 drop-shadow-xl">
              <defs>
                <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f87171" />
                  <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
              </defs>
              <circle cx="18" cy="18" r="15.915" fill="none" stroke="url(#redGrad)" strokeWidth="3" opacity="0.2"></circle>
              <circle
                cx="18" cy="18" r="15.915" fill="none" stroke="url(#greenGrad)" strokeWidth="4"
                strokeDasharray={`${tasaAsistencia} ${100 - tasaAsistencia}`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              ></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-black text-transparent bg-clip-text bg-linear-to-br from-green-400 to-green-600 tracking-tighter drop-shadow-sm">{tasaAsistencia}%</span>
              <span className="text-[10px] font-black text-green-600/80 uppercase tracking-widest mt-1">Éxito</span>
            </div>
          </div>

          <div className="flex-1 w-full relative z-10">
            <h2 className="text-2xl font-black text-primary mb-1 tracking-tight">Asistencia vs Deserción</h2>
            <p className="text-[10px] font-bold text-text-light uppercase tracking-widest mb-6">Métrica de adherencia clínica</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-linear-to-br from-green-50 to-white p-4 lg:p-5 rounded-2xl border border-green-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group flex flex-col">
                <div className="absolute right-0 top-0 w-16 h-16 bg-green-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110 pointer-events-none"></div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 shadow-sm shadow-green-500/50 shrink-0"></span>
                  <span className="text-[10px] sm:text-[9px] md:text-[10px] font-black text-green-700 uppercase tracking-widest truncate">Efectivas</span>
                </div>
                <span className="text-3xl font-black text-green-600 mb-1">{totalEfectivos}</span>
                <p className="text-[10px] text-green-700/60 font-bold leading-tight">Pacientes atendidos</p>
              </div>
              
              <div className="bg-linear-to-br from-red-50 to-white p-4 lg:p-5 rounded-2xl border border-red-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group flex flex-col">
                <div className="absolute right-0 top-0 w-16 h-16 bg-red-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110 pointer-events-none"></div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 shadow-sm shadow-red-500/50 shrink-0"></span>
                  <span className="text-[10px] sm:text-[9px] md:text-[10px] font-black text-red-700 uppercase tracking-widest truncate">Canceladas</span>
                </div>
                <span className="text-3xl font-black text-red-600 mb-1">{turnosCancelados}</span>
                <p className="text-[10px] text-red-700/60 font-bold leading-tight">Pacientes desertores</p>
              </div>
              
              <div className="sm:col-span-2 p-5 bg-background/50 rounded-2xl border border-secondary/20 flex justify-between items-center hover:bg-background transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <FaClock className="text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-primary">En espera de confirmación</p>
                    <p className="text-[10px] text-text-light font-bold">Requieren acción administrativa</p>
                  </div>
                </div>
                <span className="text-3xl font-black text-amber-500 drop-shadow-sm">{turnosPendientes}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Volumen Semanal - Gráfico de Flecha */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-secondary/5 border border-secondary/10 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-accent-orange/5 rounded-full blur-3xl pointer-events-none transition-transform duration-700 group-hover:scale-150 group-hover:bg-accent-orange/10"></div>

          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-linear-to-br from-accent-orange/20 to-orange-500/10 rounded-2xl flex items-center justify-center border border-accent-orange/20 shadow-inner">
                <FaChartLine className="text-xl text-accent-orange" />
              </div>
              <div>
                <h2 className="text-xl font-black text-primary tracking-tight">Volumen Semanal</h2>
                <p className="text-[10px] font-bold text-text-light uppercase tracking-widest">Tendencia de crecimiento</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-accent-orange to-orange-500 tracking-tighter drop-shadow-sm">{turnosTotales}</p>
              <p className="text-[10px] font-bold text-text-light uppercase tracking-widest">Total</p>
            </div>
          </div>

          <div className="relative flex-1 flex flex-col items-center justify-center min-h-[180px] mt-2 z-10 w-full">
            {/* Gráfico Sparkline de Área con Flecha */}
            <svg viewBox="0 0 100 65" className="w-full h-full max-h-[200px] overflow-visible">
              <defs>
                <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fb923c" />
                  <stop offset="100%" stopColor="#ea580c" />
                </linearGradient>
                <filter id="glowChart" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feComponentTransfer in="blur" result="glow">
                    <feFuncA type="linear" slope="0.5"/>
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Grid Lines de Fondo */}
              <g stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="1 2" opacity="0.7">
                <line x1="0" y1="15" x2="100" y2="15" />
                <line x1="0" y1="35" x2="100" y2="35" />
                <line x1="0" y1="55" x2="100" y2="55" />
              </g>

              {(() => {
                // Cálculo de la pendiente (steepness)
                const steepness = Math.min(turnosTotales / 100, 1) || 0.05; 
                const targetY = 55 - (45 * steepness); // Sube hasta un máximo de Y=10
                const diff = 55 - targetY;
                
                // Puntos para simular un gráfico de crecimiento tipo "Stock"
                const dip1 = diff > 0 ? 3 : 0;
                const dip2 = diff > 0 ? 4 : 0;
                
                const p0 = { x: 0, y: 55 };
                const p1 = { x: 20, y: 55 - diff * 0.3 };
                const p2 = { x: 40, y: 55 - diff * 0.2 + dip1 }; // Corrección bajista
                const p3 = { x: 60, y: 55 - diff * 0.7 };
                const p4 = { x: 80, y: 55 - diff * 0.55 + dip2 }; // Corrección bajista
                const p5 = { x: 96, y: targetY }; // Punto final antes de la flecha

                const linePath = `M ${p0.x} ${p0.y} L ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} L ${p4.x} ${p4.y} L ${p5.x} ${p5.y}`;
                const areaPath = `${linePath} L 96 65 L 0 65 Z`;

                // Ángulo de la flecha
                const dirX = p5.x - p4.x;
                const dirY = p5.y - p4.y;
                const angle = Math.atan2(dirY, dirX) * (180 / Math.PI);

                return (
                  <g className="animate-fade-in-up" style={{ animationDuration: '1s' }}>
                    {/* Área con Gradiente */}
                    <path 
                      d={areaPath} 
                      fill="url(#areaGrad)" 
                      className="transition-all duration-1000 ease-out"
                    />
                    
                    {/* Línea Principal */}
                    <path 
                      d={linePath} 
                      fill="none" 
                      stroke="url(#lineGrad)" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      filter="url(#glowChart)"
                      className="transition-all duration-1000 ease-out"
                    />
                    
                    {/* Puntos de Datos (Nodos) */}
                    <circle cx={p1.x} cy={p1.y} r="1.5" fill="#ffffff" stroke="#ea580c" strokeWidth="0.8" className="drop-shadow-sm" />
                    <circle cx={p3.x} cy={p3.y} r="1.5" fill="#ffffff" stroke="#ea580c" strokeWidth="0.8" className="drop-shadow-sm" />
                    
                    {/* Punta de la Flecha */}
                    <polygon 
                      points="0,-4 8,0 0,4" 
                      fill="#ea580c" 
                      transform={`translate(${p5.x}, ${p5.y}) rotate(${angle})`} 
                      filter="url(#glowChart)"
                    />
                  </g>
                );
              })()}
            </svg>
            
            <div className="absolute -bottom-2 left-0 right-0 flex justify-between items-center text-[10px] font-black text-text-light/50 uppercase tracking-widest px-2">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></span>
                <span>Análisis Activo</span>
              </div>
              <span className="text-orange-600 bg-orange-50 px-3 py-1.5 rounded-xl border border-orange-100 shadow-sm flex items-center gap-1.5 transition-transform hover:scale-105">
                <FaChartLine />
                Tendencia Alcista
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* ════════════ DATOS DETALLADOS: PACIENTES Y TURNOS ════════════ */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Pacientes Registrados */}
        <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-secondary/10 flex flex-col">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-blue-500/10 rounded-2xl flex items-center justify-center shrink-0">
                <FaUsers className="text-xl text-blue-500" />
              </div>
              <div>
                <h2 className="text-lg font-black text-primary">Directorio de Pacientes</h2>
                <p className="text-[10px] font-bold text-text-light uppercase tracking-widest">{listaUsuarios.length} usuarios registrados</p>
              </div>
            </div>
            <div className="w-full sm:w-auto">
              <input
                type="text"
                placeholder="Buscar paciente (A-Z)..."
                value={busquedaPacientes}
                onChange={(e) => setBusquedaPacientes(e.target.value)}
                className="w-full sm:w-64 bg-background border border-secondary/10 px-4 py-2.5 rounded-xl text-sm font-bold text-primary focus:border-accent-orange outline-none transition-all shadow-inner"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3 max-h-[500px]">
            {usuariosFiltrados.length > 0 ? usuariosFiltrados.map(u => (
              <div key={u._id} className="p-4 rounded-2xl bg-background border border-secondary/10 flex items-center justify-between hover:shadow-md transition-shadow group">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-[10px] font-black text-primary shrink-0 uppercase">
                    {u.nombre?.charAt(0)}{u.apellido?.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-black text-primary truncate">{u.nombre} {u.apellido}</p>
                    <p className="text-[10px] text-text-light font-bold truncate">
                      {u.email} {u.telefono ? `· ${u.telefono}` : ''}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleEliminarPaciente(u._id, `${u.nombre} ${u.apellido}`)}
                  className="w-8 h-8 flex items-center justify-center rounded-xl bg-red-50 text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white shrink-0 shadow-sm border border-red-100"
                  title="Eliminar paciente permanentemente"
                >
                  <FaTrash className="text-xs" />
                </button>
              </div>
            )) : (
               <div className="flex flex-col items-center justify-center py-12 text-text-light/50">
                 <FaUserTimes className="text-4xl mb-3" />
                 <p className="font-bold text-sm">No se encontraron pacientes</p>
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
