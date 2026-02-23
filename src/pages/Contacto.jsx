const Contacto = () => {
  return (
    <div className="py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-8 space-y-4">
        <h1 className="text-3xl font-bold text-primary">Contacto</h1>

        <div className="space-y-3 text-text text-lg">
          <p><strong className="text-primary">📍 Dirección:</strong> Av. Siempre Viva 123, Ciudad</p>
          <p><strong className="text-primary">📞 Teléfono:</strong> +54 11 1234-5678</p>
          <p><strong className="text-primary">✉️ Email:</strong> info@odontoweb.com</p>
          <p><strong className="text-primary">🕒 Horario:</strong> Lunes a Viernes de 9:00 a 18:00 hs</p>
        </div>
      </div>
    </div>
  );
};

export default Contacto;