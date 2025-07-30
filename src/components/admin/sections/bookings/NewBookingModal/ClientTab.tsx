import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

type ClientTabProps = {
  newBookingFormData: any;
  validationErrors: any;
  handleFormChange: (section: string, field: string, value: any) => void;
  handleSearchClient: (query: string) => void;
  handleSelectClient: (client: any) => void;
  clientSearchResults: any[];
  isSearchingClient: boolean;
  handleNextTab: (currentTab: "client" | "service" | "details") => void;
};

const ClientTab = ({
  newBookingFormData,
  validationErrors,
  handleFormChange,
  handleSearchClient,
  handleSelectClient,
  clientSearchResults,
  isSearchingClient,
  handleNextTab,
}: ClientTabProps) => {
  return (
    <div className="mt-4" data-oid="8u0hojq">
      <div className="bg-gray-50 rounded-md p-4 mb-4" data-oid="aywj6dg">
        <h3
          className="text-sm font-semibold text-gray-700 mb-3"
          data-oid="-pws::h"
        >
          Buscar cliente existente
        </h3>
        <div className="relative" data-oid="_serjs:">
          <div className="relative rounded-md shadow-sm" data-oid="kh3zifg">
            <div
              className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              data-oid="_xy4dv."
            >
              <Search className="h-4 w-4 text-gray-400" data-oid="ppgon0x" />
            </div>
            <input
              type="text"
              className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="Buscar por nombre o email..."
              onChange={(e) => handleSearchClient(e.target.value)}
              data-oid="nw1x8u4"
            />

            {isSearchingClient && (
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                data-oid="t0hg17v"
              >
                <div
                  className="animate-spin h-4 w-4 border-2 border-red-600 rounded-full border-t-transparent"
                  data-oid="88m6pcr"
                ></div>
              </div>
            )}
          </div>

          {clientSearchResults.length > 0 && (
            <div
              className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-y-auto"
              data-oid="1qea:gm"
            >
              {clientSearchResults.map((client) => (
                <div
                  key={client.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-0"
                  onClick={() => handleSelectClient(client)}
                  data-oid="ca64q8."
                >
                  <div className="font-medium" data-oid="qo6v6lq">
                    {client.name}
                  </div>
                  <div
                    className="text-sm text-gray-500 flex items-center gap-2"
                    data-oid="ogae5sy"
                  >
                    <span data-oid="tlxvmow">{client.email}</span> •{" "}
                    <span data-oid="e3.uuzz">{client.phone}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-2" data-oid="6mc89os">
          Busca primero si el cliente ya existe en el sistema
        </p>
      </div>

      <div className="border-t border-gray-200 pt-4 mb-4" data-oid=".ovhlnc">
        <h3
          className="text-sm font-semibold text-gray-700 mb-3"
          data-oid="zs-km4o"
        >
          Información del cliente
        </h3>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          data-oid="rkmkq_m"
        >
          <div className="sm:col-span-2" data-oid="qk:a-57">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              data-oid="4tckjmk"
            >
              Nombre completo
            </label>
            <input
              type="text"
              className={`w-full px-3 py-2 border ${validationErrors["client.name"] ? "border-gray-500" : "border-gray-300"} rounded-md text-sm`}
              value={newBookingFormData.client.name}
              onChange={(e) =>
                handleFormChange("client", "name", e.target.value)
              }
              placeholder="Ingrese el nombre del cliente"
              data-oid="l_y98.2"
            />

            {validationErrors["client.name"] && (
              <p className="text-black text-xs mt-1" data-oid=".mlfmp5">
                {validationErrors["client.name"]}
              </p>
            )}
          </div>
          <div data-oid="n0j-18x">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              data-oid="ce8xclw"
            >
              Email
            </label>
            <input
              type="email"
              className={`w-full px-3 py-2 border ${validationErrors["client.email"] ? "border-gray-500" : "border-gray-300"} rounded-md text-sm`}
              value={newBookingFormData.client.email}
              onChange={(e) =>
                handleFormChange("client", "email", e.target.value)
              }
              placeholder="Ingrese el email del cliente"
              data-oid="zic-nej"
            />

            {validationErrors["client.email"] && (
              <p className="text-black text-xs mt-1" data-oid="2s_zbn4">
                {validationErrors["client.email"]}
              </p>
            )}
          </div>
          <div data-oid=":211yoh">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              data-oid="i.7s236"
            >
              Teléfono
            </label>
            <input
              type="tel"
              className={`w-full px-3 py-2 border ${validationErrors["client.phone"] ? "border-gray-500" : "border-gray-300"} rounded-md text-sm`}
              value={newBookingFormData.client.phone}
              onChange={(e) =>
                handleFormChange("client", "phone", e.target.value)
              }
              placeholder="Ingrese el teléfono del cliente"
              data-oid="xg4u9ml"
            />

            {validationErrors["client.phone"] && (
              <p className="text-black text-xs mt-1" data-oid=":xc04am">
                {validationErrors["client.phone"]}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6" data-oid="2j1suuz">
        <Button
          className="bg-black hover:bg-gray-800 text-sm"
          onClick={() => handleNextTab("client")}
          data-oid="3juq.lg"
        >
          Siguiente: Servicio
        </Button>
      </div>
    </div>
  );
};

export default ClientTab;
