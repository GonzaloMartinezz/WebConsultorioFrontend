import { useState, useEffect } from 'react';
import LayoutAdmin from "../../components/layouts/LayoutAdmin.jsx";
import {
  FaCog, FaClock, FaListUl, FaPlus, FaTrash, FaSave,
  FaBell, FaWhatsapp, FaEnvelope, FaPaperPlane, FaCalendarCheck
} from 'react-icons/fa';
import api from '../../api/axios.js';

const AdminConfiguracion = () => {
  // Estados para Horarios y Servicios
  const [horarios, setHorarios] = useState({ apertura: '09:00', cierre: '18:00', intervalo: '30' });
  const [servicios, setServicios] = useState([
    { id: 1, nombre: 'Consulta General', duracion: 30 },
    { id: 2, nombre: 'Limpieza Dental', duracion: 45 },
    { id: 3, nombre: 'Ortodoncia', duracion: 60 }
  ]);
  const [nuevoServicio, setNuevoServicio] = useState({ nombre: '', duracion: 30 });
  const [turnosManana, setTurnosManana] = useState([]);
  const [loadingTurnos, setLoadingTurnos] = useState(false);
  const [enviandoMasivo, setEnviandoMasivo] = useState(false);

  // Cargar configuración y turnos al iniciar
  useEffect(() => {
    fetchConfiguracion();
    fetchTurnosManana();
  }, []);

  const fetchConfiguracion = async () => {
    try {
      const res = await api.get('/configuracion');
      if (res.data) {
        setHorarios(res.data.horarios);
        setServicios(res.data.servicios);
      }
    } catch (error) {
      console.error("Error al cargar configuración", error);
    }
  };

  const fetchTurnosManana = async () => {
    setLoadingTurnos(true);
    try {
      const respuesta = await api.get('/turnos');
      const d = new Date();
      // Calcular fecha de mañana en el formato local (YYYY-MM-DD)
      const manana = new Date(d);
      manana.setDate(manana.getDate() + 1);
      const mananaStr = `${manana.getFullYear()}-${String(manana.getMonth() + 1).padStart(2, '0')}-${String(manana.getDate()).padStart(2, '0')}`;

      const turnosFiltrados = respuesta.data.filter(t => {
        // En base de datos t.fecha viene como "2026-04-20"
        return t.fecha.startsWith(mananaStr) && (t.estado === 'Pendiente' || t.estado === 'Confirmado');
      });

      turnosFiltrados.sort((a, b) => a.hora.localeCompare(b.hora));
      setTurnosManana(turnosFiltrados);
    } catch (error) {
      console.error("Error al cargar turnos", error);
    } finally {
      setLoadingTurnos(false);
    }
  };

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

  // Guardar Configuración Real
  const handleGuardarTodo = async () => {
    try {
      await api.put('/configuracion', { horarios, servicios });
      alert("¡Configuraciones guardadas con éxito en el sistema!");
    } catch (error) {
      alert("Error al guardar la configuración.");
      console.error(error);
    }
  };

  const enviarIndividual = (turno, via) => {
    const nombre = `${turno.nombrePaciente} ${turno.apellidoPaciente}`;
    // Usamos el formato local en lugar de toLocaleDateString que causa conflicto con zonas horarias
    const parts = turno.fecha.split('-');
    const fechaFormat = parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : turno.fecha;
    const mensaje = `Hola ${nombre}, recordatorio de tu turno en Centro Odontológico C&M el día ${fechaFormat} a las ${turno.hora} hs. Motivo: ${turno.motivo}. ¡Te esperamos!`;

    if (via === 'WhatsApp') {
      const url = `https://wa.me/${turno.telefono.replace(/\D/g, '')}?text=${encodeURIComponent(mensaje)}`;
      window.open(url, '_blank');
    } else {
      const mailUrl = `mailto:${turno.email}?subject=Recordatorio de Turno - Centro Odontológico&body=${encodeURIComponent(mensaje)}`;
      window.open(mailUrl, '_blank');
    }
  };

  // Envío masivo iterativo por frontend
  const handleRecordatoriosMañana = () => {
    if (turnosManana.length === 0) {
      alert("No hay turnos agendados para el día de mañana.");
      return;
    }

    if (!window.confirm(`¿Estás seguro de enviar mensajes masivos a ${turnosManana.length} paciente(s)? Tu navegador abrirá automáticamente múltiples pestañas.`)) return;

    setEnviandoMasivo(true);
    
    // Para evitar que el navegador bloquee un aluvión de popups (pop-up blocker),
    // es necesario que el usuario habilite las ventanas emergentes en el sitio.
    let index = 0;
    const interval = setInterval(() => {
      if (index >= turnosManana.length) {
        clearInterval(interval);
        setEnviandoMasivo(false);
        // También procesamos con backend para que quede registro (opcional)
        api.post('/notificaciones/recordatorios-manana').catch(console.error);
        alert(`¡Listo! Se han abierto las pestañas para ${turnosManana.length} pacientes.`);
        return;
      }
      const turno = turnosManana[index];
      // Si tiene teléfono, WhatsApp. Si no, Email
      if (turno.telefono) {
        enviarIndividual(turno, 'WhatsApp');
      } else if (turno.email) {
        enviarIndividual(turno, 'Mail');
      }
      index++;
    }, 1200); // Retardo de 1.2 seg entre pacientes
  };

  return (
    <LayoutAdmin>
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-primary tracking-tight">Configuración del Sistema</h1>
          <p className="text-text-light font-medium">Ajusta los parámetros operativos y gestiona recordatorios.</p>
        </div>
        <button onClick={handleGuardarTodo} className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-md transition-all">
          <FaSave /> Guardar Cambios
        </button>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">

        {/* PANEL DE HORARIOS */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-secondary/30">
          <h2 className="text-xl font-black text-primary mb-6 flex items-center gap-2"><FaClock /> Horarios de Atención</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-text mb-1">Hora de Apertura</label>
              <input type="time" value={horarios.apertura} onChange={e => setHorarios({ ...horarios, apertura: e.target.value })} className="w-full p-3 border rounded-xl outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-bold text-text mb-1">Hora de Cierre</label>
              <input type="time" value={horarios.cierre} onChange={e => setHorarios({ ...horarios, cierre: e.target.value })} className="w-full p-3 border rounded-xl outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-bold text-text mb-1">Intervalo de Turnos (Minutos)</label>
              <select value={horarios.intervalo} onChange={e => setHorarios({ ...horarios, intervalo: e.target.value })} className="w-full p-3 border rounded-xl outline-none focus:border-primary">
                <option value="15">Cada 15 minutos</option>
                <option value="30">Cada 30 minutos</option>
                <option value="60">Cada 1 hora</option>
              </select>
            </div>
          </div>
        </div>

        {/* PANEL DE SERVICIOS */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-secondary/30">
          <h2 className="text-xl font-black text-primary mb-6 flex items-center gap-2"><FaListUl /> Catálogo de Servicios</h2>

          <form onSubmit={handleAddServicio} className="flex gap-2 mb-6 bg-background/50 p-4 rounded-xl border border-secondary/50">
            <input type="text" placeholder="Ej: Blanqueamiento" value={nuevoServicio.nombre} onChange={e => setNuevoServicio({ ...nuevoServicio, nombre: e.target.value })} className="flex-1 p-2 border rounded-lg text-sm" />
            <select value={nuevoServicio.duracion} onChange={e => setNuevoServicio({ ...nuevoServicio, duracion: Number(e.target.value) })} className="w-24 p-2 border rounded-lg text-sm">
              <option value={15}>15 min</option>
              <option value={30}>30 min</option>
              <option value={45}>45 min</option>
              <option value={60}>60 min</option>
            </select>
            <button type="submit" className="bg-primary text-white p-2 rounded-lg hover:brightness-110"><FaPlus /></button>
          </form>

          <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
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

      {/* PANEL DE RECORDATORIOS AUTOMÁTICOS */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-secondary/30">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h2 className="text-2xl font-black text-primary flex items-center gap-2">
              <FaBell className="text-accent-orange" /> Recordatorios Automáticos
            </h2>
            <p className="text-text-light font-medium text-sm">Gestiona el envío de notificaciones a los pacientes del sistema.</p>
          </div>
          <button
            onClick={handleRecordatoriosMañana}
            disabled={enviandoMasivo}
            className={`w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-white shadow-lg transition-all transform active:scale-95 ${enviandoMasivo ? 'bg-secondary cursor-not-allowed' : 'bg-primary hover:bg-primary/90 hover:-translate-y-1'}`}
          >
            {enviandoMasivo ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Enviando...
              </span>
            ) : (
              <>
                <FaPaperPlane /> Enviar Recordatorios para los pacientes de Mañana
              </>
            )}
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-secondary/20">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary/10">
                <th className="p-4 font-black text-primary text-sm uppercase tracking-wider">Paciente</th>
                <th className="p-4 font-black text-primary text-sm uppercase tracking-wider">Fecha / Hora</th>
                <th className="p-4 font-black text-primary text-sm uppercase tracking-wider">Tratamiento</th>
                <th className="p-4 font-black text-primary text-sm uppercase tracking-wider text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary/10">
              {loadingTurnos ? (
                <tr>
                  <td colSpan="4" className="p-10 text-center text-text-light font-medium animate-pulse text-lg">Cargando próximos turnos...</td>
                </tr>
              ) : turnosManana.length > 0 ? (
                turnosManana.map(turno => (
                  <tr key={turno._id} className="hover:bg-secondary/5 transition-colors">
                    <td className="p-4">
                      <p className="font-black text-primary text-lg">{turno.nombrePaciente} {turno.apellidoPaciente}</p>
                      <p className="text-xs font-bold text-text-light">{turno.email || 'Sin email'}</p>
                    </td>
                    <td className="p-4 font-bold text-text">
                      <div className="flex flex-col">
                        <span className="flex items-center gap-1 text-primary"><FaCalendarCheck className="text-accent-orange" /> {turno.fecha.split('-').reverse().join('/')}</span>
                        <span className="text-sm text-text-light ml-5">{turno.hora} hs</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="bg-secondary/20 text-primary text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                        {turno.motivo}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => enviarIndividual(turno, 'WhatsApp')}
                          title="Enviar por WhatsApp"
                          className="bg-green-100 text-green-600 p-2.5 rounded-xl hover:bg-green-600 hover:text-white transition-all shadow-sm"
                        >
                          <FaWhatsapp className="text-xl" />
                        </button>
                        <button
                          onClick={() => enviarIndividual(turno, 'Mail')}
                          title="Enviar por Email"
                          className="bg-blue-100 text-blue-600 p-2.5 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                        >
                          <FaEnvelope className="text-xl" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-10 text-center text-text-light font-medium">No hay turnos agendados para el día de mañana.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default AdminConfiguracion;
