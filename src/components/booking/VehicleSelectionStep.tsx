import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Briefcase, Loader2, AlertCircle, Check } from "lucide-react";
import axiosInstance from "@/config/axios";

// URL de la API

// Tipos
interface Vehicle {
  id: string;
  name: string;
  description: string;
  capacity: number;
  luggage: number;
  price: number;
  image: string;
}

interface BookingData {
  tripType: "ida" | "horas";
  from: {
    place_id?: string;
    description: string;
  };
  to?: {
    place_id?: string;
    description: string;
  };
  duration?: string;
  date: string;
  time: string;
  vehicle?: {
    id: string;
    name: string;
    price: number;
  };
}

interface VehicleSelectionStepProps {
  sessionData: any;
  onComplete: (data: any) => Promise<void>;
}

export default function VehicleSelectionStep({
  sessionData,
  onComplete,
}: VehicleSelectionStepProps) {
  // Verificar que sessionData no sea undefined o null
  if (!sessionData) {
    return (
      <Card className="max-w-3xl mx-auto shadow-sm" data-oid="b16e.vt">
        <CardContent className="p-6 text-center" data-oid="r3p21hv">
          <AlertCircle
            className="h-10 w-10 text-black mx-auto mb-4"
            data-oid="g9tsch4"
          />

          <h3 className="font-semibold text-lg mb-2" data-oid="ho8kupn">
            Error de datos
          </h3>
          <p className="text-gray-600 mb-4" data-oid="sqvi38i">
            No se han podido cargar los datos de la sesión
          </p>
        </CardContent>
      </Card>
    );
  }

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(
    sessionData.vehicle?.id || null,
  );

  //gar las opciones de vehículos al montar el componente
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axiosInstance.get(`/api/booking/vehicle-options`);
        setVehicles(response.data);
      } catch (error) {
        console.error("Error al cargar opciones de vehículos:", error);
        setError("No se pudieron cargar las opciones de vehículos");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  // Manejar la selección de un vehículo
  const handleVehicleSelect = (vehicleId: string) => {
    setSelectedVehicle(vehicleId);
  };

  // Manejar el botón de continuar
  const handleContinue = () => {
    if (!selectedVehicle) return;

    const selectedVehicleData = vehicles.find((v) => v.id === selectedVehicle);
    if (!selectedVehicleData) return;

    // Actualizar los datos de la sesión con el vehículo seleccionado
    const updatedData: BookingData = {
      ...sessionData,
      vehicle: {
        id: selectedVehicleData.id,
        name: selectedVehicleData.name,
        price: selectedVehicleData.price,
      },
    };

    // Llamar a la función de completar con los datos actualizados
    onComplete(updatedData);
  };

  // Mientras se cargan los datos
  if (loading) {
    return (
      <div
        className="flex items-center justify-center min-h-[300px]"
        data-oid="hl-.73j"
      >
        <Loader2
          className="h-8 w-8 animate-spin text-gray-700"
          data-oid="l:rrpf:"
        />

        <span className="ml-2 text-lg" data-oid="0naquqw">
          gando opciones de vehículos...
        </span>
      </div>
    );
  }

  // Si hay un error
  if (error) {
    return (
      <div className="text-center py-8" data-oid="p02o71c">
        <h3 className="text-lg font-medium text-gray-600" data-oid="bz1q.jx">
          Error
        </h3>
        <p className="mt-2" data-oid="t3:hcx1">
          {error}
        </p>
        <button
          className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md"
          onClick={() => window.location.reload()}
          data-oid="evj9hr6"
        >
          Reintentar
        </button>
      </div>
    );
  }

  // Mostrar opciones de vehículos
  return (
    <Card className="max-w-3xl mx-auto shadow-sm" data-oid="_fhu10z">
      <CardContent className="p-0" data-oid="rq9lwba">
        {/* Detalles del viaje */}
        <div
          className="bg-gray-50 p-4 rounded-t-lg border-b"
          data-oid="tenlon-"
        >
          <div className="mb-1" data-oid="v6gjrwb">
            <p className="text-sm font-medium" data-oid="863dlgd">
              sáb, may 10, 2025 a las 10:32 a. m. (CEST)
            </p>
          </div>
          <div className="flex items-center gap-1 mb-1" data-oid="vnjw18x">
            <p className="text-sm text-gray-600" data-oid="e6a:psj">
              {sessionData.from.description}
            </p>
            {sessionData.tripType === "ida" && sessionData.to && (
              <>
                <span className="text-xs" data-oid="pgkfyjn">
                  →
                </span>
                <p className="text-sm text-gray-600" data-oid="lcmlysb">
                  {sessionData.to.description}
                </p>
              </>
            )}
          </div>
          <div className="text-xs text-gray-500" data-oid="b0hi:mi">
            <p data-oid="vkcos:f">
              Hora aproximada de llegada a las 11:07 AM (GMT+2) • 39.8 km
            </p>
          </div>
        </div>

        <div className="p-6" data-oid="x17bx3l">
          <h2 className="text-lg font-semibold mb-6" data-oid="65wtzlz">
            Selecciona tu vehículo
          </h2>

          {/* Lista de vehículos */}
          <div className="space-y-4 mb-6" data-oid="joe5hih">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className={`cursor-pointer transition-all border rounded-md hover:border-gray-400 ${
                  selectedVehicle === vehicle.id
                    ? "border-gray-700 ring-1 ring-gray-700"
                    : "border-gray-200"
                }`}
                onClick={() => handleVehicleSelect(vehicle.id)}
                data-oid="z6uoz3i"
              >
                <div
                  className="p-4 grid grid-cols-1 md:grid-cols-3 items-center"
                  data-oid=".90qbei"
                >
                  {/* Imagen del vehículo */}
                  <div className="flex justify-center" data-oid="ma0p25w">
                    <img
                      src={vehicle.image || "/images/cars/default.png"}
                      alt={vehicle.name}
                      className="h-24 object-contain"
                      data-oid="cxo8.tx"
                    />
                  </div>

                  {/* Detalles del vehículo */}
                  <div className="col-span-1 md:col-span-1" data-oid="-ewboqa">
                    <h3 className="font-bold" data-oid="p2c-obh">
                      {vehicle.name}
                    </h3>
                    <p
                      className="text-sm text-gray-600 mt-1"
                      data-oid="bas3pcw"
                    >
                      {vehicle.description}
                    </p>
                    <div
                      className="flex items-center mt-2 space-x-4"
                      data-oid="8qo_8hf"
                    >
                      <div
                        className="flex items-center text-sm text-gray-600"
                        data-oid=".bkpjyg"
                      >
                        <Users className="h-4 w-4 mr-1" data-oid="5by2ypb" />
                        <span data-oid="mka0fbv">{vehicle.capacity}</span>
                      </div>
                      <div
                        className="flex items-center text-sm text-gray-600"
                        data-oid="k6t0khm"
                      >
                        <Briefcase
                          className="h-4 w-4 mr-1"
                          data-oid="d7uk6ra"
                        />

                        <span data-oid="5d4um0n">{vehicle.luggage}</span>
                      </div>
                    </div>
                  </div>

                  {/* Precio y selección */}
                  <div
                    className="flex flex-col items-end justify-center mt-3 md:mt-0"
                    data-oid="o59et95"
                  >
                    <div className="text-xl font-bold" data-oid="rtg2740">
                      {vehicle.price.toFixed(2)} €
                    </div>

                    {selectedVehicle === vehicle.id && (
                      <div
                        className="mt-2 flex items-center text-sm text-gray-700 font-medium"
                        data-oid="t1vvx2c"
                      >
                        <Check className="h-4 w-4 mr-1" data-oid="tmizuim" />
                        Seleccionado
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Información adicional */}
          <div className="bg-gray-50 p-4 rounded-md mb-6" data-oid="dysuzik">
            <h4 className="font-medium mb-2" data-oid="lkenudp">
              Todas las clases incluyen:
            </h4>
            <ul className="text-sm space-y-1" data-oid="yrl9j7z">
              <li className="flex items-start" data-oid="3mynwmt">
                <Check
                  className="h-4 w-4 text-gray-700 mr-2 mt-0.5"
                  data-oid="2uf1wfq"
                />

                <span data-oid="cp7_b::">
                  Cancelación gratuita hasta 1 hora antes de la recogida
                </span>
              </li>
              <li className="flex items-start" data-oid="3xlsk.q">
                <Check
                  className="h-4 w-4 text-gray-700 mr-2 mt-0.5"
                  data-oid="9dr6-uy"
                />

                <span data-oid="mj12o-g">
                  Gratis 60 minutos de tiempo de espera
                </span>
              </li>
              <li className="flex items-start" data-oid="cf41uaf">
                <Check
                  className="h-4 w-4 text-gray-700 mr-2 mt-0.5"
                  data-oid="5.:55kq"
                />

                <span data-oid="z3d7pcs">Conocer y saludar</span>
              </li>
              <li className="flex items-start" data-oid="5:jnalb">
                <Check
                  className="h-4 w-4 text-gray-700 mr-2 mt-0.5"
                  data-oid="2h3n3u8"
                />

                <span data-oid="_.cq246">Botella de agua de cortesía</span>
              </li>
            </ul>
          </div>

          {/* Botón continuar */}
          <button
            className="w-full py-3 px-4 rounded-md text-white font-semibold relative z-20"
            style={{
              background: "#000000",
            }}
            disabled={!selectedVehicle}
            onClick={handleContinue}
            data-oid="kmf4055"
          >
            {!selectedVehicle ? "Selecciona un vehículo" : "Continuar"}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
