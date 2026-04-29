import { useState, useEffect, useRef } from 'react';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '¡Hola! Soy el asistente virtual de C&M. ¿En qué te puedo ayudar hoy?' }
  ]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // CEREBRO DEL BOT CON TODAS TUS REGLAS
  const getBotResponse = (userText) => {
    const text = userText.toLowerCase();

    // 1. Obras Sociales
    if (text.includes('obra social') || text.includes('prepaga') || text.includes('mutual') || text.includes('reciben')) {
      return "🏥 Sí, trabajamos con múltiples obras sociales y prepagas, y también emitimos facturas para reintegros. Escríbenos por WhatsApp (botón izquierdo) para confirmar si trabajamos con tu cobertura exacta.";
    }
    // 2. Google Maps / Ubicación
    if (text.includes('ubicacion') || text.includes('direccion') || text.includes('mapa') || text.includes('donde')) {
      return "📍 Nos encontramos en Jose Rondeau 827, San Miguel de Tucumán. \nPuedes ver nuestra ubicación exacta en Google Maps aquí: https://goo.gl/maps/Rondeau827 (Link de ejemplo)";
    }
    // 3. Instagram
    if (text.includes('instagram') || text.includes('redes') || text.includes('fotos')) {
      return "📱 ¡Nos encanta compartir nuestro trabajo! Síguenos en Instagram como @carcaramartinez para ver casos reales y consejos dentales.";
    }
    // 4. Métodos de Pago
    if (text.includes('pago') || text.includes('tarjeta') || text.includes('efectivo') || text.includes('transferencia')) {
      return "💳 Aceptamos efectivo, transferencias bancarias y tarjetas. También ofrecemos opciones de financiación para que puedas realizarte el tratamiento que necesitas.";
    }
    // 5. Doctores
    if (text.includes('doctor') || text.includes('dentista') || text.includes('profesionales') || text.includes('adolfo') || text.includes('erina')) {
      return "👨⚕️👩⚕️ Nuestro equipo está liderado por el Dr. Adolfo Martínez (Odontología General e Implantes) y la Dra. Erina Carcara (Ortodoncia y Estética Dental).";
    }
    // 6. Horarios
    if (text.includes('horario') || text.includes('hora') || text.includes('abierto')) {
      return "⏰ Atendemos de Lunes a Viernes de 09:00 a 19:00 hs y los Sábados de 09:00 a 13:00 hs.";
    }
    // 7. Turnos
    if (text.includes('turno') || text.includes('cita') || text.includes('agendar')) {
      return "📅 Puedes agendar un turno tocando el botón verde de WhatsApp a tu izquierda, o usando la sección 'Solicitar Turno' de nuestra web.";
    }

    // Respuesta por defecto si no entiende
    return "No entendí muy bien. 😅 ¿Quieres hablar con nuestra secretaria? Solo toca el ícono verde de WhatsApp a la izquierda de la pantalla.";
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: inputText }];
    setMessages(newMessages);
    setInputText('');

    setTimeout(() => {
      const botReply = getBotResponse(inputText);
      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">

      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-secondary/50 w-80 sm:w-96 h-[450px] mb-4 flex flex-col overflow-hidden transform transition-all duration-300 origin-bottom-right">

          <div className="bg-primary text-white px-5 py-4 flex justify-between items-center shrink-0 shadow-md">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <FaRobot className="text-xl text-accent-orange" />
              </div>
              <div>
                <h4 className="font-bold leading-none">Asistente C&M</h4>
                <span className="text-[10px] text-accent-orange font-semibold uppercase tracking-wider">En línea</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors">
              <FaTimes className="text-xl" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-background/30 flex flex-col gap-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {/* whitespace-pre-wrap es clave para que el link del mapa y los enter se vean bien */}
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm whitespace-pre-wrap ${msg.sender === 'user'
                    ? 'bg-accent-orange text-white rounded-tr-none'
                    : 'bg-white border border-secondary/30 text-text rounded-tl-none'
                  }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="bg-white p-3 border-t border-secondary/30 flex items-center gap-2 shrink-0">
            <input
              type="text"
              placeholder="Pregunta sobre turnos, mapas, pagos..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-background/50 border border-secondary/50 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
            />
            <button type="submit" className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors shrink-0">
              <FaPaperPlane className="text-sm -ml-0.5" />
            </button>
          </form>

        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-primary/90 hover:scale-110 active:scale-95 transition-all duration-300 relative"
      >
        {isOpen ? <FaTimes className="text-3xl" /> : <FaRobot className="text-3xl" />}
        {!isOpen && <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-white rounded-full animate-pulse"></span>}
      </button>

    </div>
  );
};

export default ChatbotWidget;
