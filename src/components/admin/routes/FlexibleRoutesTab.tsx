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
        data-oid="t_hf2q5"
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
        data-oid="bzihh.x"
      >
        {loading && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10"
            data-oid="yfdqc3t"
          >
            <div
              className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"
              data-oid="sk49vbj"
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
          data-oid="7oxb2sg"
        ></iframe>

        <div
          className="absolute bottom-2 left-2 right-2 bg-white bg-opacity-90 p-2 rounded-md text-xs flex flex-col"
          data-oid="v6hm64e"
        >
          <div className="flex justify-between items-center" data-oid="urvghdd">
            <div data-oid="v7evcav">
              <span className="font-bold" data-oid="obdp4mw">
                Centro:
              </span>{" "}
              {center.name}
            </div>
            <div data-oid="k8k6sr.">
              <span className="font-bold" data-oid="14f1eal">
                Radio:
              </span>{" "}
              {radius} km
            </div>
          </div>
          <div
            className="mt-1 text-xs text-gray-500 flex justify-between items-center"
            data-oid="6w8h_ri"
          >
            {error ? (
              <span className="text-black" data-oid="62x0nb4">
                {error}
              </span>
            ) : (
              <span data-oid="1r_.uhl">Google Maps</span>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-700 hover:text-gray-900"
              onClick={() => setShowFullscreen(true)}
              data-oid="e6jy29n"
            >
              <Maximize2 className="h-4 w-4" data-oid="2ft_3bw" />
              <span className="sr-only" data-oid="y.rh8o4">
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
          data-oid="5a2kefx"
        >
          <DialogContent
            className="max-w-6xl max-h-[90vh] p-0 overflow-hidden"
            data-oid="vklnl.y"
          >
            <div className="relative h-[80vh] w-full" data-oid="n8hf6-_">
              <iframe
                src={googleUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                data-oid="05wjg7a"
              ></iframe>

              <div
                className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 p-3 rounded-md shadow-md"
                data-oid="fyftr4r"
              >
                <div
                  className="flex justify-between items-center"
                  data-oid="e-go18z"
                >
                  <div data-oid="wrbmt52">
                    <div className="font-bold text-lg mb-1" data-oid="yvpqspr">
                      Zona Flexible
                    </div>
                    <div className="flex flex-col" data-oid=":lz7jzp">
                      <div className="flex items-center" data-oid="bshsnkb">
                        <MapPin
                          className="h-4 w-4 text-black mr-1 flex-shrink-0"
                          data-oid="_4hvzxw"
                        />

                        <span className="font-medium" data-oid="xuz_rr_">
                          Centro:
                        </span>
                        <span className="ml-1" data-oid="c4d6lru">
                          {center.name}
                        </span>
                      </div>
                      <div
                        className="flex items-center mt-1"
                        data-oid="s100hpa"
                      >
                        <span className="font-medium" data-oid="47tce3o">
                          Radio de cobertura:
                        </span>
                        <span className="ml-1" data-oid="6wv3t6m">
                          {radius} km
                        </span>
                      </div>
                      <div
                        className="flex items-center mt-1 text-sm text-gray-600"
                        data-oid="0k1jck8"
                      >
                        <span className="italic" data-oid="w2w6f3a">
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
                    data-oid="95qhrym"
                  >
                    <X className="h-4 w-4 mr-2" data-oid="pio::zk" />
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
    <div className="space-y-6" data-oid="6w_t8zf">
      {showZoneForm ? (
        <FlexibleZoneForm
          editMode={!!editingZone}
          zoneData={editingZone}
          onSubmit={handleZoneSubmit}
          onCancel={() => {
            setShowZoneForm(false);
            setEditingZone(null);
          }}
          data-oid="yy-pu.d"
        />
      ) : (
        <>
          <div
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm mb-4"
            data-oid="6:bxoj."
          >
            <div className="relative w-64" data-oid="hzrxf21">
              <input
                type="text"
                placeholder="Buscar zonas..."
                className="pl-10 pr-4 py-2 border rounded-lg w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-oid="3a81_mm"
              />

              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
                data-oid="emc8aw:"
              />
            </div>
            <div className="flex space-x-3" data-oid="_ej6mg3">
              <select
                className="px-3 py-2 border rounded-lg"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                data-oid="6t.k121"
              >
                <option value="all" data-oid="_3tgcfa">
                  Todos los estados
                </option>
                <option value="active" data-oid="11p2qo4">
                  Activas
                </option>
                <option value="inactive" data-oid="qu__9og">
                  Inactivas
                </option>
              </select>
              <Button
                onClick={handleAddZone}
                className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                data-oid="1:snyov"
              >
                <PlusCircle size={18} className="mr-2" data-oid="t7l7pb7" />
                Nueva Zona Flexible
              </Button>
            </div>
          </div>

          <div
            className="bg-white rounded-lg shadow-md overflow-hidden"
            data-oid="._u2w13"
          >
            <div className="overflow-x-auto" data-oid="np_l3ch">
              <table
                className="min-w-full divide-y divide-gray-200"
                data-oid=":z4qg1u"
              >
                <thead className="bg-gray-50" data-oid="n3s2fnk">
                  <tr data-oid="_gpmu96">
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      data-oid="6h:q0y4"
                    >
                      Nombre de Zona
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      data-oid="5uu0fep"
                    >
                      Centro y Radio
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      data-oid="wepup1a"
                    >
                      Colaborador
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      data-oid="yfuc4o2"
                    >
                      Vehículos Asignados
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      data-oid="-xp_x2."
                    >
                      Estado
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      data-oid="pn:c9r3"
                    >
                      Tarifas
                    </th>
                    <th
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      data-oid="3:vl7jo"
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody
                  className="bg-white divide-y divide-gray-200"
                  data-oid="89v2g_3"
                >
                  {filteredZones.map((zone, index) => (
                    <tr
                      key={`zone-${zone.id || index}`}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={(e) => handleViewZoneDetails(zone, e)}
                      data-oid="-:cfzv9"
                    >
                      <td
                        className="px-6 py-4 whitespace-nowrap"
                        data-oid="kt6:nm8"
                      >
                        <div
                          className="text-sm font-medium text-gray-900"
                          data-oid="k0r2iga"
                        >
                          {zone.name}
                        </div>
                      </td>
                      <td className="px-6 py-4" data-oid="ah6twh5">
                        <div
                          className="text-sm text-gray-900"
                          data-oid="mx20bs-"
                        >
                          <div className="flex items-start" data-oid="3k2.7z0">
                            <MapPin
                              className="h-4 w-4 text-black mt-0.5 mr-1 flex-shrink-0"
                              data-oid="x8oe:gx"
                            />

                            <span data-oid="7jsid5i">{zone.center.name}</span>
                          </div>
                          <div
                            className="ml-5 mt-1 text-xs text-gray-500"
                            data-oid="zvjc.e-"
                          >
                            Radio: {zone.radius} km
                          </div>
                          {zone.restrictions && (
                            <div
                              className="ml-5 mt-1 text-xs text-gray-500"
                              data-oid="-zeoa:z"
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
                        data-oid="m2w.46x"
                      >
                        <div className="flex items-center" data-oid="zx-2rp9">
                          <div
                            className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3"
                            data-oid="hukazcd"
                          >
                            <Building
                              className="h-4 w-4 text-gray-600"
                              data-oid="cddqlns"
                            />
                          </div>
                          <div
                            className="text-sm text-gray-900"
                            data-oid="hh2s330"
                          >
                            {getCollaboratorName(zone.collaboratorId)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4" data-oid="nstsqq5">
                        <div
                          className="text-sm text-gray-900"
                          data-oid="9dt9bdq"
                        >
                          {zone.vehicles.length > 0 ? (
                            <div
                              className="flex flex-col space-y-2"
                              data-oid="ghnu6jh"
                            >
                              {zone.vehicles.slice(0, 3).map((vehicle, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center"
                                  data-oid="ldndrbv"
                                >
                                  <Car
                                    className="h-4 w-4 text-gray-500 mr-2"
                                    data-oid="uyfu7n1"
                                  />

                                  <div data-oid=":8uwcwf">
                                    <span
                                      className="font-medium"
                                      data-oid="-766rh7"
                                    >
                                      {vehicle.model}
                                    </span>
                                    <span
                                      className="ml-2 text-xs text-gray-500"
                                      data-oid="fn560oc"
                                    >
                                      {vehicle.licensePlate}
                                    </span>
                                  </div>
                                </div>
                              ))}
                              {zone.vehicles.length > 3 && (
                                <div
                                  className="text-xs text-gray-600"
                                  data-oid="9tsax8b"
                                >
                                  +{zone.vehicles.length - 3} vehículos más
                                </div>
                              )}
                            </div>
                          ) : (
                            <span
                              className="text-gray-500 italic"
                              data-oid=":nm_ain"
                            >
                              Sin vehículos asignados
                            </span>
                          )}
                        </div>
                      </td>
                      <td
                        className="px-6 py-4 whitespace-nowrap"
                        data-oid="8y:n4--"
                      >
                        <Badge
                          className={`
                          ${
                            zone.status === "active"
                              ? "bg-gray-200 text-green-800 hover:bg-gray-200"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                          }
                        `}
                          data-oid="5m21z82"
                        >
                          {zone.status === "active" ? "Activa" : "Inactiva"}
                        </Badge>
                      </td>
                      <td
                        className="px-6 py-4 whitespace-nowrap"
                        data-oid="k0:q_1k"
                      >
                        <div className="text-sm" data-oid="4.yt7e7">
                          <div
                            className="font-medium text-gray-900"
                            data-oid="o28.yap"
                          >
                            {zone.pricing.perKm} {zone.pricing.currency}/km
                          </div>
                          <div
                            className="text-xs text-gray-500 mt-1"
                            data-oid=":tipzwo"
                          >
                            Tarifa mínima: {zone.pricing.minFare}{" "}
                            {zone.pricing.currency}
                          </div>
                          <div
                            className="text-xs text-gray-500"
                            data-oid="-d_moj3"
                          >
                            Recargo noche: +{zone.pricing.nightSurcharge}%
                          </div>
                          <div
                            className="text-xs text-gray-500"
                            data-oid="bw7201p"
                          >
                            Recargo festivo: +{zone.pricing.holidaySurcharge}%
                          </div>
                        </div>
                      </td>
                      <td
                        className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2"
                        data-oid="t.xlj8y"
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewZoneDetails(zone, e);
                          }}
                          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                          data-oid="rr74l.-"
                        >
                          <Eye className="h-4 w-4" data-oid="4y6:ikw" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleStatus(zone.id, e);
                          }}
                          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                          data-oid="j882:0g"
                        >
                          {zone.status === "active" ? (
                            <ToggleRight
                              className="h-5 w-5 text-gray-600"
                              data-oid="wpc0_7l"
                            />
                          ) : (
                            <ToggleLeft
                              className="h-5 w-5 text-gray-400"
                              data-oid="ayh-vk1"
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
                          data-oid="o9lcc1b"
                        >
                          <Edit className="h-4 w-4" data-oid="y_z8d_q" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteZone(zone.id, e);
                          }}
                          className="text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                          data-oid="r4g418v"
                        >
                          <Trash2 className="h-4 w-4" data-oid="-no150h" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredZones.length === 0 && (
                <div className="py-10 text-center" data-oid="wch1t3i">
                  <div
                    className="h-20 w-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-100"
                    data-oid="hagl.:4"
                  >
                    <MapPin
                      className="h-10 w-10 text-gray-400"
                      data-oid=".qeh52."
                    />
                  </div>
                  <p className="text-gray-500" data-oid="0j.5.t:">
                    No se encontraron zonas flexibles que coincidan con los
                    criterios de búsqueda
                  </p>
                  <Button
                    onClick={handleAddZone}
                    className="mt-4 flex items-center mx-auto px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                    data-oid="8f_bzvj"
                  >
                    <PlusCircle size={18} className="mr-2" data-oid="ah_w2x4" />
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
        data-oid="uf4sd08"
      >
        <DialogContent
          className="max-w-3xl max-h-[90vh] overflow-y-auto"
          data-oid="abh5clt"
        >
          <DialogHeader data-oid="93ewnyc">
            <DialogTitle
              className="text-xl flex items-center gap-2"
              data-oid="pbefppu"
            >
              {selectedZone?.name}
              <Badge
                className={`ml-2 ${
                  selectedZone?.status === "active"
                    ? "bg-gray-200 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
                data-oid="eq36--j"
              >
                {selectedZone?.status === "active" ? "Activa" : "Inactiva"}
              </Badge>
            </DialogTitle>
            <DialogDescription data-oid="_m17co.">
              Detalles de la zona flexible
            </DialogDescription>
          </DialogHeader>

          {selectedZone && (
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4"
              data-oid="cxqgwoa"
            >
              {/* Información General */}
              <div className="space-y-4" data-oid="_s1y:uk">
                <h3
                  className="font-medium text-gray-900 text-base mb-2"
                  data-oid="fq.1hi5"
                >
                  Información General
                </h3>

                <div
                  className="bg-gray-50 p-4 rounded-lg space-y-4"
                  data-oid="pmxp_7d"
                >
                  <div data-oid="ppht-b2">
                    <div
                      className="text-sm font-medium text-gray-500"
                      data-oid="ouqisxu"
                    >
                      Centro de la Zona
                    </div>
                    <div className="flex items-start mt-1" data-oid="4so0h-:">
                      <MapPin
                        className="h-4 w-4 text-black mt-0.5 mr-1 flex-shrink-0"
                        data-oid="kn8a5aj"
                      />

                      <span className="text-base" data-oid="v0wvkuc">
                        {selectedZone.center.name}
                      </span>
                    </div>
                  </div>

                  <div data-oid="h1hsopk">
                    <div
                      className="text-sm font-medium text-gray-500"
                      data-oid="660m540"
                    >
                      Radio de Cobertura
                    </div>
                    <div className="flex items-start mt-1" data-oid="mya4xn.">
                      <span className="text-base" data-oid="hmjh4f4">
                        {selectedZone.radius} km
                      </span>
                    </div>
                  </div>

                  {selectedZone.restrictions && (
                    <div className="border-t pt-3" data-oid="1w8.:yl">
                      <div
                        className="text-sm font-medium text-gray-500"
                        data-oid="1d.45ij"
                      >
                        Restricciones de Distancia
                      </div>
                      <div
                        className="flex gap-3 mt-1 text-sm text-gray-700"
                        data-oid="r9:pz0-"
                      >
                        {selectedZone.restrictions.minDistance && (
                          <div data-oid="eu1-_.1">
                            Mínima: {selectedZone.restrictions.minDistance} km
                          </div>
                        )}
                        {selectedZone.restrictions.maxDistance && (
                          <div data-oid="z-sa..3">
                            Máxima: {selectedZone.restrictions.maxDistance} km
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedZone.description && (
                    <div className="border-t pt-3" data-oid="n26iehf">
                      <div
                        className="text-sm font-medium text-gray-500"
                        data-oid="kbx.zon"
                      >
                        Descripción
                      </div>
                      <p className="mt-1 text-gray-700" data-oid="i.uxfil">
                        {selectedZone.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Colaborador */}
                <div data-oid="bf2coiu">
                  <h3
                    className="font-medium text-gray-900 text-base mb-2"
                    data-oid="blmfdph"
                  >
                    Colaborador
                  </h3>
                  <div
                    className="flex items-center bg-gray-50 p-4 rounded-lg"
                    data-oid=".21.q26"
                  >
                    <div
                      className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3"
                      data-oid="mjmbibp"
                    >
                      <Building
                        className="h-5 w-5 text-gray-600"
                        data-oid="6vj8pqk"
                      />
                    </div>
                    <div data-oid="z6it5sw">
                      <div className="font-medium" data-oid="sdtdjd_">
                        {getCollaboratorName(selectedZone.collaboratorId)}
                      </div>
                      <div className="text-xs text-gray-500" data-oid=".pc9yry">
                        ID: {selectedZone.collaboratorId || "No asignado"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tarifas */}
                <div data-oid="jgjfqfb">
                  <h3
                    className="font-medium text-gray-900 text-base mb-2"
                    data-oid="ejnt0vj"
                  >
                    Tarifas
                  </h3>
                  <div
                    className="bg-gray-50 p-4 rounded-lg space-y-2"
                    data-oid="ey41_21"
                  >
                    <div
                      className="flex justify-between items-center"
                      data-oid="g.-3t5z"
                    >
                      <div
                        className="text-sm font-medium text-gray-500"
                        data-oid="l459_ed"
                      >
                        Por Kilómetro:
                      </div>
                      <div className="text-lg font-medium" data-oid="uu-o4y.">
                        {selectedZone.pricing.perKm}{" "}
                        {selectedZone.pricing.currency}/km
                      </div>
                    </div>
                    <div
                      className="flex justify-between items-center"
                      data-oid="9p7rlie"
                    >
                      <div
                        className="text-sm font-medium text-gray-500"
                        data-oid="xo9jqse"
                      >
                        Tarifa mínima:
                      </div>
                      <div data-oid=":qf1_fd">
                        {selectedZone.pricing.minFare}{" "}
                        {selectedZone.pricing.currency}
                      </div>
                    </div>
                    <div
                      className="flex justify-between items-center"
                      data-oid="9b6k937"
                    >
                      <div
                        className="text-sm font-medium text-gray-500"
                        data-oid="qs:r7y2"
                      >
                        Recargo nocturno:
                      </div>
                      <div data-oid="c-:8d7t">
                        +{selectedZone.pricing.nightSurcharge}%
                      </div>
                    </div>
                    <div
                      className="flex justify-between items-center"
                      data-oid="j9_sxfg"
                    >
                      <div
                        className="text-sm font-medium text-gray-500"
                        data-oid="y9.t-1c"
                      >
                        Recargo en festivos:
                      </div>
                      <div data-oid="2wtzb6r">
                        +{selectedZone.pricing.holidaySurcharge}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vehículos y Acciones */}
              <div className="space-y-4" data-oid="2j85b3:">
                {/* Vehículos */}
                <div data-oid="bcff.a4">
                  <h3
                    className="font-medium text-gray-900 text-base mb-2"
                    data-oid="73h2aea"
                  >
                    Vehículos Asignados ({selectedZone.vehicles.length})
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg" data-oid=".ozcyxz">
                    <div className="space-y-3" data-oid="1yd:-.7">
                      {selectedZone.vehicles.length > 0 ? (
                        selectedZone.vehicles.map((vehicle, idx) => (
                          <div
                            key={idx}
                            className="flex items-center p-2 border-b last:border-b-0"
                            data-oid="hhs0tqt"
                          >
                            <div
                              className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center"
                              data-oid="qvb82:8"
                            >
                              <Car
                                className="h-6 w-6 text-gray-500"
                                data-oid="-6ct70z"
                              />
                            </div>
                            <div className="ml-3" data-oid="xmrmd_8">
                              <div className="font-medium" data-oid="tv5sif.">
                                {vehicle.model}
                              </div>
                              <div
                                className="text-sm text-gray-600"
                                data-oid="t-2h5_n"
                              >
                                {vehicle.licensePlate}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div
                          className="text-gray-500 italic flex items-center"
                          data-oid="gw2ilu-"
                        >
                          <Info className="h-4 w-4 mr-2" data-oid="ze5w0p6" />
                          Sin vehículos asignados
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Mapa */}
                <div data-oid="s_8ifc_">
                  <h3
                    className="font-medium text-gray-900 text-base mb-2"
                    data-oid="agcu2:h"
                  >
                    Mapa de la Zona
                  </h3>
                  <GoogleZoneMap
                    center={selectedZone.center}
                    radius={selectedZone.radius}
                    data-oid="g:9ko_2"
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter
            className="flex justify-end gap-2 mt-6"
            data-oid="ku1sqi7"
          >
            <Button
              className="bg-gray-100 text-gray-800 hover:bg-gray-200"
              onClick={() => setShowDetailsDialog(false)}
              data-oid="53dusgs"
            >
              <X className="h-4 w-4 mr-2" data-oid="6b0qeu9" />
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
              data-oid="b__sbb_"
            >
              <Edit className="h-4 w-4 mr-2" data-oid=":lgriue" />
              Editar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        data-oid="_y8yktu"
      >
        <AlertDialogContent data-oid="tymn6w7">
          <AlertDialogHeader data-oid="4oa71om">
            <AlertDialogTitle data-oid="0gb5idj">
              ¿Estás seguro?
            </AlertDialogTitle>
            <AlertDialogDescription data-oid="a9sl15_">
              Esta acción eliminará permanentemente la zona flexible. Esta
              acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter data-oid="7_bsa62">
            <AlertDialogCancel data-oid="t9ngpd4">Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-black hover:bg-gray-800"
              data-oid=":tv-siv"
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
