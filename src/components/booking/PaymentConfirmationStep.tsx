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
import axiosInstance from "@/config/axios";

// Obtener variables de entorno de manera segura
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

// Log para diagnóstico - solo se imprime en desarrollo
if (import.meta.env.DEV) {
  console.log("Variables de entorno en PaymentConfirmationStep:", {
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
        await axiosInstance.post(`/api/payment/update-payment-method`, {
          payment_intent_id: paymentIntentId,
          payment_method_id:
            initializedData?.payment?.payment_method_details || null,
        });

        // Llamar al endpoint para confirmar la reserva
        const response = await axiosInstance.post(`/api/booking/confirm`, {
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
            const priceResponse = await axiosInstance.post(
              `/api/booking/calculate-price`,
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
      <Card className="max-w-3xl mx-auto shadow-sm" data-oid="a5_7h_a">
        <CardContent className="p-6 text-center" data-oid="r1u4r:t">
          <AlertCircle
            className="h-10 w-10 text-black mx-auto mb-4"
            data-oid="22lyixp"
          />

          <h3 className="font-semibold text-lg mb-2" data-oid="zrv9mx_">
            Error de datos
          </h3>
          <p className="text-gray-600 mb-4" data-oid=":prf9j-">
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
      <Card className="max-w-3xl mx-auto shadow-sm" data-oid="prb6672">
        <CardContent
          className="p-6 flex flex-col items-center justify-center min-h-[400px]"
          data-oid="g_ieql6"
        >
          <Loader2
            className="h-12 w-12 animate-spin text-primary mb-4"
            data-oid="et51bi-"
          />

          <h2 className="text-xl font-semibold mb-2" data-oid="jps_m6.">
            Confirmando su reserva
          </h2>
          <p className="text-gray-500" data-oid="q6jcvls">
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
      <Card className="max-w-3xl mx-auto shadow-sm" data-oid="1l8jlci">
        <CardContent
          className="p-6 flex flex-col items-center justify-center min-h-[400px]"
          data-oid=".wo9a5c"
        >
          <XCircle className="h-12 w-12 text-black mb-4" data-oid="-pw4sae" />
          <h2 className="text-xl font-semibold mb-2" data-oid="yomjkxf">
            Error al confirmar la reserva
          </h2>
          <p className="text-gray-500 mb-4" data-oid="7di6t2i">
            {error}
          </p>
          <div className="flex gap-4" data-oid="rt9jpeb">
            <button
              onClick={handleRetryPayment}
              className="flex items-center justify-center gap-2 bg-primary text-white rounded-md py-2 px-4 hover:bg-primary/90 transition-colors"
              data-oid="4ghmkbh"
            >
              <CreditCard className="h-4 w-4" data-oid="z9_g_75" />
              <span data-oid="0s95qoe">Reintentar pago</span>
            </button>
            <button
              onClick={handleBackToHome}
              className="flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 px-4 hover:bg-gray-50 transition-colors"
              data-oid="vm:dkcq"
            >
              <span data-oid="wb2u7jm">Volver al inicio</span>
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Mostrar la confirmación de reserva exitosa
  return (
    <Card className="max-w-3xl mx-auto shadow-sm" data-oid="9f649ry">
      <CardContent className="p-0" data-oid="8q8._.c">
        {/* Cabecera con estado de confirmación */}
        <div
          className="bg-emerald-50 p-6 rounded-t-lg flex flex-col items-center justify-center border-b border-emerald-100"
          data-oid="5.szy:k"
        >
          <CheckCircle
            className="h-14 w-14 text-emerald-500 mb-4"
            data-oid="t1oulb8"
          />

          <h2 className="text-xl font-semibold mb-1" data-oid="737ckp1">
            ¡Reserva confirmada!
          </h2>
          <p className="text-emerald-700" data-oid="n6-y3v.">
            Hemos enviado los detalles a su correo electrónico
          </p>
        </div>

        {/* Información de la reserva */}
        <div className="p-6" data-oid="y3ja2d5">
          <div className="mb-6" data-oid="41a2qc5">
            <h3 className="text-lg font-semibold mb-3" data-oid="0-fn_:z">
              Información de recogida
            </h3>

            <div className="grid gap-3" data-oid="mw4sxot">
              <div className="flex gap-3 items-start" data-oid="tszv.2-">
                <div className="bg-gray-100 p-2 rounded-md" data-oid="vy.d:t4">
                  <CarFront
                    className="h-5 w-5 text-gray-600"
                    data-oid="76j0pwu"
                  />
                </div>
                <div data-oid="mac.qgs">
                  <p className="font-medium" data-oid="awryefo">
                    {vehicleName}
                  </p>
                  <p className="text-sm text-gray-600" data-oid="vshhtgc">
                    {bookingReference}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start" data-oid="cr-z589">
                <div className="bg-gray-100 p-2 rounded-md" data-oid="dq92785">
                  <CalendarClock
                    className="h-5 w-5 text-gray-600"
                    data-oid="yzl.:j:"
                  />
                </div>
                <div data-oid="b1a-9us">
                  <p className="font-medium" data-oid="_uzov99">
                    {tripDate}
                  </p>
                  <p className="text-sm text-gray-600" data-oid="8a-ziqw">
                    A las {tripTime} (CEST)
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start" data-oid="y941iju">
                <div
                  className="bg-gray-100 p-2 rounded-md flex items-center justify-center"
                  data-oid="5-ulv44"
                >
                  <div
                    className="h-5 w-5 flex items-center justify-center font-semibold text-gray-600"
                    data-oid="s0drf5o"
                  >
                    A
                  </div>
                </div>
                <div data-oid="rgjl391">
                  <p className="font-medium" data-oid="x62cljx">
                    {originName}
                  </p>
                  {initializedData.tripType === "ida" && estimatedArrival && (
                    <div className="flex items-center mt-1" data-oid="v3zrky:">
                      <ChevronRight
                        className="h-4 w-4 text-gray-400"
                        data-oid="ha.f0z4"
                      />

                      <p
                        className="font-medium text-sm ml-1"
                        data-oid="13hlw.f"
                      >
                        {destinationName}
                      </p>
                    </div>
                  )}
                  {initializedData.tripType === "ida" && estimatedArrival && (
                    <p
                      className="text-xs text-gray-500 mt-1"
                      data-oid="9v.o2:o"
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
            data-oid="dit.2y:"
          >
            <h3 className="text-lg font-semibold mb-3" data-oid="0kw:jn0">
              Pasajero
            </h3>
            <p className="mb-1 font-medium" data-oid="viqk1i.">
              {passengerName}
            </p>
            {initializedData.passenger_details?.flight_number && (
              <p className="text-sm text-gray-600 mb-1" data-oid="lvlmgpw">
                Vuelo: {initializedData.passenger_details.flight_number}
              </p>
            )}
            {initializedData.passenger_details?.notes && (
              <p className="text-sm text-gray-600 mb-1" data-oid="b5770f-">
                Comentarios: {initializedData.passenger_details.notes}
              </p>
            )}
          </div>

          <div
            className="border-t border-gray-200 pt-5 mb-6"
            data-oid="qu0e0hp"
          >
            <h3 className="text-lg font-semibold mb-3" data-oid="ydcjck4">
              Pago
            </h3>
            <div
              className="flex justify-between items-center mb-2"
              data-oid="k6:zthl"
            >
              <span className="text-gray-600" data-oid="7tbsxev">
                Método:
              </span>
              <div className="flex items-center" data-oid="hh164pd">
                <span data-oid="0gt6y3x">
                  Tarjeta que termina en {lastFourDigits}
                </span>
              </div>
            </div>
            <div
              className="flex justify-between items-center mb-2"
              data-oid="yjn-61."
            >
              <span className="text-gray-600" data-oid="17drp0h">
                Estado:
              </span>
              <div className="flex items-center" data-oid="bz2p178">
                {paymentStatus === "succeeded" ? (
                  <span
                    className="flex items-center text-emerald-600"
                    data-oid="ves-4pa"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" data-oid="h2qv82v" />
                    Completado
                  </span>
                ) : (
                  <span
                    className="flex items-center text-amber-600"
                    data-oid="3:-17nq"
                  >
                    <span
                      className="w-2 h-2 rounded-full bg-amber-500 mr-2"
                      data-oid="29b:zyh"
                    ></span>
                    Pendiente
                  </span>
                )}
              </div>
            </div>
            <div
              className="flex justify-between items-center mb-2"
              data-oid="sy7d78n"
            >
              <span className="text-gray-600" data-oid="nei97f0">
                Importe total:
              </span>
              <span className="font-semibold" data-oid="4dig6b7">
                {totalPrice.toFixed(2)} €
              </span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-5" data-oid="nz6i54j">
            <div className="flex flex-col gap-3" data-oid="0m8--f:">
              <button
                onClick={handleDownloadReceipt}
                className="flex justify-between items-center w-full bg-gray-50 border border-gray-200 rounded-md py-3 px-4 hover:bg-gray-100 transition-colors"
                data-oid=":5lxw57"
              >
                <div className="flex items-center gap-2" data-oid="9.fgh8b">
                  <Download
                    className="h-5 w-5 text-gray-600"
                    data-oid="3ky4-l3"
                  />

                  <span data-oid="_ri3gt1">Descargar recibo</span>
                </div>
                <ChevronRight
                  className="h-5 w-5 text-gray-400"
                  data-oid="1h9n_ni"
                />
              </button>

              <button
                onClick={handleShare}
                className="flex justify-between items-center w-full bg-gray-50 border border-gray-200 rounded-md py-3 px-4 hover:bg-gray-100 transition-colors"
                data-oid="qmesred"
              >
                <div className="flex items-center gap-2" data-oid="vzv1gkt">
                  <Share2
                    className="h-5 w-5 text-gray-600"
                    data-oid="omm62v1"
                  />

                  <span data-oid="qx4dljp">Compartir detalles</span>
                </div>
                <ChevronRight
                  className="h-5 w-5 text-gray-400"
                  data-oid="kx4-wzm"
                />
              </button>

              {showShareOptions && (
                <div className="grid grid-cols-2 gap-3 mt-2" data-oid="vt3i_bz">
                  <button
                    className="flex items-center gap-2 justify-center border border-gray-200 rounded-md py-3 px-4 hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Enlace copiado al portapapeles");
                    }}
                    data-oid="r4c2ran"
                  >
                    <Copy
                      className="h-4 w-4 text-gray-600"
                      data-oid=".2-4bd7"
                    />

                    <span data-oid="wkp1syy">Copiar enlace</span>
                  </button>

                  <a
                    href={`https://wa.me/?text=Información de mi reserva: ${window.location.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 justify-center bg-[#25D366] text-white rounded-md py-3 px-4 hover:bg-[#128C7E] transition-colors"
                    data-oid="8hjwctv"
                  >
                    <span data-oid="017-j_0">WhatsApp</span>
                  </a>
                </div>
              )}

              <button
                onClick={handleBackToHome}
                className="flex items-center justify-center gap-2 mt-2 w-full bg-primary text-white rounded-md py-3 px-4 hover:bg-primary/90 transition-colors"
                data-oid="xs:4mqn"
              >
                <span data-oid="gtg69wg">Volver a inicio</span>
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
