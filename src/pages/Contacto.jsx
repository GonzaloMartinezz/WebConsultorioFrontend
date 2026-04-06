import { Link } from "react-router-dom";
import { FaPhoneAlt, FaWhatsapp, FaInstagram } from 'react-icons/fa';

// Dirección real para el mapa
const direccion = "Jose Rondeau 827, San Miguel de Tucumán, Argentina";
// URL de Google Maps corregida
const mapsUrl = `https://maps.google.com/maps?q=${encodeURIComponent(direccion)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

const Contacto = () => {
  return (
    <main className="grow bg-background">

      {/* ======================================================== */}
      {/* SECCIÓN 1: BLOQUE DIVIDIDO (Inspirado en imágenes "RC Gym") */}
      {/* ========================================== */}
      <section className="bg-primary text-background py-20 lg:py-32 px-4 sm:px-6 lg:px-8 border-b-8 border-accent-orange relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none bg-[radial-gradient(circle_at_top_right,white,transparent_50%)]"></div>

        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

            {/* Lado Izquierdo: Título y descripción */}
            <div className="w-full lg:w-5/12 space-y-6">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                Estamos <br />
                <span className="text-accent-orange">Cerca Tuyo</span>
              </h1>
              <p className="text-lg text-secondary/90 font-medium leading-relaxed max-w-md">
                En Carcara • Martínez, tu salud dental es nuestra prioridad. Comunicate con nosotros para resolver dudas, pedir presupuesto o agendar tu próxima visita.
              </p>
              <div className="pt-4">
                <Link
                  to="/turnos"
                  className="inline-block border border-accent-orange text-accent-orange font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-full transition-all duration-300 hover:bg-accent-orange hover:text-white hover:-translate-y-1 hover:shadow-xl active:scale-95"
                >
                  Ir a solicitar turno
                </Link>
              </div>
            </div>

            {/* Separador vertical en PC (Línea sutil) */}
            <div className="hidden lg:block w-px h-64 bg-secondary/20"></div>

            {/* Lado Derecho: Lista de información con íconos */}
            <div className="w-full lg:w-6/12 space-y-10">
              <h3 className="text-2xl font-bold tracking-tight">Vías de comunicación directa</h3>

              <div className="space-y-8">

                {/* Ítem: Dirección */}
                <div className="flex gap-5 items-start">
                  <div className="bg-secondary/10 p-3 rounded-xl text-accent-orange shrink-0">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold uppercase tracking-wide">Dirección</h4>
                    <p className="text-secondary/80 mt-1">Jose Rondeau 827<br />San Miguel de Tucumán, Argentina.</p>
                  </div>
                </div>

                {/* Ítem: Teléfonos */}
                <div className="flex gap-5 items-start">
                  <div className="bg-secondary/10 p-3 rounded-xl text-accent-orange shrink-0">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold uppercase tracking-wide">Teléfonos y WhatsApp</h4>
                    <p className="text-secondary/80 mt-1 whitespace-pre-line">Fijo: +54 381 5840885<br />WhatsApp: +54 9 381 9876-5432</p>
                  </div>
                </div>

                {/* Ítem: Horarios */}
                <div className="flex gap-5 items-start">
                  <div className="bg-secondary/10 p-3 rounded-xl text-accent-orange shrink-0">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold uppercase tracking-wide">Horarios de Atención</h4>
                    <p className="text-secondary/80 mt-1 whitespace-pre-line">Lunes a Viernes: 09:00 a 19:00 hs<br />Sábados: 09:00 a 13:00 hs</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* NUEVA SECCIÓN: DUDAS Y CONSULTAS (Fondo Marrón) */}
      {/* ======================================================== */}
      <section className="bg-primary rounded-[2.5rem] p-8 md:p-16 mx-4 lg:mx-auto lg:max-w-7xl my-10 md:my-20 shadow-2xl border-b-8 border-accent-orange text-center" data-aos="fade-up">
        
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight mb-8 md:mb-12 leading-tight">
          Para poder consultar cualquier duda <br className="hidden md:block"/> 
          o comentarnos tu situación
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          {/* Tarjeta Teléfono */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 flex flex-col items-center hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 cursor-pointer shadow-lg group">
            <div className="p-4 bg-secondary/20 rounded-full mb-5 group-hover:scale-110 transition-transform">
              <FaPhoneAlt className="text-4xl text-accent-orange" />
            </div>
            <h3 className="text-white font-bold text-xl uppercase tracking-wide">Llamada Directa</h3>
            <p className="text-secondary/80 mt-2 font-medium text-lg">+54 381 5840885</p>
          </div>

          {/* Tarjeta WhatsApp */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 flex flex-col items-center hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 cursor-pointer shadow-lg group">
            <div className="p-4 bg-secondary/20 rounded-full mb-5 group-hover:scale-110 transition-transform">
              <FaWhatsapp className="text-4xl text-accent-orange" />
            </div>
            <h3 className="text-white font-bold text-xl uppercase tracking-wide">WhatsApp</h3>
            <p className="text-secondary/80 mt-2 font-medium text-lg">+54 9 381 9876-5432</p>
          </div>

          {/* Tarjeta Instagram */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 flex flex-col items-center hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 cursor-pointer shadow-lg group">
            <div className="p-4 bg-secondary/20 rounded-full mb-5 group-hover:scale-110 transition-transform">
              <FaInstagram className="text-4xl text-accent-orange" />
            </div>
            <h3 className="text-white font-bold text-xl uppercase tracking-wide">Instagram</h3>
            <p className="text-secondary/80 mt-2 font-medium text-lg">@carcaramartinez</p>
          </div>

        </div>
      </section>


      {/* ======================================================== */}
      {/* SECCIÓN 2: MAPA PANORÁMICO */}
      {/* ========================================== */}
      <section className="py-10 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-text uppercase tracking-tight">
              ¿Cómo <span className="text-accent-orange">llegar?</span>
            </h2>
            <p className="text-text-light font-medium mt-3">
              Ubicados en zona céntrica con fácil acceso.
            </p>
          </div>

          <div className="rounded-[2.5rem] bg-white p-4 sm:p-6 shadow-xl border border-secondary/50 overflow-hidden">
            <div className="aspect-21/9 min-h-[400px] w-full overflow-hidden rounded-4xl bg-secondary/20 relative">
              <iframe
                title="Ubicación Carcara Martínez"
                src={mapsUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full grayscale-20 contrast-[1.1]"
              />
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Contacto;