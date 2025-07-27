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
  DollarSign,
  Clock,
  TimerReset,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const LimousineService = () => {
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

  // Datos de clases de servicio para limusinas
  const serviceClasses = [
    {
      id: 1,
      title: "Business Class",
      description:
        "Mercedes E-Class, BMW Serie 5, Audi A6, Cadillac XTS, o similar",
      capacity: "Capacidad para 3 personas",
      luggage:
        "Capacidad para 2 maletas de mano, o 2 maletas estándar de facturación, o 1 maleta extra grande de facturación",
      availability:
        "Disponible en la mayoría de nuestros distritos de negocios",
      image: "/images/e-class-limo.png",
    },
    {
      id: 2,
      title: "First Class",
      description: "Mercedes S-Class, BMW Serie 7, Audi A8, o similar",
      capacity: "Capacidad para 3 personas",
      luggage:
        "Capacidad para 2 maletas de mano, o 2 maletas estándar de facturación, o 1 maleta extra grande de facturación",
      availability:
        "Disponible en la mayoría de nuestros distritos de negocios",
      image: "https://via.placeholder.com/600x350/ccc/fff?text=First+Class",
    },
    {
      id: 3,
      title: "Business Van",
      description:
        "Mercedes V-Class, Chevy Suburban, Cadillac Escalade, Toyota Alphard, o similar",
      capacity: "Capacidad para 6 personas",
      luggage:
        "Capacidad para 12 maletas de mano u 8 maletas estándar de facturación o 6 maletas extra grandes de facturación",
      availability: "Ideal para grupos más grandes, mucho equipaje o familias",
      image: "https://via.placeholder.com/600x350/ccc/fff?text=Business+Van",
    },
    {
      id: 4,
      title: "Electric Class",
      description: "Jaguar I-PACE, Tesla Model S, Tesla Model X, o similar",
      capacity: "Capacidad para 3 personas",
      luggage:
        "Capacidad para 2 maletas de mano, o 2 maletas estándar de facturación, o 1 maleta extra grande de facturación",
      availability: "Disponible en algunos de nuestros distritos de negocios",
      image: "https://via.placeholder.com/600x350/ccc/fff?text=Electric+Class",
    },
  ];

  // Datos de las preguntas frecuentes
  const faqData = [
    {
      question: "What is limo in cars?",
      answer: (
        <p className="text-gray-600" data-oid="_cn1:vn">
          El término "limo" (abreviatura de limusina) puede referirse a muchos
          tipos de vehículos de pasajeros de lujo. Típicamente más grandes que
          el promedio para la comodidad del pasajero, pueden variar desde
          sedanes y SUVs hasta furgonetas ejecutivas y limusinas alargadas, con
          espacio para múltiples pasajeros.
        </p>
      ),
    },
    {
      question: "What is airport limo service?",
      answer: (
        <p className="text-gray-600" data-oid="3ruxy71">
          El servicio de limusina para aeropuertos es un servicio donde los
          pasajeros que viajan hacia o desde un aeropuerto son transportados con
          su equipaje en un vehículo con chófer. El conductor de la limusina del
          aeropuerto normalmente hace un seguimiento del vuelo de su pasajero,
          para poder ajustar la hora de recogida si hay algún retraso.
        </p>
      ),
    },
    {
      question: "What is the benefit of limo?",
      answer: (
        <p className="text-gray-600" data-oid="9evdsxc">
          El principal beneficio de contratar una limusina es la comodidad, el
          lujo y la tranquilidad. Ya sea que vaya a un evento, le recojan en un
          aeropuerto durante un estresante viaje de negocios, o esté con un
          grupo en unas vacaciones de esquí con todo su equipo, sabrá que el
          chófer está haciendo todo lo posible para que su viaje sea lo más
          fluido posible. Los mejores servicios de limusina permiten a las
          personas relajarse y recargar energías mientras viajan.
        </p>
      ),
    },
    {
      question: "Do you tip a private limo driver?",
      answer: (
        <p className="text-gray-600" data-oid="i1u1.8t">
          Depende de dónde se encuentre en el mundo, pero si cree que hicieron
          un trabajo particularmente bueno, entonces sí, puede dar propina a su
          conductor de limusina privada. En Privyde, sin embargo, las propinas y
          gratificaciones están incluidas en el precio que paga, por lo que no
          tiene que preocuparse por ese cálculo. En lugares como Nueva York,
          tiene la opción de añadir una propina extra para su conductor de
          limusina privada.
        </p>
      ),
    },
  ];

  return (
    <div className="bg-white" data-oid="uua_r5n">
      {/* Navigation */}
      <Navbar data-oid="nk7x41k" />

      {/* Hero Section with Full-Width Image */}
      <div className="flex flex-col w-full" data-oid="55c25j3">
        {/* Title Bar */}
        <div className="title-bar relative" data-oid="_mb80p:">
          <div className="container mx-auto px-4" data-oid="m0tahf5">
            <h1 className="text-3xl font-bold text-black" data-oid="xji3h-i">
              Servicio de limusinas
            </h1>
          </div>
        </div>

        {/* Image Container */}
        <div className="hero-container relative" data-oid="wydj7:m">
          {/* Background Image */}
          <div className="full-size-background" data-oid="9x6chva">
            <Image
              src="/images/limo-white.png"
              alt="Una mujer mira a su alrededor mientras emerge de su vehículo, con un chofer abriendo la puerta"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
              data-oid="5n2_72a"
            />
          </div>

          {/* Booking Widget - Solo visible en pantallas grandes (lg) */}
          <div
            className="booking-widget-container-overlay hidden lg:block"
            data-oid="2wt.jw5"
          >
            <BookingForm data-oid="7vzaeej" />
          </div>
        </div>
      </div>

      {/* Booking Widget - Solo visible en tablets y móviles (fuera del hero) */}
      <div
        className="lg:hidden mx-auto px-4 mb-8 mt-6 relative z-30"
        data-oid="orfugh6"
      >
        <BookingForm data-oid="0ek46qk" />
      </div>

      {/* Download Section */}
      <DownloadSection data-oid="l48v-wz" />

      {/* Main Content */}
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 max-w-6xl"
        data-oid="1iucs3t"
      >
        {/* Features Section */}
        <section className="mb-20" data-oid="pv3s_eh">
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            data-oid="8yl7-ot"
          >
            <div
              className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
              data-oid="2oqi535"
            >
              <div
                className="text-black mb-6 bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center"
                data-oid="hwep.f3"
              >
                <DollarSign className="h-10 w-10" data-oid="1q.u0pk" />
              </div>
              <h3
                className="text-xl font-semibold mb-4 text-gray-900"
                data-oid="tgvzi4c"
              >
                Precios competitivos
              </h3>
              <p className="text-gray-600 leading-relaxed" data-oid="rhdj5s5">
                Acceda a un servicio de primera calidad a precios basados en la
                distancia que son justos para usted y para nuestros chóferes.
              </p>
            </div>

            <div
              className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
              data-oid="uk54zke"
            >
              <div
                className="text-black mb-6 bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center"
                data-oid="eh0y:gt"
              >
                <Clock className="h-10 w-10" data-oid="3a84dyw" />
              </div>
              <h3
                className="text-xl font-semibold mb-4 text-gray-900"
                data-oid="k387rhp"
              >
                Viaje al aeropuerto sin problemas
              </h3>
              <p className="text-gray-600 leading-relaxed" data-oid="x1bnpxf">
                Relájese con la hora gratuita de espera y el seguimiento de
                vuelos.
              </p>
            </div>

            <div
              className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
              data-oid="wzw_xj3"
            >
              <div
                className="text-black mb-6 bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center"
                data-oid="44.sf:e"
              >
                <TimerReset className="h-10 w-10" data-oid="zpdt89g" />
              </div>
              <h3
                className="text-xl font-semibold mb-4 text-gray-900"
                data-oid="6slnfy:"
              >
                Flexibilidad de viaje
              </h3>
              <p className="text-gray-600 leading-relaxed" data-oid="syk_7w8">
                Manténgase flexible y a cargo de su horario. Es rápido y fácil
                para usted cancelar o hacer cambios en cualquier viaje.
              </p>
            </div>
          </div>
        </section>

        {/* Service Classes Section - Slider */}
        <section className="mb-20" data-oid="-d124vv">
          <h2
            className="text-3xl font-bold text-center text-gray-900 mb-12"
            data-oid="rahlef1"
          >
            Descubre nuestras clases de servicio
          </h2>

          {/* Slider con flechas de navegación */}
          <div className="relative" ref={sliderRef} data-oid="vq1kxkj">
            <div className="overflow-hidden" data-oid="h6_7ipp">
              <div
                className="flex flex-wrap lg:flex-nowrap justify-center"
                data-oid="u4qtunj"
              >
                {/* Contenido del slider */}
                <div className="w-full relative" data-oid="xm5qsd8">
                  {/* Card principal */}
                  <div
                    className="bg-gray-200 rounded-lg overflow-hidden shadow-lg"
                    data-oid="v-zqpdq"
                  >
                    <div className="relative" data-oid="6t_h78y">
                      {/* Flechas de navegación */}
                      <button
                        onClick={handlePrev}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-r-lg z-10 shadow-md"
                        aria-label="Anterior"
                        data-oid="ukp-y.e"
                      >
                        <ChevronLeft
                          className="h-5 w-5 text-gray-800"
                          data-oid="-aiqnm5"
                        />
                      </button>

                      <img
                        src={serviceClasses[activeServiceClass].image}
                        alt={serviceClasses[activeServiceClass].title}
                        className="w-full h-64 md:h-80 object-cover object-center"
                        data-oid="q1.tztm"
                      />

                      <button
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-l-lg z-10 shadow-md"
                        aria-label="Siguiente"
                        data-oid="d4llxpq"
                      >
                        <ChevronRight
                          className="h-5 w-5 text-gray-800"
                          data-oid="t.rk._:"
                        />
                      </button>

                      {/* Indicadores de diapositiva */}
                      <div
                        className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2"
                        data-oid="aesw67-"
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
                            data-oid="kc6gz.7"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="p-6" data-oid="0g3eym0">
                      <h3
                        className="text-2xl font-bold text-gray-900 mb-2"
                        data-oid="d0.lwf-"
                      >
                        {serviceClasses[activeServiceClass].title}
                      </h3>
                      <p
                        className="text-gray-700 text-sm mb-4"
                        data-oid="i78ombb"
                      >
                        {serviceClasses[activeServiceClass].description}
                      </p>

                      <div
                        className="border-t border-gray-200 pt-4"
                        data-oid="gqy.uhx"
                      >
                        <ul className="space-y-3" data-oid="kdj-mr.">
                          <li className="flex items-start" data-oid="2__6:b:">
                            <CheckCircle
                              className="h-5 w-5 text-gray-600 mr-2 mt-0.5 flex-shrink-0"
                              data-oid="z6l.7x."
                            />

                            <span
                              className="text-gray-700 text-sm"
                              data-oid="p:dpmdt"
                            >
                              {serviceClasses[activeServiceClass].capacity}
                            </span>
                          </li>
                          <li className="flex items-start" data-oid="i6g8.kt">
                            <CheckCircle
                              className="h-5 w-5 text-gray-600 mr-2 mt-0.5 flex-shrink-0"
                              data-oid="4839kij"
                            />

                            <span
                              className="text-gray-700 text-sm"
                              data-oid="wzhglsm"
                            >
                              {serviceClasses[activeServiceClass].luggage}
                            </span>
                          </li>
                          <li className="flex items-start" data-oid="g2wlsoo">
                            <CheckCircle
                              className="h-5 w-5 text-gray-600 mr-2 mt-0.5 flex-shrink-0"
                              data-oid="hwnh3j."
                            />

                            <span
                              className="text-gray-700 text-sm"
                              data-oid="sc2w18c"
                            >
                              {serviceClasses[activeServiceClass].availability}
                            </span>
                          </li>
                        </ul>
                      </div>

                      {/* Selector de páginas numerado */}
                      <div
                        className="flex justify-center mt-6 space-x-1"
                        data-oid="ykb1-m1"
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
                            data-oid="wght3p:"
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
        <section className="mb-20" data-oid="31:e8wl">
          <div className="grid grid-cols-1 gap-12" data-oid="zfda_81">
            {/* Primera sección */}
            <div
              className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm"
              data-oid="gnebgz5"
            >
              <h2
                className="text-2xl font-bold text-gray-900 mb-6"
                data-oid="0wr.w.."
              >
                Servicio de limusinas en la ciudad
              </h2>
              <p
                className="text-gray-600 mb-0 leading-relaxed"
                data-oid="8zbjsjf"
              >
                Vaya a donde vaya, una vez que se haya decantado por el lugar en
                el que alojarse necesitará decidir cómo va a explorar su nuevo
                entorno. Un servicio de limusina de Privyde le asegura tener un
                conductor profesional a mano, y cerciorarse así de que no se
                pierde de camino a la ciudad. Privyde puede contratarse como
                servicio por horas, lo cual le confiere un grado más alto de
                flexibilidad a su día sabiendo que tiene en la zona a un
                conductor de guardia esperándole. Otra alternativa es utilizar
                Privyde para un viaje sencillo de ida, y asegurarse de que llega
                a su destino con las pilas cargadas, relajado y listo. Justo lo
                contrario de una empresa de taxis local. Privyde está presente
                en ciudades de todo el mundo, así que, vaya donde vaya, ténganos
                en mente.
              </p>
            </div>
          </div>
        </section>

        {/* Images Section */}
        <section className="mb-20" data-oid="unde-n:">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            data-oid="9qqdl09"
          >
            <div data-oid="8hv-j7x">
              <img
                src="/images/limo-black.png"
                alt="Limusina negra de lujo"
                className="w-full h-auto rounded-xl shadow-lg object-cover mb-8"
                data-oid="h3g50l9"
              />

              <img
                src="/images/limo-elegant.png"
                alt="Un limusina elegante"
                className="w-full h-auto rounded-xl shadow-lg object-cover"
                data-oid="81mnm.z"
              />
            </div>
            <div data-oid="y_rr3-8">
              <h2
                className="text-3xl font-bold text-gray-900 mb-6"
                data-oid="vuo_t2z"
              >
                Desplácese con un servicio de limusina de Privyde
              </h2>
              <p className="text-lg text-gray-600 mb-6" data-oid="tutx:y:">
                Con un servicio de limusina de Privyde usted puede explorar con
                sofisticación y facilidad cualquier evento que la ciudad pueda
                ofrecerle. La flota del servicio de limusinas de Privyde puede
                adecuarse a una gran variedad de necesidades: nuestro vehículo
                estándar de clase Business puede utilizarse tanto para viajes
                sencillos desde un punto a otro, como contratarse por horas para
                una flexibilidad máxima para el pasajero. Nuestro servicio
                Primera Clase existe para cuando un pasajero realmente necesite
                impactar con su llegada: quizás en una boda o cita especial tras
                el trabajo. La opción de una furgoneta Business de Privyde le
                permite tanto a usted como a su grupo viajar como uno solo al
                aeropuerto, y contará con un montón de espacio para su equipaje
                y pertenencias. Escoja lo que escoja, utilizar el servicio de
                chófer de Privyde significa llegar con estilo.
              </p>
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section className="mb-20" data-oid="ahkoh2k">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            data-oid="n1psj3y"
          >
            <div data-oid="9.xufyy">
              <h2
                className="text-3xl font-bold text-gray-900 mb-6"
                data-oid="g837j10"
              >
                Servicio de limusinas en aeropuertos
              </h2>
              <p className="text-lg text-gray-600 mb-8" data-oid="wtfrqk_">
                ¿Necesita un traslado en aeropuertos para hasta cinco personas?
                Reserve nuestro servicio de traslados en aeropuertos para
                disfrutar de un servicio de limusina de alta calidad, de día o
                de noche. Escoja lo que escoja, el servicio de limusinas de
                Privyde da prioridad a la profesionalidad, comodidad y estilo.
                Nuestro proceso de reserva es sencillo, así que utilice nuestra
                accesible página web o nuestra elegante aplicación móvil para
                reservar su viaje en unos segundos. En Privyde creemos en la
                transparencia total y la honestidad, y es por ello que cuando
                usted reserva con nosotros, el precio final que ve es el precio
                que paga. No hay cargos ocultos que se vayan acumulando durante
                el proceso de reserva, lo que significa que puede calcular de
                forma precisa y con antelación los gastos de viaje (lo que
                resulta particularmente útil para los pasajeros corporativos).
              </p>
            </div>
            <div data-oid="y-_c:.j">
              <img
                src="/images/limo-airport.png"
                alt="Un hombre mira su teléfono mientras camina hacia un vehículo, con un chofer a su lado llevando su equipaje"
                className="w-full h-auto rounded-xl shadow-lg object-cover mb-8"
                data-oid="i55hwjx"
              />

              <img
                src="/images/limo-equipaje.png"
                alt="Un chófer carga el equipaje en la parte trasera de un vehículo, frente a dos emblemáticas casas urbanas de piedra marrón"
                className="w-full h-auto rounded-xl shadow-lg object-cover"
                data-oid="wenum.0"
              />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20" data-oid="ntduobq">
          <h2
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 relative"
            data-oid="0-ur.mm"
          >
            Frequently Asked Questions
            <span
              className="block w-24 h-1 bg-black mx-auto mt-4"
              data-oid="hmmnps6"
            ></span>
          </h2>

          <div className="space-y-4 max-w-4xl mx-auto" data-oid="1iupj:x">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl border ${openFaqIndex === index ? "border-gray-200 shadow-md" : "border-gray-200"} overflow-hidden transition-all duration-300`}
                data-oid="unpt2e."
              >
                <button
                  className="flex justify-between items-center w-full p-6 text-left"
                  onClick={() => toggleFaq(index)}
                  data-oid="vv6pd32"
                >
                  <h3
                    className={`text-xl font-semibold ${openFaqIndex === index ? "text-gray-600" : "text-gray-900"}`}
                    data-oid=":gs-fxh"
                  >
                    {faq.question}
                  </h3>
                  <div
                    className={`${openFaqIndex === index ? "text-black bg-gray-100" : "text-gray-400 bg-gray-50"} rounded-full p-1 transition-colors duration-300`}
                    data-oid="5x9ch5n"
                  >
                    {openFaqIndex === index ? (
                      <ChevronUp className="h-5 w-5" data-oid="bihx:st" />
                    ) : (
                      <ChevronDown className="h-5 w-5" data-oid="5bpxgo-" />
                    )}
                  </div>
                </button>
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    openFaqIndex === index
                      ? "max-h-[1000px] opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                  data-oid="nlhz5ex"
                >
                  <div className="px-6 pb-6 pt-0" data-oid="awjzypa">
                    <div
                      className="border-t border-gray-200 pt-4 text-left"
                      data-oid="68q14fw"
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
      <Footer data-oid="zn.fj3i" />
    </div>
  );
};

export default LimousineService;
