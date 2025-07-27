import { ChevronDown, Globe, Menu, User, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

// Definición de tipos para los servicios (opcional pero buena práctica)
interface Service {
  title: string;
  // description?: string; // La descripción es opcional para algunos elementos del menú
  // link?: string; // Enlace opcional
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isCompanyMenuOpen, setIsCompanyMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileLanguageOpen, setIsMobileLanguageOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Referencias para los temporizadores
  const servicesTimeoutRef = useRef<number | null>(null);
  const companyTimeoutRef = useRef<number | null>(null);
  const languageTimeoutRef = useRef<number | null>(null);
  const userMenuTimeoutRef = useRef<number | null>(null);

  // Limpiar los temporizadores al desmontar el componente
  useEffect(() => {
    return () => {
      if (servicesTimeoutRef.current)
        window.clearTimeout(servicesTimeoutRef.current);
      if (companyTimeoutRef.current)
        window.clearTimeout(companyTimeoutRef.current);
      if (languageTimeoutRef.current)
        window.clearTimeout(languageTimeoutRef.current);
      if (userMenuTimeoutRef.current)
        window.clearTimeout(userMenuTimeoutRef.current);
    };
  }, []);

  const services: Service[] = [
    { title: "Viajes de ciudad a ciudad" },
    { title: "Traslados al aeropuerto" },
    { title: "Alquiler por horas/días" },
    { title: "Servicios eventos especiales" },
    { title: "Servicios de limusinas" },
    { title: "Jets privados" },
    { title: "Traslados corporativos VIP" },
    { title: "Servicios de seguridad ejecutiva discreta" },
  ];

  const companyMenuItems: Service[] = [
    { title: "Resumen" },
    { title: "Empresas" },
    { title: "Agencias de viajes" },
    { title: "Asociaciones estratégicas" },
  ];

  const languages = [
    { code: "es", name: "Español" },
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleServicesMenu = () => {
    if (window.innerWidth < 768) {
      setIsServicesMenuOpen(!isServicesMenuOpen);
    }
  };

  const toggleCompanyMenu = () => {
    if (window.innerWidth < 768) {
      setIsCompanyMenuOpen(!isCompanyMenuOpen);
    }
  };

  const toggleMobileLanguage = () => {
    setIsMobileLanguageOpen(!isMobileLanguageOpen);
  };

  // Funciones para gestionar los menús con retraso
  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current)
      window.clearTimeout(servicesTimeoutRef.current);
    setIsServicesMenuOpen(true);
  };

  const handleServicesMouseLeave = () => {
    servicesTimeoutRef.current = window.setTimeout(() => {
      setIsServicesMenuOpen(false);
    }, 300); // 300ms de retraso
  };

  const handleCompanyMouseEnter = () => {
    if (companyTimeoutRef.current)
      window.clearTimeout(companyTimeoutRef.current);
    setIsCompanyMenuOpen(true);
  };

  const handleCompanyMouseLeave = () => {
    companyTimeoutRef.current = window.setTimeout(() => {
      setIsCompanyMenuOpen(false);
    }, 300);
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
        className="nav-container bg-white shadow-md py-2 px-4 md:px-6 flex items-center justify-between text-gray-700 font-sans"
        data-oid="-898xa."
      >
        <Link
          to="/"
          className="nav-logo flex items-center justify-center"
          style={{ minWidth: 120 }}
          data-oid="7:.kpz:"
        >
          <img
            src="/images/logo.png"
            alt="Privyde Logo"
            style={{ height: 56, width: "auto", maxWidth: 180 }}
            className="block"
            data-oid="gerapa."
          />
        </Link>
        <div
          className="hidden md:flex nav-menu items-center"
          data-oid="5dtxkg_"
        >
          <div
            className="nav-menu-item group relative px-3"
            onMouseEnter={handleServicesMouseEnter}
            onMouseLeave={handleServicesMouseLeave}
            data-oid="wsawvoh"
          >
            <span
              className="cursor-pointer flex items-center hover:text-black"
              data-oid="34122sp"
            >
              Nuestros servicios
              <ChevronDown
                className={`ml-1 h-4 w-4 transition-transform duration-200 ${isServicesMenuOpen ? "rotate-180" : ""}`}
                data-oid="i4n4l59"
              />
            </span>
            {isServicesMenuOpen && (
              <div
                className="absolute left-0 top-full mt-1 w-64 bg-white shadow-md border border-gray-100 rounded-md z-50"
                onMouseEnter={handleServicesMouseEnter}
                onMouseLeave={handleServicesMouseLeave}
                data-oid="m6e:_n3"
              >
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-100 last:border-b-0"
                    data-oid="rgvnn:h"
                  >
                    <Link
                      to={
                        service.title === "Viajes de ciudad a ciudad"
                          ? "/city-to-city"
                          : service.title === "Traslados al aeropuerto"
                            ? "/airport-transfers"
                            : service.title === "Alquiler por horas/días"
                              ? "/hourly-hire"
                              : service.title === "Servicios eventos especiales"
                                ? "/special-events"
                                : service.title === "Servicios de limusinas"
                                  ? "/limousine-service"
                                  : service.title === "Jets privados"
                                    ? "/private-jets"
                                    : service.title ===
                                        "Traslados corporativos VIP"
                                      ? "/corporate-transfers"
                                      : service.title ===
                                          "Servicios de seguridad ejecutiva discreta"
                                        ? "/security-services"
                                        : "#"
                      }
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black"
                      data-oid="686etpa"
                    >
                      {service.title}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div
            className="nav-menu-item group relative px-3"
            onMouseEnter={handleCompanyMouseEnter}
            onMouseLeave={handleCompanyMouseLeave}
            data-oid="qoylmcq"
          >
            <span
              className="cursor-pointer flex items-center hover:text-black"
              data-oid="69go1:x"
            >
              Para empresas
              <ChevronDown
                className={`ml-1 h-4 w-4 transition-transform duration-200 ${isCompanyMenuOpen ? "rotate-180" : ""}`}
                data-oid="1_dn-gi"
              />
            </span>
            {isCompanyMenuOpen && (
              <div
                className="absolute left-0 top-full mt-1 w-64 bg-white shadow-md border border-gray-100 rounded-md z-50"
                onMouseEnter={handleCompanyMouseEnter}
                onMouseLeave={handleCompanyMouseLeave}
                data-oid="2o0gp7k"
              >
                {companyMenuItems.map((item, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-100 last:border-b-0"
                    data-oid="0dao49q"
                  >
                    <Link
                      to={
                        item.title === "Resumen"
                          ? "/company-overview"
                          : item.title === "Empresas"
                            ? "/companies"
                            : item.title === "Agencias de viajes"
                              ? "/travel-agencies"
                              : item.title === "Asociaciones estratégicas"
                                ? "/strategic-partnerships"
                                : "#"
                      }
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black"
                      data-oid="4s3h2u7"
                    >
                      {item.title}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Link
            to="/drivers"
            className="nav-menu-item px-3 hover:text-black"
            data-oid="vs9sbbv"
          >
            Para chóferes
          </Link>
          <Link
            to="/help"
            className="nav-menu-item px-3 hover:text-black"
            data-oid="ztq74qs"
          >
            Ayuda
          </Link>
          <div
            className="nav-menu-item group relative px-3"
            onMouseEnter={handleLanguageMouseEnter}
            onMouseLeave={handleLanguageMouseLeave}
            data-oid="ynx7maj"
          >
            <span
              className="cursor-pointer flex items-center hover:text-black"
              data-oid="yss67iu"
            >
              <Globe className="mr-1 h-4 w-4" data-oid="tt3nx3o" />
              Español
              <ChevronDown
                className={`ml-1 h-4 w-4 transition-transform duration-200 ${isLanguageMenuOpen ? "rotate-180" : ""}`}
                data-oid="h94gvo_"
              />
            </span>
            {isLanguageMenuOpen && (
              <div
                className="absolute right-0 top-full mt-1 w-40 bg-white shadow-md border border-gray-100 rounded-md z-50"
                onMouseEnter={handleLanguageMouseEnter}
                onMouseLeave={handleLanguageMouseLeave}
                data-oid="ick2fjx"
              >
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black border-b border-gray-100"
                  data-oid="7r6ncyz"
                >
                  English
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black"
                  data-oid="v2jt92u"
                >
                  Français
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center" data-oid="ucr9mkd">
          {user ? (
            // Si el usuario está autenticado, mostrar el nombre del usuario con menú desplegable
            <div
              className="nav-menu-item group relative px-3 md:block hidden"
              onMouseEnter={handleUserMenuMouseEnter}
              onMouseLeave={handleUserMenuMouseLeave}
              data-oid="mecvug9"
            >
              <span
                className="cursor-pointer flex items-center hover:text-black font-medium"
                data-oid="xw.3vm7"
              >
                {user.name || user.email}
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${isUserMenuOpen ? "rotate-180" : ""}`}
                  data-oid="8p3l05a"
                />
              </span>
              {isUserMenuOpen && (
                <div
                  className="absolute right-0 top-full mt-1 w-40 bg-white shadow-md border border-gray-100 rounded-md z-50"
                  onMouseEnter={handleUserMenuMouseEnter}
                  onMouseLeave={handleUserMenuMouseLeave}
                  data-oid="ka5u9:-"
                >
                  <Link
                    to="/trips"
                    className="block px-4 py-2 text-sm text-center text-gray-700 hover:bg-gray-50 hover:text-black border-b border-gray-100"
                    data-oid="8tinaz:"
                  >
                    Viajes
                  </Link>
                  <Link
                    to="/account"
                    className="block px-4 py-2 text-sm text-center text-gray-700 hover:bg-gray-50 hover:text-black border-b border-gray-100"
                    data-oid="ehwur0k"
                  >
                    Cuenta
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black"
                    data-oid="i-z6aj1"
                  >
                    Salir
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Si no hay usuario, mostrar "Iniciar sesión"
            <Link
              to="/login"
              className="nav-menu-item hover:text-black px-3 font-medium md:block hidden"
              data-oid="5-fiikg"
            >
              Iniciar sesión
            </Link>
          )}

          {/* Botón de menú para móviles */}
          <button
            className="md:hidden ml-2 p-2 rounded-md text-gray-700 hover:text-black hover:bg-gray-100"
            onClick={toggleMobileMenu}
            data-oid="g_m6jvi"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" data-oid="0l.wzn0" />
            ) : (
              <Menu className="w-6 h-6" data-oid="ka_ylze" />
            )}
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden bg-white shadow-lg border-t border-gray-100 pt-1 pb-4 z-50"
          data-oid="o:9j_a7"
        >
          <div className="flex flex-col" data-oid=".vmnu-i">
            <div className="border-b border-gray-100" data-oid="klegd4c">
              <div
                className="flex justify-center items-center py-3 px-4"
                onClick={toggleServicesMenu}
                data-oid="zepkyt1"
              >
                <span className="font-medium text-gray-800" data-oid="h8pszzx">
                  Nuestros servicios
                </span>
                <ChevronDown
                  className={`ml-2 h-4 w-4 transition-transform duration-200 ${isServicesMenuOpen ? "rotate-180" : ""}`}
                  data-oid="8b3pwd_"
                />
              </div>

              {isServicesMenuOpen && (
                <div className="bg-gray-50" data-oid="sd0lzi8">
                  {services.map((service, index) => (
                    <Link
                      key={index}
                      to={
                        service.title === "Viajes de ciudad a ciudad"
                          ? "/city-to-city"
                          : service.title === "Traslados al aeropuerto"
                            ? "/airport-transfers"
                            : service.title === "Alquiler por horas/días"
                              ? "/hourly-hire"
                              : service.title === "Servicios eventos especiales"
                                ? "/special-events"
                                : service.title === "Servicios de limusinas"
                                  ? "/limousine-service"
                                  : service.title === "Jets privados"
                                    ? "/private-jets"
                                    : service.title ===
                                        "Traslados corporativos VIP"
                                      ? "/corporate-transfers"
                                      : service.title ===
                                          "Servicios de seguridad ejecutiva discreta"
                                        ? "/security-services"
                                        : "#"
                      }
                      className="block py-3 px-4 text-center text-gray-700 border-b border-gray-100 last:border-b-0"
                      data-oid="mg68z-q"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="border-b border-gray-100" data-oid="ia6:p7c">
              <div
                className="flex justify-center items-center py-3 px-4"
                onClick={toggleCompanyMenu}
                data-oid="vc6mroo"
              >
                <span className="font-medium text-gray-800" data-oid="q4s8i3u">
                  Para empresas
                </span>
                <ChevronDown
                  className={`ml-2 h-4 w-4 transition-transform duration-200 ${isCompanyMenuOpen ? "rotate-180" : ""}`}
                  data-oid="sivmf09"
                />
              </div>

              {isCompanyMenuOpen && (
                <div className="bg-gray-50" data-oid="539prq-">
                  {companyMenuItems.map((item, index) => (
                    <Link
                      key={index}
                      to={
                        item.title === "Resumen"
                          ? "/company-overview"
                          : item.title === "Empresas"
                            ? "/companies"
                            : item.title === "Agencias de viajes"
                              ? "/travel-agencies"
                              : item.title === "Asociaciones estratégicas"
                                ? "/strategic-partnerships"
                                : "#"
                      }
                      className="block py-3 px-4 text-center text-gray-700 border-b border-gray-100 last:border-b-0"
                      data-oid="g218xy."
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/drivers"
              className="py-3 px-4 text-center font-medium text-gray-800 border-b border-gray-100"
              data-oid="qudabnr"
            >
              Para chóferes
            </Link>

            <Link
              to="/help"
              className="py-3 px-4 text-center font-medium text-gray-800 border-b border-gray-100"
              data-oid=":q4f9yl"
            >
              Ayuda
            </Link>

            <div className="border-b border-gray-100" data-oid="js-_562">
              <div
                className="flex justify-center items-center py-3 px-4"
                onClick={toggleMobileLanguage}
                data-oid="fqapo0g"
              >
                <Globe
                  className="mr-2 h-4 w-4 text-gray-700"
                  data-oid="lpl0cis"
                />

                <span className="font-medium text-gray-800" data-oid="bojkq.4">
                  Español
                </span>
                <ChevronDown
                  className={`ml-2 h-4 w-4 transition-transform duration-200 ${isMobileLanguageOpen ? "rotate-180" : ""}`}
                  data-oid="o_kd6am"
                />
              </div>

              {isMobileLanguageOpen && (
                <div className="bg-gray-50" data-oid="j1vwt15">
                  {languages
                    .filter((lang) => lang.code !== "es")
                    .map((lang, index) => (
                      <a
                        key={index}
                        href="#"
                        className="block py-3 px-4 text-center text-gray-700 border-b border-gray-100 last:border-b-0"
                        data-oid="gm:hjrw"
                      >
                        {lang.name}
                      </a>
                    ))}
                </div>
              )}
            </div>

            <div className="p-4" data-oid="s9kqp-k">
              {user ? (
                <div data-oid="pqbfijz">
                  <div
                    className="flex justify-center items-center mb-3 font-medium text-gray-800"
                    data-oid="9pb4adc"
                  >
                    <User className="w-5 h-5 mr-2" data-oid="n11jr1p" />
                    {user.name || user.email}
                  </div>
                  <Link
                    to="/trips"
                    className="block text-center py-2 mb-2 font-medium text-gray-800 bg-gray-100 rounded-md"
                    data-oid="mj-d5x:"
                  >
                    Viajes
                  </Link>
                  <Link
                    to="/account"
                    className="block text-center py-2 mb-2 font-medium text-gray-800 bg-gray-100 rounded-md"
                    data-oid="u.-85qt"
                  >
                    Cuenta
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block text-center py-2 font-medium text-gray-800 bg-gray-100 rounded-md w-full"
                    data-oid="d1zde87"
                  >
                    Salir
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="block text-center py-3 font-medium text-gray-800 bg-gray-100 rounded-md"
                  data-oid="zszf:ji"
                >
                  Iniciar sesión
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
