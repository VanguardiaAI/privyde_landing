import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  X,
  Clock,
  Calendar,
  User,
  MapPin,
  AlertCircle,
  CheckCircle,
  Plus,
} from "lucide-react";

interface AddExtraScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: any;
  originalPickupDate: string;
  originalPickupTime?: string;
  pickupLocation: string;
  dropoffLocation?: string;
  clientId?: string;
  onExtraScheduleCreated?: (scheduleData: any) => void;
}

interface ConflictCheck {
  has_conflict: boolean;
  reason: string;
}

const AddExtraScheduleModal: React.FC<AddExtraScheduleModalProps> = ({
  isOpen,
  onClose,
  vehicle,
  originalPickupDate,
  originalPickupTime = "14:00",
  pickupLocation,
  dropoffLocation,
  clientId,
  onExtraScheduleCreated,
}) => {
  const [scheduleDate, setScheduleDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [conflictCheck, setConflictCheck] = useState<ConflictCheck | null>(
    null,
  );
  const [isCheckingConflicts, setIsCheckingConflicts] = useState(false);

  useEffect(() => {
    if (isOpen && vehicle) {
      initializeDefaultValues();
    }
  }, [isOpen, vehicle, originalPickupDate, originalPickupTime]);

  const initializeDefaultValues = () => {
    // Establecer fecha por defecto (la fecha original solicitada)
    const dateOnly = originalPickupDate.split("T")[0];
    setScheduleDate(dateOnly);

    // Establecer horario por defecto (el horario original solicitado)
    const timeOnly = originalPickupTime || "14:00";
    setStartTime(timeOnly);

    // Calcular hora de fin (agregar 2 horas por defecto)
    const startDateTime = new Date(`${dateOnly}T${timeOnly}`);
    const endDateTime = new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000); // +2 horas
    const endTimeString = endDateTime.toTimeString().slice(0, 5);
    setEndTime(endTimeString);

    // Mensaje por defecto
    const driverName =
      vehicle?.vehicle_data?.driver?.name ||
      vehicle?.driver_name ||
      "el conductor";
    setReason(
      `${driverName} acepta trabajar en horario especial para cliente prioritario`,
    );

    setNotes(
      `Horario extra creado para atender solicitud original de cliente en ${timeOnly}`,
    );
  };

  const handleTimeChange = (field: "start" | "end", value: string) => {
    if (field === "start") {
      setStartTime(value);
      // Auto-calcular hora de fin (2 horas después)
      if (value) {
        const startDateTime = new Date(`${scheduleDate}T${value}`);
        const endDateTime = new Date(
          startDateTime.getTime() + 2 * 60 * 60 * 1000,
        );
        const endTimeString = endDateTime.toTimeString().slice(0, 5);
        setEndTime(endTimeString);
      }
    } else {
      setEndTime(value);
    }

    // Limpiar verificación anterior
    setConflictCheck(null);
  };

  const checkForConflicts = async () => {
    if (!scheduleDate || !startTime || !endTime || !vehicle?.driver_id) {
      return;
    }

    setIsCheckingConflicts(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/extra-schedule/check-conflicts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            driver_id: vehicle.driver_id,
            date: scheduleDate,
            start_time: startTime,
            end_time: endTime,
          }),
        },
      );

      if (response.ok) {
        const result = await response.json();
        setConflictCheck(result);
      } else {
        console.error("Error al verificar conflictos");
      }
    } catch (error) {
      console.error("Error al verificar conflictos:", error);
    } finally {
      setIsCheckingConflicts(false);
    }
  };

  useEffect(() => {
    // Auto-verificar conflictos cuando cambian los horarios
    const timer = setTimeout(() => {
      if (scheduleDate && startTime && endTime) {
        checkForConflicts();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [scheduleDate, startTime, endTime]);

  const handleSubmitExtraSchedule = async () => {
    if (!vehicle || !scheduleDate || !startTime || !endTime) {
      alert("Por favor completa todos los campos requeridos");
      return;
    }

    if (conflictCheck?.has_conflict) {
      alert(`No se puede crear el horario: ${conflictCheck.reason}`);
      return;
    }

    setIsSubmitting(true);
    try {
      const extraScheduleData = {
        driver_id: vehicle.driver_id,
        client_id: clientId,
        vehicle_id: vehicle.id || vehicle.vehicle_id,
        admin_id: "admin-user-id", // Este debería venir del contexto de usuario
        date: scheduleDate,
        start_time: startTime,
        end_time: endTime,
        reason: reason,
        pickup_location: pickupLocation,
        dropoff_location: dropoffLocation || "",
        notes: notes,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/extra-schedule/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(extraScheduleData),
        },
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Horario extra creado:", result);

        // Llamar al callback con la información del vehículo y el horario creado
        onExtraScheduleCreated?.({
          scheduleData: extraScheduleData,
          vehicle: vehicle,
          result: result,
        });

        // Mostrar confirmación más detallada
        const driverName =
          vehicle.vehicle_data?.driver?.name ||
          vehicle.driver_name ||
          "el conductor";
        const vehicleName =
          vehicle.vehicle_data?.model || vehicle.model || "el vehículo";
        alert(
          `¡Éxito! ${driverName} ha aceptado trabajar en horario extra.\n\n✅ ${vehicleName} ahora está disponible para esta reserva.\n🚗 El vehículo se ha seleccionado automáticamente.`,
        );
        onClose();
      } else {
        const errorData = await response.json();
        alert(
          `Error al crear horario extra: ${errorData.error || "Error desconocido"}`,
        );
      }
    } catch (error) {
      console.error("Error al crear horario extra:", error);
      alert("Error al conectar con el servidor");
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateDuration = () => {
    if (!startTime || !endTime) return 0;

    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    const diffMs = end.getTime() - start.getTime();
    return Math.round(diffMs / (1000 * 60)); // minutos
  };

  // No renderizar si no está abierto o no hay vehículo
  if (!isOpen || !vehicle) return null;

  const duration = calculateDuration();

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      data-oid="f-63k_t"
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        data-oid="8816.w-"
      >
        {/* Header */}
        <div
          className="flex justify-between items-center p-6 border-b border-gray-200 bg-green-50"
          data-oid=".057v.v"
        >
          <div className="flex items-center" data-oid="t0qgcr6">
            <Plus className="h-6 w-6 text-green-600 mr-2" data-oid="uz4x-um" />
            <h2
              className="text-xl font-semibold text-gray-800"
              data-oid="qe:-an0"
            >
              Agregar Horario Extra
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            data-oid="pzu:hlp"
          >
            <X className="h-6 w-6" data-oid="1mn8pzu" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6" data-oid="plj9wsi">
          {/* Vehicle and Driver Info */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            data-oid="dn_f4kd"
          >
            <div className="p-4 bg-gray-100 rounded-lg" data-oid="i.blghb">
              <h3 className="font-medium text-gray-800 mb-2" data-oid="ygery6l">
                Conductor
              </h3>
              <div className="text-sm space-y-1" data-oid="9qxtd3s">
                <div className="flex items-center" data-oid="7b_dx46">
                  <User className="h-4 w-4 mr-2" data-oid=":x4kjf7" />
                  <span data-oid="oyi3:nn">
                    <strong data-oid="n2ifv5o">Nombre:</strong>{" "}
                    {vehicle.vehicle_data?.driver?.name ||
                      vehicle.driver_name ||
                      "N/A"}
                  </span>
                </div>
                <div data-oid="g41d211">
                  <strong data-oid="y2j9nkb">Vehículo:</strong>{" "}
                  {vehicle.vehicle_data?.model || vehicle.model || "N/A"}
                </div>
                <div data-oid="r4a2v6r">
                  <strong data-oid="b7pn844">Tipo:</strong>{" "}
                  {vehicle.availability_type === "fixed_zone"
                    ? "Zona Fija"
                    : "Ruta Flexible"}
                </div>
              </div>
            </div>

            <div className="p-4 bg-amber-50 rounded-lg" data-oid="qi4tpiy">
              <h3 className="font-medium text-gray-800 mb-2" data-oid="74g9qlv">
                Solicitud Original
              </h3>
              <div className="text-sm space-y-1" data-oid="amvusms">
                <div className="flex items-center" data-oid="7nxjpd_">
                  <Calendar className="h-4 w-4 mr-2" data-oid="z7056rw" />
                  <span data-oid="gh7sw9_">
                    <strong data-oid="ibx5him">Fecha:</strong>{" "}
                    {originalPickupDate.split("T")[0]}
                  </span>
                </div>
                <div className="flex items-center" data-oid="gc_sx-2">
                  <Clock className="h-4 w-4 mr-2" data-oid="f33lp1v" />
                  <span data-oid="9lvsu.1">
                    <strong data-oid="cdq7uv:">Hora:</strong>{" "}
                    {originalPickupTime}
                  </span>
                </div>
                <div className="flex items-center" data-oid="7335ad-">
                  <MapPin className="h-4 w-4 mr-2" data-oid="uxk63zh" />
                  <span data-oid=":hqy29l">
                    <strong data-oid="g.8:u8h">Ubicación:</strong>{" "}
                    {pickupLocation}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Details */}
          <div
            className="border border-gray-200 rounded-lg p-4"
            data-oid=":qqwcw-"
          >
            <h3 className="font-medium text-gray-800 mb-4" data-oid="p3ag:91">
              Configurar Horario Extra
            </h3>

            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              data-oid="08-i4tg"
            >
              <div data-oid="vr54gys">
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  data-oid="9ocfpj0"
                >
                  Fecha
                </label>
                <input
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  data-oid="g7-x_n4"
                />
              </div>

              <div data-oid="dn1.bxh">
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  data-oid="qq8-f1f"
                >
                  Hora de inicio
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => handleTimeChange("start", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  data-oid="_z.gz3a"
                />
              </div>

              <div data-oid="t4cw1tz">
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  data-oid="0-.2_to"
                >
                  Hora de fin
                </label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => handleTimeChange("end", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  data-oid="0m6w:z9"
                />
              </div>
            </div>

            {/* Duration Display */}
            {duration > 0 && (
              <div
                className="mt-3 p-2 bg-gray-50 rounded text-sm text-gray-600"
                data-oid="yjx0jpd"
              >
                <Clock className="h-4 w-4 inline mr-1" data-oid="1c4e766" />
                Duración: {Math.floor(duration / 60)}h {duration % 60}m
              </div>
            )}

            {/* Conflict Check */}
            {isCheckingConflicts && (
              <div
                className="mt-3 p-3 bg-gray-100 rounded-lg text-sm text-blue-800"
                data-oid="fhy7f0w"
              >
                <div className="animate-pulse" data-oid="ftha8cm">
                  Verificando conflictos...
                </div>
              </div>
            )}

            {conflictCheck && (
              <div
                className={`mt-3 p-3 rounded-lg text-sm ${
                  conflictCheck.has_conflict
                    ? "bg-gray-100 text-gray-800"
                    : "bg-green-50 text-green-800"
                }`}
                data-oid="qutl4er"
              >
                <div className="flex items-center" data-oid="nl2k_:6">
                  {conflictCheck.has_conflict ? (
                    <>
                      <AlertCircle
                        className="h-4 w-4 mr-2"
                        data-oid="vi8qexw"
                      />

                      <span data-oid="cy_r-_6">
                        <strong data-oid="n9boe3v">Conflicto:</strong>{" "}
                        {conflictCheck.reason}
                      </span>
                    </>
                  ) : (
                    <>
                      <CheckCircle
                        className="h-4 w-4 mr-2"
                        data-oid="07exjuu"
                      />

                      <span data-oid="l93xfwl">
                        ✅ Horario disponible - No hay conflictos
                      </span>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Reason */}
          <div data-oid=":7tl0u2">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              data-oid="8uwpjlt"
            >
              Motivo del horario extra
            </label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ej: Conductor acepta horario especial para cliente VIP"
              data-oid="1h4gksx"
            />
          </div>

          {/* Notes */}
          <div data-oid="pzz9ero">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              data-oid="bupw4m2"
            >
              Notas adicionales (opcional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Agregar detalles sobre el acuerdo con el conductor..."
              data-oid="2_n8ckr"
            />
          </div>

          {/* Info Box */}
          <div
            className="bg-green-50 border border-green-200 rounded-lg p-4"
            data-oid="-ohonn3"
          >
            <h4 className="font-medium text-green-800 mb-2" data-oid="0u6f_fh">
              ℹ️ Información importante
            </h4>
            <ul className="text-sm text-green-700 space-y-1" data-oid="nhs4-49">
              <li data-oid="2cy-240">
                • Este horario se agregará a la agenda del conductor
              </li>
              <li data-oid="p.5luez">
                • El conductor estará disponible para reservas en este horario
              </li>
              <li data-oid="4hq.umi">
                • Se verificarán automáticamente los conflictos antes de crear
              </li>
              <li data-oid="ah3g1vo">
                • Una vez creado, el horario permitirá completar la reserva
                original
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50"
          data-oid="e0zhw3d"
        >
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            data-oid=":e1a932"
          >
            Cancelar
          </button>

          <Button
            onClick={handleSubmitExtraSchedule}
            disabled={
              isSubmitting ||
              conflictCheck?.has_conflict ||
              !scheduleDate ||
              !startTime ||
              !endTime
            }
            className="bg-black hover:bg-gray-800 disabled:opacity-50"
            data-oid="n1wznai"
          >
            {isSubmitting ? (
              <>
                <div
                  className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"
                  data-oid="wtz8x:f"
                ></div>
                Creando horario...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" data-oid="y9whu50" />
                Crear Horario Extra
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddExtraScheduleModal;
