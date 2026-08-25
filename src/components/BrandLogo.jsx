import React from "react";

const BrandLogo = ({ className = "", scrolled = false }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img
        src="/NEWLOGO.png"
        alt="Logo Carcara Martínez"
        className="h-[72px] sm:h-[100px] w-auto object-contain ml-3 md:ml-6 transition-all duration-500"
        style={{ filter: !scrolled ? 'invert(1) hue-rotate(180deg)' : 'none' }}
      />
    </div>
  );
};

export default BrandLogo;
