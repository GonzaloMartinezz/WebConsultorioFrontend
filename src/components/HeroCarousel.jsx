import { useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const HeroCarousel = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [loadedIndices, setLoadedIndices] = useState([0, 1]); // Cargar solo la 1ra y 2da imagen al inicio

  const imagenesConsultorio = [
    "https://res.cloudinary.com/t9ja9vq0/image/upload/v1787775655/saladeespera0.1.jpg",
    "https://res.cloudinary.com/t9ja9vq0/image/upload/v1787775655/sala_de_espera_1.jpg",
    "https://res.cloudinary.com/t9ja9vq0/image/upload/v1787775655/escritorio_erina_1.jpeg",
    "https://res.cloudinary.com/t9ja9vq0/image/upload/v1787775714/escritorio_erina_2.jpg",
    "https://res.cloudinary.com/t9ja9vq0/image/upload/v1787775687/consultorio_erina_1.jpg",
    "https://res.cloudinary.com/t9ja9vq0/image/upload/v1787775785/escritorio_adolfo_2.jpg",
    "https://res.cloudinary.com/t9ja9vq0/image/upload/v1787775703/pasillo_consultorio_adolfo_1.jpg",
    "https://res.cloudinary.com/t9ja9vq0/image/upload/v1787775693/pasillo_consultorio_adolfo_2.jpg",
    "https://res.cloudinary.com/t9ja9vq0/image/upload/v1787775692/pasillo_consultorio_adolfo_3.jpg",
    "https://res.cloudinary.com/t9ja9vq0/image/upload/v1787775734/maquinas_adolfo_2.jpg",
    "https://res.cloudinary.com/t9ja9vq0/image/upload/v1787775655/maquinas_adolfo_3.jpeg",
    "https://res.cloudinary.com/t9ja9vq0/image/upload/v1787775714/consultorio_adolfo_1.jpg",
    "https://res.cloudinary.com/t9ja9vq0/image/upload/v1787775692/consultorio_adolfo_3.jpg",
    "https://res.cloudinary.com/t9ja9vq0/image/upload/v1787775713/consultorio_adolfo_4.jpg",
  ];

  useEffect(() => {
    const intervalo = setInterval(() => {
      setCurrentImage((prev) => {
        const next = (prev + 1) % imagenesConsultorio.length;
        // Pre-cargar la imagen que sigue después de la nueva actual para evitar pestañeos
        const prefetchNext = (next + 1) % imagenesConsultorio.length;
        setLoadedIndices(currentLoaded => {
          if (!currentLoaded.includes(prefetchNext)) {
            return [...currentLoaded, prefetchNext];
          }
          return currentLoaded;
        });
        return next;
      });
    }, 4500);
    return () => clearInterval(intervalo);
  }, [imagenesConsultorio.length]);

  // Calculamos la imagen anterior para mantenerla de fondo durante la transición
  const prevImage = (currentImage - 1 + imagenesConsultorio.length) % imagenesConsultorio.length;

  return (
    <section className="relative w-full h-[80vh] lg:h-screen overflow-hidden bg-[#050505]">
      {/* Sombra sutil arriba para proteger el Navbar transparente */}
      <div className="absolute top-0 left-0 w-full h-48 bg-linear-to-b from-black/90 via-black/40 to-transparent z-30 pointer-events-none"></div>

      {/* Carrusel de Imágenes con Efecto Premium Crossfade */}
      {imagenesConsultorio.map((img, index) => {
        const isActive = index === currentImage;
        const isPrev = index === prevImage;
        const isLoaded = loadedIndices.includes(index);

        return (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${isActive ? "opacity-100 z-20" : isPrev ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
          >
            {/* Sin scale animado para que no se vea "con zoom" extra */}
            <div className={`w-full h-full transition-transform duration-1000 ease-out`}>

              {/* Capa Principal: Ocupa 100% de la pantalla siempre */}
              {isLoaded && (
                <img 
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  src={img}
                  alt={`Consultorio ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover object-center drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                />
              )}
            </div>
          </div>
        );
      })}

      {/* Efecto de degradado sutil para asegurar lectura del texto */}
      <div className="absolute bottom-0 left-0 w-full h-64 bg-linear-to-t from-black/60 to-transparent z-30 pointer-events-none"></div>

      {/* Ola SVG (Wave) decorativa inferior para transición curva hacia el Tomógrafo */}
      <div className="absolute left-0 right-0 bottom-0 -mb-px w-full z-30 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 1440 120" className="w-[102%] -ml-[1%] h-12 sm:h-14 md:h-16 lg:h-16 xl:h-20 block rotate-180" preserveAspectRatio="none">
          <path fill="#4a3b32" d="M0,0 C500,180 1100,30 1440,0 L1440,0 L0,0 Z"></path>
        </svg>
      </div>
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
