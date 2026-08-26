import React, { useState, useEffect, useRef } from "react";

const BrandLogo = ({ className = "", scrolled = false, forceDark = false }) => {
  const [isOverDark, setIsOverDark] = useState(false);
  const logoRef = useRef(null);

  useEffect(() => {
    // Solo necesitamos verificar si está scrolleado
    if (!scrolled) {
      setIsOverDark(false);
      return;
    }

    const checkDarkBackground = () => {
      if (!logoRef.current) return;
      
      // Selectores de las secciones oscuras
      const darkSelectors = [
        '.bg-primary', 
        '.bg-\\[\\#050505\\]', 
        '.bg-\\[\\#4a3b32\\]',
        '.bg-black',
        '[data-theme="dark"]'
      ];
      
      const darkSections = document.querySelectorAll(darkSelectors.join(', '));
      let overDark = false;
      
      const logoRect = logoRef.current.getBoundingClientRect();
      const logoCenterY = logoRect.top + logoRect.height / 2;
      
      darkSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        // Verificamos si el centro del logo está dentro de la sección oscura
        if (logoCenterY >= rect.top && logoCenterY <= rect.bottom) {
          overDark = true;
        }
      });
      
      setIsOverDark(overDark);
    };

    window.addEventListener('scroll', checkDarkBackground, { passive: true });
    // Verificar estado inicial
    checkDarkBackground();
    
    return () => window.removeEventListener('scroll', checkDarkBackground);
  }, [scrolled]);

  // Si NO está scrolleado (está en HeroCarousel) o si está sobre una sección oscura, lo hacemos blanco. (A menos que forceDark sea true)
  const shouldBeWhite = !forceDark && (!scrolled || isOverDark);

  return (
    <div ref={logoRef} className={`flex items-center justify-center ${className}`}>
      <img loading="lazy"
        src="https://res.cloudinary.com/t9ja9vq0/image/upload/v1787775657/NEWLOGO.png"
        alt="Logo Carcara Martínez"
        className="h-[72px] sm:h-[100px] w-auto object-contain ml-3 md:ml-6 transition-all duration-300"
        style={{ filter: shouldBeWhite ? 'invert(1) hue-rotate(180deg)' : 'none' }}
      />
    </div>
  );
};

export default BrandLogo;
