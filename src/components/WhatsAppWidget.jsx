import { useState } from 'react';
import { FaWhatsapp, FaTimes, FaPaperPlane } from 'react-icons/fa';

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState(''); // NUEVO: Apellido
  const [profesional, setProfesional] = useState(''); // NUEVO: Selección de profesional
  const [motivo, setMotivo] = useState('');

  // Número de la clínica (Ej: 54 381 5840885)
  const numeroWhatsApp = "3816242482";

  const handleEnviar = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !apellido.trim() || !profesional || !motivo.trim()) return;

    // Mensaje formateado con todos los datos
    const mensaje = `¡Hola! Soy ${nombre} ${apellido}.\nNecesitaría solicitar un turno con ${profesional}.\n\nMi motivo de consulta es: ${motivo}`;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, '_blank');
    setIsOpen(false);
    setNombre('');
    setApellido('');
    setProfesional('');
    setMotivo('');
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start">

      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-secondary/50 p-5 mb-4 w-80 max-h-[85vh] overflow-y-auto transform transition-all duration-300 origin-bottom-left">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-black text-primary flex items-center gap-2">
              <FaWhatsapp className="text-green-500 text-xl" /> Chat Directo
            </h4>
            <button onClick={() => setIsOpen(false)} className="text-text-light hover:text-red-500 transition-colors">
              <FaTimes />
            </button>
          </div>

          <p className="text-sm text-text-light mb-4 font-medium">
            Completa tus datos para agendar tu cita rápidamente.
          </p>

          <form onSubmit={handleEnviar} className="space-y-3">
            {/* Nombre y Apellido en la misma línea */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-1/2 text-sm px-4 py-2.5 rounded-xl border border-secondary bg-background/50 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
                required
              />
              <input
                type="text"
                placeholder="Apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                className="w-1/2 text-sm px-4 py-2.5 rounded-xl border border-secondary bg-background/50 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
                required
              />
            </div>

            {/* Menú desplegable para elegir Doctor */}
            <div>
              <select
                value={profesional}
                onChange={(e) => setProfesional(e.target.value)}
                className={`w-full text-sm px-4 py-2.5 rounded-xl border border-secondary bg-background/50 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none ${!profesional ? 'text-text-light' : 'text-text'}`}
                required
              >
                <option value="" disabled>Seleccionar Profesional...</option>
                <option value="el Dr. Adolfo Martínez">Dr. Adolfo Martínez</option>
                <option value="la Dra. Erina Carcara">Dra. Erina Carcara</option>
                <option value="cualquier profesional disponible">Indistinto / Primera vez</option>
              </select>
            </div>

            {/* Motivo */}
            <div>
              <textarea
                placeholder="¿Cuál es tu motivo de consulta?"
                rows="2"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                className="w-full text-sm px-4 py-2.5 rounded-xl border border-secondary bg-background/50 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white font-bold text-sm py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-green-600 transition-colors shadow-md active:scale-95"
            >
              Enviar a WhatsApp <FaPaperPlane />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-green-600 hover:scale-110 active:scale-95 transition-all duration-300"
      >
        <FaWhatsapp className="text-3xl" />
      </button>

    </div>
  );
};

export default WhatsAppWidget;
