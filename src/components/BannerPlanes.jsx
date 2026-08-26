import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  Heart,
  Zap,
  Target,
  Clock,
  Sparkles,
  MessageSquare
} from 'lucide-react';

const BENEFITS = [
  { title: "Profesionales", icon: Users },
  { title: "Atención 1A1", icon: Heart },
  { title: "Tecnología 3D", icon: Zap },
  { title: "Precisión", icon: Target },
  { title: "Sin Demoras", icon: Clock },
  { title: "Especialistas", icon: Sparkles },
  { title: "Info Chatbot", icon: MessageSquare },
  { title: "Consultas 24/7", icon: Clock },
  { title: "Atención Personalizada", icon: Users },
];

const BannerPlanes = () => {
  return (
    <>
      {/* SECCIÓN HERO PREMIUM */}
      <section className="bg-white pt-40 md:pt-48 pb-32 md:pb-48 px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center relative overflow-hidden">
        {/* Glow Effects - Optimized for light theme */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-orange-100/60 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#FF7800]/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-orange-200/20 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center">
          <div className="flex items-center gap-3 px-5 py-2 rounded-full border border-[#FF7800]/20 bg-[#FF7800]/5 mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#FF7800] animate-pulse shadow-[0_0_8px_#FF7800]"></span>
            <span className="text-[8px] font-black tracking-[0.3em] text-[#FF7800] uppercase">
              Excelencia en Odontología Clínica
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tighter text-[#050505] leading-[0.9] mb-6">
            Cuidamos tu salud <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FF7800] to-orange-600">Con Profesionalismo</span>
          </h1>

          <p className="text-base md:text-xl text-black/60 mb-8 leading-relaxed font-medium max-w-2xl mx-auto">
            Te ofrecemos tratamientos de primer nivel en un ambiente cómodo y relajado. Atendemos cada detalle clínico para que tu experiencia sea única.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center relative z-20">
            <Link to="/turnos" className="group relative inline-flex items-center justify-center gap-3 bg-linear-to-r from-[#FF7800] to-orange-500 text-white font-black px-12 py-5 rounded-full uppercase text-sm tracking-widest shadow-[0_10px_30px_rgba(255,120,0,0.3)] hover:shadow-[0_15px_50px_rgba(255,120,0,0.5)] active:scale-95 transition-all overflow-hidden">
              <span className="relative z-10">Solicitar Consulta</span>
            </Link>
          </div>
        </div>

        {/* Ola SVG (Wave) marrón en la parte inferior de la sección blanca */}
        <div className="absolute left-0 right-0 bottom-0 w-full z-10 pointer-events-none translate-y-[1px]">
          <svg viewBox="0 0 1440 120" className="w-[102%] -ml-[1%] h-[60px] sm:h-[80px] md:h-[100px] lg:h-[120px] block" preserveAspectRatio="none">
            <path fill="#4A3623" d="M0,120 C400,20 1000,100 1440,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* SECCIÓN CARRUSEL (Especialistas Style - Brown) */}
      <section className="bg-primary pt-12 pb-24 md:pt-20 md:pb-32 px-0 overflow-hidden relative">

        {/* Gradiente de transición para ocultar la textura/glows justo en la costura con la ola sólida */}
        <div className="absolute top-0 left-0 w-full h-32 md:h-48 bg-linear-to- from-primary via-primary/90 to-transparent z-10 pointer-events-none"></div>

        {/* Glow Effects - Similares a Especialistas.jsx */}
        <div className="absolute top-[10%] left-[-10%] w-[50%] h-full rounded-full blur-[120px] bg-accent-orange/15 pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[80%] rounded-full blur-[100px] bg-secondary/10 pointer-events-none"></div>

        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05] pointer-events-none mix-blend-overlay"></div>

        <div className="w-full relative z-10">
          <p className="text-center text-[10px] md:text-xs font-black tracking-[0.4em] text-accent-orange uppercase mb-16">
            Nuestros Pilares de Calidad
          </p>

          <div className="flex overflow-hidden group/marquee relative py-10">
            {/* Máscaras laterales */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-primary to-transparent z-20 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-primary to-transparent z-20 pointer-events-none"></div>

            <div
              className="flex gap-8 animate-marquee group-hover/marquee:[animation-play-state:paused]"
              style={{
                width: 'max-content',
                animation: 'marquee 35s linear infinite'
              }}
            >
              {[...BENEFITS, ...BENEFITS, ...BENEFITS, ...BENEFITS, ...BENEFITS].map((item, index) => (
                <div
                  key={index}
                  className="w-52 h-52 md:w-64 md:h-64 flex flex-col items-center justify-center p-8 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[3rem] transition-all duration-700 hover:scale-[1.05] hover:bg-white/15 hover:border-accent-orange/40 group/card relative shadow-2xl"
                >
                  <div className="bg-accent-orange/20 p-6 rounded-3xl text-accent-orange mb-6 group-hover/card:bg-accent-orange group-hover/card:text-white transition-all duration-500 shadow-[0_10px_20px_rgba(255,120,0,0.1)]">
                    <item.icon size={32} strokeWidth={1.5} />
                  </div>

                  <h3 className="text-white text-[11px] md:text-sm font-black uppercase tracking-[0.2em] text-center">
                    {item.title}
                  </h3>

                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-white/20 rounded-full group-hover/card:bg-accent-orange transition-all duration-500 group-hover/card:w-20"></div>
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

        {/* Ola SVG negra en la parte inferior para transición suave al siguiente componente negro */}
        <div className="absolute left-0 right-0 bottom-0 w-full z-20 pointer-events-none">
          <svg viewBox="0 0 1440 120" className="w-[102%] -ml-[1%] h-[40px] sm:h-[70px] md:h-[100px] lg:h-[120px] block rotate-180" preserveAspectRatio="none">
            <path fill="#050505" d="M0,0 C500,180 1100,30 1440,0 L1440,0 L0,0 Z"></path>
          </svg>
        </div>
      </section>
    </>
  );
};

export default BannerPlanes;
