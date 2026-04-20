import fs from 'fs';

const filePath = './src/pages/OdontologiaDigital.jsx';
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Add imports
content = content.replace(
  "import { Link } from 'react-router-dom';",
  "import { Link } from 'react-router-dom';\nimport { useState, useEffect, useRef } from 'react';"
);

// 2. Add arrays and hook before Estructura
const hookCode = `
/* ─────────────────────────────────────────────────────────────
   Datos para las 4 tarjetas de tecnología (fila del hero)
   ───────────────────────────────────────────────────────────── */
const techCards = [
  {
    img: '/nosotros-ortopanto.png',
    icon: '🦷',
    title: 'Diagnóstico Digital',
    desc: 'Análisis cefalométrico y visualización de ortopantomografías en alta resolución con IA de detección.',
  },
  {
    img: '/nosotros-scanner.png',
    icon: '⚙️',
    title: 'Escaneo Óptico',
    desc: 'Integración directa con escáneres intraorales para modelos 3D sin latencia de procesamiento.',
  },
  {
    img: '/maquinas adolfo 3.jpeg',
    icon: '🧬',
    title: 'Laboratorio On-Site',
    desc: 'Flujo de trabajo CAD/CAM optimizado para la impresión de guías y prótesis biocompatibles.',
  },
  {
    img: '/nosotros-hero.png',
    icon: '📐',
    title: 'Cirugía Guiada',
    desc: 'Simulación de implantes y diseño de guías quirúrgicas con mapeo de canal nervioso.',
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

const Estructura = () => {
  const counter1 = useCounter(15);
  const counter2 = useCounter(5000);
  const counter3 = useCounter(98);
`;
content = content.replace("const Estructura = () => {", hookCode);

// 3. Update main tag to not restrict width for the dark hero
content = content.replace(
  '<main className="grow pt-24 pb-24 px-6 max-w-7xl mx-auto w-full">',
  '<main className="grow flex flex-col w-full">'
);

// 4. Wrap the lower sections in a max-w-7xl div
content = content.replace(
  '{/* --- NUEVO COMPONENTE: CLINICAL PRECISION (SaaS Tech) --- */}',
  '<div className="max-w-7xl mx-auto px-6 w-full pt-16">\n        {/* --- NUEVO COMPONENTE: CLINICAL PRECISION (SaaS Tech) --- */}'
);

content = content.replace(
  '      </main>',
  '        </div>\n      </main>'
);

// 5. Replace lines 18-106 (the old hero) with the new HERO OSCURO
const startMarker = '<section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-center">';
const endMarkerIndex = content.indexOf('</section>', content.indexOf('<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">')) + '</section>'.length;
const startIdx = content.indexOf(startMarker);

const newHeroCode = fs.readFileSync('new_hero.txt', 'utf-8');

content = content.substring(0, startIdx) + newHeroCode + content.substring(endMarkerIndex);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Script executed successfully!');
