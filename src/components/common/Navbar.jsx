import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>Centro Odontológico</h2>

      <div className="nav-links">
        <Link to="/">Inicio</Link>
        <Link to="/turnos">Turnos</Link>
        <Link to="/acerca">Acerca</Link>
        <Link to="/contacto">Contacto</Link>
      </div>
    </nav>
  );
};

export default Navbar;