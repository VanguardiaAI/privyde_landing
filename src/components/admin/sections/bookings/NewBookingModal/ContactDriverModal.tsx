import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  X,
  Phone,
  MessageCircle,
  Mail,
  User,
  Star,
  MapPin,
  Clock,
  Copy,
  ExternalLink,
} from "lucide-react";

interface ContactDriverModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: any;
  pickupDate: string;
  pickupLocation: string;
  onContactLogged?: (contactData: any) => void;
}

interface DriverContactInfo {
  driver_id: string;
  name: string;
  photo: string;
  phone: string;
  email: string;
  whatsapp: string;
  license_number: string;
  rating: number;
  total_trips: number;
  experience_years: number;
  languages: string[];
  available_contact_methods: string[];
}

const ContactDriverModal: React.FC<ContactDriverModalProps> = ({
  isOpen,
  onClose,
  vehicle,
  pickupDate,
  pickupLocation,
  onContactLogged,
}) => {
  const [driverInfo, setDriverInfo] = useState<DriverContactInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [_selectedContactMethod, setSelectedContactMethod] =
    useState<string>("");
  const [notes, setNotes] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    if (isOpen && vehicle?.driver_id) {
      fetchDriverContactInfo();
    }
  }, [isOpen, vehicle?.driver_id]);

  const fetchDriverContactInfo = async () => {
    if (!vehicle || !vehicle.driver_id) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/contact/driver/${vehicle.driver_id}`,
      );

      if (response.ok) {
        const data = await response.json();
        setDriverInfo(data);
        // Seleccionar automáticamente el primer método disponible
        if (data.available_contact_methods?.length > 0) {
          setSelectedContactMethod(data.available_contact_methods[0]);
        }
      } else {
        console.error("Error al obtener información del conductor");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContact = (method: string) => {
    if (!driverInfo || !vehicle) return;

    switch (method) {
      case "phone":
        window.open(`tel:${driverInfo.phone}`, "_self");
        break;
      case "whatsapp":
        const message = `¡Hola ${driverInfo.name}! Consulta sobre servicio VIP para ${pickupDate} desde ${pickupLocation}`;
        const whatsappUrl = `https://wa.me/${driverInfo.whatsapp.replace(/\+/g, "")}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
        break;
      case "email":
        const subject = `Consulta Servicio VIP - ${pickupDate}`;
        const vehicleModel =
          vehicle.vehicle_data?.model || vehicle.model || "vehículo";
        const body = `Hola ${driverInfo.name},\n\nTengo una consulta sobre disponibilidad para un servicio VIP:\n\nFecha: ${pickupDate}\nUbicación: ${pickupLocation}\nVehículo: ${vehicleModel}\n\nGracias por tu tiempo.`;
        window.open(
          `mailto:${driverInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
          "_self",
        );
        break;
    }

    // Registrar el contacto automáticamente
    registerContact(method);
  };

  const registerContact = async (contactMethod: string) => {
    if (!vehicle) return;

    setIsRegistering(true);
    try {
      const contactData = {
        admin_id: "admin-user-id", // Este debería venir del contexto de usuario
        driver_id: vehicle.driver_id,
        contact_method: contactMethod,
        contact_reason: "vehicle_inquiry",
        notes: notes || `Consulta sobre disponibilidad para ${pickupDate}`,
        pickup_date: pickupDate,
        pickup_location: pickupLocation,
        vehicle_id: vehicle.id || vehicle.vehicle_id,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/contact/log`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contactData),
        },
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Contacto registrado:", result);
        onContactLogged?.(contactData);
      }
    } catch (error) {
      console.error("Error al registrar contacto:", error);
    } finally {
      setIsRegistering(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Aquí podrías agregar una notificación de "copiado"
  };

  // No renderizar si no está abierto o no hay vehículo
  if (!isOpen || !vehicle) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      data-oid=":sry9-r"
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
        data-oid="g8w_woa"
      >
        {/* Header */}
        <div
          className="flex justify-between items-center p-6 border-b border-gray-200"
          data-oid="rpgjr7w"
        >
          <h2
            className="text-xl font-semibold text-gray-800"
            data-oid="w21l5fa"
          >
            Contactar Conductor
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            data-oid=".ouq3e8"
          >
            <X className="h-6 w-6" data-oid="m5t2:dm" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6" data-oid="ocj9ek3">
          {isLoading ? (
            <div className="text-center py-8" data-oid="r-tdv6v">
              <div
                className="animate-spin h-8 w-8 border-2 border-red-600 rounded-full border-t-transparent mx-auto mb-2"
                data-oid="-tdr4.p"
              ></div>
              <p className="text-gray-600" data-oid="r9l6i_r">
                Cargando información del conductor...
              </p>
            </div>
          ) : driverInfo ? (
            <div className="space-y-6" data-oid="58_dt0b">
              {/* Driver Info */}
              <div
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                data-oid="uds8d-5"
              >
                <div
                  className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden"
                  data-oid="4wqqrjk"
                >
                  {driverInfo.photo ? (
                    <img
                      src={driverInfo.photo}
                      alt={driverInfo.name}
                      className="w-full h-full object-cover"
                      data-oid=".4w_rqv"
                    />
                  ) : (
                    <User
                      className="h-8 w-8 text-gray-500"
                      data-oid="17i4b4i"
                    />
                  )}
                </div>
                <div className="flex-1" data-oid="spiht_a">
                  <h3
                    className="font-semibold text-gray-800"
                    data-oid="p.:j2_z"
                  >
                    {driverInfo.name}
                  </h3>
                  <div
                    className="flex items-center text-sm text-gray-600 mt-1"
                    data-oid="1e0vrra"
                  >
                    <Star
                      className="h-4 w-4 text-gray-500 mr-1"
                      data-oid="jko9q1p"
                    />

                    <span data-oid="eoik0wi">{driverInfo.rating}/5</span>
                    <span className="mx-2" data-oid="x765gmm">
                      •
                    </span>
                    <span data-oid="8l9eoqb">
                      {driverInfo.total_trips} viajes
                    </span>
                  </div>
                  <div
                    className="text-xs text-gray-500 mt-1"
                    data-oid="nyjubn6"
                  >
                    {driverInfo.experience_years} años de experiencia
                  </div>
                </div>
              </div>

              {/* Vehicle Info */}
              <div className="p-4 bg-gray-100 rounded-lg" data-oid="ko7_d7v">
                <h4
                  className="font-medium text-gray-800 mb-2"
                  data-oid="asfbyu1"
                >
                  Detalles del Vehículo
                </h4>
                <div
                  className="text-sm text-gray-600 space-y-1"
                  data-oid="lnsts5m"
                >
                  <div data-oid="cqw7ypv">
                    <strong data-oid="ljwzxdo">Modelo:</strong>{" "}
                    {vehicle.vehicle_data?.model || vehicle.model || "N/A"}
                  </div>
                  <div data-oid="ufngpt9">
                    <strong data-oid="13bgagl">Matrícula:</strong>{" "}
                    {vehicle.vehicle_data?.licensePlate ||
                      vehicle.license_plate ||
                      "No disponible"}
                  </div>
                  <div data-oid="fdhc_y7">
                    <strong data-oid="5p6sdvl">Tipo:</strong>{" "}
                    {vehicle.availability_type === "fixed_zone"
                      ? "Zona Fija"
                      : "Ruta Flexible"}
                  </div>
                  {vehicle.zone_name && (
                    <div data-oid="1.oqa2h">
                      <strong data-oid="h526td-">Zona:</strong>{" "}
                      {vehicle.zone_name}
                    </div>
                  )}
                </div>
              </div>

              {/* Trip Info */}
              <div className="p-4 bg-amber-50 rounded-lg" data-oid="wra.7sd">
                <h4
                  className="font-medium text-gray-800 mb-2"
                  data-oid="-2a-z4x"
                >
                  Detalles del Viaje
                </h4>
                <div
                  className="text-sm text-gray-600 space-y-1"
                  data-oid="vw6etsr"
                >
                  <div className="flex items-center" data-oid="1ogpq5.">
                    <Clock className="h-4 w-4 mr-2" data-oid="n9h2y:w" />
                    <span data-oid="qdfmoqj">
                      <strong data-oid="mk9ehi2">Fecha:</strong> {pickupDate}
                    </span>
                  </div>
                  <div className="flex items-center" data-oid="ulhh3sy">
                    <MapPin className="h-4 w-4 mr-2" data-oid="q8oio0i" />
                    <span data-oid="8nj3ke7">
                      <strong data-oid="ksfqowc">Ubicación:</strong>{" "}
                      {pickupLocation}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Methods */}
              <div data-oid="ke_vbkj">
                <h4
                  className="font-medium text-gray-800 mb-3"
                  data-oid="w_i0lrf"
                >
                  Métodos de Contacto
                </h4>
                <div className="space-y-3" data-oid="8:7hofk">
                  {driverInfo.available_contact_methods?.includes("phone") && (
                    <div
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                      data-oid="uu_s:f1"
                    >
                      <div className="flex items-center" data-oid="rjwt5gz">
                        <Phone
                          className="h-5 w-5 text-green-600 mr-3"
                          data-oid="-6-.x:b"
                        />

                        <div data-oid="kr14sbu">
                          <div className="font-medium" data-oid="0-1i58f">
                            Teléfono
                          </div>
                          <div
                            className="text-sm text-gray-600"
                            data-oid=":4yy0ol"
                          >
                            {driverInfo.phone}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2" data-oid="njf4dxd">
                        <button
                          onClick={() => copyToClipboard(driverInfo.phone)}
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Copiar número"
                          data-oid="k5h:07."
                        >
                          <Copy className="h-4 w-4" data-oid="btladsq" />
                        </button>
                        <button
                          onClick={() => handleContact("phone")}
                          className="px-3 py-1 bg-black text-white text-sm rounded hover:bg-gray-800 transition-colors"
                          data-oid="8ffb7ha"
                        >
                          Llamar
                        </button>
                      </div>
                    </div>
                  )}

                  {driverInfo.available_contact_methods?.includes(
                    "whatsapp",
                  ) && (
                    <div
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                      data-oid="2u6hti:"
                    >
                      <div className="flex items-center" data-oid="x7b2phv">
                        <MessageCircle
                          className="h-5 w-5 text-gray-600 mr-3"
                          data-oid="tj9_533"
                        />

                        <div data-oid="xn6u-w7">
                          <div className="font-medium" data-oid="3b4jm-g">
                            WhatsApp
                          </div>
                          <div
                            className="text-sm text-gray-600"
                            data-oid="ow3ax1g"
                          >
                            {driverInfo.whatsapp}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleContact("whatsapp")}
                        className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-black transition-colors flex items-center"
                        data-oid="de50kcb"
                      >
                        <ExternalLink
                          className="h-3 w-3 mr-1"
                          data-oid=".6uy017"
                        />
                        Enviar
                      </button>
                    </div>
                  )}

                  {driverInfo.available_contact_methods?.includes("email") && (
                    <div
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                      data-oid="wd:ntt."
                    >
                      <div className="flex items-center" data-oid="jd6xydj">
                        <Mail
                          className="h-5 w-5 text-gray-600 mr-3"
                          data-oid="z8yepgq"
                        />

                        <div data-oid="o6000ky">
                          <div className="font-medium" data-oid="hyl4-mb">
                            Email
                          </div>
                          <div
                            className="text-sm text-gray-600"
                            data-oid="34nsrew"
                          >
                            {driverInfo.email}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2" data-oid="baq-iu-">
                        <button
                          onClick={() => copyToClipboard(driverInfo.email)}
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Copiar email"
                          data-oid="6jr43g."
                        >
                          <Copy className="h-4 w-4" data-oid="ksmjori" />
                        </button>
                        <button
                          onClick={() => handleContact("email")}
                          className="px-3 py-1 bg-black text-white text-sm rounded hover:bg-gray-800 transition-colors"
                          data-oid="5v95dtv"
                        >
                          Email
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Info */}
              {driverInfo.languages?.length > 0 && (
                <div className="p-3 bg-gray-50 rounded-lg" data-oid="a.ur84e">
                  <h4
                    className="font-medium text-gray-800 mb-2"
                    data-oid="-6:iv2f"
                  >
                    Idiomas
                  </h4>
                  <div className="flex flex-wrap gap-2" data-oid="suej473">
                    {driverInfo.languages.map((lang, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-200 text-blue-800 text-xs rounded"
                        data-oid="40z:qpd"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              <div data-oid="97zj3r0">
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  data-oid="aio.n-g"
                >
                  Notas adicionales (opcional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
                  rows={3}
                  placeholder="Agregar detalles adicionales sobre la consulta..."
                  data-oid="ob77jy."
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-8" data-oid="3m7cto9">
              <div className="text-gray-600 mb-2" data-oid="xv954ay">
                Error al cargar información del conductor
              </div>
              <button
                onClick={fetchDriverContactInfo}
                className="text-gray-600 hover:text-blue-800 text-sm"
                data-oid="7n0:qpb"
              >
                Intentar de nuevo
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="flex justify-end space-x-3 p-6 border-t border-gray-200"
          data-oid="fs_.y3m"
        >
          <Button
            onClick={onClose}
            variant="outline"
            disabled={isRegistering}
            data-oid="v--31mn"
          >
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactDriverModal;
