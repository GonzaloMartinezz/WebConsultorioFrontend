import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios.js';
import { FaUser, FaCalendarCheck, FaClock, FaSignOutAlt, FaTooth } from 'react-icons/fa';

const MiPerfil = () => {
  const [misTurnos, setMisTurnos] = useState([]);
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('perfilUsuario'));

  useEffect(() => {
    // Buscar los turnos de este paciente en particular
    const fetchMisTurnos = async () => {
      try {
        const res = await api.get('/turnos');
        // Filtramos para que solo vea los suyos (usando su nombre o email)
        // Nota: En una app real usaríamos el ID del usuario, pero aquí filtramos por nombre según la sugerencia
        const misTurnosFiltrados = res.data.filter(t => t.pacienteNombre === usuario.nombre);
        setMisTurnos(misTurnosFiltrados);
      } catch (error) {
        console.error("Error al cargar turnos", error);
      }
    };
    if (usuario && usuario.nombre) {
      fetchMisTurnos();
    }
  }, [usuario]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('perfilUsuario');
    navigate('/login');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background p-6 lg:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Cabecera del Paciente */}
        <div className="bg-white rounded-3xl p-8 shadow-md border-t-8 border-primary flex flex-col md:flex-row justify-between items-center gap-6 animate-fade-in">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary text-3xl font-black uppercase shadow-inner">
              {usuario?.nombre?.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-black text-primary tracking-tight text-center md:text-left">Hola, {usuario?.nombre}</h1>
              <p className="text-text-light font-medium text-center md:text-left">{usuario?.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full md:w-auto text-red-500 font-bold hover:bg-red-50 px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 border border-transparent hover:border-red-100 active:scale-95">
            <FaSignOutAlt /> Cerrar Sesión
          </button>
        </div>

        {/* Panel de Mis Turnos */}
        <div className="bg-white rounded-3xl p-8 shadow-md border border-secondary/30 animate-slide-up">
          <h2 className="text-2xl font-black text-primary mb-6 flex items-center gap-3">
            <FaCalendarCheck className="text-accent-orange" /> Mis Próximos Turnos
          </h2>
          
          {misTurnos.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaTooth className="text-5xl text-secondary animate-bounce-slow" />
              </div>
              <p className="text-text-light font-bold text-lg">No tienes turnos agendados actualmente.</p>
              <button onClick={() => navigate('/turnos')} className="mt-6 bg-accent-orange text-white px-10 py-4 rounded-full font-black shadow-lg hover:brightness-110 transform hover:-translate-y-1 transition-all active:scale-95">
                Solicitar un Turno Ahora
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {misTurnos.map(turno => (
                <div key={turno._id} className="group border border-secondary/50 rounded-2xl p-6 bg-background/30 hover:bg-white transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/30 transform hover:-translate-y-1">
                  
                  {/* Etiqueta de Estado */}
                  <div className={`absolute top-0 right-0 px-5 py-1.5 rounded-bl-2xl text-[10px] font-black text-white uppercase tracking-[0.15em] shadow-sm
                    ${turno.estado === 'Confirmado' ? 'bg-green-500' : turno.estado === 'Cancelado' ? 'bg-red-500' : 'bg-primary text-white animate-pulse-slow'}`}>
                    {turno.estado || 'Pendiente'}
                  </div>

                  <p className="text-[10px] font-black text-accent-orange uppercase tracking-[.2em] mb-2">Cita Odontológica</p>
                  <p className="text-2xl font-black text-primary mb-3 flex items-center gap-2">
                    <FaClock className="text-accent-orange text-lg"/> {new Date(turno.fecha).toLocaleDateString()} | {turno.hora}
                  </p>
                  <div className="space-y-2 border-t border-secondary/40 pt-4 mt-2">
                    <p className="text-sm text-text-light font-medium flex justify-between">
                      Tratamiento: <span className="text-primary font-black uppercase text-xs">{turno.tipoTratamiento || turno.motivo}</span>
                    </p>
                    <p className="text-sm text-text-light font-medium flex justify-between">
                      Profesional: <span className="text-primary font-black uppercase text-xs">Dr. Carlos Martínez</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer info */}
        <p className="text-center text-text-light/50 text-xs font-bold uppercase tracking-widest">
          C&M Dental Admin - Portal del Paciente
        </p>

      </div>
    </div>
  );
};

export default MiPerfil;
