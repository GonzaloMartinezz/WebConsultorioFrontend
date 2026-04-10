import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutAdmin from '../../components/layouts/LayoutAdmin'; 
import ModalNuevaCita from '../../components/common/ModalNuevaCita'; 
import api from '../../api/axios';
import { 
  FaCalendarPlus, FaCalendarCheck, FaClock, 
  FaUser, FaChevronLeft, FaChevronRight, FaCalendarDay 
} from 'react-icons/fa';

const AdminAgenda = () => {
  const [mostrarModalCita, setMostrarModalCita] = useState(false);
  const [turnos, setTurnos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [fechaActual, setFechaActual] = useState(new Date());
  
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchTurnos();
  }, []);

  const recargarAgenda = () => fetchTurnos();

  // Lógica de fechas
  const obtenerInicioSemana = (fecha) => {
    const d = new Date(fecha);
    const dia = d.getDay();
    const diff = d.getDate() - dia + (dia === 0 ? -6 : 1); 
    return new Date(d.setDate(diff));
  };

  const formatearFechaDB = (fecha) => {
    const d = new Date(fecha);
    let mes = '' + (d.getMonth() + 1);
    let dia = '' + d.getDate();
    return [d.getFullYear(), mes.length < 2 ? '0'+mes : mes, dia.length < 2 ? '0'+dia : dia].join('-');
  };

  const generarDiasSemana = () => {
    const inicio = obtenerInicioSemana(fechaActual);
    return Array.from({length: 6}, (_, i) => {
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
      nueva.setMonth(nueva.getUTCMonth() + dir);
      setFechaActual(nueva);
  };

  const esHoy = (fecha) => new Date().toDateString() === fecha.toDateString();

  // NAVEGACIÓN A HISTORIA CLÍNICA
  const irAHistoriaClinica = (turno) => {
    // Si el turno tiene pacienteId, lo pasamos por el estado para que la Historia Clínica lo atrape
    // Y también por URL si queremos (/admin/historia-clinica/:id)
    if (turno.pacienteId) {
        navigate(`/admin/historia-clinica/${turno.pacienteId}`, { 
            state: { 
                nombreBusqueda: turno.nombrePaciente 
            } 
        });
    } else {
        // Si no hay ID (turno manual sin perfil atado), buscamos por nombre
        navigate('/admin/historia-clinica', { 
            state: { 
                nombreBusqueda: turno.nombrePaciente 
            } 
        });
    }
  };

  return (
    <LayoutAdmin>
      <div className="max-w-[1600px] mx-auto flex flex-col h-[calc(100vh-100px)]">
        
        {/* HEADER COMPACTO */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4 bg-white p-4 rounded-2xl shadow-sm border border-secondary/20 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg"><FaCalendarCheck className="text-xl text-primary" /></div>
            <h1 className="text-xl font-black text-primary capitalize">{meses[fechaActual.getMonth()]} {fechaActual.getFullYear()}</h1>
          </div>
          
          <div className="flex items-center gap-2 bg-background/50 p-1.5 rounded-lg border border-secondary/30">
            <button onClick={() => moverMes(-1)} className="p-1.5 hover:bg-white rounded text-text-light hover:text-primary"><FaChevronLeft className="text-[10px]" /></button>
            <span className="text-[10px] font-bold text-text px-1">MES</span>
            <button onClick={() => moverMes(1)} className="p-1.5 hover:bg-white rounded text-text-light hover:text-primary"><FaChevronRight className="text-[10px]" /></button>
            <div className="w-px h-4 bg-secondary/30 mx-1"></div>
            <button onClick={() => moverSemana(-1)} className="p-1.5 bg-white hover:bg-primary hover:text-white rounded text-text shadow-sm border border-secondary/20"><FaChevronLeft className="text-xs" /></button>
            <button onClick={() => setFechaActual(new Date())} className="px-3 py-1 bg-white hover:bg-secondary/20 rounded text-primary font-bold text-xs shadow-sm border border-secondary/20 flex items-center gap-1"><FaCalendarDay /> Hoy</button>
            <button onClick={() => moverSemana(1)} className="p-1.5 bg-white hover:bg-primary hover:text-white rounded text-text shadow-sm border border-secondary/20"><FaChevronRight className="text-xs" /></button>
          </div>

          <button onClick={() => setMostrarModalCita(true)} className="bg-accent-orange text-white px-4 py-2 rounded-lg font-bold shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 text-sm uppercase tracking-widest">
            <FaCalendarPlus /> Añadir Turno
          </button>
        </header>

        {/* GRILLA (Más pequeña para que entre toda la info hasta la noche) */}
        <div className="flex-1 bg-white rounded-2xl shadow-md border border-secondary/20 overflow-hidden flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-6 border-b border-secondary/20 bg-background/30 shrink-0">
            {diasSemana.map((dia, index) => (
              <div key={index} className={`py-2 text-center border-r border-secondary/10 last:border-0 ${esHoy(dia) ? 'bg-primary/5 border-b-2 border-b-primary' : ''}`}>
                <p className={`text-[10px] font-bold uppercase tracking-wider ${esHoy(dia) ? 'text-primary' : 'text-text-light'}`}>{nombresDias[index]}</p>
                <p className={`text-xl font-black ${esHoy(dia) ? 'text-primary' : 'text-text'}`}>{dia.getDate()}</p>
              </div>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar bg-gray-50/50">
            {cargando ? (
              <div className="flex flex-col items-center justify-center h-full gap-2">
                 <div className="w-8 h-8 border-2 border-accent-orange border-t-transparent rounded-full animate-spin"></div>
                 <p className="text-[10px] font-black text-text-light uppercase tracking-widest">Sincronizando...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-6 min-h-full">
                {diasSemana.map((dia, index) => {
                  const turnosDelDia = turnos.filter(t => t.fecha === formatearFechaDB(dia)).sort((a, b) => a.hora.localeCompare(b.hora));
                  return (
                    <div key={index} className={`border-r border-secondary/10 last:border-0 p-1.5 min-h-[400px] ${esHoy(dia) ? 'bg-primary/5' : ''}`}>
                      {turnosDelDia.length === 0 ? (
                        <p className="text-[10px] font-bold text-center text-secondary mt-4 opacity-30 uppercase tracking-widest">- Libre -</p>
                      ) : (
                        <div className="flex flex-col gap-1.5">
                          {turnosDelDia.map(turno => (
                            <div 
                              key={turno._id || turno.id} 
                              onClick={() => irAHistoriaClinica(turno)}
                              className={`p-2 rounded-lg border shadow-sm hover:shadow-lg transition-all cursor-pointer group hover:-translate-y-0.5 relative overflow-hidden
                                ${turno.estado === 'Confirmado' ? 'bg-white border-l-4 border-l-green-500' : 'bg-yellow-50 border-l-4 border-l-yellow-500'}`}
                            >
                              <div className="flex justify-between items-start mb-0.5">
                                <p className="text-[10px] font-black text-text-light flex items-center gap-1">
                                  <FaClock className={turno.estado === 'Confirmado' ? 'text-green-500' : 'text-yellow-600'} /> {turno.hora}
                                </p>
                                <span className="text-[8px] font-bold text-text-light bg-background/80 px-1 rounded uppercase tracking-tighter">
                                  {turno.profesional.includes('Adolfo') ? 'DR. AM' : 'DRA. EC'}
                                </span>
                              </div>
                              <p className="font-black text-primary text-xs leading-tight truncate group-hover:text-accent-orange transition-colors uppercase tracking-tight">{turno.nombrePaciente}</p>
                              <p className="text-[10px] font-medium text-text truncate opacity-60 italic leading-tight">"{turno.motivo}"</p>
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
      {mostrarModalCita && <ModalNuevaCita onClose={() => setMostrarModalCita(false)} onTurnoCreado={recargarAgenda} />}
    </LayoutAdmin>
  );
};

export default AdminAgenda;
