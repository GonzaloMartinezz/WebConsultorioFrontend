import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
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
      className={`sticky top-0 z-20 border-b border-secondary/70 backdrop-blur-md transition-all ${
        scrolled ? "bg-white/90 shadow-md" : "bg-white/70"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:px-4 lg:px-0">
        <Link to="/" className="flex min-h-[44px] min-w-[44px] shrink-0 items-center gap-2 sm:gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-primary shadow-md">
            {!logoError ? (
              <img
                src="/logo.png"
                alt="Martínez Cárcara"
                className="h-full w-full object-cover"
                onError={() => setLogoError(true)}
              />
            ) : (
              <span className="text-lg font-bold text-white">MC</span>
            )}
          </div>
          <span className="text-base font-bold text-black sm:text-lg">
            Martínez Cárcara
          </span>
        </Link>

        {/* Menú desktop */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-secondary/80 bg-secondary/60 px-4 py-1 text-sm font-medium text-black md:flex">
          <Link to="/" className="rounded-full px-3 py-1.5 transition hover:bg-white hover:text-primary">
            Inicio
          </Link>
          <Link to="/acerca" className="rounded-full px-3 py-1.5 transition hover:bg-white hover:text-primary">
            Acerca de nosotros
          </Link>
          <Link to="/contacto" className="rounded-full px-3 py-1.5 transition hover:bg-white hover:text-primary">
            Contacto
          </Link>
        </div>

        {/* Menú móvil: hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-secondary/80 bg-white text-black"
            aria-label="Abrir menú"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Dropdown móvil */}
        {menuOpen && (
          <div className="absolute left-0 right-0 top-full z-30 border-b border-secondary/70 bg-white/95 shadow-lg backdrop-blur md:hidden">
            <div className="flex flex-col gap-1 px-4 py-3">
              <Link to="/" className="rounded-xl px-4 py-3 text-black hover:bg-secondary/60" onClick={() => setMenuOpen(false)}>Inicio</Link>
              <Link to="/acerca" className="rounded-xl px-4 py-3 text-black hover:bg-secondary/60" onClick={() => setMenuOpen(false)}>Acerca de nosotros</Link>
              <Link to="/contacto" className="rounded-xl px-4 py-3 text-black hover:bg-secondary/60" onClick={() => setMenuOpen(false)}>Contacto</Link>
              <Link to="/turnos" className="rounded-xl bg-primary px-4 py-3 text-center font-semibold text-white" onClick={() => setMenuOpen(false)}>Reservar turno</Link>
            </div>
          </div>
        )}

        {/* Derecha: Instagram, usuario, reservar (oculto en móvil si hay hamburger) */}
        <div className="relative flex items-center gap-2" ref={userMenuRef}>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-secondary/80 bg-white text-primary transition hover:border-primary sm:flex md:h-10 md:w-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 md:h-5 md:w-5" fill="currentColor">
              <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm0 2h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm10 1a1 1 0 100 2 1 1 0 000-2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
            </svg>
          </a>

          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-primary/40 bg-white text-primary shadow-sm transition hover:border-primary hover:bg-secondary/80"
                aria-label="Menú de usuario"
                aria-expanded={userMenuOpen}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-full z-40 mt-2 w-64 rounded-2xl border border-secondary/80 bg-white p-4 shadow-xl">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary/80">Mi cuenta</p>
                  <p className="mt-1 font-medium text-black">{user.nombre}</p>
                  <p className="text-sm text-text/80">{user.apellido}</p>
                  <p className="mt-1 break-all text-sm text-text/80">{user.email}</p>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-4 w-full rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-primary/40 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary shadow-sm transition hover:border-primary hover:bg-secondary/80 sm:min-h-0 sm:min-w-0"
            >
              Iniciar sesión
            </Link>
          )}

          <Link
            to="/turnos"
            className="rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-md transition hover:bg-accent min-h-[44px] min-w-[44px] flex items-center justify-center sm:min-h-0 sm:min-w-0 md:text-sm"
          >
            Reservar turno
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
