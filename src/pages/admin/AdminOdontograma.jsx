import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import LayoutAdmin from "../../components/layouts/LayoutAdmin.jsx";
import api from '../../api/axios.js';
import {
  FaTooth, FaCheck, FaExclamationTriangle, FaSpinner,
  FaArrowLeft, FaSave, FaUndo, FaInfoCircle
} from 'react-icons/fa';

// =============================================
// NUMERACIÓN FDI - DIENTES ADULTOS
// =============================================
const topRow = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
const bottomRow = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

// =============================================
// CONFIGURACIÓN DE ESTADOS DENTALES
// =============================================
const ESTADOS_DIENTE = {
  sano:       { label: 'Sano',       color: 'text-[#f0f0f0]', overlay: null,        legendColor: 'bg-gray-200 border-gray-300' },
  caries:     { label: 'Caries',     color: 'text-red-400',   overlay: 'caries',    legendColor: 'bg-red-500 border-red-600' },
  obturacion: { label: 'Obturación', color: 'text-blue-400',  overlay: 'obturacion',legendColor: 'bg-blue-500 border-blue-600' },
  ausente:    { label: 'Ausente',    color: 'text-secondary/30', overlay: 'ausente', legendColor: 'bg-gray-400 border-gray-500' },
  implante:   { label: 'Implante',   color: 'text-emerald-500', overlay: 'implante',legendColor: 'bg-emerald-500 border-emerald-600' },
  endodoncia: { label: 'Endodoncia', color: 'text-purple-400',  overlay: 'endo',    legendColor: 'bg-purple-500 border-purple-600' },
};

// Orden del ciclo al hacer click
const CICLO_ESTADOS = ['sano', 'caries', 'obturacion', 'ausente', 'implante', 'endodoncia'];

