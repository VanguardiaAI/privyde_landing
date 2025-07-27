import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { Search, Filter, Download, Calendar, ChevronDown } from "lucide-react";

export default function TripsPage() {
  const {} = useAuth();
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "canceled">(
    "upcoming",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [dateFilter, setDateFilter] = useState("Fechas de inicio y fin");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const applyFilters = () => {
    // Aquí implementarías la lógica para aplicar los filtros
    // Por ahora, simplemente ocultaremos el panel de filtros
    setShowFilters(false);
  };

  const cancelFilters = () => {
    // Restablecer filtros a valores predeterminados
    setDateFilter("Fechas de inicio y fin");
    setStatusFilter("Todos");
    setShowFilters(false);
  };

  // En un escenario real, estos datos se obtendrían de una API
  /* const upcomingTrips: Trip[] = [
    // Por ahora, no hay viajes próximos
  ];
   const pastTrips: Trip[] = [
    // Por ahora, no hay viajes pasados
  ]; */

  return (
    <div className="flex flex-col min-h-screen" data-oid="2pglcq1">
      <Navbar data-oid="uq1_de8" />

      <main className="flex-1 bg-white pb-16" data-oid="9dd8.os">
        <div
          className="container mx-auto px-4 py-8 max-w-5xl"
          data-oid="f6h77y3"
        >
          <h1
            className="text-3xl font-bold text-gray-800 mb-6"
            data-oid="2mr-mx8"
          >
            Viajes
          </h1>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6" data-oid="r3pijsc">
            <div className="flex justify-between items-end" data-oid="jhwjrj9">
              <div className="flex" data-oid="6476bcf">
                <button
                  className={`py-2 px-4 font-medium ${
                    activeTab === "upcoming"
                      ? "text-black border-b-2 border-black"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("upcoming")}
                  data-oid="xid047j"
                >
                  Próximamente
                </button>
                <button
                  className={`py-2 px-4 font-medium ${
                    activeTab === "past"
                      ? "text-black border-b-2 border-black"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("past")}
                  data-oid="2fbar2z"
                >
                  Pasado
                </button>
                <button
                  className={`py-2 px-4 font-medium ${
                    activeTab === "canceled"
                      ? "text-black border-b-2 border-black"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("canceled")}
                  data-oid="6yzs379"
                >
                  Cancelados
                </button>
              </div>
              <button
                className="flex items-center text-gray-700 hover:text-black mb-2"
                data-oid="62:rv0l"
              >
                <Download className="w-4 h-4 mr-1" data-oid="h3.iwtr" />
                Exportar
              </button>
            </div>
          </div>

          {/* Contador */}
          <div className="mb-6" data-oid="tilneyu">
            <div className="text-sm text-gray-600" data-oid="dys.xc5">
              0 reservas
            </div>
          </div>

          {/* Búsqueda y filtros */}
          <div className="flex mb-4" data-oid="1-3__v-">
            <div className="relative flex-grow mr-2" data-oid="3rwm-45">
              <input
                type="text"
                placeholder="Busca por número de reserva, ubicación o nombre"
                className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-oid="fpz5qpj"
              />

              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
                data-oid="jx4q0y0"
              />
            </div>
            <button
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
              onClick={toggleFilters}
              data-oid="7-m2e4p"
            >
              <Filter className="w-5 h-5 text-gray-500" data-oid="rcax9qx" />
            </button>
          </div>

          {/* Panel de filtros */}
          {showFilters && (
            <div
              className="bg-white rounded-lg shadow-md p-6 mb-6"
              data-oid="sifgrlo"
            >
              <div
                className="flex justify-between items-center mb-4"
                data-oid="5laigej"
              >
                <h3 className="font-medium text-gray-800" data-oid="7_ezn.j">
                  Los viajes con filtro
                </h3>
                <button
                  className="text-gray-600 hover:text-gray-800 text-sm"
                  onClick={() => {
                    setDateFilter("Fechas de inicio y fin");
                    setStatusFilter("Todos");
                  }}
                  data-oid="0hgvavb"
                >
                  Reajustar
                </button>
              </div>

              <div className="flex flex-wrap gap-4 mb-6" data-oid="piojog0">
                {/* Filtro de fechas */}
                <div
                  className="relative w-full md:w-auto md:flex-1"
                  data-oid="fjvul-o"
                >
                  <div
                    className="text-sm text-gray-600 mb-1"
                    data-oid="pk2e--r"
                  >
                    Fechas
                  </div>
                  <div
                    className="flex items-center justify-between bg-gray-100 p-2 rounded-md cursor-pointer"
                    onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                    data-oid=".et5ksr"
                  >
                    <div className="flex items-center" data-oid=":mghkdm">
                      <Calendar
                        className="w-4 h-4 mr-2 text-gray-600"
                        data-oid="sa.e:33"
                      />

                      <span
                        className="text-sm text-gray-700"
                        data-oid=".v913nl"
                      >
                        {dateFilter}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-600 transition-transform ${isDateDropdownOpen ? "rotate-180" : ""}`}
                      data-oid="xot71o5"
                    />
                  </div>

                  {isDateDropdownOpen && (
                    <div
                      className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md"
                      data-oid="-fze.9i"
                    >
                      <div
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setDateFilter("Fechas de inicio y fin");
                          setIsDateDropdownOpen(false);
                        }}
                        data-oid="f8l2qmz"
                      >
                        Fechas de inicio y fin
                      </div>
                      <div
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setDateFilter("Últimos 30 días");
                          setIsDateDropdownOpen(false);
                        }}
                        data-oid="v28d7ke"
                      >
                        Últimos 30 días
                      </div>
                      <div
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setDateFilter("Últimos 90 días");
                          setIsDateDropdownOpen(false);
                        }}
                        data-oid="8oh2n_-"
                      >
                        Últimos 90 días
                      </div>
                    </div>
                  )}
                </div>

                {/* Filtro de estado */}
                <div
                  className="relative w-full md:w-auto md:flex-1"
                  data-oid="-q1uuzg"
                >
                  <div
                    className="text-sm text-gray-600 mb-1"
                    data-oid="d2hqxxs"
                  >
                    Estado
                  </div>
                  <div
                    className="flex items-center justify-between bg-gray-100 p-2 rounded-md cursor-pointer"
                    onClick={() =>
                      setIsStatusDropdownOpen(!isStatusDropdownOpen)
                    }
                    data-oid="kx1.jlv"
                  >
                    <span className="text-sm text-gray-700" data-oid="5.cijc_">
                      {statusFilter}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-600 transition-transform ${isStatusDropdownOpen ? "rotate-180" : ""}`}
                      data-oid="ior2xkr"
                    />
                  </div>

                  {isStatusDropdownOpen && (
                    <div
                      className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md"
                      data-oid="t7_jp17"
                    >
                      <div
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setStatusFilter("Todos");
                          setIsStatusDropdownOpen(false);
                        }}
                        data-oid="9z81jfk"
                      >
                        Todos
                      </div>
                      <div
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setStatusFilter("Confirmado");
                          setIsStatusDropdownOpen(false);
                        }}
                        data-oid="tsshc4v"
                      >
                        Confirmado
                      </div>
                      <div
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setStatusFilter("Pendiente");
                          setIsStatusDropdownOpen(false);
                        }}
                        data-oid="a:zkus_"
                      >
                        Pendiente
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-2" data-oid="t9n5aa9">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  onClick={cancelFilters}
                  data-oid="ho:cku2"
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-md transition-all duration-150 ease-in-out"
                  onClick={applyFilters}
                  data-oid="rzi556u"
                >
                  Aplicar
                </button>
              </div>
            </div>
          )}

          {/* Contenido según el tab activo */}
          <div className="mb-8" data-oid="ogkdebz">
            <div className="text-center py-12" data-oid="q962fim">
              <h3
                className="text-xl font-semibold text-gray-800 mb-2"
                data-oid=":h7qn39"
              >
                No hay resultados
              </h3>
              <p className="text-gray-600 mb-2" data-oid="5f229gp">
                No tienes ningún viaje próximamente que coincida con ese
                criterio.
              </p>
              <p className="text-gray-600" data-oid="azx66:k">
                Intenta buscar algo más o cambiar los filtros.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer data-oid="-x-qpv9" />
    </div>
  );
}
