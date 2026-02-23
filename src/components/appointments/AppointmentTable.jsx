const mockAppointments = [
  {
    paciente: "Juan Pérez",
    doctor: "Dr. Pérez",
    fecha: "2025-10-10",
    estado: "Pendiente",
  },
];

const AppointmentTable = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-primary">
        Turnos Programados
      </h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full">
          <thead className="bg-secondary">
            <tr>
              <th className="p-3 text-left">Paciente</th>
              <th className="p-3 text-left">Doctor</th>
              <th className="p-3 text-left">Fecha</th>
              <th className="p-3 text-left">Estado</th>
            </tr>
          </thead>

          <tbody>
            {mockAppointments.map((turno, i) => (
              <tr key={i} className="border-t">
                <td className="p-3">{turno.paciente}</td>
                <td className="p-3">{turno.doctor}</td>
                <td className="p-3">{turno.fecha}</td>
                <td className="p-3">{turno.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentTable;