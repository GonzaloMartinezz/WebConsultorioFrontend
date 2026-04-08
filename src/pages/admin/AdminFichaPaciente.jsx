import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import LayoutAdmin from "../../components/layouts/LayoutAdmin.jsx";
import api from '../../api/axios.js';
import {
  FaArrowLeft, FaSave, FaTooth, FaUserInjured, FaCalendarCheck,
  FaSpinner, FaUndo, FaInfoCircle
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
  sano:       { label: 'Sano',       color: 'text-[#f0f0f0]', legendColor: 'bg-gray-200 border-gray-300' },
  caries:     { label: 'Caries',     color: 'text-red-400',   legendColor: 'bg-red-500 border-red-600' },
  obturacion: { label: 'Obturación', color: 'text-blue-400',  legendColor: 'bg-blue-500 border-blue-600' },
  ausente:    { label: 'Ausente',    color: 'text-secondary/30', legendColor: 'bg-gray-400 border-gray-500' },
  implante:   { label: 'Implante',   color: 'text-emerald-500', legendColor: 'bg-emerald-500 border-emerald-600' },
  endodoncia: { label: 'Endodoncia', color: 'text-purple-400',  legendColor: 'bg-purple-500 border-purple-600' },
};

const CICLO_ESTADOS = ['sano', 'caries', 'obturacion', 'ausente', 'implante', 'endodoncia'];

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

  // =============================================
  // ODONTOGRAMA: Click en diente (ciclo de estados)
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
  };

  const resetearOdontograma = () => {
    setDientes({});
  };

  // =============================================
  // GUARDAR TODO
  // =============================================
  const handleGuardarFicha = async () => {
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
    }
  };

  // =============================================
  // COMPONENTE VISUAL DE DIENTE (idéntico al avanzado)
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
          <FaTooth
            className={`w-8 h-10 transition-colors duration-200 ${config.color} ${estado === 'ausente' ? 'opacity-30' : 'drop-shadow-md'}`}
            style={{ strokeWidth: '15', stroke: '#cbd5e1' }}
          />

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

  // Contar dientes por estado
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

  if (cargando) return <LayoutAdmin><div className="flex flex-col items-center justify-center py-32 gap-4"><FaSpinner className="text-5xl text-accent-orange animate-spin" /><p className="text-text-light font-bold text-sm uppercase tracking-wider">Cargando legajo médico...</p></div></LayoutAdmin>;

  return (
    <LayoutAdmin>
      {/* ========== BOTONERA SUPERIOR ========== */}
      <div className="mb-6 flex justify-between items-center">
        <Link to="/admin/lista-pacientes" className="flex items-center gap-2 text-text-light font-bold hover:text-primary transition-colors">
          <FaArrowLeft /> Volver al Directorio
        </Link>
        <button onClick={handleGuardarFicha} className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-black shadow-lg flex items-center gap-2 transition-all">
          <FaSave /> Guardar Toda la Ficha
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
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-secondary/40 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-black text-primary flex items-center gap-2">
              <FaTooth /> Odontograma Interactivo
            </h2>
            <p className="text-sm text-text-light mt-1">
              Cada clic avanza el estado: <strong>Sano → Caries → Obturación → Ausente → Implante → Endodoncia</strong>
            </p>
          </div>
          <button onClick={resetearOdontograma} className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border border-secondary hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all">
            <FaUndo /> Resetear
          </button>
        </div>

        {/* Leyenda */}
        <div className="flex flex-wrap gap-2 items-center mb-6 bg-background/50 p-3 rounded-xl border border-secondary/30">
          <span className="text-xs font-black text-text-light uppercase tracking-wider mr-2">Leyenda:</span>
          {CICLO_ESTADOS.map(estado => (
            <div key={estado} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg">
              <div className={`w-3 h-3 rounded-full border ${ESTADOS_DIENTE[estado].legendColor}`}></div>
              {ESTADOS_DIENTE[estado].label}
            </div>
          ))}
        </div>

        {/* Resumen rápido */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
          {CICLO_ESTADOS.map(estado => (
            <div key={estado} className="bg-background/50 rounded-xl p-3 text-center border border-secondary/30">
              <p className="text-2xl font-black text-primary">{conteo[estado]}</p>
              <p className="text-[10px] font-bold text-text-light uppercase tracking-wider">{ESTADOS_DIENTE[estado].label}</p>
            </div>
          ))}
        </div>

        {/* Mapa dental con ambas arcadas */}
        <div className="bg-background/30 rounded-2xl p-6 lg:p-10 overflow-x-auto custom-scrollbar">
          <div className="min-w-[750px] flex flex-col items-center gap-10 relative">
            {/* Líneas divisorias */}
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-secondary/30"></div>
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-secondary/30"></div>

            {/* Cuadrante labels */}
            <div className="absolute top-2 left-4 text-[10px] font-black text-primary/30 uppercase">Q1</div>
            <div className="absolute top-2 right-4 text-[10px] font-black text-primary/30 uppercase">Q2</div>
            <div className="absolute bottom-2 left-4 text-[10px] font-black text-primary/30 uppercase">Q4</div>
            <div className="absolute bottom-2 right-4 text-[10px] font-black text-primary/30 uppercase">Q3</div>

            {/* Arcada Superior */}
            <div>
              <p className="text-[10px] font-black text-center text-text-light uppercase tracking-widest mb-3">Arcada Superior</p>
              <div className="flex justify-center gap-1 sm:gap-2">
                {topRow.map(tooth => <DienteVisual key={tooth} number={tooth} />)}
              </div>
            </div>

            {/* Arcada Inferior */}
            <div>
              <div className="flex justify-center gap-1 sm:gap-2">
                {bottomRow.map(tooth => <DienteVisual key={tooth} number={tooth} />)}
              </div>
              <p className="text-[10px] font-black text-center text-text-light uppercase tracking-widest mt-3">Arcada Inferior</p>
            </div>
          </div>
        </div>

        {/* Nota informativa */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3 mt-6">
          <FaInfoCircle className="text-blue-500 text-lg mt-0.5 shrink-0" />
          <p className="text-xs text-blue-800/80 leading-relaxed font-medium">
            Se utiliza la nomenclatura <strong>FDI</strong> (Federación Dental Internacional). Los cambios se guardan al presionar "Guardar Toda la Ficha".
          </p>
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
