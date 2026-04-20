import { useState, useRef, useEffect } from 'react';
import {
  FaClock, FaMapMarkerAlt, FaMoneyBillWave, FaCalendarCheck,
  FaNotesMedical, FaLaptopMedical, FaTooth, FaUserMd, FaSmileBeam,
  FaRobot, FaSignOutAlt
} from 'react-icons/fa';

// Base de datos de conocimiento expandida
const QA_DATABASE = [
  {
    keywords: ['horario', 'hora', 'atienden', 'abiertos', 'cuando', 'dias'],
    answer: (
      <div className="space-y-2">
        <p className="font-bold text-[#FF7800] border-b border-gray-200 pb-1">Horarios de Atención</p>
        <div className="flex items-start gap-3 bg-orange-50 border border-orange-100 p-3 rounded-xl shadow-inner">
          <FaClock className="text-[#FF7800] mt-0.5 shrink-0 text-lg" />
          <p className="text-sm leading-relaxed text-gray-800">
            <strong className="text-gray-900">Lunes a Viernes:</strong> 09:00 a 21:00 hs<br />
            <strong className="text-gray-900">Sábados:</strong> 09:00 a 13:00 hs
          </p>
        </div>
      </div>
    )
  },
  {
    keywords: ['direccion', 'ubicacion', 'donde', 'lugar', 'llegar', 'calle', 'zona'],
    answer: (
      <div className="space-y-2">
        <p className="font-bold text-[#FF7800] border-b border-gray-200 pb-1">Nuestra Ubicación</p>
        <div className="flex items-start gap-3 bg-gray-50 border border-gray-200 p-3 rounded-xl">
          <FaMapMarkerAlt className="text-gray-500 mt-0.5 shrink-0 text-lg" />
          <p className="text-sm leading-relaxed text-gray-800">
            Estamos ubicados en <strong className="text-gray-900">José Rondeau 827</strong> <br />
            <span className="text-xs text-gray-500">San Miguel de Tucumán, Argentina.</span><br />
            <a href="/contacto" className="text-blue-600 underline text-xs font-bold mt-1 inline-block hover:text-blue-800">Ver mapa en Contacto &rarr;</a>
          </p>
        </div>
      </div>
    )
  },
  {
    keywords: ['precio', 'costo', 'valor', 'sale', 'cobran', 'presupuesto', 'pago', 'obra social', 'precios'],
    answer: (
      <div className="space-y-2">
        <p className="font-bold text-[#FF7800] border-b border-gray-200 pb-1">Presupuestos y Costos</p>
        <div className="flex items-start gap-3 bg-green-50 border border-green-100 p-3 rounded-xl">
          <FaMoneyBillWave className="text-green-600 mt-0.5 shrink-0 text-lg" />
          <p className="text-sm leading-relaxed text-gray-800">
            Los precios varían considerablemente según el diagnóstico biométrico y la anatomía de cada paciente.
            <br /><br />
            Te sugerimos <strong>agendar un turno</strong> para realizarte un escaneo digital y armar un presupuesto exacto sin compromisos.
          </p>
        </div>
      </div>
    )
  },
  {
    keywords: ['turno', 'cita', 'reservar', 'agendar', 'visita', 'sacar'],
    answer: (
      <div className="space-y-2">
        <p className="font-bold text-[#FF7800] border-b border-gray-200 pb-1">Agendar Turno</p>
        <div className="flex items-start gap-3 bg-orange-50 border border-orange-100 p-3 rounded-xl">
          <FaCalendarCheck className="text-[#FF7800] mt-0.5 shrink-0 text-lg" />
          <p className="text-sm leading-relaxed text-gray-800">
            El proceso es 100% digitalizado. Puedes:
            <br />
            1. Hacer clic en <strong>Solicitar Turno</strong> en el menú principal superior.
            <br />
            2. Contactarnos directo al <a href="/contacto" className="text-blue-600 font-bold hover:underline">WhatsApp</a>.
          </p>
        </div>
      </div>
    )
  },
  {
    keywords: ['urgencia', 'dolor', 'emergencia', 'urgente', 'rompio', 'sangra', 'infeccion', 'duele'],
    answer: (
      <div className="space-y-2">
        <p className="font-bold text-red-600 border-b border-red-200 pb-1 flex items-center gap-2">
          <FaNotesMedical className="animate-pulse" /> Atención de Urgencia
        </p>
        <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-xl">
          <p className="text-sm leading-relaxed text-red-900 font-medium">
            Si tienes dolor intenso o una emergencia dental crítica, no esperes.
            <br /><br />
            Comunícate INMEDIATAMENTE al:<br />
            <strong className="text-xl tracking-widest">+54 381 5840885</strong>
          </p>
        </div>
      </div>
    )
  },
  {
    keywords: ['digital', 'tecnologia', 'escaner', '3d', 'software', 'core', 'obsidian', 'ia'],
    answer: (
      <div className="space-y-2">
        <p className="font-bold text-[#FF7800] border-b border-gray-200 pb-1">Odontología Digital Avanzada</p>
        <div className="flex items-start gap-3 bg-gray-900 text-white border border-gray-800 p-3 rounded-xl shadow-lg">
          <FaLaptopMedical className="text-[#FF7800] mt-0.5 shrink-0 text-lg" />
          <p className="text-sm leading-relaxed text-gray-300">
            Contamos con el ecosistema <strong className="text-white">Odonto_Core</strong> interactivo:
            <br />• Precisión submilimétrica (0.02mm)
            <br />• Inteligencia predictiva del paciente
            <br />• Escaneos 3D sin latencia
            <br /><br />
            <a href="/odontologia-digital" className="text-[#FF7800] font-bold text-xs uppercase hover:text-white transition-colors">Ver Infraestructura &rarr;</a>
          </p>
        </div>
      </div>
    )
  },
  {
    keywords: ['tratamiento', 'implante', 'ortodoncia', 'endodoncia', 'caries', 'estetica', 'blanqueamiento', 'limpieza', 'brackets', 'alineadores'],
    answer: (
      <div className="space-y-2">
        <p className="font-bold text-[#FF7800] border-b border-gray-200 pb-1">Especialidades Clínicas</p>
        <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 p-3 rounded-xl">
          <FaTooth className="text-blue-500 mt-0.5 shrink-0 text-lg" />
          <p className="text-sm leading-relaxed text-gray-800">
            Cubrimos todas las especialidades modernas:
            <ul className="list-disc ml-5 mt-1 font-medium text-gray-700 text-xs space-y-1">
              <li>Implantología y Cirugía</li>
              <li>Endodoncia y Prótesis Digital</li>
              <li>Ortodoncia (Tradicional e Invisible)</li>
              <li>Estética Dental y Blanqueamientos</li>
              <li>Odontopediatría</li>
            </ul>
          </p>
        </div>
      </div>
    )
  },
  {
    keywords: ['especialista', 'medico', 'doctor', 'profesional', 'quien', 'carcara', 'martinez', 'dentista'],
    answer: (
      <div className="space-y-2">
        <p className="font-bold text-[#FF7800] border-b border-gray-200 pb-1">Cuerpo Médico</p>
        <div className="flex items-start gap-3 bg-gray-50 border border-gray-200 p-3 rounded-xl">
          <FaUserMd className="text-gray-600 mt-0.5 shrink-0 text-lg" />
          <p className="text-sm leading-relaxed text-gray-800">
            Contamos con especialistas certificados con más de 20 años de experiencia, enfocados en tratamientos conservadores y tecnología de punta. <br />
            <a href="/especialistas" className="text-blue-600 underline font-bold mt-2 inline-block">Conocer a los Especialistas &rarr;</a>
          </p>
        </div>
      </div>
    )
  },
  {
    keywords: ['portal', 'perfil', 'usuario', 'cuenta', 'historia clínica', 'odontograma', 'ingresar', 'login'],
    answer: (
      <div className="space-y-2">
        <p className="font-bold text-[#FF7800] border-b border-gray-200 pb-1">Portal del Paciente</p>
        <div className="flex items-start gap-3 bg-text text-white border border-[#333] p-3 rounded-xl shadow-2xl">
          <FaSmileBeam className="text-yellow-400 mt-0.5 shrink-0 text-lg" />
          <p className="text-[13px] leading-relaxed text-gray-300">
            Al iniciar sesión puedes acceder a tu <strong className="text-white">Odontograma Interactivo</strong>, ver tus turnos futuros, historial de asistencia y resultados de diagnóstico en tiempo real.<br />
            <a href="/login" className="bg-[#FF7800] text-black font-bold uppercase tracking-widest text-[10px] px-3 py-1.5 rounded mt-3 inline-block hover:brightness-110">INICIAR SESIÓN</a>
          </p>
        </div>
      </div>
    )
  },
  {
    keywords: ['hola', 'buenas', 'buen dia', 'buenas tardes', 'buenas noches', 'que tal'],
    answer: (
      <div className="space-y-2">
        <h4 className="font-black text-[#FF7800] text-base drop-shadow-sm flex items-center gap-2">
          ¡Hola! <FaRobot className="text-gray-500 opacity-50" />
        </h4>
        <p className="text-sm leading-relaxed text-gray-700 font-medium">
          Soy el <strong>Asistente Clínico de IA</strong> de Carcara • Martínez.
          <br /><br />
          Estoy programado para ayudarte con:
          <span className="block mt-1 text-xs text-gray-500">
            • Horarios y Ubicación<br />
            • Solicitud de Turnos<br />
            • Información de Especialidades<br />
            • Soporte del Portal Digital
          </span>
          <br />
          ¿Cuál es tu consulta principal?
        </p>
      </div>
    )
  }
];

