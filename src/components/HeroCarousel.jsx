import { useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const HeroCarousel = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const imagenesConsultorio = [
    "/saladeespera0.1.jpg",
    "/sala de espera 1.jpg",
    "/escritorio erina 1.jpeg",
    "/escritorio erina 2.jpeg",
    "/consultorio erina 1.jpg",
    "/escritorio adolfo 2.jpg",
    "/pasillo consultorio adolfo 1.jpeg",
    "/pasillo consultorio adolfo 2.jpeg",
    "/pasillo consultorio adolfo 3.jpeg",
    "/maquinas adolfo 2.jpg",
    "/maquinas adolfo 3.jpeg",
    "/consultorio adolfo 1.jpeg",
    "/consultorio adolfo 3.jpeg",
    "/consultorio adolfo 4.jpg",
  ];

  useEffect(() => {
    const intervalo = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % imagenesConsultorio.length);
    }, 4500);
    return () => clearInterval(intervalo);
  }, [imagenesConsultorio.length]);

  // Calculamos la imagen anterior para mantenerla de fondo durante la transición
  const prevImage = (currentImage - 1 + imagenesConsultorio.length) % imagenesConsultorio.length;

  return (
    <section className="relative w-full h-[80vh] lg:h-screen overflow-hidden bg-[#050505]">
      {/* Sombra sutil arriba para proteger el Navbar transparente */}
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-black/90 via-black/40 to-transparent z-30 pointer-events-none"></div>

      {/* Carrusel de Imágenes con Efecto Premium Crossfade */}
      {imagenesConsultorio.map((img, index) => {
        const isActive = index === currentImage;
        const isPrev = index === prevImage;

        return (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-[1500ms] ease-in-out ${isActive ? "opacity-100 z-20" : isPrev ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
          >
            {/* Sin scale animado para que no se vea "con zoom" extra */}
            <div className={`w-full h-full transition-transform duration-[8000ms] ease-out`}>

              {/* Capa Principal: Ocupa 100% de la pantalla siempre */}
              <img
                src={img}
                alt={`Consultorio ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover object-center drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              />
            </div>
          </div>
        );
      })}

      {/* Efecto de degradado inferior para suavizar el paso a la siguiente sección (Tomógrafo) */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#4a3b32] via-[#4a3b32]/40 to-transparent z-30 pointer-events-none"></div>

      {/* Indicador animado para invitar a hacer scroll */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-40 flex flex-col items-center animate-bounce cursor-pointer group" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
        <span className="text-white/90 text-[8px] md:text-[10px] font-black tracking-[0.4em] uppercase mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] group-hover:text-white transition-colors">Deslizar para explorar</span>
        <div className="bg-black/30 backdrop-blur-md p-3 rounded-full border border-white/20 shadow-xl group-hover:bg-white/20 transition-all">
          <FaChevronDown className="text-white text-lg md:text-xl drop-shadow-lg" />
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
