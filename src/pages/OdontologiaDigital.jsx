import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import odontogramaMock from '../assets/odontograma-mock.png';
import { motion } from 'framer-motion';
import {
  ArrowRight, Microscope, Stethoscope, BrainCircuit, CalendarDays,
  CheckCircle2, RefreshCw, Braces, ShieldCheck, Radar, Database,
  History, Focus, Bell, Activity, LogIn
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   Datos para las 4 tarjetas de tecnología (fila del hero)
   ───────────────────────────────────────────────────────────── */
const techCards = [
  {
    img: '/nosotros-ortopanto.png',
    icon: '🖨️',
    title: 'Diagnóstico Digital',
  },
  {
    img: '/que-es-y-para-que-se-usa-el-sistema-cerec.jpg',
    icon: '⚙️',
    title: 'Sistema CADCAM de ultima generacion',
  },
  {
    img: '/orthodontics.jpg.webp',
    icon: '🧬',
    title: 'Fabricacion aditiva 3D ',
  },
  {
    img: '/nosotros-scanner.png',
    icon: '📐',
    title: 'Scanner IntraOral ',
  },
];

/* ─────────────────────────────────────────────────────────────
   Check-list del bloque "Infraestructura Tecnológica Core"
   ───────────────────────────────────────────────────────────── */
const coreFeatures = [
  {
    title: 'Automatización de Lab',
    desc: 'Impresoras 3D - Fresadoras CADCAM',
  },
  {
    title: 'Software especializado',
    desc: 'Programas de planificacion prequirúrgica y protésica',
  },
];

/* ─────────────────────────────────────────────────────────────
   Animated counter hook
   ───────────────────────────────────────────────────────────── */
function useCounter(end, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return { count, ref };
}

const OdontologiaDigital = () => {
  const counter1 = useCounter(25);
  const counter2 = useCounter(40000);
  const counter3 = useCounter(100);

  return (
    <div className="bg-[#050505] text-[#e5e2e1] min-h-screen font-sans selection:bg-[#ff7a00] selection:text-white flex flex-col overflow-hidden">
      <Navbar />
      <main className="grow flex flex-col w-full">

        {/* ══════════════════════════════════════════════════════════
          HERO PREMIUM — ODONTOLOGÍA DIGITAL
          ══════════════════════════════════════════════════════════ */}
        <section className="relative bg-[#050505] text-white overflow-hidden min-h-screen flex flex-col justify-center">
          {/* Luces y Glows Elegantes (Fondo Premium) */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FF7800]/10 rounded-full blur-[180px] pointer-events-none mix-blend-screen animate-pulse duration-[10s]"></div>
          <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-15 pointer-events-none"></div>

          {/* Contenedor principal */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 lg:pt-40 pb-16 relative z-10">

            {/* Status badge premium */}
            <div className="flex items-center gap-4 mb-12" data-aos="fade-down">
              <div className="h-px w-12 bg-linear-to-r from-transparent to-[#FF7800]"></div>
              <div className="flex items-center gap-3 px-5 py-2 rounded-full border border-[#FF7800]/30 bg-black/40 backdrop-blur-xl group">
                <span className="w-2 h-2 rounded-full bg-[#FF7800] animate-pulse shadow-[0_0_8px_#FF7800]"></span>
                <span className="text-[10px] font-black tracking-[0.2em] text-[#FF7800] uppercase">
                  Centro de Alta Tecnología Odontológica
                </span>
              </div>
            </div>

            {/* Grid: Título + Monitor */}
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

              {/* Izquierda: Texto Deslumbrante */}
              <div className="w-full lg:w-5/12 space-y-8" data-aos="fade-right">
                <h1 className="text-4xl sm:text-5xl lg:text-[4.5rem] font-black uppercase tracking-tighter leading-[0.9] text-white">
                  Máxima <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FF7800] to-orange-300">Precisión Dental</span>
                </h1>
                <p className="text-base md:text-lg text-white/70 font-light leading-relaxed max-w-xl">
                  Disponemos de scanner intraoral para el estudio y planificacion prequirúrgica y protésica de tus rehabilitaciones orales. Contamos con impresoras 3D y frezadoras CADCAM, para la confeccion de guia quirurjicas y coronas. Ademas disponemos de radiografias digital.
                </p>

                {/* Botones CTA Premium */}
                <div className="flex flex-wrap gap-6 pt-4">
                  <Link
                    to="/turnos"
                    className="group relative inline-flex items-center justify-center gap-3 bg-linear-to-r from-[#FF7800] to-[#E66A00] text-white font-black px-10 py-5 rounded-full uppercase text-sm tracking-widest shadow-[0_10px_30px_rgba(255,120,0,0.4)] hover:shadow-[0_15px_50px_rgba(255,120,0,0.6)] active:scale-95 transition-all overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Comenzar Ahora
                      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                  <Link
                    to="/nosotros"
                    className="inline-flex items-center justify-center gap-2 bg-white/5 backdrop-blur-md border border-white/20 text-white font-bold px-10 py-5 rounded-full uppercase text-sm tracking-widest hover:bg-white/10 active:scale-95 transition-all shadow-xl"
                  >
                    Nuestras Instalaciones Digitales
                  </Link>
                </div>
              </div>

              {/* Derecha: MONITOR (Agrandado como pidió el usuario) */}
              <div className="w-full lg:w-7/12" data-aos="fade-left" data-aos-delay="200">
                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)] bg-black group">
                  {/* Barra de ventana Premium */}
                  <div className="flex items-center justify-between px-6 py-4 bg-[#111] border-b border-white/10">
                    <div className="flex gap-2.5">
                      <div className="w-3.5 h-3.5 rounded-full bg-red-500/40 hover:bg-red-500 transition-colors" />
                      <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/40 hover:bg-yellow-500 transition-colors" />
                      <div className="w-3.5 h-3.5 rounded-full bg-green-500/40 hover:bg-green-500 transition-colors" />
                    </div>
                    <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">Frezadora & Scanner</div>
                  </div>

                  {/* Imagen del Monitor */}
                  <div className="relative overflow-hidden">
                    <img
                      src="/maquinascompletas.webp"
                      alt="Planificación de implantes 3D — ODONTO_CORE"
                      className="w-full h-auto object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000"
                      style={{ maxHeight: 520 }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent pointer-events-none"></div>
                  </div>

                  {/* Badge de "Latencia" / Datos (Mantenido y Premiumizado) */}
                  <div className="absolute bottom-6 right-6 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 text-right shadow-2xl">
                    <span className="block text-[10px] font-mono text-[#FF7800] uppercase tracking-[0.2em] mb-1">Tecnologia 3D</span>
                    <div className="mt-3 flex items-center justify-end gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      <span className="text-[9px] text-white/40 font-bold uppercase tracking-widest">Trabajo Preciso y Profesional</span>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 border-2 border-[#FF7800]/0 group-hover:border-[#FF7800]/20 transition-all duration-700 pointer-events-none rounded-2xl"></div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Fila de 4 tarjetas de tecnología (Glassmorphism Premium) ─────────── */}
          <div className="mx-auto max-w-full px-4 sm:px-10 pb-32 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {techCards.map((card, i) => (
                <div
                  key={card.title}
                  className="group bg-white/3 backdrop-blur-2xl border border-white/10 rounded-4xl overflow-hidden hover:bg-white/[0.07] hover:border-[#FF7800]/30 hover:-translate-y-3 transition-all duration-500 shadow-2xl"
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                >
                  <div className="h-72 overflow-hidden relative flex items-center justify-center bg-black">
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent z-10"></div>
                    <img
                      src={card.img}
                      alt={card.title}
                      className="w-full h-full object-cover object-center transition-all duration-1000 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute bottom-6 left-6 z-20 text-3xl transform group-hover:scale-110 transition-all duration-500">
                      <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10">
                        {card.icon}
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-2 text-center">
                    <h3 className="text-white font-black text-[10px] sm:text-xs tracking-[0.3em] uppercase opacity-60 group-hover:opacity-100 group-hover:text-[#FF7800] transition-all">{card.title}</h3>
                    <div className="w-8 h-px bg-white/10 mx-auto group-hover:w-16 group-hover:bg-[#FF7800]/50 transition-all duration-500"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Infraestructura Tecnológica Premium ─────────── */}
        <section className="relative bg-[#050505] py-32 border-t border-white/5 overflow-hidden">
          <div className="mx-auto max-w-8xl px-5 sm:px-6 lg:px-8 relative z-10">
            {/* Cabecera de la sección */}
            <div className="mb-16 md:mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-12">
              <div className="w-full lg:w-5/12" data-aos="fade-right">
                <span className="text-[10px] font-black tracking-[0.3em] text-[#FF7800] uppercase mb-4 block border-l-2 border-[#FF7800] pl-4">Instalaciones de Primer Nivel</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-[0.95] text-white">
                  Infraestructura <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FF7800] to-orange-300">Tecnológica</span>
                </h2>
              </div>
              <div className="w-full lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-8" data-aos="fade-left">
                {coreFeatures.map((f) => (
                  <div key={f.title} className="flex flex-col gap-4 group">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#FF7800]/10 group-hover:border-[#FF7800]/40 transition-all duration-500 shadow-xl">
                      <CheckCircle2 className="text-[#FF7800]" size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-1 uppercase tracking-tight">{f.title}</h4>
                      <p className="text-white/40 text-sm leading-relaxed font-light">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Imagen Panorámica A Lo Largo */}
            <div className="w-full" data-aos="fade-up">
              <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] group">
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/10 to-transparent z-10 opacity-80 pointer-events-none"></div>
                <img
                  src="/maquinas adolfo 2.jpg"
                  alt="Infraestructura Tecnológica Core"
                  className="w-full h-[400px] md:h-[600px] lg:h-[700px] object-cover object-center transition-transform duration-[3s] group-hover:scale-105"
                />

                {/* Badge Flotante Boutique */}
                <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-20 flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-black/60 backdrop-blur-3xl border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl">
                  <div className="w-14 h-14 rounded-full bg-[#FF7800]/10 flex items-center justify-center border border-[#FF7800]/30 shadow-[0_0_30px_rgba(255,120,0,0.3)]">
                    <Activity className="text-[#FF7800] animate-pulse" size={28} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[10px] text-[#FF7800] uppercase tracking-[0.3em] mb-1">Certificación Internacional</span>
                    <span className="font-black text-xl sm:text-2xl text-white uppercase tracking-tighter">Laboratorio Odontológico 3D</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Estadísticas Majestuosas (Full Width & Especialistas Typography) ────────────────────────────── */}
        <section className="w-full px-4 sm:px-10 mb-32">
          <div className="bg-white/2 backdrop-blur-3xl rounded-[4rem] border border-white/10 p-10 lg:py-16 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,120,0,0.03),transparent_70%)]"></div>

            <div className="flex flex-col sm:flex-row justify-around items-center gap-12 lg:gap-24 text-center relative z-10">
              <div ref={counter1.ref} data-aos="fade-up" className="flex-1 space-y-2">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-white flex items-center justify-center">
                  <span className="text-[#FF7800] mr-1">+</span>{counter1.count}
                </div>
                <div className="text-[10px] font-bold text-white/50 uppercase tracking-[0.4em] leading-tight">
                  Años de <br />Excelencia
                </div>
              </div>

              <div ref={counter2.ref} data-aos="fade-up" data-aos-delay="100" className="flex-1 space-y-2">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-white flex items-center justify-center">
                  <span className="text-[#FF7800] mr-1">+</span>{counter2.count.toLocaleString('es-AR')}
                </div>
                <div className="text-[10px] font-bold text-white/50 uppercase tracking-[0.4em] leading-tight">
                  Vidas <br />Transformadas
                </div>
              </div>

              <div ref={counter3.ref} data-aos="fade-up" data-aos-delay="200" className="flex-1 space-y-2">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-white flex items-center justify-center">
                  {counter3.count}<span className="text-[#FF7800] ml-1">%</span>
                </div>
                <div className="text-[10px] font-bold text-white/50 uppercase tracking-[0.4em] leading-tight">
                  Tencnologia <br />Digital
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Final CTA (Majestuoso) ───────────────────────────────────────────── */}
        <section className="text-center py-32 border-t border-white/5 relative overflow-hidden bg-black">
          <div className="absolute inset-0 bg-linear-to-t from-[#FF7800]/5 to-transparent pointer-events-none"></div>
          <div className="relative z-10 px-6">
            <span className="text-[#FF7800] font-black tracking-[0.5em] uppercase text-[10px] block mb-6">El Estándar del Futuro</span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-10 leading-[0.9] max-w-4xl mx-auto text-white">
              ¡Viví la experiencia de la Odontología Digital!
            </h2>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <Link to="/turnos" className="group relative bg-linear-to-r from-[#FF7800] to-orange-300 text-white font-black uppercase text-sm tracking-widest px-12 py-6 rounded-full shadow-[0_20px_40px_-10px_rgba(255,120,0,0.5)] hover:shadow-[0_25px_60px_-10px_rgba(255,120,0,0.7)] active:scale-95 transition-all overflow-hidden">
                Agenda Tu Turno!
              </Link>
            </div>
          </div>
        </section>

      </main>
      <div className="bg-background">
        <Footer />
      </div>
    </div>
  );
};

export default OdontologiaDigital;
