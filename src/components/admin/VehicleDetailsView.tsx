import React, { useState } from "react";
import {
  X,
  Briefcase,
  Users,
  Globe,
  Car,
  Edit3,
  Tag,
  MapPin,
  FileText,
  Calendar,
  Shield,
  Info,
  Building,
  UserCircle,
  Layers,
  Compass,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Interfaz actualizada para incluir todos los campos disponibles
export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  seats: number;
  luggageCapacity: number;
  type: string;
  category: string;
  licensePlate: string;
  image?: string;
  available: boolean;
  ownerType: "company" | "private_driver";
  ownerName: string;
  ownerCountry: string;
  associatedDrivers: string[];
  availabilityType: string[]; // Cambiado a array de strings
  availabilityDetails: string;
  insurancePolicyNumber: string;
  lastMaintenanceDate: string;
  contractEndDate?: string;
  notes?: string;
  pricing?: {
    base_fare: number;
    currency: string;
    per_km?: number;
    per_hour?: number;
  };
  // Campos adicionales
  details?: {
    features?: string[];
    armored?: boolean;
    armor_level?: string;
  };
  location?: {
    type: string;
    coordinates: number[];
  };
  availability_radius?: number;
  description?: string;
  collaboratorId?: string;
}

interface VehicleDetailsViewProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onEdit: (vehicle: Vehicle) => void; // Función para iniciar la edición
}

const DetailRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  className?: string;
}> = ({ icon, label, value, className }) => (
  <div className={cn("flex items-start py-2.5", className)} data-oid="pskknfs">
    <span
      className="text-gray-600 mr-2 mt-0.5 flex-shrink-0"
      data-oid="fipo-4n"
    >
      {icon}
    </span>
    <div className="flex-1" data-oid="ttg:tf0">
      <p
        className="text-sm font-medium text-gray-500 text-left"
        data-oid="8t9mrcu"
      >
        {label}
      </p>
      <div
        className="text-md text-gray-800 mt-0.5 text-left"
        data-oid="5fxe1ou"
      >
        {value || "-"}
      </div>
    </div>
  </div>
);

const DetailSection: React.FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}> = ({ title, icon, children, className }) => (
  <div
    className={cn("border rounded-lg p-5 bg-white shadow-sm", className)}
    data-oid="otsdu84"
  >
    <h4
      className="text-md font-semibold text-gray-700 mb-4 flex items-center border-b pb-2"
      data-oid="acenxfe"
    >
      {icon}
      <span className="ml-2" data-oid="qlsng8r">
        {title}
      </span>
    </h4>
    <div className="space-y-1" data-oid="zmjd-ay">
      {children}
    </div>
  </div>
);

