import { Linkedin, Instagram, Facebook, Youtube, Twitter } from "lucide-react";
import Image from "@/components/ui/image";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12" data-oid="nzso_nq">
      <div className="container mx-auto px-4" data-oid="pcnacrd">
        {/* Logo, Ayuda & App Buttons */}
        <div
          className="flex justify-between items-center mb-10 border-b border-gray-800 pb-8"
          data-oid="0ef5h6w"
        >
          <div data-oid="i7i23a0">
            <Link
              to="/"
              className="text-2xl font-bold mb-8 block"
              data-oid="oc68zi7"
            >
              PRIVYDE
            </Link>
            <div className="flex space-x-3" data-oid="metdd23">
              <a
                href="#"
                className="hover:opacity-80 transition-opacity"
                data-oid="-2ynk_2"
              >
                <Image
                  src="/appstore.png"
                  alt="Download on the App Store"
                  width={100}
                  height={35}
                  data-oid="t_0tdec"
                />
              </a>
              <a
                href="#"
                className="hover:opacity-80 transition-opacity"
                data-oid="3m4r4w9"
              >
                <Image
                  src="/googleplay.png"
                  alt="Get it on Google Play"
                  width={100}
                  height={35}
                  data-oid="l:.g2ye"
                />
              </a>
            </div>
          </div>
          <a
            href="#"
            className="flex items-center hover:text-gray-300"
            data-oid="r0opd1x"
          >
            <span
              className="mr-2 h-5 w-5 rounded-full border border-white flex items-center justify-center text-sm"
              data-oid="f.to_iv"
            >
              ?
            </span>
            Ayuda
          </a>
        </div>

        {/* Footer Links Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12"
          data-oid="z07as80"
        >
          {/* Empresa */}
          <div data-oid="25108-w">
            <h4 className="text-lg font-semibold mb-4" data-oid="r_r76wd">
              Empresa
            </h4>
            <ul className="space-y-2" data-oid="i2kwyfk">
              <li data-oid="pnkym2q">
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white text-sm"
                  data-oid="9zztmef"
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li data-oid="en8mnab">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm"
                  data-oid="q00v2js"
                >
                  Career
                </a>
              </li>
              <li data-oid="s53m:hy">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm"
                  data-oid="zxzx9e9"
                >
                  Press
                </a>
              </li>
              <li data-oid="gf2zpq-">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm"
                  data-oid="r9hog.w"
                >
                  Blog
                </a>
              </li>
              <li data-oid="r:odgbh">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm"
                  data-oid="3rh1ods"
                >
                  Iniciativas ecológicas
                </a>
              </li>
              <li data-oid="y5ii0u:">
                <Link
                  to="/drivers"
                  className="text-gray-400 hover:text-white text-sm"
                  data-oid="4u70ix2"
                >
                  Conviértase en socio del chófer
                </Link>
              </li>
              <li data-oid="tlmgayk">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm"
                  data-oid="dad3xnr"
                >
                  Influencers
                </a>
              </li>
            </ul>
          </div>

          {/* Privyde for Business */}
          <div data-oid="r2ths.d">
            <h4 className="text-lg font-semibold mb-4" data-oid="34xdryw">
              Privyde for Business
            </h4>
            <ul className="space-y-2" data-oid="4h6zqeu">
              <li data-oid="4za3w5_">
                <Link
                  to="/company-overview"
                  className="text-gray-400 hover:text-white text-sm"
                  data-oid="pi0.p_4"
                >
                  Resumen
                </Link>
              </li>
              <li data-oid="jj2agqq">
                <Link
                  to="/companies"
                  className="text-gray-400 hover:text-white text-sm"
                  data-oid="ptzahyh"
                >
                  Empresas
                </Link>
              </li>
              <li data-oid="_fqrub7">
                <Link
                  to="/travel-agencies"
                  className="text-gray-400 hover:text-white text-sm"
                  data-oid="5zt0iq2"
                >
                  Agencias de viajes
                </Link>
              </li>
              <li data-oid="5tlr68c">
                <Link
                  to="/strategic-partnerships"
                  className="text-gray-400 hover:text-white text-sm"
                  data-oid="w0x:nr9"
                >
                  Asociaciones estratégicas
                </Link>
              </li>
            </ul>
          </div>

          {/* Principales ciudades */}
          <div data-oid="xe5:965">
            <h4 className="text-lg font-semibold mb-4" data-oid="1-b:70:">
              Principales ciudades
            </h4>
            <ul className="space-y-2" data-oid="pid08ij">
              <li data-oid="k50rcdo">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm"
                  data-oid="r:.1p49"
                >
                  Nueva York
                </a>
              </li>
              <li data-oid="764:.97">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm"
                  data-oid="lyt0n-d"
                >
                  Londres
                </a>
              </li>
              <li data-oid="mmrle4k">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm"
                  data-oid="sgcf8z8"
                >
                  Berlín
                </a>
              </li>
              <li data-oid="p32fcc5">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm"
                  data-oid="79pk3ae"
                >
                  Los Angeles
                </a>
              </li>
              <li data-oid="e8lh_rn">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm"
                  data-oid="7bvg1q8"
                >
                  Paris
                </a>
              </li>
              <li data-oid="x:.ns18">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm"
                  data-oid=".79qt12"
                >
                  Todas las ciudades
                </a>
              </li>
            </ul>
          </div>

          {/* Explorar */}
          <div data-oid="3b84jrh">
            <h4 className="text-lg font-semibold mb-4" data-oid="ft_.xyk">
              Explorar
            </h4>
            <ul className="space-y-2" data-oid="vu32sv8">
              <li data-oid="z-5nrj2">
                <Link
                  to="/city-to-city"
                  className="text-gray-400 hover:text-white text-sm"
                  data-oid="eikc9xz"
                >
                  Viajes de ciudad a ciudad
                </Link>
              </li>
              <li data-oid="pm30jrq">
                <Link
                  to="/airport-transfers"
                  className="text-gray-400 hover:text-white text-sm"
                  data-oid="jbnw6b1"
                >
                  Transfer al aeropuerto
                </Link>
              </li>
              <li data-oid="z7vrn_5">
                <Link
                  to="/hourly-hire"
                  className="text-gray-400 hover:text-white text-sm"
                  data-oid="f6qi:hh"
                >
                  Alquiler por horas/días
                </Link>
              </li>
              <li data-oid="klg0b92">
                <Link
                  to="/special-events"
                  className="text-gray-400 hover:text-white text-sm"
                  data-oid="0qmp9br"
                >
                  Servicios para eventos especiales
                </Link>
              </li>
              <li data-oid="xkrifim">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm"
                  data-oid="b7lurbd"
                >
                  Larga distancia
                </a>
              </li>
              <li data-oid="d1c6lsg">
                <Link
                  to="/limousine-service"
                  className="text-gray-400 hover:text-white text-sm"
                  data-oid="9mbd6p5"
                >
                  Servicio de limusinas
                </Link>
              </li>
              <li data-oid="5rt3tze">
                <Link
                  to="/private-jets"
                  className="text-gray-400 hover:text-white text-sm"
                  data-oid="41u-1h3"
                >
                  Jets privados
                </Link>
              </li>
              <li data-oid="ipjpry.">
                <Link
                  to="/corporate-transfers"
                  className="text-gray-400 hover:text-white text-sm"
                  data-oid="x0pnh5j"
                >
                  Traslados corporativos VIP
                </Link>
              </li>
              <li data-oid="mjxa_o-">
                <Link
                  to="/security-services"
                  className="text-gray-400 hover:text-white text-sm"
                  data-oid="87_emqw"
                >
                  Servicios de seguridad ejecutiva
                </Link>
              </li>
              <li data-oid="8:vhtsj">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm"
                  data-oid="1sraurw"
                >
                  Servicios de chófer
                </a>
              </li>
              <li data-oid="84ookug">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm"
                  data-oid="n4zijqp"
                >
                  Coche privado
                </a>
              </li>
              <li data-oid="25ewd3w">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm"
                  data-oid="e.0c5nk"
                >
                  Ground transportation
                </a>
              </li>
              <li data-oid=":5_j:dh">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm"
                  data-oid="9kp38-h"
                >
                  All countries
                </a>
              </li>
            </ul>
          </div>

          {/* Viajes de ciudad a ciudad */}
          <div data-oid="3:duca5">
            <div className="flex items-center mb-4" data-oid="dtcg6vp">
              <h4 className="text-lg font-semibold" data-oid="icdku8g">
                Viajes de ciudad a ciudad
              </h4>
              <span
                className="ml-2 bg-white text-black text-xs font-semibold px-2 py-0.5 rounded"
                data-oid="oce926k"
              >
                NUEVO
              </span>
            </div>
            <ul className="space-y-2" data-oid="b5zlux6">
              <li data-oid="171lr8t">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm"
                  data-oid="4koyyd4"
                >
                  East Hampton - Nueva York
                </a>
              </li>
              <li data-oid="ec-gzqw">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm"
                  data-oid="sybset:"
                >
                  Los Angeles - San Diego
                </a>
              </li>
              <li data-oid="dc1hkt8">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm"
                  data-oid="i0k-j4o"
                >
                  Miami - Palm Beach
                </a>
              </li>
              <li data-oid="c2u58hl">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm"
                  data-oid="u3:70uz"
                >
                  London - Bristol
                </a>
              </li>
              <li data-oid="ot4-m2v">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm"
                  data-oid="labfvbg"
                >
                  Dubai - Abu Dhabi
                </a>
              </li>
              <li data-oid="5:jy5zn">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm"
                  data-oid="mqgwiou"
                >
                  Paris - Reims
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row md:justify-between"
          data-oid="ou4e6ki"
        >
          <div className="mb-4 md:mb-0" data-oid="6o_u00j">
            <p className="text-sm text-gray-400" data-oid="96m3bb9">
              © 2025 Privyde GmbH
            </p>
          </div>
          <div className="flex flex-wrap mb-4 md:mb-0" data-oid="o8316_7">
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-white mr-6 mb-2"
              data-oid="-f5yqak"
            >
              Condiciones
            </a>
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-white mr-6 mb-2"
              data-oid="1kjtmar"
            >
              Política de privacidad
            </a>
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-white mr-6 mb-2"
              data-oid="evu1au5"
            >
              Aviso legal
            </a>
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-white mb-2"
              data-oid="l962fh-"
            >
              Accesibilidad
            </a>
          </div>
          <div className="flex space-x-4" data-oid="w3ikjh8">
            <a
              href="#"
              className="text-gray-400 hover:text-white"
              data-oid="q-jdnvd"
            >
              <Linkedin className="h-5 w-5" data-oid="7:urw9f" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white"
              data-oid="f9o-b4v"
            >
              <Instagram className="h-5 w-5" data-oid=":ayn6tb" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white"
              data-oid="6n1-vw2"
            >
              <Facebook className="h-5 w-5" data-oid="as3ejka" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white"
              data-oid="epxdk93"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                data-oid="pup:g35"
              >
                <path
                  d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
                  data-oid="y-fac:v"
                />
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white"
              data-oid="ii0ize0"
            >
              <Youtube className="h-5 w-5" data-oid="7.wj47n" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white"
              data-oid="os93.ep"
            >
              <Twitter className="h-5 w-5" data-oid="trjab-q" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
