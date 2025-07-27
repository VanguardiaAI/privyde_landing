import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Briefcase, Loader2, AlertCircle, Check } from "lucide-react";
import axios from "axios";

// URL de la API
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

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
      <Card className="max-w-3xl mx-auto shadow-sm" data-oid="cpzowrl">
        <CardContent className="p-6 text-center" data-oid="26.ndub">
          <AlertCircle
            className="h-10 w-10 text-black mx-auto mb-4"
            data-oid="l1mnrzb"
          />

          <h3 className="font-semibold text-lg mb-2" data-oid="q6lr96b">
            Error de datos
          </h3>
          <p className="text-gray-600 mb-4" data-oid="so44l77">
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
        const response = await axios.get(`${API_URL}/booking/vehicle-options`);
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
        data-oid="x.j._5d"
      >
        <Loader2
          className="h-8 w-8 animate-spin text-gray-700"
          data-oid="tqvtymb"
        />

        <span className="ml-2 text-lg" data-oid="4cmoyue">
          gando opciones de vehículos...
        </span>
      </div>
    );
  }

  // Si hay un error
  if (error) {
    return (
      <div className="text-center py-8" data-oid="l.l20ze">
        <h3 className="text-lg font-medium text-gray-600" data-oid="02980:g">
          Error
        </h3>
        <p className="mt-2" data-oid="pk8ske3">
          {error}
        </p>
        <button
          className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md"
          onClick={() => window.location.reload()}
          data-oid="bd5w:p5"
        >
          Reintentar
        </button>
      </div>
    );
  }

  // Mostrar opciones de vehículos
  return (
    <Card className="max-w-3xl mx-auto shadow-sm" data-oid="qimrx_4">
      <CardContent className="p-0" data-oid="gq7p56d">
        {/* Detalles del viaje */}
        <div
          className="bg-gray-50 p-4 rounded-t-lg border-b"
          data-oid="a-4uwzv"
        >
          <div className="mb-1" data-oid="lw6pi.k">
            <p className="text-sm font-medium" data-oid=".3.g2c_">
              sáb, may 10, 2025 a las 10:32 a. m. (CEST)
            </p>
          </div>
          <div className="flex items-center gap-1 mb-1" data-oid="0k9wwfm">
            <p className="text-sm text-gray-600" data-oid=":7yzygl">
              {sessionData.from.description}
            </p>
            {sessionData.tripType === "ida" && sessionData.to && (
              <>
                <span className="text-xs" data-oid="jt2fz.7">
                  →
                </span>
                <p className="text-sm text-gray-600" data-oid="tz.gnn9">
                  {sessionData.to.description}
                </p>
              </>
            )}
          </div>
          <div className="text-xs text-gray-500" data-oid="a7bob1p">
            <p data-oid="d_2v6:t">
              Hora aproximada de llegada a las 11:07 AM (GMT+2) • 39.8 km
            </p>
          </div>
        </div>

        <div className="p-6" data-oid=":713ah6">
          <h2 className="text-lg font-semibold mb-6" data-oid="yty7bbk">
            Selecciona tu vehículo
          </h2>

          {/* Lista de vehículos */}
          <div className="space-y-4 mb-6" data-oid="ujemj92">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className={`cursor-pointer transition-all border rounded-md hover:border-gray-400 ${
                  selectedVehicle === vehicle.id
                    ? "border-gray-700 ring-1 ring-gray-700"
                    : "border-gray-200"
                }`}
                onClick={() => handleVehicleSelect(vehicle.id)}
                data-oid="z_zsa9m"
              >
                <div
                  className="p-4 grid grid-cols-1 md:grid-cols-3 items-center"
                  data-oid="xb71sir"
                >
                  {/* Imagen del vehículo */}
                  <div className="flex justify-center" data-oid="_5:oi0n">
                    <img
                      src={vehicle.image || "/images/cars/default.png"}
                      alt={vehicle.name}
                      className="h-24 object-contain"
                      data-oid="14w1diz"
                    />
                  </div>

                  {/* Detalles del vehículo */}
                  <div className="col-span-1 md:col-span-1" data-oid="65qr05f">
                    <h3 className="font-bold" data-oid="m-335lj">
                      {vehicle.name}
                    </h3>
                    <p
                      className="text-sm text-gray-600 mt-1"
                      data-oid="s7:aqh6"
                    >
                      {vehicle.description}
                    </p>
                    <div
                      className="flex items-center mt-2 space-x-4"
                      data-oid="y68zv0o"
                    >
                      <div
                        className="flex items-center text-sm text-gray-600"
                        data-oid="j_zkw4_"
                      >
                        <Users className="h-4 w-4 mr-1" data-oid="ny62rul" />
                        <span data-oid="h4hhu0l">{vehicle.capacity}</span>
                      </div>
                      <div
                        className="flex items-center text-sm text-gray-600"
                        data-oid="9x4xat2"
                      >
                        <Briefcase
                          className="h-4 w-4 mr-1"
                          data-oid="hqo7v3z"
                        />

                        <span data-oid="noa7mmm">{vehicle.luggage}</span>
                      </div>
                    </div>
                  </div>

                  {/* Precio y selección */}
                  <div
                    className="flex flex-col items-end justify-center mt-3 md:mt-0"
                    data-oid="xr50u:z"
                  >
                    <div className="text-xl font-bold" data-oid="fbh0r-d">
                      {vehicle.price.toFixed(2)} €
                    </div>

                    {selectedVehicle === vehicle.id && (
                      <div
                        className="mt-2 flex items-center text-sm text-gray-700 font-medium"
                        data-oid="m1y_9d-"
                      >
                        <Check className="h-4 w-4 mr-1" data-oid="c5zhp6r" />
                        Seleccionado
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Información adicional */}
          <div className="bg-gray-50 p-4 rounded-md mb-6" data-oid="d3cag4s">
            <h4 className="font-medium mb-2" data-oid="h:-8e96">
              Todas las clases incluyen:
            </h4>
            <ul className="text-sm space-y-1" data-oid="am7vvy5">
              <li className="flex items-start" data-oid="82.-l9_">
                <Check
                  className="h-4 w-4 text-gray-700 mr-2 mt-0.5"
                  data-oid="5:xwsge"
                />

                <span data-oid="u8g456f">
                  Cancelación gratuita hasta 1 hora antes de la recogida
                </span>
              </li>
              <li className="flex items-start" data-oid="5aecj0z">
                <Check
                  className="h-4 w-4 text-gray-700 mr-2 mt-0.5"
                  data-oid="8hsn3q9"
                />

                <span data-oid="maoc8ci">
                  Gratis 60 minutos de tiempo de espera
                </span>
              </li>
              <li className="flex items-start" data-oid="4t3_hvm">
                <Check
                  className="h-4 w-4 text-gray-700 mr-2 mt-0.5"
                  data-oid="mid8:g2"
                />

                <span data-oid="qda0h00">Conocer y saludar</span>
              </li>
              <li className="flex items-start" data-oid="7h9f:9p">
                <Check
                  className="h-4 w-4 text-gray-700 mr-2 mt-0.5"
                  data-oid="ao5h.ia"
                />

                <span data-oid="radhlue">Botella de agua de cortesía</span>
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
            data-oid="ag74a4o"
          >
            {!selectedVehicle ? "Selecciona un vehículo" : "Continuar"}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
