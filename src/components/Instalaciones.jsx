import { FaMapMarkerAlt, FaWhatsapp, FaInstagram } from 'react-icons/fa';

const Instalaciones = () => {
  return (
    <section className="py-32 bg-[#050505] flex flex-col items-center border-t border-white/5 relative overflow-hidden">
      {/* Glow Background */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#FF7800]/5 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Parte 1: Galería de Instalaciones */}
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mb-24 text-center relative z-10" data-aos="fade-up">
        <span className="inline-block px-5 py-2 rounded-full border border-[#FF7800]/30 bg-[#FF7800]/5 text-[#FF7800] font-black text-[10px] uppercase tracking-[0.3em] backdrop-blur-md mb-8">
          Nuestra Clínica
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter uppercase mb-6 leading-[0.9]">
          Nuestras <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FF7800] to-orange-300">Instalaciones</span>
        </h2>
        <p className="text-white/50 max-w-2xl mx-auto font-light mb-16 text-lg leading-relaxed">
          Consultorios amplios, climatizados y equipados con tecnología de vanguardia para que tu experiencia sea lo más cómoda, segura y eficiente posible.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="h-80 rounded-[2.5rem] bg-[#111] relative overflow-hidden group border border-white/10 shadow-2xl">
            <img src="/orthodontics.jpg.webp" alt="Sala de espera" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent flex items-end p-8">
              <h3 className="text-white font-black tracking-[0.2em] uppercase text-sm">Especialidades</h3>
            </div>
          </div>
          <div className="h-80 rounded-[2.5rem] bg-[#111] relative overflow-hidden group border border-white/10 shadow-2xl">
            <img src="/impresora-3b-blog.webp" alt="Consultorio" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent flex items-end p-8">
              <h3 className="text-white font-black tracking-[0.2em] uppercase text-sm">Precisión Digital</h3>
            </div>
          </div>
          <div className="h-80 rounded-[2.5rem] bg-[#111] relative overflow-hidden group border border-white/10 shadow-2xl">
            <img src="/maquinascompletas.webp" alt="Tecnología de Punta" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent flex items-end p-8">
              <h3 className="text-white font-black tracking-[0.2em] uppercase text-sm">Tecnología de Punta</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Parte 2: Tarjeta Oscura de Contacto */}
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10" data-aos="fade-up">
        <div className="bg-[#0a0a0a] rounded-[3rem] p-10 md:p-16 flex flex-col lg:flex-row items-center gap-16 shadow-[0_40px_100px_-20px_rgba(255,120,0,0.15)] border border-white/10 relative overflow-hidden group">
          
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FF7800]/5 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="flex-1 space-y-10 relative z-10 w-full lg:w-5/12">
            <div>
              <span className="inline-block px-5 py-2 rounded-full border border-[#FF7800]/30 bg-[#FF7800]/5 text-[#FF7800] text-[10px] font-black tracking-[0.3em] uppercase mb-6 backdrop-blur-md">
                Ubicación Estratégica
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[0.9] tracking-tighter uppercase mb-6">
                Accedé a la <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FF7800] to-orange-300">Clínica</span>
              </h2>
              <p className="text-white/50 text-base font-light max-w-md leading-relaxed">
                Encontranos en el corazón de San Miguel de Tucumán. Contamos con tecnología de punta y ambientes diseñados para tu confort absoluto.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-5 bg-white/5 backdrop-blur-sm p-5 rounded-2xl border border-white/10 hover:border-[#FF7800]/30 transition-colors">
                <div className="w-12 h-12 rounded-full bg-[#FF7800]/10 flex items-center justify-center text-[#FF7800] shrink-0 border border-[#FF7800]/20 shadow-[0_0_15px_rgba(255,120,0,0.2)]">
                  <FaMapMarkerAlt size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-[#FF7800] uppercase tracking-[0.2em] font-black mb-1">Dirección Central</p>
                  <p className="text-white font-bold text-sm tracking-widest uppercase">Jose Rondeau 827</p>
                </div>
              </div>

              <div className="flex items-center gap-5 bg-white/5 backdrop-blur-sm p-5 rounded-2xl border border-white/10 hover:border-green-500/30 transition-colors">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 shrink-0 border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                  <FaWhatsapp size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-green-400 uppercase tracking-[0.2em] font-black mb-1">Atención Directa</p>
                  <a href="https://wa.me/5493816242482" target="_blank" rel="noreferrer" className="text-white font-bold text-sm tracking-widest uppercase hover:text-green-400 transition-colors">+54 9 381 624-2482</a>
                </div>
              </div>

              <div className="flex items-center gap-5 bg-white/5 backdrop-blur-sm p-5 rounded-2xl border border-white/10 hover:border-pink-500/30 transition-colors">
                <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-400 shrink-0 border border-pink-500/20 shadow-[0_0_15px_rgba(236,72,153,0.2)]">
                  <FaInstagram size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-pink-400 uppercase tracking-[0.2em] font-black mb-1">Comunidad Activa</p>
                  <a href="https://instagram.com/c.o_carcaramartinez" target="_blank" rel="noreferrer" className="text-white font-bold text-sm tracking-widest uppercase hover:text-pink-400 transition-colors">@c.o_carcaramartinez</a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full lg:w-7/12 h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl relative group border border-white/10 bg-black">
            {/* Mapa con Filtro Oscuro */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.10688656627!2d-65.2104523!3d-26.8365691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c0e12345678%3A0x123456789abcdef!2sJos%C3%A9%20Rondeau%20827%2C%20T4000%20San%20Miguel%20de%20Tucum%C3%A1n!5e0!3m2!1ses-419!2sar!4v1710000000000!5m2!1ses-419!2sar"
              width="100%" height="100%" style={{ border: 0, filter: 'grayscale(100%) invert(90%) contrast(1.2)' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              className="group-hover:filter-none transition-all duration-1000 opacity-60 group-hover:opacity-100"
            ></iframe>
            
            {/* Botón Flotante sobre el mapa */}
            <div className="absolute top-6 right-6">
              <a href="https://maps.google.com/?q=Jose+Rondeau+827+Tucuman" target="_blank" rel="noreferrer" className="bg-black/80 backdrop-blur-md border border-white/20 text-[#FF7800] font-black px-8 py-3 rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.5)] text-[10px] uppercase tracking-[0.2em] hover:bg-[#FF7800] hover:text-white transition-all">
                Ver cómo llegar
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Instalaciones;
