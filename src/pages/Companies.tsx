import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronDown, ChevronUp, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const Companies = () => {
  // Estado para controlar qué FAQ está abierta
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  // Estado para el formulario de contacto
  const [formData, setFormData] = useState({
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
  }, []);

  // Actualiza el estado del formulario cuando cambian los inputs
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleReservarClick = () => {
    navigate("/register-companies");
  };

  const handleContactSubmit = () => {
    // Guardar los datos del formulario en localStorage para usarlos en la página de registro
    localStorage.setItem("companyContactData", JSON.stringify(formData));
    // Redirigir a la página de registro de empresas
    navigate("/register-companies");
  };

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
  ];

  return (
    <div className="bg-white" data-oid="0hcbrjy">
      {/* Navigation */}
      <Navbar data-oid="ii9unzj" />

      {/* SECCIÓN HERO - COMPLETAMENTE INDEPENDIENTE */}
      <section className="relative w-full bg-gray-900" data-oid="4cvr8z0">
        {/* Overlay para mejorar visibilidad - AJUSTADO PARA HACERLO MÁS LIGERO */}
        <div
          className="absolute inset-0 bg-black/50 z-10"
          data-oid="h_hli5_"
        ></div>

        {/* Imagen de fondo */}
        <img
          src="/images/woman-in-a-suit-walking.jpeg"
          alt="Invitada de Privyde caminando hacia un Mercedes-Benz mientras el chófer le abre la puerta"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-70"
          data-oid="758:sqa"
        />

        {/* Contenido del hero con animaciones */}
        <div
          className="relative z-20 container mx-auto px-6 py-20 md:py-32"
          data-oid="ntrymkd"
        >
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            data-oid="hjgfzqf"
          >
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              data-oid="muui:zc"
            >
              Transporte terrestre para
              <motion.span
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                data-oid="z6do4h6"
              >
                ejecutivos de empresas
              </motion.span>{" "}
              en todo el mundo
            </h1>

            <motion.button
              className="select-button h-12 px-8 py-3 rounded-md text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 mt-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReservarClick}
              data-oid="vj_wh1h"
            >
              Reservar ahora
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* SECCIÓN DE CONTENIDO PRINCIPAL - COMPLETAMENTE SEPARADA DEL HERO */}
      <section className="bg-white py-20" data-oid="c9mj-rg">
        <div className="container mx-auto px-6 max-w-6xl" data-oid="c.b-f4u">
          {/* Sección de introducción */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            data-oid="rf-r3oa"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
              data-oid="sh:j_g9"
            >
              Servicios de chófer para empresas para cada ocasión
              <span
                className="block w-24 h-1 bg-gradient-to-r from-red-500 to-orange-400 mx-auto mt-4"
                data-oid=":c9cqhf"
              ></span>
            </h2>
          </motion.div>

          {/* Services Grid Section */}
          <motion.section
            className="mb-32"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            data-oid="yaxh9y."
          >
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-12"
              data-oid="w_r5cek"
            >
              <motion.div
                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                data-oid="lv.f759"
              >
                <img
                  src="/images/woman-client.jpeg"
                  alt="Empresario en asiento trasero con chófer femenina cerrando la puerta"
                  className="w-full h-64 object-cover"
                  data-oid="yegcv1e"
                />

                <div className="p-6" data-oid="yilil05">
                  <h3
                    className="text-xl font-semibold mb-4 text-gray-900"
                    data-oid="m.gl-t0"
                  >
                    Viajes de negocios y reuniones
                  </h3>
                  <p
                    className="text-gray-600 leading-relaxed"
                    data-oid="9y0o-u1"
                  >
                    Asegúrese de que las llegadas sean puntuales y las salidas
                    fluidas, y fomente unas relaciones profesionales sólidas en
                    todo momento.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                data-oid="zqtornf"
              >
                <img
                  src="/images/security.png"
                  alt="Invitado en asiento trasero de EQS hablando por teléfono con resplandor solar"
                  className="w-full h-64 object-cover"
                  data-oid="j_pfhbc"
                />

                <div className="p-6" data-oid="6-:r60o">
                  <h3
                    className="text-xl font-semibold mb-4 text-gray-900"
                    data-oid="6p70r80"
                  >
                    Viajes de ciudad a ciudad
                  </h3>
                  <p
                    className="text-gray-600 leading-relaxed"
                    data-oid="rzc.dfz"
                  >
                    Trabaje sin esfuerzo mientras viaja de ciudad a ciudad.
                    Viaje sin problemas entre Londres y Manchester, París y
                    Lyon, y mucho más.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                data-oid="yo-:nw8"
              >
                <img
                  src="/images/limo-airport.png"
                  alt="Pareja con equipaje acercándose al coche, vista desde el asiento trasero de EQS"
                  className="w-full h-64 object-cover"
                  data-oid="afenx_2"
                />

                <div className="p-6" data-oid="kb7y_qi">
                  <h3
                    className="text-xl font-semibold mb-4 text-gray-900"
                    data-oid="ch33:6:"
                  >
                    Traslados al aeropuerto en todo el mundo
                  </h3>
                  <p
                    className="text-gray-600 leading-relaxed"
                    data-oid="ugc1x3n"
                  >
                    Disfrute de recogidas/destinos en el aeropuerto sin
                    contratiempos, para que sus viajes de empresa sean más
                    cómodos.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                data-oid="py6r_a4"
              >
                <img
                  src="/images/ejecutivo-tablet.png"
                  alt="Chófer cerrando la puerta, invitado en asiento trasero, vista desde arriba"
                  className="w-full h-64 object-cover"
                  data-oid=":vtd-xl"
                />

                <div className="p-6" data-oid="zlox62b">
                  <h3
                    className="text-xl font-semibold mb-4 text-gray-900"
                    data-oid="xeuh:8."
                  >
                    Viajes para clientes y socios
                  </h3>
                  <p
                    className="text-gray-600 leading-relaxed"
                    data-oid="z-ulvi7"
                  >
                    Impresione a clientes y socios con un servicio de chófer
                    excepcional al mejorar su experiencia de viaje.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* Testimonial Section */}
          <motion.section
            className="mb-32"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            data-oid="y3d.vsr"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 relative"
              data-oid="p-l4lez"
            >
              Pruebe nuestro servicio galardonado
              <span
                className="block w-24 h-1 bg-gradient-to-r from-red-500 to-orange-400 mx-auto mt-4"
                data-oid="l:5y_ny"
              ></span>
            </h2>
            <div
              className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-xl mb-10 max-w-4xl mx-auto shadow-sm border border-gray-200 transform transition-all duration-300 hover:shadow-md"
              data-oid="6l:bokh"
            >
              <blockquote
                className="italic text-xl text-gray-700 mb-4 relative"
                data-oid="mf7pq4k"
              >
                <span
                  className="text-5xl text-red-400 absolute -top-6 -left-2"
                  data-oid="gapg4tz"
                >
                  "
                </span>
                I know that I can rely on Privyde's high quality standards
                worldwide. The customer is the main focus at Privyde, which
                makes me feel taken care of.
                <span
                  className="text-5xl text-red-400 absolute -bottom-10 -right-2"
                  data-oid="8zx.gak"
                >
                  "
                </span>
              </blockquote>
              <p
                className="text-right font-medium mt-2 text-gray-800"
                data-oid="mjq8zdz"
              >
                Tom Grover, European VSP, Smith & Nephew
              </p>
            </div>
          </motion.section>

          {/* Chauffeur Network Section */}
          <section
            className="mb-32 bg-gradient-to-br from-gray-50 to-gray-100 p-10 rounded-2xl shadow-sm"
            data-oid=":aeh8_."
          >
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
              data-oid="kf0ryd_"
            >
              <div data-oid=":3lfj2j">
                <img
                  src="/images/corporative.png"
                  alt="Un chofer en un traje frente a su Mercedes-Benz con el horizonte de la ciudad"
                  className="w-full h-auto rounded-xl shadow-lg object-cover"
                  data-oid="5omdeux"
                />
              </div>
              <div data-oid="av4fy_d">
                <h2
                  className="text-3xl font-bold text-gray-900 mb-8 relative"
                  data-oid="pk2-7w6"
                >
                  Chóferes con un nuevo concepto de fiabilidad
                  <span
                    className="block w-16 h-1 bg-gradient-to-r from-red-500 to-orange-400 mt-4"
                    data-oid="qmi.jay"
                  ></span>
                </h2>
                <p
                  className="text-gray-600 mb-8 leading-relaxed"
                  data-oid="dwl6:nj"
                >
                  Nuestra red global de chóferes con licencia y seguro local
                  garantiza una experiencia de transporte perfecta para los
                  viajes de empresa.
                </p>
                <ul className="space-y-4 mb-8" data-oid="0deawhw">
                  <li className="flex items-start" data-oid="nh3-vix">
                    <CheckCircle
                      className="h-6 w-6 text-red-500 mr-3 mt-0.5 flex-shrink-0"
                      data-oid="m98dbkl"
                    />

                    <span
                      className="text-gray-700 text-left"
                      data-oid="tb2v00g"
                    >
                      Disponibles en más de 50 países
                    </span>
                  </li>
                  <li className="flex items-start" data-oid="p5tn-io">
                    <CheckCircle
                      className="h-6 w-6 text-red-500 mr-3 mt-0.5 flex-shrink-0"
                      data-oid="r1jr9xi"
                    />

                    <span
                      className="text-gray-700 text-left"
                      data-oid="5nsn4jx"
                    >
                      Chóferes cualificados de habla inglesa
                    </span>
                  </li>
                  <li className="flex items-start" data-oid="pktvls:">
                    <CheckCircle
                      className="h-6 w-6 text-red-500 mr-3 mt-0.5 flex-shrink-0"
                      data-oid="vrq4nl0"
                    />

                    <span
                      className="text-gray-700 text-left"
                      data-oid="_xd_p_o"
                    >
                      Seguimiento y notificaciones en tiempo real
                    </span>
                  </li>
                  <li className="flex items-start" data-oid="mzhea5o">
                    <CheckCircle
                      className="h-6 w-6 text-red-500 mr-3 mt-0.5 flex-shrink-0"
                      data-oid="h-sir3y"
                    />

                    <span
                      className="text-gray-700 text-left"
                      data-oid="wm8nb3d"
                    >
                      Flota moderna para un viaje profesional y productivo
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* No Invoices Needed Section */}
          <section
            className="mb-32 bg-gradient-to-br from-gray-50 to-gray-100 p-10 rounded-2xl shadow-sm"
            data-oid="o2hq7w5"
          >
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
              data-oid="qfsad9e"
            >
              <div className="order-2 md:order-1" data-oid="a.s42a3">
                <h2
                  className="text-3xl font-bold text-gray-900 mb-8 relative"
                  data-oid=".p12vrh"
                >
                  Sin necesidad de facturas
                  <span
                    className="block w-16 h-1 bg-gradient-to-r from-red-500 to-orange-400 mt-4"
                    data-oid="xrd66_8"
                  ></span>
                </h2>
                <p
                  className="text-gray-600 mb-8 leading-relaxed"
                  data-oid="85w32z8"
                >
                  Simplifique la gestión de sus facturas. Nuestro sistema de
                  facturación automatizado agiliza el proceso, mientras que el
                  servicio de asistencia técnica de la empresa está a su
                  disposición para ayudarle.
                </p>
                <ul className="space-y-4 mb-8" data-oid="uup.man">
                  <li className="flex items-start" data-oid="v.au66:">
                    <CheckCircle
                      className="h-6 w-6 text-red-500 mr-3 mt-0.5 flex-shrink-0"
                      data-oid="qklm8yi"
                    />

                    <span
                      className="text-gray-700 text-left"
                      data-oid="3olflj_"
                    >
                      Plataforma todo en uno para reservas sin contratiempos
                    </span>
                  </li>
                  <li className="flex items-start" data-oid="59er8nx">
                    <CheckCircle
                      className="h-6 w-6 text-red-500 mr-3 mt-0.5 flex-shrink-0"
                      data-oid="he1di0c"
                    />

                    <span
                      className="text-gray-700 text-left"
                      data-oid="7ot0lx0"
                    >
                      Facturación automatizada para una fácil gestión de
                      facturas
                    </span>
                  </li>
                  <li className="flex items-start" data-oid="t.f8_ju">
                    <CheckCircle
                      className="h-6 w-6 text-red-500 mr-3 mt-0.5 flex-shrink-0"
                      data-oid="zjp8s3e"
                    />

                    <span
                      className="text-gray-700 text-left"
                      data-oid="ao.xa6z"
                    >
                      Asistencia y gestores de cuentas a su disposición
                    </span>
                  </li>
                  <li className="flex items-start" data-oid="mtv6:ol">
                    <CheckCircle
                      className="h-6 w-6 text-red-500 mr-3 mt-0.5 flex-shrink-0"
                      data-oid="wf0t8mh"
                    />

                    <span
                      className="text-gray-700 text-left"
                      data-oid="83evoju"
                    >
                      Disfrute de descuentos para empresas e inicio de sesión
                      para más de 500 viajeros
                    </span>
                  </li>
                </ul>
                <motion.button
                  className="select-button h-12 px-8 py-3 rounded-md text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReservarClick}
                  data-oid="j:8uj8a"
                >
                  Reservar ahora
                </motion.button>
              </div>
              <div className="order-1 md:order-2" data-oid="ey2qu.:">
                <img
                  src="/images/woman-client.jpeg"
                  alt="Mujer saliendo del coche con chófer B4B"
                  className="w-full h-auto rounded-xl shadow-lg object-cover"
                  data-oid="b1r479i"
                />
              </div>
            </div>
          </section>

          {/* Booking for Executives Section */}
          <section className="mb-32" data-oid="pw.9fcx">
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
              data-oid="orpni9p"
            >
              <div data-oid="4tcy65x">
                <img
                  src="/images/woman-client.jpeg"
                  alt="Una mujer elegante sentada en el asiento trasero de su viaje con chófer con bolsas de compras en el asiento a su lado"
                  className="w-full h-auto rounded-xl shadow-lg object-cover"
                  data-oid="-.utxu3"
                />
              </div>
              <div data-oid="-5z:88i">
                <h2
                  className="text-3xl font-bold text-gray-900 mb-8 relative"
                  data-oid="qhjwk-a"
                >
                  Booking for your executives
                  <span
                    className="block w-16 h-1 bg-gradient-to-r from-red-500 to-orange-400 mt-4"
                    data-oid="vcf_r_m"
                  ></span>
                </h2>
                <p
                  className="text-gray-600 mb-8 leading-relaxed"
                  data-oid="m-pd4fn"
                >
                  If you're a PA/EA or corporate booker that wants to manage
                  your executive travel with ease using a booking platform
                  designed for your fast-paced world, then you're in luck. We've
                  dedicated a page to you answer all your queries.
                </p>
                <motion.button
                  className="select-button h-12 px-8 py-3 rounded-md text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReservarClick}
                  data-oid="ff2lxu:"
                >
                  Reservar ahora
                </motion.button>
              </div>
            </div>
          </section>

          {/* By the Hour Section */}
          <section
            className="mb-32 bg-gradient-to-br from-gray-50 to-gray-100 p-10 rounded-2xl shadow-sm"
            data-oid="40k6q:s"
          >
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
              data-oid="jdbqslr"
            >
              <div className="order-2 md:order-1" data-oid="qbkk3bj">
                <h2
                  className="text-3xl font-bold text-gray-900 mb-8 relative"
                  data-oid="nz7962u"
                >
                  By the hour
                  <span
                    className="block w-16 h-1 bg-gradient-to-r from-red-500 to-orange-400 mt-4"
                    data-oid="y:cyy7e"
                  ></span>
                </h2>
                <p
                  className="text-gray-600 mb-8 leading-relaxed"
                  data-oid="0r-79-n"
                >
                  This service helps businesses globally. No more waiting for
                  different taxis at different locations, taking crowded public
                  transport, or finding parking for your rental car. Maximize
                  your productivity with our by-the-hour service.
                </p>
                <motion.button
                  className="select-button h-12 px-8 py-3 rounded-md text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReservarClick}
                  data-oid="d5an:h."
                >
                  Reservar ahora
                </motion.button>
              </div>
              <div className="order-1 md:order-2" data-oid="zld9wpn">
                <img
                  src="/images/limo-elegant.png"
                  alt="Un chófer de Privyde sonríe y ajusta un control mientras conduce un Mercedes EQS"
                  className="w-full h-auto rounded-xl shadow-lg object-cover"
                  data-oid="f_g:rxg"
                />
              </div>
            </div>
          </section>

          {/* Awards Section */}
          <section className="mb-32" data-oid=":a66.1p">
            <h2
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 relative"
              data-oid="e.2600l"
            >
              Award-winning chauffeur service
              <span
                className="block w-24 h-1 bg-gradient-to-r from-red-500 to-orange-400 mx-auto mt-4"
                data-oid="z9-pol7"
              ></span>
            </h2>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
              data-oid="orb9q42"
            >
              <div
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center transform transition-all duration-300 hover:shadow-md hover:border-gray-300"
                data-oid="hsq:seu"
              >
                <img
                  src="/images/limo-leds.png"
                  alt="B2B Icon - Lux Leaders in Luxury"
                  className="h-20 w-auto mb-4"
                  data-oid="r:isybx"
                />

                <p
                  className="text-lg font-medium text-center text-gray-800"
                  data-oid="he-mq3d"
                >
                  Lux Leaders in Luxury
                </p>
              </div>

              <div
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center transform transition-all duration-300 hover:shadow-md hover:border-gray-300"
                data-oid="smewskz"
              >
                <img
                  src="/images/award-business-travel.png"
                  alt="B2B Award 2024 - Business Travel Awards Europe 2024"
                  className="h-20 w-auto mb-4"
                  data-oid="qtbdf0m"
                />

                <p
                  className="text-lg font-medium text-center text-gray-800"
                  data-oid="08m5wcy"
                >
                  Business Travel Awards Europe 2024
                </p>
              </div>

              <div
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center transform transition-all duration-300 hover:shadow-md hover:border-gray-300"
                data-oid="1fnnu5z"
              >
                <img
                  src="/images/award-world-travel.png"
                  alt="B2B Award 2024 - World Travel Awards 2024"
                  className="h-20 w-auto mb-4"
                  data-oid="nlr73ez"
                />

                <p
                  className="text-lg font-medium text-center text-gray-800"
                  data-oid="l7st.gv"
                >
                  World Travel Awards 2024
                </p>
              </div>
            </div>
          </section>

          {/* Sustainability Initiatives Section */}
          <section className="mb-32" data-oid="ka066ay">
            <h2
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 relative"
              data-oid="io4rkb-"
            >
              Iniciativas de sostenibilidad
              <span
                className="block w-24 h-1 bg-gradient-to-r from-green-500 to-green-400 mx-auto mt-4"
                data-oid="t5l..h8"
              ></span>
            </h2>

            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              data-oid="zqv4_h1"
            >
              <div
                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200"
                data-oid="_r9jbnd"
              >
                <img
                  src="/images/chauffeur-tesla.jpg"
                  alt="Chófer masculino ajustándose los puños frente a Tesla"
                  className="w-full h-48 object-cover"
                  data-oid="5_i1cef"
                />

                <div className="p-6" data-oid="ixeusi9">
                  <div className="flex items-center mb-3" data-oid="zad0rk:">
                    <h3
                      className="text-xl font-semibold text-gray-900"
                      data-oid="mvej3xv"
                    >
                      Electric Class
                    </h3>
                    <span
                      className="ml-2 bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded"
                      data-oid="vdvlhdt"
                    >
                      NUEVO
                    </span>
                  </div>
                  <p
                    className="text-gray-600 leading-relaxed mb-4"
                    data-oid="ec0vue5"
                  >
                    Elija nuestra nueva Electric Class para reservar viajes con
                    chofer en vehículos eléctricos de alto nivel como el Jaguar
                    I-PACE, Tesla Model S y Tesla Model X.
                  </p>
                  <button
                    className="text-red-500 font-medium hover:text-red-600 transition-colors flex items-center"
                    data-oid="15icnh-"
                  >
                    Más información
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      data-oid="j.bed0z"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                        data-oid="h9kddaz"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div
                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200"
                data-oid="j_s-hts"
              >
                <img
                  src="/images/ev-charging.jpg"
                  alt="Primer plano de carga de vehículo eléctrico"
                  className="w-full h-48 object-cover"
                  data-oid="px:q18y"
                />

                <div className="p-6" data-oid="drfrx5y">
                  <h3
                    className="text-xl font-semibold mb-3 text-gray-900"
                    data-oid="g.ng-j_"
                  >
                    La nueva normalidad
                  </h3>
                  <p
                    className="text-gray-600 leading-relaxed mb-4"
                    data-oid="mvu28v8"
                  >
                    De la forma en que lo vemos, los vehículos eléctricos se
                    convertirán en el estándar y es por lo cual los vehículos
                    eléctricos ya están incorporados a nuestra Business Class y
                    First Class en muchas ciudades. Nuestro objetivo es seguir
                    facilitando los desplazamientos sostenibles aumentando
                    nuestra flota de vehículos eléctricos.
                  </p>
                  <button
                    className="text-red-500 font-medium hover:text-red-600 transition-colors flex items-center"
                    data-oid="15jy-5x"
                  >
                    Más información
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      data-oid="2py-_so"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                        data-oid="4daw_::"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div
                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200"
                data-oid=".mf5p3p"
              >
                <img
                  src="/images/car-forest.jpg"
                  alt="Coche circulando por un bosque, vista desde arriba"
                  className="w-full h-48 object-cover"
                  data-oid="4lldgay"
                />

                <div className="p-6" data-oid="ujiicup">
                  <h3
                    className="text-xl font-semibold mb-3 text-gray-900"
                    data-oid="85tvwxx"
                  >
                    100% de compensación de carbono
                  </h3>
                  <p
                    className="text-gray-600 leading-relaxed mb-4"
                    data-oid="13ojx_r"
                  >
                    Sea cual sea la clase de vehículo que elija, compensamos
                    automáticamente las emisiones con nuestro programa de
                    compensación de carbono.
                  </p>
                  <button
                    className="text-red-500 font-medium hover:text-red-600 transition-colors flex items-center"
                    data-oid="o2may8j"
                  >
                    Más información
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      data-oid="u-dpp1n"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                        data-oid="f4apmlq"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="mb-32" data-oid="v5tf_p-">
            <h2
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 relative"
              data-oid="yb8dg4f"
            >
              Experimente nuestros beneficios para empresas
              <span
                className="block w-24 h-1 bg-gradient-to-r from-red-500 to-orange-400 mx-auto mt-4"
                data-oid="5ore54t"
              ></span>
            </h2>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
              data-oid="6w_s3nw"
            >
              <div
                className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
                data-oid="qec3c4u"
              >
                <div
                  className="text-red-500 mb-6 bg-red-50 w-16 h-16 rounded-full flex items-center justify-center"
                  data-oid="i9jhvv7"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    data-oid="7.:wvcc"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      data-oid="k58mmrq"
                    />
                  </svg>
                </div>
                <h3
                  className="text-xl font-semibold mb-4 text-gray-900"
                  data-oid="5rxg0w8"
                >
                  Precios competitivos
                </h3>
                <p className="text-gray-600 leading-relaxed" data-oid="olgydul">
                  Acceda a un servicio de primera calidad a precios basados en
                  la distancia que son justos para usted y para nuestros
                  chóferes.
                </p>
              </div>

              <div
                className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
                data-oid="am23f:n"
              >
                <div
                  className="text-red-500 mb-6 bg-red-50 w-16 h-16 rounded-full flex items-center justify-center"
                  data-oid="xnxjbdn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    data-oid="0b4whcz"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      data-oid="f8xovga"
                    />
                  </svg>
                </div>
                <h3
                  className="text-xl font-semibold mb-4 text-gray-900"
                  data-oid="g:o7q0o"
                >
                  Disponibilidad en todo el mundo
                </h3>
                <p className="text-gray-600 leading-relaxed" data-oid="cv_8gap">
                  Nuestro servicio de chófer en todo el mundo garantiza un viaje
                  rápido y fiable.
                </p>
              </div>

              <div
                className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
                data-oid="jaux6l1"
              >
                <div
                  className="text-red-500 mb-6 bg-red-50 w-16 h-16 rounded-full flex items-center justify-center"
                  data-oid="003c5k6"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    data-oid="7xe.7b."
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      data-oid="0ynnq_-"
                    />
                  </svg>
                </div>
                <h3
                  className="text-xl font-semibold mb-4 text-gray-900"
                  data-oid="20sb40e"
                >
                  Envío prioritario
                </h3>
                <p className="text-gray-600 leading-relaxed" data-oid="o9jangf">
                  Optimice su experiencia con reservas prioritarias y
                  seguimiento en tiempo real.
                </p>
              </div>

              <div
                className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
                data-oid="suhet.b"
              >
                <div
                  className="text-red-500 mb-6 bg-red-50 w-16 h-16 rounded-full flex items-center justify-center"
                  data-oid="7cn37ip"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    data-oid="1f7yftu"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      data-oid="-8a21ry"
                    />
                  </svg>
                </div>
                <h3
                  className="text-xl font-semibold mb-4 text-gray-900"
                  data-oid="b_4i-il"
                >
                  Reserva fácil
                </h3>
                <p className="text-gray-600 leading-relaxed" data-oid="6a1zt9b">
                  Reserva sencilla desde una misma página con confirmación
                  inmediata y precios claros.
                </p>
              </div>

              <div
                className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
                data-oid="htu.yiz"
              >
                <div
                  className="text-red-500 mb-6 bg-red-50 w-16 h-16 rounded-full flex items-center justify-center"
                  data-oid="dbbr:kc"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    data-oid="nhrq111"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      data-oid="9o2nq_7"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v3m0 0v3m0-3h3m-3 0H9"
                      data-oid="3q_mvp."
                    />
                  </svg>
                </div>
                <h3
                  className="text-xl font-semibold mb-4 text-gray-900"
                  data-oid="w_.xzrn"
                >
                  Asistencia para empresas
                </h3>
                <p className="text-gray-600 leading-relaxed" data-oid="cn0sbgd">
                  Nuestro equipo de asistencia multilingüe 24/7 garantiza que
                  nuestros clientes empresarios estén cubiertos en todo momento.
                </p>
              </div>

              <div
                className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
                data-oid="pryrig8"
              >
                <div
                  className="text-red-500 mb-6 bg-red-50 w-16 h-16 rounded-full flex items-center justify-center"
                  data-oid="uvn4s0n"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    data-oid=":s7vx1c"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                      data-oid="9ba3_vd"
                    />
                  </svg>
                </div>
                <h3
                  className="text-xl font-semibold mb-4 text-gray-900"
                  data-oid="vp2zb6f"
                >
                  Opción de vehículo eléctrico
                </h3>
                <p className="text-gray-600 leading-relaxed" data-oid="2ol-.98">
                  ¡Estamos orgullosos de ofrecer una variedad de vehículos
                  eléctricos en ciudades seleccionadas para garantizar la
                  compensación de nuestra huella de carbono!
                </p>
              </div>
            </div>
          </section>

          {/* Articles Section */}
          <section className="mb-32" data-oid="jalke4.">
            <h2
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 relative"
              data-oid="wlz3ppg"
            >
              Check out our latest articles
              <span
                className="block w-24 h-1 bg-gradient-to-r from-red-500 to-orange-400 mx-auto mt-4"
                data-oid="56cu24g"
              ></span>
            </h2>

            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              data-oid="64tqeaj"
            >
              <div
                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg hover:border-gray-300"
                data-oid="_1v26_a"
              >
                <img
                  src="/images/ceo-eqs.jpg"
                  alt="Jens Wohltorf CEO in EQS"
                  className="w-full h-48 object-cover"
                  data-oid="luv8fa4"
                />

                <div className="p-6" data-oid=".:m81wi">
                  <h3
                    className="text-xl font-semibold mb-3 text-gray-900"
                    data-oid="jna8wqc"
                  >
                    Funding Announcement
                  </h3>
                  <p
                    className="text-gray-600 leading-relaxed mb-4"
                    data-oid="7:bm-85"
                  >
                    Learn more about our biggest finance round yet.
                  </p>
                  <button
                    className="text-red-500 font-medium hover:text-red-600 transition-colors flex items-center"
                    data-oid="05q9-7u"
                  >
                    Read the story
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      data-oid="5pwvz9t"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                        data-oid="8xfhnq5"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div
                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg hover:border-gray-300"
                data-oid="hmqw.jv"
              >
                <img
                  src="/images/chauffeur-silver.jpg"
                  alt="Privyde's 2024 in Review"
                  className="w-full h-48 object-cover"
                  data-oid=".iv11de"
                />

                <div className="p-6" data-oid="c69h4r6">
                  <h3
                    className="text-xl font-semibold mb-3 text-gray-900"
                    data-oid=":c7wna9"
                  >
                    Privyde's 2024 in Review
                  </h3>
                  <p
                    className="text-gray-600 leading-relaxed mb-4"
                    data-oid="v7yggbt"
                  >
                    Take a peek into how our 2024 went, and what we achieved.
                  </p>
                  <button
                    className="text-red-500 font-medium hover:text-red-600 transition-colors flex items-center"
                    data-oid="p-7z-7o"
                  >
                    Read the story
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      data-oid="o:5poo1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                        data-oid="b1vv5go"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div
                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg hover:border-gray-300"
                data-oid="u8hj119"
              >
                <img
                  src="/images/family-eqs-backseat.jpg"
                  alt="Woman relaxing and child playing with tablet in back seat of EQS"
                  className="w-full h-48 object-cover"
                  data-oid="te8qaos"
                />

                <div className="p-6" data-oid="mdspmsi">
                  <h3
                    className="text-xl font-semibold mb-3 text-gray-900"
                    data-oid="140s2u_"
                  >
                    Travel Trends Report
                  </h3>
                  <p
                    className="text-gray-600 leading-relaxed mb-4"
                    data-oid="pxm.u_5"
                  >
                    Get an insight into how travel impacts productivity, backed
                    with real data.
                  </p>
                  <button
                    className="text-red-500 font-medium hover:text-red-600 transition-colors flex items-center"
                    data-oid="vh8ywe6"
                  >
                    Read the report
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      data-oid="7q..u3y"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                        data-oid="vpcv2xx"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Form Section */}
          <section
            className="mb-32 bg-gradient-to-br from-gray-50 to-gray-100 p-10 rounded-2xl shadow-sm"
            data-oid="z7f4oe6"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 relative"
              data-oid="wsrd:bg"
            >
              Mejore sus viajes de negocios
              <span
                className="block w-24 h-1 bg-gradient-to-r from-red-500 to-orange-400 mx-auto mt-4"
                data-oid="e0xgs34"
              ></span>
            </h2>
            <p
              className="text-center text-gray-600 mb-12 max-w-3xl mx-auto"
              data-oid="4cx.m4p"
            >
              Experimente un servicio galardonado; solo tiene que enviar el
              formulario o un correo electrónico directamente a nuestro equipo
              corporativo: corporatesales@privyde.com.
            </p>

            <div
              className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md"
              data-oid="dwnyvmf"
            >
              <p className="text-sm text-gray-500 mb-6" data-oid="qxkguyg">
                Complete este formulario y en el siguiente paso creará su cuenta
                de empresa para acceder a tarifas corporativas.
              </p>

              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
                data-oid="lf5oq_r"
              >
                <div data-oid="def1o86">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                    data-oid="uryi81b"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    data-oid="2sfqale"
                  />
                </div>
                <div data-oid="9kbku5_">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                    data-oid="uafj776"
                  >
                    Apellido
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    data-oid="70d6r4i"
                  />
                </div>
              </div>

              <div
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
                data-oid="f4kx8e1"
              >
                <div data-oid="b4s8var">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700 mb-1"
                    data-oid="dd:vi-c"
                  >
                    País
                  </label>
                  <select
                    id="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    data-oid="2z8axy-"
                  >
                    <option data-oid="9fj0_o9">España</option>
                    <option data-oid="_bajlnr">Estados Unidos</option>
                    <option data-oid="3wfyqle">México</option>
                    <option data-oid="br63g:v">Argentina</option>
                  </select>
                </div>
                <div data-oid="60b7oni">
                  <label
                    htmlFor="phonePrefix"
                    className="block text-sm font-medium text-gray-700 mb-1"
                    data-oid="w25ggaf"
                  >
                    Prefijo
                  </label>
                  <select
                    id="phonePrefix"
                    value={formData.phonePrefix}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    data-oid="9g6m0:r"
                  >
                    <option data-oid="14s_wp3">+34</option>
                    <option data-oid="2o2z6:g">+1</option>
                    <option data-oid="q-iee5p">+52</option>
                    <option data-oid="jswkq75">+54</option>
                  </select>
                </div>
                <div data-oid="astguni">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700 mb-1"
                    data-oid="-wt1coz"
                  >
                    Número de teléfono
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    data-oid="p8rjafe"
                  />
                </div>
              </div>

              <div className="mb-4" data-oid="ivdvd:t">
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                  data-oid="i7jb9tp"
                >
                  Nombre de la empresa
                </label>
                <input
                  type="text"
                  id="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  data-oid="h7...ru"
                />
              </div>

              <div className="mb-4" data-oid="ijflsfa">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-1"
                  data-oid="yzty9ld"
                >
                  ¿Dónde está ubicado?
                </label>
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  data-oid="_a0r5mw"
                />
              </div>

              <div className="mb-4" data-oid="_uho8oa">
                <label
                  htmlFor="companySize"
                  className="block text-sm font-medium text-gray-700 mb-1"
                  data-oid="1woeb-."
                >
                  Tamaño de la empresa
                </label>
                <select
                  id="companySize"
                  value={formData.companySize}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  data-oid="dcn-wh7"
                >
                  <option data-oid="txs24sj">1-10 empleados</option>
                  <option data-oid="i_xvtpk">11-50 empleados</option>
                  <option data-oid="3olu.oz">51-200 empleados</option>
                  <option data-oid="9oc1cgn">201-500 empleados</option>
                  <option data-oid="gtlrh.8">501-1000 empleados</option>
                  <option data-oid="sia84qa">1000+ empleados</option>
                </select>
              </div>

              <div className="mb-4" data-oid="n6insbb">
                <label
                  htmlFor="hearAbout"
                  className="block text-sm font-medium text-gray-700 mb-1"
                  data-oid="ic_ii9x"
                >
                  ¿Cómo se enteró de nosotros?
                </label>
                <select
                  id="hearAbout"
                  value={formData.hearAbout}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  data-oid="fk3al4w"
                >
                  <option data-oid="e7xn.-z">Búsqueda en Google</option>
                  <option data-oid="_4a2kw3">Redes sociales</option>
                  <option data-oid="wt8vu4b">Recomendación</option>
                  <option data-oid="p5fegru">Publicidad</option>
                  <option data-oid="ep.n790">Otro</option>
                </select>
              </div>

              <div className="mb-4" data-oid="ny4ilau">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                  data-oid="k-0bx4v"
                >
                  ¿Cómo podemos ayudarle?
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  data-oid="1dw5ml7"
                ></textarea>
              </div>

              <motion.button
                className="select-button h-10 px-6 py-2 rounded-md text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 w-full md:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContactSubmit}
                data-oid="qes2eht"
              >
                Continuar al registro
              </motion.button>
            </div>
          </section>

          {/* FAQ Section con animaciones */}
          <motion.section
            className="mb-32"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            data-oid="1jl80jf"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 relative"
              data-oid="wa_z12_"
            >
              Frequently asked questions
              <span
                className="block w-24 h-1 bg-gradient-to-r from-red-500 to-orange-400 mx-auto mt-4"
                data-oid="qerftq9"
              ></span>
            </h2>

            <div className="space-y-4 max-w-4xl mx-auto" data-oid="mbq3o20">
              {faqData.map((faq, index) => (
                <motion.div
                  key={index}
                  className={`bg-white rounded-xl border ${openFaqIndex === index ? "border-red-200 shadow-md" : "border-gray-200"} overflow-hidden transition-all duration-300`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  data-oid="3p41d:s"
                >
                  <button
                    className="flex justify-between items-center w-full p-6 text-left"
                    onClick={() => toggleFaq(index)}
                    data-oid="fj7u-fb"
                  >
                    <h3
                      className={`text-xl font-semibold ${openFaqIndex === index ? "text-red-600" : "text-gray-900"}`}
                      data-oid="e18kt6f"
                    >
                      {faq.question}
                    </h3>
                    <div
                      className={`${openFaqIndex === index ? "text-red-500 bg-red-50" : "text-gray-400 bg-gray-50"} rounded-full p-1 transition-colors duration-300`}
                      data-oid="d4n3mrv"
                    >
                      {openFaqIndex === index ? (
                        <ChevronUp className="h-5 w-5" data-oid="9l0.9il" />
                      ) : (
                        <ChevronDown className="h-5 w-5" data-oid="688lxfa" />
                      )}
                    </div>
                  </button>
                  <div
                    className={`transition-all duration-500 ease-in-out ${
                      openFaqIndex === index
                        ? "max-h-[1000px] opacity-100"
                        : "max-h-0 opacity-0 overflow-hidden"
                    }`}
                    data-oid="obdh.d1"
                  >
                    <div className="px-6 pb-6 pt-0" data-oid="b5xli9d">
                      <div
                        className="border-t border-gray-200 pt-4 text-left"
                        data-oid="m0h2c._"
                      >
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Female Chauffeur Photo */}
          <section className="mb-32" data-oid=".b9xk:4">
            <img
              src="/images/female-chauffeur-palm.jpg"
              alt="A chauffeur smiles as she gets out of her vehicle with palm trees in the background"
              className="w-full h-auto rounded-xl shadow-lg object-cover"
              data-oid="o9_n2v3"
            />

            <div className="text-center mt-4" data-oid="czkz-1j">
              <button
                className="text-gray-600 font-medium flex items-center mx-auto hover:text-gray-800 transition-colors"
                data-oid="6pczhzh"
              >
                Desplácese hasta la parte superior de la página
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  data-oid="kxz2e6w"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                    data-oid="swcj5jw"
                  />
                </svg>
              </button>
            </div>
          </section>
        </div>
      </section>

      {/* Footer */}
      <Footer data-oid="lf2ox5n" />
    </div>
  );
};

export default Companies;
