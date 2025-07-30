import { Button } from "@/components/ui/button";

type DetailsTabProps = {
  newBookingFormData: any;
  handleFormChange: (section: string, field: string, value: any) => void;
  setActiveTab: (tab: "client" | "service" | "details" | "payment") => void;
  handleNextTab: (currentTab: "client" | "service" | "details") => void;
};

const DetailsTab = ({
  newBookingFormData,
  handleFormChange,
  setActiveTab,
  handleNextTab,
}: DetailsTabProps) => {
  return (
    <div className="mt-4" data-oid="cos2t6.">
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4"
        data-oid="8y6qvzs"
      >
        <div data-oid="cb5v8na">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            data-oid="8.-twq-"
          >
            Número de pasajeros
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            value={newBookingFormData.details.passengers}
            onChange={(e) =>
              handleFormChange(
                "details",
                "passengers",
                parseInt(e.target.value),
              )
            }
            placeholder="Número de pasajeros"
            min="1"
            data-oid="8lo.:14"
          />
        </div>
        <div data-oid="l5d2ef2">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            data-oid=".59k78k"
          >
            Equipaje (piezas)
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            value={newBookingFormData.details.luggage}
            onChange={(e) =>
              handleFormChange("details", "luggage", parseInt(e.target.value))
            }
            placeholder="Cantidad de equipaje"
            min="0"
            data-oid="ey7bt7."
          />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 mb-4" data-oid=":d7nr5.">
        <h3
          className="text-sm font-semibold text-gray-700 mb-3"
          data-oid="avi2q_x"
        >
          Preferencias de vehículo
        </h3>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          data-oid="xe4.ruk"
        >
          <div data-oid="-1w2527">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              data-oid="fpu_mzo"
            >
              Categoría
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              value={newBookingFormData.details.vehicleCategory as any}
              onChange={(e) =>
                handleFormChange(
                  "details",
                  "vehicleCategory" as any,
                  e.target.value,
                )
              }
              data-oid="2-ok5g0"
            >
              <option value="" data-oid="d0rjh62">
                Sin preferencia
              </option>
              <option value="economy" data-oid="zsaielu">
                Economy
              </option>
              <option value="business" data-oid="1x3sd62">
                Business
              </option>
              <option value="first_class" data-oid="3m4sy70">
                First Class
              </option>
              <option value="suv" data-oid="g4gkakd">
                SUV
              </option>
              <option value="van" data-oid="az5p9dp">
                Van
              </option>
              <option value="business_van" data-oid="ex9l5eq">
                Business Van
              </option>
              <option value="armored" data-oid="jtdv_u8">
                Blindado
              </option>
            </select>
          </div>
          <div data-oid="pe4dpoa">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              data-oid="bg1yu0y"
            >
              Color
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              value={newBookingFormData.details.vehicleColor as any}
              onChange={(e) =>
                handleFormChange(
                  "details",
                  "vehicleColor" as any,
                  e.target.value,
                )
              }
              data-oid="e0k4chr"
            >
              <option value="" data-oid="tu82hg_">
                Sin preferencia
              </option>
              <option value="black" data-oid="x.xum9j">
                Negro
              </option>
              <option value="white" data-oid="lkqbytr">
                Blanco
              </option>
              <option value="silver" data-oid="37msk7t">
                Plateado
              </option>
              <option value="gray" data-oid="kgi0zg-">
                Gris
              </option>
              <option value="blue" data-oid="f-7j6r2">
                Azul
              </option>
            </select>
          </div>
        </div>
        <div className="mt-3" data-oid="quqa466">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            data-oid="mfwxo-5"
          >
            Características adicionales
          </label>
          <div className="grid grid-cols-2 gap-2" data-oid="t3gekno">
            <label
              className="inline-flex items-center text-sm"
              data-oid="7slxyh8"
            >
              <input
                type="checkbox"
                className="form-checkbox text-gray-600 rounded"
                checked={(newBookingFormData.details.features as any)?.includes(
                  "wifi",
                )}
                onChange={(e) => {
                  const features = [
                    ...((newBookingFormData.details.features as any) || []),
                  ];

                  if (e.target.checked) {
                    features.push("wifi");
                  } else {
                    const index = features.indexOf("wifi");
                    if (index > -1) features.splice(index, 1);
                  }
                  handleFormChange("details", "features" as any, features);
                }}
                data-oid="ikql:1-"
              />

              <span className="ml-2" data-oid="6gpo_s1">
                WiFi
              </span>
            </label>
            <label
              className="inline-flex items-center text-sm"
              data-oid=".79bl8_"
            >
              <input
                type="checkbox"
                className="form-checkbox text-gray-600 rounded"
                checked={(newBookingFormData.details.features as any)?.includes(
                  "child_seat",
                )}
                onChange={(e) => {
                  const features = [
                    ...((newBookingFormData.details.features as any) || []),
                  ];

                  if (e.target.checked) {
                    features.push("child_seat");
                  } else {
                    const index = features.indexOf("child_seat");
                    if (index > -1) features.splice(index, 1);
                  }
                  handleFormChange("details", "features" as any, features);
                }}
                data-oid=":dukn85"
              />

              <span className="ml-2" data-oid="_5ab4x1">
                Asiento infantil
              </span>
            </label>
            <label
              className="inline-flex items-center text-sm"
              data-oid="qzs9hy-"
            >
              <input
                type="checkbox"
                className="form-checkbox text-gray-600 rounded"
                checked={(newBookingFormData.details.features as any)?.includes(
                  "premium_audio",
                )}
                onChange={(e) => {
                  const features = [
                    ...((newBookingFormData.details.features as any) || []),
                  ];

                  if (e.target.checked) {
                    features.push("premium_audio");
                  } else {
                    const index = features.indexOf("premium_audio");
                    if (index > -1) features.splice(index, 1);
                  }
                  handleFormChange("details", "features" as any, features);
                }}
                data-oid="-:xgt.a"
              />

              <span className="ml-2" data-oid="k4:cac9">
                Audio premium
              </span>
            </label>
            <label
              className="inline-flex items-center text-sm"
              data-oid="4cv_6kk"
            >
              <input
                type="checkbox"
                className="form-checkbox text-gray-600 rounded"
                checked={(newBookingFormData.details.features as any)?.includes(
                  "climate_control",
                )}
                onChange={(e) => {
                  const features = [
                    ...((newBookingFormData.details.features as any) || []),
                  ];

                  if (e.target.checked) {
                    features.push("climate_control");
                  } else {
                    const index = features.indexOf("climate_control");
                    if (index > -1) features.splice(index, 1);
                  }
                  handleFormChange("details", "features" as any, features);
                }}
                data-oid="wwynq9m"
              />

              <span className="ml-2" data-oid="61:ifmh">
                Control de clima
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 mb-4" data-oid="tp2pu1m">
        <h3
          className="text-sm font-semibold text-gray-700 mb-3"
          data-oid="2fvtq3."
        >
          Notas y peticiones especiales
        </h3>
        <div data-oid="7pvh0-n">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            data-oid="y1jstsb"
          >
            Notas especiales
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            value={newBookingFormData.details.specialNotes}
            onChange={(e) =>
              handleFormChange("details", "specialNotes", e.target.value)
            }
            placeholder="Instrucciones especiales, peticiones o información adicional"
            rows={4}
            data-oid="6czag5q"
          ></textarea>
        </div>
      </div>

      <div className="flex justify-between mt-6" data-oid="5nl-t0w">
        <Button
          variant="outline"
          onClick={() => setActiveTab("service")}
          className="text-sm"
          data-oid="nkz9i55"
        >
          Anterior: Servicio
        </Button>
        <Button
          className="bg-black hover:bg-gray-800 text-sm"
          onClick={() => handleNextTab("details")}
          data-oid="n1-em9w"
        >
          Siguiente: Pago
        </Button>
      </div>
    </div>
  );
};

export default DetailsTab;
