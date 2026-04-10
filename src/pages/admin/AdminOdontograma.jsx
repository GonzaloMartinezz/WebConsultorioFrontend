import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import LayoutAdmin from "../../components/layouts/LayoutAdmin.jsx";
import OdontogramaAvanzado from '../../components/common/OdontogramaAvanzado.jsx';
import api from '../../api/axios.js';
import {
  FaArrowLeft, FaSpinner, FaInfoCircle
} from 'react-icons/fa';

const AdminOdontograma = () => {
  const { id } = useParams();
  const [dientesInitial, setDientesInitial] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
  const [pacienteNombre, setPacienteNombre] = useState('');

  useEffect(() => {
    const cargarDatos = async () => {
      if (!id) {
        setCargando(false);
        return;
      }

      try {
        const resPacientes = await api.get('/auth/pacientes');
        const paciente = resPacientes.data.find(p => p._id === id);
        if (paciente) {
          setPacienteNombre(`${paciente.nombre} ${paciente.apellido}`);
        }

        try {
          const resHistoria = await api.get(`/historias/paciente/${id}`);
          if (resHistoria.data?.odontograma) {
            // Convertir formato backend {idDiente, estado} a componente {numero, estado}
            const formatted = resHistoria.data.odontograma.map(d => ({
              numero: d.idDiente,
              estado: d.estado
            }));
            setDientesInitial(formatted);
          }
        } catch {
          // Sin datos previos
        }
      } catch (err) {
        console.error("Error al cargar odontograma:", err);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, [id]);

  const guardarOdontograma = async (dataOdontograma) => {
    if (!id) {
      setMensaje({ texto: 'No hay paciente seleccionado para guardar.', tipo: 'error' });
      return;
    }

    setGuardando(true);
    try {
      // Convertir formato componente {numero, estado} a backend {idDiente, estado}
      const odontogramaArray = dataOdontograma.map(d => ({
        idDiente: d.numero,
        estado: d.estado
      }));

      await api.put(`/historias/odontograma/${id}`, { odontograma: odontogramaArray });
      setMensaje({ texto: '¡Odontograma guardado exitosamente!', tipo: 'success' });
      
      // Limpiar mensaje después de unos segundos
      setTimeout(() => setMensaje({ texto: '', tipo: '' }), 4000);
    } catch (err) {
      console.error("Error al guardar:", err);
      setMensaje({
        texto: 'Error al guardar. Verificá la conexión con el servidor.',
        tipo: 'error'
      });
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) {
    return (
      <LayoutAdmin>
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <FaSpinner className="text-5xl text-accent-orange animate-spin" />
          <p className="text-text-light font-bold text-sm uppercase tracking-wider">Cargando datos clínicos...</p>
        </div>
      </LayoutAdmin>
    );
  }

  return (
    <LayoutAdmin>
      <div className="max-w-7xl mx-auto space-y-8">
        {id && (
          <Link
            to={`/admin/historia-clinica/${id}`}
            className="inline-flex items-center gap-2 text-text-light hover:text-primary font-bold text-sm transition-colors"
          >
            <FaArrowLeft /> Volver al Expediente de {pacienteNombre.split(' ')[0]}
          </Link>
        )}

        {/* FEEDBACK MENSAGE */}
        {mensaje.texto && (
          <div className={`p-4 rounded-2xl text-sm font-bold border animate-in slide-in-from-top duration-300 ${
            mensaje.tipo === 'success' ? 'bg-green-50 border-green-200 text-green-700' :
            mensaje.tipo === 'error' ? 'bg-red-50 border-red-200 text-red-700' :
            'bg-blue-50 border-blue-200 text-blue-700'
          }`}>
            {mensaje.texto}
          </div>
        )}

        <OdontogramaAvanzado 
          pacienteNombre={pacienteNombre}
          initialData={dientesInitial}
          onSave={guardarOdontograma}
          isSaving={guardando}
        />

        <div className="bg-white/50 backdrop-blur-sm border border-secondary/30 rounded-3xl p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
            <FaInfoCircle className="text-3xl" />
          </div>
          <div>
            <h4 className="text-lg font-black text-primary mb-1">Nueva Experiencia Interactiva</h4>
            <p className="text-sm text-text-light font-medium leading-relaxed">
              Hemos actualizado el odontograma con un sistema de <strong>modal interactivo</strong>. 
              Ahora podés ver claramente el estado de cada pieza y seleccionarlo con un solo clic, 
              evitando errores de carga y mejorando la visualización clínica del paciente.
            </p>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default AdminOdontograma;
