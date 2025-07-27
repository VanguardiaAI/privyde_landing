import { X } from "lucide-react";
import ClientTab from "./ClientTab";
import ServiceTab from "./ServiceTab";
import DetailsTab from "./DetailsTab";
import PaymentTab from "./PaymentTab";
import ContactDriverModal from "./ContactDriverModal";
import SuggestScheduleModal from "./SuggestScheduleModal";
import AddExtraScheduleModal from "./AddExtraScheduleModal";

type NewBookingModalProps = {
  isNewBookingModalOpen: boolean;
  handleCloseNewBookingModal: () => void;
  activeTab: "client" | "service" | "details" | "payment";
  setActiveTab: (tab: "client" | "service" | "details" | "payment") => void;
  newBookingFormData: any;
  validationErrors: any;
  handleFormChange: (section: string, field: string, value: any) => void;
  validateFormTab: (
    tab: "client" | "service" | "details" | "payment",
  ) => boolean;
  handleNextTab: (currentTab: "client" | "service" | "details") => void;
  handleSubmitNewBooking: () => void;
  // Funciones para la búsqueda de clientes
  handleSearchClient: (query: string) => void;
  handleSelectClient: (client: any) => void;
  clientSearchResults: any[];
  isSearchingClient: boolean;
  // Funciones para la búsqueda de rutas
  routeType: "fixed" | "flexible";
  handleRouteTypeChange: (type: "fixed" | "flexible") => void;
  handleSearchFixedRoutes: (query: string) => void;
  handleSelectFixedRoute: (route: any) => void;
  fixedRoutes: any[];
  isSearchingRoutes: boolean;
  routeSearchResults: any[];
  selectedRoute: any;
  // Funciones para autocompletado de direcciones
  handleSearchPickupAddress: (query: string) => void;
  handleSelectPickupAddress: (address: any) => void;
  handleSearchDropoffAddress: (query: string) => void;
  handleSelectDropoffAddress: (address: any) => void;
  pickupAddressResults: any[];
  isSearchingPickupAddress: boolean;
  dropoffAddressResults: any[];
  isSearchingDropoffAddress: boolean;
  // Funciones para la verificación de disponibilidad
  handleCheckVehicleAvailability: (coordinates: any, location: string) => void;
  isCheckingAvailability: boolean;
  availabilityResults: any;
  // Nuevas props para el cálculo de precios
  handleCalculatePrice: () => void;
  isCalculatingPrice: boolean;
  canCalculatePrice: () => boolean;
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

const NewBookingModal = ({
  isNewBookingModalOpen,
  handleCloseNewBookingModal,
  activeTab,
  setActiveTab,
  newBookingFormData,
  validationErrors,
  handleFormChange,
  handleNextTab,
  handleSubmitNewBooking,
  // Datos y funciones para clientes
  handleSearchClient,
  handleSelectClient,
  clientSearchResults,
  isSearchingClient,
  // Datos y funciones para rutas
  routeType,
  handleRouteTypeChange,
  handleSearchFixedRoutes,
  handleSelectFixedRoute,
  isSearchingRoutes,
  routeSearchResults,
  selectedRoute,
  // Datos y funciones para direcciones
  handleSearchPickupAddress,
  handleSelectPickupAddress,
  handleSearchDropoffAddress,
  handleSelectDropoffAddress,
  pickupAddressResults,
  isSearchingPickupAddress,
  dropoffAddressResults,
  isSearchingDropoffAddress,
  // Datos y funciones para disponibilidad
  handleCheckVehicleAvailability,
  isCheckingAvailability,
  availabilityResults,
  // Datos y funciones para el cálculo de precios
  handleCalculatePrice,
  isCalculatingPrice,
  canCalculatePrice,
  // Datos y funciones para contacto y sugerencias
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
  clearCalculatedPrice,
}: NewBookingModalProps) => {
  if (!isNewBookingModalOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50"
      data-oid="doveop4"
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        data-oid="kivj-zw"
      >
        <div
          className="flex justify-between items-center border-b px-6 py-4"
          data-oid="27ozg.p"
        >
          <h2
            className="text-xl font-semibold text-gray-800"
            data-oid="wkzh:hu"
          >
            Nueva Reserva
          </h2>
          <button
            onClick={handleCloseNewBookingModal}
            className="text-gray-500 hover:text-gray-700"
            data-oid="x4a4h:5"
          >
            <X size={24} data-oid=":yu6u8u" />
          </button>
        </div>

        <div className="p-6 bg-gray-50" data-oid="1cwdshk">
          {/* Pestañas de navegación del formulario */}
          <div className="mb-6" data-oid="gg-:9em">
            <div className="flex border-b" data-oid="1m2kevn">
              <button
                className={`px-4 py-3 text-sm font-medium flex items-center ${activeTab === "client" ? "text-gray-600 border-b-2 border-red-600" : "text-gray-500 hover:text-gray-700"}`}
                onClick={() => setActiveTab("client")}
                data-oid="8mioc1e"
              >
                <span
                  className="bg-gray-200 text-gray-700 rounded-full h-5 w-5 inline-flex items-center justify-center mr-2 text-xs"
                  data-oid="0oakb:v"
                >
                  1
                </span>
                Cliente
              </button>
              <button
                className={`px-4 py-3 text-sm font-medium flex items-center ${activeTab === "service" ? "text-gray-600 border-b-2 border-red-600" : "text-gray-500 hover:text-gray-700"}`}
                onClick={() => setActiveTab("service")}
                data-oid="qpzu:5t"
              >
                <span
                  className="bg-gray-200 text-gray-700 rounded-full h-5 w-5 inline-flex items-center justify-center mr-2 text-xs"
                  data-oid="eg2vu0s"
                >
                  2
                </span>
                Servicio
              </button>
              <button
                className={`px-4 py-3 text-sm font-medium flex items-center ${activeTab === "details" ? "text-gray-600 border-b-2 border-red-600" : "text-gray-500 hover:text-gray-700"}`}
                onClick={() => setActiveTab("details")}
                data-oid="dbnpo1c"
              >
                <span
                  className="bg-gray-200 text-gray-700 rounded-full h-5 w-5 inline-flex items-center justify-center mr-2 text-xs"
                  data-oid="n5ebygk"
                >
                  3
                </span>
                Detalles
              </button>
              <button
                className={`px-4 py-3 text-sm font-medium flex items-center ${activeTab === "payment" ? "text-gray-600 border-b-2 border-red-600" : "text-gray-500 hover:text-gray-700"}`}
                onClick={() => setActiveTab("payment")}
                data-oid="bl:whtq"
              >
                <span
                  className="bg-gray-200 text-gray-700 rounded-full h-5 w-5 inline-flex items-center justify-center mr-2 text-xs"
                  data-oid="idq5oi9"
                >
                  4
                </span>
                Pago
              </button>
            </div>
          </div>

          {/* Contenido de las pestañas */}
          <div data-oid="se15fat">
            {activeTab === "client" && (
              <ClientTab
                newBookingFormData={newBookingFormData}
                validationErrors={validationErrors}
                handleFormChange={handleFormChange}
                handleSearchClient={handleSearchClient}
                handleSelectClient={handleSelectClient}
                clientSearchResults={clientSearchResults}
                isSearchingClient={isSearchingClient}
                handleNextTab={handleNextTab}
                data-oid="n4ea0kk"
              />
            )}

            {activeTab === "service" && (
              <ServiceTab
                newBookingFormData={newBookingFormData}
                validationErrors={validationErrors}
                handleFormChange={handleFormChange}
                routeType={routeType}
                handleRouteTypeChange={handleRouteTypeChange}
                handleSearchFixedRoutes={handleSearchFixedRoutes}
                handleSelectFixedRoute={handleSelectFixedRoute}
                isSearchingRoutes={isSearchingRoutes}
                routeSearchResults={routeSearchResults}
                selectedRoute={selectedRoute}
                handleSearchPickupAddress={handleSearchPickupAddress}
                handleSelectPickupAddress={handleSelectPickupAddress}
                handleSearchDropoffAddress={handleSearchDropoffAddress}
                handleSelectDropoffAddress={handleSelectDropoffAddress}
                pickupAddressResults={pickupAddressResults}
                isSearchingPickupAddress={isSearchingPickupAddress}
                dropoffAddressResults={dropoffAddressResults}
                isSearchingDropoffAddress={isSearchingDropoffAddress}
                handleCheckVehicleAvailability={handleCheckVehicleAvailability}
                isCheckingAvailability={isCheckingAvailability}
                availabilityResults={availabilityResults}
                setActiveTab={setActiveTab}
                handleNextTab={handleNextTab}
                handleCalculatePrice={handleCalculatePrice}
                isCalculatingPrice={isCalculatingPrice}
                canCalculatePrice={canCalculatePrice}
                contactModalOpen={contactModalOpen}
                suggestModalOpen={suggestModalOpen}
                selectedVehicleForAction={selectedVehicleForAction}
                handleOpenContactModal={handleOpenContactModal}
                handleCloseContactModal={handleCloseContactModal}
                handleOpenSuggestModal={handleOpenSuggestModal}
                handleCloseSuggestModal={handleCloseSuggestModal}
                handleContactLogged={handleContactLogged}
                handleSuggestionCreated={handleSuggestionCreated}
                extraScheduleModalOpen={extraScheduleModalOpen}
                handleOpenExtraScheduleModal={handleOpenExtraScheduleModal}
                handleCloseExtraScheduleModal={handleCloseExtraScheduleModal}
                handleExtraScheduleCreated={handleExtraScheduleCreated}
                wasVehicleSelectedByExtraSchedule={
                  wasVehicleSelectedByExtraSchedule
                }
                handleClearVehicleSelection={handleClearVehicleSelection}
                clearCalculatedPrice={clearCalculatedPrice}
                data-oid="7txci87"
              />
            )}

            {activeTab === "details" && (
              <DetailsTab
                newBookingFormData={newBookingFormData}
                handleFormChange={handleFormChange}
                setActiveTab={setActiveTab}
                handleNextTab={handleNextTab}
                data-oid="dl0:h0l"
              />
            )}

            {activeTab === "payment" && (
              <PaymentTab
                newBookingFormData={newBookingFormData}
                handleFormChange={handleFormChange}
                setActiveTab={setActiveTab}
                handleSubmitNewBooking={handleSubmitNewBooking}
                data-oid="dttcw3w"
              />
            )}
          </div>
        </div>
      </div>

      {/* Modales de contacto y sugerencias */}
      <ContactDriverModal
        isOpen={contactModalOpen}
        onClose={handleCloseContactModal}
        vehicle={selectedVehicleForAction}
        pickupDate={`${newBookingFormData.service.pickup.date} ${newBookingFormData.service.pickup.time}`}
        pickupLocation={newBookingFormData.service.pickup.location}
        onContactLogged={handleContactLogged}
        data-oid="yjtavt-"
      />

      <SuggestScheduleModal
        isOpen={suggestModalOpen}
        onClose={handleCloseSuggestModal}
        vehicle={selectedVehicleForAction}
        originalPickupDate={`${newBookingFormData.service.pickup.date} ${newBookingFormData.service.pickup.time}`}
        pickupLocation={newBookingFormData.service.pickup.location}
        dropoffLocation={newBookingFormData.service.dropoff.location}
        clientId={newBookingFormData.client.id}
        onSuggestionCreated={handleSuggestionCreated}
        data-oid="07.bv0k"
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
        data-oid="6mdzw8_"
      />
    </div>
  );
};

export default NewBookingModal;
