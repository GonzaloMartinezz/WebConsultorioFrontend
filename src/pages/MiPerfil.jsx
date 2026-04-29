import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios.js';
import { FaUser, FaCalendarCheck, FaClock, FaSignOutAlt, FaTooth, FaCalendarAlt, FaShieldAlt, FaLightbulb, FaWallet } from 'react-icons/fa';

const MiPerfil = () => {
  const [misTurnos, setMisTurnos] = useState([]);
  const [turnosHoy, setTurnosHoy] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('perfilUsuario'));
  const isAdmin = usuario?.rol?.toLowerCase() === 'admin' || usuario?.role?.toLowerCase() === 'admin';

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const fechaHoy = new Date().toISOString().split('T')[0];

        if (isAdmin) {
          // Si es ADMIN: Cargar TODOS los turnos (ruta protegida)
          const res = await api.get('/turnos');
          const hoy = res.data.filter(t => t.fecha === fechaHoy && t.estado !== 'Cancelado')
            .sort((a, b) => (a.hora || '').localeCompare(b.hora || ''));
          setTurnosHoy(hoy);
          setMisTurnos(res.data.filter(t => t.estado === 'Confirmado' && t.fecha >= fechaHoy));
        } else {
          // Si es PACIENTE: Cargar sus turnos usando la ruta pública/específica para no recibir 403
          const nombreAUsar = usuario?.nombre || 'Desconocido';
          const apellidoAUsar = usuario?.apellido || 'Desconocido';
          const res = await api.get(`/turnos/paciente/${nombreAUsar}/${apellidoAUsar}`);

          // Filtramos para asegurar de mostrar solo los no cancelados y ordenados por fecha
          const misTurnosFiltrados = res.data
            .filter(t => t.estado !== 'Cancelado')
            .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

          setMisTurnos(misTurnosFiltrados);
        }
      } catch (error) {
        console.error("Error al cargar turnos", error);
      } finally {
        setCargando(false);
      }
    };

    if (usuario) {
      fetchTurnos();
    }
  }, [usuario, isAdmin]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('perfilUsuario');
    navigate('/login');
    window.location.reload();
  };

  const proximoTurno = !isAdmin && misTurnos.length > 0 ? misTurnos[0] : null;

  return (
    <div className="min-h-screen bg-[#FAF9F6] font-sans flex flex-col relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[600px] h-[600px] bg-accent-orange/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] -right-[10%] w-[600px] h-[600px] bg-[#4A3B32]/5 rounded-full blur-[120px]"></div>
      </div>

      <main className="max-w-[1200px] mx-auto pt-32 pb-16 px-4 md:px-8 w-full relative z-10 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* COLUMNA IZQUIERDA: PERFIL Y ESTADÍSTICAS (4 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white/80 backdrop-blur-2xl rounded-[3rem] p-10 border border-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.03)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-orange/5 rounded-full blur-3xl group-hover:bg-accent-orange/10 transition-all duration-700"></div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full bg-linear-to-br from-accent-orange to-orange-500 flex items-center justify-center text-white text-3xl font-black shadow-[0_15px_35px_-5px_rgba(255,120,0,0.4)]">
                    {usuario?.nombre?.charAt(0)}{usuario?.apellido?.charAt(0)}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border border-[#EADDCA]/30">
                    <FaShieldAlt className="text-accent-orange text-xs" />
                  </div>
                </div>

                <div className="space-y-1 mb-8">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-orange/80">
                    {isAdmin ? 'Panel de Control' : 'Bienvenido de nuevo'}
                  </span>
                  <h1 className="text-3xl font-black text-primary uppercase tracking-tighter">
                    {usuario?.nombre} {usuario?.apellido}
                  </h1>
                  <p className="text-text-light/60 text-[11px] font-bold uppercase tracking-widest">{usuario?.email}</p>
                </div>

                <div className="w-full h-px bg-linear-to-r from-transparent via-[#EADDCA]/30 to-transparent mb-8"></div>

                <div className="grid grid-cols-2 gap-4 w-full mb-8">
                  <div className="bg-[#FAF9F6] p-4 rounded-3xl border border-[#EADDCA]/20">
                    <p className="text-[9px] font-black text-text-light/40 uppercase tracking-widest mb-1">Citas Activas</p>
                    <p className="text-xl font-black text-primary">{misTurnos.length}</p>
                  </div>
                  <div className="bg-[#FAF9F6] p-4 rounded-3xl border border-[#EADDCA]/20">
                    <p className="text-[9px] font-black text-text-light/40 uppercase tracking-widest mb-1">Última Visita</p>
                    <p className="text-xl font-black text-primary">Abr '26</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 w-full">
                  {isAdmin && (
                    <Link to="/admin" className="w-full bg-accent-orange text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-3">
                      <FaShieldAlt size={14} /> Volver al Panel Admin
                    </Link>
                  )}
                  <Link to="/turnos" className="w-full bg-primary text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all flex items-center justify-center gap-3">
                    <FaCalendarAlt size={14} className="text-accent-orange" /> {isAdmin ? 'Agendar Paciente' : 'Solicitar Turno'}
                  </Link>
                  <button onClick={handleLogout} className="w-full bg-white border border-[#EADDCA]/50 text-text-light py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#FAF9F6] transition-all flex items-center justify-center gap-3">
                    <FaSignOutAlt size={14} /> Cerrar Sesión
                  </button>
                </div>
              </div>
            </div>

            {isAdmin && (
              <div className="grid grid-cols-2 gap-4">
                <Link to="/admin/pacientes" className="bg-white/80 backdrop-blur-xl p-6 rounded-4xl border border-white shadow-sm hover:shadow-md transition-all group">
                  <div className="w-10 h-10 bg-accent-orange/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FaShieldAlt className="text-accent-orange" />
                  </div>
                  <h3 className="font-black text-primary text-[10px] uppercase tracking-widest mb-1">Pacientes</h3>
                  <p className="text-[8px] font-bold text-text-light/50 uppercase tracking-widest">Base de datos</p>
                </Link>
                <Link to="/admin/estadisticas" className="bg-white/80 backdrop-blur-xl p-6 rounded-4xl border border-white shadow-sm hover:shadow-md transition-all group">
                  <div className="w-10 h-10 bg-accent-orange/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FaLightbulb className="text-accent-orange" />
                  </div>
                  <h3 className="font-black text-primary text-[10px] uppercase tracking-widest mb-1">Estadísticas</h3>
                  <p className="text-[8px] font-bold text-text-light/50 uppercase tracking-widest">Rendimiento</p>
                </Link>
              </div>
            )}

            {!isAdmin && (
              <div className="bg-linear-to-br from-primary to-[#1a120d] p-8 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent-orange/10 rounded-full blur-2xl"></div>
                <div className="relative z-10 flex items-center gap-6">
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10">
                    <FaWallet className="text-accent-orange text-xl" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-accent-orange uppercase tracking-[0.2em] mb-1">Consejo Clínico</p>
                    <p className="text-xs font-bold leading-relaxed opacity-80 italic">"Una sonrisa sana es reflejo de bienestar. Recordá tu limpieza semestral."</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* COLUMNA DERECHA: AGENDA Y TURNOS (8 cols) */}
          <div className="lg:col-span-7 space-y-8">

            {/* PRÓXIMA CITA CARD HIGHLIGHT */}
            <div className="bg-white rounded-[3rem] border border-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.03)] overflow-hidden">
              <div className="bg-primary px-8 py-4 flex justify-between items-center">
                <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em]">
                  {isAdmin ? 'Agenda Prioritaria' : 'Tu Próximo Turno'}
                </span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent-orange animate-pulse"></span>
                  <span className="text-[8px] font-black text-accent-orange uppercase tracking-widest">Activo 2026</span>
                </div>
              </div>

              <div className="p-10">
                {cargando ? (
                  <div className="space-y-4 animate-pulse">
                    <div className="h-12 bg-[#FAF9F6] rounded-2xl w-3/4"></div>
                    <div className="h-20 bg-[#FAF9F6] rounded-2xl"></div>
                  </div>
                ) : (isAdmin ? turnosHoy.length > 0 : proximoTurno) ? (
                  <div className="space-y-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                      <div>
                        <h2 className="text-4xl font-black text-primary uppercase tracking-tighter leading-none mb-3">
                          {isAdmin
                            ? `${turnosHoy.length} Pacientes`
                            : new Date(proximoTurno.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })
                          }
                        </h2>
                        {!isAdmin && (
                          <div className="flex items-center gap-3">
                            <FaClock className="text-accent-orange" size={14} />
                            <span className="text-lg font-black text-primary/60">{proximoTurno.hora} hs</span>
                          </div>
                        )}
                        {isAdmin && (
                          <div className="flex items-center gap-3">
                            <span className="text-[11px] font-black text-accent-orange uppercase tracking-widest">Agenda para el día de hoy</span>
                          </div>
                        )}
                      </div>

                      <div className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border flex items-center gap-3 shadow-sm
                        ${(isAdmin ? turnosHoy[0]?.estado : proximoTurno.estado) === 'Confirmado' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-orange-50 text-accent-orange border-orange-100'}`}>
                        <div className={`w-2 h-2 rounded-full ${(isAdmin ? turnosHoy[0]?.estado : proximoTurno.estado) === 'Confirmado' ? 'bg-green-500' : 'bg-accent-orange'}`}></div>
                        {(isAdmin ? 'Panel Activo' : proximoTurno.estado || 'En Revisión')}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(isAdmin ? turnosHoy.slice(0, 2) : [proximoTurno]).map((t, idx) => (
                        <div key={idx} className="bg-[#FAF9F6] p-6 rounded-3xl border border-[#EADDCA]/20 flex items-center gap-5 group hover:border-accent-orange/30 transition-all">
                          <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">🦷</div>
                          <div>
                            <p className="text-[11px] font-black text-primary uppercase tracking-tight">{isAdmin ? `${t.nombrePaciente} ${t.apellidoPaciente}` : t.profesional}</p>
                            <p className="text-[9px] text-text-light/60 font-bold uppercase tracking-widest">{t.motivo}</p>
                            {isAdmin && <p className="text-[10px] font-black text-accent-orange mt-1">{t.hora} HS</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10 space-y-6">
                    <div className="w-20 h-20 bg-[#FAF9F6] rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaCalendarAlt className="text-text-light/20" size={30} />
                    </div>
                    <p className="text-xs font-black text-text-light/40 uppercase tracking-[0.2em]">No hay citas programadas para hoy</p>
                    {!isAdmin && (
                      <Link to="/turnos" className="inline-block bg-accent-orange text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-orange-500/20">Agendar primera visita</Link>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* AGENDA COMPLETA / HISTORIAL */}
            {(isAdmin ? turnosHoy.length > 2 : misTurnos.length > 1) && (
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-[11px] font-black text-primary uppercase tracking-[0.3em] flex items-center gap-3">
                    <span className="w-1.5 h-4 bg-accent-orange rounded-full"></span>
                    {isAdmin ? 'Resto de la Agenda' : 'Historial de Visitas'}
                  </h3>
                  <span className="text-[9px] font-bold text-text-light/40 uppercase tracking-widest">
                    {isAdmin ? `${turnosHoy.length - 2} pendientes` : `${misTurnos.length - 1} registros`}
                  </span>
                </div>

                <div className="space-y-3">
                  {(isAdmin ? turnosHoy.slice(2) : misTurnos.slice(1)).map((turno, idx) => (
                    <div key={idx} className="bg-white/60 hover:bg-white p-5 rounded-4xl border border-[#EADDCA]/10 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-[#FAF9F6] rounded-2xl flex flex-col items-center justify-center border border-[#EADDCA]/20 group-hover:border-accent-orange/30 transition-colors">
                          <span className="text-[8px] font-black text-accent-orange uppercase leading-none mb-0.5">
                            {isAdmin ? turno.hora.split(':')[0] : new Date(turno.fecha).toLocaleDateString('es-ES', { month: 'short' }).replace('.', '').toUpperCase()}
                          </span>
                          <span className="text-base font-black text-primary leading-none">
                            {isAdmin ? turno.hora.split(':')[1] : new Date(turno.fecha).getDate()}
                          </span>
                        </div>
                        <div>
                          <p className="text-[11px] font-black text-primary uppercase tracking-tight">
                            {isAdmin ? `${turno.nombrePaciente} ${turno.apellidoPaciente}` : turno.profesional}
                          </p>
                          <p className="text-[9px] text-text-light/50 font-bold uppercase tracking-widest">
                            {isAdmin ? turno.profesional : `${turno.hora} hs • ${turno.motivo}`}
                          </p>
                        </div>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${turno.estado === 'Confirmado' ? 'bg-green-500' : 'bg-accent-orange'}`}></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="py-8 text-center bg-white border-t border-[#EADDCA]/30">
        <p className="text-[8px] font-black text-text-light/30 uppercase tracking-[0.6em]">
          Carcara & Martínez • Centro Odontológico Boutique • 2026
        </p>
      </footer>
    </div>
  );
};

export default MiPerfil;
