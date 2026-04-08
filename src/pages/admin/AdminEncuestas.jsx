import LayoutAdmin from "../../components/layouts/LayoutAdmin.jsx";
import { FaStar, FaSmile, FaFrown, FaMeh } from 'react-icons/fa';

const AdminEncuestas = () => {
  const encuestasRecientes = [
    { id: 1, paciente: 'Lucía Fernández', puntaje: 5, comentario: 'Excelente atención de la Dra. Erina. Muy puntual.', fecha: 'Hace 2 días' },
    { id: 2, paciente: 'Emilio Gómez', puntaje: 4, comentario: 'Todo bien, pero esperé 15 minutos en recepción.', fecha: 'Hace 3 días' },
    { id: 3, paciente: 'Jose Paz', puntaje: 5, comentario: 'El consultorio quedó hermoso, muy moderno el sistema de turnos.', fecha: 'Hace 1 semana' },
  ];

  return (
    <LayoutAdmin>
      <header className="mb-8">
        <h1 className="text-3xl font-black text-primary tracking-tight">Calidad de Atención</h1>
        <p className="text-text-light font-medium">Feedback y encuestas de satisfacción post-turno.</p>
      </header>

      {/* KPI Principal */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border-t-8 border-accent-orange mb-8 flex flex-col md:flex-row items-center gap-10">
        <div className="text-center">
          <p className="text-sm font-bold text-text-light uppercase tracking-widest mb-2">Puntaje General (NPS)</p>
          <h2 className="text-6xl font-black text-primary flex items-center justify-center gap-2">
            4.8 <FaStar className="text-yellow-400 text-4xl" />
          </h2>
          <p className="text-sm text-green-600 font-bold mt-2">↑ +0.2 desde el mes pasado</p>
        </div>
        
        <div className="flex-1 w-full grid grid-cols-3 gap-4 text-center">
          <div className="bg-green-50 p-4 rounded-2xl border border-green-100">
            <FaSmile className="text-4xl text-green-500 mx-auto mb-2" />
            <p className="font-black text-xl">85%</p>
            <p className="text-xs text-text-light font-bold uppercase">Satisfechos</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-100">
            <FaMeh className="text-4xl text-yellow-500 mx-auto mb-2" />
            <p className="font-black text-xl">10%</p>
            <p className="text-xs text-text-light font-bold uppercase">Neutros</p>
          </div>
          <div className="bg-red-50 p-4 rounded-2xl border border-red-100">
            <FaFrown className="text-4xl text-red-500 mx-auto mb-2" />
            <p className="font-black text-xl">5%</p>
            <p className="text-xs text-text-light font-bold uppercase">A Mejorar</p>
          </div>
        </div>
      </div>

      {/* Buzón de Comentarios */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-secondary/30">
        <h3 className="text-xl font-black text-primary mb-6">Últimos Comentarios</h3>
        <div className="space-y-4">
          {encuestasRecientes.map(encuesta => (
            <div key={encuesta.id} className="p-4 border border-secondary/40 rounded-xl hover:shadow-md transition-shadow bg-background/20">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-bold text-text">{encuesta.paciente}</p>
                  <p className="text-xs text-text-light">{encuesta.fecha}</p>
                </div>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < encuesta.puntaje ? "text-yellow-400" : "text-gray-300"} />
                  ))}
                </div>
              </div>
              <p className="text-sm text-text font-medium italic">"{encuesta.comentario}"</p>
            </div>
          ))}
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default AdminEncuestas;