const getCountryFlagEmoji = (countryCode: string) => {
  if (!countryCode) return "";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

const VehicleDetailsView: React.FC<VehicleDetailsViewProps> = ({
  vehicle,
  onClose,
  onEdit,
}) => {
  const [activeTab, setActiveTab] = useState("general");

  if (!vehicle) return null;

  const renderAssociatedDrivers = () => {
    if (!vehicle.associatedDrivers || vehicle.associatedDrivers.length === 0) {
      return "-";
    }
    return (
      <div className="flex flex-wrap gap-2" data-oid="lw52j1f">
        {vehicle.associatedDrivers.map((driver, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="bg-gray-200 text-gray-700"
            data-oid="z2q6e95"
          >
            {driver} {/* Asumimos que son nombres o IDs legibles */}
          </Badge>
        ))}
      </div>
    );
  };

  // Nueva función para renderizar los tipos de disponibilidad
  const renderAvailabilityTypes = () => {
    if (!vehicle.availabilityType || vehicle.availabilityType.length === 0) {
      return "-";
    }

    // Mapeo de los tipos de disponibilidad a etiquetas en español
    const availabilityLabels: Record<string, string> = {
      fixed_route: "Ruta fija",
      flexible_route: "Ruta flexible",
      zone: "Zona",
    };

    return (
      <div className="flex flex-wrap gap-2" data-oid="js_fvyl">
        {vehicle.availabilityType.map((type, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="bg-gray-200 text-gray-700"
            data-oid="f2pjv-3"
          >
            {availabilityLabels[type] ||
              type.charAt(0).toUpperCase() + type.slice(1)}
          </Badge>
        ))}
      </div>
    );
  };

  const renderFeatures = () => {
    if (!vehicle.details?.features || vehicle.details.features.length === 0) {
      return "-";
    }
    return (
      <div className="flex flex-wrap gap-2" data-oid="u98orap">
        {vehicle.details.features.map((feature, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="bg-gray-200 text-gray-700"
            data-oid="x7rchen"
          >
            {feature}
          </Badge>
        ))}
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-y-auto"
      data-oid="hx8n2nw"
    >
      <div
        className="bg-gray-50 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        data-oid="clo9ksh"
      >
        {/* Header */}
        <div
          className="flex justify-between items-center p-5 border-b border-gray-200 bg-white sticky top-0 z-10"
          data-oid="kbx-rfv"
        >
          <div className="flex items-center" data-oid="vlryf-x">
            <div className="bg-gray-100 p-2 rounded-lg mr-3" data-oid="6af::f7">
              <Car size={24} className="text-gray-600" data-oid="2erxcnr" />
            </div>
            <div data-oid="ad5cz8t">
              <h2
                className="text-xl font-semibold text-gray-800"
                data-oid="ce8w_09"
              >
                {vehicle.brand} {vehicle.model}
              </h2>
              <p className="text-sm text-gray-500" data-oid="z7dz4cg">
                ID: {vehicle.id.substring(0, 8)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2" data-oid="6uz:aan">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(vehicle)}
              className="flex items-center"
              data-oid="r400eu9"
            >
              <Edit3 size={16} className="mr-2" data-oid="23_5i3n" /> Editar
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              data-oid="l7fgrlg"
            >
              <X size={24} data-oid="bhsd3zd" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-5" data-oid="6ahd:wt">
          {/* Imagen y estado */}
          <div
            className="flex flex-col md:flex-row gap-6 mb-6"
            data-oid="8x8ahqw"
          >
            {vehicle.image ? (
              <div
                className="w-full md:w-1/2 h-48 rounded-lg overflow-hidden bg-white border shadow-sm"
                data-oid="4o.fl-d"
              >
                <img
                  src={vehicle.image}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  className="w-full h-full object-cover"
                  data-oid="0tdryhk"
                />
              </div>
            ) : (
              <div
                className="w-full md:w-1/2 h-48 rounded-lg bg-gray-100 flex items-center justify-center border"
                data-oid="o0:9.zy"
              >
                <Car size={64} className="text-gray-300" data-oid="--h0t:w" />
              </div>
            )}
            <div
              className="w-full md:w-1/2 p-5 border rounded-lg bg-white shadow-sm"
              data-oid="hji61e5"
            >
              <div
                className="flex justify-between items-center mb-4"
                data-oid="s23zzmx"
              >
                <h3
                  className="text-lg font-semibold text-gray-800"
                  data-oid="d:c_xm."
                >
                  {vehicle.brand} {vehicle.model}{" "}
                  <span className="text-gray-500" data-oid="y3br4f:">
                    ({vehicle.year})
                  </span>
                </h3>
                <Badge
                  variant={vehicle.available ? "default" : "destructive"}
                  className={
                    vehicle.available
                      ? "bg-gray-200 text-green-700"
                      : "bg-gray-200 text-gray-700"
                  }
                  data-oid="q5dv-jm"
                >
                  {vehicle.available ? "Disponible" : "No Disponible"}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4" data-oid="cnxd5t2">
                <DetailRow
                  icon={<Car size={16} data-oid="kn_t12v" />}
                  label="Matrícula"
                  value={
                    <span className="font-mono" data-oid="sflr72l">
                      {vehicle.licensePlate}
                    </span>
                  }
                  data-oid="8ua1f.g"
                />

                <DetailRow
                  icon={<Tag size={16} data-oid="vxwe21i" />}
                  label="Tipo"
                  value={
                    vehicle.type.charAt(0).toUpperCase() + vehicle.type.slice(1)
                  }
                  data-oid="vj1f4c9"
                />

                <DetailRow
                  icon={<Tag size={16} data-oid="w1hft7r" />}
                  label="Categoría"
                  value={
                    vehicle.category.charAt(0).toUpperCase() +
                    vehicle.category.slice(1)
                  }
                  data-oid="irytsjj"
                />

                <DetailRow
                  icon={<Info size={16} data-oid="4l:.qcz" />}
                  label="Color"
                  value={vehicle.color}
                  data-oid="c6:lfoi"
                />
              </div>
            </div>
          </div>

          {/* Tabs para separar información */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
            data-oid=".b.b5_1"
          >
            <TabsList className="grid grid-cols-4 mb-6" data-oid="73khhel">
              <TabsTrigger
                value="general"
                className="bg-white"
                data-oid="gsev0tp"
              >
                Información General
              </TabsTrigger>
              <TabsTrigger
                value="features"
                className="bg-white"
                data-oid="kyqgejh"
              >
                Características
              </TabsTrigger>
              <TabsTrigger
                value="logistics"
                className="bg-white"
                data-oid="9h83cto"
              >
                Logística
              </TabsTrigger>
              <TabsTrigger
                value="business"
                className="bg-white"
                data-oid="y-yrzo."
              >
                Información Comercial
              </TabsTrigger>
            </TabsList>

            {/* Tab: Información General */}
            <TabsContent
              value="general"
              className="space-y-6"
              data-oid="mvi-5il"
            >
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                data-oid="we7z.ka"
              >
                <DetailSection
                  title="Información Básica"
                  icon={
                    <Info
                      size={18}
                      className="text-gray-600"
                      data-oid="m5gwq-c"
                    />
                  }
                  data-oid="3uwt9p0"
                >
                  <div className="grid grid-cols-1 gap-y-3" data-oid="kue1:or">
                    <DetailRow
                      icon={<Users size={16} data-oid="5.9f8s5" />}
                      label="Asientos"
                      value={vehicle.seats.toString()}
                      data-oid="d::4qs7"
                    />

                    <DetailRow
                      icon={<Briefcase size={16} data-oid="ox3o12h" />}
                      label="Cap. Maletas"
                      value={vehicle.luggageCapacity.toString()}
                      data-oid="czkvu5_"
                    />

                    {(vehicle.description || vehicle.notes) && (
                      <DetailRow
                        icon={<FileText size={16} data-oid="yfjsi45" />}
                        label="Descripción"
                        value={vehicle.description || vehicle.notes}
                        data-oid="485::h_"
                      />
                    )}
                  </div>
                </DetailSection>

                <DetailSection
                  title="Propietario"
                  icon={
                    vehicle.ownerType === "company" ? (
                      <Building
                        size={18}
                        className="text-gray-600"
                        data-oid="sp-p:zy"
                      />
                    ) : (
                      <UserCircle
                        size={18}
                        className="text-gray-600"
                        data-oid="-7q_ba8"
                      />
                    )
                  }
                  data-oid="91k3oo:"
                >
                  <div className="grid grid-cols-1 gap-y-3" data-oid="f0n9dlc">
                    <DetailRow
                      icon={<Tag size={16} data-oid="m6nhooh" />}
                      label="Tipo de Propietario"
                      value={
                        vehicle.ownerType === "company"
                          ? "Empresa"
                          : "Chófer Privado"
                      }
                      data-oid="phuy0.o"
                    />

                    <DetailRow
                      icon={<Users size={16} data-oid="zgyi7:c" />}
                      label="Nombre del Propietario"
                      value={vehicle.ownerName}
                      data-oid="bmfx7yh"
                    />

                    <DetailRow
                      icon={<Globe size={16} data-oid="5r151z7" />}
                      label="País"
                      value={
                        <span className="flex items-center" data-oid="gg_g9u.">
                          {getCountryFlagEmoji(vehicle.ownerCountry)}{" "}
                          <span className="ml-1" data-oid="fqsf3pm">
                            {vehicle.ownerCountry}
                          </span>
                        </span>
                      }
                      data-oid="tiojj_a"
                    />

                    {vehicle.collaboratorId && (
                      <DetailRow
                        icon={<Building size={16} data-oid="q7redmc" />}
                        label="ID de Colaborador"
                        value={vehicle.collaboratorId}
                        data-oid="ie2r.g8"
                      />
                    )}
                  </div>
                </DetailSection>
              </div>
            </TabsContent>

            {/* Tab: Características */}
            <TabsContent
              value="features"
              className="space-y-6"
              data-oid=":_akndu"
            >
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                data-oid="p6nmckv"
              >
                <DetailSection
                  title="Características"
                  icon={
                    <Layers
                      size={18}
                      className="text-gray-600"
                      data-oid="hefm-xl"
                    />
                  }
                  data-oid="k8v33r9"
                >
                  <DetailRow
                    icon={<Layers size={16} data-oid="r2cbtlq" />}
                    label="Características"
                    value={renderFeatures()}
                    data-oid="4e8--91"
                  />

                  {vehicle.details?.armored && (
                    <>
                      <DetailRow
                        icon={<Shield size={16} data-oid="c..8ahi" />}
                        label="Blindado"
                        value="Sí"
                        data-oid="ptlbnx8"
                      />

                      {vehicle.details.armor_level && (
                        <DetailRow
                          icon={<Shield size={16} data-oid="mi5xi5-" />}
                          label="Nivel de Blindaje"
                          value={vehicle.details.armor_level}
                          data-oid="-ue:ve6"
                        />
                      )}
                    </>
                  )}
                </DetailSection>

                {vehicle.location && (
                  <DetailSection
                    title="Ubicación"
                    icon={
                      <Compass
                        size={18}
                        className="text-gray-600"
                        data-oid="dy23cm5"
                      />
                    }
                    data-oid="pkd4:f4"
                  >
                    {vehicle.location.coordinates &&
                      vehicle.location.coordinates.length >= 2 && (
                        <>
                          <DetailRow
                            icon={<MapPin size={16} data-oid="7m0ff3j" />}
                            label="Coordenadas"
                            value={
                              <div data-oid="x47jo_4">
                                <p data-oid="ixkcq26">
                                  Longitud: {vehicle.location.coordinates[0]}
                                </p>
                                <p data-oid="j7px_ts">
                                  Latitud: {vehicle.location.coordinates[1]}
                                </p>
                              </div>
                            }
                            data-oid="xgmh55x"
                          />
                        </>
                      )}
                    {vehicle.availability_radius && (
                      <DetailRow
                        icon={<Compass size={16} data-oid="l08divq" />}
                        label="Radio de Disponibilidad"
                        value={`${vehicle.availability_radius} km`}
                        data-oid="e1o2q85"
                      />
                    )}
                  </DetailSection>
                )}
              </div>
            </TabsContent>

            {/* Tab: Logística */}
            <TabsContent
              value="logistics"
              className="space-y-6"
              data-oid="givlhik"
            >
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                data-oid="pd3ifgs"
              >
                <DetailSection
                  title="Disponibilidad"
                  icon={
                    <MapPin
                      size={18}
                      className="text-gray-600"
                      data-oid="fcfdjbf"
                    />
                  }
                  data-oid="gz6revz"
                >
                  <DetailRow
                    icon={<Tag size={16} data-oid="8os58-h" />}
                    label="Tipo Disponibilidad"
                    value={renderAvailabilityTypes()}
                    data-oid="pnjic7a"
                  />

                  <DetailRow
                    icon={<Info size={16} data-oid="szvt9wa" />}
                    label="Detalles Disponibilidad"
                    value={
                      <p className="whitespace-pre-line" data-oid="y07okrk">
                        {vehicle.availabilityDetails}
                      </p>
                    }
                    data-oid="v:2r:vv"
                  />
                </DetailSection>

                <DetailSection
                  title="Conductores Asignados"
                  icon={
                    <Users
                      size={18}
                      className="text-gray-600"
                      data-oid="pz180wk"
                    />
                  }
                  data-oid="slupye:"
                >
                  <DetailRow
                    icon={<Users size={16} data-oid="4foc14i" />}
                    label="Chófer(es)"
                    value={renderAssociatedDrivers()}
                    data-oid="q.yz9f3"
                  />
                </DetailSection>
              </div>

              <DetailSection
                title="Documentación y Mantenimiento"
                icon={
                  <FileText
                    size={18}
                    className="text-gray-600"
                    data-oid="x5tg1e-"
                  />
                }
                data-oid="8vpaz1x"
              >
                <div
                  className="grid grid-cols-1 md:grid-cols-3 gap-x-4"
                  data-oid="iw4u6ka"
                >
                  <DetailRow
                    icon={<Shield size={16} data-oid="net2u78" />}
                    label="Nº Póliza de Seguro"
                    value={vehicle.insurancePolicyNumber}
                    data-oid="23mgz25"
                  />

                  <DetailRow
                    icon={<Calendar size={16} data-oid="gyabfdx" />}
                    label="Último Mantenimiento"
                    value={
                      vehicle.lastMaintenanceDate
                        ? new Date(
                            vehicle.lastMaintenanceDate,
                          ).toLocaleDateString()
                        : "-"
                    }
                    data-oid="nu_pzo2"
                  />

                  <DetailRow
                    icon={<Calendar size={16} data-oid="u_018_y" />}
                    label="Fin de Contrato"
                    value={
                      vehicle.contractEndDate
                        ? new Date(vehicle.contractEndDate).toLocaleDateString()
                        : "N/A"
                    }
                    data-oid="y_glybm"
                  />
                </div>
              </DetailSection>
            </TabsContent>

            {/* Tab: Información Comercial */}
            <TabsContent
              value="business"
              className="space-y-6"
              data-oid="p0e-:0w"
            >
              {vehicle.pricing && (
                <DetailSection
                  title="Información de Precios"
                  icon={
                    <DollarSign
                      size={18}
                      className="text-gray-600"
                      data-oid="4mq:6za"
                    />
                  }
                  data-oid="1z-7u3c"
                >
                  <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    data-oid="8lefc1l"
                  >
                    <DetailRow
                      icon={<DollarSign size={16} data-oid="w_xt:e_" />}
                      label="Tarifa Base"
                      value={
                        <span className="font-semibold" data-oid="ez3q8.i">
                          {vehicle.pricing.base_fare} {vehicle.pricing.currency}
                        </span>
                      }
                      data-oid="e1hb1ox"
                    />

                    {vehicle.pricing.per_km && (
                      <DetailRow
                        icon={<MapPin size={16} data-oid="wyqg-a9" />}
                        label="Por Km"
                        value={`${vehicle.pricing.per_km} ${vehicle.pricing.currency}`}
                        data-oid="tcbzj10"
                      />
                    )}
                    {vehicle.pricing.per_hour && (
                      <DetailRow
                        icon={<Calendar size={16} data-oid="77ucqfh" />}
                        label="Por Hora"
                        value={`${vehicle.pricing.per_hour} ${vehicle.pricing.currency}`}
                        data-oid="hi4ga6y"
                      />
                    )}
                  </div>
                </DetailSection>
              )}

              {(vehicle.notes || vehicle.description) && (
                <DetailSection
                  title="Notas Adicionales"
                  icon={
                    <FileText
                      size={18}
                      className="text-gray-600"
                      data-oid="-ttg7lz"
                    />
                  }
                  data-oid=".666r40"
                >
                  <p
                    className="text-gray-700 whitespace-pre-line p-2"
                    data-oid="mvnogby"
                  >
                    {vehicle.notes || vehicle.description}
                  </p>
                </DetailSection>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer con botón de cerrar */}
        <div
          className="p-5 border-t border-gray-200 bg-white flex justify-end sticky bottom-0"
          data-oid="ak6nmxi"
        >
          <Button variant="outline" onClick={onClose} data-oid="78br-fo">
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsView;
