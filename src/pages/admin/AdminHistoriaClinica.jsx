import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import LayoutAdmin from '../../components/layouts/LayoutAdmin';
import api from '../../api/axios';
import { FaSearch, FaUserInjured, FaPhone, FaEnvelope, FaIdCard, FaFileMedical, FaUpload, FaFilePdf, FaTooth, FaSpinner } from 'react-icons/fa';

const AdminHistoriaClinica = () => {
  const location = useLocation();
  const { id } = useParams();
  const [pacientes, setPacientes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [pacienteActivo, setPacienteActivo] = useState(null);
  const [pestañaActiva, setPestañaActiva] = useState('evolucion'); // evolucion, archivos
  const [cargando, setCargando] = useState(true);

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
      } finally {
        setCargando(false);
      }
    };
    fetchPacientes();
  }, [id, location.state]);

  const pacientesFiltrados = busqueda === '' ? [] : pacientes.filter(p => 
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
    p.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
    (p.dni && p.dni.includes(busqueda))
  );

  const seleccionarPaciente = (paciente) => {
    setPacienteActivo(paciente);
    setBusqueda('');
  };

  return (
    <LayoutAdmin>
      <div className="max-w-[1400px] mx-auto flex flex-col h-[calc(100vh-140px)] gap-6">
        
        {/* ================= BARRA SUPERIOR DE BÚSQUEDA ================= */}
        <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-secondary/20 shrink-0 relative z-20 flex flex-col md:flex-row gap-4 items-center">
          <div className="w-full md:w-1/3 relative">
            <FaSearch className="absolute left-4 top-3.5 text-text-light opacity-50" />
            <input 
              type="text" 
              placeholder="Buscar paciente por Nombre o DNI..." 
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-background/50 border border-secondary/40 rounded-xl focus:outline-none focus:border-primary text-sm font-bold tracking-tight"
            />
            {/* Dropdown de Resultados */}
            {pacientesFiltrados.length > 0 && (
              <div className="absolute top-14 left-0 w-full bg-white border border-secondary/20 shadow-2xl rounded-2xl overflow-hidden max-h-60 overflow-y-auto animate-fade-in">
                {pacientesFiltrados.map(p => (
                  <button 
                    key={p._id} 
                    onClick={() => seleccionarPaciente(p)} 
                    className="w-full text-left px-5 py-4 hover:bg-primary/5 border-b border-secondary/10 flex justify-between items-center group transition-colors"
                  >
                    <div className="flex flex-col">
                        <span className="font-black text-primary text-sm uppercase tracking-tight group-hover:text-accent-orange transition-colors">{p.nombre} {p.apellido}</span>
                        <span className="text-[10px] font-bold text-text-light uppercase tracking-widest mt-0.5">DNI: {p.dni || 'Sin registro'}</span>
                    </div>
                    <FaUserInjured className="text-secondary/30 group-hover:text-accent-orange transition-colors" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="text-xs font-black text-primary flex items-center gap-2 uppercase tracking-widest ml-auto opacity-70">
            <FaFileMedical className="text-accent-orange text-lg" /> Historia Clínica Digital
          </div>
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
          <div className="flex-1 flex flex-col xl:flex-row gap-6 min-h-0 animate-fade-in">
            
            {/* COLUMNA IZQUIERDA: TARJETA DEL PACIENTE */}
            <div className="w-full xl:w-1/3 bg-white rounded-[2.5rem] shadow-sm border border-secondary/20 p-8 flex flex-col shrink-0 overflow-y-auto custom-scrollbar">
              <div className="flex items-center gap-5 mb-10 border-b border-secondary/20 pb-8">
                <div className="w-20 h-20 bg-primary text-white rounded-2xl flex items-center justify-center text-4xl font-black shadow-xl shadow-primary/20">
                  {pacienteActivo.nombre.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-primary leading-tight uppercase tracking-tighter">{pacienteActivo.nombre} {pacienteActivo.apellido}</h2>
                  <p className="text-[10px] font-black text-accent-orange uppercase tracking-[0.3em] mt-2">Paciente Activo</p>
                </div>
              </div>

              <div className="space-y-6 flex-1">
                <div className="bg-background/50 p-5 rounded-2xl border border-secondary/30 transition-all hover:bg-white hover:shadow-md">
                  <p className="text-[10px] font-black text-text-light mb-2 uppercase tracking-widest flex items-center gap-2 opacity-60"><FaIdCard className="text-primary" /> Documento / DNI</p>
                  <p className="font-black text-text text-xl tracking-tight">{pacienteActivo.dni || 'No registrado'}</p>
                </div>
                <div className="bg-background/50 p-5 rounded-2xl border border-secondary/30 transition-all hover:bg-white hover:shadow-md">
                  <p className="text-[10px] font-black text-text-light mb-2 uppercase tracking-widest flex items-center gap-2 opacity-60"><FaPhone className="text-primary" /> Teléfono / Celular</p>
                  <p className="font-black text-text text-xl tracking-tight">{pacienteActivo.telefono || 'No registrado'}</p>
                </div>
                <div className="bg-background/50 p-5 rounded-2xl border border-secondary/30 transition-all hover:bg-white hover:shadow-md">
                  <p className="text-[10px] font-black text-text-light mb-2 uppercase tracking-widest flex items-center gap-2 opacity-60"><FaEnvelope className="text-primary" /> Correo Electrónico</p>
                  <p className="font-black text-text text-sm break-all tracking-tight opacity-80 uppercase">{pacienteActivo.email}</p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-secondary/20">
                  <button 
                  onClick={() => window.location.href = `/admin/odontograma-avanzado/${pacienteActivo._id}`}
                  className="w-full bg-primary text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:translate-y-[-2px] transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                      <FaTooth /> Ver Odontograma
                  </button>
              </div>
            </div>

            {/* COLUMNA DERECHA: PESTAÑAS MÉDICAS */}
            <div className="w-full xl:w-2/3 bg-white rounded-[2.5rem] shadow-sm border border-secondary/20 flex flex-col overflow-hidden">
              {/* Menú de Pestañas */}
              <div className="flex border-b border-secondary/20 bg-background/30 shrink-0">
                <button 
                    onClick={() => setPestañaActiva('evolucion')} 
                    className={`flex-1 py-5 font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all ${pestañaActiva === 'evolucion' ? 'bg-white text-primary border-t-8 border-primary' : 'text-text-light hover:bg-white/50 opacity-60'}`}
                >
                  <FaFileMedical className="text-lg" /> Evolución
                </button>
                <button 
                    onClick={() => setPestañaActiva('archivos')} 
                    className={`flex-1 py-5 font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all ${pestañaActiva === 'archivos' ? 'bg-white text-primary border-t-8 border-accent-orange' : 'text-text-light hover:bg-white/50 opacity-60'}`}
                >
                  <FaUpload className="text-lg" /> Rx y Archivos
                </button>
              </div>

              {/* Contenido de la Pestaña (Scrollable) */}
              <div className="flex-1 overflow-y-auto p-8 bg-slate-50/20 custom-scrollbar">
                
                {pestañaActiva === 'evolucion' && (
                  <div className="space-y-6">
                    <div className="bg-white p-6 rounded-3xl border border-secondary/40 shadow-xl shadow-primary/5">
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-4">Nueva Entrada Clínica</p>
                      <textarea 
                        placeholder="Escribe la evolución, tratamiento realizado o notas del día..." 
                        className="w-full h-32 bg-background/50 rounded-2xl p-5 resize-none focus:outline-none focus:ring-4 focus:ring-primary/5 border border-secondary/30 font-bold text-sm text-primary placeholder:text-text-light/40"
                      ></textarea>
                      <div className="flex justify-end mt-4">
                        <button className="bg-primary text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:brightness-110 shadow-lg active:scale-95 transition-all">Guardar Nota Médica</button>
                      </div>
                    </div>

                    {/* Historial (Simulando Linea de Tiempo) */}
                    <div className="space-y-6 pt-6">
                      <div className="flex gap-6 relative group">
                        <div className="w-12 h-12 rounded-2xl bg-accent-orange/10 flex items-center justify-center shrink-0 shadow-sm relative z-10">
                            <FaCalendarCheck className="text-accent-orange" />
                        </div>
                        <div className="absolute left-6 top-12 bottom-[-24px] w-0.5 bg-secondary/20 hidden md:block"></div>
                        <div className="bg-white p-6 rounded-3xl border border-secondary/20 shadow-sm flex-1 hover:shadow-md transition-shadow">
                            <p className="text-[10px] font-black text-text-light mb-2 uppercase tracking-widest">Hoy — {new Date().toLocaleDateString()}</p>
                            <p className="text-sm font-bold text-text leading-relaxed">Paciente asiste para control preventivo. Se detecta necesidad de limpieza profunda en arcada inferior. Sin dolor reportado.</p>
                            <div className="mt-4 pt-4 border-t border-secondary/10 flex justify-between items-center">
                                <span className="text-[9px] font-black text-primary uppercase bg-secondary/10 px-2 py-0.5 rounded-md">Dr. Adolfo Martinez</span>
                                <span className="text-[9px] font-bold text-text-light">14:50 hs</span>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {pestañaActiva === 'archivos' && (
                  <div className="animate-fade-in">
                    <div className="border-4 border-dashed border-secondary/30 rounded-[2rem] p-12 flex flex-col items-center justify-center text-center bg-white hover:bg-white hover:border-primary/40 hover:shadow-2xl transition-all cursor-pointer mb-10 group">
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
                          <p className="text-[10px] text-text-light font-bold mt-1 opacity-60">Hace 2 días • 2.4 MB</p>
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
