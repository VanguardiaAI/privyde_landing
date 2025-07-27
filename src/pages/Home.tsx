import { ShieldCheck, CarFront, Leaf } from "lucide-react";
import Image from "@/components/ui/image";
import BookingForm from "@/components/booking-form";
import DownloadSection from "@/components/download-section";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SupportChat from "@/components/SupportChat";
import "../styles/privyde.css";
import { Link } from "react-router-dom";

const servicesData = [
  {
    id: 0,
    title: "Viajes de ciudad a ciudad",
    description:
      "Servicio de coche de larga distancia con chófer para viajes entre ciudades con tarifas fijas y todo incluido.",
    imageUrl: "/images/city2city.jpeg",
    linkText: "Más información",
    linkHref: "/city-to-city",
  },
  {
    id: 1,
    title: "Traslados al aeropuerto",
    description:
      "Con el tiempo de espera adicional y el seguimiento de los vuelos en caso de retrasos, nuestro servicio está optimizado para hacer que cada traslado al aeropuerto sea una brisa.",
    imageUrl: "/images/airport.jpeg",
    linkText: "Más información",
    linkHref: "/airport-transfers",
  },
  {
    id: 2,
    title: "Alquiler por horas y día completo",
    description:
      "Si quieres reservar o contratar a un chófer por horas o un día completo, elige uno de nuestros servicios a medida y disfruta de una flexibilidad total, fiable y cómoda.",
    imageUrl: "/images/hours.jpeg",
    linkText: "Más información",
    linkHref: "/hourly-hire",
  },
  {
    id: 3,
    title: "Servicios para bodas y eventos especiales",
    description:
      "Elegancia y confort para sus celebraciones más importantes, con vehículos de lujo y atención personalizada.",
    imageUrl: "/images/weddings.jpeg",
    linkText: "Más información",
    linkHref: "/special-events",
  },
  {
    id: 4,
    title: "Servicios de limusinas",
    description:
      "Lujo y estilo para sus momentos inolvidables. Disfrute de una experiencia única en nuestras limusinas.",
    imageUrl: "/images/limo.jpeg",
    linkText: "Más información",
    linkHref: "/limousine-service",
  },
  {
    id: 5,
    title: "Jets privados",
    description:
      "Viajes exclusivos y personalizados con la máxima privacidad, eficiencia y confort aéreo.",
    imageUrl: "/images/jet.png",
    linkText: "Más información",
    linkHref: "/private-jets",
  },
  {
    id: 6,
    title: "Traslados corporativos VIP",
    description:
      "Soluciones de transporte ejecutivo para profesionales y empresas, enfocadas en la puntualidad y discreción.",
    imageUrl: "/images/corporative.png",
    linkText: "Más información",
    linkHref: "/corporate-transfers",
  },
  {
    id: 7,
    title: "Servicios de seguridad ejecutiva discreta",
    description:
      "Protección y tranquilidad con nuestros profesionales de seguridad altamente capacitados y discretos.",
    imageUrl: "/images/security.png",
    linkText: "Más información",
    linkHref: "/security-services",
  },
];

