import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import LayoutAdmin from "../../components/layouts/LayoutAdmin.jsx";
import NeoOdontograma from '../../components/common/NeoOdontograma.jsx';
import api from '../../api/axios.js';
import { FaArrowLeft, FaSpinner, FaInfoCircle } from 'react-icons/fa';

const AdminOdontograma = () => {
  const { id } = useParams();
  const [dientes, setDientes] = useState({});
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
        // Intentar con /pacientes primero
        let paciente = null;
        try {
          const resPacientes = await api.get('/pacientes');
          paciente = resPacientes.data.find(p => p._id === id);
        } catch {
          // Fallback a /auth/pacientes
          try {
            const resPacientes = await api.get('/auth/pacientes');
            paciente = resPacientes.data.find(p => p._id === id);
          } catch {
            console.warn("No se pudo cargar la lista de pacientes");
          }
        }

        if (paciente) {
          setPacienteNombre(`${paciente.nombre} ${paciente.apellido}`);
          // Cargar odontograma existente del paciente
          if (paciente.odontograma && paciente.odontograma.length > 0) {
            const map = {};
            paciente.odontograma.forEach(d => {
              map[d.numero] = d.estado;
            });
            setDientes(map);
          }
        }
      } catch (err) {
        console.error("Error al cargar odontograma:", err);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, [id]);

  const guardarOdontograma = async () => {
    if (!id) {
      setMensaje({ texto: 'No hay paciente seleccionado para guardar.', tipo: 'error' });
      return;
    }

    setGuardando(true);
    try {
      // Guardar cada diente modificado usando PATCH /api/pacientes/:id/odontograma
      const dientesMapeados = Object.entries(dientes)
        .filter(([_, estado]) => estado !== 'sano' && estado !== 'Sano');

      // Enviar cada diente actualizado
      for (const [num, estado] of dientesMapeados) {
        await api.patch(`/pacientes/${id}/odontograma`, {
          numero: parseInt(num),
          estado: estado,
          notas: ''
        });
      }

      setMensaje({ texto: '¡Odontograma guardado exitosamente!', tipo: 'success' });
      
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
      <div className="max-w-[1400px] mx-auto space-y-8">
        {id && (
          <Link
            to={`/admin/paciente/${id}`}
            className="inline-flex items-center gap-2 text-text-light hover:text-primary font-bold text-sm transition-colors mb-4"
          >
            <FaArrowLeft /> Volver a la Ficha de {pacienteNombre.split(' ')[0] || 'Paciente'}
          </Link>
        )}

        {mensaje.texto && (
          <div className={`p-4 rounded-2xl text-sm font-bold border ${
            mensaje.tipo === 'success' ? 'bg-green-50 border-green-200 text-green-700' :
            mensaje.tipo === 'error' ? 'bg-red-50 border-red-200 text-red-700' :
            'bg-blue-50 border-blue-200 text-blue-700'
          }`}>
            {mensaje.texto}
          </div>
        )}

        {!id ? (
          <div className="bg-white p-8 rounded-2xl text-center">
            <h2 className="text-xl font-bold mb-4">No se ha seleccionado paciente</h2>
            <p className="text-text-light mb-4">Para acceder al odontograma, seleccioná un paciente desde el directorio.</p>
            <Link to="/admin/pacientes" className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors">
              Ir al Directorio de Pacientes
            </Link>
          </div>
        ) : (
          <NeoOdontograma 
            dientes={dientes}
            setDientes={setDientes}
            pacienteNombre={pacienteNombre}
            patientId={id.slice(-6)}
            onSave={guardarOdontograma}
            isSaving={guardando}
          />
        )}

        <div className="bg-white/50 backdrop-blur-sm border border-secondary/30 rounded-3xl p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
            <FaInfoCircle className="text-3xl" />
          </div>
          <div>
            <h4 className="text-lg font-black text-primary mb-1">Sistema de Odontograma Interactivo</h4>
            <p className="text-sm text-text-light font-medium leading-relaxed">
              Hacé clic en cada cara del diente para cambiar su estado. Los cambios se guardan al presionar el botón correspondiente. 
              El odontograma se vincula automáticamente con la ficha del paciente.
            </p>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default AdminOdontograma;
