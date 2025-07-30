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

const AirportTransfers = () => {
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

  // Datos de clases de servicio actualizado con las nuevas clases
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
      image:
        "https://via.placeholder.com/600x350/ccc/fff?text=Mercedes+S-Class",
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
      image:
        "https://via.placeholder.com/600x350/ccc/fff?text=Mercedes+V-Class",
    },
    {
      id: 4,
      title: "Electric Class",
      description: "Jaguar I-PACE, Tesla Model S, Tesla Model X, o similar",
      capacity: "Capacidad para 3 personas",
      luggage:
        "Capacidad para 2 maletas de mano, o 2 maletas estándar de facturación, o 1 maleta extra grande de facturación",
      availability: "Disponible en algunos de nuestros distritos de negocios",
      image: "https://via.placeholder.com/600x350/ccc/fff?text=Tesla+Model+S",
    },
    {
      id: 5,
      title: "Limusinas",
      description:
        "Stretch Lincoln, Hummer Limousine, Mercedes Maybach, o similar",
      capacity: "Capacidad para hasta 12 personas",
      luggage:
        "Capacidad para 10 maletas de mano o 6 maletas estándar de facturación",
      availability: "Disponible para eventos especiales, bodas y ocasiones VIP",
      image:
        "https://via.placeholder.com/600x350/ccc/fff?text=Stretch+Limousine",
    },
    {
      id: 6,
      title: "Jets Privados",
      description:
        "Cessna Citation, Bombardier, Gulfstream, Embraer, o similar",
      capacity: "Capacidad para 4-16 personas dependiendo del modelo",
      luggage: "Capacidad personalizada según necesidades",
      availability:
        "Reserva con 48h de antelación, disponible en aeropuertos principales",
      image: "https://via.placeholder.com/600x350/ccc/fff?text=Private+Jet",
    },
    {
      id: 7,
      title: "Coches Blindados",
      description:
        "Mercedes-Benz Clase S Guard, BMW 7 Series High Security, Audi A8 Security, o similar",
      capacity: "Capacidad para 3 personas",
      luggage:
        "Capacidad para 2 maletas de mano, o 2 maletas estándar de facturación",
      availability:
        "Disponible solo en ciudades seleccionadas con reserva anticipada",
      image: "https://via.placeholder.com/600x350/ccc/fff?text=Armored+Car",
    },
  ];

  // Datos de las preguntas frecuentes
  const faqData = [
    {
      question: "What does an airport transfer do?",
      answer: (
        <p className="text-gray-600" data-oid=":6vd5.g">
          An airport transfer is a private car service which takes air
          passengers to and from the airport from a city or transport hub.
          Professional airport transfer services like Privyde offer
          chauffeur-driven vehicles to pick up passengers in the terminal after
          they collect their luggage, or drop them off to their departure gate
          well ahead of time. As a global company Privyde is ideally suited to
          airport transfers, as they can handle passenger's needs at both ends
          of their international flight.
        </p>
      ),
    },
    {
      question: "Is it worth booking an airport transfer?",
      answer: (
        <p className="text-gray-600" data-oid="_indprt">
          Airport transfers are a great way of avoiding the stress at both ends
          of a flight — the stress of packing and getting to an airport on time
          via public transport, as well as that of your onward journey after
          stepping off an airplane fatigued. Privyde offers a wide range of
          airport transfer options to suit your needs, from luxury Electric
          Class limos to glide silently along the route, to the roomy Business
          Van Class which can comfortably handle groups and their luggage.
        </p>
      ),
    },
    {
      question: "What is a paid airport transfer?",
      answer: (
        <p className="text-gray-600" data-oid="5a0wf30">
          A paid airport transfer is a ride with a pre-booked professional
          driver to take customers to and/or from the airport. These airport
          shuttles are designed to accommodate passengers and their luggage
          comfortably and safely. Privyde's airport transfer includes tips,
          tolls, and any additional payments, so the price you see is the final
          price of your journey.
        </p>
      ),
    },
  ];

  return (
    <div className="bg-white" data-oid="g.413nm">
      {/* Navigation */}
      <Navbar data-oid="95pzwzf" />

      {/* Hero Section with Full-Width Image */}
      <div className="flex flex-col w-full" data-oid="_wafud4">
        {/* Title Bar */}
        <div className="title-bar relative" data-oid="ueu2q-9">
          <div className="container mx-auto px-4" data-oid="on68h0g">
            <h1 className="text-3xl font-bold text-black" data-oid="0w3jp4l">
              Servicio de traslados en aeropuertos
            </h1>
          </div>
        </div>

        {/* Image Container */}
        <div className="hero-container relative" data-oid="wdvelrw">
          {/* Background Image */}
          <div className="full-size-background" data-oid="k9f5wb0">
            <Image
              src="/images/airport.jpeg"
              alt="Un hombre y una mujer sonríen e intercambian miradas mientras se acercan a su vehículo que espera"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
              data-oid="a-g_c:m"
            />
          </div>

          {/* Booking Widget - Solo visible en pantallas grandes (lg) */}
          <div
            className="booking-widget-container-overlay hidden lg:block"
            data-oid="3u9938i"
          >
            <BookingForm data-oid="wul0f68" />
          </div>
        </div>
      </div>

      {/* Booking Widget - Solo visible en tablets y móviles (fuera del hero) */}
      <div
        className="lg:hidden mx-auto px-4 mb-8 mt-6 relative z-30"
        data-oid=":ijfktn"
      >
        <BookingForm data-oid="gcaigxv" />
      </div>

      {/* Download Section */}
      <DownloadSection data-oid="yc839nw" />

      {/* Main Content */}
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 max-w-6xl"
        data-oid="x-zi1.g"
      >
        {/* Features Section */}
        <section className="mb-20" data-oid="nqog88x">
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            data-oid="xil7.iz"
          >
            <div
              className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
              data-oid="_9srkpf"
            >
              <div
                className="text-black mb-6 bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center"
                data-oid="hff7m.:"
              >
                <DollarSign className="h-10 w-10" data-oid="40_4_ms" />
              </div>
              <h3
                className="text-xl font-semibold mb-4 text-gray-900"
                data-oid="ch15oa2"
              >
                Precios competitivos
              </h3>
              <p className="text-gray-600 leading-relaxed" data-oid="y-:4j9i">
                Acceda a un servicio de primera calidad a precios basados en la
                distancia que son justos para usted y para nuestros chóferes.
              </p>
            </div>

            <div
              className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
              data-oid="zmcj3hn"
            >
              <div
                className="text-black mb-6 bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center"
                data-oid="v6rnn6c"
              >
                <Clock className="h-10 w-10" data-oid="sbr:gp4" />
              </div>
              <h3
                className="text-xl font-semibold mb-4 text-gray-900"
                data-oid="j:jfa-j"
              >
                Viaje al aeropuerto sin problemas
              </h3>
              <p className="text-gray-600 leading-relaxed" data-oid="elhl.k.">
                Relájese con la hora gratuita de espera y el seguimiento de
                vuelos.
              </p>
            </div>

            <div
              className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
              data-oid="0x4ddi5"
            >
              <div
                className="text-black mb-6 bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center"
                data-oid="5u_jcrx"
              >
                <TimerReset className="h-10 w-10" data-oid="w_bu:eq" />
              </div>
              <h3
                className="text-xl font-semibold mb-4 text-gray-900"
                data-oid="wour0.j"
              >
                Flexibilidad de viaje
              </h3>
              <p className="text-gray-600 leading-relaxed" data-oid="fp9j47y">
                Manténgase flexible y a cargo de su horario. Es rápido y fácil
                para usted cancelar o hacer cambios en cualquier viaje.
              </p>
            </div>
          </div>
        </section>

        {/* Service Classes Section - NUEVO DISEÑO */}
        <section className="mb-20" data-oid=":zjba3f">
          <h2
            className="text-3xl font-bold text-center text-gray-900 mb-12"
            data-oid="oorwwko"
          >
            Descubre nuestras clases de servicio
          </h2>

          {/* Slider con flechas de navegación */}
          <div className="relative" ref={sliderRef} data-oid=".1ei2ob">
            <div className="overflow-hidden" data-oid="70gx44r">
              <div
                className="flex flex-wrap lg:flex-nowrap justify-center"
                data-oid="-27ajap"
              >
                {/* Contenido del slider */}
                <div className="w-full relative" data-oid="8y5dhrd">
                  {/* Card principal */}
                  <div
                    className="bg-gray-200 rounded-lg overflow-hidden shadow-lg"
                    data-oid="qqre1ww"
                  >
                    <div className="relative" data-oid="2u3api2">
                      {/* Flechas de navegación */}
                      <button
                        onClick={handlePrev}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-r-lg z-10 shadow-md"
                        aria-label="Anterior"
                        data-oid="-gyh--n"
                      >
                        <ChevronLeft
                          className="h-5 w-5 text-gray-800"
                          data-oid="ydypky4"
                        />
                      </button>

                      <img
                        src={serviceClasses[activeServiceClass].image}
                        alt={serviceClasses[activeServiceClass].title}
                        className="w-full h-64 md:h-80 object-cover object-center"
                        data-oid="bi8yxiy"
                      />

                      <button
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-l-lg z-10 shadow-md"
                        aria-label="Siguiente"
                        data-oid="xonpg.1"
                      >
                        <ChevronRight
                          className="h-5 w-5 text-gray-800"
                          data-oid="dnsw2uz"
                        />
                      </button>

                      {/* Indicadores de diapositiva */}
                      <div
                        className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2"
                        data-oid="_bb9v1s"
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
                            data-oid="tgutnk2"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="p-6" data-oid="06z7b88">
                      <h3
                        className="text-2xl font-bold text-gray-900 mb-2"
                        data-oid="2d_s3c6"
                      >
                        {serviceClasses[activeServiceClass].title}
                      </h3>
                      <p
                        className="text-gray-700 text-sm mb-4"
                        data-oid="jaokgz1"
                      >
                        {serviceClasses[activeServiceClass].description}
                      </p>

                      <div
                        className="border-t border-gray-200 pt-4"
                        data-oid="e7lhm7u"
                      >
                        <ul className="space-y-3" data-oid="16v93qp">
                          <li className="flex items-start" data-oid="2l7-5rt">
                            <CheckCircle
                              className="h-5 w-5 text-gray-600 mr-2 mt-0.5 flex-shrink-0"
                              data-oid="n0kvo12"
                            />

                            <span
                              className="text-gray-700 text-sm"
                              data-oid="wqx_2y2"
                            >
                              {serviceClasses[activeServiceClass].capacity}
                            </span>
                          </li>
                          <li className="flex items-start" data-oid="lnzkm.d">
                            <CheckCircle
                              className="h-5 w-5 text-gray-600 mr-2 mt-0.5 flex-shrink-0"
                              data-oid="p4m-kyl"
                            />

                            <span
                              className="text-gray-700 text-sm"
                              data-oid="fkdg:ig"
                            >
                              {serviceClasses[activeServiceClass].luggage}
                            </span>
                          </li>
                          <li className="flex items-start" data-oid="tsd7ojc">
                            <CheckCircle
                              className="h-5 w-5 text-gray-600 mr-2 mt-0.5 flex-shrink-0"
                              data-oid=".ds7dzk"
                            />

                            <span
                              className="text-gray-700 text-sm"
                              data-oid="td8c6.w"
                            >
                              {serviceClasses[activeServiceClass].availability}
                            </span>
                          </li>
                        </ul>
                      </div>

                      {/* Selector de páginas numerado */}
                      <div
                        className="flex justify-center mt-6 space-x-1"
                        data-oid="uj7myxf"
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
                            data-oid="dnjiq7c"
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
        <section className="mb-20" data-oid="237-35q">
          <div className="grid grid-cols-1 gap-12" data-oid="5tbp3qv">
            {/* Primera sección */}
            <div
              className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm"
              data-oid="6bw0c.l"
            >
              <h2
                className="text-2xl font-bold text-gray-900 mb-6"
                data-oid="a_n5-mc"
              >
                Traslados hasta y desde aeropuertos en la ciudad
              </h2>
              <p
                className="text-gray-600 mb-0 leading-relaxed"
                data-oid="ekitt_8"
              >
                Si acaba de bajarse del avión, cansado y dolorido después de un
                largo vuelo, no hay mejor antídoto para tal malestar que un
                traslado directo de Privyde que le lleve a su destino. Los
                traslados de Privyde están disponibles en cientos de ciudades y
                aeropuertos por todo el mundo, y para aquellos que no disfrutan
                especialmente descifrando los mapas de transporte públicos en el
                extranjero o regateos con las empresas de taxi locales, Privyde
                ofrece un servicio que le llevará a su destino de forma directa
                desde el aeropuerto. Vaya a donde vaya, nuestros conductores
                profesionales pueden hacer un seguimiento de su vuelo y ajustar
                la hora de recogida si hay retrasos fuera de su control. Se
                escogen personalmente y son expertos en la zona, así que no dude
                en pedirles consejos o sugerencias sobre qué hacer durante su
                estancia.
              </p>
            </div>
          </div>
        </section>

        {/* Airport Images Section */}
        <section className="mb-20" data-oid="srz.jyd">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            data-oid="yqx7jxz"
          >
            <div data-oid=".2jg-c8">
              <img
                src="/images/chauffeur-door-open.jpg"
                alt="El chofer abre la puerta del auto para que los invitados entren"
                className="w-full h-auto rounded-xl shadow-lg object-cover mb-8"
                data-oid="nd:a3ph"
              />

              <img
                src="/images/chauffeur-luggage.jpg"
                alt="Chauffeur puts luggage in the trunk while guest waits"
                className="w-full h-auto rounded-xl shadow-lg object-cover"
                data-oid="2ovp14k"
              />
            </div>
            <div data-oid="iml7rvt">
              <h2
                className="text-3xl font-bold text-gray-900 mb-6"
                data-oid="o03:_8v"
              >
                Llegue o salga del aeropuerto
              </h2>
              <p className="text-lg text-gray-600 mb-6" data-oid="mfx7n9t">
                Un servicio de chófer de Privyde busca alcanzar los estándares
                más altos posibles para todos sus pasajeros. Ya acabe de salir
                de LAX en California por motivos de negocios o necesite que le
                lleven al aeropuerto internacional de Bangkok después de unas
                vacaciones en Tailandia, Privyde le llevará, relajado, con las
                pilas cargadas y listo, gracias a un servicio de taxi para
                traslados en aeropuertos.
              </p>
              <p className="text-lg text-gray-600 mb-6" data-oid="4r0ike5">
                ¿Necesita ir desde el aeropuerto hasta su hotel con la familia o
                amigos? Una furgoneta Business de Privyde puede compartirse
                entre hasta cinco personas, y cuenta con un montón de espacio
                para equipaje. Para aquellos que busquen algo más, contamos con
                nuestro servicio Primera Clase, el epítome del estilo y
                comodidad. Una gran idea para ocasiones especiales.
              </p>
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section className="mb-20" data-oid="qfep6_r">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            data-oid="drbzrwl"
          >
            <div data-oid="vuo0cmn">
              <h2
                className="text-3xl font-bold text-gray-900 mb-6"
                data-oid="oi7ehps"
              >
                Reservas de conexiones entre aeropuertos
              </h2>
              <p className="text-lg text-gray-600 mb-8" data-oid=".5q3rlp">
                Reservar un servicio de limusina de Privyde es fácil y solo se
                necesitan unos segundos. Puede reservar su traslado hasta o
                desde aeropuertos en la ciudad que elija por medio del accesible
                sitio web de Privyde o utilizando la aplicación móvil para
                dispositivos Apple o Android. Las pasos necesarios son
                sencillos: simplemente proporcione los datos de recogida y
                destino y seleccione la clase del vehículo que desea para su
                traslado. Tras confirmar la tarifa calculada y los datos de
                pago, recibirá poco después un correo electrónico de
                confirmación. Privyde se enorgullece de su transparencia, que es
                por lo que usted no recibirá cargos ocultos cuando reserve con
                nosotros. El precio que ve es el precio que paga. Una gran
                manera de empezar su viaje.
              </p>
            </div>
            <div data-oid="ugcn0ro">
              <img
                src="/images/chauffeur-electronic-key.jpg"
                alt="Chauffeur carries luggage for guest to car and uses electronic key to open it"
                className="w-full h-auto rounded-xl shadow-lg object-cover"
                data-oid="p-coa-z"
              />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20" data-oid="angsi1w">
          <h2
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 relative"
            data-oid="mm0q5ph"
          >
            Frequently Asked Questions
            <span
              className="block w-24 h-1 bg-black mx-auto mt-4"
              data-oid="orx8_e0"
            ></span>
          </h2>

          <div className="space-y-4 max-w-4xl mx-auto" data-oid="nhmwg5d">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl border ${openFaqIndex === index ? "border-gray-200 shadow-md" : "border-gray-200"} overflow-hidden transition-all duration-300`}
                data-oid="rumsyef"
              >
                <button
                  className="flex justify-between items-center w-full p-6 text-left"
                  onClick={() => toggleFaq(index)}
                  data-oid=":ya1qea"
                >
                  <h3
                    className={`text-xl font-semibold ${openFaqIndex === index ? "text-gray-600" : "text-gray-900"}`}
                    data-oid="_gh9q_o"
                  >
                    {faq.question}
                  </h3>
                  <div
                    className={`${openFaqIndex === index ? "text-black bg-gray-100" : "text-gray-400 bg-gray-50"} rounded-full p-1 transition-colors duration-300`}
                    data-oid="s5bt8c6"
                  >
                    {openFaqIndex === index ? (
                      <ChevronUp className="h-5 w-5" data-oid="6sf:_ml" />
                    ) : (
                      <ChevronDown className="h-5 w-5" data-oid="28j7ypy" />
                    )}
                  </div>
                </button>
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    openFaqIndex === index
                      ? "max-h-[1000px] opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                  data-oid="5604oc3"
                >
                  <div className="px-6 pb-6 pt-0" data-oid="zw8932s">
                    <div
                      className="border-t border-gray-200 pt-4 text-left"
                      data-oid="q.v7z8o"
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
      <Footer data-oid="63j8pym" />
    </div>
  );
};

export default AirportTransfers;
