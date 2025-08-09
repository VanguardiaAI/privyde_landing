import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Drivers: React.FC = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const benefits = [
    {
      title: t('drivers.whyDrive.fairPayments.title'),
      image: "/images/choffeurs/Pagos Justos y Confiables.webp",
      hoverTitle: t('drivers.whyDrive.fairPayments.hoverTitle'),
      description: t('drivers.whyDrive.fairPayments.description')
    },
    {
      title: t('drivers.whyDrive.flexibility.title'),
      image: "/images/choffeurs/Tu eliges Cuando y donde.webp",
      hoverTitle: t('drivers.whyDrive.flexibility.hoverTitle'),
      description: t('drivers.whyDrive.flexibility.description')
    },
    {
      title: t('drivers.whyDrive.international.title'),
      image: "/images/choffeurs/Presencia Internacional.webp",
      hoverTitle: t('drivers.whyDrive.international.hoverTitle'),
      description: t('drivers.whyDrive.international.description')
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % benefits.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + benefits.length) % benefits.length);
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[35vh] md:h-[70vh] overflow-hidden bg-black">
        {/* Background Image */}
        <img 
          src="/images/choffeurs/Banner_choferes.webp"
          alt="Chofer profesional de Privyde"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Title - Aligned to the right */}
        <div className="absolute bottom-0 left-0 right-0 px-4 md:px-16 py-6 md:py-8">
          <div className="max-w-7xl mx-auto">
            <h1 
              className="text-3xl md:text-5xl lg:text-6xl uppercase tracking-wider text-center md:text-right"
              style={{ fontFamily: 'CONTHRAX-SB' }}
            >
              {t('drivers.hero.title').split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index === 0 && <br />}
                </React.Fragment>
              ))}
            </h1>
          </div>
        </div>
      </section>

      {/* Black divider to prevent gray line */}
      <div className="w-full h-2 bg-black relative z-10" style={{ marginTop: '-2px', marginBottom: '-2px' }}></div>

      {/* Description Section */}
      <section className="bg-black py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-16">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-lg md:text-xl font-medium mb-4">
              {t('drivers.hero.subtitle')}
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              {t('drivers.hero.description')}
            </p>
          </div>
          {/* Separator Line */}
          <div className="w-full h-0.5 bg-white mt-6 md:mt-8"></div>
        </div>
      </section>

      {/* Why Drive with Privyde Section */}
      <section className="bg-black py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-16">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl text-center mb-12 uppercase tracking-wider"
            style={{ fontFamily: 'CONTHRAX-SB' }}
          >
            {t('drivers.whyDrive.title')}
          </h2>
          
          {/* Desktop Grid / Mobile Slider */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="relative group h-64 overflow-hidden rounded-lg cursor-pointer">
                <img 
                  src={benefit.image} 
                  alt={benefit.hoverTitle}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/20"></div>
                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 p-4 z-10 transition-opacity duration-300 group-hover:opacity-0">
                  <h3 className="text-white text-lg font-bold text-left whitespace-pre-line">
                    {benefit.title}
                  </h3>
                </div>
                {/* Hover Card */}
                <div className="absolute inset-0 bg-white p-6 flex flex-col justify-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <h3 className="text-black text-xl font-bold mb-3">
                    {benefit.hoverTitle}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Slider */}
          <div className="md:hidden relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {benefits.map((benefit, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-12">
                    <div 
                      className="relative aspect-square overflow-hidden rounded-lg cursor-pointer max-w-xs mx-auto"
                      onClick={() => setActiveCard(activeCard === index ? null : index)}
                    >
                      <img 
                        src={benefit.image} 
                        alt={benefit.hoverTitle}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-black/20"></div>
                      {/* Title Overlay - Hidden when card is active */}
                      <div className={`absolute bottom-0 left-0 p-4 z-10 transition-opacity duration-300 ${activeCard === index ? 'opacity-0' : 'opacity-100'}`}>
                        <h3 className="text-white text-lg font-bold text-left whitespace-pre-line">
                          {benefit.title}
                        </h3>
                      </div>
                      {/* Active Card - White overlay with description */}
                      <div className={`absolute inset-0 bg-white p-6 flex flex-col justify-center transform transition-transform duration-500 ease-out ${
                        activeCard === index ? 'translate-y-0' : 'translate-y-full'
                      }`}>
                        <h3 className="text-black text-xl font-bold mb-3">
                          {benefit.hoverTitle}
                        </h3>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Slider Navigation */}
            <button 
              onClick={() => {
                prevSlide();
                setActiveCard(null);
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-r-lg"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button 
              onClick={() => {
                nextSlide();
                setActiveCard(null);
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-l-lg"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
            
            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {benefits.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentSlide(index);
                    setActiveCard(null);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'bg-white w-6' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="bg-black py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-16">
          <div className="flex flex-row items-end gap-0">
            {/* Person Image */}
            <div className="flex-shrink-0 relative z-10">
              <img 
                src="/images/choffeurs/Requisitos.webp" 
                alt="Socio conductor de Privyde"
                className="w-32 sm:w-48 md:w-80 h-auto"
              />
            </div>
            
            {/* White Container */}
            <div className="bg-white text-black p-4 sm:p-6 md:p-10 rounded-lg flex-1 -ml-10 sm:-ml-16 md:-ml-20 pl-12 sm:pl-20 md:pl-28 min-h-[160px] sm:min-h-[200px] md:min-h-[280px] flex flex-col justify-center">
              <h3 className="text-sm sm:text-lg md:text-2xl font-bold mb-2 sm:mb-4 md:mb-6 text-center">
                {t('drivers.requirements.title')}
              </h3>
              <ul className="space-y-1 sm:space-y-2 md:space-y-4 text-left">
                {(t('drivers.requirements.items', { returnObjects: true }) as string[]).map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-gray-600 mr-1 sm:mr-2 text-xs sm:text-sm">•</span>
                    <span className="text-gray-700 text-xs sm:text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black py-12 md:py-16 pb-24 md:pb-32">
        <div className="max-w-4xl mx-auto px-4 md:px-16 text-center">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl mb-8 uppercase tracking-wider"
            style={{ fontFamily: 'CONTHRAX-SB' }}
          >
            {t('drivers.cta.title').split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < t('drivers.cta.title').split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            {t('drivers.cta.subtitle')}
          </p>
          <button className="bg-white text-black px-8 py-3 rounded-md text-lg font-bold hover:bg-gray-100 transition-colors duration-300">
            {t('drivers.cta.button')}
          </button>
        </div>
      </section>

      {/* Phone Mockup Overlap - Positioned for Footer */}
      <div className="relative hidden lg:block">
        <div className="absolute right-0 bottom-0 transform translate-y-2/3 z-30">
          <div className="relative w-[700px] xl:w-[800px] 2xl:w-[900px]">
            <img
              src="/images/smartphone_14_pro_31.webp"
              alt="Privyde App"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Drivers;