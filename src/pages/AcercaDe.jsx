const AcercaDe = () => {
  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-4 lg:px-0 space-y-10">
        <header className="space-y-3 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            Sobre nuestro centro odontológico
          </h1>
          <p className="text-text/80 text-base md:text-lg">
            Somos un equipo de profesionales apasionados por la salud bucal,
            que combina experiencia clínica, tecnología moderna y un enfoque
            humano para acompañarte en cada etapa del tratamiento.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-[1.4fr,1fr]">
          <div className="space-y-6">
            <div className="rounded-2xl bg-white shadow-md p-6 space-y-3">
              <h2 className="text-xl font-semibold text-text">
                Filosofía de trabajo
              </h2>
              <p className="text-sm text-text/80">
                Creemos que una sonrisa sana se construye a partir de la
                confianza. Por eso dedicamos el tiempo necesario a escuchar tus
                necesidades, explicar cada paso del tratamiento y ofrecer
                alternativas claras y personalizadas.
              </p>
              <p className="text-sm text-text/80">
                Trabajamos con protocolos de bioseguridad actualizados y
                equipamiento digital que nos permite realizar diagnósticos
                precisos y tratamientos mínimamente invasivos.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3 text-sm text-text/80">
              <div className="rounded-2xl bg-white shadow-sm p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary/80">
                  Especialidades
                </p>
                <ul className="mt-2 space-y-1">
                  <li>Odontología general</li>
                  <li>Estética dental</li>
                  <li>Ortodoncia</li>
                  <li>Implantología</li>
                </ul>
              </div>
              <div className="rounded-2xl bg-white shadow-sm p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary/80">
                  Pacientes
                </p>
                <ul className="mt-2 space-y-1">
                  <li>Adultos y adolescentes</li>
                  <li>Odontopediatría</li>
                  <li>Pacientes ansiosos</li>
                  <li>Seguimiento personalizado</li>
                </ul>
              </div>
              <div className="rounded-2xl bg-white shadow-sm p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary/80">
                  Compromiso
                </p>
                <ul className="mt-2 space-y-1">
                  <li>Turnos puntuales</li>
                  <li>Comunicación clara</li>
                  <li>Planificación a medida</li>
                  <li>Educación en prevención</li>
                </ul>
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl bg-white shadow-md p-6 text-sm text-text/85 space-y-3">
              <h2 className="text-lg font-semibold text-text">
                Instalaciones pensadas para vos
              </h2>
              <p>
                Consultorios amplios, climatizados y equipados con sillones
                ergonómicos, iluminación adecuada y música ambiental suave para
                que tu experiencia sea lo más cómoda posible.
              </p>
              <p>
                Contamos con sala de espera confortable, esterilización central
                y sector de diagnóstico por imágenes.
              </p>
            </div>

            <div className="rounded-3xl bg-secondary/80 border border-secondary/70 p-5 text-xs text-text/80">
              <p className="font-semibold text-primary mb-1">
                ¿Tenés dudas sobre un tratamiento?
              </p>
              <p>
                Podés agendar una consulta informativa donde evaluaremos tu
                caso, revisaremos estudios previos y te orientaremos sobre el
                plan más adecuado.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default AcercaDe;