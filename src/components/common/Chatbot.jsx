import { useState, useRef, useEffect } from 'react';

const QA_DATABASE = [
  {
    keywords: ['horario', 'hora', 'atienden', 'abiertos'],
    answer: 'Nuestro horario de atención es de Lunes a Viernes de 09:00 a 19:00 hs y Sábados de 09:00 a 13:00 hs.'
  },
  {
    keywords: ['direccion', 'ubicacion', 'donde', 'lugar'],
    answer: 'Estamos ubicados en Jose Rondeau 827, San Miguel de Tucumán, Argentina.'
  },
  {
    keywords: ['precio', 'costo', 'valor', 'sale', 'cobran'],
    answer: 'Los precios varían según el diagnóstico y tratamiento. Te sugerimos agendar un turno para una evaluación.'
  },
  {
    keywords: ['turno', 'cita', 'reservar', 'agendar'],
    answer: 'Puedes solicitar un turno haciendo clic en el botón de WhatsApp (esquina inferior izquierda) o yendo a la sección de "Solicitar Turno" en el menú superior.'
  },
  {
    keywords: ['urgencia', 'dolor', 'emergencia', 'urgente'],
    answer: 'Si tienes una urgencia o mucho dolor, por favor comunícate directamente a nuestro WhatsApp o fijo: +54 381 5840885.'
  },
  {
    keywords: ['hola', 'buenas', 'buen dia', 'buenas tardes'],
    answer: '¡Hola! Soy el asistente virtual de la clínica. ¿En qué te puedo ayudar? Puedes consultarme sobre horarios, dirección o turnos.'
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
  
  return 'Disculpa, no entiendo exactamente tu consulta. ¿Podrías ser más específico? O bien puedes usar nuestro WhatsApp para hablar con nosotros directamente.';
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '¡Hola! Soy tu asistente virtual. Estoy aquí para resolver tus dudas rápidas, por ejemplo sobre horarios o nuestra ubicación.' }
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

    const userMsg = { sender: 'user', text: inputValue };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    // Simular un pequeño "pensando..."
    setTimeout(() => {
      const botResponse = findAnswer(userMsg.text);
      setMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* Ventana de Chat */}
      {isOpen && (
        <div 
          className="mb-4 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden origin-bottom-right transition-all duration-300"
          style={{ width: '320px', height: '420px', animation: 'fadeInChat 0.3s ease-out' }}
        >
          {/* Header */}
          <div className="bg-orange-500 text-white p-4 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-orange-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight">Asistente Virtual</h3>
                <p className="text-[10px] text-orange-100">Carcara • Martínez</p>
              </div>
            </div>
            <button onClick={toggleOpen} className="text-white hover:text-gray-200 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          {/* Area de mensajes */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-orange-500 text-white rounded-br-none' 
                      : 'bg-white text-gray-800 border border-gray-200 shadow-sm rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input form */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Escribe tu consulta..."
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            />
            <button 
              type="submit" 
              disabled={!inputValue.trim()}
              className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600 transition-colors shrink-0"
            >
              <svg className="w-4 h-4 -translate-x-px translate-y-px" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
            </button>
          </form>
        </div>
      )}

      {/* Botón Flotante */}
      <button
        onClick={toggleOpen}
        className={`w-14 h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center justify-center shadow-[0_4px_14px_0_rgba(249,115,22,0.39)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.23)] transition-all duration-300 transform hover:scale-110 z-50 ${isOpen ? 'scale-110' : ''}`}
        aria-label="Abrir Asistente"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        ) : (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
        )}
      </button>

      {/* Animación del chat */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInChat {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}} />
    </div>
  );
};

export default Chatbot;
