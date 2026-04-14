import SeccionAtencionInmediata from "../components/SeccionAtencionInmediata";
import Instalaciones from "../components/Instalaciones";
import SeccionPlanesAtencion from "../components/SeccionPlanesAtencion";
import SeccionProfesionales from "../components/SeccionProfesionales";
import SeccionPreguntasFrecuentes from "../components/SeccionPreguntasFrecuentes";
import BannerPlanes from "../components/BannerPlanes";
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
      <SeccionProfesionales />

      {/* 5. MAPA Y UBICACIÓN */}
      <Instalaciones />

      {/* 7. PREGUNTAS FRECUENTES */}
      <SeccionPreguntasFrecuentes />
      
    </div>
  );
};

export default Inicio;