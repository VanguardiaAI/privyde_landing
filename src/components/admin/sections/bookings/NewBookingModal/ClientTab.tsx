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
    <div className="mt-4" data-oid="kw._o-p">
      <div className="bg-gray-50 rounded-md p-4 mb-4" data-oid="g3.noup">
        <h3
          className="text-sm font-semibold text-gray-700 mb-3"
          data-oid="9h.xrz9"
        >
          Buscar cliente existente
        </h3>
        <div className="relative" data-oid="qln07n.">
          <div className="relative rounded-md shadow-sm" data-oid="st7r_h5">
            <div
              className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              data-oid="srcj4km"
            >
              <Search className="h-4 w-4 text-gray-400" data-oid="cd:cbiz" />
            </div>
            <input
              type="text"
              className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="Buscar por nombre o email..."
              onChange={(e) => handleSearchClient(e.target.value)}
              data-oid="ry4r.tl"
            />

            {isSearchingClient && (
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                data-oid="75673b6"
              >
                <div
                  className="animate-spin h-4 w-4 border-2 border-red-600 rounded-full border-t-transparent"
                  data-oid="2q5l:dy"
                ></div>
              </div>
            )}
          </div>

          {clientSearchResults.length > 0 && (
            <div
              className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-y-auto"
              data-oid="b1guwc7"
            >
              {clientSearchResults.map((client) => (
                <div
                  key={client.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-0"
                  onClick={() => handleSelectClient(client)}
                  data-oid="21.7s09"
                >
                  <div className="font-medium" data-oid="cdd:8zw">
                    {client.name}
                  </div>
                  <div
                    className="text-sm text-gray-500 flex items-center gap-2"
                    data-oid="t:diyl."
                  >
                    <span data-oid=":.5:qix">{client.email}</span> •{" "}
                    <span data-oid="y5h.:1j">{client.phone}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-2" data-oid="19pckyl">
          Busca primero si el cliente ya existe en el sistema
        </p>
      </div>

      <div className="border-t border-gray-200 pt-4 mb-4" data-oid="uu8ffsy">
        <h3
          className="text-sm font-semibold text-gray-700 mb-3"
          data-oid="pr9k5x4"
        >
          Información del cliente
        </h3>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          data-oid="-wt-psi"
        >
          <div className="sm:col-span-2" data-oid=".dukn49">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              data-oid="0jfh4ip"
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
              data-oid="m41zg:z"
            />

            {validationErrors["client.name"] && (
              <p className="text-black text-xs mt-1" data-oid="_2mxk65">
                {validationErrors["client.name"]}
              </p>
            )}
          </div>
          <div data-oid="y_338-s">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              data-oid="xgr-gl_"
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
              data-oid="62s63oy"
            />

            {validationErrors["client.email"] && (
              <p className="text-black text-xs mt-1" data-oid="izbali6">
                {validationErrors["client.email"]}
              </p>
            )}
          </div>
          <div data-oid="bf3kajr">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              data-oid="9pao4r."
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
              data-oid="gc0tko0"
            />

            {validationErrors["client.phone"] && (
              <p className="text-black text-xs mt-1" data-oid="4_sa-4-">
                {validationErrors["client.phone"]}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6" data-oid="50u-z9f">
        <Button
          className="bg-black hover:bg-gray-800 text-sm"
          onClick={() => handleNextTab("client")}
          data-oid="-kay_f."
        >
          Siguiente: Servicio
        </Button>
      </div>
    </div>
  );
};

export default ClientTab;
