import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, AlertCircle } from "lucide-react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

interface PassengerDetailsStepProps {
  sessionData: any;
  onComplete: (data: any) => Promise<void>;
}

export default function PassengerDetailsStep({
  sessionData,
  onComplete,
}: PassengerDetailsStepProps) {
  const [loading, setLoading] = useState(false);
  const [initializedData, setInitializedData] = useState<any>(null);
  const [bookingFor, setBookingFor] = useState<"self" | "other">("self");
  const [flightNumber, setFlightNumber] = useState("");
  const [pickupSign, setPickupSign] = useState("");
  const [notes, setNotes] = useState("");
  const [reference, setReference] = useState("");
  const [_originDetails, setOriginDetails] = useState<any>(null);
  const [_destinationDetails, setDestinationDetails] = useState<any>(null);
  const [estimatedArrival, setEstimatedArrival] = useState("");
  const [distance, setDistance] = useState("");
  const [_fetchingDetails, setFetchingDetails] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Inicializar datos
  useEffect(() => {
    if (sessionData) {
      console.log("PassengerDetailsStep recibió sessionData:", sessionData);
      setInitializedData(sessionData);

      // Inicializar los campos con datos existentes si están disponibles
      if (sessionData.passenger_details) {
        setBookingFor(sessionData.passenger_details.booking_for || "self");
        setFlightNumber(sessionData.passenger_details.flight_number || "");
        setPickupSign(sessionData.passenger_details.pickup_sign || "");
        setNotes(sessionData.passenger_details.notes || "");
        setReference(sessionData.passenger_details.reference || "");
      }
    } else {
      console.error("PassengerDetailsStep: sessionData es undefined o null");
      setError("No se han podido cargar los datos de la sesión");
    }
  }, [sessionData]);

  // Cargar detalles de origen y destino
  useEffect(() => {
    if (!initializedData || !initializedData.from?.place_id) return;

    const fetchPlaceDetails = async () => {
      setFetchingDetails(true);

      try {
        console.log(
          "Obteniendo detalles de lugares con place_id:",
          initializedData.from.place_id,
        );

        // Obtener detalles del origen
        if (initializedData.from.place_id) {
          const originResponse = await axios.get(`${API_URL}/places/details`, {
            params: { place_id: initializedData.from.place_id },
          });
          console.log("Detalles del origen recibidos:", originResponse.data);
          setOriginDetails(originResponse.data);
        }

        // Obtener detalles del destino si es un viaje de ida
        if (
          initializedData.tripType === "ida" &&
          initializedData.to?.place_id
        ) {
          const destResponse = await axios.get(`${API_URL}/places/details`, {
            params: { place_id: initializedData.to.place_id },
          });
          console.log("Detalles del destino recibidos:", destResponse.data);
          setDestinationDetails(destResponse.data);

          // Calcular distancia y tiempo estimado con la matriz de distancia
          try {
            console.log(
              "Calculando precio y distancia con vehicle_id:",
              initializedData.vehicle?.id,
            );

            // Verificar que tenemos los datos requeridos
            if (!initializedData.vehicle?.id) {
              console.warn(
                "No hay ID de vehículo para calcular precio. Usando valores por defecto.",
              );
              setDistance("35.2");
              calculateDefaultArrivalTime();
              return;
            }

            // Usar la API de precios que incluye cálculos de distancia
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

            console.log(
              "Respuesta de cálculo de precio recibida:",
              priceResponse.data,
            );

            if (priceResponse.data.price_breakdown) {
              const breakdown = priceResponse.data.price_breakdown;

              // Obtener distancia estimada
              if (breakdown.estimated_distance_km) {
                setDistance(breakdown.estimated_distance_km.toString());
              }

              // Calcular tiempo estimado de llegada
              if (breakdown.estimated_duration_hours && initializedData.time) {
                calculateArrivalTime(
                  breakdown.estimated_duration_hours,
                  initializedData.time,
                );
              } else {
                calculateDefaultArrivalTime();
              }
            } else {
              calculateDefaultArrivalTime();
            }
          } catch (error) {
            console.error("Error al calcular distancia:", error);
            setDistance("35.2");
            calculateDefaultArrivalTime();
          }
        }
      } catch (error) {
        console.error("Error al obtener detalles de lugares:", error);
      } finally {
        setFetchingDetails(false);
      }
    };

    fetchPlaceDetails();
  }, [initializedData]);

  // Función para calcular hora de llegada estimada
  const calculateArrivalTime = (durationHours: number, timeStr: string) => {
    const durationMinutes = Math.round(durationHours * 60);

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
    const arrivalTime = new Date(now.getTime() + durationMinutes * 60000);

    setEstimatedArrival(
      arrivalTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    );
  };

  // Función para calcular hora de llegada por defecto (35 minutos)
  const calculateDefaultArrivalTime = () => {
    const timeStr = initializedData?.time || "12:00";
    let hours = 0;
    let minutes = 0;

    // Parsear la hora (formato esperado "HH : MM")
    const timeParts = timeStr.split(":");
    if (timeParts.length === 2) {
      hours = parseInt(timeParts[0].trim());
      minutes = parseInt(timeParts[1].trim());
    }

    // Crear fecha base y añadir 35 minutos
    const now = new Date();
    now.setHours(hours);
    now.setMinutes(minutes);
    const arrivalTime = new Date(now.getTime() + 35 * 60000);

    setEstimatedArrival(
      arrivalTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!initializedData) {
        throw new Error("No hay datos de sesión disponibles para continuar");
      }

      console.log("Enviando detalles de pasajero");

      // Crear objeto con los datos del formulario
      const passengerDetails = {
        ...initializedData,
        passenger_details: {
          booking_for: bookingFor,
          flight_number: flightNumber,
          pickup_sign: pickupSign,
          notes,
          reference,
        },
      };

      // Llamar a la función onComplete con los datos del formulario
      await onComplete(passengerDetails);
    } catch (error: any) {
      console.error("Error al guardar detalles del pasajero:", error);
      setError(
        error.message ||
          "Error al guardar los detalles del pasajero. Por favor, inténtelo de nuevo.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Mostrar mensaje de carga mientras se inicializa
  if (!initializedData && !error) {
    return (
      <Card className="max-w-3xl mx-auto shadow-sm" data-oid="kw0oxv2">
        <CardContent
          className="p-6 flex justify-center items-center"
          data-oid="jfbm22j"
        >
          <Loader2
            className="h-10 w-10 animate-spin text-primary mr-4"
            data-oid=":dvt0lz"
          />

          <p className="text-gray-600" data-oid=":2n8iuh">
            Cargando datos de la sesión...
          </p>
        </CardContent>
      </Card>
    );
  }

  // Mostrar mensaje de error si hay problemas con los datos
  if (error) {
    return (
      <Card className="max-w-3xl mx-auto shadow-sm" data-oid="yyln0fs">
        <CardContent className="p-6 text-center" data-oid="mxyjusa">
          <AlertCircle
            className="h-10 w-10 text-black mx-auto mb-4"
            data-oid="ckp9h4f"
          />

          <h3 className="font-semibold text-lg mb-2" data-oid="f80xvjw">
            Error de datos
          </h3>
          <p className="text-gray-600 mb-4" data-oid="urh-n8w">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            data-oid=".dobg1."
          >
            Intentar de nuevo
          </button>
        </CardContent>
      </Card>
    );
  }

  // Formatear la fecha para mostrarla
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    // La fecha ya viene con formato adecuado del paso anterior
    return dateStr;
  };

  return (
    <Card className="max-w-3xl mx-auto shadow-sm" data-oid="w22yzte">
      <CardContent className="p-0" data-oid="i.h7:fv">
        {/* Resumen de la reserva */}
        <div
          className="bg-gray-50 p-4 rounded-t-lg border-b"
          data-oid="o:kw4mv"
        >
          <div className="mb-1" data-oid="5pj91ru">
            <p className="text-sm font-medium" data-oid="xswx1m-">
              {formatDate(initializedData?.date || "")} a las{" "}
              {initializedData?.time || ""} (CEST)
            </p>
          </div>
          <div className="flex items-center gap-1 mb-1" data-oid="m7jtyrg">
            <p className="text-sm text-gray-600" data-oid="jk6xc8d">
              {initializedData?.from?.description || "Punto de recogida"}
            </p>
            {initializedData.tripType === "ida" && (
              <>
                <span className="text-xs" data-oid="0:.z3-n">
                  →
                </span>
                <p className="text-sm text-gray-600" data-oid="juu.m52">
                  {initializedData?.to?.description || "Destino"}
                </p>
              </>
            )}
            {initializedData.tripType === "horas" && (
              <p className="text-sm text-gray-600 ml-2" data-oid="ras3rh-">
                ({initializedData?.duration || "2 horas"})
              </p>
            )}
          </div>
          {initializedData.tripType === "ida" && estimatedArrival && (
            <div className="text-xs text-gray-500" data-oid="g3v4b1o">
              <p data-oid="-m06l6y">
                Hora aproximada de llegada a las {estimatedArrival} (GMT+2) •{" "}
                {distance} km
              </p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-6" data-oid="4:ch_53">
          {/* Seleccione para quién realiza la reserva */}
          <div className="mb-6" data-oid="1xgpy9v">
            <h2 className="text-lg font-semibold mb-4" data-oid="u:u31ep">
              Seleccione para quién realiza la reserva
            </h2>
            <div className="border rounded-md" data-oid="gabhy:v">
              <div className="p-4 border-b" data-oid="e_2bm-z">
                <div className="flex items-center space-x-2" data-oid="ow-2e8i">
                  <input
                    type="radio"
                    id="reserve-self"
                    name="bookingFor"
                    value="self"
                    checked={bookingFor === "self"}
                    onChange={() => setBookingFor("self")}
                    className="h-4 w-4 text-gray-600 border-gray-300 focus:ring-0 focus:ring-offset-0"
                    data-oid="pz4643g"
                  />

                  <label
                    htmlFor="reserve-self"
                    className="text-sm font-medium cursor-pointer"
                    data-oid="miciii4"
                  >
                    Reservar para mí
                  </label>
                </div>
              </div>
              <div className="p-4" data-oid="v65zivp">
                <div className="flex items-center space-x-2" data-oid="s.7-c.p">
                  <input
                    type="radio"
                    id="reserve-other"
                    name="bookingFor"
                    value="other"
                    checked={bookingFor === "other"}
                    onChange={() => setBookingFor("other")}
                    className="h-4 w-4 text-gray-600 border-gray-300 focus:ring-0 focus:ring-offset-0"
                    data-oid="e4hufdx"
                  />

                  <label
                    htmlFor="reserve-other"
                    className="text-sm font-medium cursor-pointer"
                    data-oid="s16wxa-"
                  >
                    Reservar para otra persona
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Detalles del viaje */}
          <div className="mb-6" data-oid="lwjip2g">
            <h2 className="text-lg font-semibold mb-4" data-oid="cwl2zk.">
              Detalles del viaje
            </h2>

            {/* Vuelo (opcional) */}
            <div className="mb-4" data-oid="cek.rez">
              <label
                htmlFor="flight-number"
                className="block text-sm font-medium mb-1"
                data-oid="9wa.gle"
              >
                Número de vuelo (opcional)
              </label>
              <Input
                id="flight-number"
                placeholder="Ej: IB3456"
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
                className="w-full"
                data-oid="w0dd8jc"
              />

              <p className="text-xs text-gray-500 mt-1" data-oid="cta.4wu">
                Para vuelos, le enviaremos información actualizada si su vuelo
                se retrasa.
              </p>
            </div>

            {/* Cartel de recogida */}
            <div className="mb-4" data-oid="nbk2ic6">
              <label
                htmlFor="pickup-sign"
                className="block text-sm font-medium mb-1"
                data-oid="cjeqo1n"
              >
                Cartel de recogida{" "}
                {bookingFor === "other" && (
                  <span className="text-black" data-oid="ra.w77b">
                    *
                  </span>
                )}
              </label>
              <Input
                id="pickup-sign"
                placeholder="Ingrese el nombre que aparecerá en el cartel"
                value={pickupSign}
                onChange={(e) => setPickupSign(e.target.value)}
                className="w-full"
                required={bookingFor === "other"}
                data-oid="l0jvf4n"
              />

              <p className="text-xs text-gray-500 mt-1" data-oid="sjs.zia">
                El conductor llevará un cartel con este nombre para
                identificarle.
              </p>
            </div>

            {/* Notas adicionales */}
            <div className="mb-4" data-oid="53hkhfc">
              <label
                htmlFor="notes"
                className="block text-sm font-medium mb-1"
                data-oid="8afpg08"
              >
                Notas adicionales (opcional)
              </label>
              <Textarea
                id="notes"
                placeholder="Instrucciones especiales para el conductor..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full min-h-[100px]"
                data-oid="ul_5f5."
              />
            </div>

            {/* Referencia (opcional) */}
            <div data-oid="gdm7s9o">
              <label
                htmlFor="reference"
                className="block text-sm font-medium mb-1"
                data-oid="83_chkg"
              >
                Referencia (opcional)
              </label>
              <Input
                id="reference"
                placeholder="Referencia para sus registros"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className="w-full"
                data-oid="_18qqfp"
              />

              <p className="text-xs text-gray-500 mt-1" data-oid="e6.0r3x">
                Esta referencia se incluirá en su recibo para facilitar el
                seguimiento.
              </p>
            </div>
          </div>

          {/* Botón continuar */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-md text-white font-semibold relative z-20 disabled:opacity-70"
            style={{
              background: "#000000",
            }}
            disabled={loading}
            data-oid="ofueodp"
          >
            {loading ? (
              <div
                className="flex items-center justify-center"
                data-oid="-dhv_mf"
              >
                <Loader2
                  className="h-5 w-5 animate-spin mr-2"
                  data-oid="0cw.pw2"
                />

                <span data-oid="jird82f">Procesando...</span>
              </div>
            ) : (
              "Continuar al pago"
            )}
          </button>

          {error && (
            <div
              className="mt-4 p-3 bg-gray-100 rounded-md border border-gray-200 text-gray-700 text-sm"
              data-oid="lt-2qp3"
            >
              <div className="flex" data-oid="fb-:o-2">
                <AlertCircle
                  className="h-5 w-5 mr-2 flex-shrink-0"
                  data-oid="x.46b-0"
                />

                <span data-oid="2scx6j2">{error}</span>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
