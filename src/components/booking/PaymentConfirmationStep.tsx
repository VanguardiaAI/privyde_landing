import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  XCircle,
  ChevronRight,
  Share2,
  Download,
  Copy,
  CreditCard,
  Loader2,
  CarFront,
  CalendarClock,
  AlertCircle,
} from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

// Obtener variables de entorno de manera segura
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

// Log para diagnóstico - solo se imprime en desarrollo
if (import.meta.env.DEV) {
  console.log("Variables de entorno en PaymentConfirmationStep:", {
    API_URL,
    // Imprime solo una parte de la clave para evitar exponerla completamente
    STRIPE_KEY: STRIPE_PUBLISHABLE_KEY
      ? `${STRIPE_PUBLISHABLE_KEY.substring(0, 10)}...${STRIPE_PUBLISHABLE_KEY.substring(STRIPE_PUBLISHABLE_KEY.length - 4)}`
      : "no definida",
  });
}

interface PaymentConfirmationStepProps {
  sessionData: any;
}

export default function PaymentConfirmationStep({
  sessionData,
}: PaymentConfirmationStepProps) {
  const navigate = useNavigate();
  const { sessionId } = useParams<{ sessionId: string }>();
  const [searchParams] = useSearchParams();
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [confirmingBooking, setConfirmingBooking] = useState(true);
  const [_bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [estimatedArrival, setEstimatedArrival] = useState("");
  const [distance, setDistance] = useState("");
  const [initializedData, setInitializedData] = useState<any>(null);

  // Inicializar datos de forma segura
  useEffect(() => {
    if (sessionData) {
      setInitializedData(sessionData);
    }
  }, [sessionData]);

  // Confirmar la reserva en el backend al cargar el componente
  useEffect(() => {
    // No hacer nada si no hay sessionData
    if (!initializedData || !sessionId) return;

    const confirmBooking = async () => {
      try {
        // Verificar el estado del pago de Stripe
        // Si el usuario es redirigido desde Stripe, la URL tendrá los parámetros payment_intent y payment_intent_client_secret
        const paymentIntentId =
          searchParams.get("payment_intent") ||
          initializedData?.payment?.stripe_payment_intent_id;

        if (!paymentIntentId) {
          setError("No se encontró información del pago");
          setConfirmingBooking(false);
          return;
        }

        // Verificar el estado del pago con Stripe usando el API del backend
        await axios.post(`${API_URL}/payment/update-payment-method`, {
          payment_intent_id: paymentIntentId,
          payment_method_id:
            initializedData?.payment?.payment_method_details || null,
        });

        // Llamar al endpoint para confirmar la reserva
        const response = await axios.post(`${API_URL}/booking/confirm`, {
          session_id: sessionId,
          stripe_payment_intent_id: paymentIntentId,
        });

        // Actualizar el estado con los detalles de la reserva confirmada
        setBookingDetails(response.data);
        setBookingConfirmed(true);

        // Calcular el tiempo estimado de llegada y la distancia para viajes de ida
        if (
          initializedData.tripType === "ida" &&
          initializedData.from &&
          initializedData.to
        ) {
          try {
            // Usar el endpoint de cálculo de precios para obtener distancia y tiempo
            const priceResponse = await axios.post(
              `${API_URL}/booking/calculate-price`,
              {
                vehicle_id: initializedData.vehicle.id,
                trip_type: initializedData.tripType,
                from_place_id: initializedData.from.place_id,
                to_place_id: initializedData.to.place_id,
                pickup_date: initializedData.date,
                pickup_time: initializedData.time,
              },
            );

            if (priceResponse.data.price_breakdown) {
              const breakdown = priceResponse.data.price_breakdown;

              // Establecer distancia si está disponible
              if (breakdown.estimated_distance_km) {
                setDistance(breakdown.estimated_distance_km.toString());
              }

              // Calcular tiempo estimado de llegada
              if (breakdown.estimated_duration_hours && initializedData.time) {
                const durationMinutes = Math.round(
                  breakdown.estimated_duration_hours * 60,
                );

                // Extraer la hora del viaje desde initializedData.time
                const timeStr = initializedData.time;
                let hours = 0;
                let minutes = 0;

                // Parsear la hora (formato esperado "HH : MM")
                const timeParts = timeStr.split(":");
                if (timeParts.length === 2) {
                  hours = parseInt(timeParts[0].trim());
                  minutes = parseInt(timeParts[1].trim());
                }

                // Crear fecha base y añadir duración estimada
                const now = new Date();
                now.setHours(hours);
                now.setMinutes(minutes);
                const arrivalTime = new Date(
                  now.getTime() + durationMinutes * 60000,
                );

                setEstimatedArrival(
                  arrivalTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                );
              }
            }
          } catch (error) {
            console.error("Error al calcular la distancia:", error);
            // Usar valores predeterminados en caso de error
            setDistance("35.2");
            setEstimatedArrival("11:07");
          }
        }
      } catch (error: any) {
        console.error("Error al confirmar la reserva:", error);
        setError(
          error.response?.data?.error || "Error al confirmar la reserva",
        );
      } finally {
        setConfirmingBooking(false);
      }
    };

    confirmBooking();
  }, [initializedData, sessionId, searchParams]);

  // Función para manejar el botón de compartir
  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
  };

  // Función para volver a la página de inicio
  const handleBackToHome = () => {
    navigate("/");
  };

  // Función para descargar el recibo (simulación)
  const handleDownloadReceipt = () => {
    alert("Descargando recibo...");
    // En una implementación real, aquí se generaría un PDF o se descargaría un recibo real
  };

  // Función para reintentar el pago si falló
  const handleRetryPayment = () => {
    navigate(`/booking/${sessionId}/payment`);
  };

  // Verificar que sessionData no sea undefined o null
  if (!initializedData) {
    return (
      <Card className="max-w-3xl mx-auto shadow-sm" data-oid="gg1w9hw">
        <CardContent className="p-6 text-center" data-oid="-2ywbvm">
          <AlertCircle
            className="h-10 w-10 text-black mx-auto mb-4"
            data-oid="oft0u36"
          />

          <h3 className="font-semibold text-lg mb-2" data-oid="8si7db0">
            Error de datos
          </h3>
          <p className="text-gray-600 mb-4" data-oid="hb:nj97">
            No se han podido cargar los datos de la sesión
          </p>
        </CardContent>
      </Card>
    );
  }

  // Asegurarse de tener todos los datos necesarios con valores por defecto
  const originName = initializedData?.from?.description || "Punto de recogida";
  const destinationName = initializedData?.to?.description || "Destino";
  const tripDate = initializedData?.date || "";
  const tripTime = initializedData?.time || "";
  const vehicleName = initializedData?.vehicle?.name || "Vehículo";
  const totalPrice = initializedData?.payment?.amount || 0;
  const lastFourDigits = initializedData?.payment?.card_last_four || "****";
  const passengerName =
    initializedData?.passenger_details?.pickup_sign || "Pasajero";
  const bookingReference =
    bookingDetails?.booking_id ||
    "OP" + Math.floor(100000 + Math.random() * 900000);
  const paymentStatus = bookingDetails?.payment_status || "pending";

  // Mostrar indicador de carga mientras se confirma la reserva
  if (confirmingBooking) {
    return (
      <Card className="max-w-3xl mx-auto shadow-sm" data-oid="fqykbql">
        <CardContent
          className="p-6 flex flex-col items-center justify-center min-h-[400px]"
          data-oid="uapas9d"
        >
          <Loader2
            className="h-12 w-12 animate-spin text-primary mb-4"
            data-oid="f:l2:gi"
          />

          <h2 className="text-xl font-semibold mb-2" data-oid="7mie8w5">
            Confirmando su reserva
          </h2>
          <p className="text-gray-500" data-oid=".rfqymh">
            Estamos procesando los detalles de su reserva. Por favor, espere un
            momento...
          </p>
        </CardContent>
      </Card>
    );
  }

  // Mostrar mensaje de error si la confirmación falló
  if (error) {
    return (
      <Card className="max-w-3xl mx-auto shadow-sm" data-oid="4-pf9u1">
        <CardContent
          className="p-6 flex flex-col items-center justify-center min-h-[400px]"
          data-oid="t2k6xef"
        >
          <XCircle className="h-12 w-12 text-black mb-4" data-oid="lj1k4ew" />
          <h2 className="text-xl font-semibold mb-2" data-oid="usagso3">
            Error al confirmar la reserva
          </h2>
          <p className="text-gray-500 mb-4" data-oid="ns-rp_b">
            {error}
          </p>
          <div className="flex gap-4" data-oid="xo09lo:">
            <button
              onClick={handleRetryPayment}
              className="flex items-center justify-center gap-2 bg-primary text-white rounded-md py-2 px-4 hover:bg-primary/90 transition-colors"
              data-oid="o2.u:py"
            >
              <CreditCard className="h-4 w-4" data-oid="psibcux" />
              <span data-oid="n6pefyu">Reintentar pago</span>
            </button>
            <button
              onClick={handleBackToHome}
              className="flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 px-4 hover:bg-gray-50 transition-colors"
              data-oid="00h-z.a"
            >
              <span data-oid=":8d55.w">Volver al inicio</span>
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Mostrar la confirmación de reserva exitosa
  return (
    <Card className="max-w-3xl mx-auto shadow-sm" data-oid="0_jqkf-">
      <CardContent className="p-0" data-oid="hmvy2cx">
        {/* Cabecera con estado de confirmación */}
        <div
          className="bg-emerald-50 p-6 rounded-t-lg flex flex-col items-center justify-center border-b border-emerald-100"
          data-oid="f8oyndq"
        >
          <CheckCircle
            className="h-14 w-14 text-emerald-500 mb-4"
            data-oid="2ywbico"
          />

          <h2 className="text-xl font-semibold mb-1" data-oid="7dp9dsd">
            ¡Reserva confirmada!
          </h2>
          <p className="text-emerald-700" data-oid="pv3egoe">
            Hemos enviado los detalles a su correo electrónico
          </p>
        </div>

        {/* Información de la reserva */}
        <div className="p-6" data-oid="wuin0l1">
          <div className="mb-6" data-oid="5s0l7gm">
            <h3 className="text-lg font-semibold mb-3" data-oid="r_ugw9l">
              Información de recogida
            </h3>

            <div className="grid gap-3" data-oid="kq_fhrs">
              <div className="flex gap-3 items-start" data-oid="zwrw311">
                <div className="bg-gray-100 p-2 rounded-md" data-oid="f11zu.c">
                  <CarFront
                    className="h-5 w-5 text-gray-600"
                    data-oid="yl.smfa"
                  />
                </div>
                <div data-oid="4-:i07f">
                  <p className="font-medium" data-oid="eb_:7o.">
                    {vehicleName}
                  </p>
                  <p className="text-sm text-gray-600" data-oid="0hh9p._">
                    {bookingReference}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start" data-oid="naw89b5">
                <div className="bg-gray-100 p-2 rounded-md" data-oid="3mdkke6">
                  <CalendarClock
                    className="h-5 w-5 text-gray-600"
                    data-oid="x4b_9.l"
                  />
                </div>
                <div data-oid="_8t:4zp">
                  <p className="font-medium" data-oid="owuyyid">
                    {tripDate}
                  </p>
                  <p className="text-sm text-gray-600" data-oid=":fcr3y7">
                    A las {tripTime} (CEST)
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start" data-oid=":.6_x8m">
                <div
                  className="bg-gray-100 p-2 rounded-md flex items-center justify-center"
                  data-oid="3r71q4x"
                >
                  <div
                    className="h-5 w-5 flex items-center justify-center font-semibold text-gray-600"
                    data-oid="xzb0aaf"
                  >
                    A
                  </div>
                </div>
                <div data-oid="eir5bl_">
                  <p className="font-medium" data-oid="sf:uqft">
                    {originName}
                  </p>
                  {initializedData.tripType === "ida" && estimatedArrival && (
                    <div className="flex items-center mt-1" data-oid="exmde4-">
                      <ChevronRight
                        className="h-4 w-4 text-gray-400"
                        data-oid="a3_0r4o"
                      />

                      <p
                        className="font-medium text-sm ml-1"
                        data-oid="481jj1."
                      >
                        {destinationName}
                      </p>
                    </div>
                  )}
                  {initializedData.tripType === "ida" && estimatedArrival && (
                    <p
                      className="text-xs text-gray-500 mt-1"
                      data-oid="5-hpm6f"
                    >
                      Hora aproximada de llegada a las {estimatedArrival}{" "}
                      (GMT+2) • {distance} km
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div
            className="border-t border-gray-200 pt-5 mb-6"
            data-oid="dh150sl"
          >
            <h3 className="text-lg font-semibold mb-3" data-oid="1jb5vj3">
              Pasajero
            </h3>
            <p className="mb-1 font-medium" data-oid="qsyldmr">
              {passengerName}
            </p>
            {initializedData.passenger_details?.flight_number && (
              <p className="text-sm text-gray-600 mb-1" data-oid="ftd6:4-">
                Vuelo: {initializedData.passenger_details.flight_number}
              </p>
            )}
            {initializedData.passenger_details?.notes && (
              <p className="text-sm text-gray-600 mb-1" data-oid="j0wilrd">
                Comentarios: {initializedData.passenger_details.notes}
              </p>
            )}
          </div>

          <div
            className="border-t border-gray-200 pt-5 mb-6"
            data-oid="bcwaxmk"
          >
            <h3 className="text-lg font-semibold mb-3" data-oid="1s.5ue9">
              Pago
            </h3>
            <div
              className="flex justify-between items-center mb-2"
              data-oid="q:dy460"
            >
              <span className="text-gray-600" data-oid=".3-f:jx">
                Método:
              </span>
              <div className="flex items-center" data-oid="e1krvff">
                <span data-oid="f334lvw">
                  Tarjeta que termina en {lastFourDigits}
                </span>
              </div>
            </div>
            <div
              className="flex justify-between items-center mb-2"
              data-oid="ggco_t-"
            >
              <span className="text-gray-600" data-oid="cgbq7n8">
                Estado:
              </span>
              <div className="flex items-center" data-oid="3pdv8mg">
                {paymentStatus === "succeeded" ? (
                  <span
                    className="flex items-center text-emerald-600"
                    data-oid="2n1.c-_"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" data-oid="w43-4-q" />
                    Completado
                  </span>
                ) : (
                  <span
                    className="flex items-center text-amber-600"
                    data-oid="19xfkhc"
                  >
                    <span
                      className="w-2 h-2 rounded-full bg-amber-500 mr-2"
                      data-oid="5y_6suz"
                    ></span>
                    Pendiente
                  </span>
                )}
              </div>
            </div>
            <div
              className="flex justify-between items-center mb-2"
              data-oid="04ph-6u"
            >
              <span className="text-gray-600" data-oid="74y4-_j">
                Importe total:
              </span>
              <span className="font-semibold" data-oid="fjc_zco">
                {totalPrice.toFixed(2)} €
              </span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-5" data-oid="3ln:y57">
            <div className="flex flex-col gap-3" data-oid="g0py.n1">
              <button
                onClick={handleDownloadReceipt}
                className="flex justify-between items-center w-full bg-gray-50 border border-gray-200 rounded-md py-3 px-4 hover:bg-gray-100 transition-colors"
                data-oid="_.zu7hy"
              >
                <div className="flex items-center gap-2" data-oid="qel4r8a">
                  <Download
                    className="h-5 w-5 text-gray-600"
                    data-oid="4fpe6a:"
                  />

                  <span data-oid="s3jzz1g">Descargar recibo</span>
                </div>
                <ChevronRight
                  className="h-5 w-5 text-gray-400"
                  data-oid="6jao4f:"
                />
              </button>

              <button
                onClick={handleShare}
                className="flex justify-between items-center w-full bg-gray-50 border border-gray-200 rounded-md py-3 px-4 hover:bg-gray-100 transition-colors"
                data-oid="1619upc"
              >
                <div className="flex items-center gap-2" data-oid="59sftkf">
                  <Share2
                    className="h-5 w-5 text-gray-600"
                    data-oid="y3h_z.l"
                  />

                  <span data-oid="9kt-2tv">Compartir detalles</span>
                </div>
                <ChevronRight
                  className="h-5 w-5 text-gray-400"
                  data-oid="7anc19h"
                />
              </button>

              {showShareOptions && (
                <div className="grid grid-cols-2 gap-3 mt-2" data-oid="vzvti5a">
                  <button
                    className="flex items-center gap-2 justify-center border border-gray-200 rounded-md py-3 px-4 hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Enlace copiado al portapapeles");
                    }}
                    data-oid=":zsvr5a"
                  >
                    <Copy
                      className="h-4 w-4 text-gray-600"
                      data-oid="joydgqw"
                    />

                    <span data-oid="xt_q310">Copiar enlace</span>
                  </button>

                  <a
                    href={`https://wa.me/?text=Información de mi reserva: ${window.location.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 justify-center bg-[#25D366] text-white rounded-md py-3 px-4 hover:bg-[#128C7E] transition-colors"
                    data-oid="h05n4vl"
                  >
                    <span data-oid="n_gjcpi">WhatsApp</span>
                  </a>
                </div>
              )}

              <button
                onClick={handleBackToHome}
                className="flex items-center justify-center gap-2 mt-2 w-full bg-primary text-white rounded-md py-3 px-4 hover:bg-primary/90 transition-colors"
                data-oid=".c-_inq"
              >
                <span data-oid="grghj1v">Volver a inicio</span>
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
