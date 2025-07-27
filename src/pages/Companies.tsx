import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
        <p className="text-gray-600" data-oid="hv3bq.9">
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
        <p className="text-gray-600" data-oid="pq0jt.:">
          Privyde ofrece cuatro tipos de vehículos en la mayoría de las
          ubicaciones: Business Class, Electric Class, First Class y Business
          Van/SUV.
          <br data-oid="w7r3h8a" />
          <br data-oid="5xvbo2-" />
          Cada una de estas categorías contiene una selección de modelos
          comparables de primera línea, que puede ver en el proceso de reserva o
          en nuestro Centro de ayuda.
          <br data-oid="jhne48:" />
          <br data-oid="33ijjgo" />
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
        <p className="text-gray-600" data-oid="rj.92di">
          All of Privyde's chauffeurs speak English and the language of the
          country they operate in.
        </p>
      ),
    },
    {
      question: "Which payment options are available?",
      answer: (
        <p className="text-gray-600" data-oid="tl_r_it">
          Privyde accepts Visa, Maestro, Mastercard and American Express cards.
          It is not possible to pay for the ride in cash. You can also pay via
          Paypal in the apps and Apple Pay if you are an iOS user. Paypal and
          Apple Pay are not currently available on the website.
          <br data-oid="hdjmps3" />
          <br data-oid="v_8ab50" />
          Business accounts can also request to receive monthly invoices,
          instead of paying on a ride-by-ride basis.
          <br data-oid="f3y.30d" />
          <br data-oid="3-s1wya" />
          Please keep in mind that all payment for your ride is set up in
          advance; your chauffeur is not able to accept payment on location.
          <br data-oid="l0wqqtj" />
          <br data-oid="x.q.oqm" />
          See the latest information here.
        </p>
      ),
    },
    {
      question: "¿Cómo contribuye Privyde a las opciones de viaje sostenibles?",
      answer: (
        <p className="text-gray-600" data-oid="ou0j7aa">
          Privyde contribuye a los viajes sostenibles al ofrecer opciones de
          vehículos eléctricos, incorporar vehículos eléctricos en nuestra
          oferta de Business Class en muchas más ciudades y trabajar activamente
          para compensar su huella de carbono.
        </p>
      ),
    },
  ];

  return (
    <div className="bg-white" data-oid="yb-ae5n">
      {/* Navigation */}
      <Navbar data-oid="5o38oq1" />

      {/* SECCIÓN HERO - COMPLETAMENTE INDEPENDIENTE */}
      <section className="relative w-full bg-gray-900" data-oid="::80_op">
        {/* Overlay para mejorar visibilidad - AJUSTADO PARA HACERLO MÁS LIGERO */}
        <div
          className="absolute inset-0 bg-black/50 z-10"
          data-oid="1ji5c6i"
        ></div>

        {/* Imagen de fondo */}
        <img
          src="/images/woman-in-a-suit-walking.jpeg"
          alt="Invitada de Privyde caminando hacia un Mercedes-Benz mientras el chófer le abre la puerta"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-70"
          data-oid="dkfbl3j"
        />

        {/* Contenido del hero con animaciones */}
        <div
          className="relative z-20 container mx-auto px-6 py-20 md:py-32"
          data-oid=".i-z3h0"
        >
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            data-oid="c77cxkv"
          >
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              data-oid="4lkpzc6"
            >
              Transporte terrestre para
              <motion.span
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                data-oid="lj0l1at"
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
              data-oid="sbcl:at"
            >
              Reservar ahora
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* SECCIÓN DE CONTENIDO PRINCIPAL - COMPLETAMENTE SEPARADA DEL HERO */}
      <section className="bg-white py-20" data-oid="_uvj9ae">
        <div className="container mx-auto px-6 max-w-6xl" data-oid="iss0wb4">
          {/* Sección de introducción */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            data-oid=".zl:j8k"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
              data-oid="ybmy8u2"
            >
              Servicios de chófer para empresas para cada ocasión
              <span
                className="block w-24 h-1 bg-gradient-to-r from-red-500 to-orange-400 mx-auto mt-4"
                data-oid="4dk28ez"
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
            data-oid="zsuci2c"
          >
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-12"
              data-oid="hs7pdvt"
            >
              <motion.div
                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                data-oid="diq1c_3"
              >
                <img
                  src="/images/woman-client.jpeg"
                  alt="Empresario en asiento trasero con chófer femenina cerrando la puerta"
                  className="w-full h-64 object-cover"
                  data-oid="2iye.5m"
                />

                <div className="p-6" data-oid="vu-gw5a">
                  <h3
                    className="text-xl font-semibold mb-4 text-gray-900"
                    data-oid="on:v.w6"
                  >
                    Viajes de negocios y reuniones
                  </h3>
                  <p
                    className="text-gray-600 leading-relaxed"
                    data-oid="9ojcuwi"
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
                data-oid="egmkko2"
              >
                <img
                  src="/images/security.png"
                  alt="Invitado en asiento trasero de EQS hablando por teléfono con resplandor solar"
                  className="w-full h-64 object-cover"
                  data-oid="05ouu2f"
                />

                <div className="p-6" data-oid="mxtbgvp">
                  <h3
                    className="text-xl font-semibold mb-4 text-gray-900"
                    data-oid="tel.6f:"
                  >
                    Viajes de ciudad a ciudad
                  </h3>
                  <p
                    className="text-gray-600 leading-relaxed"
                    data-oid="_c4p2.r"
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
                data-oid="-8sfm0h"
              >
                <img
                  src="/images/limo-airport.png"
                  alt="Pareja con equipaje acercándose al coche, vista desde el asiento trasero de EQS"
                  className="w-full h-64 object-cover"
                  data-oid="a7ctfv1"
                />

                <div className="p-6" data-oid="qqtwf5t">
                  <h3
                    className="text-xl font-semibold mb-4 text-gray-900"
                    data-oid="4smdzy8"
                  >
                    Traslados al aeropuerto en todo el mundo
                  </h3>
                  <p
                    className="text-gray-600 leading-relaxed"
                    data-oid="8s:zoz0"
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
                data-oid="8so8r:m"
              >
                <img
                  src="/images/ejecutivo-tablet.png"
                  alt="Chófer cerrando la puerta, invitado en asiento trasero, vista desde arriba"
                  className="w-full h-64 object-cover"
                  data-oid="qau5wmx"
                />

                <div className="p-6" data-oid="fxll3qx">
                  <h3
                    className="text-xl font-semibold mb-4 text-gray-900"
                    data-oid="bjs.b8y"
                  >
                    Viajes para clientes y socios
                  </h3>
                  <p
                    className="text-gray-600 leading-relaxed"
                    data-oid="c7sjxzl"
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
            data-oid="lg4adv1"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 relative"
              data-oid="2-5cdzq"
            >
              Pruebe nuestro servicio galardonado
              <span
                className="block w-24 h-1 bg-gradient-to-r from-red-500 to-orange-400 mx-auto mt-4"
                data-oid="gkrdayh"
              ></span>
            </h2>
            <div
              className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-xl mb-10 max-w-4xl mx-auto shadow-sm border border-gray-200 transform transition-all duration-300 hover:shadow-md"
              data-oid="b8ebt.r"
            >
              <blockquote
                className="italic text-xl text-gray-700 mb-4 relative"
                data-oid="c6svvgn"
              >
                <span
                  className="text-5xl text-red-400 absolute -top-6 -left-2"
                  data-oid="s6-5yse"
                >
                  "
                </span>
                I know that I can rely on Privyde's high quality standards
                worldwide. The customer is the main focus at Privyde, which
                makes me feel taken care of.
                <span
                  className="text-5xl text-red-400 absolute -bottom-10 -right-2"
                  data-oid="34cdmo1"
                >
                  "
                </span>
              </blockquote>
              <p
                className="text-right font-medium mt-2 text-gray-800"
                data-oid="78:i5a9"
              >
                Tom Grover, European VSP, Smith & Nephew
              </p>
            </div>
          </motion.section>

          {/* Chauffeur Network Section */}
          <section
            className="mb-32 bg-gradient-to-br from-gray-50 to-gray-100 p-10 rounded-2xl shadow-sm"
            data-oid="4113dlu"
          >
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
              data-oid="sq433:l"
            >
              <div data-oid="rq98m6i">
                <img
                  src="/images/corporative.png"
                  alt="Un chofer en un traje frente a su Mercedes-Benz con el horizonte de la ciudad"
                  className="w-full h-auto rounded-xl shadow-lg object-cover"
                  data-oid="bn9gfrw"
                />
              </div>
              <div data-oid="amj_o.2">
                <h2
                  className="text-3xl font-bold text-gray-900 mb-8 relative"
                  data-oid="4s5qxql"
                >
                  Chóferes con un nuevo concepto de fiabilidad
                  <span
                    className="block w-16 h-1 bg-gradient-to-r from-red-500 to-orange-400 mt-4"
                    data-oid="e.aojrc"
                  ></span>
                </h2>
                <p
                  className="text-gray-600 mb-8 leading-relaxed"
                  data-oid="m0d8pm-"
                >
                  Nuestra red global de chóferes con licencia y seguro local
                  garantiza una experiencia de transporte perfecta para los
                  viajes de empresa.
                </p>
                <ul className="space-y-4 mb-8" data-oid="yk6hzi:">
                  <li className="flex items-start" data-oid=".l41p2-">
                    <CheckCircle
                      className="h-6 w-6 text-red-500 mr-3 mt-0.5 flex-shrink-0"
                      data-oid="zvnqruf"
                    />

                    <span
                      className="text-gray-700 text-left"
                      data-oid="ae:etj_"
                    >
                      Disponibles en más de 50 países
                    </span>
                  </li>
                  <li className="flex items-start" data-oid="-.6lq4.">
                    <CheckCircle
                      className="h-6 w-6 text-red-500 mr-3 mt-0.5 flex-shrink-0"
                      data-oid="dp7v_:r"
                    />

                    <span
                      className="text-gray-700 text-left"
                      data-oid="jv9k-79"
                    >
                      Chóferes cualificados de habla inglesa
                    </span>
                  </li>
                  <li className="flex items-start" data-oid="lyph-zh">
                    <CheckCircle
                      className="h-6 w-6 text-red-500 mr-3 mt-0.5 flex-shrink-0"
                      data-oid="z3z36sd"
                    />

                    <span
                      className="text-gray-700 text-left"
                      data-oid="i:ofev5"
                    >
                      Seguimiento y notificaciones en tiempo real
                    </span>
                  </li>
                  <li className="flex items-start" data-oid="74a-yuo">
                    <CheckCircle
                      className="h-6 w-6 text-red-500 mr-3 mt-0.5 flex-shrink-0"
                      data-oid="02js_wl"
                    />

                    <span
                      className="text-gray-700 text-left"
                      data-oid="0.a5qgf"
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
            data-oid="3fhzhm8"
          >
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
              data-oid="e2:ezf6"
            >
              <div className="order-2 md:order-1" data-oid="2miuph8">
                <h2
                  className="text-3xl font-bold text-gray-900 mb-8 relative"
                  data-oid="2x.71.a"
                >
                  Sin necesidad de facturas
                  <span
                    className="block w-16 h-1 bg-gradient-to-r from-red-500 to-orange-400 mt-4"
                    data-oid="918vhz6"
                  ></span>
                </h2>
                <p
                  className="text-gray-600 mb-8 leading-relaxed"
                  data-oid=".j2u4f3"
                >
                  Simplifique la gestión de sus facturas. Nuestro sistema de
                  facturación automatizado agiliza el proceso, mientras que el
                  servicio de asistencia técnica de la empresa está a su
                  disposición para ayudarle.
                </p>
                <ul className="space-y-4 mb-8" data-oid="1nm0o50">
                  <li className="flex items-start" data-oid="ggjdpna">
                    <CheckCircle
                      className="h-6 w-6 text-red-500 mr-3 mt-0.5 flex-shrink-0"
                      data-oid="cxuxcmw"
                    />

                    <span
                      className="text-gray-700 text-left"
                      data-oid="ehhu:64"
                    >
                      Plataforma todo en uno para reservas sin contratiempos
                    </span>
                  </li>
                  <li className="flex items-start" data-oid="p2152r-">
                    <CheckCircle
                      className="h-6 w-6 text-red-500 mr-3 mt-0.5 flex-shrink-0"
                      data-oid="jco2ts9"
                    />

                    <span
                      className="text-gray-700 text-left"
                      data-oid="xcgkust"
                    >
                      Facturación automatizada para una fácil gestión de
                      facturas
                    </span>
                  </li>
                  <li className="flex items-start" data-oid="y_lkk7q">
                    <CheckCircle
                      className="h-6 w-6 text-red-500 mr-3 mt-0.5 flex-shrink-0"
                      data-oid="mipj3i-"
                    />

                    <span
                      className="text-gray-700 text-left"
                      data-oid="rj83w22"
                    >
                      Asistencia y gestores de cuentas a su disposición
                    </span>
                  </li>
                  <li className="flex items-start" data-oid="8zonryj">
                    <CheckCircle
                      className="h-6 w-6 text-red-500 mr-3 mt-0.5 flex-shrink-0"
                      data-oid="z63waa9"
                    />

                    <span
                      className="text-gray-700 text-left"
                      data-oid="0xmlb1q"
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
                  data-oid="r3jk303"
                >
                  Reservar ahora
                </motion.button>
              </div>
              <div className="order-1 md:order-2" data-oid=":-fxpnh">
                <img
                  src="/images/woman-client.jpeg"
                  alt="Mujer saliendo del coche con chófer B4B"
                  className="w-full h-auto rounded-xl shadow-lg object-cover"
                  data-oid="j_fyfns"
                />
              </div>
            </div>
          </section>

          {/* Booking for Executives Section */}
          <section className="mb-32" data-oid="hvmb6..">
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
              data-oid="1wad-c."
            >
              <div data-oid="-5rmd3p">
                <img
                  src="/images/woman-client.jpeg"
                  alt="Una mujer elegante sentada en el asiento trasero de su viaje con chófer con bolsas de compras en el asiento a su lado"
                  className="w-full h-auto rounded-xl shadow-lg object-cover"
                  data-oid="wo:7c-:"
                />
              </div>
              <div data-oid="2:52qvc">
                <h2
                  className="text-3xl font-bold text-gray-900 mb-8 relative"
                  data-oid="553qlly"
                >
                  Booking for your executives
                  <span
                    className="block w-16 h-1 bg-gradient-to-r from-red-500 to-orange-400 mt-4"
                    data-oid="s:73udm"
                  ></span>
                </h2>
                <p
                  className="text-gray-600 mb-8 leading-relaxed"
                  data-oid="h.nubc7"
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
                  data-oid="9.qy5:r"
                >
                  Reservar ahora
                </motion.button>
              </div>
            </div>
          </section>

          {/* By the Hour Section */}
          <section
            className="mb-32 bg-gradient-to-br from-gray-50 to-gray-100 p-10 rounded-2xl shadow-sm"
            data-oid="7l4kys0"
          >
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
              data-oid="2nhpw-e"
            >
              <div className="order-2 md:order-1" data-oid="kz0:iqw">
                <h2
                  className="text-3xl font-bold text-gray-900 mb-8 relative"
                  data-oid="8ry89oz"
                >
                  By the hour
                  <span
                    className="block w-16 h-1 bg-gradient-to-r from-red-500 to-orange-400 mt-4"
                    data-oid="076vl57"
                  ></span>
                </h2>
                <p
                  className="text-gray-600 mb-8 leading-relaxed"
                  data-oid="4fdl8n:"
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
                  data-oid="_0:xded"
                >
                  Reservar ahora
                </motion.button>
              </div>
              <div className="order-1 md:order-2" data-oid="g7f9232">
                <img
                  src="/images/limo-elegant.png"
                  alt="Un chófer de Privyde sonríe y ajusta un control mientras conduce un Mercedes EQS"
                  className="w-full h-auto rounded-xl shadow-lg object-cover"
                  data-oid="nnpk6hw"
                />
              </div>
            </div>
          </section>

          {/* Awards Section */}
          <section className="mb-32" data-oid=".rmf_f_">
            <h2
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 relative"
              data-oid="82jg.1f"
            >
              Award-winning chauffeur service
              <span
                className="block w-24 h-1 bg-gradient-to-r from-red-500 to-orange-400 mx-auto mt-4"
                data-oid="3-pew:j"
              ></span>
            </h2>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
              data-oid="y9q.ghp"
            >
              <div
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center transform transition-all duration-300 hover:shadow-md hover:border-gray-300"
                data-oid="k_npq3b"
              >
                <img
                  src="/images/limo-leds.png"
                  alt="B2B Icon - Lux Leaders in Luxury"
                  className="h-20 w-auto mb-4"
                  data-oid="lokng92"
                />

                <p
                  className="text-lg font-medium text-center text-gray-800"
                  data-oid="x0zjnpb"
                >
                  Lux Leaders in Luxury
                </p>
              </div>

              <div
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center transform transition-all duration-300 hover:shadow-md hover:border-gray-300"
                data-oid="vj.wbta"
              >
                <img
                  src="/images/award-business-travel.png"
                  alt="B2B Award 2024 - Business Travel Awards Europe 2024"
                  className="h-20 w-auto mb-4"
                  data-oid="h4uq91r"
                />

                <p
                  className="text-lg font-medium text-center text-gray-800"
                  data-oid="u4ga7v."
                >
                  Business Travel Awards Europe 2024
                </p>
              </div>

              <div
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center transform transition-all duration-300 hover:shadow-md hover:border-gray-300"
                data-oid="z6:t8z."
              >
                <img
                  src="/images/award-world-travel.png"
                  alt="B2B Award 2024 - World Travel Awards 2024"
                  className="h-20 w-auto mb-4"
                  data-oid="hv1jx1z"
                />

                <p
                  className="text-lg font-medium text-center text-gray-800"
                  data-oid="3e3n06h"
                >
                  World Travel Awards 2024
                </p>
              </div>
            </div>
          </section>

          {/* Sustainability Initiatives Section */}
          <section className="mb-32" data-oid="3e_srbe">
            <h2
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 relative"
              data-oid="fs0o.xs"
            >
              Iniciativas de sostenibilidad
              <span
                className="block w-24 h-1 bg-gradient-to-r from-green-500 to-green-400 mx-auto mt-4"
                data-oid=".l4t-u2"
              ></span>
            </h2>

            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              data-oid="rbg0j51"
            >
              <div
                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200"
                data-oid="pnu__v6"
              >
                <img
                  src="/images/chauffeur-tesla.jpg"
                  alt="Chófer masculino ajustándose los puños frente a Tesla"
                  className="w-full h-48 object-cover"
                  data-oid="8rch1t_"
                />

                <div className="p-6" data-oid="we5.8f4">
                  <div className="flex items-center mb-3" data-oid="t7kc6ty">
                    <h3
                      className="text-xl font-semibold text-gray-900"
                      data-oid="qc2j4_8"
                    >
                      Electric Class
                    </h3>
                    <span
                      className="ml-2 bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded"
                      data-oid="y0hde3:"
                    >
                      NUEVO
                    </span>
                  </div>
                  <p
                    className="text-gray-600 leading-relaxed mb-4"
                    data-oid="ph_z2hd"
                  >
                    Elija nuestra nueva Electric Class para reservar viajes con
                    chofer en vehículos eléctricos de alto nivel como el Jaguar
                    I-PACE, Tesla Model S y Tesla Model X.
                  </p>
                  <button
                    className="text-red-500 font-medium hover:text-red-600 transition-colors flex items-center"
                    data-oid="49-uaf2"
                  >
                    Más información
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      data-oid="zkoc1k0"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                        data-oid="rojw.4y"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div
                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200"
                data-oid="9.p:4ts"
              >
                <img
                  src="/images/ev-charging.jpg"
                  alt="Primer plano de carga de vehículo eléctrico"
                  className="w-full h-48 object-cover"
                  data-oid="p9lxcap"
                />

                <div className="p-6" data-oid="z89d49r">
                  <h3
                    className="text-xl font-semibold mb-3 text-gray-900"
                    data-oid="uyxnvur"
                  >
                    La nueva normalidad
                  </h3>
                  <p
                    className="text-gray-600 leading-relaxed mb-4"
                    data-oid="-hop2x7"
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
                    data-oid="jxy6unh"
                  >
                    Más información
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      data-oid="tw57mw-"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                        data-oid="xmhu81o"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div
                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200"
                data-oid=":cuiqxo"
              >
                <img
                  src="/images/car-forest.jpg"
                  alt="Coche circulando por un bosque, vista desde arriba"
                  className="w-full h-48 object-cover"
                  data-oid="028tmml"
                />

                <div className="p-6" data-oid="a.vel9s">
                  <h3
                    className="text-xl font-semibold mb-3 text-gray-900"
                    data-oid="yyo533j"
                  >
                    100% de compensación de carbono
                  </h3>
                  <p
                    className="text-gray-600 leading-relaxed mb-4"
                    data-oid="pu9fkfg"
                  >
                    Sea cual sea la clase de vehículo que elija, compensamos
                    automáticamente las emisiones con nuestro programa de
                    compensación de carbono.
                  </p>
                  <button
                    className="text-red-500 font-medium hover:text-red-600 transition-colors flex items-center"
                    data-oid="lcqsrb2"
                  >
                    Más información
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      data-oid="bfki:lh"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                        data-oid="s4ydigz"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="mb-32" data-oid="0z_q4zi">
            <h2
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 relative"
              data-oid="leqviy7"
            >
              Experimente nuestros beneficios para empresas
              <span
                className="block w-24 h-1 bg-gradient-to-r from-red-500 to-orange-400 mx-auto mt-4"
                data-oid="yjr2yr:"
              ></span>
            </h2>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
              data-oid="t6t7ywn"
            >
              <div
                className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
                data-oid="kzt0gbw"
              >
                <div
                  className="text-red-500 mb-6 bg-red-50 w-16 h-16 rounded-full flex items-center justify-center"
                  data-oid="ez9g.tt"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    data-oid="6:arqe1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      data-oid="3hknao:"
                    />
                  </svg>
                </div>
                <h3
                  className="text-xl font-semibold mb-4 text-gray-900"
                  data-oid="ygw56e8"
                >
                  Precios competitivos
                </h3>
                <p className="text-gray-600 leading-relaxed" data-oid="k4a:1:w">
                  Acceda a un servicio de primera calidad a precios basados en
                  la distancia que son justos para usted y para nuestros
                  chóferes.
                </p>
              </div>

              <div
                className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
                data-oid="v_7lqce"
              >
                <div
                  className="text-red-500 mb-6 bg-red-50 w-16 h-16 rounded-full flex items-center justify-center"
                  data-oid="0b8tke8"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    data-oid="znvnbxk"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      data-oid="xlxxnvn"
                    />
                  </svg>
                </div>
                <h3
                  className="text-xl font-semibold mb-4 text-gray-900"
                  data-oid="og2l-r1"
                >
                  Disponibilidad en todo el mundo
                </h3>
                <p className="text-gray-600 leading-relaxed" data-oid="gfaf3ei">
                  Nuestro servicio de chófer en todo el mundo garantiza un viaje
                  rápido y fiable.
                </p>
              </div>

              <div
                className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
                data-oid="2yje_ya"
              >
                <div
                  className="text-red-500 mb-6 bg-red-50 w-16 h-16 rounded-full flex items-center justify-center"
                  data-oid="g4_k019"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    data-oid="txx_:8b"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      data-oid="1t1lh:i"
                    />
                  </svg>
                </div>
                <h3
                  className="text-xl font-semibold mb-4 text-gray-900"
                  data-oid="hh6dqqg"
                >
                  Envío prioritario
                </h3>
                <p className="text-gray-600 leading-relaxed" data-oid="b7obxyu">
                  Optimice su experiencia con reservas prioritarias y
                  seguimiento en tiempo real.
                </p>
              </div>

              <div
                className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
                data-oid="vxp80xs"
              >
                <div
                  className="text-red-500 mb-6 bg-red-50 w-16 h-16 rounded-full flex items-center justify-center"
                  data-oid="8:ciy3a"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    data-oid="7zln:9z"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      data-oid="28l-bef"
                    />
                  </svg>
                </div>
                <h3
                  className="text-xl font-semibold mb-4 text-gray-900"
                  data-oid="lbtmvwt"
                >
                  Reserva fácil
                </h3>
                <p className="text-gray-600 leading-relaxed" data-oid="vhv1m4:">
                  Reserva sencilla desde una misma página con confirmación
                  inmediata y precios claros.
                </p>
              </div>

              <div
                className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
                data-oid="2zv2nql"
              >
                <div
                  className="text-red-500 mb-6 bg-red-50 w-16 h-16 rounded-full flex items-center justify-center"
                  data-oid="khza5g8"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    data-oid="zeersn9"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      data-oid="ksg5qtv"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v3m0 0v3m0-3h3m-3 0H9"
                      data-oid="jew5rs_"
                    />
                  </svg>
                </div>
                <h3
                  className="text-xl font-semibold mb-4 text-gray-900"
                  data-oid="2yq0j8y"
                >
                  Asistencia para empresas
                </h3>
                <p className="text-gray-600 leading-relaxed" data-oid="rkvs:m7">
                  Nuestro equipo de asistencia multilingüe 24/7 garantiza que
                  nuestros clientes empresarios estén cubiertos en todo momento.
                </p>
              </div>

              <div
                className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
                data-oid="4n32wye"
              >
                <div
                  className="text-red-500 mb-6 bg-red-50 w-16 h-16 rounded-full flex items-center justify-center"
                  data-oid="yanjf9_"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    data-oid="ud5k_l6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                      data-oid="f7r6:tp"
                    />
                  </svg>
                </div>
                <h3
                  className="text-xl font-semibold mb-4 text-gray-900"
                  data-oid="6s6kq-v"
                >
                  Opción de vehículo eléctrico
                </h3>
                <p className="text-gray-600 leading-relaxed" data-oid="ks_-umx">
                  ¡Estamos orgullosos de ofrecer una variedad de vehículos
                  eléctricos en ciudades seleccionadas para garantizar la
                  compensación de nuestra huella de carbono!
                </p>
              </div>
            </div>
          </section>

          {/* Articles Section */}
          <section className="mb-32" data-oid="mj:6d:d">
            <h2
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 relative"
              data-oid="8ha:_s."
            >
              Check out our latest articles
              <span
                className="block w-24 h-1 bg-gradient-to-r from-red-500 to-orange-400 mx-auto mt-4"
                data-oid="mnibaa2"
              ></span>
            </h2>

            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              data-oid="3rp:vz8"
            >
              <div
                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg hover:border-gray-300"
                data-oid="381iwa3"
              >
                <img
                  src="/images/ceo-eqs.jpg"
                  alt="Jens Wohltorf CEO in EQS"
                  className="w-full h-48 object-cover"
                  data-oid=":00s7v:"
                />

                <div className="p-6" data-oid="5ivjrjp">
                  <h3
                    className="text-xl font-semibold mb-3 text-gray-900"
                    data-oid="6kgbb.t"
                  >
                    Funding Announcement
                  </h3>
                  <p
                    className="text-gray-600 leading-relaxed mb-4"
                    data-oid="01vouzy"
                  >
                    Learn more about our biggest finance round yet.
                  </p>
                  <button
                    className="text-red-500 font-medium hover:text-red-600 transition-colors flex items-center"
                    data-oid="uhsi1-k"
                  >
                    Read the story
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      data-oid="j2ppzur"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                        data-oid="._0y5wz"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div
                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg hover:border-gray-300"
                data-oid="feoy6nn"
              >
                <img
                  src="/images/chauffeur-silver.jpg"
                  alt="Privyde's 2024 in Review"
                  className="w-full h-48 object-cover"
                  data-oid="za4chlb"
                />

                <div className="p-6" data-oid="ls6ihb2">
                  <h3
                    className="text-xl font-semibold mb-3 text-gray-900"
                    data-oid="1twl9ru"
                  >
                    Privyde's 2024 in Review
                  </h3>
                  <p
                    className="text-gray-600 leading-relaxed mb-4"
                    data-oid="s7kfw0x"
                  >
                    Take a peek into how our 2024 went, and what we achieved.
                  </p>
                  <button
                    className="text-red-500 font-medium hover:text-red-600 transition-colors flex items-center"
                    data-oid="3eyd8c3"
                  >
                    Read the story
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      data-oid=":g-8txd"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                        data-oid="nwpsfk."
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div
                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg hover:border-gray-300"
                data-oid="75:od5t"
              >
                <img
                  src="/images/family-eqs-backseat.jpg"
                  alt="Woman relaxing and child playing with tablet in back seat of EQS"
                  className="w-full h-48 object-cover"
                  data-oid="15inid_"
                />

                <div className="p-6" data-oid="nsbtdje">
                  <h3
                    className="text-xl font-semibold mb-3 text-gray-900"
                    data-oid="7khuis4"
                  >
                    Travel Trends Report
                  </h3>
                  <p
                    className="text-gray-600 leading-relaxed mb-4"
                    data-oid="r6kl818"
                  >
                    Get an insight into how travel impacts productivity, backed
                    with real data.
                  </p>
                  <button
                    className="text-red-500 font-medium hover:text-red-600 transition-colors flex items-center"
                    data-oid="bdwqvin"
                  >
                    Read the report
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      data-oid="d7xm6c3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                        data-oid="vppo:z-"
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
            data-oid="j-_epad"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 relative"
              data-oid="nfni79m"
            >
              Mejore sus viajes de negocios
              <span
                className="block w-24 h-1 bg-gradient-to-r from-red-500 to-orange-400 mx-auto mt-4"
                data-oid="i:zn-ig"
              ></span>
            </h2>
            <p
              className="text-center text-gray-600 mb-12 max-w-3xl mx-auto"
              data-oid="7gxh55m"
            >
              Experimente un servicio galardonado; solo tiene que enviar el
              formulario o un correo electrónico directamente a nuestro equipo
              corporativo: corporatesales@privyde.com.
            </p>

            <div
              className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md"
              data-oid="wyft3il"
            >
              <p className="text-sm text-gray-500 mb-6" data-oid="v670tdk">
                Complete este formulario y en el siguiente paso creará su cuenta
                de empresa para acceder a tarifas corporativas.
              </p>

              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
                data-oid="drs5.1g"
              >
                <div data-oid="n6nbyub">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                    data-oid="wp4xel_"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    data-oid="kj0_7s."
                  />
                </div>
                <div data-oid="fqyq-vz">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                    data-oid="p25kbvw"
                  >
                    Apellido
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    data-oid="z1z467d"
                  />
                </div>
              </div>

              <div
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
                data-oid="cn3ykqq"
              >
                <div data-oid="2uoxw2o">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700 mb-1"
                    data-oid="o0fv4xt"
                  >
                    País
                  </label>
                  <select
                    id="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    data-oid="i-wpy.6"
                  >
                    <option data-oid="2g_w2hk">España</option>
                    <option data-oid="rri0t2d">Estados Unidos</option>
                    <option data-oid="glxfbt4">México</option>
                    <option data-oid="4lb30nn">Argentina</option>
                  </select>
                </div>
                <div data-oid="xgwlwvh">
                  <label
                    htmlFor="phonePrefix"
                    className="block text-sm font-medium text-gray-700 mb-1"
                    data-oid="59hoo2."
                  >
                    Prefijo
                  </label>
                  <select
                    id="phonePrefix"
                    value={formData.phonePrefix}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    data-oid="l-jwr3x"
                  >
                    <option data-oid="medjcpy">+34</option>
                    <option data-oid="1d:rwmv">+1</option>
                    <option data-oid="j2cxcuc">+52</option>
                    <option data-oid="x8873hh">+54</option>
                  </select>
                </div>
                <div data-oid="f3n:fr1">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700 mb-1"
                    data-oid="yt5n4lq"
                  >
                    Número de teléfono
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    data-oid="x0vop05"
                  />
                </div>
              </div>

              <div className="mb-4" data-oid="30_k36w">
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                  data-oid="a2bf4zh"
                >
                  Nombre de la empresa
                </label>
                <input
                  type="text"
                  id="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  data-oid="1m21ckn"
                />
              </div>

              <div className="mb-4" data-oid=".n52mau">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-1"
                  data-oid="i26.74r"
                >
                  ¿Dónde está ubicado?
                </label>
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  data-oid="cmn32tl"
                />
              </div>

              <div className="mb-4" data-oid="1xgw18.">
                <label
                  htmlFor="companySize"
                  className="block text-sm font-medium text-gray-700 mb-1"
                  data-oid="8a9-j5u"
                >
                  Tamaño de la empresa
                </label>
                <select
                  id="companySize"
                  value={formData.companySize}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  data-oid="sbj7t_u"
                >
                  <option data-oid="4627.x9">1-10 empleados</option>
                  <option data-oid="71hj749">11-50 empleados</option>
                  <option data-oid="fy83.5z">51-200 empleados</option>
                  <option data-oid="fbv1r2n">201-500 empleados</option>
                  <option data-oid="mihsask">501-1000 empleados</option>
                  <option data-oid="d:sfw9a">1000+ empleados</option>
                </select>
              </div>

              <div className="mb-4" data-oid="k7f7mp.">
                <label
                  htmlFor="hearAbout"
                  className="block text-sm font-medium text-gray-700 mb-1"
                  data-oid="9q8vizf"
                >
                  ¿Cómo se enteró de nosotros?
                </label>
                <select
                  id="hearAbout"
                  value={formData.hearAbout}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  data-oid="keodp1-"
                >
                  <option data-oid="364:b6o">Búsqueda en Google</option>
                  <option data-oid="p__6ief">Redes sociales</option>
                  <option data-oid="hq.nx2.">Recomendación</option>
                  <option data-oid="bdwhpia">Publicidad</option>
                  <option data-oid="uep7dpv">Otro</option>
                </select>
              </div>

              <div className="mb-4" data-oid="1-f7cod">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                  data-oid="rjm2szs"
                >
                  ¿Cómo podemos ayudarle?
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  data-oid="izb2o6j"
                ></textarea>
              </div>

              <motion.button
                className="select-button h-10 px-6 py-2 rounded-md text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 w-full md:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContactSubmit}
                data-oid=":v33xnc"
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
            data-oid="md3awgx"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 relative"
              data-oid="xiqizlx"
            >
              Frequently asked questions
              <span
                className="block w-24 h-1 bg-gradient-to-r from-red-500 to-orange-400 mx-auto mt-4"
                data-oid="m3dp25x"
              ></span>
            </h2>

            <div className="space-y-4 max-w-4xl mx-auto" data-oid="-0q0p7e">
              {faqData.map((faq, index) => (
                <motion.div
                  key={index}
                  className={`bg-white rounded-xl border ${openFaqIndex === index ? "border-red-200 shadow-md" : "border-gray-200"} overflow-hidden transition-all duration-300`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  data-oid="7bc7mx."
                >
                  <button
                    className="flex justify-between items-center w-full p-6 text-left"
                    onClick={() => toggleFaq(index)}
                    data-oid="zuu6-2t"
                  >
                    <h3
                      className={`text-xl font-semibold ${openFaqIndex === index ? "text-red-600" : "text-gray-900"}`}
                      data-oid="tw4i__6"
                    >
                      {faq.question}
                    </h3>
                    <div
                      className={`${openFaqIndex === index ? "text-red-500 bg-red-50" : "text-gray-400 bg-gray-50"} rounded-full p-1 transition-colors duration-300`}
                      data-oid="kdi6cr6"
                    >
                      {openFaqIndex === index ? (
                        <ChevronUp className="h-5 w-5" data-oid="u532g1z" />
                      ) : (
                        <ChevronDown className="h-5 w-5" data-oid="tymyyvp" />
                      )}
                    </div>
                  </button>
                  <div
                    className={`transition-all duration-500 ease-in-out ${
                      openFaqIndex === index
                        ? "max-h-[1000px] opacity-100"
                        : "max-h-0 opacity-0 overflow-hidden"
                    }`}
                    data-oid="1oomts_"
                  >
                    <div className="px-6 pb-6 pt-0" data-oid="avnyuuf">
                      <div
                        className="border-t border-gray-200 pt-4 text-left"
                        data-oid="n_gdguo"
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
          <section className="mb-32" data-oid="reakm58">
            <img
              src="/images/female-chauffeur-palm.jpg"
              alt="A chauffeur smiles as she gets out of her vehicle with palm trees in the background"
              className="w-full h-auto rounded-xl shadow-lg object-cover"
              data-oid="i.ne80j"
            />

            <div className="text-center mt-4" data-oid="9e5zy2v">
              <button
                className="text-gray-600 font-medium flex items-center mx-auto hover:text-gray-800 transition-colors"
                data-oid="tg6hqom"
              >
                Desplácese hasta la parte superior de la página
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  data-oid="18qiot3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                    data-oid="45iwdtl"
                  />
                </svg>
              </button>
            </div>
          </section>
        </div>
      </section>

      {/* Footer */}
      <Footer data-oid="lr_1ln2" />
    </div>
  );
};

export default Companies;
