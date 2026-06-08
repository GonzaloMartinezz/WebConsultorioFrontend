import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

// Canvas-based image cropper utility
const cropImage = (imageSrc, cropYPercentStart, cropYPercentEnd) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        
        const startY = (cropYPercentStart / 100) * height;
        const sliceHeight = ((cropYPercentEnd - cropYPercentStart) / 100) * height;
        
        canvas.width = width;
        canvas.height = sliceHeight;
        
        ctx.drawImage(
          img,
          0, startY, width, sliceHeight, // source rectangle
          0, 0, width, sliceHeight       // destination rectangle
        );
        
        resolve(canvas.toDataURL('image/jpeg', 0.9));
      } catch (err) {
        console.error("Canvas crop error, fallback to full image:", err);
        resolve(imageSrc);
      }
    };
    img.onerror = () => {
      console.warn("Failed to load image for cropping, fallback to full image:", imageSrc);
      resolve(imageSrc);
    };
    img.src = imageSrc;
  });
};

const doctorsData = {
  erina: {
    id: 'erina',
    name: 'Dra. Erina Carcara',
    role: 'Ortodoncia & Estética Dental',
    image: '/dra-erina.jpg', // Placeholder for doctor image
    bio: 'La Dra. Erina Carcara es especialista en transformar sonrisas con los últimos avances en ortodoncia invisible y estética dental. Su enfoque minucioso garantiza resultados funcionales y armónicos.',
    specialties: [
      { title: 'ORTODONCIA', desc: 'Corrección de la mordida y alineación dental con brackets de última generación.' },
      { title: 'ORTOPEDIA FUNCIONAL DE LOS MAXILARES', desc: 'Tratamiento para guiar y estimular el crecimiento y desarrollo de los maxilares y musculatura facial en niños.' },
      { title: 'PERIODONCIA', desc: 'Tratamiento de enfermedades periodontales y cuidados de los tejidos que sostienen los dientes.' },
      { title: 'BLANQUEAMIENTO Y ESTETICA DENTAL', desc: 'Técnicas avanzadas para aclarar el tono de tus dientes de forma segura y eficaz' }
    ],
    certifications: [
      'Posgrado en Odontopediatría',
      'Posgrado en Ortopedia funcional de los maxilares',
      'Posgrado en Ortodoncia',
      'Posgrado en Ortodoncia digital con alineadores',
      'Posgrado en Estética Dental Avanzada'
    ],
    clinicalCases: [
      {
        id: 1,
        title: 'Ortodoncia Invisible (Apiñamiento Bimaxilar)',
        category: 'ortodoncia',
        categoryName: 'Ortodoncia Invisible',
        description: 'Tratamiento digital avanzado para corregir apiñamiento severo y rotación de piezas en ambas arcadas sin brackets, utilizando alineadores transparentes secuenciales.',
        duration: '14 meses',
        difficulty: 'Alta',
        technique: 'Alineadores Secuenciales Transparentes',
        image: '/alineadores.jpeg',
        layout: 'vertical-2',
        steps: [
          { key: 'before', name: 'Inicial (Antes)', desc: 'Apiñamiento severo superior e inferior con apiñamiento anterior y superposición dental en espejo.' },
          { key: 'after', name: 'Final (Después)', desc: 'Nivelación y alineación completa de ambas arcadas en forma parabólica ideal con excelente salud periodontal.' }
        ]
      },
      {
        id: 2,
        title: 'Corrección de Rotación Dental Inferior',
        category: 'ortodoncia',
        categoryName: 'Ortodoncia Invisible',
        description: 'Tratamiento localizado para alinear e incrustar una pieza dental inferior gravemente rotada que limitaba la estética y la correcta higiene dental.',
        duration: '8 meses',
        difficulty: 'Media',
        technique: 'Alineadores Secuenciales de Precisión',
        image: '/alineadores.png',
        layout: 'vertical-2',
        steps: [
          { key: 'before', name: 'Inicial (Antes)', desc: 'Pieza dentaria incisiva central inferior con rotación superior al 45% (señalada con la flecha).' },
          { key: 'after', name: 'Final (Después)', desc: 'Alineación perfecta del incisivo en el arco dental, logrando una anatomía armónica y mordida de encaje estable.' }
        ]
      },
      {
        id: 3,
        title: 'Blanqueamiento Progresivo en 3 Fases',
        category: 'estetica',
        categoryName: 'Estética Dental',
        description: 'Evolución paso a paso del tono dental durante un tratamiento de blanqueamiento profesional combinado en consultorio y hogar.',
        duration: '2 sesiones',
        difficulty: 'Baja',
        technique: 'Peróxido de Hidrógeno al 35% + Luz LED Clínica',
        image: '/casoclinico2.jpeg',
        layout: 'simple',
        steps: [
          { key: 'complete', name: 'Resultado', desc: 'Tratamiento de blanqueamiento profesional combinado en consultorio y hogar. Se muestran las 3 etapas del tratamiento.' }
        ]
      },
      {
        id: 4,
        title: 'Blanqueamiento Dental Clínico Express',
        category: 'estetica',
        categoryName: 'Estética Dental',
        description: 'Blanqueamiento express de una sesión clínica para pacientes que buscan resultados inmediatos y de alta luminosidad de forma segura.',
        duration: '1 sesión (45 min)',
        difficulty: 'Baja',
        technique: 'Gel de Peróxido Fotoactivado de Última Generación',
        image: '/casoclinico1.jpeg',
        layout: 'vertical-2',
        steps: [
          { key: 'before', name: 'Antes (Inicial)', desc: 'Piezas dentarias con pigmentación de partida en tono 3R 2.5 en la escala cromática odontológica clásica.' },
          { key: 'after', name: 'Ahora (Después)', desc: 'Aclarado instantáneo general de la sonrisa con excelente homogeneidad, brillo y esmalte protegido.' }
        ]
      }
    ]
  },
  adolfo: {
    id: 'adolfo',
    name: 'Dr. Adolfo Alejandro Martinez',
    role: 'Implantología & Cirugía Maxilofacial',
    image: '/dr-adolfo.jpg', // Placeholder
    bio: 'El Dr. Adolfo Martinez cuenta con amplia trayectoria en cirugías complejas e implantes dentales. Su dedicación a la tecnología 3D permite planificaciones precisas y postoperatorios más rápidos.',
    specialties: [
      { title: 'IMPLANTOLOGIA ORAL', desc: 'Colocación de implantes dentales, a traves de cirugias guiadas.' },
      { title: 'REHABILITACION PROTESICA', desc: 'Diseño digital de sonrisas , confeccion digital de coronas en un sesion  ' },
      { title: 'CIRUGIA', desc: 'Procedimientos quirurgicos de alta complejidad.' },
      { title: 'ESTETICA IDEAL ', desc: 'Devolución de la función y estética dental.Carillas y coronas esteticas.Blanqueamiento dental.' }
    ],
    certifications: [
      'Postgrado en cirugia y implantologia oral',
      'Especialista en Implantología Oral',
      'Certificación en Flujos Digitales y CAD/CAM',
      'Dictante de cursos de posgrado en Cirugía implantologica.'
    ],
    clinicalCases: [
      {
        id: 1,
        title: 'Rehabilitación Superior Completa',
        category: 'implantes',
        categoryName: 'Implantología & Prótesis',
        description: 'Colocación de 6 implantes superiores y prótesis fija definitiva con carga inmediata digital en un flujo 100% CAD/CAM.',
        duration: '24 horas',
        difficulty: 'Alta',
        technique: 'Cirugía Guiada 3D + Prótesis CAD/CAM',
        image: '/caso-adolfo-1.jpg', // Placeholder
        layout: 'simple',
        steps: [
          { key: 'complete', name: 'Resultado', desc: 'Rehabilitación masticatoria y estética completa del maxilar superior.' }
        ]
      },
      {
        id: 2,
        title: 'Elevación de Seno y Regeneración Ósea',
        category: 'cirugia',
        categoryName: 'Cirugía Maxilofacial',
        description: 'Regeneración ósea guiada mediante elevación de seno maxilar para posterior colocación segura de implantes en el sector posterior superior.',
        duration: '6 meses',
        difficulty: 'Alta',
        technique: 'Elevación de Seno Maxilar con Membrana PRF',
        image: '/caso-adolfo-2.jpg', // Placeholder
        layout: 'simple',
        steps: [
          { key: 'complete', name: 'Resultado', desc: 'Estructura ósea recuperada con éxito y posterior colocación estable del implante dental.' }
        ]
      }
    ]
  }
};

