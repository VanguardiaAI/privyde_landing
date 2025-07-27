import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  Search,
  Edit,
  Trash2,
  ToggleLeft,
  ToggleRight,
  MapPin,
  Car,
  Building,
  X,
  Eye,
  Info,
  Maximize2,
} from "lucide-react";
import { FlexibleZone } from "@/components/admin/sections/RoutesSection";
import FlexibleZoneForm from "./FlexibleZoneForm";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

// Nueva interfaz para la información del colaborador
interface Collaborator {
  id: string;
  name: string;
}

interface FlexibleRoutesTabProps {
  zones: FlexibleZone[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onCreateZone: (zoneData: Partial<FlexibleZone>) => Promise<boolean>;
  onUpdateZone: (
    zoneId: string,
    zoneData: Partial<FlexibleZone>,
  ) => Promise<boolean>;
  onDeleteZone: (zoneId: string) => Promise<boolean>;
  onToggleStatus: (zoneId: string) => Promise<boolean>;
}

// Componente para inicializar y almacenar la API key de Google Maps
const initGoogleMapsKey = () => {
  // Para simplificar, usamos una API key fija en desarrollo
  // En producción, esta debería venir de variables de entorno
  const HARDCODED_API_KEY = "AIzaSyCU7y7Jp7Fk-dLhURDYKBaWx_lWv28qyFc";

  // Intentar obtener la API key de diferentes fuentes
  const storedKey = localStorage.getItem("GOOGLE_MAPS_API_KEY");
  const envKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Usar la primera disponible o la hardcodeada en último caso
  const apiKey = envKey || storedKey || HARDCODED_API_KEY;

  // Guardar en localStorage para uso futuro
  if (apiKey && !storedKey) {
    localStorage.setItem("GOOGLE_MAPS_API_KEY", apiKey);
    console.log("API Key de Google Maps almacenada en localStorage");
  }

  return apiKey;
};

// Componente de mapa simplificado que usa la API key inicializada
const GoogleZoneMap = ({
  center,
  radius,
}: {
  center: {
    name: string;
    location: { type: string; coordinates: [number, number] };
  };
  radius: number;
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFullscreen, setShowFullscreen] = useState(false);

  // Inicializar la API key al montar el componente
  useEffect(() => {
    initGoogleMapsKey();
  }, []);

  // Validar datos de entrada
  if (!center?.location?.coordinates) {
    return (
      <div
        className="h-64 w-full bg-gray-100 flex items-center justify-center text-gray-500 text-sm"
        data-oid="97sugi:"
      >
        Faltan coordenadas para mostrar el mapa
      </div>
    );
  }

  // Extraer coordenadas de manera segura
  const centerCoords = {
    lat: center.location.coordinates[1],
    lng: center.location.coordinates[0],
  };

  // Ajustar el zoom basado en el radio
  let zoom = 12;
  if (radius > 20) zoom = 10;
  else if (radius > 10) zoom = 11;
  else if (radius < 5) zoom = 13;

  // Obtener la API key del localStorage
  const googleApiKey =
    localStorage.getItem("GOOGLE_MAPS_API_KEY") || initGoogleMapsKey();

  // URL para el iframe de Google Maps
  const googleUrl = `https://www.google.com/maps/embed/v1/place?key=${googleApiKey}&q=${centerCoords.lat},${centerCoords.lng}&zoom=${zoom}`;

  return (
    <>
      <div
        className="w-full h-64 rounded-lg overflow-hidden shadow-sm border relative bg-gray-50"
        data-oid="627fuae"
      >
        {loading && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10"
            data-oid="xexd_lb"
          >
            <div
              className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"
              data-oid="9bskok_"
            ></div>
          </div>
        )}

        <iframe
          src={googleUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setLoading(false)}
          onError={(e) => {
            console.error("Error al cargar el mapa:", e);
            setError("Error al cargar el mapa");
            setLoading(false);
          }}
          data-oid="9t616xp"
        ></iframe>

        <div
          className="absolute bottom-2 left-2 right-2 bg-white bg-opacity-90 p-2 rounded-md text-xs flex flex-col"
          data-oid="i_udjwv"
        >
          <div className="flex justify-between items-center" data-oid="ufa7-u3">
            <div data-oid="5_qhmdi">
              <span className="font-bold" data-oid="w7m-q85">
                Centro:
              </span>{" "}
              {center.name}
            </div>
            <div data-oid="i8tlp9h">
              <span className="font-bold" data-oid="9y4qigy">
                Radio:
              </span>{" "}
              {radius} km
            </div>
          </div>
          <div
            className="mt-1 text-xs text-gray-500 flex justify-between items-center"
            data-oid="_wgkwsw"
          >
            {error ? (
              <span className="text-black" data-oid="qorxi72">
                {error}
              </span>
            ) : (
              <span data-oid="yupt52l">Google Maps</span>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-700 hover:text-gray-900"
              onClick={() => setShowFullscreen(true)}
              data-oid="-euscc-"
            >
              <Maximize2 className="h-4 w-4" data-oid="d9e7qqt" />
              <span className="sr-only" data-oid="eth1fzg">
                Ampliar
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Modal para mostrar el mapa a pantalla completa */}
      {showFullscreen && (
        <Dialog
          open={showFullscreen}
          onOpenChange={setShowFullscreen}
          data-oid="pf_9hhq"
        >
          <DialogContent
            className="max-w-6xl max-h-[90vh] p-0 overflow-hidden"
            data-oid="0gev.zh"
          >
            <div className="relative h-[80vh] w-full" data-oid="ozn45mv">
              <iframe
                src={googleUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                data-oid="7i9_2vq"
              ></iframe>

              <div
                className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 p-3 rounded-md shadow-md"
                data-oid="4xo5wpl"
              >
                <div
                  className="flex justify-between items-center"
                  data-oid="3u3xggt"
                >
                  <div data-oid="v.k2jdv">
                    <div className="font-bold text-lg mb-1" data-oid="7-ivj5w">
                      Zona Flexible
                    </div>
                    <div className="flex flex-col" data-oid="o9ucbyc">
                      <div className="flex items-center" data-oid="kzm58j1">
                        <MapPin
                          className="h-4 w-4 text-black mr-1 flex-shrink-0"
                          data-oid="uc4fqel"
                        />

                        <span className="font-medium" data-oid="u6zc5cj">
                          Centro:
                        </span>
                        <span className="ml-1" data-oid="1.agp:3">
                          {center.name}
                        </span>
                      </div>
                      <div
                        className="flex items-center mt-1"
                        data-oid="3h5f8gn"
                      >
                        <span className="font-medium" data-oid="xso.5q0">
                          Radio de cobertura:
                        </span>
                        <span className="ml-1" data-oid="r31i67j">
                          {radius} km
                        </span>
                      </div>
                      <div
                        className="flex items-center mt-1 text-sm text-gray-600"
                        data-oid="suwfuv:"
                      >
                        <span className="italic" data-oid="vshg-m:">
                          El área sombreada muestra la zona aproximada de
                          cobertura
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="default"
                    className="bg-black hover:bg-gray-800 text-white"
                    onClick={() => setShowFullscreen(false)}
                    data-oid="8ku_pjn"
                  >
                    <X className="h-4 w-4 mr-2" data-oid="frf6a7u" />
                    Cerrar
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

const FlexibleRoutesTab = ({
  zones,
  searchQuery,
  setSearchQuery,
  onCreateZone,
  onUpdateZone,
  onDeleteZone,
  onToggleStatus,
}: FlexibleRoutesTabProps) => {
  // Estados locales
  const [showZoneForm, setShowZoneForm] = useState(false);
  const [editingZone, setEditingZone] = useState<FlexibleZone | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Estado para el diálogo de detalles
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedZone, setSelectedZone] = useState<FlexibleZone | null>(null);

  // Estado para la lista de colaboradores
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);

  // Función para obtener el token de autenticación
  const getAuthToken = () => {
    return localStorage.getItem("authToken");
  };

  // Configurar headers para las peticiones
  const getAuthHeaders = () => {
    const token = getAuthToken();
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  };

  // Cargar la lista de colaboradores al iniciar
  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        const response = await fetch("/api/admin/collaborators/list", {
          headers: getAuthHeaders().headers,
        });

        if (!response.ok) {
          throw new Error("Error al cargar los colaboradores");
        }

        const data = await response.json();
        if (data.status === "success") {
          setCollaborators(data.collaborators);
        }
      } catch (error) {
        console.error("Error al cargar los colaboradores:", error);
      }
    };

    fetchCollaborators();
  }, []);

