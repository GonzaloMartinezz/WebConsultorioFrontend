import { useState, useEffect } from 'react';

const Preloader = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Artificial smooth progress for the "premium" feel (min 1.5s load time)
    // We do this to ensure everything has time to render in the background
    // without the user seeing the stutter.
    const duration = 1800; // 1.8 seconds
    const interval = 30;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        // Iniciar transición de salida
        setIsFadingOut(true);
        setTimeout(() => {
          onLoaded();
        }, 500); // 500ms para que la opacidad baje a 0 antes de desmontar
      }
    }, interval);

    // Quitamos la precarga forzada de imágenes locales pesadas que destruyen el LCP

    return () => clearInterval(timer);
  }, [onLoaded]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#111] overflow-hidden transition-opacity duration-500 ease-in-out ${isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >

      {/* Overlay oscuro para máxima legibilidad del loader */}
      <div className="absolute inset-0 bg-linear-to- from-black/80 via-black/60 to-black/90"></div>

      {/* Contenido del Loader */}
      <div className="relative z-10 flex flex-col items-center mt-[-5%]">
        {/* Logo */}
        <img loading="lazy" 
          src="https://res.cloudinary.com/t9ja9vq0/image/upload/f_auto,q_auto,w_400/v1787775657/NEWLOGO.png" 
          alt="Studio Dental C&M" 
          className="h-24 sm:h-28 mb-12 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] object-contain animate-[pulse_2s_ease-in-out_infinite]"
          style={{ filter: 'invert(1) hue-rotate(180deg)' }}
        />

        {/* Barra de Progreso */}
        <div className="w-64 md:w-80 h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-md border border-white/5 relative">
          <div 
            className="h-full bg-linear-to-r from-accent-orange to-orange-400 transition-all duration-75 ease-linear shadow-[0_0_15px_rgba(255,120,0,0.8)] rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {/* Texto de Carga Dinámico */}
        <div className="mt-8 flex flex-col items-center gap-1.5">
          <p className="text-accent-orange text-[10px] md:text-xs font-black tracking-[0.4em] uppercase">
            Iniciando Plataforma
          </p>
          <div className="flex items-center gap-2">
            <p className="text-white/50 text-xs font-medium tracking-widest tabular-nums">
              {Math.round(progress)}%
            </p>
            {/* Pequeño spinner decorativo opcional */}
            <svg className="animate-spin h-3 w-3 text-accent-orange opacity-70" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
