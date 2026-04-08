import { useState, useEffect } from 'react';
import LayoutAdmin from "../../components/layouts/LayoutAdmin.jsx";
import { FaCog, FaClock, FaListUl, FaPlus, FaTrash, FaSave } from 'react-icons/fa';
// import api from '../../api/axios.js'; // Descomentar cuando conectes al backend

const AdminConfiguracion = () => {
  // Estados para Horarios y Servicios
  const [horarios, setHorarios] = useState({ apertura: '09:00', cierre: '18:00', intervalo: '30' });
  const [servicios, setServicios] = useState([
    { id: 1, nombre: 'Consulta General', duracion: 30 },
    { id: 2, nombre: 'Limpieza Dental', duracion: 45 },
    { id: 3, nombre: 'Ortodoncia', duracion: 60 }
  ]);
  const [nuevoServicio, setNuevoServicio] = useState({ nombre: '', duracion: 30 });

  // Agregar Servicio
  const handleAddServicio = (e) => {
    e.preventDefault();
    if (!nuevoServicio.nombre) return;
    setServicios([...servicios, { id: Date.now(), ...nuevoServicio }]);
    setNuevoServicio({ nombre: '', duracion: 30 });
  };

  // Eliminar Servicio
  const handleDeleteServicio = (id) => {
    setServicios(servicios.filter(s => s.id !== id));
  };

  // Guardar Configuración (Simulación)
  const handleGuardarTodo = () => {
    // Aquí harías un api.post('/configuracion', { horarios, servicios })
    alert("¡Configuraciones guardadas con éxito en el sistema!");
  };

  return (
    <LayoutAdmin>
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-primary tracking-tight">Configuración del Sistema</h1>
          <p className="text-text-light font-medium">Ajusta los parámetros operativos del consultorio.</p>
        </div>
        <button onClick={handleGuardarTodo} className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-md transition-all">
          <FaSave /> Guardar Cambios
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* PANEL DE HORARIOS */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-secondary/30">
          <h2 className="text-xl font-black text-primary mb-6 flex items-center gap-2"><FaClock /> Horarios de Atención</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-text mb-1">Hora de Apertura</label>
              <input type="time" value={horarios.apertura} onChange={e => setHorarios({...horarios, apertura: e.target.value})} className="w-full p-3 border rounded-xl outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-bold text-text mb-1">Hora de Cierre</label>
              <input type="time" value={horarios.cierre} onChange={e => setHorarios({...horarios, cierre: e.target.value})} className="w-full p-3 border rounded-xl outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-bold text-text mb-1">Intervalo de Turnos (Minutos)</label>
              <select value={horarios.intervalo} onChange={e => setHorarios({...horarios, intervalo: e.target.value})} className="w-full p-3 border rounded-xl outline-none focus:border-primary">
                <option value="15">Cada 15 minutos</option>
                <option value="30">Cada 30 minutos</option>
                <option value="60">Cada 1 hora</option>
              </select>
            </div>
          </div>
        </div>

        {/* PANEL DE SERVICIOS */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-secondary/30">
          <h2 className="text-xl font-black text-primary mb-6 flex items-center gap-2"><FaListUl /> Catálogo de Servicios</h2>
          
          {/* Formulario rápido para agregar */}
          <form onSubmit={handleAddServicio} className="flex gap-2 mb-6 bg-background/50 p-4 rounded-xl border border-secondary/50">
            <input type="text" placeholder="Ej: Blanqueamiento" value={nuevoServicio.nombre} onChange={e => setNuevoServicio({...nuevoServicio, nombre: e.target.value})} className="flex-1 p-2 border rounded-lg text-sm" />
            <select value={nuevoServicio.duracion} onChange={e => setNuevoServicio({...nuevoServicio, duracion: Number(e.target.value)})} className="w-24 p-2 border rounded-lg text-sm">
              <option value={15}>15 min</option>
              <option value={30}>30 min</option>
              <option value={45}>45 min</option>
              <option value={60}>60 min</option>
            </select>
            <button type="submit" className="bg-primary text-white p-2 rounded-lg hover:brightness-110"><FaPlus /></button>
          </form>

          {/* Lista de Servicios Activos */}
          <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2">
            {servicios.map(servicio => (
              <div key={servicio.id} className="flex items-center justify-between p-3 border-b border-secondary/20 hover:bg-secondary/10 rounded-lg">
                <div>
                  <p className="font-bold text-text">{servicio.nombre}</p>
                  <p className="text-xs text-text-light">{servicio.duracion} minutos aprox.</p>
                </div>
                <button onClick={() => handleDeleteServicio(servicio.id)} className="text-red-400 hover:text-red-600 p-2"><FaTrash /></button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </LayoutAdmin>
  );
};

export default AdminConfiguracion;
