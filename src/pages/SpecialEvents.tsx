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
      icon: <Heart className="h-6 w-6 text-black" data-oid="3qb7cm_" />,
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
      icon: <GraduationCap className="h-6 w-6 text-black" data-oid="l57dqt5" />,
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
      icon: <Wine className="h-6 w-6 text-black" data-oid="g0vt38g" />,
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
      icon: <Building className="h-6 w-6 text-black" data-oid="26bpiig" />,
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
      icon: <Award className="h-6 w-6 text-black" data-oid="8am6o_r" />,
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
        <p className="text-gray-600" data-oid="82yfo:d">
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
        <div className="text-gray-600" data-oid="ruoxpls">
          <p className="mb-2" data-oid="mxai5bq">
            ¡Absolutamente! Ofrecemos múltiples opciones de personalización para
            que su evento sea único:
          </p>
          <ul className="list-disc pl-5 space-y-1" data-oid="89pizfc">
            <li data-oid="09.o8cn">
              Decoración interior y exterior del vehículo acorde a la temática
              del evento
            </li>
            <li data-oid="_cmqvs0">
              Selección de bebidas y refrigerios a bordo (con cargo adicional)
            </li>
            <li data-oid="lp0evqt">
              Coordinación del itinerario con otros proveedores del evento
            </li>
            <li data-oid="k:yz1z9">
              Vestimenta específica para los chóferes según el código del evento
            </li>
            <li data-oid="tulkdi:">
              Alfombra roja para la llegada en eventos premium
            </li>
          </ul>
          <p className="mt-2" data-oid="prs_k8-">
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
        <div className="text-gray-600" data-oid="8:g5p5e">
          <p className="mb-2" data-oid="wilpqn1">
            Disponemos de una flota exclusiva para satisfacer las necesidades de
            cualquier evento:
          </p>
          <ul className="list-disc pl-5 space-y-1" data-oid="uapw5jf">
            <li data-oid="o:czfeu">
              <strong data-oid="gsomal9">Sedanes de lujo:</strong> Mercedes
              Clase S, BMW Serie 7, Audi A8 - ideales para parejas o ejecutivos
            </li>
            <li data-oid="7pcrl:9">
              <strong data-oid="z4lp4fg">SUVs premium:</strong> Cadillac
              Escalade, Mercedes GLS, Range Rover - perfectos para pequeños
              grupos con equipaje
            </li>
            <li data-oid="4ttke9.">
              <strong data-oid="73gxnaa">Limusinas:</strong> Limusinas
              estiramiento clásicas y modernas - para entradas espectaculares
            </li>
            <li data-oid="mzd-zrv">
              <strong data-oid="jbv_4u-">Minibuses de lujo:</strong> Mercedes
              Sprinter VIP, para grupos de hasta 14 personas
            </li>
            <li data-oid="fch0_14">
              <strong data-oid="paqyv8q">Vehículos clásicos:</strong> Para bodas
              y eventos temáticos (disponibilidad limitada)
            </li>
          </ul>
          <p className="mt-2" data-oid="69yut9f">
            Todos nuestros vehículos se mantienen en perfecto estado y se
            presentan impecables para su evento.
          </p>
        </div>
      ),
    },
    {
      question: "¿Puedo reservar múltiples vehículos para mi evento?",
      answer: (
        <p className="text-gray-600" data-oid="lryn7rq">
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
        <p className="text-gray-600" data-oid="hxy7_4f">
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
        <div className="text-gray-600" data-oid="fbm_46r">
          <p className="mb-2" data-oid="8d_7xho">
            Sí, ofrecemos servicios especiales diseñados para celebraciones
            infantiles y adolescentes, como:
          </p>
          <ul className="list-disc pl-5 space-y-1" data-oid="cg-19ku">
            <li data-oid="cg3lgx:">
              Paquetes especiales para "sweet sixteen" y quinceañeras
            </li>
            <li data-oid="tj6l2wy">
              Servicios para fiestas temáticas infantiles con decoración
              apropiada
            </li>
            <li data-oid=":w1lh-8">
              Opciones seguras para el transporte de menores con supervisión
            </li>
            <li data-oid="t5ur:a1">
              Experiencias tipo "tour de estrella" para cumpleaños especiales
            </li>
          </ul>
          <p className="mt-2" data-oid="b_4_dnj">
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
    <div className="bg-white" data-oid="e6_es7h">
      {/* Navigation */}
      <Navbar data-oid="1xe_jg7" />

      {/* Hero Section with Full-Width Image */}
      <div className="flex flex-col w-full" data-oid="o47y8dg">
        {/* Title Bar */}
        <div className="title-bar relative" data-oid="k9pt3vi">
          <div className="container mx-auto px-4" data-oid="4ul372x">
            <h1 className="text-3xl font-bold text-black" data-oid="migr.uw">
              Servicios para eventos especiales
            </h1>
          </div>
        </div>

        {/* Image Container */}
        <div className="hero-container relative" data-oid="bwm43gu">
          {/* Background Image */}
          <div className="full-size-background" data-oid="3xu4qtb">
            <Image
              src="/images/wedding-car.jpeg"
              alt="Elegante limusina negra esperando fuera de un evento de gala"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
              data-oid=":sb3xnz"
            />
          </div>

          {/* Booking Widget - Solo visible en pantallas grandes (lg) */}
          <div
            className="booking-widget-container-overlay hidden lg:block"
            data-oid="2nhr-6b"
          >
            <BookingForm data-oid="ekemdx." />
          </div>
        </div>
      </div>

      {/* Booking Widget - Solo visible en tablets y móviles (fuera del hero) */}
      <div
        className="lg:hidden mx-auto px-4 mb-8 mt-6 relative z-30"
        data-oid="jjdb7i8"
      >
        <BookingForm data-oid="9hs1q5h" />
      </div>

      {/* Moments Banner */}
      <div className="bg-gray-100 py-12" data-oid=":l31f0n">
        <div className="container mx-auto px-4 text-center" data-oid="ajozysj">
          <h2
            className="text-3xl font-bold text-gray-900 mb-4"
            data-oid="jpf-.v1"
          >
            Haga que sus momentos especiales sean verdaderamente extraordinarios
          </h2>
          <p
            className="text-lg text-gray-700 max-w-3xl mx-auto"
            data-oid="s.z8:_2"
          >
            Desde bodas y graduaciones hasta eventos corporativos y
            celebraciones, nuestro servicio de chófer exclusivo añade un toque
            de elegancia y confort a sus ocasiones más importantes.
          </p>
        </div>
      </div>

      {/* Download Section */}
      <DownloadSection data-oid="gfkvkii" />

      {/* Main Content */}
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 max-w-6xl"
        data-oid="-:e38v."
      >
        {/* Event Types Section */}
        <section className="mb-20" data-oid=".sg482.">
          <h2
            className="text-3xl font-bold text-center text-gray-900 mb-12 relative"
            data-oid="rftyku6"
          >
            Servicios a medida para cada ocasión especial
            <span
              className="block w-24 h-1 bg-black mx-auto mt-4"
              data-oid="mbzg6ad"
            ></span>
          </h2>

          {/* Event Type Selector */}
          <div
            className="flex flex-wrap justify-center mb-12"
            data-oid="c68rsku"
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
                data-oid="sq6-qz4"
              >
                <span className="mr-2" data-oid=".a82aa2">
                  {type.icon}
                </span>
                <span className="font-medium" data-oid="nnq_d.r">
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
              data-oid="8khrk.0"
            >
              <div
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                data-oid="4l:wwbw"
              >
                <div data-oid="1ihrcl:">
                  <div
                    className="bg-gray-50 p-8 rounded-xl border border-gray-200 shadow-sm"
                    data-oid="xt4oio0"
                  >
                    <div className="flex items-center mb-6" data-oid="dtlj78i">
                      {type.icon}
                      <h3
                        className="text-2xl font-bold text-gray-900 ml-3"
                        data-oid="w67n8hz"
                      >
                        {type.title}
                      </h3>
                    </div>
                    <p
                      className="text-gray-600 mb-8 text-lg"
                      data-oid="j6w2me-"
                    >
                      {type.description}
                    </p>

                    <h4
                      className="font-semibold text-gray-900 mb-4"
                      data-oid="487ua-r"
                    >
                      Beneficios clave:
                    </h4>
                    <ul className="space-y-3" data-oid="f3pjhca">
                      {type.benefits.map((benefit, index) => (
                        <li
                          key={index}
                          className="flex items-start"
                          data-oid="jwopkdi"
                        >
                          <Star
                            className="h-5 w-5 text-black mr-2 mt-0.5 flex-shrink-0"
                            data-oid="ehyvfrn"
                          />

                          <span className="text-gray-700" data-oid="cnmz77d">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div
                  className="relative h-96 rounded-xl overflow-hidden shadow-lg"
                  data-oid="9v-58zm"
                >
                  <img
                    src={`/images/${type.id === "wedding" ? "elegant-wedding" : type.id === "graduation" ? "graduation-limousine" : type.id === "birthday" ? "birthday-celebration" : type.id === "corporate" ? "corporate-car" : "concert-chauffeur"}.png`}
                    alt={`Servicio para ${type.title}`}
                    className="w-full h-full object-cover"
                    data-oid="ydd4m:0"
                  />

                  <div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-6"
                    data-oid="pp-2ml:"
                  >
                    <h3 className="text-xl font-bold mb-2" data-oid="sd6x2wq">
                      Servicio exclusivo para {type.title}
                    </h3>
                    <p className="text-sm opacity-90" data-oid="jbxkjc.">
                      Experiencia personalizada y atención a los detalles
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Why Choose Us */}
        <section className="mb-20" data-oid="80ya5v9">
          <h2
            className="text-3xl font-bold text-center text-gray-900 mb-12 relative"
            data-oid="c:lj_qy"
          >
            ¿Por qué elegirnos para su evento especial?
            <span
              className="block w-24 h-1 bg-black mx-auto mt-4"
              data-oid="24:lj_x"
            ></span>
          </h2>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            data-oid="ele:z1l"
          >
            <div
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
              data-oid="_.scpe0"
            >
              <div
                className="text-black mb-4 bg-gray-100 w-14 h-14 rounded-full flex items-center justify-center"
                data-oid="lm8tdy."
              >
                <Calendar className="h-8 w-8" data-oid="42lznnb" />
              </div>
              <h3
                className="text-xl font-semibold mb-3 text-gray-900"
                data-oid="f1u4y3y"
              >
                Planificación impecable
              </h3>
              <p className="text-gray-600 leading-relaxed" data-oid="rqiveu:">
                Coordinamos cada detalle con precisión, desde horarios hasta
                rutas y paradas especiales, para que pueda centrarse en
                disfrutar su evento.
              </p>
            </div>

            <div
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
              data-oid="-yu5n0k"
            >
              <div
                className="text-black mb-4 bg-gray-100 w-14 h-14 rounded-full flex items-center justify-center"
                data-oid="n1oojob"
              >
                <Clock className="h-8 w-8" data-oid="-..-sdf" />
              </div>
              <h3
                className="text-xl font-semibold mb-3 text-gray-900"
                data-oid="8sn22zw"
              >
                Puntualidad garantizada
              </h3>
              <p className="text-gray-600 leading-relaxed" data-oid="k7qiz_r">
                Llegamos siempre con anticipación y nos adaptamos a cualquier
                cambio de última hora en su evento, porque entendemos que la
                puntualidad es esencial.
              </p>
            </div>

            <div
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
              data-oid="3:ms238"
            >
              <div
                className="text-black mb-4 bg-gray-100 w-14 h-14 rounded-full flex items-center justify-center"
                data-oid="uaqa7l7"
              >
                <UserCheck className="h-8 w-8" data-oid="pytgq-k" />
              </div>
              <h3
                className="text-xl font-semibold mb-3 text-gray-900"
                data-oid="nu25det"
              >
                Chóferes de élite
              </h3>
              <p className="text-gray-600 leading-relaxed" data-oid="yd-c3.c">
                Nuestros chóferes son profesionales con años de experiencia en
                eventos exclusivos, seleccionados por su discreción, cortesía y
                conocimiento.
              </p>
            </div>

            <div
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300"
              data-oid="f::stqu"
            >
              <div
                className="text-black mb-4 bg-gray-100 w-14 h-14 rounded-full flex items-center justify-center"
                data-oid="6977oyg"
              >
                <Car className="h-8 w-8" data-oid="2zl-ty7" />
              </div>
              <h3
                className="text-xl font-semibold mb-3 text-gray-900"
                data-oid="7.h.cei"
              >
                Flota exclusiva
              </h3>
              <p className="text-gray-600 leading-relaxed" data-oid="0_3q:qn">
                Vehículos de lujo meticulosamente mantenidos, desde elegantes
                sedanes ejecutivos hasta impresionantes limusinas, para
                satisfacer sus necesidades específicas.
              </p>
            </div>
          </div>
        </section>

        {/* Premium Experience */}
        <section className="mb-20" data-oid="k5m2_59">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            data-oid=".isnr1g"
          >
            <div data-oid="8b:3zt5">
              <h2
                className="text-3xl font-bold text-gray-900 mb-6"
                data-oid="ec6jm77"
              >
                Una experiencia premium en cada trayecto
              </h2>
              <p className="text-lg text-gray-600 mb-6" data-oid="8col9:u">
                Entendemos que su evento especial merece un servicio
                excepcional. Desde el momento en que se pone en contacto con
                nosotros hasta la última parada de su viaje, nos esforzamos por
                superar sus expectativas en cada detalle.
              </p>
              <p className="text-lg text-gray-600 mb-6" data-oid="_tpfk6d">
                Nuestro enfoque personalizado significa que adaptamos cada
                aspecto del servicio a sus necesidades específicas. Ya sea una
                llegada espectacular a una boda, un transporte discreto para un
                evento corporativo VIP o un viaje inolvidable para una
                celebración familiar, diseñamos la experiencia perfecta.
              </p>
              <div
                className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6"
                data-oid="9bk:8:e"
              >
                <h3
                  className="font-semibold text-xl text-gray-900 mb-3"
                  data-oid="wi_e4xu"
                >
                  Personalización completa
                </h3>
                <p className="text-gray-600" data-oid="fb.oejm">
                  Desde la selección del vehículo ideal hasta los pequeños
                  detalles como bebidas preferidas, música ambiental o
                  decoración temática, su servicio se adapta completamente a sus
                  deseos.
                </p>
              </div>
              <div
                className="bg-gray-50 p-6 rounded-lg border border-gray-200"
                data-oid="wcai_xo"
              >
                <h3
                  className="font-semibold text-xl text-gray-900 mb-3"
                  data-oid="yfw7e2o"
                >
                  Tranquilidad garantizada
                </h3>
                <p className="text-gray-600" data-oid="1q9sflg">
                  Con nuestra garantía de servicio, puede estar seguro de que su
                  evento transcurrirá sin contratiempos, permitiéndole
                  concentrarse en los momentos que realmente importan.
                </p>
              </div>
            </div>

            <div data-oid="9ec1.y4">
              <img
                src="/images/wedding2.jpeg"
                alt="Pareja elegante entrando a un vehículo premium con chófer"
                className="w-full h-auto rounded-xl shadow-lg object-cover mb-8"
                data-oid="9y6p:m."
              />

              <img
                src="/images/suv-limo.png"
                alt="Chófer profesional abriendo la puerta de un vehículo de lujo"
                className="w-full h-auto rounded-xl shadow-lg object-cover"
                data-oid="vnm-t4v"
              />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-20" data-oid="vyp.yiw">
          <h2
            className="text-3xl font-bold text-center text-gray-900 mb-12 relative"
            data-oid="09ol02h"
          >
            Lo que dicen nuestros clientes
            <span
              className="block w-24 h-1 bg-black mx-auto mt-4"
              data-oid="0btdk_1"
            ></span>
          </h2>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            data-oid="5s1lsbu"
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
                data-oid="b9nzeiu"
              >
                <div className="flex items-center mb-4" data-oid="myzslq7">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-gray-400 fill-current"
                      data-oid="qbeq:gu"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic" data-oid="auzu7:d">
                  "{testimonial.text}"
                </p>
                <div data-oid="yuto568">
                  <p className="font-semibold text-gray-900" data-oid="czw1w91">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500 text-sm" data-oid=".3pufoy">
                    {testimonial.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20" data-oid="876.:5o">
          <h2
            className="text-3xl font-bold text-center text-gray-900 mb-12 relative"
            data-oid="hmhbvtn"
          >
            Preguntas frecuentes sobre eventos especiales
            <span
              className="block w-24 h-1 bg-black mx-auto mt-4"
              data-oid="0-i-9am"
            ></span>
          </h2>

          <div className="space-y-4 max-w-4xl mx-auto" data-oid="dn_a.tl">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl border ${openFaqIndex === index ? "border-gray-200 shadow-md" : "border-gray-200"} overflow-hidden transition-all duration-300`}
                data-oid="ye2a0ai"
              >
                <button
                  className="flex justify-between items-center w-full p-6 text-left"
                  onClick={() => toggleFaq(index)}
                  data-oid="nwv:a29"
                >
                  <h3
                    className={`text-xl font-semibold ${openFaqIndex === index ? "text-gray-600" : "text-gray-900"}`}
                    data-oid=":0uk416"
                  >
                    {faq.question}
                  </h3>
                  <div
                    className={`${openFaqIndex === index ? "text-black bg-gray-100" : "text-gray-400 bg-gray-50"} rounded-full p-1 transition-colors duration-300`}
                    data-oid="in_02ud"
                  >
                    {openFaqIndex === index ? (
                      <ChevronUp className="h-5 w-5" data-oid="geqdfr9" />
                    ) : (
                      <ChevronDown className="h-5 w-5" data-oid="bqm7e:k" />
                    )}
                  </div>
                </button>
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    openFaqIndex === index
                      ? "max-h-[1000px] opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                  data-oid="dhskeyj"
                >
                  <div className="px-6 pb-6 pt-0" data-oid="k77djlh">
                    <div
                      className="border-t border-gray-200 pt-4 text-left"
                      data-oid="b4fza7j"
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
          data-oid="mrcddzc"
        >
          <div className="grid grid-cols-1 md:grid-cols-2" data-oid="m4imddp">
            <div
              className="p-8 lg:p-12 flex flex-col justify-center"
              data-oid="babq.af"
            >
              <h2 className="text-3xl font-bold mb-6" data-oid="b84p7cy">
                Haga que su próximo evento sea excepcional
              </h2>
              <p className="text-lg text-gray-300 mb-8" data-oid="i.1q451">
                Nuestro equipo de especialistas en eventos está listo para
                ayudarle a planificar el transporte perfecto para su ocasión
                especial. Reserve ahora o contáctenos para un servicio
                personalizado.
              </p>
              <div className="flex flex-wrap gap-4" data-oid="gmnmprp">
                <button
                  className="bg-gray-1000 hover:bg-black text-white py-3 px-6 rounded-lg font-medium transition-all duration-200"
                  data-oid="btxtevo"
                >
                  Reservar ahora
                </button>
                <button
                  className="bg-transparent border border-white hover:bg-white hover:text-gray-900 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200"
                  data-oid="99x4jr7"
                >
                  Solicitar presupuesto
                </button>
              </div>
            </div>
            <div
              className="relative min-h-[300px] md:min-h-full"
              data-oid="h4bdwdx"
            >
              <img
                src="/images/limo-leds.png"
                alt="Limusina elegante preparada para un evento especial"
                className="absolute inset-0 w-full h-full object-cover"
                data-oid=".u7wmx_"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer data-oid="qzmm:gp" />
    </div>
  );
};

export default SpecialEvents;
