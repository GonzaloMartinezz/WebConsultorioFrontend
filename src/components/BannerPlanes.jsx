import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BannerPlanes = () => {
  const [currentImage, setCurrentImage] = useState(0);
  
  const imagenesConsultorio = [
    "/sala de espera 1.jpeg",
    "/sala de espera 3.jpeg",
    "/consultorio 2.jpeg",
    "/consultorio 1.jpeg",
    "/escritorio 1.jpeg",
    "/escritorio 2.jpeg",
  ];

  useEffect(() => {
    const intervalo = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % imagenesConsultorio.length);
    }, 3500);
    return () => clearInterval(intervalo);
  }, [imagenesConsultorio.length]);

  return (
    <>
      {/* ========================================== */}
      {/* SECCIÓN 1: HERO (FONDO OSCURO PREMIUM) */}
      {/* ========================================== */}
      <section className="relative bg-primary text-background overflow-visible border-b-8 border-accent-orange h-[calc(100vh-80px)] min-h-[600px] flex items-center">
        
        {/* Fondo decorativo extraído de Contacto */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_top_left,white,transparent_50%)]"></div>
        
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-16 z-10">
          
          {/* COLUMNA IZQUIERDA: Textos y Botones */}
          <div className="flex-1 text-center md:text-left w-full mt-4 md:mt-0">
            <span className="inline-block py-2 px-6 rounded-full bg-secondary/10 text-accent-orange font-bold text-xs sm:text-sm mb-4 tracking-wide shadow-sm border border-accent-orange/30 backdrop-blur-sm">
              El primer paso hacia tu mejor sonrisa
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-5 tracking-tight uppercase">
              Cuidamos tu <br className="hidden lg:block"/> salud con <br className="hidden lg:block"/>
              <span className="text-accent-orange">profesionalismo</span>
            </h1>
            
            <p className="text-base md:text-lg text-secondary/90 mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed font-medium">
              Te ofrecemos tratamientos de primer nivel en un ambiente cómodo y relajado. Reserva tu turno online de forma rápida y sin complicaciones.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <Link 
                to="/turnos" 
                className="w-full sm:w-auto text-center px-10 py-3 text-primary font-black text-lg rounded-xl bg-accent-orange shadow-lg hover:brightness-110 transition-all duration-300 transform hover:-translate-y-1 uppercase tracking-wide"
              >
                Solicitar Turno
              </Link>
              <Link 
                to="/acerca" 
                className="w-full sm:w-auto text-center px-8 py-3 text-white font-bold text-lg rounded-xl border-2 border-secondary/50 hover:bg-secondary hover:text-primary transition-all duration-300"
              >
                Conocer el Centro
              </Link>
            </div>
          </div>

          {/* COLUMNA DERECHA: Carrusel de Imágenes */}
          <div className="flex-1 w-full lg:max-w-[55%] relative md:ml-auto">
            
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-accent-orange/80 aspect-4/3 w-full bg-secondary/50">
              {imagenesConsultorio.map((img, index) => (
                <img 
                  key={index}
                  src={img} 
                  alt={`Instalaciones ${index + 1}`} 
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                    index === currentImage ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                />
              ))}
            </div>
            
            {/* Tarjeta flotante */}
            <div className="absolute -bottom-6 left-1/2 md:-left-8 transform -translate-x-1/2 md:translate-x-0 bg-white p-3 sm:p-4 rounded-2xl shadow-2xl border border-secondary flex flex-col sm:flex-row items-center gap-3 z-20 w-[90%] sm:w-[400px]">
              <div className="bg-primary/10 p-3 rounded-full text-accent-orange shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-primary font-extrabold text-base sm:text-lg leading-tight">Reservar con un Profesional</p>
                <p className="text-text-light text-xs sm:text-sm mt-0.5 leading-snug font-medium">Primera consulta de evaluación y plan a tu medida.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECCIÓN 2: CHECKLIST (FONDO CLARO) */}
      {/* ========================================== */}
      <section className="bg-background border-b border-secondary/50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-sm font-bold tracking-widest text-primary uppercase mb-10">
            ¿Por qué elegirnos?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-8 text-text-light text-base md:text-lg font-bold mx-auto max-w-5xl">
            <div className="flex items-center gap-3"><svg className="w-7 h-7 text-accent-orange shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg><span>Profesionales Especializados</span></div>
            <div className="flex items-center gap-3"><svg className="w-7 h-7 text-accent-orange shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg><span>Atención Personalizada</span></div>
            <div className="flex items-center gap-3"><svg className="w-7 h-7 text-accent-orange shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg><span>Máquinas de última generación</span></div>
            <div className="flex items-center gap-3"><svg className="w-7 h-7 text-accent-orange shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg><span>Resultados Garantizados</span></div>
            <div className="flex items-center gap-3"><svg className="w-7 h-7 text-accent-orange shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg><span>Turnos Rápidos y Sin Esperas</span></div>
            <div className="flex items-center gap-3"><svg className="w-7 h-7 text-accent-orange shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg><span>Tratamientos por especialistas</span></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BannerPlanes;