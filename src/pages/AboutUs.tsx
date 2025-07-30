import { AlertCircle, Rocket, Heart, PenTool, Puzzle } from "lucide-react";
import Image from "@/components/ui/image";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import "../styles/privyde.css";

export default function AboutUs() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden" data-oid="0bkea4k">
      {/* Navigation */}
      <Navbar data-oid="2z0i1tt" />

      {/* Title Bar */}
      <div className="title-bar relative" data-oid="pn:0z5o">
        <div className="container mx-auto" data-oid="2i9_1r4">
          <h1 className="text-3xl font-bold text-black" data-oid="mxjykb0">
            Sobre nosotros
          </h1>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative w-full py-16 bg-gray-50" data-oid="8c22k93">
        <div className="container mx-auto px-4" data-oid="ca86.h8">
          <div
            className="max-w-4xl mx-auto text-center mb-10"
            data-oid=".8tlhok"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
              data-oid="t:p.f0e"
            >
              Redefiniendo la experiencia de viajar
            </h2>
            <div
              className="relative h-80 md:h-96 w-full mb-8 rounded-lg overflow-hidden"
              data-oid="neu67:j"
            >
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                alt="Empleados de Privyde en reunión"
                fill
                className="object-cover"
                data-oid="t43_2ad"
              />
            </div>
            <p
              className="text-lg text-gray-600 leading-relaxed"
              data-oid="0pzjmhm"
            >
              Privyde ha reinventado la forma de viajar conectando a los
              viajeros con una red mundial de chóferes profesionales; y no nos
              detenemos aquí. Nuestra visión sobre el futuro de los viajes se
              basa en la eficiencia, la sostenibilidad y la ética. Únete a
              nosotros en nuestro viaje para hacer que nuestro servicio de
              máxima calidad sea cómodo y accesible en todo el mundo.
            </p>
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="py-16 bg-white" data-oid="juo22ue">
        <div className="container mx-auto px-4" data-oid=".9xlclg">
          <div
            className="flex flex-col md:flex-row items-center gap-10"
            data-oid="ykgat4x"
          >
            <div className="md:w-1/2" data-oid="ebfbz9t">
              <div
                className="relative h-80 md:h-96 w-full rounded-lg overflow-hidden"
                data-oid="bbu91ch"
              >
                <Image
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                  alt="Equipo de Privyde en evento"
                  fill
                  className="object-cover"
                  data-oid="c2wwrm8"
                />
              </div>
            </div>
            <div className="md:w-1/2" data-oid="xwdpc9w">
              <h2
                className="text-3xl font-bold text-gray-800 mb-6"
                data-oid="jiagbuk"
              >
                Más de una década de innovación
              </h2>
              <p
                className="text-gray-600 leading-relaxed mb-6"
                data-oid="tn..gzx"
              >
                Fundada en 2011 por Jens Wohltorf y Frank Steuer, Privyde nació
                con el objetivo de ofrecer una forma más eficaz de reservar y
                gestionar viajes: asequible, fiable y eficiente. Desde entonces,
                Privyde ha pasado de ser una iniciativa de dos emprendedores en
                Alemania, a un equipo internacional galardonado de más de 300
                personas con sedes en Singapur, España, los Emiratos Árabes
                Unidos, el Reino Unido y Estados Unidos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="py-16 bg-gray-50" data-oid="eh8:gkm">
        <div className="container mx-auto px-4" data-oid=":7ymea_">
          <div className="max-w-4xl mx-auto" data-oid="-mzzsl8">
            <h2
              className="text-3xl font-bold text-gray-800 mb-6 text-center"
              data-oid="0q92h.w"
            >
              Cómo funciona Privyde
            </h2>
            <p
              className="text-gray-600 leading-relaxed mb-6"
              data-oid="r.go862"
            >
              Trabajamos con proveedores locales independientes de servicios de
              chófer en todo el mundo y, a través de nuestra tecnología,
              permitimos que los viajeros globales reserven viajes con ellos. No
              proporcionamos, poseemos ni controlamos ninguno de los viajes
              ofrecidos por estos proveedores, sino que los facilitamos. Los
              precios se calculan en función de diversos factores, como la clase
              del vehículo, la distancia y el tiempo de conducción, y nuestro
              margen proviene de la venta de esos viajes a proveedores locales
              independientes de servicios de chofer, generalmente a través de
              nuestra subasta, donde pueden elegir los viajes que mejor se
              adapten a ellos.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-white" data-oid=".mte-:6">
        <div className="container mx-auto px-4" data-oid="h8ox2x8">
          <div className="text-center mb-14" data-oid="d659j6e">
            <div
              className="relative h-80 w-full mb-8 rounded-lg overflow-hidden max-w-4xl mx-auto"
              data-oid="vbkbo-k"
            >
              <Image
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                alt="Chofer abriendo la puerta del auto"
                fill
                className="object-cover"
                data-oid="g7hj_lg"
              />
            </div>
            <h2
              className="text-3xl font-bold text-gray-800 mb-2"
              data-oid="-sz._7o"
            >
              Nuestros valores fundamentales
            </h2>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto"
            data-oid="5f3j2qw"
          >
            <div
              className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100 transition-shadow hover:shadow-md"
              data-oid="r3tenbe"
            >
              <div
                className="p-3 bg-gray-100 rounded-full mb-4"
                data-oid="yfqx:78"
              >
                <AlertCircle
                  className="h-8 w-8 text-black"
                  data-oid="fibpqly"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3" data-oid="n5wev.6">
                Sea fiable
              </h3>
              <p className="text-gray-600" data-oid="ijc8yqc">
                Proporcione un servicio en el que los clientes puedan confiar.
                Sea alguien en quien puedan confiar sus colegas. Trabaje solo
                con conductores fiables en los que confiemos. Gane confianza y
                consérvela.
              </p>
            </div>

            <div
              className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100 transition-shadow hover:shadow-md"
              data-oid="c0fth91"
            >
              <div
                className="p-3 bg-gray-100 rounded-full mb-4"
                data-oid="eux1sl9"
              >
                <Rocket className="h-8 w-8 text-black" data-oid="7k:z4f1" />
              </div>
              <h3 className="text-xl font-semibold mb-3" data-oid="2efogot">
                Abra nuevos caminos
              </h3>
              <p className="text-gray-600" data-oid="qhsuw9f">
                Busque maneras de mejorar. Fomente la curiosidad. Aprenda
                rápidamente de los errores y crezca a partir de la experiencia.
                Intente ser mejor cada día. Ofrece un servicio asombroso, siendo
                líder en la industria y sobrepasa las expectativas de los
                clientes.
              </p>
            </div>

            <div
              className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100 transition-shadow hover:shadow-md"
              data-oid="449f1wk"
            >
              <div
                className="p-3 bg-pink-50 rounded-full mb-4"
                data-oid="_watodq"
              >
                <Heart className="h-8 w-8 text-gray-500" data-oid="bd2skoh" />
              </div>
              <h3 className="text-xl font-semibold mb-3" data-oid="-mp_92v">
                Cuidados
              </h3>
              <p className="text-gray-600" data-oid="-23fdr7">
                Preocúpese por los pasajeros, los conductores y los demás, por
                nuestra comunidad y por la forma en que retribuimos. Preocúpese
                por hacer que nuestro producto y servicio sean excepcionales.
              </p>
            </div>

            <div
              className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100 transition-shadow hover:shadow-md"
              data-oid="zap:bsg"
            >
              <div
                className="p-3 bg-yellow-50 rounded-full mb-4"
                data-oid="p_f9t2l"
              >
                <PenTool className="h-8 w-8 text-gray-500" data-oid="i3bu6py" />
              </div>
              <h3 className="text-xl font-semibold mb-3" data-oid="tmfedlq">
                Haga un esfuerzo extra
              </h3>
              <p className="text-gray-600" data-oid="6ns9fr1">
                Vea más allá de lo que se exige. Sea proactivo para superar las
                expectativas de los clientes. Si ve algo que podría ser mejor,
                tome la iniciativa para mejorarlo.
              </p>
            </div>

            <div
              className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100 transition-shadow hover:shadow-md"
              data-oid="95shwne"
            >
              <div
                className="p-3 bg-green-50 rounded-full mb-4"
                data-oid="qovd2x4"
              >
                <Puzzle className="h-8 w-8 text-gray-600" data-oid="qw1s9tv" />
              </div>
              <h3 className="text-xl font-semibold mb-3" data-oid="bm7jvj0">
                Actúe con integridad
              </h3>
              <p className="text-gray-600" data-oid="nftmucb">
                Actúe de manera justa y honesta. Esfuércese por hacer siempre lo
                correcto por nuestros pasajeros, nuestros chóferes y los demás.
                Trate a todos con el mismo nivel de respeto.
              </p>
            </div>
          </div>

          <div
            className="max-w-2xl mx-auto mt-16 text-center"
            data-oid="7w3y0yi"
          >
            <blockquote
              className="text-2xl font-serif italic text-gray-700"
              data-oid="kc3xu.1"
            >
              "Wherever you are around the world, it's this special feeling of
              being taken care of."
              <footer className="mt-4 text-sm text-gray-500" data-oid="ft371:5">
                CEO y cofundador Jens Wohltorf
              </footer>
            </blockquote>
          </div>
        </div>
      </div>

      {/* Next Steps Section */}
      <div className="py-16 bg-gray-50" data-oid="lnsarab">
        <div className="container mx-auto px-4" data-oid="h-f3k05">
          <h2
            className="text-3xl font-bold text-gray-800 mb-14 text-center"
            data-oid="8stff7k"
          >
            ¿A dónde vamos a partir de aquí?
          </h2>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            data-oid="xt8gz7i"
          >
            <div
              className="bg-white rounded-lg overflow-hidden shadow-md"
              data-oid="ii7o47k"
            >
              <div className="relative h-48" data-oid="nedhniy">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Equipo de trabajo"
                  fill
                  className="object-cover"
                  data-oid=".pcqiv0"
                />
              </div>
              <div className="p-6" data-oid=".ikc1.0">
                <h3 className="text-xl font-semibold mb-3" data-oid="a.6e.d3">
                  Únete al equipo
                </h3>
                <p className="text-gray-600 mb-4" data-oid="4s.5bmg">
                  ¿Estás interesado en convertirte en un Privyde? Has llegado al
                  lugar correcto - casi.
                </p>
                <Link
                  to="/join"
                  className="text-black font-medium hover:text-gray-600 transition-colors"
                  data-oid="tqex9t0"
                >
                  Únete
                </Link>
              </div>
            </div>

            <div
              className="bg-white rounded-lg overflow-hidden shadow-md"
              data-oid="-02__c4"
            >
              <div className="relative h-48" data-oid="ez.--j0">
                <Image
                  src="https://images.unsplash.com/photo-1553484771-047a44eee27d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Hombre con smartphone"
                  fill
                  className="object-cover"
                  data-oid="aaqzmwt"
                />
              </div>
              <div className="p-6" data-oid="nn8c7ks">
                <h3 className="text-xl font-semibold mb-3" data-oid=".qyi-n.">
                  Prensa
                </h3>
                <p className="text-gray-600 mb-4" data-oid="labicmz">
                  Consulta nuestros logros más destacados y las novedades de la
                  empresa.
                </p>
                <Link
                  to="/news"
                  className="text-black font-medium hover:text-gray-600 transition-colors"
                  data-oid="-sb2ofu"
                >
                  Últimas noticias
                </Link>
              </div>
            </div>

            <div
              className="bg-white rounded-lg overflow-hidden shadow-md"
              data-oid="uc9spga"
            >
              <div className="relative h-48" data-oid="m9.96ax">
                <Image
                  src="https://images.unsplash.com/photo-1559566668-a153bfec01df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Coches de lujo"
                  fill
                  className="object-cover"
                  data-oid="01ucd3j"
                />
              </div>
              <div className="p-6" data-oid="gye.cg7">
                <h3 className="text-xl font-semibold mb-3" data-oid="5_aux2b">
                  Blog de viaje
                </h3>
                <p className="text-gray-600 mb-4" data-oid=":47kojr">
                  La inspiración está siempre a la vuelta de la esquina... en
                  nuestro blog que reúne todo lo referente a los viajes.
                </p>
                <Link
                  to="/blog"
                  className="text-black font-medium hover:text-gray-600 transition-colors"
                  data-oid="amvzfc6"
                >
                  Descubre más
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer data-oid="iq.u4bu" />
    </main>
  );
}
