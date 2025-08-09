import { ChevronDown, Globe, User, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";


export default function Navbar() {
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileLanguageOpen, setIsMobileLanguageOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Referencias para los temporizadores
  const languageTimeoutRef = useRef<number | null>(null);
  const userMenuTimeoutRef = useRef<number | null>(null);

  // Limpiar los temporizadores al desmontar el componente
  useEffect(() => {
    return () => {
      if (languageTimeoutRef.current)
        window.clearTimeout(languageTimeoutRef.current);
      if (userMenuTimeoutRef.current)
        window.clearTimeout(userMenuTimeoutRef.current);
    };
  }, []);

  const languages = [
    { code: "es", name: "Español" },
    { code: "en", name: "English" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  const toggleMobileLanguage = () => {
    setIsMobileLanguageOpen(!isMobileLanguageOpen);
  };


  const handleLanguageMouseEnter = () => {
    if (languageTimeoutRef.current)
      window.clearTimeout(languageTimeoutRef.current);
    setIsLanguageMenuOpen(true);
  };

  const handleLanguageMouseLeave = () => {
    languageTimeoutRef.current = window.setTimeout(() => {
      setIsLanguageMenuOpen(false);
    }, 300);
  };

  // Funciones para gestionar el menú de usuario con retraso
  const handleUserMenuMouseEnter = () => {
    if (userMenuTimeoutRef.current)
      window.clearTimeout(userMenuTimeoutRef.current);
    setIsUserMenuOpen(true);
  };

  const handleUserMenuMouseLeave = () => {
    userMenuTimeoutRef.current = window.setTimeout(() => {
      setIsUserMenuOpen(false);
    }, 300);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Navigation */}
      <nav
        className="nav-container bg-black shadow-md py-4 md:py-2 px-4 md:px-6 flex items-center justify-between text-white font-sans border-b-4 border-black md:border-white"
        data-oid="qkhzudg"
      >
        {/* Mobile hamburger menu - Left side */}
        <button
          className="md:hidden p-2 rounded-md text-white hover:text-blue-400 hover:bg-gray-800"
          onClick={toggleMobileMenu}
          data-oid="tk27cxh-mobile"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" data-oid="e6_at_7-mobile" />
          ) : (
            <div className="flex flex-col gap-1">
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
            </div>
          )}
        </button>

        {/* Left side menus - Desktop only */}
        <div className="hidden md:flex nav-menu items-center flex-1">
          {/* Direct link to services */}
          <Link
            to="/our-services"
            className="nav-menu-item px-3 text-white hover:text-blue-400"
            data-oid="4--cin6"
          >
            {t('common.services')}
          </Link>
          
          {/* Direct link to companies */}
          <Link
            to="/companies"
            className="nav-menu-item px-3 text-white hover:text-blue-400"
            data-oid="1x.qi:y"
          >
            {t('common.companies')}
          </Link>
          
          <Link
            to="/drivers"
            className="nav-menu-item px-3 text-white hover:text-blue-400"
            data-oid="dyjxchr"
          >
            {t('common.drivers')}
          </Link>
        </div>
        
        {/* Center Logo - Absolute center on mobile */}
        <Link
          to="/"
          className="nav-logo flex items-center justify-center md:mx-4 absolute left-1/2 transform -translate-x-1/2 md:relative md:left-auto md:transform-none"
          style={{ minWidth: 120 }}
          data-oid="smkq.gg"
        >
          <img
            src="/images/logo.svg"
            alt="Privyde Logo"
            style={{ width: "auto", maxWidth: 180 }}
            className="block h-12 md:h-14"
            data-oid="qgj00d."
          />
        </Link>
        
        {/* Right side - Help, Login, Register */}
        <div className="flex items-center justify-end flex-1" data-oid="qg60:.-">
          <Link
            to="/help"
            className="nav-menu-item px-3 text-white hover:text-blue-400 hidden md:block"
            data-oid="i:bliw_"
          >
            {t('common.help')}
          </Link>
          
          {/* Language selector */}
          <div
            className="nav-menu-item group relative px-3 hidden md:block"
            onMouseEnter={handleLanguageMouseEnter}
            onMouseLeave={handleLanguageMouseLeave}
            data-oid=":yfyo8y"
          >
            <span
              className="cursor-pointer flex items-center text-white hover:text-blue-400"
              data-oid=":9:k7.l"
            >
              {i18n.language.toUpperCase()}
              <ChevronDown
                className={`ml-1 h-4 w-4 transition-transform duration-200 ${isLanguageMenuOpen ? "rotate-180" : ""}`}
                data-oid="7g:b8yu"
              />
            </span>
            {isLanguageMenuOpen && (
              <div
                className="absolute right-0 top-full mt-1 w-40 bg-gray-900 shadow-md border border-gray-700 rounded-md z-50"
                onMouseEnter={handleLanguageMouseEnter}
                onMouseLeave={handleLanguageMouseLeave}
                data-oid="oejwt0a"
              >
                {languages.filter(lang => lang.code !== i18n.language).map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => i18n.changeLanguage(lang.code)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 hover:text-blue-400 border-b border-gray-700 last:border-b-0"
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          {user ? (
            // Si el usuario está autenticado, mostrar el nombre del usuario con menú desplegable
            <div
              className="nav-menu-item group relative px-3 md:block hidden"
              onMouseEnter={handleUserMenuMouseEnter}
              onMouseLeave={handleUserMenuMouseLeave}
              data-oid="pp0xdhs"
            >
              <span
                className="cursor-pointer flex items-center hover:text-blue-400 font-medium"
                data-oid="yggcuxw"
              >
                {user.name || user.email}
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${isUserMenuOpen ? "rotate-180" : ""}`}
                  data-oid="zxo2_7c"
                />
              </span>
              {isUserMenuOpen && (
                <div
                  className="absolute right-0 top-full mt-1 w-40 bg-gray-900 shadow-md border border-gray-700 rounded-md z-50"
                  onMouseEnter={handleUserMenuMouseEnter}
                  onMouseLeave={handleUserMenuMouseLeave}
                  data-oid="q1nd7d5"
                >
                  <Link
                    to="/trips"
                    className="block px-4 py-2 text-sm text-center text-gray-200 hover:bg-gray-800 hover:text-blue-400 border-b border-gray-700"
                    data-oid=".0xvcdt"
                  >
                    {t('common.trips')}
                  </Link>
                  <Link
                    to="/account"
                    className="block px-4 py-2 text-sm text-center text-gray-200 hover:bg-gray-800 hover:text-blue-400 border-b border-gray-700"
                    data-oid="-ozvex4"
                  >
                    {t('common.account')}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 hover:text-blue-400"
                    data-oid="72pcm1m"
                  >
                    {t('common.logout')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Si no hay usuario, mostrar "Iniciar sesión" y "Registrarse"
            <>
              <Link
                to="/login"
                className="nav-menu-item text-white hover:text-blue-400 px-3 font-medium md:block hidden"
                data-oid="u5ocl8d"
              >
                {t('common.login')}
              </Link>
              <Link
                to="/register"
                className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 font-medium md:block hidden ml-2"
                data-oid="register-btn"
              >
                {t('common.register')}
              </Link>
            </>
          )}

          {/* Placeholder for mobile to maintain spacing */}
          <div className="md:hidden w-10"></div>
        </div>
      </nav>

      {/* Menú móvil */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden bg-black shadow-lg border-t border-gray-700 pt-1 pb-4 z-50"
          data-oid="o-:80u5"
        >
          <div className="flex flex-col" data-oid="zf8o02n">
            <Link
              to="/our-services"
              className="py-3 px-4 text-center font-medium text-gray-200 border-b border-gray-700"
              data-oid="p53s.li"
            >
              {t('common.services')}
            </Link>

            <Link
              to="/companies"
              className="py-3 px-4 text-center font-medium text-gray-200 border-b border-gray-700"
              data-oid="r:ux6wj"
            >
              {t('common.companies')}
            </Link>

            <Link
              to="/drivers"
              className="py-3 px-4 text-center font-medium text-gray-200 border-b border-gray-700"
              data-oid="uz8y465"
            >
              {t('common.drivers')}
            </Link>

            <Link
              to="/help"
              className="py-3 px-4 text-center font-medium text-gray-200 border-b border-gray-700"
              data-oid="cjly1h3"
            >
              {t('common.help')}
            </Link>

            <div className="border-b border-gray-100" data-oid="y6hv5rp">
              <div
                className="flex justify-center items-center py-3 px-4"
                onClick={toggleMobileLanguage}
                data-oid="4ce71vf"
              >
                <Globe
                  className="mr-2 h-4 w-4 text-gray-200"
                  data-oid="ioln5p6"
                />

                <span className="font-medium text-gray-200" data-oid="sjp-9qr">
                  {languages.find(l => l.code === i18n.language)?.name || 'Español'}
                </span>
                <ChevronDown
                  className={`ml-2 h-4 w-4 transition-transform duration-200 ${isMobileLanguageOpen ? "rotate-180" : ""}`}
                  data-oid="5lge3:0"
                />
              </div>

              {isMobileLanguageOpen && (
                <div className="bg-gray-800" data-oid="q:_wdqd">
                  {languages
                    .filter((lang) => lang.code !== i18n.language)
                    .map((lang, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          i18n.changeLanguage(lang.code);
                          setIsMobileLanguageOpen(false);
                        }}
                        className="block w-full py-3 px-4 text-center text-gray-200 border-b border-gray-700 last:border-b-0"
                      >
                        {lang.name}
                      </button>
                    ))}
                </div>
              )}
            </div>

            <div className="p-4" data-oid="ryol07t">
              {user ? (
                <div data-oid="v.z4rtf">
                  <div
                    className="flex justify-center items-center mb-3 font-medium text-gray-200"
                    data-oid="l-tojuh"
                  >
                    <User className="w-5 h-5 mr-2" data-oid=".l-e-hm" />
                    {user.name || user.email}
                  </div>
                  <Link
                    to="/trips"
                    className="block text-center py-2 mb-2 font-medium text-gray-200 bg-gray-800 rounded-md"
                    data-oid=".w2auv-"
                  >
                    {t('common.trips')}
                  </Link>
                  <Link
                    to="/account"
                    className="block text-center py-2 mb-2 font-medium text-gray-200 bg-gray-800 rounded-md"
                    data-oid="np5yi34"
                  >
                    {t('common.account')}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block text-center py-2 font-medium text-gray-200 bg-gray-800 rounded-md w-full"
                    data-oid="56evtt5"
                  >
                    {t('common.logout')}
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block text-center py-3 font-medium text-gray-200 bg-gray-800 rounded-md mb-2"
                    data-oid="bildzx:"
                  >
                    {t('common.login')}
                  </Link>
                  <Link
                    to="/register"
                    className="block text-center py-3 font-medium text-black bg-white rounded-md"
                    data-oid="register-mobile"
                  >
                    {t('common.register')}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
