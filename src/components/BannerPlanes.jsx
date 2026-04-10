import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BannerPlanes = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const imagenesConsultorio = [
    "/sala de espera 1.jpeg",
    "/sala de espera 2.jpeg",
    "/sala de espera 3.jpeg",
    "/sala de espera 4.jpeg",
    "/consultorio 1.jpeg",
    "/consultorio 2.jpeg",
    "/escritorio erina 2.jpeg",
    "/escritorio erina 3.jpeg",
    "/consultorio erina 1.jpeg",
    "/consultorio erina 2.jpeg",
    "/escritorio adolfo 1.jpeg",
    "/escritorio adolfo 2.jpeg",
    "/pasillo consultorio adolfo 1.jpeg",
    "/pasillo consultorio adolfo 2.jpeg",
    "/pasillo consultorio adolfo 3.jpeg",
    "/consultorio adolfo 1.jpeg",
    "/consultorio adolfo 2.jpeg",
    "/consultorio adolfo 3.jpeg",
    "/consultorio adolfo 4.jpeg",
  ];

  useEffect(() => {
    const intervalo = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % imagenesConsultorio.length);
    }, 4000);
    return () => clearInterval(intervalo);
  }, [imagenesConsultorio.length]);

  return (
    <>
      {/* ======================================================== */}
      {/* 1. GALERÍA SUPERIOR (Fotos nítidas y solas) */}
      {/* ======================================================== */}
      <section className="relative w-full h-[45vh] lg:h-[60vh] min-h-[350px] overflow-hidden bg-secondary/20">
        {imagenesConsultorio.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Instalaciones ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentImage ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        
        {/* Tarjetita de reserva (Opcional: la dejé en la esquina de la foto porque le da un toque muy moderno, pero si la quieres quitar, simplemente borra este div) */}
        <div className="absolute bottom-6 right-6 hidden md:flex bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white items-center gap-4 z-10" data-aos="fade-up">
          <div className="bg-accent-orange p-3 rounded-full text-white shrink-0 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-primary font-black text-sm leading-tight">Reservar con un Profesional</p>
            <p className="text-text-light text-xs mt-0.5 font-bold">Evaluación y plan a tu medida.</p>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. TEXTO PRINCIPAL (Centrado debajo de las fotos) */}
      {/* ======================================================== */}
      <section className="bg-primary text-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b-8 border-accent-orange flex flex-col items-center text-center relative overflow-hidden">
        {/* Decoración de fondo sutil */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[radial-gradient(circle_at_center,white,transparent_70%)]"></div>

        <div className="max-w-4xl mx-auto relative z-10" data-aos="fade-up">
          <span className="inline-block py-2 px-6 rounded-full bg-accent-orange/20 text-accent-orange font-black text-xs sm:text-sm mb-6 tracking-widest border border-accent-orange/30 uppercase">
            El primer paso hacia tu mejor sonrisa
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] mb-6 tracking-tight uppercase">
            Cuidamos tu salud con <br className="hidden md:block" />
            <span className="text-accent-orange">profesionalismo</span>
          </h1>

          <p className="text-base md:text-xl text-white/80 mb-10 leading-relaxed font-medium max-w-2xl mx-auto">
            Te ofrecemos tratamientos de primer nivel en un ambiente cómodo y relajado. Reserva tu turno online de forma rápida y sin complicaciones.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <Link to="/turnos" className="w-full sm:w-auto text-center px-10 py-4 text-white font-black text-lg rounded-xl bg-accent-orange shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl active:scale-95 uppercase tracking-wide">
              Solicitar Turno
            </Link>
            <Link to="/acerca" className="w-full sm:w-auto text-center px-8 py-4 text-white font-bold text-lg rounded-xl border-2 border-white/30 hover:bg-white/10 transition-all active:scale-95">
              Conocer el Centro
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. SECCIÓN CHECKLIST (Se mantiene idéntico a tu original) */}
      {/* ======================================================== */}
      <section className="bg-background py-16 lg:py-25 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-sm md:text-lg font-bold tracking-widest text-primary uppercase mb-10 md:mb-15">¿Por qué elegirnos?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 md:gap-y-15 gap-x-5 text-text-light text-base md:text-lg font-bold mx-auto max-w-5xl">
            <div className="flex items-center gap-3" data-aos="fade-up"><svg className="w-7 h-7 text-accent-orange shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg><span>Profesionales Especializados</span></div>
            <div className="flex items-center gap-3" data-aos="fade-up" data-aos-delay="100"><svg className="w-7 h-7 text-accent-orange shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg><span>Atención Personalizada</span></div>
            <div className="flex items-center gap-3" data-aos="fade-up" data-aos-delay="200"><svg className="w-7 h-7 text-accent-orange shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg><span>Máquinas de última generación</span></div>
            <div className="flex items-center gap-3" data-aos="fade-up" data-aos-delay="300"><svg className="w-7 h-7 text-accent-orange shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg><span>Resultados Garantizados</span></div>
            <div className="flex items-center gap-3" data-aos="fade-up" data-aos-delay="400"><svg className="w-7 h-7 text-accent-orange shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg><span>Turnos Rápidos y Sin Esperas</span></div>
            <div className="flex items-center gap-3" data-aos="fade-up" data-aos-delay="500"><svg className="w-7 h-7 text-accent-orange shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg><span>Tratamientos por especialistas</span></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BannerPlanes;
