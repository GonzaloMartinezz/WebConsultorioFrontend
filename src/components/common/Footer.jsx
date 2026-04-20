import { Link } from 'react-router-dom';
import { FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaTooth } from 'react-icons/fa';

const Footer = () => {
  const navLinkClass = "relative text-sm font-bold text-primary/70 hover:text-accent-orange transition-colors duration-300";

  return (
    <footer className="bg-linear-to-b from-orange-50/40 via-orange-100/50 to-accent-orange/10 text-primary mt-auto border-t-4 border-accent-orange relative overflow-hidden">

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">

          {/* COLUMNA 1: Marca */}
          <div className="md:col-span-1 space-y-4 text-center md:text-left">
            <Link to="/" className="inline-block focus:outline-none rounded-lg p-1 hover:opacity-80 transition-opacity">
              <div className="flex flex-col items-center md:items-start">
                <div className="flex items-center gap-2">
                  <FaTooth className="text-2xl text-accent-orange" />
                  <span className="text-2xl font-black tracking-tighter text-primary">
                    C&M <span className="text-accent-orange">Dental</span>
                  </span>
                </div>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase mt-2 text-primary/60 ml-8 md:ml-0">
                  Centro Odontológico
                </span>
              </div>
            </Link>
            <p className="text-sm text-primary/70 leading-relaxed max-w-xs mx-auto md:mx-0 font-medium">
              Excelencia y calidez en San Miguel de Tucumán. Cuidamos tu sonrisa con tecnología de vanguardia y atención personalizada.
            </p>
          </div>

          {/* COLUMNA 2: Navegación */}
          <div className="space-y-4 text-center md:mx-auto">
            <h3 className="text-sm font-black tracking-widest text-primary uppercase">Explorar</h3>
            <ul className="space-y-2 flex flex-col items-center md:items-start">
              <li><Link to="/" className={navLinkClass}>Inicio</Link></li>
              <li><Link to="/especialistas" className={navLinkClass}>Especialistas</Link></li>
              <li><Link to="/contacto" className={navLinkClass}>Contacto</Link></li>
              <li><Link to="/turnos" className={`${navLinkClass} text-accent-orange! hover:brightness-110`}>Reservar turno online</Link></li>
            </ul>
          </div>

          {/* COLUMNA 3: Contacto */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-sm font-black tracking-widest text-primary uppercase">Contacto</h3>
            <ul className="space-y-3 flex flex-col items-center md:items-start text-primary/80 text-sm font-medium">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-accent-orange shrink-0 text-lg mt-0.5" />
                <span>Calle Jose Rondeau 827,<br />San Miguel de Tucumán</span>
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp className="text-green-600 shrink-0 text-xl" />
                <a href="https://wa.me/5493816242482" target="_blank" rel="noopener noreferrer" className="hover:text-accent-orange transition-colors font-bold">
                  +54 9 381 624-2482
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaInstagram className="text-pink-600 shrink-0 text-xl" />
                <a href="https://www.instagram.com/c.o_carcaramartinez/" target="_blank" rel="noopener noreferrer" className="hover:text-accent-orange transition-colors font-bold">
                  @c.o_carcaramartinez
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="mt-12 pt-6 border-t border-primary/10 flex flex-col items-center space-y-2">
          <p className="text-xs text-primary/50 tracking-wide text-center font-bold">
            &copy; {new Date().getFullYear()} Gonzalo Martinez. Todos los derechos reservados.
          </p>
          <Link to="/login" className="text-primary/30 text-[10px] hover:text-accent-orange transition-colors font-bold uppercase tracking-widest">
            Acceso Administrativo
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
