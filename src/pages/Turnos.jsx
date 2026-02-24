import { Link } from "react-router-dom";
import AppointmentForm from "../components/appointments/AppointmentForm.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Turnos = () => {
  const { user } = useAuth();

  return (
    <section className="relative py-10 sm:py-14 md:py-16">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-background via-secondary/60 to-background" />

      <div className="max-w-5xl mx-auto px-4 lg:px-0 space-y-10">
        {!user && (
          <div className="rounded-2xl border border-primary/30 bg-secondary/80 px-4 py-3 text-sm text-text/90">
            <span>Iniciá sesión para que tu turno quede asociado a tu cuenta. </span>
            <Link to="/login" className="font-semibold text-primary hover:underline">
              Iniciar sesión
            </Link>
          </div>
        )}
        <header className="max-w-2xl space-y-3">
          <h1 className="text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
            Reservá tu turno — Martínez Cárcara
          </h1>
          <p className="text-text/80">
            Elegí el profesional, contanos el motivo de tu consulta y nuestro
            equipo administrativo se encargará de coordinar la mejor fecha y
            horario disponible para vos.
          </p>
        </header>

        <AppointmentForm />

        <p className="text-xs text-text/70 text-center md:text-left">
          Una vez enviado el formulario, un administrador revisará tu solicitud
          y te confirmará el turno por teléfono o correo electrónico.
        </p>
      </div>
    </section>
  );
};

export default Turnos;