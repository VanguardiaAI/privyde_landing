import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  Send,
} from "lucide-react";

interface SuggestScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: any;
  originalPickupDate: string;
  pickupLocation: string;
  dropoffLocation?: string;
  clientId?: string;
  onSuggestionCreated?: (suggestionData: any) => void;
}

interface ClientContactInfo {
  client_id: string;
  name: string;
  phone: string;
  email: string;
  whatsapp: string;
  contact_preferences: string[];
  preferred_language: string;
}

interface TimeSlot {
  start_time: string;
  end_time: string;
  date?: string;
}

const SuggestScheduleModal: React.FC<SuggestScheduleModalProps> = ({
  isOpen,
  onClose,
  vehicle,
  originalPickupDate,
  pickupLocation,
  dropoffLocation,
  clientId,
  onSuggestionCreated,
}) => {
  const [clientInfo, setClientInfo] = useState<ClientContactInfo | null>(null);
  const [isLoadingClient, setIsLoadingClient] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [suggestedDate, setSuggestedDate] = useState("");
  const [suggestedTime, setSuggestedTime] = useState("");
  const [contactMethod, setContactMethod] = useState("whatsapp");
  const [customMessage, setCustomMessage] = useState("");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Horarios alternativos del vehículo - VALIDACIÓN AGREGADA
  const alternativeSlots: TimeSlot[] = vehicle?.alternative_time_slots || [];

  useEffect(() => {
    if (isOpen && vehicle) {
      // Inicializar valores por defecto
      initializeDefaultValues();

      // Cargar información del cliente si se proporciona ID
      if (clientId) {
        fetchClientContactInfo();
      }
    }
  }, [isOpen, clientId, vehicle]);

  const initializeDefaultValues = () => {
    if (!vehicle) return;

    // Seleccionar automáticamente los primeros 3 horarios alternativos
    if (alternativeSlots.length > 0) {
      const defaultSlots = alternativeSlots
        .slice(0, 3)
        .map((slot: TimeSlot) => `${slot.start_time} - ${slot.end_time}`);
      setSelectedSlots(defaultSlots);
    }

    // Establecer motivo por defecto
    setReason(vehicle.unavailable_reason || "Horario no disponible");

    // Mensaje por defecto
    const driverName =
      vehicle.vehicle_data?.driver?.name ||
      vehicle.driver_name ||
      "el conductor";
    const vehicleModel =
      vehicle.vehicle_data?.model || vehicle.model || "el vehículo";

    setCustomMessage(
      `Hola! Te escribo porque el vehículo que solicitaste (${vehicleModel}) no está disponible en el horario que necesitas.\n\n` +
        `Sin embargo, ${driverName} tiene disponibilidad en otros horarios del mismo día.\n\n` +
        `¿Te gustaría considerar alguna de estas opciones alternativas?`,
    );
  };

  const fetchClientContactInfo = async () => {
    if (!clientId) return;

    setIsLoadingClient(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/contact/client/${clientId}`,
      );

      if (response.ok) {
        const data = await response.json();
        setClientInfo(data);

        // Establecer método de contacto preferido
        if (data.contact_preferences?.length > 0) {
          setContactMethod(data.contact_preferences[0]);
        }
      } else {
        console.error("Error al obtener información del cliente");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    } finally {
      setIsLoadingClient(false);
    }
  };

  const handleSlotToggle = (slot: string) => {
    setSelectedSlots((prev) => {
      if (prev.includes(slot)) {
        return prev.filter((s) => s !== slot);
      } else {
        return [...prev, slot];
      }
    });
  };

  const handleSubmitSuggestion = async () => {
    if (!clientInfo && !clientId) {
      alert("Se requiere información del cliente para enviar la sugerencia");
      return;
    }

    if (!vehicle) {
      alert("Error: No se ha seleccionado un vehículo");
      return;
    }

    setIsSubmitting(true);
    try {
      const suggestionData = {
        admin_id: "admin-user-id", // Este debería venir del contexto de usuario
        client_id: clientId || clientInfo?.client_id,
        driver_id: vehicle.driver_id,
        vehicle_id: vehicle.id || vehicle.vehicle_id,
        original_pickup_date: originalPickupDate,
        suggested_pickup_date:
          suggestedDate && suggestedTime
            ? `${suggestedDate}T${suggestedTime}:00`
            : "",
        pickup_location: pickupLocation,
        dropoff_location: dropoffLocation || "",
        reason: reason,
        alternative_time_slots: selectedSlots,
        contact_method: contactMethod,
        message: customMessage,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/contact/suggest-schedule`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(suggestionData),
        },
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Sugerencia creada:", result);
        onSuggestionCreated?.(suggestionData);

        // Mostrar confirmación
        alert("Sugerencia de horario enviada exitosamente!");
        onClose();
      } else {
        const errorData = await response.json();
        alert(
          `Error al enviar sugerencia: ${errorData.error || "Error desconocido"}`,
        );
      }
    } catch (error) {
      console.error("Error al enviar sugerencia:", error);
      alert("Error al conectar con el servidor");
    } finally {
      setIsSubmitting(false);
    }
  };

  // No renderizar si no está abierto o no hay vehículo
  if (!isOpen || !vehicle) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      data-oid="0-32xjb"
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        data-oid="lio.9gb"
      >
        {/* Header */}
        <div
          className="flex justify-between items-center p-6 border-b border-gray-200"
          data-oid="3wwhpxi"
        >
          <h2
            className="text-xl font-semibold text-gray-800"
            data-oid="k1-t.72"
          >
            Sugerir Horario Alternativo
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            data-oid="6ea28uh"
          >
            <X className="h-6 w-6" data-oid="3gg8js-" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6" data-oid="y49vf88">
          {/* Vehicle and Trip Info */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            data-oid="u1ho-.q"
          >
            <div className="p-4 bg-gray-100 rounded-lg" data-oid="zo.f72b">
              <h3 className="font-medium text-gray-800 mb-2" data-oid="xqc:tto">
                Vehículo
              </h3>
              <div className="text-sm space-y-1" data-oid="7pg0u.j">
                <div data-oid="v_7fn_w">
                  <strong data-oid="rryp_fu">Modelo:</strong>{" "}
                  {vehicle.vehicle_data?.model || vehicle.model || "N/A"}
                </div>
                <div data-oid="hfdwzl2">
                  <strong data-oid="0564jn.">Conductor:</strong>{" "}
                  {vehicle.vehicle_data?.driver?.name ||
                    vehicle.driver_name ||
                    "N/A"}
                </div>
                <div data-oid="k4m7y:2">
                  <strong data-oid="xxffalb">Tipo:</strong>{" "}
                  {vehicle.availability_type === "fixed_zone"
                    ? "Zona Fija"
                    : "Ruta Flexible"}
                </div>
              </div>
            </div>

            <div className="p-4 bg-amber-50 rounded-lg" data-oid="kllwr5:">
              <h3 className="font-medium text-gray-800 mb-2" data-oid="0wdw3:y">
                Viaje Original
              </h3>
              <div className="text-sm space-y-1" data-oid="mxafjdn">
                <div className="flex items-center" data-oid="dwuqj6n">
                  <Calendar className="h-4 w-4 mr-2" data-oid="axfwbus" />
                  <span data-oid="4ub7ami">
                    <strong data-oid="dk9hemb">Fecha:</strong>{" "}
                    {originalPickupDate}
                  </span>
                </div>
                <div className="flex items-center" data-oid="92yko5n">
                  <MapPin className="h-4 w-4 mr-2" data-oid="-k1rc4-" />
                  <span data-oid="oiqjzk8">
                    <strong data-oid="s_vng-l">Origen:</strong> {pickupLocation}
                  </span>
                </div>
                {dropoffLocation && (
                  <div className="flex items-center" data-oid="mu0nzti">
                    <MapPin className="h-4 w-4 mr-2" data-oid="vbpocjq" />
                    <span data-oid="0v8pm8-">
                      <strong data-oid="e45hw3t">Destino:</strong>{" "}
                      {dropoffLocation}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Client Info */}
          {isLoadingClient ? (
            <div className="p-4 bg-gray-50 rounded-lg" data-oid="40wztwd">
              <div className="animate-pulse" data-oid="-7btokd">
                Cargando información del cliente...
              </div>
            </div>
          ) : clientInfo ? (
            <div className="p-4 bg-green-50 rounded-lg" data-oid="wbxgh3.">
              <h3 className="font-medium text-gray-800 mb-2" data-oid="xpe_c5g">
                Cliente
              </h3>
              <div className="text-sm space-y-1" data-oid="h.q-uok">
                <div className="flex items-center" data-oid="eo5wpb5">
                  <User className="h-4 w-4 mr-2" data-oid="ismmsdw" />
                  <span data-oid="92rxc9o">
                    <strong data-oid="1w.cobq">Nombre:</strong>{" "}
                    {clientInfo.name}
                  </span>
                </div>
                <div className="flex items-center" data-oid="s---rmn">
                  <Phone className="h-4 w-4 mr-2" data-oid="ssf1:v-" />
                  <span data-oid="4_uk.gv">
                    <strong data-oid="ypkrgww">Teléfono:</strong>{" "}
                    {clientInfo.phone}
                  </span>
                </div>
                <div className="flex items-center" data-oid="sgs0g03">
                  <Mail className="h-4 w-4 mr-2" data-oid="54_x6:7" />
                  <span data-oid="ukztx2i">
                    <strong data-oid="omsy5e0">Email:</strong>{" "}
                    {clientInfo.email}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-yellow-50 rounded-lg" data-oid="gp3-_93">
              <p className="text-sm text-yellow-800" data-oid="ulfzlw4">
                ℹ️ Para mejores resultados, asegúrate de que el cliente esté
                registrado en el sistema.
              </p>
            </div>
          )}

          {/* Reason for unavailability */}
          <div data-oid="ve931jr">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              data-oid="v6ducl8"
            >
              Motivo de no disponibilidad
            </label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: En otro viaje programado"
              data-oid="uc14:m5"
            />
          </div>

          {/* Alternative time slots */}
          {alternativeSlots.length > 0 && (
            <div data-oid="pd9idib">
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                data-oid="bdgrnob"
              >
                Horarios alternativos disponibles
              </label>
              <div className="flex flex-wrap gap-2" data-oid=":evi1wr">
                {selectedSlots.map((slot) => (
                  <div
                    key={slot}
                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center"
                    data-oid="ypmka3s"
                  >
                    <Clock className="h-3 w-3 mr-1.5" data-oid="x1icdan" />
                    {slot}
                    <button
                      onClick={() => handleSlotToggle(slot)}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                      data-oid="mhfgnk6"
                    >
                      <X className="h-3 w-3" data-oid="cyjdl2f" />
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2" data-oid="brmzg39">
                Se han preseleccionado automáticamente los primeros 3 horarios.
                Puedes modificar la selección.
              </p>
            </div>
          )}

          {/* Custom date/time suggestion */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            data-oid="f00fw2_"
          >
            <div data-oid=".5:95gi">
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                data-oid="jtevudu"
              >
                Fecha específica (opcional)
              </label>
              <input
                type="date"
                value={suggestedDate}
                onChange={(e) => setSuggestedDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                data-oid="qfd65la"
              />
            </div>
            <div data-oid="4686wce">
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                data-oid="67ldrw_"
              >
                Hora específica (opcional)
              </label>
              <input
                type="time"
                value={suggestedTime}
                onChange={(e) => setSuggestedTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                data-oid="5do0zrz"
              />
            </div>
          </div>

          {/* Contact method */}
          <div data-oid="qzp-db7">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              data-oid="hb7xq68"
            >
              Método de contacto preferido
            </label>
            <select
              value={contactMethod}
              onChange={(e) => setContactMethod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              data-oid="v9:khr7"
            >
              <option value="whatsapp" data-oid="_wyy28s">
                WhatsApp
              </option>
              <option value="email" data-oid="c94yk57">
                Email
              </option>
              <option value="phone" data-oid="rzc9yvg">
                Llamada telefónica
              </option>
              <option value="sms" data-oid="p:k3q7r">
                SMS
              </option>
            </select>
          </div>

          {/* Custom message */}
          <div data-oid="sm46l1o">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              data-oid="heh06ys"
            >
              Mensaje personalizado
            </label>
            <textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Personaliza el mensaje que se enviará al cliente..."
              data-oid="l8e8.u_"
            />
          </div>

          {/* Preview */}
          <div className="bg-gray-50 p-4 rounded-lg" data-oid="fx_sgok">
            <h4 className="font-medium text-gray-800 mb-2" data-oid="23g90jp">
              Vista previa del mensaje
            </h4>
            <div
              className="text-sm text-gray-600 whitespace-pre-wrap"
              data-oid="c.kxnoq"
            >
              {customMessage}

              {selectedSlots.length > 0 && (
                <>
                  {"\n\n"}📅{" "}
                  <strong data-oid="c04:xey">Horarios disponibles:</strong>
                  {selectedSlots.map((slot) => `\n• ${slot}`).join("")}
                </>
              )}

              {suggestedDate && suggestedTime && (
                <>
                  {"\n\n"}⭐{" "}
                  <strong data-oid="zpc4rav">Sugerencia específica:</strong>{" "}
                  {suggestedDate} a las {suggestedTime}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50"
          data-oid="z.6.:f0"
        >
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            data-oid="bhxw-sg"
          >
            Cancelar
          </button>

          <Button
            onClick={handleSubmitSuggestion}
            disabled={isSubmitting || selectedSlots.length === 0}
            className="bg-black hover:bg-gray-800 disabled:opacity-50"
            data-oid="76xyzw2"
          >
            {isSubmitting ? (
              <>
                <div
                  className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"
                  data-oid=".s.25hj"
                ></div>
                Enviando...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" data-oid="1113ep1" />
                Enviar Sugerencia
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuggestScheduleModal;