const majorCitiesData = [
  {
    id: 1,
    name: "New York",
    description: "21 rutas hacia/desde esta ciudad",
    imageUrl: "/images/newyork.jpg", // Placeholder
  },
  {
    id: 2,
    name: "London",
    description: "25 rutas hacia/desde esta ciudad",
    imageUrl:
      "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80", // Placeholder
  },
  {
    id: 3,
    name: "Paris",
    description: "16 rutas hacia/desde esta ciudad",
    imageUrl:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80", // Placeholder
  },
  {
    id: 4,
    name: "Dubai",
    description: "15 rutas hacia/desde esta ciudad",
    imageUrl: "/images/dubai.jpg", // Placeholder
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
  { id: 3, from: "Paris", to: "Reims", duration: "2h 15m", distance: "145 km" },
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

const featureData = [
  {
    icon: ShieldCheck,
    title: "Viaje seguro y protegido",
    description:
      "Viaje con confianza sabiendo que su seguridad es nuestra prioridad número uno. Los rigurosos estándares de salud y limpieza completan un servicio de primera clase.",
  },
  {
    icon: CarFront,
    title: "Soluciones para viajes privados",
    description:
      "Descubra nuestros servicios integrales de viajes: trayectos de larga distancia, ida o vuelta, por horas, traslados al aeropuerto, y mucho más.",
  },
  {
    icon: Leaf,
    title: "Viaje sostenible",
    description:
      "Todos nuestro trayectos son neutros en emisiones de carbono, como parte de nuestro programa global de compensación de emisiones de carbono iniciado en 2017, el primero de la industria.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden" data-oid="x9g4zem">
      {/* Navigation */}
      <Navbar data-oid="113-ne6" />

      {/* Hero Section */}
      <div className="flex flex-col w-full" data-oid="k0gwhtq">
        {/* Title Bar */}
        <div className="title-bar relative" data-oid="ap6x8g4">
          <div className="container mx-auto px-4 max-w-6xl" data-oid="a7jtzd9">
            <h1 className="text-3xl font-bold text-black" data-oid="0k0zeii">
              Su servicio global de chóferes
            </h1>
          </div>
        </div>

        {/* Image Container */}
        <div className="hero-container relative" data-oid="16tnzo-">
          {/* Background Image */}
          <div className="full-size-background" data-oid=".a69fd7">
            <Image
              src="/images/hero2.png"
              alt="Servicio de chóferes"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
              data-oid="420qdwz"
            />
          </div>

          {/* Booking Widget - Solo visible en pantallas grandes (lg) */}
          <div
            className="booking-widget-container-overlay hidden lg:block"
            data-oid="vlh0jmw"
          >
            <BookingForm data-oid="cn487u7" />
          </div>
        </div>
      </div>

      {/* Booking Widget - Solo visible en tablets y móviles (fuera del hero) */}
      <div
        className="lg:hidden mx-auto px-4 mb-8 mt-6 relative z-30 max-w-6xl"
        data-oid="c-dtilc"
      >
        <div
          className="rounded-xl overflow-hidden"
          style={{
            boxShadow:
              "0 0 8px rgba(255, 255, 255, 0.2), 0 0 4px rgba(255, 255, 255, 0.1), 0 6px 10px rgba(0, 0, 0, 0.15)",
          }}
          data-oid="t7hq4mz"
        >
          <BookingForm data-oid="gxf91mm" />
        </div>
      </div>

      {/* Download Section - Ocupa toda la pantalla */}
      <DownloadSection data-oid="ippkfez" />

      {/* Sustainability Partners & Services Section */}
      <section className="py-12 md:py-20 bg-white" data-oid="locucf2">
        <div className="container mx-auto px-4 max-w-6xl" data-oid="43_wg62">
          {/* Nuestros Servicios Title */}
          <h2
            className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10 md:mb-16"
            data-oid="b5x4mhj"
          >
            Nuestros servicios
          </h2>

          {/* Service Cards Grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            data-oid="mexmzwz"
          >
            {servicesData.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-shadow hover:shadow-xl"
                data-oid="w7jf7n_"
              >
                <div className="relative h-48 w-full" data-oid="e1jdks:">
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    className="object-cover"
                    data-oid="yveyax8"
                  />

                  {/* {service.isNew && (
                  <span className="absolute top-3 right-3 bg-gray-600 text-white text-xs font-semibold px-2.5 py-1 rounded">
                    NUEVO
                  </span>
                  )} */}
                </div>
                <div className="p-5 flex flex-col flex-grow" data-oid="ytdrse8">
                  <h3
                    className="text-lg font-semibold text-gray-900 mb-2"
                    data-oid="8_bgxkv"
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-gray-600 text-sm mb-4 flex-grow"
                    data-oid="yab.0dw"
                  >
                    {service.description}
                  </p>
                  <Link
                    to={service.linkHref || "#"}
                    className="text-gray-600 hover:text-blue-700 font-medium self-start mt-auto"
                    data-oid="szzqivr"
                  >
                    {service.linkText}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* City Routes Section */}
      <section className="py-12 md:py-20 bg-gray-50" data-oid="3cwu0mh">
        <div className="container mx-auto px-4 max-w-6xl" data-oid="274hbak">
          <h2
            className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12 md:mb-16"
            data-oid=".f0sgr8"
          >
            Rutas entre ciudades
          </h2>

          {/* Principales ciudades */}
          <div className="mb-12 md:mb-16" data-oid="-hdxwlv">
            <div
              className="flex justify-between items-center mb-6 md:mb-8"
              data-oid="-_1b-hu"
            >
              <h3
                className="text-2xl font-semibold text-gray-700"
                data-oid="28hnoir"
              >
                Principales ciudades
              </h3>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-700 font-medium"
                data-oid="69y_89w"
              >
                Ver todo
              </a>
            </div>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
              data-oid="fcv5urm"
            >
              {majorCitiesData.map((city) => (
                <div
                  key={city.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-xl"
                  data-oid="o79uf70"
                >
                  <div className="relative h-40 w-full" data-oid="6:4ofpr">
                    {" "}
                    {/* Ajusta la altura según tus imágenes */}
                    <Image
                      src={city.imageUrl}
                      alt={city.name}
                      fill
                      className="object-cover"
                      data-oid=":c1_29f"
                    />
                  </div>
                  <div className="p-4" data-oid="o95g1av">
                    <h4
                      className="text-lg font-semibold text-gray-900 mb-1"
                      data-oid="y5m6zo7"
                    >
                      {city.name}
                    </h4>
                    <p className="text-gray-600 text-sm" data-oid="9uxctsu">
                      {city.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Principales rutas */}
          <div className="mb-12 md:mb-16" data-oid="uh3hzqh">
            <div
              className="flex justify-between items-center mb-6 md:mb-8"
              data-oid="qhgv.la"
            >
              <h3
                className="text-2xl font-semibold text-gray-700"
                data-oid="ebq40l9"
              >
                Principales rutas
              </h3>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-700 font-medium"
                data-oid="p-cgkw4"
              >
                Ver todo
              </a>
            </div>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
              data-oid="6ggmvvf"
            >
              {majorRoutesData.map((route) => (
                <div
                  key={route.id}
                  className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:shadow-md transition-shadow"
                  data-oid="fyj5r6r"
                >
                  <div
                    className="flex items-center justify-between mb-1"
                    data-oid="_7yfum9"
                  >
                    <span
                      className="font-semibold text-gray-800"
                      data-oid="x:hb4_i"
                    >
                      {route.from}
                    </span>
                    <span className="text-gray-500 mx-2" data-oid="98kzpxr">
                      →
                    </span>{" "}
                    {/* Flecha derecha */}
                    <span
                      className="font-semibold text-gray-800"
                      data-oid="yl2wi5a"
                    >
                      {route.to}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm" data-oid="wh2tkxg">
                    {route.duration} &nbsp;&nbsp; {route.distance}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Bar */}
          <div
            className="bg-white rounded-lg shadow-md p-6 md:p-8 flex flex-col md:flex-row justify-between items-center"
            data-oid="8jvs0_k"
          >
            <div data-oid="dj4w-t0">
              <h4
                className="text-lg font-semibold text-gray-800 mb-1"
                data-oid="ky41uc."
              >
                ¿Tiene en mente ruta?
              </h4>
              <p className="text-gray-600" data-oid="i98jsw0">
                Introduzca sus destinos ideales para ver el precio.
              </p>
            </div>
            <Link
              to="/city-to-city"
              className="mt-4 md:mt-0 bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out"
              data-oid="7.5:l7m"
            >
              Reservar un viaje de ciudad a ciudad
            </Link>
          </div>
        </div>
      </section>

      {/* Features, Quote & New Download App Section */}
      <section className="py-12 md:py-20 bg-white" data-oid="oq:uh:w">
        <div className="container mx-auto px-4 max-w-6xl" data-oid="uhg4:3t">
          {/* Features - CORREGIDO */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 mb-16 md:mb-24"
            data-oid="xo02y4z"
          >
            {featureData.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-6 flex flex-col text-left"
                  data-oid="ej7e5x2"
                >
                  <div className="flex items-center mb-3" data-oid="73cwron">
                    <IconComponent
                      className="h-7 w-7 text-black mr-3 flex-shrink-0"
                      data-oid="frlvlc-"
                    />

                    <h3
                      className="text-lg font-semibold text-gray-800"
                      data-oid="ig8g_57"
                    >
                      {feature.title}
                    </h3>
                  </div>
                  <p
                    className="text-gray-600 text-sm leading-relaxed"
                    data-oid="a.:rb8k"
                  >
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Quote */}
          <div
            className="text-center mb-16 md:mb-24 max-w-3xl mx-auto"
            data-oid="akkrsfa"
          >
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 leading-tight"
              data-oid="6j:q2c0"
            >
              "New chauffeur-hailing service seeks to challenge Uber, Lyft in
              city rides"
            </h2>
            <p className="mt-6 text-lg text-gray-600" data-oid="j619g87">
              The Wall Street Journal
            </p>
          </div>

          {/* New Download App Section - COMO EN LA IMAGEN */}
          <div
            className="flex flex-col md:flex-row items-center"
            data-oid="q9f_20c"
          >
            {/* Left Column: Text & Badges */}
            <div
              className="md:w-1/2 text-left mb-10 md:mb-0 md:pr-10"
              data-oid="dkiofdn"
            >
              <h2
                className="text-3xl font-bold text-gray-800 mb-4"
                data-oid="0y.hisc"
              >
                Descargue la aplicación
              </h2>
              <p className="text-gray-600 mb-6" data-oid="p6o-s4y">
                Reserve, cambie o cancele fácilmente los viajes sobre la marcha.
                Piense en ello como tener la tranquilidad al alcance de la mano.
              </p>
              <div className="flex space-x-3" data-oid="_1oqlif">
                {/* Corregidas las rutas de las imágenes */}
                <a
                  href="#"
                  className="hover:opacity-80 transition-opacity"
                  data-oid="2kjo3sy"
                >
                  <Image
                    src="/appstore.png"
                    alt="Download on the App Store"
                    width={130}
                    height={40}
                    data-oid="ymk_ee."
                  />
                </a>
                <a
                  href="#"
                  className="hover:opacity-80 transition-opacity"
                  data-oid="b898d4u"
                >
                  <Image
                    src="/googleplay.png"
                    alt="Get it on Google Play"
                    width={130}
                    height={40}
                    data-oid="2rdq4yv"
                  />
                </a>
              </div>
            </div>

            {/* Right Column: Phone Image */}
            <div
              className="md:w-1/2 flex justify-center md:justify-end"
              data-oid="hmjp5gh"
            >
              {/* Reemplazar con tu imagen real del teléfono */}
              <Image
                src="https://via.placeholder.com/300x600.png?text=App+Screenshot"
                alt="Aplicación móvil"
                width={300}
                height={600}
                className="object-contain max-h-[500px]" // Ajusta max-h según necesites
                data-oid="dgqlwou"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer data-oid="se3p1ld" />

      {/* Support Chat */}
      <SupportChat data-oid="omotin." />
    </main>
  );
}
