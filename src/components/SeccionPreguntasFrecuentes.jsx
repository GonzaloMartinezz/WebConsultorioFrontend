import { useState } from 'react';
import { Link } from 'react-router-dom';

const SeccionPreguntasFrecuentes = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    { q: "¿Cómo solicito un turno online?", a: "Es muy sencillo: haz clic en 'Solicitar Turno', elige a tu profesional y detalla el motivo. Nuestro equipo te enviará la confirmación por correo." },
    { q: "¿Qué obras sociales atienden?", a: "Atendemos las principales obras sociales y prepagas del país. Escríbenos por WhatsApp para consultar por tu cobertura específica." },
    { q: "¿Cuáles son los medios de pago?", a: "Aceptamos efectivo, tarjetas de débito/crédito y transferencias. Ofrecemos planes de financiación para tratamientos complejos." },
    { q: "¿Cuáles son los Horarios de Atencion?", a: "Lunes a Viernes de 9 a 13 y de 16 a 20 hs. Sábados de 9 a 13 hs." },
    { q: "¿Cómo utilizo la App?", a: "Debes registrarte con tu Mail y nombre completo. Al ingresar, podrás solicitar turnos, chatear con nuestro asistente IA y ver tu historial." },
  ];

  return (
    <section className="bg-primary text-white py-32 md:py-48 px-4 sm:px-6 lg:px-8 w-full relative overflow-hidden border-t-8 border-accent-orange">
      {/* Fondo decorativo radial oscuro */}
      <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none bg-[radial-gradient(circle_at_top_right,white,transparent_50%)]"></div>

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row gap-16 items-start">

          <div className="w-full md:w-5/12 text-center md:text-left sticky top-10">
            <span className="inline-block px-5 py-2 rounded-full border border-accent-orange text-accent-orange font-black text-xs uppercase tracking-[0.2em] mb-8">
              Soporte al Paciente
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase leading-tight tracking-tighter" data-aos="fade-up">
              Respuestas <br />
              <span className="text-accent-orange">que pueden ayudarte</span>
            </h2>
            <p className="text-secondary/60 font-medium text-lg mt-8 mb-10 leading-relaxed">
                ¿Tenés alguna duda puntual? Revisá nuestras preguntas más comunes o contactanos directamente.
            </p>
            <div className="mt-8">
              <Link to="/contacto" className="inline-block w-full md:w-auto px-10 py-5 bg-white/5 border-2 border-white/20 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 hover:bg-white hover:text-primary hover:-translate-y-1 hover:shadow-2xl active:scale-95 shadow-sm text-center">
                Contacto directo &rarr;
              </Link>
            </div>
          </div>

          <div className="w-full md:w-7/12 space-y-5" data-aos="fade-up" data-aos-delay="200">
            {faqs.map((faq, index) => (
              <div key={index} className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-2xl transition-all hover:bg-white/10">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-8 py-8 flex justify-between items-center text-left focus:outline-none transition-colors"
                >
                  <span className="font-black text-lg md:text-xl uppercase tracking-tight pr-4">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full border-2 border-accent-orange flex items-center justify-center transition-all ${openFaq === index ? 'bg-accent-orange text-white rotate-180' : 'text-accent-orange'}`}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                <div className={`px-8 overflow-hidden transition-all duration-500 ease-in-out ${openFaq === index ? 'max-h-60 pb-8 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-secondary/80 font-medium text-lg leading-relaxed border-t border-white/10 pt-6 italic">"{faq.a}"</p>
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
