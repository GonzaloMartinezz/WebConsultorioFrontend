import { Link } from 'react-router-dom';

const AcercaDe = () => {
  return (
    <div className="grow bg-background flex flex-col gap-24 pb-24 overflow-hidden">
      
      {/* ======================================================== */}
      {/* SECCIÓN 1: FILOSOFÍA (Bloque Dividido Premium - bg-primary) */}
      {/* Inspirado en layout dividido RC Gym */}
      {/* ========================================== */}
      <section className="bg-primary text-background py-20 lg:py-32 px-4 sm:px-6 lg:px-8 border-b-8 border-accent-orange relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[radial-gradient(circle_at_top_left,white,transparent_50%)]"></div>

        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            
            {/* Lado Izquierdo: Título y descripción */}
            <div className="w-full lg:w-5/12 space-y-6 text-center lg:text-left">
              <span className="inline-block px-4 py-1.5 rounded-full border border-accent-orange text-accent-orange font-bold text-xs uppercase tracking-wider">
                Nuestra Esencia
              </span>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                La Sonrisa <br /> 
                <span className="text-accent-orange">Comienza Aquí</span>
              </h1>
              <p className="text-lg text-secondary/90 font-medium leading-relaxed max-w-md mx-auto lg:mx-0">
                Somos un equipo apasionado que combina experiencia clínica, tecnología moderna y un enfoque humano para acompañarte en cada etapa de tu tratamiento bucal.
              </p>
            </div>

            {/* Separador vertical sutil */}
            <div className="hidden lg:block w-px h-64 bg-secondary/20 shrink-0"></div>

            {/* Lado Derecho: Filosofía y Foto de Recepción Flotante */}
            <div className="w-full lg:w-6/12 relative space-y-8 bg-background/5 p-8 rounded-3xl border border-secondary/10 backdrop-blur-sm">
              <h3 className="text-2xl font-bold tracking-tight text-white/95">Filosofía de trabajo</h3>
              <p className="text-secondary/90 font-medium text-base md:text-lg leading-relaxed">
                Creemos que una sonrisa sana se construye a partir de la confianza. Por eso dedicamos el tiempo necesario a escuchar tus necesidades, explicar cada paso y ofrecer alternativas claras y personalizadas.
              </p>
              
              {/* Foto de Recepción (sala de espera 1.jpeg) Flotante estilo 'RC' */}
              <div className="absolute -bottom-16 -right-10 w-64 h-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-background rotate-3 hidden md:block z-10">
                <img src="/sala de espera 1.jpeg" alt="Recepción Carcara Martínez" className="w-full h-full object-cover" />
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ======================================================== */}
      {/* SECCIÓN 2: EL EQUIPO (Grilla Moderna - bg-white) */}
      {/* Inspirado en grilla de "Expertos" */}
      {/* ========================================== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center">
          
          {/* Lado Izquierdo: Foto de Escritorio (escritorio 2.jpeg) */}
          <div className="w-full lg:w-1/2 relative h-[500px] rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white">
            <img src="/escritorio 2.jpeg" alt="Área de consulta Carcara Martínez" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          </div>

          {/* Lado Derecho: Los Doctores y Especialidades */}
          <div className="w-full lg:w-1/2 space-y-12">
            <div className="text-center lg:text-left space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-text uppercase leading-tight tracking-tight">
                El Equipo <span className="text-accent-orange">Carcara • Martínez</span>
              </h2>
              <p className="text-lg text-text-light font-medium max-w-xl mx-auto lg:mx-0">
                Profesionales con amplia trayectoria, dedicados a ofrecerte diagnósticos precisos y tratamientos mínimamente invasivos.
              </p>
            </div>

            {/* Grilla de Doctores estilo Foto Referencia "Expertos" */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-secondary">
              {/* Dr. Adolfo Martínez */}
              <div className="bg-white rounded-2xl p-6 border border-secondary shadow-sm hover:border-accent-orange transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary text-white p-3 rounded-full text-lg">👨‍⚕️</div>
                  <div>
                    <h4 className="text-xl font-bold text-text">Dr. Adolfo Martínez</h4>
                    <p className="text-sm text-text-light font-medium">Odontología General e Implantes</p>
                  </div>
                </div>
                <p className="text-sm text-text-light font-medium">Especialista en devolver la función y estética dental con protocolos actualizados de bioseguridad.</p>
              </div>

              {/* Dra. Erina Carcara */}
              <div className="bg-white rounded-2xl p-6 border border-secondary shadow-sm hover:border-accent-orange transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-accent-orange text-white p-3 rounded-full text-lg">👩‍⚕️</div>
                  <div>
                    <h4 className="text-xl font-bold text-text">Dra. Erina Carcara</h4>
                    <p className="text-sm text-text-light font-medium">Ortodoncia y Estética Dental</p>
                  </div>
                </div>
                <p className="text-sm text-text-light font-medium">Apasionada por crear sonrisas armónicas usando tecnología digital de scanner intraoral.</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ======================================================== */}
      {/* SECCIÓN 3: INSTALACIONES (Grilla Moderna - bg-white) */}
      {/* Inspirado en grilla de "Instalaciones" */}
      {/* ========================================== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-16 bg-white rounded-[2.5rem] shadow-sm border border-secondary/50">
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-4xl lg:text-5xl font-black uppercase text-text leading-tight tracking-tight">
            Instalaciones <span className="text-accent-orange">Premium</span>
          </h2>
          <p className="text-lg text-text-light font-medium max-w-2xl mx-auto">
            Consultorios amplios, climatizados y equipados para que tu experiencia sea lo más cómoda y segura posible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Logo en Pared (edited-image.jpg) */}
          <div className="md:col-span-2 relative rounded-2xl overflow-hidden h-[400px] shadow-lg group">
            <img src="/edited-image.jpg" alt="Logo Carcara Martínez en pared" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-8 flex flex-col justify-end">
              <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Bienvenida y Marca</h3>
              <p className="text-white/80 font-medium mt-1">Un ambiente sofisticado y profesional desde el primer momento.</p>
            </div>
          </div>

          {/* Card 2: Sillón Naranja (consultorio 1.jpeg) */}
          <div className="relative rounded-2xl overflow-hidden h-[400px] shadow-lg group">
            <img src="/consultorio 1.jpeg" alt="Consultorio con sillón naranja" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-8 flex flex-col justify-end">
              <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Tecnología y Confort</h3>
              <p className="text-white/80 font-medium mt-1">Sillones ergonómicos y equipamiento digital de última generación.</p>
            </div>
          </div>
          
        </div>

        {/* Botón CTA Inferior */}
        <div className="text-center mt-16 pt-8 border-t border-secondary">
          <Link to="/contacto" className="inline-block bg-primary text-background font-bold px-10 py-4 rounded-xl shadow-md hover:brightness-110 transition-all text-lg">
            Ver nuestra ubicación &rarr;
          </Link>
        </div>
      </section>

    </div>
  );
};

export default AcercaDe;