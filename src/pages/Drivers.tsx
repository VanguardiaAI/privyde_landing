import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronDown, ChevronUp, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const Drivers = () => {
  // Estado para controlar qué FAQ está abierta
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Toggle para abrir/cerrar FAQs
  const toggleFaq = (index: number) => {
    if (openFaqIndex === index) {
      setOpenFaqIndex(null);
    } else {
      setOpenFaqIndex(index);
    }
  };

  const handleReservarClick = () => {
    navigate("/login-companies");
  };

  // Datos de las preguntas frecuentes
  const faqData = [
    {
      question: "¿Puede cualquiera convertirse en socio de Privyde?",
      answer: (
        <>
          <p className="text-gray-600 mb-4" data-oid="yf99tfu">
            Solo nos asociamos con empresas de chóferes aseguradas ya
            existentes. Para hacer una solicitud, debe:
          </p>
          <ul
            className="list-disc pl-5 mb-4 space-y-2 text-left"
            data-oid="ry.3jod"
          >
            <li className="text-gray-600 text-left" data-oid="jshhr03">
              Cumplir los nuestros requisitos para los vehículos
            </li>
            <li className="text-gray-600 text-left" data-oid="8:.64fd">
              Enviar la documentación de su negocio, un vehículo y de usted
              mismo o de uno de los chóferes de su empresa
            </li>
          </ul>
          <p className="text-gray-600" data-oid=":us656o">
            Una vez su cuenta esté activa, puede agregar tantos vehículos y
            chóferes como quiera. Puede consultar los requisitos de vehículo y
            documentación de su ciudad y comenzar su solicitud de socio aquí.
          </p>
        </>
      ),
    },
    {
      question: "¿Cuántos viajes puedo hacer al mes con Privyde?",
      answer: (
        <p className="text-gray-600" data-oid="9o1oeqj">
          La cantidad de viajes que realice depende totalmente de usted. Puede
          aceptar tantos viajes como su capacidad permita. El volumen de viajes
          ofrecido depende de la demanda regional y estacional.
        </p>
      ),
    },
    {
      question: "¿Cómo recibo los pagos?",
      answer: (
        <>
          <p className="text-gray-600" data-oid="ealvhq:">
            Al principio de cada mes, le enviaremos una factura con los detalles
            de todos los viajes realizados el mes anterior. Su factura también
            incluirá cualquier compensación adicional por extras, como el tiempo
            de espera o los cambios de ruta.
          </p>
          <p className="text-gray-600 mt-3" data-oid="vphxw9g">
            Los pagos se realizan mediante transferencia bancaria y suelen
            aparecer en su cuenta antes del 17 de cada mes.
          </p>
        </>
      ),
    },
    {
      question: "¿Qué vehículos puedo usar para trabajar con Privyde?",
      answer: (
        <p className="text-gray-600" data-oid="rrnxq3r">
          Solo pueden usarse determinados vehículos para los viajes de Privyde.
          Los requisitos del vehículo pueden variar según la ciudad en la que
          trabaje, y puede encontrar la lista de vehículos que necesita aquí. No
          tiene más que seleccionar el país y la ciudad sobre los que desea
          obtener más información.
        </p>
      ),
    },
    {
      question: "¿Cómo puedo asociarme con Blackane?",
      answer: (
        <>
          <p className="text-gray-600" data-oid="zfwggu.">
            Nuestro proceso de solicitud de asociación nos ayuda a encontrar los
            mejores servicios de chófer profesional disponibles. Solo trabajamos
            con empresas de chófer aseguradas y con licencia, y nuestros
            requisitos de documentación se basan en las normativas locales, por
            lo que no debería necesitar ningún papeleo adicional para comenzar.
          </p>
          <p className="text-gray-600 mt-3" data-oid="zk9:mim">
            Una vez aprobada su documentación, el último paso del proceso de
            registro consistirá en participar en una sesión de seminario web en
            grupo en línea. Esta entrevista nos brinda la oportunidad de
            conocernos y hacer preguntas sobre nuestras expectativas mutuas
            respecto a nuestra nueva asociación. Después del seminario web,
            ¡estará listo para comenzar!
          </p>
          <p className="text-gray-600 mt-3" data-oid="jaix.ul">
            Puede comenzar su solicitud de asociación aquí.
          </p>
        </>
      ),
    },
    {
      question: "¿Funciona Privyde con vehículos eléctricos?",
      answer: (
        <>
          <p className="text-gray-600" data-oid="lori9sh">
            ¡Sí! En algunos mercados, los clientes pueden solicitar vehículos
            eléctricos específicamente y, en muchos otros, pasan a formar parte
            de nuestra flota regular. Además, nuestra flota en Dubai es ahora
            completamente eléctrica.
          </p>
          <p className="text-gray-600 mt-3" data-oid="qdakk5v">
            Animamos a invertir en vehículos eléctricos, no solo porque es mejor
            para su huella de carbono, sino porque la demanda de los clientes
            está aumentando, junto con los precios de los combustibles fósiles.
          </p>
          <p className="text-gray-600 mt-3" data-oid="b0rpxzb">
            Solo se pueden utilizar vehículos totalmente eléctricos para
            realizar viajes con vehículos eléctricos. Los modelos eléctricos
            aceptados pueden variar según la ciudad en la que trabaje; puede
            encontrar la lista de vehículos que necesita aquí.
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="bg-white" data-oid="l8h13pj">
      {/* Navigation */}
      <Navbar data-oid="y5wtgq-" />

      {/* SECCIÓN HERO - COMPLETAMENTE INDEPENDIENTE */}
      <section className="relative w-full bg-gray-900" data-oid="ioiao4e">
        {/* Overlay para mejorar visibilidad - AJUSTADO PARA HACERLO MÁS LIGERO */}
        <div
          className="absolute inset-0 bg-black/50 z-10"
          data-oid="e.rj_4d"
        ></div>

        {/* Imagen de fondo */}
        <img
          src="/images/airport.jpeg"
          alt="Chófer esperando a un cliente"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-70"
          data-oid="rs_9h9g"
        />

        {/* Contenido del hero con animaciones */}
        <div
          className="relative z-20 container mx-auto px-6 py-20 md:py-32"
          data-oid="9rrmp9f"
        >
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            data-oid="15w_5rx"
          >
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              data-oid="q:8okys"
            >
              Conviértase en socio de
              <motion.span
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text text-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                data-oid="6_u._gr"
              >
                servicios de chófer
              </motion.span>
            </h1>

            <motion.button
              className="select-button h-12 px-8 py-3 rounded-md text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 mt-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReservarClick}
              data-oid="q4bvkb."
            >
              Reservar ahora
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* SECCIÓN DE CONTENIDO PRINCIPAL - COMPLETAMENTE SEPARADA DEL HERO */}
      <section className="bg-white py-20" data-oid="jt4v910">
        <div className="container mx-auto px-6 max-w-6xl" data-oid="v9it.4f">
          {/* Sección de introducción con testimonial */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            data-oid="vsz6ykl"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
              data-oid="6qt42ra"
            >
              Haga crecer su negocio con Privyde
              <span
                className="block w-24 h-1 bg-black mx-auto mt-4"
                data-oid="s3eq_hn"
              ></span>
            </h2>
            <p
              className="text-lg text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed"
              data-oid="4bklvgd"
            >
              La aplicación y el portal web de Privyde conectan a los socios de
              servicio chófer con licencia y seguro con una base de clientes
              global de viajeros de negocios y ocio. Puede completar algún hueco
              de su horario o incluso podríamos convertirnos en su principal
              fuente de viajes. Nuestros precios competitivos normalmente se
              ajustan a las tarifas del mercado local, y nuestro compromiso
              inquebrantable con la calidad nos permite ofrecer tarifas justas a
              los chóferes, al tiempo que garantiza un servicio excepcional a
              los pasajeros.
            </p>
            <motion.div
              className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-xl mb-10 max-w-4xl mx-auto shadow-sm border border-gray-200 transform transition-all duration-300 hover:shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              data-oid="crt3iow"
            >
              <blockquote
                className="italic text-xl text-gray-700 mb-4 relative"
                data-oid="8qq.:xc"
              >
                <span
                  className="text-5xl text-gray-400 absolute -top-6 -left-2"
                  data-oid="0ewixf."
                >
                  "
                </span>
                Privyde is 60% of my revenue. I've grown from 2 to 20 chauffeurs
                and have 10 vehicles from working with them.
                <span
                  className="text-5xl text-gray-400 absolute -bottom-10 -right-2"
                  data-oid="17ml5o0"
                >
                  "
                </span>
              </blockquote>
              <p
                className="text-right font-medium mt-2 text-gray-800"
                data-oid="43k22lb"
              >
                Angel T., Privyde chauffeur, Madrid
              </p>
            </motion.div>
          </motion.div>

          {/* Main Content - AHORA COMPLETAMENTE SEPARADO DEL HERO */}
          <div
            className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 max-w-6xl"
            data-oid="jjzfng:"
          >
            {/* Benefits Grid with Improved Design */}
            <motion.section
              className="mb-32"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              data-oid="92.g4-h"
            >
              <div
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                data-oid="3zor1uq"
              >
                <motion.div
                  className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  data-oid="q8gr3xz"
                >
                  <div
                    className="text-black mb-6 bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center"
                    data-oid="gz9069e"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      data-oid="j5fbe2:"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        data-oid="xx02eyc"
                      />
                    </svg>
                  </div>
                  <h3
                    className="text-xl font-semibold mb-4 text-gray-900"
                    data-oid="1-3pi57"
                  >
                    Pagos fiables
                  </h3>
                  <p
                    className="text-gray-600 leading-relaxed"
                    data-oid="isrndfz"
                  >
                    La cantidad que se muestra en cada oferta es el mínimo que
                    se transferirá a su cuenta; no deducimos más tarifas ni
                    impuestos. Los pagos mensuales de sus viajes completados se
                    depositarán directamente en su cuenta bancaria.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  data-oid=":i7dqku"
                >
                  <div
                    className="text-black mb-6 bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center"
                    data-oid="4vzr442"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      data-oid="y90wz.1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        data-oid="6uth7l3"
                      />
                    </svg>
                  </div>
                  <h3
                    className="text-xl font-semibold mb-4 text-gray-900"
                    data-oid="ad_73q:"
                  >
                    Control completo de horarios
                  </h3>
                  <p
                    className="text-gray-600 leading-relaxed"
                    data-oid="o9lqm3v"
                  >
                    Seleccione sus viajes a través de nuestra subasta inversa.
                    Cree su propio horario y simplemente realice los viajes que
                    mejor se adapten a su disponibilidad, ubicación y tipo de
                    vehículo. ¡Ofrecemos reservas por horas, viajes de ciudad a
                    ciudad y mucho más!
                  </p>
                </motion.div>

                <motion.div
                  className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  data-oid="8xh01bi"
                >
                  <div
                    className="text-black mb-6 bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center"
                    data-oid="-p9apg:"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      data-oid="tt0a99v"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        data-oid="2vv79w9"
                      />
                    </svg>
                  </div>
                  <h3
                    className="text-xl font-semibold mb-4 text-gray-900"
                    data-oid="ftq80_b"
                  >
                    Únase a un equipo internacional
                  </h3>
                  <p
                    className="text-gray-600 leading-relaxed"
                    data-oid="gm24o-:"
                  >
                    Como miembro del equipo de Privyde, podrá decir que forma
                    parte de un servicio internacional, ya que organizamos
                    viajes para nuestros socios y sus huéspedes en más de 50
                    países.
                  </p>
                </motion.div>
              </div>
            </motion.section>

            {/* Requirements Section with Enhanced Design */}
            <motion.section
              className="mb-32 bg-gradient-to-br from-gray-50 to-gray-100 p-10 rounded-2xl shadow-sm"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              data-oid="m-1pz9e"
            >
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                data-oid="iy3_v.a"
              >
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  data-oid="akyd6wq"
                >
                  <img
                    src="/images/limo-equipaje.png"
                    alt="Chófer poniendo equipaje en el maletero"
                    className="w-full h-auto rounded-xl shadow-lg object-cover"
                    data-oid="2d-xxsu"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  data-oid="ige6spj"
                >
                  <h2
                    className="text-3xl font-bold text-gray-900 mb-8 relative"
                    data-oid="v3ilv7j"
                  >
                    Requisitos
                    <span
                      className="block w-16 h-1 bg-black mt-4"
                      data-oid="estmh44"
                    ></span>
                  </h2>
                  <ul className="space-y-6 mb-8" data-oid="xatfz2o">
                    <li className="flex items-start" data-oid="d-hholr">
                      <CheckCircle
                        className="h-6 w-6 text-black mr-3 mt-0.5 flex-shrink-0"
                        data-oid="lzjdmaj"
                      />

                      <span
                        className="text-gray-700 text-left"
                        data-oid="5o_h9-u"
                      >
                        Poseer un registro de empresa válido, licencias y
                        seguros para todos los chóferes y vehículos.
                      </span>
                    </li>
                    <li className="flex items-start" data-oid="_4v43v_">
                      <CheckCircle
                        className="h-6 w-6 text-black mr-3 mt-0.5 flex-shrink-0"
                        data-oid="9akynfe"
                      />

                      <span
                        className="text-gray-700 text-left"
                        data-oid="cgcyqow"
                      >
                        Mantener los vehículos limpios, sin daños, libres de
                        humo y en pleno cumplimiento de las regulaciones
                        locales.
                      </span>
                    </li>
                    <li className="flex items-start" data-oid="1q9d6t-">
                      <CheckCircle
                        className="h-6 w-6 text-black mr-3 mt-0.5 flex-shrink-0"
                        data-oid="01bgnee"
                      />

                      <span
                        className="text-gray-700 text-left"
                        data-oid="s2fbwso"
                      >
                        Mantenerse al día con las nuevas normas y políticas y
                        garantizar una calidad excelente.
                      </span>
                    </li>
                  </ul>
                  <p className="text-gray-600 mb-8 italic" data-oid="hyvvy.d">
                    Los detalles varían según la ubicación, consulte los
                    requisitos específicos de su área:
                  </p>
                  <motion.button
                    className="select-button h-12 px-8 py-3 rounded-md text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    data-oid=":8pu.nl"
                  >
                    Ver requisitos locales
                  </motion.button>
                </motion.div>
              </div>
            </motion.section>

            {/* FAQ Section con animaciones */}
            <motion.section
              className="mb-32"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              data-oid="8w580ci"
            >
              <h2
                className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 relative"
                data-oid="6axb8n3"
              >
                Preguntas más frecuentes
                <span
                  className="block w-24 h-1 bg-black mx-auto mt-4"
                  data-oid="yfa9xoc"
                ></span>
              </h2>

              <div className="space-y-4 max-w-4xl mx-auto" data-oid="g5-vy7.">
                {faqData.map((faq, index) => (
                  <motion.div
                    key={index}
                    className={`bg-white rounded-xl border ${openFaqIndex === index ? "border-gray-200 shadow-md" : "border-gray-200"} overflow-hidden transition-all duration-300`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    data-oid="yeomojt"
                  >
                    <button
                      className="flex justify-between items-center w-full p-6 text-left"
                      onClick={() => toggleFaq(index)}
                      data-oid="9cg-6v1"
                    >
                      <h3
                        className={`text-xl font-semibold ${openFaqIndex === index ? "text-gray-600" : "text-gray-900"}`}
                        data-oid="l_5e:hi"
                      >
                        {faq.question}
                      </h3>
                      <div
                        className={`${openFaqIndex === index ? "text-black bg-gray-100" : "text-gray-400 bg-gray-50"} rounded-full p-1 transition-colors duration-300`}
                        data-oid="u4fwad8"
                      >
                        {openFaqIndex === index ? (
                          <ChevronUp className="h-5 w-5" data-oid="5uy2nme" />
                        ) : (
                          <ChevronDown className="h-5 w-5" data-oid="v8:10o9" />
                        )}
                      </div>
                    </button>
                    <div
                      className={`transition-all duration-500 ease-in-out ${
                        openFaqIndex === index
                          ? "max-h-[1000px] opacity-100"
                          : "max-h-0 opacity-0 overflow-hidden"
                      }`}
                      data-oid="e9y3fgo"
                    >
                      <div className="px-6 pb-6 pt-0" data-oid="286t3nr">
                        <div
                          className="border-t border-gray-200 pt-4 text-left"
                          data-oid="3p4hiux"
                        >
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Help Section with Enhanced Design */}
            <motion.section
              className="mb-16 bg-gradient-to-br from-gray-800 to-gray-900 p-10 rounded-2xl shadow-lg text-white"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              data-oid="h.poe4b"
            >
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                data-oid="1-44d9d"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  data-oid="70lgwc5"
                >
                  <img
                    src="/images/ejecutivo-tablet.png"
                    alt="Chófer sonriendo"
                    className="w-full h-auto rounded-xl shadow-lg object-cover border-4 border-white"
                    data-oid="75gcazb"
                  />
                </motion.div>
                <div data-oid="_9-fv60">
                  <h2
                    className="text-3xl font-bold mb-6 relative text-white"
                    data-oid="pzhu1-i"
                  >
                    ¿Todavía tiene alguna pregunta?
                    <span
                      className="block w-16 h-1 text-black mt-4"
                      data-oid="7yfhhwq"
                    ></span>
                  </h2>
                  <p
                    className="text-gray-200 mb-8 leading-relaxed"
                    data-oid="ugzd5q."
                  >
                    Visite nuestro Centro de ayuda para socios para consultar
                    nuestras preguntas frecuentes detalladas o póngase en
                    contacto directamente con nuestro equipo de soporte.
                  </p>
                  <motion.button
                    className="bg-white text-gray-900 font-medium h-12 px-8 py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:bg-gray-100"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    data-oid="fb8nf-i"
                  >
                    Más información
                  </motion.button>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer data-oid="g98u8r:" />
    </div>
  );
};

export default Drivers;
