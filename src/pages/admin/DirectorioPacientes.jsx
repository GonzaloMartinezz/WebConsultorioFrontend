import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios.js';
import { FaSearch, FaUserInjured, FaIdCard, FaEnvelope, FaPhone, FaFileMedical, FaBookMedical, FaTooth, FaSpinner, FaUsers, FaTimes } from 'react-icons/fa';
import LayoutAdmin from "../../components/layouts/LayoutAdmin.jsx";

const DirectorioPacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [confirmarEliminar, setConfirmarEliminar] = useState(null); // Almacena el paciente a eliminar
  const [cargandoEliminar, setCargandoEliminar] = useState(false);

  // 1. Traemos la lista real desde MongoDB al cargar la página
  const obtenerLista = async () => {
    setCargando(true);
    try {
      const respuesta = await api.get('/pacientes');
      setPacientes(respuesta.data);
    } catch (error) {
      console.error("Error al cargar pacientes:", error);
      try {
        const respuesta2 = await api.get('/auth/pacientes');
        setPacientes(respuesta2.data);
      } catch (err2) {
        console.error("Fallback también falló:", err2);
      }
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerLista();
  }, []);

  const handleEliminar = async () => {
    if (!confirmarEliminar) return;
    setCargandoEliminar(true);
    try {
      await api.delete(`/pacientes/${confirmarEliminar._id}`);
      setConfirmarEliminar(null);
      obtenerLista(); // Recargar lista
    } catch (error) {
      console.error("Error al eliminar paciente:", error);
      alert("No se pudo eliminar al paciente. Verificá los permisos.");
    } finally {
      setCargandoEliminar(false);
    }
  };

  // 2. El motor de búsqueda inteligente (Filtra por nombre, apellido, email o DNI)
  const pacientesFiltrados = pacientes.filter((paciente) => {
    const termino = busqueda.toLowerCase();
    const nombreStr = paciente.nombre || "";
    const apellidoStr = paciente.apellido || "";
    const emailStr = paciente.email || "";
    const dniStr = paciente.dni || "";
    const telefonoStr = paciente.telefono || "";

    return (
      nombreStr.toLowerCase().includes(termino) ||
      apellidoStr.toLowerCase().includes(termino) ||
      emailStr.toLowerCase().includes(termino) ||
      dniStr.includes(termino) ||
      telefonoStr.includes(termino)
    );
  });

  return (
    <LayoutAdmin>
      <div className="space-y-6">
        
        {/* MODAL DE CONFIRMACIÓN DE ELIMINACIÓN */}
        {confirmarEliminar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl animate-in zoom-in duration-300 border border-secondary/10">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center text-3xl mb-6 mx-auto shadow-sm">
                 <FaTimes />
              </div>
              <h3 className="text-xl font-black text-primary text-center mb-2 uppercase tracking-tight">
                ¿Eliminar Paciente?
              </h3>
              <p className="text-sm text-text-light text-center mb-8 font-medium">
                Estás a punto de borrar a <span className="text-primary font-black uppercase">{confirmarEliminar.nombre} {confirmarEliminar.apellido}</span> de forma permanente. Esta acción no se puede deshacer.
              </p>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setConfirmarEliminar(null)}
                  disabled={cargandoEliminar}
                  className="flex-1 px-5 py-3 rounded-xl border-2 border-secondary/10 text-text-light font-black text-[10px] uppercase tracking-widest hover:bg-background transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleEliminar}
                  disabled={cargandoEliminar}
                  className="flex-1 px-5 py-3 rounded-xl bg-red-600 text-white font-black text-[10px] uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {cargandoEliminar ? <FaSpinner className="animate-spin" /> : 'SÍ, ELIMINAR'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ENCABEZADO Y BUSCADOR */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-secondary/20">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-xl">
               <FaUsers className="text-2xl text-primary" />
            </div>
            <div>
               <h1 className="text-2xl font-black text-primary tracking-tight">
                  Directorio de Pacientes
               </h1>
               <p className="text-text-light text-xs font-bold uppercase tracking-widest mt-1">
                  {pacientesFiltrados.length} paciente{pacientesFiltrados.length !== 1 ? 's' : ''} registrado{pacientesFiltrados.length !== 1 ? 's' : ''}
               </p>
            </div>
          </div>

          <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary/50" />
            <input 
              type="text" 
              placeholder="Buscar por nombre, DNI, email o teléfono..." 
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-secondary/30 bg-background/50 focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/20 outline-none transition-all text-sm font-semibold"
            />
          </div>
        </div>

        {/* TABLA DE RESULTADOS */}
        <div className="bg-white rounded-2xl shadow-sm border border-secondary/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary text-white text-[10px] uppercase tracking-widest">
                  <th className="px-5 py-4 font-black">Paciente</th>
                  <th className="px-5 py-4 font-black">Mail</th>
                  <th className="px-5 py-4 font-black">Teléfono</th>
                  <th className="px-5 py-4 font-black text-center" colSpan="4">Acciones Clínicas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary/10">
                {cargando ? (
                  <tr>
                    <td colSpan="7" className="text-center py-16">
                      <FaSpinner className="text-4xl text-accent-orange animate-spin mx-auto mb-3" />
                      <p className="font-bold text-text-light text-sm">Cargando base de datos...</p>
                    </td>
                  </tr>
                ) : pacientesFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-16">
                      <FaSearch className="text-3xl text-secondary/30 mx-auto mb-3" />
                      <p className="font-bold text-text-light">No se encontraron pacientes.</p>
                    </td>
                  </tr>
                ) : (
                  pacientesFiltrados.map((paciente) => (
                    <tr key={paciente._id} className="hover:bg-accent-orange/3 transition-colors group">

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-sm shrink-0">
                            {(paciente.nombre || '?').charAt(0)}{(paciente.apellido || '?').charAt(0)}
                          </div>
                          <div>
                            <p className="font-black text-primary text-sm uppercase tracking-tight group-hover:text-accent-orange transition-colors">
                              {paciente.nombre} {paciente.apellido}
                            </p>
                            <p className="text-[10px] font-bold text-text-light uppercase tracking-wider">
                              DNI: {paciente.dni || 'Sin registro'}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <FaEnvelope className="text-blue-400 text-xs shrink-0" />
                          <span className="text-sm font-medium text-text truncate max-w-[200px]">
                            {paciente.email || 'Sin email'}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <FaPhone className="text-green-500 text-xs shrink-0" />
                          <span className="text-sm font-bold text-text">
                            {paciente.telefono || 'Sin teléfono'}
                          </span>
                        </div>
                      </td>

                      <td className="px-2 py-4 text-center">
                        <Link 
                          to={`/admin/paciente/${paciente._id}`} 
                          className="inline-flex items-center gap-1.5 bg-blue-500 text-white px-4 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-blue-600 transition-all shadow-sm active:scale-95"
                        >
                          <FaFileMedical /> Ficha
                        </Link>
                      </td>

                      <td className="px-2 py-4 text-center">
                        <Link 
                          to={`/admin/historia-clinica/${paciente._id}`} 
                          className="inline-flex items-center gap-1.5 bg-accent-orange text-white px-4 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-wider hover:brightness-110 transition-all shadow-sm active:scale-95"
                        >
                          <FaBookMedical /> Historial
                        </Link>
                      </td>

                      <td className="px-2 py-4 text-center">
                        <Link 
                          to={`/admin/odontograma-avanzado/${paciente._id}`} 
                          className="inline-flex items-center gap-1.5 bg-emerald-500 text-white px-4 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-emerald-600 transition-all shadow-sm active:scale-95"
                        >
                          <FaTooth /> Odonto
                        </Link>
                      </td>

                      {/* ELIMINAR PACIENTE (X ROJA) */}
                      <td className="px-5 py-4 text-center">
                        <button 
                          onClick={() => setConfirmarEliminar(paciente)}
                          className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all active:scale-90"
                          title="Eliminar Paciente"
                        >
                          <FaTimes />
                        </button>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!cargando && pacientesFiltrados.length > 0 && (
            <div className="flex items-center justify-between px-5 py-3 bg-background/30 border-t border-secondary/10">
              <p className="text-[10px] font-bold text-text-light uppercase tracking-widest">
                Mostrando {pacientesFiltrados.length} de {pacientes.length} registros
              </p>
              <p className="text-[10px] font-bold text-text-light uppercase tracking-widest">
                C&M Dental — Panel de Control Administrativo
              </p>
            </div>
          )}
        </div>

      </div>
    </LayoutAdmin>
  );
};

export default DirectorioPacientes;
