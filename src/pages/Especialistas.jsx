import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import SeccionProfesionales from '../components/SeccionProfesionales';

/* ─────────────────────────────────────────────────────────────
   Datos para las 4 tarjetas de tecnología (fila del hero)
   ───────────────────────────────────────────────────────────── */
const techCards = [
  {
    img: '/que-es-y-para-que-se-usa-el-sistema-cerec.jpg',
    icon: '🦷',
    title: 'Diagnóstico Digital',
  },
  {
    img: '/sanners1.png',
    icon: '⚙️',
    title: 'Sistemas CAD/CAM,para la confeccion de guias quirurgicas y coronas.Ademas disponemos de radiografias digiital',
  },
  {
    img: '/frezadora1.jpeg',
    icon: '🧬',
    title: 'Fabricacion Aditiva 3D',
  },
  {
    img: '/custom-tray-resin.webp',
    icon: '📐',
    title: 'Scanner Intraoral',
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

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   COMPONENTE PRINCIPAL
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const AcercaDe = () => {
  const counter1 = useCounter(25);
  const counter2 = useCounter(40000);
  const counter3 = useCounter(100);

  return (
    <main className="grow flex flex-col overflow-hidden relative">

      {/* ══════════════════════════════════════════════════════════
          CONTENIDO EXISTENTE — DEBAJO DEL HERO
          ══════════════════════════════════════════════════════════ */}
      <div className="bg-background flex flex-col gap-24 pb-24">

        {/* ======================================================== */}
        {/* SECCIÓN 1: NUESTRA ESENCIA / HERO PROFESIONAL */}
        {/* ======================================================== */}
        <section className="relative bg-primary pt-44 pb-20 lg:pt-52 lg:pb-32 px-4 sm:px-6 lg:px-8 border-b-8 border-accent-orange overflow-hidden">
          {/* Elementos decorativos de fondo abstractos */}
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full blur-[120px] bg-accent-orange/15 pointer-events-none"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[140px] bg-white/5 pointer-events-none"></div>

          <div className="mx-auto max-w-7xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

              {/* Lado Izquierdo: Título y Estadísticas */}
              <div className="lg:col-span-7 space-y-10" data-aos="fade-right">

                {/* Etiqueta superior */}
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-orange opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-orange"></span>
                  </span>
                  <span className="text-xs font-bold text-white uppercase tracking-widest whitespace-nowrap">
                    Odontología de Excelencia
                  </span>
                </div>

                <div className="space-y-6">
                  <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-black uppercase tracking-tighter leading-[0.9] text-white">
                    Excelencia <br /> <span className="text-transparent bg-clip-text bg-linear-to-r from-accent-orange to-orange-300">Clínica &amp; Humana</span>
                  </h1>

                  <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-xl">
                    Somos un equipo de trabajo dispuesto a brindarte nuestra experiencia clínica basada en casuística y resultados  clínicos ,  funcionales y estéticos . Con un enfoque profundamente humano  para acompañarte en cada etapa de tu  tratamiento bucal
                  </p>
                </div>

                {/* Estadísticas animadas en una sola línea ancha */}
                <div className="flex flex-row items-start justify-between gap-4 sm:gap-8 pt-10 border-t border-white/10 w-full max-w-4xl">
                  <div ref={counter1.ref} className="space-y-2">
                    <div className="text-4xl sm:text-5xl font-black text-white flex items-baseline">
                      <span className="text-accent-orange mr-1">+</span>{counter1.count}
                    </div>
                    <div className="text-[10px] sm:text-xs font-bold text-white/50 uppercase tracking-widest leading-tight">
                      Años de <br />Experiencia
                    </div>
                  </div>

                  <div ref={counter2.ref} className="space-y-2">
                    <div className="text-4xl sm:text-5xl font-black text-white flex items-baseline">
                      <span className="text-accent-orange mr-1">+</span>{counter2.count}
                    </div>
                    <div className="text-[10px] sm:text-xs font-bold text-white/50 uppercase tracking-widest leading-tight">
                      Pacientes <br />Atendidos
                    </div>
                  </div>

                  <div ref={counter3.ref} className="space-y-2">
                    <div className="text-4xl sm:text-5xl font-black text-white flex items-baseline">
                      {counter3.count}<span className="text-accent-orange ml-1">%</span>
                    </div>
                    <div className="text-[10px] sm:text-xs font-bold text-white/50 uppercase tracking-widest leading-tight">
                      Satisfacción <br />Clínica
                    </div>
                  </div>
                </div>
              </div>

              {/* Lado Derecho: Tarjeta Glassmorphism de Filosofía */}
              <div className="lg:col-span-5 md:col-span-5 lg:pl-10" data-aos="fade-left" data-aos-delay="200">
                {/* Resplandor detrás de la tarjeta */}
                <div className="absolute -inset-1 bg-linear-to-br from-accent-orange/40 to-transparent rounded-[2.5rem] blur-xl opacity-70"></div>

                <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 p-6 sm:p-8 md:p-10 rounded-4xl shadow-2xl overflow-hidden group hover:border-white/30 transition-colors duration-500">
                  {/* Patrón estético */}
                  <div className="absolute -top-4 -right-4 text-white/5 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 pointer-events-none">
                    <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
                    </svg>
                  </div>

                  <h3 className="text-sm font-black text-accent-orange uppercase tracking-widest mb-6 flex items-center gap-4">
                    <span className="w-8 h-[2px] bg-accent-orange rounded-full"></span>
                    Nuestra Filosofía
                  </h3>

                  <blockquote className="text-xl sm:text-2xl text-white font-medium leading-relaxed italic mb-8 relative z-10">
                    "Te escuchamos , diagnosticamos de manera integral y te <span className="text-accent-orange not-italic font-bold"> ofrecemos soluciones personalizadas y clara</span>."
                  </blockquote>

                  {/* Firma / Autores */}
                  <div className="mt-10 flex items-center gap-4 border-t border-white/10 pt-6 relative z-10">
                    <div className="w-15 h-15 rounded-full bg-linear-to-br from-accent-orange to-orange-500 text-white flex items-center justify-center font-bold text-lg shadow-lg border-2 border-white/20">
                      C & M
                    </div>
                    <div>
                      <div className="text-white font-bold tracking-wide">Carcara &amp; Martínez</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4. SECCIÓN PROFESIONALES */}
        <div className="bg-background">
          <SeccionProfesionales />
        </div>


        {/* ======================================================== */}
        {/* SECCIÓN 2: EL EQUIPO (Grilla Moderna - bg-white) */}
        {/* ======================================================== */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center">

            {/* Lado Izquierdo: Foto de Escritorio (escritorio 2.jpeg) */}
            <div className="w-full lg:w-1/2 relative h-[300px] md:h-[500px] rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white" data-aos="fade-right">
              <img src="/sala de espera 2.jpeg" alt="Área de consulta Carcara Martínez" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent"></div>
            </div>

            {/* Lado Derecho: Los Doctores y Especialidades */}
            <div className="w-full lg:w-1/2 space-y-12" data-aos="fade-left" data-aos-delay="200">
              <div className="text-center lg:text-left space-y-4">
                {/* ======================================================== */}
                {/* LOGO PRINCIPAL: /Logo Principal.png (Pequeño junto al título) */}
                {/* ======================================================== */}
                <h2 className="text-3xl md:text-4xl lg:text-4xl font-black text-text uppercase leading-tight tracking-tight">
                  Doctores <br /> <span className="text-accent-orange">Carcara &amp; Martínez</span>
                </h2>
                <p className="text-base md:text-lg text-text-light font-medium max-w-xl mx-auto lg:mx-0">
                  Profesionales con amplia trayectoria, dedicados a ofrecerte diagnósticos precisos y tratamientos mínimamente invasivos.
                </p>
              </div>

              {/* Grilla de Doctores */}
              <div className="flex flex-col sm:flex-row gap-6 pt-8 border-t border-secondary justify-center lg:justify-start">
                {/* Tarjeta Dr. Adolfo */}

                <Link to="/especialistas/adolfo" className="bg-white rounded-4xl p-10 shadow-[0_15px_40px_rgba(0,0,0,0.1)] w-full sm:w-[280px] hover:-translate-y-2 transition-transform duration-300 border-b-5 border-accent-orange border-x border-t border-x-secondary/20 border-t-secondary/20 block cursor-pointer">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center text-4xl shadow-inner border border-secondary/20">
                      👨‍⚕️
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-text leading-tight">Dr. Adolfo Alejandro <br /> Martínez</h4>
                      <p className="text-[11px] font-black text-accent-orange uppercase tracking-widest mt-3">Odontología General</p>
                      <p className="text-xs font-medium text-text-light mt-1 w-full border-t border-gray-100 pt-2">Area de Implantologia</p>
                    </div>
                  </div>
                </Link>


                {/* Tarjeta Dra. Erina */}
                <Link to="/especialistas/erina" className="bg-white rounded-4xl p-10 shadow-[0_15px_40px_rgba(0,0,0,0.1)] w-full sm:w-[280px] hover:-translate-y-2 transition-transform duration-300 border-b-5 border-accent-orange border-x border-t border-x-secondary/20 border-t-secondary/20 block cursor-pointer">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center text-4xl shadow-inner border border-secondary/20">
                      👩‍⚕️
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-text leading-tight">Dra. Erina <br /> Carcara</h4>
                      <p className="text-[11px] font-black text-accent-orange uppercase tracking-widest mt-3">Estética Dental</p>
                      <p className="text-xs font-medium text-text-light mt-1 w-full border-t border-gray-100 pt-2">Ortodoncia y Estética</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>


        {/* ======================================================== */}
        {/* SECCIÓN 3: INSTALACIONES PREMIUM (GRILLA DE 3 - bg-white) */}
        {/* Inspirado en references profesionales densas */}
        {/* ======================================================== */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-10 md:py-16 bg-white rounded-3xl md:rounded-[2.5rem] shadow-sm border border-secondary/50">
          <div className="text-center mb-10 md:mb-16 space-y-3" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase text-text leading-tight tracking-tight">
              Nuestras <span className="text-accent-orange">Instalaciones</span>
            </h2>
            <p className="text-base md:text-lg text-text-light font-medium max-w-2xl mx-auto leading-relaxed">
              Consultorios amplios, climatizados y equipados con tecnología de vanguardia para que tu experiencia sea lo más cómoda, segura y eficiente posible.
            </p>
          </div>

          {/* Grilla de instalaciones: 1 ancha arriba, 2 abajo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Maquinas Adolfo 1 - Impresora 3D (Ancha) */}
            <div className="relative rounded-2xl overflow-hidden h-[300px] md:h-[300px] shadow-lg group md:col-span-2" data-aos="fade-up">
              <img src="/maquinas adolfo 2.jpg" alt="Impresora 3D Odontológica" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent p-6 flex flex-col justify-end">
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">Precisión Digital</h3>
              </div>
            </div>

            {/* Maquinas Adolfo 2jpg.jpg - CEREC/Fresadora */}
            <div className="relative rounded-2xl overflow-hidden h-[400px] md:h-[500px] shadow-lg group" data-aos="fade-up" data-aos-delay="100">
              <img src="/sanners1.png" alt="Laboratorio Digital CEREC" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent p-6 flex flex-col justify-end">
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">Diseño CAD/CAM</h3>
              </div>
            </div>

            {/* Maquinas Adolfo 3.jpg - Equipamiento laboratorio */}
            <div className="relative rounded-2xl overflow-hidden h-[400px] md:h-[500px] shadow-lg group" data-aos="fade-up" data-aos-delay="200">
              <img src="/imagenIA.jpg" alt="Equipamiento de vanguardia" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent p-6 flex flex-col justify-end">
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">Tecnología Sirona</h3>
              </div>
            </div>

          </div>
        </section>

        {/* ======================================================== */}
        {/* SECCIÓN 4: TECNOLOGÍA Y CONFORT (GRILLA DE 2 - bg-background) */}
        {/* ======================================================== */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-10 md:py-16">
          <div className="text-center mb-10 md:mb-16 space-y-3" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase text-text leading-tight tracking-tight">
              Tecnología y <span className="text-accent-orange">Confort</span>
            </h2>
            <p className="text-base md:text-lg text-text-light font-medium max-w-2xl mx-auto leading-relaxed">
              Invertimos en tecnología de vanguardia para diagnósticos inmediatos y diseñamos espacios para tu total relajación, asegurando tratamientos rápidos y sin dolor.
            </p>
          </div>

          {/* Grilla estructurada de Tecnología */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Imagen 1 - Impresora 3D */}
            <div className="relative rounded-3xl overflow-hidden h-[400px] md:h-[450px] shadow-lg border-4 border-white group" data-aos="fade-right">
              <img src="/nosotros-cirugia.png" alt="Impresión 3D Biocompatible" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent p-8 flex flex-col justify-end">
                <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Impresión 3D</h3>
                <p className="text-white/90 font-medium mt-1">Impresión de alta precisión para prótesis y guías quirúrgicas.</p>
              </div>
            </div>

            {/* Imagen 2 - Ortodoncia */}
            <div className="relative rounded-3xl overflow-hidden h-[400px] md:h-[450px] shadow-lg border-4 border-white group" data-aos="fade-left">
              <img src="/orthodontics.jpg.webp" alt="Ortodoncia y Planificación Digital" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent p-8 flex flex-col justify-end">
                <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Ortodoncia Digital</h3>
                <p className="text-white/90 font-medium mt-1">Tratamientos a medida diseñados a partir de escaneo intraoral.</p>
              </div>
            </div>

            {/* Imagen 3 - Cirugía (Ancha) */}
            <div className="relative rounded-3xl overflow-hidden h-[400px] md:h-[500px] shadow-lg border-4 border-white group md:col-span-2" data-aos="fade-up">
              <img src="/impresora-3b-blog.webp" alt="Cirugía Guiada" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent p-8 flex flex-col justify-end">
                <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Cirugía Guiada</h3>
                <p className="text-white/90 font-medium mt-1">Intervenciones precisas y mínimamente invasivas asistidas por software.</p>
              </div>
            </div>

          </div>

          {/* Botón CTA Inferior innovador active:scale-95 */}
          <div className="text-center mt-16 pt-8 border-t border-secondary" data-aos="fade-up">
            <Link to="/contacto" className="inline-block bg-primary text-background font-bold px-10 py-4 rounded-xl shadow-md hover:brightness-110 active:scale-95 transition-all text-lg hover:-translate-y-1 hover:shadow-xl">
              Ver nuestra ubicación &rarr;
            </Link>
          </div>
        </section>
      </div>

    </main>
  );
};

export default AcercaDe;