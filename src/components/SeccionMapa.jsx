import { Link } from 'react-router-dom';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';

const SeccionMapa = () => {
  return (
    <section className="bg-primary text-white border-y-8 border-accent-orange relative overflow-hidden py-24 md:py-32 px-4 sm:px-6 lg:px-8 w-full">
      {/* Fondo decorativo radial oscuro */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_bottom_left,white,transparent_50%)]"></div>

      <div className="mx-auto max-w-7xl relative z-10" data-aos="fade-up">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-5/12 space-y-8 text-center lg:text-left">
            <span className="inline-block px-6 py-2.5 rounded-full border border-accent-orange text-accent-orange font-black text-xs uppercase tracking-[0.2em]">
              Ubicación Estratégica
            </span>
            <h2 className="text-4xl md:text-6xl font-black leading-tight uppercase tracking-tighter">
              Accedé a nuestras <br />
              <span className="text-accent-orange">instalaciones</span>
            </h2>
            <p className="text-secondary/80 font-medium text-lg md:text-xl leading-relaxed">
              Encontranos en el corazón de San Miguel de Tucumán. Contamos con tecnología de punta y ambientes diseñados para tu confort.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link to="/contacto" className="w-full sm:w-auto bg-accent-orange text-white font-black px-12 py-5 rounded-xl transition-all duration-300 hover:brightness-110 hover:-translate-y-1 hover:shadow-2xl active:scale-95 uppercase tracking-widest text-center shadow-lg shadow-accent-orange/20">
                Ver cómo llegar &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
              <div className="border border-white/10 rounded-2xl p-5 flex items-center gap-4 bg-white/5 backdrop-blur-md shadow-sm">
                <div className="bg-secondary/20 text-white p-3 rounded-full shadow-inner"><svg className="w-6 h-6 text-accent-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg></div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Dirección</p>
                  <p className="font-black text-sm uppercase tracking-tight">Jose Rondeau 827</p>
                </div>
              </div>
              <div className="border border-white/10 rounded-2xl p-5 flex items-center gap-4 bg-white/5 backdrop-blur-md shadow-sm">
                <div className="bg-secondary/20 text-white p-3 rounded-full shadow-inner"><svg className="w-6 h-6 text-accent-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Horarios</p>
                  <p className="font-black text-sm uppercase tracking-tight">Lun a Vie 9-20hs</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-4">
              <a href="https://wa.me/5493816242482" target="_blank" rel="noreferrer" className="flex items-center gap-5 p-5 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all group">
                <div className="w-12 h-12 bg-green-500 text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <FaWhatsapp className="text-2xl" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Atención Directa</p>
                  <p className="font-black text-sm uppercase tracking-tight">+54 381 624-2482</p>
                </div>
              </a>
              <a href="https://www.instagram.com/c.o_carcaramartinez/" target="_blank" rel="noreferrer" className="flex items-center gap-5 p-5 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all group">
                <div className="w-12 h-12 bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <FaInstagram className="text-2xl" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Comunidad</p>
                  <p className="font-black text-sm uppercase tracking-tight">@c.o_carcaramartinez</p>
                </div>
              </a>
            </div>
          </div>

          <div className="w-full lg:w-7/12 relative h-[400px] md:h-[600px] bg-[radial-gradient(rgba(249,115,22,0.15)_2px,transparent_4px)] bg-size-[24px_24px] rounded-[3rem] flex items-center justify-center shadow-inner mt-12 lg:mt-0">
            {/* Datos flotantes dinámicos */}
            <div className="absolute top-10 left-10 bg-white p-6 rounded-4xl shadow-2xl flex items-center gap-5 text-primary animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center font-black text-xl">+15</div>
              <div>
                <p className="font-black text-xs uppercase tracking-tight">Años de</p>
                <p className="font-black text-xs uppercase tracking-tight text-accent-orange">Experiencia</p>
              </div>
            </div>
            <div className="absolute bottom-20 right-10 bg-white p-6 rounded-4xl shadow-2xl flex items-center gap-5 text-primary animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="w-12 h-12 bg-accent-orange/10 rounded-2xl flex items-center justify-center font-black text-xl">+5k</div>
              <div>
                <p className="font-black text-xs uppercase tracking-tight">Sonrisas</p>
                <p className="font-black text-xs uppercase tracking-tight text-accent-orange">Cuidadas</p>
              </div>
            </div>

            <div className="p-10 bg-white/5 backdrop-blur-md rounded-[4rem] border border-white/10 text-center scale-110 shadow-2xl">
              <div className="w-24 h-24 bg-accent-orange rounded-4xl mx-auto flex items-center justify-center mb-6 shadow-xl shadow-accent-orange/30">
                <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tighter">Centro <br /> Especializado</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeccionMapa;
