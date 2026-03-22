import { useState } from 'react';
import LayoutAdmin from "../../components/layouts/LayoutAdmin.jsx";
import { FaSearch, FaUserPlus, FaFileMedical, FaWhatsapp, FaTooth, FaFilter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdminPacientes = () => {
  // Simulamos la base de datos
  const [pacientes] = useState([
    { id: 1, nombre: "Gonzalo Martínez", dni: "34.009.998", telefono: "+54 9 381 1234567", ultimaVisita: "15/03/2026", estado: "Tratamiento Activo" },
    { id: 2, nombre: "María Rodríguez", dni: "28.555.444", telefono: "+54 9 381 7654321", ultimaVisita: "02/02/2026", estado: "Alta" },
    { id: 3, nombre: "Carlos Sánchez", dni: "40.111.222", telefono: "+54 9 381 5556666", ultimaVisita: "Hoy", estado: "Tratamiento Activo" },
    { id: 4, nombre: "Laura Gómez", dni: "31.222.333", telefono: "+54 9 381 4445555", ultimaVisita: "10/12/2025", estado: "Inactivo" },
  ]);

  return (
    <LayoutAdmin>
      <header className="mb-8 pb-5 border-b-2 border-secondary/30 flex flex-col md:flex-row md:items-center justify-between gap-4" data-aos="fade-down">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-orange">Base de Datos</p>
          <h1 className="text-3xl font-black text-primary tracking-tight">Directorio de Pacientes</h1>
        </div>
        <button className="w-full md:w-auto px-6 py-3 text-white font-bold text-sm rounded-full bg-primary shadow-md hover:brightness-110 active:scale-95 transition-all uppercase tracking-wide flex items-center justify-center gap-2">
          <FaUserPlus /> Nuevo Paciente
        </button>
      </header>

      <main className="space-y-6 pb-10" data-aos="fade-up">
        
        {/* BUSCADOR Y FILTROS */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-secondary flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-1/2">
            <input 
              type="text" 
              placeholder="Buscar por Nombre, DNI o Teléfono..." 
              className="w-full px-12 py-3 rounded-xl border border-secondary bg-background/30 focus:border-accent-orange outline-none font-medium"
            />
            <FaSearch className="absolute top-1/2 left-5 transform -translate-y-1/2 text-text-light" />
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-auto">
              <select className="w-full md:w-auto pl-10 pr-6 py-3 rounded-xl border border-secondary bg-white text-sm font-bold text-primary outline-none appearance-none cursor-pointer">
                <option value="todos">Todos los Estados</option>
                <option value="activos">Tratamiento Activo</option>
                <option value="alta">De Alta</option>
              </select>
              <FaFilter className="absolute top-1/2 left-4 transform -translate-y-1/2 text-accent-orange" />
            </div>
          </div>
        </div>

        {/* TABLA DE DATOS */}
        <div className="bg-white rounded-[2rem] p-4 shadow-sm border border-secondary/50 overflow-hidden w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead className="bg-background/50 border-b border-secondary/70">
              <tr>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-primary">Paciente</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-primary">DNI</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-primary">Contacto</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-primary">Última Visita</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-primary">Estado</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-primary text-right">Acciones Rápidas</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map((paciente) => (
                <tr key={paciente.id} className="border-b border-secondary/20 hover:bg-secondary/10 transition-colors group">
                  <td className="px-6 py-5 font-bold text-text text-base">{paciente.nombre}</td>
                  <td className="px-6 py-5 font-semibold text-text-light text-sm">{paciente.dni}</td>
                  <td className="px-6 py-5 text-text-light text-sm">{paciente.telefono}</td>
                  <td className="px-6 py-5 text-text-light text-sm font-medium">{paciente.ultimaVisita}</td>
                  <td className="px-6 py-5">
                    <span className={`inline-block px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider
                      ${paciente.estado === 'Tratamiento Activo' ? 'bg-accent-orange/20 text-accent-orange' : 
                        paciente.estado === 'Alta' ? 'bg-green-100 text-green-700' : 'bg-secondary/40 text-text-light'}`}>
                      {paciente.estado}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-70 group-hover:opacity-100 transition-opacity">
                      <button className="text-green-500 hover:text-green-600 bg-green-50 p-2 rounded-lg hover:scale-110 transition-transform" title="WhatsApp">
                        <FaWhatsapp className="text-lg" />
                      </button>
                      <Link to="/admin/odontograma" className="text-accent-orange hover:text-orange-600 bg-orange-50 p-2 rounded-lg hover:scale-110 transition-transform" title="Odontograma">
                        <FaTooth className="text-lg" />
                      </Link>
                      <button className="text-primary hover:text-primary/70 bg-primary/10 p-2 rounded-lg hover:scale-110 transition-transform" title="Historia Clínica">
                        <FaFileMedical className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Paginación */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-secondary/30 mt-2">
            <p className="text-sm text-text-light font-medium">Mostrando 1 a 4 de 240 pacientes</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-secondary rounded-lg text-sm font-bold text-text-light hover:bg-secondary/20">Anterior</button>
              <button className="px-4 py-2 border border-secondary rounded-lg text-sm font-bold text-text hover:bg-secondary/20">Siguiente</button>
            </div>
          </div>
        </div>

      </main>
    </LayoutAdmin>
  );
};

export default AdminPacientes;
