import { Button } from "@/components/ui/button";
import { DollarSign, CreditCard, AlertCircle } from "lucide-react";
import { priceCalculationService } from "@/services/priceCalculationService";

type PaymentTabProps = {
  newBookingFormData: any;
  handleFormChange: (section: string, field: string, value: any) => void;
  setActiveTab: (tab: any) => void;
  handleSubmitNewBooking: () => void;
};

const PaymentTab = ({
  newBookingFormData,
  handleFormChange,
  setActiveTab,
  handleSubmitNewBooking,
}: PaymentTabProps) => {
  // Comprobar si hay un precio calculado
  const hasPriceCalculated = !!newBookingFormData.payment?.priceBreakdown;

  /*
  // Formatear distancia y duración
  const formatDistance = (meters: number): string => {
    const km = meters / 1000;
    return `${km.toFixed(1)} km`;
  };
  */

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      const remainingMinutes = minutes % 60;
      return `${hours} h ${remainingMinutes > 0 ? `${remainingMinutes} min` : ""}`;
    }

    return `${minutes} min`;
  };

  return (
    <div className="space-y-6 mt-4" data-oid="35joat7">
      {hasPriceCalculated ? (
        <div className="border rounded-lg bg-white p-6" data-oid="rfzimlr">
          <h3
            className="text-lg font-medium mb-4 flex items-center"
            data-oid="7n4s6zg"
          >
            <DollarSign
              className="h-5 w-5 mr-2 text-green-600"
              data-oid="-cpyp4e"
            />
            Desglose de la Tarifa
          </h3>

          <div className="space-y-4" data-oid="xlqg_0r">
            {/* Información del viaje */}
            <div className="bg-gray-50 p-4 rounded-md" data-oid="kpy9ava">
              <h4
                className="text-sm font-medium text-gray-700 mb-2"
                data-oid="ju1y.b8"
              >
                Información del viaje
              </h4>
              <div
                className="grid grid-cols-2 gap-4 text-sm"
                data-oid="nfk_abu"
              >
                <div data-oid="doy0abl">
                  <div className="text-gray-500" data-oid="zw_g6sq">
                    Origen:
                  </div>
                  <div className="font-medium" data-oid="ubdzzod">
                    {newBookingFormData.service.pickup.location}
                  </div>
                </div>
                <div data-oid="99q-f2g">
                  <div className="text-gray-500" data-oid="oj501sg">
                    Destino:
                  </div>
                  <div className="font-medium" data-oid="he4_eo9">
                    {newBookingFormData.service.dropoff.location}
                  </div>
                </div>
                <div data-oid="l2luzbr">
                  <div className="text-gray-500" data-oid="rdzoifp">
                    Tipo de servicio:
                  </div>
                  <div className="font-medium" data-oid="m73w64c">
                    {newBookingFormData.service.type === "one_way"
                      ? "Un trayecto"
                      : newBookingFormData.service.type === "round_trip"
                        ? "Ida y vuelta"
                        : newBookingFormData.service.type === "hourly"
                          ? "Por horas"
                          : "Día completo"}
                  </div>
                </div>
                <div data-oid="ow7nn4q">
                  <div className="text-gray-500" data-oid="mfemf.y">
                    Distancia:
                  </div>
                  <div className="font-medium" data-oid=":cm76t3">
                    {newBookingFormData.payment.priceBreakdown.is_round_trip ? (
                      <>
                        {priceCalculationService.formatDistance(
                          newBookingFormData.payment.priceBreakdown
                            .total_distance_km,
                        )}
                        <div
                          className="text-xs text-gray-400"
                          data-oid="iahfcup"
                        >
                          (
                          {priceCalculationService.formatDistance(
                            newBookingFormData.payment.priceBreakdown
                              .one_way_distance_km || 0,
                          )}{" "}
                          × 2)
                        </div>
                      </>
                    ) : (
                      priceCalculationService.formatDistance(
                        newBookingFormData.payment.priceBreakdown
                          .total_distance_km,
                      )
                    )}
                  </div>
                </div>
                <div data-oid="uhholaf">
                  <div className="text-gray-500" data-oid="nbtxo6_">
                    Tiempo estimado:
                  </div>
                  <div className="font-medium" data-oid="h7gx7vt">
                    {formatDuration(
                      newBookingFormData.payment.routeInfo.duration,
                    )}
                    {newBookingFormData.payment.priceBreakdown
                      .is_round_trip && (
                      <div className="text-xs text-gray-400" data-oid="tsk.o.3">
                        (Solo ida, vuelta similar)
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Detalles del vehículo */}
            <div className="bg-gray-50 p-4 rounded-md" data-oid="ewcjojn">
              <h4
                className="text-sm font-medium text-gray-700 mb-2"
                data-oid="md_e-dj"
              >
                Vehículo seleccionado
              </h4>
              <div
                className="grid grid-cols-2 gap-4 text-sm"
                data-oid="ptjf0t_"
              >
                <div data-oid="dwjls_j">
                  <div className="text-gray-500" data-oid="h7df57p">
                    Vehículo:
                  </div>
                  <div className="font-medium" data-oid="xcdjq_i">
                    {newBookingFormData.vehicle.name}
                  </div>
                </div>
                <div data-oid="uk3pes1">
                  <div className="text-gray-500" data-oid="-9lvj0n">
                    Conductor:
                  </div>
                  <div className="font-medium" data-oid="kanq-m4">
                    {newBookingFormData.driver?.name || "Pendiente de asignar"}
                  </div>
                </div>
              </div>
            </div>

            {/* Desglose de precios */}
            <div className="border p-4 rounded-md" data-oid="feq_4rr">
              <h4
                className="text-sm font-medium text-gray-700 mb-3"
                data-oid="ejmo6pe"
              >
                Desglose de la tarifa
              </h4>

              {/* Mensaje especial para ida y vuelta */}
              {newBookingFormData.payment.priceBreakdown.is_round_trip && (
                <div
                  className="mb-4 p-3 bg-gray-100 rounded border-l-4 border-blue-400 text-sm"
                  data-oid="i8at0vw"
                >
                  <div
                    className="font-medium text-blue-800 mb-1"
                    data-oid="5c53zum"
                  >
                    Viaje de ida y vuelta
                  </div>
                  <div className="text-blue-700" data-oid="213e0wq">
                    El precio incluye tanto el trayecto de ida como el de
                    vuelta. La distancia total calculada es de{" "}
                    {priceCalculationService.formatDistance(
                      newBookingFormData.payment.priceBreakdown
                        .total_distance_km,
                    )}
                    .
                  </div>
                </div>
              )}

              <div className="space-y-2 mb-4" data-oid="kopx98-">
                <div
                  className="flex justify-between text-sm"
                  data-oid="dq4_yum"
                >
                  <span className="text-gray-600" data-oid="oh.6y_n">
                    Tarifa base:
                  </span>
                  <span data-oid="kxea77r">
                    {priceCalculationService.formatPrice(
                      newBookingFormData.payment.priceBreakdown.base_fare,
                    )}
                  </span>
                </div>
                <div
                  className="flex justify-between text-sm"
                  data-oid="tn-2_a2"
                >
                  <span className="text-gray-600" data-oid=":lwb051">
                    Cargo por distancia
                    {newBookingFormData.payment.priceBreakdown.is_round_trip &&
                      " (ida y vuelta)"}
                    :
                  </span>
                  <div className="text-right" data-oid="bkehvtk">
                    <div data-oid=".ufj.0q">
                      {priceCalculationService.formatPrice(
                        newBookingFormData.payment.priceBreakdown
                          .distance_charge,
                      )}
                    </div>
                    {newBookingFormData.payment.priceBreakdown
                      .is_round_trip && (
                      <div className="text-xs text-gray-400" data-oid="s5gs558">
                        {priceCalculationService.formatDistance(
                          newBookingFormData.payment.priceBreakdown
                            .total_distance_km,
                        )}{" "}
                        total
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className="flex justify-between text-sm font-medium pt-2 border-t"
                  data-oid="0c4d.lx"
                >
                  <span data-oid="1xzta14">Subtotal:</span>
                  <span data-oid="e.s.544">
                    {priceCalculationService.formatPrice(
                      newBookingFormData.payment.priceBreakdown.subtotal,
                    )}
                  </span>
                </div>
                <div
                  className="flex justify-between text-sm"
                  data-oid="9dm4o_:"
                >
                  <span className="text-gray-600" data-oid="yc0ofsm">
                    IVA (
                    {newBookingFormData.payment.priceBreakdown.tax_percentage}
                    %):
                  </span>
                  <span data-oid="w1g_99.">
                    {priceCalculationService.formatPrice(
                      newBookingFormData.payment.priceBreakdown.tax_amount,
                    )}
                  </span>
                </div>
              </div>

              <div
                className="flex justify-between items-center border-t pt-3 mt-2"
                data-oid="05s.wid"
              >
                <span className="font-bold text-lg" data-oid="qhqa2u2">
                  Total:
                </span>
                <span
                  className="font-bold text-lg text-gray-600"
                  data-oid="cax:.7l"
                >
                  {priceCalculationService.formatPrice(
                    newBookingFormData.payment.priceBreakdown.total,
                  )}
                </span>
              </div>
            </div>

            {/* Método de pago */}
            <div data-oid="ad21fir">
              <h4
                className="text-sm font-medium text-gray-700 mb-3"
                data-oid="l4:b8z9"
              >
                Método de pago
              </h4>
              <div className="space-y-3" data-oid=".95bja5">
                <label
                  className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50"
                  data-oid="ctx2oj:"
                >
                  <input
                    type="radio"
                    className="form-radio text-gray-600"
                    name="payment_method"
                    checked={
                      newBookingFormData.payment.method === "credit_card"
                    }
                    onChange={() =>
                      handleFormChange("payment", "method", "credit_card")
                    }
                    data-oid="e3uhh-3"
                  />

                  <div className="ml-3" data-oid="mojoa2j">
                    <div className="font-medium text-sm" data-oid="lbdtjla">
                      Tarjeta de crédito
                    </div>
                    <div className="text-xs text-gray-500" data-oid="2dega7d">
                      El cliente pagará con tarjeta de crédito al finalizar el
                      viaje
                    </div>
                  </div>
                </label>

                <label
                  className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50"
                  data-oid="1tq09u."
                >
                  <input
                    type="radio"
                    className="form-radio text-gray-600"
                    name="payment_method"
                    checked={newBookingFormData.payment.method === "cash"}
                    onChange={() =>
                      handleFormChange("payment", "method", "cash")
                    }
                    data-oid="valnt8f"
                  />

                  <div className="ml-3" data-oid="g7wak:9">
                    <div className="font-medium text-sm" data-oid="6u0f:_f">
                      Efectivo
                    </div>
                    <div className="text-xs text-gray-500" data-oid="ys1cm4k">
                      El cliente pagará en efectivo al conductor
                    </div>
                  </div>
                </label>

                <label
                  className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50"
                  data-oid="g_ss3t8"
                >
                  <input
                    type="radio"
                    className="form-radio text-gray-600"
                    name="payment_method"
                    checked={newBookingFormData.payment.method === "invoice"}
                    onChange={() =>
                      handleFormChange("payment", "method", "invoice")
                    }
                    data-oid="ye2sn.r"
                  />

                  <div className="ml-3" data-oid="11zt6xw">
                    <div className="font-medium text-sm" data-oid="blh4j-.">
                      Facturación
                    </div>
                    <div className="text-xs text-gray-500" data-oid="5u-gui4">
                      Se emitirá una factura para pago posterior
                    </div>
                  </div>
                </label>

                <label
                  className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50"
                  data-oid="8pflza_"
                >
                  <input
                    type="radio"
                    className="form-radio text-gray-600"
                    name="payment_method"
                    checked={
                      newBookingFormData.payment.method === "corporate_account"
                    }
                    onChange={() =>
                      handleFormChange("payment", "method", "corporate_account")
                    }
                    data-oid="lffq-er"
                  />

                  <div className="ml-3" data-oid="u-8rllh">
                    <div className="font-medium text-sm" data-oid="5uy:hpt">
                      Cuenta corporativa
                    </div>
                    <div className="text-xs text-gray-500" data-oid="ntqrtsr">
                      Cargo a la cuenta corporativa del cliente
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="bg-amber-50 p-6 rounded-lg border border-amber-200"
          data-oid="diuzupn"
        >
          <div className="flex items-start" data-oid="8ty:9_3">
            <AlertCircle
              className="h-6 w-6 text-amber-500 mr-3 mt-0.5"
              data-oid="f.6w-tg"
            />

            <div data-oid="f0aepdz">
              <h3 className="font-medium text-amber-800" data-oid="fsn8p84">
                No hay tarifa calculada
              </h3>
              <p className="text-amber-700 mt-1" data-oid="fn7_2e9">
                No se ha calculado ninguna tarifa para este servicio. Por favor,
                vuelva a la pestaña de Servicio y seleccione un vehículo y un
                destino para calcular la tarifa.
              </p>
              <Button
                variant="outline"
                className="mt-3 text-sm"
                onClick={() => setActiveTab("service")}
                data-oid="p:y_r5c"
              >
                Volver a la selección de servicio
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-8" data-oid="t-p7v_k">
        <Button
          variant="outline"
          onClick={() => setActiveTab("details")}
          className="text-sm"
          data-oid="9-hj8qb"
        >
          Anterior: Detalles
        </Button>
        <Button
          className="bg-black hover:bg-gray-800 text-sm"
          onClick={handleSubmitNewBooking}
          disabled={!hasPriceCalculated}
          data-oid="xgx46ot"
        >
          <CreditCard className="h-4 w-4 mr-2" data-oid="jakw38b" />
          Completar reserva
        </Button>
      </div>
    </div>
  );
};

export default PaymentTab;
