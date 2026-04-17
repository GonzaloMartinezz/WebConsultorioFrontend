import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios.js';
import { FaUser, FaCalendarCheck, FaClock, FaSignOutAlt, FaTooth, FaCalendarAlt, FaShieldAlt, FaLightbulb, FaWallet } from 'react-icons/fa';

const MiPerfil = () => {
  const [misTurnos, setMisTurnos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('perfilUsuario'));

  useEffect(() => {
    const fetchMisTurnos = async () => {
      try {
        const res = await api.get('/turnos');
        const misTurnosFiltrados = res.data.filter(t => 
          (t.nombrePaciente?.trim().toLowerCase() === usuario?.nombre?.trim().toLowerCase() ||
           t.email?.trim().toLowerCase() === usuario?.email?.trim().toLowerCase()) &&
          t.estado !== 'Cancelado'
        ).sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        
        setMisTurnos(misTurnosFiltrados);
      } catch (error) {
        console.error("Error al cargar turnos", error);
      } finally {
        setCargando(false);
      }
    };

    if (usuario) {
      fetchMisTurnos();
    }
  }, [usuario]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('perfilUsuario');
    navigate('/login');
    window.location.reload();
  };

  const proximoTurno = misTurnos.length > 0 ? misTurnos[0] : null;

  return (
    <div className="min-h-screen bg-[#FFFBF7] font-sans flex flex-col overflow-hidden">
      <main className="max-w-6xl mx-auto pt-20 pb-4 px-4 sm:px-6 lg:px-8 flex-1 flex flex-col gap-4 overflow-hidden w-full">
        
        {/* Lado Izquierdo: Bienvenida y Accesos */}
        <div className="flex-1 flex flex-col gap-6 overflow-hidden">
          
          {/* Hero - Más compacto */}
          <div className="bg-[#4A3B32] rounded-[2rem] p-6 md:p-8 relative overflow-hidden text-white shadow-xl border-b-4 border-accent-orange shrink-0">
            <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2070&auto=format&fit=crop')] bg-center bg-cover pointer-events-none"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-accent-orange rounded-xl flex items-center justify-center text-white text-lg font-black shadow-lg">
                  {usuario?.nombre?.charAt(0)}
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-accent-orange/80">Portal del Paciente</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">Hola, {usuario?.nombre} {usuario?.apellido}</h1>
              <p className="text-white/70 max-w-md mb-6 text-sm font-medium leading-relaxed">Tu bienestar dental en un solo lugar.</p>
              <div className="flex flex-wrap gap-3">
                <Link to="/turnos" className="bg-accent-orange text-white px-6 py-3 rounded-xl font-black text-sm shadow-lg hover:scale-105 transition-all flex items-center gap-2">
                  <FaCalendarAlt /> Solicitar Turno
                </Link>
                <button onClick={handleLogout} className="bg-white/5 border border-white/10 text-white/80 px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/10 hover:text-white transition-all">
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>

          {/* Gestión Rápida (Citas, Historia, Ayuda) */}
          <div className="grid grid-cols-3 gap-4 shrink-0">
            <div className="bg-white p-4 rounded-3xl shadow-sm border border-black/5 flex flex-col items-center text-center group hover:border-accent-orange/30 transition-all">
              <div className="w-10 h-10 bg-orange-50 text-accent-orange rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <FaCalendarCheck className="text-xl" />
              </div>
              <h3 className="font-black text-primary text-[10px] uppercase tracking-tighter leading-tight">Mis Citas</h3>
              <Link to="/mi-perfil" className="text-accent-orange text-[8px] font-black uppercase mt-1 px-3 py-1 bg-accent-orange/5 rounded-full">Ver &rarr;</Link>
            </div>
            <div className="bg-white p-4 rounded-3xl shadow-sm border border-black/5 flex flex-col items-center text-center group hover:border-accent-orange/30 transition-all">
              <div className="w-10 h-10 bg-orange-50 text-accent-orange rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <FaShieldAlt className="text-xl" />
              </div>
              <h3 className="font-black text-primary text-[10px] uppercase tracking-tighter leading-tight">Historia Clinica</h3>
              <span className="text-text-light/50 text-[7px] font-bold uppercase mt-1 italic">Próximamente</span>
            </div>
            <div className="bg-white p-4 rounded-3xl shadow-sm border border-black/5 flex flex-col items-center text-center group hover:border-accent-orange/30 transition-all">
              <div className="w-10 h-10 bg-orange-50 text-accent-orange rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <FaLightbulb className="text-xl" />
              </div>
              <h3 className="font-black text-primary text-[10px] uppercase tracking-tighter leading-tight">Soporte Ayuda</h3>
              <a href="https://wa.me/5493816242482" target="_blank" rel="noreferrer" className="text-accent-orange text-[8px] font-black uppercase mt-1 px-3 py-1 bg-accent-orange/5 rounded-full">Chat &rarr;</a>
            </div>
          </div>

          {/* Tu Próxima Visita - AHORA ABAJO DE LAS CARDS */}
          <div className="shrink-0">
            <div className="bg-white p-6 rounded-[2.5rem] border border-black/5 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 group hover:shadow-2xl transition-all">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-accent-orange"></div>
              
              <div className="flex flex-col items-center md:items-start">
                 <span className="text-[9px] font-black tracking-[0.2em] uppercase text-text-light/40 mb-2">Tu Próxima Visita</span>
                 {cargando ? (
                    <div className="animate-pulse h-8 bg-gray-100 w-32 rounded-lg"></div>
                 ) : proximoTurno ? (
                    <h3 className="text-3xl font-black text-primary leading-none">
                      {new Date(proximoTurno.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
                      <span className="text-accent-orange ml-3">{proximoTurno.hora} hs</span>
                    </h3>
                 ) : (
                    <p className="text-xs font-bold text-text-light uppercase tracking-widest">Sin turnos agendados</p>
                 )}
              </div>

              {proximoTurno && (
                <div className="flex-1 flex flex-col md:flex-row items-center gap-6 justify-center">
                  <div className="bg-[#F8F5F2] px-6 py-4 rounded-2xl flex items-center gap-4 border border-secondary/10">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-xl">🦷</div>
                    <div className="text-left leading-tight">
                      <p className="text-[11px] font-black text-primary uppercase">{proximoTurno.profesional}</p>
                      <p className="text-[9px] text-text-light font-bold">{proximoTurno.motivo}</p>
                    </div>
                  </div>
                  
                  <div className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest border flex items-center gap-2 shadow-sm
                    ${proximoTurno.estado === 'Confirmado' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-orange-50 text-orange-600 border-orange-200 animate-pulse'}`}>
                    <span className={`w-2 h-2 rounded-full ${proximoTurno.estado === 'Confirmado' ? 'bg-green-500' : 'bg-orange-500'}`}></span>
                    {proximoTurno.estado || 'Analizando'}
                  </div>
                </div>
              )}

              {!proximoTurno && !cargando && (
                <Link to="/turnos" className="bg-primary text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all">
                  Agendar Cita Ahora
                </Link>
              )}
            </div>
          </div>

          {/* OTRAS CITAS - SCROLLABLE */}
          {misTurnos.length > 1 && (
            <div className="grow overflow-hidden flex flex-col min-h-0">
              <h3 className="text-[10px] font-black text-primary mb-3 uppercase tracking-widest flex items-center gap-2 px-1">
                <span className="w-1.5 h-3 bg-accent-orange/40 rounded-full"></span> Historial de Otras Citas
              </h3>
              <div className="overflow-y-auto custom-scrollbar pr-3 space-y-3 pb-6 grow">
                {misTurnos.slice(1).map(turno => (
                  <div key={turno._id} className="bg-white p-4 rounded-2xl border border-black/5 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 bg-[#F8F5F2] rounded-xl flex flex-col items-center justify-center border border-secondary/10 group-hover:bg-white transition-colors">
                        <span className="text-[8px] font-black uppercase text-accent-orange">{new Date(turno.fecha).toLocaleDateString('es-ES', { month: 'short' }).replace('.', '')}</span>
                        <span className="text-sm font-black text-primary leading-none">{new Date(turno.fecha).getDate()}</span>
                      </div>
                      <div>
                        <p className="text-[11px] font-black text-primary uppercase">{turno.profesional}</p>
                        <p className="text-[9px] text-text-light font-bold tracking-wider">{turno.hora} hs • {turno.motivo}</p>
                      </div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${turno.estado === 'Confirmado' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Banner Frase Salud */}
          {misTurnos.length <= 1 && (
             <div className="mt-auto bg-[#4A3B32] p-6 rounded-[2rem] text-white flex items-center justify-between shrink-0 mb-4">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                     <FaWallet className="text-accent-orange text-lg" />
                   </div>
                   <p className="text-[11px] font-bold leading-relaxed max-w-xs italic opacity-80">
                      "Recordá realizar una limpieza profesional cada 6 meses."
                   </p>
                </div>
                <div className="h-0.5 w-12 bg-accent-orange/50"></div>
             </div>
          )}
        </div>

      </main>
      
      <footer className="py-3 text-center text-text-light/20 text-[7px] font-black uppercase tracking-[0.4em] border-t border-black/[0.02]">
        Carcara & Martínez • Centro Odontológico • 2026
      </footer>
    </div>
  );
};

export default MiPerfil;
