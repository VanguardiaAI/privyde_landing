import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import BlackFooter from '../components/BlackFooter';
import Image from '../components/ui/image';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Get translated FAQs for each section
  const gettingStartedFaqs = t('help.faqs.gettingStarted', { returnObjects: true }) as FAQItem[];
  const bookingManagementFaqs = t('help.faqs.bookingManagement', { returnObjects: true }) as FAQItem[];
  const billingPaymentFaqs = t('help.faqs.billingPayment', { returnObjects: true }) as FAQItem[];
  const myAccountFaqs = t('help.faqs.myAccount', { returnObjects: true }) as FAQItem[];
  const contactDriverFaqs = t('help.faqs.contactDriver', { returnObjects: true }) as FAQItem[];
  const securityFaqs = t('help.faqs.security', { returnObjects: true }) as FAQItem[];

  const faqSections: FAQSection[] = [
    {
      id: 'empezando',
      title: t('help.sections.gettingStarted.title'),
      icon: '/images/help_icons/empezando.svg',
      faqs: gettingStartedFaqs
    },
    {
      id: 'gestion-reservas',
      title: t('help.sections.bookingManagement.title'),
      icon: '/images/help_icons/gestion_de_reservas.svg',
      faqs: bookingManagementFaqs
    },
    {
      id: 'facturacion-pago',
      title: t('help.sections.billingPayment.title'),
      icon: '/images/help_icons/facturacion_y_pago.svg',
      faqs: billingPaymentFaqs
    },
    {
      id: 'mi-cuenta',
      title: t('help.sections.myAccount.title'),
      icon: '/images/help_icons/mi_cuenta.svg',
      faqs: myAccountFaqs
    },
    {
      id: 'llamada-chofer',
      title: t('help.sections.contactDriver.title'),
      icon: '/images/help_icons/llamada_chofer.svg',
      faqs: contactDriverFaqs
    },
    {
      id: 'seguridad',
      title: t('help.sections.security.title'),
      icon: '/images/help_icons/seguridad.svg',
      faqs: securityFaqs
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
            {t('help.title')}
          </h1>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t('help.searchPlaceholder')}
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
              
              // Get the appropriate subtitle for each section
              const sectionKey = 
                section.id === 'empezando' ? 'gettingStarted' :
                section.id === 'gestion-reservas' ? 'bookingManagement' :
                section.id === 'facturacion-pago' ? 'billingPayment' :
                section.id === 'mi-cuenta' ? 'myAccount' :
                section.id === 'llamada-chofer' ? 'contactDriver' :
                section.id === 'seguridad' ? 'security' : 'gettingStarted';
              
              const subtitle = t(`help.sections.${sectionKey}.subtitle`);
              
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
            <div className="relative">
              <Image
                src="/images/smartphone_14_pro_31.webp"
                alt="Privyde App"
                width={900}
                height={1800}
                className="w-full h-auto"
              />
              {/* Black gradient overlay for bottom-left corner */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Radial gradient for corner - BLACK */}
                <div 
                  className="absolute -bottom-20 -left-20 w-96 h-96"
                  style={{
                    background: 'radial-gradient(circle at center, black 0%, rgba(0,0,0,0.9) 15%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.4) 50%, transparent 70%)',
                  }}
                ></div>
                {/* Linear gradient for bottom edge - BLACK */}
                <div 
                  className="absolute bottom-0 left-0 w-2/3 h-40"
                  style={{
                    background: 'linear-gradient(to top, black 0%, rgba(0,0,0,0.8) 30%, transparent 100%)',
                    transform: 'translateY(50%)'
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Black Footer */}
      <BlackFooter />
    </div>
  );
};

export default Help;