import { useState } from "react";
import "../App.css";
import Image from "@/components/ui/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingForm from "@/components/booking-form";
import DownloadSection from "@/components/download-section";
import { ChevronDown, ChevronUp, Check } from "lucide-react";

const CityToCity = () => {
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

  // Datos de las preguntas frecuentes
  const faqData = [
    {
      question: "¿Cómo obtengo un presupuesto?",
      answer: (
        <>
          <p className="text-gray-600 mb-4" data-oid="1xabho0">
            Obtener un presupuesto es fácil:
          </p>
          <ul
            className="list-disc pl-5 mb-4 space-y-2 text-left"
            data-oid="2wqu72_"
          >
            <li className="text-gray-600 text-left" data-oid="vd9:7k4">
              Descargue nuestra aplicación o visite privyde.com
            </li>
            <li className="text-gray-600 text-left" data-oid="i268_3l">
              Introduzca las fechas y ubicaciones deseadas como si estuviera
              reservando
            </li>
            <li className="text-gray-600 text-left" data-oid="6tmltrv">
              En el siguiente paso, verá las tarifas para cada tipo de vehículo
            </li>
          </ul>
        </>
      ),
    },
    {
      question: "¿Puedo hacer paradas en un viaje de ciudad a ciudad?",
      answer: (
        <>
          <p className="text-gray-600 mb-4" data-oid="4:job7m">
            Nuestros viajes de ciudad a ciudad permiten descansos cómodos a lo
            largo de la ruta, pero no incluyen paradas adicionales que se
            desvíen de la ruta directa.
          </p>
          <p className="text-gray-600" data-oid="_9au6no">
            Si desea hacer paradas adicionales, puede reservar estos viajes por
            separado o hacer una reserva por horas, en la que, en lugar de tener
            un destino fijo, dispondrá de su chófer por un período de tiempo
            durante el cual podrá hacer tantas paradas como desee. Tenga en
            cuenta que nuestro servicio por horas incluye 20 km de viaje por
            hora reservada y se cobra un suplemento por la distancia adicional.
          </p>
        </>
      ),
    },
    {
      question:
        "¿Cuál es la política de cancelación y cómo puedo cancelar mi viaje?",
      answer: (
        <p className="text-gray-600" data-oid="cw8nj2i">
          Puede cancelar su viaje de forma gratuita hasta 1 hora antes de la
          hora de recogida programada. Para cancelar, diríjase a la sección de
          viajes reservados de la aplicación o el sitio web, seleccione el viaje
          y elija la opción de cancelación.
        </p>
      ),
    },
    {
      question: "¿Qué vehículos utiliza Privyde?",
      answer: (
        <>
          <p className="text-gray-600 mb-4" data-oid="9lo48_j">
            Privyde ofrece cuatro tipos de vehículos en la mayoría de las
            ubicaciones: Business Class, Electric Class, First Class y Business
            Van/SUV.
          </p>
          <p className="text-gray-600 mb-4" data-oid="wm-k0_:">
            Cada una de estas categorías contiene una selección de modelos
            comparables de primera línea, que puede ver en el proceso de reserva
            o en nuestro Centro de ayuda.
          </p>
          <p className="text-gray-600" data-oid="kv-exzc">
            Tenga en cuenta que las imágenes que se muestran al reservar son
            meramente ilustrativas. No podemos garantizar ninguna solicitud de
            modelos o colores específicos de vehículos, ya que el vehículo a
            utilizar está sujeto a disponibilidad.
          </p>
        </>
      ),
    },
    {
      question: "¿Cuándo recibiré la información de contacto del chófer?",
      answer: (
        <>
          <p className="text-gray-600 mb-4" data-oid="ab-0wl5">
            El nombre y el número de teléfono del chófer se enviarán al pasajero
            una hora antes de la recogida por correo electrónico y SMS. Este
            mensaje también contiene la marca, el modelo y el número de placa
            del vehículo. Si la reserva es para otra persona, esta información
            se enviará a la dirección de correo electrónico y al número de
            teléfono proporcionados en el proceso de reserva.
          </p>
          <p className="text-gray-600" data-oid="fq7v8v1">
            Una hora antes del viaje, los pasajeros también pueden contactar por
            chat con su chófer a través de la aplicación de Privyde.
          </p>
        </>
      ),
    },
    {
      question: "¿Qué sucede si el chófer llega tarde?",
      answer: (
        <p className="text-gray-600" data-oid="-3n.8nu">
          En el improbable caso de que su chófer se retrase, póngase en contacto
          con el chófer mediante el chat de la aplicación de Privyde. Si desea
          cancelar la reserva, puede hacerlo a través de la aplicación o el
          sitio web de Privyde.
        </p>
      ),
    },
    {
      question:
        "¿Qué sucede si no encuentro a mi chófer en la ubicación de recogida acordada?",
      answer: (
        <p className="text-gray-600" data-oid="p8wr41z">
          En ese caso, póngase en contacto con el chófer directamente. Puede
          hacerlo mediante la función de chat de la aplicación o a través del
          número de teléfono que se le habrá enviado una hora antes de la
          recogida por correo electrónico y SMS. Este mensaje también contiene
          la marca, el modelo y el número de placa del vehículo.
        </p>
      ),
    },
    {
      question: "¿El chófer habla inglés?",
      answer: (
        <p className="text-gray-600" data-oid="5cerzlk">
          Todos los chóferes de Privyde hablan inglés básico, así como el idioma
          local del país en el que se realiza el viaje.
        </p>
      ),
    },
    {
      question: "Can I add child seats to the booking?",
      answer: (
        <p className="text-gray-600" data-oid="f-0nc2u">
          Yes, this is possible. Please select the Business Van/SUV vehicle
          class and add the required child seat in the "Notes for the chauffeur"
          field. We will do our best to organize a child seat ahead of time.
        </p>
      ),
    },
  ];

  const majorCitiesData = [
    {
      id: 1,
      name: "New York",
      description: "21 rutas hacia/desde esta ciudad",
      imageUrl: "/images/newyork.jpg",
    },
    {
      id: 2,
      name: "London",
      description: "25 rutas hacia/desde esta ciudad",
      imageUrl:
        "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 3,
      name: "Paris",
      description: "16 rutas hacia/desde esta ciudad",
      imageUrl:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 4,
      name: "Dubai",
      description: "15 rutas hacia/desde esta ciudad",
      imageUrl: "/images/dubai.jpg",
    },
  ];

  const majorRoutesData = [
    {
      id: 1,
      from: "New York",
      to: "Philadelphia",
      duration: "1h 50m",
      distance: "59 mi",
    },
    {
      id: 2,
      from: "London",
      to: "Oxford",
      duration: "1h 45m",
      distance: "96 km",
    },
    {
      id: 3,
      from: "Paris",
      to: "Reims",
      duration: "2h 15m",
      distance: "145 km",
    },
    {
      id: 4,
      from: "Dubai",
      to: "Abu Dhabi",
      duration: "1h 15m",
      distance: "136 km",
    },
    {
      id: 5,
      from: "New York",
      to: "East Hampton",
      duration: "2h 30m",
      distance: "68 mi",
    },
    {
      id: 6,
      from: "Manchester",
      to: "Liverpool",
      duration: "1h",
      distance: "57 km",
    },
    {
      id: 7,
      from: "Nice",
      to: "Saint Tropez",
      duration: "1h 40m",
      distance: "112 km",
    },
    {
      id: 8,
      from: "Brisbane",
      to: "Gold Coast",
      duration: "1h",
      distance: "79 km",
    },
  ];

  const testimonials = [
    {
      text: "Probably the best car service I have experienced ever. Arranged for an airport pick up from LHR to Cambridge and was thoroughly impressed with all aspects of the service.",
      title: "Best car service ever...",
    },
    {
      text: "Amazing service levels. Prompt, courteous, clean and reliable. Went from Dubai to Abu Dhabi and back. [The car] was perfect - smooth as silk.",
      title: "Dubai <> Abu Dhabi",
    },
    {
      text: "On the day of pick up the driver was on time and waiting at my doorstep. I used them again to pick us up from JFK to take us back home and got the same experience. They get a 5 star rating for me!",
      title: "Icing on the cake",
    },
  ];

  return (
    <div className="bg-white" data-oid="nghe0k9">
      {/* Navigation */}
      <Navbar data-oid="u3f0:o3" />

      {/* Hero Section with Full-Width Image */}
      <div className="flex flex-col w-full" data-oid="v.tk:1n">
        {/* Title Bar */}
        <div className="title-bar relative" data-oid="92lwtup">
          <div className="container mx-auto px-4" data-oid="ei-pjac">
            <h1 className="text-3xl font-bold text-black" data-oid="upw7l19">
              Servicio de coche de larga distancia
            </h1>
          </div>
        </div>

        {/* Image Container */}
        <div className="hero-container relative" data-oid="3zyzsuu">
          {/* Background Image */}
          <div className="full-size-background" data-oid=":xfubgd">
            <Image
              src="/images/city2city.jpeg"
              alt="Viajes de ciudad a ciudad con chófer"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
              data-oid="efmyf9v"
            />
          </div>

          {/* Booking Widget - Solo visible en pantallas grandes (lg) */}
          <div
            className="booking-widget-container-overlay hidden lg:block"
            data-oid="risam99"
          >
            <BookingForm data-oid="uzx:rml" />
          </div>
        </div>
      </div>

      {/* Booking Widget - Solo visible en tablets y móviles (fuera del hero) */}
      <div
        className="lg:hidden mx-auto px-4 mb-8 mt-6 relative z-30"
        data-oid="vkq49_6"
      >
        <BookingForm data-oid="mbg2l6i" />
      </div>

      {/* Download Section */}
      <DownloadSection data-oid="z0okrj:" />

      {/* Main Content */}
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 max-w-6xl"
        data-oid="h4ao0hr"
      >
        {/* Introduction Section */}
        <section className="mb-20" data-oid="6a32nx5">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            data-oid="9hp7k8:"
          >
            <div data-oid="38t23w4">
              <img
                src="/images/city2city2.png"
                alt="trayecto directo de ciudad a ciudad"
                className="w-full h-auto rounded-xl shadow-lg object-cover"
                data-oid="h3l85ur"
              />
            </div>
            <div data-oid="9gz6gsr">
              <h2
                className="text-3xl font-bold text-gray-900 mb-6"
                data-oid="qgmb8m3"
              >
                Servicio de coche de larga distancia, la mejor manera de viajar
                entre ciudades
              </h2>
              <p className="text-lg text-gray-600 mb-8" data-oid="ar5da39">
                Despídase del estrés del transporte público y de la bienvenida a
                la comodidad y simplicidad de los viajes con chófer con nuestro
                servicio de transporte privado de ciudad a ciudad.
              </p>

              <ul className="space-y-4" data-oid="m600j7c">
                <li className="flex items-start" data-oid="6jpes6w">
                  <Check
                    className="h-6 w-6 text-black mr-3 mt-0.5 flex-shrink-0"
                    data-oid="5:c9ou:"
                  />

                  <span className="text-gray-700" data-oid="qk:xb1_">
                    Ahorre tiempo: con los viajes de puerta a puerta no tiene
                    que esperar colas ni hacer trasbordos entre distintos modos
                    de transporte.
                  </span>
                </li>
                <li className="flex items-start" data-oid="jr_0r3z">
                  <Check
                    className="h-6 w-6 text-black mr-3 mt-0.5 flex-shrink-0"
                    data-oid=".p5p81i"
                  />

                  <span className="text-gray-700" data-oid="yq9cl8e">
                    Establezca un horario: usted elige la hora de recogida y
                    puede cancelar hasta 1 hora antes de su viaje.
                  </span>
                </li>
                <li className="flex items-start" data-oid=".ef4c5m">
                  <Check
                    className="h-6 w-6 text-black mr-3 mt-0.5 flex-shrink-0"
                    data-oid="4s7s122"
                  />

                  <span className="text-gray-700" data-oid="-rbctm7">
                    Disfrute de la tranquilidad: viaje cómodamente en un
                    vehículo de alta gama y tenga la seguridad de que cada viaje
                    se compensa con emisiones de carbono.
                  </span>
                </li>
                <li className="flex items-start" data-oid=":de1un5">
                  <Check
                    className="h-6 w-6 text-black mr-3 mt-0.5 flex-shrink-0"
                    data-oid="hcf61g5"
                  />

                  <span className="text-gray-700" data-oid="89r_lj8">
                    Tarifas fijas: el precio de su ruta es el mismo sin importar
                    dónde comience o finalice su viaje dentro de los límites de
                    la ciudad.
                  </span>
                </li>
                <li className="flex items-start" data-oid="-2pavan">
                  <Check
                    className="h-6 w-6 text-black mr-3 mt-0.5 flex-shrink-0"
                    data-oid="565cl5v"
                  />

                  <span className="text-gray-700" data-oid="g4g53ru">
                    Tarifas competitivas: Los impuestos y los peajes están
                    incluidos, se paga por coche en lugar de por asiento, y el
                    único límite de equipaje es el espacio en el maletero.
                  </span>
                </li>
                <li className="flex items-start" data-oid="ko94:el">
                  <Check
                    className="h-6 w-6 text-black mr-3 mt-0.5 flex-shrink-0"
                    data-oid="-q55arv"
                  />

                  <span className="text-gray-700" data-oid="8zmmefq">
                    Recogidas seguras: con el servicio de coche de larga
                    distancia, no tiene que preocuparse por huelgas, falta de
                    personal o masificaciones.
                  </span>
                </li>
                <li className="flex items-start" data-oid="v_aighv">
                  <Check
                    className="h-6 w-6 text-black mr-3 mt-0.5 flex-shrink-0"
                    data-oid="85gpul7"
                  />

                  <span className="text-gray-700" data-oid="0z0l0xn">
                    Trabajo en ruta: ¿De viaje de negocios? Trabaje cómodamente
                    con Wi-Fi disponible en la mayoría de los lugares.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Global Reach Section */}
        <section className="mb-20" data-oid="oci:glr">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            data-oid="59fx6zo"
          >
            <div className="order-2 md:order-1" data-oid="9k7tazv">
              <h2
                className="text-3xl font-bold text-gray-900 mb-6"
                data-oid="qz7t7ng"
              >
                Alcance global
              </h2>
              <p className="text-lg text-gray-600 mb-8" data-oid="_nk:52p">
                Con más de 180 rutas por Arabia Saudí, Australia, Austria,
                Canadá, China, Emiratos Árabes Unidos, España, Estados Unidos,
                Francia, Irlanda, Japón, Malasia, Países Bajos, Polonia, Reino
                Unido, Sudáfrica, Suecia, Taiwán, Tailandia y Turquía, los
                viajes de larga distancia son más fáciles que nunca con un
                servicio de chófer fiable. Además, puede contar con el mismo
                fantástico servicio tanto si va de Nueva York a los Hamptons, de
                Londres a Oxford o de Dubai a Abu Dhabi.
              </p>
              <p className="text-lg text-gray-600 mb-4" data-oid=".ehl5zd">
                ¿Está planeando su próximo viaje de esquí? Consulte nuestra
                oferta de ciudad a pistas de esquí para todas sus necesidades de
                transporte durante la temporada de esquí.
              </p>
              <p className="text-lg text-gray-600" data-oid="65afktu">
                ¿O tal vez prefiere las playas de arena? Consulte nuestra oferta
                de ciudad a la playa para todas sus necesidades de transporte en
                su escapada a la playa.
              </p>
            </div>
            <div className="order-1 md:order-2" data-oid="zfj00v2">
              <img
                src="/images/connections.png"
                alt="Mapa mostrando rutas de ciudad a ciudad disponibles en todo el mundo"
                className="w-full h-auto rounded-xl shadow-lg object-cover"
                data-oid="hrcmzrt"
              />
            </div>
          </div>
        </section>

        {/* City Routes Section */}
        <section
          className="py-12 md:py-20 bg-gray-50 rounded-xl mb-20"
          data-oid="4bcp9.p"
        >
          <div className="container mx-auto px-4" data-oid="ey6tcos">
            <h2
              className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12 md:mb-16"
              data-oid="smrl6ce"
            >
              Rutas entre ciudades
            </h2>

            {/* Principales ciudades */}
            <div className="mb-12 md:mb-16" data-oid="3r5hbbj">
              <div
                className="flex justify-between items-center mb-6 md:mb-8"
                data-oid="2w_5s2d"
              >
                <h3
                  className="text-2xl font-semibold text-gray-700"
                  data-oid="h990i::"
                >
                  Principales ciudades
                </h3>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-700 font-medium"
                  data-oid="3nzf:j8"
                >
                  Ver todo
                </a>
              </div>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
                data-oid="t5rc15n"
              >
                {majorCitiesData.map((city) => (
                  <div
                    key={city.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-xl"
                    data-oid="lx24ggc"
                  >
                    <div className="relative h-40 w-full" data-oid="3li.ubh">
                      <Image
                        src={city.imageUrl}
                        alt={city.name}
                        fill
                        className="object-cover"
                        data-oid="ygnozy9"
                      />
                    </div>
                    <div className="p-4" data-oid="j4y_dfm">
                      <h4
                        className="text-lg font-semibold text-gray-900 mb-1"
                        data-oid="h9ek2c2"
                      >
                        {city.name}
                      </h4>
                      <p className="text-gray-600 text-sm" data-oid="hmf6shz">
                        {city.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Principales rutas */}
            <div className="mb-12 md:mb-16" data-oid="k:sbn8y">
              <div
                className="flex justify-between items-center mb-6 md:mb-8"
                data-oid="gd1av93"
              >
                <h3
                  className="text-2xl font-semibold text-gray-700"
                  data-oid="mv7rhc-"
                >
                  Principales rutas
                </h3>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-700 font-medium"
                  data-oid="dnbhbyz"
                >
                  Ver todo
                </a>
              </div>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
                data-oid="nd4cn26"
              >
                {majorRoutesData.map((route) => (
                  <div
                    key={route.id}
                    className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:shadow-md transition-shadow"
                    data-oid="0r.23fk"
                  >
                    <div
                      className="flex items-center justify-between mb-1"
                      data-oid="-tvz-hu"
                    >
                      <span
                        className="font-semibold text-gray-800"
                        data-oid="-1q_._l"
                      >
                        {route.from}
                      </span>
                      <span className="text-gray-500 mx-2" data-oid="54m-mk2">
                        →
                      </span>
                      <span
                        className="font-semibold text-gray-800"
                        data-oid="d:339ax"
                      >
                        {route.to}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm" data-oid="ejxffe2">
                      {route.duration} &nbsp;&nbsp; {route.distance}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Bar */}
            <div
              className="bg-white rounded-lg shadow-md p-6 md:p-8 flex flex-col md:flex-row justify-between items-center"
              data-oid=".ci3:oh"
            >
              <div data-oid="ctux.yu">
                <h4
                  className="text-lg font-semibold text-gray-800 mb-1"
                  data-oid="-50l4ex"
                >
                  ¿Tiene en mente ruta?
                </h4>
                <p className="text-gray-600" data-oid="l__jr31">
                  Introduzca sus destinos ideales para ver el precio.
                </p>
              </div>
              <button
                className="mt-4 md:mt-0 bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out"
                data-oid="xem1-fi"
              >
                Reservar un viaje de ciudad a ciudad
              </button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20" data-oid="wxwwnf-">
          <h2
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 relative"
            data-oid="ao.3:bs"
          >
            Preguntas más frecuentes
            <span
              className="block w-24 h-1 bg-black mx-auto mt-4"
              data-oid="y2n9fin"
            ></span>
          </h2>

          <div className="space-y-4 max-w-4xl mx-auto" data-oid="rfqjz_8">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl border ${openFaqIndex === index ? "border-gray-200 shadow-md" : "border-gray-200"} overflow-hidden transition-all duration-300`}
                data-oid="m00_iw6"
              >
                <button
                  className="flex justify-between items-center w-full p-6 text-left"
                  onClick={() => toggleFaq(index)}
                  data-oid="xxkkfxn"
                >
                  <h3
                    className={`text-xl font-semibold ${openFaqIndex === index ? "text-gray-600" : "text-gray-900"}`}
                    data-oid="e:kbtvj"
                  >
                    {faq.question}
                  </h3>
                  <div
                    className={`${openFaqIndex === index ? "text-black bg-gray-100" : "text-gray-400 bg-gray-50"} rounded-full p-1 transition-colors duration-300`}
                    data-oid="e656h7g"
                  >
                    {openFaqIndex === index ? (
                      <ChevronUp className="h-5 w-5" data-oid="9ex99xp" />
                    ) : (
                      <ChevronDown className="h-5 w-5" data-oid="0a_-.ke" />
                    )}
                  </div>
                </button>
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    openFaqIndex === index
                      ? "max-h-[1000px] opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                  data-oid="1fv6lf-"
                >
                  <div className="px-6 pb-6 pt-0" data-oid="h7wb18r">
                    <div
                      className="border-t border-gray-200 pt-4 text-left"
                      data-oid="g.3v7i7"
                    >
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mb-20" data-oid="6ti:a5v">
          <div
            className="grid grid-cols-1 gap-8 items-center"
            data-oid="xrxpqgw"
          >
            <div
              className="flex flex-col md:flex-row items-center"
              data-oid="5a-xam7"
            >
              <div
                className="md:w-2/5 mb-10 md:mb-0 md:pr-10"
                data-oid="hb-zpui"
              >
                <img
                  src="/images/chauffeur-guest-black-car.png"
                  alt="Cliente saliendo de un coche negro con el chófer sosteniendo la puerta abierta"
                  className="w-full h-auto rounded-xl shadow-lg object-cover"
                  data-oid="zttt5ec"
                />
              </div>
              <div className="md:w-3/5" data-oid="-te6nzt">
                <div className="grid grid-cols-1 gap-6" data-oid="fxedb_a">
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
                      data-oid="c9b.0x8"
                    >
                      <div className="mb-3" data-oid="yra9yp7">
                        <Image
                          src="/stars.jpg"
                          alt="5 estrellas"
                          width={100}
                          height={20}
                          data-oid="n40o.7y"
                        />

                        <Image
                          src="/appstore.png"
                          alt="iOS App Store logo"
                          width={80}
                          height={20}
                          className="ml-2 inline"
                          data-oid="amux25_"
                        />
                      </div>
                      <h4
                        className="text-xl font-semibold text-gray-900 mb-2"
                        data-oid="er:hwjp"
                      >
                        {testimonial.title}
                      </h4>
                      <p className="text-gray-600 italic" data-oid="hefji.2">
                        "{testimonial.text}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Download App Section */}
        <section className="mb-16" data-oid="kcy.9:.">
          <div
            className="flex flex-col md:flex-row items-center"
            data-oid=".2tm5cg"
          >
            {/* Left Column: Text & Badges */}
            <div
              className="md:w-1/2 text-left mb-10 md:mb-0 md:pr-10"
              data-oid="7_ig52h"
            >
              <h2
                className="text-3xl font-bold text-gray-800 mb-4"
                data-oid="lu015vw"
              >
                Descargue la aplicación
              </h2>
              <p className="text-gray-600 mb-6" data-oid="-wn6ac2">
                Reserve, cambie o cancele fácilmente los viajes sobre la marcha.
                Piense en ello como tener la tranquilidad al alcance de la mano.
              </p>
              <div className="flex space-x-3" data-oid="bw-ze:_">
                <a
                  href="#"
                  className="hover:opacity-80 transition-opacity"
                  data-oid="20ziuwr"
                >
                  <Image
                    src="/appstore.png"
                    alt="Download on the App Store"
                    width={130}
                    height={40}
                    data-oid="pha:h71"
                  />
                </a>
                <a
                  href="#"
                  className="hover:opacity-80 transition-opacity"
                  data-oid="4_he39y"
                >
                  <Image
                    src="/googleplay.png"
                    alt="Get it on Google Play"
                    width={130}
                    height={40}
                    data-oid="7h7i3m5"
                  />
                </a>
              </div>
            </div>

            {/* Right Column: Phone Image */}
            <div
              className="md:w-1/2 flex justify-center md:justify-end"
              data-oid=".s20inq"
            >
              <Image
                src="https://via.placeholder.com/300x600.png?text=App+Screenshot"
                alt="Pantalla de inicio de la aplicación Privyde"
                width={300}
                height={600}
                className="object-contain max-h-[500px]"
                data-oid="yxu49sw"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer data-oid="ii7_n4g" />
    </div>
  );
};

export default CityToCity;
