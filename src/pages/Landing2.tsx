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
    <div className="min-h-screen bg-black text-white" data-oid="-r:u.fz">
      {/* Navigation */}
      <nav
        className="absolute top-0 left-0 right-0 z-50 px-8 py-6"
        data-oid="kdez-7g"
      >
        <div
          className="flex items-center justify-between max-w-7xl mx-auto"
          data-oid=".y35fqx"
        >
          <div className="flex items-center space-x-8" data-oid=":cfr4r8">
            <button
              className="text-sm hover:text-gray-300 transition-colors"
              data-oid="hlsm_e_"
            >
              Nuestros servicios
            </button>
            <button
              className="text-sm hover:text-gray-300 transition-colors"
              data-oid="-o4.fqq"
            >
              Para empresas
            </button>
            <button
              className="text-sm hover:text-gray-300 transition-colors"
              data-oid=".u8_6vp"
            >
              Para chóferes
            </button>
          </div>

          <div
            className="absolute left-1/2 transform -translate-x-1/2"
            data-oid="rw9wt3m"
          >
            <h1
              className="text-2xl font-light tracking-wider"
              data-oid="-l75v_3"
            >
              PRIVYDE
            </h1>
          </div>

          <div className="flex items-center space-x-6" data-oid="rjd_cb4">
            <button
              className="text-sm hover:text-gray-300 transition-colors"
              data-oid="dj-069v"
            >
              Ayuda
            </button>
            <button
              className="text-sm hover:text-gray-300 transition-colors"
              data-oid="txwb_ob"
            >
              Iniciar sesión
            </button>
            <button
              className="bg-white text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
              data-oid="m92lxrj"
            >
              Regístrate
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center"
        data-oid="_d_z3:k"
      >
        <div className="absolute inset-0 z-0" data-oid="unzieu2">
          <div className="relative h-full w-full" data-oid="dnn0g2l">
            {/* Placeholder for background image */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10"
              data-oid="632qb:t"
            />

            <div className="absolute inset-0 bg-gray-900" data-oid="xl-oork" />
          </div>
        </div>

        <div
          className="relative z-20 max-w-7xl mx-auto px-8 w-full"
          data-oid="lvow:ad"
        >
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            data-oid=".ik.yc5"
          >
            {/* Left Content */}
            <div className="max-w-xl" data-oid=":.-cmux">
              <h2
                className="text-5xl lg:text-6xl font-light leading-tight mb-4"
                data-oid="kvj9r7o"
              >
                SOLICITA TU VIAJE
              </h2>
              <p className="text-xl text-gray-300 mb-12" data-oid="7yf9b6b">
                Estás a un clic de viajar mejor
              </p>

              {/* Booking Form */}
              <div
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
                data-oid="aulfukz"
              >
                {/* Trip Type Tabs */}
                <div className="flex mb-6" data-oid="gpc-7vb">
                  <button
                    onClick={() => setTripType("ida")}
                    className={`flex-1 py-3 text-center rounded-l-lg transition-all ${
                      tripType === "ida"
                        ? "bg-white text-black font-medium"
                        : "bg-transparent text-white hover:bg-white/10"
                    }`}
                    data-oid="_az:o6j"
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
                    data-oid="bla5_x-"
                  >
                    Por horas
                  </button>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  data-oid="qczesv0"
                >
                  {/* From Location */}
                  <div className="relative" data-oid="0i_qcp8">
                    <MapPin
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                      data-oid=":6-wtv3"
                    />

                    <input
                      type="text"
                      placeholder="Dirección, aeropuerto, hotel..."
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg py-4 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors"
                      data-oid="2th5_jb"
                    />

                    <span
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-gray-400"
                      data-oid="4_h-np."
                    >
                      De
                    </span>
                  </div>

                  {/* To Location */}
                  <div className="relative" data-oid="5evmvt7">
                    <MapPin
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                      data-oid="2gd6.j_"
                    />

                    <input
                      type="text"
                      placeholder="Dirección, aeropuerto, hotel..."
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg py-4 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors"
                      data-oid="-v0_x6a"
                    />

                    <span
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-gray-400"
                      data-oid="wkwueuz"
                    >
                      A
                    </span>
                  </div>

                  {/* Date and Time Row */}
                  <div className="grid grid-cols-2 gap-4" data-oid="jsjk8::">
                    <div className="relative" data-oid="o48eg:9">
                      <Calendar
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                        data-oid=".kb7c2_"
                      />

                      <input
                        type="text"
                        placeholder="24 jun 2025"
                        className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg py-4 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors"
                        data-oid=".bqv6y-"
                      />

                      <span
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-gray-400"
                        data-oid="5p-7.fj"
                      >
                        Fecha
                      </span>
                    </div>
                    <div className="relative" data-oid=".w_w6v1">
                      <Clock
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                        data-oid="cxhg06e"
                      />

                      <input
                        type="text"
                        placeholder="12:00"
                        className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg py-4 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors"
                        data-oid="8pi9pwm"
                      />

                      <span
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-gray-400"
                        data-oid="hfsyq3g"
                      >
                        Hora
                      </span>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <p
                    className="text-xs text-gray-400 text-center py-2"
                    data-oid="u93xku5"
                  >
                    El chófer esperará 15 minutos sin coste adicional
                  </p>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-white text-black py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                    data-oid="49r0j3w"
                  >
                    Seleccionar
                  </button>
                </form>
              </div>
            </div>

            {/* Right side - Space for image */}
            <div className="hidden lg:block" data-oid="spqaevv" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing2;
