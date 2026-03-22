import { Link } from 'react-router-dom';
import { useState } from 'react';

const SeccionesInformativas = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    { q: "¿Cómo solicito un turno online?", a: "Puedes solicitar un turno haciendo clic en el botón 'Solicitar Turno' y completando el formulario con tus datos y el profesional elegido." },
    { q: "¿Qué obras sociales atienden?", a: "Atendemos las principales obras sociales y prepagas del país. Contáctanos por WhatsApp para consultar por tu cobertura específica." },
    { q: "¿Cuáles son los medios de pago?", a: "Aceptamos efectivo, tarjetas de débito y crédito, y transferencias bancarias. Ofrecemos planes de financiación para tratamientos largos." }
  ];

  return (
    <div className="flex flex-col w-full">

      {/* ======================================================== */}
      {/* 1. SECCIÓN PLAN A MEDIDA (FONDO CLARO, TARJETA OSCURA) */}
      {/* ======================================================== */}
      <section className="bg-secondary/20 py-24 px-4 sm:px-6 lg:px-8 w-full">
        <div className="mx-auto max-w-7xl">
          <div className="bg-primary rounded-[2.5rem] p-10 md:p-16 flex flex-col lg:flex-row items-center overflow-hidden relative shadow-2xl" data-aos="fade-up">
            <div className="w-full lg:w-1/2 z-10 text-center lg:text-left space-y-6">
              <h2 className="text-4xl md:text-5xl font-black text-background uppercase leading-tight">
                Elegí un plan <br /> <span className="text-accent-orange">a tu medida</span>
              </h2>
              <p className="text-background/80 text-lg max-w-md mx-auto lg:mx-0">
                En simples pasos, personalizá el tratamiento que mejor se adapta a tus necesidades y las de tu familia.
              </p>
              <div className="pt-4">
                <Link to="/acerca" className="inline-block bg-background text-primary px-8 py-3 rounded-full font-bold transition-all duration-300 hover:bg-secondary hover:-translate-y-1 hover:shadow-xl active:scale-95">
                  Conocer equipo &rarr;
                </Link>
              </div>
            </div>

            <div className="w-full lg:w-1/2 mt-12 lg:mt-0 relative h-75 flex items-center justify-center">
              <div className="absolute w-full h-full opacity-20 bg-[radial-gradient(circle_at_center,var(--color-secondary)_0,transparent_100%)]"></div>
              <div className="relative z-10 flex flex-col gap-3 items-center">
                <div className="bg-background/10 backdrop-blur-md border border-background/20 text-background px-6 py-2 rounded-full font-bold opacity-60">Dra. Erina Carcara</div>
                <div className="bg-background text-primary px-8 py-4 rounded-full font-black text-xl shadow-2xl transform scale-110 flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent-orange rounded-full flex items-center justify-center text-white">👨‍⚕️</div>
                  Dr. Adolfo Martínez
                </div>
                <div className="bg-background/10 backdrop-blur-md border border-background/20 text-background px-6 py-2 rounded-full font-bold opacity-60">Especialistas</div>
                <div className="bg-background/10 backdrop-blur-md border border-background/20 text-background px-6 py-2 rounded-full font-bold opacity-60">Otros Dr's</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. SECCIÓN MAPA / UBICACIÓN (FONDO OSCURO PREMIUM) */}
      {/* ======================================================== */}
      <section className="bg-primary text-white border-y-8 border-accent-orange relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 w-full">
        {/* Fondo decorativo radial oscuro */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_bottom_left,white,transparent_50%)]"></div>

        <div className="mx-auto max-w-7xl relative z-10" data-aos="fade-up">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-5/12 space-y-8 text-center lg:text-left">
              <span className="inline-block px-4 py-1.5 rounded-full border border-accent-orange text-accent-orange font-bold text-xs uppercase tracking-wider">
                Nuestra Ubicación
              </span>
              <h2 className="text-4xl md:text-5xl font-black leading-tight uppercase tracking-tight">
                Accedé a nuestras <br />
                <span className="text-accent-orange">instalaciones</span>
              </h2>
              <p className="text-secondary/80 font-medium text-lg">
                Encontranos en el corazón de San Miguel de Tucumán, con fácil acceso y comodidad para tu atención.
              </p>
              <Link to="/contacto" className="inline-block bg-accent-orange text-primary font-bold px-8 py-3 rounded-full transition-all duration-300 hover:brightness-110 hover:-translate-y-1 hover:shadow-xl active:scale-95">
                Ver cómo llegar &rarr;
              </Link>

              <div className="pt-8 flex flex-col sm:flex-row gap-4">
                <div className="flex-1 border border-white/20 rounded-2xl p-4 flex items-center gap-4 bg-white/5 backdrop-blur-sm shadow-sm">
                  <div className="bg-secondary text-primary p-2 rounded-full"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg></div>
                  <p className="font-bold text-sm">Jose Rondeau 827</p>
                </div>
                <div className="flex-1 border border-white/20 rounded-2xl p-4 flex items-center gap-4 bg-white/5 backdrop-blur-sm shadow-sm">
                  <div className="bg-accent-orange text-white p-2 rounded-full"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg></div>
                  <p className="font-bold text-sm">Centro Odontológico</p>
                </div>
              </div>
            </div>

            {/* Mapa Punteado con tarjetas flotantes adaptado a oscuro */}
            <div className="w-full lg:w-7/12 relative h-[500px] bg-[radial-gradient(rgba(212,208,200,0.15)_2px,transparent_2px)] bg-size-[16px_16px] rounded-3xl flex items-center justify-center">
              <div className="absolute top-1/4 left-10 bg-white p-4 rounded-full shadow-2xl flex items-center gap-4 text-primary">
                <div className="bg-secondary/30 p-2 rounded-full font-bold">+15</div>
                <p className="font-bold text-sm pr-4">Años de experiencia</p>
              </div>
              <div className="absolute bottom-1/3 right-4 bg-white p-4 rounded-full shadow-2xl flex items-center gap-4 text-primary">
                <div className="bg-accent-orange/20 p-2 rounded-full text-accent-orange font-bold">+5.000</div>
                <p className="font-bold text-sm pr-4">Sonrisas cuidadas</p>
              </div>
              <div className="absolute top-2/3 left-10 md:left-20 bg-white p-4 rounded-full shadow-2xl flex items-center gap-4 text-primary">
                <div className="bg-primary/20 p-2 rounded-full font-bold">4</div>
                <p className="font-bold text-sm pr-4">Especialidades</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. SECCIÓN EXPERTOS (FONDO CLARO) */}
      {/* ======================================================== */}
      <section className="bg-background py-24 px-4 sm:px-6 lg:px-8 w-full">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left" data-aos="fade-right">
              <h2 className="text-5xl md:text-6xl font-black text-text uppercase leading-[1.05] tracking-tight">
                Expertos <br /> en lo que <br />
                <span className="text-accent-orange">te hace bien</span>
              </h2>
              <p className="text-lg text-text-light font-medium">
                Atendiendo sonrisas y cuidando la salud dental de las familias tucumanas con la mejor tecnología.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link to="/turnos" className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-primary text-background font-bold transition-all duration-300 hover:brightness-110 hover:-translate-y-1 hover:shadow-xl active:scale-95 uppercase tracking-wide">
                  Reservar turno &rarr;
                </Link>
                <Link to="/contacto" className="w-full sm:w-auto px-8 py-3.5 rounded-full border-2 border-secondary text-primary font-bold transition-all duration-300 hover:bg-secondary/50 hover:-translate-y-1 hover:shadow-xl active:scale-95 uppercase tracking-wide">
                  Asesoramiento &rarr;
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0" data-aos="fade-left">
              <img src="/sala de espera 1.jpeg" alt="Instalaciones" className="w-full h-[500px] object-cover rounded-[2.5rem] shadow-2xl border-4 border-white" />
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] bg-white rounded-2xl p-5 shadow-xl border border-secondary/50 flex items-center gap-4">
                <div className="bg-secondary/40 p-3 rounded-full text-accent-orange">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 002 2h2v4l.586-.586z" /></svg>
                </div>
                <div>
                  <p className="font-extrabold text-text text-lg">Consultas por WhatsApp</p>
                  <p className="text-sm text-text-light font-medium">Asesoramiento al instante</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. SECCIÓN PREGUNTAS FRECUENTES (FONDO OSCURO PREMIUM) */}
      {/* ======================================================== */}
      <section className="bg-primary text-white py-24 px-4 sm:px-6 lg:px-8 w-full relative overflow-hidden border-t-8 border-accent-orange">
        {/* Fondo decorativo radial oscuro */}
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none bg-[radial-gradient(circle_at_top_right,white,transparent_50%)]"></div>

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row gap-16">

            <div className="w-full md:w-5/12 text-center md:text-left">
              <h2 className="text-4xl lg:text-5xl font-black uppercase leading-tight tracking-tight" data-aos="fade-up">
                Respuestas <br />
                <span className="text-accent-orange">que pueden ayudarte</span>
              </h2>
              <div className="mt-8">
                <Link to="/contacto" className="inline-block px-8 py-4 border-2 border-secondary/30 text-secondary rounded-full font-bold transition-all duration-300 hover:text-primary hover:bg-secondary hover:-translate-y-1 hover:shadow-xl active:scale-95 shadow-sm">
                  Ir a contacto directo &rarr;
                </Link>
              </div>
            </div>

            <div className="w-full md:w-7/12 space-y-4" data-aos="fade-up" data-aos-delay="200">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-lg transition-all">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-6 flex justify-between items-center text-left focus:outline-none hover:bg-white/5 transition-colors"
                  >
                    <span className="font-bold text-lg">{faq.q}</span>
                    <svg className={`w-6 h-6 text-accent-orange transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-secondary/80 font-medium text-base leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default SeccionesInformativas;