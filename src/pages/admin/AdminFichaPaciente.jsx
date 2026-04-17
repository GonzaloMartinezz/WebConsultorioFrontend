import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import LayoutAdmin from "../../components/layouts/LayoutAdmin.jsx";
import NeoOdontograma from '../../components/common/NeoOdontograma.jsx';
import api from '../../api/axios.js';
import {
  FaArrowLeft, FaSave, FaTooth, FaUserInjured, FaCalendarCheck,
  FaSpinner, FaUndo, FaInfoCircle, FaCheckCircle, FaFileMedical
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

  // Toast System
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000);
  };

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
        const resPacientes = await api.get('/pacientes');
        const lista = resPacientes.data;
        const encontrado = lista.find(p => p._id === id);
        
        if (encontrado) {
          setPaciente(encontrado);
          // Pre-llenar nombre y apellido del paciente en el formulario
          setNuevaConsulta(prev => ({
            ...prev,
            nombre: encontrado.nombre || '',
            apellido: encontrado.apellido || '',
            telefono: encontrado.telefono || ''
          }));
        }

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
      showToast('¡Ficha y Odontograma guardados con éxito!', 'success');
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      showToast('Hubo un error al guardar', 'error');
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
              value={nuevaConsulta.nombre} onChange={e => setNuevaConsulta({ ...nuevaConsulta, nombre: e.target.value })}
              className="w-full p-3 border border-secondary/50 rounded-xl outline-none focus:border-primary bg-background/30" />
          </div>
          <div>
            <label className="block text-sm font-bold text-text mb-1">Apellido</label>
            <input type="text" placeholder="Apellido del paciente"
              value={nuevaConsulta.apellido} onChange={e => setNuevaConsulta({ ...nuevaConsulta, apellido: e.target.value })}
              className="w-full p-3 border border-secondary/50 rounded-xl outline-none focus:border-primary bg-background/30" />
          </div>
          <div>
            <label className="block text-sm font-bold text-text mb-1">Teléfono</label>
            <input type="tel" placeholder="Ej: 11-2233-4455"
              value={nuevaConsulta.telefono} onChange={e => setNuevaConsulta({ ...nuevaConsulta, telefono: e.target.value })}
              className="w-full p-3 border border-secondary/50 rounded-xl outline-none focus:border-primary bg-background/30" />
          </div>
          <div>
            <label className="block text-sm font-bold text-text mb-1">Motivo de la Consulta</label>
            <input type="text" placeholder="Ej: Dolor de muela, Control, Limpieza..."
              value={nuevaConsulta.motivo} onChange={e => setNuevaConsulta({ ...nuevaConsulta, motivo: e.target.value })}
              className="w-full p-3 border border-secondary/50 rounded-xl outline-none focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-bold text-text mb-1">Atendido por</label>
            <select value={nuevaConsulta.profesional} onChange={e => setNuevaConsulta({ ...nuevaConsulta, profesional: e.target.value })}
              className="w-full p-3 border border-secondary/50 rounded-xl outline-none focus:border-primary">
              <option value="Dr. Adolfo">Dr. Adolfo</option>
              <option value="Dra. Erina">Dra. Erina</option>
            </select>
          </div>
          <div className="md:col-span-2 lg:col-span-1">
            <label className="block text-sm font-bold text-text mb-1">Tratamiento Realizado</label>
            <input type="text" placeholder="Detalles del procedimiento..."
              value={nuevaConsulta.tratamientoRealizado} onChange={e => setNuevaConsulta({ ...nuevaConsulta, tratamientoRealizado: e.target.value })}
              className="w-full p-3 border border-secondary/50 rounded-xl outline-none focus:border-primary" />
          </div>
        </div>
      </div>

      {/* ========== 3. ODONTOGRAMA INTERACTIVO AVANZADO ========== */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-secondary/40 mb-8">
        <h2 className="text-xl font-black text-primary mb-5 flex items-center gap-2">
          <FaTooth /> Odontograma Interactivo Avanzado
        </h2>
        <div className="overflow-hidden">
          <div className="transform scale-[0.8] md:scale-[0.85] lg:scale-[0.9] origin-top md:origin-top transition-transform">
            <NeoOdontograma
              dientes={dientes || {}}
              setDientes={setDientes}
              pacienteNombre={`${paciente?.nombre || 'Doc.'} ${paciente?.apellido || 'Ficticio'}`}
              patientId={id ? id.substring(Math.max(0, id.length - 6)).toUpperCase() : '0000'}
              onSave={handleGuardarFicha}
              isSaving={guardando}
            />
          </div>
        </div>
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
              <div key={index} className="border-l-4 border-primary pl-4 py-4 bg-background/20 rounded-r-2xl pr-4 group hover:bg-white hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                       <FaCalendarCheck className="text-xs" />
                    </div>
                    <div>
                      <p className="font-black text-primary uppercase tracking-tight">{visita.motivo}</p>
                      <p className="text-[10px] font-bold text-text-light uppercase tracking-widest">
                        {new Date(visita.fecha).toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <Link 
                    to={`/admin/historia-clinica/${id}`}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-sm active:scale-95"
                  >
                    <FaFileMedical /> ver historia clinica - Odontograma del paciente
                  </Link>
                </div>
                
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-text-light">Atendido por: <strong className="text-primary font-black uppercase">{visita.profesional}</strong></p>
                  {visita.tratamientoRealizado && (
                    <div className="bg-white/50 p-3 rounded-xl border border-secondary/10">
                       <p className="text-xs text-text font-bold italic leading-relaxed">"{visita.tratamientoRealizado}"</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ========== TOAST FLOTANTE ========== */}
      {toast.show && (
        <div className={`fixed bottom-10 right-10 z-100 px-8 py-4 rounded-2xl shadow-2xl animate-fade-up border-b-4 font-black text-sm flex items-center gap-3
          ${toast.type === 'success' ? 'bg-white text-primary border-green-500' : 'bg-red-600 text-white border-red-800'}`}>
          {toast.type === 'success' ? <FaCheckCircle className="text-green-500 text-xl" /> : <FaInfoCircle className="text-xl" />}
          {toast.message}
        </div>
      )}
    </LayoutAdmin>
  );
};

export default AdminFichaPaciente;
