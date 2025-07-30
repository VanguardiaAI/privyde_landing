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
      data-oid="m6ia5vr"
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        data-oid=":7lxzb_"
      >
        <div
          className="flex justify-between items-center border-b px-6 py-4"
          data-oid="m6mcn7a"
        >
          <h2
            className="text-xl font-semibold text-gray-800"
            data-oid="_w16gn_"
          >
            Detalles de la Reserva
          </h2>
          <button
            onClick={handleCloseBookingDetails}
            className="text-gray-500 hover:text-gray-700"
            data-oid="07g0.k4"
          >
            <X size={24} data-oid="tvl4ywr" />
          </button>
        </div>

        <div className="p-6" data-oid="ssjndk5">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            data-oid="25pwc_6"
          >
            {/* Información básica de la reserva */}
            <div className="bg-gray-50 rounded-lg p-4" data-oid="66bgtj2">
              <h3
                className="text-lg font-medium text-gray-800 mb-4"
                data-oid="7telfpx"
              >
                Información de la Reserva
              </h3>
              <div className="space-y-3" data-oid="jz6wtpj">
                <div className="flex justify-between" data-oid="soemqzn">
                  <span className="text-gray-600" data-oid="jvripbt">
                    ID:
                  </span>
                  <span className="font-medium" data-oid="k_7j-ny">
                    {selectedBookingForDetails.id}
                  </span>
                </div>
                <div className="flex justify-between" data-oid="gri_9kr">
                  <span className="text-gray-600" data-oid="qz5ev9y">
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
                    data-oid="mf7akwd"
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
                <div className="flex justify-between" data-oid="gv:68dz">
                  <span className="text-gray-600" data-oid="n29si5g">
                    Fecha:
                  </span>
                  <span className="font-medium" data-oid="t_9.rze">
                    {selectedBookingForDetails.date}
                  </span>
                </div>
                <div className="flex justify-between" data-oid="-dljj7x">
                  <span className="text-gray-600" data-oid="nfjj7ws">
                    Precio:
                  </span>
                  <span className="font-medium" data-oid="d-kpnx7">
                    {selectedBookingForDetails.price}
                  </span>
                </div>
                <div className="flex justify-between" data-oid="80gnk.j">
                  <span className="text-gray-600" data-oid="s88x9-d">
                    Tipo:
                  </span>
                  <span className="font-medium" data-oid="cg.fq4.">
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
            <div className="bg-gray-50 rounded-lg p-4" data-oid="f6fq4fi">
              <h3
                className="text-lg font-medium text-gray-800 mb-4"
                data-oid="08s-2.u"
              >
                Información del Cliente
              </h3>
              <div className="space-y-3" data-oid="lpmjfjr">
                <div className="flex justify-between" data-oid="cy6p-xe">
                  <span className="text-gray-600" data-oid="v:lradn">
                    Nombre:
                  </span>
                  <span className="font-medium" data-oid="56_3gid">
                    {selectedBookingForDetails.clientName}
                  </span>
                </div>
                <div className="flex justify-between" data-oid="g6r9q3a">
                  <span className="text-gray-600" data-oid="y4ec:q5">
                    Email:
                  </span>
                  <span className="font-medium" data-oid="zqu6zfr">
                    cliente@ejemplo.com
                  </span>
                </div>
                <div className="flex justify-between" data-oid="k_u:bpz">
                  <span className="text-gray-600" data-oid="0if76-l">
                    Teléfono:
                  </span>
                  <span className="font-medium" data-oid="s5mp_:h">
                    +34 612 345 678
                  </span>
                </div>
              </div>
            </div>

            {/* Detalles de la ruta */}
            <div
              className="md:col-span-2 bg-gray-50 rounded-lg p-4"
              data-oid="v0rrx80"
            >
              <h3
                className="text-lg font-medium text-gray-800 mb-4"
                data-oid="87wjaw_"
              >
                Detalles de la Ruta
              </h3>
              <div className="space-y-3" data-oid="n8mm3sv">
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  data-oid="9nuf437"
                >
                  <div data-oid="qua-f7b">
                    <span className="text-gray-600 block" data-oid="vzcgr6m">
                      Origen:
                    </span>
                    <span className="font-medium block mt-1" data-oid="lpw7z0-">
                      {selectedBookingForDetails.fromTo.split("→")[0].trim()}
                    </span>
                  </div>
                  <div data-oid="2zoplzt">
                    <span className="text-gray-600 block" data-oid="nsge4m0">
                      Destino:
                    </span>
                    <span className="font-medium block mt-1" data-oid="r02d2fe">
                      {selectedBookingForDetails.fromTo.split("→")[1].trim()}
                    </span>
                  </div>
                </div>
                <div className="pt-2" data-oid="sa:4:ui">
                  <span className="text-gray-600 block" data-oid="_50.myz">
                    Notas adicionales:
                  </span>
                  <span className="font-medium block mt-1" data-oid="ebkyjjq">
                    Sin notas adicionales.
                  </span>
                </div>
              </div>
            </div>

            {/* Información del vehículo y conductor */}
            <div className="bg-gray-50 rounded-lg p-4" data-oid="5iy5fqr">
              <h3
                className="text-lg font-medium text-gray-800 mb-4"
                data-oid="_0v0eut"
              >
                Vehículo y Conductor
              </h3>
              <div className="space-y-3" data-oid=".a27h:v">
                <div className="flex justify-between" data-oid="0.iv1gu">
                  <span className="text-gray-600" data-oid=".vhwlze">
                    Vehículo:
                  </span>
                  <span className="font-medium" data-oid="7kj2zhn">
                    {selectedBookingForDetails.vehicle}
                  </span>
                </div>
                <div className="flex justify-between" data-oid="d-g.rhv">
                  <span className="text-gray-600" data-oid="uht8zbt">
                    Conductor:
                  </span>
                  <span className="font-medium" data-oid="r:sadoq">
                    {selectedBookingForDetails.driver}
                  </span>
                </div>
                <div className="flex justify-between" data-oid="0nu426t">
                  <span className="text-gray-600" data-oid="dh3lho6">
                    Matrícula:
                  </span>
                  <span className="font-medium" data-oid="8m1kdyq">
                    1234 ABC
                  </span>
                </div>
              </div>
            </div>

            {/* Historial de la reserva */}
            <div className="bg-gray-50 rounded-lg p-4" data-oid=":::o49g">
              <h3
                className="text-lg font-medium text-gray-800 mb-4"
                data-oid="9biu5qj"
              >
                Historial de la Reserva
              </h3>
              <div className="space-y-3" data-oid="d6..fv5">
                <div className="flex items-start" data-oid="s6vppz.">
                  <div
                    className="min-w-[100px] text-xs text-gray-500"
                    data-oid="seci84c"
                  >
                    Hoy, 10:45
                  </div>
                  <div data-oid="qxg:.-5">
                    <span className="text-sm font-medium" data-oid="x14bsxw">
                      Reserva creada
                    </span>
                    <p className="text-xs text-gray-500" data-oid="_8wnr3c">
                      por Admin
                    </p>
                  </div>
                </div>
                <div className="flex items-start" data-oid="09mzrdx">
                  <div
                    className="min-w-[100px] text-xs text-gray-500"
                    data-oid="z.-xq5x"
                  >
                    Hoy, 11:20
                  </div>
                  <div data-oid="_51y1-j">
                    <span className="text-sm font-medium" data-oid="fh6fd58">
                      Estado actualizado a Confirmado
                    </span>
                    <p className="text-xs text-gray-500" data-oid="9tc9:_w">
                      por Sistema
                    </p>
                  </div>
                </div>
                <div className="flex items-start" data-oid="is3j-mq">
                  <div
                    className="min-w-[100px] text-xs text-gray-500"
                    data-oid="58hi11r"
                  >
                    Hoy, 12:00
                  </div>
                  <div data-oid="48:yrcm">
                    <span className="text-sm font-medium" data-oid="mktsk4l">
                      Conductor asignado
                    </span>
                    <p className="text-xs text-gray-500" data-oid=".:b.hr_">
                      por Admin
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Acciones */}
          <div className="mt-6 flex justify-end space-x-3" data-oid="2-mdy9c">
            <button
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              data-oid="x.-a8wu"
            >
              Imprimir
            </button>
            <button
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100"
              data-oid="ni6-uod"
            >
              Editar
            </button>
            <button
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100"
              data-oid="hetgvo."
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
