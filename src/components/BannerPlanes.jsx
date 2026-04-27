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
  { title: "Atención 1A1", icon: Heart },
  { title: "Tecnología 3D", icon: Zap },
  { title: "Precisión", icon: Target },
  { title: "Sin Demoras", icon: Clock },
  { title: "Especialistas", icon: Sparkles }
];

const BannerPlanes = () => {
  return (
    <>
      {/* SECCIÓN HERO PREMIUM */}
      <section className="bg-[#050505] py-24 md:py-32 px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#FF7800]/10 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>

        <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center">
          <div className="flex items-center gap-3 px-5 py-2 rounded-full border border-[#FF7800]/30 bg-[#FF7800]/5 mb-10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#FF7800] animate-pulse shadow-[0_0_8px_#FF7800]"></span>
            <span className="text-[10px] font-black tracking-[0.3em] text-[#FF7800] uppercase">
              Excelencia en Odontología Clínica
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-[0.9] mb-8">
            Cuidamos tu salud <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FF7800] to-orange-300">Con Profesionalismo</span>
          </h1>

          <p className="text-base md:text-xl text-white/50 mb-12 leading-relaxed font-light max-w-2xl mx-auto">
            Te ofrecemos tratamientos de primer nivel en un ambiente cómodo y relajado. Atendemos cada detalle clínico para que tu experiencia sea única.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
            <Link to="/turnos" className="group relative inline-flex items-center justify-center gap-3 bg-linear-to-r from-[#FF7800] to-orange-300 text-white font-black px-12 py-5 rounded-full uppercase text-sm tracking-widest shadow-[0_10px_30px_rgba(255,120,0,0.4)] hover:shadow-[0_15px_50px_rgba(255,120,0,0.6)] active:scale-95 transition-all overflow-hidden">
              <span className="relative z-10">Solicitar Consulta</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECCIÓN CARRUSEL (Dark Premium) */}
      <section className="bg-black py-16 px-0 overflow-hidden relative border-t border-white/5">
        <div className="absolute inset-0 bg-linear-to-b from-[#FF7800]/5 to-transparent pointer-events-none"></div>
        
        <div className="w-full relative z-10">
          <p className="text-center text-[10px] md:text-xs font-black tracking-[0.4em] text-[#FF7800] uppercase mb-16">
            Nuestros Pilares de Calidad
          </p>

          <div className="flex overflow-hidden group/marquee relative py-4">
            {/* Máscaras laterales */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-black to-transparent z-20 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-black to-transparent z-20 pointer-events-none"></div>

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
                  className="w-48 h-48 md:w-56 md:h-56 flex flex-col items-center justify-center p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] transition-all duration-500 hover:scale-[1.03] hover:bg-white/10 hover:border-[#FF7800]/30 group/card relative shadow-2xl"
                >
                  <div className="bg-[#FF7800]/10 p-5 rounded-2xl text-[#FF7800] mb-6 group-hover/card:bg-[#FF7800] group-hover/card:text-white transition-all duration-500 shadow-[0_0_20px_rgba(255,120,0,0.1)]">
                    <item.icon size={32} strokeWidth={1.5} />
                  </div>

                  <h3 className="text-white text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-center">
                    {item.title}
                  </h3>

                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-white/10 rounded-full group-hover/card:bg-[#FF7800] transition-all duration-500 group-hover/card:w-16"></div>
                </div>
              ))}
            </div>

            <style dangerouslySetInnerHTML={{
              __html: `
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
