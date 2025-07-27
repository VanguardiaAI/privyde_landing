import { AlertCircle, Rocket, Heart, PenTool, Puzzle } from "lucide-react";
import Image from "@/components/ui/image";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import "../styles/privyde.css";

export default function AboutUs() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden" data-oid="_ajb2rk">
      {/* Navigation */}
      <Navbar data-oid="ssgy9m3" />

      {/* Title Bar */}
      <div className="title-bar relative" data-oid="h79uijl">
        <div className="container mx-auto" data-oid="34ktql0">
          <h1 className="text-3xl font-bold text-black" data-oid="uxaujvc">
            Sobre nosotros
          </h1>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative w-full py-16 bg-gray-50" data-oid="_3fu-eq">
        <div className="container mx-auto px-4" data-oid="-tuqdhz">
          <div
            className="max-w-4xl mx-auto text-center mb-10"
            data-oid="j.twljl"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
              data-oid="23y:fmd"
            >
              Redefiniendo la experiencia de viajar
            </h2>
            <div
              className="relative h-80 md:h-96 w-full mb-8 rounded-lg overflow-hidden"
              data-oid="16g0qpw"
            >
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                alt="Empleados de Privyde en reunión"
                fill
                className="object-cover"
                data-oid="isgw6o3"
              />
            </div>
            <p
              className="text-lg text-gray-600 leading-relaxed"
              data-oid="c5dehcp"
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
      <div className="py-16 bg-white" data-oid="00l1kja">
        <div className="container mx-auto px-4" data-oid="o_p46r.">
          <div
            className="flex flex-col md:flex-row items-center gap-10"
            data-oid="kx1e6::"
          >
            <div className="md:w-1/2" data-oid="942fyjr">
              <div
                className="relative h-80 md:h-96 w-full rounded-lg overflow-hidden"
                data-oid="-u:rqtk"
              >
                <Image
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                  alt="Equipo de Privyde en evento"
                  fill
                  className="object-cover"
                  data-oid="o99gvzu"
                />
              </div>
            </div>
            <div className="md:w-1/2" data-oid="a_:.che">
              <h2
                className="text-3xl font-bold text-gray-800 mb-6"
                data-oid="x2y2yi5"
              >
                Más de una década de innovación
              </h2>
              <p
                className="text-gray-600 leading-relaxed mb-6"
                data-oid="8.sttxm"
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
      <div className="py-16 bg-gray-50" data-oid="_hzgo62">
        <div className="container mx-auto px-4" data-oid="mwxq:hm">
          <div className="max-w-4xl mx-auto" data-oid=":uz3fbz">
            <h2
              className="text-3xl font-bold text-gray-800 mb-6 text-center"
              data-oid="rh712um"
            >
              Cómo funciona Privyde
            </h2>
            <p
              className="text-gray-600 leading-relaxed mb-6"
              data-oid=".8.k-pj"
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
      <div className="py-16 bg-white" data-oid="m29azw8">
        <div className="container mx-auto px-4" data-oid="y3k5.jo">
          <div className="text-center mb-14" data-oid="u:pg5_y">
            <div
              className="relative h-80 w-full mb-8 rounded-lg overflow-hidden max-w-4xl mx-auto"
              data-oid="vb0gs4y"
            >
              <Image
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                alt="Chofer abriendo la puerta del auto"
                fill
                className="object-cover"
                data-oid="1zwh5x3"
              />
            </div>
            <h2
              className="text-3xl font-bold text-gray-800 mb-2"
              data-oid="a01u9ze"
            >
              Nuestros valores fundamentales
            </h2>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto"
            data-oid="u5cjpnr"
          >
            <div
              className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100 transition-shadow hover:shadow-md"
              data-oid="p6mj6o7"
            >
              <div
                className="p-3 bg-gray-100 rounded-full mb-4"
                data-oid="ydn1n4f"
              >
                <AlertCircle
                  className="h-8 w-8 text-black"
                  data-oid=":g-59t:"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3" data-oid="u:w24ca">
                Sea fiable
              </h3>
              <p className="text-gray-600" data-oid=".ne1cew">
                Proporcione un servicio en el que los clientes puedan confiar.
                Sea alguien en quien puedan confiar sus colegas. Trabaje solo
                con conductores fiables en los que confiemos. Gane confianza y
                consérvela.
              </p>
            </div>

            <div
              className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100 transition-shadow hover:shadow-md"
              data-oid="hkgptq3"
            >
              <div
                className="p-3 bg-gray-100 rounded-full mb-4"
                data-oid="6uk81j7"
              >
                <Rocket className="h-8 w-8 text-black" data-oid="nsmj79g" />
              </div>
              <h3 className="text-xl font-semibold mb-3" data-oid="1w_1i9z">
                Abra nuevos caminos
              </h3>
              <p className="text-gray-600" data-oid="ztls-pc">
                Busque maneras de mejorar. Fomente la curiosidad. Aprenda
                rápidamente de los errores y crezca a partir de la experiencia.
                Intente ser mejor cada día. Ofrece un servicio asombroso, siendo
                líder en la industria y sobrepasa las expectativas de los
                clientes.
              </p>
            </div>

            <div
              className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100 transition-shadow hover:shadow-md"
              data-oid="8-35yeg"
            >
              <div
                className="p-3 bg-pink-50 rounded-full mb-4"
                data-oid="zhsmhe-"
              >
                <Heart className="h-8 w-8 text-gray-500" data-oid="g3:ra5." />
              </div>
              <h3 className="text-xl font-semibold mb-3" data-oid="k0qxadd">
                Cuidados
              </h3>
              <p className="text-gray-600" data-oid="0euu1_p">
                Preocúpese por los pasajeros, los conductores y los demás, por
                nuestra comunidad y por la forma en que retribuimos. Preocúpese
                por hacer que nuestro producto y servicio sean excepcionales.
              </p>
            </div>

            <div
              className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100 transition-shadow hover:shadow-md"
              data-oid="hmcgz74"
            >
              <div
                className="p-3 bg-yellow-50 rounded-full mb-4"
                data-oid="4q3m8c5"
              >
                <PenTool className="h-8 w-8 text-gray-500" data-oid="1ixbyf:" />
              </div>
              <h3 className="text-xl font-semibold mb-3" data-oid="_0mt:4w">
                Haga un esfuerzo extra
              </h3>
              <p className="text-gray-600" data-oid="ur5a8pn">
                Vea más allá de lo que se exige. Sea proactivo para superar las
                expectativas de los clientes. Si ve algo que podría ser mejor,
                tome la iniciativa para mejorarlo.
              </p>
            </div>

            <div
              className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100 transition-shadow hover:shadow-md"
              data-oid="zcl33pa"
            >
              <div
                className="p-3 bg-green-50 rounded-full mb-4"
                data-oid="305bywk"
              >
                <Puzzle className="h-8 w-8 text-gray-600" data-oid=".45.4mo" />
              </div>
              <h3 className="text-xl font-semibold mb-3" data-oid="w7vfy_1">
                Actúe con integridad
              </h3>
              <p className="text-gray-600" data-oid="v8bhz.7">
                Actúe de manera justa y honesta. Esfuércese por hacer siempre lo
                correcto por nuestros pasajeros, nuestros chóferes y los demás.
                Trate a todos con el mismo nivel de respeto.
              </p>
            </div>
          </div>

          <div
            className="max-w-2xl mx-auto mt-16 text-center"
            data-oid="103qu5l"
          >
            <blockquote
              className="text-2xl font-serif italic text-gray-700"
              data-oid="77v68z6"
            >
              "Wherever you are around the world, it's this special feeling of
              being taken care of."
              <footer className="mt-4 text-sm text-gray-500" data-oid="tcfoci2">
                CEO y cofundador Jens Wohltorf
              </footer>
            </blockquote>
          </div>
        </div>
      </div>

      {/* Next Steps Section */}
      <div className="py-16 bg-gray-50" data-oid="ban0p9o">
        <div className="container mx-auto px-4" data-oid="uc7_g4e">
          <h2
            className="text-3xl font-bold text-gray-800 mb-14 text-center"
            data-oid="pwlk7jg"
          >
            ¿A dónde vamos a partir de aquí?
          </h2>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            data-oid="q5jv61j"
          >
            <div
              className="bg-white rounded-lg overflow-hidden shadow-md"
              data-oid="bz3tg44"
            >
              <div className="relative h-48" data-oid="zlwfo1j">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Equipo de trabajo"
                  fill
                  className="object-cover"
                  data-oid="zjycjcp"
                />
              </div>
              <div className="p-6" data-oid="41875q-">
                <h3 className="text-xl font-semibold mb-3" data-oid="ef-3z_t">
                  Únete al equipo
                </h3>
                <p className="text-gray-600 mb-4" data-oid="5u9kw6n">
                  ¿Estás interesado en convertirte en un Privyde? Has llegado al
                  lugar correcto - casi.
                </p>
                <Link
                  to="/join"
                  className="text-black font-medium hover:text-gray-600 transition-colors"
                  data-oid="3_07p4i"
                >
                  Únete
                </Link>
              </div>
            </div>

            <div
              className="bg-white rounded-lg overflow-hidden shadow-md"
              data-oid="k.gbv5c"
            >
              <div className="relative h-48" data-oid="807:jmv">
                <Image
                  src="https://images.unsplash.com/photo-1553484771-047a44eee27d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Hombre con smartphone"
                  fill
                  className="object-cover"
                  data-oid="hqhqp0l"
                />
              </div>
              <div className="p-6" data-oid="kf86lmn">
                <h3 className="text-xl font-semibold mb-3" data-oid="r0j7xf7">
                  Prensa
                </h3>
                <p className="text-gray-600 mb-4" data-oid="i4gmu29">
                  Consulta nuestros logros más destacados y las novedades de la
                  empresa.
                </p>
                <Link
                  to="/news"
                  className="text-black font-medium hover:text-gray-600 transition-colors"
                  data-oid="n0ylgt9"
                >
                  Últimas noticias
                </Link>
              </div>
            </div>

            <div
              className="bg-white rounded-lg overflow-hidden shadow-md"
              data-oid="1ip55o:"
            >
              <div className="relative h-48" data-oid=":qk.zdb">
                <Image
                  src="https://images.unsplash.com/photo-1559566668-a153bfec01df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Coches de lujo"
                  fill
                  className="object-cover"
                  data-oid="7n_6ikm"
                />
              </div>
              <div className="p-6" data-oid="hkbrm0m">
                <h3 className="text-xl font-semibold mb-3" data-oid="n2mz3wc">
                  Blog de viaje
                </h3>
                <p className="text-gray-600 mb-4" data-oid="-d3igt8">
                  La inspiración está siempre a la vuelta de la esquina... en
                  nuestro blog que reúne todo lo referente a los viajes.
                </p>
                <Link
                  to="/blog"
                  className="text-black font-medium hover:text-gray-600 transition-colors"
                  data-oid="u_hti6-"
                >
                  Descubre más
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer data-oid="p-ttljk" />
    </main>
  );
}
