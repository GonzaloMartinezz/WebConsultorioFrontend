import AppointmentTable from "../../components/appointments/AppointmentTable.jsx";

const AdminDashboard = () => {
  return (
    <section className="bg-background min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 lg:px-0 space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-primary">
            Panel del profesional
          </h1>
          <p className="text-sm text-text/80 max-w-2xl">
            Desde este panel podés visualizar los turnos solicitados por los
            pacientes, revisar horarios y organizar tu agenda diaria.
          </p>
        </header>

        <AppointmentTable />
      </div>
    </section>
  );
};

export default AdminDashboard;