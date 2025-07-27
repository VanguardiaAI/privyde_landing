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
    <div className="mt-4" data-oid="unccw.q">
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4"
        data-oid="s:pvn7s"
      >
        <div data-oid="rr86jc0">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            data-oid="39axuhn"
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
            data-oid="tlm697y"
          />
        </div>
        <div data-oid="3:95oxa">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            data-oid="drq._wx"
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
            data-oid="8ipzixw"
          />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 mb-4" data-oid="g20li4o">
        <h3
          className="text-sm font-semibold text-gray-700 mb-3"
          data-oid="wgskqwt"
        >
          Preferencias de vehículo
        </h3>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          data-oid="gum020g"
        >
          <div data-oid="8mbq-97">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              data-oid="spsmzz."
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
              data-oid="qprzamr"
            >
              <option value="" data-oid="i-y0p5l">
                Sin preferencia
              </option>
              <option value="economy" data-oid="lgs8on8">
                Economy
              </option>
              <option value="business" data-oid="1.hr29p">
                Business
              </option>
              <option value="first_class" data-oid="tpac9wv">
                First Class
              </option>
              <option value="suv" data-oid="s9yytwa">
                SUV
              </option>
              <option value="van" data-oid=":ep0_nc">
                Van
              </option>
              <option value="business_van" data-oid="-v.trz4">
                Business Van
              </option>
              <option value="armored" data-oid="0kwl3h:">
                Blindado
              </option>
            </select>
          </div>
          <div data-oid="sud5w8d">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              data-oid="3c3vqaz"
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
              data-oid="e2x83c_"
            >
              <option value="" data-oid="9jktf_1">
                Sin preferencia
              </option>
              <option value="black" data-oid="ipvjf05">
                Negro
              </option>
              <option value="white" data-oid="cu9r74y">
                Blanco
              </option>
              <option value="silver" data-oid="e.u02l4">
                Plateado
              </option>
              <option value="gray" data-oid="l4j2js-">
                Gris
              </option>
              <option value="blue" data-oid="aqzcqc.">
                Azul
              </option>
            </select>
          </div>
        </div>
        <div className="mt-3" data-oid="k67t1f-">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            data-oid="skal.v6"
          >
            Características adicionales
          </label>
          <div className="grid grid-cols-2 gap-2" data-oid="0t78u:j">
            <label
              className="inline-flex items-center text-sm"
              data-oid="zez3rg_"
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
                data-oid="52khjze"
              />

              <span className="ml-2" data-oid="ycn3wjp">
                WiFi
              </span>
            </label>
            <label
              className="inline-flex items-center text-sm"
              data-oid=":cegoan"
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
                data-oid="tkf.dpk"
              />

              <span className="ml-2" data-oid="njbcvxe">
                Asiento infantil
              </span>
            </label>
            <label
              className="inline-flex items-center text-sm"
              data-oid="-whb4.o"
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
                data-oid="p9_y-qp"
              />

              <span className="ml-2" data-oid="ina.57u">
                Audio premium
              </span>
            </label>
            <label
              className="inline-flex items-center text-sm"
              data-oid="k7vipg6"
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
                data-oid="f08drm-"
              />

              <span className="ml-2" data-oid="y_oczv2">
                Control de clima
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 mb-4" data-oid="nxmvt7m">
        <h3
          className="text-sm font-semibold text-gray-700 mb-3"
          data-oid=".q9l9si"
        >
          Notas y peticiones especiales
        </h3>
        <div data-oid=":xby3e2">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            data-oid="cfxqcw9"
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
            data-oid="j3p9_4_"
          ></textarea>
        </div>
      </div>

      <div className="flex justify-between mt-6" data-oid="-uzyxhc">
        <Button
          variant="outline"
          onClick={() => setActiveTab("service")}
          className="text-sm"
          data-oid="ptllx9r"
        >
          Anterior: Servicio
        </Button>
        <Button
          className="bg-black hover:bg-gray-800 text-sm"
          onClick={() => handleNextTab("details")}
          data-oid="qve1l3j"
        >
          Siguiente: Pago
        </Button>
      </div>
    </div>
  );
};

export default DetailsTab;
