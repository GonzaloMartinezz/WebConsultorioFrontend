import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import LayoutAdmin from "../../components/layouts/LayoutAdmin.jsx";
import NeoOdontograma from '../../components/common/NeoOdontograma.jsx';
import api from '../../api/axios.js';
import {
  FaArrowLeft, FaSave, FaTooth, FaUserInjured, FaCalendarCheck,
  FaSpinner, FaUndo, FaInfoCircle, FaCheckCircle, FaFileMedical,
  FaPen, FaTrash, FaTimesCircle
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

  // Modal para edición del historial
  const [modalEdicionAbierto, setModalEdicionAbierto] = useState(false);
  const [consultaEditando, setConsultaEditando] = useState(null);

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

  // =============================================
  // ELIMINAR Y EDITAR CONSULTAS DEL HISTORIAL
  // =============================================
  const handleEliminarConsulta = async (consultaId) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este registro del historial? Esta acción no se puede deshacer.')) return;
    try {
      await api.delete(`/fichas/${id}/historial/${consultaId}`);
      showToast('Consulta eliminada del historial', 'success');
      setHistorial(prev => prev.filter(c => c._id !== consultaId));
    } catch (error) {
      showToast('Error al eliminar la consulta', 'error');
    }
  };

  const abrirModalEdicion = (consulta) => {
    setConsultaEditando({
      _id: consulta._id,
      motivo: consulta.motivo || '',
      profesional: consulta.profesional || 'Dr. Adolfo',
      tratamientoRealizado: consulta.tratamientoRealizado || '',
      fechaStr: consulta.fecha ? new Date(consulta.fecha).toISOString().split('T')[0] : ''
    });
    setModalEdicionAbierto(true);
  };

  const handleGuardarEdicionConsulta = async () => {
    if (!consultaEditando.motivo) {
      showToast('El motivo es obligatorio', 'error');
      return;
    }
    try {
      const resp = await api.put(`/fichas/${id}/historial/${consultaEditando._id}`, {
        motivo: consultaEditando.motivo,
        profesional: consultaEditando.profesional,
        tratamientoRealizado: consultaEditando.tratamientoRealizado,
        fecha: consultaEditando.fechaStr ? new Date(consultaEditando.fechaStr).toISOString() : new Date().toISOString()
      });

      showToast('Consulta actualizada', 'success');
      setModalEdicionAbierto(false);

      // Actualizar el historial listado en pantalla
      setHistorial(prev => prev.map(c =>
        c._id === consultaEditando._id
          ? {
            ...c,
            motivo: consultaEditando.motivo,
            profesional: consultaEditando.profesional,
            tratamientoRealizado: consultaEditando.tratamientoRealizado,
            fecha: consultaEditando.fechaStr
          }
          : c
      ));
    } catch (error) {
      showToast('Error al editar la consulta', 'error');
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
        <div className="overflow-x-auto w-full custom-scrollbar pb-4">
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
                  <div className="flex items-center gap-2 mt-2 md:mt-0">
                    <button
                      onClick={() => abrirModalEdicion(visita)}
                      className="p-2.5 bg-blue-50 text-blue-500 rounded-lg shadow-sm hover:bg-blue-500 hover:text-white transition-all"
                      title="Editar Consulta"
                    >
                      <FaPen size={12} />
                    </button>
                    <button
                      onClick={() => handleEliminarConsulta(visita._id)}
                      className="p-2.5 bg-red-50 text-red-500 rounded-lg shadow-sm hover:bg-red-500 hover:text-white transition-all"
                      title="Eliminar Consulta"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
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

      {/* ========== MODAL EDICIÓN CONSULTA ========== */}
      {modalEdicionAbierto && consultaEditando && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-200 p-4">
          <div className="bg-white rounded-4xl w-full max-w-lg overflow-hidden shadow-2xl border border-secondary/20">
            <div className="bg-primary p-6 text-white text-center relative">
              <button
                onClick={() => setModalEdicionAbierto(false)}
                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all"
              >
                <FaTimesCircle />
              </button>
              <h2 className="font-black uppercase tracking-widest text-lg">Modificar Registro</h2>
              <p className="text-[10px] text-white/50 font-bold uppercase tracking-[0.2em] mt-1">Historial Clínico</p>
            </div>

            <div className="p-6 space-y-4 bg-gray-50">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block px-1">Fecha</label>
                  <input
                    type="date"
                    value={consultaEditando.fechaStr}
                    onChange={e => setConsultaEditando({ ...consultaEditando, fechaStr: e.target.value })}
                    className="w-full p-3 bg-white rounded-xl font-bold text-xs border border-secondary/20 focus:border-accent-orange outline-none shadow-sm"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block px-1">Atendido por</label>
                  <select
                    value={consultaEditando.profesional}
                    onChange={e => setConsultaEditando({ ...consultaEditando, profesional: e.target.value })}
                    className="w-full p-3 bg-white rounded-xl font-bold text-xs border border-secondary/20 focus:border-accent-orange outline-none shadow-sm"
                  >
                    <option value="Dr. Adolfo">Dr. Adolfo</option>
                    <option value="Dra. Erina">Dra. Erina</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block px-1">Motivo de Consulta</label>
                <input
                  type="text"
                  value={consultaEditando.motivo}
                  onChange={e => setConsultaEditando({ ...consultaEditando, motivo: e.target.value })}
                  className="w-full p-3 bg-white rounded-xl font-bold text-sm border border-secondary/20 focus:border-accent-orange outline-none shadow-sm"
                  placeholder="Ej: Control general"
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block px-1">Tratamiento Realizado</label>
                <textarea
                  rows="3"
                  value={consultaEditando.tratamientoRealizado}
                  onChange={e => setConsultaEditando({ ...consultaEditando, tratamientoRealizado: e.target.value })}
                  className="w-full p-3 bg-white rounded-xl font-medium text-xs border border-secondary/20 focus:border-accent-orange outline-none shadow-sm resize-none"
                  placeholder="Descripción detallada (opcional)..."
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-secondary/10">
                <button
                  onClick={() => setModalEdicionAbierto(false)}
                  className="flex-1 py-3 px-4 bg-white border-2 border-secondary/10 text-text-light font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-gray-50 transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleGuardarEdicionConsulta}
                  className="flex-1 py-3 px-4 bg-primary text-white font-black uppercase tracking-widest text-[10px] rounded-xl shadow-lg hover:bg-primary/90 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <FaSave /> Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </LayoutAdmin>
  );
};

export default AdminFichaPaciente;
