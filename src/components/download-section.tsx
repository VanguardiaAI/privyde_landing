import Image from "@/components/ui/image";
import { RetroGridWithRoute } from "@/components/ui/retro-grid-with-route";
import { useTranslation } from "react-i18next";

export default function DownloadSection() {
  const { t } = useTranslation();
  return (
    <div
      className="relative bg-black text-white py-20 md:py-24 overflow-hidden w-full"
      data-oid="h-:saiz"
    >
      {/* Fondo animado tipo grid con ruta */}
      <RetroGridWithRoute className="z-0" data-oid="dv0tm69" />
      
      <div className="container mx-auto px-6 relative z-10 max-w-5xl" data-oid="zkxqe5a">
        <div className="text-center" data-oid="zajr502">
          {/* Texto descriptivo con Panton */}
          <p className="text-base md:text-lg mb-8 leading-relaxed max-w-3xl mx-auto" style={{ fontFamily: 'Panton, sans-serif' }} data-oid="rqbvvdm">
            {t('landing.hero.subtitle')}
          </p>

          {/* Título principal con CONTHRAX-SB */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 uppercase tracking-wider" 
              style={{ fontFamily: 'CONTHRAX-SB, sans-serif' }} 
              data-oid="mb5nrzf">
            {t('landing.hero.cta.requestRide').toUpperCase()}
          </h1>
          
          {/* Subtítulo */}
          <p className="text-xl md:text-2xl mb-12" 
             style={{ fontFamily: 'Panton, sans-serif' }}>
            {t('landing.hero.cta.discoverExperience')}
          </p>

          {/* Botones de descarga centrados */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            data-oid="f.r89m0"
          >
            <a
              href="#"
              className="hover:opacity-80 transition-opacity"
              data-oid="kemkb7q"
            >
              <Image
                src="/appstore.png"
                alt="Download on the App Store"
                width={150}
                height={50}
                data-oid="wa40jke"
              />
            </a>
            <a
              href="#"
              className="hover:opacity-80 transition-opacity"
              data-oid="9gpe2ap"
            >
              <Image
                src="/googleplay.png"
                alt="Get it on Google Play"
                width={150}
                height={50}
                data-oid="bivaen."
              />
            </a>
          </div>
        </div>
      </div>
      
      {/* Separador blanco al final con márgenes */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center">
        <div className="w-11/12 md:w-10/12 lg:w-9/12 h-0.5 bg-white"></div>
      </div>
    </div>
  );
}