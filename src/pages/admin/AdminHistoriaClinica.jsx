import { useState, useEffect } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import LayoutAdmin from '../../components/layouts/LayoutAdmin';
import api from '../../api/axios';
import { FaSearch, FaUserInjured, FaPhone, FaEnvelope, FaIdCard, FaFileMedical, FaUpload, FaFilePdf, FaTooth, FaSpinner, FaCalendarCheck, FaSave, FaPlus } from 'react-icons/fa';

const AdminHistoriaClinica = () => {
  const location = useLocation();
  const { id } = useParams();
  const [pacientes, setPacientes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [pacienteActivo, setPacienteActivo] = useState(null);
  const [pestañaActiva, setPestañaActiva] = useState('evolucion');
  const [cargando, setCargando] = useState(true);

  // Estado para nueva evolución
  const [nuevaEvolucion, setNuevaEvolucion] = useState({ profesional: 'Dr. Adolfo Martinez', tratamiento: '' });
  const [guardandoEvolucion, setGuardandoEvolucion] = useState(false);
  const [mensajeGuardado, setMensajeGuardado] = useState('');

  // Cargar lista de pacientes y manejar selección inicial
  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        setCargando(true);
        const res = await api.get('/pacientes');
        const listaPacientes = res.data;
        setPacientes(listaPacientes);

        // Prioridad 1: ID en la URL
        if (id) {
            const encontrado = listaPacientes.find(p => p._id === id);
            if (encontrado) setPacienteActivo(encontrado);
        } 
        // Prioridad 2: Estado desde la Agenda
        else if (location.state?.nombreBusqueda) {
          setBusqueda(location.state.nombreBusqueda);
          const encontrado = listaPacientes.find(p => 
            p.nombre.toLowerCase().includes(location.state.nombreBusqueda.toLowerCase()) ||
            p.apellido.toLowerCase().includes(location.state.nombreBusqueda.toLowerCase())
          );
          if (encontrado) setPacienteActivo(encontrado);
        }
      } catch (error) {
        console.error("Error al cargar pacientes", error);
        // Fallback: intentar con endpoint alternativo
        try {
          const res2 = await api.get('/auth/pacientes');
          setPacientes(res2.data);
          if (id) {
            const encontrado = res2.data.find(p => p._id === id);
            if (encontrado) setPacienteActivo(encontrado);
          }
        } catch (err2) {
          console.error("Fallback también falló:", err2);
        }
      } finally {
        setCargando(false);
      }
    };
    fetchPacientes();
  }, [id, location.state]);

  const pacientesFiltrados = busqueda === '' ? [] : pacientes.filter(p => 
    (p.nombre || '').toLowerCase().includes(busqueda.toLowerCase()) || 
    (p.apellido || '').toLowerCase().includes(busqueda.toLowerCase()) ||
    (p.dni && p.dni.includes(busqueda)) ||
    (p.email && p.email.toLowerCase().includes(busqueda.toLowerCase()))
  );

  const seleccionarPaciente = (paciente) => {
    setPacienteActivo(paciente);
    setBusqueda('');
    setMensajeGuardado('');
  };

  // Guardar nueva evolución
  const guardarEvolucion = async () => {
    if (!pacienteActivo || !nuevaEvolucion.tratamiento.trim()) return;
    setGuardandoEvolucion(true);
    try {
      const res = await api.post(`/pacientes/${pacienteActivo._id}/historia`, {
        profesional: nuevaEvolucion.profesional,
        tratamiento: nuevaEvolucion.tratamiento
      });
      
      // Actualizar el paciente activo con la nueva historia
      setPacienteActivo(prev => ({
        ...prev,
        historiaClinica: res.data.historia || [...(prev.historiaClinica || []), { profesional: nuevaEvolucion.profesional, tratamiento: nuevaEvolucion.tratamiento, fecha: new Date() }]
      }));
      
      setNuevaEvolucion({ profesional: nuevaEvolucion.profesional, tratamiento: '' });
      setMensajeGuardado('✅ Evolución guardada exitosamente');
      setTimeout(() => setMensajeGuardado(''), 4000);
    } catch (error) {
      console.error("Error al guardar evolución:", error);
      setMensajeGuardado('❌ Error al guardar. Verificá la conexión.');
      setTimeout(() => setMensajeGuardado(''), 4000);
    } finally {
      setGuardandoEvolucion(false);
    }
  };

  return (
    <LayoutAdmin>
      <div className="max-w-[1400px] mx-auto flex flex-col h-[calc(100vh-140px)] gap-5">
        
        {/* ================= BARRA SUPERIOR DE BÚSQUEDA ================= */}
        <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-secondary/10 shrink-0 relative z-20 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="w-10 h-10 bg-primary/5 rounded-2xl flex items-center justify-center shrink-0">
              <FaFileMedical className="text-primary text-base" />
            </div>
            <div>
              <h1 className="text-base font-black text-primary">Historia Clínica</h1>
              <p className="text-[9px] font-black text-text-light uppercase tracking-[0.2em]">Centro Odontológico C&M</p>
            </div>
          </div>
          <div className="w-full md:flex-1 md:max-w-md relative">
            <FaSearch className="absolute left-4 top-3.5 text-text-light/40 text-sm" />
            <input 
              type="text" 
              placeholder="Buscar por nombre, DNI o email..." 
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-background/50 border border-secondary/10 rounded-2xl focus:outline-none focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/10 text-sm font-bold tracking-tight transition-all"
            />
            {pacientesFiltrados.length > 0 && (
              <div className="absolute top-14 left-0 w-full bg-white border border-secondary/10 shadow-2xl rounded-2xl overflow-hidden max-h-64 overflow-y-auto z-50">
                {pacientesFiltrados.map(p => (
                  <button 
                    key={p._id} 
                    onClick={() => seleccionarPaciente(p)} 
                    className="w-full text-left px-5 py-3.5 hover:bg-primary/5 border-b border-secondary/5 flex justify-between items-center group transition-colors last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center text-[9px] font-black text-primary shrink-0">
                        {p.nombre?.charAt(0)}{p.apellido?.charAt(0)}
                      </div>
                      <div>
                        <p className="font-black text-primary text-sm">{p.nombre} {p.apellido}</p>
                        <p className="text-[9px] font-bold text-text-light uppercase tracking-widest">DNI: {p.dni || 'S/D'} · {p.email || 'Sin email'}</p>
                      </div>
                    </div>
                    <FaUserInjured className="text-secondary/30 group-hover:text-accent-orange transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            )}
          </div>
          {pacienteActivo && (
            <button onClick={() => setPacienteActivo(null)} className="text-[10px] font-black text-text-light uppercase tracking-widest hover:text-red-500 transition-colors ml-auto shrink-0">
              Cambiar paciente
            </button>
          )}
        </div>

        {/* ================= CONTENIDO PRINCIPAL ================= */}
        {cargando ? (
            <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-[2.5rem] shadow-sm border border-secondary/20 animate-pulse">
                <FaSpinner className="text-4xl text-accent-orange animate-spin mb-4" />
                <p className="font-black text-text-light text-[10px] uppercase tracking-[0.2em]">Cargando base de datos...</p>
            </div>
        ) : !pacienteActivo ? (
          <div className="flex-1 bg-white rounded-[2.5rem] shadow-sm border border-secondary/20 flex flex-col items-center justify-center opacity-70">
            <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mb-6">
              <FaSearch className="text-4xl text-primary/20" />
            </div>
            <h2 className="text-2xl font-black text-primary mb-2 uppercase tracking-tighter">Ningún paciente seleccionado</h2>
            <p className="text-text-light font-bold text-sm tracking-widest uppercase opacity-60">Usa la barra superior para buscar un expediente</p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col xl:flex-row gap-5 min-h-0 animate-fade-in">
            
            {/* COLUMNA IZQUIERDA: TARJETA DEL PACIENTE */}
            <div className="w-full xl:w-[280px] bg-white rounded-[2rem] shadow-sm border border-secondary/10 overflow-hidden shrink-0">
              <div className="bg-gradient-to-br from-primary to-[#3a2e25] p-5 md:p-6 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,120,0,0.15),transparent_60%)] pointer-events-none"></div>
                <div className="relative z-10 flex flex-row xl:flex-col items-center xl:items-start gap-4 xl:gap-0">
                  <div className="w-12 h-12 xl:w-14 xl:h-14 bg-white/15 rounded-2xl flex items-center justify-center text-white text-xl xl:text-2xl font-black mb-0 xl:mb-3 border border-white/20 shrink-0">
                    {(pacienteActivo.nombre || '?').charAt(0)}{(pacienteActivo.apellido || '').charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-sm md:text-base font-black text-white leading-tight">{pacienteActivo.nombre} {pacienteActivo.apellido}</h2>
                    <p className="text-[8px] md:text-[9px] font-black text-accent-orange uppercase tracking-[0.3em] mt-1">Paciente Activo</p>
                  </div>
                </div>
              </div>
              <div className="p-4 md:p-5 space-y-3 overflow-y-auto custom-scrollbar max-h-[300px] xl:max-h-none">
                {[
                  { icon: FaIdCard, label: 'DNI', value: pacienteActivo.dni || 'No registrado', color: 'text-primary' },
                  { icon: FaPhone, label: 'Teléfono', value: pacienteActivo.telefono || 'No registrado', color: 'text-green-500' },
                  { icon: FaEnvelope, label: 'Email', value: pacienteActivo.email || 'No registrado', color: 'text-blue-500', small: true },
                ].map(({ icon: Icon, label, value, color, small }) => (
                  <div key={label} className="bg-background/40 p-3.5 rounded-2xl border border-secondary/5 hover:bg-white hover:shadow-sm transition-all">
                    <p className="text-[8px] font-black text-text-light/50 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                      <Icon className={color} /> {label}
                    </p>
                    <p className={`font-black text-text ${small ? 'text-xs break-all' : 'text-sm'} tracking-tight`}>{value}</p>
                  </div>
                ))}
                {pacienteActivo.estado && (
                  <div className="bg-background/40 p-3.5 rounded-2xl border border-secondary/5">
                    <p className="text-[8px] font-black text-text-light/50 uppercase tracking-widest mb-1">Estado Clínico</p>
                    <span className={`inline-block px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider ${
                      pacienteActivo.estado === 'Tratamiento Activo' ? 'bg-blue-100 text-blue-700' :
                      pacienteActivo.estado === 'Alta' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>{pacienteActivo.estado}</span>
                  </div>
                )}
                <div className="space-y-2 pt-2 border-t border-secondary/10">
                  <Link 
                    to={`/admin/odontograma-avanzado/${pacienteActivo._id}`}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-2xl font-black text-[9px] uppercase tracking-widest shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                  >
                    <FaTooth /> Ver Odontograma
                  </Link>
                  <Link 
                    to={`/admin/paciente/${pacienteActivo._id}`}
                    className="w-full bg-primary/5 text-primary border border-primary/10 py-3 rounded-2xl font-black text-[9px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <FaFileMedical /> Ver Ficha Completa
                  </Link>
                </div>
              </div>
            </div>

            {/* COLUMNA DERECHA: PESTAÑAS MÉDICAS */}
            <div className="w-full xl:w-2/3 bg-white rounded-2xl shadow-sm border border-secondary/20 flex flex-col overflow-hidden">
              {/* Menú de Pestañas */}
              <div className="flex flex-row border-b border-secondary/20 bg-background/30 shrink-0">
                <button 
                    onClick={() => setPestañaActiva('evolucion')} 
                    className={`flex-1 py-3 md:py-4 font-black text-[9px] md:text-[10px] uppercase tracking-[0.1em] md:tracking-[0.2em] flex items-center justify-center gap-2 md:gap-3 transition-all ${pestañaActiva === 'evolucion' ? 'bg-white text-primary border-b-4 border-primary' : 'text-text-light hover:bg-white/50 opacity-60'}`}
                >
                  <FaFileMedical className="text-base md:text-lg" /> <span className="hidden sm:inline">Evolución</span>
                </button>
                <button 
                    onClick={() => setPestañaActiva('archivos')} 
                    className={`flex-1 py-3 md:py-4 font-black text-[9px] md:text-[10px] uppercase tracking-[0.1em] md:tracking-[0.2em] flex items-center justify-center gap-2 md:gap-3 transition-all ${pestañaActiva === 'archivos' ? 'bg-white text-primary border-b-4 border-accent-orange' : 'text-text-light hover:bg-white/50 opacity-60'}`}
                >
                  <FaUpload className="text-base md:text-lg" /> <span className="hidden sm:inline">Rx y Archivos</span>
                </button>
              </div>

              {/* Contenido de la Pestaña (Scrollable) */}
              <div className="flex-1 overflow-y-auto p-6 bg-slate-50/20 custom-scrollbar">
                
                {pestañaActiva === 'evolucion' && (
                  <div className="space-y-5">
                    {/* Mensaje de guardado */}
                    {mensajeGuardado && (
                      <div className={`p-3 rounded-xl text-sm font-bold ${mensajeGuardado.includes('✅') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                        {mensajeGuardado}
                      </div>
                    )}

                    {/* Nueva entrada clínica */}
                    <div className="bg-background/30 p-5 rounded-[2rem] border border-secondary/10 shadow-sm">
                      <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <span className="w-1 h-4 bg-accent-orange rounded-full"></span> Nueva Entrada Clínica
                      </p>
                      <div className="mb-3">
                        <label className="text-[9px] font-black text-text-light/50 uppercase tracking-[0.15em] mb-1.5 block">Profesional</label>
                        <select 
                          value={nuevaEvolucion.profesional} 
                          onChange={e => setNuevaEvolucion({...nuevaEvolucion, profesional: e.target.value})}
                          className="w-full px-4 py-2.5 bg-white rounded-2xl border border-secondary/10 font-bold text-sm text-primary focus:outline-none focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/10 appearance-none cursor-pointer transition-all"
                        >
                          <option value="Dr. Adolfo Martínez">Dr. Adolfo Martínez</option>
                          <option value="Dra. Erina Carcara">Dra. Erina Carcara</option>
                        </select>
                      </div>
                      <textarea 
                        placeholder="Evolución, tratamiento realizado o notas clínicas..." 
                        value={nuevaEvolucion.tratamiento}
                        onChange={e => setNuevaEvolucion({...nuevaEvolucion, tratamiento: e.target.value})}
                        className="w-full h-28 bg-white rounded-2xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-accent-orange/10 focus:border-accent-orange border border-secondary/10 font-medium text-sm text-primary placeholder:text-text-light/40 transition-all"
                      ></textarea>
                      <div className="flex justify-end mt-3">
                        <button 
                          onClick={guardarEvolucion}
                          disabled={guardandoEvolucion || !nuevaEvolucion.tratamiento.trim()}
                          className="w-full md:w-auto flex justify-center items-center gap-2 bg-gradient-to-r from-primary to-[#3a2e25] text-white px-6 py-3 md:py-2.5 rounded-2xl font-black text-[9px] uppercase tracking-widest shadow-lg hover:shadow-xl active:scale-95 transition-all disabled:opacity-40"
                        >
                          <FaSave /> {guardandoEvolucion ? 'Guardando...' : 'Guardar Nota Médica'}
                        </button>
                      </div>
                    </div>

                    {/* Historial (Línea de Tiempo) */}
                    <div className="space-y-4 pt-2">
                      {pacienteActivo.historiaClinica && pacienteActivo.historiaClinica.length > 0 ? (
                        pacienteActivo.historiaClinica.map((entrada, idx) => (
                          <div key={idx} className="flex gap-4 relative group">
                            <div className="w-10 h-10 rounded-xl bg-accent-orange/10 flex items-center justify-center shrink-0 shadow-sm relative z-10">
                                <FaCalendarCheck className="text-accent-orange text-sm" />
                            </div>
                            {idx < pacienteActivo.historiaClinica.length - 1 && (
                              <div className="absolute left-5 top-10 bottom-[-16px] w-0.5 bg-secondary/20 hidden md:block"></div>
                            )}
                            <div className="bg-white p-5 rounded-2xl border border-secondary/20 shadow-sm flex-1 hover:shadow-md transition-shadow">
                                <p className="text-[10px] font-black text-text-light mb-1.5 uppercase tracking-widest">
                                  {entrada.fecha ? new Date(entrada.fecha).toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' }) : 'Sin fecha'}
                                </p>
                                <p className="text-sm font-bold text-text leading-relaxed">{entrada.tratamiento}</p>
                                <div className="mt-3 pt-3 border-t border-secondary/10 flex justify-between items-center">
                                    <span className="text-[9px] font-black text-primary uppercase bg-secondary/10 px-2 py-0.5 rounded-md">{entrada.profesional}</span>
                                </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-10 opacity-50">
                          <FaFileMedical className="text-4xl text-secondary/30 mx-auto mb-3" />
                          <p className="font-bold text-text-light text-sm">No hay evoluciones registradas para este paciente.</p>
                          <p className="text-[10px] text-text-light mt-1">Agregá la primera nota clínica arriba.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {pestañaActiva === 'archivos' && (
                  <div className="animate-fade-in">
                    <div className="border-4 border-dashed border-secondary/30 rounded-2xl p-12 flex flex-col items-center justify-center text-center bg-white hover:bg-white hover:border-primary/40 hover:shadow-2xl transition-all cursor-pointer mb-8 group">
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                          <FaUpload className="text-3xl text-primary" />
                      </div>
                      <h3 className="font-black text-xl text-primary uppercase tracking-tight">Subir Documentación</h3>
                      <p className="text-xs text-text-light font-bold mt-2 uppercase tracking-widest opacity-60">Radiografías, Tomografías o PDF</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Simulación de archivo subido */}
                      <div className="bg-white border border-secondary/30 p-5 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-lg transition-all group">
                        <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
                            <FaFilePdf className="text-2xl text-red-500" />
                        </div>
                        <div className="overflow-hidden">
                          <p className="font-black text-xs truncate text-primary uppercase tracking-tight">Radiografía_Panorámica_v1.pdf</p>
                          <p className="text-[10px] text-text-light font-bold mt-1 opacity-60">Ejemplo • 2.4 MB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        )}
      </div>
    </LayoutAdmin>
  );
};

export default AdminHistoriaClinica;
