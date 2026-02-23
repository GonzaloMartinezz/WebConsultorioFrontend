import AppointmentTable from "../../components/appointments/AppointmentTable.jsx";

const AdminDashboard = () => {
  return (
    <div className="bg-background min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-primary">
          Panel del Profesional
        </h1>

        <AppointmentTable />
      </div>
    </div>
  );
};

export default AdminDashboard;