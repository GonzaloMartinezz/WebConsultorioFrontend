import { FaMapMarkerAlt, FaWhatsapp, FaInstagram } from 'react-icons/fa';

const Instalaciones = () => {
  return (
    <section className="py-20 bg-background flex flex-col items-center">

      {/* Parte 1: Galería de Instalaciones (Estilo Imagen 6) */}
      <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 mb-20 text-center">
        <h2 className="text-3xl md:text-5xl font-black text-primary tracking-tighter uppercase mb-4">
          Nuestras <span className="text-accent-orange">Instalaciones</span>
        </h2>
        <p className="text-text-light max-w-2xl mx-auto font-medium mb-12">
          Consultorios amplios, climatizados y equipados con tecnología de vanguardia para que tu experiencia sea lo más cómoda, segura y eficiente posible.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-64 rounded-3xl bg-secondary/20 relative overflow-hidden group">
            <img src="/sala de espera 1.jpeg" alt="Sala de espera" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
              <h3 className="text-white font-bold tracking-widest uppercase text-sm">Ambiente Confortable</h3>
            </div>
          </div>
          <div className="h-64 rounded-3xl bg-secondary/20 relative overflow-hidden group">
            <img src="/consultorio 1.jpeg" alt="Consultorio" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
              <h3 className="text-white font-bold tracking-widest uppercase text-sm">Precisión Digital</h3>
            </div>
          </div>
          <div className="h-64 rounded-3xl bg-secondary/20 relative overflow-hidden group">
            {/* Reemplaza con otra imagen real si tienes */}
            <div className="w-full h-full bg-[#4A3B32] flex items-center justify-center">
              <span className="text-accent-orange text-5xl">🦷</span>
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
              <h3 className="text-white font-bold tracking-widest uppercase text-sm">Tecnología de Punta</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Parte 2: Tarjeta Oscura de Contacto (Estilo Imagen 5) */}
      <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="bg-[#4A3B32] rounded-[3rem] p-10 md:p-16 flex flex-col lg:flex-row items-center gap-12 shadow-2xl relative overflow-hidden">

          <div className="flex-1 space-y-8 relative z-10">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full border border-accent-orange/50 text-accent-orange text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
                Ubicación Estratégica
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-none tracking-tighter uppercase mb-4">
                Accedé a nuestras <br className="hidden lg:block" />
                <span className="text-accent-orange">Instalaciones</span>
              </h2>
              <p className="text-white/70 text-sm font-medium max-w-md leading-relaxed">
                Encontranos en el corazón de San Miguel de Tucumán. Contamos con tecnología de punta y ambientes diseñados para tu confort.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-accent-orange shrink-0">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Dirección</p>
                  <p className="text-white font-bold text-sm">Jose Rondeau 827</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 shrink-0">
                  <FaWhatsapp />
                </div>
                <div>
                  <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Atención Directa</p>
                  <a href="https://wa.me/5493816242482" target="_blank" rel="noreferrer" className="text-white font-bold text-sm hover:text-green-400 transition-colors">+54 9 381 624-2482</a>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
                  <FaInstagram />
                </div>
                <div>
                  <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Comunidad</p>
                  <a href="https://instagram.com/c.o_carcaramartinez" target="_blank" rel="noreferrer" className="text-white font-bold text-sm hover:text-pink-400 transition-colors">@c.o_carcaramartinez</a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl relative group">
            {/* Reemplazar src por tu URL de Google Maps Embed si lo deseas */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.10688656627!2d-65.2104523!3d-26.8365691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c0e12345678%3A0x123456789abcdef!2sJos%C3%A9%20Rondeau%20827%2C%20T4000%20San%20Miguel%20de%20Tucum%C3%A1n!5e0!3m2!1ses-419!2sar!4v1710000000000!5m2!1ses-419!2sar"
              width="100%" height="100%" style={{ border: 0, filter: 'grayscale(100%) contrast(1.2)' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              className="group-hover:filter-none transition-all duration-700"
            ></iframe>
            {/* Botón Flotante sobre el mapa */}
            <div className="absolute top-4 right-4">
              <a href="https://maps.google.com/?q=Jose+Rondeau+827+Tucuman" target="_blank" rel="noreferrer" className="bg-accent-orange text-white font-bold px-6 py-2 rounded-full shadow-lg text-xs uppercase tracking-widest hover:bg-orange-600">
                Ver cómo llegar &rarr;
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Instalaciones;
