import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios.js';
import { FaSearch, FaUserInjured, FaIdCard, FaEnvelope } from 'react-icons/fa';
import LayoutAdmin from "../../components/layouts/LayoutAdmin.jsx";

const DirectorioPacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);

  // 1. Traemos la lista real desde MongoDB al cargar la página
  useEffect(() => {
    const obtenerLista = async () => {
      try {
        const respuesta = await api.get('/auth/pacientes');
        setPacientes(respuesta.data);
      } catch (error) {
        console.error("Error al cargar pacientes:", error);
      } finally {
        setCargando(false);
      }
    };
    obtenerLista();
  }, []);

  // 2. El motor de búsqueda inteligente (Filtra por nombre, apellido o email)
  const pacientesFiltrados = pacientes.filter((paciente) => {
    const termino = busqueda.toLowerCase();
    // Extra safety logic correctly mapping properties
    const nombreStr = paciente.nombre || "";
    const apellidoStr = paciente.apellido || "";
    const emailStr = paciente.email || "";

    return (
      nombreStr.toLowerCase().includes(termino) ||
      apellidoStr.toLowerCase().includes(termino) ||
      emailStr.toLowerCase().includes(termino)
    );
  });

  return (
    <LayoutAdmin>
      <div className="space-y-8">
        
        {/* ENCABEZADO Y BUSCADOR */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border-t-4 border-accent-orange">
          <div>
            <h1 className="text-3xl font-black text-primary flex items-center gap-3">
              <FaUserInjured className="text-accent-orange" />
              Directorio de Pacientes
            </h1>
            <p className="text-text-light text-sm font-medium mt-1">
              Gestión y búsqueda rápida de historias clínicas.
            </p>
          </div>

          {/* BARRA DE BÚSQUEDA */}
          <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary/50" />
            <input 
              type="text" 
              placeholder="Buscar por nombre, apellido o email..." 
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-secondary/30 bg-background/50 focus:border-accent-orange focus:ring-1 focus:ring-accent-orange outline-none transition-all text-sm font-semibold"
            />
          </div>
        </div>

        {/* TABLA DE RESULTADOS */}
        <div className="bg-white rounded-3xl shadow-lg border border-secondary/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary text-white text-xs uppercase tracking-wider">
                  <th className="px-6 py-5 font-black">Paciente</th>
                  <th className="px-6 py-5 font-black">Contacto (Email)</th>
                  <th className="px-6 py-5 font-black">Fecha de Registro</th>
                  <th className="px-6 py-5 font-black text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary/10">
                {cargando ? (
                  <tr><td colSpan="4" className="text-center py-10 font-bold text-secondary">Cargando base de datos...</td></tr>
                ) : pacientesFiltrados.length === 0 ? (
                  <tr><td colSpan="4" className="text-center py-10 font-bold text-red-400">No se encontraron pacientes.</td></tr>
                ) : (
                  pacientesFiltrados.map((paciente) => (
                    <tr key={paciente._id} className="hover:bg-accent-orange/5 transition-colors group">
                      <td className="px-6 py-4 font-bold text-primary flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-primary">
                          <FaIdCard />
                        </div>
                        {paciente.nombre} {paciente.apellido}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-text flex items-center gap-2">
                        <FaEnvelope className="text-secondary/50" /> {paciente.email}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-text-light">
                        {/* Formateamos la fecha de creación que MongoDB genera automáticamente */}
                        {paciente.createdAt ? new Date(paciente.createdAt).toLocaleDateString('es-AR') : 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Link 
                            to={`/admin/paciente/${paciente._id}`} 
                            className="bg-primary text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-accent-orange transition-colors shadow-sm inline-block"
                          >
                            Ver Ficha
                          </Link>
                          <Link 
                            to={`/admin/historia-clinica/${paciente._id}`} 
                            className="bg-accent-orange text-white px-4 py-2 rounded-lg text-xs font-bold hover:brightness-110 transition-all shadow-sm inline-block"
                          >
                            Expediente
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </LayoutAdmin>
  );
};

export default DirectorioPacientes;
