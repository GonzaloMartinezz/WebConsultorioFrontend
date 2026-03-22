import { Link } from 'react-router-dom';
// Importamos iconos variados para una mejor identificación visual
import { FaInstagram, FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  
  // Clase utilitaria para los enlaces de navegación con el efecto de subrayado animado
  const navLinkClass = "relative text-lg font-medium text-background/80 hover:text-background transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full";

  // Clase utilitaria para los botones de Instagram (Accesibles y claros)
  const instagramButtonClass = "flex items-center gap-3 w-full sm:w-auto px-5 py-3 rounded-lg text-base font-bold shadow-sm transition-all active:scale-95 hover:brightness-105";

  return (
    // Fondo Marrón Nogal Oscuro (`bg-primary`) extraído de las sillas de la sala de espera
    <footer className="bg-primary text-background mt-auto border-t border-primary-hover">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        
        {/* GRILLA PRINCIPAL ( Stack en móvil, Grid en desktop) */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          
          {/* COLUMNA 1: Marca y confianza */}
          <div className="md:col-span-1 space-y-4 text-center md:text-left">
            <Link to="/" className="inline-block focus:outline-none focus:ring-2 focus:ring-accent rounded-lg p-1">
              <div className="flex flex-col items-center md:items-start">
                <span className="text-3xl font-extrabold tracking-tight">
                  Carcara • Martínez
                </span>
                <span className="text-xs font-semibold tracking-[0.3em] uppercase mt-2 text-secondary">
                  Centro Odontológico
                </span>
              </div>
            </Link>
            <p className="text-base text-secondary/90 leading-relaxed max-w-md lg:max-w-xl mx-auto md:mx-0">
              Excelencia y calidez en San Miguel de Tucumán. Cuidamos tu sonrisa con tecnología de vanguardia y atención personalizada.
            </p>
          </div>

          {/* COLUMNA 2: Navegación Rápida */}
          <div className="space-y-4 text-center md:mx-auto">
            <h3 className="text-xl font-bold tracking-tight text-white/95">Explorar</h3>
            <ul className="space-y-3 flex flex-col items-center">
              <li><Link to="/" className={navLinkClass}>Inicio</Link></li>
              <li><Link to="/acerca" className={navLinkClass}>Acerca de nosotros</Link></li>
              <li><Link to="/contacto" className={navLinkClass}>Contacto</Link></li>
              <li><Link to="/turnos" className={`${navLinkClass} text-accent-orange hover:text-accent-orange font-semibold`}>Reservar turno online</Link></li>
            </ul>
          </div>

          {/* COLUMNA 3: Contacto Directo */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-xl font-bold tracking-tight text-white/95">Contacto</h3>
            <ul className="space-y-4 flex flex-col items-center md:items-start text-secondary/90 text-base">
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-accent shrink-0 text-lg" />
                <span>Calle Jose Rondeau 827, San Miguel de Tucumán</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-accent shrink-0 text-lg" />
                <span>+54 381 5840885</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-accent shrink-0 text-lg" />
                <span>+54 381 5804262</span>
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp className="text-accent shrink-0 text-xl" />
                <a href="https://wa.me/5493819876543" target="_blank" rel="noopener noreferrer" className="hover:text-background transition-colors font-medium">
                  +54 9 381 987-6543
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* BARRA INFERIOR DE COPYRIGHT (Grises suaves y marrón nogal) */}
        <div className="mt-16 pt-8 border-t border-secondary/20 text-center space-y-3">
          <p className="text-sm text-secondary tracking-wide">
            &copy; {new Date().getFullYear()} Gonzalo Martinez. Todos los derechos reservados.
          </p>
          <p className="text-xs text-secondary/60">
            Carcara • Martínez Centro Odontológico • Odontología Integral •San Miguel de Tucumán, Argentina.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;