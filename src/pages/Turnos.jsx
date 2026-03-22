import { Link } from "react-router-dom";
import AppointmentForm from "../components/appointments/AppointmentForm.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Turnos = () => {
  const { user } = useAuth();

  return (
    <main className="grow bg-background flex flex-col">
      <section className="bg-primary text-background pt-10 pb-20 lg:pt-16 lg:pb-32 px-4 sm:px-6 lg:px-8 border-b-8 border-accent-orange relative overflow-hidden flex-1 sm:min-h-[calc(100vh-80px)]">
        {/* Decoración de fondo */}
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none bg-[radial-gradient(circle_at_top_right,white,transparent_50%)]"></div>

        <div className="mx-auto max-w-7xl w-full relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">

            {/* Lado Izquierdo: Título y descripción */}
            <div className="w-full lg:w-5/12 space-y-6 text-center lg:text-left" data-aos="fade-right">
              <span className="inline-block px-4 py-1.5 rounded-full border border-accent-orange text-accent-orange font-bold text-xs uppercase tracking-wider shadow-sm">
                Agendá tu Visita
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-none">
                Reservá <span className="text-accent-orange">tu Turno</span>
              </h1>
              <p className="text-base sm:text-lg text-secondary/90 font-medium leading-relaxed max-w-2xl mx-auto">
                Elegí el profesional, contanos el motivo de tu consulta y nuestro equipo administrativo coordinará el mejor horario disponible para tu atención.
              </p>

              {!user && (
                <div className="mt-8 rounded-2xl border border-accent-orange/30 bg-white/10 backdrop-blur-md px-6 py-5 text-sm text-secondary shadow-lg">
                  <div className="flex items-start gap-3">
                    <div className="bg-accent-orange/20 p-2 rounded-full text-accent-orange shrink-0 mt-0.5">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                      <span className="block font-bold text-white mb-1">¿Ya tenés cuenta?</span>
                      <span className="text-white/80">Iniciá sesión para que tu turno quede asociado a tu perfil interactivo.</span>
                      <div className="mt-3">
                        <Link to="/login" className="font-bold text-accent-orange hover:text-white transition-all duration-300 hover:-translate-y-1 active:scale-95 inline-block border-b border-accent-orange hover:border-white pb-0.5">
                          Iniciar sesión ahora &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Separador vertical sutil */}
            <div className="hidden lg:block w-px h-80 bg-secondary/20 shrink-0"></div>

            {/* Lado Derecho: Appointment Form (Tarjeta Gris Más Oscura) */}
            <div className="w-full lg:w-6/12 relative mx-auto lg:mx-0" data-aos="fade-left">
              <div className="rounded-3xl border border-secondary/30 bg-gray-200 p-6 sm:p-10 shadow-2xl relative z-10">
                <div className="mb-6 border-b border-secondary/30 pb-4">
                  <h2 className="text-2xl font-black text-primary uppercase tracking-tight">Solicitud Online</h2>
                  <p className="text-sm font-medium text-text-light mt-1">Completa los datos detallando tu motivo de consulta.</p>
                </div>

                {/* Formulario inyectado (El componente AppointmentForm se encarga del renderizado interno) */}
                <div className="[&>form]:space-y-4">
                  <AppointmentForm />
                </div>

                <div className="mt-8 pt-6 border-t border-secondary/30 flex items-start gap-3">
                  <div className="bg-primary/10 p-1.5 rounded-full text-primary shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <p className="text-xs font-semibold text-text-light/90 leading-snug">
                    Una vez enviado, un miembro de administración se contactará con vos para confirmar fecha y horario exacto.
                  </p>
                </div>
              </div>

              {/* Elementos decorativos flotantes de la tarjeta */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent-orange rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default Turnos;