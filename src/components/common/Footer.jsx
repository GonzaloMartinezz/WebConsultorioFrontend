const Footer = () => {
  return (
    <footer className="mt-auto border-t border-stone-600 bg-stone-800 text-stone-300">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm lg:px-0">
        <div className="grid gap-6 md:grid-cols-4">
          <div>
            <p className="font-semibold text-primary">
              Martínez Cárcara
            </p>
            <p className="mt-2 text-stone-400">
              Cuidamos tu salud bucal con un enfoque integral, humano y
              profesional.
            </p>
          </div>

          <div>
            <p className="font-semibold text-primary">Contacto</p>
            <p className="mt-2 text-stone-400">Av. Siempre Viva 123, Barrio Centro</p>
            <p className="text-stone-400">Tel: +54 11 1234-5678</p>
            <p className="text-stone-400">WhatsApp: +54 9 11 9876-5432</p>
            <p className="text-stone-400">Email: turnos@centrodental.com</p>
          </div>

          <div>
            <p className="font-semibold text-primary">Redes sociales</p>
            <p className="mt-2 text-stone-400">Instagram: @centro.odontologico</p>
            <p className="text-stone-400">Facebook: /centro.odontologico</p>
          </div>

          <div>
            <p className="font-semibold text-primary">Ubicación</p>
            <p className="mt-2 text-stone-400">
              Barrio Centro. Ver mapa en la sección Contacto.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-stone-600 pt-4 text-xs text-stone-500 md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Martínez Cárcara.
            Todos los derechos reservados.
          </p>
          <p>
            Información orientativa. El diagnóstico y tratamiento definitivo se
            realiza siempre de forma presencial.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