const AdminOdontograma = () => {
  const { id } = useParams(); // ID del paciente (puede ser undefined si se entra sin paciente)
  const [dientes, setDientes] = useState({});
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
  const [pacienteNombre, setPacienteNombre] = useState('');

  // =============================================
  // Cargar datos (si hay ID de paciente)
  // =============================================
  useEffect(() => {
    const cargarDatos = async () => {
      if (!id) {
        setCargando(false);
        return;
      }

      try {
        // Obtener nombre del paciente
        const resPacientes = await api.get('/auth/pacientes');
        const paciente = resPacientes.data.find(p => p._id === id);
        if (paciente) {
          setPacienteNombre(`${paciente.nombre} ${paciente.apellido}`);
        }

        // Intentar cargar odontograma guardado
        try {
          const resHistoria = await api.get(`/historias/paciente/${id}`);
          if (resHistoria.data?.odontograma) {
            // Convertir array a mapa { idDiente: estado }
            const mapaGuardado = {};
            resHistoria.data.odontograma.forEach(d => {
              mapaGuardado[d.idDiente] = d.estado;
            });
            setDientes(mapaGuardado);
          }
        } catch {
          // Sin datos previos, empezamos limpio
        }

      } catch (err) {
        console.error("Error al cargar odontograma:", err);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, [id]);

  // =============================================
  // Manejar click en un diente (ciclo de estados)
  // =============================================
  const manejarClickDiente = (numeroDiente) => {
    const estadoActual = dientes[numeroDiente] || 'sano';
    const indexActual = CICLO_ESTADOS.indexOf(estadoActual);
    const siguienteIndex = (indexActual + 1) % CICLO_ESTADOS.length;
    const nuevoEstado = CICLO_ESTADOS[siguienteIndex];

    setDientes(prev => ({
      ...prev,
      [numeroDiente]: nuevoEstado
    }));

    setMensaje({ texto: '', tipo: '' }); // Limpiar mensaje al hacer cambios
  };

  // =============================================
  // Guardar odontograma en la BD
  // =============================================
  const guardarOdontograma = async () => {
    if (!id) {
      setMensaje({ texto: 'No hay paciente seleccionado para guardar.', tipo: 'error' });
      return;
    }

    setGuardando(true);
    try {
      // Convertir mapa a array para el backend
      const odontogramaArray = Object.entries(dientes)
        .filter(([_, estado]) => estado !== 'sano') // Solo guardamos los que no son "sano"
        .map(([idDiente, estado]) => ({ idDiente: parseInt(idDiente), estado }));

      await api.put(`/historias/odontograma/${id}`, { odontograma: odontogramaArray });
      setMensaje({ texto: '¡Odontograma guardado exitosamente!', tipo: 'success' });
    } catch (err) {
      console.error("Error al guardar:", err);
      setMensaje({
        texto: 'Error al guardar. Verificá que el endpoint del backend esté configurado.',
        tipo: 'error'
      });
    } finally {
      setGuardando(false);
    }
  };

  // =============================================
  // Resetear todos los dientes
  // =============================================
  const resetearOdontograma = () => {
    setDientes({});
    setMensaje({ texto: 'Odontograma reseteado. Guardá para confirmar los cambios.', tipo: 'info' });
  };

  // =============================================
  // Componente visual de cada diente
  // =============================================
  const DienteVisual = ({ number }) => {
    const estado = dientes[number] || 'sano';
    const config = ESTADOS_DIENTE[estado];

    return (
      <div
        className="flex flex-col items-center gap-1 group cursor-pointer hover:scale-110 transition-transform active:scale-95"
        onClick={() => manejarClickDiente(number)}
        title={`Diente ${number}: ${config.label} — Click para cambiar`}
      >
        <span className="text-[10px] font-black text-text-light group-hover:text-primary transition-colors">
          {number}
        </span>

        <div className="relative w-10 h-14 flex items-center justify-center">
          {/* Diente base */}
          <FaTooth
            className={`w-8 h-10 transition-colors duration-200 ${config.color} ${estado === 'ausente' ? 'opacity-30' : 'drop-shadow-md'}`}
            style={{ strokeWidth: '15', stroke: '#cbd5e1' }}
          />

          {/* Overlays según estado */}
          {estado === 'ausente' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-red-500 font-bold text-3xl select-none rotate-12 opacity-60">X</span>
            </div>
          )}
          {estado === 'caries' && (
            <div className="absolute w-3 h-3 bg-red-500 rounded-full top-[40%] right-[30%] shadow-sm border border-white animate-pulse"></div>
          )}
          {estado === 'obturacion' && (
            <div className="absolute w-4 h-3 bg-blue-500 rounded-sm top-[38%] left-1/2 -translate-x-1/2 border border-white shadow-sm"></div>
          )}
          {estado === 'implante' && (
            <div className="absolute w-4 h-2 bg-emerald-600 border border-white top-[45%] left-1/2 -translate-x-1/2 shadow-sm rounded-sm"></div>
          )}
          {estado === 'endodoncia' && (
            <div className="absolute w-1 h-5 bg-purple-500 bottom-[10%] left-1/2 -translate-x-1/2 rounded-full"></div>
          )}
        </div>

        {/* Grid clínico de superficies (5 caras) */}
        <div className="w-5 h-5 grid grid-cols-3 grid-rows-3 gap-px bg-secondary p-px mt-1 opacity-40 group-hover:opacity-100 transition-opacity">
          <div className="bg-white col-start-2"></div>
          <div className="bg-white col-start-1 row-start-2"></div>
          <div className={`col-start-2 row-start-2 ${estado !== 'sano' ? 'bg-current' : 'bg-white'}`} style={{ color: estado === 'caries' ? '#ef4444' : estado === 'obturacion' ? '#3b82f6' : 'white' }}></div>
          <div className="bg-white col-start-3 row-start-2"></div>
          <div className="bg-white col-start-2 row-start-3"></div>
        </div>
      </div>
    );
  };

  // =============================================
  // Contar dientes por estado (para resumen)
  // =============================================
  const contarEstados = () => {
    const conteo = {};
    CICLO_ESTADOS.forEach(e => { conteo[e] = 0; });
    Object.values(dientes).forEach(estado => {
      conteo[estado] = (conteo[estado] || 0) + 1;
    });
    conteo.sano = 32 - Object.values(dientes).filter(e => e !== 'sano').length;
    return conteo;
  };

  const conteo = contarEstados();

  // =============================================
  // RENDER
  // =============================================
  if (cargando) {
    return (
      <LayoutAdmin>
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <FaSpinner className="text-5xl text-accent-orange animate-spin" />
          <p className="text-text-light font-bold text-sm uppercase tracking-wider">Cargando odontograma...</p>
        </div>
      </LayoutAdmin>
    );
  }

  return (
    <LayoutAdmin>
      {/* BOTÓN VOLVER */}
      {id && (
        <Link
          to={`/admin/historia-clinica/${id}`}
          className="inline-flex items-center gap-2 text-text-light hover:text-primary font-bold text-sm transition-colors mb-4"
        >
          <FaArrowLeft /> Volver al Expediente
        </Link>
      )}

      <header className="mb-8" data-aos="fade-down">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-orange mb-1">Registro Médico Interactivo</p>
        <h1 className="text-3xl font-black text-primary tracking-tight">
          Odontograma {pacienteNombre && `— ${pacienteNombre}`}
        </h1>
        <p className="text-text-light font-medium mt-1 text-sm">
          Hacé clic en cada diente para cambiar su estado. Los cambios se guardan al presionar "Guardar".
        </p>
      </header>

      <main className="space-y-6" data-aos="fade-up">

        {/* MENSAJE DE FEEDBACK */}
        {mensaje.texto && (
          <div className={`flex items-center gap-3 p-4 rounded-xl text-sm font-bold border ${
            mensaje.tipo === 'success' ? 'bg-green-50 border-green-200 text-green-700' :
            mensaje.tipo === 'error' ? 'bg-red-50 border-red-200 text-red-700' :
            'bg-blue-50 border-blue-200 text-blue-700'
          }`}>
            <span className="text-lg">{mensaje.tipo === 'success' ? '✅' : mensaje.tipo === 'error' ? '❌' : 'ℹ️'}</span>
            <span>{mensaje.texto}</span>
          </div>
        )}

        {/* BARRA DE HERRAMIENTAS */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-secondary/50 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-black text-text-light uppercase tracking-wider mr-2">Leyenda:</span>
            {CICLO_ESTADOS.map(estado => (
              <div key={estado} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg hover:bg-secondary/10 transition-colors">
                <div className={`w-3 h-3 rounded-full border ${ESTADOS_DIENTE[estado].legendColor}`}></div>
                {ESTADOS_DIENTE[estado].label}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={resetearOdontograma}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border border-secondary hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all"
            >
              <FaUndo /> Resetear
            </button>
            <button
              onClick={guardarOdontograma}
              disabled={guardando || !id}
              className="flex items-center gap-2 px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-md text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {guardando ? <FaSpinner className="animate-spin" /> : <FaSave />}
              {guardando ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </div>

        {/* RESUMEN RÁPIDO */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {CICLO_ESTADOS.map(estado => (
            <div key={estado} className="bg-white rounded-xl p-3 text-center border border-secondary/30 shadow-sm">
              <p className="text-2xl font-black text-primary">{conteo[estado]}</p>
              <p className="text-[10px] font-bold text-text-light uppercase tracking-wider">{ESTADOS_DIENTE[estado].label}</p>
            </div>
          ))}
        </div>

        {/* =============================================
            EL ODONTOGRAMA PRINCIPAL
            ============================================= */}
        <div className="bg-white rounded-4xl p-8 lg:p-12 shadow-md border border-secondary/50 overflow-x-auto custom-scrollbar">
          <div className="min-w-[800px] flex flex-col items-center gap-12 relative">
            {/* Líneas divisorias en el centro */}
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-secondary/30"></div>
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-secondary/30"></div>

            {/* Cuadrante labels */}
            <div className="absolute top-2 left-4 text-[10px] font-black text-primary/30 uppercase">Q1</div>
            <div className="absolute top-2 right-4 text-[10px] font-black text-primary/30 uppercase">Q2</div>
            <div className="absolute bottom-2 left-4 text-[10px] font-black text-primary/30 uppercase">Q4</div>
            <div className="absolute bottom-2 right-4 text-[10px] font-black text-primary/30 uppercase">Q3</div>

            {/* Top Row (Arcada Superior) */}
            <div>
              <p className="text-[10px] font-black text-center text-text-light uppercase tracking-widest mb-3">Arcada Superior</p>
              <div className="flex justify-center gap-1 sm:gap-2">
                {topRow.map(tooth => <DienteVisual key={tooth} number={tooth} />)}
              </div>
            </div>

            {/* Bottom Row (Arcada Inferior) */}
            <div>
              <div className="flex justify-center gap-1 sm:gap-2">
                {bottomRow.map(tooth => <DienteVisual key={tooth} number={tooth} />)}
              </div>
              <p className="text-[10px] font-black text-center text-text-light uppercase tracking-widest mt-3">Arcada Inferior</p>
            </div>
          </div>
        </div>

        {/* NOTA INFORMATIVA */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex items-start gap-4">
          <FaInfoCircle className="text-blue-500 text-xl mt-0.5 shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-blue-900 mb-1">Cómo usar el Odontograma</h4>
            <p className="text-xs text-blue-800/80 leading-relaxed font-medium">
              Cada clic en un diente avanza su estado en el ciclo: <strong>Sano → Caries → Obturación → Ausente → Implante → Endodoncia → Sano</strong>.
              Los cambios se guardan en la base de datos al presionar el botón "Guardar". Se utiliza la nomenclatura FDI (Federación Dental Internacional).
            </p>
          </div>
        </div>

      </main>
    </LayoutAdmin>
  );
};

export default AdminOdontograma;
