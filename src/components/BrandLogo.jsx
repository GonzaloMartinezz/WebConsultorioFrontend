import React, { useState } from 'react';

const BrandLogo = ({ className = "" }) => {
  // Estado para manejar si hay un error al cargar la imagen
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      
      {/* 1. Contenedor de la Imagen: Cuadrado y Circular */}
      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-text flex items-center justify-center border-2 border-primary/20 shadow-sm">
        {!imgError ? (
          <img
            // IMPORTANTE: Asegúrate de que este nombre coincida EXACTAMENTE 
            // con tu archivo en la carpeta public (ej: /logo.png, /logo.jpg)
            src="/public/IMG_LOGO9173.jpeg" 
            alt="Logo Carcara Martínez"
            // object-cover es clave para que no se estire y llene el círculo
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          /* Fallback de seguridad: Si la imagen falla, muestra las iniciales en un círculo */
          <div className="flex h-full w-full items-center justify-center bg-accent-orange text-white font-bold text-2xl tracking-widest">
            C•M
          </div>
        )}
      </div>

      {/* 2. El nombre de la clínica */}
      {/* Mantenemos el nombre al lado para máxima claridad, especialmente para personas mayores */}
      <div className="hidden sm:flex flex-col">
        <span className="text-xl font-extrabold text-text leading-none tracking-tight">
          Carcara • Martínez
        </span>
        <span className="text-[0.65rem] font-semibold text-text-light tracking-[0.2em] uppercase mt-1">
          Centro Odontológico
        </span>
      </div>

    </div>
  );
};

export default BrandLogo;