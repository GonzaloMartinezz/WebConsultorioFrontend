import { Link } from 'react-router-dom';

const AcercaDe = () => {
  return (
    <main className="grow bg-background flex flex-col gap-24 pb-24 overflow-hidden relative">

      {/* ======================================================== */}
      {/* SECCIÓN 1: FILOSOFÍA (Bloque Dividido Premium - bg-primary) */}
      {/* ======================================================== */}
      <section className="bg-primary text-background py-20 lg:py-32 px-4 sm:px-6 lg:px-8 border-b-8 border-accent-orange relative">
        {/* Fondo decorativo radial oscuro */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[radial-gradient(circle_at_top_left,white,transparent_50%)]"></div>

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

            {/* Lado Izquierdo: Título y descripción */}
            <div className="w-full lg:w-5/12 space-y-6 text-center lg:text-left" data-aos="fade-right">
              <span className="inline-block px-4 py-1.5 rounded-full border border-accent-orange text-accent-orange font-bold text-xs uppercase tracking-wider">
                Nuestra Esencia
              </span>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                La Sonrisa <br />
                <span className="text-accent-orange">Comienza Aquí</span>
              </h1>
              <p className="text-base md:text-lg text-secondary/90 font-medium leading-relaxed max-w-md mx-auto lg:mx-0">
                Somos un equipo apasionado que combina experiencia clínica, tecnología moderna y un enfoque humano para acompañarte en cada etapa de tu tratamiento bucal.
              </p>
            </div>

            {/* Separador vertical sutil en PC */}
            <div className="hidden lg:block w-px h-64 bg-secondary/20 shrink-0"></div>

            {/* Lado Derecho: Filosofía y Foto de Recepción Flotante */}
            <div className="w-full lg:w-6/12 relative space-y-8 bg-background/5 p-8 rounded-3xl border border-secondary/10 backdrop-blur-sm" data-aos="fade-left" data-aos-delay="200">
              <h3 className="text-2xl font-bold tracking-tight text-white/95">Filosofía de trabajo</h3>
              <p className="text-secondary/90 font-medium text-base md:text-lg leading-relaxed whitespace-pre-line">
                Creemos que una sonrisa sana se construye a partir de la confianza. Por eso dedicamos el tiempo necesario a escuchar tus necesidades, explicar cada paso y ofrecer alternativas claras y personalizadas.
              </p>

              {/* ======================================================== */}
              {/* FOTO FILOSOFÍA: /logo escritorio.jpg Flotante */}
              {/* ======================================================== */}
              <div className="absolute -bottom-30 -right-1 w-50 h-50 rounded-4xl overflow-hidden shadow-2xl border-5 border-background rotate-3 hidden md:block z-10 hover:rotate-0 transition-transform duration-300">
                <img src="/Logo Principal marron 2.png" alt="Filosofía Carcara Martínez" className="w-full h-full object-cover" />
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ======================================================== */}
      {/* SECCIÓN 2: EL EQUIPO (Grilla Moderna - bg-white) */}
      {/* ======================================================== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center">

          {/* Lado Izquierdo: Foto de Escritorio (escritorio 2.jpeg) */}
          <div className="w-full lg:w-1/2 relative h-[300px] md:h-[500px] rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white" data-aos="fade-right">
            <img src="/sala de espera 2.jpeg" alt="Área de consulta Carcara Martínez" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent"></div>
          </div>

          {/* Lado Derecho: Los Doctores y Especialidades */}
          <div className="w-full lg:w-1/2 space-y-12" data-aos="fade-left" data-aos-delay="200">
            <div className="text-center lg:text-left space-y-4">
              {/* ======================================================== */}
              {/* LOGO PRINCIPAL: /Logo Principal.png (Pequeño junto al título) */}
              {/* ======================================================== */}
              <h2 className="text-3xl md:text-4xl lg:text-4xl font-black text-text uppercase leading-tight tracking-tight">
                El Equipo <br /> <span className="text-accent-orange">Carcara & Martínez</span>
              </h2>
              <p className="text-base md:text-lg text-text-light font-medium max-w-xl mx-auto lg:mx-0">
                Profesionales con amplia trayectoria, dedicados a ofrecerte diagnósticos precisos y tratamientos mínimamente invasivos.
              </p>
            </div>

            {/* Grilla de Doctores */}
            <div className="flex flex-col sm:flex-row gap-6 pt-8 border-t border-secondary justify-center lg:justify-start">
              {/* Tarjeta Dr. Adolfo */}
              <div className="bg-white rounded-[2re m] p-10 shadow-[0_15px_40px_rgba(0,0,0,0.1)] w-full sm:w-[280px]  hover:-translate-y-2 transition-transform duration-300 border-5  border-accent-orange border-x border-t border-x-secondary/20 border-t-secondary/20">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center text-4xl shadow-inner border border-secondary/20">
                    👨‍⚕️
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-text leading-tight">Dr. Adolfo <br /> Martínez</h4>
                    <p className="text-[11px] font-black text-accent-orange uppercase tracking-widest mt-3">Odontología General</p>
                    <p className="text-xs font-medium text-text-light mt-1 w-full border-t border-gray-100 pt-2">Area de Implantologia</p>
                  </div>
                </div>
              </div>

              {/* Tarjeta Dra. Erina */}
              <div className="bg-white rounded-4xl p-10 shadow-[0_15px_40px_rgba(0,0,0,0.1)] w-full sm:w-[280px]  hover:-translate-y-2 transition-transform duration-300 border-b-5 border-accent-orange border-x border-t border-x-secondary/20 border-t-secondary/20">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center text-4xl shadow-inner border border-secondary/20">
                    👩‍⚕️
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-text leading-tight">Dra. Erina <br /> Carcara</h4>
                    <p className="text-[11px] font-black text-accent-orange uppercase tracking-widest mt-3">Estética Dental</p>
                    <p className="text-xs font-medium text-text-light mt-1 w-full border-t border-gray-100 pt-2">Ortodoncia y Estética</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ======================================================== */}
      {/* SECCIÓN 3: INSTALACIONES PREMIUM (GRILLA DE 3 - bg-white) */}
      {/* Inspirado en references profesionales densas */}
      {/* ======================================================== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-10 md:py-16 bg-white rounded-3xl md:rounded-[2.5rem] shadow-sm border border-secondary/50">
        <div className="text-center mb-10 md:mb-16 space-y-3" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase text-text leading-tight tracking-tight">
            Nuestras <span className="text-accent-orange">Instalaciones</span>
          </h2>
          <p className="text-base md:text-lg text-text-light font-medium max-w-2xl mx-auto leading-relaxed">
            Consultorios amplios, climatizados y equipados con tecnología de vanguardia para que tu experiencia sea lo más cómoda, segura y eficiente posible.
          </p>
        </div>

        {/* Grilla de 3 columnas para máquinas adolfo 1, 2, 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Maquinas Adolfo 1 - Impresora 3D */}
          <div className="relative rounded-2xl overflow-hidden h-[250px] md:h-[300px] shadow-lg group" data-aos="fade-up">
            {/* OJO: DNG converted to jpg assumed */}
            <img src="/maquinas adolfo 1.jpg" alt="Impresora 3D Odontológica" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent p-6 flex flex-col justify-end">
              <h3 className="text-xl font-bold text-white uppercase tracking-tight">Precisión Digital</h3>
            </div>
          </div>

          {/* Maquinas Adolfo 2jpg.jpg - CEREC/Fresadora */}
          <div className="relative rounded-2xl overflow-hidden h-[250px] md:h-[300px] shadow-lg group" data-aos="fade-up" data-aos-delay="100">
            <img src="/maquinas adolfo 2.jpg" alt="Laboratorio Digital CEREC" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent p-6 flex flex-col justify-end">
              <h3 className="text-xl font-bold text-white uppercase tracking-tight">Diseño CAD/CAM</h3>
            </div>
          </div>

          {/* Maquinas Adolfo 3.jpg - Equipamiento laboratorio */}
          <div className="relative rounded-2xl overflow-hidden h-[250px] md:h-[300px] shadow-lg group" data-aos="fade-up" data-aos-delay="200">
            <img src="/maquinas adolfo 3.jpeg" alt="Equipamiento de vanguardia" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent p-6 flex flex-col justify-end">
              <h3 className="text-xl font-bold text-white uppercase tracking-tight">Tecnología Sirona</h3>
            </div>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* SECCIÓN 4: TECNOLOGÍA Y CONFORT (GRILLA DE 2 - bg-background) */}
      {/* ======================================================== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-10 md:py-16">
        <div className="text-center mb-10 md:mb-16 space-y-3" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase text-text leading-tight tracking-tight">
            Tecnología y <span className="text-accent-orange">Confort</span>
          </h2>
          <p className="text-base md:text-lg text-text-light font-medium max-w-2xl mx-auto leading-relaxed">
            Invertimos en tecnología de vanguardia para diagnósticos inmediatos y diseñamos espacios para tu total relajación, asegurando tratamientos rápidos y sin dolor.
          </p>
        </div>

        {/* Grilla de 2 columnas para maquinas adolfo 4, 5 (Radiología y Sillón) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Maquinas Adolfo 4.jpg - Rayos X */}
          <div className="relative rounded-3xl overflow-hidden h-[300px] md:h-[400px] shadow-lg border-4 border-white group" data-aos="fade-right">
            <img src="/maquinas adolfo 4.jpg" alt="Tecnología Radiológica" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent p-8 flex flex-col justify-end">
              <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Radiología Digital</h3>
              <p className="text-white/90 font-medium mt-1">Diagnóstico por imágenes instantáneo con mínima exposición.</p>
            </div>
          </div>

          {/* Maquinas Adolfo 5.jpg - Sillón/Consultorio */}
          <div className="relative rounded-3xl overflow-hidden h-[300px] md:h-[400px] shadow-lg border-4 border-white group" data-aos="fade-left">
            <img src="/maquinas adolfo 5.jpg" alt="Consultorio Moderno" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent p-8 flex flex-col justify-end">
              <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Prótesis en el día</h3>
              <p className="text-white/90 font-medium mt-1">Gracias a nuestra fresadora CEREC, fabricamos tus coronas en una sola cita.</p>
            </div>
          </div>

        </div>

        {/* Botón CTA Inferior innovador active:scale-95 */}
        <div className="text-center mt-16 pt-8 border-t border-secondary" data-aos="fade-up">
          <Link to="/contacto" className="inline-block bg-primary text-background font-bold px-10 py-4 rounded-xl shadow-md hover:brightness-110 active:scale-95 transition-all text-lg hover:-translate-y-1 hover:shadow-xl">
            Ver nuestra ubicación &rarr;
          </Link>
        </div>
      </section>

    </main>
  );
};

export default AcercaDe;