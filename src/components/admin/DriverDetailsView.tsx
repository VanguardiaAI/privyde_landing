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
    <div className="space-y-6 pb-10 max-w-[1200px] mx-auto" data-oid="98g3sda">
      {/* Cabecera */}
      <div
        className="bg-white border-b shadow-sm py-4 px-6 sticky top-0 z-10"
        data-oid="pme:cr0"
      >
        <div className="flex justify-between items-center" data-oid="7h:5f9i">
          <div className="flex items-center space-x-4" data-oid="wqnz9ew">
            <div className="flex flex-col" data-oid="eroy3jt">
              <h2
                className="text-2xl font-bold text-gray-800"
                data-oid=".qjp146"
              >
                {driver.name}
                <span className="ml-2 text-lg text-gray-500" data-oid="wjact_u">
                  (
                  {driver.type === "private"
                    ? "Chófer Privado"
                    : "Chófer de Empresa"}
                  )
                </span>
              </h2>
              <p className="text-gray-500 text-sm" data-oid="hc72cz9">
                ID: {driver.id}
              </p>
            </div>
          </div>
          <div className="flex space-x-2" data-oid="zpvdi3t">
            {!isEditing ? (
              <Button
                variant="outline"
                onClick={handleStartEditing}
                className="flex items-center hover:bg-gray-100 transition-colors"
                data-oid="t-qho7:"
              >
                <Edit className="h-4 w-4 mr-2" data-oid="o67tot9" />
                Editar
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={handleCancelEdit}
                  className="flex items-center hover:bg-gray-100 transition-colors"
                  data-oid="bx0h9zc"
                >
                  <X className="h-4 w-4 mr-2" data-oid="kepowv7" />
                  Cancelar
                </Button>
                <Button
                  variant="default"
                  onClick={handleSaveChanges}
                  disabled={isSaving}
                  className="flex items-center bg-black hover:bg-gray-800 transition-colors"
                  data-oid="d546m7a"
                >
                  {isSaving ? (
                    <RefreshCw
                      className="h-4 w-4 mr-2 animate-spin"
                      data-oid="stpzm3-"
                    />
                  ) : (
                    <Save className="h-4 w-4 mr-2" data-oid="ie7oz-a" />
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
              data-oid="iuc9n3u"
            >
              <X className="h-5 w-5" data-oid="j_dp3-i" />
            </Button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="px-6 space-y-8" data-oid="yn5y9fl">
        {/* Información del Chófer */}
        <Card
          className="shadow-md hover:shadow-lg transition-shadow overflow-hidden"
          data-oid="yaooeyd"
        >
          <CardHeader className="bg-gray-50 border-b" data-oid="f12zwo2">
            <CardTitle className="flex items-center text-lg" data-oid="8bayhbw">
              <UserIcon
                className="h-5 w-5 mr-2 text-gray-500"
                data-oid="9d1i0im"
              />
              Información del Chófer
            </CardTitle>
          </CardHeader>
          <CardContent data-oid="fjpfj51">
            <div
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
              data-oid="sjga0zm"
            >
              {/* Panel izquierdo - Avatar e información de contacto */}
              <div className="lg:col-span-4" data-oid="jvvkbxo">
                {/* Avatar y datos básicos */}
                <div
                  className="flex flex-col items-center space-y-4 mb-6"
                  data-oid="90pu1-4"
                >
                  {!isEditing ? (
                    <>
                      {driver.photo ? (
                        <img
                          src={driver.photo}
                          alt={driver.name}
                          className="h-24 w-24 rounded-full border-4 border-gray-100 shadow-sm object-cover"
                          data-oid="6.533tt"
                        />
                      ) : (
                        <div
                          className="h-24 w-24 rounded-full bg-gradient-to-br from-red-100 to-red-200 text-gray-600 flex items-center justify-center text-2xl font-bold border-4 border-gray-100 shadow-sm"
                          data-oid="l.-4rj2"
                        >
                          {driver.name[0].toUpperCase()}
                        </div>
                      )}
                    </>
                  ) : (
                    <div
                      className="w-full flex flex-col items-center"
                      data-oid="ax_w7d6"
                    >
                      <div
                        className="border border-dashed border-gray-300 rounded-full p-1 w-32 h-32 flex items-center justify-center relative"
                        data-oid="kx1jq5q"
                      >
                        {imagePreview ? (
                          <div className="relative" data-oid="y-cgta2">
                            <img
                              src={imagePreview}
                              alt="Vista previa"
                              className="w-28 h-28 rounded-full object-cover"
                              data-oid="b36mcq_"
                            />

                            <button
                              type="button"
                              onClick={() => {
                                setImagePreview(null);
                                setFormData({ ...formData, photo: "" });
                              }}
                              className="absolute -top-2 -right-2 bg-gray-200 text-gray-600 rounded-full p-1"
                              data-oid="69.d02w"
                            >
                              <X size={16} data-oid="phn-qx:" />
                            </button>
                          </div>
                        ) : (
                          <div className="text-center" data-oid="c83joyo">
                            <Upload
                              className="h-8 w-8 text-gray-400 mx-auto mb-2"
                              data-oid="wpqpird"
                            />

                            <label
                              htmlFor="photo-upload"
                              className="cursor-pointer rounded-md bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 inline-block"
                              data-oid=":3svrtd"
                            >
                              Subir foto
                            </label>
                            <input
                              id="photo-upload"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleImageUpload}
                              data-oid="cssi0jt"
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
                        data-oid="6opasex"
                      >
                        {driver.name}
                      </h3>
                      <div
                        className="flex flex-wrap gap-2 justify-center"
                        data-oid="f.c8a2p"
                      >
                        <Badge
                          className={cn(
                            "px-3 py-1 flex items-center",
                            driver.type === "private"
                              ? "bg-gray-200 text-blue-800 hover:bg-gray-200"
                              : "bg-gray-200 text-purple-800 hover:bg-gray-200",
                          )}
                          data-oid="y3dumzm"
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
                          data-oid="qd:3on2"
                        >
                          <span
                            className={`h-2 w-2 rounded-full mr-1.5 ${
                              driver.status === "active"
                                ? "bg-black"
                                : driver.status === "inactive"
                                  ? "bg-black"
                                  : "bg-yellow-600"
                            }`}
                            data-oid="rxn00.t"
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
                      <div className="w-full space-y-2" data-oid=":i.ynw_">
                        <label
                          className="text-sm font-medium text-gray-500"
                          data-oid="6q980fn"
                        >
                          Nombre:
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                          data-oid="ijeor.l"
                        />
                      </div>
                      <div className="w-full space-y-2" data-oid="3-np52l">
                        <label
                          className="text-sm font-medium text-gray-500"
                          data-oid="ct.tccd"
                        >
                          Estado:
                        </label>
                        <Select
                          name="status"
                          value={formData.status}
                          onValueChange={(value) =>
                            setFormData({ ...formData, status: value })
                          }
                          data-oid="x25duka"
                        >
                          <SelectTrigger
                            className="border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                            data-oid="4y3zbq:"
                          >
                            <SelectValue
                              placeholder="Seleccionar estado"
                              data-oid="_b810_v"
                            />
                          </SelectTrigger>
                          <SelectContent data-oid=":ww:bml">
                            <SelectItem value="active" data-oid="7jarpcw">
                              Activo
                            </SelectItem>
                            <SelectItem value="inactive" data-oid="6_yq98p">
                              Inactivo
                            </SelectItem>
                            <SelectItem value="pending" data-oid="_6gytor">
                              Pendiente
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="w-full space-y-2" data-oid="pcr8c31">
                        <label
                          className="text-sm font-medium text-gray-500"
                          data-oid="5.6:phv"
                        >
                          Tipo:
                        </label>
                        <Select
                          name="type"
                          value={formData.type}
                          onValueChange={(value) =>
                            setFormData({ ...formData, type: value })
                          }
                          data-oid="j5tnw8_"
                        >
                          <SelectTrigger
                            className="border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                            data-oid="hqqwfa0"
                          >
                            <SelectValue
                              placeholder="Seleccionar tipo"
                              data-oid="e8gt0tu"
                            />
                          </SelectTrigger>
                          <SelectContent data-oid=":h2rxj7">
                            <SelectItem value="private" data-oid="awpbt_g">
                              Chófer Privado
                            </SelectItem>
                            <SelectItem value="company" data-oid="vrwpx66">
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
                  data-oid="84lpgtm"
                >
                  {!isEditing ? (
                    <div className="flex items-center" data-oid="sosbk83">
                      {driver.available ? (
                        <CheckCircle
                          className="h-5 w-5 text-gray-600 mr-2 flex-shrink-0"
                          data-oid="m0mkjde"
                        />
                      ) : (
                        <AlertTriangle
                          className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0"
                          data-oid="pkr1nwu"
                        />
                      )}
                      <p
                        className={`text-sm ${
                          driver.available ? "text-green-700" : "text-amber-700"
                        }`}
                        data-oid="l4bo:d9"
                      >
                        {driver.available
                          ? "Disponible para servicios"
                          : "No disponible actualmente"}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center" data-oid="p7qiv7r">
                      <input
                        type="checkbox"
                        id="available"
                        name="available"
                        checked={formData.available}
                        onChange={handleCheckboxChange}
                        className="mr-2 h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-red-500"
                        data-oid="0p_pqf1"
                      />

                      <label
                        htmlFor="available"
                        className="text-sm font-medium text-gray-700"
                        data-oid="162-sz8"
                      >
                        Disponible para servicios
                      </label>
                    </div>
                  )}
                </div>

                {/* Colaborador asociado */}
                <div
                  className="mt-4 p-3 border border-gray-200 rounded-md"
                  data-oid="dh_fnkh"
                >
                  <div className="flex items-center" data-oid="fk9llhl">
                    <Building
                      className="h-5 w-5 text-black mr-2 flex-shrink-0"
                      data-oid="deba0o."
                    />

                    <p className="text-sm text-gray-700" data-oid="ljbrp3.">
                      Colaborador asociado
                    </p>
                  </div>
                  {!isEditing ? (
                    <div className="mt-1" data-oid="ava4jlo">
                      <p className="text-sm font-medium" data-oid="dlixbxe">
                        {getCollaboratorName()}
                      </p>
                    </div>
                  ) : (
                    <div className="mt-1" data-oid="qh0zyyj">
                      <Select
                        name="collaboratorId"
                        value={formData.collaboratorId}
                        onValueChange={(value) =>
                          setFormData({ ...formData, collaboratorId: value })
                        }
                        data-oid="dzpi.6r"
                      >
                        <SelectTrigger
                          className="border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                          data-oid="nqk8xar"
                        >
                          <SelectValue
                            placeholder="Seleccionar colaborador"
                            data-oid="lfljupw"
                          />
                        </SelectTrigger>
                        <SelectContent data-oid="r4p:p2p">
                          <SelectItem value="none" data-oid="c:qhx.:">
                            Sin asociar
                          </SelectItem>
                          {collaborators.map((collab) => (
                            <SelectItem
                              key={collab.id}
                              value={collab.id}
                              data-oid="b.ghsg:"
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
                  data-oid="s.me:ac"
                >
                  <div className="flex items-center" data-oid="g:_yamc">
                    <Star
                      className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0"
                      data-oid="i4kir4y"
                    />

                    <p className="text-sm text-gray-700" data-oid="lpxdj--">
                      Valoración del chófer
                    </p>
                  </div>
                  {!isEditing ? (
                    <div className="flex mt-1 items-center" data-oid="t73t2pi">
                      <div className="flex text-amber-500" data-oid="ihiabr9">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={
                              i < Math.round(driver.rating)
                                ? ""
                                : "text-gray-300"
                            }
                            data-oid="lqjlq.8"
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span
                        className="ml-2 text-sm text-gray-500"
                        data-oid="ijtb3zt"
                      >
                        ({driver.rating.toFixed(1)})
                      </span>
                    </div>
                  ) : (
                    <div className="mt-1" data-oid="h14fj3r">
                      <Input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleInputChange}
                        min="0"
                        max="5"
                        step="0.1"
                        className="border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                        data-oid="15dv01_"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Panel derecho - Datos específicos */}
              <div className="lg:col-span-8" data-oid="-k2.jrx">
                {/* Información de contacto */}
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
                  data-oid="1c_w2w."
                >
                  <div className="space-y-1" data-oid="nx0-ipm">
                    <div
                      className="flex items-center text-gray-500"
                      data-oid="qui2qf0"
                    >
                      <Mail className="h-4 w-4 mr-2" data-oid="cqp2.0:" />
                      <span className="text-sm" data-oid="z2hs.ic">
                        Email:
                      </span>
                    </div>
                    {isEditing ? (
                      <Input
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                        data-oid="tcdx89s"
                      />
                    ) : (
                      <p
                        className="text-sm font-medium pl-6"
                        data-oid="0in9kzk"
                      >
                        {driver.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1" data-oid="73_-au.">
                    <div
                      className="flex items-center text-gray-500"
                      data-oid="jd1zvc."
                    >
                      <Phone className="h-4 w-4 mr-2" data-oid="fp6rs51" />
                      <span className="text-sm" data-oid="a96s9a6">
                        Teléfono:
                      </span>
                    </div>
                    {isEditing ? (
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                        data-oid="getr3gq"
                      />
                    ) : (
                      <p
                        className="text-sm font-medium pl-6"
                        data-oid="228uy_h"
                      >
                        {driver.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Datos personales y profesionales */}
                <div data-oid="tdc4k1.">
                  <h4
                    className="text-base font-medium mb-4 flex items-center border-b border-gray-200 pb-2"
                    data-oid="8191bpe"
                  >
                    <FileText
                      className="h-5 w-5 mr-2 text-gray-500"
                      data-oid="g6ay6.h"
                    />
                    Datos Personales y Profesionales
                  </h4>

                  {!isEditing ? (
                    <div
                      className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3"
                      data-oid="4maba-m"
                    >
                      <div className="mb-3" data-oid="ky:kjs:">
                        <p
                          className="text-sm font-medium text-gray-500"
                          data-oid="lmawm_n"
                        >
                          Documento ID
                        </p>
                        <p className="font-medium" data-oid="54nlfx-">
                          {driver.documentId}
                        </p>
                      </div>
                      <div className="mb-3" data-oid="l0sk__f">
                        <p
                          className="text-sm font-medium text-gray-500"
                          data-oid="99xo9:g"
                        >
                          Número de licencia
                        </p>
                        <p className="font-medium" data-oid="p_yz91z">
                          {driver.licenseNumber}
                        </p>
                      </div>
                      <div className="mb-3" data-oid="upehzkc">
                        <p
                          className="text-sm font-medium text-gray-500"
                          data-oid="gba-nj:"
                        >
                          Fecha expiración licencia
                        </p>
                        <p className="font-medium" data-oid="v2f0884">
                          {formatDate(driver.licenseExpiry)}
                        </p>
                      </div>
                      {driver.type === "company" && (
                        <div className="mb-3" data-oid="bu3vh8x">
                          <p
                            className="text-sm font-medium text-gray-500"
                            data-oid="a1uzih2"
                          >
                            Empresa
                          </p>
                          <p className="font-medium" data-oid=":ty065c">
                            {driver.companyName || "No especificada"}
                          </p>
                        </div>
                      )}
                      <div className="mb-3" data-oid="k9l6rn:">
                        <p
                          className="text-sm font-medium text-gray-500"
                          data-oid="eb0u0h0"
                        >
                          Años de experiencia
                        </p>
                        <p className="font-medium" data-oid="lsspeec">
                          {driver.experience} años
                        </p>
                      </div>
                      <div className="mb-3" data-oid="3zm4zx8">
                        <p
                          className="text-sm font-medium text-gray-500"
                          data-oid=".sp:a7n"
                        >
                          Idiomas
                        </p>
                        <p className="font-medium" data-oid="4dbesxi">
                          {driver.languages.join(", ")}
                        </p>
                      </div>
                      <div className="mb-3" data-oid="6vfk8va">
                        <p
                          className="text-sm font-medium text-gray-500"
                          data-oid="oh.jp4."
                        >
                          País
                        </p>
                        <p className="font-medium" data-oid="sfo8o_n">
                          {driver.country}
                        </p>
                      </div>
                      <div className="mb-3" data-oid="xqnl:co">
                        <p
                          className="text-sm font-medium text-gray-500"
                          data-oid="3oc5wwu"
                        >
                          Ciudad
                        </p>
                        <p className="font-medium" data-oid="78qo7j-">
                          {driver.city}
                        </p>
                      </div>
                      <div className="mb-3" data-oid="e7fgtcr">
                        <p
                          className="text-sm font-medium text-gray-500"
                          data-oid="0ci_jg5"
                        >
                          Especialidad
                        </p>
                        <p className="font-medium" data-oid="6t40845">
                          {driver.specialty || "No especificada"}
                        </p>
                      </div>
                      {/* Eliminado el campo que mostraba la URL de la foto */}
                      <div className="mb-3 col-span-2" data-oid="7osd7im">
                        <p
                          className="text-sm font-medium text-gray-500"
                          data-oid="zy5omqc"
                        >
                          Notas
                        </p>
                        <p className="font-medium" data-oid="r0i3ca7">
                          {driver.notes || "Sin notas adicionales"}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                      data-oid="195n1jv"
                    >
                      <div data-oid="9w-rb_k">
                        <label
                          className="text-sm font-medium text-gray-500"
                          data-oid="3iwst4i"
                        >
                          Documento ID
                        </label>
                        <Input
                          name="documentId"
                          value={formData.documentId}
                          onChange={handleInputChange}
                          className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                          data-oid="mcwc0uz"
                        />
                      </div>
                      <div data-oid="i.w9br6">
                        <label
                          className="text-sm font-medium text-gray-500"
                          data-oid="ivgbq22"
                        >
                          Número de licencia
                        </label>
                        <Input
                          name="licenseNumber"
                          value={formData.licenseNumber}
                          onChange={handleInputChange}
                          className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                          data-oid=":j30f24"
                        />
                      </div>
                      <div data-oid="2ed7z-k">
                        <label
                          className="text-sm font-medium text-gray-500"
                          data-oid="scuc.:g"
                        >
                          Fecha expiración licencia
                        </label>
                        <Input
                          name="licenseExpiry"
                          type="date"
                          value={formData.licenseExpiry}
                          onChange={handleInputChange}
                          className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                          data-oid="nojost4"
                        />
                      </div>
                      {formData.type === "company" && (
                        <div data-oid="-mdll35">
                          <label
                            className="text-sm font-medium text-gray-500"
                            data-oid="f_b2wlq"
                          >
                            Empresa
                          </label>
                          <Input
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                            data-oid="aaw.4cx"
                          />
                        </div>
                      )}
                      <div data-oid="zp3sw67">
                        <label
                          className="text-sm font-medium text-gray-500"
                          data-oid="s2sc93b"
                        >
                          Años de experiencia
                        </label>
                        <Input
                          name="experience"
                          type="number"
                          value={formData.experience}
                          onChange={handleInputChange}
                          className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                          data-oid="lsndtq-"
                        />
                      </div>
                      <div data-oid="a.wov:b">
                        <label
                          className="text-sm font-medium text-gray-500"
                          data-oid="xgnxhmp"
                        >
                          Idiomas
                        </label>
                        <Input
                          name="languages"
                          value={formData.languages}
                          onChange={handleInputChange}
                          placeholder="Español, Inglés, Francés..."
                          className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                          data-oid="ct96-7e"
                        />
                      </div>
                      <div data-oid="4yin4uy">
                        <label
                          className="text-sm font-medium text-gray-500"
                          data-oid="c_3pwsd"
                        >
                          País
                        </label>
                        <Input
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                          data-oid="dmizj8w"
                        />
                      </div>
                      <div data-oid="o9jke3m">
                        <label
                          className="text-sm font-medium text-gray-500"
                          data-oid="9qv93l4"
                        >
                          Ciudad
                        </label>
                        <Input
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                          data-oid="4oy-cza"
                        />
                      </div>
                      <div data-oid="jv77iv9">
                        <label
                          className="text-sm font-medium text-gray-500"
                          data-oid="243u.28"
                        >
                          Especialidad
                        </label>
                        <Input
                          name="specialty"
                          value={formData.specialty}
                          onChange={handleInputChange}
                          placeholder="Eventos VIP, Traslados aeropuerto..."
                          className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                          data-oid="rm8i44q"
                        />
                      </div>
                      {/* Eliminado el campo de URL de foto ya que ahora se maneja con el selector de archivos */}
                      <div className="col-span-2" data-oid="3.n3a-a">
                        <label
                          className="text-sm font-medium text-gray-500"
                          data-oid="antsxl7"
                        >
                          Notas
                        </label>
                        <Textarea
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          rows={3}
                          className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                          data-oid="8wy1:wl"
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
          data-oid="ko1yy5r"
        >
          {/* Vehículos asignados */}
          <Card
            className="shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            data-oid="v7nc14a"
          >
            <CardHeader className="bg-gray-50 border-b pb-3" data-oid="x3xw9p:">
              <CardTitle
                className="flex items-center text-lg"
                data-oid="55mb.zj"
              >
                <Car
                  className="h-5 w-5 mr-2 text-gray-500"
                  data-oid="uaty50e"
                />
                Vehículos Asociados
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 pb-6" data-oid="2dq7r.n">
              {loadingVehicles ? (
                <div className="py-10 text-center" data-oid="7vidorx">
                  <RefreshCw
                    className="h-8 w-8 text-gray-400 animate-spin mx-auto mb-4"
                    data-oid="aj3x5x0"
                  />

                  <p className="text-gray-500" data-oid="n7hasdk">
                    Cargando vehículos asociados...
                  </p>
                </div>
              ) : assignedVehicles && assignedVehicles.length > 0 ? (
                <ul className="space-y-4" data-oid="1:50w17">
                  {assignedVehicles.map((vehicle, index) => (
                    <li
                      key={index}
                      className="flex items-start py-3 border-b border-gray-100 last:border-b-0"
                      data-oid="h63.yh1"
                    >
                      <div
                        className="h-16 w-16 rounded-md bg-gray-100 mr-4 overflow-hidden flex-shrink-0"
                        data-oid="qe:ej2_"
                      >
                        {vehicle.image ? (
                          <img
                            src={vehicle.image}
                            alt={vehicle.name}
                            className="h-full w-full object-cover"
                            data-oid="--3bcv2"
                          />
                        ) : (
                          <div
                            className="h-full w-full flex items-center justify-center"
                            data-oid="zmm-lsu"
                          >
                            <Car
                              className="h-8 w-8 text-gray-400"
                              data-oid="6o0c2z-"
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex-1" data-oid="rqbp55q">
                        <div
                          className="flex justify-between"
                          data-oid="39rqlbn"
                        >
                          <p
                            className="font-medium text-gray-900"
                            data-oid=".36.0zm"
                          >
                            {vehicle.name}
                          </p>
                          <Badge
                            className={`px-2 py-1 text-xs ${
                              vehicle.available
                                ? "bg-gray-200 text-green-800 hover:bg-gray-200"
                                : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                            }`}
                            data-oid="js91gic"
                          >
                            {vehicle.available ? "Disponible" : "No disponible"}
                          </Badge>
                        </div>
                        <p
                          className="text-sm text-gray-600 mt-1"
                          data-oid="rjak5yv"
                        >
                          {vehicle.details.brand} {vehicle.details.model} (
                          {vehicle.details.year})
                        </p>
                        <div
                          className="mt-2 flex items-center text-xs text-gray-500 space-x-3"
                          data-oid="_2pbd47"
                        >
                          <span
                            className="flex items-center"
                            data-oid="z6q38w:"
                          >
                            <FileText
                              className="h-3 w-3 mr-1"
                              data-oid="f5h9g5_"
                            />

                            {vehicle.licensePlate}
                          </span>
                          <span
                            className="flex items-center"
                            data-oid="q5eq50t"
                          >
                            <Circle
                              className="h-2 w-2 mr-1"
                              style={{
                                fill: vehicle.details.color.toLowerCase(),
                              }}
                              data-oid="6_w:lh."
                            />

                            {vehicle.details.color}
                          </span>
                          <span
                            className="flex items-center capitalize"
                            data-oid="yyizzv8"
                          >
                            <Car className="h-3 w-3 mr-1" data-oid="q2.kkz2" />
                            {vehicle.type}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="py-10 text-center" data-oid="c5d653a">
                  <div className="mb-4 flex justify-center" data-oid="p-7zgbo">
                    <Car
                      className="h-12 w-12 text-gray-300"
                      data-oid="j8z5p8r"
                    />
                  </div>
                  <p className="text-gray-500" data-oid="5ltavyw">
                    No hay vehículos asociados
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Servicios recientes */}
          <Card
            className="shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            data-oid="rh5zszz"
          >
            <CardHeader className="bg-gray-50 border-b pb-3" data-oid="6-v:qgp">
              <CardTitle
                className="flex items-center text-lg"
                data-oid="uki4298"
              >
                <BookOpen
                  className="h-5 w-5 mr-2 text-gray-500"
                  data-oid="4hqv:g6"
                />
                Servicios Recientes
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 pb-6" data-oid="jbs6b0q">
              <div className="py-10 text-center" data-oid="zksdndx">
                <div className="mb-4 flex justify-center" data-oid="q_imcca">
                  <BookOpen
                    className="h-12 w-12 text-gray-300"
                    data-oid="llvso3i"
                  />
                </div>
                <p className="text-gray-500" data-oid="_:_.-5f">
                  No hay servicios recientes
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documentación y certificaciones */}
        <Card
          className="shadow-md hover:shadow-lg transition-shadow overflow-hidden"
          data-oid="o0pwop:"
        >
          <CardHeader className="bg-gray-50 border-b pb-3" data-oid="a7_cl87">
            <CardTitle className="flex items-center text-lg" data-oid="4gn_5l:">
              <FileText
                className="h-5 w-5 mr-2 text-gray-500"
                data-oid="2c0-.j_"
              />
              Documentación y Certificaciones
            </CardTitle>
            <CardDescription data-oid="1-7ne2d">
              Licencias y documentos del chófer
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 pb-6" data-oid="gyp5jw6">
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              data-oid="b5l5yau"
            >
              <div
                className="border rounded-md p-4 flex flex-col"
                data-oid="d7m0bs2"
              >
                <div className="flex items-center mb-2" data-oid="1_iv31y">
                  <Book
                    className="h-5 w-5 text-gray-600 mr-2"
                    data-oid="a-2pmrv"
                  />

                  <h3 className="font-medium" data-oid="p0911sq">
                    Licencia de conducir
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-2" data-oid="fr3v8y1">
                  Número: {driver.licenseNumber}
                </p>
                <p className="text-sm text-gray-600" data-oid="p7jxb8d">
                  Expiración: {formatDate(driver.licenseExpiry)}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-auto self-start"
                  data-oid="3jq82kp"
                >
                  <Bookmark className="h-4 w-4 mr-2" data-oid="cwdcy0:" />
                  Ver documento
                </Button>
              </div>

              <div
                className="border rounded-md p-4 flex flex-col"
                data-oid="96zs-al"
              >
                <div className="flex items-center mb-2" data-oid="pawz4ob">
                  <CreditCard
                    className="h-5 w-5 text-gray-600 mr-2"
                    data-oid="-vkadh1"
                  />

                  <h3 className="font-medium" data-oid="uoses7e">
                    Documento de identidad
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-2" data-oid="ji83_1e">
                  Número: {driver.documentId}
                </p>
                <p className="text-sm text-gray-600" data-oid="yu79:3y">
                  País: {driver.country}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-auto self-start"
                  data-oid="cg4b47j"
                >
                  <Bookmark className="h-4 w-4 mr-2" data-oid="1g1gohr" />
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
