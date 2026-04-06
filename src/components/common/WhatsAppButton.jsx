import { useState } from 'react';

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', lastname: '', email: '', reason: '' });

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const phoneNumber = '5493816242482';
    const message = `Hola buenos días/tardes, mi nombre es ${formData.name} ${formData.lastname}.\nMe comunico para realizar una consulta general o despejar unas dudas.\n\n📝 *Mis datos:*\n- Email: ${formData.email}\n\n🦷 *Consulta sobre:*\n- ${formData.reason}\n\nQuedo a la espera de su respuesta. ¡Muchas gracias!`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setIsOpen(false);
    setFormData({ name: '', lastname: '', email: '', reason: '' }); // reset form
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start font-sans">
      {/* Popover Form */}
      {isOpen && (
        <div 
          className="mb-4 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 transition-all duration-300 origin-bottom-left"
          style={{ width: '350px', animation: 'fadeIn 0.3s ease-out' }}
        >
          <div className="bg-[#25D366] text-white p-4 relative">
            <h3 className="font-bold text-lg mb-1 uppercase tracking-wide">Centro Odontológico</h3>
            <p className="text-sm opacity-95">Completa los datos para contactarnos y poder consultarnos cualquier información.</p>
            <button 
              onClick={toggleOpen} 
              className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
              aria-label="Cerrar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-5 flex flex-col space-y-4">
            <div className="flex gap-2">
              <div className="w-1/2">
                <input
                  id="wa-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Nombre"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:border-transparent text-sm"
                />
              </div>
              <div className="w-1/2">
                <input
                  id="wa-lastname"
                  name="lastname"
                  type="text"
                  required
                  placeholder="Apellido"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:border-transparent text-sm"
                />
              </div>
            </div>

            <div>
              <input
                id="wa-email"
                name="email"
                type="email"
                required
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:border-transparent text-sm"
              />
            </div>
            
            <div>
              <select
                id="wa-reason"
                name="reason"
                required
                value={formData.reason}
                onChange={handleChange}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:border-transparent text-sm ${!formData.reason ? 'text-gray-500' : 'text-gray-900'}`}
              >
                <option value="" disabled>Elegir especialidad/motivo...</option>
                <option value="Consulta General">Consulta General</option>
                <option value="Ortodoncia">Ortodoncia</option>
                <option value="Implantología">Implantología</option>
                <option value="Cirugía (Todas las áreas)">Cirugía (Todas las áreas)</option>
                <option value="Otro">Otro motivo</option>
              </select>
            </div>
            
            <button
              type="submit"
              className="w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md text-sm mt-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.015c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Enviar mensaje
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={toggleOpen}
        className={`w-14 h-14 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full flex items-center justify-center shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.23)] transition-all duration-300 transform hover:scale-110 z-50 ${isOpen ? 'scale-110' : ''}`}
        aria-label="Abrir WhatsApp"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        ) : (
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.015c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        )}
      </button>
      
      {/* CSS para la animación */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}} />
    </div>
  );
};

export default WhatsAppButton;
