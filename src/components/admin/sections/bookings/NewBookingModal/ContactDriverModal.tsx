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
      data-oid="kj5:2cz"
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
        data-oid="lqpakce"
      >
        {/* Header */}
        <div
          className="flex justify-between items-center p-6 border-b border-gray-200"
          data-oid="f46govu"
        >
          <h2
            className="text-xl font-semibold text-gray-800"
            data-oid="eg2040a"
          >
            Contactar Conductor
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            data-oid="l1aa37n"
          >
            <X className="h-6 w-6" data-oid="fzk2zqw" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6" data-oid="j14wfxy">
          {isLoading ? (
            <div className="text-center py-8" data-oid="v49bovm">
              <div
                className="animate-spin h-8 w-8 border-2 border-red-600 rounded-full border-t-transparent mx-auto mb-2"
                data-oid="e84gj2a"
              ></div>
              <p className="text-gray-600" data-oid="mf5ou8k">
                Cargando información del conductor...
              </p>
            </div>
          ) : driverInfo ? (
            <div className="space-y-6" data-oid="39i5cm7">
              {/* Driver Info */}
              <div
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                data-oid="nvlk6dl"
              >
                <div
                  className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden"
                  data-oid="e0pctzv"
                >
                  {driverInfo.photo ? (
                    <img
                      src={driverInfo.photo}
                      alt={driverInfo.name}
                      className="w-full h-full object-cover"
                      data-oid="o5zksvf"
                    />
                  ) : (
                    <User
                      className="h-8 w-8 text-gray-500"
                      data-oid="1rvtxt."
                    />
                  )}
                </div>
                <div className="flex-1" data-oid="11:asw7">
                  <h3
                    className="font-semibold text-gray-800"
                    data-oid="w3n777-"
                  >
                    {driverInfo.name}
                  </h3>
                  <div
                    className="flex items-center text-sm text-gray-600 mt-1"
                    data-oid="cb1fyzp"
                  >
                    <Star
                      className="h-4 w-4 text-gray-500 mr-1"
                      data-oid="e352i1m"
                    />

                    <span data-oid="wg_.x7m">{driverInfo.rating}/5</span>
                    <span className="mx-2" data-oid="yjtszki">
                      •
                    </span>
                    <span data-oid="-9bgirp">
                      {driverInfo.total_trips} viajes
                    </span>
                  </div>
                  <div
                    className="text-xs text-gray-500 mt-1"
                    data-oid="-b47wlt"
                  >
                    {driverInfo.experience_years} años de experiencia
                  </div>
                </div>
              </div>

              {/* Vehicle Info */}
              <div className="p-4 bg-gray-100 rounded-lg" data-oid="9mrsao9">
                <h4
                  className="font-medium text-gray-800 mb-2"
                  data-oid="836acqf"
                >
                  Detalles del Vehículo
                </h4>
                <div
                  className="text-sm text-gray-600 space-y-1"
                  data-oid="81l.nis"
                >
                  <div data-oid="op1e08a">
                    <strong data-oid="kxhqc5-">Modelo:</strong>{" "}
                    {vehicle.vehicle_data?.model || vehicle.model || "N/A"}
                  </div>
                  <div data-oid="6z3q_xx">
                    <strong data-oid="_51_y1j">Matrícula:</strong>{" "}
                    {vehicle.vehicle_data?.licensePlate ||
                      vehicle.license_plate ||
                      "No disponible"}
                  </div>
                  <div data-oid="0xrgykj">
                    <strong data-oid="x.gnvy1">Tipo:</strong>{" "}
                    {vehicle.availability_type === "fixed_zone"
                      ? "Zona Fija"
                      : "Ruta Flexible"}
                  </div>
                  {vehicle.zone_name && (
                    <div data-oid=":.d_57a">
                      <strong data-oid="7azq9x4">Zona:</strong>{" "}
                      {vehicle.zone_name}
                    </div>
                  )}
                </div>
              </div>

              {/* Trip Info */}
              <div className="p-4 bg-amber-50 rounded-lg" data-oid="1v-b739">
                <h4
                  className="font-medium text-gray-800 mb-2"
                  data-oid="u94r82l"
                >
                  Detalles del Viaje
                </h4>
                <div
                  className="text-sm text-gray-600 space-y-1"
                  data-oid="-l:gcg0"
                >
                  <div className="flex items-center" data-oid="zv0hn7k">
                    <Clock className="h-4 w-4 mr-2" data-oid="3p.ecyq" />
                    <span data-oid="t7eto..">
                      <strong data-oid="o4arbki">Fecha:</strong> {pickupDate}
                    </span>
                  </div>
                  <div className="flex items-center" data-oid=".r8:rl0">
                    <MapPin className="h-4 w-4 mr-2" data-oid="vhl7q26" />
                    <span data-oid=":c8gw.j">
                      <strong data-oid="n1mf8s6">Ubicación:</strong>{" "}
                      {pickupLocation}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Methods */}
              <div data-oid="ejuchoj">
                <h4
                  className="font-medium text-gray-800 mb-3"
                  data-oid="r.390.a"
                >
                  Métodos de Contacto
                </h4>
                <div className="space-y-3" data-oid="7f:3i:0">
                  {driverInfo.available_contact_methods?.includes("phone") && (
                    <div
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                      data-oid="8ug43rc"
                    >
                      <div className="flex items-center" data-oid="0l59ky2">
                        <Phone
                          className="h-5 w-5 text-green-600 mr-3"
                          data-oid="olgbx4."
                        />

                        <div data-oid="ezlx1t7">
                          <div className="font-medium" data-oid="q302-wi">
                            Teléfono
                          </div>
                          <div
                            className="text-sm text-gray-600"
                            data-oid="c.vzdh9"
                          >
                            {driverInfo.phone}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2" data-oid="2:y_8.j">
                        <button
                          onClick={() => copyToClipboard(driverInfo.phone)}
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Copiar número"
                          data-oid="mvun0w7"
                        >
                          <Copy className="h-4 w-4" data-oid="sngcgx." />
                        </button>
                        <button
                          onClick={() => handleContact("phone")}
                          className="px-3 py-1 bg-black text-white text-sm rounded hover:bg-gray-800 transition-colors"
                          data-oid="93h:w8p"
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
                      data-oid="vvm3qj0"
                    >
                      <div className="flex items-center" data-oid="vlckls8">
                        <MessageCircle
                          className="h-5 w-5 text-gray-600 mr-3"
                          data-oid="a:5w-5:"
                        />

                        <div data-oid="i61ufbd">
                          <div className="font-medium" data-oid="5gg-uok">
                            WhatsApp
                          </div>
                          <div
                            className="text-sm text-gray-600"
                            data-oid=":hzq332"
                          >
                            {driverInfo.whatsapp}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleContact("whatsapp")}
                        className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-black transition-colors flex items-center"
                        data-oid="6dr5a3l"
                      >
                        <ExternalLink
                          className="h-3 w-3 mr-1"
                          data-oid="9.6yb:i"
                        />
                        Enviar
                      </button>
                    </div>
                  )}

                  {driverInfo.available_contact_methods?.includes("email") && (
                    <div
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                      data-oid="jlz47la"
                    >
                      <div className="flex items-center" data-oid="m.jm48b">
                        <Mail
                          className="h-5 w-5 text-gray-600 mr-3"
                          data-oid="5.r0.1."
                        />

                        <div data-oid="vmhy.j7">
                          <div className="font-medium" data-oid="8fzbwjo">
                            Email
                          </div>
                          <div
                            className="text-sm text-gray-600"
                            data-oid="rtk:mr7"
                          >
                            {driverInfo.email}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2" data-oid="._gdyqo">
                        <button
                          onClick={() => copyToClipboard(driverInfo.email)}
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Copiar email"
                          data-oid=".kywqmn"
                        >
                          <Copy className="h-4 w-4" data-oid="27prtz2" />
                        </button>
                        <button
                          onClick={() => handleContact("email")}
                          className="px-3 py-1 bg-black text-white text-sm rounded hover:bg-gray-800 transition-colors"
                          data-oid="s8dro1i"
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
                <div className="p-3 bg-gray-50 rounded-lg" data-oid="966g3aa">
                  <h4
                    className="font-medium text-gray-800 mb-2"
                    data-oid="ki2-r2c"
                  >
                    Idiomas
                  </h4>
                  <div className="flex flex-wrap gap-2" data-oid="6fysoko">
                    {driverInfo.languages.map((lang, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-200 text-blue-800 text-xs rounded"
                        data-oid="wk0uyg_"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              <div data-oid="bx1:q6.">
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  data-oid="54nxqnx"
                >
                  Notas adicionales (opcional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
                  rows={3}
                  placeholder="Agregar detalles adicionales sobre la consulta..."
                  data-oid="2afc.2c"
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-8" data-oid="qnoh66k">
              <div className="text-gray-600 mb-2" data-oid="0b.h6fo">
                Error al cargar información del conductor
              </div>
              <button
                onClick={fetchDriverContactInfo}
                className="text-gray-600 hover:text-blue-800 text-sm"
                data-oid="a_7hlj5"
              >
                Intentar de nuevo
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="flex justify-end space-x-3 p-6 border-t border-gray-200"
          data-oid="334gagw"
        >
          <Button
            onClick={onClose}
            variant="outline"
            disabled={isRegistering}
            data-oid="bpcuk2c"
          >
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactDriverModal;
