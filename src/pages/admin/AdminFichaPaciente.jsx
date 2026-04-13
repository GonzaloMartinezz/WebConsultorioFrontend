import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import LayoutAdmin from "../../components/layouts/LayoutAdmin.jsx";
import NeoOdontograma from '../../components/common/NeoOdontograma.jsx';
import api from '../../api/axios.js';
import {
  FaArrowLeft, FaSave, FaTooth, FaUserInjured, FaCalendarCheck,
  FaSpinner, FaUndo, FaInfoCircle
} from 'react-icons/fa';

// =============================================
// CONFIGURACIÓN DE ESTADOS DENTALES
// =============================================
// Ya no usados en esta pantalla porque se delegan a NeoOdontograma

const AdminFichaPaciente = () => {
  const { id } = useParams();
  const [cargando, setCargando] = useState(true);

  // Datos del paciente
  const [paciente, setPaciente] = useState({});
  const [dientes, setDientes] = useState({});
  const [historial, setHistorial] = useState([]);

  // Formulario para la visita actual
  const [nuevaConsulta, setNuevaConsulta] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    motivo: '',
    profesional: 'Dr. Adolfo',
    tratamientoRealizado: ''
  });

  useEffect(() => {
    const cargarFichaCompleta = async () => {
      try {
        const resUser = await api.get(`/auth/usuarios/${id}`);
        setPaciente(resUser.data);

        // Pre-llenar nombre y apellido del paciente en el formulario
        setNuevaConsulta(prev => ({
          ...prev,
          nombre: resUser.data.nombre || '',
          apellido: resUser.data.apellido || '',
          telefono: resUser.data.telefono || ''
        }));

        const resFicha = await api.get(`/fichas/${id}`);
        if (resFicha.data) {
          // Convertir array de odontograma a mapa { diente: estado }
          if (resFicha.data.odontograma?.length) {
            const mapa = {};
            resFicha.data.odontograma.forEach(d => {
              mapa[d.diente] = d.estado;
            });
            setDientes(mapa);
          }
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

  const [guardando, setGuardando] = useState(false);

  // =============================================
  // GUARDAR TODO
  // =============================================
  const handleGuardarFicha = async () => {
    setGuardando(true);
    try {
      // Convertir mapa de dientes a array para el backend
      const odontogramaArray = Object.entries(dientes)
        .filter(([_, estado]) => estado !== 'sano')
        .map(([diente, estado]) => ({ diente: parseInt(diente), estado }));

      const payload = {
        odontograma: odontogramaArray,
        nuevaConsulta: nuevaConsulta.motivo ? nuevaConsulta : null
      };

      await api.put(`/fichas/${id}`, payload);
      alert('¡Ficha y Odontograma guardados con éxito!');
      window.location.reload();
    } catch (error) {
      alert('Hubo un error al guardar');
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) return <LayoutAdmin><div className="flex flex-col items-center justify-center py-32 gap-4"><FaSpinner className="text-5xl text-accent-orange animate-spin" /><p className="text-text-light font-bold text-sm uppercase tracking-wider">Cargando legajo médico...</p></div></LayoutAdmin>;

  return (
    <LayoutAdmin>
      {/* ========== BOTONERA SUPERIOR ========== */}
      <div className="mb-6 flex justify-between items-center">
        <Link to="/admin/lista-pacientes" className="flex items-center gap-2 text-text-light font-bold hover:text-primary transition-colors">
          <FaArrowLeft /> Volver al Directorio
        </Link>
        <button onClick={handleGuardarFicha} disabled={guardando} className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-black shadow-lg flex items-center gap-2 transition-all disabled:opacity-50">
          <FaSave /> {guardando ? 'Guardando...' : 'Guardar Toda la Ficha'}
        </button>
      </div>

      {/* ========== 1. CARD DEL PACIENTE ========== */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border-l-8 border-accent-orange mb-8 flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary text-4xl font-black uppercase shrink-0">
          {paciente.nombre?.charAt(0)}{paciente.apellido?.charAt(0)}
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-black text-primary mb-1">{paciente.nombre} {paciente.apellido}</h1>
          <p className="text-text-light font-medium flex flex-wrap items-center justify-center md:justify-start gap-4">
            <span>📧 {paciente.email}</span>
            {paciente.telefono && <span>📱 {paciente.telefono}</span>}
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Paciente Activo</span>
          </p>
        </div>
      </div>

      {/* ========== 2. FORMULARIO CONSULTA ACTUAL ========== */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-secondary/40 mb-8">
        <h2 className="text-xl font-black text-primary mb-5 flex items-center gap-2">
          <FaUserInjured /> Registrar Consulta de Hoy
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-bold text-text mb-1">Nombre</label>
            <input type="text" placeholder="Nombre del paciente"
              value={nuevaConsulta.nombre} onChange={e => setNuevaConsulta({...nuevaConsulta, nombre: e.target.value})}
              className="w-full p-3 border border-secondary/50 rounded-xl outline-none focus:border-primary bg-background/30" />
          </div>
          <div>
            <label className="block text-sm font-bold text-text mb-1">Apellido</label>
            <input type="text" placeholder="Apellido del paciente"
              value={nuevaConsulta.apellido} onChange={e => setNuevaConsulta({...nuevaConsulta, apellido: e.target.value})}
              className="w-full p-3 border border-secondary/50 rounded-xl outline-none focus:border-primary bg-background/30" />
          </div>
          <div>
            <label className="block text-sm font-bold text-text mb-1">Teléfono</label>
            <input type="tel" placeholder="Ej: 11-2233-4455"
              value={nuevaConsulta.telefono} onChange={e => setNuevaConsulta({...nuevaConsulta, telefono: e.target.value})}
              className="w-full p-3 border border-secondary/50 rounded-xl outline-none focus:border-primary bg-background/30" />
          </div>
          <div>
            <label className="block text-sm font-bold text-text mb-1">Motivo de la Consulta</label>
            <input type="text" placeholder="Ej: Dolor de muela, Control, Limpieza..."
              value={nuevaConsulta.motivo} onChange={e => setNuevaConsulta({...nuevaConsulta, motivo: e.target.value})}
              className="w-full p-3 border border-secondary/50 rounded-xl outline-none focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-bold text-text mb-1">Atendido por</label>
            <select value={nuevaConsulta.profesional} onChange={e => setNuevaConsulta({...nuevaConsulta, profesional: e.target.value})}
              className="w-full p-3 border border-secondary/50 rounded-xl outline-none focus:border-primary">
              <option value="Dr. Adolfo">Dr. Adolfo</option>
              <option value="Dra. Erina">Dra. Erina</option>
            </select>
          </div>
          <div className="md:col-span-2 lg:col-span-1">
            <label className="block text-sm font-bold text-text mb-1">Tratamiento Realizado</label>
            <input type="text" placeholder="Detalles del procedimiento..."
              value={nuevaConsulta.tratamientoRealizado} onChange={e => setNuevaConsulta({...nuevaConsulta, tratamientoRealizado: e.target.value})}
              className="w-full p-3 border border-secondary/50 rounded-xl outline-none focus:border-primary" />
          </div>
        </div>
      </div>

      {/* ========== 3. ODONTOGRAMA INTERACTIVO AVANZADO ========== */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-secondary/40 mb-8">
        <h2 className="text-xl font-black text-primary mb-5 flex items-center gap-2">
          <FaTooth /> Odontograma Interactivo Avanzado
        </h2>
        <NeoOdontograma 
          dientes={dientes || {}} 
          setDientes={setDientes} 
          pacienteNombre={`${paciente?.nombre || 'Doc.'} ${paciente?.apellido || 'Ficticio'}`} 
          patientId={id ? id.substring(Math.max(0, id.length - 6)).toUpperCase() : '0000'}
          onSave={handleGuardarFicha}
          isSaving={guardando}
        />
      </div>

      {/* ========== 4. HISTORIAL DE CONSULTAS ========== */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-secondary/40">
        <h2 className="text-xl font-black text-primary mb-4 flex items-center gap-2">
          <FaCalendarCheck /> Historial de Consultas
        </h2>

        {historial.length === 0 ? (
          <p className="text-text-light italic py-6 text-center">No hay consultas previas registradas para este paciente.</p>
        ) : (
          <div className="space-y-4">
            {[...historial].reverse().map((visita, index) => (
              <div key={index} className="border-l-4 border-primary pl-4 py-3 bg-background/20 rounded-r-xl pr-4">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-black text-text">{visita.motivo}</p>
                  <span className="text-xs font-bold text-text-light bg-white px-2 py-1 rounded shadow-sm shrink-0 ml-4">
                    {new Date(visita.fecha).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-text-light mb-1">Atendido por: <strong className="text-primary">{visita.profesional}</strong></p>
                {visita.tratamientoRealizado && (
                  <p className="text-sm text-text italic">"{visita.tratamientoRealizado}"</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </LayoutAdmin>
  );
};

export default AdminFichaPaciente;
