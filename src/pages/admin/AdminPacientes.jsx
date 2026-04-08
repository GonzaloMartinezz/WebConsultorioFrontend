import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LayoutAdmin from "../../components/layouts/LayoutAdmin.jsx";
import api from '../../api/axios.js';
import { FaSearch, FaUserPlus, FaFileMedical, FaSpinner, FaTooth, FaEllipsisV } from 'react-icons/fa';

const AdminPacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');

  // TRAER PACIENTES DE LA BASE DE DATOS
  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const respuesta = await api.get('/auth/usuarios'); 
        // Filtramos para que no muestre a los administradores
        const soloPacientes = respuesta.data.filter(user => user.rol !== 'admin');
        setPacientes(soloPacientes);
      } catch (error) {
        console.error("Error al traer los pacientes:", error);
      } finally {
        setCargando(false);
      }
    };
    fetchPacientes();
  }, []);

  // FILTRO EN TIEMPO REAL
  const pacientesFiltrados = pacientes.filter(paciente => 
    paciente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    (paciente.apellido && paciente.apellido.toLowerCase().includes(busqueda.toLowerCase())) ||
    paciente.email.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <LayoutAdmin>
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4" data-aos="fade-down">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-orange mb-1">Base de Datos Activa</p>
          <h1 className="text-3xl font-black text-primary tracking-tight">Directorio de Pacientes</h1>
        </div>
        <button className="px-6 py-3 text-white font-bold text-sm rounded-xl bg-primary shadow-md hover:brightness-110 active:scale-95 transition-all uppercase tracking-wide flex items-center justify-center gap-2">
          <FaUserPlus /> Registrar Nuevo
        </button>
      </header>

      <main className="space-y-6" data-aos="fade-up">
        
        {/* BUSCADOR MODERNO */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-secondary flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-2/3">
            <input
              type="text"
              placeholder="Buscar por Nombre, Apellido o Email del paciente..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full px-12 py-4 rounded-xl border-2 border-background bg-background/50 focus:border-accent-orange focus:bg-white outline-none font-bold text-text transition-all"
            />
            <FaSearch className="absolute top-1/2 left-5 transform -translate-y-1/2 text-text-light text-lg" />
          </div>
          <div className="text-sm font-bold text-text-light whitespace-nowrap bg-background px-4 py-3 rounded-xl border border-secondary/30">
            Total: <span className="text-primary text-lg">{pacientesFiltrados.length}</span> pacientes
          </div>
        </div>

        {/* LISTA DE PACIENTES (Estilo Cards Horizontales) */}
        {cargando ? (
          <div className="flex justify-center py-20">
            <FaSpinner className="text-5xl text-primary animate-spin" />
          </div>
        ) : pacientesFiltrados.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-secondary shadow-sm">
            <FaSearch className="text-6xl text-text-light/50 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-primary">No hay resultados</h2>
            <p className="text-text-light font-medium mt-2">Intenta buscar con otro nombre o correo electrónico.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {pacientesFiltrados.map((paciente) => (
              <div key={paciente._id} className="bg-white rounded-2xl p-5 shadow-sm border border-secondary/40 hover:border-accent-orange transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group">
                
                {/* Info Básica */}
                <div className="flex items-center gap-5 w-full md:w-auto">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl font-black uppercase shrink-0 border border-primary/20">
                    {paciente.nombre?.charAt(0)}{paciente.apellido?.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-primary group-hover:text-accent-orange transition-colors">
                      {paciente.nombre} {paciente.apellido || ''}
                    </h3>
                    <p className="text-sm font-medium text-text-light">{paciente.email}</p>
                  </div>
                </div>

                {/* Badges / Estado */}
                <div className="hidden lg:flex items-center gap-3 w-1/4">
                   <span className="bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider">
                     Registrado
                   </span>
                </div>

                {/* Acciones */}
                <div className="flex items-center justify-end gap-3 w-full md:w-auto border-t md:border-t-0 border-secondary/30 pt-4 md:pt-0 mt-2 md:mt-0">
                  {/* ¡ESTE ES EL ENLACE CLAVE QUE CONECTA CON LA FICHA! */}
                  <Link 
                    to={`/admin/paciente/${paciente._id}`} 
                    className="flex-1 md:flex-none text-center bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <FaFileMedical /> Ver Legajo Médico
                  </Link>
                  <button className="p-3 text-text-light hover:text-primary bg-background rounded-xl transition-colors">
                    <FaEllipsisV />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </main>
    </LayoutAdmin>
  );
};

export default AdminPacientes;
