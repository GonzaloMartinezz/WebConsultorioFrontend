import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, 
  Heart, 
  Zap, 
  Target, 
  Clock, 
  Sparkles 
} from 'lucide-react';

const BENEFITS = [
  { title: "Profesionales", icon: Users },
  { title: "Atención", icon: Heart },
  { title: "Tecnología", icon: Zap },
  { title: "Resultados", icon: Target },
  { title: "Sin Esperas", icon: Clock },
  { title: "Especialistas", icon: Sparkles }
];

const BannerPlanes = () => {
  return (
    <>
      {/* SECCIÓN HERO (Restaurada con degradado naranja) */}
      <section className="bg-gradient-to-b from-accent-orange/10 via-background to-background py-16 md:py-24 px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center relative overflow-hidden">
        {/* Decoración difuminada naranja */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-accent-orange/5 via-transparent to-transparent pointer-events-none opacity-60"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <span className="inline-block py-2 px-6 rounded-full bg-accent-orange/10 text-accent-orange font-bold text-[10px] md:text-xs mb-6 tracking-widest uppercase border border-accent-orange/20 shadow-sm">
            Excelencia en Odontología
          </span>

          <h1 className="text-3xl md:text-5xl font-black text-primary leading-tight mb-6 tracking-tight uppercase">
            Cuidamos tu salud <br className="hidden md:block" />
            con <span className="text-accent-orange underline decoration-accent-orange/20 underline-offset-8">profesionalismo</span>
          </h1>

          <p className="text-base md:text-lg text-text-light mb-10 leading-relaxed font-medium max-w-2xl mx-auto opacity-90">
            Te ofrecemos tratamientos de primer nivel en un ambiente cómodo y relajado. Atendemos cada detalle para que tu experiencia sea única.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <Link to="/turnos" className="w-full sm:w-auto text-center px-10 py-3.5 text-white font-bold text-sm rounded-xl bg-accent-orange shadow-lg shadow-accent-orange/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:scale-95 uppercase tracking-widest">
              Solicitar Turno
            </Link>
          </div>
        </div>
      </section>

      {/* LÍNEA NARANJA DIVISORIA */}
      <div className="h-[2px] w-full bg-accent-orange/40 shadow-[0_0_15px_rgba(255,122,0,0.2)]"></div>

      {/* SECCIÓN CARRUSEL (Marrón Oscuro y Ancho Completo) */}
      <section className="bg-[#1A110B] py-16 px-0 overflow-hidden group">
        <div className="w-full">
          <p className="text-center text-[10px] md:text-xs font-black tracking-[0.4em] text-white/30 uppercase mb-16">
            ¿Por qué elegirnos?
          </p>
          
          <div className="flex overflow-hidden group/marquee relative py-4">
            {/* Máscaras laterales para el ancho completo */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#1A110B] to-transparent z-20 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#1A110B] to-transparent z-20 pointer-events-none"></div>

            <div 
              className="flex gap-6 animate-marquee group-hover/marquee:[animation-play-state:paused]"
              style={{ 
                width: 'max-content',
                animation: 'marquee 35s linear infinite'
              }}
            >
              {[...BENEFITS, ...BENEFITS, ...BENEFITS, ...BENEFITS, ...BENEFITS].map((item, index) => (
                <div 
                  key={index}
                  className="w-48 h-48 md:w-56 md:h-56 flex flex-col items-center justify-center p-8 bg-[#2D1F16] border border-white/5 rounded-2xl transition-all duration-500 hover:scale-[1.03] hover:border-accent-orange/30 group/card relative"
                >
                  <div className="bg-accent-orange/10 p-5 rounded-2xl text-accent-orange mb-6 group-hover/card:bg-accent-orange group-hover/card:text-white transition-all duration-500 shadow-inner">
                    <item.icon size={32} strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-white text-xs md:text-sm font-black uppercase tracking-[0.15em] text-center">
                    {item.title}
                  </h3>
                  
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-accent-orange/20 rounded-full group-hover/card:bg-accent-orange transition-all duration-500 group-hover/card:w-16"></div>
                </div>
              ))}
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
              @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-20%); }
              }
            `}} />
          </div>
        </div>
      </section>
    </>
  );
};

export default BannerPlanes;
