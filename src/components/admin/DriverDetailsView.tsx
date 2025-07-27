import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import {
  X,
  Save,
  Edit,
  CheckCircle,
  AlertTriangle,
  Mail,
  Phone,
  User as UserIcon,
  FileText,
  RefreshCw,
  Car,
  Star,
  BookOpen,
  CreditCard,
  Book,
  Bookmark,
  Building,
  Upload,
  Circle,
} from "lucide-react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

// Definición del tipo de datos para un chófer
export interface Driver {
  id: string;
  name: string;
  photo: string;
  phone: string;
  email: string;
  documentId: string;
  licenseNumber: string;
  licenseExpiry: string;
  type: "private" | "company";
  companyName?: string;
  experience: number;
  rating: number;
  available: boolean;
  assignedVehicles?: string[]; // Ahora es opcional
  languages: string[];
  specialty?: string;
  notes?: string;
  status: "active" | "inactive" | "pending";
  country: string;
  city: string;
  address?: string;
  collaboratorId?: string;
}

// Interfaz para los datos de vehículos
interface Vehicle {
  id: string;
  _id?: string; // Campo adicional por si viene del backend con formato MongoDB
  name: string;
  image: string;
  type: string;
  category: string;
  licensePlate: string;
  details: {
    brand: string;
    model: string;
    year: number;
    color: string;
  };
  available: boolean;
}

// Interfaz para los colaboradores
interface Collaborator {
  id: string;
  name: string;
  type: "company" | "individual";
  status: string;
}

interface DriverDetailsViewProps {
  driver: Driver;
  onClose: () => void;
  onSave?: (driver: Driver) => void;
}

