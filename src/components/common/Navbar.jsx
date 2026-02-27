import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext.jsx"; 
import BrandLogo from "../BrandLogo.jsx";


const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate("/");
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled 
          ? "bg-background/95 shadow-md border-secondary/50 backdrop-blur-sm" 
          : "bg-background border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        {/* LADO IZQUIERDO: El nuevo logo compuesto y el nombre */}
        <Link to="/" className="shrink-0 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-1">
          <BrandLogo />
        </Link>

        {/* CENTRO: Menú Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-[1.05rem] font-medium text-text-light hover:text-primary transition-colors">Inicio</Link>
          <Link to="/acerca" className="text-[1.05rem] font-medium text-text-light hover:text-primary transition-colors">Acerca de nosotros</Link>
          <Link to="/contacto" className="text-[1.05rem] font-medium text-text-light hover:text-primary transition-colors">Contacto</Link>
        </div>

        {/* LADO DERECHO: Botones Desktop + Menú Hamburguesa Móvil */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3" ref={userMenuRef}>
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-primary/20 bg-white text-primary hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                {/* Menú Desplegable Usuario */}
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-secondary bg-white p-4 shadow-xl">
                    <p className="text-sm font-semibold uppercase text-primary">Mi cuenta</p>
                    <p className="mt-1 font-bold text-text text-lg">{user.nombre} {user.apellido}</p>
                    <p className="text-sm text-text-light">{user.email}</p>
                    <button
                      onClick={handleLogout}
                      className="mt-4 w-full rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 hover:bg-red-100 transition-colors"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex h-11 items-center justify-center rounded-lg border-2 border-primary bg-transparent px-5 font-semibold text-primary hover:bg-primary hover:text-white transition-all"
              >
                Iniciar sesión
              </Link>
            )}

            {/* El botón de reserva ahora usa el nuevo naranja de marca */}
            <Link
              to="/turnos"
              className="flex h-11 items-center justify-center rounded-lg bg-accent-orange px-6 font-bold text-text shadow-sm hover:brightness-110 transition-all"
            >
              Reservar turno
            </Link>
          </div>

          {/* Botón Hamburguesa (MÓVIL SOLAMENTE) */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Menú principal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Menú Desplegable Móvil */}
      {menuOpen && (
        <div className="md:hidden border-t border-secondary bg-background shadow-lg">
          <div className="flex flex-col px-4 py-4 space-y-2">
            <Link to="/" className="block rounded-lg px-4 py-3 text-lg font-medium text-text hover:bg-secondary" onClick={() => setMenuOpen(false)}>Inicio</Link>
            <Link to="/acerca" className="block rounded-lg px-4 py-3 text-lg font-medium text-text hover:bg-secondary" onClick={() => setMenuOpen(false)}>Acerca de nosotros</Link>
            <Link to="/contacto" className="block rounded-lg px-4 py-3 text-lg font-medium text-text hover:bg-secondary" onClick={() => setMenuOpen(false)}>Contacto</Link>
            
            <div className="h-px w-full bg-secondary my-2"></div>
            
            {/* Acciones en Móvil */}
            {user ? (
               <button onClick={handleLogout} className="block w-full text-left rounded-lg px-4 py-3 text-lg font-medium text-red-600 hover:bg-red-50">Cerrar sesión ({user.nombre})</button>
            ) : (
              <Link to="/login" className="block rounded-lg px-4 py-3 text-lg font-medium text-primary hover:bg-secondary" onClick={() => setMenuOpen(false)}>Iniciar sesión</Link>
            )}
            
            {/* Botón de reserva en móvil con naranja de marca */}
            <Link to="/turnos" className="block rounded-lg bg-accent-orange px-4 py-4 text-center text-lg font-bold text-text shadow-sm" onClick={() => setMenuOpen(false)}>
              Reservar turno
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;