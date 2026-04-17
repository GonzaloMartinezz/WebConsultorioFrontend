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
      <div className="bg-[#141414] text-gray-300 min-h-screen rounded-4xl p-8 font-sans border border-zinc-800 shadow-2xl">

        {/* HEADER OBSIDIAN */}
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4" data-aos="fade-down">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-400/80 mb-2">Database <span className="text-gray-600 px-1">&gt;</span> Master Directory</p>
            <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">Patient Directory</h1>
            <p className="text-sm font-medium text-gray-500 flex items-center gap-3">
              Managing {pacientesFiltrados.length} active patient records
              <span className="flex -space-x-2">
                <img src="https://ui-avatars.com/api/?name=A+B&background=252525&color=fff&rounded=true" className="w-6 h-6 border border-[#141414] rounded-full" alt="doc" />
                <img src="https://ui-avatars.com/api/?name=C+D&background=333&color=fff&rounded=true" className="w-6 h-6 border border-[#141414] rounded-full" alt="doc" />
                <span className="w-6 h-6 bg-zinc-800 border border-[#141414] rounded-full flex items-center justify-center text-[8px] font-bold text-gray-400">+12</span>
              </span>
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 text-gray-300 font-bold text-sm rounded-xl bg-[#1e1e1e] border border-zinc-700/50 hover:bg-zinc-800 transition-colors flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21v-7" /><path d="M4 10V3" /><path d="M12 21v-9" /><path d="M12 8V3" /><path d="M20 21v-5" /><path d="M20 12V3" /><path d="M1 14h6" /><path d="M9 8h6" /><path d="M17 16h6" /></svg>
              Advanced Filters
            </button>
            <button className="px-6 py-2.5 text-orange-950 font-bold text-sm rounded-xl bg-orange-300 hover:bg-orange-400 shadow-md transition-colors flex items-center justify-center gap-2">
              <FaUserPlus /> Register Patient
            </button>
          </div>
        </header>

        {/* 4 CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8" data-aos="fade-up">
          <div className="bg-[#1a1a1a] border border-zinc-800/60 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-4 right-4 text-zinc-700/50">
              <FaUserPlus className="text-4xl" />
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 z-10">New Registrations</p>
            <div className="flex items-baseline gap-3 z-10 mb-4">
              <span className="text-3xl font-bold text-white">128</span>
              <span className="text-xs font-bold text-green-500">+12%</span>
            </div>
            <p className="text-[10px] italic text-gray-600 z-10">Last 30 days performance</p>
          </div>

          <div className="bg-[#1a1a1a] border border-zinc-800/60 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-4 right-4 text-zinc-700/50">
              <FaCalendarDay className="text-4xl" />
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 z-10">Follow-ups Due</p>
            <div className="flex items-baseline gap-3 z-10 mb-4">
              <span className="text-3xl font-bold text-white">42</span>
              <span className="text-xs font-bold text-orange-400">Urgent</span>
            </div>
            <div className="w-full bg-zinc-800 h-1 rounded-full z-10 flex gap-1"><div className="w-[40%] bg-orange-400 rounded-full h-full"></div><div className="w-[30%] bg-zinc-600 rounded-full h-full"></div></div>
          </div>

          <div className="bg-[#1a1a1a] border border-zinc-800/60 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-4 right-4 text-zinc-700/50">
              <FaCheckCircle className="text-4xl" />
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 z-10">Insurance Verified</p>
            <div className="flex items-baseline gap-3 z-10 mb-4">
              <span className="text-3xl font-bold text-white">94.2%</span>
            </div>
            <p className="text-[10px] italic text-gray-600 z-10">Electronic verification active</p>
          </div>

          <div className="bg-[#1a1a1a] border border-zinc-800/60 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-4 right-4 text-zinc-700/50">
              <FaHistory className="text-4xl" />
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 z-10">File Accuracy</p>
            <div className="flex items-baseline gap-3 z-10 mb-4">
              <span className="text-3xl font-bold text-white">99.1%</span>
            </div>
            <p className="text-[10px] italic text-gray-600 z-10">Internal audit score</p>
          </div>
        </section>

        <main className="space-y-6 bg-[#1a1a1a] p-1 border border-zinc-800/60 rounded-2xl" data-aos="fade-up">

          {/* TABS & BUSCADOR */}
          <div className="flex flex-col md:flex-row items-center justify-between border-b border-zinc-800/60 px-4 pt-2">
            <div className="flex gap-6">
              <button className="text-orange-400 font-bold text-sm border-b-2 border-orange-400 pb-3">Active Directory</button>
              <button className="text-gray-500 hover:text-gray-300 font-bold text-sm border-b-2 border-transparent pb-3 transition-colors">Archived</button>
              <button className="text-gray-500 hover:text-gray-300 font-bold text-sm border-b-2 border-transparent pb-3 transition-colors">Family Units</button>
            </div>

            <div className="flex items-center gap-4 pb-3">
              <div className="relative w-64 hidden md:block">
                <input
                  type="text"
                  placeholder="Global search..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-zinc-700/50 bg-[#141414] text-sm text-gray-300 focus:border-orange-500/50 outline-none transition-colors"
                />
                <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 text-xs" />
                <div className="absolute top-1/2 right-2 transform -translate-y-1/2 text-[10px] text-gray-600 bg-zinc-800 px-1.5 rounded">⌘K</div>
              </div>
              <div className="flex gap-2">
                <button className="p-1.5 text-gray-400 hover:text-white rounded bg-[#141414] border border-zinc-700/50"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg></button>
                <button className="p-1.5 text-gray-600 hover:text-white rounded"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg></button>
                <button className="p-1.5 text-gray-600 hover:text-white rounded"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg></button>
              </div>
            </div>
          </div>

          {/* LISTA DE PACIENTES (Estilo Table) */}
          {cargando ? (
            <div className="flex justify-center py-20 bg-[#1a1a1a]">
              <FaSpinner className="text-5xl text-orange-400 animate-spin" />
            </div>
          ) : pacientesFiltrados.length === 0 ? (
            <div className="bg-[#1a1a1a] rounded-3xl p-16 text-center">
              <FaSearch className="text-4xl text-zinc-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-300">No records found</h2>
              <p className="text-gray-500 font-medium mt-2 text-sm">Adjust filters or try a different search term.</p>
            </div>
          ) : (
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left min-w-[900px]">
                <thead>
                  <tr className="text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-zinc-800/60 bg-[#1a1a1a]">
                    <th className="px-6 py-4">Patient Information</th>
                    <th className="px-4 py-4">Status</th>
                    <th className="px-4 py-4">ID / Insurance</th>
                    <th className="px-4 py-4">Last Visit</th>
                    <th className="px-4 py-4">Upcoming</th>
                    <th className="px-6 py-4 text-right">Quick Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 bg-[#171717]">
                  {pacientesFiltrados.map((paciente) => (
                    <tr key={paciente._id} className="hover:bg-[#1f1f1f] transition-colors group">

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img src={`https://ui-avatars.com/api/?name=${paciente.nombre}+${paciente.apellido || ''}&background=1e293b&color=cbd5e1&rounded=true`} className="w-10 h-10 rounded-full border border-zinc-700/50" alt="avatar" />
                          <div>
                            <h3 className="text-sm font-bold text-gray-200 group-hover:text-white flex items-center gap-2">
                              {paciente.nombre} {paciente.apellido || ''}
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-blue-500"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                            </h3>
                            <p className="text-xs text-gray-500">{paciente.email}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <span className="bg-emerald-950/40 text-emerald-500 border border-emerald-900/50 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 w-max">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> ACTIVE
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <p className="text-xs font-bold text-gray-300">#DX-{paciente._id.substring(paciente._id.length - 4)}</p>
                        <p className="text-[10px] font-bold text-gray-600 uppercase">Self-Pay</p>
                      </td>

                      <td className="px-4 py-4">
                        <p className="text-xs font-medium text-gray-300">Oct 12, 2023</p>
                        <p className="text-[10px] text-gray-500">General Cleaning</p>
                      </td>

                      <td className="px-4 py-4">
                        <p className="text-xs font-bold text-orange-400/90">Dec 20, 2023</p>
                        <p className="text-[10px] text-gray-500">Implant Cons.</p>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <Link
                          to={`/admin/paciente/${paciente._id}`}
                          className="inline-flex text-center hover:bg-orange-400/10 text-orange-400 px-4 py-2 rounded-lg font-bold text-xs transition-all shadow-sm items-center justify-center gap-2 border border-transparent hover:border-orange-500/20"
                        >
                          OPEN FILE
                        </Link>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between items-center px-6 py-4 bg-[#141414] border-t border-zinc-800/60 rounded-b-2xl">
                <div className="flex items-center gap-3">
                  <span className="bg-zinc-800 text-[10px] font-bold uppercase tracking-widest text-gray-500 px-3 py-1.5 rounded flex items-center gap-2">
                    Command Palette <span className="flex gap-1"><kbd className="bg-zinc-950 px-1 rounded">⌘</kbd><kbd className="bg-zinc-950 px-1 rounded">P</kbd></span>
                  </span>
                  <p className="text-xs text-gray-600">Showing <span className="text-gray-400 font-bold">1 - {pacientesFiltrados.length}</span> of {pacientesFiltrados.length} records</p>
                </div>
                <div className="flex gap-1 text-xs">
                  <button className="w-8 h-8 flex items-center justify-center rounded border border-zinc-800 text-gray-500 hover:text-white">&lt;</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded bg-orange-300 text-orange-950 font-bold">1</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded border border-zinc-800 text-gray-500 hover:text-white">2</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded border border-zinc-800 text-gray-500 hover:text-white">...</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded border border-zinc-800 text-gray-500 hover:text-white">&gt;</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </LayoutAdmin>
  );
};

export default AdminPacientes;
