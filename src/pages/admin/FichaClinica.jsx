import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios.js';
import { FaTooth, FaArrowLeft, FaSave, FaCheckCircle } from 'react-icons/fa';

const FichaClinica = () => {
  const { id } = useParams(); // Obtenemos el ID del paciente desde la URL
  const navigate = useNavigate();
  
  const [historia, setHistoria] = useState(null);
  const [cargando, setCargando] = useState(true);
  
  // Estados para el diente que el doctor está tocando
  const [dienteActivo, setDienteActivo] = useState(null);
  const [diagnostico, setDiagnostico] = useState('');
  const [guardando, setGuardando] = useState(false);

  // Cuadrantes dentales (Adultos)
  const cuadrante1 = [18, 17, 16, 15, 14, 13, 12, 11]; // Arriba Derecha
  const cuadrante2 = [21, 22, 23, 24, 25, 26, 27, 28]; // Arriba Izquierda
  const cuadrante3 = [48, 47, 46, 45, 44, 43, 42, 41]; // Abajo Derecha
  const cuadrante4 = [31, 32, 33, 34, 35, 36, 37, 38]; // Abajo Izquierda

  useEffect(() => {
    const cargarHistoria = async () => {
      try {
        // Buscamos la historia clínica de este paciente exacto
        const respuesta = await api.get(`/historias/${id}`);
        setHistoria(respuesta.data);
      } catch (error) {
        console.error("Error al cargar la ficha:", error);
      } finally {
        setCargando(false);
      }
    };
    cargarHistoria();
  }, [id]);

  // Función para guardar el estado del diente en MongoDB
  const handleGuardarDiente = async () => {
    if (!dienteActivo || !diagnostico) return;
    setGuardando(true);
    
    try {
      const respuesta = await api.post(`/historias/${id}/diente`, {
        diente: dienteActivo,
        diagnostico: diagnostico
      });
      
      // Actualizamos la pantalla con los nuevos datos
      setHistoria(respuesta.data);
      setDienteActivo(null); // Cerramos el menú del diente
      setDiagnostico('');
    } catch (error) {
      alert("Error al guardar el diagnóstico");
    } finally {
      setGuardando(false);
    }
  };

  // Función visual para saber de qué color pintar el diente según su estado
  const obtenerColorDiente = (numeroDiente) => {
    if (!historia || !historia.odontograma) return "bg-white border-secondary text-primary";
    
    const registro = historia.odontograma.find(d => d.diente === numeroDiente);
    if (!registro) return "bg-white border-secondary text-primary hover:bg-secondary/10";
    
    switch (registro.diagnostico) {
      case 'Caries': return "bg-red-500 text-white border-red-600";
      case 'Extracción': return "bg-gray-800 text-white border-black opacity-50";
      case 'Obturación (Arreglo)': return "bg-blue-500 text-white border-blue-600";
      case 'Sano': return "bg-green-500 text-white border-green-600";
      default: return "bg-white border-secondary text-primary";
    }
  };

  if (cargando) return <div className="p-10 text-center font-bold">Cargando Ficha Clínica...</div>;

  return (
    <main className="p-8 space-y-6 bg-background min-h-screen">
      
      {/* CABECERA */}
      <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border-t-4 border-accent-orange">
        <button onClick={() => navigate('/admin/pacientes')} className="text-secondary hover:text-accent-orange transition-colors">
          <FaArrowLeft className="text-xl" />
        </button>
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <FaTooth className="text-accent-orange" /> Odontograma Digital
          </h1>
          <p className="text-text-light text-sm font-medium">Haz clic en una pieza dental para registrar su estado.</p>
        </div>
      </div>

      {/* ODONTOGRAMA VISUAL */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-secondary/10">
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          
          {/* MAXILAR SUPERIOR */}
          <div className="flex justify-center gap-8 border-b-2 border-dashed border-secondary/30 pb-8">
            <div className="flex gap-2">
              {cuadrante1.map(num => (
                <button 
                  key={num} 
                  onClick={() => setDienteActivo(num)}
                  className={`w-10 h-14 rounded-lg border-2 flex items-center justify-center font-bold transition-all transform hover:scale-110 shadow-sm ${obtenerColorDiente(num)} ${dienteActivo === num ? 'ring-4 ring-accent-orange' : ''}`}
                >
                  {num}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {cuadrante2.map(num => (
                <button 
                  key={num} 
                  onClick={() => setDienteActivo(num)}
                  className={`w-10 h-14 rounded-lg border-2 flex items-center justify-center font-bold transition-all transform hover:scale-110 shadow-sm ${obtenerColorDiente(num)} ${dienteActivo === num ? 'ring-4 ring-accent-orange' : ''}`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* MAXILAR INFERIOR */}
          <div className="flex justify-center gap-8">
            <div className="flex gap-2">
              {cuadrante3.map(num => (
                <button 
                  key={num} 
                  onClick={() => setDienteActivo(num)}
                  className={`w-10 h-14 rounded-lg border-2 flex items-center justify-center font-bold transition-all transform hover:scale-110 shadow-sm ${obtenerColorDiente(num)} ${dienteActivo === num ? 'ring-4 ring-accent-orange' : ''}`}
                >
                  {num}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {cuadrante4.map(num => (
                <button 
                  key={num} 
                  onClick={() => setDienteActivo(num)}
                  className={`w-10 h-14 rounded-lg border-2 flex items-center justify-center font-bold transition-all transform hover:scale-110 shadow-sm ${obtenerColorDiente(num)} ${dienteActivo === num ? 'ring-4 ring-accent-orange' : ''}`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* PANEL DE DIAGNÓSTICO (Aparece solo al tocar un diente) */}
      {dienteActivo && (
        <div className="bg-white p-6 rounded-2xl shadow-2xl border-2 border-accent-orange animate-fade-in flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-accent-orange/10 rounded-full flex items-center justify-center text-accent-orange font-black text-2xl border-2 border-accent-orange">
              {dienteActivo}
            </div>
            <div>
              <h3 className="font-bold text-primary text-lg">Diagnóstico de la pieza {dienteActivo}</h3>
              <p className="text-xs text-text-light font-medium">Selecciona el estado actual y guárdalo en la historia.</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <select 
              value={diagnostico}
              onChange={(e) => setDiagnostico(e.target.value)}
              className="px-4 py-3 rounded-xl border border-secondary outline-none focus:border-accent-orange font-semibold text-primary"
            >
              <option value="">Seleccionar estado...</option>
              <option value="Sano">✔️ Sano / Intacto</option>
              <option value="Caries">🔴 Caries</option>
              <option value="Obturación (Arreglo)">🔵 Obturación (Arreglo)</option>
              <option value="Extracción">⚫ Extracción / Ausente</option>
            </select>
            
            <button 
              onClick={handleGuardarDiente}
              disabled={guardando || !diagnostico}
              className="bg-accent-orange text-white px-6 py-3 rounded-xl font-bold hover:brightness-110 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-md"
            >
              {guardando ? 'Guardando...' : <><FaSave /> Guardar Registro</>}
            </button>
          </div>
        </div>
      )}

    </main>
  );
};

export default FichaClinica;
