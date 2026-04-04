import React, { useState } from "react";

const BrandLogo = ({ className = "" }) => {
  // Estado para manejar si hay un error al cargar la imagen
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* 1. Contenedor de la Imagen: Cuadrado y Circular */}
      <div className="h-17 w-17 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-full bg-text flex items-center justify-center border-2 border-primary/20 shadow-sm">
        {!imgError ? (
          <img
            src="/Logo Principal marron 2.png"
            alt="Logo Carcara Martínez"
            // Agregamos 'translate-y-2' para bajarlo un poquito. 
            // Si es mucho, cámbialo a 'translate-y-1'. Si es poco, 'translate-y-3'.
            className="h-full w-full object-cover translate-y-0.5"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-accent-orange text-white font-bold text-2xl tracking-widest">
            C•M
          </div>
        )}
      </div>

      {/* 2. El nombre de la clínica */}
      {/* Mantenemos el nombre al lado para máxima claridad, especialmente para personas mayores */}
      <div className="hidden sm:flex flex-col items-center">
        <span className="text-[0.75rem] font-semibold text-text-light tracking-[0.2em] uppercase mt-1">
          Centro Odontológico
        </span>
        <span className="text-lg md:text-xxl font-extrabold text-text leading-none tracking-tight">
          Carcara • Martínez
        </span>
      </div>
    </div>
  );
};

export default BrandLogo;
