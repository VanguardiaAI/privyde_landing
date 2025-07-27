import { useState } from "react";
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
  Shield,
  DollarSign,
  Wifi,
  CalendarCheck,
  Star,
} from "lucide-react";

const HourlyHire = () => {
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
      question: "¿Cómo reservo un chófer por horas?",
      answer: (
        <div className="text-gray-600" data-oid=":uq6wfv">
          <p className="mb-2" data-oid="9ztff2u">
            Solo tienes que reservar tu chófer por horas arriba o en nuestra
            aplicación:
          </p>
          <ol className="list-decimal pl-5 space-y-1" data-oid=".p6ac1a">
            <li data-oid="nra1lbv">Selecciona el lugar de recogida.</li>
            <li data-oid="kl_q:.s">
              Elige la duración, el día y la hora de inicio.
            </li>
            <li data-oid="_c-_w2f">
              Elige una clase de vehículo que se adapte a tus necesidades.
            </li>
            <li data-oid="282xoqn">
              Proporciona información adicional, como el itinerario, en el campo
              «Notas para el chófer».
            </li>
            <li data-oid=":feke6.">
              ¡Completa tu reserva y disfruta de tu chófer privado!
            </li>
          </ol>
        </div>
      ),
    },
    {
      question: "¿Cómo puedo crear un itinerario para el trayecto por horas?",
      answer: (
        <p className="text-gray-600" data-oid=":0dbq64">
          Aunque no es necesario revelar tu itinerario con antelación, puedes
          agregarlo en el campo «Notas para el chófer».
        </p>
      ),
    },
    {
      question: "¿Cuándo recibiré los datos de contacto del chófer?",
      answer: (
        <div className="text-gray-600" data-oid="-rt6463">
          <p className="mb-2" data-oid="1.3omn4">
            El nombre y el número de teléfono del chófer se enviarán al pasajero
            una hora antes de la recogida por correo electrónico y SMS. Este
            mensaje también contiene la marca, el modelo y el número de
            matrícula del vehículo. Si has realizado una reserva para otra
            persona, esta información se enviará a la dirección de correo
            electrónico y al número de teléfono proporcionados en el proceso de
            reserva.
          </p>
          <p data-oid="maq2aqu">
            Una hora antes de un viaje, los pasajeros también pueden iniciar un
            chat con su chófer en nuestra aplicación.
          </p>
        </div>
      ),
    },
    {
      question: "¿Cómo me comunico con el chófer entre paradas?",
      answer: (
        <div className="text-gray-600" data-oid="ha6xvw7">
          <p className="mb-2" data-oid="b7l9prh">
            Para mayor facilidad, recomendamos descargar la aplicación y
            utilizar la función de chat.
          </p>
          <p data-oid="ue6e69n">
            Alternativamente, puedes ponerte en contacto con el chófer a través
            del número de teléfono que te enviaremos una hora antes de la
            recogida por correo electrónico y SMS.
          </p>
        </div>
      ),
    },
    {
      question: "¿El chófer habla inglés?",
      answer: (
        <p className="text-gray-600" data-oid="z1vk59n">
          Los chóferes de Privyde hablan inglés básico, así como el idioma local
          del país en el que se realiza el viaje.
        </p>
      ),
    },
    {
      question: "¿Puede el chófer recogerme en una ciudad y dejarme en otra?",
      answer: (
        <div className="text-gray-600" data-oid="re7z67r">
          <p className="mb-2" data-oid="u:11:h0">
            Sí, esto es posible.
          </p>
          <p className="mb-2" data-oid="d2id-oj">
            Sin embargo, si tu reserva por hora termina en una ciudad diferente
            a aquella en la que comenzaste, se aplicará un cargo por devolución
            del vehículo. Esto tiene en cuenta el tiempo y la distancia que el
            chófer debe recorrer para volver al lugar original. Si planeas
            viajar entre ciudades, te recomendamos reservar un viaje de ciudad a
            ciudad.
          </p>
          <p data-oid="57mh-mw">
            Si necesitas un chófer durante varios días, ponte en contacto con el
            servicio de atención al cliente a través de chat o correo
            electrónico en service@privyde.com.
          </p>
        </div>
      ),
    },
    {
      question: "¿Durante cuántas horas puedo reservar un chófer por horas?",
      answer: (
        <p className="text-gray-600" data-oid="k7.6e22">
          Puedes reservar un chófer el número de horas que quieras, con una
          reserva mínima de 2 horas y máxima de 24 horas.
        </p>
      ),
    },
    {
      question: "¿Puedo ampliar el número de horas que he reservado?",
      answer: (
        <p className="text-gray-600" data-oid="d0w2-mu">
          Sí, si necesitas al chófer durante algún tiempo más, hazlo saber. Si
          se acepta, se cobrará ese tiempo adicional directamente a tu cuenta.
        </p>
      ),
    },
    {
      question:
        "What if the number of booked hours changes and the booking is unexpectedly extended or shortened?",
      answer: (
        <div className="text-gray-600" data-oid="ezue69v">
          <p className="mb-2" data-oid="iv4w6h.">
            Unexpected events can happen.
          </p>
          <p data-oid="d3x6qep">
            If the number of booked hours is extended, extra time is charged in
            half hour increments. If the number of booked hours is shortened,
            unfortunately, no reimbursement applies. Please see section 5.2 of
            our T&C's.
          </p>
        </div>
      ),
    },
    {
      question: "¿Puedo añadir plazas para niños a la reserva?",
      answer: (
        <p className="text-gray-600" data-oid="y3fgit6">
          Sí, esto es posible. Añade las plazas infantiles necesarias en el
          campo «Notas para el chófer»; haremos lo posible por organizar las
          plazas infantiles de antemano.
        </p>
      ),
    },
  ];

  // Testimonios de clientes
  const testimonials = [
    {
      country: "Estados Unidos",
      text: "I had a driver for four hours, and he went above and beyond—helping with my bags when I went shopping, taking photos, and stopping at all the places I wanted to see. It made the whole experience so enjoyable and seamless.",
      stars: 5,
      source: "iOS app store",
    },
    {
      country: "Portugal",
      text: "The chauffeurs are not mere drivers but highly trained professionals, making every journey a delight. Whether you're off to a crucial meeting or heading to the airport, Privyde ensures you arrive relaxed and on time.",
      stars: 5,
      source: "iOS app store",
    },
    {
      country: "Canadá",
      text: "Privyde… the app all travelers need to know about! I am delighted by this app and the service it provides. Hourly or point-to-point service at the touch of a button. Haven't found a place where it doesn't work yet.",
      stars: 5,
      source: "iOS app store",
    },
  ];

  return (
    <div className="bg-white" data-oid="0ywpwf7">
      {/* Navigation */}
      <Navbar data-oid="l6uc_2y" />

      {/* Hero Section with Full-Width Image */}
      <div className="flex flex-col w-full" data-oid="x5ej-lu">
        {/* Title Bar */}
        <div className="title-bar relative" data-oid="-s43jl5">
          <div className="container mx-auto px-4" data-oid="4tmtuzt">
            <h1 className="text-3xl font-bold text-black" data-oid="g0.c:_y">
              Alquiler de chófer por horas y por días
            </h1>
          </div>
        </div>

        {/* Image Container */}
        <div className="hero-container relative" data-oid="pvtz9q2">
          {/* Background Image */}
          <div className="full-size-background" data-oid="h40:qvr">
            <Image
              src="/images/chauffeur-per-hours.png"
              alt="El chófer mantiene abierta la puerta del coche para el invitado que se acerca al vehículo."
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
              data-oid="-mb:07q"
            />
          </div>

          {/* Booking Widget - Solo visible en pantallas grandes (lg) */}
          <div
            className="booking-widget-container-overlay hidden lg:block"
            data-oid="fwp3iff"
          >
            <BookingForm data-oid="n:pq3of" />
          </div>
        </div>
      </div>

      {/* Booking Widget - Solo visible en tablets y móviles (fuera del hero) */}
      <div
        className="lg:hidden mx-auto px-4 mb-8 mt-6 relative z-30"
        data-oid="b77sef0"
      >
        <BookingForm data-oid=".r4a41j" />
      </div>

      {/* Freedom Banner */}
      <div className="bg-gray-100 py-12" data-oid="6aay_f6">
        <div className="container mx-auto px-4 text-center" data-oid="u419yo-">
          <h2
            className="text-3xl font-bold text-gray-900 mb-4"
            data-oid="r6qrolo"
          >
            Disfruta de la libertad absoluta
          </h2>
          <p
            className="text-lg text-gray-700 max-w-3xl mx-auto"
            data-oid="92sz9ew"
          >
            Nuestro servicio de chófer por horas o un día completo te
            proporciona un transporte a medida seguro, fiable y sostenible.
          </p>
        </div>
      </div>

      {/* Download Section */}
      <DownloadSection data-oid="_2v--5r" />

      {/* Main Content */}
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 max-w-6xl"
        data-oid="g85f8r:"
      >
        {/* Service Description */}
        <section className="mb-20" data-oid="g0f0h4d">
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            data-oid="t97eh5c"
          >
            <div data-oid="nsbme6-">
              <h2
                className="text-3xl font-bold text-gray-900 mb-6"
                data-oid="y4kdbx2"
              >
                Servicio de chófer por hora
              </h2>
              <p className="text-lg text-gray-600 mb-8" data-oid="e-krftg">
                Dile adiós a cambiar de medio de transporte cuando necesites
                realizar viajes con varias paradas. Ya no tendrás que esperar
                diferentes taxis en diferentes lugares, subir al transporte
                público abarrotado o buscar aparcamiento para tu coche de
                alquiler.
              </p>

              <div className="space-y-6" data-oid="mxuw7pq">
                <div className="flex items-start" data-oid="q1w-zfn">
                  <div
                    className="bg-gray-100 p-2 rounded-full mt-1 mr-4"
                    data-oid="22r5s:f"
                  >
                    <CalendarCheck
                      className="h-5 w-5 text-black"
                      data-oid="1qiwph_"
                    />
                  </div>
                  <div data-oid="yk5qe09">
                    <h3
                      className="font-semibold text-gray-900 mb-1"
                      data-oid="b3eilfx"
                    >
                      Establece el itinerario
                    </h3>
                    <p className="text-gray-600" data-oid="myxu_ra">
                      Tú decides dónde y cuándo ir, sabiendo que tu chófer
                      siempre estará listo cuando quieras.
                    </p>
                  </div>
                </div>

                <div className="flex items-start" data-oid="bnw5a-h">
                  <div
                    className="bg-gray-100 p-2 rounded-full mt-1 mr-4"
                    data-oid="0ugak1z"
                  >
                    <Clock className="h-5 w-5 text-black" data-oid=".c.c08z" />
                  </div>
                  <div data-oid="rl.wlpf">
                    <h3
                      className="font-semibold text-gray-900 mb-1"
                      data-oid="3.2sm6o"
                    >
                      Ahorra tiempo
                    </h3>
                    <p className="text-gray-600" data-oid="a2ga39p">
                      Recupera tiempo dejándote y recogiéndote en la puerta en
                      cada parada de tu viaje.
                    </p>
                  </div>
                </div>

                <div className="flex items-start" data-oid="_c5l4nf">
                  <div
                    className="bg-gray-100 p-2 rounded-full mt-1 mr-4"
                    data-oid="o0eylph"
                  >
                    <Shield className="h-5 w-5 text-black" data-oid="bb:sboj" />
                  </div>
                  <div data-oid="onn6_6-">
                    <h3
                      className="font-semibold text-gray-900 mb-1"
                      data-oid="6pn8.r_"
                    >
                      Disfruta de tu tranquilidad
                    </h3>
                    <p className="text-gray-600" data-oid="t2i16_x">
                      Viaja cómodamente en un vehículo premium, donde puedes
                      dejar tus objetos personales durante el viaje.
                    </p>
                  </div>
                </div>

                <div className="flex items-start" data-oid="f.ksyj-">
                  <div
                    className="bg-gray-100 p-2 rounded-full mt-1 mr-4"
                    data-oid="2-h8uh_"
                  >
                    <DollarSign
                      className="h-5 w-5 text-black"
                      data-oid="7oss9dd"
                    />
                  </div>
                  <div data-oid="mjnpe50">
                    <h3
                      className="font-semibold text-gray-900 mb-1"
                      data-oid="sa7pl9m"
                    >
                      Tarifas competitivas
                    </h3>
                    <p className="text-gray-600" data-oid="2qr5pbt">
                      Tu reserva incluye 20 km de viaje por cada hora reservada,
                      así como todos los impuestos y peajes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start" data-oid=".hxztwd">
                  <div
                    className="bg-gray-100 p-2 rounded-full mt-1 mr-4"
                    data-oid="yq:cqtr"
                  >
                    <Star className="h-5 w-5 text-black" data-oid="l:m92eg" />
                  </div>
                  <div data-oid="0055-qn">
                    <h3
                      className="font-semibold text-gray-900 mb-1"
                      data-oid="ou21mzg"
                    >
                      Fiabilidad
                    </h3>
                    <p className="text-gray-600" data-oid="49qmbkb">
                      Nuestros chóferes están capacitados para cumplir con los
                      más altos estándares de calidad y privacidad.
                    </p>
                  </div>
                </div>

                <div className="flex items-start" data-oid="l.19k3o">
                  <div
                    className="bg-gray-100 p-2 rounded-full mt-1 mr-4"
                    data-oid="jdqkx0-"
                  >
                    <Shield className="h-5 w-5 text-black" data-oid="i4lrbsa" />
                  </div>
                  <div data-oid="0pte6hq">
                    <h3
                      className="font-semibold text-gray-900 mb-1"
                      data-oid="3sy:wju"
                    >
                      Sostenibilidad
                    </h3>
                    <p className="text-gray-600" data-oid="yk5h2z1">
                      Ten la seguridad de que cada viaje se compensa con
                      emisiones de carbono, sin costes adicionales ni necesidad
                      de suscripción.
                    </p>
                  </div>
                </div>

                <div className="flex items-start" data-oid="z55nj2y">
                  <div
                    className="bg-gray-100 p-2 rounded-full mt-1 mr-4"
                    data-oid="09iglyy"
                  >
                    <Wifi className="h-5 w-5 text-black" data-oid="3o-w0yp" />
                  </div>
                  <div data-oid="neg690r">
                    <h3
                      className="font-semibold text-gray-900 mb-1"
                      data-oid="4lerqhq"
                    >
                      Wi-Fi disponible
                    </h3>
                    <p className="text-gray-600" data-oid="i_iwmuh">
                      Ya sea en viaje de negocios o de placer, puedes aprovechar
                      al máximo tu tiempo en el asiento trasero.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="flex items-center justify-center"
              data-oid="_8c7o1p"
            >
              <img
                src="/images/graphic-comparision.png"
                alt="By-the-hour comparison graphic"
                className="max-w-full h-auto rounded-xl shadow-lg"
                data-oid="sa_4w2k"
              />
            </div>
          </div>
        </section>

        {/* For all your trips */}
        <section className="mb-20" data-oid="waxjgyq">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            data-oid=".qlss9r"
          >
            <div data-oid="fp84d--">
              <img
                src="/images/white-suite.png"
                alt="A Privyde chauffeur opens the door for his guest who steps out in a white suit."
                className="w-full h-auto rounded-xl shadow-lg object-cover"
                data-oid="bf0pqyi"
              />
            </div>

            <div data-oid="0.-fnak">
              <h2
                className="text-3xl font-bold text-gray-900 mb-6"
                data-oid="j-jyred"
              >
                Para todos tus viajes
              </h2>
              <p className="text-lg text-gray-600 mb-8" data-oid=".oqs-:s">
                Conveniente, cómodo y flexible. Nuestro servicio de chófer por
                horas está diseñado para aquellas ocasiones en las que quieres
                que te aguarde un chófer.
              </p>

              <div className="space-y-6" data-oid="zt..h4c">
                <div
                  className="bg-gray-50 p-6 rounded-lg border border-gray-200"
                  data-oid="555or8h"
                >
                  <h3
                    className="font-semibold text-xl text-gray-900 mb-3"
                    data-oid="euqkbzq"
                  >
                    Viajes de negocios
                  </h3>
                  <p className="text-gray-600" data-oid=":ey89iw">
                    Aprovecha al máximo tus citas de negocios. No hay necesidad
                    de preocuparse por la logística, los tiempos de espera o las
                    prisas de ir de un lugar a otro cuando se tiene un día lleno
                    de reuniones, una presentación itinerante, etc.
                  </p>
                </div>

                <div
                  className="bg-gray-50 p-6 rounded-lg border border-gray-200"
                  data-oid="-t8o2s-"
                >
                  <h3
                    className="font-semibold text-xl text-gray-900 mb-3"
                    data-oid="-xj9-ab"
                  >
                    Actividades de ocio
                  </h3>
                  <p className="text-gray-600" data-oid="r8uascz">
                    Hacer turismo, ir de compras, disfrutar de una cena
                    elegante. Es fácil alternar entre todos tus compromisos
                    gracias a un servicio de chófer privado por horas.
                  </p>
                </div>

                <div
                  className="bg-gray-50 p-6 rounded-lg border border-gray-200"
                  data-oid="fvnq-c3"
                >
                  <h3
                    className="font-semibold text-xl text-gray-900 mb-3"
                    data-oid="cc4mr44"
                  >
                    Eventos
                  </h3>
                  <p className="text-gray-600" data-oid="gnb89qb">
                    El espectáculo no termina hasta que tú lo digas. Para
                    grandes partidos, estrenos, galas, conciertos y mucho más,
                    ten tu coche esperando y no tendrás que competir con cientos
                    de personas para poder ir a casa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global reach */}
        <section className="mb-20" data-oid="6qxq6h0">
          <div className="text-center mb-12" data-oid="g.x1:sp">
            <h2
              className="text-3xl font-bold text-gray-900 mb-4"
              data-oid="9mslyk:"
            >
              Alcance global
            </h2>
            <p
              className="text-lg text-gray-600 max-w-3xl mx-auto"
              data-oid="1a8_tp_"
            >
              Con chóferes profesionales en cientos de ciudades de más de 50
              países, puedes hacer reservas por horas para todos tus viajes.
              Dondequiera que vayas, puedes esperar la misma experiencia de
              primera calidad.
            </p>
          </div>

          <div className="flex justify-center mb-12" data-oid="tpj:uud">
            <img
              src="/images/futuristic-city-choffer.jpeg"
              alt="A map showing the many countries where Privyde in available."
              className="max-w-full h-auto rounded-lg shadow-md"
              data-oid="v4t8ikf"
            />
          </div>

          {/* Testimonials */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            data-oid="m406.c0"
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
                data-oid="8ub10vl"
              >
                <div className="flex items-center mb-4" data-oid="jn0.6xo">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-gray-400 fill-current"
                      data-oid="6q1uey4"
                    />
                  ))}
                  <span
                    className="ml-2 text-gray-500 text-sm"
                    data-oid="nkw8mzk"
                  >
                    {testimonial.source}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 italic" data-oid="iv0b14n">
                  "{testimonial.text}"
                </p>
                <p className="font-semibold text-gray-900" data-oid="w-1t:ml">
                  {testimonial.country}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20" data-oid=":80:-b-">
          <h2
            className="text-3xl font-bold text-center text-gray-900 mb-12 relative"
            data-oid="su2-olk"
          >
            Preguntas frecuentes
            <span
              className="block w-24 h-1 bg-black mx-auto mt-4"
              data-oid="5ofo2oi"
            ></span>
          </h2>

          <div className="space-y-4 max-w-4xl mx-auto" data-oid="y1mwzzu">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl border ${openFaqIndex === index ? "border-gray-200 shadow-md" : "border-gray-200"} overflow-hidden transition-all duration-300`}
                data-oid="hmg__1z"
              >
                <button
                  className="flex justify-between items-center w-full p-6 text-left"
                  onClick={() => toggleFaq(index)}
                  data-oid="dnj9kqk"
                >
                  <h3
                    className={`text-xl font-semibold ${openFaqIndex === index ? "text-gray-600" : "text-gray-900"}`}
                    data-oid="uutt.af"
                  >
                    {faq.question}
                  </h3>
                  <div
                    className={`${openFaqIndex === index ? "text-black bg-gray-100" : "text-gray-400 bg-gray-50"} rounded-full p-1 transition-colors duration-300`}
                    data-oid="6gk8cu9"
                  >
                    {openFaqIndex === index ? (
                      <ChevronUp className="h-5 w-5" data-oid="zt3j86b" />
                    ) : (
                      <ChevronDown className="h-5 w-5" data-oid="kvx1k.5" />
                    )}
                  </div>
                </button>
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    openFaqIndex === index
                      ? "max-h-[1000px] opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                  data-oid="1nzj.hs"
                >
                  <div className="px-6 pb-6 pt-0" data-oid="yi:_a6s">
                    <div
                      className="border-t border-gray-200 pt-4 text-left"
                      data-oid="w54:cl-"
                    >
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* App Download Section */}
        <section className="mb-20" data-oid="r79k4u9">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            data-oid="yrslzol"
          >
            <div data-oid="ufyn3s-">
              <img
                src="/images/woman-in-a-suit-walking.jpeg"
                alt="A woman in a suit walking away from her Privyde ride."
                className="w-full h-auto rounded-xl shadow-lg object-cover"
                data-oid="7hja7u2"
              />
            </div>

            <div data-oid="49joz79">
              <h2
                className="text-3xl font-bold text-gray-900 mb-6"
                data-oid="7nd631a"
              >
                Descargue la aplicación
              </h2>
              <p className="text-lg text-gray-600 mb-8" data-oid="epd2qxi">
                Reserve, cambie o cancele fácilmente los viajes sobre la marcha.
                Piense en ello como tener la tranquilidad al alcance de la mano.
              </p>

              <div
                className="flex justify-center md:justify-start"
                data-oid="477xi.i"
              >
                <img
                  src="/images/app-screen.png"
                  alt="Pantalla de inicio de la aplicación Privyde"
                  className="max-w-xs h-auto rounded-lg shadow-lg"
                  data-oid="d9abe75"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer data-oid="h2wxe2r" />
    </div>
  );
};

export default HourlyHire;
