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
    <div className="mt-4" data-oid="e1n27lb">
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4"
        data-oid=".uxo-38"
      >
        <div data-oid="yufto:_">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            data-oid="ve1bnoh"
          >
            Tipo de servicio
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            value={newBookingFormData.service.type}
            onChange={(e) =>
              handleFormChange("service", "type", e.target.value)
            }
            data-oid="ivsz5jm"
          >
            <option value="one_way" data-oid="tpl45ep">
              Un trayecto
            </option>
            <option value="round_trip" data-oid="6ae7xrf">
              Ida y vuelta
            </option>
            <option value="hourly" data-oid="bnndhs2">
              Por horas
            </option>
            <option value="full_day" data-oid="pbk9kca">
              Día completo
            </option>
          </select>
        </div>

        {(newBookingFormData.service.type === "hourly" ||
          newBookingFormData.service.type === "full_day") && (
          <div data-oid="663pab-">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              data-oid="rkn.uya"
            >
              Duración
              {newBookingFormData.service.type === "hourly" && (
                <span className="text-xs text-gray-500 ml-1" data-oid="f4u0qsw">
                  (mínimo 1 hora)
                </span>
              )}
            </label>
            <div className="space-y-2" data-oid="6xw72uf">
              {/* Opciones predefinidas */}
              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-2"
                data-oid="5oorcq3"
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
                    data-oid="0pxr4_:"
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {/* Campo personalizado */}
              <div className="flex items-center space-x-2" data-oid="ts4xo7n">
                <span className="text-xs text-gray-500" data-oid="ce63y3k">
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
                  data-oid="eexp4zv"
                />

                <span className="text-xs text-gray-500" data-oid="m.o6--:">
                  min
                </span>
              </div>
            </div>
            {validationErrors["service.duration"] && (
              <p className="text-black text-xs mt-1" data-oid=":ayi0wy">
                {validationErrors["service.duration"]}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-4 mb-4" data-oid="se5a0k6">
        <h3
          className="text-sm font-semibold text-gray-700 mb-3"
          data-oid="k5xkm6f"
        >
          Tipo de ruta
        </h3>
        <div className="flex space-x-4 mb-4" data-oid="fvx1aj7">
          <label className="inline-flex items-center" data-oid="l4eqbsx">
            <input
              type="radio"
              className="form-radio text-gray-600"
              checked={routeType === "flexible"}
              onChange={() => handleRouteTypeChange("flexible")}
              data-oid="huem0v6"
            />

            <span className="ml-2 text-sm" data-oid="aeaugr.">
              Ruta flexible
            </span>
          </label>
          <label className="inline-flex items-center" data-oid="bsak_p6">
            <input
              type="radio"
              className="form-radio text-gray-600"
              checked={routeType === "fixed"}
              onChange={() => handleRouteTypeChange("fixed")}
              data-oid="ya0rni4"
            />

            <span className="ml-2 text-sm" data-oid="8ts4_0t">
              Ruta fija
            </span>
          </label>
        </div>

        {routeType === "fixed" && (
          <div className="mb-4" data-oid="7fa16ou">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              data-oid="ho.sii."
            >
              Buscar ruta fija
            </label>
            <div className="relative" data-oid="e6wc51h">
              <div className="relative rounded-md shadow-sm" data-oid="3fu39.k">
                <div
                  className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  data-oid="dfxgm3n"
                >
                  <Search
                    className="h-4 w-4 text-gray-400"
                    data-oid="x8_fw18"
                  />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="Busca por nombre, origen o destino..."
                  onChange={(e) => handleSearchFixedRoutes(e.target.value)}
                  data-oid="zwlo84u"
                />

                {isSearchingRoutes && (
                  <div
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    data-oid="38.0-j2"
                  >
                    <div
                      className="animate-spin h-4 w-4 border-2 border-red-600 rounded-full border-t-transparent"
                      data-oid="my315:."
                    ></div>
                  </div>
                )}
              </div>

              {routeSearchResults.length > 0 && (
                <div
                  className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-y-auto"
                  data-oid="pxnftza"
                >
                  {routeSearchResults.map((route: FixedRoute) => (
                    <div
                      key={route._id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-0"
                      onClick={() => handleSelectFixedRoute(route)}
                      data-oid="9w:qg7o"
                    >
                      <div className="font-medium" data-oid="er:r0es">
                        {route.name}
                      </div>
                      <div className="text-sm text-gray-500" data-oid="4pe0ri3">
                        <div data-oid="1zi15ho">
                          Origen: {route.origin.name}
                        </div>
                        <div data-oid="qw4q3wc">
                          Destino: {route.destination.name}
                        </div>
                      </div>
                      <div
                        className="text-xs text-gray-400 mt-1"
                        data-oid="7vp._dx"
                      >
                        Distancia: {route.distance}km • Tiempo estimado:{" "}
                        {route.estimatedTime}min
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {routeSearchResults.length === 0 && !isSearchingRoutes && (
                <div className="text-sm text-gray-500 mt-2" data-oid="_3oyj77">
                  No se encontraron rutas que coincidan con tu búsqueda.
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2" data-oid="ug10f8f">
              Al seleccionar una ruta fija, los campos de origen y destino se
              autocompletarán automáticamente.
            </p>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-4 mb-4" data-oid="hogxnew">
        <h3
          className="text-sm font-semibold text-gray-700 mb-3"
          data-oid=".zqb46v"
        >
          Información de recogida
        </h3>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          data-oid="78zdc9y"
        >
          <div data-oid=":valdpl">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              data-oid="r4r50-3"
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
              data-oid="zgnx9.u"
            />

            {validationErrors["service.pickup.date"] && (
              <p className="text-black text-xs mt-1" data-oid="i8566nd">
                {validationErrors["service.pickup.date"]}
              </p>
            )}
          </div>
          <div data-oid="6rdr4lg">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              data-oid="zwkp_33"
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
              data-oid="8juuguc"
            />

            {validationErrors["service.pickup.time"] && (
              <p className="text-black text-xs mt-1" data-oid="bdm5-4b">
                {validationErrors["service.pickup.time"]}
              </p>
            )}
          </div>
        </div>
        <div className="mt-3" data-oid="9nvl36v">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            data-oid="kul.q7s"
          >
            Lugar de recogida
          </label>
          <div className="relative" ref={pickupDropdownRef} data-oid="rcvvc_a">
            <div className="relative rounded-md shadow-sm" data-oid="of2ho0:">
              <div
                className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                data-oid="spmmp70"
              >
                <Search className="h-4 w-4 text-gray-400" data-oid="thk0hzr" />
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
                data-oid="tk816ap"
              />

              {isSearchingPickupAddress && (
                <div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  data-oid="3f8xlg7"
                >
                  <div
                    className="animate-spin h-4 w-4 border-2 border-red-600 rounded-full border-t-transparent"
                    data-oid="8x_2ie_"
                  ></div>
                </div>
              )}
            </div>

            {showPickupDropdown && pickupAddressResults.length > 0 && (
              <div
                className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-y-auto"
                data-oid="7hlnmeb"
              >
                {pickupAddressResults.map((address, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-0"
                    onClick={() => handlePickupSelect(address)}
                    data-oid=".1_sy9g"
                  >
                    <div className="text-sm" data-oid="r2650pa">
                      {address.description}
                    </div>
                    {address.structured_formatting && (
                      <div
                        className="text-xs text-gray-500 mt-1"
                        data-oid="o9u3nsw"
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
            <p className="text-black text-xs mt-1" data-oid="6dwt7lp">
              {validationErrors["service.pickup.location"]}
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 mb-4" data-oid="5a:.qnu">
        <h3
          className="text-sm font-semibold text-gray-700 mb-3"
          data-oid="d-i8rl0"
        >
          Información de destino
        </h3>
        <div className="mt-3" data-oid="o_jvyhh">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            data-oid="_y.wh5v"
          >
            Lugar de destino{" "}
            {hasSelectedVehicle &&
              !newBookingFormData.service.dropoff.location && (
                <span className="text-black" data-oid="28gc9yg">
                  *
                </span>
              )}
          </label>
          <div className="relative" ref={dropoffDropdownRef} data-oid="vkuof3f">
            <div className="relative rounded-md shadow-sm" data-oid="fd3owtu">
              <div
                className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                data-oid="gjt944y"
              >
                <Search className="h-4 w-4 text-gray-400" data-oid="qxt:ep2" />
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
                data-oid="skoel3t"
              />

              {isSearchingDropoffAddress && (
                <div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  data-oid="85el2ov"
                >
                  <div
                    className="animate-spin h-4 w-4 border-2 border-red-600 rounded-full border-t-transparent"
                    data-oid="bn5-6-r"
                  ></div>
                </div>
              )}
            </div>

            {showDropoffDropdown && dropoffAddressResults.length > 0 && (
              <div
                className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-y-auto"
                data-oid="6m.4h39"
              >
                {dropoffAddressResults.map((address, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-0"
                    onClick={() => handleDropoffSelect(address)}
                    data-oid="gx6kdi:"
                  >
                    <div className="text-sm" data-oid="l7owjqy">
                      {address.description}
                    </div>
                    {address.structured_formatting && (
                      <div
                        className="text-xs text-gray-500 mt-1"
                        data-oid="epaw6an"
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
            <p className="text-black text-xs mt-1" data-oid="hwvyr4d">
              {validationErrors["service.dropoff.location"]}
            </p>
          )}
          {hasSelectedVehicle &&
            !newBookingFormData.service.dropoff.location && (
              <p className="text-black text-xs mt-1" data-oid="jhn.lxz">
                <AlertCircle
                  className="h-3.5 w-3.5 inline mr-1"
                  data-oid="ane5sav"
                />
                Debe seleccionar un destino para calcular el precio del viaje
              </p>
            )}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 mb-4" data-oid="n.of.rm">
        <div
          className="flex justify-between items-center mb-3"
          data-oid="e0x-9v4"
        >
          <h3
            className="text-sm font-semibold text-gray-700"
            data-oid="l_0m0mz"
          >
            Verificación de disponibilidad
          </h3>
          <div className="flex items-center space-x-2" data-oid=".tfroyz">
            {/* Indicador de verificación automática */}
            <span
              className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-md border border-green-200"
              data-oid="yna77-."
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
              data-oid="a9d_0k_"
            >
              <Car className="h-3.5 w-3.5 mr-1" data-oid="p3f4c13" />
              {isCheckingAvailability ? "Verificando..." : "Verificar ahora"}
            </Button>
          </div>
        </div>

        {isCheckingAvailability && (
          <div
            className="bg-gray-100 rounded-md p-3 flex items-center text-sm text-blue-700 mb-3"
            data-oid="h9-a6oy"
          >
            <div
              className="animate-spin h-4 w-4 border-2 border-blue-600 rounded-full border-t-transparent mr-2"
              data-oid="rmw_ob7"
            ></div>
            Verificando disponibilidad de vehículos automáticamente...
          </div>
        )}

        {availabilityResults && !isCheckingAvailability && (
          <div className="bg-gray-50 rounded-md p-3 text-sm" data-oid="tkuw2w.">
            <div className="font-medium text-gray-700 mb-2" data-oid="bdnshgn">
              Resumen de disponibilidad:
            </div>

            {/* Info de duración solicitada */}
            {(newBookingFormData.service.type === "hourly" ||
              newBookingFormData.service.type === "full_day") &&
              newBookingFormData.service.duration && (
                <div
                  className="mb-3 p-2 bg-gray-100 rounded-md border border-blue-200"
                  data-oid="a6ruic3"
                >
                  <div
                    className="text-xs text-blue-700 font-medium"
                    data-oid="oo-e9zh"
                  >
                    Duración solicitada:{" "}
                    {Math.floor(newBookingFormData.service.duration / 60)}h{" "}
                    {newBookingFormData.service.duration % 60 > 0 &&
                      `${newBookingFormData.service.duration % 60}min`}
                    <span className="ml-2 text-gray-600" data-oid=".jkznsx">
                      ({newBookingFormData.service.duration} minutos)
                    </span>
                  </div>
                </div>
              )}

            <div
              className="grid grid-cols-2 gap-3 mb-3 text-xs"
              data-oid="ja0e-dl"
            >
              <div data-oid="61gbo.e">
                <span className="text-gray-500" data-oid="t63hinr">
                  Vehículos encontrados:
                </span>
                <span className="ml-1 font-medium" data-oid="vz6z-vd">
                  {availabilityResults.total_vehicles_found}
                </span>
              </div>
              <div data-oid="knf_40_">
                <span className="text-gray-500" data-oid="a98usr8">
                  En zonas fijas:
                </span>
                <span className="ml-1 font-medium" data-oid="rg-48ui">
                  {availabilityResults.fixed_zone_count}
                </span>
              </div>
              <div data-oid="v0p8_tc">
                <span className="text-gray-500" data-oid="3fm4o-l">
                  En rutas flexibles:
                </span>
                <span className="ml-1 font-medium" data-oid="iojbv6c">
                  {availabilityResults.flexible_route_count}
                </span>
              </div>
            </div>

            {availabilityResults.available_vehicles &&
            availabilityResults.available_vehicles.length > 0 ? (
              <div data-oid="wm07q10">
                <div
                  className="font-medium text-gray-700 mb-2"
                  data-oid="0nag-e0"
                >
                  Vehículos disponibles:
                </div>
                <div
                  className="space-y-2 max-h-60 overflow-y-auto"
                  data-oid="aqw565m"
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
                          data-oid="2dtuncm"
                        >
                          <div
                            className="flex items-start space-x-3"
                            data-oid="2k.yne0"
                          >
                            {/* Vehicle Image */}
                            <div
                              className="w-16 h-12 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden"
                              data-oid="vgcal7u"
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
                                  data-oid="b25y:ca"
                                />
                              ) : null}
                              <div
                                className={`w-full h-full ${vehicleImage ? "hidden" : "flex"} items-center justify-center bg-gray-200`}
                                data-oid="z1-7iu3"
                              >
                                <Car
                                  className="h-6 w-6 text-gray-400"
                                  data-oid="q-hw8y_"
                                />
                              </div>
                            </div>

                            {/* Vehicle Info */}
                            <div className="flex-1 min-w-0" data-oid="kshhtel">
                              <div
                                className="flex items-center justify-between"
                                data-oid="pcxtuja"
                              >
                                <div data-oid="h4_b70y">
                                  <div
                                    className="font-medium text-gray-800 flex items-center"
                                    data-oid="ls.hjui"
                                  >
                                    {model}
                                    {licensePlate && (
                                      <span
                                        className="text-xs ml-2 text-gray-500 bg-gray-100 px-2 py-0.5 rounded"
                                        data-oid="1-em08c"
                                      >
                                        {licensePlate}
                                      </span>
                                    )}
                                    {newBookingFormData.vehicle?.id ===
                                      vehicle.id && (
                                      <Check
                                        className="h-4 w-4 ml-2 text-gray-600"
                                        data-oid="4joj991"
                                      />
                                    )}
                                  </div>

                                  {/* Driver Info */}
                                  <div
                                    className="flex items-center mt-1 text-sm text-gray-600"
                                    data-oid="t7of9rx"
                                  >
                                    <div
                                      className="w-6 h-6 bg-gray-200 rounded-full flex-shrink-0 overflow-hidden mr-2"
                                      data-oid="fy27l7l"
                                    >
                                      {driverPhoto ? (
                                        <img
                                          src={driverPhoto}
                                          alt={driverName}
                                          className="w-full h-full object-cover"
                                          data-oid="8.67uqy"
                                        />
                                      ) : (
                                        <User
                                          className="h-4 w-4 text-gray-400 m-1"
                                          data-oid="ett94fx"
                                        />
                                      )}
                                    </div>
                                    <span
                                      className="font-medium"
                                      data-oid=":jhbmpi"
                                    >
                                      {driverName}
                                    </span>
                                    {driverRating > 0 && (
                                      <div
                                        className="ml-2 flex items-center text-xs text-yellow-600"
                                        data-oid="ml_nt9w"
                                      >
                                        ⭐ {driverRating}/5
                                      </div>
                                    )}
                                  </div>

                                  {/* Contact Info */}
                                  {driverPhone && (
                                    <div
                                      className="text-xs text-gray-500 mt-1"
                                      data-oid="-x9kfgx"
                                    >
                                      📞 {driverPhone}
                                    </div>
                                  )}
                                </div>

                                {/* Type Badge & Availability Info */}
                                <div className="text-right" data-oid="h64v7zo">
                                  <span
                                    className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium 
                                  ${availabilityType === "fixed_zone" ? "bg-gray-200 text-purple-800" : "bg-gray-200 text-blue-800"}`}
                                    data-oid="5mj7wom"
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
                                      <div className="mt-1" data-oid="2-jpmb4">
                                        <div
                                          className="text-xs text-green-600 font-medium flex items-center"
                                          data-oid="044tchw"
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
                                            data-oid="_yba5bk"
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
                                      data-oid=":fobqn0"
                                    >
                                      {distanceKm} km
                                    </div>
                                  )}
                                  {zoneName && (
                                    <div
                                      className="mt-1 text-xs text-gray-500"
                                      data-oid="-bh7pdc"
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
                data-oid="kw-.yjh"
              >
                <AlertCircle className="h-4 w-4 mr-1" data-oid="dc_dldz" />
                No hay vehículos disponibles en esta ubicación y horario.
              </div>
            )}

            {/* Sección de vehículos con horarios alternativos */}
            {availabilityResults.vehicles_with_alternative_schedules &&
            availabilityResults.vehicles_with_alternative_schedules.length >
              0 ? (
              <div
                className="mt-4 pt-4 border-t border-gray-200"
                data-oid="y:tnjhm"
              >
                <div
                  className="font-medium text-gray-700 mb-2 flex items-center"
                  data-oid="j0thong"
                >
                  <Clock
                    className="h-4 w-4 mr-1 text-amber-500"
                    data-oid="j3mqodb"
                  />
                  Vehículos en zona con horarios alternativos:
                </div>
                <div
                  className="space-y-2 max-h-60 overflow-y-auto"
                  data-oid="e.oj619"
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
                          data-oid="nma1h7n"
                        >
                          <div
                            className="flex justify-between items-start mb-2"
                            data-oid="jjq-wk2"
                          >
                            <div data-oid="hlitoam">
                              <div
                                className="font-medium text-gray-800 flex items-center"
                                data-oid="1ctzhjs"
                              >
                                {model}
                                {licensePlate && (
                                  <span
                                    className="text-xs ml-1 text-gray-500"
                                    data-oid="7ofur7e"
                                  >
                                    ({licensePlate})
                                  </span>
                                )}
                                <span
                                  className="ml-2 text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded"
                                  data-oid="a5waqox"
                                >
                                  No disponible ahora
                                </span>
                              </div>
                              <div
                                className="text-xs text-gray-600 flex items-center mt-1"
                                data-oid="6nj03_h"
                              >
                                <span data-oid="_5qjz9b">{driverName}</span>
                                {distanceKm && (
                                  <span
                                    className="ml-2 text-gray-500"
                                    data-oid="3lvb0ly"
                                  >
                                    {distanceKm} km
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="text-xs" data-oid="t.t2imx">
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium 
                              ${availabilityType === "fixed_zone" ? "bg-gray-200 text-purple-800" : "bg-gray-200 text-blue-800"}`}
                                data-oid="9m5x_j8"
                              >
                                {availabilityType === "fixed_zone"
                                  ? "Zona Fija"
                                  : "Ruta Flexible"}
                              </span>
                              {zoneName && (
                                <div
                                  className="mt-1 text-gray-500"
                                  data-oid="k_2yqjf"
                                >
                                  Zona: {zoneName}
                                </div>
                              )}
                            </div>
                          </div>

                          {unavailableReason && (
                            <div
                              className="text-xs text-amber-700 mb-2 p-2 bg-amber-100 rounded"
                              data-oid="62lee5y"
                            >
                              <strong data-oid="7gm2k9w">Motivo:</strong>{" "}
                              {unavailableReason}
                            </div>
                          )}

                          {nextAvailable && (
                            <div
                              className="text-xs text-green-700 mb-2"
                              data-oid="tvrl:mt"
                            >
                              <Clock
                                className="h-3 w-3 inline mr-1"
                                data-oid="805b3z."
                              />
                              <strong data-oid="ifw0z8u">
                                Próxima disponibilidad:
                              </strong>{" "}
                              {nextAvailable}
                            </div>
                          )}

                          {alternativeSlots.length > 0 && (
                            <div className="text-xs" data-oid="kl:zorv">
                              <div
                                className="font-medium text-gray-700 mb-1"
                                data-oid="478toem"
                              >
                                Horarios disponibles hoy:
                              </div>
                              <div
                                className="flex flex-wrap gap-1"
                                data-oid="1s3trmh"
                              >
                                {alternativeSlots
                                  .slice(0, 3)
                                  .map((slot: any, slotIndex: number) => (
                                    <span
                                      key={slotIndex}
                                      className="bg-gray-200 text-green-800 px-2 py-1 rounded text-xs"
                                      data-oid="pv5a7hy"
                                    >
                                      {formatTimeSlot(slot)}
                                    </span>
                                  ))}
                                {alternativeSlots.length > 3 && (
                                  <span
                                    className="text-gray-500 text-xs"
                                    data-oid="tx_:q18"
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
                              data-oid="hn883:u"
                            >
                              <div
                                className="flex items-center"
                                data-oid="-sc9pxw"
                              >
                                <AlertCircle
                                  className="h-3 w-3 mr-1"
                                  data-oid="pnrvdmq"
                                />

                                <span
                                  className="font-medium"
                                  data-oid="x1.6s-o"
                                >
                                  Sin horarios disponibles para esta fecha
                                </span>
                              </div>
                              <div
                                className="mt-1 text-gray-600"
                                data-oid="_vq9pwz"
                              >
                                Este conductor no tiene slots libres el{" "}
                                <strong data-oid="rsnswfd">
                                  {newBookingFormData.service.pickup.date}
                                </strong>
                                . Considera cambiar la fecha o contactar
                                directamente.
                              </div>
                            </div>
                          )}

                          <div
                            className="flex justify-between items-center mt-3 pt-2 border-t border-amber-200"
                            data-oid="9lo2.h3"
                          >
                            <div
                              className="text-xs text-gray-600"
                              data-oid="fxnk_b0"
                            >
                              💡 Este vehículo trabaja en la zona pero no está
                              disponible en el horario solicitado
                            </div>
                            <div
                              className="flex space-x-1 flex-wrap"
                              data-oid="7uo.t3v"
                            >
                              <button
                                className="text-xs bg-black text-white px-2 py-1 rounded hover:bg-gray-800 flex items-center"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenContactModal(vehicle);
                                }}
                                data-oid="o8n_as7"
                              >
                                <Phone
                                  className="h-3 w-3 mr-1"
                                  data-oid="c2ql6br"
                                />
                                Llamar
                              </button>
                              <button
                                className="text-xs bg-black text-white px-2 py-1 rounded hover:bg-gray-800"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenSuggestModal(vehicle);
                                }}
                                data-oid="14mo3pn"
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
                                data-oid="d-cnjfy"
                              >
                                <Clock
                                  className="h-3 w-3 mr-1"
                                  data-oid="3cieg7w"
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
                  data-oid="v81d056"
                >
                  <strong data-oid="boccrfa">Consejo:</strong> Estos vehículos
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
                      data-oid="kyek_:2"
                    >
                      <div className="flex items-start" data-oid="mq1x:k1">
                        <AlertCircle
                          className="h-4 w-4 text-gray-500 mr-2 mt-0.5"
                          data-oid="a3wynce"
                        />

                        <div className="text-sm" data-oid="vqv.kke">
                          <p
                            className="font-medium text-orange-800 mb-1"
                            data-oid="v2-n_jo"
                          >
                            Vehículos encontrados pero sin horarios disponibles
                          </p>
                          <p className="text-orange-700" data-oid="_xsox8_">
                            Se encontraron{" "}
                            {
                              availabilityResults
                                .vehicles_with_alternative_schedules.length
                            }{" "}
                            vehículo(s) en la zona, pero ninguno tiene
                            disponibilidad para el{" "}
                            <strong data-oid="kqullzy">
                              {newBookingFormData.service.pickup.date}
                            </strong>
                            .
                          </p>
                          <p
                            className="text-gray-600 mt-2 text-xs"
                            data-oid="sxnor.k"
                          >
                            💡 <strong data-oid="7f5kfap">Sugerencia:</strong>{" "}
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
                  data-oid="-k-cc8t"
                >
                  <div
                    className="bg-gray-100 border border-gray-200 rounded-md p-4"
                    data-oid="ff2:hjb"
                  >
                    <div className="flex items-start" data-oid="i3lctor">
                      <div className="flex-shrink-0" data-oid="6ep95vp">
                        <AlertCircle
                          className="h-5 w-5 text-gray-400"
                          data-oid="4ye:jew"
                        />
                      </div>
                      <div className="ml-3" data-oid="ijy7nc0">
                        <h3
                          className="text-sm font-medium text-gray-800 mb-2"
                          data-oid="l-rheee"
                        >
                          Sin disponibilidad para esta fecha
                        </h3>
                        <div
                          className="text-sm text-gray-700 space-y-2"
                          data-oid="a.ascrk"
                        >
                          <p data-oid="kwf:-ev">
                            No hay vehículos disponibles para{" "}
                            <strong data-oid=":.seu4z">
                              {newBookingFormData.service.pickup.date}
                            </strong>
                            {newBookingFormData.service.pickup.time && (
                              <span data-oid="7gm8udn">
                                {" "}
                                a las{" "}
                                <strong data-oid="8gsxqj6">
                                  {newBookingFormData.service.pickup.time}
                                </strong>
                              </span>
                            )}{" "}
                            en la ubicación seleccionada.
                          </p>
                          <div
                            className="bg-gray-200 rounded p-3 mt-3"
                            data-oid="qcbrxsx"
                          >
                            <p
                              className="font-medium text-gray-800 mb-1"
                              data-oid="_6wpsv5"
                            >
                              💡 Recomendaciones:
                            </p>
                            <ul
                              className="text-sm space-y-1 list-disc list-inside"
                              data-oid="bjhcut_"
                            >
                              <li data-oid="b4hx09r">
                                Selecciona una{" "}
                                <strong data-oid="20mbh2m">
                                  fecha diferente
                                </strong>
                              </li>
                              <li data-oid="eiuri:a">
                                Prueba con un{" "}
                                <strong data-oid="wq.2bvu">
                                  horario diferente
                                </strong>{" "}
                                (mañana o tarde)
                              </li>
                              <li data-oid="k-j_lr9">
                                Considera una{" "}
                                <strong data-oid="nnf5xso">
                                  ubicación cercana
                                </strong>{" "}
                                diferente
                              </li>
                            </ul>
                          </div>
                          <div
                            className="bg-gray-100 border border-blue-200 rounded p-3 mt-3"
                            data-oid="_ht6gks"
                          >
                            <p
                              className="text-blue-800 text-xs"
                              data-oid="kx_6w8v"
                            >
                              <span className="font-medium" data-oid="mgtrdat">
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
                              data-oid="eky-o0i"
                            >
                              <p
                                className="font-medium text-green-800 mb-2"
                                data-oid="q2kbtff"
                              >
                                📅 Prueba estas fechas cercanas:
                              </p>
                              <div
                                className="grid grid-cols-2 gap-2"
                                data-oid=".wwj7vt"
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
                                      data-oid="4nr7n3c"
                                    >
                                      <div
                                        className="font-medium text-green-800"
                                        data-oid="s0wdto_"
                                      >
                                        {altDate.label}
                                      </div>
                                      <div
                                        className="text-green-600 capitalize"
                                        data-oid="a8jt1bo"
                                      >
                                        {altDate.dayOfWeek}
                                      </div>
                                    </button>
                                  ))}
                              </div>
                              <p
                                className="text-green-700 text-xs mt-2"
                                data-oid="a9kp-m9"
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
              <div className="mt-2 text-gray-500 text-xs" data-oid=".u:s-38">
                {availabilityResults.message}
              </div>
            )}
          </div>
        )}

        {/* Mensaje informativo sobre verificación automática */}
        {!isCheckingAvailability && !availabilityResults && (
          <div
            className="bg-gray-50 rounded-md p-3 text-xs text-gray-600"
            data-oid="3dvw_a4"
          >
            <div className="flex items-center" data-oid="3s0u_o0">
              <span className="text-black mr-2" data-oid="z583nr6">
                ℹ️
              </span>
              La disponibilidad se verifica automáticamente cuando completas la
              ubicación, fecha y hora.
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-4 mb-4" data-oid="w76rs.f">
        <h3
          className="text-sm font-semibold text-gray-700 mb-3"
          data-oid="0wbcxcf"
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
            data-oid="7p:573w"
          >
            {wasVehicleSelectedByExtraSchedule && (
              <div
                className="mb-2 flex items-center text-emerald-700 text-xs"
                data-oid="t07ypsh"
              >
                <Clock className="h-3 w-3 mr-1" data-oid="rcleaay" />
                <span className="font-medium" data-oid="3lb.dny">
                  ✨ Conductor aceptó horario extra
                </span>
              </div>
            )}
            <div className="font-medium text-gray-800" data-oid="ts1wv4r">
              {newBookingFormData.vehicle.name}
            </div>
            <div className="text-sm text-gray-600 mt-1" data-oid="4bf6ep9">
              Conductor:{" "}
              {newBookingFormData.driver?.name || "Pendiente de asignar"}
            </div>
            {wasVehicleSelectedByExtraSchedule && (
              <div className="text-xs text-emerald-600 mt-1" data-oid="3y0k6wx">
                Este conductor ha aceptado trabajar fuera de su horario habitual
                para atender esta solicitud.
              </div>
            )}
            <div className="flex justify-end mt-3" data-oid="5i8m-m4">
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
                data-oid="vh52azr"
              >
                Eliminar selección
              </button>
            </div>
          </div>
        ) : (
          <div
            className="text-sm text-amber-600 flex items-center p-3 bg-amber-50 rounded-md border border-amber-200"
            data-oid="gon94vi"
          >
            <AlertCircle className="h-4 w-4 mr-2" data-oid="r5cv8wx" />
            No has seleccionado ningún vehículo. Te recomendamos volver al paso
            anterior y seleccionar uno.
          </div>
        )}
      </div>

      {hasSelectedVehicle && (
        <div className="border-t border-gray-200 pt-4 mb-4" data-oid="9svxuhv">
          <div
            className="flex justify-between items-center mb-3"
            data-oid="-hx_x_7"
          >
            <h3
              className="text-sm font-semibold text-gray-700"
              data-oid="t44lbll"
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
                data-oid="bt2zghq"
              >
                <DollarSign className="h-3.5 w-3.5 mr-1" data-oid="i5pt7tn" />
                {hasPriceCalculated ? "Recalcular precio" : "Calcular precio"}
              </Button>
            )}
          </div>

          {isCalculatingPrice && (
            <div
              className="bg-gray-100 rounded-md p-3 flex items-center text-sm text-blue-700"
              data-oid=".7pxidx"
            >
              <div
                className="animate-spin h-4 w-4 border-2 border-blue-600 rounded-full border-t-transparent mr-2"
                data-oid="krbvkm1"
              ></div>
              Calculando tarifa según la distancia...
            </div>
          )}

          {hasSelectedVehicle &&
            !newBookingFormData.service.dropoff.location &&
            !isCalculatingPrice && (
              <div
                className="bg-amber-50 rounded-md p-3 text-sm text-amber-700 flex items-center"
                data-oid="4.yobld"
              >
                <MapPin className="h-4 w-4 mr-2" data-oid="w_o7dcy" />
                Para calcular la tarifa, seleccione primero una dirección de
                destino.
              </div>
            )}

          {hasPriceCalculated && !isCalculatingPrice && (
            <div
              className="bg-white rounded-md border border-green-200 p-3 text-sm"
              data-oid="e_m45ra"
            >
              <div
                className="font-medium text-gray-700 mb-2 flex items-center justify-between"
                data-oid="ivh0x.4"
              >
                <div className="flex items-center" data-oid="i__yryl">
                  <DollarSign
                    className="h-4 w-4 mr-1 text-green-600"
                    data-oid="6jhriwm"
                  />
                  Tarifa calculada:
                </div>
                {/* Indicador de que el precio puede necesitar recalcularse */}
                <div
                  className="text-xs text-amber-600 flex items-center"
                  data-oid="og8caze"
                >
                  <AlertCircle className="h-3 w-3 mr-1" data-oid="9:_kdjg" />
                  <span data-oid="syikg8f">
                    Los precios pueden cambiar si modificas origen, destino o
                    tipo de servicio
                  </span>
                </div>
              </div>

              <div
                className="bg-gray-50 p-2 rounded-md mb-3"
                data-oid="5pefrqs"
              >
                <div
                  className="grid grid-cols-2 gap-2 text-xs"
                  data-oid="x8tkukm"
                >
                  <div data-oid="ps02mqf">
                    <span className="text-gray-500" data-oid="yaqw60e">
                      Distancia:
                    </span>
                    <span className="ml-1 font-medium" data-oid="c-rqy9m">
                      {newBookingFormData.payment.priceBreakdown
                        .is_round_trip ? (
                        <>
                          {priceCalculationService.formatDistance(
                            newBookingFormData.payment.priceBreakdown
                              .total_distance_km,
                          )}
                          <span
                            className="text-xs text-gray-400 block"
                            data-oid="a_rxxd2"
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
                  <div data-oid="rm-nd62">
                    <span className="text-gray-500" data-oid="1vq7hph">
                      Tiempo estimado:
                    </span>
                    <span className="ml-1 font-medium" data-oid="4rz47ie">
                      {formatDuration(
                        newBookingFormData.payment.routeInfo.duration,
                      )}
                      {newBookingFormData.payment.priceBreakdown
                        .is_round_trip && (
                        <span
                          className="text-xs text-gray-400 block"
                          data-oid="scjnvvk"
                        >
                          (Solo ida, vuelta similar)
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-1 mb-3" data-oid="fgsq9td">
                <div
                  className="flex justify-between text-xs"
                  data-oid=":m1.qm7"
                >
                  <span className="text-gray-500" data-oid="gvxa_re">
                    Tarifa base:
                  </span>
                  <span data-oid="3..y8a1">
                    {priceCalculationService.formatPrice(
                      newBookingFormData.payment.priceBreakdown.base_fare,
                    )}
                  </span>
                </div>
                <div
                  className="flex justify-between text-xs"
                  data-oid="-rqu-jj"
                >
                  <span className="text-gray-500" data-oid="4a9hgxc">
                    Cargo por distancia
                    {newBookingFormData.payment.priceBreakdown.is_round_trip &&
                      " (ida y vuelta)"}
                    :
                  </span>
                  <span data-oid="77g25bq">
                    {priceCalculationService.formatPrice(
                      newBookingFormData.payment.priceBreakdown.distance_charge,
                    )}
                    {newBookingFormData.payment.priceBreakdown
                      .is_round_trip && (
                      <div className="text-xs text-gray-400" data-oid="wtdvl:n">
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
                  data-oid="3-z-c4e"
                >
                  <span data-oid="g2ykdbk">Subtotal:</span>
                  <span data-oid="skrp4ag">
                    {priceCalculationService.formatPrice(
                      newBookingFormData.payment.priceBreakdown.subtotal,
                    )}
                  </span>
                </div>
                <div
                  className="flex justify-between text-xs"
                  data-oid="gcoz0.m"
                >
                  <span className="text-gray-500" data-oid="770r_:n">
                    IVA (
                    {newBookingFormData.payment.priceBreakdown.tax_percentage}
                    %):
                  </span>
                  <span data-oid="aj1vetn">
                    {priceCalculationService.formatPrice(
                      newBookingFormData.payment.priceBreakdown.tax_amount,
                    )}
                  </span>
                </div>
                <div
                  className="flex justify-between font-bold pt-1 border-t border-gray-200"
                  data-oid="s101:b3"
                >
                  <span data-oid="0:-tcrl">TOTAL:</span>
                  <span className="text-gray-600" data-oid="flnwmsd">
                    {priceCalculationService.formatPrice(
                      newBookingFormData.payment.priceBreakdown.total,
                    )}
                  </span>
                </div>
              </div>

              <div className="text-xs text-gray-500" data-oid="u.x5b7c">
                {newBookingFormData.payment.priceBreakdown.is_round_trip && (
                  <div
                    className="mb-2 p-2 bg-gray-100 rounded border-l-4 border-blue-400"
                    data-oid="1d:do7r"
                  >
                    <strong data-oid="qq.lb5m">Viaje de ida y vuelta:</strong>{" "}
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

      <div className="flex justify-between mt-6" data-oid="ckf7ddu">
        <Button
          variant="outline"
          onClick={() => setActiveTab("client")}
          className="text-sm"
          data-oid="43-i5hg"
        >
          Anterior: Cliente
        </Button>
        <Button
          className="bg-black hover:bg-gray-800 text-sm"
          onClick={() => handleNextTab("service")}
          disabled={hasSelectedVehicle && !hasPriceCalculated}
          data-oid="1ei1f.w"
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
        data-oid="p5l.3o1"
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
        data-oid="r1q4470"
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
        data-oid="l_u.ud:"
      />
    </div>
  );
};

export default ServiceTab;
