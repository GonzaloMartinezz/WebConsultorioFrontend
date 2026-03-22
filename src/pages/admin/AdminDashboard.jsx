import { useState } from 'react';
import LayoutAdmin from "../../components/layouts/LayoutAdmin.jsx"; 
import { FaCalendarDay, FaUserClock, FaHistory, FaPlus, FaCheckCircle, FaTimesCircle, FaPen, FaFileInvoiceDollar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const stats = [
    { name: "Turnos para Hoy", value: "12", icon: FaCalendarDay, color: "text-primary" },
    { name: "Consultas Pendientes", value: "3", icon: FaUserClock, color: "text-red-500" },
    { name: "Ingresos Estimados", value: "$450k", icon: FaFileInvoiceDollar, color: "text-green-600" },
  ];

  const [turnos, setTurnos] = useState([
    { id: 1, hora: "09:00", paciente: "Gonzalo Martínez", profesional: "Dr. Adolfo Martínez", motivo: "Control Ortodoncia", estado: "Pendiente" },
    { id: 2, hora: "10:30", paciente: "María Rodríguez", profesional: "Dra. Erina Carcara", motivo: "Limpieza Dental", estado: "Confirmado" },
    { id: 3, hora: "11:00", paciente: "Carlos Sánchez", profesional: "Dra. Erina Carcara", motivo: "Blanqueamiento", estado: "Confirmado" },
    { id: 4, hora: "16:00", paciente: "Laura Gómez", profesional: "Dr. Adolfo Martínez", motivo: "Consulta Implante", estado: "Pendiente" },
  ]);

  // Toast System Nativo
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000);
  };

  // Acciones Funcionales Reales Visualmente
  const handleApprove = (id) => {
    setTurnos(p => p.map(t => t.id === id ? { ...t, estado: 'Confirmado' } : t));
    showToast('¡Turno Confirmado! Se notificó al paciente por API WhatsApp.', 'success');
  };

  const handleReject = (id) => {
    setTurnos(p => p.map(t => t.id === id ? { ...t, estado: 'Cancelado' } : t));
    showToast('Turno Rechazado y espacio liberado de la agenda.', 'error');
  };

  const handleEdit = (id) => {
    showToast(`Abriendo el menú de edición rápida para el turno #${id}...`, 'info');
  };

  return (
    <LayoutAdmin>
      {/* 
        SISTEMA NATIVO DE NOTIFICACIONES (TOASTS) 
        El usuario quería "Alerta visual de nuevos, aceptado y rechazado"
      */}
      {toast.show && (
        <div className={`fixed top-10 right-10 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl font-bold animate-fade-in text-white tracking-wide border-2 
          ${toast.type === 'success' ? 'bg-green-500 border-green-400' : toast.type === 'error' ? 'bg-red-500 border-red-400' : 'bg-primary border-accent-orange'}`}
        >
          {toast.type === 'success' ? <FaCheckCircle className="text-2xl" /> : <FaTimesCircle className="text-2xl" />}
          {toast.message}
        </div>
      )}

      {/* ======================================================== */}
      {/* TÍTULO ESTRICTAMENTE ARRIBA (Por el feedback del usuario) */}
      {/* ======================================================== */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6" data-aos="fade-down">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-orange mb-1">Bienvenido, Administrador</p>
          <h1 className="text-3xl lg:text-4xl font-black text-primary tracking-tight">
            Panel de Administración <span className="text-accent-orange text-xl lg:text-2xl ml-2">C&M</span>
          </h1>
        </div>
        <Link 
          to="/turnos" 
          className="w-full md:w-auto px-8 py-3.5 text-white font-bold text-sm rounded-xl bg-primary shadow-lg hover:bg-primary/90 active:scale-95 transition-all uppercase tracking-wide flex items-center justify-center gap-3 hover:-translate-y-1 hover:shadow-xl"
        >
          <FaPlus /> Crear Nuevo Turno FrontDesk
        </Link>
      </header>

      <main className="space-y-10 pb-10">
        
        {/* ======================================================== */}
        {/* CARDS ESTRICTAMENTE ABAJO DEL TÍTULO */}
        {/* ======================================================== */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6" data-aos="fade-up" data-aos-delay="100">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-[2rem] p-8 shadow-sm border border-secondary/60 flex items-center justify-between hover:border-accent-orange transition-colors group cursor-pointer">
                <div>
                  <p className="text-text-light text-xs font-black uppercase tracking-widest mb-2">{stat.name}</p>
                  <p className="text-text text-5xl font-black leading-none tracking-tighter">{stat.value}</p>
                </div>
                <div className={`p-4 rounded-full bg-secondary/30 ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="text-4xl" />
                </div>
              </div>
            );
          })}
        </section>

        {/* ======================================================== */}
        {/* TABLA DE LA AGENDA DE HOY (Con interactividad real en memoria) */}
        {/* ======================================================== */}
        <div data-aos="fade-up" data-aos-delay="200" className="pt-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-primary text-2xl font-black uppercase tracking-tight">Agenda de Hoy</h2>
            <Link to="/admin/pendientes" className="text-sm font-bold text-accent-orange hover:underline flex items-center gap-2">
              Ver Todos los Pendientes <span className="bg-red-500 text-white rounded-full px-2 py-0.5 text-xs">3</span>
            </Link>
          </div>
          
          <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-secondary/50 overflow-hidden w-full overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="border-b-2 border-primary/10">
                <tr>
                  <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-primary">Hora</th>
                  <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-primary">Paciente</th>
                  <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-primary">Profesional</th>
                  <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-primary">Motivo</th>
                  <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-primary">Estado</th>
                  <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-primary text-right">Acciones Rápidas</th>
                </tr>
              </thead>
              <tbody>
                {turnos.map((turno) => (
                  <tr key={turno.id} className="border-b border-secondary/20 hover:bg-secondary/10 transition-colors group">
                    <td className="px-6 py-5 font-black text-primary text-lg">{turno.hora}</td>
                    <td className="px-6 py-5 font-bold text-text text-base">{turno.paciente}</td>
                    <td className="px-6 py-5 font-semibold text-text-light text-sm">{turno.profesional}</td>
                    <td className="px-6 py-5 text-text-light text-sm">{turno.motivo}</td>
                    <td className="px-6 py-5">
                      <span className={`inline-block px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider
                        ${turno.estado === 'Confirmado' ? 'bg-green-100 text-green-700 border border-green-200' : 
                          turno.estado === 'Cancelado' ? 'bg-red-100 text-red-700 border border-red-200' : 
                          'bg-yellow-100 text-yellow-700 border border-yellow-200 shadow-inner'}`}>
                        {turno.estado}
                      </span>
                    </td>
                    
                    {/* FUNCIONALIDAD DE BOTONES QUE ALTERA EL ESTADO (y lanza las alertas) */}
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-90 group-hover:opacity-100 transition-opacity">
                        {turno.estado !== 'Confirmado' && (
                          <button onClick={() => handleApprove(turno.id)} className="text-green-600 bg-green-50 hover:bg-green-100 p-2.5 rounded-xl hover:scale-110 transition-transform shadow-sm" title="Aprobar Turno y Notificar">
                            <FaCheckCircle className="text-xl" />
                          </button>
                        )}
                        {turno.estado !== 'Cancelado' && (
                          <button onClick={() => handleReject(turno.id)} className="text-red-500 bg-red-50 hover:bg-red-100 p-2.5 rounded-xl hover:scale-110 transition-transform shadow-sm" title="Rechazar Turno">
                            <FaTimesCircle className="text-xl" />
                          </button>
                        )}
                        <button onClick={() => handleEdit(turno.id)} className="text-primary bg-secondary/30 hover:bg-secondary/50 p-2.5 rounded-xl hover:scale-110 transition-transform shadow-sm" title="Configurar Info">
                          <FaPen className="text-xl" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
      </main>
    </LayoutAdmin>
  );
};

export default AdminDashboard;