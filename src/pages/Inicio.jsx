import SeccionAtencionInmediata from "../components/SeccionAtencionInmediata";
import SeccionMapa from "../components/SeccionMapa";
import SeccionPreguntasFrecuentes from "../components/SeccionPreguntasFrecuentes";
import BannerPlanes from "../components/BannerPlanes"; 
import SeccionPlanesAtencion from "../components/SeccionPlanesAtencion";
import SeccionExpertos from "../components/SeccionExpertos";
import HeroCarousel from "../components/HeroCarousel";

const Inicio = () => {
  return (
    <div className="flex flex-col w-full">
      
      {/* 1. HERO SECTION (Carrusel automático TOD3D style) */}
      <HeroCarousel />

      {/* 2. SECCIÓN COMPROMISO (Tarjetas de Servicios) */}
      <BannerPlanes />

      {/* 3. BIENVENIDA A LA APP */}
      <SeccionAtencionInmediata />

      {/* 4. SECCIÓN PROFESIONALES */}
      <SeccionPlanesAtencion />

      {/* 5. MAPA Y UBICACIÓN */}
      <SeccionMapa />

      {/* 6. EXPERTOS Y COMUNIDAD */}
      <SeccionExpertos />

      {/* 7. PREGUNTAS FRECUENTES */}
      <SeccionPreguntasFrecuentes />
      
    </div>
  );
};

export default Inicio;