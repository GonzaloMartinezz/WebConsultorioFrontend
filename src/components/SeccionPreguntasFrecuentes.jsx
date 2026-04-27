import { useState } from 'react';
import { Link } from 'react-router-dom';

const SeccionPreguntasFrecuentes = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    { q: "¿Cómo solicito un turno online?", a: "Es muy sencillo: haz clic en 'Solicitar Consulta', elige a tu profesional y detalla el motivo. Nuestro equipo te enviará la confirmación por correo." },
    { q: "¿Qué obras sociales atienden?", a: "Atendemos las principales obras sociales y prepagas del país. Escríbenos por WhatsApp para consultar por tu cobertura específica." },
    { q: "¿Cuáles son los medios de pago?", a: "Efectivo, tarjetas de débito/crédito y transferencias. Ofrecemos planes de financiación para tratamientos de alta complejidad." },
    { q: "¿Cuáles son los Horarios de Atencion?", a: "Lunes a Viernes de 9 a 12hs y de 16 a 20:30hs." },
    { q: "¿Cómo utilizo la App?", a: "Debes registrarte con tu Mail y nombre completo. Al ingresar, podrás solicitar turnos, chatear con nuestro asistente IA y ver tu historial clínico." },
  ];

  return (
    <section className="bg-[#050505] text-white py-32 md:py-48 px-4 sm:px-6 lg:px-8 w-full relative overflow-hidden border-t border-white/5">
      {/* Fondo decorativo radial oscuro */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#FF7800]/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row gap-16 items-start">

          <div className="w-full md:w-5/12 text-center md:text-left sticky top-10">
            <span className="inline-block px-5 py-2 rounded-full border border-[#FF7800]/30 bg-[#FF7800]/5 text-[#FF7800] font-black text-[10px] uppercase tracking-[0.3em] mb-8 backdrop-blur-md">
              Soporte al Paciente
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase leading-[0.9] tracking-tighter" data-aos="fade-up">
              Respuestas <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FF7800] to-orange-300">A Tus Dudas</span>
            </h2>
            <p className="text-white/50 font-light text-lg md:text-xl mt-8 mb-10 leading-relaxed max-w-md mx-auto md:mx-0">
              ¿Tenés alguna consulta específica? Revisá nuestras preguntas más frecuentes o contactanos directamente.
            </p>
            <div className="mt-8 flex justify-center md:justify-start">
              <Link to="/contacto" className="inline-block px-10 py-5 bg-white/5 backdrop-blur-md border border-white/20 text-white rounded-full font-black text-xs uppercase tracking-widest transition-all duration-300 hover:bg-white/10 active:scale-95 shadow-xl">
                Contacto Directo &rarr;
              </Link>
            </div>
          </div>

          <div className="w-full md:w-7/12 space-y-6" data-aos="fade-up" data-aos-delay="200">
            {faqs.map((faq, index) => (
              <div key={index} className="group bg-[#111] backdrop-blur-3xl border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl transition-all hover:bg-white/5 hover:border-[#FF7800]/30">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-8 py-8 flex justify-between items-center text-left focus:outline-none transition-colors"
                >
                  <span className="font-black text-lg md:text-xl uppercase tracking-tighter pr-4 text-white">{faq.q}</span>
                  <div className={`w-10 h-10 rounded-full border-2 border-[#FF7800]/50 flex items-center justify-center transition-all shadow-[0_0_15px_rgba(255,120,0,0.1)] ${openFaq === index ? 'bg-[#FF7800] text-white rotate-180 border-[#FF7800]' : 'text-[#FF7800] bg-[#FF7800]/5'}`}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                <div className={`px-8 overflow-hidden transition-all duration-500 ease-in-out ${openFaq === index ? 'max-h-[500px] pb-8 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-white/60 font-light text-base leading-relaxed border-t border-white/10 pt-6">"{faq.a}"</p>
                  
                  {/* Botones de acción dinámicos */}
                  <div className="mt-8 flex flex-wrap gap-4">
                    {faq.q.includes("turno") && (
                      <Link to="/turnos" className="px-6 py-3 bg-linear-to-r from-[#FF7800] to-orange-300 text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-[0_5px_20px_rgba(255,120,0,0.4)]">
                        Solicitar Consulta
                      </Link>
                    )}
                    {faq.q.includes("App") && (
                      <>
                        <Link to="/login" className="px-6 py-3 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                          Iniciar Sesión
                        </Link>
                        <Link to="/login" className="px-6 py-3 bg-white/5 border border-white/20 text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">
                          Registrarse
                        </Link>
                      </>
                    )}
                    {faq.q.includes("obras sociales") && (
                      <a href="https://wa.me/5493816242482" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-green-500 hover:text-white transition-all shadow-lg">
                        Consultar por WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default SeccionPreguntasFrecuentes;