const findAnswer = (question) => {
  const normalizedQuestion = question.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  for (let qa of QA_DATABASE) {
    for (let kw of qa.keywords) {
      if (normalizedQuestion.includes(kw)) {
        return qa.answer;
      }
    }
  }

  return (
    <div className="bg-gray-100 p-3 rounded-xl border border-gray-200 text-sm text-gray-700">
      Disculpa, mi base biométrica no reconoce exactamente esa consulta. 🤔 <br /><br />
      <strong className="text-gray-900">Intenta preguntarme sobre:</strong> horarios, turnos, precios, ubicación, o tratamientos (implantes, ortodoncia).<br /><br />
      O bien, comunícate rápido a nuestro <a href="/contacto" className="text-blue-600 font-bold underline">WhatsApp Directo</a>.
    </div>
  );
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot', text: (
        <div className="space-y-1">
          <strong className="text-[#FF7800] text-sm block mb-1">¡Bienvenido a Odonto_Core!</strong>
          <p className="text-[13px] leading-tight text-gray-700">
            Soy la Inteligencia Artificial del consultorio. Pregúntame sobre <strong className="text-gray-900">turnos, horarios, precios, ubicación o tratamientos</strong>.
          </p>
        </div>
      )
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const toggleOpen = () => setIsOpen(!isOpen);

  // Auto-scroll al último mensaje
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = { sender: 'user', text: <span className="font-medium">{inputValue}</span> };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    // Simular "procesando... biometría"
    setTimeout(() => {
      const botResponse = findAnswer(inputValue);
      setMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-999 flex flex-col items-end font-sans">
      {/* Ventana de Chat */}
      {isOpen && (
        <div
          className="mb-4 bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-gray-200/50 flex flex-col overflow-hidden origin-bottom-right transition-all duration-300"
          style={{ width: '350px', height: '480px', animation: 'fadeInChat 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          {/* Header Premium */}
          <div className="bg-linear-to-r from-gray-900 via-text to-[#251b14] text-white p-4 flex justify-between items-center shadow-lg relative overflow-hidden shrink-0">
            {/* Scanline FX */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-[#FF7800] via-transparent to-transparent pointer-events-none"></div>

            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-full bg-black border border-white/10 flex items-center justify-center text-[#FF7800] relative shadow-[0_0_15px_rgba(255,120,0,0.3)]">
                <FaRobot className="text-xl" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full animate-pulse"></span>
              </div>
              <div>
                <h3 className="font-black text-[15px] leading-tight tracking-wide text-white">IA Asistente Central</h3>
                <p className="text-[10px] text-[#FF7800] uppercase tracking-widest font-mono mt-0.5">Online • Odonto_Core</p>
              </div>
            </div>
            <button onClick={toggleOpen} className="text-white/50 hover:text-white transition-colors relative z-10 bg-white/5 p-2 rounded-full hover:bg-white/10">
              <FaSignOutAlt className="w-4 h-4 rotate-180" />
            </button>
          </div>

          {/* Area de mensajes */}
          <div className="flex-1 overflow-y-auto p-4 bg-cover bg-center flex flex-col gap-4 relative custom-scrollbar" style={{ backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            <div className="absolute inset-0 bg-white/60 pointer-events-none"></div>

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex w-full relative z-10 ${msg.sender === 'user' ? 'justify-end pl-10' : 'justify-start pr-10'}`}
              >
                <div
                  className={`p-3.5 shadow-sm inline-block ${msg.sender === 'user'
                      ? 'bg-linear-to-br from-[#FF7800] to-[#E56A00] text-white rounded-[20px] rounded-br-sm'
                      : 'bg-white text-gray-800 border border-gray-100 rounded-[24px] rounded-tl-sm drop-shadow-sm'
                    }`}
                  style={{ animation: 'scaleIn 0.3s ease-out forwards' }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} className="h-1 shrink-0" />
          </div>

          {/* Input form */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2 shrink-0">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ej: ¿Cuáles son sus horarios?"
              className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-5 py-3 text-[13px] font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FF7800]/30 focus:border-[#FF7800] transition-all shadow-inner placeholder-gray-400"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="w-12 h-12 rounded-full border border-transparent bg-linear-to-b from-text to-black text-white flex items-center justify-center disabled:opacity-40 disabled:scale-100 hover:scale-105 hover:shadow-lg hover:shadow-black/20 hover:border-white/10 active:scale-95 transition-all shrink-0"
            >
              <svg className="w-4 h-4 translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
            </button>
          </form>
        </div>
      )}

      {/* Botón Flotante Magnético */}
      <button
        onClick={toggleOpen}
        className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-[0_10px_30px_rgba(255,120,0,0.4)] hover:shadow-[0_10px_40px_rgba(255,120,0,0.6)] transition-all duration-300 z-50 overflow-hidden relative group ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 hover:-translate-y-2'}`}
        aria-label="Abrir Asistente"
      >
        <span className="absolute inset-0 bg-linear-to-br from-[#FF8A1F] to-[#CC6000] group-hover:scale-110 transition-transform duration-500"></span>
        <FaRobot className="w-8 h-8 relative z-10 drop-shadow-md" />
        <span className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full z-10 animate-ping opacity-75"></span>
        <span className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full z-10"></span>
      </button>

      {/* Animaciones Modales CSS */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeInChat {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}} />
    </div>
  );
};

export default Chatbot;
