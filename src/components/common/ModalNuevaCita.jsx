import { useState, useEffect } from 'react';
import api from '../../api/axios.js';
import { FaTimes, FaCalendarPlus, FaUser, FaStethoscope, FaClock, FaSearch, FaSpinner, FaUserMd } from 'react-icons/fa';

const ModalNuevaCita = ({ onClose, onTurnoCreado, initialDate, initialTime }) => {
  const [pacientes, setPacientes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargandoPacientes, setCargandoPacientes] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [formData, setFormData] = useState({
    pacienteId: '',
    nombrePaciente: '',
    apellidoPaciente: '',
    fecha: initialDate || new Date().toISOString().split('T')[0],
    hora: initialTime || '09:00',
    motivo: '',
    profesional: 'Dr. Adolfo Martínez',
    estado: 'Confirmado'
  });

  const hours = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

  // Cargar lista de pacientes
  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        // En este proyecto usamos /pacientes para el directorio
        const res = await api.get('/pacientes');
        setPacientes(res.data);
      } catch (error) {
        console.error("Error al cargar pacientes", error);
      } finally {
        setCargandoPacientes(false);
      }
    };
    fetchPacientes();
  }, []);

  const handleSelectPaciente = (p) => {
    setFormData({
      ...formData,
      pacienteId: p._id,
      nombrePaciente: p.nombre,
      apellidoPaciente: p.apellido
    });
    setBusqueda(`${p.nombre} ${p.apellido}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.pacienteId) {
      alert("Por favor selecciona un paciente de la lista.");
      return;
    }
    
    setEnviando(true);
    try {
      await api.post('/turnos', formData);
      alert('¡Turno agendado con éxito!');
      onTurnoCreado();
      onClose();
    } catch (error) {
      console.error("Error al agendar turno:", error);
      alert('Error al agendar el turno. Verifica los datos.');
    } finally {
      setEnviando(false);
    }
  };

  const pacientesFiltrados = pacientes.filter(p => 
    `${p.nombre} ${p.apellido}`.toLowerCase().includes(busqueda.toLowerCase()) ||
    (p.dni && p.dni.includes(busqueda))
  ).slice(0, 5);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary/40 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden scale-in-center border border-secondary/50">
        
        {/* Cabecera Premium */}
        <div className="bg-primary p-8 text-white flex justify-between items-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
          <div className="relative">
            <h2 className="text-2xl font-black flex items-center gap-3 tracking-tight">
              <div className="w-10 h-10 bg-accent-orange rounded-xl flex items-center justify-center shadow-lg">
                <FaCalendarPlus className="text-xl" />
              </div>
              Agendar Cita Manual
            </h2>
            <p className="text-[10px] uppercase font-black tracking-widest text-accent-orange mt-1 opacity-80">Registro Administrativo</p>
          </div>
          <button 
            onClick={onClose} 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all active:scale-95 relative"
          >
            <FaTimes />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          {/* Selector de Paciente con Buscador */}
          <div className="space-y-2 relative">
            <label className="text-xs font-black text-text-light uppercase tracking-widest flex items-center gap-2">
              <FaSearch /> Buscar Paciente
            </label>
            <div className="relative">
              <input 
                type="text" 
                required
                placeholder="Nombre o DNI..."
                value={busqueda}
                onChange={(e) => {
                  setBusqueda(e.target.value);
                  if (formData.pacienteId) setFormData({...formData, pacienteId: ''});
                }}
                className="w-full p-4 bg-background border border-secondary/50 rounded-2xl outline-none focus:border-accent-orange focus:ring-4 focus:ring-accent-orange/10 transition-all font-bold text-primary"
              />
              {cargandoPacientes && <FaSpinner className="absolute right-4 top-1/2 -translate-y-1/2 text-accent-orange animate-spin" />}
            </div>

            {/* Resultados de búsqueda */}
            {busqueda && !formData.pacienteId && !cargandoPacientes && (
              <div className="absolute z-[110] left-0 right-0 top-full mt-2 bg-white border border-secondary/50 rounded-2xl shadow-2xl overflow-hidden animate-fade-in max-h-48 overflow-y-auto">
                {pacientesFiltrados.length > 0 ? (
                  pacientesFiltrados.map(p => (
                    <button 
                      key={p._id}
                      type="button"
                      onClick={() => handleSelectPaciente(p)}
                      className="w-full p-4 text-left hover:bg-primary/5 border-b border-secondary/10 last:border-0 transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <p className="font-bold text-primary group-hover:text-accent-orange transition-colors">{p.nombre} {p.apellido}</p>
                        <p className="text-[10px] text-text-light font-black uppercase tracking-widest">DNI: {p.dni || 'N/A'}</p>
                      </div>
                      <FaUser className="text-secondary/40 group-hover:text-accent-orange/40 transition-colors" />
                    </button>
                  ))
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-xs text-text-light font-bold italic mb-1">No se encontraron pacientes.</p>
                    <p className="text-[10px] text-text-light/60">El paciente debe estar registrado previamente.</p>
                  </div>
                )}
              </div>
            )}

            {/* Paciente Seleccionado Feedback */}
            {formData.pacienteId && (
              <div className="flex items-center gap-3 bg-green-50 p-4 rounded-2xl border border-green-200 animate-fade-in shadow-inner">
                <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg">
                  <FaUser />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-black text-green-700 uppercase tracking-tight">Paciente Seleccionado</p>
                  <p className="text-sm font-bold text-green-900">{formData.nombrePaciente} {formData.apellidoPaciente}</p>
                </div>
                <button 
                  type="button"
                  onClick={() => {
                    setFormData({...formData, pacienteId: ''});
                    setBusqueda("");
                  }}
                  className="text-green-700/50 hover:text-red-500 transition-colors p-2"
                >
                  <FaTimes />
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-black text-text-light uppercase tracking-widest flex items-center gap-2"><FaUserMd /> Profesional</label>
              <select 
                value={formData.profesional} 
                onChange={e => setFormData({...formData, profesional: e.target.value})} 
                className="w-full p-4 bg-background border border-secondary/50 rounded-2xl outline-none focus:border-accent-orange transition-all font-bold text-primary cursor-pointer appearance-none"
              >
                <option value="Dr. Adolfo Martínez">Dr. Adolfo Martínez</option>
                <option value="Dra. Erina Carcara">Dra. Erina Carcara</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-text-light uppercase tracking-widest flex items-center gap-2"><FaStethoscope /> Motivo</label>
              <input 
                type="text" 
                required 
                placeholder="Ej: Control..."
                value={formData.motivo} 
                onChange={e => setFormData({...formData, motivo: e.target.value})} 
                className="w-full p-4 bg-background border border-secondary/50 rounded-2xl outline-none focus:border-accent-orange transition-all font-bold text-primary" 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-black text-text-light uppercase tracking-widest flex items-center gap-2">Fecha</label>
              <input 
                type="date" 
                required 
                value={formData.fecha} 
                onChange={e => setFormData({...formData, fecha: e.target.value})} 
                className="w-full p-4 bg-background border border-secondary/50 rounded-2xl outline-none focus:border-accent-orange transition-all font-bold text-primary" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-text-light uppercase tracking-widest flex items-center gap-2"><FaClock /> Hora</label>
              <select 
                value={formData.hora} 
                onChange={e => setFormData({...formData, hora: e.target.value})} 
                className="w-full p-4 bg-background border border-secondary/50 rounded-2xl outline-none focus:border-accent-orange transition-all font-bold text-primary cursor-pointer appearance-none"
              >
                {hours.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>
          </div>

          <div className="pt-6 flex gap-3 border-t border-secondary/20">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 bg-background text-text font-black text-xs uppercase tracking-widest py-4 rounded-2xl hover:bg-secondary/20 transition-all active:scale-95"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={enviando || !formData.pacienteId} 
              className={`flex-1 font-black text-xs uppercase tracking-widest py-4 rounded-2xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2
                ${enviando || !formData.pacienteId ? 'bg-secondary text-text-light cursor-not-allowed' : 'bg-accent-orange text-white hover:brightness-110 shadow-accent-orange/20'}
              `}
            >
              {enviando ? <FaSpinner className="animate-spin" /> : <FaCalendarPlus />}
              {enviando ? 'Guardando...' : 'Confirmar Turno'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ModalNuevaCita;
