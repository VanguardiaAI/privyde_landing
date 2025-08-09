import { Linkedin, Instagram, Facebook } from "lucide-react";
import Image from "@/components/ui/image";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-white text-black relative overflow-hidden" data-oid="ksug5yr">
      <div className="container mx-auto pl-8 pr-0 py-16 max-w-[1400px]" data-oid="e_vgjv:">
        <div className="flex flex-col lg:flex-row">
          {/* Left Content - All content in one column */}
          <div className="lg:w-2/3">
            <div className="space-y-6 text-left">
              {/* Contact Info */}
              <div>
                <h3 className="text-lg font-bold mb-2">{t('footer.contact.title')}</h3>
                <p className="text-gray-700 text-sm">{t('footer.contact.email')}</p>
                <p className="text-gray-700 text-sm">{t('footer.contact.phone')}</p>
              </div>

              {/* 24/7 Availability */}
              <div>
                <h3 className="text-lg font-bold mb-2">{t('footer.support.title')}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{t('footer.support.description')}</p>
              </div>

              {/* Privacy and Terms */}
              <div>
                <h3 className="text-lg font-bold mb-2">{t('footer.legal.title')}</h3>
                <div className="space-y-1">
                  <Link to="/privacy" className="text-gray-700 hover:text-black block text-sm">{t('footer.legal.privacy')}</Link>
                  <Link to="/terms" className="text-gray-700 hover:text-black block text-sm">{t('footer.legal.terms')}</Link>
                </div>
              </div>

              {/* Social and Apps - Centered below Terms */}
              <div className="pt-8 flex flex-col items-center space-y-6">
                {/* Social Media */}
                <div className="text-center">
                  <h3 className="text-lg font-bold mb-4">{t('footer.social.title')}</h3>
                  <div className="flex space-x-3">
                    <a href="#" className="hover:opacity-80 transition-opacity">
                      <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                        <Facebook className="h-5 w-5 text-white" />
                      </div>
                    </a>
                    <a href="#" className="hover:opacity-80 transition-opacity">
                      <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                        <Instagram className="h-5 w-5 text-white" />
                      </div>
                    </a>
                    <a href="#" className="hover:opacity-80 transition-opacity">
                      <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                        <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                        </svg>
                      </div>
                    </a>
                    <a href="#" className="hover:opacity-80 transition-opacity">
                      <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                        <Linkedin className="h-5 w-5 text-white" />
                      </div>
                    </a>
                  </div>
                </div>

                {/* App Download */}
                <div className="text-center">
                  <h3 className="text-lg font-bold mb-4">{t('footer.download.title')}</h3>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a href="#" className="hover:opacity-80 transition-opacity">
                      <Image
                        src="/appstore.png"
                        alt="Download on the App Store"
                        width={120}
                        height={40}
                      />
                    </a>
                    <a href="#" className="hover:opacity-80 transition-opacity">
                      <Image
                        src="/googleplay.png"
                        alt="Get it on Google Play"
                        width={120}
                        height={40}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Empty space for phone mockup */}
          <div className="hidden lg:block lg:w-1/3"></div>
        </div>

      </div>
    </footer>
  );
}
