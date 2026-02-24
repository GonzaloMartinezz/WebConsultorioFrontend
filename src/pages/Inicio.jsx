import { Link } from "react-router-dom";

const Inicio = () => {
  return (
    <section className="relative overflow-hidden py-8 sm:py-12 md:py-16">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-background via-secondary/60 to-background" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="mx-auto max-w-6xl space-y-10 px-4 lg:px-0">
        {/* Hero: Sonrisas sanas */}
        <div className="space-y-6 text-center md:mt-4 md:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">
            Martínez Cárcara
          </p>
          <h1 className="text-3xl font-extrabold leading-tight text-text sm:text-4xl md:text-5xl lg:text-6xl">
            Sonrisas sanas,
            <br />
            <span className="text-primary">atención cálida y profesional</span>.
          </h1>
          <p className="mx-auto max-w-xl text-base text-text/80 md:mx-0 md:text-lg">
            Somos un centro odontológico especializado en prevención, estética y
            rehabilitación oral. Tecnología de última generación y equipo
            dedicado a tu bienestar.
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:justify-start">
            <Link
              to="/turnos"
              className="min-h-[48px] rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-md transition hover:-translate-y-0.5 hover:bg-accent hover:shadow-xl sm:px-8 sm:py-3 md:text-base"
            >
              Solicitar turno online
            </Link>
            <Link
              to="/contacto"
              className="min-h-[48px] rounded-full border border-primary/40 bg-white/80 px-6 py-3 text-sm font-semibold text-primary shadow-sm transition hover:-translate-y-0.5 hover:border-primary hover:bg-white sm:px-8 md:text-base"
            >
              Ver horarios y contacto
            </Link>
            <Link
              to="/acerca"
              className="min-h-[48px] rounded-full border border-secondary bg-secondary/80 px-6 py-3 text-sm font-semibold text-text shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 sm:px-8 md:text-base"
            >
              Conocé más
            </Link>
          </div>
        </div>

        {/* Tu próxima consulta: botón/card más ancho y grande */}
        <div className="mx-auto w-full max-w-4xl">
          <Link
            to="/turnos"
            className="block rounded-3xl border-2 border-primary/30 bg-white p-6 shadow-xl transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl sm:p-8 md:p-10"
          >
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary/80">
                  Tu próxima consulta
                </p>
                <p className="mt-1 text-xl font-extrabold text-black sm:text-2xl md:text-3xl">
                  Martínez Cárcara — Centro Odontológico
                </p>
                <p className="mt-2 text-sm text-text/80">
                  Turnos por WhatsApp y web. Primera consulta de evaluación y plan a tu medida.
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-md sm:px-8 sm:py-4 sm:text-base">
                Reservar turno
              </span>
            </div>
          </Link>
        </div>

        {/* Tres ítems: Tecnología, Equipo, Experiencia */}
        <div className="grid gap-4 pt-4 text-sm text-text/80 sm:grid-cols-2 md:grid-cols-3">
          <Link
            to="/acerca"
            className="rounded-3xl bg-white/95 p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-primary/80">Tecnología</p>
            <p className="mt-2 text-lg font-semibold text-text">Equipamiento digital</p>
            <p className="mt-2 text-xs">
              Radiografías digitales, scanner intraoral y diagnóstico preciso.
            </p>
          </Link>
          <Link
            to="/acerca"
            className="rounded-3xl bg-white/95 p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-primary/80">Equipo</p>
            <p className="mt-2 text-lg font-semibold text-text">Especialistas por área</p>
            <p className="mt-2 text-xs">
              Odontología general, ortodoncia, implantes y estética dental.
            </p>
          </Link>
          <Link
            to="/turnos"
            className="rounded-3xl bg-white/95 p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl sm:col-span-2 md:col-span-1"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-primary/80">Experiencia</p>
            <p className="mt-2 text-lg font-semibold text-text">Atención personalizada</p>
            <p className="mt-2 text-xs">
              Turnos puntuales, seguimiento y acompañamiento en cada etapa.
            </p>
          </Link>
        </div>

        {/* Mapa + imágenes del consultorio */}
        <div className="grid gap-6 pt-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-4 shadow-md">
            <h2 className="text-lg font-semibold text-text">Ubicación</h2>
            <p className="mt-1 text-sm text-text/70">Av. Siempre Viva 123, Barrio Centro</p>
            <div className="mt-3 aspect-video w-full overflow-hidden rounded-xl bg-secondary/60">
              <iframe
                title="Ubicación Martínez Cárcara"
                src={`https://www.google.com/maps?q=${encodeURIComponent("Av. Siempre Viva 123, Barrio Centro")}&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="min-h-[200px] sm:min-h-[260px]"
              />
            </div>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-md">
            <h2 className="text-lg font-semibold text-text">Nuestro consultorio</h2>
            <p className="mt-1 text-sm text-text/70">Instalaciones y atención</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="aspect-square overflow-hidden rounded-xl bg-secondary/70" />
              <div className="aspect-square overflow-hidden rounded-xl bg-secondary/70" />
              <div className="aspect-square overflow-hidden rounded-xl bg-secondary/70" />
            </div>
            <p className="mt-2 text-xs text-text/60">
              Podés agregar fotos del consultorio en <code className="rounded bg-secondary/60 px-1">public/</code> y enlazarlas aquí.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Inicio;
