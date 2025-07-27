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
        <p className="text-gray-600" data-oid="mbba6si">
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
        <p className="text-gray-600" data-oid="r5u1wnf">
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
        <p className="text-gray-600" data-oid="od_va1m">
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
        <div className="text-gray-600" data-oid="uttb0wm">
          <p className="mb-2" data-oid=".5km5so">
            El precio de un vuelo en jet privado se calcula según varios
            factores:
          </p>
          <ul className="list-disc pl-5 space-y-1" data-oid="rwir6g.">
            <li data-oid="ghpdxwj">Distancia y duración del vuelo</li>
            <li data-oid=":saj1s.">Tipo y tamaño de aeronave seleccionada</li>
            <li data-oid="52xnh68">
              Tiempo de espera en destino (si es un viaje de ida y vuelta)
            </li>
            <li data-oid="1-fq56a">Tarifas de aeropuerto y navegación aérea</li>
            <li data-oid="59vk4m6">
              Costos de catering y servicios especiales solicitados
            </li>
            <li data-oid="2gfvqi9">Temporada y disponibilidad de aeronaves</li>
          </ul>
          <p className="mt-2" data-oid="dq76.v-">
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
        <div className="text-gray-600" data-oid="5cmyo..">
          <p className="mb-2" data-oid="le6h1vx">
            Todos nuestros vuelos incluyen:
          </p>
          <ul className="list-disc pl-5 space-y-1" data-oid="tg-j_:b">
            <li data-oid="j3uldeq">
              Tripulación profesional altamente capacitada
            </li>
            <li data-oid="5m3snfp">
              Catering premium adaptado a sus preferencias
            </li>
            <li data-oid="v49af7n">
              Bebidas alcohólicas y no alcohólicas de alta gama
            </li>
            <li data-oid="8f4x22b">
              Wi-Fi a bordo (según equipamiento de la aeronave)
            </li>
            <li data-oid="r4mn4ut">Prensa y entretenimiento personalizados</li>
            <li data-oid="kpcjv2v">
              Servicios de concierge para reservas en destino
            </li>
          </ul>
          <p className="mt-2" data-oid="tmvsnq8">
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
    <div className="bg-white" data-oid="9.et5t5">
      {/* Navigation */}
      <Navbar data-oid="5kpeto." />

      {/* Hero Section with Full-Width Image */}
      <div className="flex flex-col w-full" data-oid="dxiqoga">
        {/* Title Bar */}
        <div className="title-bar relative" data-oid="47wigs9">
          <div className="container mx-auto px-4" data-oid=".wutvv_">
            <h1 className="text-3xl font-bold text-black" data-oid="ydfwu_m">
              Jets Privados
            </h1>
          </div>
        </div>

        {/* Image Container */}
        <div className="hero-container relative" data-oid="u0lpnnw">
          {/* Background Image */}
          <div className="full-size-background" data-oid="t:rie_v">
            <Image
              src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
              alt="Jet privado lujoso en pista de aeropuerto con escalera lista para pasajeros"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
              data-oid="f52:s9e"
            />
          </div>

          {/* Booking Widget - Solo visible en pantallas grandes (lg) */}
          <div
            className="booking-widget-container-overlay hidden lg:block"
            data-oid="v2-qh79"
          >
            <BookingForm data-oid="pkukt8m" />
          </div>
        </div>
      </div>

      {/* Booking Widget - Solo visible en tablets y móviles (fuera del hero) */}
      <div
        className="lg:hidden mx-auto px-4 mb-8 mt-6 relative z-30"
        data-oid="mnxy_n3"
      >
        <BookingForm data-oid="fnv8e:z" />
      </div>

      {/* Download Section */}
      <DownloadSection data-oid="ck-zzij" />

      {/* Main Content */}
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 max-w-6xl"
        data-oid="tf-qwpb"
      >
        {/* Features Section */}
        <section className="mb-20" data-oid="elg2282">
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            data-oid=":t2ssd5"
          >
            <div
              className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
              data-oid="pvjzbbm"
            >
              <div
                className="text-black mb-6 bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center"
                data-oid="_awz.0o"
              >
                <Clock className="h-10 w-10" data-oid="fas4vrh" />
              </div>
              <h3
                className="text-xl font-semibold mb-4 text-gray-900"
                data-oid="hsk9wja"
              >
                Ahorre tiempo valioso
              </h3>
              <p className="text-gray-600 leading-relaxed" data-oid="iz9amup">
                Olvídese de largas esperas y procedimientos de seguridad. Llegue
                al aeropuerto apenas 15 minutos antes del despegue y despegue
                cuando usted esté listo.
              </p>
            </div>

            <div
              className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
              data-oid="o30-o34"
            >
              <div
                className="text-black mb-6 bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center"
                data-oid="h9qwzfu"
              >
                <Shield className="h-10 w-10" data-oid="7cf:2bs" />
              </div>
              <h3
                className="text-xl font-semibold mb-4 text-gray-900"
                data-oid="8g3qufl"
              >
                Privacidad y seguridad
              </h3>
              <p className="text-gray-600 leading-relaxed" data-oid="5m34ava">
                Disfrute de la máxima privacidad con su equipo o familiares.
                Nuestras aeronaves cumplen con los más altos estándares de
                seguridad y mantenimiento.
              </p>
            </div>

            <div
              className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
              data-oid="qftn6ia"
            >
              <div
                className="text-black mb-6 bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center"
                data-oid="mebh.mi"
              >
                <Plane className="h-10 w-10" data-oid="xg72k._" />
              </div>
              <h3
                className="text-xl font-semibold mb-4 text-gray-900"
                data-oid="9jqpzy5"
              >
                Acceso global
              </h3>
              <p className="text-gray-600 leading-relaxed" data-oid="rq1f-_0">
                Vuele a más de 5.000 aeropuertos en todo el mundo, incluyendo
                destinos no accesibles para vuelos comerciales, acercándose a su
                destino final.
              </p>
            </div>
          </div>
        </section>

        {/* Service Classes Section - Slider */}
        <section className="mb-20" data-oid="xqvng8l">
          <h2
            className="text-3xl font-bold text-center text-gray-900 mb-12"
            data-oid="7kc7fqb"
          >
            Nuestra flota de Jets Privados
          </h2>

          {/* Slider con flechas de navegación */}
          <div className="relative" ref={sliderRef} data-oid="t074d.3">
            <div className="overflow-hidden" data-oid="3f0ip:q">
              <div
                className="flex flex-wrap lg:flex-nowrap justify-center"
                data-oid="u22nlqc"
              >
                {/* Contenido del slider */}
                <div className="w-full relative" data-oid="tc901xl">
                  {/* Card principal */}
                  <div
                    className="bg-gray-200 rounded-lg overflow-hidden shadow-lg"
                    data-oid="c4m2:6e"
                  >
                    <div className="relative" data-oid="9cfozl9">
                      {/* Flechas de navegación */}
                      <button
                        onClick={handlePrev}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-r-lg z-10 shadow-md"
                        aria-label="Anterior"
                        data-oid="dbil04:"
                      >
                        <ChevronLeft
                          className="h-5 w-5 text-gray-800"
                          data-oid="ej29va7"
                        />
                      </button>

                      <img
                        src={serviceClasses[activeServiceClass].image}
                        alt={serviceClasses[activeServiceClass].title}
                        className="w-full h-64 md:h-80 object-cover object-center"
                        data-oid="4gu8hb6"
                      />

                      <button
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-l-lg z-10 shadow-md"
                        aria-label="Siguiente"
                        data-oid="j8i.vyz"
                      >
                        <ChevronRight
                          className="h-5 w-5 text-gray-800"
                          data-oid="8y:2kyk"
                        />
                      </button>

                      {/* Indicadores de diapositiva */}
                      <div
                        className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2"
                        data-oid="br--2q_"
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
                            data-oid="gypn:no"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="p-6" data-oid="-hcerlw">
                      <h3
                        className="text-2xl font-bold text-gray-900 mb-2"
                        data-oid="23dbs2m"
                      >
                        {serviceClasses[activeServiceClass].title}
                      </h3>
                      <p
                        className="text-gray-700 text-sm mb-4"
                        data-oid="ks5z:i_"
                      >
                        {serviceClasses[activeServiceClass].description}
                      </p>

                      <div
                        className="border-t border-gray-200 pt-4"
                        data-oid=".7h7kfo"
                      >
                        <ul className="space-y-3" data-oid="mbki38c">
                          <li className="flex items-start" data-oid="1p40mw7">
                            <CheckCircle
                              className="h-5 w-5 text-gray-600 mr-2 mt-0.5 flex-shrink-0"
                              data-oid="hj0yaio"
                            />

                            <span
                              className="text-gray-700 text-sm"
                              data-oid="hg-g2im"
                            >
                              {serviceClasses[activeServiceClass].capacity}
                            </span>
                          </li>
                          <li className="flex items-start" data-oid="4_cep99">
                            <CheckCircle
                              className="h-5 w-5 text-gray-600 mr-2 mt-0.5 flex-shrink-0"
                              data-oid=".nxyy79"
                            />

                            <span
                              className="text-gray-700 text-sm"
                              data-oid="iebl586"
                            >
                              {serviceClasses[activeServiceClass].luggage}
                            </span>
                          </li>
                          <li className="flex items-start" data-oid="6r.m:8v">
                            <CheckCircle
                              className="h-5 w-5 text-gray-600 mr-2 mt-0.5 flex-shrink-0"
                              data-oid="u3ux-8-"
                            />

                            <span
                              className="text-gray-700 text-sm"
                              data-oid="b99s0o1"
                            >
                              {serviceClasses[activeServiceClass].availability}
                            </span>
                          </li>
                          <li className="flex items-start" data-oid="7szp9en">
                            <CheckCircle
                              className="h-5 w-5 text-gray-600 mr-2 mt-0.5 flex-shrink-0"
                              data-oid="xc6pv2x"
                            />

                            <span
                              className="text-gray-700 text-sm"
                              data-oid="24l4x1d"
                            >
                              {serviceClasses[activeServiceClass].range}
                            </span>
                          </li>
                        </ul>
                      </div>

                      {/* Selector de páginas numerado */}
                      <div
                        className="flex justify-center mt-6 space-x-1"
                        data-oid=":t8x1s9"
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
                            data-oid="-.rdgxp"
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
        <section className="mb-20" data-oid="2_j3eb_">
          <div className="grid grid-cols-1 gap-12" data-oid="cyh2boq">
            {/* Primera sección */}
            <div
              className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm"
              data-oid=":-mqitf"
            >
              <h2
                className="text-2xl font-bold text-gray-900 mb-6"
                data-oid="wbxz16-"
              >
                Experiencia premium en jets privados
              </h2>
              <p
                className="text-gray-600 mb-0 leading-relaxed"
                data-oid="llhal6k"
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
        <section className="mb-20" data-oid="o0priat">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            data-oid="q_a1mcs"
          >
            <div data-oid="g7v_g78">
              <img
                src="https://images.unsplash.com/photo-1583850097248-96ed5ff4a59a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Interior lujoso de jet privado con asientos de cuero y acabados en madera"
                className="w-full h-auto rounded-xl shadow-lg object-cover mb-8"
                data-oid="1hlgyl."
              />

              <img
                src="https://images.unsplash.com/photo-1436397543931-01c4a5162bdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Jet privado en vuelo sobre las nubes al atardecer"
                className="w-full h-auto rounded-xl shadow-lg object-cover"
                data-oid="wo7a:w."
              />
            </div>
            <div data-oid="08yo429">
              <h2
                className="text-3xl font-bold text-gray-900 mb-6"
                data-oid="psyzlvk"
              >
                Ventajas exclusivas para viajes corporativos e internacionales
              </h2>
              <p className="text-lg text-gray-600 mb-6" data-oid="pqlx_ig">
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
              <p className="text-lg text-gray-600 mb-6" data-oid="r-fby84">
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
              <p className="text-lg text-gray-600" data-oid="ly0on36">
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
        <section className="mb-20" data-oid="79bdhu:">
          <h2
            className="text-3xl font-bold text-center text-gray-900 mb-12"
            data-oid="8aqp8ri"
          >
            El proceso de reserva simplificado
            <span
              className="block w-24 h-1 bg-black mx-auto mt-4"
              data-oid="spm553f"
            ></span>
          </h2>

          <div
            className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
            data-oid="jwg8iwi"
          >
            <div
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
              data-oid="lm9r-fz"
            >
              <div
                className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                data-oid="7tj12em"
              >
                <span
                  className="text-2xl font-bold text-black"
                  data-oid="6.6xz-h"
                >
                  1
                </span>
              </div>
              <h3
                className="text-xl font-semibold mb-3 text-gray-900"
                data-oid="uritqc6"
              >
                Solicitud
              </h3>
              <p className="text-gray-600" data-oid="vxku4o5">
                Contáctenos con sus requisitos de viaje, incluyendo fechas,
                destinos, número de pasajeros y preferencias especiales.
              </p>
            </div>

            <div
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
              data-oid="qjjhpu:"
            >
              <div
                className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                data-oid="asg60_g"
              >
                <span
                  className="text-2xl font-bold text-black"
                  data-oid="kj6u-bf"
                >
                  2
                </span>
              </div>
              <h3
                className="text-xl font-semibold mb-3 text-gray-900"
                data-oid="3a:r9t0"
              >
                Propuesta
              </h3>
              <p className="text-gray-600" data-oid="mm8awg_">
                Recibirá una selección personalizada de aeronaves disponibles
                con precios transparentes y servicios incluidos.
              </p>
            </div>

            <div
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
              data-oid="-rv5h7t"
            >
              <div
                className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                data-oid="yltr_h6"
              >
                <span
                  className="text-2xl font-bold text-black"
                  data-oid="dljt6n1"
                >
                  3
                </span>
              </div>
              <h3
                className="text-xl font-semibold mb-3 text-gray-900"
                data-oid="oy_d0ja"
              >
                Confirmación
              </h3>
              <p className="text-gray-600" data-oid="acjjaln">
                Una vez seleccionada la aeronave, formalizamos la reserva y
                coordinamos todos los detalles logísticos de su viaje.
              </p>
            </div>

            <div
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
              data-oid="i7la1jb"
            >
              <div
                className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                data-oid="oiglp15"
              >
                <span
                  className="text-2xl font-bold text-black"
                  data-oid="w_559sj"
                >
                  4
                </span>
              </div>
              <h3
                className="text-xl font-semibold mb-3 text-gray-900"
                data-oid="wbuik8m"
              >
                Experiencia
              </h3>
              <p className="text-gray-600" data-oid="g4zqfkd">
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
          data-oid="kavm6i9"
        >
          <h2
            className="text-3xl font-bold text-center text-gray-900 mb-12 relative"
            data-oid="gu95qk9"
          >
            Lo que dicen nuestros clientes
            <span
              className="block w-24 h-1 bg-black mx-auto mt-4"
              data-oid="z4ndhcr"
            ></span>
          </h2>

          <div className="max-w-5xl mx-auto px-4" data-oid="bx7ztu1">
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              data-oid="k4h:0dj"
            >
              <div
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
                data-oid="1q2gyol"
              >
                <div className="flex items-center mb-4" data-oid="1fiv_1o">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-gray-400 fill-current"
                      data-oid="j_zi8xb"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic" data-oid="hs6uicl">
                  "Como CEO que viaja constantemente, el servicio de jets
                  privados ha transformado radicalmente mi productividad. Puedo
                  visitar tres ciudades en un día y seguir llegando a casa para
                  cenar con mi familia. La flexibilidad y el tiempo ahorrado
                  justifican completamente la inversión."
                </p>
                <div data-oid="w7nspo0">
                  <p className="font-semibold text-gray-900" data-oid="q71u0pj">
                    Carlos Rodríguez
                  </p>
                  <p className="text-gray-500 text-sm" data-oid="8:pg:b5">
                    CEO, Innotech Solutions
                  </p>
                </div>
              </div>

              <div
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
                data-oid="ktu2frw"
              >
                <div className="flex items-center mb-4" data-oid="73hjzgk">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-gray-400 fill-current"
                      data-oid="_6vwg1a"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic" data-oid="31ooe5u">
                  "Viajamos con nuestra familia extendida, incluidos niños
                  pequeños y nuestra mascota. La experiencia fue incomparable:
                  sin estrés, sin esperas y con un servicio absolutamente
                  personalizado. Los niños disfrutaron enormemente y pudimos
                  comenzar nuestras vacaciones desde el momento en que
                  abordamos."
                </p>
                <div data-oid="qftsazw">
                  <p className="font-semibold text-gray-900" data-oid="memgvwi">
                    Elena Martínez
                  </p>
                  <p className="text-gray-500 text-sm" data-oid="d:9evn4">
                    Cliente frecuente
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20" data-oid=":jta0f:">
          <h2
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 relative"
            data-oid="qz2ancg"
          >
            Preguntas frecuentes
            <span
              className="block w-24 h-1 bg-black mx-auto mt-4"
              data-oid="8yn24zz"
            ></span>
          </h2>

          <div className="space-y-4 max-w-4xl mx-auto" data-oid="r65wlxo">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl border ${openFaqIndex === index ? "border-gray-200 shadow-md" : "border-gray-200"} overflow-hidden transition-all duration-300`}
                data-oid="r29bxkp"
              >
                <button
                  className="flex justify-between items-center w-full p-6 text-left"
                  onClick={() => toggleFaq(index)}
                  data-oid="mlqf5ww"
                >
                  <h3
                    className={`text-xl font-semibold ${openFaqIndex === index ? "text-gray-600" : "text-gray-900"}`}
                    data-oid="zan9dfv"
                  >
                    {faq.question}
                  </h3>
                  <div
                    className={`${openFaqIndex === index ? "text-black bg-gray-100" : "text-gray-400 bg-gray-50"} rounded-full p-1 transition-colors duration-300`}
                    data-oid="7blkq42"
                  >
                    {openFaqIndex === index ? (
                      <ChevronUp className="h-5 w-5" data-oid="mgvmjwv" />
                    ) : (
                      <ChevronDown className="h-5 w-5" data-oid="-ksiypv" />
                    )}
                  </div>
                </button>
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    openFaqIndex === index
                      ? "max-h-[1000px] opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                  data-oid="9n9wdso"
                >
                  <div className="px-6 pb-6 pt-0" data-oid="1lp_gi7">
                    <div
                      className="border-t border-gray-200 pt-4 text-left"
                      data-oid="1qy:y.1"
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
          data-oid="kzku0zx"
        >
          <div className="grid grid-cols-1 md:grid-cols-2" data-oid="ic2-bnt">
            <div
              className="p-8 lg:p-12 flex flex-col justify-center"
              data-oid="twtv873"
            >
              <h2 className="text-3xl font-bold mb-6" data-oid="swpra_r">
                Experimente la diferencia de volar en privado
              </h2>
              <p className="text-lg text-gray-300 mb-8" data-oid="fo4oa2u">
                Permítanos mostrarle cómo nuestro servicio de jets privados
                puede transformar su experiencia de viaje. Hable con nuestros
                especialistas para recibir un presupuesto personalizado o
                solicitar más información.
              </p>
              <div className="flex flex-wrap gap-4" data-oid="z_xpyeb">
                <button
                  className="bg-gray-1000 hover:bg-black text-white py-3 px-6 rounded-lg font-medium transition-all duration-200"
                  data-oid="-irf-.k"
                >
                  Solicitar presupuesto
                </button>
                <button
                  className="bg-transparent border border-white hover:bg-white hover:text-gray-900 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200"
                  data-oid="gmd3hq9"
                >
                  Contactar a un especialista
                </button>
              </div>
            </div>
            <div
              className="relative min-h-[300px] md:min-h-full"
              data-oid="xqpb_9o"
            >
              <img
                src="https://images.unsplash.com/photo-1569154941061-e231b4725ef1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
                alt="Jet privado esperando en la pista de aeropuerto al atardecer"
                className="absolute inset-0 w-full h-full object-cover"
                data-oid="-df655o"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer data-oid="nvnrd3i" />
    </div>
  );
};

export default PrivateJets;
