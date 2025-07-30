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
        <div className="text-gray-600" data-oid="3di3za8">
          <p className="mb-2" data-oid="q6_j-hc">
            Solo tienes que reservar tu chófer por horas arriba o en nuestra
            aplicación:
          </p>
          <ol className="list-decimal pl-5 space-y-1" data-oid=":s5n6aa">
            <li data-oid="dvyd2qq">Selecciona el lugar de recogida.</li>
            <li data-oid="pu0ka5y">
              Elige la duración, el día y la hora de inicio.
            </li>
            <li data-oid="ba650e9">
              Elige una clase de vehículo que se adapte a tus necesidades.
            </li>
            <li data-oid="z0t:7:-">
              Proporciona información adicional, como el itinerario, en el campo
              «Notas para el chófer».
            </li>
            <li data-oid="0bpwv8b">
              ¡Completa tu reserva y disfruta de tu chófer privado!
            </li>
          </ol>
        </div>
      ),
    },
    {
      question: "¿Cómo puedo crear un itinerario para el trayecto por horas?",
      answer: (
        <p className="text-gray-600" data-oid="15j5_df">
          Aunque no es necesario revelar tu itinerario con antelación, puedes
          agregarlo en el campo «Notas para el chófer».
        </p>
      ),
    },
    {
      question: "¿Cuándo recibiré los datos de contacto del chófer?",
      answer: (
        <div className="text-gray-600" data-oid="_86vvfk">
          <p className="mb-2" data-oid=".1r-fk.">
            El nombre y el número de teléfono del chófer se enviarán al pasajero
            una hora antes de la recogida por correo electrónico y SMS. Este
            mensaje también contiene la marca, el modelo y el número de
            matrícula del vehículo. Si has realizado una reserva para otra
            persona, esta información se enviará a la dirección de correo
            electrónico y al número de teléfono proporcionados en el proceso de
            reserva.
          </p>
          <p data-oid="i9:qh4:">
            Una hora antes de un viaje, los pasajeros también pueden iniciar un
            chat con su chófer en nuestra aplicación.
          </p>
        </div>
      ),
    },
    {
      question: "¿Cómo me comunico con el chófer entre paradas?",
      answer: (
        <div className="text-gray-600" data-oid="xk5fh4t">
          <p className="mb-2" data-oid="dchq9y_">
            Para mayor facilidad, recomendamos descargar la aplicación y
            utilizar la función de chat.
          </p>
          <p data-oid="pie4984">
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
        <p className="text-gray-600" data-oid="fslesm9">
          Los chóferes de Privyde hablan inglés básico, así como el idioma local
          del país en el que se realiza el viaje.
        </p>
      ),
    },
    {
      question: "¿Puede el chófer recogerme en una ciudad y dejarme en otra?",
      answer: (
        <div className="text-gray-600" data-oid="7qr-wxy">
          <p className="mb-2" data-oid="ql_6x9p">
            Sí, esto es posible.
          </p>
          <p className="mb-2" data-oid="t__2x6x">
            Sin embargo, si tu reserva por hora termina en una ciudad diferente
            a aquella en la que comenzaste, se aplicará un cargo por devolución
            del vehículo. Esto tiene en cuenta el tiempo y la distancia que el
            chófer debe recorrer para volver al lugar original. Si planeas
            viajar entre ciudades, te recomendamos reservar un viaje de ciudad a
            ciudad.
          </p>
          <p data-oid="cep:p7_">
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
        <p className="text-gray-600" data-oid="1kdnz2m">
          Puedes reservar un chófer el número de horas que quieras, con una
          reserva mínima de 2 horas y máxima de 24 horas.
        </p>
      ),
    },
    {
      question: "¿Puedo ampliar el número de horas que he reservado?",
      answer: (
        <p className="text-gray-600" data-oid="bhxrie1">
          Sí, si necesitas al chófer durante algún tiempo más, hazlo saber. Si
          se acepta, se cobrará ese tiempo adicional directamente a tu cuenta.
        </p>
      ),
    },
    {
      question:
        "What if the number of booked hours changes and the booking is unexpectedly extended or shortened?",
      answer: (
        <div className="text-gray-600" data-oid="085qw7i">
          <p className="mb-2" data-oid="96ztry5">
            Unexpected events can happen.
          </p>
          <p data-oid="0_eu9zl">
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
        <p className="text-gray-600" data-oid="oxq1f-4">
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
    <div className="bg-white" data-oid="7gz..35">
      {/* Navigation */}
      <Navbar data-oid="7ksk14k" />

      {/* Hero Section with Full-Width Image */}
      <div className="flex flex-col w-full" data-oid="_jz9_e-">
        {/* Title Bar */}
        <div className="title-bar relative" data-oid=":vjfgsk">
          <div className="container mx-auto px-4" data-oid="t-um9nr">
            <h1 className="text-3xl font-bold text-black" data-oid="ieg9rnr">
              Alquiler de chófer por horas y por días
            </h1>
          </div>
        </div>

        {/* Image Container */}
        <div className="hero-container relative" data-oid="jlcbnjy">
          {/* Background Image */}
          <div className="full-size-background" data-oid=":pu7lza">
            <Image
              src="/images/chauffeur-per-hours.png"
              alt="El chófer mantiene abierta la puerta del coche para el invitado que se acerca al vehículo."
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
              data-oid="w-tzdj:"
            />
          </div>

          {/* Booking Widget - Solo visible en pantallas grandes (lg) */}
          <div
            className="booking-widget-container-overlay hidden lg:block"
            data-oid="0totg5c"
          >
            <BookingForm data-oid="k_--:o9" />
          </div>
        </div>
      </div>

      {/* Booking Widget - Solo visible en tablets y móviles (fuera del hero) */}
      <div
        className="lg:hidden mx-auto px-4 mb-8 mt-6 relative z-30"
        data-oid="-9:de8."
      >
        <BookingForm data-oid="d-5g1u7" />
      </div>

      {/* Freedom Banner */}
      <div className="bg-gray-100 py-12" data-oid="i4zg93k">
        <div className="container mx-auto px-4 text-center" data-oid="qz_em3:">
          <h2
            className="text-3xl font-bold text-gray-900 mb-4"
            data-oid="nlvnjty"
          >
            Disfruta de la libertad absoluta
          </h2>
          <p
            className="text-lg text-gray-700 max-w-3xl mx-auto"
            data-oid="ebf0180"
          >
            Nuestro servicio de chófer por horas o un día completo te
            proporciona un transporte a medida seguro, fiable y sostenible.
          </p>
        </div>
      </div>

      {/* Download Section */}
      <DownloadSection data-oid="2kjvhv2" />

      {/* Main Content */}
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 max-w-6xl"
        data-oid="4erjhnp"
      >
        {/* Service Description */}
        <section className="mb-20" data-oid="nsgntk-">
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            data-oid="nqkd6s3"
          >
            <div data-oid="g27yaps">
              <h2
                className="text-3xl font-bold text-gray-900 mb-6"
                data-oid="o_g3:2z"
              >
                Servicio de chófer por hora
              </h2>
              <p className="text-lg text-gray-600 mb-8" data-oid="05jpjt.">
                Dile adiós a cambiar de medio de transporte cuando necesites
                realizar viajes con varias paradas. Ya no tendrás que esperar
                diferentes taxis en diferentes lugares, subir al transporte
                público abarrotado o buscar aparcamiento para tu coche de
                alquiler.
              </p>

              <div className="space-y-6" data-oid="zmudtf2">
                <div className="flex items-start" data-oid="2m-nxs-">
                  <div
                    className="bg-gray-100 p-2 rounded-full mt-1 mr-4"
                    data-oid="nnn8ber"
                  >
                    <CalendarCheck
                      className="h-5 w-5 text-black"
                      data-oid="qoavbau"
                    />
                  </div>
                  <div data-oid=":1mcuau">
                    <h3
                      className="font-semibold text-gray-900 mb-1"
                      data-oid="7f6gw4k"
                    >
                      Establece el itinerario
                    </h3>
                    <p className="text-gray-600" data-oid="wdimin-">
                      Tú decides dónde y cuándo ir, sabiendo que tu chófer
                      siempre estará listo cuando quieras.
                    </p>
                  </div>
                </div>

                <div className="flex items-start" data-oid="g5c5_h.">
                  <div
                    className="bg-gray-100 p-2 rounded-full mt-1 mr-4"
                    data-oid="p8aoed:"
                  >
                    <Clock className="h-5 w-5 text-black" data-oid="xu_o6yq" />
                  </div>
                  <div data-oid="ykp94fk">
                    <h3
                      className="font-semibold text-gray-900 mb-1"
                      data-oid="ms1aj.b"
                    >
                      Ahorra tiempo
                    </h3>
                    <p className="text-gray-600" data-oid="whlcp9a">
                      Recupera tiempo dejándote y recogiéndote en la puerta en
                      cada parada de tu viaje.
                    </p>
                  </div>
                </div>

                <div className="flex items-start" data-oid="fftsc.7">
                  <div
                    className="bg-gray-100 p-2 rounded-full mt-1 mr-4"
                    data-oid="kdcltk6"
                  >
                    <Shield className="h-5 w-5 text-black" data-oid="2b1d-z0" />
                  </div>
                  <div data-oid="2xrdx5p">
                    <h3
                      className="font-semibold text-gray-900 mb-1"
                      data-oid="tyueik3"
                    >
                      Disfruta de tu tranquilidad
                    </h3>
                    <p className="text-gray-600" data-oid="njuhh0g">
                      Viaja cómodamente en un vehículo premium, donde puedes
                      dejar tus objetos personales durante el viaje.
                    </p>
                  </div>
                </div>

                <div className="flex items-start" data-oid="f5wlqbg">
                  <div
                    className="bg-gray-100 p-2 rounded-full mt-1 mr-4"
                    data-oid=":b-4d8:"
                  >
                    <DollarSign
                      className="h-5 w-5 text-black"
                      data-oid="2sn8ilc"
                    />
                  </div>
                  <div data-oid="n6avx_r">
                    <h3
                      className="font-semibold text-gray-900 mb-1"
                      data-oid="y1o9_cg"
                    >
                      Tarifas competitivas
                    </h3>
                    <p className="text-gray-600" data-oid="ew27gr7">
                      Tu reserva incluye 20 km de viaje por cada hora reservada,
                      así como todos los impuestos y peajes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start" data-oid="vi5zap.">
                  <div
                    className="bg-gray-100 p-2 rounded-full mt-1 mr-4"
                    data-oid="z.dhpc-"
                  >
                    <Star className="h-5 w-5 text-black" data-oid="xd9sn_z" />
                  </div>
                  <div data-oid="wx4rrrd">
                    <h3
                      className="font-semibold text-gray-900 mb-1"
                      data-oid="zheqzu2"
                    >
                      Fiabilidad
                    </h3>
                    <p className="text-gray-600" data-oid="9gktrmx">
                      Nuestros chóferes están capacitados para cumplir con los
                      más altos estándares de calidad y privacidad.
                    </p>
                  </div>
                </div>

                <div className="flex items-start" data-oid="ykjyjv9">
                  <div
                    className="bg-gray-100 p-2 rounded-full mt-1 mr-4"
                    data-oid=":299c5q"
                  >
                    <Shield className="h-5 w-5 text-black" data-oid="dz5vlum" />
                  </div>
                  <div data-oid="3q.xsgo">
                    <h3
                      className="font-semibold text-gray-900 mb-1"
                      data-oid="go-t:zc"
                    >
                      Sostenibilidad
                    </h3>
                    <p className="text-gray-600" data-oid="hql_8nn">
                      Ten la seguridad de que cada viaje se compensa con
                      emisiones de carbono, sin costes adicionales ni necesidad
                      de suscripción.
                    </p>
                  </div>
                </div>

                <div className="flex items-start" data-oid="aqmft.s">
                  <div
                    className="bg-gray-100 p-2 rounded-full mt-1 mr-4"
                    data-oid="n9-is15"
                  >
                    <Wifi className="h-5 w-5 text-black" data-oid="mxpqh4m" />
                  </div>
                  <div data-oid="6tr..u3">
                    <h3
                      className="font-semibold text-gray-900 mb-1"
                      data-oid="lz3u6ce"
                    >
                      Wi-Fi disponible
                    </h3>
                    <p className="text-gray-600" data-oid="sx9vy:c">
                      Ya sea en viaje de negocios o de placer, puedes aprovechar
                      al máximo tu tiempo en el asiento trasero.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="flex items-center justify-center"
              data-oid="-uxt305"
            >
              <img
                src="/images/graphic-comparision.png"
                alt="By-the-hour comparison graphic"
                className="max-w-full h-auto rounded-xl shadow-lg"
                data-oid="f2c_n4-"
              />
            </div>
          </div>
        </section>

        {/* For all your trips */}
        <section className="mb-20" data-oid="m_zr9kc">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            data-oid="3.wl:2k"
          >
            <div data-oid="s1jnbku">
              <img
                src="/images/white-suite.png"
                alt="A Privyde chauffeur opens the door for his guest who steps out in a white suit."
                className="w-full h-auto rounded-xl shadow-lg object-cover"
                data-oid="i4p4-g:"
              />
            </div>

            <div data-oid="xwn28f7">
              <h2
                className="text-3xl font-bold text-gray-900 mb-6"
                data-oid="yji3ul5"
              >
                Para todos tus viajes
              </h2>
              <p className="text-lg text-gray-600 mb-8" data-oid="pxo54b5">
                Conveniente, cómodo y flexible. Nuestro servicio de chófer por
                horas está diseñado para aquellas ocasiones en las que quieres
                que te aguarde un chófer.
              </p>

              <div className="space-y-6" data-oid=".iuhn9q">
                <div
                  className="bg-gray-50 p-6 rounded-lg border border-gray-200"
                  data-oid="te9sahq"
                >
                  <h3
                    className="font-semibold text-xl text-gray-900 mb-3"
                    data-oid="hi0bt72"
                  >
                    Viajes de negocios
                  </h3>
                  <p className="text-gray-600" data-oid="n-215.f">
                    Aprovecha al máximo tus citas de negocios. No hay necesidad
                    de preocuparse por la logística, los tiempos de espera o las
                    prisas de ir de un lugar a otro cuando se tiene un día lleno
                    de reuniones, una presentación itinerante, etc.
                  </p>
                </div>

                <div
                  className="bg-gray-50 p-6 rounded-lg border border-gray-200"
                  data-oid="tsgs_ug"
                >
                  <h3
                    className="font-semibold text-xl text-gray-900 mb-3"
                    data-oid="cn8ey8."
                  >
                    Actividades de ocio
                  </h3>
                  <p className="text-gray-600" data-oid="kwgchrh">
                    Hacer turismo, ir de compras, disfrutar de una cena
                    elegante. Es fácil alternar entre todos tus compromisos
                    gracias a un servicio de chófer privado por horas.
                  </p>
                </div>

                <div
                  className="bg-gray-50 p-6 rounded-lg border border-gray-200"
                  data-oid="de4qyn-"
                >
                  <h3
                    className="font-semibold text-xl text-gray-900 mb-3"
                    data-oid="pirj518"
                  >
                    Eventos
                  </h3>
                  <p className="text-gray-600" data-oid="nh._4au">
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
        <section className="mb-20" data-oid="fb1vk2m">
          <div className="text-center mb-12" data-oid="cohot41">
            <h2
              className="text-3xl font-bold text-gray-900 mb-4"
              data-oid="q62l_30"
            >
              Alcance global
            </h2>
            <p
              className="text-lg text-gray-600 max-w-3xl mx-auto"
              data-oid="u5.b66h"
            >
              Con chóferes profesionales en cientos de ciudades de más de 50
              países, puedes hacer reservas por horas para todos tus viajes.
              Dondequiera que vayas, puedes esperar la misma experiencia de
              primera calidad.
            </p>
          </div>

          <div className="flex justify-center mb-12" data-oid=".ek8n66">
            <img
              src="/images/futuristic-city-choffer.jpeg"
              alt="A map showing the many countries where Privyde in available."
              className="max-w-full h-auto rounded-lg shadow-md"
              data-oid=".t.6qgm"
            />
          </div>

          {/* Testimonials */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            data-oid="jg4hzvx"
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
                data-oid="hqd7f.o"
              >
                <div className="flex items-center mb-4" data-oid="yg-iz0b">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-gray-400 fill-current"
                      data-oid="460hxi5"
                    />
                  ))}
                  <span
                    className="ml-2 text-gray-500 text-sm"
                    data-oid="25b21kw"
                  >
                    {testimonial.source}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 italic" data-oid="1pjibo_">
                  "{testimonial.text}"
                </p>
                <p className="font-semibold text-gray-900" data-oid="wuw51h.">
                  {testimonial.country}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20" data-oid="-4zg9ob">
          <h2
            className="text-3xl font-bold text-center text-gray-900 mb-12 relative"
            data-oid="vjy6z_m"
          >
            Preguntas frecuentes
            <span
              className="block w-24 h-1 bg-black mx-auto mt-4"
              data-oid="zi1cnp7"
            ></span>
          </h2>

          <div className="space-y-4 max-w-4xl mx-auto" data-oid="waz.1g_">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl border ${openFaqIndex === index ? "border-gray-200 shadow-md" : "border-gray-200"} overflow-hidden transition-all duration-300`}
                data-oid="2:qr3t2"
              >
                <button
                  className="flex justify-between items-center w-full p-6 text-left"
                  onClick={() => toggleFaq(index)}
                  data-oid="mur.j6."
                >
                  <h3
                    className={`text-xl font-semibold ${openFaqIndex === index ? "text-gray-600" : "text-gray-900"}`}
                    data-oid="nj2fks-"
                  >
                    {faq.question}
                  </h3>
                  <div
                    className={`${openFaqIndex === index ? "text-black bg-gray-100" : "text-gray-400 bg-gray-50"} rounded-full p-1 transition-colors duration-300`}
                    data-oid="28w1f:b"
                  >
                    {openFaqIndex === index ? (
                      <ChevronUp className="h-5 w-5" data-oid="gs8f6ae" />
                    ) : (
                      <ChevronDown className="h-5 w-5" data-oid="37ajdbp" />
                    )}
                  </div>
                </button>
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    openFaqIndex === index
                      ? "max-h-[1000px] opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                  data-oid="b4pbti9"
                >
                  <div className="px-6 pb-6 pt-0" data-oid="clyq-:.">
                    <div
                      className="border-t border-gray-200 pt-4 text-left"
                      data-oid="0f6.s0n"
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
        <section className="mb-20" data-oid="prts8n5">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            data-oid="tdl7ibt"
          >
            <div data-oid="eicp4iz">
              <img
                src="/images/woman-in-a-suit-walking.jpeg"
                alt="A woman in a suit walking away from her Privyde ride."
                className="w-full h-auto rounded-xl shadow-lg object-cover"
                data-oid=":mn5s3i"
              />
            </div>

            <div data-oid="d4ua3e4">
              <h2
                className="text-3xl font-bold text-gray-900 mb-6"
                data-oid="psrd9bk"
              >
                Descargue la aplicación
              </h2>
              <p className="text-lg text-gray-600 mb-8" data-oid="8gjkecg">
                Reserve, cambie o cancele fácilmente los viajes sobre la marcha.
                Piense en ello como tener la tranquilidad al alcance de la mano.
              </p>

              <div
                className="flex justify-center md:justify-start"
                data-oid="de-vo1s"
              >
                <img
                  src="/images/app-screen.png"
                  alt="Pantalla de inicio de la aplicación Privyde"
                  className="max-w-xs h-auto rounded-lg shadow-lg"
                  data-oid="a.iv-t5"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer data-oid=":a638sy" />
    </div>
  );
};

export default HourlyHire;
