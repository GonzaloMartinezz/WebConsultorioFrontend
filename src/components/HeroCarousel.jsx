import { useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const HeroCarousel = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const imagenesConsultorio = [
    "/sala de espera 3.jpeg",
    "/consultorio 1.jpeg",
    "/consultorio 2.jpeg",
    "/escritorio erina 2.jpeg",
    "/escritorio erina 1.jpeg",
    "/consultorio erina 1.jpeg",
    "/consultorio erina 2.jpeg",
    "/escritorio adolfo 2.jpg",
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
    }, 4800);
    return () => clearInterval(intervalo);
  }, [imagenesConsultorio.length]);

  return (
    // h-screen hace que ocupe el 100% de la pantalla exacta del monitor o celular
    <section className="relative w-full h-screen overflow-hidden bg-black">

      {/* Sombra sutil arriba para proteger el Navbar transparente */}
      <div className="absolute top-0 left-0 w-full h-48 bg-linear-to-b from-black/70 via-black/30 to-transparent z-10 pointer-events-none"></div>

      {/* Carrusel de Imágenes */}
      {imagenesConsultorio.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Consultorio ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1500 ease-in-out ${index === currentImage ? "opacity-100 scale-105" : "opacity-0 scale-100"}`}
          style={{ transition: 'opacity 1.5s ease-in-out, transform 6s linear' }}
        />
      ))}

      {/* Efecto de degradado inferior para suavizar el paso a la siguiente sección */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-black/40 to-transparent z-10 pointer-events-none"></div>

      {/* Indicador animado para invitar a hacer scroll */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center animate-bounce cursor-pointer group" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
        <span className="text-white text-[10px] md:text-xs font-black tracking-[0.4em] uppercase mb-3 shadow-black drop-shadow-lg opacity-80 group-hover:opacity-100 transition-opacity">Descubrir</span>
        <div className="bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20 shadow-xl group-hover:bg-white/20 transition-all">
          <FaChevronDown className="text-white text-lg md:text-xl drop-shadow-md" />
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
