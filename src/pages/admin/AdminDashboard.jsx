import AdminLayout from "../../components/layouts/AdminLayout.jsx";
import AppointmentTable from "../../components/appointments/AppointmentTable.jsx"; // IMPORTANTE: Ver PASO 3 para la tabla
// Iconos profesionales y modernos
import { FaCalendarDay, FaUserClock, FaHistory, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  // Simulación de datos para las tarjetas de estadísticas superiores
  const stats = [
    { name: "Turnos para Hoy", value: "12", icon: FaCalendarDay, color: "text-primary" },
    { name: "Consultas Pendientes", value: "3", icon: FaUserClock, color: "text-accent-orange" },
    { name: "Turnos para Mañana", value: "8", icon: FaHistory, color: "text-text-light" },
  ];

  return (
    // ENVOLVEMOS TODO EN EL LAYOUT ADMIN
    <AdminLayout>

      {/* ======================================================== */}
      {/* 1. ESTADÍSTICAS RÁPIDAS (AHORA ARRIBA - Inspirado en references) */}
      {/* ======================================================== */}
      <section className="mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-4xl p-8 shadow-sm border border-secondary flex items-center gap-6 hover:border-accent-orange transition-colors duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div className={`p-4 rounded-full bg-secondary/50 ${stat.color}`}>
                <Icon className="text-4xl" />
              </div>
              <div>
                <p className="text-text-light text-sm font-semibold uppercase tracking-wide">{stat.name}</p>
                <p className="text-text text-6xl font-black mt-1 leading-none tracking-tighter">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </section>

      {/* ======================================================== */}
      {/* 2. TÍTULO SIMPLE (El que te gustó) Y AGENDA (Abajo) */}
      {/* ======================================================== */}
      <section className="space-y-8 pb-10">

        {/* Encabezado Simple y Limpio */}
        <header className="pb-5 border-b-2 border-secondary/30 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold text-primary tracking-tight">
            Panel de Administración - Centro Odontológico <span className="text-accent-orange">C&M</span>
          </h1>
          {/* Botón CTA Superior */}
          <Link
            to="/turnos"
            className="w-full md:w-auto text-center px-6 py-3 text-text font-bold text-sm rounded-full bg-accent-orange shadow-md hover:brightness-110 transition-all uppercase tracking-wide flex items-center justify-center gap-2"
          >
            <FaPlus /> Nuevo Turno
          </Link>
        </header>

        {/* Sección de la Tabla (Agenda de Hoy) */}
        <div>
          <h2 className="text-primary text-3xl font-black uppercase tracking-tight mb-8">
            Agenda de Hoy
          </h2>

          {/* Tu componente de tabla fluye aquí. DEBES ACTUALIZARLO (Ver Paso 3) */}
          <div className="bg-white rounded-3xl p-4 shadow-sm border border-secondary/50 overflow-hidden">
            <AppointmentTable />
          </div>
        </div>

      </section>

    </AdminLayout>
  );
};

export default AdminDashboard;