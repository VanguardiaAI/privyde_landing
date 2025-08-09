import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SupportChat from "@/components/SupportChat";
import { ChevronLeft, ChevronRight } from "lucide-react";
// import { ChevronDown, ChevronUp, CheckCircle } from "lucide-react";
// import { motion } from "framer-motion";

const Companies = () => {
  // Estado para controlar qué FAQ está abierta
  // const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [clickedBenefit, setClickedBenefit] = useState<number | null>(null);
  const [activeAccordionIndex, setActiveAccordionIndex] = useState(0);
  const [activeMobileAccordionIndex, setActiveMobileAccordionIndex] = useState(4);
  const [activePartnershipSlide, setActivePartnershipSlide] = useState(0);
  const navigate = useNavigate();
  
  // Estados para el touch/swipe
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  // Estado para el formulario de contacto
  const [formData] = useState({
    firstName: "",
    lastName: "",
    phonePrefix: "+34",
    phoneNumber: "",
    country: "España",
    location: "",
    companyName: "",
    companySize: "1-10 empleados",
    hearAbout: "Búsqueda en Google",
    message: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    // Set body background to black to prevent any gray lines
    document.body.style.backgroundColor = '#000000';
    // Ensure body can scroll on mobile
    document.body.style.overflow = 'auto';
    document.body.style.position = 'relative';
    document.documentElement.style.overflow = 'auto';
    
    
    return () => {
      // Reset body background when component unmounts
      document.body.style.backgroundColor = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  // Actualiza el estado del formulario cuando cambian los inputs
  // const handleInputChange = (
  //   e: React.ChangeEvent<
  //     HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  //   >,
  // ) => {
  //   const { id, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [id]: value,
  //   }));
  // };

  // const handleReservarClick = () => {
  //   navigate("/register-companies");
  // };

  const handleContactSubmit = () => {
    // Guardar los datos del formulario en localStorage para usarlos en la página de registro
    localStorage.setItem("companyContactData", JSON.stringify(formData));
    // Redirigir a la página de registro de empresas
    navigate("/register-companies");
  };
  
  // Funciones para manejar el swipe/touch en móvil
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && activeMobileAccordionIndex < 4) {
      setActiveMobileAccordionIndex(activeMobileAccordionIndex + 1);
    }
    if (isRightSwipe && activeMobileAccordionIndex > 0) {
      setActiveMobileAccordionIndex(activeMobileAccordionIndex - 1);
    }
  };

  // Toggle para abrir/cerrar FAQs
  // const toggleFaq = (index: number) => {
  //   if (openFaqIndex === index) {
  //     setOpenFaqIndex(null);
  //   } else {
  //     setOpenFaqIndex(index);
  //   }
  // };

  // Datos de las preguntas frecuentes
  /*const faqData = [
    {
      question: "¿Con cuánta antelación puedo reservar un viaje?",
      answer: (
        <p className="text-gray-600" data-oid="zn8_p7o">
          Puede reservar viajes con meses de antelación o tan pronto como 60
          minutos antes de que lo necesite. Recomendamos reservar con la mayor
          antelación posible. Privyde cuenta con la política de cancelación más
          flexible del sector, ya que los pasajeros pueden cancelar viajes de
          forma gratuita hasta una hora antes de la hora de recogida. También
          puede realizar cambios en su reserva hasta 60 minutos antes de la hora
          de recogida.
        </p>
      ),
    },
    {
      question: "¿Qué vehículos utiliza Privyde?",
      answer: (
        <p className="text-gray-600" data-oid="jk4_-i6">
          Privyde ofrece cuatro tipos de vehículos en la mayoría de las
          ubicaciones: Business Class, Electric Class, First Class y Business
          Van/SUV.
          <br data-oid="ihqcj07" />
          <br data-oid="b-r6_i4" />
          Cada una de estas categorías contiene una selección de modelos
          comparables de primera línea, que puede ver en el proceso de reserva o
          en nuestro Centro de ayuda.
          <br data-oid="9w4gzvk" />
          <br data-oid="t2ul5ec" />
          Tenga en cuenta que las imágenes que se muestran al reservar son
          meramente ilustrativas. No podemos garantizar ninguna solicitud de
          modelos o colores específicos de vehículos, ya que el vehículo a
          utilizar está sujeto a disponibilidad.
        </p>
      ),
    },
    {
      question: "Which languages do the chauffeurs speak?",
      answer: (
        <p className="text-gray-600" data-oid="equgm6w">
          All of Privyde's chauffeurs speak English and the language of the
          country they operate in.
        </p>
      ),
    },
    {
      question: "Which payment options are available?",
      answer: (
        <p className="text-gray-600" data-oid="ioiz47:">
          Privyde accepts Visa, Maestro, Mastercard and American Express cards.
          It is not possible to pay for the ride in cash. You can also pay via
          Paypal in the apps and Apple Pay if you are an iOS user. Paypal and
          Apple Pay are not currently available on the website.
          <br data-oid="-vdo339" />
          <br data-oid="pmetfg7" />
          Business accounts can also request to receive monthly invoices,
          instead of paying on a ride-by-ride basis.
          <br data-oid="ru78hev" />
          <br data-oid="zyda0fl" />
          Please keep in mind that all payment for your ride is set up in
          advance; your chauffeur is not able to accept payment on location.
          <br data-oid="08q4pqm" />
          <br data-oid="6rwhzav" />
          See the latest information here.
        </p>
      ),
    },
    {
      question: "¿Cómo contribuye Privyde a las opciones de viaje sostenibles?",
      answer: (
        <p className="text-gray-600" data-oid="-rmh9lb">
          Privyde contribuye a los viajes sostenibles al ofrecer opciones de
          vehículos eléctricos, incorporar vehículos eléctricos en nuestra
          oferta de Business Class en muchas más ciudades y trabajar activamente
          para compensar su huella de carbono.
        </p>
      ),
    },
  ];*/

  return (
    <>
      <div className="min-h-screen bg-black">
        <Navbar />
        {/* Hero Section */}
        <section className="relative h-[35vh] md:h-[70vh] overflow-hidden bg-black">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/bussines/Banner_empresas.webp"
            alt="Para empresas"
            className="w-full md:w-[115%] h-[120%] md:h-full object-cover object-center md:object-left"
            style={{ backgroundColor: '#000000', objectPosition: '20% 40%' }}
          />
          {/* Subtle black filter overlay */}
          <div className="absolute inset-0 bg-black/20" />
          {/* Gradient overlay at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-[50%] to-black" />
          {/* Extra bottom gradient for deeper black */}
          <div className="absolute bottom-0 left-0 right-0 h-32 md:h-40 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>
        
        <div className="relative z-10 h-full flex items-end pb-6 md:pb-16">
          <div className="container mx-auto px-6">
            <h1 className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-wider uppercase text-center" style={{ fontFamily: 'CONTHRAX-SB' }}>
              PARA EMPRESAS
            </h1>
          </div>
        </div>
        </section>

        {/* Black divider to cover any gray line */}
        <div className="w-full h-2 bg-black relative z-10" style={{ marginTop: '-2px', marginBottom: '-2px' }}></div>

        {/* Description Section */}
        <section className="bg-black py-6 md:py-8">
          <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 text-center">
            Eficiencia, representación y protección en cada trayecto.
          </h2>
          <p className="text-sm md:text-base text-white/80 text-center leading-relaxed">
            Privyde ofrece soluciones globales de transporte ejecutivo diseñadas para organizaciones que valoran la puntualidad, la
            experiencia del cliente y la excelencia operativa. Desde traslados corporativos hasta asociaciones estratégicas con hoteles,
            aerolíneas o agencias, brindamos un ecosistema completo de movilidad de alto nivel.
          </p>
          </div>
          {/* Separator line - same as landing page */}
          <div className="container mx-auto px-8 md:px-4">
            <div className="w-full h-0.5 bg-white mt-6 md:mt-8"></div>
          </div>
        </section>

        {/* Services Accordion Section */}
        <section className="bg-black py-6 md:py-20">
          <div className="container mx-auto px-4 md:px-4 overflow-x-hidden">
          {/* Title */}
          <h2
            className="text-2xl md:text-4xl font-bold text-center text-white mb-8 md:mb-16"
            style={{ fontFamily: 'CONTHRAX-SB, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}
          >
            SERVICIOS EMPRESARIALES<br />PARA CADA NECESIDAD
          </h2>

          {/* Horizontal Accordion - Mobile */}
          <div 
            className="md:hidden relative flex h-[350px] overflow-hidden justify-center"
            style={{ 
              transform: 'translate3d(0,0,0)',
              backfaceVisibility: 'hidden',
              perspective: 1000
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Service 1 */}
            <div 
              className={`relative rounded-xl overflow-hidden cursor-pointer will-change-[width] ${
                activeMobileAccordionIndex === 0 ? 'w-[calc(100vw-8rem)] max-w-[350px]' : 'w-[60px] sm:w-[80px]'
              }`}
              style={{ 
                zIndex: 0 > activeMobileAccordionIndex ? 10 : 10,
                transition: 'width 200ms cubic-bezier(0.4, 0, 0.2, 1)',
                transform: 'translate3d(0,0,0)'
              }}
              onClick={() => setActiveMobileAccordionIndex(0)}
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src="/images/bussines/Viajes de Ngocios y reuniones.webp"
                  alt="Viajes de negocios y reuniones"
                  className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-between">
                {/* Content when expanded */}
                <div className={`flex-1 flex flex-col justify-end items-start px-6 pb-6 ${
                  activeMobileAccordionIndex === 0 ? 'opacity-100 transition-opacity duration-200' : 'opacity-0 pointer-events-none'
                }`}>
                  <h3 className="text-xl font-bold text-white mb-3 text-left">
                    Viajes de negocios y reuniones
                  </h3>
                  <p className="text-base text-white/90 leading-relaxed text-left">
                    Garantiza llegadas puntuales y salidas fluidas para sus ejecutivos y colaboradores. Chóferes profesionales, flota moderna y cobertura global para hacer de cada reunión una experiencia sin fricciones.
                  </p>
                </div>
                
                {/* Vertical title when collapsed */}
                <div className={`absolute bottom-8 left-8 transition-opacity duration-200 ${
                  activeMobileAccordionIndex === 0 ? 'opacity-0' : 'opacity-100'
                }`}>
                  <h3 className="text-sm md:text-base font-bold text-white whitespace-nowrap" style={{ transform: 'rotate(-90deg) translateY(-50%)', transformOrigin: '0 50%' }}>
                    Viajes de negocios y reuniones
                  </h3>
                </div>
              </div>
            </div>

            {/* Service 2 */}
            <div 
              className={`relative rounded-xl overflow-hidden cursor-pointer will-change-[width] -ml-[10px] ${
                activeMobileAccordionIndex === 1 ? 'w-[calc(100vw-8rem)] max-w-[350px]' : 'w-[60px] sm:w-[80px]'
              }`}
              style={{ 
                zIndex: 1 > activeMobileAccordionIndex ? 11 : 10,
                transition: 'width 200ms cubic-bezier(0.4, 0, 0.2, 1)',
                transform: 'translate3d(0,0,0)'
              }}
              onClick={() => setActiveMobileAccordionIndex(1)}
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src="/images/bussines/Traslados interciudad.webp"
                  alt="Traslados interciudad"
                  className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-between">
                {/* Content when expanded */}
                <div className={`flex-1 flex flex-col justify-end items-start px-6 pb-6 ${
                  activeMobileAccordionIndex === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}>
                  <h3 className="text-xl font-bold text-white mb-3 text-left">
                    Traslados interciudad
                  </h3>
                  <p className="text-base text-white/90 leading-relaxed text-left">
                    Conectamos ciudades con el máximo confort. Trabaje sin esfuerzo mientras viaja entre destinos. Ideal para ejecutivos que valoran su tiempo y productividad en trayectos largos.
                  </p>
                </div>
                
                {/* Vertical title when collapsed */}
                <div className={`absolute bottom-8 left-8 transition-opacity duration-200 ${
                  activeMobileAccordionIndex === 1 ? 'opacity-0' : 'opacity-100'
                }`}>
                  <h3 className="text-sm md:text-base font-bold text-white whitespace-nowrap" style={{ transform: 'rotate(-90deg) translateY(-50%)', transformOrigin: '0 50%' }}>
                    Traslados interciudad
                  </h3>
                </div>
              </div>
            </div>

            {/* Service 3 */}
            <div 
              className={`relative rounded-xl overflow-hidden cursor-pointer will-change-[width] -ml-[10px] ${
                activeMobileAccordionIndex === 2 ? 'w-[calc(100vw-8rem)] max-w-[350px]' : 'w-[60px] sm:w-[80px]'
              }`}
              style={{ 
                zIndex: 2 > activeMobileAccordionIndex ? 12 : 10,
                transition: 'width 200ms cubic-bezier(0.4, 0, 0.2, 1)',
                transform: 'translate3d(0,0,0)'
              }}
              onClick={() => setActiveMobileAccordionIndex(2)}
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src="/images/bussines/Aeropuertos en todo el mundo.webp"
                  alt="Aeropuertos en todo el mundo"
                  className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-between">
                {/* Content when expanded */}
                <div className={`flex-1 flex flex-col justify-end items-start px-6 pb-6 ${
                  activeMobileAccordionIndex === 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}>
                  <h3 className="text-xl font-bold text-white mb-3 text-left">
                    Aeropuertos en todo el mundo
                  </h3>
                  <p className="text-base text-white/90 leading-relaxed text-left">
                    Servicio global de traslados aeroportuarios. Monitoreo de vuelos en tiempo real, recepción personalizada y gestión integral de equipaje en más de 500 aeropuertos internacionales.
                  </p>
                </div>
                
                {/* Vertical title when collapsed */}
                <div className={`absolute bottom-8 left-8 transition-opacity duration-200 ${
                  activeMobileAccordionIndex === 2 ? 'opacity-0' : 'opacity-100'
                }`}>
                  <h3 className="text-sm md:text-base font-bold text-white whitespace-nowrap" style={{ transform: 'rotate(-90deg) translateY(-50%)', transformOrigin: '0 50%' }}>
                    Aeropuertos en todo el mundo
                  </h3>
                </div>
              </div>
            </div>

            {/* Service 4 */}
            <div 
              className={`relative rounded-xl overflow-hidden cursor-pointer will-change-[width] -ml-[10px] ${
                activeMobileAccordionIndex === 3 ? 'w-[calc(100vw-8rem)] max-w-[350px]' : 'w-[60px] sm:w-[80px]'
              }`}
              style={{ 
                zIndex: 3 > activeMobileAccordionIndex ? 13 : 10,
                transition: 'width 200ms cubic-bezier(0.4, 0, 0.2, 1)',
                transform: 'translate3d(0,0,0)'
              }}
              onClick={() => setActiveMobileAccordionIndex(3)}
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src="/images/bussines/Transporte para clientes y socios.webp"
                  alt="Transporte para clientes y socios"
                  className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-between">
                {/* Content when expanded */}
                <div className={`flex-1 flex flex-col justify-end items-start px-6 pb-6 ${
                  activeMobileAccordionIndex === 3 ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}>
                  <h3 className="text-xl font-bold text-white mb-3 text-left">
                    Transporte para clientes y socios
                  </h3>
                  <p className="text-base text-white/90 leading-relaxed text-left">
                    Impresione a sus invitados con un servicio excepcional. Atención personalizada y vehículos premium para fortalecer relaciones comerciales desde el primer momento.
                  </p>
                </div>
                
                {/* Vertical title when collapsed */}
                <div className={`absolute bottom-8 left-8 transition-opacity duration-200 ${
                  activeMobileAccordionIndex === 3 ? 'opacity-0' : 'opacity-100'
                }`}>
                  <h3 className="text-sm md:text-base font-bold text-white whitespace-nowrap" style={{ transform: 'rotate(-90deg) translateY(-50%)', transformOrigin: '0 50%' }}>
                    Transporte para clientes y socios
                  </h3>
                </div>
              </div>
            </div>

            {/* Service 5 - Default open */}
            <div 
              className={`relative rounded-xl overflow-hidden cursor-pointer will-change-[width] -ml-[10px] ${
                activeMobileAccordionIndex === 4 ? 'w-[calc(100vw-8rem)] max-w-[350px]' : 'w-[60px] sm:w-[80px]'
              }`}
              style={{ 
                zIndex: 4 > activeMobileAccordionIndex ? 14 : 10,
                transition: 'width 200ms cubic-bezier(0.4, 0, 0.2, 1)',
                transform: 'translate3d(0,0,0)'
              }}
              onClick={() => setActiveMobileAccordionIndex(4)}
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src="/images/bussines/Choferes corporativos por hora o dia.webp"
                  alt="Chóferes corporativos por hora o día completo"
                  className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-between">
                {/* Content when expanded */}
                <div className={`flex-1 flex flex-col justify-end items-start px-6 pb-6 ${
                  activeMobileAccordionIndex === 4 ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}>
                  <h3 className="text-xl font-bold text-white mb-3 text-left">
                    Chóferes corporativos por hora o día completo
                  </h3>
                  <p className="text-base text-white/90 leading-relaxed text-left">
                    Flexibilidad total para agendas dinámicas. Reserve un chófer dedicado por horas o días completos. Ideal para roadshows, eventos corporativos o jornadas con múltiples reuniones.
                  </p>
                </div>
                
                {/* Vertical title when collapsed */}
                <div className={`absolute bottom-8 left-8 transition-opacity duration-200 ${
                  activeMobileAccordionIndex === 4 ? 'opacity-0' : 'opacity-100'
                }`}>
                  <h3 className="text-sm md:text-base font-bold text-white whitespace-nowrap" style={{ transform: 'rotate(-90deg) translateY(-50%)', transformOrigin: '0 50%' }}>
                    Chóferes corporativos por hora o día completo
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Horizontal Accordion - Desktop */}
          <div className="hidden md:flex relative h-[400px] max-w-7xl mx-auto justify-center pl-20">
            {/* Service 1 */}
            <div 
              className={`relative rounded-xl overflow-hidden transition-all duration-700 cursor-pointer flex-shrink-0 ${
                activeAccordionIndex === 0 ? 'w-[380px] z-10' : 'w-[200px] z-[1]'
              }`}
              onClick={() => setActiveAccordionIndex(0)}
              onMouseEnter={() => setActiveAccordionIndex(0)}
            >
              <img
                src="/images/bussines/Viajes de Ngocios y reuniones.webp"
                alt="Viajes de negocios y reuniones"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className={`absolute bottom-0 left-0 p-4 text-left ${
                activeAccordionIndex !== 0 && activeAccordionIndex !== -1 ? 'z-20' : ''
              }`}>
                <div className={`${activeAccordionIndex === 0 ? 'max-w-[280px]' : 'max-w-[120px]'}`}>
                  <h3 className={`font-bold text-white transition-all duration-300 leading-tight ${
                    activeAccordionIndex === 0 ? 'text-xl mb-3' : 'text-xs'
                  }`}>
                    Viajes de negocios y reuniones
                  </h3>
                  <p className={`text-sm text-white/90 transition-all duration-300 overflow-hidden ${
                    activeAccordionIndex === 0 ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    Garantiza llegadas puntuales y salidas fluidas para tus ejecutivos y colaboradores. Chóferes profesionales, flota moderna y cobertura global para hacer de cada reunión una experiencia sin fricciones.
                  </p>
                </div>
              </div>
            </div>

            {/* Service 2 */}
            <div 
              className={`relative rounded-xl overflow-hidden transition-all duration-700 cursor-pointer flex-shrink-0 -ml-[50px] ${
                activeAccordionIndex === 1 ? 'w-[380px] z-10' : 'w-[200px] z-[2]'
              }`}
              onClick={() => setActiveAccordionIndex(1)}
              onMouseEnter={() => setActiveAccordionIndex(1)}
            >
              <img
                src="/images/bussines/Traslados interciudad.webp"
                alt="Traslados interciudad"
                className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className={`absolute bottom-0 left-0 p-4 text-left ${
                activeAccordionIndex !== 1 && activeAccordionIndex > 0 ? 'z-20' : ''
              }`}>
                <div className={`${activeAccordionIndex === 1 ? 'max-w-[280px]' : 'max-w-[120px]'}`}>
                  <h3 className={`font-bold text-white transition-all duration-300 leading-tight ${
                    activeAccordionIndex === 1 ? 'text-xl mb-3' : 'text-xs'
                  }`}>
                    Traslados interciudad
                  </h3>
                  <p className={`text-sm text-white/90 transition-all duration-300 overflow-hidden ${
                    activeAccordionIndex === 1 ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    Conectamos ciudades con el máximo confort. Trabaje sin esfuerzo mientras viaja entre destinos. Ideal para ejecutivos que valoran su tiempo y productividad en trayectos largos.
                  </p>
                </div>
              </div>
            </div>

            {/* Service 3 */}
            <div 
              className={`relative rounded-xl overflow-hidden transition-all duration-700 cursor-pointer flex-shrink-0 -ml-[50px] ${
                activeAccordionIndex === 2 ? 'w-[380px] z-10' : 'w-[200px] z-[3]'
              }`}
              onClick={() => setActiveAccordionIndex(2)}
              onMouseEnter={() => setActiveAccordionIndex(2)}
            >
              <img
                src="/images/bussines/Aeropuertos en todo el mundo.webp"
                alt="Aeropuertos en todo el mundo"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className={`absolute bottom-0 left-0 p-4 text-left ${
                activeAccordionIndex !== 2 && activeAccordionIndex > 1 ? 'z-20' : ''
              }`}>
                <div className={`${activeAccordionIndex === 2 ? 'max-w-[280px]' : 'max-w-[120px]'}`}>
                  <h3 className={`font-bold text-white transition-all duration-300 leading-tight ${
                    activeAccordionIndex === 2 ? 'text-xl mb-3' : 'text-xs'
                  }`}>
                    Aeropuertos en todo el mundo
                  </h3>
                  <p className={`text-sm text-white/90 transition-all duration-300 overflow-hidden ${
                    activeAccordionIndex === 2 ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    Servicio global de traslados aeroportuarios. Monitoreo de vuelos en tiempo real, recepción personalizada y gestión integral de equipaje en más de 500 aeropuertos internacionales.
                  </p>
                </div>
              </div>
            </div>

            {/* Service 4 */}
            <div 
              className={`relative rounded-xl overflow-hidden transition-all duration-700 cursor-pointer flex-shrink-0 -ml-[50px] ${
                activeAccordionIndex === 3 ? 'w-[380px] z-10' : 'w-[200px] z-[4]'
              }`}
              onClick={() => setActiveAccordionIndex(3)}
              onMouseEnter={() => setActiveAccordionIndex(3)}
            >
              <img
                src="/images/bussines/Transporte para clientes y socios.webp"
                alt="Transporte para clientes y socios"
                className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className={`absolute bottom-0 left-0 p-4 text-left ${
                activeAccordionIndex !== 3 && activeAccordionIndex > 2 ? 'z-20' : ''
              }`}>
                <div className={`${activeAccordionIndex === 3 ? 'max-w-[280px]' : 'max-w-[120px]'}`}>
                  <h3 className={`font-bold text-white transition-all duration-300 leading-tight ${
                    activeAccordionIndex === 3 ? 'text-xl mb-3' : 'text-xs'
                  }`}>
                    Transporte para clientes y socios
                  </h3>
                  <p className={`text-sm text-white/90 transition-all duration-300 overflow-hidden ${
                    activeAccordionIndex === 3 ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    Impresione a sus invitados con un servicio excepcional. Atención personalizada y vehículos premium para fortalecer relaciones comerciales desde el primer momento.
                  </p>
                </div>
              </div>
            </div>

            {/* Service 5 */}
            <div 
              className={`relative rounded-xl overflow-hidden transition-all duration-700 cursor-pointer flex-shrink-0 -ml-[50px] ${
                activeAccordionIndex === 4 ? 'w-[380px] z-10' : 'w-[200px] z-[5]'
              }`}
              onClick={() => setActiveAccordionIndex(4)}
              onMouseEnter={() => setActiveAccordionIndex(4)}
            >
              <img
                src="/images/bussines/Choferes corporativos por hora o dia.webp"
                alt="Chóferes corporativos por hora o día completo"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className={`absolute bottom-0 left-0 p-4 text-left`}>
                <div className={`${activeAccordionIndex === 4 ? 'max-w-[280px]' : 'max-w-[120px]'}`}>
                  <h3 className={`font-bold text-white transition-all duration-300 leading-tight ${
                    activeAccordionIndex === 4 ? 'text-xl mb-3' : 'text-xs'
                  }`}>
                    Chóferes corporativos por hora o día completo
                  </h3>
                  <p className={`text-sm text-white/90 transition-all duration-300 overflow-hidden ${
                    activeAccordionIndex === 4 ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    Flexibilidad total para agendas dinámicas. Reserve un chófer dedicado por horas o días completos. Ideal para roadshows, eventos corporativos o jornadas con múltiples reuniones.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Separator line */}
          <div className="w-full h-0.5 bg-white mt-12 md:mt-20 mx-4 md:mx-0"></div>
        </div>
      </section>

      {/* Strategic Partnerships Section */}
      <section className="bg-black py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Title */}
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-12 md:mb-16"
            style={{ fontFamily: 'CONTHRAX-SB, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}
          >
            ALIANZAS ESTRATÉGICAS<br />QUE AGREGAN VALOR
          </h2>

          {/* Desktop Grid - Hidden on mobile */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Hotels Card */}
            <div className="flex flex-col items-center">
              <div className="relative mb-6">
                {/* White background rectangle */}
                <div className="absolute -top-3 -left-3 w-full h-full bg-white"></div>
                {/* Main image */}
                <div className="relative w-full aspect-[4/5] overflow-hidden">
                  <img
                    src="/images/bussines/Hoteles.webp"
                    alt="Hoteles"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Text content below */}
              <div className="text-center px-2">
                <h3 className="text-lg font-bold text-white mb-2">Hoteles</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Ofrece traslados al aeropuerto y city tours privados como parte de tu experiencia de hospedaje premium.
                </p>
              </div>
            </div>

            {/* Airlines Card */}
            <div className="flex flex-col items-center">
              <div className="relative mb-6">
                {/* White background rectangle */}
                <div className="absolute -top-3 -left-3 w-full h-full bg-white"></div>
                {/* Main image */}
                <div className="relative w-full aspect-[4/5] overflow-hidden">
                  <img
                    src="/images/bussines/Aerolineas y aviacion privada.webp"
                    alt="Aerolíneas y aviación privada"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Text content below */}
              <div className="text-center px-2">
                <h3 className="text-lg font-bold text-white mb-2">Aerolíneas y aviación privada</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Proporcionamos los pasajeros de primera clase y jets privados con servicios de cortesía a marca blanca.
                </p>
              </div>
            </div>

            {/* Travel Agencies Card */}
            <div className="flex flex-col items-center">
              <div className="relative mb-6">
                {/* White background rectangle */}
                <div className="absolute -top-3 -left-3 w-full h-full bg-white"></div>
                {/* Main image */}
                <div className="relative w-full aspect-[4/5] overflow-hidden">
                  <img
                    src="/images/bussines/Agencia de viajes.webp"
                    alt="Agencias de viaje"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Text content below */}
              <div className="text-center px-2">
                <h3 className="text-lg font-bold text-white mb-2">Agencias de viaje</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Eleva la experiencia de tus clientes con transporte de lujo integrado a tu oferta. Servicio coherente en todo el mundo.
                </p>
              </div>
            </div>

            {/* Financial Sector Card */}
            <div className="flex flex-col items-center">
              <div className="relative mb-6">
                {/* White background rectangle */}
                <div className="absolute -top-3 -left-3 w-full h-full bg-white"></div>
                {/* Main image */}
                <div className="relative w-full aspect-[4/5] overflow-hidden">
                  <img
                    src="/images/bussines/Sector financiero.webp"
                    alt="Sector financiero"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Text content below */}
              <div className="text-center px-2">
                <h3 className="text-lg font-bold text-white mb-2">Sector financiero</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Implementa soluciones para clientes de carteras, servicio personalizado y soporte para clientes de alto valor.
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Slider - Only visible on mobile */}
          <div className="md:hidden">
            <div className="relative">
              {/* Slider container */}
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${activePartnershipSlide * 100}%)` }}>
                {/* Hotels Slide */}
                <div className="w-full flex-shrink-0 px-16">
                  <div className="flex flex-col items-center">
                    <div className="relative mb-6 w-full max-w-[280px]">
                      {/* White background rectangle */}
                      <div className="absolute -top-3 -left-3 w-full h-full bg-white"></div>
                      {/* Main image */}
                      <div className="relative w-full aspect-[4/5] overflow-hidden">
                        <img
                          src="/images/bussines/Hoteles.webp"
                          alt="Hoteles"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    {/* Text content below */}
                    <div className="text-center px-2">
                      <h3 className="text-xl font-bold text-white mb-2">Hoteles</h3>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        Ofrece traslados al aeropuerto y city tours privados como parte de tu experiencia de hospedaje premium.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Airlines Slide */}
                <div className="w-full flex-shrink-0 px-16">
                  <div className="flex flex-col items-center">
                    <div className="relative mb-6 w-full max-w-[280px]">
                      {/* White background rectangle */}
                      <div className="absolute -top-3 -left-3 w-full h-full bg-white"></div>
                      {/* Main image */}
                      <div className="relative w-full aspect-[4/5] overflow-hidden">
                        <img
                          src="/images/bussines/Aerolineas y aviacion privada.webp"
                          alt="Aerolíneas y aviación privada"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    {/* Text content below */}
                    <div className="text-center px-2">
                      <h3 className="text-xl font-bold text-white mb-2">Aerolíneas y aviación privada</h3>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        Proporcionamos los pasajeros de primera clase y jets privados con servicios de cortesía a marca blanca.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Travel Agencies Slide */}
                <div className="w-full flex-shrink-0 px-16">
                  <div className="flex flex-col items-center">
                    <div className="relative mb-6 w-full max-w-[280px]">
                      {/* White background rectangle */}
                      <div className="absolute -top-3 -left-3 w-full h-full bg-white"></div>
                      {/* Main image */}
                      <div className="relative w-full aspect-[4/5] overflow-hidden">
                        <img
                          src="/images/bussines/Agencia de viajes.webp"
                          alt="Agencias de viaje"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    {/* Text content below */}
                    <div className="text-center px-2">
                      <h3 className="text-xl font-bold text-white mb-2">Agencias de viaje</h3>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        Eleva la experiencia de tus clientes con transporte de lujo integrado a tu oferta. Servicio coherente en todo el mundo.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Financial Sector Slide */}
                <div className="w-full flex-shrink-0 px-16">
                  <div className="flex flex-col items-center">
                    <div className="relative mb-6 w-full max-w-[280px]">
                      {/* White background rectangle */}
                      <div className="absolute -top-3 -left-3 w-full h-full bg-white"></div>
                      {/* Main image */}
                      <div className="relative w-full aspect-[4/5] overflow-hidden">
                        <img
                          src="/images/bussines/Sector financiero.webp"
                          alt="Sector financiero"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    {/* Text content below */}
                    <div className="text-center px-2">
                      <h3 className="text-xl font-bold text-white mb-2">Sector financiero</h3>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        Implementa soluciones para clientes de carteras, servicio personalizado y soporte para clientes de alto valor.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation arrows */}
              <button
                onClick={() => setActivePartnershipSlide(prev => Math.max(0, prev - 1))}
                className={`absolute left-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-all ${
                  activePartnershipSlide === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={activePartnershipSlide === 0}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => setActivePartnershipSlide(prev => Math.min(3, prev + 1))}
                className={`absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-all ${
                  activePartnershipSlide === 3 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={activePartnershipSlide === 3}
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Dots indicator */}
              <div className="flex justify-center gap-2 mt-6">
                {[0, 1, 2, 3].map((index) => (
                  <button
                    key={index}
                    onClick={() => setActivePartnershipSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activePartnershipSlide === index ? 'bg-white w-6' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <div className="bg-black">
        <section className="relative">
          {/* Image section - half black, half white */}
          <div className="relative h-[400px] md:h-[500px]">
            <div className="absolute inset-0 bg-black h-1/2" />
            <div className="absolute inset-0 bg-white h-1/2 top-1/2" />
            
            {/* Image container */}
            <div className="relative h-full flex items-center justify-center">
              <img
                src="/images/bussines/Beneficios para tu empresa.webp"
                alt="Beneficios para tu empresa"
                className="relative z-10 w-11/12 md:w-4/5 max-w-6xl h-3/4 object-cover rounded-lg shadow-2xl"
              />
              
              {/* Title overlay */}
              <div className="absolute inset-0 flex items-end justify-center z-20 pb-20 md:pb-24">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white uppercase tracking-wider text-center px-4" style={{ fontFamily: 'CONTHRAX-SB' }}>
                  BENEFICIOS PARA TU EMPRESA
                </h2>
              </div>
            </div>
          </div>

          {/* Icons section */}
          <div className="bg-white py-16 md:py-20">
            <div className="container mx-auto px-6 md:px-12">
              {/* Icons container - Desktop */}
              <div className="hidden md:flex justify-center items-center gap-4 md:gap-8 mb-12">
                {/* Global coverage Icon */}
                <div className="relative group">
                  <img 
                    src="/images/benefits_bussines/Iconos-09.svg" 
                    alt="Cobertura global"
                    className="w-20 h-20 md:w-24 md:h-24 cursor-pointer transition-transform hover:scale-110"
                  />
                  {/* Hover dialog */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                    <div className="bg-black text-white p-3 rounded-lg shadow-xl w-64">
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                        <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-black"></div>
                      </div>
                      <h4 className="font-semibold mb-1 text-sm">Cobertura global</h4>
                      <p className="text-xs leading-relaxed">Disponible en más de 50 países con chóferes locales capacitados y de habla inglesa.</p>
                    </div>
                  </div>
                </div>

                {/* Connecting lines */}
                <div className="hidden md:block w-16 h-0.5 bg-gray-300"></div>

                {/* Easy bookings Icon */}
                <div className="relative group">
                  <img 
                    src="/images/benefits_bussines/Iconos-10.svg" 
                    alt="Reservas sin complicaciones"
                    className="w-20 h-20 md:w-24 md:h-24 cursor-pointer transition-transform hover:scale-110"
                  />
                  {/* Hover dialog */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                    <div className="bg-black text-white p-3 rounded-lg shadow-xl w-64">
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                        <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-black"></div>
                      </div>
                      <h4 className="font-semibold mb-1 text-sm">Reservas sin complicaciones</h4>
                      <p className="text-xs leading-relaxed">Plataforma todo en uno con confirmación instantánea y precios claros.</p>
                    </div>
                  </div>
                </div>

                {/* Connecting lines */}
                <div className="hidden md:block w-16 h-0.5 bg-gray-300"></div>

                {/* Automatic billing Icon */}
                <div className="relative group">
                  <img 
                    src="/images/benefits_bussines/Iconos-11.svg" 
                    alt="Facturación automática"
                    className="w-20 h-20 md:w-24 md:h-24 cursor-pointer transition-transform hover:scale-110"
                  />
                  {/* Hover dialog */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                    <div className="bg-black text-white p-3 rounded-lg shadow-xl w-64">
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                        <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-black"></div>
                      </div>
                      <h4 className="font-semibold mb-1 text-sm">Facturación automática</h4>
                      <p className="text-xs leading-relaxed">Gestiona múltiples viajes sin complicaciones administrativas.</p>
                    </div>
                  </div>
                </div>

                {/* Connecting lines */}
                <div className="hidden md:block w-16 h-0.5 bg-gray-300"></div>

                {/* 24/7 Support Icon */}
                <div className="relative group">
                  <img 
                    src="/images/benefits_bussines/Iconos-12.svg" 
                    alt="Soporte 24/7"
                    className="w-20 h-20 md:w-24 md:h-24 cursor-pointer transition-transform hover:scale-110"
                  />
                  {/* Hover dialog */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                    <div className="bg-black text-white p-3 rounded-lg shadow-xl w-64">
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                        <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-black"></div>
                      </div>
                      <h4 className="font-semibold mb-1 text-sm">Soporte 24/7 multilingüe</h4>
                      <p className="text-xs leading-relaxed">Atención personalizada para tu empresa, siempre disponible.</p>
                    </div>
                  </div>
                </div>

                {/* Connecting lines */}
                <div className="hidden md:block w-16 h-0.5 bg-gray-300"></div>

                {/* Electric vehicles Icon */}
                <div className="relative group">
                  <img 
                    src="/images/benefits_bussines/Iconos-13.svg" 
                    alt="Vehículos eléctricos"
                    className="w-20 h-20 md:w-24 md:h-24 cursor-pointer transition-transform hover:scale-110"
                  />
                  {/* Hover dialog */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                    <div className="bg-black text-white p-3 rounded-lg shadow-xl w-64">
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                        <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-black"></div>
                      </div>
                      <h4 className="font-semibold mb-1 text-sm">Gestión centralizada</h4>
                      <p className="text-xs leading-relaxed">Cuentas empresariales para más de 500 usuarios con descuentos exclusivos.</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Icons container - Mobile version (vertical with click reveal) */}
              <div className="md:hidden space-y-8 mb-12">
                {/* Icon 1 - Global coverage */}
                <div className="flex flex-col items-center text-center">
                  <button
                    onClick={() => setClickedBenefit(clickedBenefit === 0 ? null : 0)}
                    className="focus:outline-none"
                  >
                    <img 
                      src="/images/benefits_bussines/Iconos-09.svg" 
                      alt="Cobertura global"
                      className="w-40 h-40 mb-4 cursor-pointer transition-transform active:scale-95"
                    />
                  </button>
                  {/* Dialog that appears on click */}
                  <div className={`transition-opacity duration-200 ${
                    clickedBenefit === 0 
                      ? 'max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0 overflow-hidden'
                  }`}>
                    <div className="mt-2 relative">
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                        <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-black"></div>
                      </div>
                      <div className="bg-black text-white p-4 rounded-lg shadow-xl w-72 mx-auto mt-1">
                        <h4 className="font-semibold mb-2 text-base">Cobertura global</h4>
                        <p className="text-sm leading-relaxed">Disponible en más de 50 países con chóferes locales capacitados y de habla inglesa.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Icon 2 - Easy bookings */}
                <div className="flex flex-col items-center text-center">
                  <button
                    onClick={() => setClickedBenefit(clickedBenefit === 1 ? null : 1)}
                    className="focus:outline-none"
                  >
                    <img 
                      src="/images/benefits_bussines/Iconos-10.svg" 
                      alt="Reservas sin complicaciones"
                      className="w-40 h-40 mb-4 cursor-pointer transition-transform active:scale-95"
                    />
                  </button>
                  {/* Dialog that appears on click */}
                  <div className={`transition-opacity duration-200 ${
                    clickedBenefit === 1 
                      ? 'max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0 overflow-hidden'
                  }`}>
                    <div className="mt-2 relative">
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                        <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-black"></div>
                      </div>
                      <div className="bg-black text-white p-4 rounded-lg shadow-xl w-72 mx-auto mt-1">
                        <h4 className="font-semibold mb-2 text-base">Reservas sin complicaciones</h4>
                        <p className="text-sm leading-relaxed">Plataforma todo en uno con confirmación instantánea y precios claros.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Icon 3 - Automatic billing */}
                <div className="flex flex-col items-center text-center">
                  <button
                    onClick={() => setClickedBenefit(clickedBenefit === 2 ? null : 2)}
                    className="focus:outline-none"
                  >
                    <img 
                      src="/images/benefits_bussines/Iconos-11.svg" 
                      alt="Facturación automática"
                      className="w-40 h-40 mb-4 cursor-pointer transition-transform active:scale-95"
                    />
                  </button>
                  {/* Dialog that appears on click */}
                  <div className={`transition-opacity duration-200 ${
                    clickedBenefit === 2 
                      ? 'max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0 overflow-hidden'
                  }`}>
                    <div className="mt-2 relative">
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                        <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-black"></div>
                      </div>
                      <div className="bg-black text-white p-4 rounded-lg shadow-xl w-72 mx-auto mt-1">
                        <h4 className="font-semibold mb-2 text-base">Facturación automática</h4>
                        <p className="text-sm leading-relaxed">Gestiona múltiples viajes sin complicaciones administrativas.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Icon 4 - 24/7 Support */}
                <div className="flex flex-col items-center text-center">
                  <button
                    onClick={() => setClickedBenefit(clickedBenefit === 3 ? null : 3)}
                    className="focus:outline-none"
                  >
                    <img 
                      src="/images/benefits_bussines/Iconos-12.svg" 
                      alt="Soporte 24/7"
                      className="w-40 h-40 mb-4 cursor-pointer transition-transform active:scale-95"
                    />
                  </button>
                  {/* Dialog that appears on click */}
                  <div className={`transition-opacity duration-200 ${
                    clickedBenefit === 3 
                      ? 'max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0 overflow-hidden'
                  }`}>
                    <div className="mt-2 relative">
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                        <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-black"></div>
                      </div>
                      <div className="bg-black text-white p-4 rounded-lg shadow-xl w-72 mx-auto mt-1">
                        <h4 className="font-semibold mb-2 text-base">Soporte 24/7 multilingüe</h4>
                        <p className="text-sm leading-relaxed">Atención personalizada para tu empresa, siempre disponible.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Icon 5 - Centralized management */}
                <div className="flex flex-col items-center text-center">
                  <button
                    onClick={() => setClickedBenefit(clickedBenefit === 4 ? null : 4)}
                    className="focus:outline-none"
                  >
                    <img 
                      src="/images/benefits_bussines/Iconos-13.svg" 
                      alt="Gestión centralizada"
                      className="w-40 h-40 mb-4 cursor-pointer transition-transform active:scale-95"
                    />
                  </button>
                  {/* Dialog that appears on click */}
                  <div className={`transition-opacity duration-200 ${
                    clickedBenefit === 4 
                      ? 'max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0 overflow-hidden'
                  }`}>
                    <div className="mt-2 relative">
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                        <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-black"></div>
                      </div>
                      <div className="bg-black text-white p-4 rounded-lg shadow-xl w-72 mx-auto mt-1">
                        <h4 className="font-semibold mb-2 text-base">Gestión centralizada</h4>
                        <p className="text-sm leading-relaxed">Cuentas empresariales para más de 500 usuarios con descuentos exclusivos.</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Contact Form Section */}
      <section className="bg-black py-16 md:py-24 pb-24 md:pb-32">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-4 uppercase" style={{ fontFamily: 'CONTHRAX-SB' }}>
            ¿LISTO PARA ELEVAR<br />
            LA MOVILIDAD DE TU EMPRESA?
          </h2>
          <p className="text-center text-white/80 mb-12 text-lg">
            Contáctanos para diseñar una solución corporativa a tu medida.
          </p>

          {/* Form Container */}
          <div className="bg-white rounded-2xl p-8 md:p-12">
            <p className="text-center text-gray-600 mb-8 text-sm">
              Completa este formulario y en el siguiente paso creará su cuenta de empresa para acceder a tarifas corporativas.
            </p>

            <form className="space-y-6">
              {/* Name and Last Name Row */}
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 md:px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Apellidos
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 md:px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Country, Prefix and Phone Row */}
              <div className="grid grid-cols-3 gap-2 md:gap-4">
                <div className="col-span-1">
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                    País
                  </label>
                  <select
                    className="w-full px-2 md:px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none text-sm md:text-base"
                    value="España"
                  >
                    <option>España</option>
                    <option>México</option>
                    <option>Argentina</option>
                    <option>Colombia</option>
                    <option>Chile</option>
                    <option>Perú</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                    Prefijo
                  </label>
                  <select
                    className="w-full px-2 md:px-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm md:text-base"
                    value="+34"
                  >
                    <option>+34</option>
                    <option>+52</option>
                    <option>+54</option>
                    <option>+57</option>
                    <option>+56</option>
                    <option>+51</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                    Número de Teléfono
                  </label>
                  <input
                    type="tel"
                    className="w-full px-2 md:px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm md:text-base"
                    required
                  />
                </div>
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de la Empresa
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ¿Dónde está ubicado?
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Ciudad, Estado/Provincia"
                  required
                />
              </div>

              {/* Company Size and How did you hear */}
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                    Tamaño de la empresa
                  </label>
                  <select
                    className="w-full px-2 md:px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none text-sm md:text-base"
                    value="1-10 empleados"
                  >
                    <option>1-10 empleados</option>
                    <option>11-50 empleados</option>
                    <option>51-200 empleados</option>
                    <option>201-500 empleados</option>
                    <option>500+ empleados</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                    ¿Cómo se enteró de nosotros?
                  </label>
                  <select
                    className="w-full px-2 md:px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none text-sm md:text-base"
                    value="Búsqueda en Google"
                  >
                    <option>Búsqueda en Google</option>
                    <option>Redes sociales</option>
                    <option>Recomendación</option>
                    <option>Publicidad</option>
                    <option>Otro</option>
                  </select>
                </div>
              </div>

              {/* Additional help */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ¿Cómo podemos ayudarte?
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  placeholder="Cuéntanos más sobre las necesidades de transporte de tu empresa..."
                />
              </div>

              {/* Submit Button */}
              <div className="text-center pt-4">
                <button
                  type="submit"
                  className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  onClick={handleContactSubmit}
                >
                  Continuar al registro
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Phone Mockup Overlap - Positioned for Footer */}
      <div className="relative hidden lg:block">
        <div className="absolute right-0 bottom-0 transform translate-y-2/3 z-30">
          <div className="relative w-[700px] xl:w-[800px] 2xl:w-[900px]">
            <img
              src="/images/smartphone_14_pro_31.webp"
              alt="Privyde App"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      <Footer />
      
      {/* Support Chat */}
      <SupportChat />
      </div>
    </>
  );
};

export default Companies;