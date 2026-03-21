import { FaCheckCircle, FaTimesCircle, FaPen } from 'react-icons/fa';

const AppointmentTable = () => {
  // SIMULACIÓN DE DATOS REALES (Para la maqueta visual)
  const turnosMock = [
    { hora: "09:00", paciente: "Gonzalo Martínez", profesional: "Dr. Adolfo Martínez", motivo: "Control Ortodoncia", estado: "Pendiente" },
    { hora: "10:30", paciente: "María Rodríguez", profesional: "Dra. Erina Carcara", motivo: "Limpieza Dental", estado: "Confirmado" },
    { hora: "11:00", paciente: "Carlos Sánchez", profesional: "Dra. Erina Carcara", motivo: "Blanqueamiento", estado: "Confirmado" },
    { hora: "16:00", paciente: "Laura Gómez", profesional: "Dr. Adolfo Martínez", motivo: "Consulta Implante", estado: "Pendiente" },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[700px]">
        {/* ENCABEZADO DE LA TABLA - Estilo Pro */}
        <thead className="border-b border-secondary/70">
          <tr>
            <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-text-light">Hora</th>
            <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-text-light">Paciente</th>
            <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-text-light">Profesional</th>
            <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-text-light">Motivo</th>
            <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-text-light">Estado</th>
            {/* Alineamos la columna de acciones a la derecha */}
            <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-text-light text-right">Acciones</th>
          </tr>
        </thead>
        
        {/* CUERPO DE LA TABLA (C&M Style) */}
        <tbody>
          {turnosMock.map((turno, index) => (
            <tr key={index} className="border-b border-secondary/20 hover:bg-secondary/10 transition-colors">
              <td className="px-5 py-4 font-bold text-primary text-base">{turno.hora}</td>
              <td className="px-5 py-4 font-semibold text-text text-sm">{turno.paciente}</td>
              <td className="px-5 py-4 text-text-light text-sm">{turno.profesional}</td>
              <td className="px-5 py-4 text-text-light text-sm">{turno.motivo}</td>
              <td className="px-5 py-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold 
                  ${turno.estado === 'Confirmado' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {turno.estado}
                </span>
              </td>
              
              {/* ======================================================== */}
              {/* COLUMNA DE ACCIONES (NUEVOS ÍCONOS PROFESIONALES) */}
              {/* ======================================================== */}
              <td className="px-5 py-4 text-right">
                <div className="flex items-center justify-end gap-2.5">
                  {/* Aceptar: Tilde Verde */}
                  <button className="text-green-500 hover:text-green-600 hover:scale-110 transition-transform p-1 focus:outline-none" title="Aceptar Turno">
                    <FaCheckCircle className="text-xl" />
                  </button>
                  {/* Rechazar: X Roja */}
                  <button className="text-red-500 hover:text-red-600 hover:scale-110 transition-transform p-1 focus:outline-none" title="Rechazar Turno">
                    <FaTimesCircle className="text-xl" />
                  </button>
                  {/* Editar: Lápiz Amarillo */}
                  <button className="text-yellow-500 hover:text-yellow-600 hover:scale-110 transition-transform p-1 focus:outline-none" title="Editar Turno">
                    <FaPen className="text-xl" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;