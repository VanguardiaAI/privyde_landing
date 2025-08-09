import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import BlackFooter from '../components/BlackFooter';
import Image from '../components/ui/image';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSection {
  id: string;
  title: string;
  icon: string;
  faqs: FAQItem[];
}

const Help: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const faqSections: FAQSection[] = [
    {
      id: 'empezando',
      title: 'Empezando',
      icon: '/images/help_icons/empezando.svg',
      faqs: [
        {
          question: '¿Con cuánta anticipación debo reservar mi viaje?',
          answer: 'Puedes reservar hasta con 30 días de anticipación. Sin embargo, también contamos con confirmación inmediata, por si necesitas una solución eficiente en el momento.'
        },
        {
          question: '¿Puedo solicitar un traslado entre ciudades con Privyde?',
          answer: 'Sí. Ofrecemos traslados puerta a puerta con todas las comodidades. Indícanos el punto de salida, el destino y si deseas incluir alguna parada intermedia.'
        },
        {
          question: '¿Puedo añadir paradas durante mi trayecto?',
          answer: 'Sí. Al reservar puedes incluir tantas paradas como necesites. Nuestro sistema calculará el tiempo estimado y tu chofer estará informado de cada punto.'
        },
        {
          question: '¿Qué incluye el servicio de traslados al aeropuerto con Privyde?',
          answer: 'Nuestros traslados al aeropuerto incluyen tiempo adicional de espera gratuito y seguimiento de tu vuelo en tiempo real. De este modo, el chofer ajusta su llegada si tu vuelo se retrasa. A tu arribo, te asistirá con el equipaje para que el proceso sea rápido y cómodo.'
        },
        {
          question: '¿Qué sucede si mi vuelo se retrasa?',
          answer: 'No tienes que preocuparte. Supervisamos tu itinerario en tiempo real para ajustar el servicio sin que debas hacer nada. Estamos pendientes de ti desde el primer minuto.'
        },
        {
          question: '¿Cómo funciona el servicio de chofer por horas o por días?',
          answer: 'Tendrás un conductor exclusivo durante el tiempo que necesites, disponible para cada parada o cambio en tu agenda. Es la opción ideal si buscas flexibilidad, sin perder elegancia ni continuidad.'
        },
        {
          question: '¿Qué distingue a un traslado corporativo con Privyde?',
          answer: 'Discreción, puntualidad y atención personalizada. Ya sea para una reunión, una visita internacional o una jornada completa, nuestro equipo y flota están preparados para acompañarte con excelencia.'
        }
      ]
    },
    {
      id: 'gestion-reservas',
      title: 'Gestión de reservas',
      icon: '/images/help_icons/gestion_de_reservas.svg',
      faqs: [
        {
          question: '¿Cómo puedo modificar o cancelar mi reserva?',
          answer: 'Puedes hacerlo fácilmente desde nuestra app. Si necesitas asistencia, estaremos encantados de ayudarte a través de nuestro equipo de atención, disponible en todo momento.'
        },
        {
          question: '¿Cómo agendo un traslado VIP para un cliente o ejecutivo de alto nivel?',
          answer: 'Puedes reservarlo directamente desde nuestra app o, si prefieres, contactarnos para diseñar una experiencia personalizada. Coordinaremos cada detalle según tus necesidades.'
        }
      ]
    },
    {
      id: 'facturacion-pago',
      title: 'Facturación y pago',
      icon: '/images/help_icons/facturacion_y_pago.svg',
      faqs: []
    },
    {
      id: 'mi-cuenta',
      title: 'Mi cuenta de Privyde',
      icon: '/images/help_icons/mi_cuenta.svg',
      faqs: [
        {
          question: '¿A quién puedo contactar si tengo dudas antes o durante mi viaje?',
          answer: 'Nuestro equipo está disponible las 24 horas, todos los días. Puedes escribirnos vía chat, correo o directamente desde la app. Estaremos aquí para ti, con la atención que esperas.'
        }
      ]
    },
    {
      id: 'llamada-chofer',
      title: '¿Cómo llamar a mi chofer?',
      icon: '/images/help_icons/llamada_chofer.svg',
      faqs: [
        {
          question: '¿Cómo sabré que mi chofer ya está en el punto de encuentro?',
          answer: 'Te notificaremos en cuanto esté en camino y cuando haya llegado. Además, tendrás acceso a su ubicación en tiempo real, para que no pierdas un solo minuto.'
        },
        {
          question: '¿Tu chofer puede ayudarte con alguna tarea mientras espera?',
          answer: 'Sí, si tienes alguna indicación especial —como asistencia con equipaje o alguna gestión sencilla durante la espera— puedes detallarla en tu solicitud. Con gusto lo consideraremos.'
        }
      ]
    },
    {
      id: 'seguridad',
      title: 'Preguntas frecuentes sobre seguridad',
      icon: '/images/help_icons/seguridad.svg',
      faqs: [
        {
          question: '¿Necesitas seguridad adicional para tu viaje?',
          answer: 'Podemos incluir un escolta ejecutivo certificado en tu servicio. Si deseas este acompañamiento, indícalo al momento de reservar o escríbenos, y lo gestionaremos con discreción.'
        },
        {
          question: '¿Puedo solicitar un chofer con experiencia en protocolos de seguridad?',
          answer: 'Sí. Contamos con conductores capacitados en conducción defensiva y operaciones de alto perfil. Infórmanos al reservar para asignarte el perfil más adecuado.'
        }
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const filteredSections = faqSections.map(section => ({
    ...section,
    faqs: section.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }));

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Search Section */}
      <section className="bg-black py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-16">
          <h1 
            className="text-3xl md:text-5xl text-white text-center mb-8 uppercase tracking-wider"
            style={{ fontFamily: 'CONTHRAX-SB' }}
          >
            ¿CÓMO PODEMOS AYUDARTE?
          </h1>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-12 md:py-20 pb-32 md:pb-48 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSections.map((section) => {
              const isExpanded = expandedSection === section.id;
              const hasContent = section.faqs.length > 0;
              
              // Determine subtitle based on section
              let subtitle = "Todo lo que necesitas saber antes de reservar tu viaje";
              if (section.id === 'gestion-reservas') {
                subtitle = "Encuentra su respuesta sobre cómo cambiar y cancelar su viaje.";
              }
              
              return (
                <div
                  key={section.id}
                  className={`bg-gray-100 rounded-lg overflow-hidden transition-all duration-300 ${
                    isExpanded && hasContent ? 'md:col-span-2' : ''
                  }`}
                >
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full p-6 flex items-center justify-between hover:bg-gray-200 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <img 
                        src={section.icon} 
                        alt={section.title}
                        className="w-12 h-12"
                      />
                      <div className="text-left">
                        <h3 className="text-lg font-bold text-gray-900">
                          {section.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {subtitle}
                        </p>
                      </div>
                    </div>
                    {hasContent && (
                      <div className="ml-4">
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                        )}
                      </div>
                    )}
                  </button>
                  
                  {/* Expanded Content */}
                  {isExpanded && hasContent && (
                    <div className="px-6 pb-6">
                      <div className="border-t border-gray-300 pt-4">
                        <div className="space-y-4">
                          {section.faqs.map((faq, index) => (
                            <div key={index} className="text-left">
                              <h4 className="font-bold text-gray-900 mb-2">
                                {faq.question}
                              </h4>
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Phone Mockup Overlap - Positioned for Footer */}
      <div className="relative hidden lg:block">
        <div className="absolute right-0 bottom-0 transform translate-y-2/3 z-30">
          <div className="relative w-[700px] xl:w-[800px] 2xl:w-[900px]">
            <Image
              src="/images/smartphone_14_pro_31.webp"
              alt="Privyde App"
              width={900}
              height={1800}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Black Footer */}
      <BlackFooter />
    </div>
  );
};

export default Help;