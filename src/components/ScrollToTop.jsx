import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  // useLocation nos da información sobre la URL actual
  const { pathname } = useLocation();

  useEffect(() => {
    // window.scrollTo manda el scroll de la ventana a las coordenadas (x:0, y:0)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth" // "smooth" hace que suba con una animación suave, "auto" es instantáneo
    });
  }, [pathname]); // Este useEffect se ejecuta CADA VEZ que el 'pathname' cambia

  // Este componente no renderiza nada visual, solo ejecuta lógica
  return null; 
};

export default ScrollToTop;