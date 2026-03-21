import { useState } from 'react';
import AdminLayout from '../../components/layouts/AdminLayout.jsx';
// Icono de diente para las tarjetas
import { FaTeeth, FaSave, FaUserPlus, FaSearch } from 'react-icons/fa';

const OdontogramaPage = () => {
  // Estado para manejar qué diente está seleccionado
  const [dienteSeleccionado, setDienteSeleccionado] = useState(null);

  // Maqueta visual de los dientes (Numbers 1-8 en 4 cuadrantes)
  // Cuadrante 1: Superior Derecho (Numbers 11-18)
  // Cuadrante 2: Superior Izquierdo (Numbers 21-28)
  // Cuadrante 3: Inferior Izquierdo (Numbers 31-38)
  // Cuadrante 4: Inferior Derecho (Numbers 41-48)
  const dientesMap = [
    { cuadrante: 1, numbers: [18, 17, 16, 15, 14, 13, 12, 11], title: "Superior Derecho" },
    { cuadrante: 2, numbers: [21, 22, 23, 24, 25, 26, 27, 28], title: "Superior Izquierdo" },
    { cuadrante: 3, numbers: [48, 47, 46, 45, 44, 43, 42, 41], title: "Inferior Derecho" },
    { cuadrante: 4, numbers: [31, 32, 33, 34, 35, 36, 37, 38], title: "Inferior Izquierdo" }
  ];

  const handleSeleccionarDiente = (number) => {
    setDienteSeleccionado(number);
    // Luego Antigravity cargará la información clínica vinculada a ese diente
  };

  return (
    <AdminLayout>
      {/* Encabezado Simple */}
      <header className="mb-10 pb-5 border-b-2 border-secondary/30 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-primary tracking-tight">
          Ficha Médica Digital - Odontograma C&M
        </h1>
        {/* Botón CTA Superior */}
        <button className="px-6 py-3 text-text font-bold text-sm rounded-full bg-accent-orange shadow-md hover:brightness-110 transition-all uppercase tracking-wide flex items-center gap-2">
          <FaUserPlus /> Cargar Nuevo Paciente
        </button>
      </header>

      {/* ======================================================== */}
      {/* DISEÑO EN 2 COLUMNAS (Inspirado en la imagen provided) */}
      {/* ========================================== */}
      <main className="grid grid-cols-1 xl:grid-cols-[1.8fr,1fr] gap-10">
        
        {/* LADO IZQUIERDO: El Odontograma (Modelo de boca) */}
        <section className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-secondary flex flex-col gap-10">
          <h3 className="text-2xl font-black text-primary uppercase tracking-tight text-center">Modelo Dentario</h3>
          
          {/* Contenedor visual de los dientes */}
          <div className="flex flex-col gap-12 relative items-center max-w-2xl mx-auto">
            
            {/* Línea horizontal central decorativa (Unión de boca) */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-secondary opacity-60"></div>

            {/* Fila Superior (Boca Arriba) */}
            <div className="grid grid-cols-2 gap-x-12 w-full">
              {dientesMap.filter(q => q.cuadrante <= 2).map((cuadranteMap) => (
                <div key={cuadranteMap.cuadrante} className="flex gap-1.5 justify-center">
                  {cuadranteMap.numbers.map((number) => (
                    <button 
                      key={number} 
                      onClick={() => handleSeleccionarDiente(number)}
                      title={`Diente ${number} - ${cuadranteMap.title}`}
                      // Estilo visual del diente (C&M Style)
                      className={`flex flex-col items-center justify-center aspect-[1/1.5] w-full max-w-[40px] border-2 rounded-lg p-2 transition-all 
                        ${dienteSeleccionado === number 
                          ? 'bg-accent-orange border-accent-orange shadow-xl scale-110' // Estado Seleccionado
                          : 'bg-white border-secondary hover:border-primary/50' // Estado Normal
                        }`}
                    >
                      {/* Representación gráfica simple de diente (Trapecio) */}
                      <div className={`w-full h-full rounded ${dienteSeleccionado === number ? 'bg-primary' : 'bg-secondary/40'}`}></div>
                      <span className={`font-bold text-[0.7rem] mt-1.5 ${dienteSeleccionado === number ? 'text-white' : 'text-text-light'}`}>
                        {number}
                      </span>
                    </button>
                  ))}
                </div>
              ))}
            </div>

            {/* Fila Inferior (Boca Abajo) */}
            <div className="grid grid-cols-2 gap-x-12 w-full">
              {dientesMap.filter(q => q.cuadrante > 2).map((cuadranteMap) => (
                <div key={cuadranteMap.cuadrante} className="flex gap-1.5 justify-center">
                  {cuadranteMap.numbers.map((number) => (
                    <button 
                  key={number} 
                      onClick={() => handleSeleccionarDiente(number)}
                      title={`Diente ${number} - ${cuadranteMap.title}`}
                      className={`flex flex-col items-center justify-center aspect-[1/1.5] w-full max-w-[40px] border-2 rounded-lg p-2 transition-all 
                        ${dienteSeleccionado === number 
                          ? 'bg-accent-orange border-accent-orange shadow-xl scale-110' // Estado Seleccionado
                          : 'bg-white border-secondary hover:border-primary/50' // Estado Normal
                        }`}
                    >
                      <span className={`font-bold text-[0.7rem] mb-1.5 ${dienteSeleccionado === number ? 'text-white' : 'text-text-light'}`}>
                        {number}
                      </span>
                      {/* Representación gráfica simple de diente (Trapecio - invertido abajo) */}
                      <div className={`w-full h-full rounded ${dienteSeleccionado === number ? 'bg-primary' : 'bg-secondary/40'}`}></div>
                    </button>
                  ))}
                </div>
              ))}
            </div>

          </div>
          
          <div className="text-center mt-6 pt-6 border-t border-secondary text-sm font-medium text-text-light">
            Haz clic en un diente para cargar o revisar la consulta clínica vinculada.
          </div>
        </section>

        {/* LADO DERECHO: Formulario de Ficha Clínica (Inspirado en la imagen) */}
        <aside className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-secondary flex flex-col gap-8 relative border-l-8 border-accent-orange overflow-visible">
          
          {/* Tarjeta flotante del Diente Seleccionado */}
          <div className={`absolute -top-10 right-10 flex h-20 w-20 items-center justify-center rounded-full border-4 shadow-2xl transition-all duration-300 ${
            dienteSeleccionado ? 'bg-accent-orange border-white text-text scale-100' : 'bg-secondary text-primary/50 border-white scale-75 opacity-70'
          }`}>
            <div className="text-center">
              {dienteSeleccionado ? (
                <>
                  <FaTeeth className="text-2xl mx-auto mb-0.5" />
                  <span className="text-3xl font-black leading-none">{dienteSeleccionado}</span>
                </>
              ) : (
                <FaTeeth className="text-4xl" />
              )}
            </div>
          </div>

          <h3 className="text-2xl font-black text-primary uppercase tracking-tight pr-20">Vincular Consulta</h3>
          
          {/* Buscador de Paciente */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-text uppercase tracking-wide">Buscar Paciente</label>
            <div className="relative">
              <input type="text" placeholder="DNI o Nombre..." className="w-full px-5 py-3.5 rounded-xl border border-secondary bg-background/50 focus:border-accent-orange focus:ring-1 focus:ring-accent-orange transition-colors" />
              <FaSearch className="absolute top-1/2 right-5 transform -translate-y-1/2 text-text-light" />
            </div>
          </div>

          {/* Formulario de Ficha Clínica (RECUADRO VINCULADO) */}
          <div className="bg-secondary/20 rounded-2xl p-6 border border-secondary/50 space-y-6">
            <div>
              <label className="text-sm font-bold text-text-light mb-2 block">Nombre Completo vinculado</label>
              <input type="text" placeholder="Seleccionar paciente..." className="w-full px-5 py-3 rounded-xl border border-secondary bg-white focus:border-accent-orange" disabled />
            </div>
            <div>
              <label className="text-sm font-bold text-text-light mb-2 block">Diente Clínico</label>
              <input type="text" value={dienteSeleccionado ? `Diente ${dienteSeleccionado}` : "Seleccionar diente..."} className="w-full px-5 py-3 rounded-xl border border-secondary bg-secondary/10 font-bold" disabled />
            </div>
            <div>
              <label className="text-sm font-bold text-text-light mb-2 block">Consulta / Diagnóstico realizado</label>
              <textarea rows="4" placeholder="Ej: Control general, Caries oclusal detectada, Restauración composite..." className="w-full px-5 py-3 rounded-xl border border-secondary bg-white focus:border-accent-orange outline-none resize-none"></textarea>
            </div>
          </div>

          {/* Botón Guardar */}
          <div className="pt-6 border-t border-secondary mt-auto flex items-center justify-between gap-4">
            <span className="text-xs text-text-light font-medium max-w-xs">Asegúrese de guardar la información una vez finalizada la carga clínica.</span>
            <button className="shrink-0 px-8 py-4 text-primary font-black text-lg rounded-xl bg-accent-orange shadow-lg hover:brightness-110 transition-all uppercase tracking-wide flex items-center gap-2">
              <FaSave /> Guardar Ficha
            </button>
          </div>

        </aside>
      
      </main>
    </AdminLayout>
  );
};

export default OdontogramaPage;
