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
      data-oid="tdq0rad"
    >
      <div className="px-6 py-4 border-b border-gray-200" data-oid="pzzklbl">
        <div className="flex space-x-4" data-oid="ko.vhv2">
          <button
            className="text-sm px-3 py-2 font-medium text-gray-600 border-b-2 border-red-600"
            data-oid=".z3l1rn"
          >
            Reservas activas (23)
          </button>
          <button
            className="text-sm px-3 py-2 text-gray-500 hover:text-gray-700"
            data-oid="lv_wtor"
          >
            Historial (152)
          </button>
        </div>
      </div>

      {/* Tabla de reservas */}
      <div className="overflow-x-auto" data-oid="812sdfv">
        <table className="w-full" data-oid="udwrv8-">
          <thead className="bg-gray-50" data-oid="z1pb_av">
            <tr data-oid="eff-rxs">
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                data-oid="ubwr5mr"
              >
                ID / Cliente
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                data-oid="imuffxu"
              >
                Fecha y Hora
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                data-oid="r7kh5z2"
              >
                Ruta
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                data-oid="rjra_15"
              >
                Tipo
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                data-oid="bqr03s-"
              >
                Vehículo / Conductor
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                data-oid="wjt8wkr"
              >
                Estado
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                data-oid="74afxje"
              >
                Precio
              </th>
              <th
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                data-oid="rrwv75c"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200" data-oid="48kh_20">
            {bookingsData.map((booking, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-50 ${booking.hasIncident ? "bg-gray-100" : ""}`}
                data-oid="h:3fwit"
              >
                <td className="px-6 py-4 whitespace-nowrap" data-oid="gn50cus">
                  <div className="flex items-center" data-oid="wj51hdy">
                    <div data-oid="acx-5ke">
                      <div
                        className="text-sm font-medium text-gray-900"
                        data-oid="yh5pouv"
                      >
                        {booking.id}
                      </div>
                      <div className="text-sm text-gray-500" data-oid="a..0k-x">
                        {booking.clientName}
                      </div>
                    </div>
                    {booking.hasIncident && (
                      <span
                        className="ml-2 flex-shrink-0 inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-gray-200 text-gray-800"
                        data-oid="y34.cig"
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
                <td className="px-6 py-4 whitespace-nowrap" data-oid="0crqa4-">
                  <div className="text-sm text-gray-900" data-oid="mb9b1s2">
                    {booking.date}
                  </div>
                </td>
                <td className="px-6 py-4" data-oid="uvyhcp6">
                  <div className="text-sm text-gray-900" data-oid=".y02nfl">
                    {booking.fromTo}
                  </div>
                </td>
                <td className="px-6 py-3 whitespace-nowrap" data-oid="26vzd8j">
                  <div className="text-sm text-gray-900" data-oid="e7g7q_a">
                    {booking.type === "one_way"
                      ? "Un trayecto"
                      : booking.type === "round_trip"
                        ? "Ida y vuelta"
                        : booking.type === "hourly"
                          ? "Por horas"
                          : "Día completo"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap" data-oid="_x29kk_">
                  <div className="text-sm text-gray-900" data-oid="4unt6t.">
                    {booking.vehicle}
                  </div>
                  <div className="text-sm text-gray-500" data-oid="3z.16z.">
                    {booking.driver}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap" data-oid="qac6ebv">
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
                    data-oid="og5t5r2"
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
                <td className="px-6 py-4 whitespace-nowrap" data-oid="-mqp7fe">
                  <div
                    className="text-sm font-medium text-gray-900"
                    data-oid="zmu:la-"
                  >
                    {booking.price}
                  </div>
                </td>
                <td
                  className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                  data-oid="a-wc5tr"
                >
                  <button
                    onClick={() => handleViewBookingDetails(booking)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                    data-oid="saxmv9v"
                  >
                    Ver
                  </button>
                  <button
                    className="text-gray-600 hover:text-blue-900 mr-3"
                    data-oid="d0f.r0s"
                  >
                    Editar
                  </button>
                  <button
                    className="text-gray-600 hover:text-red-900"
                    data-oid="aghwi9h"
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
        data-oid="ol6apzh"
      >
        <div
          className="flex-1 flex justify-between sm:hidden"
          data-oid="ni3rlum"
        >
          <button
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            data-oid="s_7x791"
          >
            Anterior
          </button>
          <button
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            data-oid="d2q6x-3"
          >
            Siguiente
          </button>
        </div>
        <div
          className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
          data-oid="9drdm8g"
        >
          <div data-oid=".19gnyb">
            <p className="text-sm text-gray-700" data-oid="fa3m53t">
              Mostrando{" "}
              <span className="font-medium" data-oid="zv:px_j">
                1
              </span>{" "}
              a{" "}
              <span className="font-medium" data-oid="421nl3:">
                6
              </span>{" "}
              de{" "}
              <span className="font-medium" data-oid="pai:y:1">
                23
              </span>{" "}
              resultados
            </p>
          </div>
          <div data-oid="8h6cfbq">
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
              data-oid="1fgye79"
            >
              <button
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                data-oid="x:5aby4"
              >
                <span className="sr-only" data-oid="m2v872i">
                  Anterior
                </span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-oid="0zp9jua"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                    data-oid="qnks50a"
                  />
                </svg>
              </button>
              <button
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                data-oid="a:8h62f"
              >
                1
              </button>
              <button
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                data-oid="7esi_51"
              >
                2
              </button>
              <button
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-gray-100 text-sm font-medium text-gray-600 hover:bg-gray-200"
                data-oid="3w9nwmt"
              >
                3
              </button>
              <button
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                data-oid="8-qpkns"
              >
                <span className="sr-only" data-oid="-y4zcxh">
                  Siguiente
                </span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-oid="17nmsg2"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                    data-oid="s8x-iom"
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
