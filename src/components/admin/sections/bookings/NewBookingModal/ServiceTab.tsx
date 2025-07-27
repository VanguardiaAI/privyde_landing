import { Button } from "@/components/ui/button";
import {
  Search,
  Check,
  AlertCircle,
  Car,
  MapPin,
  DollarSign,
  Clock,
  Phone,
  User,
} from "lucide-react";
import type { FixedRoute } from "@/hooks/useBookingManagement";
import { priceCalculationService } from "@/services/priceCalculationService";
import ContactDriverModal from "./ContactDriverModal";
import SuggestScheduleModal from "./SuggestScheduleModal";
import AddExtraScheduleModal from "./AddExtraScheduleModal";
import { useRef, useEffect, useState } from "react";

type ServiceTabProps = {
  newBookingFormData: any;
  validationErrors: any;
  handleFormChange: (section: string, field: string, value: any) => void;
  routeType: "fixed" | "flexible";
  handleRouteTypeChange: (type: "fixed" | "flexible") => void;
  handleSearchFixedRoutes: (query: string) => void;
  handleSelectFixedRoute: (route: any) => void;
  isSearchingRoutes: boolean;
  routeSearchResults: any[];
  selectedRoute: any;
  handleSearchPickupAddress: (query: string) => void;
  handleSelectPickupAddress: (address: any) => void;
  handleSearchDropoffAddress: (query: string) => void;
  handleSelectDropoffAddress: (address: any) => void;
  pickupAddressResults: any[];
  isSearchingPickupAddress: boolean;
  dropoffAddressResults: any[];
  isSearchingDropoffAddress: boolean;
  handleCheckVehicleAvailability: (coordinates: any, location: string) => void;
  isCheckingAvailability: boolean;
  availabilityResults: any;
  setActiveTab: (tab: "client" | "service" | "details" | "payment") => void;
  handleNextTab: (currentTab: "client" | "service" | "details") => void;
  handleCalculatePrice?: () => void;
  isCalculatingPrice?: boolean;
  canCalculatePrice?: () => boolean;
  // Nuevas props para contacto y sugerencias
  contactModalOpen: boolean;
  suggestModalOpen: boolean;
  selectedVehicleForAction: any;
  handleOpenContactModal: (vehicle: any) => void;
  handleCloseContactModal: () => void;
  handleOpenSuggestModal: (vehicle: any) => void;
  handleCloseSuggestModal: () => void;
  handleContactLogged: (contactData: any) => void;
  handleSuggestionCreated: (suggestionData: any) => void;
  // Nuevas props para horario extra
  extraScheduleModalOpen: boolean;
  handleOpenExtraScheduleModal: (vehicle: any) => void;
  handleCloseExtraScheduleModal: () => void;
  handleExtraScheduleCreated: (scheduleData: any) => void;

  // Props para indicadores especiales
  wasVehicleSelectedByExtraSchedule?: boolean;
  handleClearVehicleSelection?: () => void;

  // Función para limpiar precio calculado
  clearCalculatedPrice?: () => void;
};

