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
    icon: '🖨 ️',
    title: 'Diagnóstico Digital',
    desc: 'Visualización de ortopantomografías en alta resolución mediante el sistema CEREC integrado.',
  },
  {
    img: '/que-es-y-para-que-se-usa-el-sistema-cerec.jpg',
    icon: '⚙️',
    title: 'Escaneo Óptico',
    desc: 'Integración directa con escáneres intraorales nativos sin latencia para modelos de altísima precisión.',
  },
  {
    img: '/orthodontics.jpg.webp',
    icon: '🧬',
    title: 'Fabricación Aditiva 3D',
    desc: 'Flujo de trabajo on-site con granja de impresoras de resina para biomodelos y alineadores.',
  },
  {
    img: '/nosotros-scanner.png',
    icon: '📐',
    title: 'Laboratorio de Alta Precisión',
    desc: 'Simulación de implantes y confección automatizada de guías quirúrgicas milimétricas.',
  },
];

/* ─────────────────────────────────────────────────────────────
   Check-list del bloque "Infraestructura Tecnológica Core"
   ───────────────────────────────────────────────────────────── */
const coreFeatures = [
  {
    title: 'Automatización de Lab',
    desc: 'Control centralizado de dispositivos de fabricación aditiva.',
  },
  {
    title: 'Encriptación de Extremo a Extremo',
    desc: 'Cumplimiento total con estándares de seguridad HIPAA/GDPR para datos médicos.',
  },
  {
    title: 'Imaging Stack Integrado',
    desc: 'Visualizador DICOM nativo para estudios de tomografía (CBCT).',
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
  const counter1 = useCounter(15);
  const counter2 = useCounter(5000);
  const counter3 = useCounter(98);

  return (
    <div className="bg-[#131313] text-[#e5e2e1] min-h-screen font-sans selection:bg-[#ff7a00] selection:text-[#5c2800] flex flex-col">
      <Navbar />
      <main className="grow flex flex-col w-full">

        {/* ══════════════════════════════════════════════════════════
          HERO OSCURO — "ODONTO_CORE"
          ══════════════════════════════════════════════════════════ */}
        <section className="relative bg-[#0D0D0D] text-white overflow-hidden">
          {/* Scan-line overlay decorativo */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,.07) 2px, rgba(255,255,255,.07) 4px)' }}
          />

          {/* Contenedor principal */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-44 lg:pt-56 pb-10 lg:pb-16 relative z-10">
            {/* Status badge */}
            <div className="flex items-center gap-2 mb-8" data-aos="fade-down">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="font-mono text-xs tracking-[0.2em] text-white/60 uppercase">
                system_status: operational
              </span>
            </div>

            {/* Grid: Título + Imagen del monitor */}
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

              {/* Izquierda: texto */}
              <div className="w-full lg:w-1/2 space-y-6" data-aos="fade-right">
                <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-black uppercase tracking-tighter leading-[0.95]">
                  Máxima{' '}
                  <span className="text-[#FF7800]">Precisión</span>
                  <br />
                  Dental_OS
                </h1>
                <p className="text-white/70 text-base md:text-lg max-w-lg leading-relaxed font-medium">
                  Accedé al ecosistema centralizado de ODONTO_CORE. Ingeniería
                  clínica de alto rendimiento diseñada para la excelencia diagnóstica
                  y la planificación quirúrgica avanzada.
                </p>

                {/* Botones CTA */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    to="/turnos"
                    className="group inline-flex items-center gap-2 bg-[#FF7800] text-black font-bold px-7 py-3.5 uppercase text-sm tracking-wider hover:brightness-110 active:scale-95 transition-all rounded-md"
                  >
                    Comenzar Ahora
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </Link>
                  <Link
                    to="/odontologia-digital"
                    className="inline-flex items-center gap-2 border border-white/20 text-white/80 font-bold px-7 py-3.5 uppercase text-sm tracking-wider hover:bg-white/5 transition-all rounded-md"
                  >
                    Documentación
                  </Link>
                </div>
              </div>

              {/* Derecha: "Monitor" con imagen de planificación */}
              <div className="w-full lg:w-1/2" data-aos="fade-left" data-aos-delay="200">
                <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-orange-900/20">
                  {/* Barra de ventana */}
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-text border-b border-white/10">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <img
                    src="/maquinascompletas.webp"
                    alt="Planificación de implantes 3D — ODONTO_CORE"
                    className="w-full h-auto object-cover"
                    style={{ maxHeight: 380 }}
                  />
                  {/* Badge de latencia */}
                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md border border-white/10 rounded-lg px-3 py-1.5 text-right">
                    <span className="block text-[10px] font-mono text-[#FF7800] uppercase tracking-widest">Render_Latency</span>
                    <span className="block text-white font-bold text-lg font-mono leading-tight">14ms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Fila de 4 tarjetas de tecnología ─────────────────── */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 lg:pb-28 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {techCards.map((card, i) => (
                <div
                  key={card.title}
                  className="group bg-[#141414] border border-white/6 rounded-xl overflow-hidden hover:border-[#FF7800]/30 transition-all duration-300"
                  data-aos="fade-up"
                  data-aos-delay={i * 80}
                >
                  {/* Imagen */}
                  <div className="h-40 overflow-hidden">
                    <img
                      src={card.img}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
                    />
                  </div>
                  {/* Contenido */}
                  <div className="p-5 space-y-2">
                    <span className="text-2xl block">{card.icon}</span>
                    <h3 className="text-white font-bold text-base tracking-tight">{card.title}</h3>
                    <p className="text-white/50 text-xs leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Infraestructura Tecnológica Core (split) ─────────── */}
          <div className="bg-[#111111] border-t border-white/6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
              <div className="flex flex-col lg:flex-row gap-14 lg:gap-20 items-center">

                {/* Izquierda: texto + checklist */}
                <div className="w-full lg:w-5/12 space-y-8" data-aos="fade-right">
                  <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-black uppercase tracking-tighter leading-[1.05]">
                    Infraestructura<br />
                    Tecnológica{' '}
                    <span className="text-[#FF7800]">Core</span>
                  </h2>

                  <div className="space-y-6">
                    {coreFeatures.map((f) => (
                      <div key={f.title} className="flex items-start gap-3">
                        {/* Check icon */}
                        <span className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-[#FF7800]/15 flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-[#FF7800]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        </span>
                        <div>
                          <h4 className="text-white font-bold text-sm">{f.title}</h4>
                          <p className="text-white/50 text-xs leading-relaxed mt-0.5">{f.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Terminal snippet */}
                  <div className="mt-4 inline-flex items-center gap-3 bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2.5 font-mono text-xs">
                    <span className="text-white/50">admin@odonto-core:~$</span>
                    <span className="text-green-400">init --diagnostic-module</span>
                  </div>
                </div>

                {/* Derecha: imagen grande de la impresora 3D */}
                <div className="w-full lg:w-7/12" data-aos="fade-left" data-aos-delay="150">
                  <div className="relative rounded-xl overflow-hidden border border-white/6 shadow-2xl shadow-orange-900/10">
                    <img
                      src="/nosotros-impresora3d.png"
                      alt="Impresora 3D dental — Fabricación aditiva de prótesis"
                      className="w-full h-auto object-cover"
                      style={{ maxHeight: 520 }}
                    />
                    {/* Status bar inferior */}
                    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-2 bg-black/70 backdrop-blur-md border-t border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="font-mono text-[10px] text-green-400 uppercase tracking-widest">Manufacturing Status: Active</span>
                      </div>
                      <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Job_ID: #4402-A</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Estadísticas animadas ────────────────────────────── */}
          <div className="border-t border-white/6 bg-[#0D0D0D]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                <div ref={counter1.ref} data-aos="fade-up">
                  <span className="block text-4xl lg:text-5xl font-black text-[#FF7800] font-mono">+{counter1.count}</span>
                  <span className="block text-white/50 text-xs uppercase tracking-widest mt-2">Años de experiencia</span>
                </div>
                <div ref={counter2.ref} data-aos="fade-up" data-aos-delay="100">
                  <span className="block text-4xl lg:text-5xl font-black text-[#FF7800] font-mono">+{counter2.count.toLocaleString()}</span>
                  <span className="block text-white/50 text-xs uppercase tracking-widest mt-2">Pacientes atendidos</span>
                </div>
                <div ref={counter3.ref} data-aos="fade-up" data-aos-delay="200">
                  <span className="block text-4xl lg:text-5xl font-black text-[#FF7800] font-mono">{counter3.count}%</span>
                  <span className="block text-white/50 text-xs uppercase tracking-widest mt-2">Satisfacción registrada</span>
                </div>
              </div>
            </div>
          </div>
        </section>


        <div className="max-w-7xl mx-auto px-6 w-full pt-16">
          {/* --- NUEVO COMPONENTE: CLINICAL PRECISION (SaaS Tech) --- */}
          <section className="mb-24 relative bg-[#0a0a0a] rounded-3xl border border-[#584235]/30 p-8 md:p-16 overflow-hidden shadow-2xl">
            {/* Fondo técnico SaaS */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-[#1c1b1b] via-[#0a0a0a] to-[#0a0a0a] opacity-80 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-full h-px bg-linear-to-r from-transparent via-[#ff7a00]/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-px-gradient-to-r from-transparent via-[#ff7a00]/20 to-transparent"></div>

            {/* Grid visual del fondo */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(88,66,53,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(88,66,53,0.05)_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* Columna de Texto Tech */}
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[#ff7a00]/30 bg-[#ff7a00]/5 mb-6">
                  <Radar className="text-[#ff7a00]" size={14} />
                  <span className="text-[10px] font-mono tracking-widest text-[#ffb68b] uppercase">DIAGNÓSTICO AVANZADO</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 leading-none">
                  CLINICAL <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-[#e5e2e1] to-[#795b42]">PRECISION</span>
                </h2>
                <p className="text-[#e0c0af] text-lg mb-8 leading-relaxed font-light">
                  Nuestro odontograma digital SaaS de próxima generación utiliza mapeo topográfico y análisis de datos en tiempo real para visualizar el estado dental exacto con un margen de error menor al 0.01%.
                </p>

                <ul className="space-y-5 mb-8">
                  <li className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-lg bg-[#1c1b1b] border border-[#584235]/50 flex items-center justify-center group-hover:border-[#ff7a00]/50 transition-colors">
                      <Database className="text-[#ff7a00]" size={18} />
                    </div>
                    <div>
                      <span className="text-[#e5e2e1] text-sm font-bold block mb-0.5">Mapeo Interproximal</span>
                      <span className="text-[#e0c0af] text-xs">Registro milimétrico de cada pieza.</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-lg bg-[#1c1b1b] border border-[#584235]/50 flex items-center justify-center group-hover:border-[#ff7a00]/50 transition-colors">
                      <History className="text-[#ff7a00]" size={18} />
                    </div>
                    <div>
                      <span className="text-[#e5e2e1] text-sm font-bold block mb-0.5">Historial Inmutable</span>
                      <span className="text-[#e0c0af] text-xs">Evolución guardada de forma segura.</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Interfaz Gráfica (Imagen/Odontograma interactivo) */}
              <div className="lg:col-span-7 order-1 lg:order-2">
                <div className="bg-[#131313] rounded-2xl border border-[#584235]/40 shadow-[0_20px_60px_-15px_rgba(255,122,0,0.15)] p-2 relative group hover:-translate-y-1 transition-transform duration-500">

                  {/* Simulated SaaS App Window Frame */}
                  <div className="flex items-center justify-between px-4 py-3 bg-[#1c1b1b] rounded-t-[14px] border-b border-[#584235]/30 mb-2">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#584235]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#584235]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#ff7a00] animate-pulse"></div>
                    </div>
                    <div className="text-[10px] font-mono text-[#795b42] tracking-wider">ODONTOGRAMA_VIEWER_v2.1</div>
                  </div>

                  {/* Contenedor del Odontograma */}
                  <div className="relative rounded-b-xl overflow-hidden bg-[#0e0e0e] aspect-4/3 sm:aspect-video flex items-center justify-center">

                    <img src={odontogramaMock} alt="Odontograma SaaS Interface" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute inset-0 bg-[#ff7a00]/5 mix-blend-overlay"></div>

                    {/* Elementos HUD Tecnológicos sobre la imagen */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                      <div className="w-48 h-48 sm:w-64 sm:h-64 border border-[#ff7a00]/20 rounded-full animate-[spin_12s_linear_infinite] absolute"></div>
                      <div className="w-32 h-32 sm:w-40 sm:h-40 border border-dashed border-[#ffb68b]/30 rounded-full animate-[spin_18s_linear_infinite_reverse] absolute"></div>
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#ff7a00]/10 rounded-full flex items-center justify-center backdrop-blur-md border border-[#ff7a00]/40 absolute shadow-[0_0_20px_#ff7a00]">
                        <Focus className="text-[#ffb68b]" size={36} />
                      </div>
                    </div>

                    {/* Tarjeta flotante con datos de la pieza */}
                    <div className="absolute top-6 right-6 bg-[#131313]/80 backdrop-blur-md border border-[#ff7a00]/40 rounded-xl p-4 shadow-2xl hidden sm:block">
                      <div className="text-[10px] text-[#ff7a00] font-mono tracking-widest mb-1">PIEZA SELECCIONADA: 24</div>
                      <div className="text-base font-bold text-[#e5e2e1] mb-2">Caries Oclusal</div>
                      <div className="w-full bg-[#1c1b1b] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#ffb68b] w-3/4 h-full"></div>
                      </div>
                      <div className="text-[10px] text-[#e0c0af] text-right mt-1 font-mono">SEVERIDAD 75%</div>
                    </div>

                    {/* Status Indicator */}
                    <div className="absolute bottom-6 left-6 bg-[#131313]/80 backdrop-blur-md border border-[#584235]/60 rounded-xl p-3 px-4 shadow-xl flex items-center gap-3">
                      <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff7a00] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff7a00]"></span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] text-[#e0c0af] font-mono tracking-widest">SISTEMA CORE</span>
                        <span className="text-sm font-bold text-[#e5e2e1]">SINC. ACTIVA</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* ── 1. INTERACTIVE ODONTOGRAM ──────────────────────────── */}
          <section className="mb-8 mt-16">
            <div className="bg-[#141414] rounded-xl border border-white/10 p-6 md:p-10 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-6">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-mono tracking-widest text-[#FF7800] bg-[#FF7800]/10 px-3 py-1 rounded border border-[#FF7800]/20">PREVIEW_MODE</span>
                  <h3 className="text-white font-bold tracking-widest uppercase text-sm">INTERACTIVE ODONTOGRAM</h3>
                </div>
                <div className="flex gap-1.5 opacity-40">
                  <div className="w-1.5 h-1.5 rounded-full border border-white"></div>
                  <div className="w-1.5 h-1.5 rounded-full border border-white"></div>
                  <div className="w-1.5 h-1.5 rounded-full border border-white"></div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
                {/* Left: Teeth Grid */}
                <div className="w-full lg:w-3/5 space-y-6">
                  <div className="flex flex-wrap justify-between gap-1.5">
                    {[18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28].map(t => (
                      <div key={t} className={`w-8 h-8 flex items-center justify-center text-[10px] font-mono rounded-sm ${t === 16 ? 'bg-[#FF7800] text-black font-bold' : 'bg-[#1C1B1B] text-white/50 border border-white/5'}`}>
                        {t}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap justify-between gap-1.5">
                    {[48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38].map(t => (
                      <div key={t} className="w-8 h-8 flex items-center justify-center text-[10px] font-mono rounded-sm bg-[#1C1B1B] text-white/50 border border-white/5">
                        {t}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Diagnostic Card */}
                <div className="w-full lg:w-2/5 bg-[#0D0D0D] border border-white/5 rounded-lg p-6 relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-red-500/50 to-transparent"></div>
                  <h4 className="text-white font-bold tracking-widest uppercase text-xs mb-6">DIAGNÓSTICO: PIEZA_16</h4>

                  <div className="space-y-3 mb-6 font-mono text-[11px]">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-white/40">Patología</span>
                      <span className="text-red-400">Caries Profunda</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-white/40">Estado</span>
                      <span className="text-white">Tratamiento Urgente</span>
                    </div>
                  </div>

                  <p className="text-white/40 text-[10px] italic leading-relaxed mb-6 font-mono">
                    El análisis biométrico indica deterioro distal/oclusal acercándose a la cámara pulpar. Se requiere evaluación endodóntica de precisión.
                  </p>

                  <button className="w-full bg-[#321F11] hover:bg-[#FF7800] text-[#FF7800] hover:text-black transition-colors font-bold uppercase tracking-widest text-[10px] py-3 rounded-md border border-[#FF7800]/20">
                    PROGRAMAR ENDODONCIA
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ── 2. TWO COLS: PRECISION & WORKFLOWS ────────────────────── */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Card Left */}
            <div className="bg-[#141414] rounded-xl border border-white/10 p-8 lg:p-10 flex flex-col justify-between group hover:border-[#FF7800]/30 transition-colors">
              <div>
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#FF7800] uppercase mb-4 block">PRECISIÓN CLÍNICA</span>
                <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight mb-4">
                  Exactitud Submilimétrica<br />en Cada Registro.
                </h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-md mb-10">
                  Nuestro motor biométrico propietario procesa escaneos intraorales y archivos DICOM con latencia cero. Mapeamos cada restauración, cavidad y rasgo anatómico en un lienzo dinámico de alta fidelidad.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="flex-1 bg-[#1C1B1B] p-4 rounded-lg border border-white/5 text-center">
                  <span className="block text-[#FF7800] font-black text-xl font-mono">0.02mm</span>
                  <span className="block text-white/30 text-[9px] uppercase tracking-widest mt-1">RESOLUCIÓN DE PROF.</span>
                </div>
                <div className="flex-1 bg-[#1C1B1B] p-4 rounded-lg border border-white/5 text-center">
                  <span className="block text-[#FF7800] font-black text-xl font-mono">TIEMPO REAL</span>
                  <span className="block text-white/30 text-[9px] uppercase tracking-widest mt-1">RENDERIZADO 3D DUAL</span>
                </div>
              </div>
            </div>

            {/* Card Right */}
            <div className="bg-[#141414] rounded-xl border border-white/10 p-8 lg:p-10 flex flex-col justify-between group hover:border-[#FF7800]/30 transition-colors">
              <div>
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#FF7800] uppercase mb-4 block">FLUJOS AUTOMATIZADOS</span>
                <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight mb-4">
                  La Terminal Inteligente<br />de Odonto_Core.
                </h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-md mb-8">
                  Transcripción por IA de hallazgos clínicos, generación automatizada de presupuestos precisos, y predicción biológica de resultados a largo plazo asistida artificialmente.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-[#0D0D0D] p-4 rounded-lg border border-white/5">
                  <div className="w-2 h-2 rounded-full bg-[#FF7800]"></div>
                  <span className="text-white text-xs font-bold tracking-widest uppercase">Sincronización Inteligente de Lab</span>
                </div>
                <div className="flex items-center gap-3 bg-[#0D0D0D] p-4 rounded-lg border border-white/5">
                  <div className="w-2 h-2 rounded-full bg-[#FF7800]"></div>
                  <span className="text-white text-xs font-bold tracking-widest uppercase">Trazado Odontológico por Voz (IA)</span>
                </div>
              </div>
            </div>
          </section>

          {/* ── 3. PATIENT INTELLIGENCE ────────────────────────────────── */}
          <section className="bg-[#141414] rounded-xl border border-white/10 p-8 lg:p-0 overflow-hidden mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-0 lg:p-12 flex flex-col justify-center">
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#FF7800] uppercase mb-4 block">PATIENT INTELLIGENCE</span>
                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight mb-6">
                  Anticipá los Resultados<br />Antes de que Sucedan.
                </h3>
                <p className="text-white/50 text-sm md:text-base leading-relaxed mb-8 max-w-md">
                  Aprovechá la precisión de millones de datos biométricos para predecir la salud periodontal a largo plazo y la longevidad de cada restauración.
                  Nuestra clínica no solo registra tu pasado; diseña paramétricamente el futuro de tu sonrisa.
                </p>
                <Link to="/mi-perfil" className="inline-flex items-center gap-2 text-[#FF7800] font-bold text-xs uppercase tracking-widest hover:text-white transition-colors">
                  Explorar Motor Predictivo <ArrowRight size={16} />
                </Link>
              </div>

              <div className="mt-10 lg:mt-0 p-6 lg:p-12 relative flex items-center justify-center bg-[#0D0D0D] border-l border-white/5">
                {/* Dummy Dashboard UI Chart */}
                <div className="w-full max-w-sm bg-[#1C1B1B] border border-white/10 rounded-lg p-5 shadow-2xl relative z-10">
                  <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-2">
                    <span className="text-white text-xs font-bold">Biometric Index</span>
                    <span className="text-white/30 text-[10px] font-mono">v4.2</span>
                  </div>
                  {/* Lines */}
                  <div className="space-y-4 mb-6">
                    <div className="w-full bg-[#0D0D0D] h-1.5 rounded-full overflow-hidden">
                      <div className="w-[94%] bg-[#FF7800] h-full shadow-[0_0_10px_#FF7800]"></div>
                    </div>
                    <div className="w-full bg-[#0D0D0D] h-1.5 rounded-full overflow-hidden">
                      <div className="w-[62%] bg-white/30 h-full"></div>
                    </div>
                    <div className="w-full bg-[#0D0D0D] h-1.5 rounded-full overflow-hidden">
                      <div className="w-[85%] bg-white/30 h-full"></div>
                    </div>
                  </div>
                  {/* Badge output */}
                  <div className="bg-[#0D0D0D] border border-white/5 rounded p-3 flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF7800] animate-pulse"></span>
                      <span className="text-[9px] text-[#FF7800] font-mono uppercase tracking-widest">ACTIVE ANALYSIS</span>
                    </div>
                    <span className="text-white font-mono text-sm tracking-wide">PT__INDEX: 94.2% <span className="opacity-50">(OPTIMAL)</span></span>
                  </div>
                </div>

                {/* Decor */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-[#FF7800]/20 via-transparent to-transparent pointer-events-none"></div>
              </div>
            </div>
          </section>

          {/* ── 4. FINAL CTA ───────────────────────────────────────────── */}
          <section className="text-center py-16 md:py-24 border-t border-white/10 relative">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-6 leading-tight max-w-3xl mx-auto">
              ¿Listos para experimentar la clínica del futuro?
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
              Únete a los miles de pacientes que ya confían en el estándar más avanzado de diagnóstico odontológico digital.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/mi-perfil" className="btn-expand bg-[#FF7800] text-black font-black uppercase text-sm tracking-widest px-10 py-5 rounded">
                Ingresar al Portal
              </Link>
              <Link to="/turnos" className="btn-expand bg-text border border-white/20 text-white font-bold uppercase text-sm tracking-widest px-10 py-5 rounded">
                Agendar un Turno
              </Link>
            </div>
          </section>

        </div>
      </main>
      <div className="bg-background">
        <Footer />
      </div>
    </div>
  );
};

export default OdontologiaDigital;