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
    <div className="space-y-6 mt-4" data-oid="v-otujc">
      {hasPriceCalculated ? (
        <div className="border rounded-lg bg-white p-6" data-oid="gd2_:ci">
          <h3
            className="text-lg font-medium mb-4 flex items-center"
            data-oid="nmam.e2"
          >
            <DollarSign
              className="h-5 w-5 mr-2 text-green-600"
              data-oid="jjg-6k9"
            />
            Desglose de la Tarifa
          </h3>

          <div className="space-y-4" data-oid="-.5syj5">
            {/* Información del viaje */}
            <div className="bg-gray-50 p-4 rounded-md" data-oid="6jitxct">
              <h4
                className="text-sm font-medium text-gray-700 mb-2"
                data-oid="1aedya-"
              >
                Información del viaje
              </h4>
              <div
                className="grid grid-cols-2 gap-4 text-sm"
                data-oid="sehglpx"
              >
                <div data-oid="eftjas8">
                  <div className="text-gray-500" data-oid="qyq99:4">
                    Origen:
                  </div>
                  <div className="font-medium" data-oid="3ifhk9n">
                    {newBookingFormData.service.pickup.location}
                  </div>
                </div>
                <div data-oid="26ue0s0">
                  <div className="text-gray-500" data-oid="0iem7ut">
                    Destino:
                  </div>
                  <div className="font-medium" data-oid="s.t1m_b">
                    {newBookingFormData.service.dropoff.location}
                  </div>
                </div>
                <div data-oid="j01l.7_">
                  <div className="text-gray-500" data-oid="8rhdhs.">
                    Tipo de servicio:
                  </div>
                  <div className="font-medium" data-oid="kt.h0jq">
                    {newBookingFormData.service.type === "one_way"
                      ? "Un trayecto"
                      : newBookingFormData.service.type === "round_trip"
                        ? "Ida y vuelta"
                        : newBookingFormData.service.type === "hourly"
                          ? "Por horas"
                          : "Día completo"}
                  </div>
                </div>
                <div data-oid="v1v3cgn">
                  <div className="text-gray-500" data-oid="tl3l8wx">
                    Distancia:
                  </div>
                  <div className="font-medium" data-oid="wz.05yw">
                    {newBookingFormData.payment.priceBreakdown.is_round_trip ? (
                      <>
                        {priceCalculationService.formatDistance(
                          newBookingFormData.payment.priceBreakdown
                            .total_distance_km,
                        )}
                        <div
                          className="text-xs text-gray-400"
                          data-oid="n4zg142"
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
                <div data-oid="p3j145b">
                  <div className="text-gray-500" data-oid="_bxq2f6">
                    Tiempo estimado:
                  </div>
                  <div className="font-medium" data-oid="oquyg82">
                    {formatDuration(
                      newBookingFormData.payment.routeInfo.duration,
                    )}
                    {newBookingFormData.payment.priceBreakdown
                      .is_round_trip && (
                      <div className="text-xs text-gray-400" data-oid="4ogsd_f">
                        (Solo ida, vuelta similar)
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Detalles del vehículo */}
            <div className="bg-gray-50 p-4 rounded-md" data-oid=":ohv.sb">
              <h4
                className="text-sm font-medium text-gray-700 mb-2"
                data-oid="xs:6cpe"
              >
                Vehículo seleccionado
              </h4>
              <div
                className="grid grid-cols-2 gap-4 text-sm"
                data-oid="x_xe-el"
              >
                <div data-oid="7fu.b2p">
                  <div className="text-gray-500" data-oid="4cylru.">
                    Vehículo:
                  </div>
                  <div className="font-medium" data-oid="sf6bxu.">
                    {newBookingFormData.vehicle.name}
                  </div>
                </div>
                <div data-oid="jd7bcvr">
                  <div className="text-gray-500" data-oid="oj3xqi-">
                    Conductor:
                  </div>
                  <div className="font-medium" data-oid="x7c4-ei">
                    {newBookingFormData.driver?.name || "Pendiente de asignar"}
                  </div>
                </div>
              </div>
            </div>

            {/* Desglose de precios */}
            <div className="border p-4 rounded-md" data-oid="xevcr5m">
              <h4
                className="text-sm font-medium text-gray-700 mb-3"
                data-oid="g7xrs-q"
              >
                Desglose de la tarifa
              </h4>

              {/* Mensaje especial para ida y vuelta */}
              {newBookingFormData.payment.priceBreakdown.is_round_trip && (
                <div
                  className="mb-4 p-3 bg-gray-100 rounded border-l-4 border-blue-400 text-sm"
                  data-oid="5:z_c4_"
                >
                  <div
                    className="font-medium text-blue-800 mb-1"
                    data-oid="bhpcv_6"
                  >
                    Viaje de ida y vuelta
                  </div>
                  <div className="text-blue-700" data-oid="kq9gk0g">
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

              <div className="space-y-2 mb-4" data-oid="5iyvz9s">
                <div
                  className="flex justify-between text-sm"
                  data-oid="x_ulho_"
                >
                  <span className="text-gray-600" data-oid="p805qts">
                    Tarifa base:
                  </span>
                  <span data-oid="sz48-rj">
                    {priceCalculationService.formatPrice(
                      newBookingFormData.payment.priceBreakdown.base_fare,
                    )}
                  </span>
                </div>
                <div
                  className="flex justify-between text-sm"
                  data-oid=":q1wqcz"
                >
                  <span className="text-gray-600" data-oid="i0zenn.">
                    Cargo por distancia
                    {newBookingFormData.payment.priceBreakdown.is_round_trip &&
                      " (ida y vuelta)"}
                    :
                  </span>
                  <div className="text-right" data-oid="zfe28s1">
                    <div data-oid="v786a8q">
                      {priceCalculationService.formatPrice(
                        newBookingFormData.payment.priceBreakdown
                          .distance_charge,
                      )}
                    </div>
                    {newBookingFormData.payment.priceBreakdown
                      .is_round_trip && (
                      <div className="text-xs text-gray-400" data-oid="v.di9ox">
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
                  data-oid="n3oq3io"
                >
                  <span data-oid="34qft6d">Subtotal:</span>
                  <span data-oid="lb955:w">
                    {priceCalculationService.formatPrice(
                      newBookingFormData.payment.priceBreakdown.subtotal,
                    )}
                  </span>
                </div>
                <div
                  className="flex justify-between text-sm"
                  data-oid="8r88ekv"
                >
                  <span className="text-gray-600" data-oid=".qefln6">
                    IVA (
                    {newBookingFormData.payment.priceBreakdown.tax_percentage}
                    %):
                  </span>
                  <span data-oid="_lls-a3">
                    {priceCalculationService.formatPrice(
                      newBookingFormData.payment.priceBreakdown.tax_amount,
                    )}
                  </span>
                </div>
              </div>

              <div
                className="flex justify-between items-center border-t pt-3 mt-2"
                data-oid=":rrd-1g"
              >
                <span className="font-bold text-lg" data-oid="qy_s05w">
                  Total:
                </span>
                <span
                  className="font-bold text-lg text-gray-600"
                  data-oid="tcazn0z"
                >
                  {priceCalculationService.formatPrice(
                    newBookingFormData.payment.priceBreakdown.total,
                  )}
                </span>
              </div>
            </div>

            {/* Método de pago */}
            <div data-oid="4hp1zyk">
              <h4
                className="text-sm font-medium text-gray-700 mb-3"
                data-oid="44rzf73"
              >
                Método de pago
              </h4>
              <div className="space-y-3" data-oid="rqiplzp">
                <label
                  className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50"
                  data-oid="q:1ccjr"
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
                    data-oid="tts2f_q"
                  />

                  <div className="ml-3" data-oid="7:pxgu3">
                    <div className="font-medium text-sm" data-oid="1c729pq">
                      Tarjeta de crédito
                    </div>
                    <div className="text-xs text-gray-500" data-oid="t:2k7y6">
                      El cliente pagará con tarjeta de crédito al finalizar el
                      viaje
                    </div>
                  </div>
                </label>

                <label
                  className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50"
                  data-oid="38pt4q3"
                >
                  <input
                    type="radio"
                    className="form-radio text-gray-600"
                    name="payment_method"
                    checked={newBookingFormData.payment.method === "cash"}
                    onChange={() =>
                      handleFormChange("payment", "method", "cash")
                    }
                    data-oid="sq_e.mv"
                  />

                  <div className="ml-3" data-oid="ezgb1j:">
                    <div className="font-medium text-sm" data-oid=":329gg7">
                      Efectivo
                    </div>
                    <div className="text-xs text-gray-500" data-oid="alz9plj">
                      El cliente pagará en efectivo al conductor
                    </div>
                  </div>
                </label>

                <label
                  className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50"
                  data-oid="crrw1de"
                >
                  <input
                    type="radio"
                    className="form-radio text-gray-600"
                    name="payment_method"
                    checked={newBookingFormData.payment.method === "invoice"}
                    onChange={() =>
                      handleFormChange("payment", "method", "invoice")
                    }
                    data-oid="lj65zd5"
                  />

                  <div className="ml-3" data-oid="tc7u5fw">
                    <div className="font-medium text-sm" data-oid="9413pe-">
                      Facturación
                    </div>
                    <div className="text-xs text-gray-500" data-oid="yqqkix2">
                      Se emitirá una factura para pago posterior
                    </div>
                  </div>
                </label>

                <label
                  className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50"
                  data-oid="0_cqk0l"
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
                    data-oid="x06vxjx"
                  />

                  <div className="ml-3" data-oid="5_dzyz2">
                    <div className="font-medium text-sm" data-oid="i339p7b">
                      Cuenta corporativa
                    </div>
                    <div className="text-xs text-gray-500" data-oid="7use-_.">
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
          data-oid="b.4yo4s"
        >
          <div className="flex items-start" data-oid="3j:yd58">
            <AlertCircle
              className="h-6 w-6 text-amber-500 mr-3 mt-0.5"
              data-oid="wydtuua"
            />

            <div data-oid="hnbd79:">
              <h3 className="font-medium text-amber-800" data-oid="g.di._w">
                No hay tarifa calculada
              </h3>
              <p className="text-amber-700 mt-1" data-oid="12nu-fh">
                No se ha calculado ninguna tarifa para este servicio. Por favor,
                vuelva a la pestaña de Servicio y seleccione un vehículo y un
                destino para calcular la tarifa.
              </p>
              <Button
                variant="outline"
                className="mt-3 text-sm"
                onClick={() => setActiveTab("service")}
                data-oid="l4tw85w"
              >
                Volver a la selección de servicio
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-8" data-oid="rds.ea:">
        <Button
          variant="outline"
          onClick={() => setActiveTab("details")}
          className="text-sm"
          data-oid="zwshc-1"
        >
          Anterior: Detalles
        </Button>
        <Button
          className="bg-black hover:bg-gray-800 text-sm"
          onClick={handleSubmitNewBooking}
          disabled={!hasPriceCalculated}
          data-oid="n2bmla."
        >
          <CreditCard className="h-4 w-4 mr-2" data-oid="kuhxg97" />
          Completar reserva
        </Button>
      </div>
    </div>
  );
};

export default PaymentTab;
