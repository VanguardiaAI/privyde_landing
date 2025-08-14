import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "@/components/ui/image";
import BookingForm from "@/components/booking-form";
import DownloadSection from "@/components/download-section";
import Navbar from "@/components/Navbar";
import BlackFooter from "@/components/BlackFooter";
import SupportChat from "@/components/SupportChat";
import "../styles/privyde.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

// This will be populated inside the component with translations




// Testimonials data will be populated inside the component with translations

export default function Home() {
  const { t } = useTranslation();
  const [currentServiceSlide, setCurrentServiceSlide] = useState(0);
  const [currentTestimonialSlide, setCurrentTestimonialSlide] = useState(0);
  const [visibleBenefit, setVisibleBenefit] = useState<number | null>(null);
  const [clickedBenefit, setClickedBenefit] = useState<number | null>(null);
  const benefitRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Services data with translations - Mobile only shows first 6
  const mobileServicesData = [
    {
      id: 0,
      title: t('landing.services.longDistance.title'),
      description: t('landing.services.longDistance.cardDescription'),
      imageUrl: "/images/services/Servicio -Coche de larga distancia.webp",
      linkText: t('landing.services.longDistance.seeMore'),
      linkHref: "/city-to-city",
    },
    {
      id: 1,
      title: t('landing.services.airport.title'),
      description: t('landing.services.airport.cardDescription'),
      imageUrl: "/images/services/Servicio-Traslado en Aeropuertos.webp",
      linkText: t('landing.services.airport.seeMore'),
      linkHref: "/airport-transfers",
    },
    {
      id: 2,
      title: t('landing.services.hourly.title'),
      description: t('landing.services.hourly.cardDescription'),
      imageUrl: "/images/services/Servicio - Alquiler de Choferes.webp",
      linkText: t('landing.services.hourly.seeMore'),
      linkHref: "/hourly-hire",
    },
    {
      id: 3,
      title: t('landing.services.events.title'),
      description: t('landing.services.events.cardDescription'),
      imageUrl: "/images/services/Servicios - Eventos especiales.webp",
      linkText: t('landing.services.events.seeMore'),
      linkHref: "/special-events",
    },
    {
      id: 4,
      title: t('landing.services.corporate.title'),
      description: t('landing.services.corporate.cardDescription'),
      imageUrl: "/images/services/Servicios - Traslados Corporativos VIP.webp",
      linkText: t('landing.services.corporate.seeMore'),
      linkHref: "/corporate-transfers",
    },
    {
      id: 5,
      title: t('landing.services.security.title'),
      description: t('landing.services.security.cardDescription'),
      imageUrl: "/images/services/Servicio - Seguridad Ejecutiva.webp",
      linkText: t('landing.services.security.seeMore'),
      linkHref: "/security-services",
    },
  ];

  // Desktop services include two additional services
  const desktopServicesData = [
    {
      id: 0,
      title: t('landing.services.longDistance.title'),
      cardTitle: t('landing.services.longDistance.cardTitle'),
      description: t('landing.services.longDistance.cardDescription'),
      imageUrl: "/images/services/Servicio -Coche de larga distancia.webp",
      linkText: t('landing.services.longDistance.seeMore'),
      linkHref: "/city-to-city",
    },
    {
      id: 1,
      title: t('landing.services.airport.title'),
      cardTitle: t('landing.services.airport.cardTitle'),
      description: t('landing.services.airport.cardDescription'),
      imageUrl: "/images/services/Servicio-Traslado en Aeropuertos.webp",
      linkText: t('landing.services.airport.seeMore'),
      linkHref: "/airport-transfers",
    },
    {
      id: 2,
      title: t('landing.services.hourly.title'),
      cardTitle: t('landing.services.hourly.cardTitle'),
      description: t('landing.services.hourly.cardDescription'),
      imageUrl: "/images/services/Servicio - Alquiler de Choferes.webp",
      linkText: t('landing.services.hourly.seeMore'),
      linkHref: "/hourly-hire",
    },
    {
      id: 3,
      title: t('landing.services.events.title'),
      cardTitle: t('landing.services.events.cardTitle'),
      description: t('landing.services.events.cardDescription'),
      imageUrl: "/images/services/Servicios - Eventos especiales.webp",
      linkText: t('landing.services.events.seeMore'),
      linkHref: "/special-events",
    },
    {
      id: 4,
      title: t('landing.services.corporate.title'),
      cardTitle: t('landing.services.corporate.cardTitle'),
      description: t('landing.services.corporate.cardDescription'),
      imageUrl: "/images/services/Servicios - Traslados Corporativos VIP.webp",
      linkText: t('landing.services.corporate.seeMore'),
      linkHref: "/corporate-transfers",
    },
    {
      id: 5,
      title: t('landing.services.security.title'),
      cardTitle: t('landing.services.security.cardTitle'),
      description: t('landing.services.security.cardDescription'),
      imageUrl: "/images/services/Servicio - Seguridad Ejecutiva.webp",
      linkText: t('landing.services.security.seeMore'),
      linkHref: "/security-services",
    },
    {
      id: 6,
      title: t('landing.services.limousine.title'),
      cardTitle: t('landing.services.limousine.cardTitle'),
      description: t('landing.services.limousine.cardDescription'),
      imageUrl: "/images/services/Servicios - Eventos especiales.webp", // Placeholder image
      linkText: t('landing.services.limousine.seeMore'),
      linkHref: "/limousine-services",
    },
    {
      id: 7,
      title: t('landing.services.privateJets.title'),
      cardTitle: t('landing.services.privateJets.cardTitle'),
      description: t('landing.services.privateJets.cardDescription'),
      imageUrl: "/images/services/Servicios - Traslados Corporativos VIP.webp", // Placeholder image
      linkText: t('landing.services.privateJets.seeMore'),
      linkHref: "/private-jets",
    },
  ];

  // Testimonials data with translations
  const testimonialsData = [
    {
      id: 1,
      name: t('landing.testimonials.renata.name'),
      role: t('landing.testimonials.renata.role'),
      image: "https://i.pravatar.cc/150?img=1",
      text: t('landing.testimonials.renata.text'),
      rating: 5
    },
    {
      id: 2,
      name: t('landing.testimonials.marcelo.name'),
      role: t('landing.testimonials.marcelo.role'),
      image: "https://i.pravatar.cc/150?img=3",
      text: t('landing.testimonials.marcelo.text'),
      rating: 5
    },
    {
      id: 3,
      name: t('landing.testimonials.lorenzo.name'),
      role: t('landing.testimonials.lorenzo.role'),
      image: "https://i.pravatar.cc/150?img=8",
      text: t('landing.testimonials.lorenzo.text'),
      rating: 5
    }
  ];

  const handleNextService = () => {
    setCurrentServiceSlide((prev) => (prev + 1) % mobileServicesData.length);
  };

  const handlePrevService = () => {
    setCurrentServiceSlide((prev) => (prev - 1 + mobileServicesData.length) % mobileServicesData.length);
  };

  // Intersection Observer for benefits scroll animation
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    let intersectionRatios: Map<number, number> = new Map();
    let lastUpdateTime = 0;
    let updateTimeout: NodeJS.Timeout | null = null;
    
    const updateVisibleBenefit = (newIndex: number | null) => {
      const now = Date.now();
      const timeSinceLastUpdate = now - lastUpdateTime;
      
      // Clear any pending update
      if (updateTimeout) {
        clearTimeout(updateTimeout);
        updateTimeout = null;
      }
      
      // If we just updated recently, delay this update slightly
      if (timeSinceLastUpdate < 100) {
        updateTimeout = setTimeout(() => {
          lastUpdateTime = Date.now();
          setVisibleBenefit(newIndex);
        }, 100 - timeSinceLastUpdate);
      } else {
        lastUpdateTime = now;
        setVisibleBenefit(newIndex);
      }
    };
    
    benefitRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                intersectionRatios.set(index, entry.intersectionRatio);
              } else {
                intersectionRatios.delete(index);
              }
            });
            
            // Find the benefit with the highest intersection ratio
            let maxRatio = 0;
            let selectedIndex: number | null = null;
            
            intersectionRatios.forEach((ratio, idx) => {
              if (ratio > maxRatio) {
                maxRatio = ratio;
                selectedIndex = idx;
              }
            });
            
            // Add small hysteresis to prevent flickering
            const currentVisible = visibleBenefit;
            if (currentVisible !== null && selectedIndex !== null && currentVisible !== selectedIndex) {
              const currentRatio = intersectionRatios.get(currentVisible) || 0;
              const selectedRatio = intersectionRatios.get(selectedIndex) || 0;
              
              // Only require a small difference to change (5%)
              if (selectedRatio - currentRatio < 0.05) {
                return;
              }
            }
            
            updateVisibleBenefit(selectedIndex);
          },
          {
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            rootMargin: "-20% 0px -20% 0px"
          }
        );
        
        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => {
      if (updateTimeout) {
        clearTimeout(updateTimeout);
      }
      observers.forEach((observer) => observer.disconnect());
    };
  }, [visibleBenefit]);

  // Auto-advance Services slider on mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceSlide((prev) => (prev + 1) % mobileServicesData.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [mobileServicesData.length]);

  return (
    <main className="min-h-screen w-full overflow-x-hidden" data-oid="1-ud.ut">
      {/* Navigation */}
      <Navbar data-oid="7wtpkco" />

      {/* Hero Section - Desktop */}
      <div className="hidden lg:flex flex-col w-full" data-oid="jy:n-tp">
        <div
          className="hero-container relative"
          data-oid="q54zzv_"
          key="olk-mneH"
        >
          {/* Background Image */}
          <div className="full-size-background" data-oid="64x6tn6">
            <img
              className="w-full h-full object-cover"
              data-oid="x_a.lnz"
              src="/images/Banner inicio.webp"
              alt="Banner inicio.webp"
              key="olk-oyVg"
            />
            {/* Black gradient overlay at bottom */}
            <div 
              className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none"
              style={{ zIndex: 10 }}
            />
          </div>

          {/* Booking Widget - Solo visible en pantallas grandes (lg) */}
          <div
            className="booking-widget-container-overlay hidden lg:block"
            data-oid="_sf4p77"
          >
            {/* Título y subtítulo */}
            <div className="booking-title-container">
              <h1 className="booking-title">{t('landing.hero.cta.requestRide').toUpperCase()}</h1>
              <p className="booking-subtitle">{t('landing.hero.headline').split('.')[1].trim()}</p>
            </div>
            
            {/* Formulario de reserva */}
            <div className="booking-form-wrapper">
              <BookingForm data-oid="9q8:r8_" />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section - Mobile */}
      <div className="lg:hidden flex flex-col w-full">
        {/* Hero Image Container */}
        <div className="relative w-full bg-black" style={{ height: '50vh', minHeight: '360px', maxHeight: '430px' }}>
          <img
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 25%' }}
            src="/images/Banner inicio.webp"
            alt="Banner inicio.webp"
          />
          {/* Black gradient overlay at bottom for better text readability */}
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black via-black/70 to-transparent" />
          {/* Solid black overlay at very bottom to ensure no gaps */}
          <div className="absolute inset-x-0 bottom-0 h-2 bg-black" />
          
          {/* Title Overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 pb-4 px-4">
            <div className="text-center">
              <h1 className="font-bold text-3xl sm:text-4xl mb-1 text-white" 
                  style={{ 
                    fontFamily: 'CONTHRAX-SB, sans-serif', 
                    letterSpacing: '0.05em', 
                    textTransform: 'uppercase',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
                  }}>
                SOLICITA TU VIAJE
              </h1>
              <p className="text-base sm:text-lg text-white" 
                 style={{ 
                   fontFamily: 'Panton, sans-serif',
                   textShadow: '1px 1px 3px rgba(0, 0, 0, 0.8)'
                 }}>
                Estás a un clic de viajar mejor
              </p>
            </div>
          </div>
        </div>
        
        {/* Booking Form Below Image - Black background section */}
        <div className="bg-black w-full -mt-1">
          <div className="mx-auto px-8 sm:px-12 w-full max-w-4xl pt-2 pb-6">
            <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
              <BookingForm data-oid="acct:ti" />
            </div>
          </div>
        </div>
      </div>

      {/* Download Section - Desktop */}
      <div className="hidden lg:block">
        <DownloadSection data-oid="a7-6ogm" />
      </div>

      {/* Mobile Text Section - Same content as DownloadSection but without grid background */}
      <div className="lg:hidden bg-black text-white pt-4 pb-16 px-6 -mt-px">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm mb-8 leading-relaxed" style={{ fontFamily: 'Panton, sans-serif' }}>
            {t('landing.hero.subtitle')}
          </p>
          <h1 className="text-3xl font-bold mb-3 uppercase tracking-wider" 
              style={{ fontFamily: 'CONTHRAX-SB, sans-serif' }}>
            {t('landing.hero.cta.requestRide').toUpperCase()}
          </h1>
          <p className="text-lg mb-10" style={{ fontFamily: 'Panton, sans-serif' }}>
            {t('landing.hero.cta.discoverExperience')}
          </p>
          {/* Download Buttons */}
          <div className="flex flex-row items-center justify-center gap-3 mb-12">
            <a href="#" className="hover:opacity-80 transition-opacity">
              <Image
                src="/appstore.png"
                alt="Download on the App Store"
                width={120}
                height={40}
                className="w-[120px] h-[40px]"
              />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              <Image
                src="/googleplay.png"
                alt="Get it on Google Play"
                width={120}
                height={40}
                className="w-[120px] h-[40px]"
              />
            </a>
          </div>
          {/* White separator line */}
          <div className="w-full h-px bg-white/50"></div>
        </div>
      </div>

      {/* Sustainability Partners & Services Section */}
      <section className="py-12 md:py-20 pb-64 md:pb-80 bg-black -mt-px border-t border-black" data-oid="lpxmfw6">
        <div className="container mx-auto px-4 max-w-6xl" data-oid="14-b:c4">
          {/* Servicios Title */}
          <h2
            className="text-3xl md:text-4xl font-bold text-center text-white mb-10 md:mb-16"
            data-oid="xg-8vm0"
            style={{ fontFamily: 'CONTHRAX-SB, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}
          >
            {t('landing.services.title')}
          </h2>

          {/* Mobile Service Slider */}
          <div className="md:hidden relative">
            {/* Services Container with smooth transitions */}
            <div className="relative aspect-[4/5] mx-auto max-w-sm overflow-hidden rounded-2xl">
              {mobileServicesData.map((service, index) => (
                <div
                  key={service.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentServiceSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-sm text-white/80 line-clamp-3">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={handlePrevService}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button 
              onClick={handleNextService}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {mobileServicesData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentServiceSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentServiceSlide ? 'bg-white w-6' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Desktop Service Cards Grid - dynamic rendering */}
          <div
            className="hidden md:grid grid-cols-2 md:grid-cols-3 gap-0"
            data-oid="vstr2vl"
          >
            {desktopServicesData.slice(0, 6).map((service) => (
              <Link
                key={service.id}
                to={service.linkHref}
                className="relative aspect-square overflow-hidden group"
              >
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <h3 className="text-white text-xl md:text-2xl font-bold text-center">
                    {service.title}
                  </h3>
                </div>
                {/* Hover card with description */}
                <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <h3 className="text-black text-xl md:text-2xl font-bold text-center mb-4">
                    {service.cardTitle}
                  </h3>
                  <p className="text-black text-sm md:text-base text-center mb-6">
                    {service.description}
                  </p>
                  <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors font-medium">
                    {service.linkText}
                  </button>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Ver todos los servicios button */}
          <div className="text-center mt-12">
            <Link 
              to="/our-services" 
              className="inline-block bg-white text-black px-8 py-3 rounded-md hover:bg-gray-200 transition-colors font-semibold uppercase tracking-wide"
            >
              {t('landing.services.seeAll') || 'Ver todos los servicios'}
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Image Divider */}
      <div className="relative">
        {/* Image positioned between sections */}
        <div className="absolute inset-x-0 top-0 transform -translate-y-1/2">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative h-[300px] md:h-[400px]">
                <Image
                  src="/images/benefits/Inicio-Beneficios.webp"
                  alt="Beneficios de elegir Privyde"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex items-end justify-center pb-8 md:pb-12">
                  <h2 className="text-3xl md:text-5xl font-bold text-white text-center uppercase tracking-wider"
                      style={{ fontFamily: 'CONTHRAX-SB, sans-serif' }}>
                    {t('landing.benefits.title')}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="bg-white pt-64 md:pt-80 pb-16 md:pb-24">
        {/* Content */}
        <div className="container mx-auto px-4 max-w-6xl">

          {/* Benefits icons - Desktop version (horizontal) */}
          <div className="hidden md:flex flex-wrap justify-center items-center gap-4 md:gap-8 mb-12">
            {/* Icon 1 - Protection */}
            <div className="relative group">
              <img 
                src="/images/benefits/Iconos_Mesa de trabajo 1.svg" 
                alt="Protección integral"
                className="w-20 h-20 md:w-24 md:h-24 cursor-pointer transition-transform hover:scale-110"
              />
              {/* Hover dialog */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                <div className="bg-black text-white p-3 rounded-lg shadow-xl w-64">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                    <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-black"></div>
                  </div>
                  <h4 className="font-semibold mb-1 text-sm">Protección integral en todo momento</h4>
                  <p className="text-xs leading-relaxed">Viaja respaldado por choferes verificados, monitoreo constante, seguros incluidos y opcional de escoltas privados certificados.</p>
                </div>
              </div>
            </div>

            {/* Connecting lines */}
            <div className="hidden md:block w-16 h-0.5 bg-gray-300"></div>

            {/* Icon 2 - Personalized attention */}
            <div className="relative group">
              <img 
                src="/images/benefits/Iconos-02.svg" 
                alt="Atención personalizada"
                className="w-20 h-20 md:w-24 md:h-24 cursor-pointer transition-transform hover:scale-110"
              />
              {/* Hover dialog */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                <div className="bg-black text-white p-3 rounded-lg shadow-xl w-64">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                    <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-black"></div>
                  </div>
                  <h4 className="font-semibold mb-1 text-sm">Atención personalizada, sin importar el lugar</h4>
                  <p className="text-xs leading-relaxed">Choferes que te conocen, asistencia desde la puerta y servicio humano. Nos adaptamos a tus necesidades en todo momento.</p>
                </div>
              </div>
            </div>

            {/* Connecting lines */}
            <div className="hidden md:block w-16 h-0.5 bg-gray-300"></div>

            {/* Icon 3 - Premium fleet */}
            <div className="relative group">
              <img 
                src="/images/benefits/Iconos-03.svg" 
                alt="Flota premium"
                className="w-20 h-20 md:w-24 md:h-24 cursor-pointer transition-transform hover:scale-110"
              />
              {/* Hover dialog */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                <div className="bg-black text-white p-3 rounded-lg shadow-xl w-64">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                    <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-black"></div>
                  </div>
                  <h4 className="font-semibold mb-1 text-sm">Flota premium para cada ocasión</h4>
                  <p className="text-xs leading-relaxed">SUVs, sedanes ejecutivos, vans de lujo o autos eléctricos. Mantenemos cada unidad impecable, moderna y equipada para que tu viaje refleje tu estilo.</p>
                </div>
              </div>
            </div>

            {/* Connecting lines */}
            <div className="hidden md:block w-16 h-0.5 bg-gray-300"></div>

            {/* Icon 4 - Technology */}
            <div className="relative group">
              <img 
                src="/images/benefits/Iconos-04.svg" 
                alt="Tecnología intuitiva"
                className="w-20 h-20 md:w-24 md:h-24 cursor-pointer transition-transform hover:scale-110"
              />
              {/* Hover dialog */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                <div className="bg-black text-white p-3 rounded-lg shadow-xl w-64">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                    <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-black"></div>
                  </div>
                  <h4 className="font-semibold mb-1 text-sm">Tecnología intuitiva, control total</h4>
                  <p className="text-xs leading-relaxed">Solicita, programa y monitorea todo desde la app. Puedes elegir horarios, ubicaciones, servicios complementarios y recibir soporte en tiempo real.</p>
                </div>
              </div>
            </div>

            {/* Connecting lines */}
            <div className="hidden md:block w-16 h-0.5 bg-gray-300"></div>

            {/* Icon 5 - International */}
            <div className="relative group">
              <img 
                src="/images/benefits/Iconos-05.svg" 
                alt="Presencia internacional"
                className="w-20 h-20 md:w-24 md:h-24 cursor-pointer transition-transform hover:scale-110"
              />
              {/* Hover dialog */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                <div className="bg-black text-white p-3 rounded-lg shadow-xl w-64">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                    <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-black"></div>
                  </div>
                  <h4 className="font-semibold mb-1 text-sm">Presencia internacional</h4>
                  <p className="text-xs leading-relaxed">Privyde está disponible en las principales ciudades del mundo. Viaja con el mismo nivel de seguridad y excelencia sin importar el destino.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits icons - Mobile version (vertical with click reveal) */}
          <div className="md:hidden space-y-8 mb-12">
            {/* Icon 1 - Protection */}
            <div className="flex flex-col items-center text-center">
              <button
                onClick={() => setClickedBenefit(clickedBenefit === 0 ? null : 0)}
                className="focus:outline-none"
              >
                <img 
                  src="/images/benefits/Iconos_Mesa de trabajo 1.svg" 
                  alt="Protección integral"
                  className="w-40 h-40 mb-4 cursor-pointer transition-transform active:scale-95"
                />
              </button>
              {/* Dialog that appears on click */}
              <div className={`transition-all duration-500 ${
                clickedBenefit === 0 
                  ? 'max-h-96 opacity-100' 
                  : 'max-h-0 opacity-0 overflow-hidden'
              }`}>
                <div className="mt-2 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-black"></div>
                  </div>
                  <div className="bg-black text-white p-4 rounded-lg shadow-xl w-72 mx-auto mt-1">
                    <h4 className="font-semibold mb-2 text-base">{t('landing.benefits.protection.title')}</h4>
                    <p className="text-sm leading-relaxed">{t('landing.benefits.protection.description')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Icon 2 - Personalized attention */}
            <div className="flex flex-col items-center text-center">
              <button
                onClick={() => setClickedBenefit(clickedBenefit === 1 ? null : 1)}
                className="focus:outline-none"
              >
                <img 
                  src="/images/benefits/Iconos-02.svg" 
                  alt="Atención personalizada"
                  className="w-40 h-40 mb-4 cursor-pointer transition-transform active:scale-95"
                />
              </button>
              {/* Dialog that appears on click */}
              <div className={`transition-all duration-500 ${
                clickedBenefit === 1 
                  ? 'max-h-96 opacity-100' 
                  : 'max-h-0 opacity-0 overflow-hidden'
              }`}>
                <div className="mt-2 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-black"></div>
                  </div>
                  <div className="bg-black text-white p-4 rounded-lg shadow-xl w-72 mx-auto mt-1">
                    <h4 className="font-semibold mb-2 text-base">{t('landing.benefits.attention.title')}</h4>
                    <p className="text-sm leading-relaxed">{t('landing.benefits.attention.description')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Icon 3 - Premium fleet */}
            <div className="flex flex-col items-center text-center">
              <button
                onClick={() => setClickedBenefit(clickedBenefit === 2 ? null : 2)}
                className="focus:outline-none"
              >
                <img 
                  src="/images/benefits/Iconos-03.svg" 
                  alt="Flota premium"
                  className="w-40 h-40 mb-4 cursor-pointer transition-transform active:scale-95"
                />
              </button>
              {/* Dialog that appears on click */}
              <div className={`transition-all duration-500 ${
                clickedBenefit === 2 
                  ? 'max-h-96 opacity-100' 
                  : 'max-h-0 opacity-0 overflow-hidden'
              }`}>
                <div className="mt-2 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-black"></div>
                  </div>
                  <div className="bg-black text-white p-4 rounded-lg shadow-xl w-72 mx-auto mt-1">
                    <h4 className="font-semibold mb-2 text-base">{t('landing.benefits.fleet.title')}</h4>
                    <p className="text-sm leading-relaxed">{t('landing.benefits.fleet.description')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Icon 4 - Technology */}
            <div className="flex flex-col items-center text-center">
              <button
                onClick={() => setClickedBenefit(clickedBenefit === 3 ? null : 3)}
                className="focus:outline-none"
              >
                <img 
                  src="/images/benefits/Iconos-04.svg" 
                  alt="Tecnología intuitiva"
                  className="w-40 h-40 mb-4 cursor-pointer transition-transform active:scale-95"
                />
              </button>
              {/* Dialog that appears on click */}
              <div className={`transition-all duration-500 ${
                clickedBenefit === 3 
                  ? 'max-h-96 opacity-100' 
                  : 'max-h-0 opacity-0 overflow-hidden'
              }`}>
                <div className="mt-2 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-black"></div>
                  </div>
                  <div className="bg-black text-white p-4 rounded-lg shadow-xl w-72 mx-auto mt-1">
                    <h4 className="font-semibold mb-2 text-base">{t('landing.benefits.technology.title')}</h4>
                    <p className="text-sm leading-relaxed">{t('landing.benefits.technology.description')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Icon 5 - International */}
            <div className="flex flex-col items-center text-center">
              <button
                onClick={() => setClickedBenefit(clickedBenefit === 4 ? null : 4)}
                className="focus:outline-none"
              >
                <img 
                  src="/images/benefits/Iconos-05.svg" 
                  alt="Presencia internacional"
                  className="w-40 h-40 mb-4 cursor-pointer transition-transform active:scale-95"
                />
              </button>
              {/* Dialog that appears on click */}
              <div className={`transition-all duration-500 ${
                clickedBenefit === 4 
                  ? 'max-h-96 opacity-100' 
                  : 'max-h-0 opacity-0 overflow-hidden'
              }`}>
                <div className="mt-2 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-black"></div>
                  </div>
                  <div className="bg-black text-white p-4 rounded-lg shadow-xl w-72 mx-auto mt-1">
                    <h4 className="font-semibold mb-2 text-base">{t('landing.benefits.international.title')}</h4>
                    <p className="text-sm leading-relaxed">{t('landing.benefits.international.description')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-wider mb-8"
                style={{ fontFamily: 'CONTHRAX-SB, sans-serif' }}>
              {t('landing.benefits.cta')}
            </h3>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="bg-black py-16 md:py-24 pb-64 md:pb-80">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wider mb-4"
                style={{ fontFamily: 'CONTHRAX-SB, sans-serif' }}>
              {t('landing.howItWorks.title')}
            </h2>
            <p className="text-lg text-white/80">
              {t('landing.howItWorks.subtitle')}
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-4 mb-16 max-w-5xl mx-auto">
            {/* Step 1 - Left aligned */}
            <div className="flex justify-center md:justify-start">
              <div className="bg-neutral-800 py-2 px-2 md:py-3 md:px-3 flex items-center gap-2 md:gap-3 max-w-3xl w-full md:ml-0">
                <div className="text-7xl md:text-8xl font-bold text-white flex items-center mt-1" 
                     style={{ fontFamily: 'Panton, sans-serif', lineHeight: '1' }}>
                  01
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                    {t('landing.howItWorks.steps.booking.title')}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {t('landing.howItWorks.steps.booking.description')}
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 - Slightly right */}
            <div className="flex justify-center md:justify-start md:ml-20">
              <div className="bg-neutral-800 py-2 px-2 md:py-3 md:px-3 flex items-center gap-2 md:gap-3 max-w-3xl w-full">
                <div className="text-7xl md:text-8xl font-bold text-white flex items-center mt-1" 
                     style={{ fontFamily: 'Panton, sans-serif', lineHeight: '1' }}>
                  02
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                    {t('landing.howItWorks.steps.confirmation.title')}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {t('landing.howItWorks.steps.confirmation.description')}
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 - More right */}
            <div className="flex justify-center md:justify-start md:ml-40">
              <div className="bg-neutral-800 py-2 px-2 md:py-3 md:px-3 flex items-center gap-2 md:gap-3 max-w-3xl w-full">
                <div className="text-7xl md:text-8xl font-bold text-white flex items-center mt-1" 
                     style={{ fontFamily: 'Panton, sans-serif', lineHeight: '1' }}>
                  03
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                    {t('landing.howItWorks.steps.pickup.title')}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {t('landing.howItWorks.steps.pickup.description')}
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 - Right aligned */}
            <div className="flex justify-center md:justify-end">
              <div className="bg-neutral-800 py-2 px-2 md:py-3 md:px-3 flex items-center gap-2 md:gap-3 max-w-3xl w-full">
                <div className="text-7xl md:text-8xl font-bold text-white flex items-center mt-1" 
                     style={{ fontFamily: 'Panton, sans-serif', lineHeight: '1' }}>
                  04
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                    {t('landing.howItWorks.steps.enjoy.title')}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {t('landing.howItWorks.steps.enjoy.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Download CTA */}
          <div className="text-center">
            <p className="text-xl text-white mb-6">
              {t('landing.cta.downloadApp')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#" className="hover:opacity-80 transition-opacity">
                <Image
                  src="/appstore.png"
                  alt="Download on the App Store"
                  width={150}
                  height={50}
                />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <Image
                  src="/googleplay.png"
                  alt="Get it on Google Play"
                  width={150}
                  height={50}
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Client Experience Image Divider */}
      <div className="relative">
        {/* Image positioned between sections */}
        <div className="absolute inset-x-0 top-0 transform -translate-y-1/2">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative h-[300px] md:h-[400px]">
                <Image
                  src="/images/Inicio-Experiecia del Cliente.webp"
                  alt="Experiencia del cliente"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex items-end justify-center pb-8 md:pb-12">
                  <h2 className="text-3xl md:text-5xl font-bold text-white text-center uppercase tracking-wider"
                      style={{ fontFamily: 'CONTHRAX-SB, sans-serif' }}>
                    {t('landing.testimonials.title')}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Client Experience Section */}
      <section className="bg-gray-50 pt-64 md:pt-80 pb-24 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Desktop Testimonials Carousel */}
          <div className="hidden md:block">
            <div className="relative flex items-center py-12">
              {/* Navigation arrow left */}
              <button className="absolute left-0 z-20 -translate-x-4 md:-translate-x-12">
                <ChevronLeft className="w-8 h-8 text-gray-400 hover:text-gray-600 transition-colors" />
              </button>

              <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory mx-12" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', minHeight: '320px' }}>
                {testimonialsData.map((testimonial, index) => (
                  <div key={testimonial.id} className={`${index === 1 ? 'min-w-[340px] md:min-w-[360px] pt-16' : 'min-w-[300px] md:min-w-[320px] pt-14'} snap-center`}>
                    <div className={`relative ${index === 1 ? 'transform scale-105' : ''}`}>
                      <div className={`${index === 1 ? 'w-24 h-24' : 'w-20 h-20'} rounded-full border-2 border-black bg-gray-300 mx-auto absolute left-1/2 transform -translate-x-1/2 ${index === 1 ? '-top-12' : '-top-10'} z-10 overflow-hidden`}>
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className={`bg-white rounded-3xl ${index === 1 ? 'pt-14 pb-6 px-8' : 'pt-12 pb-4 px-6'} border-2 border-black text-center`}>
                        <h4 className={`font-bold ${index === 1 ? 'text-xl' : 'text-lg'} mb-1`}>{testimonial.name}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed mb-3">
                          "{testimonial.text}"
                        </p>
                        <div className="flex justify-center text-black">
                          {"★★★★★".split("").map((star, i) => (
                            <span key={i} className={index === 1 ? 'text-lg' : 'text-base'}>{star}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation arrow right */}
              <button className="absolute right-0 z-20 translate-x-4 md:translate-x-12">
                <ChevronRight className="w-8 h-8 text-gray-400 hover:text-gray-600 transition-colors" />
              </button>
            </div>
          </div>

          {/* Mobile Testimonials Slider */}
          <div className="md:hidden">
            <div className="relative px-8">
              {/* Current Testimonial */}
              <div className="pt-16 pb-8">
                <div className="relative max-w-sm mx-auto">
                  <div className="w-24 h-24 rounded-full border-2 border-black bg-gray-300 mx-auto absolute left-1/2 transform -translate-x-1/2 -top-12 z-10 overflow-hidden">
                    <img 
                      src={testimonialsData[currentTestimonialSlide].image} 
                      alt={testimonialsData[currentTestimonialSlide].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-white rounded-3xl pt-14 pb-5 px-8 border-2 border-black text-center">
                    <h4 className="font-bold text-xl mb-1">{testimonialsData[currentTestimonialSlide].name}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                      "{testimonialsData[currentTestimonialSlide].text}"
                    </p>
                    <div className="flex justify-center text-black">
                      {"★★★★★".split("").map((star, i) => (
                        <span key={i} className="text-lg">{star}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button 
                onClick={() => setCurrentTestimonialSlide((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length)}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              <button 
                onClick={() => setCurrentTestimonialSlide((prev) => (prev + 1) % testimonialsData.length)}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-4">
                {testimonialsData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonialSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentTestimonialSlide ? 'bg-black w-6' : 'bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
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

      {/* Footer */}
      <BlackFooter />

      {/* Support Chat */}
      <SupportChat data-oid=".lvmbn_" />
    </main>
  );
}