  // Filtrar zonas
  const filteredZones = zones.filter((zone) => {
    // Filtrar por búsqueda
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery.trim() ||
      zone.name.toLowerCase().includes(searchLower) ||
      zone.center.name.toLowerCase().includes(searchLower) ||
      zone.vehicles.some(
        (v) =>
          v.model.toLowerCase().includes(searchLower) ||
          v.licensePlate.toLowerCase().includes(searchLower),
      );

    // Filtrar por estado
    const matchesStatus =
      statusFilter === "all" || zone.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Función para obtener el nombre del colaborador
  const getCollaboratorName = (collaboratorId: string | undefined) => {
    if (!collaboratorId) return "Colaborador no asignado";

    const collaborator = collaborators.find((c) => c.id === collaboratorId);
    return collaborator ? collaborator.name : "Colaborador no encontrado";
  };

  // Funciones de gestión de zonas
  const handleAddZone = () => {
    setEditingZone(null);
    setShowZoneForm(true);
  };

  const handleEditZone = (zone: FlexibleZone) => {
    setEditingZone(zone);
    setShowZoneForm(true);
  };

  const handleViewZoneDetails = (zone: FlexibleZone, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }

    // Si no tiene ID pero tiene _id (como viene de MongoDB), usarlo como id
    if (!zone.id && (zone as any)._id) {
      zone = {
        ...zone,
        id: (zone as any)._id,
      };
    }

    setSelectedZone(zone);
    setShowDetailsDialog(true);
  };

  const handleDeleteZone = (zoneId: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setSelectedZoneId(zoneId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedZoneId) {
      await onDeleteZone(selectedZoneId);
      setDeleteDialogOpen(false);
      setSelectedZoneId(null);
    }
  };

  const handleZoneSubmit = async (
    zoneData: Partial<FlexibleZone>,
  ): Promise<boolean> => {
    let success = false;

    if (editingZone) {
      // Actualizar una zona existente
      success = await onUpdateZone(editingZone.id, zoneData);
    } else {
      // Crear una nueva zona
      success = await onCreateZone(zoneData);
    }

    setShowZoneForm(false);
    setEditingZone(null);
    return success;
  };

  const handleToggleStatus = async (zoneId: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    await onToggleStatus(zoneId);
  };

  return (
    <div className="space-y-6" data-oid="_hhopdr">
      {showZoneForm ? (
        <FlexibleZoneForm
          editMode={!!editingZone}
          zoneData={editingZone}
          onSubmit={handleZoneSubmit}
          onCancel={() => {
            setShowZoneForm(false);
            setEditingZone(null);
          }}
          data-oid="dbhuzde"
        />
      ) : (
        <>
          <div
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm mb-4"
            data-oid="1l_9z7b"
          >
            <div className="relative w-64" data-oid="txgu69q">
              <input
                type="text"
                placeholder="Buscar zonas..."
                className="pl-10 pr-4 py-2 border rounded-lg w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-oid="1ry9ji5"
              />

              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
                data-oid="bjfx6r4"
              />
            </div>
            <div className="flex space-x-3" data-oid="uisqcnj">
              <select
                className="px-3 py-2 border rounded-lg"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                data-oid="lez3xqz"
              >
                <option value="all" data-oid="ik:5ark">
                  Todos los estados
                </option>
                <option value="active" data-oid="807yj2.">
                  Activas
                </option>
                <option value="inactive" data-oid="2pdh.ii">
                  Inactivas
                </option>
              </select>
              <Button
                onClick={handleAddZone}
                className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                data-oid="3p395yv"
              >
                <PlusCircle size={18} className="mr-2" data-oid="oasbz:l" />
                Nueva Zona Flexible
              </Button>
            </div>
          </div>

          <div
            className="bg-white rounded-lg shadow-md overflow-hidden"
            data-oid="x-0d6.0"
          >
            <div className="overflow-x-auto" data-oid="7nfda5w">
              <table
                className="min-w-full divide-y divide-gray-200"
                data-oid="v--h:h0"
              >
                <thead className="bg-gray-50" data-oid=":::2b3w">
                  <tr data-oid="n1ubw5y">
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      data-oid="e2nl6m1"
                    >
                      Nombre de Zona
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      data-oid="k._q1yp"
                    >
                      Centro y Radio
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      data-oid="4h5f2l:"
                    >
                      Colaborador
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      data-oid="-fij_a_"
                    >
                      Vehículos Asignados
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      data-oid="nt_p_tx"
                    >
                      Estado
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      data-oid="0k5pnb6"
                    >
                      Tarifas
                    </th>
                    <th
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      data-oid="xnxz8jl"
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody
                  className="bg-white divide-y divide-gray-200"
                  data-oid="69iz6wy"
                >
                  {filteredZones.map((zone, index) => (
                    <tr
                      key={`zone-${zone.id || index}`}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={(e) => handleViewZoneDetails(zone, e)}
                      data-oid="fwq4qon"
                    >
                      <td
                        className="px-6 py-4 whitespace-nowrap"
                        data-oid="0ea_3-2"
                      >
                        <div
                          className="text-sm font-medium text-gray-900"
                          data-oid="-2hcgqd"
                        >
                          {zone.name}
                        </div>
                      </td>
                      <td className="px-6 py-4" data-oid="d-uz-x-">
                        <div
                          className="text-sm text-gray-900"
                          data-oid="tr.xq9o"
                        >
                          <div className="flex items-start" data-oid="3mf42u_">
                            <MapPin
                              className="h-4 w-4 text-black mt-0.5 mr-1 flex-shrink-0"
                              data-oid="8o_yj.j"
                            />

                            <span data-oid="0ddbpy:">{zone.center.name}</span>
                          </div>
                          <div
                            className="ml-5 mt-1 text-xs text-gray-500"
                            data-oid="dz5tpj3"
                          >
                            Radio: {zone.radius} km
                          </div>
                          {zone.restrictions && (
                            <div
                              className="ml-5 mt-1 text-xs text-gray-500"
                              data-oid="y9z1ar."
                            >
                              {zone.restrictions.minDistance &&
                                `Mín: ${zone.restrictions.minDistance} km`}
                              {zone.restrictions.maxDistance &&
                                zone.restrictions.minDistance &&
                                ` • `}
                              {zone.restrictions.maxDistance &&
                                `Máx: ${zone.restrictions.maxDistance} km`}
                            </div>
                          )}
                        </div>
                      </td>
                      <td
                        className="px-6 py-4 whitespace-nowrap"
                        data-oid=".r-s8ab"
                      >
                        <div className="flex items-center" data-oid="k..ybfk">
                          <div
                            className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3"
                            data-oid="n:4pyg3"
                          >
                            <Building
                              className="h-4 w-4 text-gray-600"
                              data-oid="w:tjga8"
                            />
                          </div>
                          <div
                            className="text-sm text-gray-900"
                            data-oid="axw-yy1"
                          >
                            {getCollaboratorName(zone.collaboratorId)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4" data-oid="ch4tdj6">
                        <div
                          className="text-sm text-gray-900"
                          data-oid="2payaky"
                        >
                          {zone.vehicles.length > 0 ? (
                            <div
                              className="flex flex-col space-y-2"
                              data-oid=".2abciw"
                            >
                              {zone.vehicles.slice(0, 3).map((vehicle, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center"
                                  data-oid="ifo1m9x"
                                >
                                  <Car
                                    className="h-4 w-4 text-gray-500 mr-2"
                                    data-oid="smkrydu"
                                  />

                                  <div data-oid="c1ypj79">
                                    <span
                                      className="font-medium"
                                      data-oid="swfar_f"
                                    >
                                      {vehicle.model}
                                    </span>
                                    <span
                                      className="ml-2 text-xs text-gray-500"
                                      data-oid="mjnuone"
                                    >
                                      {vehicle.licensePlate}
                                    </span>
                                  </div>
                                </div>
                              ))}
                              {zone.vehicles.length > 3 && (
                                <div
                                  className="text-xs text-gray-600"
                                  data-oid="gn:doip"
                                >
                                  +{zone.vehicles.length - 3} vehículos más
                                </div>
                              )}
                            </div>
                          ) : (
                            <span
                              className="text-gray-500 italic"
                              data-oid="ffq4t_i"
                            >
                              Sin vehículos asignados
                            </span>
                          )}
                        </div>
                      </td>
                      <td
                        className="px-6 py-4 whitespace-nowrap"
                        data-oid="h5e-q_s"
                      >
                        <Badge
                          className={`
                          ${
                            zone.status === "active"
                              ? "bg-gray-200 text-green-800 hover:bg-gray-200"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                          }
                        `}
                          data-oid="sruf18g"
                        >
                          {zone.status === "active" ? "Activa" : "Inactiva"}
                        </Badge>
                      </td>
                      <td
                        className="px-6 py-4 whitespace-nowrap"
                        data-oid="16i3:c9"
                      >
                        <div className="text-sm" data-oid="k.:zp6r">
                          <div
                            className="font-medium text-gray-900"
                            data-oid="wp1y3rh"
                          >
                            {zone.pricing.perKm} {zone.pricing.currency}/km
                          </div>
                          <div
                            className="text-xs text-gray-500 mt-1"
                            data-oid="h-gb.96"
                          >
                            Tarifa mínima: {zone.pricing.minFare}{" "}
                            {zone.pricing.currency}
                          </div>
                          <div
                            className="text-xs text-gray-500"
                            data-oid="bhnjeu9"
                          >
                            Recargo noche: +{zone.pricing.nightSurcharge}%
                          </div>
                          <div
                            className="text-xs text-gray-500"
                            data-oid="jlhvd-0"
                          >
                            Recargo festivo: +{zone.pricing.holidaySurcharge}%
                          </div>
                        </div>
                      </td>
                      <td
                        className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2"
                        data-oid="4yz7dlm"
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewZoneDetails(zone, e);
                          }}
                          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                          data-oid="pcgkkpd"
                        >
                          <Eye className="h-4 w-4" data-oid="jkou3kv" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleStatus(zone.id, e);
                          }}
                          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                          data-oid="srghtlg"
                        >
                          {zone.status === "active" ? (
                            <ToggleRight
                              className="h-5 w-5 text-gray-600"
                              data-oid="f:o8q8m"
                            />
                          ) : (
                            <ToggleLeft
                              className="h-5 w-5 text-gray-400"
                              data-oid="mtg3riy"
                            />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditZone(zone);
                          }}
                          className="text-gray-600 hover:text-blue-800 hover:bg-gray-100"
                          data-oid="c8nbsbq"
                        >
                          <Edit className="h-4 w-4" data-oid="ct0t7ss" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteZone(zone.id, e);
                          }}
                          className="text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                          data-oid="lcv6hsa"
                        >
                          <Trash2 className="h-4 w-4" data-oid="1sihrpd" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredZones.length === 0 && (
                <div className="py-10 text-center" data-oid="wa_hi_b">
                  <div
                    className="h-20 w-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-100"
                    data-oid="miy3lox"
                  >
                    <MapPin
                      className="h-10 w-10 text-gray-400"
                      data-oid="ku5bx7z"
                    />
                  </div>
                  <p className="text-gray-500" data-oid="7osworx">
                    No se encontraron zonas flexibles que coincidan con los
                    criterios de búsqueda
                  </p>
                  <Button
                    onClick={handleAddZone}
                    className="mt-4 flex items-center mx-auto px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                    data-oid="03fw24u"
                  >
                    <PlusCircle size={18} className="mr-2" data-oid="m9hqmvk" />
                    Crear Nueva Zona
                  </Button>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Diálogo de detalles de zona */}
      <Dialog
        open={showDetailsDialog}
        onOpenChange={setShowDetailsDialog}
        data-oid="z:2mkq-"
      >
        <DialogContent
          className="max-w-3xl max-h-[90vh] overflow-y-auto"
          data-oid="e:4pmcn"
        >
          <DialogHeader data-oid="pan5tu0">
            <DialogTitle
              className="text-xl flex items-center gap-2"
              data-oid="ygc_et2"
            >
              {selectedZone?.name}
              <Badge
                className={`ml-2 ${
                  selectedZone?.status === "active"
                    ? "bg-gray-200 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
                data-oid="tnip2wp"
              >
                {selectedZone?.status === "active" ? "Activa" : "Inactiva"}
              </Badge>
            </DialogTitle>
            <DialogDescription data-oid="hcbi61u">
              Detalles de la zona flexible
            </DialogDescription>
          </DialogHeader>

          {selectedZone && (
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4"
              data-oid="19t033a"
            >
              {/* Información General */}
              <div className="space-y-4" data-oid="qrvwv6r">
                <h3
                  className="font-medium text-gray-900 text-base mb-2"
                  data-oid="s4ee-t."
                >
                  Información General
                </h3>

                <div
                  className="bg-gray-50 p-4 rounded-lg space-y-4"
                  data-oid="n5318x1"
                >
                  <div data-oid="rso24b4">
                    <div
                      className="text-sm font-medium text-gray-500"
                      data-oid="ur5ogv7"
                    >
                      Centro de la Zona
                    </div>
                    <div className="flex items-start mt-1" data-oid="s51ofxv">
                      <MapPin
                        className="h-4 w-4 text-black mt-0.5 mr-1 flex-shrink-0"
                        data-oid="pw8p0_:"
                      />

                      <span className="text-base" data-oid="ym93hs4">
                        {selectedZone.center.name}
                      </span>
                    </div>
                  </div>

                  <div data-oid=".h6uzg9">
                    <div
                      className="text-sm font-medium text-gray-500"
                      data-oid="b9un2d1"
                    >
                      Radio de Cobertura
                    </div>
                    <div className="flex items-start mt-1" data-oid="w65bld1">
                      <span className="text-base" data-oid="s2rx4rg">
                        {selectedZone.radius} km
                      </span>
                    </div>
                  </div>

                  {selectedZone.restrictions && (
                    <div className="border-t pt-3" data-oid="5sbc:pl">
                      <div
                        className="text-sm font-medium text-gray-500"
                        data-oid="zvti4dd"
                      >
                        Restricciones de Distancia
                      </div>
                      <div
                        className="flex gap-3 mt-1 text-sm text-gray-700"
                        data-oid="gyb3efo"
                      >
                        {selectedZone.restrictions.minDistance && (
                          <div data-oid="oxiguod">
                            Mínima: {selectedZone.restrictions.minDistance} km
                          </div>
                        )}
                        {selectedZone.restrictions.maxDistance && (
                          <div data-oid=":dn6r.i">
                            Máxima: {selectedZone.restrictions.maxDistance} km
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedZone.description && (
                    <div className="border-t pt-3" data-oid="_z5y5me">
                      <div
                        className="text-sm font-medium text-gray-500"
                        data-oid="dapn862"
                      >
                        Descripción
                      </div>
                      <p className="mt-1 text-gray-700" data-oid="s.5zbnz">
                        {selectedZone.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Colaborador */}
                <div data-oid="29uz2dc">
                  <h3
                    className="font-medium text-gray-900 text-base mb-2"
                    data-oid="9o7jkqk"
                  >
                    Colaborador
                  </h3>
                  <div
                    className="flex items-center bg-gray-50 p-4 rounded-lg"
                    data-oid="7cks5l8"
                  >
                    <div
                      className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3"
                      data-oid="ut3nqqh"
                    >
                      <Building
                        className="h-5 w-5 text-gray-600"
                        data-oid="px5rdl2"
                      />
                    </div>
                    <div data-oid="uclx41d">
                      <div className="font-medium" data-oid=".6d44_a">
                        {getCollaboratorName(selectedZone.collaboratorId)}
                      </div>
                      <div className="text-xs text-gray-500" data-oid="-2ugmzc">
                        ID: {selectedZone.collaboratorId || "No asignado"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tarifas */}
                <div data-oid=":dyydsb">
                  <h3
                    className="font-medium text-gray-900 text-base mb-2"
                    data-oid="gzin7:o"
                  >
                    Tarifas
                  </h3>
                  <div
                    className="bg-gray-50 p-4 rounded-lg space-y-2"
                    data-oid="9fsu:1l"
                  >
                    <div
                      className="flex justify-between items-center"
                      data-oid="rd0eg-j"
                    >
                      <div
                        className="text-sm font-medium text-gray-500"
                        data-oid="t9-zh.i"
                      >
                        Por Kilómetro:
                      </div>
                      <div className="text-lg font-medium" data-oid="9lhzc4r">
                        {selectedZone.pricing.perKm}{" "}
                        {selectedZone.pricing.currency}/km
                      </div>
                    </div>
                    <div
                      className="flex justify-between items-center"
                      data-oid="4bpz38."
                    >
                      <div
                        className="text-sm font-medium text-gray-500"
                        data-oid="pbch6j3"
                      >
                        Tarifa mínima:
                      </div>
                      <div data-oid="av6z-rp">
                        {selectedZone.pricing.minFare}{" "}
                        {selectedZone.pricing.currency}
                      </div>
                    </div>
                    <div
                      className="flex justify-between items-center"
                      data-oid=".9ix6ou"
                    >
                      <div
                        className="text-sm font-medium text-gray-500"
                        data-oid="2z5tmzt"
                      >
                        Recargo nocturno:
                      </div>
                      <div data-oid="2kpos94">
                        +{selectedZone.pricing.nightSurcharge}%
                      </div>
                    </div>
                    <div
                      className="flex justify-between items-center"
                      data-oid="rigrnfk"
                    >
                      <div
                        className="text-sm font-medium text-gray-500"
                        data-oid="itni8xd"
                      >
                        Recargo en festivos:
                      </div>
                      <div data-oid="fe53_sw">
                        +{selectedZone.pricing.holidaySurcharge}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vehículos y Acciones */}
              <div className="space-y-4" data-oid=":tc.u2k">
                {/* Vehículos */}
                <div data-oid="rg-bxpx">
                  <h3
                    className="font-medium text-gray-900 text-base mb-2"
                    data-oid="y6_h71y"
                  >
                    Vehículos Asignados ({selectedZone.vehicles.length})
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg" data-oid="tz_dcei">
                    <div className="space-y-3" data-oid="rvl5w70">
                      {selectedZone.vehicles.length > 0 ? (
                        selectedZone.vehicles.map((vehicle, idx) => (
                          <div
                            key={idx}
                            className="flex items-center p-2 border-b last:border-b-0"
                            data-oid="epz38n2"
                          >
                            <div
                              className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center"
                              data-oid="pmfhicl"
                            >
                              <Car
                                className="h-6 w-6 text-gray-500"
                                data-oid="8ikdeot"
                              />
                            </div>
                            <div className="ml-3" data-oid="6lkvasl">
                              <div className="font-medium" data-oid="q9v6rxl">
                                {vehicle.model}
                              </div>
                              <div
                                className="text-sm text-gray-600"
                                data-oid="-:x9k8r"
                              >
                                {vehicle.licensePlate}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div
                          className="text-gray-500 italic flex items-center"
                          data-oid="zvln0m6"
                        >
                          <Info className="h-4 w-4 mr-2" data-oid=":lnw5jz" />
                          Sin vehículos asignados
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Mapa */}
                <div data-oid="fpzv2p3">
                  <h3
                    className="font-medium text-gray-900 text-base mb-2"
                    data-oid="zh-6q87"
                  >
                    Mapa de la Zona
                  </h3>
                  <GoogleZoneMap
                    center={selectedZone.center}
                    radius={selectedZone.radius}
                    data-oid="qbs4wbf"
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter
            className="flex justify-end gap-2 mt-6"
            data-oid="11us071"
          >
            <Button
              className="bg-gray-100 text-gray-800 hover:bg-gray-200"
              onClick={() => setShowDetailsDialog(false)}
              data-oid="2ebwffx"
            >
              <X className="h-4 w-4 mr-2" data-oid="axqjaq0" />
              Cerrar
            </Button>
            <Button
              className="bg-black text-white hover:bg-gray-800"
              onClick={() => {
                if (selectedZone) {
                  setShowDetailsDialog(false);
                  handleEditZone(selectedZone);
                }
              }}
              data-oid="iae.jr9"
            >
              <Edit className="h-4 w-4 mr-2" data-oid="mqc1e4i" />
              Editar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        data-oid="u4mw68z"
      >
        <AlertDialogContent data-oid="dodc5ma">
          <AlertDialogHeader data-oid="xgm8rew">
            <AlertDialogTitle data-oid="kwl3y6i">
              ¿Estás seguro?
            </AlertDialogTitle>
            <AlertDialogDescription data-oid="17-xlja">
              Esta acción eliminará permanentemente la zona flexible. Esta
              acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter data-oid="xccrbr8">
            <AlertDialogCancel data-oid="o67n9is">Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-black hover:bg-gray-800"
              data-oid="_.3:l4d"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FlexibleRoutesTab;
