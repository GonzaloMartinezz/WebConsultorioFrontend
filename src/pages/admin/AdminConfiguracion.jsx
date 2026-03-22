import { useState } from 'react';
import LayoutAdmin from "../../components/layouts/LayoutAdmin.jsx";
import { FaCogs, FaEnvelope, FaWhatsapp, FaSave, FaMagic } from 'react-icons/fa';

const AdminConfiguracion = () => {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [whatsappEnabled, setWhatsappEnabled] = useState(false);

  return (
    <LayoutAdmin>
      <header className="mb-10 pb-5 border-b-2 border-secondary/30" data-aos="fade-down">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-orange">Ajustes del Sistema</p>
        <h1 className="text-3xl font-black text-primary tracking-tight">
          Configuración y Automatizaciones
        </h1>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-[1fr,1.5fr] gap-8 pb-10" data-aos="fade-up">
        
        {/* COLUMNA IZQ: Toggles */}
        <section className="space-y-6">
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-secondary flex flex-col gap-6">
            <h3 className="text-xl font-black text-primary uppercase tracking-tight border-b border-secondary/50 pb-4">
              Canales de Aviso
            </h3>
            
            <div className="flex items-center justify-between p-5 rounded-2xl border border-secondary/50 bg-background/30 hover:border-primary transition-colors">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${emailEnabled ? 'bg-primary text-white shadow-md' : 'bg-secondary text-text-light'}`}>
                  <FaEnvelope className="text-xl" />
                </div>
                <div>
                  <p className="font-black text-text text-base">Emails Automáticos</p>
                  <p className="text-xs text-text-light font-medium mt-1">Avisar al confirmar o cancelar turno.</p>
                </div>
              </div>
              <button 
                onClick={() => setEmailEnabled(!emailEnabled)}
                className={`w-14 h-7 rounded-full transition-colors relative shadow-inner ${emailEnabled ? 'bg-accent-orange' : 'bg-secondary/80'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white absolute top-1 shadow transition-transform duration-300 ${emailEnabled ? 'left-8' : 'left-1'}`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-5 rounded-2xl border border-secondary/50 bg-background/30 hover:border-green-500 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${whatsappEnabled ? 'bg-green-500 text-white shadow-md' : 'bg-secondary text-text-light'}`}>
                  <FaWhatsapp className="text-xl" />
                </div>
                <div>
                  <p className="font-black text-text text-base">API WhatsApp</p>
                  <p className="text-xs text-text-light font-medium mt-1">Requiere integración con Meta API.</p>
                </div>
              </div>
              <button 
                onClick={() => setWhatsappEnabled(!whatsappEnabled)}
                className={`w-14 h-7 rounded-full transition-colors relative shadow-inner ${whatsappEnabled ? 'bg-green-500' : 'bg-secondary/80'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white absolute top-1 shadow transition-transform duration-300 ${whatsappEnabled ? 'left-8' : 'left-1'}`}></div>
              </button>
            </div>
          </div>
        </section>

        {/* COLUMNA DER: Plantillas */}
        <section>
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-secondary flex flex-col gap-6 relative border-l-8 border-primary">
            <div className="flex items-center gap-3 border-b border-secondary/50 pb-4">
              <FaMagic className="text-2xl text-accent-orange" />
              <h3 className="text-2xl font-black text-primary uppercase tracking-tight">Plantilla de Mensajes</h3>
            </div>
            
            <div className="bg-secondary/10 p-6 rounded-2xl border border-secondary/50 space-y-5">
              <div>
                <label className="text-xs font-black text-text uppercase tracking-wider block mb-2">Asunto del Correo</label>
                <input 
                  type="text" 
                  defaultValue="C&M Centro Odontológico - Confirmación de Turno" 
                  className="w-full px-5 py-3 rounded-xl border border-secondary bg-white focus:border-accent-orange outline-none text-sm font-semibold text-primary"
                />
              </div>
              <div>
                <label className="text-xs font-black text-text uppercase tracking-wider block mb-2">Cuerpo del Mensaje (Email o WA)</label>
                <textarea 
                  rows="7" 
                  defaultValue="Hola [Nombre Paciente],\n\nTe escribimos para confirmarte que tu turno ha sido agendado exitosamente con [Nombre Profesional].\n\n📅 Fecha: [Fecha Turno]\n⏰ Hora: [Hora Turno]\n\nTe esperamos en Jose Rondeau 827.\nPor favor, recuerda ser puntual." 
                  className="w-full px-5 py-4 rounded-xl border border-secondary bg-white focus:border-accent-orange outline-none resize-none text-sm whitespace-pre-wrap leading-relaxed text-text font-medium"
                ></textarea>
              </div>
              <div className="flex gap-3 flex-wrap">
                <span className="text-[11px] font-bold bg-white border border-primary/20 text-primary px-3 py-1.5 rounded-md cursor-pointer hover:bg-primary hover:text-white transition-colors shadow-sm">+ [Nombre Paciente]</span>
                <span className="text-[11px] font-bold bg-white border border-primary/20 text-primary px-3 py-1.5 rounded-md cursor-pointer hover:bg-primary hover:text-white transition-colors shadow-sm">+ [Nombre Profesional]</span>
                <span className="text-[11px] font-bold bg-white border border-primary/20 text-primary px-3 py-1.5 rounded-md cursor-pointer hover:bg-primary hover:text-white transition-colors shadow-sm">+ [Fecha Turno]</span>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button className="px-8 py-4 text-white font-bold text-sm rounded-xl bg-primary shadow-md hover:bg-primary/90 active:scale-95 transition-all uppercase tracking-wide flex items-center gap-2">
                <FaSave className="text-lg" /> Guardar Cambios
              </button>
            </div>
          </div>
        </section>
        
      </main>
    </LayoutAdmin>
  );
};

export default AdminConfiguracion;
