type BookingsTableProps = {
  bookingsData: any[];
  handleViewBookingDetails: (booking: any) => void;
};

const BookingsTable = ({
  bookingsData,
  handleViewBookingDetails,
}: BookingsTableProps) => {
  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden"
      data-oid="28hp2ms"
    >
      <div className="px-6 py-4 border-b border-gray-200" data-oid="nboxx7g">
        <div className="flex space-x-4" data-oid="jdwfp2b">
          <button
            className="text-sm px-3 py-2 font-medium text-gray-600 border-b-2 border-red-600"
            data-oid="58lw8y9"
          >
            Reservas activas (23)
          </button>
          <button
            className="text-sm px-3 py-2 text-gray-500 hover:text-gray-700"
            data-oid="gkrrfis"
          >
            Historial (152)
          </button>
        </div>
      </div>

      {/* Tabla de reservas */}
      <div className="overflow-x-auto" data-oid="nz4nhlb">
        <table className="w-full" data-oid="i9ztn.y">
          <thead className="bg-gray-50" data-oid="i_dheuc">
            <tr data-oid="gxkowdf">
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                data-oid="2p2oyyu"
              >
                ID / Cliente
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                data-oid="aox7bls"
              >
                Fecha y Hora
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                data-oid="98w0ba2"
              >
                Ruta
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                data-oid="ob183gs"
              >
                Tipo
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                data-oid="ztblykf"
              >
                Vehículo / Conductor
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                data-oid="-masy:k"
              >
                Estado
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                data-oid="o:7vypf"
              >
                Precio
              </th>
              <th
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                data-oid="09epseg"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200" data-oid="9zh2768">
            {bookingsData.map((booking, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-50 ${booking.hasIncident ? "bg-gray-100" : ""}`}
                data-oid="1n96pgc"
              >
                <td className="px-6 py-4 whitespace-nowrap" data-oid="27svqo7">
                  <div className="flex items-center" data-oid="35w5djt">
                    <div data-oid="s2uexm4">
                      <div
                        className="text-sm font-medium text-gray-900"
                        data-oid="lvwfdl2"
                      >
                        {booking.id}
                      </div>
                      <div className="text-sm text-gray-500" data-oid="tzmucgh">
                        {booking.clientName}
                      </div>
                    </div>
                    {booking.hasIncident && (
                      <span
                        className="ml-2 flex-shrink-0 inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-gray-200 text-gray-800"
                        data-oid="ru_usgc"
                      >
                        {booking.incidentType === "delay"
                          ? "Retraso"
                          : booking.incidentType === "change"
                            ? "Cambio"
                            : "Incidencia"}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap" data-oid="y:c--h5">
                  <div className="text-sm text-gray-900" data-oid="plewdl9">
                    {booking.date}
                  </div>
                </td>
                <td className="px-6 py-4" data-oid="m5t-zeg">
                  <div className="text-sm text-gray-900" data-oid="x11cvp1">
                    {booking.fromTo}
                  </div>
                </td>
                <td className="px-6 py-3 whitespace-nowrap" data-oid="z6v0f:z">
                  <div className="text-sm text-gray-900" data-oid="_d6s:4s">
                    {booking.type === "one_way"
                      ? "Un trayecto"
                      : booking.type === "round_trip"
                        ? "Ida y vuelta"
                        : booking.type === "hourly"
                          ? "Por horas"
                          : "Día completo"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap" data-oid="3ten9oc">
                  <div className="text-sm text-gray-900" data-oid="wse2l9n">
                    {booking.vehicle}
                  </div>
                  <div className="text-sm text-gray-500" data-oid="z.l2qgc">
                    {booking.driver}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap" data-oid="rliar1c">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${
                      booking.status === "pending"
                        ? "bg-gray-200 text-yellow-800"
                        : booking.status === "confirmed"
                          ? "bg-gray-200 text-green-800"
                          : booking.status === "in_progress"
                            ? "bg-gray-200 text-blue-800"
                            : booking.status === "completed"
                              ? "bg-gray-100 text-gray-800"
                              : booking.status === "cancelled"
                                ? "bg-gray-200 text-gray-800"
                                : "bg-gray-200 text-purple-800"
                    }`}
                    data-oid="g94i5pj"
                  >
                    {booking.status === "pending"
                      ? "Pendiente"
                      : booking.status === "confirmed"
                        ? "Confirmado"
                        : booking.status === "in_progress"
                          ? "En progreso"
                          : booking.status === "completed"
                            ? "Completado"
                            : booking.status === "cancelled"
                              ? "Cancelado"
                              : "No show"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap" data-oid="dqvkm9w">
                  <div
                    className="text-sm font-medium text-gray-900"
                    data-oid="jcd5ehm"
                  >
                    {booking.price}
                  </div>
                </td>
                <td
                  className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                  data-oid="1io9j9k"
                >
                  <button
                    onClick={() => handleViewBookingDetails(booking)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                    data-oid="y:7r7u7"
                  >
                    Ver
                  </button>
                  <button
                    className="text-gray-600 hover:text-blue-900 mr-3"
                    data-oid="n3zqr1l"
                  >
                    Editar
                  </button>
                  <button
                    className="text-gray-600 hover:text-red-900"
                    data-oid="91gr41."
                  >
                    Cancelar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div
        className="px-6 py-4 flex items-center justify-between border-t border-gray-200"
        data-oid="w:spy1s"
      >
        <div
          className="flex-1 flex justify-between sm:hidden"
          data-oid="p_cheqc"
        >
          <button
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            data-oid="wr1u_ax"
          >
            Anterior
          </button>
          <button
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            data-oid="w06xfxh"
          >
            Siguiente
          </button>
        </div>
        <div
          className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
          data-oid="-9f39cr"
        >
          <div data-oid="rqyjm4q">
            <p className="text-sm text-gray-700" data-oid="sjan0jf">
              Mostrando{" "}
              <span className="font-medium" data-oid="l53rihi">
                1
              </span>{" "}
              a{" "}
              <span className="font-medium" data-oid="rt1783s">
                6
              </span>{" "}
              de{" "}
              <span className="font-medium" data-oid="65w1s:0">
                23
              </span>{" "}
              resultados
            </p>
          </div>
          <div data-oid="wxg-d0b">
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
              data-oid="tjj60ps"
            >
              <button
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                data-oid="s2ay.rj"
              >
                <span className="sr-only" data-oid="g_y1lpy">
                  Anterior
                </span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-oid="c55l1te"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                    data-oid="j7tb:q7"
                  />
                </svg>
              </button>
              <button
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                data-oid="_2m_v8x"
              >
                1
              </button>
              <button
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                data-oid="6yzv4xn"
              >
                2
              </button>
              <button
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-gray-100 text-sm font-medium text-gray-600 hover:bg-gray-200"
                data-oid="-oz.bhe"
              >
                3
              </button>
              <button
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                data-oid="wu9afis"
              >
                <span className="sr-only" data-oid="_oyaw5a">
                  Siguiente
                </span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-oid="p0qa8l4"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                    data-oid="2._h174"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsTable;