const DriverDetailsView = ({
  driver: initialDriver,
  onClose,
  onSave,
}: DriverDetailsViewProps) => {
  const { toast } = useToast();

  // Estados para edición
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [, setLoadingCollaborators] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialDriver.photo || null,
  );

  // Estado local para el driver que puede actualizarse
  const [driver, setDriver] = useState<Driver>(initialDriver);
  const [assignedVehicles, setAssignedVehicles] = useState<Vehicle[]>([]);
  const [loadingVehicles, setLoadingVehicles] = useState(false);

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

  // Cargar colaboradores al montar el componente
  useEffect(() => {
    fetchCollaborators();
  }, []);

  // Cargar vehículos asociados cuando el componente se monta
  useEffect(() => {
    console.log("Verificando vehículos asociados al chófer con ID:", driver.id);

    // Obtener datos actualizados del driver primero
    fetchDriverDetails();
  }, []);

  // Función para obtener detalles actualizados del driver directamente del backend
  const fetchDriverDetails = async () => {
    try {
      const response = await axios.get(
        `/api/admin/drivers/${driver.id}`,
        getAuthHeaders(),
      );

      if (response.data && response.data.driver) {
        const updatedDriver = response.data.driver;
        console.log("Datos detallados del chófer obtenidos:", updatedDriver);

        // Actualizar el driver con los datos completos
        setDriver(updatedDriver);

        // Buscar vehículos asociados a este chófer
        fetchAssignedVehicles();
      }
    } catch (error) {
      console.error("Error al obtener detalles del chófer:", error);
    }
  };

  // Función para obtener los detalles de vehículos asociados
  const fetchAssignedVehicles = async () => {
    try {
      setLoadingVehicles(true);
      console.log("Buscando vehículos asociados al chófer con ID:", driver.id);

      // Primero intentamos con el endpoint que filtra en el backend
      const response = await axios.get(
        "/api/admin/vehicles/list",
        getAuthHeaders(),
      );

      if (response.data && response.data.vehicles) {
        const allVehicles = response.data.vehicles;
        console.log("Total de vehículos recibidos:", allVehicles.length);

        // Imprimir algunos vehículos para entender la estructura
        if (allVehicles.length > 0) {
          // Imprimir la estructura del primer vehículo que tenga associatedDrivers
          const vehicleWithDrivers = allVehicles.find(
            (v: any) => v.associatedDrivers && v.associatedDrivers.length > 0,
          );
          if (vehicleWithDrivers) {
            console.log("Ejemplo de estructura de vehículo con chóferes:", {
              id: vehicleWithDrivers.id,
              associatedDrivers: vehicleWithDrivers.associatedDrivers,
            });
          }
        }

        // Filtramos manualmente los vehículos que tienen a este chófer en su array
        const filteredVehicles = allVehicles.filter((vehicle: any) => {
          // Convertimos el ID del chófer a string para comparación consistente
          const driverId = String(driver.id);
          console.log(
            `Verificando vehículo ${vehicle.id || vehicle._id} para chófer ${driverId}`,
          );

          // Verificar en diferentes posibles campos donde podrían estar los IDs de chóferes
          const possibleFields = [
            "associatedDrivers",
            "drivers",
            "driverIds",
            "choferIds",
          ];

          for (const field of possibleFields) {
            const driverArray = vehicle[field];

            // Si el campo existe y es un array
            if (driverArray && Array.isArray(driverArray)) {
              console.log(
                `Vehículo ${vehicle.id} tiene campo ${field} con ${driverArray.length} elementos`,
              );

              // Buscamos coincidencias en el array
              for (const item of driverArray) {
                // Si el item es directamente el ID como string
                if (typeof item === "string" && item === driverId) {
                  console.log(
                    `¡Coincidencia encontrada! ID ${item} === ${driverId}`,
                  );
                  return true;
                }

                // Si el item es un objeto con id o _id
                if (typeof item === "object" && item !== null) {
                  const itemId = item.id || item._id;
                  if (itemId && String(itemId) === driverId) {
                    console.log(
                      `¡Coincidencia encontrada en objeto! ID ${itemId} === ${driverId}`,
                    );
                    return true;
                  }
                }
              }
            }
          }

          // También verificamos si hay un campo 'driver' (singular) que contenga el ID
          const driverField = vehicle.driver;
          if (driverField) {
            // Si es directamente el ID como string
            if (typeof driverField === "string" && driverField === driverId) {
              console.log(
                `¡Coincidencia encontrada en campo driver! ID ${driverField} === ${driverId}`,
              );
              return true;
            }

            // Si es un objeto con id o _id
            if (typeof driverField === "object" && driverField !== null) {
              const driverFieldId = driverField.id || driverField._id;
              if (driverFieldId && String(driverFieldId) === driverId) {
                console.log(
                  `¡Coincidencia encontrada en objeto driver! ID ${driverFieldId} === ${driverId}`,
                );
                return true;
              }
            }
          }

          return false;
        });

        console.log(
          "Vehículos filtrados para el chófer:",
          filteredVehicles.length,
        );
        console.log(
          "IDs filtrados:",
          filteredVehicles.map((v: any) => v.id),
        );

        if (filteredVehicles.length > 0) {
          // Mapear los datos de respuesta a nuestra estructura Vehicle
          const vehicles = filteredVehicles.map((vehicleData: any) => {
            return {
              id: vehicleData.id,
              name:
                vehicleData.name ||
                `${vehicleData.details?.brand || ""} ${vehicleData.details?.model || ""}`.trim(),
              image: vehicleData.image,
              type: vehicleData.type,
              category: vehicleData.category,
              licensePlate: vehicleData.licensePlate,
              details: {
                brand: vehicleData.details?.brand || "",
                model: vehicleData.details?.model || "",
                year: vehicleData.details?.year || 0,
                color: vehicleData.details?.color || "",
              },
              available: vehicleData.available,
            };
          });

          console.log("Vehículos asociados procesados:", vehicles.length);
          setAssignedVehicles(vehicles);
        } else {
          console.log("No se encontraron vehículos asociados a este chófer");
          setAssignedVehicles([]);
        }
      } else {
        console.log("No se recibieron datos de vehículos desde la API");
        setAssignedVehicles([]);
      }
    } catch (error) {
      console.error("Error al cargar vehículos asociados:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los vehículos asociados",
        variant: "destructive",
      });
      setAssignedVehicles([]);
    } finally {
      setLoadingVehicles(false);
    }
  };

  // Función para obtener colaboradores
  const fetchCollaborators = async () => {
    try {
      setLoadingCollaborators(true);
      const response = await axios.get(
        "/api/admin/collaborators/list",
        getAuthHeaders(),
      );

      if (response.data && response.data.collaborators) {
        setCollaborators(response.data.collaborators);
      }
    } catch (error) {
      console.error("Error al cargar colaboradores:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los colaboradores",
        variant: "destructive",
      });
    } finally {
      setLoadingCollaborators(false);
    }
  };

  // Manejar subida de imagen
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData({
          ...formData,
          photo: result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Iniciar modo edición
  const handleStartEditing = () => {
    // Preparar datos iniciales para el formulario
    const initialData: any = {
      name: driver.name,
      email: driver.email,
      phone: driver.phone,
      documentId: driver.documentId,
      licenseNumber: driver.licenseNumber,
      licenseExpiry: driver.licenseExpiry,
      type: driver.type,
      companyName: driver.companyName || "",
      experience: driver.experience,
      languages: driver.languages.join(", "),
      specialty: driver.specialty || "",
      status: driver.status,
      country: driver.country,
      city: driver.city,
      notes: driver.notes || "",
      photo: driver.photo,
      available: driver.available,
      collaboratorId: driver.collaboratorId || "none",
    };

    setFormData(initialData);
    setImagePreview(driver.photo || null);
    setIsEditing(true);
  };

  // Cancelar edición
  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  // Manejar cambios en el formulario
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejar cambios en checkboxes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  // Guardar cambios
  const handleSaveChanges = async () => {
    try {
      setIsSaving(true);

      // Preparar los datos para enviar
      let dataToSend = { ...formData };

      // Convertir el string de idiomas en un array
      if (typeof dataToSend.languages === "string") {
        dataToSend.languages = dataToSend.languages
          .split(",")
          .map((lang: string) => lang.trim())
          .filter(Boolean);
      }

      // Si collaboratorId es "none", usar null o cadena vacía para el backend
      if (dataToSend.collaboratorId === "none") {
        dataToSend.collaboratorId = ""; // O podría ser null si el backend lo maneja así
      }

      console.log("Enviando datos para actualizar el chófer:", dataToSend);

      // Llamada a la API para actualizar el chófer
      const response = await axios.put(
        `/api/admin/drivers/${driver.id}/update`,
        dataToSend,
        getAuthHeaders(),
      );

      if (response.status === 200) {
        // Crear el objeto actualizado del conductor
        const updatedDriver: Driver = {
          ...driver,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          documentId: formData.documentId,
          licenseNumber: formData.licenseNumber,
          licenseExpiry: formData.licenseExpiry,
          type: formData.type,
          companyName: formData.type === "company" ? formData.companyName : "",
          experience: Number(formData.experience),
          rating: Number(formData.rating),
          available: Boolean(formData.available),
          languages:
            typeof formData.languages === "string"
              ? formData.languages
                  .split(",")
                  .map((lang: string) => lang.trim())
                  .filter(Boolean)
              : formData.languages,
          specialty: formData.specialty,
          notes: formData.notes,
          status: formData.status,
          country: formData.country,
          city: formData.city,
          photo: imagePreview || "",
          collaboratorId:
            formData.collaboratorId === "none" ? "" : formData.collaboratorId,
        };

        // Actualizar el estado local
        setDriver(updatedDriver);

        toast({
          title: "Chófer actualizado",
          description:
            "Los datos del chófer han sido actualizados correctamente",
        });

        // Si tenemos un callback onSave, lo llamamos con los datos actualizados
        if (onSave) {
          onSave(updatedDriver);
        }

        setIsEditing(false);
      } else {
        throw new Error("Error al actualizar chófer");
      }
    } catch (err) {
      console.error("Error al actualizar chófer:", err);
      toast({
        title: "Error",
        description: "No se pudo actualizar el chófer. Intente nuevamente",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Formatear la fecha de expiración para mostrar
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  // Encontrar el nombre del colaborador asociado
  const getCollaboratorName = () => {
    if (!driver.collaboratorId) return "No asociado";
    const collaborator = collaborators.find(
      (c) => c.id === driver.collaboratorId,
    );
    return collaborator ? collaborator.name : "Colaborador no encontrado";
  };

  return (
    <div className="space-y-6 pb-10 max-w-[1200px] mx-auto" data-oid=".z0mkpr">
      {/* Cabecera */}
      <div
        className="bg-white border-b shadow-sm py-4 px-6 sticky top-0 z-10"
        data-oid="aog-mml"
      >
        <div className="flex justify-between items-center" data-oid="glauxq2">
          <div className="flex items-center space-x-4" data-oid="cwecsv4">
            <div className="flex flex-col" data-oid="ruudh9y">
              <h2
                className="text-2xl font-bold text-gray-800"
                data-oid="y3ap4ow"
              >
                {driver.name}
                <span className="ml-2 text-lg text-gray-500" data-oid="81fem:1">
                  (
                  {driver.type === "private"
                    ? "Chófer Privado"
                    : "Chófer de Empresa"}
                  )
                </span>
              </h2>
              <p className="text-gray-500 text-sm" data-oid="qaxyj3v">
                ID: {driver.id}
              </p>
            </div>
          </div>
          <div className="flex space-x-2" data-oid="o:.e_wn">
            {!isEditing ? (
              <Button
                variant="outline"
                onClick={handleStartEditing}
                className="flex items-center hover:bg-gray-100 transition-colors"
                data-oid=".isgdr."
              >
                <Edit className="h-4 w-4 mr-2" data-oid="5hpaey9" />
                Editar
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={handleCancelEdit}
                  className="flex items-center hover:bg-gray-100 transition-colors"
                  data-oid="yv_wuru"
                >
                  <X className="h-4 w-4 mr-2" data-oid="rg4mja_" />
                  Cancelar
                </Button>
                <Button
                  variant="default"
                  onClick={handleSaveChanges}
                  disabled={isSaving}
                  className="flex items-center bg-black hover:bg-gray-800 transition-colors"
                  data-oid=".kzldb1"
                >
                  {isSaving ? (
                    <RefreshCw
                      className="h-4 w-4 mr-2 animate-spin"
                      data-oid="l0yizr1"
                    />
                  ) : (
                    <Save className="h-4 w-4 mr-2" data-oid="bo2df5e" />
                  )}
                  Guardar
                </Button>
              </>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-gray-100 transition-colors"
              data-oid="ns-ivfl"
            >
              <X className="h-5 w-5" data-oid="q7mvwtt" />
            </Button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="px-6 space-y-8" data-oid="kfmi7_o">
        {/* Información del Chófer */}
        <Card
          className="shadow-md hover:shadow-lg transition-shadow overflow-hidden"
          data-oid="axqrc41"
        >
          <CardHeader className="bg-gray-50 border-b" data-oid="so6y18c">
            <CardTitle className="flex items-center text-lg" data-oid="ayco5zu">
              <UserIcon
                className="h-5 w-5 mr-2 text-gray-500"
                data-oid="s36nhco"
              />
              Información del Chófer
            </CardTitle>
          </CardHeader>
          <CardContent data-oid="q9gzx.s">
            <div
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
              data-oid="ovpz9p2"
            >
              {/* Panel izquierdo - Avatar e información de contacto */}
              <div className="lg:col-span-4" data-oid=".5-0fwi">
                {/* Avatar y datos básicos */}
                <div
                  className="flex flex-col items-center space-y-4 mb-6"
                  data-oid="kmp9c37"
                >
                  {!isEditing ? (
                    <>
                      {driver.photo ? (
                        <img
                          src={driver.photo}
                          alt={driver.name}
                          className="h-24 w-24 rounded-full border-4 border-gray-100 shadow-sm object-cover"
                          data-oid="dt_8:nz"
                        />
                      ) : (
                        <div
                          className="h-24 w-24 rounded-full bg-gradient-to-br from-red-100 to-red-200 text-gray-600 flex items-center justify-center text-2xl font-bold border-4 border-gray-100 shadow-sm"
                          data-oid="1ov8zps"
                        >
                          {driver.name[0].toUpperCase()}
                        </div>
                      )}
                    </>
                  ) : (
                    <div
                      className="w-full flex flex-col items-center"
                      data-oid="ybmmwe:"
                    >
                      <div
                        className="border border-dashed border-gray-300 rounded-full p-1 w-32 h-32 flex items-center justify-center relative"
                        data-oid="._841:r"
                      >
                        {imagePreview ? (
                          <div className="relative" data-oid=".l1p56h">
                            <img
                              src={imagePreview}
                              alt="Vista previa"
                              className="w-28 h-28 rounded-full object-cover"
                              data-oid=":6h.l2p"
                            />

                            <button
                              type="button"
                              onClick={() => {
                                setImagePreview(null);
                                setFormData({ ...formData, photo: "" });
                              }}
                              className="absolute -top-2 -right-2 bg-gray-200 text-gray-600 rounded-full p-1"
                              data-oid="9yyndd2"
                            >
                              <X size={16} data-oid="swg9-:y" />
                            </button>
                          </div>
                        ) : (
                          <div className="text-center" data-oid="w27fgs0">
                            <Upload
                              className="h-8 w-8 text-gray-400 mx-auto mb-2"
                              data-oid="pktc9dq"
                            />

                            <label
                              htmlFor="photo-upload"
                              className="cursor-pointer rounded-md bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 inline-block"
                              data-oid="ojxqp92"
                            >
                              Subir foto
                            </label>
                            <input
                              id="photo-upload"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleImageUpload}
                              data-oid="f3y1h-."
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {!isEditing ? (
                    <>
                      <h3
                        className="text-xl font-medium mt-2"
                        data-oid=":vt-2:5"
                      >
                        {driver.name}
                      </h3>
                      <div
                        className="flex flex-wrap gap-2 justify-center"
                        data-oid="cn7c5m4"
                      >
                        <Badge
                          className={cn(
                            "px-3 py-1 flex items-center",
                            driver.type === "private"
                              ? "bg-gray-200 text-blue-800 hover:bg-gray-200"
                              : "bg-gray-200 text-purple-800 hover:bg-gray-200",
                          )}
                          data-oid=".6d64_e"
                        >
                          {driver.type === "private"
                            ? "Chófer Privado"
                            : "Chófer de Empresa"}
                        </Badge>
                        <Badge
                          className={cn(
                            "px-3 py-1 flex items-center",
                            driver.status === "active"
                              ? "bg-gray-200 text-green-800 hover:bg-gray-200"
                              : driver.status === "inactive"
                                ? "bg-gray-200 text-gray-800 hover:bg-gray-200"
                                : "bg-gray-200 text-yellow-800 hover:bg-gray-200",
                          )}
                          data-oid="l4s4wjv"
                        >
                          <span
                            className={`h-2 w-2 rounded-full mr-1.5 ${
                              driver.status === "active"
                                ? "bg-black"
                                : driver.status === "inactive"
                                  ? "bg-black"
                                  : "bg-yellow-600"
                            }`}
                            data-oid="312uca4"
                          ></span>
                          {driver.status === "active"
                            ? "Activo"
                            : driver.status === "inactive"
                              ? "Inactivo"
                              : "Pendiente"}
                        </Badge>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-full space-y-2" data-oid="6z0pbnz">
                        <label
                          className="text-sm font-medium text-gray-500"
                          data-oid="luhvqe9"
                        >
                          Nombre:
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                          data-oid="s5ark82"
                        />
                      </div>
                      <div className="w-full space-y-2" data-oid="4gck64o">
                        <label
                          className="text-sm font-medium text-gray-500"
                          data-oid="h2_nl.z"
                        >
                          Estado:
                        </label>
                        <Select
                          name="status"
                          value={formData.status}
                          onValueChange={(value) =>
                            setFormData({ ...formData, status: value })
                          }
                          data-oid="ht5rz9_"
                        >
                          <SelectTrigger
                            className="border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                            data-oid="jx3ewt."
                          >
                            <SelectValue
                              placeholder="Seleccionar estado"
                              data-oid="98hpns0"
                            />
                          </SelectTrigger>
                          <SelectContent data-oid="o.w3uev">
                            <SelectItem value="active" data-oid="f:41-wg">
                              Activo
                            </SelectItem>
                            <SelectItem value="inactive" data-oid="m3vdvdr">
                              Inactivo
                            </SelectItem>
                            <SelectItem value="pending" data-oid="yzqs8dn">
                              Pendiente
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="w-full space-y-2" data-oid="wy0syw4">
                        <label
                          className="text-sm font-medium text-gray-500"
                          data-oid="rkkus-j"
                        >
                          Tipo:
                        </label>
                        <Select
                          name="type"
                          value={formData.type}
                          onValueChange={(value) =>
                            setFormData({ ...formData, type: value })
                          }
                          data-oid="m6:9x9z"
                        >
                          <SelectTrigger
                            className="border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                            data-oid="cr5ojx8"
                          >
                            <SelectValue
                              placeholder="Seleccionar tipo"
                              data-oid="39:u4qx"
                            />
                          </SelectTrigger>
                          <SelectContent data-oid="00fl.kl">
                            <SelectItem value="private" data-oid="ofmwd7h">
                              Chófer Privado
                            </SelectItem>
                            <SelectItem value="company" data-oid="fswrj.5">
                              Chófer de Empresa
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                </div>

                {/* Disponibilidad */}
                <div
                  className={`mt-4 p-3 border rounded-md ${
                    driver.available
                      ? "bg-green-50 border-green-200"
                      : "bg-amber-50 border-amber-200"
                  }`}
                  data-oid="nvr2c4:"
                >
                  {!isEditing ? (
                    <div className="flex items-center" data-oid="s8a.of9">
                      {driver.available ? (
                        <CheckCircle
                          className="h-5 w-5 text-gray-600 mr-2 flex-shrink-0"
                          data-oid="ejq25.l"
                        />
                      ) : (
                        <AlertTriangle
                          className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0"
                          data-oid="-55tzvu"
                        />
                      )}
                      <p
                        className={`text-sm ${
                          driver.available ? "text-green-700" : "text-amber-700"
                        }`}
                        data-oid="lxg1m:y"
                      >
                        {driver.available
                          ? "Disponible para servicios"
                          : "No disponible actualmente"}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center" data-oid=":d4ef4a">
                      <input
                        type="checkbox"
                        id="available"
                        name="available"
                        checked={formData.available}
                        onChange={handleCheckboxChange}
                        className="mr-2 h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-red-500"
                        data-oid="92z5w.x"
                      />

                      <label
                        htmlFor="available"
                        className="text-sm font-medium text-gray-700"
                        data-oid="ki-w332"
                      >
                        Disponible para servicios
                      </label>
                    </div>
                  )}
                </div>

                {/* Colaborador asociado */}
                <div
                  className="mt-4 p-3 border border-gray-200 rounded-md"
                  data-oid="sdqn:8s"
                >
                  <div className="flex items-center" data-oid="3l67.4j">
                    <Building
                      className="h-5 w-5 text-black mr-2 flex-shrink-0"
                      data-oid="gjz.:6y"
                    />

                    <p className="text-sm text-gray-700" data-oid="sp7von9">
                      Colaborador asociado
                    </p>
                  </div>
                  {!isEditing ? (
                    <div className="mt-1" data-oid="rj0t_e2">
                      <p className="text-sm font-medium" data-oid="vi-:yp:">
                        {getCollaboratorName()}
                      </p>
                    </div>
                  ) : (
                    <div className="mt-1" data-oid="fib-f0o">
                      <Select
                        name="collaboratorId"
                        value={formData.collaboratorId}
                        onValueChange={(value) =>
                          setFormData({ ...formData, collaboratorId: value })
                        }
                        data-oid="h-bk:hl"
                      >
                        <SelectTrigger
                          className="border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                          data-oid="9jst_5v"
                        >
                          <SelectValue
                            placeholder="Seleccionar colaborador"
                            data-oid="p2rum-s"
                          />
                        </SelectTrigger>
                        <SelectContent data-oid="m.b8v0h">
                          <SelectItem value="none" data-oid="lfyjyo5">
                            Sin asociar
                          </SelectItem>
                          {collaborators.map((collab) => (
                            <SelectItem
                              key={collab.id}
                              value={collab.id}
                              data-oid="1:snok5"
                            >
                              {collab.name} (
                              {collab.type === "company"
                                ? "Empresa"
                                : "Particular"}
                              )
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                {/* Valoración */}
                <div
                  className="mt-4 p-3 border border-gray-200 rounded-md"
                  data-oid="_5rca5-"
                >
                  <div className="flex items-center" data-oid="e1cgkac">
                    <Star
                      className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0"
                      data-oid="5ing9tg"
                    />

                    <p className="text-sm text-gray-700" data-oid="9wtb-f5">
                      Valoración del chófer
                    </p>
                  </div>
                  {!isEditing ? (
                    <div className="flex mt-1 items-center" data-oid="--qzqo9">
                      <div className="flex text-amber-500" data-oid="8z9cpib">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={
                              i < Math.round(driver.rating)
                                ? ""
                                : "text-gray-300"
                            }
                            data-oid="ktpy8.7"
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span
                        className="ml-2 text-sm text-gray-500"
                        data-oid="g5p-zt6"
                      >
                        ({driver.rating.toFixed(1)})
                      </span>
                    </div>
                  ) : (
                    <div className="mt-1" data-oid="w2hg-pa">
                      <Input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleInputChange}
                        min="0"
                        max="5"
                        step="0.1"
                        className="border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                        data-oid="-b.lbvj"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Panel derecho - Datos específicos */}
              <div className="lg:col-span-8" data-oid="d2zkpmb">
                {/* Información de contacto */}
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
                  data-oid="v0ch7d_"
                >
                  <div className="space-y-1" data-oid="b:54wp0">
                    <div
                      className="flex items-center text-gray-500"
                      data-oid="1tw8r9y"
                    >
                      <Mail className="h-4 w-4 mr-2" data-oid="n2jt-er" />
                      <span className="text-sm" data-oid="7jgdzd4">
                        Email:
                      </span>
                    </div>
                    {isEditing ? (
                      <Input
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                        data-oid="vn7ue06"
                      />
                    ) : (
                      <p
                        className="text-sm font-medium pl-6"
                        data-oid="wr.-.5t"
                      >
                        {driver.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1" data-oid="dzia966">
                    <div
                      className="flex items-center text-gray-500"
                      data-oid="_o7lc-r"
                    >
                      <Phone className="h-4 w-4 mr-2" data-oid="ltzg.:5" />
                      <span className="text-sm" data-oid="mj88ox6">
                        Teléfono:
                      </span>
                    </div>
                    {isEditing ? (
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                        data-oid="e8stef6"
                      />
                    ) : (
                      <p
                        className="text-sm font-medium pl-6"
                        data-oid="kxuzz:d"
                      >
                        {driver.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Datos personales y profesionales */}
                <div data-oid="h8hzi5f">
                  <h4
                    className="text-base font-medium mb-4 flex items-center border-b border-gray-200 pb-2"
                    data-oid="u9fq09x"
                  >
                    <FileText
                      className="h-5 w-5 mr-2 text-gray-500"
                      data-oid="ni1jaj:"
                    />
                    Datos Personales y Profesionales
                  </h4>

                  {!isEditing ? (
                    <div
                      className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3"
                      data-oid="ef2cvtl"
                    >
                      <div className="mb-3" data-oid="rnqnccc">
                        <p
                          className="text-sm font-medium text-gray-500"
                          data-oid="h0e7da7"
                        >
                          Documento ID
                        </p>
                        <p className="font-medium" data-oid=":h5ldcb">
                          {driver.documentId}
                        </p>
                      </div>
                      <div className="mb-3" data-oid="6we7iuv">
                        <p
                          className="text-sm font-medium text-gray-500"
                          data-oid="24nmcei"
                        >
                          Número de licencia
                        </p>
                        <p className="font-medium" data-oid="63_:bm8">
                          {driver.licenseNumber}
                        </p>
                      </div>
                      <div className="mb-3" data-oid="_kqwy.v">
                        <p
                          className="text-sm font-medium text-gray-500"
                          data-oid="p6p4oxs"
                        >
                          Fecha expiración licencia
                        </p>
                        <p className="font-medium" data-oid="280u4pf">
                          {formatDate(driver.licenseExpiry)}
                        </p>
                      </div>
                      {driver.type === "company" && (
                        <div className="mb-3" data-oid="h6i6.dk">
                          <p
                            className="text-sm font-medium text-gray-500"
                            data-oid=".288wwu"
                          >
                            Empresa
                          </p>
                          <p className="font-medium" data-oid="g538na-">
                            {driver.companyName || "No especificada"}
                          </p>
                        </div>
                      )}
                      <div className="mb-3" data-oid=":f9kbc-">
                        <p
                          className="text-sm font-medium text-gray-500"
                          data-oid="ug43ydq"
                        >
                          Años de experiencia
                        </p>
                        <p className="font-medium" data-oid="1pjtie8">
                          {driver.experience} años
                        </p>
                      </div>
                      <div className="mb-3" data-oid="zl5f-69">
                        <p
                          className="text-sm font-medium text-gray-500"
                          data-oid="-2h_8oc"
                        >
                          Idiomas
                        </p>
                        <p className="font-medium" data-oid="i5fjqf2">
                          {driver.languages.join(", ")}
                        </p>
                      </div>
                      <div className="mb-3" data-oid="t.rotpg">
                        <p
                          className="text-sm font-medium text-gray-500"
                          data-oid="7n57n46"
                        >
                          País
                        </p>
                        <p className="font-medium" data-oid="tx:onag">
                          {driver.country}
                        </p>
                      </div>
                      <div className="mb-3" data-oid="8t_3uqk">
                        <p
                          className="text-sm font-medium text-gray-500"
                          data-oid="4s8z:ez"
                        >
                          Ciudad
                        </p>
                        <p className="font-medium" data-oid="98894th">
                          {driver.city}
                        </p>
                      </div>
                      <div className="mb-3" data-oid="x7:6ijt">
                        <p
                          className="text-sm font-medium text-gray-500"
                          data-oid="oq6m5v6"
                        >
                          Especialidad
                        </p>
                        <p className="font-medium" data-oid="tcenatt">
                          {driver.specialty || "No especificada"}
                        </p>
                      </div>
                      {/* Eliminado el campo que mostraba la URL de la foto */}
                      <div className="mb-3 col-span-2" data-oid="gh_ig3h">
                        <p
                          className="text-sm font-medium text-gray-500"
                          data-oid="c4djzzg"
                        >
                          Notas
                        </p>
                        <p className="font-medium" data-oid="oozs8b9">
                          {driver.notes || "Sin notas adicionales"}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                      data-oid="l9mce.l"
                    >
                      <div data-oid="7s_kq_f">
                        <label
                          className="text-sm font-medium text-gray-500"
                          data-oid="2deubrn"
                        >
                          Documento ID
                        </label>
                        <Input
                          name="documentId"
                          value={formData.documentId}
                          onChange={handleInputChange}
                          className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                          data-oid="ii11k4f"
                        />
                      </div>
                      <div data-oid="bf7n84-">
                        <label
                          className="text-sm font-medium text-gray-500"
                          data-oid="0gg4o4m"
                        >
                          Número de licencia
                        </label>
                        <Input
                          name="licenseNumber"
                          value={formData.licenseNumber}
                          onChange={handleInputChange}
                          className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                          data-oid="mlfe7zo"
                        />
                      </div>
                      <div data-oid="8k6w4qj">
                        <label
                          className="text-sm font-medium text-gray-500"
                          data-oid="ctj206u"
                        >
                          Fecha expiración licencia
                        </label>
                        <Input
                          name="licenseExpiry"
                          type="date"
                          value={formData.licenseExpiry}
                          onChange={handleInputChange}
                          className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                          data-oid="pv.:j_f"
                        />
                      </div>
                      {formData.type === "company" && (
                        <div data-oid="1g2p9.k">
                          <label
                            className="text-sm font-medium text-gray-500"
                            data-oid="01svl29"
                          >
                            Empresa
                          </label>
                          <Input
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                            data-oid="8e:t5dz"
                          />
                        </div>
                      )}
                      <div data-oid="--yb9yk">
                        <label
                          className="text-sm font-medium text-gray-500"
                          data-oid="e_7i-_s"
                        >
                          Años de experiencia
                        </label>
                        <Input
                          name="experience"
                          type="number"
                          value={formData.experience}
                          onChange={handleInputChange}
                          className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                          data-oid="t1a72ug"
                        />
                      </div>
                      <div data-oid="_9x3e:e">
                        <label
                          className="text-sm font-medium text-gray-500"
                          data-oid="fpnyfum"
                        >
                          Idiomas
                        </label>
                        <Input
                          name="languages"
                          value={formData.languages}
                          onChange={handleInputChange}
                          placeholder="Español, Inglés, Francés..."
                          className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                          data-oid="d1y4vqv"
                        />
                      </div>
                      <div data-oid="iy__46l">
                        <label
                          className="text-sm font-medium text-gray-500"
                          data-oid="5tb_nwe"
                        >
                          País
                        </label>
                        <Input
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                          data-oid="76n4zr3"
                        />
                      </div>
                      <div data-oid="jkpvdh.">
                        <label
                          className="text-sm font-medium text-gray-500"
                          data-oid="36nnl2h"
                        >
                          Ciudad
                        </label>
                        <Input
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                          data-oid="ypzifhw"
                        />
                      </div>
                      <div data-oid="4k.60zi">
                        <label
                          className="text-sm font-medium text-gray-500"
                          data-oid="ple9xz:"
                        >
                          Especialidad
                        </label>
                        <Input
                          name="specialty"
                          value={formData.specialty}
                          onChange={handleInputChange}
                          placeholder="Eventos VIP, Traslados aeropuerto..."
                          className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                          data-oid="s5vjtv8"
                        />
                      </div>
                      {/* Eliminado el campo de URL de foto ya que ahora se maneja con el selector de archivos */}
                      <div className="col-span-2" data-oid="x:_jbls">
                        <label
                          className="text-sm font-medium text-gray-500"
                          data-oid="eje7561"
                        >
                          Notas
                        </label>
                        <Textarea
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          rows={3}
                          className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                          data-oid="dd_-qo6"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sección inferior con dos cards */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6"
          data-oid="wh:vy.7"
        >
          {/* Vehículos asignados */}
          <Card
            className="shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            data-oid="8zdcb5y"
          >
            <CardHeader className="bg-gray-50 border-b pb-3" data-oid="ow4uliq">
              <CardTitle
                className="flex items-center text-lg"
                data-oid="3:79kh_"
              >
                <Car
                  className="h-5 w-5 mr-2 text-gray-500"
                  data-oid="dw0fvp."
                />
                Vehículos Asociados
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 pb-6" data-oid="h5kgf8x">
              {loadingVehicles ? (
                <div className="py-10 text-center" data-oid="8b42bbj">
                  <RefreshCw
                    className="h-8 w-8 text-gray-400 animate-spin mx-auto mb-4"
                    data-oid="7w_6h3m"
                  />

                  <p className="text-gray-500" data-oid="-e-0l:t">
                    Cargando vehículos asociados...
                  </p>
                </div>
              ) : assignedVehicles && assignedVehicles.length > 0 ? (
                <ul className="space-y-4" data-oid="ipjh-r2">
                  {assignedVehicles.map((vehicle, index) => (
                    <li
                      key={index}
                      className="flex items-start py-3 border-b border-gray-100 last:border-b-0"
                      data-oid="_emc60_"
                    >
                      <div
                        className="h-16 w-16 rounded-md bg-gray-100 mr-4 overflow-hidden flex-shrink-0"
                        data-oid="7a5zmpo"
                      >
                        {vehicle.image ? (
                          <img
                            src={vehicle.image}
                            alt={vehicle.name}
                            className="h-full w-full object-cover"
                            data-oid="hb209o3"
                          />
                        ) : (
                          <div
                            className="h-full w-full flex items-center justify-center"
                            data-oid="ltnh67l"
                          >
                            <Car
                              className="h-8 w-8 text-gray-400"
                              data-oid="sj6kz:1"
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex-1" data-oid="szrroj_">
                        <div
                          className="flex justify-between"
                          data-oid="-4nbvff"
                        >
                          <p
                            className="font-medium text-gray-900"
                            data-oid="x2eukp."
                          >
                            {vehicle.name}
                          </p>
                          <Badge
                            className={`px-2 py-1 text-xs ${
                              vehicle.available
                                ? "bg-gray-200 text-green-800 hover:bg-gray-200"
                                : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                            }`}
                            data-oid="nrmibmj"
                          >
                            {vehicle.available ? "Disponible" : "No disponible"}
                          </Badge>
                        </div>
                        <p
                          className="text-sm text-gray-600 mt-1"
                          data-oid="m5es6b."
                        >
                          {vehicle.details.brand} {vehicle.details.model} (
                          {vehicle.details.year})
                        </p>
                        <div
                          className="mt-2 flex items-center text-xs text-gray-500 space-x-3"
                          data-oid=".lx62o9"
                        >
                          <span
                            className="flex items-center"
                            data-oid="95y0v3j"
                          >
                            <FileText
                              className="h-3 w-3 mr-1"
                              data-oid="bfb0g5v"
                            />

                            {vehicle.licensePlate}
                          </span>
                          <span
                            className="flex items-center"
                            data-oid="93dvcnj"
                          >
                            <Circle
                              className="h-2 w-2 mr-1"
                              style={{
                                fill: vehicle.details.color.toLowerCase(),
                              }}
                              data-oid="u_hjts:"
                            />

                            {vehicle.details.color}
                          </span>
                          <span
                            className="flex items-center capitalize"
                            data-oid="t00dyh5"
                          >
                            <Car className="h-3 w-3 mr-1" data-oid="3dyq.v3" />
                            {vehicle.type}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="py-10 text-center" data-oid="y:w6mfc">
                  <div className="mb-4 flex justify-center" data-oid="o3vpc21">
                    <Car
                      className="h-12 w-12 text-gray-300"
                      data-oid="h7v9yo7"
                    />
                  </div>
                  <p className="text-gray-500" data-oid="c836k-t">
                    No hay vehículos asociados
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Servicios recientes */}
          <Card
            className="shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            data-oid="h_dzvvo"
          >
            <CardHeader className="bg-gray-50 border-b pb-3" data-oid="3ic:yjn">
              <CardTitle
                className="flex items-center text-lg"
                data-oid="lupv221"
              >
                <BookOpen
                  className="h-5 w-5 mr-2 text-gray-500"
                  data-oid="t.u1hmn"
                />
                Servicios Recientes
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 pb-6" data-oid="18v_i32">
              <div className="py-10 text-center" data-oid="1ty4.rh">
                <div className="mb-4 flex justify-center" data-oid="jsq-klr">
                  <BookOpen
                    className="h-12 w-12 text-gray-300"
                    data-oid="-d8b70p"
                  />
                </div>
                <p className="text-gray-500" data-oid="ses9gmy">
                  No hay servicios recientes
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documentación y certificaciones */}
        <Card
          className="shadow-md hover:shadow-lg transition-shadow overflow-hidden"
          data-oid="xitzlbf"
        >
          <CardHeader className="bg-gray-50 border-b pb-3" data-oid="jnwquv_">
            <CardTitle className="flex items-center text-lg" data-oid="jvt-a8s">
              <FileText
                className="h-5 w-5 mr-2 text-gray-500"
                data-oid="5u9de1m"
              />
              Documentación y Certificaciones
            </CardTitle>
            <CardDescription data-oid="72m0gw1">
              Licencias y documentos del chófer
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 pb-6" data-oid="io_th6z">
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              data-oid="w8-2ga-"
            >
              <div
                className="border rounded-md p-4 flex flex-col"
                data-oid="6-e9ek7"
              >
                <div className="flex items-center mb-2" data-oid="aah0k-w">
                  <Book
                    className="h-5 w-5 text-gray-600 mr-2"
                    data-oid="78xdc4s"
                  />

                  <h3 className="font-medium" data-oid="u2e6i_k">
                    Licencia de conducir
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-2" data-oid=".mzjb0p">
                  Número: {driver.licenseNumber}
                </p>
                <p className="text-sm text-gray-600" data-oid=":0s.uan">
                  Expiración: {formatDate(driver.licenseExpiry)}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-auto self-start"
                  data-oid="p8u0-7o"
                >
                  <Bookmark className="h-4 w-4 mr-2" data-oid="-k_r:-l" />
                  Ver documento
                </Button>
              </div>

              <div
                className="border rounded-md p-4 flex flex-col"
                data-oid="lfelyxp"
              >
                <div className="flex items-center mb-2" data-oid="qnvx2-4">
                  <CreditCard
                    className="h-5 w-5 text-gray-600 mr-2"
                    data-oid="0rt-0l4"
                  />

                  <h3 className="font-medium" data-oid="3ug_v8n">
                    Documento de identidad
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-2" data-oid="oub_vk1">
                  Número: {driver.documentId}
                </p>
                <p className="text-sm text-gray-600" data-oid="856s2bz">
                  País: {driver.country}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-auto self-start"
                  data-oid="41y200l"
                >
                  <Bookmark className="h-4 w-4 mr-2" data-oid="z5h6916" />
                  Ver documento
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DriverDetailsView;
