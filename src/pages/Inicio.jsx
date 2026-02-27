import { Link } from "react-router-dom";
// Importamos el nuevo componente que creamos
import BannerPlanes from "../components/BannerPlanes";

const Inicio = () => {
  return (
    <main className="flex-grow bg-background">
      
      {/* 1. Nuestro Hero Principal */}
      <BannerPlanes />

      {/* 2. Sección de Contenido Inferior */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
        
        {/* Banner Call to Action: Tu próxima consulta */}
        <div className="mx-auto w-full max-w-5xl">
          <Link
            to="/turnos"
            className="block rounded-3xl border-2 border-secondary bg-background p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-accent-orange hover:shadow-2xl sm:p-10"
          >
            <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
              <div className="space-y-2">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent-orange">
                  Tu próxima consulta
                </p>
                <p className="text-2xl font-extrabold text-text sm:text-3xl">
                  Carcara • Martínez
                </p>
                <p className="text-base text-text-light max-w-2xl">
                  Reserva tu turno de forma rápida. Primera consulta de evaluación y plan de tratamiento a tu medida.
                </p>
              </div>
              {/* Botón de reserva con naranja de marca */}
              <span className="shrink-0 rounded-xl bg-accent-orange px-8 py-4 text-lg font-bold text-text shadow-md transition-all hover:brightness-110">
                Reservar turno
              </span>
            </div>
          </Link>
        </div>

        {/* Tres ítems: Tecnología, Equipo, Experiencia */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <Link
            to="/acerca"
            className="rounded-3xl border border-secondary bg-background p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-accent-orange hover:shadow-md"
          >
            <p className="text-sm font-bold uppercase tracking-wide text-accent-orange">Tecnología</p>
            <p className="mt-3 text-xl font-bold text-text">Equipamiento Digital</p>
            <p className="mt-3 text-base text-text-light leading-relaxed">
              Radiografías digitales, scanner intraoral y diagnóstico preciso para tu tranquilidad.
            </p>
          </Link>
          
          <Link
            to="/acerca"
            className="rounded-3xl border border-secondary bg-background p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-accent-orange hover:shadow-md"
          >
            <p className="text-sm font-bold uppercase tracking-wide text-accent-orange">Equipo</p>
            <p className="mt-3 text-xl font-bold text-text">Especialistas</p>
            <p className="mt-3 text-base text-text-light leading-relaxed">
              Profesionales en odontología general, ortodoncia, implantes y estética dental.
            </p>
          </Link>
          
          <Link
            to="/turnos"
            className="rounded-3xl border border-secondary bg-background p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-accent-orange hover:shadow-md sm:col-span-2 md:col-span-1"
          >
            <p className="text-sm font-bold uppercase tracking-wide text-accent-orange">Experiencia</p>
            <p className="mt-3 text-xl font-bold text-text">Atención Personalizada</p>
            <p className="mt-3 text-base text-text-light leading-relaxed">
              Turnos puntuales, seguimiento constante y acompañamiento en cada etapa.
            </p>
          </Link>
        </div>

        {/* Mapa + Imágenes del consultorio */}
        <div className="grid gap-8 pt-8 lg:grid-cols-2 border-t border-secondary">
          
          {/* Ubicación */}
          <div className="rounded-3xl bg-background p-6 md:p-8 shadow-sm border border-secondary">
            <h2 className="text-2xl font-bold text-text">Ubicación</h2>
            <p className="mt-2 text-base text-text-light">Jose Rondeau 827, San Miguel de Tucumán, Tucumán - Argentina</p>
            <div className="mt-6 aspect-video w-full overflow-hidden rounded-2xl bg-secondary">
              <iframe
                title="Ubicación Consultorio"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3314.2988621324735!2d-65.214817624761!3d-26.840774090201524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c0b729d4c01%3A0xa6091282060aeee6!2sJos%C3%A9%20Rondeau%20827%2C%20T4000%20San%20Miguel%20de%20Tucum%C3%A1n%2C%20Tucum%C3%A1n!5e1!3m2!1ses-419!2sar!4v1772226166856!5m2!1ses-419!2sar"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="min-h-62.5"
              />
            </div>
          </div>

          {/* Galería Rápida - Usaremos el greige para los marcadores de posición */}
          <div className="rounded-3xl bg-background p-6 md:p-8 shadow-sm border border-secondary flex flex-col">
            <h2 className="text-2xl font-bold text-text">Nuestras Instalaciones</h2>
            <p className="mt-2 text-base text-text-light">Conoce tu próximo lugar de cuidado</p>
            <div className="mt-6 grid grid-cols-2 gap-4 grow">
              <div className="rounded-2xl bg-secondary/80 flex items-center justify-center text-primary/50 text-sm font-medium">
                Foto Sala
              </div>
              <div className="rounded-2xl bg-secondary/80 flex items-center justify-center text-primary/50 text-sm font-medium">
                Foto Consultorio
              </div>
              <div className="rounded-2xl bg-secondary/80 flex items-center justify-center text-primary/50 text-sm font-medium col-span-2">
                Foto Recepción
              </div>
            </div>
          </div>
          
        </div>
      </section>
    </main>
  );
};

export default Inicio;