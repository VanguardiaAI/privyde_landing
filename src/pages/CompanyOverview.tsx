import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const CompanyOverview = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleReservarClick = () => {
    navigate("/login-companies");
  };

  return (
    <div className="bg-white" data-oid="ygj6y:l">
      {/* Navigation */}
      <Navbar data-oid="9z9-73c" />

      {/* SECCIÓN HERO - COMPLETAMENTE INDEPENDIENTE */}
      <section className="relative w-full bg-gray-900" data-oid="-hd4h._">
        {/* Overlay para mejorar visibilidad - AJUSTADO PARA HACERLO MÁS LIGERO */}
        <div
          className="absolute inset-0 bg-black/50 z-10"
          data-oid="mn67b9b"
        ></div>

        {/* Imagen de fondo */}
        <img
          src="/images/ejecutivo-tablet.png"
          alt="Ejecutivo usando tablet en el asiento trasero de un Mercedes-Benz"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-70"
          data-oid="usqy65-"
        />

        {/* Contenido del hero con animaciones */}
        <div
          className="relative z-20 container mx-auto px-6 py-20 md:py-32"
          data-oid="h.m2hng"
        >
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            data-oid="5qw42e-"
          >
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              data-oid="fmrzioa"
            >
              Descubra servicios de transporte corporativo
              <motion.span
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                data-oid="gzkx0zr"
              >
                fiables
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
              data-oid="szo.s2j"
            >
              Reservar ahora
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* SECCIÓN DE CONTENIDO PRINCIPAL - COMPLETAMENTE SEPARADA DEL HERO */}
      <section className="bg-white py-20" data-oid="ifj9eg9">
        <div className="container mx-auto px-6 max-w-6xl" data-oid="vpkrmaq">
          {/* Sección de introducción con subtítulo */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            data-oid="-rxnc77"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
              data-oid="gqiqkq."
            >
              Servicios de chófer a nivel mundial galardonados
              <span
                className="block w-24 h-1 bg-black mx-auto mt-4"
                data-oid="95fr.4n"
              ></span>
            </h2>

            {/* Services Grid with 3 Items */}
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16"
              data-oid="xcy8cbw"
            >
              {/* Service 1 */}
              <motion.div
                className="bg-white p-0 rounded-xl overflow-hidden border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300 flex flex-col"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                data-oid="4hler2n"
              >
                <div className="w-full h-60 overflow-hidden" data-oid=":4piy8.">
                  <img
                    src="/images/chauffeur-waiting-client.jpg"
                    alt="Chófer esperando al cliente junto al coche"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    data-oid="mn-oum:"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow" data-oid="niz53kh">
                  <h3
                    className="text-xl font-semibold mb-4 text-gray-900"
                    data-oid="wt:4arn"
                  >
                    Viaje de negocios
                  </h3>
                  <p
                    className="text-gray-600 leading-relaxed mb-6 flex-grow"
                    data-oid="a4x655f"
                  >
                    No importa si se trata de reuniones con clientes, viajes de
                    negocios o asistencias a conferencias, cubriremos sus
                    necesidades de transporte corporativo.
                  </p>
                  <Link
                    to="#"
                    className="flex items-center text-black font-medium hover:text-gray-600 group transition-colors duration-300"
                    data-oid="yyfsd1r"
                  >
                    Descubra los viajes corporativos
                    <ArrowRight
                      className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                      data-oid="qpbjgsk"
                    />
                  </Link>
                </div>
              </motion.div>

              {/* Service 2 */}
              <motion.div
                className="bg-white p-0 rounded-xl overflow-hidden border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300 flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                data-oid="7g-iokd"
              >
                <div className="w-full h-60 overflow-hidden" data-oid="59z72_v">
                  <img
                    src="/images/chauffeur-opening-door.jpg"
                    alt="Chófer abriendo la puerta para el cliente"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    data-oid="f9ymea2"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow" data-oid="nzvvrhy">
                  <h3
                    className="text-xl font-semibold mb-4 text-gray-900"
                    data-oid="uoedaf8"
                  >
                    Agencias de viajes
                  </h3>
                  <p
                    className="text-gray-600 leading-relaxed mb-6 flex-grow"
                    data-oid="3_hdupw"
                  >
                    Agregue una fuente de ingresos adicional a su agencia de
                    viajes ofreciendo experiencias memorables de principio a fin
                    a sus clientes.
                  </p>
                  <Link
                    to="#"
                    className="flex items-center text-black font-medium hover:text-gray-600 group transition-colors duration-300"
                    data-oid="oq-8-y2"
                  >
                    Descubra los servicios de agencia de viajes
                    <ArrowRight
                      className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                      data-oid="hw7e8aq"
                    />
                  </Link>
                </div>
              </motion.div>

              {/* Service 3 */}
              <motion.div
                className="bg-white p-0 rounded-xl overflow-hidden border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300 flex flex-col"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                data-oid="k:v-a_1"
              >
                <div className="w-full h-60 overflow-hidden" data-oid="gh3z9_9">
                  <img
                    src="/images/chauffeur-door-view.jpg"
                    alt="Vista desde arriba del chófer abriendo la puerta"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    data-oid="41c1_ss"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow" data-oid="9ag3tx2">
                  <h3
                    className="text-xl font-semibold mb-4 text-gray-900"
                    data-oid="3n7k:.s"
                  >
                    Servicios complementarios
                  </h3>
                  <p
                    className="text-gray-600 leading-relaxed mb-6 flex-grow"
                    data-oid="m8as.y4"
                  >
                    Ofrezca a sus clientes un valioso servicio de transporte de
                    lujo con nuestras soluciones empresariales personalizadas y
                    una asistencia prioritaria.
                  </p>
                  <Link
                    to="#"
                    className="flex items-center text-black font-medium hover:text-gray-600 group transition-colors duration-300"
                    data-oid=":dvj5qs"
                  >
                    Descubra las alianzas estratégicas
                    <ArrowRight
                      className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                      data-oid="fyhnwfb"
                    />
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.section
            className="mb-32 bg-gradient-to-br from-gray-50 to-gray-100 p-12 rounded-2xl shadow-sm text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            data-oid="i23d-c3"
          >
            <h2
              className="text-3xl font-bold text-gray-900 mb-6"
              data-oid="y150v:8"
            >
              ¿Comenzamos?
            </h2>
            <p
              className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
              data-oid="3j67013"
            >
              Comience hoy mismo y cree su propia cuenta en unos minutos.
            </p>
            <motion.button
              className="select-button h-12 px-8 py-3 rounded-md text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReservarClick}
              data-oid="1ae0rf:"
            >
              Reservar ahora
            </motion.button>
          </motion.section>

          {/* Testimonial Section */}
          <motion.section
            className="mb-32"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            data-oid="p1fa70l"
          >
            <div
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-12 rounded-xl mb-10 max-w-4xl mx-auto shadow-lg"
              data-oid="31petgq"
            >
              <blockquote
                className="italic text-xl text-white mb-6 relative"
                data-oid="s4htoun"
              >
                <span
                  className="text-5xl text-gray-400 absolute -top-6 -left-2"
                  data-oid="o5n2g90"
                >
                  "
                </span>
                I can always rely on Privyde to provide our customers with a
                reliable, professional, and elegant service, with new and clean
                vehicles that always leave a good impression.
                <span
                  className="text-5xl text-gray-400 absolute -bottom-10 -right-2"
                  data-oid="lmw-fij"
                >
                  "
                </span>
              </blockquote>
              <p
                className="text-right font-medium mt-2 text-gray-200"
                data-oid="xx6q64o"
              >
                Witta Wette, Project Manager, American Express Meetings & Events
              </p>
            </div>
          </motion.section>

          {/* Why Choose Us Section */}
          <motion.section
            className="mb-32"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            data-oid=".v:69wb"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16 relative"
              data-oid="28gg78o"
            >
              ¿Por qué elegir Privyde?
              <span
                className="block w-24 h-1 bg-black mx-auto mt-4"
                data-oid="us_edyt"
              ></span>
            </h2>

            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
              data-oid="gka6wpf"
            >
              {/* Feature 1 */}
              <motion.div
                className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                data-oid="_a2fq:8"
              >
                <div
                  className="text-black mb-6 bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center"
                  data-oid="8adsn0j"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    data-oid="kra.j6n"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      data-oid="kwyq53u"
                    />
                  </svg>
                </div>
                <h3
                  className="text-xl font-semibold mb-4 text-gray-900"
                  data-oid="1f6:7zb"
                >
                  Fiabilidad global
                </h3>
                <p className="text-gray-600 leading-relaxed" data-oid="45obce3">
                  Cuente con una confirmación inmediata y un servicio de alta
                  calidad para sus clientes en más de 50 países.
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                data-oid="b3ijii0"
              >
                <div
                  className="text-black mb-6 bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center"
                  data-oid="doa467k"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    data-oid="3kn0z4g"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      data-oid="v4posc."
                    />
                  </svg>
                </div>
                <h3
                  className="text-xl font-semibold mb-4 text-gray-900"
                  data-oid="buv7s_z"
                >
                  Precios competitivos
                </h3>
                <p className="text-gray-600 leading-relaxed" data-oid="w5kgr4r">
                  Acceda a un servicio de primera calidad a precios basados en
                  la distancia que son justos para usted y para nuestros
                  chóferes.
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                data-oid="20k8ogc"
              >
                <div
                  className="text-black mb-6 bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center"
                  data-oid="b5:sc.8"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    data-oid="islsxlz"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      data-oid=":yl.soz"
                    />
                  </svg>
                </div>
                <h3
                  className="text-xl font-semibold mb-4 text-gray-900"
                  data-oid="13zwjnz"
                >
                  Flexibilidad incomparable
                </h3>
                <p className="text-gray-600 leading-relaxed" data-oid="2rc3f4m">
                  Diga adiós al estrés a la hora de gestionar viajes de negocios
                  con nuestras políticas de cancelación flexibles.
                </p>
              </motion.div>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              data-oid="zz0:2xa"
            >
              {/* Feature 4 */}
              <motion.div
                className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                data-oid="lu0n-ic"
              >
                <div
                  className="text-black mb-6 bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center"
                  data-oid="8..m-:4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    data-oid="bd2zym-"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      data-oid="40e-u0f"
                    />
                  </svg>
                </div>
                <h3
                  className="text-xl font-semibold mb-4 text-gray-900"
                  data-oid="z-sl94i"
                >
                  Asistencia prioritaria
                </h3>
                <p className="text-gray-600 leading-relaxed" data-oid="pjduq5u">
                  Nuestros clientes corporativos siempre reciben asistencia
                  multilingüe 24/7.
                </p>
              </motion.div>

              {/* Feature 5 */}
              <motion.div
                className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                data-oid="6:pxe0i"
              >
                <div
                  className="text-black mb-6 bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center"
                  data-oid="7g1q6l-"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    data-oid="qa_rwux"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      data-oid="vqfa-vn"
                    />
                  </svg>
                </div>
                <h3
                  className="text-xl font-semibold mb-4 text-gray-900"
                  data-oid="e12j2r."
                >
                  Gestión de viajes simplificada
                </h3>
                <p className="text-gray-600 leading-relaxed" data-oid="-qhvj5b">
                  Nuestro portal de reservas a medida hace que la gestión de
                  viajes sea rápida y fácil.
                </p>
              </motion.div>

              {/* Feature 6 */}
              <motion.div
                className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                data-oid=".05w_vf"
              >
                <div
                  className="text-black mb-6 bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center"
                  data-oid="9m33248"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    data-oid="o4htbax"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      data-oid="ud7952-"
                    />
                  </svg>
                </div>
                <h3
                  className="text-xl font-semibold mb-4 text-gray-900"
                  data-oid="tacmyhh"
                >
                  Sostenibilidad
                </h3>
                <p className="text-gray-600 leading-relaxed" data-oid="as2_9up">
                  Estamos orgullosos de ofrecer una variedad de vehículos
                  eléctricos. Además, nos aseguramos de compensar nuestra huella
                  de carbono.
                </p>
              </motion.div>
            </div>
          </motion.section>

          {/* Contact Section */}
          <motion.section
            className="mb-16 bg-gradient-to-br from-gray-50 to-gray-100 p-12 rounded-2xl shadow-sm text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            data-oid="ilsm7kl"
          >
            <h2
              className="text-3xl font-bold text-gray-900 mb-6"
              data-oid="u0teq9s"
            >
              ¿Tiene alguna pregunta?
            </h2>
            <p
              className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
              data-oid="9sj0v1b"
            >
              Contáctanos
            </p>
            <motion.button
              className="select-button h-12 px-8 py-3 rounded-md text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReservarClick}
              data-oid="941n_h:"
            >
              Reservar ahora
            </motion.button>
          </motion.section>
        </div>
      </section>

      {/* Footer */}
      <Footer data-oid="eb27mpr" />
    </div>
  );
};

export default CompanyOverview;
