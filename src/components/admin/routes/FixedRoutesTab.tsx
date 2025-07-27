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
  Clock,
  Car,
  User,
  Building,
  X,
  Eye,
  Maximize2,
  Info,
} from "lucide-react";
import { FixedRoute } from "@/components/admin/sections/RoutesSection";
import FixedRouteForm from "./FixedRouteForm";
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
import { toast } from "@/components/ui/use-toast";
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

interface FixedRoutesTabProps {
  routes: FixedRoute[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onCreateRoute: (routeData: Partial<FixedRoute>) => Promise<boolean>;
  onUpdateRoute: (
    routeId: string,
    routeData: Partial<FixedRoute>,
  ) => Promise<boolean>;
  onDeleteRoute: (routeId: string) => Promise<boolean>;
  onToggleStatus: (routeId: string) => Promise<boolean>;
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
const GoogleRouteMap = ({
  origin,
  destination,
}: {
  origin: {
    name: string;
    location: { type: string; coordinates: [number, number] };
  };
  destination: {
    name: string;
    location: { type: string; coordinates: [number, number] };
  };
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFullscreen, setShowFullscreen] = useState(false);

  // Inicializar la API key al montar el componente
  useEffect(() => {
    initGoogleMapsKey();
  }, []);

  // Validar datos de entrada
  if (!origin?.location?.coordinates || !destination?.location?.coordinates) {
    return (
      <div
        className="h-64 w-full bg-gray-100 flex items-center justify-center text-gray-500 text-sm"
        data-oid="b2dxd:d"
      >
        Faltan coordenadas para mostrar el mapa
      </div>
    );
  }

  // Extraer coordenadas de manera segura
  const originCoords = {
    lat: origin.location.coordinates[1],
    lng: origin.location.coordinates[0],
  };

  const destCoords = {
    lat: destination.location.coordinates[1],
    lng: destination.location.coordinates[0],
  };

  // Obtener la API key del localStorage
  const googleApiKey =
    localStorage.getItem("GOOGLE_MAPS_API_KEY") || initGoogleMapsKey();

  // URL para el iframe de Google Maps
  const googleUrl = `https://www.google.com/maps/embed/v1/directions?key=${googleApiKey}&origin=${originCoords.lat},${originCoords.lng}&destination=${destCoords.lat},${destCoords.lng}&mode=driving`;

  return (
    <>
      <div
        className="w-full h-64 rounded-lg overflow-hidden shadow-sm border relative bg-gray-50"
        data-oid="coisvbc"
      >
        {loading && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10"
            data-oid="vq814nm"
          >
            <div
              className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"
              data-oid="1bg3alh"
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
          data-oid="9:3q3hm"
        ></iframe>

        <div
          className="absolute bottom-2 left-2 right-2 bg-white bg-opacity-90 p-2 rounded-md text-xs flex justify-between items-center"
          data-oid="8alnqrg"
        >
          <span data-oid="52cwl6i">
            <span className="font-bold" data-oid="dq2fiqi">
              Ruta:
            </span>{" "}
            {origin.name} → {destination.name}
          </span>
          <div className="flex items-center" data-oid="duy7u8e">
            {error && (
              <span
                className="text-xs bg-gray-200 text-gray-600 p-1 rounded mr-2"
                data-oid="6w_rewm"
              >
                {error}
              </span>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-700 hover:text-gray-900"
              onClick={() => setShowFullscreen(true)}
              data-oid="qpwg1o6"
            >
              <Maximize2 className="h-4 w-4" data-oid="-pg822v" />
              <span className="sr-only" data-oid=".hxq66k">
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
          data-oid="1aec7mh"
        >
          <DialogContent
            className="max-w-6xl max-h-[90vh] p-0 overflow-hidden"
            data-oid="3rqaoha"
          >
            <div className="relative h-[80vh] w-full" data-oid=".lycbtu">
              <iframe
                src={googleUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                data-oid="1ldjp.g"
              ></iframe>

              <div
                className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 p-3 rounded-md shadow-md"
                data-oid="yxu1e55"
              >
                <div
                  className="flex justify-between items-center"
                  data-oid="avwbueq"
                >
                  <div data-oid="sf.py-4">
                    <div className="font-bold text-lg mb-1" data-oid="2iuc40a">
                      Ruta
                    </div>
                    <div className="flex items-start" data-oid="dlfv9_:">
                      <MapPin
                        className="h-4 w-4 text-black mt-0.5 mr-1 flex-shrink-0"
                        data-oid="zgspcld"
                      />

                      <span className="font-medium" data-oid="phk930g">
                        Origen:
                      </span>
                      <span className="ml-1" data-oid="n:legne">
                        {origin.name}
                      </span>
                    </div>
                    <div className="flex items-start mt-1" data-oid="16v75tx">
                      <MapPin
                        className="h-4 w-4 text-black mt-0.5 mr-1 flex-shrink-0"
                        data-oid="zy1cbi0"
                      />

                      <span className="font-medium" data-oid="nme6mno">
                        Destino:
                      </span>
                      <span className="ml-1" data-oid="mvf9cnj">
                        {destination.name}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="default"
                    className="bg-black hover:bg-gray-800 text-white"
                    onClick={() => setShowFullscreen(false)}
                    data-oid="xyxhomq"
                  >
                    <X className="h-4 w-4 mr-2" data-oid="2njefyo" />
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

const FixedRoutesTab = ({
  routes,
  searchQuery,
  setSearchQuery,
  onCreateRoute,
  onUpdateRoute,
  onDeleteRoute,
  onToggleStatus,
}: FixedRoutesTabProps) => {
  // Estados locales
  const [showRouteForm, setShowRouteForm] = useState(false);
  const [editingRoute, setEditingRoute] = useState<FixedRoute | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Estado para el diálogo de detalles
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<FixedRoute | null>(null);

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

  // Filtrar rutas
  const filteredRoutes = routes.filter((route) => {
    // Filtrar por búsqueda
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery.trim() ||
      route.name.toLowerCase().includes(searchLower) ||
      route.origin.name.toLowerCase().includes(searchLower) ||
      route.destination.name.toLowerCase().includes(searchLower) ||
      (route.vehicle?.licensePlate &&
        route.vehicle.licensePlate.toLowerCase().includes(searchLower));

    // Filtrar por estado
    const matchesStatus =
      statusFilter === "all" || route.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Funciones de gestión de rutas
  const handleAddRoute = () => {
    setEditingRoute(null);
    setShowRouteForm(true);
  };

  const handleEditRoute = (route: FixedRoute) => {
    console.log("handleEditRoute - Ruta recibida:", route);
    console.log("¿La ruta tiene ID?", !!route.id);
    console.log("Tipo de ID:", typeof route.id);

    // Si no tiene ID pero tiene _id (como viene de MongoDB), usarlo como id
    if (!route.id && (route as any)._id) {
      console.log("La ruta no tiene id pero tiene _id:", (route as any)._id);
      route = {
        ...route,
        id: (route as any)._id,
      };
      console.log("Ruta con ID asignado:", route);
    }

    setEditingRoute(route);
    setShowRouteForm(true);
  };

  const handleViewRouteDetails = (route: FixedRoute, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }

    // Si no tiene ID pero tiene _id (como viene de MongoDB), usarlo como id
    if (!route.id && (route as any)._id) {
      route = {
        ...route,
        id: (route as any)._id,
      };
    }

    setSelectedRoute(route);
    setShowDetailsDialog(true);
  };

  const handleDeleteRoute = (routeId: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setSelectedRouteId(routeId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedRouteId) {
      await onDeleteRoute(selectedRouteId);
      setDeleteDialogOpen(false);
      setSelectedRouteId(null);
    }
  };

  const handleRouteSubmit = async (
    routeData: Partial<FixedRoute>,
  ): Promise<boolean> => {
    let success = false;

    if (editingRoute) {
      // Actualizar una ruta existente
      console.log(
        "====================================================================================",
      );
      console.log("Intentando actualizar ruta existente");
      console.log("ID de la ruta a actualizar:", editingRoute.id);
      console.log("¿Es válido el ID?:", !!editingRoute.id);
      console.log("Tipo de ID:", typeof editingRoute.id);
      console.log(
        "Datos a enviar para actualización:",
        JSON.stringify(routeData, null, 2),
      );

      if (!editingRoute.id) {
        console.error("Error: falta ID de ruta para actualizar");
        toast({
          title: "Error",
          description: "No se puede actualizar la ruta: falta ID",
          variant: "destructive",
        });
        return false;
      }

      try {
        success = await onUpdateRoute(editingRoute.id, routeData);
        console.log("Resultado de la actualización:", success);
      } catch (error) {
        console.error("Error capturado durante la actualización:", error);
        success = false;
      }
      console.log(
        "====================================================================================",
      );
    } else {
      // Crear una nueva ruta
      console.log("Intentando crear nueva ruta");
      console.log("Datos a enviar para creación:", routeData);

      try {
        success = await onCreateRoute(routeData);
        console.log("Resultado de la creación:", success);
      } catch (error) {
        console.error("Error capturado durante la creación:", error);
        success = false;
      }
    }

    if (success) {
      setShowRouteForm(false);
      setEditingRoute(null);
    } else {
      toast({
        title: "Error",
        description:
          "No se pudo completar la operación. Verifica los datos e inténtalo de nuevo.",
        variant: "destructive",
      });
    }

    return success;
  };

  const handleToggleStatus = async (routeId: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    await onToggleStatus(routeId);
  };

  // Función para obtener el nombre del colaborador
  const getCollaboratorName = (collaboratorId: string | undefined) => {
    if (!collaboratorId) return "Colaborador no asignado";

    const collaborator = collaborators.find((c) => c.id === collaboratorId);
    return collaborator ? collaborator.name : "Colaborador no encontrado";
  };

  // Nueva función para truncar direcciones SOLO PARA LA TABLA
  const truncateAddressForTable = (address: string) => {
    const commaIndex = address.indexOf(",");
    if (commaIndex !== -1) {
      return address.substring(0, commaIndex);
    }
    return address;
  };

  return (
    <div className="space-y-6" data-oid="_3w8v90">
      {showRouteForm ? (
        <FixedRouteForm
          editMode={!!editingRoute}
          routeData={editingRoute}
          onSubmit={handleRouteSubmit}
          onCancel={() => {
            setShowRouteForm(false);
            setEditingRoute(null);
          }}
          data-oid="vcj75fc"
        />
      ) : (
        <>
          <div
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm mb-4"
            data-oid="3nfpgd7"
          >
            <div className="relative w-64" data-oid="c8mcnv6">
              <input
                type="text"
                placeholder="Buscar rutas..."
                className="pl-10 pr-4 py-2 border rounded-lg w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-oid="s3sut-j"
              />

              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
                data-oid="ej:does"
              />
            </div>
            <div className="flex space-x-3" data-oid="xgu-4.0">
              <select
                className="px-3 py-2 border rounded-lg"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                data-oid="rys-9z7"
              >
                <option value="all" data-oid=".l:sq1x">
                  Todos los estados
                </option>
                <option value="active" data-oid="cdxadf:">
                  Activas
                </option>
                <option value="inactive" data-oid="h.uq4rs">
                  Inactivas
                </option>
                <option value="draft" data-oid="dkbgwe.">
                  Borrador
                </option>
              </select>
              <Button
                onClick={handleAddRoute}
                className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                data-oid="1ochodi"
              >
                <PlusCircle size={18} className="mr-2" data-oid="pr9xs93" />
                Nueva Ruta Fija
              </Button>
            </div>
          </div>

          <div
            className="bg-white rounded-lg shadow-md overflow-hidden"
            data-oid="h5bsq:-"
          >
            <div className="overflow-x-auto" data-oid="41d3wha">
              <table
                className="min-w-full divide-y divide-gray-200"
                data-oid="j-pg7im"
              >
                <thead className="bg-gray-50" data-oid="3.7vyb3">
                  <tr data-oid="0w99-up">
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      data-oid="x1b57pf"
                    >
                      Nombre
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      data-oid="fc4oq6a"
                    >
                      Origen → Destino
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      data-oid="2zb467t"
                    >
                      Colaborador
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      data-oid="75lnuef"
                    >
                      Vehículo / Chófer
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      data-oid="7..5fyp"
                    >
                      Estado
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      data-oid="i92x6iu"
                    >
                      Tarifas
                    </th>
                    <th
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      data-oid="t47s3ao"
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody
                  className="bg-white divide-y divide-gray-200"
                  data-oid="awtl.cu"
                >
                  {filteredRoutes.map((route, index) => (
                    <tr
                      key={`route-${route.id || index}`}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={(e) => handleViewRouteDetails(route, e)}
                      data-oid="q9jidk0"
                    >
                      <td
                        className="px-6 py-4 whitespace-nowrap"
                        data-oid="hz4.ivi"
                      >
                        <div
                          className="text-sm font-medium text-gray-900"
                          data-oid="_13pps6"
                        >
                          {route.name}
                        </div>
                        {route.distance && route.estimatedTime && (
                          <div
                            className="text-xs text-gray-500 flex items-center mt-1"
                            data-oid="0b0u3er"
                          >
                            <Clock
                              className="h-3 w-3 mr-1"
                              data-oid="n2x8asy"
                            />
                            {route.estimatedTime} min
                            <span className="mx-1" data-oid="u7ep7_k">
                              •
                            </span>
                            <MapPin
                              className="h-3 w-3 mr-1"
                              data-oid="m5ky9zm"
                            />
                            {route.distance} km
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4" data-oid="d385ogz">
                        <div
                          className="text-sm text-gray-900 flex flex-col"
                          data-oid="mj6_mmb"
                        >
                          <div className="flex items-start" data-oid="gk2zda.">
                            <MapPin
                              className="h-4 w-4 text-black mt-0.5 mr-1 flex-shrink-0"
                              data-oid="u0769za"
                            />

                            <span data-oid="b0ytiep">
                              {truncateAddressForTable(route.origin.name)}
                            </span>
                          </div>
                          <div
                            className="flex items-start mt-2"
                            data-oid="t7c3tkr"
                          >
                            <MapPin
                              className="h-4 w-4 text-black mt-0.5 mr-1 flex-shrink-0"
                              data-oid="kmk.qsl"
                            />

                            <span data-oid="1fs9eef">
                              {truncateAddressForTable(route.destination.name)}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td
                        className="px-6 py-4 whitespace-nowrap"
                        data-oid="ho7yo.m"
                      >
                        <div className="flex items-center" data-oid="c.z5acn">
                          <div
                            className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3"
                            data-oid="7jlb5zv"
                          >
                            <Building
                              className="h-4 w-4 text-gray-600"
                              data-oid="f8j7cno"
                            />
                          </div>
                          <div
                            className="text-sm text-gray-900"
                            data-oid="-gfrqjb"
                          >
                            {getCollaboratorName(route.collaboratorId)}
                          </div>
                        </div>
                      </td>
                      <td
                        className="px-6 py-4 whitespace-nowrap"
                        data-oid="-m6v1nl"
                      >
                        {route.vehicles && route.vehicles.length > 0 ? (
                          <div className="space-y-2" data-oid="b5_onqk">
                            {/* Mostrar el primer vehículo */}
                            <div
                              className="flex items-center"
                              data-oid="q8_2w_g"
                            >
                              {route.vehicles[0].imageUrl ? (
                                <img
                                  src={route.vehicles[0].imageUrl}
                                  alt={route.vehicles[0].model}
                                  className="h-10 w-10 rounded-full object-cover"
                                  data-oid="ofj2n_k"
                                />
                              ) : (
                                <div
                                  className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center"
                                  data-oid="u1sjrvp"
                                >
                                  <Car
                                    className="h-6 w-6 text-gray-500"
                                    data-oid="vtnri:w"
                                  />
                                </div>
                              )}
                              <div className="ml-4" data-oid="zi_xzmz">
                                <div
                                  className="text-sm font-medium text-gray-900"
                                  data-oid="dcsg.mz"
                                >
                                  {route.vehicles[0].model}
                                </div>
                                <div
                                  className="text-xs text-gray-500"
                                  data-oid="53td6x5"
                                >
                                  {route.vehicles[0].licensePlate}
                                </div>
                              </div>
                            </div>

                            {/* Mostrar contador si hay más vehículos */}
                            {route.vehicles.length > 1 && (
                              <div
                                className="ml-2 text-xs text-gray-600"
                                data-oid="y.1341w"
                              >
                                +{route.vehicles.length - 1} vehículo
                                {route.vehicles.length - 1 > 1 ? "s" : ""} más
                              </div>
                            )}

                            {/* Mostrar conductor del primer vehículo si existe */}
                            {route.drivers && route.drivers.length > 0 ? (
                              <div
                                className="flex items-center mt-2"
                                data-oid="ujbi8cx"
                              >
                                {route.drivers[0].photo ? (
                                  <img
                                    src={route.drivers[0].photo}
                                    alt={route.drivers[0].name}
                                    className="h-6 w-6 rounded-full object-cover"
                                    data-oid="lrule:0"
                                  />
                                ) : (
                                  <div
                                    className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center"
                                    data-oid="lgdzs8d"
                                  >
                                    <User
                                      className="h-4 w-4 text-gray-500"
                                      data-oid="h61zmgn"
                                    />
                                  </div>
                                )}
                                <span
                                  className="ml-2 text-xs text-gray-500"
                                  data-oid="-v6dzvx"
                                >
                                  {route.drivers[0].name}
                                  {route.drivers.length > 1 &&
                                    ` +${route.drivers.length - 1} más`}
                                </span>
                              </div>
                            ) : (
                              route.driver && (
                                <div
                                  className="flex items-center mt-2"
                                  data-oid="tq8aqy8"
                                >
                                  {route.driver.photo ? (
                                    <img
                                      src={route.driver.photo}
                                      alt={route.driver.name}
                                      className="h-6 w-6 rounded-full object-cover"
                                      data-oid="m805tg:"
                                    />
                                  ) : (
                                    <div
                                      className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center"
                                      data-oid="c4k_shg"
                                    >
                                      <User
                                        className="h-4 w-4 text-gray-500"
                                        data-oid="j7lc5u6"
                                      />
                                    </div>
                                  )}
                                  <span
                                    className="ml-2 text-xs text-gray-500"
                                    data-oid="bbbzyfa"
                                  >
                                    {route.driver.name}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        ) : route.vehicle ? (
                          // Para compatibilidad con versiones anteriores
                          <div className="flex flex-col" data-oid="mu:q4_t">
                            <div
                              className="flex items-center"
                              data-oid="zr868_:"
                            >
                              {route.vehicle.imageUrl ? (
                                <img
                                  src={route.vehicle.imageUrl}
                                  alt={route.vehicle.model}
                                  className="h-10 w-10 rounded-full object-cover"
                                  data-oid="v77:0rr"
                                />
                              ) : (
                                <div
                                  className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center"
                                  data-oid="ik22t.w"
                                >
                                  <Car
                                    className="h-6 w-6 text-gray-500"
                                    data-oid="ir1ang-"
                                  />
                                </div>
                              )}
                              <div className="ml-4" data-oid="5p3e2w8">
                                <div
                                  className="text-sm font-medium text-gray-900"
                                  data-oid="ckd:58f"
                                >
                                  {route.vehicle.model}
                                </div>
                                <div
                                  className="text-xs text-gray-500"
                                  data-oid=":ge5w2y"
                                >
                                  {route.vehicle.licensePlate}
                                </div>
                              </div>
                            </div>
                            {route.driver && (
                              <div
                                className="flex items-center mt-2"
                                data-oid="0bppro9"
                              >
                                {route.driver.photo ? (
                                  <img
                                    src={route.driver.photo}
                                    alt={route.driver.name}
                                    className="h-6 w-6 rounded-full object-cover"
                                    data-oid="onrn4.k"
                                  />
                                ) : (
                                  <div
                                    className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center"
                                    data-oid="tlqvxr5"
                                  >
                                    <User
                                      className="h-4 w-4 text-gray-500"
                                      data-oid="x:b4htw"
                                    />
                                  </div>
                                )}
                                <span
                                  className="ml-2 text-xs text-gray-500"
                                  data-oid="s_s.7z_"
                                >
                                  {route.driver.name}
                                </span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div
                            className="text-gray-500 italic"
                            data-oid="s_1-gam"
                          >
                            Sin vehículos asignados
                          </div>
                        )}
                      </td>
                      <td
                        className="px-6 py-4 whitespace-nowrap"
                        data-oid="aakpxtm"
                      >
                        <Badge
                          className={`
                          ${
                            route.status === "active"
                              ? "bg-gray-200 text-green-800 hover:bg-gray-200"
                              : route.status === "inactive"
                                ? "bg-gray-100 text-gray-800 hover:bg-gray-100"
                                : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                          }
                        `}
                          data-oid="h4l8tkb"
                        >
                          {route.status === "active"
                            ? "Activa"
                            : route.status === "inactive"
                              ? "Inactiva"
                              : "Borrador"}
                        </Badge>
                        <div
                          className="flex items-center mt-2"
                          data-oid="45bhfml"
                        >
                          <span
                            className="text-xs text-gray-500 mr-2"
                            data-oid="rb6te5x"
                          >
                            {route.availability.days.map((day, index) => (
                              <span
                                key={`${route.id}-day-${index}`}
                                data-oid="_ahel-3"
                              >
                                {day}
                                {index < route.availability.days.length - 1
                                  ? ", "
                                  : ""}
                              </span>
                            ))}
                          </span>
                        </div>
                        <div
                          className="flex items-center mt-1"
                          data-oid=":qh8anq"
                        >
                          <Clock
                            className="h-3 w-3 text-gray-400 mr-1"
                            data-oid="mfu1saf"
                          />

                          <span
                            className="text-xs text-gray-500"
                            data-oid="d1l33xh"
                          >
                            {route.availability.timeSlots.map((slot, index) => (
                              <span
                                key={`${route.id}-slot-${index}`}
                                data-oid="_h1vfrx"
                              >
                                {slot}
                                {index < route.availability.timeSlots.length - 1
                                  ? ", "
                                  : ""}
                              </span>
                            ))}
                          </span>
                        </div>
                      </td>
                      <td
                        className="px-6 py-4 whitespace-nowrap"
                        data-oid="8eoobnm"
                      >
                        <div className="text-sm" data-oid="fu.ple3">
                          <div
                            className="font-medium text-gray-900"
                            data-oid="dvqu_gc"
                          >
                            {route.pricing.standard} {route.pricing.currency}
                          </div>
                          <div
                            className="text-xs text-gray-500 mt-1"
                            data-oid="z3_7r63"
                          >
                            Noche: {route.pricing.night}{" "}
                            {route.pricing.currency}
                          </div>
                          <div
                            className="text-xs text-gray-500"
                            data-oid="eoibmf."
                          >
                            Festivo: {route.pricing.holiday}{" "}
                            {route.pricing.currency}
                          </div>
                        </div>
                      </td>
                      <td
                        className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2"
                        data-oid="bip8iyw"
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewRouteDetails(route, e);
                          }}
                          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                          data-oid="p1i5qgg"
                        >
                          <Eye className="h-4 w-4" data-oid="z5okvex" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleStatus(route.id, e);
                          }}
                          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                          data-oid="gn5r2_v"
                        >
                          {route.status === "active" ? (
                            <ToggleRight
                              className="h-5 w-5 text-gray-600"
                              data-oid="dfza:ds"
                            />
                          ) : (
                            <ToggleLeft
                              className="h-5 w-5 text-gray-400"
                              data-oid="4np.jod"
                            />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditRoute(route);
                          }}
                          className="text-gray-600 hover:text-blue-800 hover:bg-gray-100"
                          data-oid="w5p788b"
                        >
                          <Edit className="h-4 w-4" data-oid="r2afihp" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteRoute(route.id, e);
                          }}
                          className="text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                          data-oid="j1.ct_g"
                        >
                          <Trash2 className="h-4 w-4" data-oid="8tmn4c2" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredRoutes.length === 0 && (
                <div className="py-10 text-center" data-oid="eh2-_:7">
                  <div
                    className="h-20 w-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-100"
                    data-oid="nx31-7w"
                  >
                    <MapPin
                      className="h-10 w-10 text-gray-400"
                      data-oid="8z-i8lj"
                    />
                  </div>
                  <p className="text-gray-500" data-oid="bt_xa13">
                    No se encontraron rutas fijas que coincidan con los
                    criterios de búsqueda
                  </p>
                  <Button
                    onClick={handleAddRoute}
                    className="mt-4 flex items-center mx-auto px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                    data-oid="-tw_:wc"
                  >
                    <PlusCircle size={18} className="mr-2" data-oid="jvznkc3" />
                    Crear Nueva Ruta
                  </Button>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Diálogo de detalles de ruta */}
      <Dialog
        open={showDetailsDialog}
        onOpenChange={setShowDetailsDialog}
        data-oid=":15.f76"
      >
        <DialogContent
          className="max-w-3xl max-h-[90vh] overflow-y-auto"
          data-oid="miu.trg"
        >
          <DialogHeader data-oid="u8b1:5v">
            <DialogTitle
              className="text-xl flex items-center gap-2"
              data-oid=":4o37um"
            >
              {selectedRoute?.name}
              <Badge
                className={`ml-2 ${
                  selectedRoute?.status === "active"
                    ? "bg-gray-200 text-green-800"
                    : selectedRoute?.status === "inactive"
                      ? "bg-gray-100 text-gray-800"
                      : "bg-amber-100 text-amber-800"
                }`}
                data-oid="ictogra"
              >
                {selectedRoute?.status === "active"
                  ? "Activa"
                  : selectedRoute?.status === "inactive"
                    ? "Inactiva"
                    : "Borrador"}
              </Badge>
            </DialogTitle>
            <DialogDescription data-oid="8:654qz">
              Detalles de la ruta fija
            </DialogDescription>
          </DialogHeader>

          {selectedRoute && (
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4"
              data-oid="aobib9c"
            >
              {/* Origen y Destino */}
              <div className="space-y-4" data-oid="j8ar6n3">
                <h3
                  className="font-medium text-gray-900 text-base mb-2"
                  data-oid="sjdvh75"
                >
                  Información General
                </h3>

                <div
                  className="bg-gray-50 p-4 rounded-lg space-y-4"
                  data-oid="juc5vbs"
                >
                  <div data-oid="vt6ipds">
                    <div
                      className="text-sm font-medium text-gray-500"
                      data-oid="3p--h9g"
                    >
                      Origen
                    </div>
                    <div className="flex items-start mt-1" data-oid="nwugq7l">
                      <MapPin
                        className="h-4 w-4 text-black mt-0.5 mr-1 flex-shrink-0"
                        data-oid="pwcf1:w"
                      />

                      <span className="text-base" data-oid="w7qykmr">
                        {selectedRoute.origin.name}
                      </span>
                    </div>
                  </div>

                  <div data-oid="f6xg0gf">
                    <div
                      className="text-sm font-medium text-gray-500"
                      data-oid="4yzsad6"
                    >
                      Destino
                    </div>
                    <div className="flex items-start mt-1" data-oid="f27g9o9">
                      <MapPin
                        className="h-4 w-4 text-black mt-0.5 mr-1 flex-shrink-0"
                        data-oid="cu5zhlt"
                      />

                      <span className="text-base" data-oid="81emp73">
                        {selectedRoute.destination.name}
                      </span>
                    </div>
                  </div>

                  {selectedRoute.distance && selectedRoute.estimatedTime && (
                    <div
                      className="flex items-center gap-3 text-sm text-gray-600 border-t pt-2"
                      data-oid=".r_v6el"
                    >
                      <div className="flex items-center" data-oid="k9nxp9u">
                        <MapPin className="h-3 w-3 mr-1" data-oid="jj18u10" />
                        <span data-oid="k.v1ruf">
                          {selectedRoute.distance} km
                        </span>
                      </div>
                      <div className="flex items-center" data-oid="9ev3qxw">
                        <Clock className="h-3 w-3 mr-1" data-oid="rjz0zvk" />
                        <span data-oid="3:7v7ec">
                          {selectedRoute.estimatedTime} min
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Colaborador */}
                <div data-oid="hn5d7i_">
                  <h3
                    className="font-medium text-gray-900 text-base mb-2"
                    data-oid="2xa94kt"
                  >
                    Colaborador
                  </h3>
                  <div
                    className="flex items-center bg-gray-50 p-4 rounded-lg"
                    data-oid="-mtkdz0"
                  >
                    <div
                      className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3"
                      data-oid="7m:fs:k"
                    >
                      <Building
                        className="h-5 w-5 text-gray-600"
                        data-oid="c5cfkq3"
                      />
                    </div>
                    <div data-oid="-g16:10">
                      <div className="font-medium" data-oid="1pv4td6">
                        {getCollaboratorName(selectedRoute.collaboratorId)}
                      </div>
                      <div className="text-xs text-gray-500" data-oid="ah-z.3k">
                        ID: {selectedRoute.collaboratorId || "No asignado"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Disponibilidad */}
                <div data-oid="a679r_.">
                  <h3
                    className="font-medium text-gray-900 text-base mb-2"
                    data-oid="p-rkepv"
                  >
                    Disponibilidad
                  </h3>
                  <div
                    className="bg-gray-50 p-4 rounded-lg space-y-3"
                    data-oid="65t7gx5"
                  >
                    <div data-oid="ycy_v.n">
                      <div
                        className="text-sm font-medium text-gray-500"
                        data-oid="i2yuwnd"
                      >
                        Días
                      </div>
                      <div className="mt-1 text-base" data-oid=".h4s.9r">
                        {selectedRoute.availability.days.join(", ")}
                      </div>
                    </div>
                    <div data-oid="bvmzl3w">
                      <div
                        className="text-sm font-medium text-gray-500"
                        data-oid="dra.p-2"
                      >
                        Horarios
                      </div>
                      <div className="mt-1 text-base" data-oid="znp9kit">
                        {selectedRoute.availability.timeSlots.join(", ")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vehículo, Tarifas y Acciones */}
              <div className="space-y-4" data-oid="j3z7f_w">
                {/* Vehículo */}
                <div data-oid="ilunbcq">
                  <h3
                    className="font-medium text-gray-900 text-base mb-2"
                    data-oid="asdjjor"
                  >
                    Vehículos (
                    {selectedRoute.vehicles ? selectedRoute.vehicles.length : 1}
                    )
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg" data-oid="19r:ya3">
                    {selectedRoute.vehicles &&
                    selectedRoute.vehicles.length > 0 ? (
                      // Mostrar todos los vehículos disponibles
                      <div className="space-y-4" data-oid="5h92b-a">
                        {selectedRoute.vehicles.map((vehicle, idx) => (
                          <div
                            key={idx}
                            className={
                              idx > 0 ? "pt-4 border-t border-gray-200" : ""
                            }
                            data-oid="hs6pz79"
                          >
                            <div
                              className="flex items-center"
                              data-oid="lf7e5l2"
                            >
                              {vehicle.imageUrl ? (
                                <img
                                  src={vehicle.imageUrl}
                                  alt={vehicle.model}
                                  className="h-16 w-16 rounded-lg object-cover"
                                  data-oid="j819ul4"
                                />
                              ) : (
                                <div
                                  className="h-16 w-16 rounded-lg bg-gray-200 flex items-center justify-center"
                                  data-oid="n:oetf6"
                                >
                                  <Car
                                    className="h-8 w-8 text-gray-500"
                                    data-oid="1jkeufh"
                                  />
                                </div>
                              )}
                              <div className="ml-4 flex-1" data-oid="tiuhmiu">
                                <div
                                  className="text-lg font-medium"
                                  data-oid="80b3hft"
                                >
                                  {vehicle.model}
                                </div>
                                <div
                                  className="text-base text-gray-600"
                                  data-oid="32rui54"
                                >
                                  {vehicle.licensePlate}
                                </div>
                              </div>
                            </div>

                            {/* Mostrar conductor asociado a este vehículo si existe */}
                            {selectedRoute.drivers &&
                              selectedRoute.drivers[idx] && (
                                <div
                                  className="flex items-center mt-2 ml-4"
                                  data-oid="yic_o27"
                                >
                                  {selectedRoute.drivers[idx].photo ? (
                                    <img
                                      src={selectedRoute.drivers[idx].photo}
                                      alt={selectedRoute.drivers[idx].name}
                                      className="h-8 w-8 rounded-full object-cover"
                                      data-oid="-_dsykp"
                                    />
                                  ) : (
                                    <div
                                      className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center"
                                      data-oid="7yao25y"
                                    >
                                      <User
                                        className="h-4 w-4 text-gray-500"
                                        data-oid="13lwebt"
                                      />
                                    </div>
                                  )}
                                  <div className="ml-2" data-oid="jdvqome">
                                    <div
                                      className="text-sm font-medium"
                                      data-oid="e:.zi8_"
                                    >
                                      Conductor
                                    </div>
                                    <div
                                      className="text-sm text-gray-600"
                                      data-oid="f8kvs5_"
                                    >
                                      {selectedRoute.drivers[idx].name}
                                    </div>
                                  </div>
                                </div>
                              )}
                          </div>
                        ))}
                      </div>
                    ) : selectedRoute.vehicle ? (
                      // Compatibilidad con versión anterior
                      <div data-oid="sywb9up">
                        <div className="flex items-center" data-oid="kq:rcub">
                          {selectedRoute.vehicle.imageUrl ? (
                            <img
                              src={selectedRoute.vehicle.imageUrl}
                              alt={selectedRoute.vehicle.model}
                              className="h-16 w-16 rounded-lg object-cover"
                              data-oid="_zjdma-"
                            />
                          ) : (
                            <div
                              className="h-16 w-16 rounded-lg bg-gray-200 flex items-center justify-center"
                              data-oid="neoyd37"
                            >
                              <Car
                                className="h-8 w-8 text-gray-500"
                                data-oid="u9lenhi"
                              />
                            </div>
                          )}
                          <div className="ml-4 flex-1" data-oid="9oaiqw-">
                            <div
                              className="text-lg font-medium"
                              data-oid="nzi:flh"
                            >
                              {selectedRoute.vehicle.model}
                            </div>
                            <div
                              className="text-base text-gray-600"
                              data-oid=".4f6b1y"
                            >
                              {selectedRoute.vehicle.licensePlate}
                            </div>
                          </div>
                        </div>

                        {selectedRoute.driver && (
                          <div
                            className="flex items-center mt-4 border-t pt-3"
                            data-oid="wrpberm"
                          >
                            {selectedRoute.driver.photo ? (
                              <img
                                src={selectedRoute.driver.photo}
                                alt={selectedRoute.driver.name}
                                className="h-10 w-10 rounded-full object-cover"
                                data-oid="xn7bdt8"
                              />
                            ) : (
                              <div
                                className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center"
                                data-oid="p5q4o_w"
                              >
                                <User
                                  className="h-5 w-5 text-gray-500"
                                  data-oid="zs2sbuj"
                                />
                              </div>
                            )}
                            <div className="ml-3" data-oid="tqgw8zq">
                              <div className="font-medium" data-oid="u4i54p7">
                                Conductor
                              </div>
                              <div className="text-gray-600" data-oid="e0s0urw">
                                {selectedRoute.driver.name}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div
                        className="flex items-center justify-center p-4 text-gray-500"
                        data-oid="to.ccnr"
                      >
                        <Info className="h-5 w-5 mr-2" data-oid="6_bavzw" />
                        <span data-oid="l4juhpz">
                          No hay vehículos asignados
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tarifas */}
                <div data-oid="8dnkvq0">
                  <h3
                    className="font-medium text-gray-900 text-base mb-2"
                    data-oid=":nojqvw"
                  >
                    Tarifas
                  </h3>
                  <div
                    className="bg-gray-50 p-4 rounded-lg space-y-2"
                    data-oid="2xz994f"
                  >
                    <div
                      className="flex justify-between items-center"
                      data-oid="rui:qls"
                    >
                      <div
                        className="text-sm font-medium text-gray-500"
                        data-oid="weoxqnm"
                      >
                        Estándar:
                      </div>
                      <div className="text-lg font-medium" data-oid="1yks1s7">
                        {selectedRoute.pricing.standard}{" "}
                        {selectedRoute.pricing.currency}
                      </div>
                    </div>
                    <div
                      className="flex justify-between items-center"
                      data-oid="bjk8072"
                    >
                      <div
                        className="text-sm font-medium text-gray-500"
                        data-oid=".emoqvb"
                      >
                        Tarifa nocturna:
                      </div>
                      <div data-oid="j.7_5_p">
                        {selectedRoute.pricing.night}{" "}
                        {selectedRoute.pricing.currency}
                      </div>
                    </div>
                    <div
                      className="flex justify-between items-center"
                      data-oid="0l4jmh2"
                    >
                      <div
                        className="text-sm font-medium text-gray-500"
                        data-oid="g8.snv2"
                      >
                        Tarifa en festivos:
                      </div>
                      <div data-oid="t1c3xyy">
                        {selectedRoute.pricing.holiday}{" "}
                        {selectedRoute.pricing.currency}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mapa */}
                <div data-oid="1gi8kv2">
                  <h3
                    className="font-medium text-gray-900 text-base mb-2"
                    data-oid="f.zcs5q"
                  >
                    Mapa de la Ruta
                  </h3>
                  <GoogleRouteMap
                    origin={selectedRoute.origin}
                    destination={selectedRoute.destination}
                    data-oid="dye6.g-"
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter
            className="flex justify-end gap-2 mt-6"
            data-oid="jh:a69p"
          >
            <Button
              className="bg-gray-100 text-gray-800 hover:bg-gray-200"
              onClick={() => setShowDetailsDialog(false)}
              data-oid="4i1vyjc"
            >
              <X className="h-4 w-4 mr-2" data-oid="i-ie-9m" />
              Cerrar
            </Button>
            <Button
              className="bg-black text-white hover:bg-gray-800"
              onClick={() => {
                if (selectedRoute) {
                  setShowDetailsDialog(false);
                  handleEditRoute(selectedRoute);
                }
              }}
              data-oid="xnm:ntg"
            >
              <Edit className="h-4 w-4 mr-2" data-oid=":wl:1.9" />
              Editar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        data-oid="_fzg2g:"
      >
        <AlertDialogContent data-oid="pi95pmt">
          <AlertDialogHeader data-oid="xvioors">
            <AlertDialogTitle data-oid="f8-iqbi">
              ¿Estás seguro?
            </AlertDialogTitle>
            <AlertDialogDescription data-oid="gdlyvtj">
              Esta acción eliminará permanentemente la ruta fija. Esta acción no
              se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter data-oid="0iwu7bu">
            <AlertDialogCancel data-oid="mjub02x">Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-black hover:bg-gray-800"
              data-oid="jv-th_b"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FixedRoutesTab;
