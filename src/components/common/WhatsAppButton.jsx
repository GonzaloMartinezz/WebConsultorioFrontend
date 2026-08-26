import { useState } from 'react';

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', lastname: '', email: '', phone: '', documentNumber: '', reason: '' });

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const phoneNumber = '5493816242482';
    const message = `Hola buenos días/tardes, mi nombre es ${formData.name} ${formData.lastname}.\nMe comunico para realizar una consulta general o despejar unas dudas.\n\n📝 *Mis datos:*\n- Email: ${formData.email}\n- Teléfono: ${formData.phone}\n- DNI: ${formData.documentNumber}\n\n🦷 *Consulta sobre:*\n- ${formData.reason}\n\nQuedo a la espera de su respuesta. ¡Muchas gracias!`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setIsOpen(false);
    setFormData({ name: '', lastname: '', email: '', phone: '', documentNumber: '', reason: '' }); 
  };

  // Custom Input Component for sleekness
  const InputField = ({ type, name, placeholder, value, required }) => (
    <input
      type={type}
      name={name}
      required={required}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:bg-white transition-all duration-300 text-sm placeholder-gray-400 font-medium"
    />
  );

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start font-sans">
      {/* Popover Form */}
      {isOpen && (
        <div
          className="mb-6 bg-white/95 backdrop-blur-xl rounded-4xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden border border-white/20 transition-all duration-300 origin-bottom-left w-[calc(100vw-3rem)] max-w-[380px]"
          style={{ animation: 'fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          {/* Header */}
          <div className="bg-linear-to-br from-[#128C7E] to-[#25D366] p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/30 shadow-inner">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.015c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                </div>
                <h3 className="font-black text-lg tracking-wide text-white uppercase drop-shadow-md">Contacto C&M</h3>
              </div>
              <p className="text-[12px] font-medium text-white/90 leading-snug">
                Completa tus datos para enviarnos tu consulta de forma directa. <br/> <span className="opacity-75 font-normal">*Recuerda iniciar sesión para solicitar turnos.</span>
              </p>
            </div>
            
            <button
              onClick={toggleOpen}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-black/10 hover:bg-black/20 text-white rounded-full transition-all backdrop-blur-sm z-20"
              aria-label="Cerrar"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 flex flex-col space-y-4">
            <div className="flex gap-3">
              <div className="w-1/2">
                <InputField type="text" name="name" placeholder="Nombre" value={formData.name} required />
              </div>
              <div className="w-1/2">
                <InputField type="text" name="lastname" placeholder="Apellido" value={formData.lastname} required />
              </div>
            </div>

            <InputField type="email" name="email" placeholder="Correo electrónico" value={formData.email} required />
            <InputField type="text" name="phone" placeholder="Teléfono" value={formData.phone} required />
            <InputField type="text" name="documentNumber" placeholder="Nro. Documento" value={formData.documentNumber} required />

            <div className="relative">
              <select
                name="reason"
                required
                value={formData.reason}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:bg-white transition-all duration-300 text-sm font-medium appearance-none cursor-pointer ${!formData.reason ? 'text-gray-400' : 'text-gray-800'}`}
              >
                <option value="" disabled>Elegir especialidad/motivo...</option>
                <option value="Consulta General">Consulta General</option>
                <option value="Ortodoncia">Ortodoncia</option>
                <option value="Implantología">Implantología</option>
                <option value="Cirugía (Todas las áreas)">Cirugía (Todas las áreas)</option>
                <option value="Endodoncia">Endodoncia</option>
                <option value="Estética (Todas las áreas)">Estética (Todas las áreas)</option>
                <option value="Operatoria">Operatoria</option>
                <option value="Profilaxis y Sellado">Profilaxis y Sellado</option>
                <option value="Radiología">Radiología</option>
                <option value="Rehabilitación Oral">Rehabilitación Oral</option>
                <option value="Odontología Pediátrica">Odontología Pediátrica</option>
                <option value="Periodoncia">Periodoncia</option>
                <option value="Prostodoncia">Prostodoncia</option>
                <option value="Ortodoncia Invisible">Ortodoncia Invisible</option>
                <option value="Otro">Otro motivo</option>
              </select>
              {/* Custom arrow for select */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-linear-to-r from-[#128C7E] to-[#25D366] hover:from-[#0F7A6E] hover:to-[#1ebe5d] text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_10px_20px_-5px_rgba(37,211,102,0.4)] hover:shadow-[0_15px_25px_-5px_rgba(37,211,102,0.5)] transform hover:-translate-y-0.5 text-[15px] uppercase tracking-wider group"
            >
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.015c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              Enviar mensaje
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={toggleOpen}
        className={`w-16 h-16 bg-linear-to-tr from-[#128C7E] to-[#25D366] hover:from-[#0F7A6E] hover:to-[#1ebe5d] text-white rounded-full flex items-center justify-center shadow-[0_10px_25px_rgba(37,211,102,0.4)] hover:shadow-[0_15px_35px_rgba(37,211,102,0.5)] transition-all duration-300 transform hover:scale-110 z-50 ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : ''}`}
        aria-label="Abrir WhatsApp"
      >
        <svg className="w-8 h-8 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.015c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
      </button>

      {/* CSS para la animación */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}} />
    </div>
  );
};

export default WhatsAppButton;
