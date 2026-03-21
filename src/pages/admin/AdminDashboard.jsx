import AppointmentTable from "../../components/appointments/AppointmentTable.jsx";

const AdminDashboard = () => {
  return (
    <section className="bg-background min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 lg:px-0 space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-primary text-center mb-4">
            Panel de Administración - Centro Odontológico C&M
          </h1>
        </header>
        <main>
          <div className="bg-secondary/50 rounded-4xl p-6 shadow-md border border-secondary/80">
            <h2 className="text-primary text-2xl font-bold mb-7 text-center">
              Buenos dias! Estos son los turnos programados para el dia de hoy.
            </h2>
            <p className="text-1xl text-text/90 mb-6 text-center max-w-5xl mx-auto leading-relaxed">
              Aquí puedes ver todos los turnos que tienes programados para el día de hoy. 
              Si necesitas modificar algún turno, puedes hacerlo desde esta sección.
              Recuerda revisar los detalles de cada turno para asegurarte de que todo esté correcto.
            </p>
          </div>
          <div>
            <h2 className="text-primary text-3xl font-bold mb-7 mt-10 text-center">
              Turnos Programados para Hoy
            </h2>
          </div>
        </main>
        <AppointmentTable />
      </div>
    </section>
  );
};

export default AdminDashboard;