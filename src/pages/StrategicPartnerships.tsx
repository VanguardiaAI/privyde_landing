import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  Check,
  Globe,
  Shield,
  Users,
  DollarSign,
  Key,
  Leaf,
} from "lucide-react";
import { motion } from "framer-motion";

const StrategicPartnerships = () => {
  const navigate = useNavigate();

  const handleReservarClick = () => {
    navigate("/login-companies");
  };

  return (
    <div className="bg-white" data-oid="7s_9j5d">
      {/* Navigation */}
      <Navbar data-oid="-tzzi_." />

      {/* Hero Section con mejor estructura para móviles */}
      <div
        className="relative bg-gradient-to-r from-gray-900 to-gray-800 overflow-hidden w-full"
        data-oid="fsai3rm"
      >
        {/* Overlay más oscuro para mejorar el contraste */}
        <div
          className="absolute inset-0 bg-black/50 z-10"
          data-oid="q9tx25k"
        ></div>

        {/* Imagen de fondo */}
        <img
          src="/images/limo-airport.png"
          alt="Servicio de chófer de primera clase"
          className="w-full h-[500px] md:h-[600px] object-cover object-center opacity-70"
          data-oid="mgvwrwk"
        />

        {/* Contenido del hero con mejor padding y estructura */}
        <div
          className="absolute inset-0 flex items-center z-20"
          data-oid="yqk_rd4"
        >
          <div
            className="container mx-auto px-6 sm:px-8 lg:px-10 max-w-6xl"
            data-oid="jh-2ij."
          >
            <div className="max-w-3xl" data-oid="7s6c88h">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-8 leading-tight"
                data-oid="9m6xx__"
              >
                Conviértase en socio de
                <span
                  className="inline-block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black"
                  data-oid="vb8l-f_"
                >
                  {" "}
                  Privyde
                </span>
              </h1>

              <motion.button
                className="select-button h-12 px-8 py-3 rounded-md text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 mt-4"
                onClick={handleReservarClick}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-oid="u72g16c"
              >
                Reservar ahora
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - AHORA COMPLETAMENTE SEPARADO DEL HERO */}
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 max-w-6xl"
        data-oid="e45uuqn"
      >
        {/* Aviation Section - COMPLETAMENTE FUERA DEL HERO */}
        <section className="mb-32" data-oid="3-z4mgu">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            data-oid="4k_:3z7"
          >
            <div data-oid="qikf_pv">
              <h2
                className="text-3xl font-bold text-gray-900 mb-8 relative"
                data-oid="glcic8t"
              >
                Aviación
                <span
                  className="block w-16 h-1 bg-black mt-4"
                  data-oid="oq:vy1i"
                ></span>
              </h2>
              <p className="text-lg text-gray-700 mb-6" data-oid="4lh:5d6">
                Ofrezca un servicio de chófer de primera clase para sus
                invitados de Primera y Clase Ejecutiva.
              </p>
              <ul className="space-y-6 mb-8" data-oid="cac9qa1">
                <li className="flex items-start" data-oid="kdhjvj0">
                  <Check
                    className="h-6 w-6 text-black mr-3 mt-0.5 flex-shrink-0"
                    data-oid="tx:bwo."
                  />

                  <span className="text-gray-700 text-left" data-oid="j61s43x">
                    Confíe en un socio de confianza para las principales
                    aerolíneas comerciales
                  </span>
                </li>
                <li className="flex items-start" data-oid="ny1a5.o">
                  <Check
                    className="h-6 w-6 text-black mr-3 mt-0.5 flex-shrink-0"
                    data-oid="jewh14_"
                  />

                  <span className="text-gray-700 text-left" data-oid="qpc:5lg">
                    Atienda a sus pasajeros VIP de aerolíneas a nivel mundial
                  </span>
                </li>
                <li className="flex items-start" data-oid="o-d386f">
                  <Check
                    className="h-6 w-6 text-black mr-3 mt-0.5 flex-shrink-0"
                    data-oid="uestl:t"
                  />

                  <span className="text-gray-700 text-left" data-oid="::t7zn9">
                    Trabaje con soluciones personalizadas para servicios de
                    cortesía, complementarios y para la tripulación
                  </span>
                </li>
              </ul>
            </div>
            <div data-oid="vhf5fln">
              <img
                src="/images/B4B-Aviation-Card.jpg"
                alt="Servicio de chófer para aviación"
                className="w-full h-auto rounded-xl shadow-lg object-cover"
                data-oid="pse-hzn"
              />
            </div>
          </div>
        </section>

        {/* Cruise Section */}
        <section className="mb-32" data-oid="7up1hn1">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            data-oid="knb0l91"
          >
            <div className="order-2 md:order-1" data-oid="w91jv4d">
              <h2
                className="text-3xl font-bold text-gray-900 mb-8 relative"
                data-oid="wkzup:i"
              >
                Cruceros
                <span
                  className="block w-16 h-1 bg-black mt-4"
                  data-oid="9_s_5_o"
                ></span>
              </h2>
              <p className="text-lg text-gray-700 mb-6" data-oid=":z90gxn">
                Eleve la experiencia de sus invitados con un traslado con
                chófer.
              </p>
              <ul className="space-y-6 mb-8" data-oid="lp_uv0f">
                <li className="flex items-start" data-oid="bkce_yx">
                  <Check
                    className="h-6 w-6 text-black mr-3 mt-0.5 flex-shrink-0"
                    data-oid="v0y13n8"
                  />

                  <span className="text-gray-700 text-left" data-oid="o7sztmx">
                    Ofrezca a sus invitados una experiencia fluida de puerta a
                    puerta
                  </span>
                </li>
                <li className="flex items-start" data-oid="r3l-lxu">
                  <Check
                    className="h-6 w-6 text-black mr-3 mt-0.5 flex-shrink-0"
                    data-oid="ht4:rc_"
                  />

                  <span className="text-gray-700 text-left" data-oid="4a1x3o6">
                    Aproveche nuestra experiencia local con recogidas en puertos
                    y aeropuertos
                  </span>
                </li>
                <li className="flex items-start" data-oid="g7d09hl">
                  <Check
                    className="h-6 w-6 text-black mr-3 mt-0.5 flex-shrink-0"
                    data-oid="h0cw7a4"
                  />

                  <span className="text-gray-700 text-left" data-oid="9.sk4oj">
                    Solución de reserva de viajes de cortesía con marca blanca
                    disponible
                  </span>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2" data-oid="pplr8uj">
              <img
                src="/images/B4B-TA-Happy-Clients.jpg"
                alt="Servicio de chófer para cruceros"
                className="w-full h-auto rounded-xl shadow-lg object-cover"
                data-oid="6-nw15f"
              />
            </div>
          </div>
        </section>

        {/* Financial Services Section */}
        <section className="mb-32" data-oid="zsowdna">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            data-oid="bh1yd0b"
          >
            <div data-oid="856v5e7">
              <h2
                className="text-3xl font-bold text-gray-900 mb-8 relative"
                data-oid="xgbbqo2"
              >
                Servicios financieros
                <span
                  className="block w-16 h-1 bg-black mt-4"
                  data-oid="8:r_.0_"
                ></span>
              </h2>
              <p className="text-lg text-gray-700 mb-6" data-oid="zoi8.4c">
                Ofrezca beneficios de valor añadido a sus miembros titulares de
                tarjetas de alto poder adquisitivo.
              </p>
              <ul className="space-y-6 mb-8" data-oid="acw6raz">
                <li className="flex items-start" data-oid="bw55s8b">
                  <Check
                    className="h-6 w-6 text-black mr-3 mt-0.5 flex-shrink-0"
                    data-oid="jw7yyi0"
                  />

                  <span className="text-gray-700 text-left" data-oid="hddgysd">
                    Reserva de traslado de cortesía para viajes aéreos
                  </span>
                </li>
                <li className="flex items-start" data-oid="psjds1-">
                  <Check
                    className="h-6 w-6 text-black mr-3 mt-0.5 flex-shrink-0"
                    data-oid="csh5914"
                  />

                  <span className="text-gray-700 text-left" data-oid=".nt91-p">
                    Ofertas mejoradas para servicios pagados por miembros
                    titulares de tarjetas
                  </span>
                </li>
                <li className="flex items-start" data-oid="7ovq9m4">
                  <Check
                    className="h-6 w-6 text-black mr-3 mt-0.5 flex-shrink-0"
                    data-oid="un-0h_r"
                  />

                  <span className="text-gray-700 text-left" data-oid="0-qvx8k">
                    Equipo de soporte con experiencia en atención a clientes de
                    alto valor en el sector financiero
                  </span>
                </li>
              </ul>
            </div>
            <div data-oid="ph:b9cu">
              <img
                src="/images/Business-Traveler-Dubai.jpg"
                alt="Servicio de chófer para servicios financieros"
                className="w-full h-auto rounded-xl shadow-lg object-cover"
                data-oid="qwv.u_0"
              />
            </div>
          </div>
        </section>

        {/* Hotel Section */}
        <section className="mb-32" data-oid="0-6x:wz">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            data-oid="luky-5n"
          >
            <div className="order-2 md:order-1" data-oid="ra53i37">
              <h2
                className="text-3xl font-bold text-gray-900 mb-8 relative"
                data-oid="_gqv89e"
              >
                Hoteles
                <span
                  className="block w-16 h-1 bg-black mt-4"
                  data-oid="gfapczs"
                ></span>
              </h2>
              <p className="text-lg text-gray-700 mb-6" data-oid="y3c-kb3">
                Extienda la hospitalidad y brinde experiencias de viaje
                excepcionales más allá de las puertas del hotel.
              </p>
              <ul className="space-y-6 mb-8" data-oid="lwfmziw">
                <li className="flex items-start" data-oid="5jiyhjj">
                  <Check
                    className="h-6 w-6 text-black mr-3 mt-0.5 flex-shrink-0"
                    data-oid="7m_9lty"
                  />

                  <span className="text-gray-700 text-left" data-oid="lkok2-4">
                    Ofrezca a sus huéspedes de alto valor traslados gratuitos al
                    aeropuerto
                  </span>
                </li>
                <li className="flex items-start" data-oid="m4ml_tx">
                  <Check
                    className="h-6 w-6 text-black mr-3 mt-0.5 flex-shrink-0"
                    data-oid="xez755h"
                  />

                  <span className="text-gray-700 text-left" data-oid="uywvodo">
                    Proporcione a los huéspedes excursiones y visitas por la
                    ciudad utilizando nuestro servicio por horas
                  </span>
                </li>
                <li className="flex items-start" data-oid="ab_a0u7">
                  <Check
                    className="h-6 w-6 text-black mr-3 mt-0.5 flex-shrink-0"
                    data-oid="bsf1q5h"
                  />

                  <span className="text-gray-700 text-left" data-oid="9b1cflc">
                    Confíe en nuestra experiencia global en la atención a
                    viajeros de todo el mundo
                  </span>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2" data-oid="9vri2wf">
              <img
                src="/images/Pict-Dubai.jpg"
                alt="Servicio de chófer para hoteles"
                className="w-full h-auto rounded-xl shadow-lg object-cover"
                data-oid="5d._o-m"
              />
            </div>
          </div>
        </section>

        {/* Business Benefits Section */}
        <section className="mb-32" data-oid="l_w:p80">
          <h2
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 relative"
            data-oid="ry-:cas"
          >
            Experimente nuestros beneficios para empresas
            <span
              className="block w-24 h-1 bg-black mx-auto mt-4"
              data-oid="ul9igi2"
            ></span>
          </h2>
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            data-oid="85m51va"
          >
            <div
              className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
              data-oid="qgv-n6:"
            >
              <div
                className="text-black mb-6 bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center"
                data-oid="nxj7ug0"
              >
                <Globe className="h-10 w-10" data-oid="nyt2zld" />
              </div>
              <h3
                className="text-xl font-semibold mb-4 text-gray-900"
                data-oid="-t:vy_b"
              >
                Cobertura global
              </h3>
              <p className="text-gray-600 leading-relaxed" data-oid="q.6j9i2">
                Servicio consistente y fiable en más de 50 países en todo el
                mundo. Experiencia local garantizada.
              </p>
            </div>

            <div
              className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
              data-oid="9a0e71v"
            >
              <div
                className="text-black mb-6 bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center"
                data-oid="5-o2caw"
              >
                <Shield className="h-10 w-10" data-oid="g9jug6q" />
              </div>
              <h3
                className="text-xl font-semibold mb-4 text-gray-900"
                data-oid="c3emct0"
              >
                Cumplimiento y seguridad
              </h3>
              <p className="text-gray-600 leading-relaxed" data-oid="iyahyk3">
                Viaje con confianza en vehículos premium limpios conducidos por
                profesionales con licencia y asegurados.
              </p>
            </div>

            <div
              className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
              data-oid="c.vxabk"
            >
              <div
                className="text-black mb-6 bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center"
                data-oid="-ovb46v"
              >
                <Users className="h-10 w-10" data-oid="i4aj.x_" />
              </div>
              <h3
                className="text-xl font-semibold mb-4 text-gray-900"
                data-oid="jmd5-4b"
              >
                Soporte prioritario
              </h3>
              <p className="text-gray-600 leading-relaxed" data-oid="-bwv2ks">
                Equipo de soporte dedicado disponible 24/7 para cualquier
                necesidad diaria y requisitos en el sitio.
              </p>
            </div>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            data-oid="w13xt7g"
          >
            <div
              className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
              data-oid="c0t2mag"
            >
              <div
                className="text-black mb-6 bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center"
                data-oid=":0zxgut"
              >
                <DollarSign className="h-10 w-10" data-oid="on:nw2x" />
              </div>
              <h3
                className="text-xl font-semibold mb-4 text-gray-900"
                data-oid="qzodkvz"
              >
                Precios competitivos
              </h3>
              <p className="text-gray-600 leading-relaxed" data-oid="vhx-r.8">
                Precios todo incluido basados en la distancia más corta posible
                y fijados en el momento de la reserva.
              </p>
            </div>

            <div
              className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
              data-oid="zec2p1a"
            >
              <div
                className="text-black mb-6 bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center"
                data-oid="j-_i_2v"
              >
                <Key className="h-10 w-10" data-oid="5d98t.a" />
              </div>
              <h3
                className="text-xl font-semibold mb-4 text-gray-900"
                data-oid="u34q6bv"
              >
                Soluciones empresariales personalizadas
              </h3>
              <p className="text-gray-600 leading-relaxed" data-oid="0.4-pbr">
                Integre fácilmente soluciones llave en mano personalizadas a
                través de una API para gestionar servicios complementarios.
              </p>
            </div>

            <div
              className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
              data-oid="dqj4h:n"
            >
              <div
                className="text-black mb-6 bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center"
                data-oid="vkw-.ss"
              >
                <Leaf className="h-10 w-10" data-oid="5mc09gk" />
              </div>
              <h3
                className="text-xl font-semibold mb-4 text-gray-900"
                data-oid="mt6:t5-"
              >
                Viajes sostenibles
              </h3>
              <p className="text-gray-600 leading-relaxed" data-oid="4ky15no">
                ¡Ofrecemos con orgullo una variedad de vehículos eléctricos en
                ciudades seleccionadas y nos aseguramos de que nuestra huella de
                carbono sea compensada!
              </p>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section
          className="mb-32 bg-gradient-to-br from-gray-50 to-gray-100 p-10 rounded-2xl shadow-sm"
          data-oid="_ejp.9q"
        >
          <div className="max-w-4xl mx-auto" data-oid="qxofq_0">
            <blockquote
              className="text-xl text-gray-700 mb-8 relative italic"
              data-oid="m10o:9a"
            >
              <span
                className="text-5xl text-gray-400 absolute -top-6 -left-2"
                data-oid="aut938g"
              >
                "
              </span>
              <p className="ml-8" data-oid="su95520">
                Emirates está comprometida a extender su calidad premium.
                Ofrecemos servicio de chófer gratuito a nuestros clientes de
                Primera y Clase Ejecutiva en más de 75 ciudades en todo el mundo
                y, gracias a la presencia global de Privyde, podemos ofrecer
                esto en más destinos.
              </p>
              <span
                className="text-5xl text-gray-400 absolute -bottom-10 -right-2"
                data-oid="rybuz6z"
              >
                "
              </span>
            </blockquote>
            <div className="text-right mt-6" data-oid="denw1t5">
              <p className="font-medium text-gray-900" data-oid="75qytbk">
                Bill McPherson
              </p>
              <p className="text-gray-600" data-oid="hupuc2t">
                Emirates Airlines, Anterior Vicepresidente, Servicios
                Aeroportuarios (Estaciones externas)
              </p>
            </div>
          </div>
        </section>

        {/* API Integration Section */}
        <section className="mb-32" data-oid="a8-.v7j">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            data-oid="vffocip"
          >
            <div data-oid="z_65crc">
              <h2
                className="text-3xl font-bold text-gray-900 mb-8 relative"
                data-oid="75v0k.y"
              >
                Explore nuestras integraciones API
                <span
                  className="block w-16 h-1 bg-black mt-4"
                  data-oid=":5u-kfm"
                ></span>
              </h2>
              <p
                className="text-gray-600 mb-8 leading-relaxed"
                data-oid="ojh:pxh"
              >
                Desde reservas instantáneas hasta cancelaciones simplificadas,
                nuestras integraciones de vanguardia con plataformas de reserva
                globales hacen que los viajes corporativos sean sin esfuerzo.
                Sincronice, escale y simplifique, sin perder el ritmo.
              </p>
              <ul className="space-y-6 mb-8" data-oid="reeogth">
                <li className="flex items-start" data-oid="gylviqx">
                  <Check
                    className="h-6 w-6 text-black mr-3 mt-0.5 flex-shrink-0"
                    data-oid="cferj0z"
                  />

                  <span className="text-gray-700 text-left" data-oid="yhfn73x">
                    Integración global GDS: Reserve y gestione viajes a través
                    de Sabre, Amadeus y Travelport con funcionalidad completa.
                  </span>
                </li>
                <li className="flex items-start" data-oid="lsa998i">
                  <Check
                    className="h-6 w-6 text-black mr-3 mt-0.5 flex-shrink-0"
                    data-oid="dlanxtq"
                  />

                  <span className="text-gray-700 text-left" data-oid="jmey84r">
                    Compatibilidad con OBT principales: Aproveche herramientas
                    como SAP Concur y Navan para reservas en tiempo real,
                    integradas directamente en sus flujos de trabajo existentes.
                  </span>
                </li>
                <li className="flex items-start" data-oid="r0x:9_v">
                  <Check
                    className="h-6 w-6 text-black mr-3 mt-0.5 flex-shrink-0"
                    data-oid="gb02_ph"
                  />

                  <span className="text-gray-700 text-left" data-oid="tbl3isd">
                    Acceso instantáneo, actualizaciones en tiempo real: Precios
                    en vivo, disponibilidad y detalles del viaje lo mantienen en
                    control y a sus clientes en curso, sin importar el destino.
                  </span>
                </li>
              </ul>
              <button
                className="select-button h-12 px-8 py-3 rounded-md text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center"
                data-oid=":9a:_jv"
              >
                Más información
                <ArrowRight className="ml-2 h-5 w-5" data-oid="41of-y8" />
              </button>
            </div>
            <div data-oid="o1e-m-f">
              <img
                src="/images/cityscape-sunset.jpg"
                alt="Vista nocturna de la ciudad"
                className="w-full h-auto rounded-xl shadow-lg object-cover"
                data-oid="2o_uc1k"
              />
            </div>
          </div>
        </section>

        {/* Awards Section */}
        <section className="mb-32 text-center" data-oid="b_8jro7">
          <h2
            className="text-3xl font-bold text-gray-900 mb-12 relative"
            data-oid=":1xjapn"
          >
            Servicio de chófer premiado
            <span
              className="block w-24 h-1 bg-black mx-auto mt-4"
              data-oid="o:guv.w"
            ></span>
          </h2>
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            data-oid="9-0cpei"
          >
            <div
              className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300 flex flex-col items-center"
              data-oid="wa2y3lf"
            >
              <img
                src="/images/B2B-Icon-Lux.jpg"
                alt="Leaders in Luxury"
                className="h-24 w-auto mb-6"
                data-oid="ebvzgkg"
              />

              <p className="text-gray-600" data-oid="w6tskff">
                Leaders in Luxury
              </p>
            </div>

            <div
              className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300 flex flex-col items-center"
              data-oid="h04rq.e"
            >
              <img
                src="/images/B2B-Award-2024-Business.jpg"
                alt="Business Travel Awards Europe 2024"
                className="h-24 w-auto mb-6"
                data-oid="olb:x:g"
              />

              <p className="text-gray-600" data-oid="ey_awit">
                Business Travel Awards Europe 2024
              </p>
            </div>

            <div
              className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300 flex flex-col items-center"
              data-oid="56d6ywy"
            >
              <img
                src="/images/B2B-Award-2024-World.jpg"
                alt="World Travel Awards 2024"
                className="h-24 w-auto mb-6"
                data-oid="mt9q6.5"
              />

              <p className="text-gray-600" data-oid="j-2ajgo">
                World Travel Awards 2024
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section - Call to Action */}
        <section
          className="mb-16 bg-gradient-to-br from-gray-800 to-gray-900 p-10 rounded-2xl shadow-lg text-white"
          data-oid="c72ypcb"
        >
          <div className="text-center max-w-3xl mx-auto" data-oid="8c6:zk_">
            <h2
              className="text-3xl font-bold mb-6 text-white"
              data-oid="2od:bx8"
            >
              Únase como socio de chófer hoy.
            </h2>
            <p className="text-gray-300 mb-8 text-lg" data-oid="mntj-.:">
              ¿Posee o gestiona vehículos premium? Hablemos.
            </p>
            <Link
              to="/drivers"
              className="bg-white text-gray-900 font-medium h-12 px-8 py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300 inline-block"
              data-oid="p1qj6u8"
            >
              Conviértase en socio de chófer
            </Link>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer data-oid="nn_r-fd" />
    </div>
  );
};

export default StrategicPartnerships;
