import React, { useState } from "react";
import { Calendar, MapPin, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing2 = () => {
  const [tripType, setTripType] = useState<"ida" | "porHoras">("ida");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to booking page with selected options
    navigate("/booking");
  };

  return (
    <div className="min-h-screen bg-black text-white" data-oid="oezbo:l">
      {/* Navigation */}
      <nav
        className="absolute top-0 left-0 right-0 z-50 px-8 py-6"
        data-oid="xsak3ca"
      >
        <div
          className="flex items-center justify-between max-w-7xl mx-auto"
          data-oid="gzv360h"
        >
          <div className="flex items-center space-x-8" data-oid="nn72mc1">
            <button
              className="text-sm hover:text-gray-300 transition-colors"
              data-oid="sr6ep5j"
            >
              Nuestros servicios
            </button>
            <button
              className="text-sm hover:text-gray-300 transition-colors"
              data-oid="oks4z.q"
            >
              Para empresas
            </button>
            <button
              className="text-sm hover:text-gray-300 transition-colors"
              data-oid="ll2hen-"
            >
              Para chóferes
            </button>
          </div>

          <div
            className="absolute left-1/2 transform -translate-x-1/2"
            data-oid="u7_79im"
          >
            <h1
              className="text-2xl font-light tracking-wider"
              data-oid="d8gq2jm"
            >
              PRIVYDE
            </h1>
          </div>

          <div className="flex items-center space-x-6" data-oid="hdizv.5">
            <button
              className="text-sm hover:text-gray-300 transition-colors"
              data-oid=".yu-hn8"
            >
              Ayuda
            </button>
            <button
              className="text-sm hover:text-gray-300 transition-colors"
              data-oid="mu.xear"
            >
              Iniciar sesión
            </button>
            <button
              className="bg-white text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
              data-oid="w2cipc3"
            >
              Regístrate
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center"
        data-oid="1:f:.rg"
      >
        <div className="absolute inset-0 z-0" data-oid="tu1rmsm">
          <div className="relative h-full w-full" data-oid="7vtpdsa">
            {/* Placeholder for background image */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10"
              data-oid="avso8pg"
            />

            <div className="absolute inset-0 bg-gray-900" data-oid="qjawgv." />
          </div>
        </div>

        <div
          className="relative z-20 max-w-7xl mx-auto px-8 w-full"
          data-oid="jbszee_"
        >
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            data-oid="b:l37-b"
          >
            {/* Left Content */}
            <div className="max-w-xl" data-oid="ziw5bvp">
              <h2
                className="text-5xl lg:text-6xl font-light leading-tight mb-4"
                data-oid="2q5j8j4"
              >
                SOLICITA TU VIAJE
              </h2>
              <p className="text-xl text-gray-300 mb-12" data-oid="i_w.rm6">
                Estás a un clic de viajar mejor
              </p>

              {/* Booking Form */}
              <div
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
                data-oid=".dp5nyb"
              >
                {/* Trip Type Tabs */}
                <div className="flex mb-6" data-oid="9w5u-vr">
                  <button
                    onClick={() => setTripType("ida")}
                    className={`flex-1 py-3 text-center rounded-l-lg transition-all ${
                      tripType === "ida"
                        ? "bg-white text-black font-medium"
                        : "bg-transparent text-white hover:bg-white/10"
                    }`}
                    data-oid="5t1m5_q"
                  >
                    Ida
                  </button>
                  <button
                    onClick={() => setTripType("porHoras")}
                    className={`flex-1 py-3 text-center rounded-r-lg transition-all ${
                      tripType === "porHoras"
                        ? "bg-white text-black font-medium"
                        : "bg-transparent text-white hover:bg-white/10"
                    }`}
                    data-oid="etv7r8t"
                  >
                    Por horas
                  </button>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  data-oid="ojj.3uo"
                >
                  {/* From Location */}
                  <div className="relative" data-oid=".-35jt2">
                    <MapPin
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                      data-oid="-ipdx97"
                    />

                    <input
                      type="text"
                      placeholder="Dirección, aeropuerto, hotel..."
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg py-4 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors"
                      data-oid="rj:675a"
                    />

                    <span
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-gray-400"
                      data-oid="74cxqkv"
                    >
                      De
                    </span>
                  </div>

                  {/* To Location */}
                  <div className="relative" data-oid="71.mn6x">
                    <MapPin
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                      data-oid="ta0hh7:"
                    />

                    <input
                      type="text"
                      placeholder="Dirección, aeropuerto, hotel..."
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg py-4 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors"
                      data-oid="m.q.oxm"
                    />

                    <span
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-gray-400"
                      data-oid="h.75rs4"
                    >
                      A
                    </span>
                  </div>

                  {/* Date and Time Row */}
                  <div className="grid grid-cols-2 gap-4" data-oid=".g6oafs">
                    <div className="relative" data-oid="h:cba78">
                      <Calendar
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                        data-oid="hi0y4sk"
                      />

                      <input
                        type="text"
                        placeholder="24 jun 2025"
                        className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg py-4 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors"
                        data-oid="p.6b9u6"
                      />

                      <span
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-gray-400"
                        data-oid="qmm09qs"
                      >
                        Fecha
                      </span>
                    </div>
                    <div className="relative" data-oid="4d_ffxg">
                      <Clock
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                        data-oid="0rll:bd"
                      />

                      <input
                        type="text"
                        placeholder="12:00"
                        className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg py-4 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors"
                        data-oid="9mtxv3i"
                      />

                      <span
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-gray-400"
                        data-oid="ufdy2rw"
                      >
                        Hora
                      </span>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <p
                    className="text-xs text-gray-400 text-center py-2"
                    data-oid="hg99n9b"
                  >
                    El chófer esperará 15 minutos sin coste adicional
                  </p>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-white text-black py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                    data-oid="rcbjo07"
                  >
                    Seleccionar
                  </button>
                </form>
              </div>
            </div>

            {/* Right side - Space for image */}
            <div className="hidden lg:block" data-oid="p_nk9tz" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing2;
