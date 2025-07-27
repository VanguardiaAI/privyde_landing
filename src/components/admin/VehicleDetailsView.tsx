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
  <div className={cn("flex items-start py-2.5", className)} data-oid="utbcv97">
    <span
      className="text-gray-600 mr-2 mt-0.5 flex-shrink-0"
      data-oid="hlpr1y7"
    >
      {icon}
    </span>
    <div className="flex-1" data-oid="timglib">
      <p
        className="text-sm font-medium text-gray-500 text-left"
        data-oid="5h_yg2u"
      >
        {label}
      </p>
      <div
        className="text-md text-gray-800 mt-0.5 text-left"
        data-oid="_on3th8"
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
    data-oid="l:pa43z"
  >
    <h4
      className="text-md font-semibold text-gray-700 mb-4 flex items-center border-b pb-2"
      data-oid="fikm3u_"
    >
      {icon}
      <span className="ml-2" data-oid="ngt.sh5">
        {title}
      </span>
    </h4>
    <div className="space-y-1" data-oid="_1-c1_9">
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
      <div className="flex flex-wrap gap-2" data-oid="l3rns1j">
        {vehicle.associatedDrivers.map((driver, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="bg-gray-200 text-gray-700"
            data-oid="x5uvm86"
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
      <div className="flex flex-wrap gap-2" data-oid="_dwhnty">
        {vehicle.availabilityType.map((type, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="bg-gray-200 text-gray-700"
            data-oid="xtunbr0"
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
      <div className="flex flex-wrap gap-2" data-oid="wo1s02n">
        {vehicle.details.features.map((feature, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="bg-gray-200 text-gray-700"
            data-oid="55:4a_x"
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
      data-oid="vz:d:-s"
    >
      <div
        className="bg-gray-50 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        data-oid="upx0gcc"
      >
        {/* Header */}
        <div
          className="flex justify-between items-center p-5 border-b border-gray-200 bg-white sticky top-0 z-10"
          data-oid="v_bihy."
        >
          <div className="flex items-center" data-oid="2dquy14">
            <div className="bg-gray-100 p-2 rounded-lg mr-3" data-oid="s6kpck0">
              <Car size={24} className="text-gray-600" data-oid="5a7z6kt" />
            </div>
            <div data-oid="lau_l-o">
              <h2
                className="text-xl font-semibold text-gray-800"
                data-oid="k12y4ff"
              >
                {vehicle.brand} {vehicle.model}
              </h2>
              <p className="text-sm text-gray-500" data-oid="p7klzdy">
                ID: {vehicle.id.substring(0, 8)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2" data-oid="6z1wxyo">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(vehicle)}
              className="flex items-center"
              data-oid="n034rkn"
            >
              <Edit3 size={16} className="mr-2" data-oid="usc8vqy" /> Editar
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              data-oid="i82zxqn"
            >
              <X size={24} data-oid="uoaas2e" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-5" data-oid="1vtoyq3">
          {/* Imagen y estado */}
          <div
            className="flex flex-col md:flex-row gap-6 mb-6"
            data-oid=":8rgcmk"
          >
            {vehicle.image ? (
              <div
                className="w-full md:w-1/2 h-48 rounded-lg overflow-hidden bg-white border shadow-sm"
                data-oid="unb:_.f"
              >
                <img
                  src={vehicle.image}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  className="w-full h-full object-cover"
                  data-oid="qqqszl."
                />
              </div>
            ) : (
              <div
                className="w-full md:w-1/2 h-48 rounded-lg bg-gray-100 flex items-center justify-center border"
                data-oid="lpdr_:m"
              >
                <Car size={64} className="text-gray-300" data-oid="st9:_dk" />
              </div>
            )}
            <div
              className="w-full md:w-1/2 p-5 border rounded-lg bg-white shadow-sm"
              data-oid="u_kfuvj"
            >
              <div
                className="flex justify-between items-center mb-4"
                data-oid="shx9q.j"
              >
                <h3
                  className="text-lg font-semibold text-gray-800"
                  data-oid="1ke:xgd"
                >
                  {vehicle.brand} {vehicle.model}{" "}
                  <span className="text-gray-500" data-oid="7a-2i.t">
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
                  data-oid="htiisr:"
                >
                  {vehicle.available ? "Disponible" : "No Disponible"}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4" data-oid="7v94-:.">
                <DetailRow
                  icon={<Car size={16} data-oid="6:2pold" />}
                  label="Matrícula"
                  value={
                    <span className="font-mono" data-oid="1kcte9n">
                      {vehicle.licensePlate}
                    </span>
                  }
                  data-oid="xp2cjml"
                />

                <DetailRow
                  icon={<Tag size={16} data-oid="vj8las0" />}
                  label="Tipo"
                  value={
                    vehicle.type.charAt(0).toUpperCase() + vehicle.type.slice(1)
                  }
                  data-oid="e.2eow7"
                />

                <DetailRow
                  icon={<Tag size={16} data-oid=".uvtpf3" />}
                  label="Categoría"
                  value={
                    vehicle.category.charAt(0).toUpperCase() +
                    vehicle.category.slice(1)
                  }
                  data-oid="4wrktgl"
                />

                <DetailRow
                  icon={<Info size={16} data-oid="ayl7kcf" />}
                  label="Color"
                  value={vehicle.color}
                  data-oid="iz6n10y"
                />
              </div>
            </div>
          </div>

          {/* Tabs para separar información */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
            data-oid="v2n54fk"
          >
            <TabsList className="grid grid-cols-4 mb-6" data-oid="2amu9t2">
              <TabsTrigger
                value="general"
                className="bg-white"
                data-oid="c6qvq9o"
              >
                Información General
              </TabsTrigger>
              <TabsTrigger
                value="features"
                className="bg-white"
                data-oid="rlb.qc-"
              >
                Características
              </TabsTrigger>
              <TabsTrigger
                value="logistics"
                className="bg-white"
                data-oid="5-j2cho"
              >
                Logística
              </TabsTrigger>
              <TabsTrigger
                value="business"
                className="bg-white"
                data-oid="7r5493:"
              >
                Información Comercial
              </TabsTrigger>
            </TabsList>

            {/* Tab: Información General */}
            <TabsContent
              value="general"
              className="space-y-6"
              data-oid="t_usxm."
            >
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                data-oid="my5:x27"
              >
                <DetailSection
                  title="Información Básica"
                  icon={
                    <Info
                      size={18}
                      className="text-gray-600"
                      data-oid=":3kyl6f"
                    />
                  }
                  data-oid="ttscga8"
                >
                  <div className="grid grid-cols-1 gap-y-3" data-oid="cdrj_84">
                    <DetailRow
                      icon={<Users size={16} data-oid="_c7e:27" />}
                      label="Asientos"
                      value={vehicle.seats.toString()}
                      data-oid="y0zywtu"
                    />

                    <DetailRow
                      icon={<Briefcase size={16} data-oid="4c8bn9b" />}
                      label="Cap. Maletas"
                      value={vehicle.luggageCapacity.toString()}
                      data-oid="ul2g56p"
                    />

                    {(vehicle.description || vehicle.notes) && (
                      <DetailRow
                        icon={<FileText size={16} data-oid="j5qkiml" />}
                        label="Descripción"
                        value={vehicle.description || vehicle.notes}
                        data-oid="gj6i7-_"
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
                        data-oid="3i7091f"
                      />
                    ) : (
                      <UserCircle
                        size={18}
                        className="text-gray-600"
                        data-oid="i2t89hs"
                      />
                    )
                  }
                  data-oid="3eqh8fe"
                >
                  <div className="grid grid-cols-1 gap-y-3" data-oid="2mqc:m4">
                    <DetailRow
                      icon={<Tag size={16} data-oid="k7nt-07" />}
                      label="Tipo de Propietario"
                      value={
                        vehicle.ownerType === "company"
                          ? "Empresa"
                          : "Chófer Privado"
                      }
                      data-oid="-h0ocx9"
                    />

                    <DetailRow
                      icon={<Users size={16} data-oid=".3wvbwk" />}
                      label="Nombre del Propietario"
                      value={vehicle.ownerName}
                      data-oid=":umfm.k"
                    />

                    <DetailRow
                      icon={<Globe size={16} data-oid="yr55nlo" />}
                      label="País"
                      value={
                        <span className="flex items-center" data-oid="nn_.jws">
                          {getCountryFlagEmoji(vehicle.ownerCountry)}{" "}
                          <span className="ml-1" data-oid="iuaz5c7">
                            {vehicle.ownerCountry}
                          </span>
                        </span>
                      }
                      data-oid="-q9wz8s"
                    />

                    {vehicle.collaboratorId && (
                      <DetailRow
                        icon={<Building size={16} data-oid="bynotas" />}
                        label="ID de Colaborador"
                        value={vehicle.collaboratorId}
                        data-oid="wjzwjko"
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
              data-oid="ufc5f7."
            >
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                data-oid="3besjno"
              >
                <DetailSection
                  title="Características"
                  icon={
                    <Layers
                      size={18}
                      className="text-gray-600"
                      data-oid="y-z9o6k"
                    />
                  }
                  data-oid="libv:cg"
                >
                  <DetailRow
                    icon={<Layers size={16} data-oid=".ptepb:" />}
                    label="Características"
                    value={renderFeatures()}
                    data-oid="w219r4:"
                  />

                  {vehicle.details?.armored && (
                    <>
                      <DetailRow
                        icon={<Shield size={16} data-oid="g7.u2e-" />}
                        label="Blindado"
                        value="Sí"
                        data-oid="9_6fivk"
                      />

                      {vehicle.details.armor_level && (
                        <DetailRow
                          icon={<Shield size={16} data-oid="n26phq0" />}
                          label="Nivel de Blindaje"
                          value={vehicle.details.armor_level}
                          data-oid="g2w01x5"
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
                        data-oid="we9tcd5"
                      />
                    }
                    data-oid="6lkazjr"
                  >
                    {vehicle.location.coordinates &&
                      vehicle.location.coordinates.length >= 2 && (
                        <>
                          <DetailRow
                            icon={<MapPin size={16} data-oid="k4d2.i3" />}
                            label="Coordenadas"
                            value={
                              <div data-oid="gnn.rj-">
                                <p data-oid="ccx4wy_">
                                  Longitud: {vehicle.location.coordinates[0]}
                                </p>
                                <p data-oid="finc_v1">
                                  Latitud: {vehicle.location.coordinates[1]}
                                </p>
                              </div>
                            }
                            data-oid="00:--c3"
                          />
                        </>
                      )}
                    {vehicle.availability_radius && (
                      <DetailRow
                        icon={<Compass size={16} data-oid=".dm9pb-" />}
                        label="Radio de Disponibilidad"
                        value={`${vehicle.availability_radius} km`}
                        data-oid=":yyc9n5"
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
              data-oid="qtqd_ez"
            >
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                data-oid="_27.zxd"
              >
                <DetailSection
                  title="Disponibilidad"
                  icon={
                    <MapPin
                      size={18}
                      className="text-gray-600"
                      data-oid="_i7ar6h"
                    />
                  }
                  data-oid="6j1hag7"
                >
                  <DetailRow
                    icon={<Tag size={16} data-oid="sgpqe_h" />}
                    label="Tipo Disponibilidad"
                    value={renderAvailabilityTypes()}
                    data-oid="81vwtlq"
                  />

                  <DetailRow
                    icon={<Info size={16} data-oid="f7r_:r3" />}
                    label="Detalles Disponibilidad"
                    value={
                      <p className="whitespace-pre-line" data-oid="r4z8d9b">
                        {vehicle.availabilityDetails}
                      </p>
                    }
                    data-oid="osi6rzr"
                  />
                </DetailSection>

                <DetailSection
                  title="Conductores Asignados"
                  icon={
                    <Users
                      size={18}
                      className="text-gray-600"
                      data-oid="7zh_g8s"
                    />
                  }
                  data-oid="wtb2c7l"
                >
                  <DetailRow
                    icon={<Users size={16} data-oid="u2zb:ei" />}
                    label="Chófer(es)"
                    value={renderAssociatedDrivers()}
                    data-oid="mtlaru6"
                  />
                </DetailSection>
              </div>

              <DetailSection
                title="Documentación y Mantenimiento"
                icon={
                  <FileText
                    size={18}
                    className="text-gray-600"
                    data-oid="boapvkk"
                  />
                }
                data-oid="m2bjj6g"
              >
                <div
                  className="grid grid-cols-1 md:grid-cols-3 gap-x-4"
                  data-oid="w:v5-8l"
                >
                  <DetailRow
                    icon={<Shield size={16} data-oid="adir41." />}
                    label="Nº Póliza de Seguro"
                    value={vehicle.insurancePolicyNumber}
                    data-oid="8pxoy5-"
                  />

                  <DetailRow
                    icon={<Calendar size={16} data-oid="5v6wa_w" />}
                    label="Último Mantenimiento"
                    value={
                      vehicle.lastMaintenanceDate
                        ? new Date(
                            vehicle.lastMaintenanceDate,
                          ).toLocaleDateString()
                        : "-"
                    }
                    data-oid="l86cjk4"
                  />

                  <DetailRow
                    icon={<Calendar size={16} data-oid="p55uhol" />}
                    label="Fin de Contrato"
                    value={
                      vehicle.contractEndDate
                        ? new Date(vehicle.contractEndDate).toLocaleDateString()
                        : "N/A"
                    }
                    data-oid="fmyov67"
                  />
                </div>
              </DetailSection>
            </TabsContent>

            {/* Tab: Información Comercial */}
            <TabsContent
              value="business"
              className="space-y-6"
              data-oid="c.my9p:"
            >
              {vehicle.pricing && (
                <DetailSection
                  title="Información de Precios"
                  icon={
                    <DollarSign
                      size={18}
                      className="text-gray-600"
                      data-oid="109u:xr"
                    />
                  }
                  data-oid="as4.b_t"
                >
                  <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    data-oid="xr:.gq_"
                  >
                    <DetailRow
                      icon={<DollarSign size={16} data-oid="krpdtst" />}
                      label="Tarifa Base"
                      value={
                        <span className="font-semibold" data-oid="9oq5g0p">
                          {vehicle.pricing.base_fare} {vehicle.pricing.currency}
                        </span>
                      }
                      data-oid="-6biwhz"
                    />

                    {vehicle.pricing.per_km && (
                      <DetailRow
                        icon={<MapPin size={16} data-oid="-h:it89" />}
                        label="Por Km"
                        value={`${vehicle.pricing.per_km} ${vehicle.pricing.currency}`}
                        data-oid="mnnznyr"
                      />
                    )}
                    {vehicle.pricing.per_hour && (
                      <DetailRow
                        icon={<Calendar size={16} data-oid="k3rhrkq" />}
                        label="Por Hora"
                        value={`${vehicle.pricing.per_hour} ${vehicle.pricing.currency}`}
                        data-oid="9nydjq_"
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
                      data-oid=":n:jqqg"
                    />
                  }
                  data-oid="6emsi0_"
                >
                  <p
                    className="text-gray-700 whitespace-pre-line p-2"
                    data-oid="-6inmzr"
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
          data-oid="6o2ykho"
        >
          <Button variant="outline" onClick={onClose} data-oid="tk2md-.">
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsView;
