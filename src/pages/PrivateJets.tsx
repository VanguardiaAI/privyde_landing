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
  Clock,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Shield,
  Star,
  Plane,
} from "lucide-react";

const PrivateJets = () => {
  // Estado para controlar qué clase de servicio está seleccionada
  const [activeServiceClass, setActiveServiceClass] = useState<number>(0);

  // Estado para controlar qué FAQ está abierta
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

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
      setActiveServiceClass(serviceClasses.length - 1);
    }
  };

  const handleNext = () => {
    if (activeServiceClass < serviceClasses.length - 1) {
      setActiveServiceClass(activeServiceClass + 1);
    } else {
      setActiveServiceClass(0);
    }
  };

  // Datos de clases de servicio para jets privados
  const serviceClasses = [
    {
      id: 1,
      title: "Light Jet",
      description:
        "Cessna Citation CJ3, Embraer Phenom 300, Learjet 75, o similar",
      capacity: "Capacidad para 6-8 personas",
      luggage: "Capacidad para equipaje de mano y hasta 8 maletas estándar",
      availability:
        "Ideal para vuelos nacionales y regionales de hasta 3 horas",
      range: "Autonomía de vuelo de aproximadamente 2.000 km",
      image:
        "https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    },
    {
      id: 2,
      title: "Midsize Jet",
      description:
        "Cessna Citation XLS, Gulfstream G150, Hawker 800XP, o similar",
      capacity: "Capacidad para 8-10 personas",
      luggage: "Amplio espacio para equipaje, hasta 10 maletas estándar",
      availability: "Disponible para vuelos continentales de hasta 5 horas",
      range: "Autonomía de vuelo de aproximadamente 4.000 km",
      image:
        "https://images.unsplash.com/photo-1583161036683-f5f3856ee519?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    },
    {
      id: 3,
      title: "Heavy Jet",
      description:
        "Gulfstream G450, Challenger 650, Dassault Falcon 2000, o similar",
      capacity: "Capacidad para 10-14 personas",
      luggage: "Amplio compartimento para equipaje, hasta 15 maletas estándar",
      availability:
        "Ideal para vuelos intercontinentales y viajes de negocios de larga distancia",
      range: "Autonomía de vuelo de aproximadamente 7.000 km",
      image:
        "https://images.unsplash.com/photo-1612647242324-5d5d017b4742?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    },
    {
      id: 4,
      title: "Ultra Long Range",
      description:
        "Gulfstream G650, Bombardier Global 7500, Dassault Falcon 8X, o similar",
      capacity: "Capacidad para 12-16 personas",
      luggage: "Espacio para equipaje de gran capacidad, hasta 20 maletas",
      availability: "Disponible para vuelos intercontinentales sin escalas",
      range: "Autonomía de vuelo superior a 11.000 km para trayectos globales",
      image:
        "https://images.unsplash.com/photo-1582851896496-4901e8145949?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    },
  ];

  // Datos de las preguntas frecuentes
  const faqData = [
    {
      question: "¿Cuáles son las ventajas de viajar en jet privado?",
      answer: (
        <p className="text-gray-600" data-oid="diiebya">
          Viajar en jet privado ofrece numerosas ventajas como ahorro
          significativo de tiempo al evitar las largas esperas en los
          aeropuertos comerciales, mayor flexibilidad de horarios y rutas,
          acceso a más de 5.000 aeropuertos en todo el mundo (frente a los
          aproximadamente 500 que utilizan las aerolíneas comerciales), máxima
          privacidad para realizar reuniones de negocios o disfrutar de tiempo
          personal, mayor comodidad con cabinas diseñadas para el máximo
          confort, y la posibilidad de personalizar cada aspecto del viaje según
          sus necesidades específicas.
        </p>
      ),
    },
    {
      question: "¿Con cuánta antelación debo reservar un jet privado?",
      answer: (
        <p className="text-gray-600" data-oid="9ezrfr8">
          Aunque podemos organizar vuelos con tan solo 4 horas de antelación,
          recomendamos reservar con al menos 48-72 horas para garantizar la
          disponibilidad de la aeronave preferida. Para viajes durante
          temporadas altas, eventos importantes o destinos populares, es
          aconsejable reservar con 1-2 semanas de anticipación. Para itinerarios
          complejos o grupos grandes, un plazo de 7-10 días nos permitirá
          coordinar todos los aspectos de su viaje a la perfección.
        </p>
      ),
    },
    {
      question: "¿Qué aeropuertos puedo utilizar con un jet privado?",
      answer: (
        <p className="text-gray-600" data-oid="6ke4v20">
          Una de las grandes ventajas de los jets privados es el acceso a más de
          5.000 aeropuertos en todo el mundo, muchos de los cuales no están
          disponibles para vuelos comerciales. Esto incluye aeropuertos locales
          más pequeños que a menudo están más cerca de su destino final,
          reduciendo significativamente el tiempo de traslado terrestre. Además,
          puede seleccionar los aeropuertos de salida y llegada que mejor se
          adapten a su itinerario, evitando los principales centros
          aeroportuarios congestionados cuando sea posible.
        </p>
      ),
    },
    {
      question: "¿Cómo se determina el precio de un vuelo en jet privado?",
      answer: (
        <div className="text-gray-600" data-oid="qnjrpcb">
          <p className="mb-2" data-oid="hp74l2u">
            El precio de un vuelo en jet privado se calcula según varios
            factores:
          </p>
          <ul className="list-disc pl-5 space-y-1" data-oid="a0:8vs5">
            <li data-oid="_a3vgbk">Distancia y duración del vuelo</li>
            <li data-oid="-p6-.x6">Tipo y tamaño de aeronave seleccionada</li>
            <li data-oid="shdtp2-">
              Tiempo de espera en destino (si es un viaje de ida y vuelta)
            </li>
            <li data-oid="74eg71c">Tarifas de aeropuerto y navegación aérea</li>
            <li data-oid="d5i5_9d">
              Costos de catering y servicios especiales solicitados
            </li>
            <li data-oid="3c5f8sb">Temporada y disponibilidad de aeronaves</li>
          </ul>
          <p className="mt-2" data-oid="srn0d_d">
            Trabajamos con transparencia total en los precios, proporcionando un
            presupuesto detallado sin costes ocultos. Además, ofrecemos opciones
            de vuelos vacíos (empty legs) que pueden resultar significativamente
            más económicos para clientes con flexibilidad en sus fechas de
            viaje.
          </p>
        </div>
      ),
    },
    {
      question: "¿Qué servicios a bordo están incluidos?",
      answer: (
        <div className="text-gray-600" data-oid="cz4fde1">
          <p className="mb-2" data-oid="v90y27_">
            Todos nuestros vuelos incluyen:
          </p>
          <ul className="list-disc pl-5 space-y-1" data-oid="m2whjq:">
            <li data-oid="sbzto5-">
              Tripulación profesional altamente capacitada
            </li>
            <li data-oid="il1sfjf">
              Catering premium adaptado a sus preferencias
            </li>
            <li data-oid="gpz9qu1">
              Bebidas alcohólicas y no alcohólicas de alta gama
            </li>
            <li data-oid="gt0f6c9">
              Wi-Fi a bordo (según equipamiento de la aeronave)
            </li>
            <li data-oid="qn8dfsn">Prensa y entretenimiento personalizados</li>
            <li data-oid="tx6pj1r">
              Servicios de concierge para reservas en destino
            </li>
          </ul>
          <p className="mt-2" data-oid="t3-ktj-">
            Además, podemos personalizar cada aspecto de su experiencia de
            vuelo, desde configuraciones especiales de cabina hasta arreglos de
            catering específicos, decoración para ocasiones especiales o
            cualquier otro servicio que pueda necesitar.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white" data-oid="6:qdj7z">
      {/* Navigation */}
      <Navbar data-oid="ospvszx" />

      {/* Hero Section with Full-Width Image */}
      <div className="flex flex-col w-full" data-oid="ufzwv9z">
        {/* Title Bar */}
        <div className="title-bar relative" data-oid="dzsvwmb">
          <div className="container mx-auto px-4" data-oid="0w8110h">
            <h1 className="text-3xl font-bold text-black" data-oid="h5u7akp">
              Jets Privados
            </h1>
          </div>
        </div>

        {/* Image Container */}
        <div className="hero-container relative" data-oid="brlflu8">
          {/* Background Image */}
          <div className="full-size-background" data-oid="p7x93an">
            <Image
              src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
              alt="Jet privado lujoso en pista de aeropuerto con escalera lista para pasajeros"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
              data-oid="w.prduf"
            />
          </div>

          {/* Booking Widget - Solo visible en pantallas grandes (lg) */}
          <div
            className="booking-widget-container-overlay hidden lg:block"
            data-oid="0wftb3z"
          >
            <BookingForm data-oid="ntyq7xo" />
          </div>
        </div>
      </div>

      {/* Booking Widget - Solo visible en tablets y móviles (fuera del hero) */}
      <div
        className="lg:hidden mx-auto px-4 mb-8 mt-6 relative z-30"
        data-oid="ee2oa-5"
      >
        <BookingForm data-oid="j_mhpj1" />
      </div>

      {/* Download Section */}
      <DownloadSection data-oid="xwl52.9" />

      {/* Main Content */}
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 max-w-6xl"
        data-oid="m6fj-x4"
      >
        {/* Features Section */}
        <section className="mb-20" data-oid="1r5m_6j">
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            data-oid="x76aph_"
          >
            <div
              className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
              data-oid="ulf_y50"
            >
              <div
                className="text-black mb-6 bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center"
                data-oid="57ans19"
              >
                <Clock className="h-10 w-10" data-oid="t-b44q2" />
              </div>
              <h3
                className="text-xl font-semibold mb-4 text-gray-900"
                data-oid="dpi9om5"
              >
                Ahorre tiempo valioso
              </h3>
              <p className="text-gray-600 leading-relaxed" data-oid="_f1pxgo">
                Olvídese de largas esperas y procedimientos de seguridad. Llegue
                al aeropuerto apenas 15 minutos antes del despegue y despegue
                cuando usted esté listo.
              </p>
            </div>

            <div
              className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
              data-oid="fa4n2j1"
            >
              <div
                className="text-black mb-6 bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center"
                data-oid="f.29h-z"
              >
                <Shield className="h-10 w-10" data-oid="5mdj58n" />
              </div>
              <h3
                className="text-xl font-semibold mb-4 text-gray-900"
                data-oid="31dlli3"
              >
                Privacidad y seguridad
              </h3>
              <p className="text-gray-600 leading-relaxed" data-oid="5p_ihkt">
                Disfrute de la máxima privacidad con su equipo o familiares.
                Nuestras aeronaves cumplen con los más altos estándares de
                seguridad y mantenimiento.
              </p>
            </div>

            <div
              className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
              data-oid="p5onvce"
            >
              <div
                className="text-black mb-6 bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center"
                data-oid="vgsbwnz"
              >
                <Plane className="h-10 w-10" data-oid="elcpir0" />
              </div>
              <h3
                className="text-xl font-semibold mb-4 text-gray-900"
                data-oid="xji53iy"
              >
                Acceso global
              </h3>
              <p className="text-gray-600 leading-relaxed" data-oid="r.8r8qp">
                Vuele a más de 5.000 aeropuertos en todo el mundo, incluyendo
                destinos no accesibles para vuelos comerciales, acercándose a su
                destino final.
              </p>
            </div>
          </div>
        </section>

        {/* Service Classes Section - Slider */}
        <section className="mb-20" data-oid="m7tgfq9">
          <h2
            className="text-3xl font-bold text-center text-gray-900 mb-12"
            data-oid=":i6ab:u"
          >
            Nuestra flota de Jets Privados
          </h2>

          {/* Slider con flechas de navegación */}
          <div className="relative" ref={sliderRef} data-oid="vx_uqp:">
            <div className="overflow-hidden" data-oid="8.-.akp">
              <div
                className="flex flex-wrap lg:flex-nowrap justify-center"
                data-oid=".re62zg"
              >
                {/* Contenido del slider */}
                <div className="w-full relative" data-oid="ao.3k9u">
                  {/* Card principal */}
                  <div
                    className="bg-gray-200 rounded-lg overflow-hidden shadow-lg"
                    data-oid="5ut12yz"
                  >
                    <div className="relative" data-oid="ngs:ufp">
                      {/* Flechas de navegación */}
                      <button
                        onClick={handlePrev}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-r-lg z-10 shadow-md"
                        aria-label="Anterior"
                        data-oid="_y665uf"
                      >
                        <ChevronLeft
                          className="h-5 w-5 text-gray-800"
                          data-oid="9yhhau8"
                        />
                      </button>

                      <img
                        src={serviceClasses[activeServiceClass].image}
                        alt={serviceClasses[activeServiceClass].title}
                        className="w-full h-64 md:h-80 object-cover object-center"
                        data-oid="s0zylr0"
                      />

                      <button
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-l-lg z-10 shadow-md"
                        aria-label="Siguiente"
                        data-oid="ztr-1gu"
                      >
                        <ChevronRight
                          className="h-5 w-5 text-gray-800"
                          data-oid="psz:kmd"
                        />
                      </button>

                      {/* Indicadores de diapositiva */}
                      <div
                        className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2"
                        data-oid="lgf_sc3"
                      >
                        {serviceClasses.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setActiveServiceClass(index)}
                            className={`w-2 h-2 rounded-full ${
                              activeServiceClass === index
                                ? "bg-gray-1000"
                                : "bg-white bg-opacity-70"
                            }`}
                            aria-label={`Ir a diapositiva ${index + 1}`}
                            data-oid="jxjt:ll"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="p-6" data-oid="f.0_k0d">
                      <h3
                        className="text-2xl font-bold text-gray-900 mb-2"
                        data-oid="smbv7ao"
                      >
                        {serviceClasses[activeServiceClass].title}
                      </h3>
                      <p
                        className="text-gray-700 text-sm mb-4"
                        data-oid="idja:h."
                      >
                        {serviceClasses[activeServiceClass].description}
                      </p>

                      <div
                        className="border-t border-gray-200 pt-4"
                        data-oid="jaacx_i"
                      >
                        <ul className="space-y-3" data-oid="tgx3kdt">
                          <li className="flex items-start" data-oid="rgk50as">
                            <CheckCircle
                              className="h-5 w-5 text-gray-600 mr-2 mt-0.5 flex-shrink-0"
                              data-oid="cdtx_4d"
                            />

                            <span
                              className="text-gray-700 text-sm"
                              data-oid="29gn.f3"
                            >
                              {serviceClasses[activeServiceClass].capacity}
                            </span>
                          </li>
                          <li className="flex items-start" data-oid="j5ksa67">
                            <CheckCircle
                              className="h-5 w-5 text-gray-600 mr-2 mt-0.5 flex-shrink-0"
                              data-oid="cd2eda7"
                            />

                            <span
                              className="text-gray-700 text-sm"
                              data-oid="d1nf1rv"
                            >
                              {serviceClasses[activeServiceClass].luggage}
                            </span>
                          </li>
                          <li className="flex items-start" data-oid="t8qyntg">
                            <CheckCircle
                              className="h-5 w-5 text-gray-600 mr-2 mt-0.5 flex-shrink-0"
                              data-oid=".l__qo7"
                            />

                            <span
                              className="text-gray-700 text-sm"
                              data-oid="z1.nkmc"
                            >
                              {serviceClasses[activeServiceClass].availability}
                            </span>
                          </li>
                          <li className="flex items-start" data-oid="s2q9:8e">
                            <CheckCircle
                              className="h-5 w-5 text-gray-600 mr-2 mt-0.5 flex-shrink-0"
                              data-oid="-tx9ijg"
                            />

                            <span
                              className="text-gray-700 text-sm"
                              data-oid="w_9wexs"
                            >
                              {serviceClasses[activeServiceClass].range}
                            </span>
                          </li>
                        </ul>
                      </div>

                      {/* Selector de páginas numerado */}
                      <div
                        className="flex justify-center mt-6 space-x-1"
                        data-oid="d5ytph2"
                      >
                        {serviceClasses.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setActiveServiceClass(index)}
                            className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-medium ${
                              activeServiceClass === index
                                ? "bg-black text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                            data-oid=".5ueg8r"
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

        {/* Information Sections */}
        <section className="mb-20" data-oid="7l2:mme">
          <div className="grid grid-cols-1 gap-12" data-oid=":2l2r-h">
            {/* Primera sección */}
            <div
              className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm"
              data-oid="l7cg2ei"
            >
              <h2
                className="text-2xl font-bold text-gray-900 mb-6"
                data-oid="e30obm7"
              >
                Experiencia premium en jets privados
              </h2>
              <p
                className="text-gray-600 mb-0 leading-relaxed"
                data-oid="-.b3v2k"
              >
                Los viajes en jet privado representan la máxima expresión de
                lujo, comodidad y eficiencia en el transporte aéreo. Nuestro
                servicio de jets privados está diseñado para ofrecer una
                experiencia de viaje sin igual, eliminando las molestias y las
                esperas asociadas con los vuelos comerciales. Con acceso a
                aeropuertos exclusivos, horarios totalmente flexibles y un
                servicio personalizado, volar en jet privado no es solo un modo
                de transporte, sino una extensión de su estilo de vida o la
                imagen de su empresa. Ya sea para viajes de negocios urgentes,
                vacaciones familiares de lujo o eventos especiales, nuestros
                jets privados le permiten maximizar su tiempo más valioso
                mientras disfruta de un confort inigualable y la más absoluta
                privacidad.
              </p>
            </div>
          </div>
        </section>

        {/* Images Section */}
        <section className="mb-20" data-oid="5y:e5z4">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            data-oid="_o64y-z"
          >
            <div data-oid="bk.odg-">
              <img
                src="https://images.unsplash.com/photo-1583850097248-96ed5ff4a59a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Interior lujoso de jet privado con asientos de cuero y acabados en madera"
                className="w-full h-auto rounded-xl shadow-lg object-cover mb-8"
                data-oid="h:ijwor"
              />

              <img
                src="https://images.unsplash.com/photo-1436397543931-01c4a5162bdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Jet privado en vuelo sobre las nubes al atardecer"
                className="w-full h-auto rounded-xl shadow-lg object-cover"
                data-oid="4sb9915"
              />
            </div>
            <div data-oid="-hxzlnl">
              <h2
                className="text-3xl font-bold text-gray-900 mb-6"
                data-oid="4xjenvz"
              >
                Ventajas exclusivas para viajes corporativos e internacionales
              </h2>
              <p className="text-lg text-gray-600 mb-6" data-oid="6l2-:ao">
                Los jets privados trascienden el concepto tradicional de
                transporte aéreo para convertirse en verdaderas herramientas de
                productividad y eficiencia. Para ejecutivos y equipos
                corporativos, nuestros servicios permiten mantener agendas
                imposibles con vuelos comerciales, visitando múltiples ciudades
                en un solo día y llegando descansados a cada destino. Las
                cabinas están diseñadas como oficinas voladoras donde se pueden
                realizar reuniones confidenciales sin interrupciones mientras se
                desplazan entre ciudades.
              </p>
              <p className="text-lg text-gray-600 mb-6" data-oid="18it80a">
                Para viajes internacionales, eliminamos las largas esperas en
                los controles fronterizos con procedimientos acelerados de
                inmigración y aduana. Nuestros pasajeros no solo disfrutan de la
                máxima privacidad, sino también de un servicio a bordo
                personalizado según sus preferencias gastronómicas y de confort,
                con catering de alta cocina y amenidades premium. A diferencia
                de las aerolíneas comerciales, sus mascotas pueden viajar
                cómodamente en la cabina principal junto a usted, haciendo que
                la experiencia de viaje sea placentera para todos los miembros
                de la familia.
              </p>
              <p className="text-lg text-gray-600" data-oid="nvafmph">
                Garantizamos además la máxima flexibilidad para adaptarnos a
                cambios de última hora en sus planes, modificando horarios,
                rutas e incluso destinos finales según sus necesidades. Esta
                combinación única de beneficios hace que el valor de un vuelo
                privado transcienda el mero lujo para convertirse en una
                inversión en tiempo, privacidad y productividad.
              </p>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="mb-20" data-oid="goz3j1t">
          <h2
            className="text-3xl font-bold text-center text-gray-900 mb-12"
            data-oid="ie_alyf"
          >
            El proceso de reserva simplificado
            <span
              className="block w-24 h-1 bg-black mx-auto mt-4"
              data-oid="h7x7t2."
            ></span>
          </h2>

          <div
            className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
            data-oid="gbljprl"
          >
            <div
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
              data-oid="m:aen.e"
            >
              <div
                className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                data-oid="5rl_6qq"
              >
                <span
                  className="text-2xl font-bold text-black"
                  data-oid="jieznih"
                >
                  1
                </span>
              </div>
              <h3
                className="text-xl font-semibold mb-3 text-gray-900"
                data-oid="9yy7od6"
              >
                Solicitud
              </h3>
              <p className="text-gray-600" data-oid="t.20osk">
                Contáctenos con sus requisitos de viaje, incluyendo fechas,
                destinos, número de pasajeros y preferencias especiales.
              </p>
            </div>

            <div
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
              data-oid="tn-17nh"
            >
              <div
                className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                data-oid="wiin7t7"
              >
                <span
                  className="text-2xl font-bold text-black"
                  data-oid="giwn3md"
                >
                  2
                </span>
              </div>
              <h3
                className="text-xl font-semibold mb-3 text-gray-900"
                data-oid="wl-0j3c"
              >
                Propuesta
              </h3>
              <p className="text-gray-600" data-oid="nldiac6">
                Recibirá una selección personalizada de aeronaves disponibles
                con precios transparentes y servicios incluidos.
              </p>
            </div>

            <div
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
              data-oid="3njlr:t"
            >
              <div
                className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                data-oid="_q_9:ei"
              >
                <span
                  className="text-2xl font-bold text-black"
                  data-oid="klij_gs"
                >
                  3
                </span>
              </div>
              <h3
                className="text-xl font-semibold mb-3 text-gray-900"
                data-oid=".:77ret"
              >
                Confirmación
              </h3>
              <p className="text-gray-600" data-oid="wnp60dl">
                Una vez seleccionada la aeronave, formalizamos la reserva y
                coordinamos todos los detalles logísticos de su viaje.
              </p>
            </div>

            <div
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
              data-oid="xd0u.w8"
            >
              <div
                className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                data-oid="vqmlcj8"
              >
                <span
                  className="text-2xl font-bold text-black"
                  data-oid=":59:fox"
                >
                  4
                </span>
              </div>
              <h3
                className="text-xl font-semibold mb-3 text-gray-900"
                data-oid="6qih970"
              >
                Experiencia
              </h3>
              <p className="text-gray-600" data-oid="22sku_f">
                Disfrute de un viaje sin contratiempos con atención
                personalizada desde el momento de llegada hasta el destino
                final.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section
          className="mb-20 bg-gray-50 py-12 rounded-xl"
          data-oid="_udtv06"
        >
          <h2
            className="text-3xl font-bold text-center text-gray-900 mb-12 relative"
            data-oid="rgxm2uc"
          >
            Lo que dicen nuestros clientes
            <span
              className="block w-24 h-1 bg-black mx-auto mt-4"
              data-oid="-u.s12j"
            ></span>
          </h2>

          <div className="max-w-5xl mx-auto px-4" data-oid="c4.dsfc">
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              data-oid="jgj41x6"
            >
              <div
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
                data-oid="16uet1l"
              >
                <div className="flex items-center mb-4" data-oid="bsb56i9">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-gray-400 fill-current"
                      data-oid="xr_pk.s"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic" data-oid="kzqxh6h">
                  "Como CEO que viaja constantemente, el servicio de jets
                  privados ha transformado radicalmente mi productividad. Puedo
                  visitar tres ciudades en un día y seguir llegando a casa para
                  cenar con mi familia. La flexibilidad y el tiempo ahorrado
                  justifican completamente la inversión."
                </p>
                <div data-oid="0q9pg-q">
                  <p className="font-semibold text-gray-900" data-oid="jbri6xd">
                    Carlos Rodríguez
                  </p>
                  <p className="text-gray-500 text-sm" data-oid="nemy692">
                    CEO, Innotech Solutions
                  </p>
                </div>
              </div>

              <div
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
                data-oid="1e_p-z_"
              >
                <div className="flex items-center mb-4" data-oid="qz7km93">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-gray-400 fill-current"
                      data-oid="hz76i:."
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic" data-oid="ljm76e3">
                  "Viajamos con nuestra familia extendida, incluidos niños
                  pequeños y nuestra mascota. La experiencia fue incomparable:
                  sin estrés, sin esperas y con un servicio absolutamente
                  personalizado. Los niños disfrutaron enormemente y pudimos
                  comenzar nuestras vacaciones desde el momento en que
                  abordamos."
                </p>
                <div data-oid="-zzxyb3">
                  <p className="font-semibold text-gray-900" data-oid=".zg8kgs">
                    Elena Martínez
                  </p>
                  <p className="text-gray-500 text-sm" data-oid="y36-cot">
                    Cliente frecuente
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20" data-oid="j2fs6t7">
          <h2
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 relative"
            data-oid="1mj79n6"
          >
            Preguntas frecuentes
            <span
              className="block w-24 h-1 bg-black mx-auto mt-4"
              data-oid="16zw:tg"
            ></span>
          </h2>

          <div className="space-y-4 max-w-4xl mx-auto" data-oid="bznpux1">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl border ${openFaqIndex === index ? "border-gray-200 shadow-md" : "border-gray-200"} overflow-hidden transition-all duration-300`}
                data-oid="c7hjg94"
              >
                <button
                  className="flex justify-between items-center w-full p-6 text-left"
                  onClick={() => toggleFaq(index)}
                  data-oid="2-.6mpn"
                >
                  <h3
                    className={`text-xl font-semibold ${openFaqIndex === index ? "text-gray-600" : "text-gray-900"}`}
                    data-oid="k5de4f-"
                  >
                    {faq.question}
                  </h3>
                  <div
                    className={`${openFaqIndex === index ? "text-black bg-gray-100" : "text-gray-400 bg-gray-50"} rounded-full p-1 transition-colors duration-300`}
                    data-oid="5_j1eu3"
                  >
                    {openFaqIndex === index ? (
                      <ChevronUp className="h-5 w-5" data-oid="t_a-c6i" />
                    ) : (
                      <ChevronDown className="h-5 w-5" data-oid="j2cs8.v" />
                    )}
                  </div>
                </button>
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    openFaqIndex === index
                      ? "max-h-[1000px] opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                  data-oid="d1b2gnj"
                >
                  <div className="px-6 pb-6 pt-0" data-oid="325h.ko">
                    <div
                      className="border-t border-gray-200 pt-4 text-left"
                      data-oid="jdoys3c"
                    >
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section
          className="mb-20 bg-gray-900 text-white rounded-xl overflow-hidden"
          data-oid="dku1:pb"
        >
          <div className="grid grid-cols-1 md:grid-cols-2" data-oid="icws0te">
            <div
              className="p-8 lg:p-12 flex flex-col justify-center"
              data-oid="lj9x4je"
            >
              <h2 className="text-3xl font-bold mb-6" data-oid="la8y31l">
                Experimente la diferencia de volar en privado
              </h2>
              <p className="text-lg text-gray-300 mb-8" data-oid="lwrng63">
                Permítanos mostrarle cómo nuestro servicio de jets privados
                puede transformar su experiencia de viaje. Hable con nuestros
                especialistas para recibir un presupuesto personalizado o
                solicitar más información.
              </p>
              <div className="flex flex-wrap gap-4" data-oid="7w5yul4">
                <button
                  className="bg-gray-1000 hover:bg-black text-white py-3 px-6 rounded-lg font-medium transition-all duration-200"
                  data-oid="2yeu12g"
                >
                  Solicitar presupuesto
                </button>
                <button
                  className="bg-transparent border border-white hover:bg-white hover:text-gray-900 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200"
                  data-oid="tbty23a"
                >
                  Contactar a un especialista
                </button>
              </div>
            </div>
            <div
              className="relative min-h-[300px] md:min-h-full"
              data-oid="g40-:a5"
            >
              <img
                src="https://images.unsplash.com/photo-1569154941061-e231b4725ef1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
                alt="Jet privado esperando en la pista de aeropuerto al atardecer"
                className="absolute inset-0 w-full h-full object-cover"
                data-oid="3avnix:"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer data-oid="ahop7jy" />
    </div>
  );
};

export default PrivateJets;
