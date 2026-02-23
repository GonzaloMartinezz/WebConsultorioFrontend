const Inicio = () => {
  return (
    <div className="py-12">
      <div className="max-w-5xl mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold text-primary">
          Centro Odontológico Integral
        </h1>

        <p className="text-xl text-text">
          Brindamos atención odontológica de calidad con profesionales
          altamente capacitados y tecnología de última generación.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="font-semibold text-primary mb-2">
              Instalaciones modernas
            </h3>
            <p className="text-sm text-text">
              Equipamiento de última generación para tu comodidad.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="font-semibold text-primary mb-2">
              Profesionales expertos
            </h3>
            <p className="text-sm text-text">
              Odontólogos especializados en cada área.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="font-semibold text-primary mb-2">
              Atención personalizada
            </h3>
            <p className="text-sm text-text">
              Nos enfocamos en tu salud y bienestar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;