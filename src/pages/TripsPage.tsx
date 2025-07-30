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
    <div className="flex flex-col min-h-screen" data-oid="rxowtdk">
      <Navbar data-oid="pqcr_73" />

      <main className="flex-1 bg-white pb-16" data-oid="qsdz1co">
        <div
          className="container mx-auto px-4 py-8 max-w-5xl"
          data-oid="cq:sckp"
        >
          <h1
            className="text-3xl font-bold text-gray-800 mb-6"
            data-oid="vznmcby"
          >
            Viajes
          </h1>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6" data-oid="jhzack5">
            <div className="flex justify-between items-end" data-oid="iqu::0r">
              <div className="flex" data-oid="icvgz5c">
                <button
                  className={`py-2 px-4 font-medium ${
                    activeTab === "upcoming"
                      ? "text-black border-b-2 border-black"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("upcoming")}
                  data-oid="0j7idv5"
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
                  data-oid="d7f:dk8"
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
                  data-oid="e69_f8j"
                >
                  Cancelados
                </button>
              </div>
              <button
                className="flex items-center text-gray-700 hover:text-black mb-2"
                data-oid="0m2uhp:"
              >
                <Download className="w-4 h-4 mr-1" data-oid="1bt3_kr" />
                Exportar
              </button>
            </div>
          </div>

          {/* Contador */}
          <div className="mb-6" data-oid="qy3vqf9">
            <div className="text-sm text-gray-600" data-oid=":d7mxa5">
              0 reservas
            </div>
          </div>

          {/* Búsqueda y filtros */}
          <div className="flex mb-4" data-oid="c5_i-8q">
            <div className="relative flex-grow mr-2" data-oid="tdmxue.">
              <input
                type="text"
                placeholder="Busca por número de reserva, ubicación o nombre"
                className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-oid="vdn.83g"
              />

              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
                data-oid="b:a5v3k"
              />
            </div>
            <button
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
              onClick={toggleFilters}
              data-oid="8f..o-d"
            >
              <Filter className="w-5 h-5 text-gray-500" data-oid="wb0fjrx" />
            </button>
          </div>

          {/* Panel de filtros */}
          {showFilters && (
            <div
              className="bg-white rounded-lg shadow-md p-6 mb-6"
              data-oid="fktetyu"
            >
              <div
                className="flex justify-between items-center mb-4"
                data-oid="s6vzu:c"
              >
                <h3 className="font-medium text-gray-800" data-oid="r24-jtz">
                  Los viajes con filtro
                </h3>
                <button
                  className="text-gray-600 hover:text-gray-800 text-sm"
                  onClick={() => {
                    setDateFilter("Fechas de inicio y fin");
                    setStatusFilter("Todos");
                  }}
                  data-oid="6o:hu3w"
                >
                  Reajustar
                </button>
              </div>

              <div className="flex flex-wrap gap-4 mb-6" data-oid="j:z-y3.">
                {/* Filtro de fechas */}
                <div
                  className="relative w-full md:w-auto md:flex-1"
                  data-oid="6u-s_2r"
                >
                  <div
                    className="text-sm text-gray-600 mb-1"
                    data-oid="7ooluug"
                  >
                    Fechas
                  </div>
                  <div
                    className="flex items-center justify-between bg-gray-100 p-2 rounded-md cursor-pointer"
                    onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                    data-oid="fhbx7jg"
                  >
                    <div className="flex items-center" data-oid="d8ril5w">
                      <Calendar
                        className="w-4 h-4 mr-2 text-gray-600"
                        data-oid=".8a:jci"
                      />

                      <span
                        className="text-sm text-gray-700"
                        data-oid=".ya5of1"
                      >
                        {dateFilter}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-600 transition-transform ${isDateDropdownOpen ? "rotate-180" : ""}`}
                      data-oid="mt7fzda"
                    />
                  </div>

                  {isDateDropdownOpen && (
                    <div
                      className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md"
                      data-oid="6fwfwy:"
                    >
                      <div
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setDateFilter("Fechas de inicio y fin");
                          setIsDateDropdownOpen(false);
                        }}
                        data-oid="0w7gnzh"
                      >
                        Fechas de inicio y fin
                      </div>
                      <div
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setDateFilter("Últimos 30 días");
                          setIsDateDropdownOpen(false);
                        }}
                        data-oid="l2s6:s9"
                      >
                        Últimos 30 días
                      </div>
                      <div
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setDateFilter("Últimos 90 días");
                          setIsDateDropdownOpen(false);
                        }}
                        data-oid="lp4jqk2"
                      >
                        Últimos 90 días
                      </div>
                    </div>
                  )}
                </div>

                {/* Filtro de estado */}
                <div
                  className="relative w-full md:w-auto md:flex-1"
                  data-oid="rlw0gpp"
                >
                  <div
                    className="text-sm text-gray-600 mb-1"
                    data-oid=":bvpl3-"
                  >
                    Estado
                  </div>
                  <div
                    className="flex items-center justify-between bg-gray-100 p-2 rounded-md cursor-pointer"
                    onClick={() =>
                      setIsStatusDropdownOpen(!isStatusDropdownOpen)
                    }
                    data-oid="we_n28b"
                  >
                    <span className="text-sm text-gray-700" data-oid="7wh5w2-">
                      {statusFilter}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-600 transition-transform ${isStatusDropdownOpen ? "rotate-180" : ""}`}
                      data-oid="ns.psdv"
                    />
                  </div>

                  {isStatusDropdownOpen && (
                    <div
                      className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md"
                      data-oid="4-t15ey"
                    >
                      <div
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setStatusFilter("Todos");
                          setIsStatusDropdownOpen(false);
                        }}
                        data-oid="0xiy8ex"
                      >
                        Todos
                      </div>
                      <div
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setStatusFilter("Confirmado");
                          setIsStatusDropdownOpen(false);
                        }}
                        data-oid="3:rcf68"
                      >
                        Confirmado
                      </div>
                      <div
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setStatusFilter("Pendiente");
                          setIsStatusDropdownOpen(false);
                        }}
                        data-oid="9m_7rl_"
                      >
                        Pendiente
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-2" data-oid=".xgq_b.">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  onClick={cancelFilters}
                  data-oid="6m14vpj"
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-md transition-all duration-150 ease-in-out"
                  onClick={applyFilters}
                  data-oid="ymtrtig"
                >
                  Aplicar
                </button>
              </div>
            </div>
          )}

          {/* Contenido según el tab activo */}
          <div className="mb-8" data-oid="r44b81j">
            <div className="text-center py-12" data-oid="id8lc6m">
              <h3
                className="text-xl font-semibold text-gray-800 mb-2"
                data-oid="f5d7-wc"
              >
                No hay resultados
              </h3>
              <p className="text-gray-600 mb-2" data-oid="0tn:_u.">
                No tienes ningún viaje próximamente que coincida con ese
                criterio.
              </p>
              <p className="text-gray-600" data-oid="ym54--x">
                Intenta buscar algo más o cambiar los filtros.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer data-oid="_z2r7le" />
    </div>
  );
}