const ServiceTab = ({
  newBookingFormData,
  validationErrors,
  handleFormChange,
  routeType,
  handleRouteTypeChange,
  handleSearchFixedRoutes,
  handleSelectFixedRoute,
  isSearchingRoutes,
  routeSearchResults,
  selectedRoute,
  handleSearchPickupAddress,
  handleSelectPickupAddress,
  handleSearchDropoffAddress,
  handleSelectDropoffAddress,
  pickupAddressResults,
  isSearchingPickupAddress,
  dropoffAddressResults,
  isSearchingDropoffAddress,
  handleCheckVehicleAvailability,
  isCheckingAvailability,
  availabilityResults,
  setActiveTab,
  handleNextTab,
  handleCalculatePrice,
  isCalculatingPrice,
  canCalculatePrice,
  contactModalOpen,
  suggestModalOpen,
  selectedVehicleForAction,
  handleOpenContactModal,
  handleCloseContactModal,
  handleOpenSuggestModal,
  handleCloseSuggestModal,
  handleContactLogged,
  handleSuggestionCreated,
  extraScheduleModalOpen,
  handleOpenExtraScheduleModal,
  handleCloseExtraScheduleModal,
  handleExtraScheduleCreated,

  // Estados para indicadores especiales
  wasVehicleSelectedByExtraSchedule,
  handleClearVehicleSelection,

  // Función para limpiar precio calculado
  // clearCalculatedPrice
}: ServiceTabProps) => {
  // Estados para controlar la visibilidad de los desplegables
  const [showPickupDropdown, setShowPickupDropdown] = useState(false);
  const [showDropoffDropdown, setShowDropoffDropdown] = useState(false);

  // Referencias para los desplegables
  const pickupDropdownRef = useRef<HTMLDivElement>(null);
  const dropoffDropdownRef = useRef<HTMLDivElement>(null);

  // Efecto para manejar clics fuera de los desplegables
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickupDropdownRef.current &&
        !pickupDropdownRef.current.contains(event.target as Node)
      ) {
        setShowPickupDropdown(false);
      }
      if (
        dropoffDropdownRef.current &&
        !dropoffDropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropoffDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const hasSelectedVehicle = !!newBookingFormData.vehicle?.id;
  const hasPriceCalculated = !!newBookingFormData.payment?.priceBreakdown;

  /*
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

  const formatTimeSlot = (timeSlot: {
    start_time: string;
    end_time: string;
    date?: string;
  }) => {
    const formatTime = (time: string) => {
      return new Date(`2000-01-01T${time}`).toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    };

    const dateStr = timeSlot.date
      ? new Date(timeSlot.date).toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "2-digit",
        })
      : "";

    return `${formatTime(timeSlot.start_time)} - ${formatTime(timeSlot.end_time)}${dateStr ? ` (${dateStr})` : ""}`;
  };

  // Funciones wrapper para manejar la visibilidad de desplegables
  const handlePickupSearch = (query: string) => {
    handleSearchPickupAddress(query);
    setShowPickupDropdown(pickupAddressResults.length > 0 && query.length >= 3);
  };

  const handlePickupSelect = (address: any) => {
    handleSelectPickupAddress(address);
    setShowPickupDropdown(false);
  };

  const handleDropoffSearch = (query: string) => {
    handleSearchDropoffAddress(query);
    setShowDropoffDropdown(
      dropoffAddressResults.length > 0 && query.length >= 3,
    );
  };

  const handleDropoffSelect = (address: any) => {
    handleSelectDropoffAddress(address);
  };

  // Efectos para manejar la visibilidad cuando cambian los resultados
  useEffect(() => {
    setShowPickupDropdown(pickupAddressResults.length > 0);
  }, [pickupAddressResults]);

  useEffect(() => {
    setShowDropoffDropdown(dropoffAddressResults.length > 0);
  }, [dropoffAddressResults]);

  // useEffect para debugging - rastrear cambios en availabilityResults
  useEffect(() => {
    console.log("🎯 ServiceTab - availabilityResults cambió:", {
      timestamp: new Date().toISOString(),
      availabilityResults: availabilityResults,
      isCheckingAvailability: isCheckingAvailability,
      hasData: !!availabilityResults,
      vehicleCount: availabilityResults?.total_vehicles_found || 0,
      availableVehicles: availabilityResults?.available_vehicles?.length || 0,
      alternativeVehicles:
        availabilityResults?.vehicles_with_alternative_schedules?.length || 0,
    });
  }, [availabilityResults, isCheckingAvailability]);

  // Función para generar fechas alternativas
  const generateAlternativeDates = (currentDate: string) => {
    if (!currentDate) return [];

    const current = new Date(currentDate);
    const alternatives = [];

    // Generar 7 fechas alternativas (3 anteriores, 3 posteriores, excluyendo la actual)
    for (let i = -3; i <= 3; i++) {
      if (i === 0) continue; // Saltar la fecha actual

      const altDate = new Date(current);
      altDate.setDate(current.getDate() + i);

      // Solo fechas futuras (o hoy mismo)
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (altDate >= today) {
        alternatives.push({
          date: altDate.toISOString().split("T")[0],
          label: formatAlternativeDate(altDate),
          dayOfWeek: altDate.toLocaleDateString("es-ES", { weekday: "long" }),
        });
      }
    }

    return alternatives.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
  };

  // Función para formatear fechas alternativas
  const formatAlternativeDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Hoy";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Mañana";
    } else {
      return date.toLocaleDateString("es-ES", {
        month: "short",
        day: "numeric",
        weekday: "short",
      });
    }
  };

  // Manejar selección de fecha alternativa
  const handleSelectAlternativeDate = (altDate: string) => {
    handleFormChange("service", "pickup", {
      ...newBookingFormData.service.pickup,
      date: altDate,
    });

    // La verificación será automática gracias al useEffect
  };

  return (
    <div className="mt-4" data-oid="hglobw7">
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4"
        data-oid="f.9:9cz"
      >
        <div data-oid="6ksbiy7">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            data-oid="h_w2bmy"
          >
            Tipo de servicio
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            value={newBookingFormData.service.type}
            onChange={(e) =>
              handleFormChange("service", "type", e.target.value)
            }
            data-oid="vjneds7"
          >
            <option value="one_way" data-oid="w9rqw4h">
              Un trayecto
            </option>
            <option value="round_trip" data-oid="-v1aom.">
              Ida y vuelta
            </option>
            <option value="hourly" data-oid="-n64wro">
              Por horas
            </option>
            <option value="full_day" data-oid="t5o4tpv">
              Día completo
            </option>
          </select>
        </div>

        {(newBookingFormData.service.type === "hourly" ||
          newBookingFormData.service.type === "full_day") && (
          <div data-oid="p2g9smr">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              data-oid="okv5tcq"
            >
              Duración
              {newBookingFormData.service.type === "hourly" && (
                <span className="text-xs text-gray-500 ml-1" data-oid="oxj36p8">
                  (mínimo 1 hora)
                </span>
              )}
            </label>
            <div className="space-y-2" data-oid="scf-yk_">
              {/* Opciones predefinidas */}
              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-2"
                data-oid="ghdaaox"
              >
                {[
                  { label: "1 hora", value: 60 },
                  { label: "2 horas", value: 120 },
                  { label: "3 horas", value: 180 },
                  { label: "4 horas", value: 240 },
                  { label: "6 horas", value: 360 },
                  { label: "8 horas", value: 480 },
                  ...(newBookingFormData.service.type === "full_day"
                    ? [
                        { label: "12 horas", value: 720 },
                        { label: "Día completo", value: 1440 },
                      ]
                    : []),
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`px-3 py-2 text-xs border rounded-md transition-colors ${
                      newBookingFormData.service.duration === option.value
                        ? "bg-black text-white border-red-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                    onClick={() =>
                      handleFormChange("service", "duration", option.value)
                    }
                    data-oid="6p:t1dh"
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {/* Campo personalizado */}
              <div className="flex items-center space-x-2" data-oid="lz:23.0">
                <span className="text-xs text-gray-500" data-oid="h9mbt2e">
                  O personalizado:
                </span>
                <input
                  type="number"
                  className={`flex-1 px-3 py-2 border ${validationErrors["service.duration"] ? "border-gray-500" : "border-gray-300"} rounded-md text-sm`}
                  value={newBookingFormData.service.duration || ""}
                  onChange={(e) =>
                    handleFormChange(
                      "service",
                      "duration",
                      parseInt(e.target.value),
                    )
                  }
                  placeholder="Minutos"
                  min="60"
                  step="30"
                  data-oid="f6:cr:j"
                />

                <span className="text-xs text-gray-500" data-oid="whp6kr7">
                  min
                </span>
              </div>
            </div>
            {validationErrors["service.duration"] && (
              <p className="text-black text-xs mt-1" data-oid="hpvac23">
                {validationErrors["service.duration"]}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-4 mb-4" data-oid="hqxofqw">
        <h3
          className="text-sm font-semibold text-gray-700 mb-3"
          data-oid="0zm:r3n"
        >
          Tipo de ruta
        </h3>
        <div className="flex space-x-4 mb-4" data-oid="m0ykrih">
          <label className="inline-flex items-center" data-oid="5z_0vzm">
            <input
              type="radio"
              className="form-radio text-gray-600"
              checked={routeType === "flexible"}
              onChange={() => handleRouteTypeChange("flexible")}
              data-oid="t0d:a43"
            />

            <span className="ml-2 text-sm" data-oid="nauzcia">
              Ruta flexible
            </span>
          </label>
          <label className="inline-flex items-center" data-oid="o2l4at3">
            <input
              type="radio"
              className="form-radio text-gray-600"
              checked={routeType === "fixed"}
              onChange={() => handleRouteTypeChange("fixed")}
              data-oid="_vqhdp_"
            />

            <span className="ml-2 text-sm" data-oid="w.o9j5i">
              Ruta fija
            </span>
          </label>
        </div>

        {routeType === "fixed" && (
          <div className="mb-4" data-oid="5sgv0.f">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              data-oid="fclk:v6"
            >
              Buscar ruta fija
            </label>
            <div className="relative" data-oid="r6xtoe3">
              <div className="relative rounded-md shadow-sm" data-oid="tdzd66n">
                <div
                  className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  data-oid="m8l77ll"
                >
                  <Search
                    className="h-4 w-4 text-gray-400"
                    data-oid="__p.6dn"
                  />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="Busca por nombre, origen o destino..."
                  onChange={(e) => handleSearchFixedRoutes(e.target.value)}
                  data-oid="wurlw4y"
                />

                {isSearchingRoutes && (
                  <div
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    data-oid="rpkiqjw"
                  >
                    <div
                      className="animate-spin h-4 w-4 border-2 border-red-600 rounded-full border-t-transparent"
                      data-oid="ka7ug4i"
                    ></div>
                  </div>
                )}
              </div>

              {routeSearchResults.length > 0 && (
                <div
                  className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-y-auto"
                  data-oid="6m7hu7t"
                >
                  {routeSearchResults.map((route: FixedRoute) => (
                    <div
                      key={route._id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-0"
                      onClick={() => handleSelectFixedRoute(route)}
                      data-oid="c_485vo"
                    >
                      <div className="font-medium" data-oid="5y3-4im">
                        {route.name}
                      </div>
                      <div className="text-sm text-gray-500" data-oid="3cmbgaj">
                        <div data-oid="e19jta4">
                          Origen: {route.origin.name}
                        </div>
                        <div data-oid="7-z89m6">
                          Destino: {route.destination.name}
                        </div>
                      </div>
                      <div
                        className="text-xs text-gray-400 mt-1"
                        data-oid="1703ytp"
                      >
                        Distancia: {route.distance}km • Tiempo estimado:{" "}
                        {route.estimatedTime}min
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {routeSearchResults.length === 0 && !isSearchingRoutes && (
                <div className="text-sm text-gray-500 mt-2" data-oid="-u9o20y">
                  No se encontraron rutas que coincidan con tu búsqueda.
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2" data-oid="17yxc4x">
              Al seleccionar una ruta fija, los campos de origen y destino se
              autocompletarán automáticamente.
            </p>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-4 mb-4" data-oid="e0eib7:">
        <h3
          className="text-sm font-semibold text-gray-700 mb-3"
          data-oid="rthmwq4"
        >
          Información de recogida
        </h3>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          data-oid="vwrbfeh"
        >
          <div data-oid="lpg._hb">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              data-oid="e6vuooh"
            >
              Fecha de recogida
            </label>
            <input
              type="date"
              className={`w-full px-3 py-2 border ${validationErrors["service.pickup.date"] ? "border-gray-500" : "border-gray-300"} rounded-md text-sm`}
              value={newBookingFormData.service.pickup.date}
              onChange={(e) =>
                handleFormChange("service", "pickup.date", e.target.value)
              }
              data-oid="0qwqhpe"
            />

            {validationErrors["service.pickup.date"] && (
              <p className="text-black text-xs mt-1" data-oid="awbc6wp">
                {validationErrors["service.pickup.date"]}
              </p>
            )}
          </div>
          <div data-oid="vhrdgdr">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              data-oid="e05rbpj"
            >
              Hora de recogida
            </label>
            <input
              type="time"
              className={`w-full px-3 py-2 border ${validationErrors["service.pickup.time"] ? "border-gray-500" : "border-gray-300"} rounded-md text-sm`}
              value={newBookingFormData.service.pickup.time}
              onChange={(e) =>
                handleFormChange("service", "pickup.time", e.target.value)
              }
              data-oid="e9:jsij"
            />

            {validationErrors["service.pickup.time"] && (
              <p className="text-black text-xs mt-1" data-oid="edj9sb3">
                {validationErrors["service.pickup.time"]}
              </p>
            )}
          </div>
        </div>
        <div className="mt-3" data-oid="4n0-t..">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            data-oid="x01vydq"
          >
            Lugar de recogida
          </label>
          <div className="relative" ref={pickupDropdownRef} data-oid="_9eeb5_">
            <div className="relative rounded-md shadow-sm" data-oid="x34eatf">
              <div
                className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                data-oid="b_b.dk4"
              >
                <Search className="h-4 w-4 text-gray-400" data-oid="9v9v6_i" />
              </div>
              <input
                type="text"
                className={`w-full pl-10 px-3 py-2 border ${validationErrors["service.pickup.location"] ? "border-gray-500" : "border-gray-300"} rounded-md text-sm`}
                value={newBookingFormData.service.pickup.location}
                onChange={(e) => {
                  handleFormChange(
                    "service",
                    "pickup.location",
                    e.target.value,
                  );
                  handlePickupSearch(e.target.value);
                }}
                onFocus={() => {
                  if (pickupAddressResults.length > 0)
                    setShowPickupDropdown(true);
                }}
                placeholder="Busca y selecciona una dirección"
                data-oid="6n:okq0"
              />

              {isSearchingPickupAddress && (
                <div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  data-oid="08sy0-l"
                >
                  <div
                    className="animate-spin h-4 w-4 border-2 border-red-600 rounded-full border-t-transparent"
                    data-oid="4ir:.cl"
                  ></div>
                </div>
              )}
            </div>

            {showPickupDropdown && pickupAddressResults.length > 0 && (
              <div
                className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-y-auto"
                data-oid="pm9vy-h"
              >
                {pickupAddressResults.map((address, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-0"
                    onClick={() => handlePickupSelect(address)}
                    data-oid="x1dss2j"
                  >
                    <div className="text-sm" data-oid="vy1miqm">
                      {address.description}
                    </div>
                    {address.structured_formatting && (
                      <div
                        className="text-xs text-gray-500 mt-1"
                        data-oid="::qz6ht"
                      >
                        {address.structured_formatting.secondary_text}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          {validationErrors["service.pickup.location"] && (
            <p className="text-black text-xs mt-1" data-oid="84xb7cl">
              {validationErrors["service.pickup.location"]}
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 mb-4" data-oid="hgec8ts">
        <h3
          className="text-sm font-semibold text-gray-700 mb-3"
          data-oid="e6oc63i"
        >
          Información de destino
        </h3>
        <div className="mt-3" data-oid="c_c48be">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            data-oid="2xbnbf-"
          >
            Lugar de destino{" "}
            {hasSelectedVehicle &&
              !newBookingFormData.service.dropoff.location && (
                <span className="text-black" data-oid=":5s7yao">
                  *
                </span>
              )}
          </label>
          <div className="relative" ref={dropoffDropdownRef} data-oid="3kb8z64">
            <div className="relative rounded-md shadow-sm" data-oid="pc-m-ux">
              <div
                className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                data-oid="46y4ls."
              >
                <Search className="h-4 w-4 text-gray-400" data-oid="gc5-uz." />
              </div>
              <input
                type="text"
                className={`w-full pl-10 px-3 py-2 border ${validationErrors["service.dropoff.location"] || (hasSelectedVehicle && !newBookingFormData.service.dropoff.location) ? "border-gray-500" : "border-gray-300"} rounded-md text-sm`}
                value={newBookingFormData.service.dropoff.location}
                onChange={(e) => {
                  handleFormChange(
                    "service",
                    "dropoff.location",
                    e.target.value,
                  );
                  handleDropoffSearch(e.target.value);
                }}
                onFocus={() => {
                  if (dropoffAddressResults.length > 0)
                    setShowDropoffDropdown(true);
                }}
                placeholder="Busca y selecciona una dirección"
                disabled={routeType === "fixed" && selectedRoute !== null}
                data-oid="8k4281v"
              />

              {isSearchingDropoffAddress && (
                <div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  data-oid="exw9g::"
                >
                  <div
                    className="animate-spin h-4 w-4 border-2 border-red-600 rounded-full border-t-transparent"
                    data-oid="odw08en"
                  ></div>
                </div>
              )}
            </div>

            {showDropoffDropdown && dropoffAddressResults.length > 0 && (
              <div
                className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-y-auto"
                data-oid="b0i22c_"
              >
                {dropoffAddressResults.map((address, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-0"
                    onClick={() => handleDropoffSelect(address)}
                    data-oid="qdgsf13"
                  >
                    <div className="text-sm" data-oid="me.3s9v">
                      {address.description}
                    </div>
                    {address.structured_formatting && (
                      <div
                        className="text-xs text-gray-500 mt-1"
                        data-oid="5phm..s"
                      >
                        {address.structured_formatting.secondary_text}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          {validationErrors["service.dropoff.location"] && (
            <p className="text-black text-xs mt-1" data-oid="zx18.0s">
              {validationErrors["service.dropoff.location"]}
            </p>
          )}
          {hasSelectedVehicle &&
            !newBookingFormData.service.dropoff.location && (
              <p className="text-black text-xs mt-1" data-oid="30_tsji">
                <AlertCircle
                  className="h-3.5 w-3.5 inline mr-1"
                  data-oid="z59qps-"
                />
                Debe seleccionar un destino para calcular el precio del viaje
              </p>
            )}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 mb-4" data-oid="le1.mu.">
        <div
          className="flex justify-between items-center mb-3"
          data-oid="mc.hkrb"
        >
          <h3
            className="text-sm font-semibold text-gray-700"
            data-oid="blwrfu7"
          >
            Verificación de disponibilidad
          </h3>
          <div className="flex items-center space-x-2" data-oid="lg1.r0x">
            {/* Indicador de verificación automática */}
            <span
              className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-md border border-green-200"
              data-oid="nr--7r2"
            >
              ✓ Verificación automática
            </span>
            {/* Botón manual como respaldo */}
            <Button
              size="sm"
              variant="outline"
              disabled={
                !newBookingFormData.service.pickup.location ||
                !newBookingFormData.service.pickup.date ||
                !newBookingFormData.service.pickup.time ||
                isCheckingAvailability
              }
              onClick={() =>
                handleCheckVehicleAvailability(
                  newBookingFormData.service.pickup.coordinates,
                  newBookingFormData.service.pickup.location,
                )
              }
              className="text-xs flex items-center opacity-75 hover:opacity-100"
              title="Forzar verificación manual"
              data-oid="c6o:imq"
            >
              <Car className="h-3.5 w-3.5 mr-1" data-oid="vsbzjy:" />
              {isCheckingAvailability ? "Verificando..." : "Verificar ahora"}
            </Button>
          </div>
        </div>

        {isCheckingAvailability && (
          <div
            className="bg-gray-100 rounded-md p-3 flex items-center text-sm text-blue-700 mb-3"
            data-oid="3vv_x1u"
          >
            <div
              className="animate-spin h-4 w-4 border-2 border-blue-600 rounded-full border-t-transparent mr-2"
              data-oid="aimk931"
            ></div>
            Verificando disponibilidad de vehículos automáticamente...
          </div>
        )}

        {availabilityResults && !isCheckingAvailability && (
          <div className="bg-gray-50 rounded-md p-3 text-sm" data-oid="m3nomh7">
            <div className="font-medium text-gray-700 mb-2" data-oid="2z54sab">
              Resumen de disponibilidad:
            </div>

            {/* Info de duración solicitada */}
            {(newBookingFormData.service.type === "hourly" ||
              newBookingFormData.service.type === "full_day") &&
              newBookingFormData.service.duration && (
                <div
                  className="mb-3 p-2 bg-gray-100 rounded-md border border-blue-200"
                  data-oid="oa.n5z."
                >
                  <div
                    className="text-xs text-blue-700 font-medium"
                    data-oid="mp8soam"
                  >
                    Duración solicitada:{" "}
                    {Math.floor(newBookingFormData.service.duration / 60)}h{" "}
                    {newBookingFormData.service.duration % 60 > 0 &&
                      `${newBookingFormData.service.duration % 60}min`}
                    <span className="ml-2 text-gray-600" data-oid="xxrz1vd">
                      ({newBookingFormData.service.duration} minutos)
                    </span>
                  </div>
                </div>
              )}

            <div
              className="grid grid-cols-2 gap-3 mb-3 text-xs"
              data-oid="dxd3r9x"
            >
              <div data-oid="x:gt-it">
                <span className="text-gray-500" data-oid="0vjgmzn">
                  Vehículos encontrados:
                </span>
                <span className="ml-1 font-medium" data-oid="osy0vhg">
                  {availabilityResults.total_vehicles_found}
                </span>
              </div>
              <div data-oid="ybh1wlh">
                <span className="text-gray-500" data-oid="w9pv-wl">
                  En zonas fijas:
                </span>
                <span className="ml-1 font-medium" data-oid="-466y6t">
                  {availabilityResults.fixed_zone_count}
                </span>
              </div>
              <div data-oid="bqvx1ib">
                <span className="text-gray-500" data-oid="j0w179y">
                  En rutas flexibles:
                </span>
                <span className="ml-1 font-medium" data-oid="dnxw-7p">
                  {availabilityResults.flexible_route_count}
                </span>
              </div>
            </div>

            {availabilityResults.available_vehicles &&
            availabilityResults.available_vehicles.length > 0 ? (
              <div data-oid="t81da3e">
                <div
                  className="font-medium text-gray-700 mb-2"
                  data-oid="j8u9:2d"
                >
                  Vehículos disponibles:
                </div>
                <div
                  className="space-y-2 max-h-60 overflow-y-auto"
                  data-oid="5ujhp:8"
                >
                  {availabilityResults.available_vehicles.map(
                    (vehicle: any, index: number) => {
                      const model =
                        vehicle.model ||
                        vehicle.vehicle_data?.model ||
                        "Vehículo sin modelo";
                      const licensePlate =
                        vehicle.license_plate ||
                        vehicle.vehicle_data?.licensePlate;
                      const driverName =
                        vehicle.driver_name ||
                        vehicle.vehicle_data?.driver?.name ||
                        "Conductor no asignado";
                      const driverPhoto =
                        vehicle.driver_photo ||
                        vehicle.vehicle_data?.driver?.photo;
                      const vehicleImage =
                        vehicle.image ||
                        vehicle.imageUrl ||
                        vehicle.vehicle_data?.image ||
                        vehicle.vehicle_data?.imageUrl;
                      const driverPhone =
                        vehicle.driver_phone ||
                        vehicle.vehicle_data?.driver?.phone;
                      const driverRating =
                        vehicle.driver_rating ||
                        vehicle.vehicle_data?.driver?.rating ||
                        0;
                      const availabilityType =
                        vehicle.availability_type || "flexible_route";
                      const distanceKm = vehicle.distance_km;
                      const zoneName = vehicle.zone_name;

                      return (
                        <div
                          key={index}
                          className={`bg-white rounded-md p-3 border ${newBookingFormData.vehicle?.id === vehicle.id ? "border-red-600 bg-gray-100" : "border-green-200"} shadow-sm cursor-pointer transition-all hover:border-gray-500 hover:shadow-md`}
                          onClick={() => {
                            const vehicleObj = {
                              id: vehicle.id,
                              name: model,
                            };

                            const driverObj = {
                              id: vehicle.driver_id || "",
                              name: driverName,
                            };

                            handleFormChange("vehicle", "id", vehicleObj.id);
                            handleFormChange(
                              "vehicle",
                              "name",
                              vehicleObj.name,
                            );
                            handleFormChange("driver", "id", driverObj.id);
                            handleFormChange("driver", "name", driverObj.name);
                          }}
                          data-oid="5gcltxn"
                        >
                          <div
                            className="flex items-start space-x-3"
                            data-oid="o.qahea"
                          >
                            {/* Vehicle Image */}
                            <div
                              className="w-16 h-12 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden"
                              data-oid="no8pyir"
                            >
                              {vehicleImage ? (
                                <img
                                  src={vehicleImage}
                                  alt={model}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    const img = e.target as HTMLImageElement;
                                    const fallback =
                                      img.nextElementSibling as HTMLElement;
                                    img.style.display = "none";
                                    if (fallback)
                                      fallback.style.display = "flex";
                                  }}
                                  data-oid="0nudbq0"
                                />
                              ) : null}
                              <div
                                className={`w-full h-full ${vehicleImage ? "hidden" : "flex"} items-center justify-center bg-gray-200`}
                                data-oid="zhq9vnx"
                              >
                                <Car
                                  className="h-6 w-6 text-gray-400"
                                  data-oid="0oole8g"
                                />
                              </div>
                            </div>

                            {/* Vehicle Info */}
                            <div className="flex-1 min-w-0" data-oid="8ka5fpp">
                              <div
                                className="flex items-center justify-between"
                                data-oid="j7tn9iw"
                              >
                                <div data-oid="_tf367m">
                                  <div
                                    className="font-medium text-gray-800 flex items-center"
                                    data-oid="l.c7evx"
                                  >
                                    {model}
                                    {licensePlate && (
                                      <span
                                        className="text-xs ml-2 text-gray-500 bg-gray-100 px-2 py-0.5 rounded"
                                        data-oid="5fweun4"
                                      >
                                        {licensePlate}
                                      </span>
                                    )}
                                    {newBookingFormData.vehicle?.id ===
                                      vehicle.id && (
                                      <Check
                                        className="h-4 w-4 ml-2 text-gray-600"
                                        data-oid="wrytp8h"
                                      />
                                    )}
                                  </div>

                                  {/* Driver Info */}
                                  <div
                                    className="flex items-center mt-1 text-sm text-gray-600"
                                    data-oid="cghv3un"
                                  >
                                    <div
                                      className="w-6 h-6 bg-gray-200 rounded-full flex-shrink-0 overflow-hidden mr-2"
                                      data-oid="gmtjooi"
                                    >
                                      {driverPhoto ? (
                                        <img
                                          src={driverPhoto}
                                          alt={driverName}
                                          className="w-full h-full object-cover"
                                          data-oid="906zkhu"
                                        />
                                      ) : (
                                        <User
                                          className="h-4 w-4 text-gray-400 m-1"
                                          data-oid="4ymtnd."
                                        />
                                      )}
                                    </div>
                                    <span
                                      className="font-medium"
                                      data-oid="h0lfcjj"
                                    >
                                      {driverName}
                                    </span>
                                    {driverRating > 0 && (
                                      <div
                                        className="ml-2 flex items-center text-xs text-yellow-600"
                                        data-oid="qx.ixrw"
                                      >
                                        ⭐ {driverRating}/5
                                      </div>
                                    )}
                                  </div>

                                  {/* Contact Info */}
                                  {driverPhone && (
                                    <div
                                      className="text-xs text-gray-500 mt-1"
                                      data-oid="6qrx_tr"
                                    >
                                      📞 {driverPhone}
                                    </div>
                                  )}
                                </div>

                                {/* Type Badge & Availability Info */}
                                <div className="text-right" data-oid="ewf55nh">
                                  <span
                                    className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium 
                                  ${availabilityType === "fixed_zone" ? "bg-gray-200 text-purple-800" : "bg-gray-200 text-blue-800"}`}
                                    data-oid="eg99mh4"
                                  >
                                    {availabilityType === "fixed_zone"
                                      ? "Zona Fija"
                                      : "Ruta Flexible"}
                                  </span>

                                  {/* Información de disponibilidad para servicios por horas */}
                                  {(newBookingFormData.service.type ===
                                    "hourly" ||
                                    newBookingFormData.service.type ===
                                      "full_day") &&
                                    vehicle.available_duration && (
                                      <div className="mt-1" data-oid="id711-.">
                                        <div
                                          className="text-xs text-green-600 font-medium flex items-center"
                                          data-oid="qid3oqg"
                                        >
                                          ✓ Disponible por{" "}
                                          {Math.floor(
                                            vehicle.available_duration / 60,
                                          )}
                                          h
                                          {vehicle.available_duration % 60 >
                                            0 &&
                                            ` ${vehicle.available_duration % 60}min`}
                                        </div>
                                        {vehicle.estimated_end_time && (
                                          <div
                                            className="text-xs text-gray-500"
                                            data-oid="xj_l2y4"
                                          >
                                            Hasta las{" "}
                                            {vehicle.estimated_end_time}
                                          </div>
                                        )}
                                      </div>
                                    )}

                                  {distanceKm && (
                                    <div
                                      className="mt-1 text-xs text-gray-500"
                                      data-oid="plfisb6"
                                    >
                                      {distanceKm} km
                                    </div>
                                  )}
                                  {zoneName && (
                                    <div
                                      className="mt-1 text-xs text-gray-500"
                                      data-oid="z:xanlg"
                                    >
                                      Zona: {zoneName}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            ) : (
              <div
                className="text-gray-600 flex items-center text-sm"
                data-oid="5c_a33."
              >
                <AlertCircle className="h-4 w-4 mr-1" data-oid="4s-b7qm" />
                No hay vehículos disponibles en esta ubicación y horario.
              </div>
            )}

            {/* Sección de vehículos con horarios alternativos */}
            {availabilityResults.vehicles_with_alternative_schedules &&
            availabilityResults.vehicles_with_alternative_schedules.length >
              0 ? (
              <div
                className="mt-4 pt-4 border-t border-gray-200"
                data-oid="ff9perj"
              >
                <div
                  className="font-medium text-gray-700 mb-2 flex items-center"
                  data-oid="4eitwhl"
                >
                  <Clock
                    className="h-4 w-4 mr-1 text-amber-500"
                    data-oid="kbdfdir"
                  />
                  Vehículos en zona con horarios alternativos:
                </div>
                <div
                  className="space-y-2 max-h-60 overflow-y-auto"
                  data-oid="jdkqcbf"
                >
                  {availabilityResults.vehicles_with_alternative_schedules.map(
                    (vehicle: any, index: number) => {
                      // const vehicleId = vehicle.id || vehicle.vehicle_id || "Vehículo sin ID";
                      const model =
                        vehicle.model ||
                        vehicle.vehicle_data?.model ||
                        "Vehículo sin modelo";
                      const licensePlate =
                        vehicle.license_plate ||
                        vehicle.vehicle_data?.licensePlate;
                      const driverName =
                        vehicle.driver_name ||
                        vehicle.vehicle_data?.driver?.name ||
                        "Conductor no asignado";
                      const availabilityType =
                        vehicle.availability_type || "flexible_route";
                      const distanceKm = vehicle.distance_km;
                      const zoneName = vehicle.zone_name;
                      const alternativeSlots =
                        vehicle.alternative_time_slots || [];
                      const nextAvailable = vehicle.next_available_time;
                      const unavailableReason = vehicle.unavailable_reason;

                      return (
                        <div
                          key={`alt-${index}`}
                          className="bg-amber-50 rounded-md p-3 border border-amber-200 shadow-sm"
                          data-oid="qmm71c_"
                        >
                          <div
                            className="flex justify-between items-start mb-2"
                            data-oid=":5k-__1"
                          >
                            <div data-oid="wz4nh2r">
                              <div
                                className="font-medium text-gray-800 flex items-center"
                                data-oid="xxilsr8"
                              >
                                {model}
                                {licensePlate && (
                                  <span
                                    className="text-xs ml-1 text-gray-500"
                                    data-oid="dl-0otv"
                                  >
                                    ({licensePlate})
                                  </span>
                                )}
                                <span
                                  className="ml-2 text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded"
                                  data-oid="zijgw4j"
                                >
                                  No disponible ahora
                                </span>
                              </div>
                              <div
                                className="text-xs text-gray-600 flex items-center mt-1"
                                data-oid="7-xyn2r"
                              >
                                <span data-oid="2rp2o2-">{driverName}</span>
                                {distanceKm && (
                                  <span
                                    className="ml-2 text-gray-500"
                                    data-oid="_wapzj_"
                                  >
                                    {distanceKm} km
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="text-xs" data-oid="re7_sk.">
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium 
                              ${availabilityType === "fixed_zone" ? "bg-gray-200 text-purple-800" : "bg-gray-200 text-blue-800"}`}
                                data-oid="fy5r2p:"
                              >
                                {availabilityType === "fixed_zone"
                                  ? "Zona Fija"
                                  : "Ruta Flexible"}
                              </span>
                              {zoneName && (
                                <div
                                  className="mt-1 text-gray-500"
                                  data-oid="xenkvd0"
                                >
                                  Zona: {zoneName}
                                </div>
                              )}
                            </div>
                          </div>

                          {unavailableReason && (
                            <div
                              className="text-xs text-amber-700 mb-2 p-2 bg-amber-100 rounded"
                              data-oid="ncj8cny"
                            >
                              <strong data-oid="30gu77.">Motivo:</strong>{" "}
                              {unavailableReason}
                            </div>
                          )}

                          {nextAvailable && (
                            <div
                              className="text-xs text-green-700 mb-2"
                              data-oid="ginlxcm"
                            >
                              <Clock
                                className="h-3 w-3 inline mr-1"
                                data-oid="b6ywhrq"
                              />
                              <strong data-oid="impxmm9">
                                Próxima disponibilidad:
                              </strong>{" "}
                              {nextAvailable}
                            </div>
                          )}

                          {alternativeSlots.length > 0 && (
                            <div className="text-xs" data-oid="jzwmlrh">
                              <div
                                className="font-medium text-gray-700 mb-1"
                                data-oid="w9jk5vr"
                              >
                                Horarios disponibles hoy:
                              </div>
                              <div
                                className="flex flex-wrap gap-1"
                                data-oid="fdvl2o3"
                              >
                                {alternativeSlots
                                  .slice(0, 3)
                                  .map((slot: any, slotIndex: number) => (
                                    <span
                                      key={slotIndex}
                                      className="bg-gray-200 text-green-800 px-2 py-1 rounded text-xs"
                                      data-oid="nl343eh"
                                    >
                                      {formatTimeSlot(slot)}
                                    </span>
                                  ))}
                                {alternativeSlots.length > 3 && (
                                  <span
                                    className="text-gray-500 text-xs"
                                    data-oid="0.l2pwo"
                                  >
                                    +{alternativeSlots.length - 3} más
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Mensaje cuando no hay horarios alternativos */}
                          {alternativeSlots.length === 0 && (
                            <div
                              className="text-xs bg-gray-200 text-gray-700 p-2 rounded mt-2"
                              data-oid="-luk08m"
                            >
                              <div
                                className="flex items-center"
                                data-oid="xtkw1-e"
                              >
                                <AlertCircle
                                  className="h-3 w-3 mr-1"
                                  data-oid="66h9cf8"
                                />

                                <span
                                  className="font-medium"
                                  data-oid="euk0dzy"
                                >
                                  Sin horarios disponibles para esta fecha
                                </span>
                              </div>
                              <div
                                className="mt-1 text-gray-600"
                                data-oid="zsickcc"
                              >
                                Este conductor no tiene slots libres el{" "}
                                <strong data-oid="h39uw1b">
                                  {newBookingFormData.service.pickup.date}
                                </strong>
                                . Considera cambiar la fecha o contactar
                                directamente.
                              </div>
                            </div>
                          )}

                          <div
                            className="flex justify-between items-center mt-3 pt-2 border-t border-amber-200"
                            data-oid="wg_1okz"
                          >
                            <div
                              className="text-xs text-gray-600"
                              data-oid="m3ygy.u"
                            >
                              💡 Este vehículo trabaja en la zona pero no está
                              disponible en el horario solicitado
                            </div>
                            <div
                              className="flex space-x-1 flex-wrap"
                              data-oid="v3c7479"
                            >
                              <button
                                className="text-xs bg-black text-white px-2 py-1 rounded hover:bg-gray-800 flex items-center"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenContactModal(vehicle);
                                }}
                                data-oid="hk49izp"
                              >
                                <Phone
                                  className="h-3 w-3 mr-1"
                                  data-oid="4z3m_.q"
                                />
                                Llamar
                              </button>
                              <button
                                className="text-xs bg-black text-white px-2 py-1 rounded hover:bg-gray-800"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenSuggestModal(vehicle);
                                }}
                                data-oid="vvf85f1"
                              >
                                Sugerir horario
                              </button>
                              <button
                                className="text-xs bg-orange-600 text-white px-2 py-1 rounded hover:bg-orange-700 flex items-center"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenExtraScheduleModal(vehicle);
                                }}
                                title="Agregar horario extra cuando el conductor acepta trabajar fuera de su horario"
                                data-oid="zkn5e-6"
                              >
                                <Clock
                                  className="h-3 w-3 mr-1"
                                  data-oid="_2ebmk0"
                                />
                                + Horario extra
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
                <div
                  className="mt-2 text-xs text-gray-600 bg-gray-100 p-2 rounded"
                  data-oid="3-76wkw"
                >
                  <strong data-oid="dv7omo-">Consejo:</strong> Estos vehículos
                  están en la zona pero ocupados. Considera contactar al
                  conductor para verificar disponibilidad de última hora o
                  sugerir un horario alternativo al cliente.
                </div>

                {/* Mensaje cuando ningún vehículo alternativo tiene horarios disponibles */}
                {availabilityResults.vehicles_with_alternative_schedules &&
                  availabilityResults.vehicles_with_alternative_schedules.every(
                    (vehicle: any) =>
                      !vehicle.alternative_time_slots ||
                      vehicle.alternative_time_slots.length === 0,
                  ) && (
                    <div
                      className="mt-3 bg-orange-50 border border-orange-200 rounded p-3"
                      data-oid="vlugkma"
                    >
                      <div className="flex items-start" data-oid="rdtehhm">
                        <AlertCircle
                          className="h-4 w-4 text-gray-500 mr-2 mt-0.5"
                          data-oid="5n_vxfi"
                        />

                        <div className="text-sm" data-oid="0fdb.yr">
                          <p
                            className="font-medium text-orange-800 mb-1"
                            data-oid="t8g15ow"
                          >
                            Vehículos encontrados pero sin horarios disponibles
                          </p>
                          <p className="text-orange-700" data-oid="n_3.17m">
                            Se encontraron{" "}
                            {
                              availabilityResults
                                .vehicles_with_alternative_schedules.length
                            }{" "}
                            vehículo(s) en la zona, pero ninguno tiene
                            disponibilidad para el{" "}
                            <strong data-oid="jq9vkyp">
                              {newBookingFormData.service.pickup.date}
                            </strong>
                            .
                          </p>
                          <p
                            className="text-gray-600 mt-2 text-xs"
                            data-oid="krwk:zs"
                          >
                            💡 <strong data-oid="pey:0l8">Sugerencia:</strong>{" "}
                            Prueba cambiar la fecha o contacta directamente a
                            los conductores para consultar disponibilidad
                            especial.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            ) : (
              // Mostrar mensaje específico cuando no hay vehículos disponibles ni horarios alternativos
              availabilityResults.total_vehicles_found === 0 &&
              (!availabilityResults.vehicles_with_alternative_schedules ||
                availabilityResults.vehicles_with_alternative_schedules
                  .length === 0) && (
                <div
                  className="mt-4 pt-4 border-t border-gray-200"
                  data-oid="z:n3kmg"
                >
                  <div
                    className="bg-gray-100 border border-gray-200 rounded-md p-4"
                    data-oid="7nukfkq"
                  >
                    <div className="flex items-start" data-oid="-tk._26">
                      <div className="flex-shrink-0" data-oid="iw3gri0">
                        <AlertCircle
                          className="h-5 w-5 text-gray-400"
                          data-oid=".3x84lv"
                        />
                      </div>
                      <div className="ml-3" data-oid="mfjmw1c">
                        <h3
                          className="text-sm font-medium text-gray-800 mb-2"
                          data-oid="k7jma07"
                        >
                          Sin disponibilidad para esta fecha
                        </h3>
                        <div
                          className="text-sm text-gray-700 space-y-2"
                          data-oid="nb79yiq"
                        >
                          <p data-oid="715l3k8">
                            No hay vehículos disponibles para{" "}
                            <strong data-oid="0i-55yj">
                              {newBookingFormData.service.pickup.date}
                            </strong>
                            {newBookingFormData.service.pickup.time && (
                              <span data-oid="_lxnbz0">
                                {" "}
                                a las{" "}
                                <strong data-oid="n3_sosa">
                                  {newBookingFormData.service.pickup.time}
                                </strong>
                              </span>
                            )}{" "}
                            en la ubicación seleccionada.
                          </p>
                          <div
                            className="bg-gray-200 rounded p-3 mt-3"
                            data-oid="_a1rivm"
                          >
                            <p
                              className="font-medium text-gray-800 mb-1"
                              data-oid=".zam2ps"
                            >
                              💡 Recomendaciones:
                            </p>
                            <ul
                              className="text-sm space-y-1 list-disc list-inside"
                              data-oid="r8iwzgi"
                            >
                              <li data-oid="t:sqg58">
                                Selecciona una{" "}
                                <strong data-oid="8c57of_">
                                  fecha diferente
                                </strong>
                              </li>
                              <li data-oid="_l4ifjg">
                                Prueba con un{" "}
                                <strong data-oid="4vm57te">
                                  horario diferente
                                </strong>{" "}
                                (mañana o tarde)
                              </li>
                              <li data-oid="kuz139l">
                                Considera una{" "}
                                <strong data-oid="nbhkbzz">
                                  ubicación cercana
                                </strong>{" "}
                                diferente
                              </li>
                            </ul>
                          </div>
                          <div
                            className="bg-gray-100 border border-blue-200 rounded p-3 mt-3"
                            data-oid="1boe2h8"
                          >
                            <p
                              className="text-blue-800 text-xs"
                              data-oid=".ecp:ar"
                            >
                              <span className="font-medium" data-oid="b42g1a_">
                                📞 ¿Urgente?
                              </span>{" "}
                              Contacta a nuestro equipo de soporte para
                              verificar disponibilidad de última hora o explorar
                              opciones especiales.
                            </p>
                          </div>

                          {/* Sección de fechas alternativas */}
                          {newBookingFormData.service.pickup.date && (
                            <div
                              className="bg-green-50 border border-green-200 rounded p-3 mt-3"
                              data-oid="994fp-:"
                            >
                              <p
                                className="font-medium text-green-800 mb-2"
                                data-oid="7s.32y:"
                              >
                                📅 Prueba estas fechas cercanas:
                              </p>
                              <div
                                className="grid grid-cols-2 gap-2"
                                data-oid="dk.bdi3"
                              >
                                {generateAlternativeDates(
                                  newBookingFormData.service.pickup.date,
                                )
                                  .slice(0, 6)
                                  .map((altDate) => (
                                    <button
                                      key={altDate.date}
                                      type="button"
                                      onClick={() =>
                                        handleSelectAlternativeDate(
                                          altDate.date,
                                        )
                                      }
                                      className="text-xs bg-white border border-green-300 rounded px-2 py-1.5 hover:bg-gray-200 hover:border-green-400 transition-colors text-left"
                                      data-oid="_lghtax"
                                    >
                                      <div
                                        className="font-medium text-green-800"
                                        data-oid=".vys.7l"
                                      >
                                        {altDate.label}
                                      </div>
                                      <div
                                        className="text-green-600 capitalize"
                                        data-oid="74jmoik"
                                      >
                                        {altDate.dayOfWeek}
                                      </div>
                                    </button>
                                  ))}
                              </div>
                              <p
                                className="text-green-700 text-xs mt-2"
                                data-oid="ub0l0mj"
                              >
                                Haz clic en cualquier fecha para verificar
                                disponibilidad automáticamente
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}

            {availabilityResults.message && (
              <div className="mt-2 text-gray-500 text-xs" data-oid="lxj8.ma">
                {availabilityResults.message}
              </div>
            )}
          </div>
        )}

        {/* Mensaje informativo sobre verificación automática */}
        {!isCheckingAvailability && !availabilityResults && (
          <div
            className="bg-gray-50 rounded-md p-3 text-xs text-gray-600"
            data-oid="9ke98af"
          >
            <div className="flex items-center" data-oid="cfhoc1m">
              <span className="text-black mr-2" data-oid="u2z9-j4">
                ℹ️
              </span>
              La disponibilidad se verifica automáticamente cuando completas la
              ubicación, fecha y hora.
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-4 mb-4" data-oid="qv1v3tx">
        <h3
          className="text-sm font-semibold text-gray-700 mb-3"
          data-oid="hlgy27."
        >
          Vehículo seleccionado
        </h3>
        {newBookingFormData.vehicle?.id ? (
          <div
            className={`rounded-md p-3 border ${
              wasVehicleSelectedByExtraSchedule
                ? "bg-emerald-50 border-emerald-200"
                : "bg-green-50 border-green-200"
            }`}
            data-oid="feibgkx"
          >
            {wasVehicleSelectedByExtraSchedule && (
              <div
                className="mb-2 flex items-center text-emerald-700 text-xs"
                data-oid="wqusvo."
              >
                <Clock className="h-3 w-3 mr-1" data-oid="8ief:an" />
                <span className="font-medium" data-oid="w81u8mf">
                  ✨ Conductor aceptó horario extra
                </span>
              </div>
            )}
            <div className="font-medium text-gray-800" data-oid="38jdoaj">
              {newBookingFormData.vehicle.name}
            </div>
            <div className="text-sm text-gray-600 mt-1" data-oid="tl3yyla">
              Conductor:{" "}
              {newBookingFormData.driver?.name || "Pendiente de asignar"}
            </div>
            {wasVehicleSelectedByExtraSchedule && (
              <div className="text-xs text-emerald-600 mt-1" data-oid="pt4pct-">
                Este conductor ha aceptado trabajar fuera de su horario habitual
                para atender esta solicitud.
              </div>
            )}
            <div className="flex justify-end mt-3" data-oid="ag7ma87">
              <button
                type="button"
                className="text-xs text-gray-600 hover:text-gray-800"
                onClick={
                  handleClearVehicleSelection ||
                  (() => {
                    handleFormChange("vehicle", "id", "");
                    handleFormChange("vehicle", "name", "");
                    handleFormChange("driver", "id", "");
                    handleFormChange("driver", "name", "");
                  })
                }
                data-oid="p3gisrl"
              >
                Eliminar selección
              </button>
            </div>
          </div>
        ) : (
          <div
            className="text-sm text-amber-600 flex items-center p-3 bg-amber-50 rounded-md border border-amber-200"
            data-oid="p1kkgah"
          >
            <AlertCircle className="h-4 w-4 mr-2" data-oid="3kif-xl" />
            No has seleccionado ningún vehículo. Te recomendamos volver al paso
            anterior y seleccionar uno.
          </div>
        )}
      </div>

      {hasSelectedVehicle && (
        <div className="border-t border-gray-200 pt-4 mb-4" data-oid="b.n_a1j">
          <div
            className="flex justify-between items-center mb-3"
            data-oid="2:i0h-g"
          >
            <h3
              className="text-sm font-semibold text-gray-700"
              data-oid="ghvc8nn"
            >
              Cálculo de tarifa
            </h3>
            {canCalculatePrice && (
              <Button
                size="sm"
                variant="outline"
                disabled={!canCalculatePrice?.() || isCalculatingPrice}
                onClick={handleCalculatePrice}
                className="text-xs flex items-center"
                data-oid="a4v:1up"
              >
                <DollarSign className="h-3.5 w-3.5 mr-1" data-oid=".f8r6e4" />
                {hasPriceCalculated ? "Recalcular precio" : "Calcular precio"}
              </Button>
            )}
          </div>

          {isCalculatingPrice && (
            <div
              className="bg-gray-100 rounded-md p-3 flex items-center text-sm text-blue-700"
              data-oid="y54wn5f"
            >
              <div
                className="animate-spin h-4 w-4 border-2 border-blue-600 rounded-full border-t-transparent mr-2"
                data-oid="j9ls4br"
              ></div>
              Calculando tarifa según la distancia...
            </div>
          )}

          {hasSelectedVehicle &&
            !newBookingFormData.service.dropoff.location &&
            !isCalculatingPrice && (
              <div
                className="bg-amber-50 rounded-md p-3 text-sm text-amber-700 flex items-center"
                data-oid="wn_jutd"
              >
                <MapPin className="h-4 w-4 mr-2" data-oid="09g9s7d" />
                Para calcular la tarifa, seleccione primero una dirección de
                destino.
              </div>
            )}

          {hasPriceCalculated && !isCalculatingPrice && (
            <div
              className="bg-white rounded-md border border-green-200 p-3 text-sm"
              data-oid="dn5zbe9"
            >
              <div
                className="font-medium text-gray-700 mb-2 flex items-center justify-between"
                data-oid="vjwdp2n"
              >
                <div className="flex items-center" data-oid="yigf_jp">
                  <DollarSign
                    className="h-4 w-4 mr-1 text-green-600"
                    data-oid="s5g::w4"
                  />
                  Tarifa calculada:
                </div>
                {/* Indicador de que el precio puede necesitar recalcularse */}
                <div
                  className="text-xs text-amber-600 flex items-center"
                  data-oid=":ux_h1o"
                >
                  <AlertCircle className="h-3 w-3 mr-1" data-oid="e.wh4c4" />
                  <span data-oid="p1pwxi4">
                    Los precios pueden cambiar si modificas origen, destino o
                    tipo de servicio
                  </span>
                </div>
              </div>

              <div
                className="bg-gray-50 p-2 rounded-md mb-3"
                data-oid="sny6w.8"
              >
                <div
                  className="grid grid-cols-2 gap-2 text-xs"
                  data-oid="2pqwwmb"
                >
                  <div data-oid="cv41nkf">
                    <span className="text-gray-500" data-oid="j7u0igz">
                      Distancia:
                    </span>
                    <span className="ml-1 font-medium" data-oid="r4ztytb">
                      {newBookingFormData.payment.priceBreakdown
                        .is_round_trip ? (
                        <>
                          {priceCalculationService.formatDistance(
                            newBookingFormData.payment.priceBreakdown
                              .total_distance_km,
                          )}
                          <span
                            className="text-xs text-gray-400 block"
                            data-oid="nbn5bvr"
                          >
                            (
                            {priceCalculationService.formatDistance(
                              newBookingFormData.payment.priceBreakdown
                                .one_way_distance_km || 0,
                            )}{" "}
                            × 2)
                          </span>
                        </>
                      ) : (
                        priceCalculationService.formatDistance(
                          newBookingFormData.payment.priceBreakdown
                            .total_distance_km,
                        )
                      )}
                    </span>
                  </div>
                  <div data-oid="gldu4_y">
                    <span className="text-gray-500" data-oid="bv3_.83">
                      Tiempo estimado:
                    </span>
                    <span className="ml-1 font-medium" data-oid="qoiixxm">
                      {formatDuration(
                        newBookingFormData.payment.routeInfo.duration,
                      )}
                      {newBookingFormData.payment.priceBreakdown
                        .is_round_trip && (
                        <span
                          className="text-xs text-gray-400 block"
                          data-oid=".3gpwi6"
                        >
                          (Solo ida, vuelta similar)
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-1 mb-3" data-oid="qsoxk-c">
                <div
                  className="flex justify-between text-xs"
                  data-oid="._yrktv"
                >
                  <span className="text-gray-500" data-oid="pyqjhy:">
                    Tarifa base:
                  </span>
                  <span data-oid="x5liytg">
                    {priceCalculationService.formatPrice(
                      newBookingFormData.payment.priceBreakdown.base_fare,
                    )}
                  </span>
                </div>
                <div
                  className="flex justify-between text-xs"
                  data-oid="o_04yp4"
                >
                  <span className="text-gray-500" data-oid="r_m2awa">
                    Cargo por distancia
                    {newBookingFormData.payment.priceBreakdown.is_round_trip &&
                      " (ida y vuelta)"}
                    :
                  </span>
                  <span data-oid="8_0ukz8">
                    {priceCalculationService.formatPrice(
                      newBookingFormData.payment.priceBreakdown.distance_charge,
                    )}
                    {newBookingFormData.payment.priceBreakdown
                      .is_round_trip && (
                      <div className="text-xs text-gray-400" data-oid="ocg1i8x">
                        {priceCalculationService.formatDistance(
                          newBookingFormData.payment.priceBreakdown
                            .total_distance_km,
                        )}{" "}
                        total
                      </div>
                    )}
                  </span>
                </div>
                <div
                  className="flex justify-between text-xs font-medium pt-1 border-t border-gray-100"
                  data-oid="dh2l7k5"
                >
                  <span data-oid="ax1w_:r">Subtotal:</span>
                  <span data-oid="9l8z:le">
                    {priceCalculationService.formatPrice(
                      newBookingFormData.payment.priceBreakdown.subtotal,
                    )}
                  </span>
                </div>
                <div
                  className="flex justify-between text-xs"
                  data-oid="6kne:av"
                >
                  <span className="text-gray-500" data-oid="um2z1lo">
                    IVA (
                    {newBookingFormData.payment.priceBreakdown.tax_percentage}
                    %):
                  </span>
                  <span data-oid="0ihipwk">
                    {priceCalculationService.formatPrice(
                      newBookingFormData.payment.priceBreakdown.tax_amount,
                    )}
                  </span>
                </div>
                <div
                  className="flex justify-between font-bold pt-1 border-t border-gray-200"
                  data-oid="gfhce2w"
                >
                  <span data-oid="8coeyle">TOTAL:</span>
                  <span className="text-gray-600" data-oid="35sniuh">
                    {priceCalculationService.formatPrice(
                      newBookingFormData.payment.priceBreakdown.total,
                    )}
                  </span>
                </div>
              </div>

              <div className="text-xs text-gray-500" data-oid="6hodawf">
                {newBookingFormData.payment.priceBreakdown.is_round_trip && (
                  <div
                    className="mb-2 p-2 bg-gray-100 rounded border-l-4 border-blue-400"
                    data-oid="9ec9dbs"
                  >
                    <strong data-oid="kd-iy8j">Viaje de ida y vuelta:</strong>{" "}
                    El precio incluye tanto el trayecto de ida como el de
                    vuelta. La distancia total calculada es de{" "}
                    {priceCalculationService.formatDistance(
                      newBookingFormData.payment.priceBreakdown
                        .total_distance_km,
                    )}
                    .
                  </div>
                )}
                Los precios incluyen todos los impuestos aplicables. El precio
                final puede variar ligeramente en función de cambios en la ruta
                o tiempo de espera adicional.
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-between mt-6" data-oid="wdsvnag">
        <Button
          variant="outline"
          onClick={() => setActiveTab("client")}
          className="text-sm"
          data-oid="ryt33ji"
        >
          Anterior: Cliente
        </Button>
        <Button
          className="bg-black hover:bg-gray-800 text-sm"
          onClick={() => handleNextTab("service")}
          disabled={hasSelectedVehicle && !hasPriceCalculated}
          data-oid="7:ts2id"
        >
          Siguiente: Detalles
        </Button>
      </div>

      {/* Modales */}
      <ContactDriverModal
        isOpen={contactModalOpen}
        onClose={handleCloseContactModal}
        vehicle={selectedVehicleForAction}
        pickupDate={`${newBookingFormData.service.pickup.date} ${newBookingFormData.service.pickup.time}`}
        pickupLocation={newBookingFormData.service.pickup.location}
        onContactLogged={handleContactLogged}
        data-oid="ypi9hn7"
      />

      <SuggestScheduleModal
        isOpen={suggestModalOpen}
        onClose={handleCloseSuggestModal}
        vehicle={selectedVehicleForAction}
        originalPickupDate={`${newBookingFormData.service.pickup.date}T${newBookingFormData.service.pickup.time}`}
        pickupLocation={newBookingFormData.service.pickup.location}
        dropoffLocation={newBookingFormData.service.dropoff.location}
        clientId={newBookingFormData.client.id}
        onSuggestionCreated={handleSuggestionCreated}
        data-oid="va9xd2o"
      />

      <AddExtraScheduleModal
        isOpen={extraScheduleModalOpen}
        onClose={handleCloseExtraScheduleModal}
        vehicle={selectedVehicleForAction}
        originalPickupDate={`${newBookingFormData.service.pickup.date}T${newBookingFormData.service.pickup.time}`}
        originalPickupTime={newBookingFormData.service.pickup.time}
        pickupLocation={newBookingFormData.service.pickup.location}
        dropoffLocation={newBookingFormData.service.dropoff.location}
        clientId={newBookingFormData.client.id}
        onExtraScheduleCreated={handleExtraScheduleCreated}
        data-oid="ci:g6le"
      />
    </div>
  );
};

export default ServiceTab;
