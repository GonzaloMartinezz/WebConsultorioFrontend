import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LayoutAdmin from "../../components/layouts/LayoutAdmin.jsx";
import api from '../../api/axios.js';
import { FaSearch, FaUserPlus, FaFileMedical, FaSpinner, FaTooth, FaUsers, FaCalendarAlt } from 'react-icons/fa';

const AdminPacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const respuesta = await api.get('/auth/usuarios');
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

  const pacientesFiltrados = pacientes.filter(paciente =>
    (paciente.nombre || '').toLowerCase().includes(busqueda.toLowerCase()) ||
    (paciente.apellido && paciente.apellido.toLowerCase().includes(busqueda.toLowerCase())) ||
    (paciente.email && paciente.email.toLowerCase().includes(busqueda.toLowerCase()))
  );

  return (
    <LayoutAdmin>
      <header className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-orange mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-orange animate-pulse"></span> Directorio Médico
          </p>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-primary tracking-tight">Pacientes Registrados</h1>
          <p className="text-text-light text-sm font-medium mt-1">{pacientesFiltrados.length} paciente{pacientesFiltrados.length !== 1 ? 's' : ''} en el sistema</p>
        </div>
        <Link to="/turnos" className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white font-black rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm">
          <FaUserPlus /> Nuevo Turno
        </Link>
      </header>

      {/* KPIs reales */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
        <div className="bg-white p-4 md:p-5 rounded-2xl md:rounded-4xl shadow-sm border border-secondary/10 flex items-center gap-3 md:gap-4 hover:shadow-lg transition-all">
          <div className="w-11 h-11 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
            <FaUsers className="text-xl text-primary" />
          </div>
          <div>
            <p className="text-2xl font-black text-primary">{pacientes.length}</p>
            <p className="text-[9px] font-black text-text-light uppercase tracking-widest">Total Pacientes</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-4xl shadow-sm border border-secondary/10 flex items-center gap-4 hover:shadow-lg transition-all">
          <div className="w-11 h-11 bg-green-500/10 rounded-2xl flex items-center justify-center shrink-0">
            <FaCalendarAlt className="text-xl text-green-500" />
          </div>
          <div>
            <p className="text-2xl font-black text-green-600">{pacientesFiltrados.length}</p>
            <p className="text-[9px] font-black text-text-light uppercase tracking-widest">Mostrando</p>
          </div>
        </div>
        <div className="col-span-2 md:col-span-1 bg-white p-5 rounded-4xl shadow-sm border border-secondary/10 flex items-center gap-4 hover:shadow-lg transition-all">
          <div className="w-11 h-11 bg-accent-orange/10 rounded-2xl flex items-center justify-center shrink-0">
            <FaTooth className="text-xl text-accent-orange" />
          </div>
          <div>
            <p className="text-2xl font-black text-accent-orange">C&M</p>
            <p className="text-[9px] font-black text-text-light uppercase tracking-widest">Centro Odontológico</p>
          </div>
        </div>
      </div>

      {/* Barra de búsqueda */}
      <div className="bg-white rounded-4xl shadow-sm border border-secondary/10 overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 px-4 md:px-6 py-4 border-b border-secondary/10">
          <div className="relative w-full flex-1 max-w-full md:max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light/40 text-sm" />
            <input
              type="text"
              placeholder="Buscar por nombre, apellido o email..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-background/50 rounded-xl font-bold text-sm border border-secondary/10 focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/10 outline-none transition-all"
            />
          </div>
          {busqueda && (
            <button onClick={() => setBusqueda('')} className="text-[10px] font-black text-text-light uppercase tracking-widest hover:text-primary transition-colors">
              Limpiar
            </button>
          )}
        </div>

        {cargando ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-secondary/20 rounded-full"></div>
              <div className="w-12 h-12 border-4 border-accent-orange border-t-transparent rounded-full animate-spin absolute inset-0"></div>
            </div>
            <p className="text-text-light font-bold text-sm animate-pulse">Cargando directorio...</p>
          </div>
        ) : pacientesFiltrados.length === 0 ? (
          <div className="py-20 text-center">
            <div className="w-16 h-16 bg-secondary/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaSearch className="text-2xl text-text-light/20" />
            </div>
            <p className="text-text-light font-bold text-sm">
              {busqueda ? `Sin resultados para "${busqueda}"` : 'No hay pacientes registrados aún.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-secondary/5">
                  <th className="py-3 px-6 text-[9px] font-black uppercase tracking-[0.15em] text-text-light/50">Paciente</th>
                  <th className="py-3 px-6 text-[9px] font-black uppercase tracking-[0.15em] text-text-light/50 hidden md:table-cell">Email</th>
                  <th className="py-3 px-6 text-[9px] font-black uppercase tracking-[0.15em] text-text-light/50 hidden lg:table-cell">ID Sistema</th>
                  <th className="py-3 px-6 text-[9px] font-black uppercase tracking-[0.15em] text-text-light/50 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary/5">
                {pacientesFiltrados.map(paciente => (
                  <tr key={paciente._id} className="hover:bg-background/50 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center text-[10px] font-black text-primary shrink-0">
                          {paciente.nombre?.charAt(0)}{(paciente.apellido || '')?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-black text-primary text-sm">{paciente.nombre} {paciente.apellido || ''}</p>
                          <p className="text-[10px] text-text-light font-medium md:hidden">{paciente.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 hidden md:table-cell">
                      <p className="text-sm font-medium text-text-light">{paciente.email}</p>
                    </td>
                    <td className="py-4 px-6 hidden lg:table-cell">
                      <span className="text-[9px] font-black text-text-light/40 bg-secondary/5 px-2 py-1 rounded-lg uppercase tracking-widest">
                        #{paciente._id.slice(-6).toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                        <Link
                          to={`/admin/paciente/${paciente._id}`}
                          className="flex items-center gap-1.5 px-4 py-2 bg-primary/5 text-primary rounded-xl hover:bg-primary hover:text-white transition-all text-[10px] font-black uppercase tracking-wider border border-primary/10"
                        >
                          <FaFileMedical className="text-xs" /> Ficha
                        </Link>
                        <Link
                          to={`/admin/odontograma-avanzado/${paciente._id}`}
                          className="flex items-center gap-1.5 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-wider border border-emerald-200/50"
                        >
                          <FaTooth className="text-xs" /> Odontograma
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-6 py-4 border-t border-secondary/10 flex items-center justify-between">
              <p className="text-[10px] font-bold text-text-light/50 uppercase tracking-wider">
                Mostrando {pacientesFiltrados.length} de {pacientes.length} registros
              </p>
            </div>
          </div>
        )}
      </div>
    </LayoutAdmin>
  );
};

export default AdminPacientes;
