import { Link } from "react-router-dom";

const direccion = "Av. Siempre Viva 123, Barrio Centro, Ciudad";
const mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(direccion)}&output=embed`;

const iconMap = {
  direccion: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  telefono: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  email: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  horario: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  llegar: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  ),
  turno: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
};

const items = [
  {
    id: "direccion",
    icon: iconMap.direccion,
    title: "Dirección",
    content: direccion,
    bg: "bg-primary/10",
    border: "border-primary/30",
    text: "text-primary",
  },
  {
    id: "telefono",
    icon: iconMap.telefono,
    title: "Teléfonos",
    content: "Recepción: +54 11 1234-5678 · WhatsApp: +54 9 11 9876-5432",
    bg: "bg-accent/10",
    border: "border-accent/30",
    text: "text-accent",
  },
  {
    id: "email",
    icon: iconMap.email,
    title: "Correo electrónico",
    content: "turnos@centrodental.com",
    bg: "bg-secondary",
    border: "border-secondary/80",
    text: "text-primary",
  },
  {
    id: "horario",
    icon: iconMap.horario,
    title: "Horarios de atención",
    content: "Lunes a Viernes: 9:00 a 19:00 hs · Sábados: 9:00 a 13:00 hs",
    bg: "bg-primary/5",
    border: "border-primary/20",
    text: "text-primary",
  },
  {
    id: "llegar",
    icon: iconMap.llegar,
    title: "Cómo llegar",
    content: "Colectivos 10, 25, 60. Subte Línea B, estación Centro. Estacionamiento a menos de 200 m.",
    bg: "bg-secondary/80",
    border: "border-secondary/70",
    text: "text-text",
  },
  {
    id: "turno",
    icon: iconMap.turno,
    title: "Solicitar turno",
    content: "Reservá tu cita online o por WhatsApp.",
    bg: "bg-primary",
    border: "border-primary",
    text: "text-white",
    link: "/turnos",
  },
];

const Contacto = () => {
  return (
    <section className="py-10 sm:py-14 md:py-16">
      <div className="mx-auto max-w-5xl space-y-10 px-4 lg:px-0">
        <header className="max-w-3xl space-y-3">
          <h1 className="text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
            Contacto — Martínez Cárcara
          </h1>
          <p className="text-sm text-text/80 sm:text-base md:text-lg">
            Datos del consultorio, cómo llegar y cómo solicitar turno.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Wrapper = item.link ? Link : "div";
            const wrapperProps = item.link ? { to: item.link } : {};
            return (
              <Wrapper
                key={item.id}
                {...wrapperProps}
                className={`flex flex-col rounded-2xl border p-5 transition hover:shadow-lg ${item.bg} ${item.border} ${item.link ? "min-h-[44px]" : ""}`}
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.text}`}>
                  {item.icon}
                </div>
                <h2 className={`mt-3 text-sm font-semibold uppercase tracking-wide ${item.link ? "text-white" : "text-text"}`}>
                  {item.title}
                </h2>
                <p className={`mt-1 text-sm ${item.link ? "text-white/90" : "text-text/85"}`}>
                  {item.content}
                </p>
                {item.link && (
                  <span className="mt-3 inline-block text-xs font-semibold uppercase tracking-wide text-white underline">
                    Ir a reservar →
                  </span>
                )}
              </Wrapper>
            );
          })}
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-md">
          <h2 className="text-lg font-semibold text-text">Ubicación en el mapa</h2>
          <p className="mt-1 text-sm text-text/70">{direccion}</p>
          <div className="mt-3 aspect-video w-full overflow-hidden rounded-xl bg-secondary/60">
            <iframe
              title="Ubicación Martínez Cárcara"
              src={mapsUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="min-h-[220px] sm:min-h-[280px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacto;
