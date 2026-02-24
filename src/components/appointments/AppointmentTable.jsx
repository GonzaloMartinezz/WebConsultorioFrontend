const mockAppointments = [
  {
    paciente: "Juan Pérez",
    doctor: "Dr. Pérez — Odontología general",
    fecha: "2025-10-10",
    hora: "10:30",
    estado: "Pendiente de confirmar",
  },
  {
    paciente: "María Gómez",
    doctor: "Dra. Gómez — Ortodoncia",
    fecha: "2025-10-12",
    hora: "15:00",
    estado: "Confirmado",
  },
];

const AppointmentTable = () => {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <div className="flex flex-col gap-2 mb-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary">
            Turnos programados
          </h2>
          <p className="text-xs text-text/70">
            Vista interna para profesionales y administración. Aquí podés
            revisar el estado de los turnos solicitados por los pacientes.
          </p>
        </div>
        <div className="text-xs text-text/60">
          <p>
            Leyenda de estado:{" "}
            <span className="font-medium text-primary">Pendiente</span> /
            <span className="font-medium text-green-700"> Confirmado</span>
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-secondary/80">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-left text-xs uppercase tracking-wide text-text/80">
            <tr>
              <th className="px-4 py-3">Paciente</th>
              <th className="px-4 py-3">Profesional</th>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3">Hora</th>
              <th className="px-4 py-3">Estado</th>
            </tr>
          </thead>

          <tbody>
            {mockAppointments.map((turno, i) => (
              <tr
                key={i}
                className="border-t border-secondary/60 hover:bg-secondary/40 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-text">
                  {turno.paciente}
                </td>
                <td className="px-4 py-3 text-text/85">{turno.doctor}</td>
                <td className="px-4 py-3 text-text/85">{turno.fecha}</td>
                <td className="px-4 py-3 text-text/85">{turno.hora}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                      turno.estado.includes("Pendiente")
                        ? "bg-amber-100 text-amber-800"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {turno.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentTable;