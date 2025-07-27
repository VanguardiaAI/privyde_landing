import { useState, useRef } from "react";
import "../App.css";
import Image from "@/components/ui/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingForm from "@/components/booking-form";
import DownloadSection from "@/components/download-section";
import {
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Clock,
  Building,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Star,
} from "lucide-react";

const CorporateTransfers = () => {
  // Estado para controlar qué clase de servicio está seleccionada
  const [activeServiceClass, setActiveServiceClass] = useState<number>(0);

  // Estado para controlar qué FAQ está abierta
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Estado para controlar qué beneficio está seleccionado
  const [activeBenefitIndex, setActiveBenefitIndex] = useState<string>("time");

  // Toggle para abrir/cerrar FAQs
  const toggleFaq = (index: number) => {
    if (openFaqIndex === index) {
      setOpenFaqIndex(null);
    } else {
      setOpenFaqIndex(index);
    }
  };

  // Referencia para el slider
  const sliderRef = useRef<HTMLDivElement>(null);

  // Funciones para manejar el slider
  const handlePrev = () => {
    if (activeServiceClass > 0) {
      setActiveServiceClass(activeServiceClass - 1);
    } else {
      setActiveServiceClass(serviceClasses.length - 1);
    }
  };

  const handleNext = () => {
    if (activeServiceClass < serviceClasses.length - 1) {
      setActiveServiceClass(activeServiceClass + 1);
    } else {
      setActiveServiceClass(0);
    }
  };

  // Datos de clases de servicio para corporativos
  const serviceClasses = [
    {
      id: 1,
      title: "Ejecutivo Premium",
      description: "Mercedes E-Class, BMW Serie 5, Audi A6, o similar",
      capacity: "Capacidad para 3 personas",
      luggage: "Espacio para 2 maletas de cabina y 2 maletines ejecutivos",
      availability: "Disponible en todas las ciudades principales",
      image: "/images/e-class-limo.png",
    },
    {
      id: 2,
      title: "Lujo Corporativo",
      description: "Mercedes S-Class, BMW Serie 7, Audi A8, o similar",
      capacity: "Capacidad para 3 personas",
      luggage: "Espacio para 2 maletas estándar y 2 maletines ejecutivos",
      availability: "Disponible en principales centros financieros",
      image:
        "https://via.placeholder.com/600x350/ccc/fff?text=Lujo+Corporativo",
    },
    {
      id: 3,
      title: "SUV Ejecutiva",
      description: "Mercedes GLE, BMW X5, Range Rover, o similar",
      capacity: "Capacidad para 4 personas",
      luggage: "Espacio para 3 maletas estándar y equipaje de mano",
      availability:
        "Ideal para equipos pequeños con necesidad de mayor espacio",
      image: "https://via.placeholder.com/600x350/ccc/fff?text=SUV+Ejecutiva",
    },
    {
      id: 4,
      title: "Movilidad Grupal",
      description: "Mercedes V-Class, Mercedes Sprinter VIP, o similar",
      capacity: "Capacidad para 6-14 personas",
      luggage: "Amplio espacio para equipaje de todo el equipo",
      availability: "Perfecta para delegaciones y equipos completos",
      image:
        "https://via.placeholder.com/600x350/ccc/fff?text=Movilidad+Grupal",
    },
    {
      id: 5,
      title: "Seguridad Reforzada",
      description: "Mercedes Clase S Guard, BMW Serie 7 Security, o similar",
      capacity: "Capacidad para 3 personas",
      luggage: "Espacio para 2 maletas con compartimentos seguros",
      availability:
        "Disponible para ejecutivos con necesidades de seguridad elevadas",
      image:
        "https://via.placeholder.com/600x350/ccc/fff?text=Seguridad+Reforzada",
    },
    {
      id: 6,
      title: "Eléctrico Ejecutivo",
      description: "Tesla Model S, Mercedes EQS, BMW i7, o similar",
      capacity: "Capacidad para 3 personas",
      luggage: "Espacio para 2 maletas estándar y equipaje de mano",
      availability:
        "Opción sostenible para empresas comprometidas con el medio ambiente",
      image:
        "https://via.placeholder.com/600x350/ccc/fff?text=Eléctrico+Ejecutivo",
    },
  ];

  // Datos para los beneficios corporativos
  const corporateBenefits = {
    time: {
      title: "Optimización del tiempo",
      icon: <Clock className="h-8 w-8 text-black" data-oid="cijtaz6" />,
      points: [
        "Servicio puntual garantizado para nunca perder una reunión",
        "Monitoreo constante del tráfico para seleccionar las rutas más eficientes",
        "Tiempo de espera flexible adaptado a su agenda empresarial",
        "Coordinación perfecta con vuelos, trenes y otros medios de transporte",
        "Planificación y gestión centralizada de todos los desplazamientos",
      ],
    },
    security: {
      title: "Seguridad y confidencialidad",
      icon: <ShieldCheck className="h-8 w-8 text-black" data-oid="-2nn7fa" />,
      points: [
        "Conductores verificados con experiencia en transporte ejecutivo",
        "Vehículos con mantenimiento premium y sistemas de seguridad avanzados",
        "Confidencialidad garantizada en todas las comunicaciones",
        "Acuerdos de confidencialidad disponibles para servicios sensibles",
        "Opciones de vehículos blindados para necesidades especiales",
      ],
    },
    image: {
      title: "Imagen corporativa",
      icon: <Building className="h-8 w-8 text-black" data-oid="0y5vjzo" />,
      points: [
        "Flota impecable que refleja la excelencia de su empresa",
        "Chóferes profesionales con vestimenta formal o corporativa",
        "Posibilidad de personalizar el servicio con su imagen de marca",
        "Recepción VIP para clientes e invitados especiales",
        "Servicio uniforme en todas las ciudades para una experiencia consistente",
      ],
    },
    management: {
      title: "Gestión centralizada",
      icon: <Briefcase className="h-8 w-8 text-black" data-oid="vah1-b1" />,
      points: [
        "Portal corporativo exclusivo para gestionar reservas",
        "Facturación unificada adaptada a sus procesos internos",
        "Informes detallados de uso y costes por departamento",
        "Asignación de centros de coste y proyectos",
        "Integración con sistemas de viajes corporativos existentes",
      ],
    },
  };

  // Testimonios de clientes corporativos
  const testimonials = [
    {
      name: "María González",
      position: "Directora de Operaciones, Global Enterprises",
      text: "Privyde ha transformado nuestra logística ejecutiva. Su servicio es consistente, puntual y verdaderamente premium. Los directivos ahora pueden prepararse para reuniones en el trayecto, aprovechando al máximo cada minuto. Su plataforma de gestión nos permite un control completo sobre gastos y asignaciones.",
      stars: 5,
    },
    {
      name: "Carlos Mendoza",
      position: "CFO, Tech Innovations Inc.",
      text: "Como empresa con operaciones en 8 países, necesitábamos un servicio de transporte que mantuviera el mismo estándar de calidad en todas nuestras ubicaciones. Privyde no solo cumplió esa expectativa sino que la superó. Su sistema centralizado de facturación ha simplificado enormemente nuestra administración.",
      stars: 5,
    },
    {
      name: "Ana Ramírez",
      position: "Directora de Eventos, Premium Consultants",
      text: "Organizamos más de 50 eventos corporativos al año y la logística de traslados siempre era un dolor de cabeza hasta que encontramos Privyde. Su capacidad para gestionar múltiples recogidas y traslados simultáneos es impresionante. Los asistentes siempre destacan el nivel de servicio como un diferencial de nuestros eventos.",
      stars: 5,
    },
  ];

  // Datos de las preguntas frecuentes
  const faqData = [
    {
      question: "¿Cómo puedo establecer una cuenta corporativa?",
      answer: (
        <div className="text-gray-600" data-oid="msgc5yd">
          <p className="mb-2" data-oid="capfkra">
            Establecer una cuenta corporativa con nosotros es un proceso
            sencillo diseñado para adaptarse a sus necesidades empresariales:
          </p>
          <ul className="list-disc pl-5 space-y-1" data-oid="b_6k.0r">
            <li data-oid="hwnmhqd">
              Contacte con nuestro departamento de ventas corporativas a través
              del formulario en esta página
            </li>
            <li data-oid="3f.5kj2">
              Un gestor de cuentas le será asignado para entender sus requisitos
              específicos
            </li>
            <li data-oid="t2:h-ov">
              Configuramos su portal corporativo personalizado y configuramos
              los permisos de usuarios
            </li>
            <li data-oid="djzjy09">
              Establecemos los acuerdos de nivel de servicio (SLAs) y términos
              comerciales
            </li>
            <li data-oid="odaa10d">
              Proporcionamos formación para administradores y usuarios del
              sistema
            </li>
          </ul>
          <p className="mt-2" data-oid="zm15f8f">
            Todo el proceso puede completarse en menos de una semana,
            permitiéndole comenzar a disfrutar de nuestros servicios VIP
            rápidamente.
          </p>
        </div>
      ),
    },
    {
      question: "¿Qué opciones de facturación ofrecen para empresas?",
      answer: (
        <div className="text-gray-600" data-oid="9r:ta4i">
          <p className="mb-2" data-oid="t11ui.c">
            Ofrecemos soluciones de facturación flexibles diseñadas para
            adaptarse a los procesos financieros de su empresa:
          </p>
          <ul className="list-disc pl-5 space-y-1" data-oid="fk14:f7">
            <li data-oid="qc7o23a">
              <strong data-oid="4metmlf">
                Facturación consolidada mensual:
              </strong>{" "}
              Un único documento con todos los servicios del período
            </li>
            <li data-oid=":z.7fgd">
              <strong data-oid="9lu_cig">Facturación por departamento:</strong>{" "}
              Separación de gastos por unidades de negocio o centros de coste
            </li>
            <li data-oid="737kf--">
              <strong data-oid="96_4830">Facturación por proyecto:</strong>{" "}
              Asignación de gastos a proyectos específicos
            </li>
            <li data-oid="zxszcaw">
              <strong data-oid="qqqidc6">Integración con sistemas ERP:</strong>{" "}
              Compatibilidad con SAP, Oracle y otros sistemas empresariales
            </li>
            <li data-oid="iik56sx">
              <strong data-oid="63j8wu6">Múltiples divisas:</strong> Facturación
              en la moneda de su elección
            </li>
          </ul>
          <p className="mt-2" data-oid="g-rjx.n">
            Todas nuestras facturas incluyen informes detallados de uso que
            facilitan la auditoría y control de gastos.
          </p>
        </div>
      ),
    },
    {
      question: "¿Cómo gestionan los cambios de última hora en la agenda?",
      answer: (
        <p className="text-gray-600" data-oid="zo-9pxh">
          Entendemos que los horarios empresariales pueden cambiar rápidamente.
          Nuestro servicio corporativo está diseñado con la flexibilidad como
          prioridad. A través de nuestra aplicación o portal corporativo, puede
          realizar cambios en las reservas hasta 30 minutos antes del servicio
          sin cargos adicionales. Para cambios más inmediatos, contamos con un
          equipo de coordinación disponible 24/7 que se encargará de reorganizar
          su servicio minimizando cualquier impacto. Además, nuestros chóferes
          están capacitados para adaptarse a modificaciones en el itinerario
          durante el servicio, pudiendo extender el tiempo, añadir paradas
          adicionales o cambiar el destino según sea necesario.
        </p>
      ),
    },
    {
      question:
        "¿Ofrecen servicios internacionales para ejecutivos que viajan con frecuencia?",
      answer: (
        <div className="text-gray-600" data-oid="qzl-9.4">
          <p className="mb-2" data-oid="izrvzsd">
            Sí, nuestro servicio corporativo tiene alcance global, ideal para
            ejecutivos con agenda internacional:
          </p>
          <ul className="list-disc pl-5 space-y-1" data-oid="2sp5icb">
            <li data-oid="6x:6j3e">
              Presencia en más de 300 ciudades en 80 países
            </li>
            <li data-oid="w7c5nuj">
              Mismo estándar de calidad y procedimientos en todas las
              ubicaciones
            </li>
            <li data-oid="wrvkw7t">
              Reserva centralizada para todos los destinos
            </li>
            <li data-oid="gikrgc2">
              Chóferes con conocimiento local y dominio de idiomas
            </li>
            <li data-oid="i8p:8:6">
              Coordinación entre diferentes zonas horarias
            </li>
          </ul>
          <p className="mt-2" data-oid="brg4px5">
            Además, ofrecemos paquetes corporativos globales con tarifas
            preferentes para empresas con alto volumen de viajes
            internacionales, garantizando que sus ejecutivos reciban el mismo
            nivel de servicio en cualquier parte del mundo.
          </p>
        </div>
      ),
    },
    {
      question:
        "¿Qué medidas de seguridad implementan para ejecutivos de alto nivel?",
      answer: (
        <div className="text-gray-600" data-oid="40p036w">
          <p className="mb-2" data-oid="ax0jyx9">
            Para ejecutivos con requisitos especiales de seguridad, ofrecemos un
            programa reforzado que incluye:
          </p>
          <ul className="list-disc pl-5 space-y-1" data-oid="0mxjg-3">
            <li data-oid="1gplt61">
              Chóferes con formación en conducción defensiva y evasiva
            </li>
            <li data-oid="b0xgk_b">
              Vehículos blindados de diferentes niveles según necesidades
            </li>
            <li data-oid="t1c_:gq">
              Planificación avanzada de rutas con alternativas pre-establecidas
            </li>
            <li data-oid="vowl_pm">
              Protocolos de comunicación seguros entre el centro de operaciones
              y el vehículo
            </li>
            <li data-oid="2ncbnhk">
              Posibilidad de incorporar personal de seguridad adicional
            </li>
            <li data-oid="vlblw_t">
              Confidencialidad total sobre itinerarios, pasajeros e información
              sensible
            </li>
          </ul>
          <p className="mt-2" data-oid="7qw6r3g">
            Todos estos servicios se implementan de manera discreta, manteniendo
            la apariencia de un servicio premium estándar para no llamar
            atención innecesaria.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white" data-oid="o3r9ok0">
      {/* Navigation */}
      <Navbar data-oid="8u612uj" />

      {/* Hero Section con imagen a ancho completo */}
      <div className="flex flex-col w-full" data-oid=":yqbuj-">
        {/* Title Bar */}
        <div className="title-bar relative" data-oid="fcbyric">
          <div className="container mx-auto px-4" data-oid="o_54o02">
            <h1 className="text-3xl font-bold text-black" data-oid="8s5othq">
              Traslados corporativos VIP
            </h1>
          </div>
        </div>

        {/* Image Container */}
        <div className="hero-container relative" data-oid="xxec89n">
          {/* Background Image */}
          <div className="full-size-background" data-oid="fu8_z31">
            <Image
              src="https://images.unsplash.com/photo-1600320254374-ce2d293c324e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80"
              alt="Ejecutivo entrando a un vehículo de lujo con chófer"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
              data-oid="lp9jsb6"
            />
          </div>

          {/* Booking Widget - Solo visible en pantallas grandes (lg) */}
          <div
            className="booking-widget-container-overlay hidden lg:block"
            data-oid="o458jw2"
          >
            <BookingForm data-oid="ogwc0nk" />
          </div>
        </div>
      </div>

      {/* Booking Widget - Solo visible en tablets y móviles (fuera del hero) */}
      <div
        className="lg:hidden mx-auto px-4 mb-8 mt-6 relative z-30"
        data-oid="x5in421"
      >
        <BookingForm data-oid="i:g2hjd" />
      </div>

      {/* Moments Banner */}
      <div className="bg-gray-100 py-12" data-oid="b0k1b-s">
        <div className="container mx-auto px-4 text-center" data-oid="s8-ktwd">
          <h2
            className="text-3xl font-bold text-gray-900 mb-4"
            data-oid="zwpockj"
          >
            Transporte ejecutivo que refleja la excelencia de su empresa
          </h2>
          <p
            className="text-lg text-gray-700 max-w-3xl mx-auto"
            data-oid="j8sbju1"
          >
            Diseñado exclusivamente para el ámbito corporativo, nuestro servicio
            de transporte ejecutivo combina eficiencia, discreción y confort
            para satisfacer las exigencias del mundo empresarial actual.
          </p>
        </div>
      </div>

      {/* Download Section */}
      <DownloadSection data-oid="ei5uoax" />

      {/* Main Content */}
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 max-w-6xl"
        data-oid="o92-r3t"
      >
        {/* Service Classes Section */}
        <section className="mb-20" data-oid="xzv:qv8">
          <h2
            className="text-3xl font-bold text-center text-gray-900 mb-12 relative"
            data-oid="oy157eg"
          >
            Nuestra flota corporativa
            <span
              className="block w-24 h-1 bg-black mx-auto mt-4"
              data-oid="1cdi0om"
            ></span>
          </h2>

          {/* Slider con flechas de navegación */}
          <div className="relative" ref={sliderRef} data-oid="u04tyxq">
            <div className="overflow-hidden" data-oid="tv2jjfk">
              <div
                className="flex flex-wrap lg:flex-nowrap justify-center"
                data-oid="8e45asu"
              >
                {/* Contenido del slider */}
                <div className="w-full relative" data-oid="bcjqu56">
                  {/* Card principal */}
                  <div
                    className="bg-gray-200 rounded-lg overflow-hidden shadow-lg"
                    data-oid="k5eoacf"
                  >
                    <div className="relative" data-oid="sm2u-:4">
                      {/* Flechas de navegación */}
                      <button
                        onClick={handlePrev}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-r-lg z-10 shadow-md"
                        aria-label="Anterior"
                        data-oid="jcq5qpm"
                      >
                        <ChevronLeft
                          className="h-5 w-5 text-gray-800"
                          data-oid="hiz3.ee"
                        />
                      </button>

                      <img
                        src={serviceClasses[activeServiceClass].image}
                        alt={serviceClasses[activeServiceClass].title}
                        className="w-full h-64 md:h-80 object-cover object-center"
                        data-oid=":27j.p8"
                      />

                      <button
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-l-lg z-10 shadow-md"
                        aria-label="Siguiente"
                        data-oid="4xn9h8g"
                      >
                        <ChevronRight
                          className="h-5 w-5 text-gray-800"
                          data-oid="t.:tco_"
                        />
                      </button>

                      {/* Indicadores de diapositiva */}
                      <div
                        className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2"
                        data-oid="_r9v:wq"
                      >
                        {serviceClasses.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setActiveServiceClass(index)}
                            className={`w-2 h-2 rounded-full ${
                              activeServiceClass === index
                                ? "bg-gray-1000"
                                : "bg-white bg-opacity-70"
                            }`}
                            aria-label={`Ir a diapositiva ${index + 1}`}
                            data-oid="7ul:sqh"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="p-6" data-oid="rpwnzse">
                      <h3
                        className="text-2xl font-bold text-gray-900 mb-2"
                        data-oid="eprlkaq"
                      >
                        {serviceClasses[activeServiceClass].title}
                      </h3>
                      <p
                        className="text-gray-700 text-sm mb-4"
                        data-oid="k14:e.x"
                      >
                        {serviceClasses[activeServiceClass].description}
                      </p>

                      <div
                        className="border-t border-gray-200 pt-4"
                        data-oid=":pxo0ap"
                      >
                        <ul className="space-y-3" data-oid="f-eoj0u">
                          <li className="flex items-start" data-oid="qrei:bk">
                            <CheckCircle
                              className="h-5 w-5 text-gray-600 mr-2 mt-0.5 flex-shrink-0"
                              data-oid="i5kx0lw"
                            />

                            <span
                              className="text-gray-700 text-sm"
                              data-oid="d44r_vt"
                            >
                              {serviceClasses[activeServiceClass].capacity}
                            </span>
                          </li>
                          <li className="flex items-start" data-oid="wtu6ko_">
                            <CheckCircle
                              className="h-5 w-5 text-gray-600 mr-2 mt-0.5 flex-shrink-0"
                              data-oid="0mqpyjt"
                            />

                            <span
                              className="text-gray-700 text-sm"
                              data-oid="g8o15ts"
                            >
                              {serviceClasses[activeServiceClass].luggage}
                            </span>
                          </li>
                          <li className="flex items-start" data-oid="3s.b:om">
                            <CheckCircle
                              className="h-5 w-5 text-gray-600 mr-2 mt-0.5 flex-shrink-0"
                              data-oid=".10u3hn"
                            />

                            <span
                              className="text-gray-700 text-sm"
                              data-oid="e4x31-:"
                            >
                              {serviceClasses[activeServiceClass].availability}
                            </span>
                          </li>
                        </ul>
                      </div>

                      {/* Selector de páginas numerado */}
                      <div
                        className="flex justify-center mt-6 space-x-1"
                        data-oid="akp.hd9"
                      >
                        {serviceClasses.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setActiveServiceClass(index)}
                            className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-medium ${
                              activeServiceClass === index
                                ? "bg-black text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                            data-oid="72d_2tu"
                          >
                            {index + 1}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Corporate Benefits Section */}
        <section className="mb-20" data-oid="ptqfxsy">
          <h2
            className="text-3xl font-bold text-center text-gray-900 mb-12 relative"
            data-oid="-hb0ajd"
          >
            Beneficios para su empresa
            <span
              className="block w-24 h-1 bg-black mx-auto mt-4"
              data-oid="__mjdk1"
            ></span>
          </h2>

          {/* Selector de beneficios */}
          <div
            className="flex flex-wrap justify-center mb-12"
            data-oid="sfv.5xa"
          >
            {Object.entries(corporateBenefits).map(([key, benefit]) => (
              <button
                key={key}
                className={`flex items-center px-6 py-3 m-2 rounded-full transition-all ${
                  activeBenefitIndex === key
                    ? "bg-gray-1000 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveBenefitIndex(key)}
                data-oid="nv27x28"
              >
                <span className="mr-2" data-oid="313u6dm">
                  {benefit.icon}
                </span>
                <span className="font-medium" data-oid="o8ddxqz">
                  {benefit.title}
                </span>
              </button>
            ))}
          </div>

          {/* Contenido del beneficio seleccionado */}
          {Object.entries(corporateBenefits).map(([key, benefit]) => (
            <div
              key={key}
              className={`transition-opacity duration-300 ${
                activeBenefitIndex === key
                  ? "block opacity-100"
                  : "hidden opacity-0"
              }`}
              data-oid="hf_dwk-"
            >
              <div
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                data-oid="w1-og5p"
              >
                <div data-oid="u434iuj">
                  <div
                    className="bg-gray-50 p-8 rounded-xl border border-gray-200 shadow-sm"
                    data-oid="s_f::ml"
                  >
                    <div className="flex items-center mb-6" data-oid="a4.pxzn">
                      {benefit.icon}
                      <h3
                        className="text-2xl font-bold text-gray-900 ml-3"
                        data-oid="zg.cjxk"
                      >
                        {benefit.title}
                      </h3>
                    </div>

                    <ul className="space-y-3" data-oid="7frx6xw">
                      {benefit.points.map((point, index) => (
                        <li
                          key={index}
                          className="flex items-start"
                          data-oid="j2dx2qp"
                        >
                          <Star
                            className="h-5 w-5 text-black mr-2 mt-0.5 flex-shrink-0"
                            data-oid="f6mrdzc"
                          />

                          <span className="text-gray-700" data-oid="3_uq39s">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div
                  className="relative h-96 rounded-xl overflow-hidden shadow-lg"
                  data-oid="oppshb0"
                >
                  <img
                    src={`https://source.unsplash.com/random/800x600/?${key === "time" ? "business+time" : key === "security" ? "executive+security" : key === "image" ? "corporate+image" : "business+management"}`}
                    alt={`Beneficio: ${benefit.title}`}
                    className="w-full h-full object-cover"
                    data-oid="9p658so"
                  />

                  <div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-6"
                    data-oid="do68wou"
                  >
                    <h3 className="text-xl font-bold mb-2" data-oid="1_8ga_e">
                      {benefit.title}
                    </h3>
                    <p className="text-sm opacity-90" data-oid="o-kv:rm">
                      Soluciones diseñadas para las necesidades empresariales
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Information Sections */}
        <section className="mb-20" data-oid="9zl3wev">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            data-oid="tk.4713"
          >
            <div data-oid="8ep8qf.">
              <h2
                className="text-3xl font-bold text-gray-900 mb-6"
                data-oid=".7q9qtj"
              >
                Servicio diseñado para el mundo corporativo
              </h2>
              <p className="text-lg text-gray-600 mb-6" data-oid="r33e27u">
                Entendemos que el tiempo es el activo más valioso en el entorno
                empresarial. Nuestro servicio corporativo está diseñado para
                maximizar la productividad y eficiencia de sus ejecutivos,
                permitiéndoles trabajar durante los desplazamientos en un
                entorno confortable y discreto.
              </p>
              <p className="text-lg text-gray-600 mb-6" data-oid="tis2spp">
                Con una flota premium y chóferes altamente capacitados,
                garantizamos que cada trayecto sea una extensión de su oficina:
                puntual, profesional y con todos los recursos necesarios para
                continuar con su agenda.
              </p>
              <div
                className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6"
                data-oid="eh17i31"
              >
                <h3
                  className="font-semibold text-xl text-gray-900 mb-3"
                  data-oid="apn0blc"
                >
                  Soluciones a medida
                </h3>
                <p className="text-gray-600" data-oid="1qscyz.">
                  Desde servicios puntuales para reuniones importantes hasta
                  programas completos de movilidad corporativa, adaptamos
                  nuestros servicios a las necesidades específicas de cada
                  empresa, independientemente de su tamaño o sector.
                </p>
              </div>
            </div>

            <div data-oid="fexeq6b">
              <img
                src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Ejecutivo trabajando dentro de un vehículo premium mientras viaja"
                className="w-full h-auto rounded-xl shadow-lg object-cover mb-8"
                data-oid="00gcgkw"
              />

              <img
                src="https://images.unsplash.com/photo-1563072275633-da6d8f48489f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Ejecutivos saliendo de una reunión y siendo recibidos por su chófer"
                className="w-full h-auto rounded-xl shadow-lg object-cover"
                data-oid="x3k-up1"
              />
            </div>
          </div>
        </section>

        {/* Global Service Section */}
        <section
          className="mb-20 bg-gray-50 p-8 rounded-xl border border-gray-200"
          data-oid="qeqn2_l"
        >
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            data-oid="rzmm.vg"
          >
            <div data-oid="v0kik2.">
              <img
                src="https://images.unsplash.com/photo-1591135790261-379e8938ac75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Mapa mundial con conexiones indicando servicio global"
                className="w-full h-auto rounded-xl shadow-lg object-cover"
                data-oid="3ynn-v."
              />
            </div>
            <div data-oid="ecrvsja">
              <h2
                className="text-3xl font-bold text-gray-900 mb-6"
                data-oid="w4rfp:q"
              >
                Cobertura global, servicio local
              </h2>
              <p className="text-lg text-gray-600 mb-8" data-oid="h2phyh3">
                Con presencia en más de 300 ciudades en 80 países, ofrecemos a
                sus ejecutivos la tranquilidad de contar con el mismo estándar
                de excelencia en cualquier parte del mundo. Nuestros chóferes
                locales combinan el conocimiento del terreno con los más altos
                estándares internacionales.
              </p>
              <div
                className="bg-white p-6 rounded-lg border border-gray-200"
                data-oid="mk5g3mz"
              >
                <h3
                  className="font-semibold text-xl text-gray-900 mb-3"
                  data-oid="1234zub"
                >
                  Ventajas globales
                </h3>
                <ul className="space-y-3" data-oid="z22k6vc">
                  <li className="flex items-start" data-oid="u0lpz3j">
                    <CheckCircle
                      className="h-5 w-5 text-gray-600 mr-2 mt-0.5 flex-shrink-0"
                      data-oid="32yyk00"
                    />

                    <span className="text-gray-700" data-oid="j9on..w">
                      Gestión centralizada con facturación en su moneda
                    </span>
                  </li>
                  <li className="flex items-start" data-oid="b5x6wq2">
                    <CheckCircle
                      className="h-5 w-5 text-gray-600 mr-2 mt-0.5 flex-shrink-0"
                      data-oid="opn25jv"
                    />

                    <span className="text-gray-700" data-oid="l26g7mb">
                      Tarifas corporativas aplicables en todos los destinos
                    </span>
                  </li>
                  <li className="flex items-start" data-oid="_e0xtq5">
                    <CheckCircle
                      className="h-5 w-5 text-gray-600 mr-2 mt-0.5 flex-shrink-0"
                      data-oid="8ueryjx"
                    />

                    <span className="text-gray-700" data-oid="1ksqj2l">
                      Soporte 24/7 en múltiples idiomas
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-20" data-oid="2lfzm7h">
          <h2
            className="text-3xl font-bold text-center text-gray-900 mb-12 relative"
            data-oid="xmob1rc"
          >
            Lo que dicen nuestros clientes corporativos
            <span
              className="block w-24 h-1 bg-black mx-auto mt-4"
              data-oid="l43drdm"
            ></span>
          </h2>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            data-oid="ceu9iiw"
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
                data-oid="kcz72bv"
              >
                <div className="flex items-center mb-4" data-oid="i1hds5u">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-gray-400 fill-current"
                      data-oid="dkn6zt1"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic" data-oid="rswzah7">
                  "{testimonial.text}"
                </p>
                <div data-oid="f:2bp33">
                  <p className="font-semibold text-gray-900" data-oid="jv9mta7">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500 text-sm" data-oid="q2r9:.6">
                    {testimonial.position}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20" data-oid="gn_5h9h">
          <h2
            className="text-3xl font-bold text-center text-gray-900 mb-12 relative"
            data-oid="_hiq18_"
          >
            Preguntas frecuentes sobre traslados corporativos
            <span
              className="block w-24 h-1 bg-black mx-auto mt-4"
              data-oid="20aq8cf"
            ></span>
          </h2>

          <div className="space-y-4 max-w-4xl mx-auto" data-oid="fmjzx7o">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl border ${openFaqIndex === index ? "border-gray-200 shadow-md" : "border-gray-200"} overflow-hidden transition-all duration-300`}
                data-oid="2j6q-o."
              >
                <button
                  className="flex justify-between items-center w-full p-6 text-left"
                  onClick={() => toggleFaq(index)}
                  data-oid="4y1a6cq"
                >
                  <h3
                    className={`text-xl font-semibold ${openFaqIndex === index ? "text-gray-600" : "text-gray-900"}`}
                    data-oid="4:p.1qf"
                  >
                    {faq.question}
                  </h3>
                  <div
                    className={`${openFaqIndex === index ? "text-black bg-gray-100" : "text-gray-400 bg-gray-50"} rounded-full p-1 transition-colors duration-300`}
                    data-oid="e.s:u48"
                  >
                    {openFaqIndex === index ? (
                      <ChevronUp className="h-5 w-5" data-oid="opy.20j" />
                    ) : (
                      <ChevronDown className="h-5 w-5" data-oid="ne_fzz5" />
                    )}
                  </div>
                </button>
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    openFaqIndex === index
                      ? "max-h-[1000px] opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                  data-oid=".gvoj-a"
                >
                  <div className="px-6 pb-6 pt-0" data-oid="kti1l7i">
                    <div
                      className="border-t border-gray-200 pt-4 text-left"
                      data-oid="y2ar7vh"
                    >
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section
          className="mb-20 bg-gray-900 text-white rounded-xl overflow-hidden"
          data-oid="tq:1u-l"
        >
          <div className="grid grid-cols-1 md:grid-cols-2" data-oid="y2s64m3">
            <div
              className="p-8 lg:p-12 flex flex-col justify-center"
              data-oid="gd_ttkf"
            >
              <h2 className="text-3xl font-bold mb-6" data-oid="dc9u8y4">
                Eleve la experiencia de movilidad de su empresa
              </h2>
              <p className="text-lg text-gray-300 mb-8" data-oid="rabh0xr">
                Nuestro equipo de cuentas corporativas está listo para diseñar
                un programa de transporte ejecutivo que se adapte perfectamente
                a las necesidades de su organización.
              </p>
              <div className="flex flex-wrap gap-4" data-oid="jfvz:io">
                <button
                  className="bg-gray-1000 hover:bg-black text-white py-3 px-6 rounded-lg font-medium transition-all duration-200"
                  data-oid="9-jvvcn"
                >
                  Solicitar una demostración
                </button>
                <button
                  className="bg-transparent border border-white hover:bg-white hover:text-gray-900 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200"
                  data-oid="y_k0ero"
                >
                  Contactar con ventas
                </button>
              </div>
            </div>
            <div
              className="relative min-h-[300px] md:min-h-full"
              data-oid="4siumy_"
            >
              <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Equipo directivo en una reunión de negocios"
                className="absolute inset-0 w-full h-full object-cover"
                data-oid="a35c8r0"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer data-oid="h6x5qq3" />
    </div>
  );
};

export default CorporateTransfers;
