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
    <div className="bg-white" data-oid="fw8f8r-">
      {/* Navigation */}
      <Navbar data-oid="cs4tulq" />

      {/* Hero Section con mejor estructura para móviles */}
      <div
        className="relative bg-gradient-to-r from-gray-900 to-gray-800 overflow-hidden w-full"
        data-oid="efz:e1d"
      >
        {/* Overlay más oscuro para mejorar el contraste */}
        <div
          className="absolute inset-0 bg-black/50 z-10"
          data-oid="7wb5phl"
        ></div>

        {/* Imagen de fondo */}
        <img
          src="/images/limo-airport.png"
          alt="Servicio de chófer de primera clase"
          className="w-full h-[500px] md:h-[600px] object-cover object-center opacity-70"
          data-oid="9clyg30"
        />

        {/* Contenido del hero con mejor padding y estructura */}
        <div
          className="absolute inset-0 flex items-center z-20"
          data-oid="fclr1s5"
        >
          <div
            className="container mx-auto px-6 sm:px-8 lg:px-10 max-w-6xl"
            data-oid="_tcq2vk"
          >
            <div className="max-w-3xl" data-oid="vjx17kj">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-8 leading-tight"
                data-oid="cjig3fk"
              >
                Conviértase en socio de
                <span
                  className="inline-block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black"
                  data-oid="ek-f.o0"
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
                data-oid="_xxxb2_"
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
        data-oid="4xrn:g1"
      >
        {/* Aviation Section - COMPLETAMENTE FUERA DEL HERO */}
        <section className="mb-32" data-oid="s462nq2">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            data-oid="s513es."
          >
            <div data-oid="9vpjv2g">
              <h2
                className="text-3xl font-bold text-gray-900 mb-8 relative"
                data-oid="xbpdcej"
              >
                Aviación
                <span
                  className="block w-16 h-1 bg-black mt-4"
                  data-oid="uqqb-.z"
                ></span>
              </h2>
              <p className="text-lg text-gray-700 mb-6" data-oid="_dahg4x">
                Ofrezca un servicio de chófer de primera clase para sus
                invitados de Primera y Clase Ejecutiva.
              </p>
              <ul className="space-y-6 mb-8" data-oid="tnf_3j:">
                <li className="flex items-start" data-oid="7b6-0vg">
                  <Check
                    className="h-6 w-6 text-black mr-3 mt-0.5 flex-shrink-0"
                    data-oid="t51n.d4"
                  />

                  <span className="text-gray-700 text-left" data-oid="l__iku3">
                    Confíe en un socio de confianza para las principales
                    aerolíneas comerciales
                  </span>
                </li>
                <li className="flex items-start" data-oid="ldojt93">
                  <Check
                    className="h-6 w-6 text-black mr-3 mt-0.5 flex-shrink-0"
                    data-oid="x60c689"
                  />

                  <span className="text-gray-700 text-left" data-oid="2xcnano">
                    Atienda a sus pasajeros VIP de aerolíneas a nivel mundial
                  </span>
                </li>
                <li className="flex items-start" data-oid="-ivgytz">
                  <Check
                    className="h-6 w-6 text-black mr-3 mt-0.5 flex-shrink-0"
                    data-oid="5p-6dfz"
                  />

                  <span className="text-gray-700 text-left" data-oid="aj0t1_:">
                    Trabaje con soluciones personalizadas para servicios de
                    cortesía, complementarios y para la tripulación
                  </span>
                </li>
              </ul>
            </div>
            <div data-oid="wfx_.0j">
              <img
                src="/images/B4B-Aviation-Card.jpg"
                alt="Servicio de chófer para aviación"
                className="w-full h-auto rounded-xl shadow-lg object-cover"
                data-oid="mqwokd."
              />
            </div>
          </div>
        </section>

        {/* Cruise Section */}
        <section className="mb-32" data-oid="qf6x16n">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            data-oid="nkgog1v"
          >
            <div className="order-2 md:order-1" data-oid="y:2susm">
              <h2
                className="text-3xl font-bold text-gray-900 mb-8 relative"
                data-oid="v01.1c:"
              >
                Cruceros
                <span
                  className="block w-16 h-1 bg-black mt-4"
                  data-oid="c8_25ez"
                ></span>
              </h2>
              <p className="text-lg text-gray-700 mb-6" data-oid="94g44d_">
                Eleve la experiencia de sus invitados con un traslado con
                chófer.
              </p>
              <ul className="space-y-6 mb-8" data-oid="rtewx2z">
                <li className="flex items-start" data-oid="054cuzu">
                  <Check
                    className="h-6 w-6 text-black mr-3 mt-0.5 flex-shrink-0"
                    data-oid="y5loihl"
                  />

                  <span className="text-gray-700 text-left" data-oid="w1_gznm">
                    Ofrezca a sus invitados una experiencia fluida de puerta a
                    puerta
                  </span>
                </li>
                <li className="flex items-start" data-oid="jhlxg1x">
                  <Check
                    className="h-6 w-6 text-black mr-3 mt-0.5 flex-shrink-0"
                    data-oid="d0d6yvo"
                  />

                  <span className="text-gray-700 text-left" data-oid="j-h-end">
                    Aproveche nuestra experiencia local con recogidas en puertos
                    y aeropuertos
                  </span>
                </li>
                <li className="flex items-start" data-oid="1hyz70x">
                  <Check
                    className="h-6 w-6 text-black mr-3 mt-0.5 flex-shrink-0"
                    data-oid="qc5k-z:"
                  />

                  <span className="text-gray-700 text-left" data-oid="g2ggyh8">
                    Solución de reserva de viajes de cortesía con marca blanca
                    disponible
                  </span>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2" data-oid="ok15p4w">
              <img
                src="/images/B4B-TA-Happy-Clients.jpg"
                alt="Servicio de chófer para cruceros"
                className="w-full h-auto rounded-xl shadow-lg object-cover"
                data-oid="h_8eukv"
              />
            </div>
          </div>
        </section>

        {/* Financial Services Section */}
        <section className="mb-32" data-oid="f0utdg3">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            data-oid="slnp9m."
          >
            <div data-oid="a.l4iy4">
              <h2
                className="text-3xl font-bold text-gray-900 mb-8 relative"
                data-oid=":uyyqu9"
              >
                Servicios financieros
                <span
                  className="block w-16 h-1 bg-black mt-4"
                  data-oid="f0ckljt"
                ></span>
              </h2>
              <p className="text-lg text-gray-700 mb-6" data-oid="w1h:s3s">
                Ofrezca beneficios de valor añadido a sus miembros titulares de
                tarjetas de alto poder adquisitivo.
              </p>
              <ul className="space-y-6 mb-8" data-oid="13oi0:c">
                <li className="flex items-start" data-oid="oe3gkdv">
                  <Check
                    className="h-6 w-6 text-black mr-3 mt-0.5 flex-shrink-0"
                    data-oid="n288_10"
                  />

                  <span className="text-gray-700 text-left" data-oid="utlx16x">
                    Reserva de traslado de cortesía para viajes aéreos
                  </span>
                </li>
                <li className="flex items-start" data-oid="t.74dx1">
                  <Check
                    className="h-6 w-6 text-black mr-3 mt-0.5 flex-shrink-0"
                    data-oid="12zzv40"
                  />

                  <span className="text-gray-700 text-left" data-oid="3016b.m">
                    Ofertas mejoradas para servicios pagados por miembros
                    titulares de tarjetas
                  </span>
                </li>
                <li className="flex items-start" data-oid=".nkx:kb">
                  <Check
                    className="h-6 w-6 text-black mr-3 mt-0.5 flex-shrink-0"
                    data-oid=".:zzhy8"
                  />

                  <span className="text-gray-700 text-left" data-oid="lbjvliy">
                    Equipo de soporte con experiencia en atención a clientes de
                    alto valor en el sector financiero
                  </span>
                </li>
              </ul>
            </div>
            <div data-oid="gitu6e9">
              <img
                src="/images/Business-Traveler-Dubai.jpg"
                alt="Servicio de chófer para servicios financieros"
                className="w-full h-auto rounded-xl shadow-lg object-cover"
                data-oid="q5hbc3x"
              />
            </div>
          </div>
        </section>

        {/* Hotel Section */}
        <section className="mb-32" data-oid="zdu6sqz">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            data-oid="p808u.f"
          >
            <div className="order-2 md:order-1" data-oid="mx-igtx">
              <h2
                className="text-3xl font-bold text-gray-900 mb-8 relative"
                data-oid="_:bp3rv"
              >
                Hoteles
                <span
                  className="block w-16 h-1 bg-black mt-4"
                  data-oid="ffq-2n2"
                ></span>
              </h2>
              <p className="text-lg text-gray-700 mb-6" data-oid="038mlyb">
                Extienda la hospitalidad y brinde experiencias de viaje
                excepcionales más allá de las puertas del hotel.
              </p>
              <ul className="space-y-6 mb-8" data-oid="f8xj5lx">
                <li className="flex items-start" data-oid="1ir4jz.">
                  <Check
                    className="h-6 w-6 text-black mr-3 mt-0.5 flex-shrink-0"
                    data-oid="ia3ot06"
                  />

                  <span className="text-gray-700 text-left" data-oid="ksu8.a:">
                    Ofrezca a sus huéspedes de alto valor traslados gratuitos al
                    aeropuerto
                  </span>
                </li>
                <li className="flex items-start" data-oid="-tvmd_1">
                  <Check
                    className="h-6 w-6 text-black mr-3 mt-0.5 flex-shrink-0"
                    data-oid="g6z5gnp"
                  />

                  <span className="text-gray-700 text-left" data-oid="b8_ikia">
                    Proporcione a los huéspedes excursiones y visitas por la
                    ciudad utilizando nuestro servicio por horas
                  </span>
                </li>
                <li className="flex items-start" data-oid="5d6g5vp">
                  <Check
                    className="h-6 w-6 text-black mr-3 mt-0.5 flex-shrink-0"
                    data-oid="a78j:1c"
                  />

                  <span className="text-gray-700 text-left" data-oid="gidv.-z">
                    Confíe en nuestra experiencia global en la atención a
                    viajeros de todo el mundo
                  </span>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2" data-oid="l9zgg:f">
              <img
                src="/images/Pict-Dubai.jpg"
                alt="Servicio de chófer para hoteles"
                className="w-full h-auto rounded-xl shadow-lg object-cover"
                data-oid="fwf564l"
              />
            </div>
          </div>
        </section>

        {/* Business Benefits Section */}
        <section className="mb-32" data-oid="xpk..ig">
          <h2
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 relative"
            data-oid="gzqh5vb"
          >
            Experimente nuestros beneficios para empresas
            <span
              className="block w-24 h-1 bg-black mx-auto mt-4"
              data-oid="1uo5jb0"
            ></span>
          </h2>
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            data-oid="fs__fr7"
          >
            <div
              className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
              data-oid="9-0puzp"
            >
              <div
                className="text-black mb-6 bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center"
                data-oid="keh_xw3"
              >
                <Globe className="h-10 w-10" data-oid="g-tz4ta" />
              </div>
              <h3
                className="text-xl font-semibold mb-4 text-gray-900"
                data-oid="itp1n0b"
              >
                Cobertura global
              </h3>
              <p className="text-gray-600 leading-relaxed" data-oid="30tf:y4">
                Servicio consistente y fiable en más de 50 países en todo el
                mundo. Experiencia local garantizada.
              </p>
            </div>

            <div
              className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
              data-oid="dhdmd3n"
            >
              <div
                className="text-black mb-6 bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center"
                data-oid="u4:9tef"
              >
                <Shield className="h-10 w-10" data-oid="47xqmbs" />
              </div>
              <h3
                className="text-xl font-semibold mb-4 text-gray-900"
                data-oid=".ppcw.r"
              >
                Cumplimiento y seguridad
              </h3>
              <p className="text-gray-600 leading-relaxed" data-oid="pt:xd6z">
                Viaje con confianza en vehículos premium limpios conducidos por
                profesionales con licencia y asegurados.
              </p>
            </div>

            <div
              className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
              data-oid="ft_igcz"
            >
              <div
                className="text-black mb-6 bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center"
                data-oid="z5kl112"
              >
                <Users className="h-10 w-10" data-oid="npmy3lg" />
              </div>
              <h3
                className="text-xl font-semibold mb-4 text-gray-900"
                data-oid="wtdhz25"
              >
                Soporte prioritario
              </h3>
              <p className="text-gray-600 leading-relaxed" data-oid="-congf6">
                Equipo de soporte dedicado disponible 24/7 para cualquier
                necesidad diaria y requisitos en el sitio.
              </p>
            </div>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            data-oid="_se0d.y"
          >
            <div
              className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
              data-oid="bijm-p0"
            >
              <div
                className="text-black mb-6 bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center"
                data-oid="s32n1q5"
              >
                <DollarSign className="h-10 w-10" data-oid="ayaeijq" />
              </div>
              <h3
                className="text-xl font-semibold mb-4 text-gray-900"
                data-oid="6e6j1t5"
              >
                Precios competitivos
              </h3>
              <p className="text-gray-600 leading-relaxed" data-oid="7zu1y6z">
                Precios todo incluido basados en la distancia más corta posible
                y fijados en el momento de la reserva.
              </p>
            </div>

            <div
              className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
              data-oid="xq7n702"
            >
              <div
                className="text-black mb-6 bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center"
                data-oid=".e_8xl0"
              >
                <Key className="h-10 w-10" data-oid="25p8mdh" />
              </div>
              <h3
                className="text-xl font-semibold mb-4 text-gray-900"
                data-oid="5-3q1ps"
              >
                Soluciones empresariales personalizadas
              </h3>
              <p className="text-gray-600 leading-relaxed" data-oid="3rj.tj6">
                Integre fácilmente soluciones llave en mano personalizadas a
                través de una API para gestionar servicios complementarios.
              </p>
            </div>

            <div
              className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
              data-oid="kdkpa2k"
            >
              <div
                className="text-black mb-6 bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center"
                data-oid="qxsvxnm"
              >
                <Leaf className="h-10 w-10" data-oid="4ddrf0j" />
              </div>
              <h3
                className="text-xl font-semibold mb-4 text-gray-900"
                data-oid="in30spz"
              >
                Viajes sostenibles
              </h3>
              <p className="text-gray-600 leading-relaxed" data-oid="j2qmd_o">
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
          data-oid="v91e3lx"
        >
          <div className="max-w-4xl mx-auto" data-oid="3uy8i18">
            <blockquote
              className="text-xl text-gray-700 mb-8 relative italic"
              data-oid="d:.ncb4"
            >
              <span
                className="text-5xl text-gray-400 absolute -top-6 -left-2"
                data-oid="cz7luw_"
              >
                "
              </span>
              <p className="ml-8" data-oid="h.502ga">
                Emirates está comprometida a extender su calidad premium.
                Ofrecemos servicio de chófer gratuito a nuestros clientes de
                Primera y Clase Ejecutiva en más de 75 ciudades en todo el mundo
                y, gracias a la presencia global de Privyde, podemos ofrecer
                esto en más destinos.
              </p>
              <span
                className="text-5xl text-gray-400 absolute -bottom-10 -right-2"
                data-oid="5k42qw3"
              >
                "
              </span>
            </blockquote>
            <div className="text-right mt-6" data-oid="eiuztm7">
              <p className="font-medium text-gray-900" data-oid="255pzqx">
                Bill McPherson
              </p>
              <p className="text-gray-600" data-oid="g2la3cl">
                Emirates Airlines, Anterior Vicepresidente, Servicios
                Aeroportuarios (Estaciones externas)
              </p>
            </div>
          </div>
        </section>

        {/* API Integration Section */}
        <section className="mb-32" data-oid="i6vx6xa">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            data-oid="50qsims"
          >
            <div data-oid="627evpz">
              <h2
                className="text-3xl font-bold text-gray-900 mb-8 relative"
                data-oid="k4q3cm_"
              >
                Explore nuestras integraciones API
                <span
                  className="block w-16 h-1 bg-black mt-4"
                  data-oid="1zzkenf"
                ></span>
              </h2>
              <p
                className="text-gray-600 mb-8 leading-relaxed"
                data-oid="qp7y6i_"
              >
                Desde reservas instantáneas hasta cancelaciones simplificadas,
                nuestras integraciones de vanguardia con plataformas de reserva
                globales hacen que los viajes corporativos sean sin esfuerzo.
                Sincronice, escale y simplifique, sin perder el ritmo.
              </p>
              <ul className="space-y-6 mb-8" data-oid="18wj_ae">
                <li className="flex items-start" data-oid="nyeofgf">
                  <Check
                    className="h-6 w-6 text-black mr-3 mt-0.5 flex-shrink-0"
                    data-oid="99ghx5c"
                  />

                  <span className="text-gray-700 text-left" data-oid="gv7uq_0">
                    Integración global GDS: Reserve y gestione viajes a través
                    de Sabre, Amadeus y Travelport con funcionalidad completa.
                  </span>
                </li>
                <li className="flex items-start" data-oid="3u1izt7">
                  <Check
                    className="h-6 w-6 text-black mr-3 mt-0.5 flex-shrink-0"
                    data-oid="jaax923"
                  />

                  <span className="text-gray-700 text-left" data-oid="g2e7b7r">
                    Compatibilidad con OBT principales: Aproveche herramientas
                    como SAP Concur y Navan para reservas en tiempo real,
                    integradas directamente en sus flujos de trabajo existentes.
                  </span>
                </li>
                <li className="flex items-start" data-oid="7elw_hv">
                  <Check
                    className="h-6 w-6 text-black mr-3 mt-0.5 flex-shrink-0"
                    data-oid="73u12ma"
                  />

                  <span className="text-gray-700 text-left" data-oid=".42ou3p">
                    Acceso instantáneo, actualizaciones en tiempo real: Precios
                    en vivo, disponibilidad y detalles del viaje lo mantienen en
                    control y a sus clientes en curso, sin importar el destino.
                  </span>
                </li>
              </ul>
              <button
                className="select-button h-12 px-8 py-3 rounded-md text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center"
                data-oid="-k5yj66"
              >
                Más información
                <ArrowRight className="ml-2 h-5 w-5" data-oid="n7o4ur4" />
              </button>
            </div>
            <div data-oid="wjjqv28">
              <img
                src="/images/cityscape-sunset.jpg"
                alt="Vista nocturna de la ciudad"
                className="w-full h-auto rounded-xl shadow-lg object-cover"
                data-oid="gg5f2hb"
              />
            </div>
          </div>
        </section>

        {/* Awards Section */}
        <section className="mb-32 text-center" data-oid="0f.s9.y">
          <h2
            className="text-3xl font-bold text-gray-900 mb-12 relative"
            data-oid="0cgihpe"
          >
            Servicio de chófer premiado
            <span
              className="block w-24 h-1 bg-black mx-auto mt-4"
              data-oid="kykutjm"
            ></span>
          </h2>
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            data-oid="4l71880"
          >
            <div
              className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300 flex flex-col items-center"
              data-oid=":qo71s-"
            >
              <img
                src="/images/B2B-Icon-Lux.jpg"
                alt="Leaders in Luxury"
                className="h-24 w-auto mb-6"
                data-oid="o-8bpx6"
              />

              <p className="text-gray-600" data-oid="kzppir_">
                Leaders in Luxury
              </p>
            </div>

            <div
              className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300 flex flex-col items-center"
              data-oid="zov-682"
            >
              <img
                src="/images/B2B-Award-2024-Business.jpg"
                alt="Business Travel Awards Europe 2024"
                className="h-24 w-auto mb-6"
                data-oid="0:s5v0o"
              />

              <p className="text-gray-600" data-oid=".se-67p">
                Business Travel Awards Europe 2024
              </p>
            </div>

            <div
              className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300 flex flex-col items-center"
              data-oid="93zr0_k"
            >
              <img
                src="/images/B2B-Award-2024-World.jpg"
                alt="World Travel Awards 2024"
                className="h-24 w-auto mb-6"
                data-oid="johqd2l"
              />

              <p className="text-gray-600" data-oid="hr9100_">
                World Travel Awards 2024
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section - Call to Action */}
        <section
          className="mb-16 bg-gradient-to-br from-gray-800 to-gray-900 p-10 rounded-2xl shadow-lg text-white"
          data-oid="xqvukls"
        >
          <div className="text-center max-w-3xl mx-auto" data-oid="jibwfn_">
            <h2
              className="text-3xl font-bold mb-6 text-white"
              data-oid="tu514ab"
            >
              Únase como socio de chófer hoy.
            </h2>
            <p className="text-gray-300 mb-8 text-lg" data-oid="fq_95:h">
              ¿Posee o gestiona vehículos premium? Hablemos.
            </p>
            <Link
              to="/drivers"
              className="bg-white text-gray-900 font-medium h-12 px-8 py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300 inline-block"
              data-oid="c2incrp"
            >
              Conviértase en socio de chófer
            </Link>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer data-oid="7slrr6v" />
    </div>
  );
};

export default StrategicPartnerships;
