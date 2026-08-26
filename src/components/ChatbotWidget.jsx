import { useState, useEffect, useRef } from 'react';
import { FaRobot, FaTimes, FaPaperPlane, FaSignOutAlt, FaHeadset } from 'react-icons/fa';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'intro' }
  ]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // CEREBRO DEL BOT: BASE DE CONOCIMIENTO EXTENDIDA
  const knowledgeBase = [
    {
      keywords: ['urgencia', 'emergencia', 'dolor', 'sangrado', 'roto', 'accidente', 'quebró', 'partió', 'hinchado', 'infección'],
      response: "🚨 Si tienes una urgencia dental, dolor fuerte o inflamación, por favor comunícate INMEDIATAMENTE a nuestro WhatsApp (botón verde izquierdo). Le daremos prioridad absoluta a tu caso para aliviarte hoy mismo."
    },
    {
      keywords: ['implante', 'implantes', 'diente falso', 'corona', 'protesis', 'prótesis', 'tornillo', 'falta un diente', 'perno'],
      response: "🦷 El Dr. Adolfo Martínez es especialista en Implantología y Cirugía Compleja. Utilizamos tecnología 3D (nuestro tomógrafo propio) y cirugía guiada por computadora para colocar implantes de forma rápida, extremadamente precisa y casi sin molestias. ¿Te gustaría agendar una evaluación?"
    },
    {
      keywords: ['ortodoncia', 'brackets', 'frenillos', 'invisible', 'alineadores', 'invisalign', 'chuecos', 'derechos'],
      response: "✨ La Dra. Erina Carcara es experta en Ortodoncia y estética. Ofrecemos desde brackets estéticos tradicionales hasta avanzados sistemas de Ortodoncia Invisible (alineadores transparentes que nadie nota). El mejor tratamiento dependerá de tu caso."
    },
    {
      keywords: ['precio', 'costo', 'valor', 'cuanto sale', 'presupuesto', 'pagar', 'cuotas', 'financiacion', 'tarjeta'],
      response: "💰 Los presupuestos varían según la anatomía y necesidad exacta de cada paciente. Para darte un precio responsable y exacto, realizamos primero una evaluación clínica. Aceptamos efectivo, transferencias, y todas las tarjetas con opciones de financiación."
    },
    {
      keywords: ['blanqueamiento', 'blancos', 'estetica', 'estética', 'carillas', 'diseño de sonrisa', 'manchas', 'amarillos'],
      response: "💎 ¡Logramos sonrisas de revista! Realizamos Diseño de Sonrisa digital, blanqueamientos láser de última generación sin sensibilidad, y carillas de porcelana ultra finas. Transformamos tu sonrisa cuidando la salud de tus dientes naturales."
    },
    {
      keywords: ['miedo', 'fobia', 'duele', 'sedacion', 'anestesia', 'nervioso', 'panico'],
      response: "😌 ¡Entendemos perfectamente! Nuestro consultorio está diseñado para ser un ambiente relajante (con aromaterapia y música). Usamos técnicas de anestesia sin dolor y tenemos mucha paciencia. Tu comodidad y tranquilidad son nuestra mayor prioridad."
    },
    {
      keywords: ['niños', 'pediatria', 'hijo', 'nene', 'nena', 'odontopediatria', 'infantil', 'chico'],
      response: "👶 Atendemos pacientes de todas las edades. Nuestro enfoque con los niños es que su experiencia sea súper positiva y divertida, sin miedos, para crear excelentes hábitos de salud bucal desde pequeños."
    },
    {
      keywords: ['primera vez', 'consulta', 'evaluacion', 'revisar', 'control', 'diagnostico'],
      response: "📋 En tu primera consulta realizaremos un diagnóstico integral completo. Podemos incluir radiografías o un escaneo 3D con nuestro equipamiento in-house, y luego armaremos un plan de tratamiento personalizado a tu medida."
    },
    {
      keywords: ['obra social', 'prepaga', 'mutual', 'cobertura', 'osde', 'swiss', 'sancor', 'galeno', 'subsidio de salud', 'prensa'],
      response: "🏥 Trabajamos con múltiples obras sociales y prepagas (muchas por sistema de reintegro con factura, y otras de forma directa). Para confirmar si tu plan exacto tiene cobertura, escríbenos por WhatsApp con una foto de tu credencial."
    },
    {
      keywords: ['ubicacion', 'direccion', 'donde', 'mapa', 'llegar', 'estacionamiento', 'auto', 'quedan', 'ubicados'],
      response: "📍 Nos encontramos en Jose Rondeau 827, San Miguel de Tucumán. La zona es tranquila y cuenta con facilidad para estacionar cerca de la clínica."
    },
    {
      keywords: ['horario', 'hora', 'abierto', 'cuando', 'dias', 'atienden', 'feriado'],
      response: "⏰ Nuestro horario de atención habitual es de Lunes a Viernes de 09:00 a 19:00 hs, y los Sábados de 09:00 a 13:00 hs."
    },
    {
      keywords: ['turno', 'cita', 'agendar', 'reservar', 'sacar', 'pedir'],
      response: "📅 ¡Es muy fácil! Puedes agendar tu turno usando el botón 'Solicitar Turno' arriba en nuestra web, o directamente tocando el logo verde de WhatsApp para chatear con nuestra secretaria."
    },
    {
      keywords: ['tecnologia', 'escaner', 'tomografo', 'digital', '3d', 'rayos', 'impresion'],
      response: "🚀 Somos pioneros en Odontología 100% Digital. Contamos con Tomógrafo 3D propio, escáner intraoral (¡chau a las pastas molestas para moldes!), e impresión 3D en el consultorio. Esto significa tratamientos más rápidos, precisos y cómodos para ti."
    },
    {
      keywords: ['hola', 'buen dia', 'buenas', 'buenas tardes', 'buenas noches', 'saludos'],
      response: "👋 ¡Hola! Qué alegría saludarte. ¿En qué te puedo asesorar hoy? Puedes preguntarme sobre turnos, tratamientos (como implantes o brackets), precios, o ubicación."
    },
    {
      keywords: ['gracias', 'muchas gracias', 'excelente', 'ok', 'dale', 'buenisimo', 'perfecto'],
      response: "🥰 ¡De nada! Estamos aquí para ayudarte. Si necesitas algo más, no dudes en escribir. ¡Te esperamos en C&M!"
    }
  ];

  const getBotResponse = (userText) => {
    // Normalizar texto: minúsculas y quitar acentos básicos
    const text = userText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    let bestMatch = null;
    let maxMatchCount = 0;

    // Buscar la categoría con más palabras clave coincidentes
    for (const category of knowledgeBase) {
      let matchCount = 0;
      for (const keyword of category.keywords) {
        // Normalizar también la keyword
        const normalizedKeyword = keyword.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (text.includes(normalizedKeyword)) {
          matchCount++;
        }
      }

      if (matchCount > maxMatchCount) {
        maxMatchCount = matchCount;
        bestMatch = category;
      }
    }

    if (bestMatch) {
      return bestMatch.response;
    }

    // Respuesta por defecto si no entiende nada
    return "🤖 Mmm... no estoy completamente seguro de la respuesta a eso. Para darte la mejor atención, ¿podrías tocar el botón verde de WhatsApp a la izquierda? ¡Nuestra secretaria te responderá todas las dudas de inmediato!";
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: inputText }];
    setMessages(newMessages);
    setInputText('');

    // Simular el tiempo de tipeo del bot (un poco aleatorio para más naturalidad)
    const typingDelay = Math.random() * (1200 - 600) + 600;

    setTimeout(() => {
      const botReply = getBotResponse(inputText);
      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
    }, typingDelay);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">

      {isOpen && (
        <div className="bg-[#fcfcfc] rounded-[24px] shadow-[0_30px_80px_-15px_rgba(0,0,0,0.6)] border border-gray-200/60 w-[340px] sm:w-[420px] h-[550px] mb-4 flex flex-col overflow-hidden transform transition-all duration-400 origin-bottom-right">

          {/* HEADER ULTRA PREMIUM */}
          <div className="bg-linear-to- from-[#111111] via-[#1a1a1a] to-[#241b14] text-white px-6 py-5 flex justify-between items-center shrink-0 border-b border-white/5 shadow-md z-20">
            <div className="flex items-center gap-4">
              {/* Icono Asistente con brillo */}
              <div className="relative bg-linear-to-r from-gray-800 to-black w-12 h-12 rounded-full flex items-center justify-center border border-gray-600/50 shadow-[0_0_15px_rgba(255,120,0,0.2)]">
                <FaHeadset className="text-[22px] text-accent-orange drop-shadow-md" />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[#1a1a1a] rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
              </div>
              <div className="flex flex-col">
                <h4 className="font-black text-[13px] tracking-widest text-white/90 leading-tight">ASISTENTE VIRTUAL <span className="text-accent-orange">IA</span></h4>
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">Atención C&M • En Línea</span>
              </div>
            </div>
            {/* BOTÓN CERRAR EN ROJO */}
            <button 
              onClick={() => setIsOpen(false)} 
              className="w-10 h-10 bg-red-500/10 hover:bg-red-500 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer group shadow-sm border border-red-500/20 hover:border-red-500"
              title="Cerrar asistente"
            >
              <FaTimes className="text-red-500 group-hover:text-white transition-colors text-lg" />
            </button>
          </div>

          {/* ÁREA DE CHAT CON PATRÓN DE PUNTOS */}
          <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-5 bg-[#fcfcfc] relative custom-scrollbar">
            {/* Patrón de puntos sutil */}
            <div className="absolute inset-0 opacity-[0.3] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#9ca3af 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex w-full relative z-10 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'user' ? (
                  <div className="max-w-[85%] rounded-[20px] rounded-br-[4px] px-5 py-3.5 text-[13.5px] bg-linear-to- from-[#FF7800] to-orange-500 text-white shadow-[0_8px_20px_rgba(255,120,0,0.25)] font-medium tracking-wide">
                    {msg.text}
                  </div>
                ) : (
                  <div className="max-w-[92%] rounded-[20px] rounded-tl-[4px] px-5 py-4 text-[13.5px] bg-white text-gray-700 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-gray-100/80 relative overflow-hidden group">
                    {/* Borde lateral sutil para el bot */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to- from-gray-200 to-transparent"></div>
                    
                    {msg.text === 'intro' ? (
                      <div className="pl-1">
                        <h5 className="font-black text-gray-900 text-[15px] mb-2.5 leading-snug tracking-tight">¡Hola! Soy la inteligencia exclusiva de <span className="text-accent-orange">Carcara & Martínez</span></h5>
                        <p className="leading-relaxed text-gray-600 font-medium">Estoy aquí para resolver todas tus dudas al instante. Puedes preguntarme sobre <strong className="text-gray-900 font-bold">turnos, especialistas, precios, urgencias o ubicación</strong>.</p>
                      </div>
                    ) : (
                      <p className="leading-relaxed whitespace-pre-wrap text-gray-600 font-medium pl-1">{msg.text}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* ZONA DE INPUT DE TEXTO */}
          <form onSubmit={handleSend} className="bg-white p-4 flex items-center gap-3 shrink-0 relative z-20 border-t border-gray-100 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Escribe tu consulta aquí..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full bg-[#f4f4f5] border border-gray-200/80 rounded-full pl-5 pr-12 py-3.5 text-[13.5px] text-gray-800 font-medium placeholder:text-gray-400 focus:outline-none focus:border-accent-orange/50 focus:bg-white focus:ring-4 focus:ring-accent-orange/10 transition-all shadow-inner"
              />
            </div>
            <button 
              type="submit" 
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 shadow-lg ${inputText.trim() ? 'bg-linear-to- from-[#FF7800] to-orange-500 text-white hover:scale-105 hover:shadow-orange-500/30' : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'}`}
              disabled={!inputText.trim()}
            >
              <FaPaperPlane className="text-[15px] -ml-0.5" />
            </button>
          </form>

        </div>
      )}

      {/* BOTÓN FLOTANTE PRINCIPAL */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-linear-to-r from-[#1A1A1A] to-[#333333] text-white rounded-full flex items-center justify-center shadow-[0_15px_40px_rgba(0,0,0,0.4)] hover:scale-110 active:scale-95 transition-all duration-400 relative group border border-white/10"
      >
        {isOpen ? (
          <FaTimes className="text-3xl text-red-400 group-hover:rotate-90 transition-transform duration-300" />
        ) : (
          <FaHeadset className="text-[32px] text-accent-orange group-hover:scale-110 transition-transform duration-300" />
        )}
        
        {/* Pulsar de notificación cuando está cerrado */}
        {!isOpen && (
          <>
            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-white rounded-full z-10"></span>
            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full animate-ping opacity-75"></span>
          </>
        )}
      </button>

    </div>
  );
};

export default ChatbotWidget;
