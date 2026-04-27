import { useState } from 'react';
import { FaWhatsapp, FaTimes, FaPaperPlane } from 'react-icons/fa';

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [mail, setMail] = useState('');
  const [motivo, setMotivo] = useState('');

  // Número de la clínica
  const numeroWhatsApp = "5493816242482";

  const handleEnviar = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !apellido.trim() || !mail.trim() || !motivo.trim()) return;

    // Mensaje formateado con todos los datos
    const mensaje = `Hola buenos días/tardes, mi nombre es ${nombre} ${apellido}.\nMe comunico para realizar una consulta.\n\n📝 *Mis datos:*\n- Email: ${mail}\n\n🦷 *Consulta sobre:*\n- ${motivo}\n\nQuedo a la espera de su respuesta. ¡Muchas gracias!`;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, '_blank');
    setIsOpen(false);
    setNombre('');
    setApellido('');
    setPhone('');
    setDocumentNumber('');
    setMail('');
    setMotivo('');
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start">

      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-secondary/50 p-5 mb-4 w-[350px] max-h-[85vh] overflow-y-auto transform transition-all duration-300 origin-bottom-left">
          <div className="flex justify-between items-start mb-3 gap-2">
            <h4 className="font-black text-primary flex items-center gap-1.5 text-[15px] uppercase tracking-wider leading-tight">
              <FaWhatsapp className="text-green-500 text-xl shrink-0" /> Centro Odontológico
            </h4>
            <button onClick={() => setIsOpen(false)} className="text-text-light hover:text-red-500 transition-colors shrink-0 mt-0.5">
              <FaTimes />
            </button>
          </div>

          <p className="text-[13px] text-text-light mb-4 font-medium leading-relaxed">
            Completa los datos para contactarnos y poder consultarnos cualquier información.Recorda que para poder solicitar el turno deberas contar con usuario y contraseña. Si no tienes un usuario, deberas iniciar sesion en el enlace de abajo. O si aun no tienes usuario debes crearte uno en el enlace de abajo para poder comenzar.
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

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Correo electrónico"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                className="w-full text-sm px-4 py-2.5 rounded-xl border border-secondary bg-background/50 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
                required
              />
            </div>

            {/* Teléfono */}
            <div>
              <input
                type="text"
                placeholder="Teléfono"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-sm px-4 py-2.5 rounded-xl border border-secondary bg-background/50 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
                required
              />
            </div>

            {/* Documento */}
            <div>
              <input
                type="text"
                placeholder="Documento"
                value={documentNumber}
                onChange={(e) => setDocumentNumber(e.target.value)}
                className="w-full text-sm px-4 py-2.5 rounded-xl border border-secondary bg-background/50 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
                required
              />
            </div>

            {/* Motivo */}
            <div>
              <select
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                className={`w-full text-sm px-4 py-2.5 rounded-xl border border-secondary bg-background/50 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none ${!motivo ? 'text-text-light' : 'text-text'}`}
                required
              >
                <option value="" disabled>Elegir especialidad/motivo...</option>
                <option value="Consulta General">Consulta General</option>
                <option value="Ortodoncia">Ortodoncia</option>
                <option value="Implantología">Implantología</option>
                <option value="Cirugía (Todas las áreas)">Cirugía (Todas las áreas)</option>
                <option value="Otro">Otro motivo</option>
              </select>
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
