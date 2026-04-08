import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import LayoutAdmin from "../../components/layouts/LayoutAdmin.jsx";
import api from '../../api/axios.js';
import { FaArrowLeft, FaSave, FaTooth, FaUserInjured, FaCalendarCheck } from 'react-icons/fa';

const AdminFichaPaciente = () => {
  const { id } = useParams(); // ID del paciente
  const [cargando, setCargando] = useState(true);
  
  // Datos del paciente
  const [paciente, setPaciente] = useState({});
  const [odontograma, setOdontograma] = useState([]);
  const [historial, setHistorial] = useState([]);
  
  // Formulario para la visita actual
  const [nuevaConsulta, setNuevaConsulta] = useState({
    motivo: '',
    profesional: 'Dr. Adolfo',
    tratamientoRealizado: ''
  });

  useEffect(() => {
    const cargarFichaCompleta = async () => {
      try {
        // 1. Traemos los datos básicos del usuario
        const resUser = await api.get(`/auth/usuarios/${id}`);
        setPaciente(resUser.data);

        // 2. Traemos su ficha clínica (odontograma e historial)
        const resFicha = await api.get(`/fichas/${id}`);
        if (resFicha.data) {
          setOdontograma(resFicha.data.odontograma || []);
          setHistorial(resFicha.data.historialConsultas || []);
        }
      } catch (error) {
        console.error("Error al cargar datos", error);
      } finally {
        setCargando(false);
      }
    };
    cargarFichaCompleta();
  }, [id]);

  // Manejar clics en los dientes del odontograma
  const toggleDiente = (numeroDiente) => {
    setOdontograma(prev => {
      const dienteActual = prev.find(d => d.diente === numeroDiente);
      let nuevoEstado = 'caries';
      if (dienteActual?.estado === 'caries') nuevoEstado = 'ausente';
      else if (dienteActual?.estado === 'ausente') nuevoEstado = 'sano';

      const resto = prev.filter(d => d.diente !== numeroDiente);
      return [...resto, { diente: numeroDiente, estado: nuevoEstado }];
    });
  };

  // Guardar TODO en la base de datos
  const handleGuardarFicha = async () => {
    try {
      const payload = {
        odontograma: odontograma,
        nuevaConsulta: nuevaConsulta.motivo ? nuevaConsulta : null
      };

      await api.put(`/fichas/${id}`, payload);
      alert('¡Ficha y Odontograma guardados con éxito!');
      window.location.reload(); // Recargar para ver la nueva consulta en el historial
    } catch (error) {
      alert('Hubo un error al guardar');
    }
  };

  if (cargando) return <LayoutAdmin><p className="p-10 text-center font-bold">Cargando legajo médico...</p></LayoutAdmin>;

  return (
    <LayoutAdmin>
      {/* Botonera Superior */}
      <div className="mb-6 flex justify-between items-center">
        <Link to="/admin/pacientes" className="flex items-center gap-2 text-text-light font-bold hover:text-primary transition-colors">
          <FaArrowLeft /> Volver al Directorio
        </Link>
        <button onClick={handleGuardarFicha} className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-black shadow-lg flex items-center gap-2">
          <FaSave /> Guardar Toda la Ficha
        </button>
      </div>

      {/* 1. LA CARD DEL PACIENTE */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border-l-8 border-accent-orange mb-8 flex items-center gap-6">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary text-4xl font-black uppercase">
          {paciente.nombre?.charAt(0)}{paciente.apellido?.charAt(0)}
        </div>
        <div>
          <h1 className="text-4xl font-black text-primary mb-1">{paciente.nombre} {paciente.apellido}</h1>
          <p className="text-text-light font-medium flex items-center gap-4">
            <span>Email: {paciente.email}</span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Paciente Activo</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 2. REGISTRO DE LA CONSULTA DE HOY (Columna Izquierda) */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-secondary/40">
            <h2 className="text-xl font-black text-primary mb-4 flex items-center gap-2">
              <FaUserInjured /> Consulta Actual
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-text mb-1">Motivo de la visita</label>
                <input type="text" placeholder="Ej: Dolor de muela, Control..." 
                  value={nuevaConsulta.motivo} onChange={e => setNuevaConsulta({...nuevaConsulta, motivo: e.target.value})} 
                  className="w-full p-3 border border-secondary/50 rounded-xl outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-bold text-text mb-1">Atendido por</label>
                <select value={nuevaConsulta.profesional} onChange={e => setNuevaConsulta({...nuevaConsulta, profesional: e.target.value})} 
                  className="w-full p-3 border border-secondary/50 rounded-xl outline-none">
                  <option value="Dr. Adolfo">Dr. Adolfo</option>
                  <option value="Dra. Erina">Dra. Erina</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-text mb-1">Tratamiento Realizado</label>
                <textarea placeholder="Detalles de lo que se le hizo hoy..." rows="4"
                  value={nuevaConsulta.tratamientoRealizado} onChange={e => setNuevaConsulta({...nuevaConsulta, tratamientoRealizado: e.target.value})} 
                  className="w-full p-3 border border-secondary/50 rounded-xl outline-none focus:border-primary"></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* 3. ODONTOGRAMA Y EL HISTORIAL (Columna Derecha) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Odontograma */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-secondary/40">
            <h2 className="text-xl font-black text-primary mb-4 flex items-center gap-2">
              <FaTooth /> Odontograma Interactivo
            </h2>
            <p className="text-sm text-text-light mb-6">Haz clic en las piezas para marcar su estado: Sano (Gris), Caries (Rojo), Ausente (Negro).</p>
            
            <div className="flex flex-wrap justify-center gap-2 p-4 bg-background/30 rounded-2xl">
              {/* Renderizamos algunos dientes de ejemplo (Cuadrante superior) */}
              {[18,17,16,15,14,13,12,11, 21,22,23,24,25,26,27,28].map(num => {
                const estado = odontograma.find(d => d.diente === num)?.estado || 'sano';
                let clases = 'bg-white border-secondary/50 text-text';
                if (estado === 'caries') clases = 'bg-red-500 border-red-700 text-white';
                if (estado === 'ausente') clases = 'bg-gray-800 border-gray-900 text-white opacity-50';

                return (
                  <button key={num} onClick={() => toggleDiente(num)} 
                    className={`w-10 h-14 border-2 rounded-lg font-black text-sm flex items-center justify-center transition-all hover:scale-110 ${clases}`}>
                    {num}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Historial de Visitas Pasadas */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-secondary/40">
            <h2 className="text-xl font-black text-primary mb-4 flex items-center gap-2">
              <FaCalendarCheck /> Historial de Consultas
            </h2>
            
            {historial.length === 0 ? (
              <p className="text-text-light italic">No hay consultas previas registradas.</p>
            ) : (
              <div className="space-y-4">
                {historial.map((visita, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4 py-2 bg-background/20 rounded-r-xl pr-4">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-black text-text">{visita.motivo}</p>
                      <span className="text-xs font-bold text-text-light bg-white px-2 py-1 rounded shadow-sm">
                        {new Date(visita.fecha).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-text-light mb-2">Atendido por: <strong className="text-primary">{visita.profesional}</strong></p>
                    <p className="text-sm text-text italic">"{visita.tratamientoRealizado}"</p>
                  </div>
                )).reverse()} {/* Reverse para que la última visita salga arriba */}
              </div>
            )}
          </div>

        </div>
      </div>
    </LayoutAdmin>
  );
};

export default AdminFichaPaciente;
