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
  Award,
  Heart,
  GraduationCap,
  Wine,
  Building,
  Calendar,
  Clock,
  UserCheck,
  Car,
  Star,
} from "lucide-react";

const SpecialEvents = () => {
  // Estado para controlar qué FAQ está abierta
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Estado para controlar qué tipo de evento está seleccionado
  const [activeEventType, setActiveEventType] = useState<string>("wedding");

  // Toggle para abrir/cerrar FAQs
  const toggleFaq = (index: number) => {
    if (openFaqIndex === index) {
      setOpenFaqIndex(null);
    } else {
      setOpenFaqIndex(index);
    }
  };

  // Datos de los tipos de eventos
  const eventTypes = [
    {
      id: "wedding",
      title: "Bodas",
      icon: <Heart className="h-6 w-6 text-black" data-oid="h_-mox2" />,
      description:
        "El transporte perfecto para tu día perfecto. Nuestro servicio para bodas ofrece elegancia y confort para la pareja y los invitados.",
      benefits: [
        "Llegada elegante para los novios",
        "Coordinación con el planificador de bodas",
        "Decoración floral opcional para los vehículos",
        "Servicio de ida y vuelta para la pareja e invitados especiales",
        "Chóferes profesionales en traje formal",
      ],
    },
    {
      id: "graduation",
      title: "Graduaciones",
      icon: <GraduationCap className="h-6 w-6 text-black" data-oid="6udxr-t" />,
      description:
        "Celebre este importante logro académico con un transporte de lujo que haga el día aún más memorable.",
      benefits: [
        "Impresiona a familiares y amigos",
        "Transporte desde la ceremonia a la celebración",
        "Sesiones fotográficas entre ubicaciones",
        "Capacidad para grupos familiares",
        "Ambiente festivo y exclusivo",
      ],
    },
    {
      id: "birthday",
      title: "Cumpleaños",
      icon: <Wine className="h-6 w-6 text-black" data-oid="lt2m3fg" />,
      description:
        "Desde fiestas sorpresa hasta celebraciones de hitos importantes, hacemos que tu cumpleaños sea inolvidable con un servicio de transporte premium.",
      benefits: [
        "Recogida y entrega puerta a puerta",
        "Ambiente de celebración a bordo",
        "Coordinación con restaurantes y locales",
        "Servicio por horas disponible para múltiples paradas",
        "Opción de decoración temática del vehículo",
      ],
    },
    {
      id: "corporate",
      title: "Eventos Corporativos",
      icon: <Building className="h-6 w-6 text-black" data-oid="9gp.8:d" />,
      description:
        "Impresione a sus clientes y colaboradores con un servicio de chófer exclusivo para sus eventos de empresa más importantes.",
      benefits: [
        "Coordinación de múltiples vehículos",
        "Discreción y profesionalidad garantizadas",
        "Opciones para grandes grupos",
        "Facturación empresarial simplificada",
        "Servicio 24/7 para eventos internacionales",
      ],
    },
    {
      id: "concert",
      title: "Conciertos y Espectáculos",
      icon: <Award className="h-6 w-6 text-black" data-oid="3rxc2:u" />,
      description:
        "Disfrute de sus espectáculos favoritos sin preocupaciones. Llegue cómodamente y regrese a casa con seguridad, sin importar la hora.",
      benefits: [
        "Evite problemas de estacionamiento",
        "Disfrute sin preocuparse por conducir",
        "Llegada puntual garantizada",
        "Recogida posterior al evento sin esperas",
        "Ambiente de lujo antes y después del espectáculo",
      ],
    },
  ];

  // Datos de las preguntas frecuentes
  const faqData = [
    {
      question: "¿Con cuánta antelación debo reservar para un evento especial?",
      answer: (
        <p className="text-gray-600" data-oid="g6n1eu.">
          Recomendamos realizar la reserva con al menos 2 semanas de antelación
          para eventos estándar. Para eventos de gran magnitud como bodas o
          eventos corporativos importantes, es aconsejable reservar con 1-3
          meses de antelación, especialmente durante la temporada alta
          (primavera y verano). Para fechas especialmente solicitadas como
          Nochevieja o festividades importantes, una reserva con 3-6 meses de
          anticipación garantiza la disponibilidad de nuestros mejores vehículos
          y chóferes.
        </p>
      ),
    },
    {
      question: "¿Puedo personalizar el servicio para mi evento especial?",
      answer: (
        <div className="text-gray-600" data-oid="33xz_u6">
          <p className="mb-2" data-oid="7p1x3zw">
            ¡Absolutamente! Ofrecemos múltiples opciones de personalización para
            que su evento sea único:
          </p>
          <ul className="list-disc pl-5 space-y-1" data-oid="zeg-t46">
            <li data-oid="lfzf3jb">
              Decoración interior y exterior del vehículo acorde a la temática
              del evento
            </li>
            <li data-oid="u6.8mal">
              Selección de bebidas y refrigerios a bordo (con cargo adicional)
            </li>
            <li data-oid="lmks1b7">
              Coordinación del itinerario con otros proveedores del evento
            </li>
            <li data-oid="pw1d:qm">
              Vestimenta específica para los chóferes según el código del evento
            </li>
            <li data-oid="e5038_.">
              Alfombra roja para la llegada en eventos premium
            </li>
          </ul>
          <p className="mt-2" data-oid="42xha5t">
            Comunique sus necesidades específicas en el campo de "Notas
            especiales" al realizar su reserva o contáctenos directamente para
            un servicio totalmente a medida.
          </p>
        </div>
      ),
    },
    {
      question:
        "¿Qué tipos de vehículos están disponibles para eventos especiales?",
      answer: (
        <div className="text-gray-600" data-oid="pz7y0qr">
          <p className="mb-2" data-oid="6b0bu-v">
            Disponemos de una flota exclusiva para satisfacer las necesidades de
            cualquier evento:
          </p>
          <ul className="list-disc pl-5 space-y-1" data-oid="xnk9y64">
            <li data-oid="sg752ni">
              <strong data-oid="urtwgo:">Sedanes de lujo:</strong> Mercedes
              Clase S, BMW Serie 7, Audi A8 - ideales para parejas o ejecutivos
            </li>
            <li data-oid=":2.p9c1">
              <strong data-oid="a1w_:jm">SUVs premium:</strong> Cadillac
              Escalade, Mercedes GLS, Range Rover - perfectos para pequeños
              grupos con equipaje
            </li>
            <li data-oid="ln9xsd3">
              <strong data-oid="ytai35b">Limusinas:</strong> Limusinas
              estiramiento clásicas y modernas - para entradas espectaculares
            </li>
            <li data-oid="9xadjpu">
              <strong data-oid="4dmjlcm">Minibuses de lujo:</strong> Mercedes
              Sprinter VIP, para grupos de hasta 14 personas
            </li>
            <li data-oid="ydbr--7">
              <strong data-oid="h6k:8s8">Vehículos clásicos:</strong> Para bodas
              y eventos temáticos (disponibilidad limitada)
            </li>
          </ul>
          <p className="mt-2" data-oid="0pvr8.j">
            Todos nuestros vehículos se mantienen en perfecto estado y se
            presentan impecables para su evento.
          </p>
        </div>
      ),
    },
    {
      question: "¿Puedo reservar múltiples vehículos para mi evento?",
      answer: (
        <p className="text-gray-600" data-oid="oy0:-0b">
          Sí, ofrecemos la posibilidad de reservar múltiples vehículos para su
          evento. Esto es especialmente útil para bodas donde se necesita
          transporte para los novios, padres, padrinos e invitados VIP, o para
          eventos corporativos que requieren el traslado simultáneo de varios
          ejecutivos o grupos. Contamos con un equipo de coordinación de flota
          que asegura que todos los vehículos lleguen puntualmente y se
          mantengan en perfecta sincronización durante todo el evento. Para
          reservas de más de 3 vehículos, recomendamos contactar directamente
          con nuestro departamento de eventos para una cotización personalizada.
        </p>
      ),
    },
    {
      question: "¿Qué ocurre si mi evento se extiende más de lo previsto?",
      answer: (
        <p className="text-gray-600" data-oid="lnzgwbs">
          Entendemos que los eventos especiales a veces pueden extenderse más
          allá del horario planificado. Nuestros chóferes están preparados para
          ser flexibles. Si su evento se prolonga, el chófer puede extender el
          servicio siempre que su agenda lo permita. Las horas adicionales se
          facturarán según nuestra tarifa por hora estándar. Para mayor
          tranquilidad, recomendamos reservar el servicio con un margen de
          tiempo adicional o comunicar la posibilidad de extensión al realizar
          la reserva para garantizar la disponibilidad del chófer.
        </p>
      ),
    },
    {
      question:
        "¿Ofrecen servicios para eventos infantiles como fiestas de cumpleaños?",
      answer: (
        <div className="text-gray-600" data-oid="9ngtwbw">
          <p className="mb-2" data-oid="g102b7f">
            Sí, ofrecemos servicios especiales diseñados para celebraciones
            infantiles y adolescentes, como:
          </p>
          <ul className="list-disc pl-5 space-y-1" data-oid="k3x.5da">
            <li data-oid="g0:rdcb">
              Paquetes especiales para "sweet sixteen" y quinceañeras
            </li>
            <li data-oid="_xosuq1">
              Servicios para fiestas temáticas infantiles con decoración
              apropiada
            </li>
            <li data-oid="2sxzg8t">
              Opciones seguras para el transporte de menores con supervisión
            </li>
            <li data-oid=".144emn">
              Experiencias tipo "tour de estrella" para cumpleaños especiales
            </li>
          </ul>
          <p className="mt-2" data-oid="rlrjq0_">
            Todos nuestros servicios para eventos con menores cumplen con las
            normativas de seguridad más estrictas, incluyendo asientos adaptados
            para niños cuando sea necesario. Nuestros chóferes asignados a estos
            servicios son seleccionados específicamente por su experiencia y
            aptitud para trabajar en eventos con niños.
          </p>
        </div>
      ),
    },
  ];

  // Testimonios de clientes
  const testimonials = [
    {
      name: "Laura y Carlos",
      event: "Boda en Madrid",
      text: "Contratamos el servicio para nuestra boda y superó todas nuestras expectativas. El chófer fue increíblemente atento, el coche estaba decorado exactamente como habíamos solicitado y la puntualidad fue perfecta. Hizo que nuestro día especial fuera aún más memorable. ¡Altamente recomendado para cualquier pareja!",
      stars: 5,
    },
    {
      name: "Miguel Ángel",
      event: "Graduación universitaria",
      text: "Quería sorprender a mi hija en su graduación y reservé una limusina. La cara de sorpresa no tuvo precio. El servicio fue excepcional, el chófer muy profesional y amable, y las fotos que pudimos tomar con el vehículo quedaron espectaculares. Un detalle que transformó un día importante en uno inolvidable.",
      stars: 5,
    },
    {
      name: "Grupo Innova",
      event: "Conferencia anual",
      text: "Como directora de eventos corporativos, he trabajado con muchos servicios de transporte, pero este ha sido sin duda el mejor. Coordinaron el traslado de 15 ejecutivos internacionales sin un solo contratiempo. La profesionalidad, los vehículos y la atención al detalle fueron impecables. Serán nuestro proveedor exclusivo a partir de ahora.",
      stars: 5,
    },
  ];

  return (
    <div className="bg-white" data-oid="18t8hn3">
      {/* Navigation */}
      <Navbar data-oid="sskk31t" />

      {/* Hero Section with Full-Width Image */}
      <div className="flex flex-col w-full" data-oid="w14-a9a">
        {/* Title Bar */}
        <div className="title-bar relative" data-oid="guvp.fa">
          <div className="container mx-auto px-4" data-oid="ee2iad-">
            <h1 className="text-3xl font-bold text-black" data-oid="7.32lh.">
              Servicios para eventos especiales
            </h1>
          </div>
        </div>

        {/* Image Container */}
        <div className="hero-container relative" data-oid="e:yacg9">
          {/* Background Image */}
          <div className="full-size-background" data-oid="czz0wlm">
            <Image
              src="/images/wedding-car.jpeg"
              alt="Elegante limusina negra esperando fuera de un evento de gala"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
              data-oid=":j:4om0"
            />
          </div>

          {/* Booking Widget - Solo visible en pantallas grandes (lg) */}
          <div
            className="booking-widget-container-overlay hidden lg:block"
            data-oid="by-idli"
          >
            <BookingForm data-oid="5yprccl" />
          </div>
        </div>
      </div>

      {/* Booking Widget - Solo visible en tablets y móviles (fuera del hero) */}
      <div
        className="lg:hidden mx-auto px-4 mb-8 mt-6 relative z-30"
        data-oid="yueormi"
      >
        <BookingForm data-oid="b9l1948" />
      </div>

      {/* Moments Banner */}
      <div className="bg-gray-100 py-12" data-oid="_1yoo6c">
        <div className="container mx-auto px-4 text-center" data-oid="w39-dvg">
          <h2
            className="text-3xl font-bold text-gray-900 mb-4"
            data-oid="3e:1izt"
          >
            Haga que sus momentos especiales sean verdaderamente extraordinarios
          </h2>
          <p
            className="text-lg text-gray-700 max-w-3xl mx-auto"
            data-oid="_1.v28y"
          >
            Desde bodas y graduaciones hasta eventos corporativos y
            celebraciones, nuestro servicio de chófer exclusivo añade un toque
            de elegancia y confort a sus ocasiones más importantes.
          </p>
        </div>
      </div>

      {/* Download Section */}
      <DownloadSection data-oid="419vz9p" />

      {/* Main Content */}
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 max-w-6xl"
        data-oid="y1m3_a-"
      >
        {/* Event Types Section */}
        <section className="mb-20" data-oid="x.ccmxf">
          <h2
            className="text-3xl font-bold text-center text-gray-900 mb-12 relative"
            data-oid="q:m-eo5"
          >
            Servicios a medida para cada ocasión especial
            <span
              className="block w-24 h-1 bg-black mx-auto mt-4"
              data-oid="73t3j55"
            ></span>
          </h2>

          {/* Event Type Selector */}
          <div
            className="flex flex-wrap justify-center mb-12"
            data-oid="-2.vmfm"
          >
            {eventTypes.map((type) => (
              <button
                key={type.id}
                className={`flex items-center px-6 py-3 m-2 rounded-full transition-all ${
                  activeEventType === type.id
                    ? "bg-gray-1000 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveEventType(type.id)}
                data-oid="io390-9"
              >
                <span className="mr-2" data-oid="3s29-yv">
                  {type.icon}
                </span>
                <span className="font-medium" data-oid="-60su4y">
                  {type.title}
                </span>
              </button>
            ))}
          </div>

          {/* Event Type Content */}
          {eventTypes.map((type) => (
            <div
              key={type.id}
              className={`transition-opacity duration-300 ${
                activeEventType === type.id
                  ? "block opacity-100"
                  : "hidden opacity-0"
              }`}
              data-oid="nm-21hi"
            >
              <div
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                data-oid="ypk1egq"
              >
                <div data-oid="lxcpxkg">
                  <div
                    className="bg-gray-50 p-8 rounded-xl border border-gray-200 shadow-sm"
                    data-oid="wr2knmz"
                  >
                    <div className="flex items-center mb-6" data-oid="0vj679-">
                      {type.icon}
                      <h3
                        className="text-2xl font-bold text-gray-900 ml-3"
                        data-oid=":wq3z4q"
                      >
                        {type.title}
                      </h3>
                    </div>
                    <p
                      className="text-gray-600 mb-8 text-lg"
                      data-oid="lzlxpd:"
                    >
                      {type.description}
                    </p>

                    <h4
                      className="font-semibold text-gray-900 mb-4"
                      data-oid="xota1_m"
                    >
                      Beneficios clave:
                    </h4>
                    <ul className="space-y-3" data-oid="9ard35d">
                      {type.benefits.map((benefit, index) => (
                        <li
                          key={index}
                          className="flex items-start"
                          data-oid="f90y4-l"
                        >
                          <Star
                            className="h-5 w-5 text-black mr-2 mt-0.5 flex-shrink-0"
                            data-oid="937hfbb"
                          />

                          <span className="text-gray-700" data-oid="2nbbdti">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div
                  className="relative h-96 rounded-xl overflow-hidden shadow-lg"
                  data-oid=":sr-1ws"
                >
                  <img
                    src={`/images/${type.id === "wedding" ? "elegant-wedding" : type.id === "graduation" ? "graduation-limousine" : type.id === "birthday" ? "birthday-celebration" : type.id === "corporate" ? "corporate-car" : "concert-chauffeur"}.png`}
                    alt={`Servicio para ${type.title}`}
                    className="w-full h-full object-cover"
                    data-oid="081l2t:"
                  />

                  <div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-6"
                    data-oid="z8g0v6j"
                  >
                    <h3 className="text-xl font-bold mb-2" data-oid="z2z2-sd">
                      Servicio exclusivo para {type.title}
                    </h3>
                    <p className="text-sm opacity-90" data-oid="akpo_t_">
                      Experiencia personalizada y atención a los detalles
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Why Choose Us */}
        <section className="mb-20" data-oid="jtxpn:w">
          <h2
            className="text-3xl font-bold text-center text-gray-900 mb-12 relative"
            data-oid="z8yueau"
          >
            ¿Por qué elegirnos para su evento especial?
            <span
              className="block w-24 h-1 bg-black mx-auto mt-4"
              data-oid="j6xlin3"
            ></span>
          </h2>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            data-oid=":80ohu."
          >
            <div
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
              data-oid="yqb-yh_"
            >
              <div
                className="text-black mb-4 bg-gray-100 w-14 h-14 rounded-full flex items-center justify-center"
                data-oid=".8ogk.0"
              >
                <Calendar className="h-8 w-8" data-oid=".57tile" />
              </div>
              <h3
                className="text-xl font-semibold mb-3 text-gray-900"
                data-oid="myd3l72"
              >
                Planificación impecable
              </h3>
              <p className="text-gray-600 leading-relaxed" data-oid="yby_i49">
                Coordinamos cada detalle con precisión, desde horarios hasta
                rutas y paradas especiales, para que pueda centrarse en
                disfrutar su evento.
              </p>
            </div>

            <div
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
              data-oid="47h7h-4"
            >
              <div
                className="text-black mb-4 bg-gray-100 w-14 h-14 rounded-full flex items-center justify-center"
                data-oid="gap1fd5"
              >
                <Clock className="h-8 w-8" data-oid="ffwel7r" />
              </div>
              <h3
                className="text-xl font-semibold mb-3 text-gray-900"
                data-oid="xdl9i8p"
              >
                Puntualidad garantizada
              </h3>
              <p className="text-gray-600 leading-relaxed" data-oid="x:z5vm6">
                Llegamos siempre con anticipación y nos adaptamos a cualquier
                cambio de última hora en su evento, porque entendemos que la
                puntualidad es esencial.
              </p>
            </div>

            <div
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
              data-oid="r_6v_a3"
            >
              <div
                className="text-black mb-4 bg-gray-100 w-14 h-14 rounded-full flex items-center justify-center"
                data-oid="c-4-0tu"
              >
                <UserCheck className="h-8 w-8" data-oid="v_ogr2f" />
              </div>
              <h3
                className="text-xl font-semibold mb-3 text-gray-900"
                data-oid="_z5r6wq"
              >
                Chóferes de élite
              </h3>
              <p className="text-gray-600 leading-relaxed" data-oid="sedflx6">
                Nuestros chóferes son profesionales con años de experiencia en
                eventos exclusivos, seleccionados por su discreción, cortesía y
                conocimiento.
              </p>
            </div>

            <div
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
              data-oid="veak852"
            >
              <div
                className="text-black mb-4 bg-gray-100 w-14 h-14 rounded-full flex items-center justify-center"
                data-oid="if_e:tf"
              >
                <Car className="h-8 w-8" data-oid="6uo:x0w" />
              </div>
              <h3
                className="text-xl font-semibold mb-3 text-gray-900"
                data-oid="3the-sv"
              >
                Flota exclusiva
              </h3>
              <p className="text-gray-600 leading-relaxed" data-oid="98dk_c3">
                Vehículos de lujo meticulosamente mantenidos, desde elegantes
                sedanes ejecutivos hasta impresionantes limusinas, para
                satisfacer sus necesidades específicas.
              </p>
            </div>
          </div>
        </section>

        {/* Premium Experience */}
        <section className="mb-20" data-oid="r.2br41">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            data-oid="yjr7k.u"
          >
            <div data-oid="u_j1v7y">
              <h2
                className="text-3xl font-bold text-gray-900 mb-6"
                data-oid=":qjx:e8"
              >
                Una experiencia premium en cada trayecto
              </h2>
              <p className="text-lg text-gray-600 mb-6" data-oid="5wbsenw">
                Entendemos que su evento especial merece un servicio
                excepcional. Desde el momento en que se pone en contacto con
                nosotros hasta la última parada de su viaje, nos esforzamos por
                superar sus expectativas en cada detalle.
              </p>
              <p className="text-lg text-gray-600 mb-6" data-oid="5ziavff">
                Nuestro enfoque personalizado significa que adaptamos cada
                aspecto del servicio a sus necesidades específicas. Ya sea una
                llegada espectacular a una boda, un transporte discreto para un
                evento corporativo VIP o un viaje inolvidable para una
                celebración familiar, diseñamos la experiencia perfecta.
              </p>
              <div
                className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6"
                data-oid="jiz8f3m"
              >
                <h3
                  className="font-semibold text-xl text-gray-900 mb-3"
                  data-oid="ve-d0xc"
                >
                  Personalización completa
                </h3>
                <p className="text-gray-600" data-oid="9y93n0u">
                  Desde la selección del vehículo ideal hasta los pequeños
                  detalles como bebidas preferidas, música ambiental o
                  decoración temática, su servicio se adapta completamente a sus
                  deseos.
                </p>
              </div>
              <div
                className="bg-gray-50 p-6 rounded-lg border border-gray-200"
                data-oid="uv1bt6f"
              >
                <h3
                  className="font-semibold text-xl text-gray-900 mb-3"
                  data-oid="6_7s.9m"
                >
                  Tranquilidad garantizada
                </h3>
                <p className="text-gray-600" data-oid="az:nki-">
                  Con nuestra garantía de servicio, puede estar seguro de que su
                  evento transcurrirá sin contratiempos, permitiéndole
                  concentrarse en los momentos que realmente importan.
                </p>
              </div>
            </div>

            <div data-oid="9vnagno">
              <img
                src="/images/wedding2.jpeg"
                alt="Pareja elegante entrando a un vehículo premium con chófer"
                className="w-full h-auto rounded-xl shadow-lg object-cover mb-8"
                data-oid="3sscvyo"
              />

              <img
                src="/images/suv-limo.png"
                alt="Chófer profesional abriendo la puerta de un vehículo de lujo"
                className="w-full h-auto rounded-xl shadow-lg object-cover"
                data-oid="b5-txd7"
              />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-20" data-oid="q4fe5v3">
          <h2
            className="text-3xl font-bold text-center text-gray-900 mb-12 relative"
            data-oid="--:h0:r"
          >
            Lo que dicen nuestros clientes
            <span
              className="block w-24 h-1 bg-black mx-auto mt-4"
              data-oid="1ev-.7:"
            ></span>
          </h2>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            data-oid="xmikkys"
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
                data-oid="3o9telv"
              >
                <div className="flex items-center mb-4" data-oid="zs1hznr">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-gray-400 fill-current"
                      data-oid="a2wz6k-"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic" data-oid="hp12c3y">
                  "{testimonial.text}"
                </p>
                <div data-oid="hpzewxb">
                  <p className="font-semibold text-gray-900" data-oid="5s67yzu">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500 text-sm" data-oid="7cl6ocl">
                    {testimonial.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20" data-oid=":5fd421">
          <h2
            className="text-3xl font-bold text-center text-gray-900 mb-12 relative"
            data-oid="emgc9so"
          >
            Preguntas frecuentes sobre eventos especiales
            <span
              className="block w-24 h-1 bg-black mx-auto mt-4"
              data-oid="wuchs1g"
            ></span>
          </h2>

          <div className="space-y-4 max-w-4xl mx-auto" data-oid="k7ke_.x">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl border ${openFaqIndex === index ? "border-gray-200 shadow-md" : "border-gray-200"} overflow-hidden transition-all duration-300`}
                data-oid="98in3pv"
              >
                <button
                  className="flex justify-between items-center w-full p-6 text-left"
                  onClick={() => toggleFaq(index)}
                  data-oid="2zrlqbs"
                >
                  <h3
                    className={`text-xl font-semibold ${openFaqIndex === index ? "text-gray-600" : "text-gray-900"}`}
                    data-oid="i9069c5"
                  >
                    {faq.question}
                  </h3>
                  <div
                    className={`${openFaqIndex === index ? "text-black bg-gray-100" : "text-gray-400 bg-gray-50"} rounded-full p-1 transition-colors duration-300`}
                    data-oid="qkb22._"
                  >
                    {openFaqIndex === index ? (
                      <ChevronUp className="h-5 w-5" data-oid="gfu09ul" />
                    ) : (
                      <ChevronDown className="h-5 w-5" data-oid="g.b:8r:" />
                    )}
                  </div>
                </button>
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    openFaqIndex === index
                      ? "max-h-[1000px] opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                  data-oid="9vi_p2c"
                >
                  <div className="px-6 pb-6 pt-0" data-oid="2p67bx8">
                    <div
                      className="border-t border-gray-200 pt-4 text-left"
                      data-oid="llz4gtr"
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
          data-oid="i3sxrg5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2" data-oid="2fs98o.">
            <div
              className="p-8 lg:p-12 flex flex-col justify-center"
              data-oid="d134njk"
            >
              <h2 className="text-3xl font-bold mb-6" data-oid="jcsv6fk">
                Haga que su próximo evento sea excepcional
              </h2>
              <p className="text-lg text-gray-300 mb-8" data-oid="4dl33wp">
                Nuestro equipo de especialistas en eventos está listo para
                ayudarle a planificar el transporte perfecto para su ocasión
                especial. Reserve ahora o contáctenos para un servicio
                personalizado.
              </p>
              <div className="flex flex-wrap gap-4" data-oid="gxjnxjv">
                <button
                  className="bg-gray-1000 hover:bg-black text-white py-3 px-6 rounded-lg font-medium transition-all duration-200"
                  data-oid="2or2r57"
                >
                  Reservar ahora
                </button>
                <button
                  className="bg-transparent border border-white hover:bg-white hover:text-gray-900 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200"
                  data-oid="32rxna4"
                >
                  Solicitar presupuesto
                </button>
              </div>
            </div>
            <div
              className="relative min-h-[300px] md:min-h-full"
              data-oid="bwwms8c"
            >
              <img
                src="/images/limo-leds.png"
                alt="Limusina elegante preparada para un evento especial"
                className="absolute inset-0 w-full h-full object-cover"
                data-oid="yxfqvdo"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer data-oid="4knam.j" />
    </div>
  );
};

export default SpecialEvents;
