import { useState, useEffect } from 'react';
import api from '../../api/axios.js';
import { FaTooth, FaTimes, FaSave, FaUndo, FaSearch, FaUserInjured, FaCheckCircle, FaSpinner } from 'react-icons/fa';

const OdontogramaAvanzado = () => {
  // Estados para el Paciente
  const [pacientes, setPacientes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);

  // Estados para el Odontograma
  const [odontograma, setOdontograma] = useState([]);
  const [dienteActivo, setDienteActivo] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [cargandoFicha, setCargandoFicha] = useState(false);

  // Mapeo anatómico de los 32 dientes (FDI)
  const superiorDerecha = [18, 17, 16, 15, 14, 13, 12, 11];
  const superiorIzquierda = [21, 22, 23, 24, 25, 26, 27, 28];
  const inferiorDerecha = [48, 47, 46, 45, 44, 43, 42, 41];
  const inferiorIzquierda = [31, 32, 33, 34, 35, 36, 37, 38];

  const estadosDiente = [
    { nombre: 'Sano', color: 'bg-green-500', bgClaro: 'bg-green-50 text-green-700 border-green-400' },
    { nombre: 'Caries', color: 'bg-red-500', bgClaro: 'bg-red-50 text-red-700 border-red-500' },
    { nombre: 'Obstrucción', color: 'bg-blue-500', bgClaro: 'bg-blue-50 text-blue-700 border-blue-500' },
    { nombre: 'Ausente', color: 'bg-gray-800', bgClaro: 'bg-gray-100 text-gray-500 border-gray-400 opacity-60 line-through' },
    { nombre: 'Implante', color: 'bg-purple-500', bgClaro: 'bg-purple-50 text-purple-700 border-purple-500' },
    { nombre: 'Endodoncia', color: 'bg-orange-500', bgClaro: 'bg-orange-50 text-orange-700 border-orange-500' },
    { nombre: 'Falta', color: 'bg-gray-800', bgClaro: 'bg-gray-100 text-gray-500 border-gray-400 opacity-60 line-through' },
  ];

  // 1. Cargar pacientes al iniciar
  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const res = await api.get('/pacientes');
        setPacientes(res.data);
      } catch (error) {
        console.error("Error al cargar pacientes", error);
      }
    };
    fetchPacientes();
  }, []);

  // 2. Filtrar pacientes en tiempo real
  const pacientesFiltrados = busqueda === '' ? [] : pacientes.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
    (p.dni && p.dni.includes(busqueda))
  );

  // 3. Seleccionar Paciente
  const seleccionarPaciente = async (paciente) => {
    setPacienteSeleccionado(paciente);
    setBusqueda('');
    setCargandoFicha(true);
    try {
      const res = await api.get(`/fichas/${paciente._id}`);
      // El componente espera formato {numero, estado}
      setOdontograma(res.data.odontograma || []);
    } catch (error) {
      console.error("Error al cargar odontograma previo", error);
      setOdontograma([]);
    } finally {
      setCargandoFicha(false);
    }
  };

  // 4. Lógica de Anatomía (Diferencia de tamaños por diente)
  const obtenerAnatomia = (num) => {
    const digito = num % 10;
    if (digito === 1 || digito === 2) return { tipo: 'Incisivo', ancho: 'w-8 md:w-10' };
    if (digito === 3) return { tipo: 'Canino', ancho: 'w-9 md:w-11' };
    if (digito === 4 || digito === 5) return { tipo: 'Premolar', ancho: 'w-10 md:w-12' };
    if (digito >= 6) return { tipo: 'Molar', ancho: 'w-12 md:w-14' };
  };

  // 5. Aplicar diagnóstico
  const aplicarEstado = (estadoElegido) => {
    setOdontograma(prev => {
      const resto = (prev || []).filter(d => d.numero !== dienteActivo.numero);
      if (estadoElegido === 'Sano') return resto;
      return [...resto, { numero: dienteActivo.numero, estado: estadoElegido }];
    });
    setDienteActivo(null);
  };

  const obtenerClasesDiente = (num) => {
    const registro = (odontograma || []).find(d => d.numero === num);
    if (!registro) return 'bg-white text-text border-secondary/30 hover:border-accent-orange';
    const estadoInfo = estadosDiente.find(e => e.nombre === registro.estado);
    return estadoInfo ? estadoInfo.bgClaro : 'bg-white';
  };

  // 6. Guardar en Base de Datos
  const guardarOdontograma = async () => {
    if (!pacienteSeleccionado) return;
    setGuardando(true);
    try {
      await api.put(`/fichas/${pacienteSeleccionado._id}`, { odontograma });
      // Notification visual (toast or similar would be better, but alert is provided in the prompt)
      alert("¡Éxito! Odontograma guardado correctamente en la ficha médica.");
    } catch (error) {
      console.error("Error al guardar", error);
      alert("Hubo un error al guardar. Verificá tu conexión.");
    } finally {
      setGuardando(false);
    }
  };

  // Componente del Diente Individual
  const RenderDiente = ({ num, esSuperior }) => {
    const anatomia = obtenerAnatomia(num);
    return (
      <button
        onClick={() => setDienteActivo({ numero: num, anatomia })}
        className={`group relative flex flex-col items-center justify-center h-16 md:h-20 border-2 rounded-xl transition-all duration-300 transform hover:scale-110 hover:z-10 shadow-sm hover:shadow-xl ${anatomia.ancho} ${obtenerClasesDiente(num)}`}
        title={`Pieza ${num} - ${anatomia.tipo}`}
      >
        <span className="text-sm md:text-base font-black mb-1">{num}</span>
        <FaTooth className={`${anatomia.tipo === 'Molar' ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} opacity-80 ${esSuperior ? '' : 'rotate-180'}`} />
      </button>
    );
  };

  return (
    <div className="max-w-[1400px] mx-auto h-[calc(100vh-140px)] flex flex-col gap-4">

      {/* ======================================================== */}
      {/* PANEL SUPERIOR: BUSCADOR Y FICHA DEL PACIENTE */}
      {/* ======================================================== */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-secondary/20 p-4 shrink-0 flex flex-col md:flex-row gap-6 items-center z-20">

        {/* Buscador inteligente */}
        <div className="w-full md:w-1/3 relative">
          <div className="relative">
            <FaSearch className="absolute left-4 top-3.5 text-text-light opacity-50" />
            <input
              type="text"
              placeholder="Buscar por Nombre o DNI..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-background/50 border border-secondary/40 rounded-xl focus:outline-none focus:border-primary font-bold text-sm tracking-tight"
            />
          </div>

          {/* Resultados de búsqueda flotantes */}
          {pacientesFiltrados.length > 0 && (
            <div className="absolute top-14 left-0 w-full bg-white border border-secondary/20 shadow-2xl rounded-2xl overflow-hidden max-h-60 overflow-y-auto animate-fade-in z-[60]">
              {pacientesFiltrados.map(p => (
                <button
                  key={p._id}
                  onClick={() => seleccionarPaciente(p)}
                  className="w-full text-left px-5 py-4 hover:bg-primary/5 border-b border-secondary/10 last:border-0 flex items-center justify-between group transition-colors"
                >
                  <div className="flex flex-col">
                    <span className="font-black text-primary text-sm uppercase tracking-tight group-hover:text-accent-orange transition-colors">{p.nombre} {p.apellido}</span>
                    <span className="text-[10px] font-bold text-text-light uppercase tracking-widest mt-0.5">DNI: {p.dni || 'S/R'}</span>
                  </div>
                  <FaUserInjured className="text-secondary/40 group-hover:text-accent-orange transition-colors" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tarjeta del Paciente Seleccionado */}
        <div className="w-full md:w-2/3 flex items-center justify-between bg-primary/5 border border-primary/20 rounded-2xl p-4 transition-all overflow-hidden relative">
          {pacienteSeleccionado ? (
            <>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center text-xl font-black shadow-lg shadow-primary/20">
                  {pacienteSeleccionado.nombre.charAt(0)}
                </div>
                <div>
                  <h3 className="font-black text-xl text-primary leading-none flex items-center gap-2 uppercase tracking-tighter">
                    {pacienteSeleccionado.nombre} {pacienteSeleccionado.apellido}
                    <FaCheckCircle className="text-green-500 text-sm" />
                  </h3>
                  <p className="text-[10px] font-black text-text-light uppercase tracking-[0.2em] mt-2 opacity-70">Historia Clínica Activa | {pacienteSeleccionado.dni || 'Sin DNI'}</p>
                </div>
              </div>
              <button
                onClick={() => setPacienteSeleccionado(null)}
                className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl transition-all border border-red-100"
              >
                Cambiar Paciente
              </button>
            </>
          ) : (
            <div className="flex items-center gap-4 text-text-light mx-auto animate-pulse">
              <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                <FaUserInjured className="text-xl opacity-30" />
              </div>
              <p className="font-black text-[10px] uppercase tracking-[0.2em]">Busca y selecciona un paciente para comenzar</p>
            </div>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* ODONTOGRAMA (Bloqueado si no hay paciente) */}
      {/* ======================================================== */}
      <div className={`flex-1 bg-white rounded-[2.5rem] shadow-xl border border-secondary/50 flex flex-col relative overflow-hidden transition-all duration-500 ${!pacienteSeleccionado ? 'opacity-40 grayscale pointer-events-none' : ''}`}>

        {/* Cabecera del área clínica */}
        <div className="flex justify-between items-center p-6 md:px-10 border-b border-secondary/20 shrink-0 bg-background/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent-orange/10 rounded-xl flex items-center justify-center">
              <FaTooth className="text-accent-orange text-xl" />
            </div>
            <h2 className="text-lg font-black text-primary uppercase tracking-tight">
              Odontograma Digital <span className="text-text-light/40 ml-2 font-bold">— Piezas 11 a 48</span>
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setOdontograma([])}
              className="bg-white hover:bg-red-50 text-text-light px-5 py-2.5 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center gap-2 border border-secondary/30 shadow-sm active:scale-95"
            >
              <FaUndo className="text-xs" /> Limpiar
            </button>
            <button
              onClick={guardarOdontograma}
              disabled={guardando}
              className="bg-accent-orange hover:brightness-110 text-white px-8 py-2.5 rounded-xl font-black uppercase tracking-[0.15em] text-[10px] shadow-lg shadow-accent-orange/20 transition-all flex items-center gap-2 disabled:opacity-50 active:scale-95"
            >
              {guardando ? <FaSpinner className="animate-spin" /> : <FaSave className="text-sm" />}
              {guardando ? 'Guardando...' : 'Guardar Ficha'}
            </button>
          </div>
        </div>

        {/* Grilla Dental (Optimizado para Desktop) */}
        <div className="flex-1 overflow-y-auto p-6 md:px-12 flex flex-col justify-center bg-slate-50/20">

          {cargandoFicha ? (
            <div className="flex flex-col items-center justify-center gap-4 py-20">
              <FaSpinner className="text-4xl text-accent-orange animate-spin" />
              <p className="font-black text-text-light text-[10px] uppercase tracking-widest">Cargando antecedentes...</p>
            </div>
          ) : (
            <>
              {/* Maxilar Superior */}
              <div className="mb-12 flex flex-col items-center" data-aos="fade-down">
                <div className="flex gap-1 md:gap-3 border-b-2 border-dashed border-secondary/30 pb-10">
                  <div className="flex gap-1 md:gap-1.5 pr-1 md:pr-3 border-r-4 border-accent-orange/20">
                    {superiorDerecha.map(num => <RenderDiente key={num} num={num} esSuperior={true} />)}
                  </div>
                  <div className="flex gap-1 md:gap-1.5 pl-1 md:pl-3">
                    {superiorIzquierda.map(num => <RenderDiente key={num} num={num} esSuperior={true} />)}
                  </div>
                </div>
                <p className="text-[10px] font-black text-text-light uppercase tracking-[0.5em] mt-4 opacity-50">Maxilar Superior (V Arcada)</p>
              </div>

              {/* Maxilar Inferior */}
              <div className="flex flex-col items-center" data-aos="fade-up">
                <p className="text-[10px] font-black text-text-light uppercase tracking-[0.5em] mb-4 opacity-50">Maxilar Inferior (V Arcada)</p>
                <div className="flex gap-1 md:gap-3 border-t-2 border-dashed border-secondary/30 pt-10">
                  <div className="flex gap-1 md:gap-1.5 pr-1 md:pr-3 border-r-4 border-accent-orange/20">
                    {inferiorDerecha.map(num => <RenderDiente key={num} num={num} esSuperior={false} />)}
                  </div>
                  <div className="flex gap-1 md:gap-1.5 pl-1 md:pl-3">
                    {inferiorIzquierda.map(num => <RenderDiente key={num} num={num} esSuperior={false} />)}
                  </div>
                </div>
              </div>
            </>
          )}

        </div>

        {/* Leyenda Footer */}
        <div className="bg-white/50 backdrop-blur-md p-6 border-t border-secondary/20 flex flex-wrap justify-center gap-6 md:gap-12 shrink-0">
          {estadosDiente.map(est => (
            <div key={est.nombre} className="flex items-center gap-3">
              <span className={`w-3.5 h-3.5 rounded-full shadow-md ${est.color} ring-2 ring-offset-2 ring-transparent hover:ring-secondary/20 transition-all`}></span>
              <span className="font-black text-[10px] text-text-light uppercase tracking-widest">{est.nombre}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* MODAL DIAGNÓSTICO */}
      {/* ======================================================== */}
      {dienteActivo && (
        <div className="fixed inset-0 bg-primary/40 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-sm shadow-2xl border border-secondary relative animate-scale-in">
            <button onClick={() => setDienteActivo(null)} className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-xl bg-secondary/10 text-primary hover:bg-red-500 hover:text-white transition-all">
              <FaTimes className="text-xl" />
            </button>

            <div className="flex items-center gap-5 mb-8 border-b border-secondary/20 pb-6">
              <div className="w-16 h-16 bg-accent-orange text-white rounded-2xl flex items-center justify-center shadow-lg shadow-accent-orange/20">
                <FaTooth className="text-4xl" />
              </div>
              <div>
                <h3 className="font-black text-3xl text-primary tracking-tighter leading-none">Pieza {dienteActivo.numero}</h3>
                <p className="text-accent-orange font-black text-[10px] uppercase tracking-[0.2em] mt-2">{dienteActivo.anatomia?.tipo}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {estadosDiente.map(estado => (
                <button
                  key={estado.nombre}
                  onClick={() => aplicarEstado(estado.nombre)}
                  className={`flex items-center gap-3 py-4 px-4 rounded-xl font-black text-[10px] uppercase tracking-wider border-2 transition-all duration-300 active:scale-95
                    ${estado.nombre === 'Sano'
                      ? 'border-green-400 bg-green-50 text-green-700 hover:bg-green-500 hover:text-white'
                      : `border-secondary/20 text-text-light hover:${estado.color} hover:border-transparent hover:text-white hover:shadow-lg shadow-sm`
                    }`}
                >
                  <span className={`w-2 h-2 rounded-full ${estado.color}`}></span>
                  {estado.nombre}
                </button>
              ))}
            </div>
            <p className="mt-8 text-[9px] text-text-light text-center font-bold uppercase tracking-widest leading-relaxed opacity-60">
              Seleccioná el estado clínico para aplicarlo a la pieza {dienteActivo.numero}.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OdontogramaAvanzado;
