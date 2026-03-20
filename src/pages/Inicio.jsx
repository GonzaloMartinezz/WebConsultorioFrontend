// Importamos los dos componentes principales
import BannerPlanes from "../components/BannerPlanes";
import SeccionesInformativas from "../components/SeccionesInformativas";

const Inicio = () => {
  return (
    <main className="grow bg-background overflow-hidden">
      
      {/* 1. Nuestro Hero Principal (Ocupa la pantalla completa al entrar) */}
      <BannerPlanes />

      {/* 2. Todas las secciones nuevas (Expertos, Plan, Mapa, Preguntas) */}
      <SeccionesInformativas />

    </main>
  );
};

export default Inicio;