// Interactive Before/After reveal slider component using clip-path
const BeforeAfterSlider = ({ before, after, loading }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPos(percentage);
  };

  const handleMouseMove = (e) => {
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  if (loading) {
    return (
      <div className="aspect-[4/3] w-full rounded-[2.5rem] bg-slate-900 flex items-center justify-center border-4 border-white shadow-xl">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-accent-orange border-t-transparent rounded-full animate-spin"></div>
          <span className="text-white text-xs font-bold uppercase tracking-widest">Recortando imágenes...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="relative aspect-[4/3] w-full rounded-[2.5rem] overflow-hidden bg-slate-900 border-4 border-white shadow-xl select-none cursor-ew-resize group"
    >
      {/* Después (Fondo) */}
      <img
        src={after || ''}
        alt="Después"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <div className="absolute top-5 right-5 z-10">
        <span className="px-3.5 py-1.5 rounded-full bg-emerald-600/90 text-[10px] font-black uppercase text-white tracking-widest shadow-md border border-white/10">
          Después
        </span>
      </div>

      {/* Antes (Capa Superior con Ancho Recortado por clip-path) */}
      <img
        src={before || ''}
        alt="Antes"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ clipPath: `inset(0px ${100 - sliderPos}% 0px 0px)` }}
      />
      
      <div className="absolute top-5 left-5 z-10">
        <span className="px-3.5 py-1.5 rounded-full bg-accent-orange/90 text-[10px] font-black uppercase text-white tracking-widest shadow-md border border-white/10">
          Antes
        </span>
      </div>

      {/* Barra Deslizadora Vertical */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        style={{ left: `${sliderPos}%` }}
      >
        {/* Tirador del Deslizador con flechas */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-2xl flex items-center justify-center border-2 border-slate-200/50 z-30 group-hover:scale-110 transition-transform duration-300">
          <span className="text-primary text-xs font-black">↔</span>
        </div>
      </div>

      {/* Leyenda flotante de instrucción */}
      <div className="absolute bottom-5 inset-x-0 flex justify-center pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity duration-300">
        <span className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-black uppercase text-white tracking-widest border border-white/10 shadow-lg">
          Desliza el cursor para comparar
        </span>
      </div>
    </div>
  );
};

const PerfilDoctor = () => {
  const { id } = useParams();
  const doctor = doctorsData[id];

  const [activeCategory, setActiveCategory] = useState('all');
  const [activeCaseId, setActiveCaseId] = useState(null);
  const [activeStage, setActiveStage] = useState('complete');

  // Cropped images state
  const [croppedImages, setCroppedImages] = useState({ before: null, after: null, stages: [] });
  const [loadingSlices, setLoadingSlices] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (doctor && doctor.clinicalCases && doctor.clinicalCases.length > 0) {
      setActiveCaseId(doctor.clinicalCases[0].id);
    }
    setActiveCategory('all');
  }, [id, doctor]);

  // Handle active case
  const activeCase = doctor?.clinicalCases?.find(c => c.id === activeCaseId) || doctor?.clinicalCases?.[0];

  // Set default stage when case changes
  useEffect(() => {
    if (activeCase) {
      if (activeCase.layout === 'vertical-3') {
        setActiveStage('stage-1');
      } else {
        setActiveStage('complete');
      }
    }
  }, [activeCaseId, activeCase]);

  // Crop images on-the-fly inside canvas
  useEffect(() => {
    if (!activeCase) return;

    setLoadingSlices(true);
    setCroppedImages({ before: null, after: null, stages: [] });

    const loadAndCrop = async () => {
      try {
        if (activeCase.layout === 'vertical-2') {
          const beforeUrl = await cropImage(activeCase.image, 0, 50);
          const afterUrl = await cropImage(activeCase.image, 50, 100);
          setCroppedImages({ before: beforeUrl, after: afterUrl, stages: [] });
        } else if (activeCase.layout === 'vertical-3') {
          const stage1Url = await cropImage(activeCase.image, 0, 33.33);
          const stage2Url = await cropImage(activeCase.image, 33.33, 66.66);
          const stage3Url = await cropImage(activeCase.image, 66.66, 100);
          setCroppedImages({
            before: stage1Url,
            after: stage3Url,
            stages: [stage1Url, stage2Url, stage3Url]
          });
        } else {
          // Simple layout without cropping
          setCroppedImages({ before: activeCase.image, after: activeCase.image, stages: [] });
        }
      } catch (err) {
        console.error("Error slicing images dynamically:", err);
        // Fail-safe fallback to the original image
        setCroppedImages({ before: activeCase.image, after: activeCase.image, stages: [] });
      } finally {
        setLoadingSlices(false);
      }
    };

    loadAndCrop();
  }, [activeCaseId, activeCase]);

  if (!doctor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-primary">
        <h2 className="text-3xl font-black mb-4">Doctor no encontrado</h2>
        <Link to="/especialistas" className="bg-accent-orange text-white px-6 py-3 rounded-xl font-bold uppercase">
          Volver a Especialistas
        </Link>
      </div>
    );
  }

  // Get unique categories dynamically
  const categories = [
    { id: 'all', name: 'Todos' },
    ...Array.from(new Set(doctor.clinicalCases.map(c => c.category))).map(cat => ({
      id: cat,
      name: doctor.clinicalCases.find(c => c.category === cat)?.categoryName || cat
    }))
  ];

  // Filter cases for the list
  const filteredCases = doctor.clinicalCases.filter(caso => {
    if (activeCategory === 'all') return true;
    return caso.category === activeCategory;
  });

  // Describe the current active stage details
  const activeStageDetails = activeCase?.steps?.find(s => s.key === activeStage) || {
    name: 'Vista Completa',
    desc: activeCase?.description
  };

  return (
    <div className="bg-background min-h-screen pb-20 pt-32 lg:pt-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Botón Volver */}
        <Link to="/especialistas" className="inline-flex items-center gap-2 text-primary font-bold hover:text-accent-orange transition-colors mb-8 bg-white px-6 py-2 rounded-full shadow-sm border border-secondary/20">
          <span>&larr;</span> Volver a Especialistas
        </Link>

        {/* Encabezado del Doctor */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-secondary/20 flex flex-col md:flex-row gap-10 items-center md:items-start mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20"></div>

          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl shrink-0 bg-secondary/10 flex items-center justify-center relative z-10">
            <span className="text-6xl">{doctor.id === 'erina' ? '👩‍⚕️' : '👨‍⚕️'}</span>
          </div>

          <div className="flex-1 text-center md:text-left relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange-50 text-accent-orange text-xs font-bold tracking-[0.2em] uppercase mb-4 border border-orange-100">
              {doctor.role}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary uppercase tracking-tighter mb-6">
              {doctor.name}
            </h1>
            <p className="text-text-light text-lg md:text-xl font-medium leading-relaxed max-w-3xl">
              {doctor.bio}
            </p>
          </div>
        </div>

        {/* Especialidades en Recuadros */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tight mb-10 flex items-center gap-4">
            <span className="w-8 h-[3px] bg-accent-orange rounded-full"></span>
            Áreas de Especialidad
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctor.specialties.map((spec, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl shadow-md border border-secondary/20 hover:-translate-y-2 transition-transform duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-accent-orange text-xl mb-6 group-hover:bg-accent-orange group-hover:text-white transition-colors">
                  ✦
                </div>
                <h3 className="font-black text-xl text-primary mb-3 leading-tight">{spec.title}</h3>
                <p className="text-text-light text-sm font-medium leading-relaxed">{spec.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Casos Clínicos Inmersivos (Antes & Después) */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-primary uppercase tracking-tight flex items-center gap-4">
                <span className="w-8 h-[4px] bg-accent-orange rounded-full"></span>
                Casos Clínicos de Éxito
              </h2>
              <p className="text-text-light font-medium mt-2 max-w-xl text-base md:text-lg">
                Explora la evolución real de nuestros pacientes tratados con tecnología avanzada y precisión dental.
              </p>
            </div>
            
            {/* Categorías de Filtro */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    const firstInCat = doctor.clinicalCases.find(c => cat.id === 'all' || c.category === cat.id);
                    if (firstInCat) {
                      setActiveCaseId(firstInCat.id);
                    }
                  }}
                  className={`px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105'
                      : 'bg-white text-primary border border-secondary/30 hover:border-primary hover:bg-slate-50'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {activeCase ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white rounded-[3rem] p-6 md:p-10 shadow-2xl border border-secondary/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-40 -mr-40 -mt-40 pointer-events-none"></div>
              
              {/* Columna 1: Visor del Caso Activo */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                
                {/* Si es vertical-2 y ya tenemos las imágenes recortadas de antes/después */}
                {activeCase.layout === 'vertical-2' ? (
                  <BeforeAfterSlider
                    before={croppedImages.before}
                    after={croppedImages.after}
                    loading={loadingSlices}
                  />
                ) : activeCase.layout === 'vertical-3' ? (
                  /* Caso de 3 fases (Blanqueamiento progresivo) */
                  <div className="relative aspect-[4/3] w-full rounded-[2.5rem] overflow-hidden bg-slate-900 border-4 border-white shadow-xl flex items-center justify-center group">
                    {loadingSlices ? (
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-10 h-10 border-4 border-accent-orange border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-white text-xs font-bold uppercase tracking-widest">Recortando fases...</span>
                      </div>
                    ) : (
                      <>
                        {/* Mostrar la fase seleccionada activamente */}
                        <img
                          src={
                            activeStage === 'stage-1' ? croppedImages.stages[0] :
                            activeStage === 'stage-2' ? croppedImages.stages[1] :
                            activeStage === 'stage-3' ? croppedImages.stages[2] :
                            activeCase.image
                          }
                          alt={activeCase.title}
                          className="w-full h-full object-cover transition-all duration-300"
                        />

                        {/* Badges de fase */}
                        <div className="absolute top-5 left-5 z-10">
                          <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-black uppercase text-white tracking-widest border border-white/10 shadow-md">
                            Visualizando: {activeStage === 'complete' ? 'Imagen Completa' : activeStageDetails.name}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  /* Caso simple (sin recorte, como placeholders) */
                  <div className="relative aspect-[4/3] w-full rounded-[2.5rem] overflow-hidden bg-slate-900 border-4 border-white shadow-xl flex items-center justify-center">
                    <img
                      src={activeCase.image}
                      alt={activeCase.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Controles del Visor para 3 etapas (Blanqueamiento progresivo) */}
                {activeCase.layout === 'vertical-3' && !loadingSlices && (
                  <div className="bg-slate-100/80 p-1.5 rounded-2xl flex flex-wrap gap-1 items-center justify-between shadow-inner border border-slate-200">
                    <button
                      onClick={() => setActiveStage('complete')}
                      className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 text-center ${
                        activeStage === 'complete'
                          ? 'bg-white text-primary shadow-sm scale-[1.02]'
                          : 'text-text-light hover:text-primary'
                      }`}
                    >
                      Ver Imagen Completa
                    </button>
                    <button
                      onClick={() => setActiveStage('stage-1')}
                      className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 text-center ${
                        activeStage === 'stage-1'
                          ? 'bg-white text-accent-orange shadow-sm scale-[1.02]'
                          : 'text-text-light hover:text-primary'
                      }`}
                    >
                      Fase 1: Inicial
                    </button>
                    <button
                      onClick={() => setActiveStage('stage-2')}
                      className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 text-center ${
                        activeStage === 'stage-2'
                          ? 'bg-white text-blue-600 shadow-sm scale-[1.02]'
                          : 'text-text-light hover:text-primary'
                      }`}
                    >
                      Fase 2: 1 Semana
                    </button>
                    <button
                      onClick={() => setActiveStage('stage-3')}
                      className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 text-center ${
                        activeStage === 'stage-3'
                          ? 'bg-white text-emerald-600 shadow-sm scale-[1.02]'
                          : 'text-text-light hover:text-primary'
                      }`}
                    >
                      Fase 3: 2da Sesión
                    </button>
                  </div>
                )}

                {/* Explicación de arrastre para el Slider */}
                {activeCase.layout === 'vertical-2' && !loadingSlices && (
                  <div className="text-center">
                    <p className="text-xs font-bold text-text-light italic flex items-center justify-center gap-1.5">
                      <span>💡</span> Arrastra el cursor horizontalmente sobre la imagen para revelar la transformación de Antes y Después.
                    </p>
                  </div>
                )}

              </div>

              {/* Columna 2: Ficha Técnica e Historial */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-8">
                
                {/* Detalles Clínicos */}
                <div className="flex flex-col gap-6">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-widest text-accent-orange bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                      Caso de Éxito #{activeCase.id}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black text-primary leading-tight mt-3">
                      {activeCase.title}
                    </h3>
                  </div>



                  {/* Diagnóstico */}
                  <div className="flex flex-col gap-2">
                    <h4 className="text-[11px] font-black uppercase text-primary tracking-widest flex items-center gap-1.5">
                      <span>📋</span> Diagnóstico y Planificación
                    </h4>
                    <p className="text-text-light text-sm font-medium leading-relaxed bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50">
                      {activeCase.description}
                    </p>
                  </div>

                  {/* Nota Dinámica de la Fase Activa */}
                  <div className="bg-orange-50/70 p-5 rounded-2xl border border-orange-100/50 flex flex-col gap-1.5 transition-all duration-300">
                    <h4 className="text-[11px] font-black uppercase text-accent-orange tracking-widest flex items-center gap-1.5">
                      <span>💡</span> Detalle de la Fase: {activeStage === 'complete' ? 'Vista Completa' : activeStageDetails.name}
                    </h4>
                    <p className="text-primary text-sm font-semibold leading-relaxed">
                      {activeStage === 'complete'
                        ? activeCase.layout === 'vertical-2'
                          ? 'Usa el comparador deslizante de la izquierda para explorar la transformación.'
                          : 'Esta imagen completa muestra la evolución cromática. Usa las pestañas inferiores del visor para enfocar y comparar cada fase.'
                        : activeStageDetails.desc}
                    </p>
                  </div>
                </div>

                {/* Si es multipase (vertical-3) y ya tenemos las imágenes, mostramos la galería cronológica recortada */}
                {activeCase.layout === 'vertical-3' && !loadingSlices && croppedImages.stages.length > 0 && (
                  <div className="mt-2 flex flex-col gap-3">
                    <h4 className="text-xs font-black uppercase text-primary tracking-widest">
                      Evolución Cronológica Recortada
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      {activeCase.steps.map((step, idx) => (
                        <button
                          key={step.key}
                          onClick={() => setActiveStage(step.key)}
                          className={`p-2 rounded-2xl border text-center flex flex-col items-center gap-2 transition-all duration-300 bg-white ${
                            activeStage === step.key
                              ? 'border-accent-orange shadow-md bg-orange-50/10 scale-[1.02]'
                              : 'border-secondary/20 hover:border-primary'
                          }`}
                        >
                          <div className="w-16 h-16 rounded-full overflow-hidden border border-slate-200 relative bg-slate-100 shrink-0">
                            <img
                              src={croppedImages.stages[idx]}
                              alt={step.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-[10px] font-black text-primary leading-tight block">
                            {step.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Selector de Casos de la misma Categoría */}
                <div className="mt-8 border-t border-slate-100 pt-6">
                  <h4 className="text-xs font-black uppercase text-primary tracking-widest mb-4">
                    Otros Casos de {categories.find(c => c.id === activeCategory)?.name || 'Especialidad'}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                    {filteredCases.map((caso) => (
                      <button
                        key={caso.id}
                        onClick={() => {
                          setActiveCaseId(caso.id);
                        }}
                        className={`group p-2 rounded-2xl border text-left flex flex-col gap-2 transition-all duration-300 bg-white ${
                          activeCaseId === caso.id
                            ? 'border-accent-orange shadow-md bg-orange-50/10 scale-[1.02]'
                            : 'border-secondary/20 hover:border-primary hover:shadow-sm'
                        }`}
                      >
                        <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-100 relative">
                          <img
                            src={caso.image}
                            alt={caso.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <span className="text-[10px] font-black text-primary leading-tight truncate px-1 block group-hover:text-accent-orange transition-colors">
                          {caso.title}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-secondary/20">
              <span className="text-4xl">🔎</span>
              <p className="text-text-light font-bold mt-4">No hay casos clínicos disponibles en esta categoría.</p>
            </div>
          )}
        </div>

        {/* Certificaciones Formato Trophy Cabinet */}
        <div className="mb-20">
          <div className="bg-primary rounded-[3rem] p-8 md:p-12 shadow-2xl text-white relative overflow-hidden">
            {/* Blur decorativo premium */}
            <div className="absolute top-[-20%] right-[-20%] w-96 h-96 bg-accent-orange/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-20%] left-[-20%] w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

            <h2 className="text-3xl font-black uppercase tracking-tight mb-10 flex items-center gap-3 relative z-10">
              <span className="text-accent-orange text-4xl">🏆</span> Formación Académica & Certificaciones
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
              {doctor.certifications.map((cert, index) => (
                <div key={index} className="flex items-start gap-4 bg-white/5 hover:bg-white/10 p-5 rounded-2xl border border-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 group">
                  <span className="w-8 h-8 rounded-full bg-accent-orange/20 flex items-center justify-center text-accent-orange font-bold shrink-0 mt-0.5 group-hover:bg-accent-orange group-hover:text-white transition-colors">
                    ✓
                  </span>
                  <span className="font-semibold text-white/90 leading-relaxed text-sm md:text-base">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PerfilDoctor;
