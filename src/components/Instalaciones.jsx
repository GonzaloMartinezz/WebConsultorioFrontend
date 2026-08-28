import { FaMapMarkerAlt, FaWhatsapp, FaInstagram, FaPaperPlane } from 'react-icons/fa';

const Instalaciones = () => {
  return (
    <>
      <section className="pt-32 pb-16 bg-[#050505] flex flex-col items-center border-t border-white/5 relative overflow-hidden">
        {/* Glow Background */}
        <div className="absolute top-1/4 left-0 w-125 h-125 bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none"></div>

        {/* Parte 1: Galería de Instalaciones */}
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10" data-aos="fade-up">
          <span className="inline-block px-5 py-2 rounded-full border border-white/10 bg-white/5 text-white font-black text-[10px] uppercase tracking-[0.3em] backdrop-blur-md mb-8">
            Nuestra Clínica
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter uppercase mb-6 leading-[0.9]">
            Nuestras <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">Instalaciones</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto font-light mb-16 text-lg leading-relaxed">
            Consultorios amplios, climatizados y equipados con tecnología de vanguardia para que tu experiencia sea lo más cómoda, segura y eficiente posible.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] md:auto-rows-[350px]">
            {/* Imagen Principal - Grande */}
            <div className="md:col-span-2 md:row-span-2 rounded-[3rem] bg-[#111] relative overflow-hidden group border border-white/10 shadow-2xl">
              <img loading="lazy" src="/nosotros-impresora3d.png" alt="Especialidades" className="w-full h-full object-cover transition-all duration-1000 opacity-90 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent flex items-end p-12">
                <div className="space-y-2">
                  <p className="text-cyan-400 font-black text-[10px] uppercase tracking-[0.3em]">Vanguardia</p>
                  <h3 className="text-white font-black tracking-widest uppercase text-2xl">Especialidades Digitales</h3>
                </div>
              </div>
            </div>

            {/* Imagen 2 - Superior Derecha */}
            <div className="rounded-[3rem] bg-[#111] relative overflow-hidden group border border-white/10 shadow-2xl">
              <img loading="lazy" src="https://res.cloudinary.com/t9ja9vq0/image/upload/v1787775666/frezadora1.jpg" alt="Precisión Digital" className="w-full h-full object-cover transition-all duration-1000 opacity-80 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                <h3 className="text-white font-black tracking-widest uppercase text-sm">Precisión Digital</h3>
              </div>
            </div>

            {/* Imagen 3 - Inferior Derecha */}
            <div className="rounded-[3rem] bg-[#111] relative overflow-hidden group border border-white/10 shadow-2xl">
              <img loading="lazy" src="https://res.cloudinary.com/t9ja9vq0/image/upload/v1787775653/maquinas_adolfo_4.jpg" alt="Tecnología de Punta" className="w-full h-full object-cover transition-all duration-1000 opacity-80 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                <h3 className="text-white font-black tracking-widest uppercase text-sm">Tecnología de Punta</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parte 2: Mapa y Contacto (Diseño Overlap según Image 1) */}
      <section className="w-full relative flex items-center justify-center min-h-150 lg:min-h-187.5 bg-white">
        {/* Mapa de fondo */}
        <div className="absolute inset-0 w-full h-full z-0">
          <iframe
            title="Mapa de ubicación"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.10688656627!2d-65.2104523!3d-26.8365691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c0e12345678%3A0x123456789abcdef!2sJos%C3%A9%20Rondeau%20827%2C%20T4000%20San%20Miguel%20de%20Tucum%C3%A1n!5e0!3m2!1ses-419!2sar!4v1710000000000!5m2!1ses-419!2sar"
            width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full object-cover grayscale-20"
          ></iframe>
        </div>

        {/* Cajas flotantes superpuestas */}
        <div className="relative z-10 w-[90%] sm:w-[90%] max-w-6xl mx-auto flex flex-col lg:flex-row items-center py-10 lg:py-20" data-aos="fade-up">

          {/* Caja Izquierda: Información de Contacto (Marrón) */}
          <div className="bg-[#4a3b32] w-full lg:w-[55%] rounded-3xl md:rounded-4xl p-5 sm:p-8 md:p-14 z-20 shadow-[20px_0_40px_-10px_rgba(0,0,0,0.3)] border border-white/10 relative">
            <h2 className="text-lg md:text-3xl font-black text-white tracking-wider uppercase mb-6 md:mb-12 text-center md:text-left">
              Información de Contacto
            </h2>

            <div className="space-y-6 md:space-y-10">
              <div className="flex items-start gap-4 md:gap-5">
                <div className="mt-1 w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 shrink-0">
                  <FaMapMarkerAlt className="text-white/80 text-lg md:text-xl" />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-white/50 mb-1">Dirección Central</p>
                  <p className="text-white font-medium text-sm md:text-base leading-relaxed mb-2 md:mb-3">José Rondeau 827<br />San Miguel de Tucumán</p>
                  <a
                    href="https://maps.google.com/?q=Jose+Rondeau+827+Tucuman"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-white border border-white/30 hover:bg-white hover:text-[#4a3b32] px-4 py-1.5 md:px-5 md:py-2 rounded-full transition-all"
                  >
                    Ver cómo llegar
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 md:gap-5">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 shrink-0 hover:bg-green-500/20 hover:border-green-500/50 transition-colors cursor-pointer">
                  <FaWhatsapp className="text-white/80 text-lg md:text-xl hover:text-green-400 transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-white/50 mb-1">Atención Directa</p>
                  <a href="https://wa.me/5493816242482" target="_blank" rel="noreferrer" className="text-white font-medium text-sm md:text-base hover:text-green-400 transition-colors">
                    +54 9 381 624-2482
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 md:gap-5">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 shrink-0 hover:bg-pink-500/20 hover:border-pink-500/50 transition-colors cursor-pointer">
                  <FaInstagram className="text-white/80 text-lg md:text-xl hover:text-pink-400 transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-white/50 mb-1">Comunidad Activa</p>
                  <a href="https://www.instagram.com/doctorescarcaramartinez/" target="_blank" rel="noreferrer" className="text-white font-medium text-sm md:text-base hover:text-pink-400 transition-colors">
                    @doctorescarcaramartinez
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Caja Derecha: Logo (Azul Oscuro) */}
          <div className="bg-[#3b5d72] w-full lg:w-[45%] rounded-3xl md:rounded-4xl p-6 md:p-14 z-10 lg:-ml-10 mt-3 lg:mt-0 shadow-2xl relative flex items-center justify-center min-h-37.5 md:min-h-100">
            <img loading="lazy"
              src="/NEWLOGO.png"
              alt="Studio Dental C&M"
              className="w-full max-w-35 md:max-w-70 object-contain drop-shadow-2xl transition-all duration-500 hover:scale-105"
              style={{ filter: 'invert(1) hue-rotate(180deg)' }}
            />
          </div>

        </div>
      </section>
    </>
  );
};

export default Instalaciones;
