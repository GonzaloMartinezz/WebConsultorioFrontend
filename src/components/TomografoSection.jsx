import { useState, useEffect } from 'react';

const TomografoSection = () => {
  const images = [
    '/tomografo1.7.jpg',
    '/tomografo1.jpg',
    '/tomografo1.2.jpg',
    '/tomografo1.6.jpg',
    '/tomografo1.3.jpg',
    '/tomografo1.4.jpg',
    '/tomografo1.5.jpg',
    '/tomografo1.8.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const mainImage = images[currentIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="w-full bg-[#4a3b32] text-white pt-16 md:pt-28 pb-12 md:pb-20 px-4 md:px-12 relative z-10 -mt-[1px]">
      {/* Efecto de difuminado (fade) sangrando hacia arriba para fusionar suavemente con la foto */}
      <div className="absolute -top-24 h-24 md:-top-48 md:h-48 left-0 w-full bg-gradient-to-t from-[#4a3b32] to-transparent pointer-events-none z-20"></div>

      <div className="max-w-[85rem] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-20 items-center">

        {/* Lado Izquierdo: Galería de Imágenes (Mayor Prioridad) */}
        <div className="w-full lg:w-7/12 xl:w-[55%] flex flex-col gap-4">
          {/* Imagen Principal */}
          <div className="w-full aspect-[1.15/1] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative bg-[#111]">
            <img
              src={mainImage}
              alt="Tomógrafo principal"
              className="w-full h-full object-cover transition-all duration-500 ease-in-out"
            />
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold tracking-wider border border-white/10">
              TECNOLOGÍA 3D
            </div>
          </div>

          {/* Miniaturas (Thumbnails) */}
          <div className="grid grid-cols-5 gap-2 sm:gap-3 pt-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-full aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${currentIndex === idx ? 'border-accent-orange scale-105 shadow-[0_0_15px_rgba(255,107,0,0.4)]' : 'border-white/5 opacity-60 hover:opacity-100 hover:border-white/20'}`}
              >
                <img
                  src={img}
                  alt={`Vista tomógrafo ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Lado Derecho: Textos y Descripción */}
        <div className="w-full lg:w-5/12 xl:w-[45%] flex flex-col justify-center lg:pl-10 xl:pl-16">
          <div className="flex items-center gap-3 px-5 py-2 w-fit rounded-full border border-accent-orange/20 bg-accent-orange/5 mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(255,120,0,0.1)]">
            <span className="w-2 h-2 rounded-full bg-accent-orange animate-pulse shadow-[0_0_8px_rgba(255,120,0,0.8)]"></span>
            <span className="text-[10px] sm:text-xs font-black tracking-[0.3em] text-accent-orange uppercase">
              Diagnóstico Preciso
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 text-white tracking-tighter leading-[0.9]">
            Odontología <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-accent-orange to-orange-500 drop-shadow-[0_0_30px_rgba(255,120,0,0.3)]">Digital</span>
          </h2>

          <p className="text-lg md:text-xl text-white/60 mb-10 leading-relaxed font-medium">
            En nuestro centro contamos con equipamiento de <strong className="text-white font-bold bg-white/10 px-2 py-0.5 rounded-md border border-white/10">última generación</strong> para brindarte diagnósticos exactos y tratamientos más seguros. La digitalización nos permite planificar tu sonrisa con <span className="text-accent-orange font-semibold">precisión milimétrica</span> antes de cualquier intervención.
          </p>

          <div className="space-y-5">
            <div className="group bg-white/10 hover:bg-white/20 transition-all duration-300 px-6 py-4 rounded-full border border-white/10 shadow-lg flex items-center gap-5 cursor-default">
              <div className="w-12 h-12 bg-linear-to-br from-accent-orange to-orange-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(255,107,0,0.4)] group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div className="flex flex-col">
                <h4 className="font-bold text-white text-lg tracking-wide leading-tight">Tomografía CBCT</h4>
                <p className="text-gray-300 text-sm font-light mt-0.5">Imágenes 3D de alta resolución</p>
              </div>
            </div>

            <div className="group bg-white/5 hover:bg-white/15 transition-all duration-300 px-6 py-4 rounded-full border border-white/5 shadow-lg flex items-center gap-5 cursor-default">
              <div className="w-12 h-12 bg-black/30 rounded-full flex items-center justify-center flex-shrink-0 border border-white/10 group-hover:border-accent-orange/50 transition-colors">
                <svg className="w-6 h-6 text-accent-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <div className="flex flex-col">
                <h4 className="font-bold text-white text-lg tracking-wide leading-tight">Radiografías Digitales</h4>
                <p className="text-gray-300 text-sm font-light mt-0.5">Mínima exposición a radiación</p>
              </div>
            </div>

            <div className="group bg-white/5 hover:bg-white/15 transition-all duration-300 px-6 py-4 rounded-full border border-white/5 shadow-lg flex items-center gap-5 cursor-default">
              <div className="w-12 h-12 bg-black/30 rounded-full flex items-center justify-center flex-shrink-0 border border-white/10 group-hover:border-accent-orange/50 transition-colors">
                <svg className="w-6 h-6 text-accent-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <div className="flex flex-col">
                <h4 className="font-bold text-white text-lg tracking-wide leading-tight">Flujo 100% Digital</h4>
                <p className="text-gray-300 text-sm font-light mt-0.5">Diseño de sonrisa sin moldes</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Ola SVG (Wave) decorativa inferior para transición curva estilo portfolio */}
      <div className="absolute left-0 right-0 top-full -mt-[2px] w-full z-20 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 1440 120" className="w-[102%] -ml-[1%] h-[40px] sm:h-[70px] md:h-[100px] lg:h-[120px] block" preserveAspectRatio="none">
          <path fill="#4a3b32" d="M0,0 C500,180 1100,30 1440,0 L1440,0 L0,0 Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default TomografoSection;
