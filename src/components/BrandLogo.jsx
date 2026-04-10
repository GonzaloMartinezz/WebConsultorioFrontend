import React, { useState } from "react";

const BrandLogo = ({ className = "", scrolled = false }) => {
  // Estado para manejar si hay un error al cargar la imagen
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`flex items-center justify-center gap-2 ${className} group`}>
      {/* 1. Contenedor de la Imagen: Cuadrado y Circular */}
      <div className="h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-full bg-white flex items-center justify-center border-2 border-white/20 shadow-md transition-transform group-hover:scale-105">
        {!imgError ? (
          <img
            // ¡EL ARREGLO ESTÁ AQUÍ! Sin la palabra /public/
            src="/Logo Principal marron 2.png" 
            alt="Logo Carcara Martínez"
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-accent-orange text-white font-bold text-xl tracking-widest">
            C•M
          </div>
        )}
      </div>

      {/* 2. El nombre de la clínica (Cambia de color con el scroll) */}
      <div className="hidden sm:flex flex-col items-start justify-center pt-1">
        <span className={`text-[0.65rem] font-black tracking-[0.2em] uppercase leading-none transition-colors ${
          scrolled ? 'text-primary/70' : 'text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
        }`}>
          Centro Odontológico
        </span>
        <span className={`text-xl font-black leading-tight tracking-tight transition-colors ${
          scrolled ? 'text-primary' : 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
        }`}>
          Carcara • Martínez
        </span>
      </div>
    </div>
  );
};

export default BrandLogo;
