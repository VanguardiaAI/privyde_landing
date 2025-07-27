import { X } from "lucide-react";

type BookingDetailsModalProps = {
  selectedBookingForDetails: any;
  handleCloseBookingDetails: () => void;
};

const BookingDetailsModal = ({
  selectedBookingForDetails,
  handleCloseBookingDetails,
}: BookingDetailsModalProps) => {
  if (!selectedBookingForDetails) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50"
      data-oid="gp0n-k7"
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        data-oid="l-5ce22"
      >
        <div
          className="flex justify-between items-center border-b px-6 py-4"
          data-oid="nuc-ji1"
        >
          <h2
            className="text-xl font-semibold text-gray-800"
            data-oid="mks00k2"
          >
            Detalles de la Reserva
          </h2>
          <button
            onClick={handleCloseBookingDetails}
            className="text-gray-500 hover:text-gray-700"
            data-oid="-fqottl"
          >
            <X size={24} data-oid="cprwrfm" />
          </button>
        </div>

        <div className="p-6" data-oid="yi21ceq">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            data-oid="rpg_8.4"
          >
            {/* Información básica de la reserva */}
            <div className="bg-gray-50 rounded-lg p-4" data-oid="yb21xsi">
              <h3
                className="text-lg font-medium text-gray-800 mb-4"
                data-oid="umh:l.d"
              >
                Información de la Reserva
              </h3>
              <div className="space-y-3" data-oid="soy8c-i">
                <div className="flex justify-between" data-oid="rqq6sud">
                  <span className="text-gray-600" data-oid="6:r0dhk">
                    ID:
                  </span>
                  <span className="font-medium" data-oid="w:bsj9-">
                    {selectedBookingForDetails.id}
                  </span>
                </div>
                <div className="flex justify-between" data-oid="_6jlsou">
                  <span className="text-gray-600" data-oid="47bwvt5">
                    Estado:
                  </span>
                  <span
                    className={`font-medium px-2 py-1 rounded-full text-xs
                    ${
                      selectedBookingForDetails.status === "pending"
                        ? "bg-gray-200 text-yellow-800"
                        : selectedBookingForDetails.status === "confirmed"
                          ? "bg-gray-200 text-green-800"
                          : selectedBookingForDetails.status === "in_progress"
                            ? "bg-gray-200 text-blue-800"
                            : selectedBookingForDetails.status === "completed"
                              ? "bg-gray-100 text-gray-800"
                              : selectedBookingForDetails.status === "cancelled"
                                ? "bg-gray-200 text-gray-800"
                                : "bg-gray-200 text-purple-800"
                    }`}
                    data-oid="f9ktxx5"
                  >
                    {selectedBookingForDetails.status === "pending"
                      ? "Pendiente"
                      : selectedBookingForDetails.status === "confirmed"
                        ? "Confirmado"
                        : selectedBookingForDetails.status === "in_progress"
                          ? "En progreso"
                          : selectedBookingForDetails.status === "completed"
                            ? "Completado"
                            : selectedBookingForDetails.status === "cancelled"
                              ? "Cancelado"
                              : "No show"}
                  </span>
                </div>
                <div className="flex justify-between" data-oid="q7xstoi">
                  <span className="text-gray-600" data-oid="zk2g580">
                    Fecha:
                  </span>
                  <span className="font-medium" data-oid="jlkeicc">
                    {selectedBookingForDetails.date}
                  </span>
                </div>
                <div className="flex justify-between" data-oid="vrpdpct">
                  <span className="text-gray-600" data-oid="kgy6:_f">
                    Precio:
                  </span>
                  <span className="font-medium" data-oid="vmetq_c">
                    {selectedBookingForDetails.price}
                  </span>
                </div>
                <div className="flex justify-between" data-oid="6:z6gpo">
                  <span className="text-gray-600" data-oid="foilq:b">
                    Tipo:
                  </span>
                  <span className="font-medium" data-oid="nzzomd:">
                    {selectedBookingForDetails.type === "one_way"
                      ? "Un trayecto"
                      : selectedBookingForDetails.type === "round_trip"
                        ? "Ida y vuelta"
                        : selectedBookingForDetails.type === "hourly"
                          ? "Por horas"
                          : "Día completo"}
                  </span>
                </div>
              </div>
            </div>

            {/* Información del cliente */}
            <div className="bg-gray-50 rounded-lg p-4" data-oid="p:y5w_q">
              <h3
                className="text-lg font-medium text-gray-800 mb-4"
                data-oid="9a8pf4d"
              >
                Información del Cliente
              </h3>
              <div className="space-y-3" data-oid="d2tg_g1">
                <div className="flex justify-between" data-oid="nw612x2">
                  <span className="text-gray-600" data-oid=":s-s6rw">
                    Nombre:
                  </span>
                  <span className="font-medium" data-oid="wzfdv8_">
                    {selectedBookingForDetails.clientName}
                  </span>
                </div>
                <div className="flex justify-between" data-oid="3cj8pop">
                  <span className="text-gray-600" data-oid=":0mxhrb">
                    Email:
                  </span>
                  <span className="font-medium" data-oid="tv2w1mp">
                    cliente@ejemplo.com
                  </span>
                </div>
                <div className="flex justify-between" data-oid="5o45feg">
                  <span className="text-gray-600" data-oid="krp:9w7">
                    Teléfono:
                  </span>
                  <span className="font-medium" data-oid="mzngtvg">
                    +34 612 345 678
                  </span>
                </div>
              </div>
            </div>

            {/* Detalles de la ruta */}
            <div
              className="md:col-span-2 bg-gray-50 rounded-lg p-4"
              data-oid="774si4w"
            >
              <h3
                className="text-lg font-medium text-gray-800 mb-4"
                data-oid="vnr.3n3"
              >
                Detalles de la Ruta
              </h3>
              <div className="space-y-3" data-oid="xxnzukf">
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  data-oid="z5:46zf"
                >
                  <div data-oid="t6_6.28">
                    <span className="text-gray-600 block" data-oid="6nc1cyi">
                      Origen:
                    </span>
                    <span className="font-medium block mt-1" data-oid="h34h9kp">
                      {selectedBookingForDetails.fromTo.split("→")[0].trim()}
                    </span>
                  </div>
                  <div data-oid="9cbtwwf">
                    <span className="text-gray-600 block" data-oid="6k8a2ih">
                      Destino:
                    </span>
                    <span className="font-medium block mt-1" data-oid="gjmb9:y">
                      {selectedBookingForDetails.fromTo.split("→")[1].trim()}
                    </span>
                  </div>
                </div>
                <div className="pt-2" data-oid="wn3k3rp">
                  <span className="text-gray-600 block" data-oid="wgsr_n-">
                    Notas adicionales:
                  </span>
                  <span className="font-medium block mt-1" data-oid="96_vdzy">
                    Sin notas adicionales.
                  </span>
                </div>
              </div>
            </div>

            {/* Información del vehículo y conductor */}
            <div className="bg-gray-50 rounded-lg p-4" data-oid="if2dc6:">
              <h3
                className="text-lg font-medium text-gray-800 mb-4"
                data-oid="e8f485h"
              >
                Vehículo y Conductor
              </h3>
              <div className="space-y-3" data-oid="efgn1kl">
                <div className="flex justify-between" data-oid="apxc-yt">
                  <span className="text-gray-600" data-oid="23lj9k_">
                    Vehículo:
                  </span>
                  <span className="font-medium" data-oid="u70cjsm">
                    {selectedBookingForDetails.vehicle}
                  </span>
                </div>
                <div className="flex justify-between" data-oid="2al-8js">
                  <span className="text-gray-600" data-oid="kz8bcbq">
                    Conductor:
                  </span>
                  <span className="font-medium" data-oid="_txfby4">
                    {selectedBookingForDetails.driver}
                  </span>
                </div>
                <div className="flex justify-between" data-oid="2eabl22">
                  <span className="text-gray-600" data-oid="zqch4rb">
                    Matrícula:
                  </span>
                  <span className="font-medium" data-oid=":8k66io">
                    1234 ABC
                  </span>
                </div>
              </div>
            </div>

            {/* Historial de la reserva */}
            <div className="bg-gray-50 rounded-lg p-4" data-oid=":_u5:2q">
              <h3
                className="text-lg font-medium text-gray-800 mb-4"
                data-oid="sk6pr8u"
              >
                Historial de la Reserva
              </h3>
              <div className="space-y-3" data-oid="-jrmls9">
                <div className="flex items-start" data-oid="gxz7ipz">
                  <div
                    className="min-w-[100px] text-xs text-gray-500"
                    data-oid="vjqzrv7"
                  >
                    Hoy, 10:45
                  </div>
                  <div data-oid="5thand3">
                    <span className="text-sm font-medium" data-oid="mml5w6e">
                      Reserva creada
                    </span>
                    <p className="text-xs text-gray-500" data-oid="4l2ch7o">
                      por Admin
                    </p>
                  </div>
                </div>
                <div className="flex items-start" data-oid="ou1lg2u">
                  <div
                    className="min-w-[100px] text-xs text-gray-500"
                    data-oid="18n32i9"
                  >
                    Hoy, 11:20
                  </div>
                  <div data-oid="d_3ptv1">
                    <span className="text-sm font-medium" data-oid="81:g4-2">
                      Estado actualizado a Confirmado
                    </span>
                    <p className="text-xs text-gray-500" data-oid="7yqcnv:">
                      por Sistema
                    </p>
                  </div>
                </div>
                <div className="flex items-start" data-oid="qfdbo1i">
                  <div
                    className="min-w-[100px] text-xs text-gray-500"
                    data-oid="46jycrx"
                  >
                    Hoy, 12:00
                  </div>
                  <div data-oid="n:wheag">
                    <span className="text-sm font-medium" data-oid="a3h2gt.">
                      Conductor asignado
                    </span>
                    <p className="text-xs text-gray-500" data-oid="c4.ed5t">
                      por Admin
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Acciones */}
          <div className="mt-6 flex justify-end space-x-3" data-oid="3k737:q">
            <button
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              data-oid="_bxplt6"
            >
              Imprimir
            </button>
            <button
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100"
              data-oid="zz93u2v"
            >
              Editar
            </button>
            <button
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100"
              data-oid=":vo0otq"
            >
              Cancelar Reserva
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;
