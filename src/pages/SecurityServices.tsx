import { useState, useRef } from "react";
import "../App.css";
import Image from "@/components/ui/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingForm from "@/components/booking-form";
import DownloadSection from "@/components/download-section";
import {
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  UserCheck,
  Lock,
  Layers,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Star,
} from "lucide-react";

const SecurityServices = () => {
  // Estado para controlar qué clase de servicio está seleccionada
  const [activeServiceClass, setActiveServiceClass] = useState<number>(0);

  // Estado para controlar qué FAQ está abierta
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Estado para controlar qué nivel de seguridad está seleccionado
  const [activeSecurityLevel, setActiveSecurityLevel] =
    useState<string>("standard");

  // Toggle para abrir/cerrar FAQs
  const toggleFaq = (index: number) => {
    if (openFaqIndex === index) {
      setOpenFaqIndex(null);
    } else {
      setOpenFaqIndex(index);
    }
  };

  // Referencia para el slider
  const sliderRef = useRef<HTMLDivElement>(null);

  // Funciones para manejar el slider
  const handlePrev = () => {
    if (activeServiceClass > 0) {
      setActiveServiceClass(activeServiceClass - 1);
    } else {
      setActiveServiceClass(securityVehicles.length - 1);
    }
  };

  const handleNext = () => {
    if (activeServiceClass < securityVehicles.length - 1) {
      setActiveServiceClass(activeServiceClass + 1);
    } else {
      setActiveServiceClass(0);
    }
  };

  // Datos de vehículos de seguridad
  const securityVehicles = [
    {
      id: 1,
      title: "Ejecutivo Protegido",
      description:
        "Mercedes E-Class blindado B4, BMW Serie 5 Security, o similar",
      capacity: "Capacidad para 3 personas",
      security: "Protección nivel B4 - resistente a armas de fuego de mano",
      availability: "Aspecto discreto, indistinguible de un vehículo estándar",
      image:
        "https://via.placeholder.com/600x350/ccc/fff?text=Ejecutivo+Protegido",
    },
    {
      id: 2,
      title: "Luxury Escudo",
      description:
        "Mercedes S-Class Guard B6, BMW Serie 7 High Security, o similar",
      capacity: "Capacidad para 3 personas",
      security: "Protección nivel B6/B7 - resistente a armas de asalto",
      availability: "Discreto con apariencia de alta gama ejecutiva",
      image: "https://via.placeholder.com/600x350/ccc/fff?text=Luxury+Escudo",
    },
    {
      id: 3,
      title: "SUV Táctico",
      description: "Range Rover Sentinel, BMW X5 Protection VR6, o similar",
      capacity: "Capacidad para 4 personas",
      security:
        "Protección completa - vidrios anti-balas y suelo anti-explosión",
      availability: "Mayor capacidad todo-terreno con seguridad integrada",
      image: "https://via.placeholder.com/600x350/ccc/fff?text=SUV+Táctico",
    },
    {
      id: 4,
      title: "Convoy Ejecutivo",
      description:
        "Mercedes G-Class, Cadillac Escalade ESV blindado, o similar",
      capacity: "Capacidad para 4-6 personas",
      security: "Solución completa con vehículo principal y escolta",
      availability: "Ideal para delegaciones o ejecutivos de alto perfil",
      image:
        "https://via.placeholder.com/600x350/ccc/fff?text=Convoy+Ejecutivo",
    },
    {
      id: 5,
      title: "Discreto Ultra-Seguro",
      description: "Vehículos normales con mejoras invisibles de seguridad",
      capacity: "Capacidad según modelo seleccionado",
      security: "Diversas opciones de protección en vehículos no llamativos",
      availability: "Máxima discreción con seguridad oculta",
      image:
        "https://via.placeholder.com/600x350/ccc/fff?text=Discreto+Ultra-Seguro",
    },
  ];

  // Datos para los niveles de seguridad
  const securityLevels = {
    standard: {
      title: "Protección estándar",
      icon: <ShieldCheck className="h-8 w-8 text-black" data-oid="jighp1b" />,
      points: [
        "Chófer con capacitación en conducción defensiva",
        "Vehículo con elementos básicos de seguridad pasiva",
        "Planificación previa de rutas y alternativas",
        "Comunicación constante con centro de operaciones",
        "Perfil discreto para no atraer atención innecesaria",
      ],
    },
    enhanced: {
      title: "Protección reforzada",
      icon: <Lock className="h-8 w-8 text-black" data-oid="3sreuq5" />,
      points: [
        "Vehículo blindado nivel B4 o superior con vidrios anti-balas",
        "Chófer con formación avanzada en conducción evasiva",
        "Verificación preventiva y continua del entorno",
        "Coordinación con servicios locales de seguridad",
        "Protocolos de emergencia con rutas alternativas",
      ],
    },
    executive: {
      title: "Protección ejecutiva",
      icon: <UserCheck className="h-8 w-8 text-black" data-oid=":g34kb:" />,
      points: [
        "Vehículo blindado de alta resistencia (B6/B7)",
        "Equipo de seguridad personal discreta",
        "Reconocimiento y evaluación previa de lugares a visitar",
        "Sistemas anti-rastreo y anti-interferencia electrónica",
        "Comunicación cifrada entre equipo y centro de operaciones",
      ],
    },
    complete: {
      title: "Solución integral",
      icon: <Layers className="h-8 w-8 text-black" data-oid="8r1eh-g" />,
      points: [
        "Convoy de varios vehículos con escolta",
        "Equipo completo de protección personal",
        "Coordinación con seguridad en destinos",
        "Planificación estratégica y logística a nivel internacional",
        "Evaluación de amenazas personalizada y actualizada en tiempo real",
      ],
    },
  };

  // Testimonios de clientes
  const testimonials = [
    {
      name: "Ricardo Velázquez",
      position: "Director de Seguridad, Multinacional Energética",
      text: "Privyde ha redefinido nuestros estándares de seguridad ejecutiva. Su enfoque discreto pero altamente efectivo permite que nuestros directivos viajen con total tranquilidad sin llamar la atención. La combinación de vehículos de lujo con medidas de seguridad avanzadas es exactamente lo que buscábamos.",
      stars: 5,
    },
    {
      name: "Elena Domínguez",
      position: "Jefa de Operaciones, Grupo Financiero Internacional",
      text: "Después de incidentes de seguridad en uno de nuestros mercados emergentes, contratamos los servicios de Privyde. La diferencia fue inmediata: mantuvieron un perfil bajo pero con protección de primer nivel. Pudimos continuar con nuestras operaciones sin interrupción y con la tranquilidad de contar con profesionales experimentados.",
      stars: 5,
    },
    {
      name: "Alejandro Méndez",
      position: "Empresario y Figura Pública",
      text: "Como figura mediática, necesitaba un servicio que me permitiera mantener mi privacidad sin sacrificar la seguridad. El enfoque personalizado de Privyde y su capacidad para adaptarse a diferentes niveles de amenaza según las circunstancias ha sido invaluable. Su discreción es tan impecable como su servicio.",
      stars: 5,
    },
  ];

  // Datos de las preguntas frecuentes
  const faqData = [
    {
      question: "¿Cómo evalúan el nivel de seguridad que necesito?",
      answer: (
        <div className="text-gray-600" data-oid="akat:gi">
          <p className="mb-2" data-oid="dgks69p">
            Nuestro proceso de evaluación es exhaustivo y personalizado:
          </p>
          <ul className="list-disc pl-5 space-y-1" data-oid="i3c_e7c">
            <li data-oid="n3iayz7">
              Consulta inicial confidencial para entender sus circunstancias
              específicas
            </li>
            <li data-oid=":ycx46w">
              Análisis de riesgo basado en su perfil, destinos frecuentes y
              contexto
            </li>
            <li data-oid="d1_okpb">
              Evaluación de amenazas potenciales específicas a su industria o
              posición
            </li>
            <li data-oid="p52k2d5">
              Consideración de preferencias personales y requisitos de
              privacidad
            </li>
            <li data-oid="za.:x:0">
              Recomendación de un plan de seguridad escalonado y adaptable
            </li>
          </ul>
          <p className="mt-2" data-oid="b-p7jwv">
            Cada solución se adapta precisamente a sus necesidades reales,
            evitando tanto la insuficiencia como el exceso de medidas que
            podrían llamar la atención innecesariamente.
          </p>
        </div>
      ),
    },
    {
      question: "¿Qué formación tiene su personal de seguridad?",
      answer: (
        <div className="text-gray-600" data-oid="qnprlqn">
          <p className="mb-2" data-oid="0:a70g2">
            Nuestro personal cuenta con credenciales excepcionales:
          </p>
          <ul className="list-disc pl-5 space-y-1" data-oid="l:ys9-l">
            <li data-oid="q-5v.jr">
              <strong data-oid="fo7ab5b">Chóferes de seguridad:</strong>{" "}
              Formación en conducción evasiva y defensiva avanzada, certificados
              internacionales
            </li>
            <li data-oid="hma-j79">
              <strong data-oid="zz8o8f8">Agentes de protección:</strong>{" "}
              Experiencia previa en fuerzas de élite o unidades especializadas
            </li>
            <li data-oid="x:ihi:g">
              <strong data-oid="xa_0wto">Coordinadores:</strong> Formación
              específica en gestión de crisis y logística de seguridad
            </li>
            <li data-oid="ja_z5jp">
              <strong data-oid="tf2nx:.">Analistas:</strong> Especialistas en
              evaluación de riesgos y amenazas con experiencia internacional
            </li>
          </ul>
          <p className="mt-2" data-oid="tx4ifh9">
            Todo nuestro personal pasa por rigurosos procesos de selección,
            verificación de antecedentes y capacitación continua. Además, están
            formados específicamente en servicios discretos que combinan
            seguridad con elegancia y profesionalismo.
          </p>
        </div>
      ),
    },
    {
      question: "¿Sus vehículos blindados son reconocibles externamente?",
      answer: (
        <p className="text-gray-600" data-oid="2u639m7">
          Una de nuestras principales ventajas es la absoluta discreción visual
          de nuestra flota. Nuestros vehículos blindados utilizan las técnicas
          más avanzadas de integración de protección, haciendo imposible
          distinguirlos de vehículos de lujo estándar. A diferencia de
          soluciones tradicionales de blindaje que añaden peso visible y
          modifican la apariencia, trabajamos con fabricantes que implementan
          elementos de seguridad desde el diseño original. Los vidrios
          anti-balas mantienen la transparencia y aspecto normal, las
          carrocerías reforzadas conservan las líneas elegantes del vehículo, y
          los sistemas defensivos quedan completamente ocultos. Esta discreción
          es fundamental para nuestra filosofía: la mejor seguridad es aquella
          que permanece invisible.
        </p>
      ),
    },
    {
      question: "¿Cómo garantizan la privacidad y confidencialidad?",
      answer: (
        <div className="text-gray-600" data-oid="_q3pkxy">
          <p className="mb-2" data-oid="uxe9ntn">
            La confidencialidad es un pilar fundamental de nuestro servicio:
          </p>
          <ul className="list-disc pl-5 space-y-1" data-oid="d297m.s">
            <li data-oid="vgqyr06">
              Acuerdos de confidencialidad estrictos con todo nuestro personal
            </li>
            <li data-oid="zza_ea9">
              Sistemas de comunicación cifrados de extremo a extremo
            </li>
            <li data-oid="lmut:ff">
              Información compartimentada según el principio de "necesidad de
              conocimiento"
            </li>
            <li data-oid="rf4vkfa">
              Planificación de rutas y operaciones en entornos seguros
            </li>
            <li data-oid="yxkez2o">
              Protección contra vigilancia electrónica en nuestros vehículos
            </li>
            <li data-oid="t.sxm1_">
              Protocolos anti-seguimiento físico y digital
            </li>
          </ul>
          <p className="mt-2" data-oid="lkc:nsx">
            Nuestros clientes valoran que mantenemos el mismo nivel de
            discreción incluso después de finalizado el servicio. Su privacidad
            es permanente, no temporal.
          </p>
        </div>
      ),
    },
    {
      question: "¿Pueden proporcionar seguridad en destinos internacionales?",
      answer: (
        <div className="text-gray-600" data-oid="hhom_a6">
          <p className="mb-2" data-oid="f56w_7q">
            Ofrecemos cobertura global con conocimiento local:
          </p>
          <ul className="list-disc pl-5 space-y-1" data-oid="runucik">
            <li data-oid="o7r-qrc">Presencia operativa en más de 90 países</li>
            <li data-oid="f-oa:it">
              Red de asociados locales verificados en destinos específicos
            </li>
            <li data-oid="-7.3oht">
              Equipos que conocen las particularidades culturales y geográficas
              de cada región
            </li>
            <li data-oid="atnwlac">
              Evaluaciones de riesgo específicas por país y ciudad
            </li>
            <li data-oid="bt_kkiu">
              Capacidad de gestionar servicios transfronterizos complejos
            </li>
          </ul>
          <p className="mt-2" data-oid="_17r_6a">
            Para viajes internacionales, proporcionamos un informe previo
            detallado sobre la situación de seguridad del destino y adaptamos
            nuestro servicio según las normativas y desafíos locales,
            garantizando una experiencia fluida sin comprometer la seguridad.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white" data-oid="z6rpal3">
      {/* Navigation */}
      <Navbar data-oid="y3lxe6u" />

      {/* Hero Section con imagen a ancho completo */}
      <div className="flex flex-col w-full" data-oid="fuw--bo">
        {/* Title Bar */}
        <div className="title-bar relative" data-oid="0ao2lpc">
          <div className="container mx-auto px-4" data-oid="v66l3pa">
            <h1 className="text-3xl font-bold text-black" data-oid="mxpplra">
              Servicios de seguridad ejecutiva discreta
            </h1>
          </div>
        </div>

        {/* Image Container */}
        <div className="hero-container relative" data-oid=".8qcnr8">
          {/* Background Image */}
          <div className="full-size-background" data-oid="i3je9c.">
            <Image
              src="/images/security.png"
              alt="Chófer profesional abriendo la puerta de un vehículo de seguridad ejecutiva"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
              data-oid="5cjrnxg"
            />
          </div>

          {/* Booking Widget - Solo visible en pantallas grandes (lg) */}
          <div
            className="booking-widget-container-overlay hidden lg:block"
            data-oid="ivsrsrk"
          >
            <BookingForm data-oid="8ds1mi0" />
          </div>
        </div>
      </div>

      {/* Booking Widget - Solo visible en tablets y móviles (fuera del hero) */}
      <div
        className="lg:hidden mx-auto px-4 mb-8 mt-6 relative z-30"
        data-oid="b1.5dcl"
      >
        <BookingForm data-oid="khdyuf:" />
      </div>

      {/* Moments Banner */}
      <div className="bg-gray-100 py-12" data-oid="u98dkc:">
        <div className="container mx-auto px-4 text-center" data-oid="pip-qpf">
          <h2
            className="text-3xl font-bold text-gray-900 mb-4"
            data-oid="6j8c79:"
          >
            Seguridad ejecutiva sin comprometer la elegancia
          </h2>
          <p
            className="text-lg text-gray-700 max-w-3xl mx-auto"
            data-oid="nj9wnmo"
          >
            Proporcionamos protección de alto nivel con absoluta discreción.
            Nuestros servicios combinan la máxima seguridad con la sofisticación
            esperada en el transporte ejecutivo de primer nivel.
          </p>
        </div>
      </div>

      {/* Download Section */}
      <DownloadSection data-oid="zknu_sz" />

      {/* Main Content */}
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 max-w-6xl"
        data-oid="ef:yd19"
      >
        {/* Security Vehicles Section */}
        <section className="mb-20" data-oid="pc6n4wv">
          <h2
            className="text-3xl font-bold text-center text-gray-900 mb-12 relative"
            data-oid="61nagcg"
          >
            Flota de seguridad exclusiva
            <span
              className="block w-24 h-1 bg-black mx-auto mt-4"
              data-oid="9ze01-1"
            ></span>
          </h2>

          {/* Slider con flechas de navegación */}
          <div className="relative" ref={sliderRef} data-oid="r106fl.">
            <div className="overflow-hidden" data-oid="40s-::.">
              <div
                className="flex flex-wrap lg:flex-nowrap justify-center"
                data-oid="sf:_h6m"
              >
                {/* Contenido del slider */}
                <div className="w-full relative" data-oid="c--nkcc">
                  {/* Card principal */}
                  <div
                    className="bg-gray-200 rounded-lg overflow-hidden shadow-lg"
                    data-oid="yl:kgsx"
                  >
                    <div className="relative" data-oid="7f16n1v">
                      {/* Flechas de navegación */}
                      <button
                        onClick={handlePrev}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-r-lg z-10 shadow-md"
                        aria-label="Anterior"
                        data-oid="39zuxna"
                      >
                        <ChevronLeft
                          className="h-5 w-5 text-gray-800"
                          data-oid="yvbbkku"
                        />
                      </button>

                      <img
                        src={securityVehicles[activeServiceClass].image}
                        alt={securityVehicles[activeServiceClass].title}
                        className="w-full h-64 md:h-80 object-cover object-center"
                        data-oid="-l_.l2r"
                      />

                      <button
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-l-lg z-10 shadow-md"
                        aria-label="Siguiente"
                        data-oid="6.:z3pl"
                      >
                        <ChevronRight
                          className="h-5 w-5 text-gray-800"
                          data-oid="qnaygie"
                        />
                      </button>

                      {/* Indicadores de diapositiva */}
                      <div
                        className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2"
                        data-oid="zytlqo_"
                      >
                        {securityVehicles.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setActiveServiceClass(index)}
                            className={`w-2 h-2 rounded-full ${
                              activeServiceClass === index
                                ? "bg-gray-1000"
                                : "bg-white bg-opacity-70"
                            }`}
                            aria-label={`Ir a diapositiva ${index + 1}`}
                            data-oid="wzpidno"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="p-6" data-oid="6_an0mr">
                      <h3
                        className="text-2xl font-bold text-gray-900 mb-2"
                        data-oid="8p4aqyp"
                      >
                        {securityVehicles[activeServiceClass].title}
                      </h3>
                      <p
                        className="text-gray-700 text-sm mb-4"
                        data-oid="9c8834p"
                      >
                        {securityVehicles[activeServiceClass].description}
                      </p>

                      <div
                        className="border-t border-gray-200 pt-4"
                        data-oid="c196hzb"
                      >
                        <ul className="space-y-3" data-oid="j-rhlpy">
                          <li className="flex items-start" data-oid="5mebg-0">
                            <CheckCircle
                              className="h-5 w-5 text-gray-600 mr-2 mt-0.5 flex-shrink-0"
                              data-oid=".f73uu:"
                            />

                            <span
                              className="text-gray-700 text-sm"
                              data-oid="a7aqt0c"
                            >
                              {securityVehicles[activeServiceClass].capacity}
                            </span>
                          </li>
                          <li className="flex items-start" data-oid="kt6w391">
                            <CheckCircle
                              className="h-5 w-5 text-gray-600 mr-2 mt-0.5 flex-shrink-0"
                              data-oid="s5pcw1m"
                            />

                            <span
                              className="text-gray-700 text-sm"
                              data-oid="6.:typl"
                            >
                              {securityVehicles[activeServiceClass].security}
                            </span>
                          </li>
                          <li className="flex items-start" data-oid="z2pex6u">
                            <CheckCircle
                              className="h-5 w-5 text-gray-600 mr-2 mt-0.5 flex-shrink-0"
                              data-oid="-jskfv4"
                            />

                            <span
                              className="text-gray-700 text-sm"
                              data-oid="k_1sy.u"
                            >
                              {
                                securityVehicles[activeServiceClass]
                                  .availability
                              }
                            </span>
                          </li>
                        </ul>
                      </div>

                      {/* Selector de páginas numerado */}
                      <div
                        className="flex justify-center mt-6 space-x-1"
                        data-oid=":1x9y3x"
                      >
                        {securityVehicles.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setActiveServiceClass(index)}
                            className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-medium ${
                              activeServiceClass === index
                                ? "bg-black text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                            data-oid="ec.j5pc"
                          >
                            {index + 1}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Levels Section */}
        <section className="mb-20" data-oid=".36r4lb">
          <h2
            className="text-3xl font-bold text-center text-gray-900 mb-12 relative"
            data-oid="i9i_bsl"
          >
            Niveles de protección personalizados
            <span
              className="block w-24 h-1 bg-black mx-auto mt-4"
              data-oid="6un6zw6"
            ></span>
          </h2>

          {/* Selector de niveles de seguridad */}
          <div
            className="flex flex-wrap justify-center mb-12"
            data-oid="k_1-e.-"
          >
            {Object.entries(securityLevels).map(([key, level]) => (
              <button
                key={key}
                className={`flex items-center px-6 py-3 m-2 rounded-full transition-all ${
                  activeSecurityLevel === key
                    ? "bg-gray-1000 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveSecurityLevel(key)}
                data-oid="q4ddu-w"
              >
                <span className="mr-2" data-oid="nrms8b4">
                  {level.icon}
                </span>
                <span className="font-medium" data-oid="y0yn2n5">
                  {level.title}
                </span>
              </button>
            ))}
          </div>

          {/* Contenido del nivel de seguridad seleccionado */}
          {Object.entries(securityLevels).map(([key, level]) => (
            <div
              key={key}
              className={`transition-opacity duration-300 ${
                activeSecurityLevel === key
                  ? "block opacity-100"
                  : "hidden opacity-0"
              }`}
              data-oid="ueg2oc0"
            >
              <div
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                data-oid="pi2.geg"
              >
                <div data-oid="lq7pz:_">
                  <div
                    className="bg-gray-50 p-8 rounded-xl border border-gray-200 shadow-sm"
                    data-oid="ucj.3rx"
                  >
                    <div className="flex items-center mb-6" data-oid="1twxqs5">
                      {level.icon}
                      <h3
                        className="text-2xl font-bold text-gray-900 ml-3"
                        data-oid="1l_tbk_"
                      >
                        {level.title}
                      </h3>
                    </div>

                    <ul className="space-y-3" data-oid="l70s:h4">
                      {level.points.map((point, index) => (
                        <li
                          key={index}
                          className="flex items-start"
                          data-oid="68cyjp:"
                        >
                          <Star
                            className="h-5 w-5 text-black mr-2 mt-0.5 flex-shrink-0"
                            data-oid=".jpiusr"
                          />

                          <span className="text-gray-700" data-oid="dlmu4q0">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div
                  className="relative h-96 rounded-xl overflow-hidden shadow-lg"
                  data-oid="cf0yz1y"
                >
                  <img
                    src={`https://source.unsplash.com/random/800x600/?${key === "standard" ? "executive+car" : key === "enhanced" ? "security+vehicle" : key === "executive" ? "bodyguard+discrete" : "convoy+security"}`}
                    alt={`Nivel de seguridad: ${level.title}`}
                    className="w-full h-full object-cover"
                    data-oid="4g2.jbv"
                  />

                  <div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-6"
                    data-oid="_a47b94"
                  >
                    <h3 className="text-xl font-bold mb-2" data-oid="bu5otvu">
                      {level.title}
                    </h3>
                    <p className="text-sm opacity-90" data-oid="qk12qtq">
                      Seguridad adaptada a sus necesidades específicas
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Testimonials */}
        <section className="mb-20" data-oid="ycg-_e5">
          <h2
            className="text-3xl font-bold text-center text-gray-900 mb-12 relative"
            data-oid="uybdl21"
          >
            La confianza de nuestros clientes
            <span
              className="block w-24 h-1 bg-black mx-auto mt-4"
              data-oid="wag0-rq"
            ></span>
          </h2>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            data-oid="_exr2nv"
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
                data-oid="c7p-wsm"
              >
                <div className="flex items-center mb-4" data-oid="ty2.wk.">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-gray-400 fill-current"
                      data-oid="mcximm9"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic" data-oid="-_-x4hk">
                  "{testimonial.text}"
                </p>
                <div data-oid="987mwb8">
                  <p className="font-semibold text-gray-900" data-oid="4irzv2r">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500 text-sm" data-oid="p5dn7ru">
                    {testimonial.position}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20" data-oid="r6rh5sr">
          <h2
            className="text-3xl font-bold text-center text-gray-900 mb-12 relative"
            data-oid="x00dz9m"
          >
            Preguntas frecuentes sobre seguridad ejecutiva
            <span
              className="block w-24 h-1 bg-black mx-auto mt-4"
              data-oid="6s.w3fd"
            ></span>
          </h2>

          <div className="space-y-4 max-w-4xl mx-auto" data-oid="o80mb7d">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl border ${openFaqIndex === index ? "border-gray-200 shadow-md" : "border-gray-200"} overflow-hidden transition-all duration-300`}
                data-oid="kwwr9j1"
              >
                <button
                  className="flex justify-between items-center w-full p-6 text-left"
                  onClick={() => toggleFaq(index)}
                  data-oid="feaz28b"
                >
                  <h3
                    className={`text-xl font-semibold ${openFaqIndex === index ? "text-gray-600" : "text-gray-900"}`}
                    data-oid=":ftrgpj"
                  >
                    {faq.question}
                  </h3>
                  <div
                    className={`${openFaqIndex === index ? "text-black bg-gray-100" : "text-gray-400 bg-gray-50"} rounded-full p-1 transition-colors duration-300`}
                    data-oid="br79tf-"
                  >
                    {openFaqIndex === index ? (
                      <ChevronUp className="h-5 w-5" data-oid="s0acpul" />
                    ) : (
                      <ChevronDown className="h-5 w-5" data-oid="rz--ezt" />
                    )}
                  </div>
                </button>
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    openFaqIndex === index
                      ? "max-h-[1000px] opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                  data-oid="euv:0ye"
                >
                  <div className="px-6 pb-6 pt-0" data-oid="dmlgd0k">
                    <div
                      className="border-t border-gray-200 pt-4 text-left"
                      data-oid="ee95upx"
                    >
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer data-oid="yvid6:3" />
    </div>
  );
};

export default SecurityServices;
