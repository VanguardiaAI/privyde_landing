import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  Search,
  X,
  Trash2,
  Edit,
  Save,
  RefreshCw,
  FileText,
  Mail,
  MapPin,
  User,
  Car,
  Building,
  Briefcase,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

// Definir el tipo para los colaboradores
export interface Collaborator {
  id: string;
  name: string;
  logo: string;
  type: "company" | "individual";
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  taxId: string; // CIF/NIF
  country: string;
  city: string;
  address: string;
  postalCode: string;
  startDate: string; // Fecha de inicio de colaboración
  status: "active" | "inactive" | "pending";
  commissionRate: number; // Porcentaje de comisión
  paymentTerms: string; // Términos de pago
  bankAccount?: string;
  serviceAreas: string[]; // Zonas donde operan
  specialties: string[]; // Especialidades (bodas, eventos, etc.)
  certifications: string[]; // Certificaciones y permisos
  notes?: string;
  rating: number; // Valoración de calidad
  associatedDrivers: string[]; // IDs de los chóferes asociados
  associatedVehicles: string[]; // IDs de los vehículos asociados
}

// Interfaces para los datos de vehículos y choferes
interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  specialty?: string;
  city?: string;
  photo?: string;
}

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  licensePlate: string;
  type: string;
  category: string;
  image?: string;
  available: boolean;
  year?: number;
  color?: string;
}

const CollaboratorsSection = () => {
  // Estados para la gestión de colaboradores
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [_loading, setLoading] = useState(true);
  const [_error, setError] = useState<string | null>(null);
  const [showCollaboratorForm, setShowCollaboratorForm] = useState(false);
  const [editingCollaborator, setEditingCollaborator] =
    useState<Collaborator | null>(null);
  const [selectedCollaboratorForDetails, setSelectedCollaboratorForDetails] =
    useState<Collaborator | null>(null);
  const [isCollaboratorDetailsViewOpen, setIsCollaboratorDetailsViewOpen] =
    useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const { toast } = useToast();

  // Estados para datos asociados
  const [associatedDrivers, setAssociatedDrivers] = useState<Driver[]>([]);
  const [associatedVehicles, setAssociatedVehicles] = useState<Vehicle[]>([]);
  const [loadingDrivers, setLoadingDrivers] = useState(false);
  const [loadingVehicles, setLoadingVehicles] = useState(false);

  // Estados para filtros
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Función para obtener token de autenticación
  const getAuthToken = () => {
    return localStorage.getItem("authToken");
  };

  // Cargar colaboradores cuando cambian los filtros
  useEffect(() => {
    fetchCollaborators();
  }, [typeFilter, statusFilter, searchQuery]);

  // Extraer la función fetchCollaborators
  const fetchCollaborators = async () => {
    try {
      setLoading(true);
      const token = getAuthToken();

      if (!token) {
        setError("No hay sesión activa. Por favor inicie sesión");
        setLoading(false);
        return;
      }

      const response = await axios.get("/api/admin/collaborators/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          type: typeFilter !== "all" ? typeFilter : "",
          status: statusFilter !== "all" ? statusFilter : "",
          search: searchQuery,
        },
      });

      if (response.data.status === "success") {
        setCollaborators(response.data.collaborators);
        setError(null);
      } else {
        setError("Error al cargar los colaboradores: " + response.data.message);
      }
    } catch (err) {
      console.error("Error al obtener colaboradores:", err);
      if (axios.isAxiosError(err) && err.response?.status === 403) {
        setError("No tiene permisos de administrador para ver esta página");
      } else {
        setError("Error al cargar los colaboradores. Intente nuevamente");
      }
    } finally {
      setLoading(false);
    }
  };

  // Cargar los choferes asociados a un colaborador
  const fetchAssociatedDrivers = async (collaboratorId: string) => {
    try {
      setLoadingDrivers(true);
      const token = getAuthToken();

      if (!token) {
        toast({
          title: "Error",
          description: "No hay sesión activa. Por favor inicie sesión",
          variant: "destructive",
        });
        return;
      }

      const response = await axios.get(
        `/api/admin/drivers/by-collaborator/${collaboratorId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.data.drivers) {
        setAssociatedDrivers(response.data.drivers);
      } else {
        setAssociatedDrivers([]);
      }
    } catch (err) {
      console.error("Error al cargar choferes asociados:", err);
      setAssociatedDrivers([]);
    } finally {
      setLoadingDrivers(false);
    }
  };

  // Cargar los vehículos asociados a un colaborador
  const fetchAssociatedVehicles = async (collaboratorId: string) => {
    try {
      setLoadingVehicles(true);
      const token = getAuthToken();

      if (!token) {
        toast({
          title: "Error",
          description: "No hay sesión activa. Por favor inicie sesión",
          variant: "destructive",
        });
        return;
      }

      const response = await axios.get(
        `/api/admin/vehicles/by-collaborator/${collaboratorId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.data.vehicles) {
        setAssociatedVehicles(response.data.vehicles);
      } else {
        setAssociatedVehicles([]);
      }
    } catch (err) {
      console.error("Error al cargar vehículos asociados:", err);
      setAssociatedVehicles([]);
    } finally {
      setLoadingVehicles(false);
    }
  };

  // Funciones para la gestión de colaboradores
  const handleCollaboratorSubmit = async (collaboratorData: any) => {
    try {
      const token = getAuthToken();

      if (!token) {
        toast({
          title: "Error",
          description: "No hay sesión activa. Por favor inicie sesión",
          variant: "destructive",
        });
        return;
      }

      if (editingCollaborator) {
        // Actualizar un colaborador existente
        const response = await axios.put(
          `/api/admin/collaborators/update/${editingCollaborator.id}`,
          collaboratorData,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (response.data.status === "success") {
          // Actualizar la lista de colaboradores
          setCollaborators((prev) =>
            prev.map((c) =>
              c.id === editingCollaborator.id ? response.data.collaborator : c,
            ),
          );

          toast({
            title: "Colaborador actualizado",
            description: "El colaborador se ha actualizado correctamente",
          });
        } else {
          toast({
            title: "Error",
            description:
              response.data.message || "Error al actualizar el colaborador",
            variant: "destructive",
          });
        }
      } else {
        // Crear un nuevo colaborador
        const response = await axios.post(
          "/api/admin/collaborators/add",
          collaboratorData,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (response.data.status === "success") {
          // Añadir el nuevo colaborador a la lista
          setCollaborators((prev) => [...prev, response.data.collaborator]);

          toast({
            title: "Colaborador creado",
            description: "El colaborador se ha creado correctamente",
          });
        } else {
          toast({
            title: "Error",
            description:
              response.data.message || "Error al crear el colaborador",
            variant: "destructive",
          });
        }
      }

      // Cerrar el formulario
      setShowCollaboratorForm(false);
      setEditingCollaborator(null);
    } catch (err) {
      console.error("Error al guardar el colaborador:", err);
      toast({
        title: "Error",
        description:
          axios.isAxiosError(err) && err.response?.data?.message
            ? err.response.data.message
            : "Error al procesar la solicitud. Intente nuevamente",
        variant: "destructive",
      });
    }
  };

  const handleViewCollaboratorDetails = async (collaborator: Collaborator) => {
    setSelectedCollaboratorForDetails(collaborator);
    setIsCollaboratorDetailsViewOpen(true);
    setIsEditing(false);

    // Cargar los datos asociados
    fetchAssociatedDrivers(collaborator.id);
    fetchAssociatedVehicles(collaborator.id);
  };

  const handleCloseCollaboratorDetails = () => {
    setIsCollaboratorDetailsViewOpen(false);
    setSelectedCollaboratorForDetails(null);
    setIsEditing(false);
    // Limpiar datos asociados
    setAssociatedDrivers([]);
    setAssociatedVehicles([]);
  };

  const handleDeleteCollaborator = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Evitar que se abra el detalle al hacer clic aquí

    try {
      const token = getAuthToken();

      if (!token) {
        toast({
          title: "Error",
          description: "No hay sesión activa. Por favor inicie sesión",
          variant: "destructive",
        });
        return;
      }

      const confirmar = window.confirm(
        "¿Está seguro que desea eliminar este colaborador? Esta acción no se puede deshacer.",
      );

      if (!confirmar) return;

      const response = await axios.delete(
        `/api/admin/collaborators/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.data.status === "success") {
        // Eliminar el colaborador de la lista
        setCollaborators((prev) => prev.filter((c) => c.id !== id));

        toast({
          title: "Colaborador eliminado",
          description: "El colaborador se ha eliminado correctamente",
        });
      } else {
        toast({
          title: "Error",
          description:
            response.data.message || "Error al eliminar el colaborador",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Error al eliminar el colaborador:", err);
      toast({
        title: "Error",
        description:
          axios.isAxiosError(err) && err.response?.data?.message
            ? err.response.data.message
            : "Error al procesar la solicitud. Intente nuevamente",
        variant: "destructive",
      });
    }
  };

  const handleStartEditing = () => {
    if (!selectedCollaboratorForDetails) return;

    // Preparar datos iniciales para el formulario
    setFormData({
      ...selectedCollaboratorForDetails,
    });

    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveChanges = async () => {
    if (!selectedCollaboratorForDetails) return;
    setIsSaving(true);

    try {
      const token = getAuthToken();

      if (!token) {
        toast({
          title: "Error",
          description: "No hay sesión activa. Por favor inicie sesión",
          variant: "destructive",
        });
        setIsSaving(false);
        return;
      }

      const response = await axios.put(
        `/api/admin/collaborators/update/${selectedCollaboratorForDetails.id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.data.status === "success") {
        // Actualizar la lista de colaboradores
        setCollaborators((prev) =>
          prev.map((c) =>
            c.id === selectedCollaboratorForDetails.id
              ? response.data.collaborator
              : c,
          ),
        );

        // Actualizar el colaborador seleccionado
        setSelectedCollaboratorForDetails(response.data.collaborator);

        toast({
          title: "Colaborador actualizado",
          description: "El colaborador se ha actualizado correctamente",
        });
      } else {
        toast({
          title: "Error",
          description:
            response.data.message || "Error al actualizar el colaborador",
          variant: "destructive",
        });
      }

      setIsEditing(false);
    } catch (err) {
      console.error("Error al actualizar el colaborador:", err);
      toast({
        title: "Error",
        description:
          axios.isAxiosError(err) && err.response?.data?.message
            ? err.response.data.message
            : "Error al procesar la solicitud. Intente nuevamente",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

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

  // Manejar la búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Manejar cambios en los filtros
  const handleTypeFilterChange = (value: string) => {
    setTypeFilter(value);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  // Renderizar la vista de detalles o la tabla
  if (isCollaboratorDetailsViewOpen && selectedCollaboratorForDetails) {
    return (
      <div className="space-y-6" data-oid="ov.z9r8">
        {/* Cabecera mejorada */}
        <div
          className="bg-white border-b shadow-md py-5 px-6 sticky top-0 z-10"
          data-oid="ayv727l"
        >
          <div className="flex justify-between items-center" data-oid="xshv0qn">
            <div className="flex items-center space-x-4" data-oid="f2b-4_q">
              <div
                className="h-14 w-14 rounded-full overflow-hidden shadow-md border-2 border-gray-100"
                data-oid=".5w9mbi"
              >
                <img
                  src={selectedCollaboratorForDetails.logo}
                  alt={selectedCollaboratorForDetails.name}
                  className="h-full w-full object-cover"
                  data-oid=":4ozm4."
                />
              </div>
              <div className="flex flex-col" data-oid="r:luryr">
                <h2
                  className="text-2xl font-bold text-gray-800"
                  data-oid="-ol4wkn"
                >
                  {selectedCollaboratorForDetails.name}
                  <span
                    className="ml-3 text-sm font-medium px-3 py-1 rounded-full bg-gray-200 text-blue-700 inline-flex items-center"
                    data-oid="-_gfhpu"
                  >
                    {selectedCollaboratorForDetails.type === "company"
                      ? "Empresa"
                      : "Particular"}
                  </span>
                </h2>
                <p className="text-gray-500 text-sm" data-oid="_49mph8">
                  ID: {selectedCollaboratorForDetails.id}
                </p>
              </div>
            </div>
            <div className="flex space-x-2" data-oid="b8-d644">
              {!isEditing ? (
                <Button
                  variant="outline"
                  onClick={handleStartEditing}
                  className="flex items-center hover:bg-gray-100 transition-colors border-gray-300"
                  data-oid="ju9fnxu"
                >
                  <Edit className="h-4 w-4 mr-2" data-oid="n0jzjgf" />
                  Editar
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={handleCancelEdit}
                    className="flex items-center hover:bg-gray-100 transition-colors border-gray-300"
                    data-oid=".cnj4jq"
                  >
                    <X className="h-4 w-4 mr-2" data-oid="2-.oal6" />
                    Cancelar
                  </Button>
                  <Button
                    variant="default"
                    onClick={handleSaveChanges}
                    disabled={isSaving}
                    className="flex items-center bg-black hover:bg-gray-800 transition-colors"
                    data-oid="t:_:f19"
                  >
                    {isSaving ? (
                      <RefreshCw
                        className="h-4 w-4 mr-2 animate-spin"
                        data-oid="z442g5z"
                      />
                    ) : (
                      <Save className="h-4 w-4 mr-2" data-oid="q.y14nf" />
                    )}
                    Guardar
                  </Button>
                </>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCloseCollaboratorDetails}
                className="hover:bg-gray-100 transition-colors"
                data-oid="9pf:gz."
              >
                <X className="h-5 w-5" data-oid="z3m3w3v" />
              </Button>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="px-6 space-y-8" data-oid="xyq9:fd">
          {/* Información del colaborador */}
          <Card
            className="shadow-lg hover:shadow-xl transition-shadow overflow-hidden border-0 rounded-xl"
            data-oid="6544up_"
          >
            <CardHeader
              className="bg-gradient-to-r from-gray-50 to-gray-100 border-b py-5"
              data-oid="5:llm61"
            >
              <CardTitle
                className="text-lg text-gray-800 flex items-center"
                data-oid="7sfa6v_"
              >
                <span
                  className="bg-gray-200 p-1.5 rounded-md text-gray-700 mr-3"
                  data-oid="xm.h1ss"
                >
                  <FileText className="h-5 w-5" data-oid="btrwdbo" />
                </span>
                Información del Colaborador
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0" data-oid="qjvw80d">
              <div
                className="flex flex-col md:flex-row md:space-x-6 p-6"
                data-oid="0ulpn-g"
              >
                <div
                  className="md:w-1/3 flex flex-col items-center mb-6 md:mb-0"
                  data-oid="s4hdto:"
                >
                  <div className="relative mb-5" data-oid="wfabdg1">
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-red-50 to-amber-50 rounded-full blur-md opacity-50"
                      data-oid="z2c__05"
                    ></div>
                    <img
                      src={selectedCollaboratorForDetails.logo}
                      alt={selectedCollaboratorForDetails.name}
                      className="h-36 w-36 rounded-full object-cover border-4 border-white shadow-md relative z-10"
                      data-oid="tf-d:no"
                    />
                  </div>

                  {!isEditing ? (
                    <>
                      <h3
                        className="text-xl font-semibold text-center mb-2"
                        data-oid="jndflrx"
                      >
                        {selectedCollaboratorForDetails.name}
                      </h3>
                      <div
                        className="flex items-center mt-1 text-amber-500 mb-3"
                        data-oid="g-.63:m"
                      >
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={
                              i <
                              Math.round(selectedCollaboratorForDetails.rating)
                                ? ""
                                : "text-gray-300"
                            }
                            data-oid="-455naq"
                          >
                            ★
                          </span>
                        ))}
                        <span
                          className="ml-1 text-gray-600 text-sm"
                          data-oid="ny1n.m7"
                        >
                          ({selectedCollaboratorForDetails.rating.toFixed(1)})
                        </span>
                      </div>
                      <span
                        className={`mb-3 px-4 py-1.5 text-sm font-medium rounded-full shadow-sm ${
                          selectedCollaboratorForDetails.status === "active"
                            ? "bg-gray-200 text-green-800 border border-green-200"
                            : selectedCollaboratorForDetails.status ===
                                "inactive"
                              ? "bg-gray-100 text-gray-800 border border-gray-200"
                              : "bg-amber-100 text-amber-800 border border-amber-200"
                        }`}
                        data-oid="l_:vq:2"
                      >
                        <span
                          className={`inline-block h-2 w-2 rounded-full mr-2 ${
                            selectedCollaboratorForDetails.status === "active"
                              ? "bg-gray-600"
                              : selectedCollaboratorForDetails.status ===
                                  "inactive"
                                ? "bg-gray-500"
                                : "bg-amber-500"
                          }`}
                          data-oid="ikk4rl0"
                        ></span>
                        {selectedCollaboratorForDetails.status === "active"
                          ? "Activo"
                          : selectedCollaboratorForDetails.status === "inactive"
                            ? "Inactivo"
                            : "Pendiente"}
                      </span>
                      <div
                        className="mt-4 px-4 py-4 bg-gray-50 rounded-lg border border-gray-100 shadow-sm w-full"
                        data-oid="u1ps_c6"
                      >
                        <div
                          className="text-sm font-medium text-gray-600 mb-2"
                          data-oid=".a541el"
                        >
                          Tipo de colaborador
                        </div>
                        <div
                          className="text-lg font-medium text-center"
                          data-oid=".9jepqh"
                        >
                          {selectedCollaboratorForDetails.type === "company"
                            ? "Empresa"
                            : "Particular"}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="w-full space-y-4" data-oid="fyc55lp">
                      <div data-oid="jjan_9a">
                        <label
                          className="text-sm font-medium text-gray-500"
                          data-oid="k3hp3pg"
                        >
                          Nombre
                        </label>
                        <Input
                          name="name"
                          value={formData.name || ""}
                          onChange={handleInputChange}
                          className="mt-1"
                          data-oid="xwz_kyh"
                        />
                      </div>
                      <div data-oid="8tk:eb9">
                        <label
                          className="text-sm font-medium text-gray-500"
                          data-oid="0i0h.md"
                        >
                          Estado
                        </label>
                        <Select
                          value={formData.status || "active"}
                          onValueChange={(value) =>
                            setFormData({ ...formData, status: value })
                          }
                          data-oid=".ix_uvk"
                        >
                          <SelectTrigger className="w-full" data-oid="mn:5hbm">
                            <SelectValue
                              placeholder="Seleccionar estado"
                              data-oid="6.zq1_k"
                            />
                          </SelectTrigger>
                          <SelectContent data-oid="w_48u16">
                            <SelectItem value="active" data-oid="aksx45o">
                              Activo
                            </SelectItem>
                            <SelectItem value="inactive" data-oid="lj3o.7o">
                              Inactivo
                            </SelectItem>
                            <SelectItem value="pending" data-oid="9bjws5r">
                              Pendiente
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div data-oid="r2iqnqp">
                        <label
                          className="text-sm font-medium text-gray-500"
                          data-oid="_ilnnrl"
                        >
                          Tipo
                        </label>
                        <Select
                          value={formData.type || "company"}
                          onValueChange={(value) =>
                            setFormData({ ...formData, type: value })
                          }
                          data-oid="jlq0t8-"
                        >
                          <SelectTrigger className="w-full" data-oid="twc:28z">
                            <SelectValue
                              placeholder="Seleccionar tipo"
                              data-oid="8xn:9-."
                            />
                          </SelectTrigger>
                          <SelectContent data-oid="9ygpjq9">
                            <SelectItem value="company" data-oid="oe_4-9-">
                              Empresa
                            </SelectItem>
                            <SelectItem value="individual" data-oid="-ru7xak">
                              Particular
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>

                <div className="md:w-2/3" data-oid="al.doex">
                  <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    data-oid=".u4w_4_"
                  >
                    <div
                      className="bg-white rounded-lg border border-gray-100 shadow-sm p-5"
                      data-oid="8hx6fsr"
                    >
                      <h4
                        className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4 flex items-center"
                        data-oid="ghox_r8"
                      >
                        <Mail
                          className="h-4 w-4 mr-2 text-black"
                          data-oid="2tuwp24"
                        />
                        Información de contacto
                      </h4>
                      {!isEditing ? (
                        <div className="space-y-3" data-oid="930_q3f">
                          <div className="flex items-center" data-oid="32w0_1x">
                            <div
                              className="w-28 text-sm text-gray-500"
                              data-oid="0d3jlgb"
                            >
                              Contacto:
                            </div>
                            <div className="font-medium" data-oid="hjcmfbp">
                              {selectedCollaboratorForDetails.contactName}
                            </div>
                          </div>
                          <div className="flex items-center" data-oid="hrz1iqp">
                            <div
                              className="w-28 text-sm text-gray-500"
                              data-oid="hr_ps9i"
                            >
                              Email:
                            </div>
                            <div
                              className="font-medium text-gray-600"
                              data-oid="18u3z0r"
                            >
                              {selectedCollaboratorForDetails.contactEmail}
                            </div>
                          </div>
                          <div className="flex items-center" data-oid="cvzehei">
                            <div
                              className="w-28 text-sm text-gray-500"
                              data-oid="-o6l1j4"
                            >
                              Teléfono:
                            </div>
                            <div className="font-medium" data-oid="xiba:-n">
                              {selectedCollaboratorForDetails.contactPhone}
                            </div>
                          </div>
                          <div className="flex" data-oid="7gg40w7">
                            <div
                              className="w-28 text-sm text-gray-500"
                              data-oid="f4g2r36"
                            >
                              Dirección:
                            </div>
                            <div className="font-medium" data-oid="4:qzzzm">
                              {selectedCollaboratorForDetails.address},{" "}
                              {selectedCollaboratorForDetails.postalCode}
                            </div>
                          </div>
                          <div className="flex items-center" data-oid="tg50ghn">
                            <div
                              className="w-28 text-sm text-gray-500"
                              data-oid="t-s8uaj"
                            >
                              Ubicación:
                            </div>
                            <div className="font-medium" data-oid="38r3_qd">
                              {selectedCollaboratorForDetails.city},{" "}
                              {selectedCollaboratorForDetails.country}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3" data-oid="4og5z9o">
                          <div data-oid="7:.vwq4">
                            <label
                              className="text-sm text-gray-500"
                              data-oid="lypikyw"
                            >
                              Contacto
                            </label>
                            <Input
                              name="contactName"
                              value={formData.contactName || ""}
                              onChange={handleInputChange}
                              className="mt-1"
                              data-oid="mbf6jlh"
                            />
                          </div>
                          <div data-oid="getehwr">
                            <label
                              className="text-sm text-gray-500"
                              data-oid="dh:lsvd"
                            >
                              Email
                            </label>
                            <Input
                              name="contactEmail"
                              value={formData.contactEmail || ""}
                              onChange={handleInputChange}
                              className="mt-1"
                              data-oid="4jrlhhr"
                            />
                          </div>
                          <div data-oid="2c5kznd">
                            <label
                              className="text-sm text-gray-500"
                              data-oid="w7379bz"
                            >
                              Teléfono
                            </label>
                            <Input
                              name="contactPhone"
                              value={formData.contactPhone || ""}
                              onChange={handleInputChange}
                              className="mt-1"
                              data-oid="tozvo3p"
                            />
                          </div>
                          <div data-oid="610xf-3">
                            <label
                              className="text-sm text-gray-500"
                              data-oid="mpdpywh"
                            >
                              Dirección
                            </label>
                            <Input
                              name="address"
                              value={formData.address || ""}
                              onChange={handleInputChange}
                              className="mt-1"
                              data-oid="5ji12iu"
                            />
                          </div>
                          <div
                            className="grid grid-cols-2 gap-2"
                            data-oid="f34a:ot"
                          >
                            <div data-oid="_19vu:s">
                              <label
                                className="text-sm text-gray-500"
                                data-oid="zy14frk"
                              >
                                Código Postal
                              </label>
                              <Input
                                name="postalCode"
                                value={formData.postalCode || ""}
                                onChange={handleInputChange}
                                className="mt-1"
                                data-oid="ouql7m8"
                              />
                            </div>
                            <div data-oid="t3__jd0">
                              <label
                                className="text-sm text-gray-500"
                                data-oid="n5-b7_z"
                              >
                                Ciudad
                              </label>
                              <Input
                                name="city"
                                value={formData.city || ""}
                                onChange={handleInputChange}
                                className="mt-1"
                                data-oid="fqdfp5n"
                              />
                            </div>
                          </div>
                          <div data-oid="29b3t-s">
                            <label
                              className="text-sm text-gray-500"
                              data-oid="9n29z1p"
                            >
                              País
                            </label>
                            <Input
                              name="country"
                              value={formData.country || ""}
                              onChange={handleInputChange}
                              className="mt-1"
                              data-oid="5.pqvyp"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div
                      className="bg-white rounded-lg border border-gray-100 shadow-sm p-5"
                      data-oid="hj5y99s"
                    >
                      <h4
                        className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4 flex items-center"
                        data-oid="ag15_ah"
                      >
                        <FileText
                          className="h-4 w-4 mr-2 text-black"
                          data-oid="h8tnpcr"
                        />
                        Información fiscal
                      </h4>
                      {!isEditing ? (
                        <div className="space-y-3" data-oid="5zva:4p">
                          <div className="flex items-center" data-oid="zz7rg6u">
                            <div
                              className="w-28 text-sm text-gray-500"
                              data-oid="w6v.9fz"
                            >
                              CIF/NIF:
                            </div>
                            <div className="font-medium" data-oid="46qqsz9">
                              {selectedCollaboratorForDetails.taxId}
                            </div>
                          </div>
                          <div className="flex items-center" data-oid="ds95vus">
                            <div
                              className="w-28 text-sm text-gray-500"
                              data-oid="k3xmt76"
                            >
                              Fecha inicio:
                            </div>
                            <div className="font-medium" data-oid="ih15wfp">
                              {new Date(
                                selectedCollaboratorForDetails.startDate,
                              ).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="flex items-center" data-oid="9wagv86">
                            <div
                              className="w-28 text-sm text-gray-500"
                              data-oid="p8637z7"
                            >
                              Comisión:
                            </div>
                            <div
                              className="font-medium text-green-600"
                              data-oid="ch.-_6n"
                            >
                              {selectedCollaboratorForDetails.commissionRate}%
                            </div>
                          </div>
                          <div className="flex items-center" data-oid="iq:zntc">
                            <div
                              className="w-28 text-sm text-gray-500"
                              data-oid="pkag.bt"
                            >
                              Pago:
                            </div>
                            <div className="font-medium" data-oid="gu4el58">
                              {selectedCollaboratorForDetails.paymentTerms}
                            </div>
                          </div>
                          {selectedCollaboratorForDetails.bankAccount && (
                            <div
                              className="flex items-center"
                              data-oid="lhdural"
                            >
                              <div
                                className="w-28 text-sm text-gray-500"
                                data-oid="nulq8qr"
                              >
                                Cuenta:
                              </div>
                              <div
                                className="font-medium text-gray-700 font-mono text-sm tracking-wide"
                                data-oid="19sa3zy"
                              >
                                {selectedCollaboratorForDetails.bankAccount}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-3" data-oid="nqxisz6">
                          <div data-oid="9ghsol8">
                            <label
                              className="text-sm text-gray-500"
                              data-oid="gg5_v:k"
                            >
                              CIF/NIF
                            </label>
                            <Input
                              name="taxId"
                              value={formData.taxId || ""}
                              onChange={handleInputChange}
                              className="mt-1"
                              data-oid="l5p_jw3"
                            />
                          </div>
                          <div data-oid="c2l4uk2">
                            <label
                              className="text-sm text-gray-500"
                              data-oid=".gemj_t"
                            >
                              Fecha de inicio
                            </label>
                            <Input
                              type="date"
                              name="startDate"
                              value={formData.startDate || ""}
                              onChange={handleInputChange}
                              className="mt-1"
                              data-oid="0xebds2"
                            />
                          </div>
                          <div data-oid="v9eqf7y">
                            <label
                              className="text-sm text-gray-500"
                              data-oid="qawvld1"
                            >
                              Comisión (%)
                            </label>
                            <Input
                              type="number"
                              name="commissionRate"
                              value={formData.commissionRate || ""}
                              onChange={handleInputChange}
                              className="mt-1"
                              data-oid="n3p6zm2"
                            />
                          </div>
                          <div data-oid="8vs:sik">
                            <label
                              className="text-sm text-gray-500"
                              data-oid=".b5vjga"
                            >
                              Términos de pago
                            </label>
                            <Input
                              name="paymentTerms"
                              value={formData.paymentTerms || ""}
                              onChange={handleInputChange}
                              className="mt-1"
                              data-oid="6szvaok"
                            />
                          </div>
                          <div data-oid="bpattud">
                            <label
                              className="text-sm text-gray-500"
                              data-oid="ns_lv0:"
                            >
                              Cuenta bancaria
                            </label>
                            <Input
                              name="bankAccount"
                              value={formData.bankAccount || ""}
                              onChange={handleInputChange}
                              className="mt-1"
                              data-oid="itwhb63"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    className="mt-6 bg-white rounded-lg border border-gray-100 shadow-sm p-5"
                    data-oid="v.:qy_a"
                  >
                    <h4
                      className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4 flex items-center"
                      data-oid="5jgstoj"
                    >
                      <MapPin
                        className="h-4 w-4 mr-2 text-black"
                        data-oid="6h.ffqn"
                      />
                      Zonas y Especialidades
                    </h4>
                    {!isEditing ? (
                      <>
                        <div className="mb-4" data-oid="1y5yzwf">
                          <p
                            className="text-sm font-medium mb-2 text-gray-600"
                            data-oid="5fh8.ib"
                          >
                            Zonas de servicio:
                          </p>
                          <div
                            className="flex flex-wrap gap-2"
                            data-oid="3g-9q33"
                          >
                            {selectedCollaboratorForDetails.serviceAreas.map(
                              (area) => (
                                <span
                                  key={area}
                                  className="px-3 py-1 bg-gray-100 text-blue-700 border border-blue-100 text-sm rounded-full shadow-sm"
                                  data-oid=".8fzvls"
                                >
                                  {area}
                                </span>
                              ),
                            )}
                          </div>
                        </div>
                        <div className="mb-4" data-oid="53q54_x">
                          <p
                            className="text-sm font-medium mb-2 text-gray-600"
                            data-oid="gqds6pn"
                          >
                            Especialidades:
                          </p>
                          <div
                            className="flex flex-wrap gap-2"
                            data-oid="lzjvay_"
                          >
                            {selectedCollaboratorForDetails.specialties.map(
                              (specialty) => (
                                <span
                                  key={specialty}
                                  className="px-3 py-1 bg-purple-50 text-purple-700 border border-purple-100 text-sm rounded-full shadow-sm"
                                  data-oid="2g7obpd"
                                >
                                  {specialty}
                                </span>
                              ),
                            )}
                          </div>
                        </div>
                        <div data-oid="szwjchb">
                          <p
                            className="text-sm font-medium mb-2 text-gray-600"
                            data-oid="n6h1ux6"
                          >
                            Certificaciones:
                          </p>
                          <div
                            className="flex flex-wrap gap-2"
                            data-oid="b97cqqt"
                          >
                            {selectedCollaboratorForDetails.certifications.map(
                              (cert) => (
                                <span
                                  key={cert}
                                  className="px-3 py-1 bg-green-50 text-green-700 border border-green-100 text-sm rounded-full shadow-sm"
                                  data-oid="8:hb48d"
                                >
                                  {cert}
                                </span>
                              ),
                            )}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-4" data-oid=".t:r:bb">
                        <div data-oid="l:8adx6">
                          <label
                            className="text-sm text-gray-500"
                            data-oid="5v18qth"
                          >
                            Zonas de servicio (separadas por comas)
                          </label>
                          <Input
                            name="serviceAreas"
                            value={
                              Array.isArray(formData.serviceAreas)
                                ? formData.serviceAreas.join(", ")
                                : ""
                            }
                            onChange={(e) => {
                              const areas = e.target.value
                                .split(",")
                                .map((area) => area.trim())
                                .filter(Boolean);
                              setFormData({ ...formData, serviceAreas: areas });
                            }}
                            className="mt-1"
                            data-oid="kmu64u7"
                          />
                        </div>
                        <div data-oid="4ya-286">
                          <label
                            className="text-sm text-gray-500"
                            data-oid="e9z4eb:"
                          >
                            Especialidades (separadas por comas)
                          </label>
                          <Input
                            name="specialties"
                            value={
                              Array.isArray(formData.specialties)
                                ? formData.specialties.join(", ")
                                : ""
                            }
                            onChange={(e) => {
                              const specialties = e.target.value
                                .split(",")
                                .map((s) => s.trim())
                                .filter(Boolean);
                              setFormData({
                                ...formData,
                                specialties: specialties,
                              });
                            }}
                            className="mt-1"
                            data-oid="r8euo4t"
                          />
                        </div>
                        <div data-oid="h75qtbt">
                          <label
                            className="text-sm text-gray-500"
                            data-oid="j8dkdv1"
                          >
                            Certificaciones (separadas por comas)
                          </label>
                          <Input
                            name="certifications"
                            value={
                              Array.isArray(formData.certifications)
                                ? formData.certifications.join(", ")
                                : ""
                            }
                            onChange={(e) => {
                              const certifications = e.target.value
                                .split(",")
                                .map((c) => c.trim())
                                .filter(Boolean);
                              setFormData({
                                ...formData,
                                certifications: certifications,
                              });
                            }}
                            className="mt-1"
                            data-oid="q3-o5s5"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {!isEditing && (
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 pt-0"
                  data-oid=".l_ouki"
                >
                  <div
                    className="bg-white rounded-lg border border-gray-100 shadow-sm p-5"
                    data-oid=".u1:0jb"
                  >
                    <h4
                      className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4 flex items-center"
                      data-oid="wv4n1b1"
                    >
                      <User
                        className="h-4 w-4 mr-2 text-black"
                        data-oid="rodd_kw"
                      />
                      Chóferes asociados
                    </h4>
                    {selectedCollaboratorForDetails.associatedDrivers.length >
                    0 ? (
                      <div
                        className="grid grid-cols-1 gap-2"
                        data-oid="00jc0fq"
                      >
                        {loadingDrivers ? (
                          <div
                            className="bg-gray-50 rounded-lg border border-gray-100 p-4 flex items-center justify-center"
                            data-oid="wwvtrsc"
                          >
                            <p
                              className="text-sm text-gray-500"
                              data-oid="1mzyv-p"
                            >
                              Cargando chóferes...
                            </p>
                          </div>
                        ) : associatedDrivers.length > 0 ? (
                          associatedDrivers.map((driver) => (
                            <div
                              key={driver.id}
                              className="flex items-center p-2 border border-gray-100 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                              data-oid="9pg..es"
                            >
                              <div
                                className="w-10 h-10 flex-shrink-0 mr-3"
                                data-oid="6.b6p2p"
                              >
                                {driver.photo ? (
                                  <img
                                    src={driver.photo}
                                    alt={driver.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                    data-oid="mlx55al"
                                  />
                                ) : (
                                  <div
                                    className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium"
                                    data-oid="8114kgs"
                                  >
                                    <User
                                      className="h-5 w-5"
                                      data-oid="iuj_qxx"
                                    />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1" data-oid="ule1jxd">
                                <p
                                  className="text-sm font-medium"
                                  data-oid="1yq9.cq"
                                >
                                  {driver.name}
                                </p>
                                <div
                                  className="flex flex-wrap gap-2 mt-1"
                                  data-oid="hm82xjx"
                                >
                                  {driver.email && (
                                    <p
                                      className="text-xs text-gray-500"
                                      data-oid="e10aj_b"
                                    >
                                      {driver.email}
                                    </p>
                                  )}
                                  {driver.phone && (
                                    <p
                                      className="text-xs text-gray-500"
                                      data-oid="8le80kn"
                                    >
                                      {driver.phone}
                                    </p>
                                  )}
                                </div>
                                <div
                                  className="flex items-center gap-2 mt-1"
                                  data-oid="-atu_62"
                                >
                                  {driver.specialty && (
                                    <span
                                      className="px-2 py-0.5 bg-purple-50 text-purple-700 text-xs rounded-full"
                                      data-oid="7o8p4.g"
                                    >
                                      {driver.specialty}
                                    </span>
                                  )}
                                  {driver.city && (
                                    <span
                                      className="px-2 py-0.5 bg-gray-100 text-blue-700 text-xs rounded-full"
                                      data-oid="ui7qcn2"
                                    >
                                      {driver.city}
                                    </span>
                                  )}
                                  <span
                                    className={`px-2 py-0.5 text-xs rounded-full ${
                                      driver.status === "active"
                                        ? "bg-green-50 text-green-700"
                                        : driver.status === "inactive"
                                          ? "bg-gray-50 text-gray-700"
                                          : "bg-amber-50 text-amber-700"
                                    }`}
                                    data-oid="exrkqcx"
                                  >
                                    {driver.status === "active"
                                      ? "Activo"
                                      : driver.status === "inactive"
                                        ? "Inactivo"
                                        : "Pendiente"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div
                            className="bg-gray-50 rounded-lg border border-gray-100 p-4 flex items-center justify-center"
                            data-oid="m39p3q3"
                          >
                            <p
                              className="text-sm text-gray-500"
                              data-oid=".t1:._t"
                            >
                              No se encontraron datos de los chóferes
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div
                        className="bg-gray-50 rounded-lg border border-gray-100 p-4 flex items-center justify-center"
                        data-oid="jg734q-"
                      >
                        <p className="text-sm text-gray-500" data-oid="rm_hox9">
                          No hay chóferes asociados
                        </p>
                      </div>
                    )}
                  </div>

                  <div
                    className="bg-white rounded-lg border border-gray-100 shadow-sm p-5"
                    data-oid="-j0oco8"
                  >
                    <h4
                      className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4 flex items-center"
                      data-oid="9phi6bl"
                    >
                      <Car
                        className="h-4 w-4 mr-2 text-black"
                        data-oid="5dkrt2y"
                      />
                      Vehículos asociados
                    </h4>
                    {selectedCollaboratorForDetails.associatedVehicles.length >
                    0 ? (
                      <div
                        className="grid grid-cols-1 gap-2"
                        data-oid="2-3p.y4"
                      >
                        {loadingVehicles ? (
                          <div
                            className="bg-gray-50 rounded-lg border border-gray-100 p-4 flex items-center justify-center"
                            data-oid="y3-6yej"
                          >
                            <p
                              className="text-sm text-gray-500"
                              data-oid="yts67uk"
                            >
                              Cargando vehículos...
                            </p>
                          </div>
                        ) : associatedVehicles.length > 0 ? (
                          associatedVehicles.map((vehicle) => (
                            <div
                              key={vehicle.id}
                              className="flex items-center p-2 border border-gray-100 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                              data-oid="sw5c6cd"
                            >
                              <div
                                className="w-12 h-12 flex-shrink-0 mr-3"
                                data-oid="pd:tnb3"
                              >
                                {vehicle.image ? (
                                  <img
                                    src={vehicle.image}
                                    alt={`${vehicle.brand} ${vehicle.model}`}
                                    className="w-12 h-12 rounded-md object-cover"
                                    data-oid="wenu7re"
                                  />
                                ) : (
                                  <div
                                    className="h-12 w-12 bg-gray-200 rounded-md flex items-center justify-center text-gray-600"
                                    data-oid="2zf:vkk"
                                  >
                                    <Car
                                      className="h-6 w-6"
                                      data-oid="xq_k04n"
                                    />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1" data-oid="7pfi5zf">
                                <p
                                  className="text-sm font-medium"
                                  data-oid="d:o3qsl"
                                >
                                  {vehicle.brand} {vehicle.model}
                                </p>
                                <div
                                  className="flex flex-wrap gap-2 mt-1"
                                  data-oid="_8lgpvg"
                                >
                                  <p
                                    className="text-xs text-gray-500"
                                    data-oid="kv608uz"
                                  >
                                    {vehicle.licensePlate}
                                  </p>
                                  {vehicle.year && (
                                    <p
                                      className="text-xs text-gray-500"
                                      data-oid="y1oisma"
                                    >
                                      {vehicle.year}
                                    </p>
                                  )}
                                  {vehicle.color && (
                                    <p
                                      className="text-xs text-gray-500"
                                      data-oid="zfe_zol"
                                    >
                                      {vehicle.color}
                                    </p>
                                  )}
                                </div>
                                <div
                                  className="flex items-center gap-2 mt-1"
                                  data-oid="yn9vq_."
                                >
                                  <span
                                    className="px-2 py-0.5 bg-gray-100 text-blue-700 text-xs rounded-full"
                                    data-oid="-9o2.ag"
                                  >
                                    {vehicle.type.charAt(0).toUpperCase() +
                                      vehicle.type.slice(1)}
                                  </span>
                                  <span
                                    className="px-2 py-0.5 bg-purple-50 text-purple-700 text-xs rounded-full"
                                    data-oid="-qxpmwq"
                                  >
                                    {vehicle.category.charAt(0).toUpperCase() +
                                      vehicle.category
                                        .slice(1)
                                        .replace("_", " ")}
                                  </span>
                                  <span
                                    className={`px-2 py-0.5 text-xs rounded-full ${
                                      vehicle.available
                                        ? "bg-green-50 text-green-700"
                                        : "bg-gray-100 text-gray-700"
                                    }`}
                                    data-oid="_p3:dcd"
                                  >
                                    {vehicle.available
                                      ? "Disponible"
                                      : "No disponible"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div
                            className="bg-gray-50 rounded-lg border border-gray-100 p-4 flex items-center justify-center"
                            data-oid="1mhgpt7"
                          >
                            <p
                              className="text-sm text-gray-500"
                              data-oid="jo5rc5b"
                            >
                              No se encontraron datos de los vehículos
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div
                        className="bg-gray-50 rounded-lg border border-gray-100 p-4 flex items-center justify-center"
                        data-oid="sr00otm"
                      >
                        <p className="text-sm text-gray-500" data-oid="cwo.eia">
                          No hay vehículos asociados
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="p-6 pt-0" data-oid="h3kv2vp">
                <div
                  className="bg-white rounded-lg border border-gray-100 shadow-sm p-5"
                  data-oid="eqi5a6b"
                >
                  <h4
                    className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4 flex items-center"
                    data-oid="av92bz1"
                  >
                    <FileText
                      className="h-4 w-4 mr-2 text-black"
                      data-oid=".-srpo_"
                    />
                    Notas
                  </h4>
                  {!isEditing ? (
                    <div
                      className="bg-gray-50 p-4 rounded-lg border border-gray-100"
                      data-oid="q0z13zm"
                    >
                      <p className="text-sm" data-oid=":rsyf-8">
                        {selectedCollaboratorForDetails.notes || "Sin notas"}
                      </p>
                    </div>
                  ) : (
                    <Textarea
                      name="notes"
                      value={formData.notes || ""}
                      onChange={handleInputChange}
                      className="mt-1"
                      rows={4}
                      data-oid="y4qdrp."
                    />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Vista de la tabla (cuando no se está viendo un colaborador específico)
  return (
    <div className="space-y-6" data-oid="61w6gxw">
      <div className="flex justify-between items-center" data-oid="pxb2x_c">
        <h1 className="text-2xl font-bold text-gray-800" data-oid="ijv3au_">
          Gestión de Colaboradores
        </h1>
        {!showCollaboratorForm && (
          <Button
            onClick={() => {
              setEditingCollaborator(null);
              setShowCollaboratorForm(true);
            }}
            className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            data-oid=".v5-1k4"
          >
            <PlusCircle size={18} className="mr-2" data-oid="c0lli5-" />
            Añadir Colaborador
          </Button>
        )}
      </div>

      {showCollaboratorForm ? (
        <Card className="shadow-md" data-oid="lwedw05">
          <CardHeader className="border-b bg-gray-50" data-oid="mgac7q_">
            <CardTitle data-oid="wfdl7n_">
              {editingCollaborator ? "Editar" : "Añadir"} Colaborador
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6" data-oid="clh9v7i">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // Recoger todos los datos del formulario
                const formData = new FormData(e.currentTarget);
                const data: any = {};

                // Convertir campos de texto en arrays
                const serviceAreas =
                  formData.get("serviceAreas")?.toString() || "";
                const specialties =
                  formData.get("specialties")?.toString() || "";
                const certifications =
                  formData.get("certifications")?.toString() || "";

                // Preparar los datos para enviar
                for (const [key, value] of formData.entries()) {
                  if (
                    key !== "serviceAreas" &&
                    key !== "specialties" &&
                    key !== "certifications"
                  ) {
                    data[key] = value;
                  }
                }

                // Convertir strings a arrays
                data.serviceAreas = serviceAreas
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean);
                data.specialties = specialties
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean);
                data.certifications = certifications
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean);

                // Forzar conversión de campos numéricos
                data.commissionRate = parseFloat(data.commissionRate) || 0;

                // Añadir campos necesarios que puedan faltar y tengan valores por defecto
                data.rating = editingCollaborator?.rating || 0;
                data.associatedDrivers =
                  editingCollaborator?.associatedDrivers || [];
                data.associatedVehicles =
                  editingCollaborator?.associatedVehicles || [];

                // Crear o actualizar colaborador
                handleCollaboratorSubmit(data);
              }}
              className="space-y-6"
              data-oid=":9rx25t"
            >
              {/* Información básica */}
              <div data-oid="5:952hp">
                <h3
                  className="text-lg font-medium border-b pb-2 mb-4"
                  data-oid="uuxo-44"
                >
                  Información básica
                </h3>
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  data-oid="tnqt4ib"
                >
                  <div data-oid="y01uf6a">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid="fmaf9wc"
                    >
                      Nombre del colaborador*
                    </label>
                    <Input
                      name="name"
                      defaultValue={editingCollaborator?.name || ""}
                      required
                      data-oid="kd-e_m2"
                    />
                  </div>
                  <div data-oid="qs:42b1">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid="m5m9p53"
                    >
                      URL del Logo
                    </label>
                    <Input
                      name="logo"
                      defaultValue={editingCollaborator?.logo || ""}
                      placeholder="https://example.com/logo.jpg"
                      data-oid="xwuzy1f"
                    />
                  </div>
                  <div data-oid=":np95o5">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid="ajfz7tu"
                    >
                      Tipo de colaborador*
                    </label>
                    <Select
                      name="type"
                      defaultValue={editingCollaborator?.type || "company"}
                      data-oid="7sv_o0j"
                    >
                      <SelectTrigger data-oid="t1ijv27">
                        <SelectValue
                          placeholder="Seleccionar tipo"
                          data-oid="25aap0d"
                        />
                      </SelectTrigger>
                      <SelectContent data-oid="yi7mapc">
                        <SelectItem value="company" data-oid="vkvoeoj">
                          Empresa
                        </SelectItem>
                        <SelectItem value="individual" data-oid="_ve6azp">
                          Particular
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div data-oid="r0zjb-o">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid=":xdt1wn"
                    >
                      Estado*
                    </label>
                    <Select
                      name="status"
                      defaultValue={editingCollaborator?.status || "active"}
                      data-oid="dw818b5"
                    >
                      <SelectTrigger data-oid="u9anpl-">
                        <SelectValue
                          placeholder="Seleccionar estado"
                          data-oid="bbxnogz"
                        />
                      </SelectTrigger>
                      <SelectContent data-oid=":0oejba">
                        <SelectItem value="active" data-oid="gi0v_qi">
                          Activo
                        </SelectItem>
                        <SelectItem value="inactive" data-oid=":uk0buo">
                          Inactivo
                        </SelectItem>
                        <SelectItem value="pending" data-oid="7get-5v">
                          Pendiente
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Información de contacto */}
              <div data-oid="dm1pg7r">
                <h3
                  className="text-lg font-medium border-b pb-2 mb-4"
                  data-oid="ufap-31"
                >
                  Información de contacto
                </h3>
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  data-oid="_zl.nz7"
                >
                  <div data-oid="b-yhivm">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid=".c.nv3t"
                    >
                      Nombre de contacto*
                    </label>
                    <Input
                      name="contactName"
                      defaultValue={editingCollaborator?.contactName || ""}
                      required
                      data-oid="b4l5n.n"
                    />
                  </div>
                  <div data-oid="tf2_:z8">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid="tx2rotm"
                    >
                      Email de contacto*
                    </label>
                    <Input
                      type="email"
                      name="contactEmail"
                      defaultValue={editingCollaborator?.contactEmail || ""}
                      required
                      data-oid="ao_3rxy"
                    />
                  </div>
                  <div data-oid="c16vew1">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid="7x7sj:r"
                    >
                      Teléfono de contacto*
                    </label>
                    <Input
                      name="contactPhone"
                      defaultValue={editingCollaborator?.contactPhone || ""}
                      required
                      data-oid="8ttkw:a"
                    />
                  </div>
                  <div className="md:col-span-2" data-oid="wy0h0lb">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid="to3q3:0"
                    >
                      Dirección
                    </label>
                    <Input
                      name="address"
                      defaultValue={editingCollaborator?.address || ""}
                      data-oid="pcr9dyc"
                    />
                  </div>
                  <div data-oid="2rfa_u8">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid="in4he67"
                    >
                      Código Postal
                    </label>
                    <Input
                      name="postalCode"
                      defaultValue={editingCollaborator?.postalCode || ""}
                      data-oid="441jwxi"
                    />
                  </div>
                  <div data-oid="fma5iy5">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid="4vx929_"
                    >
                      Ciudad
                    </label>
                    <Input
                      name="city"
                      defaultValue={editingCollaborator?.city || ""}
                      data-oid="acp_-j-"
                    />
                  </div>
                  <div data-oid="bvx36mt">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid=".8e042v"
                    >
                      País
                    </label>
                    <Input
                      name="country"
                      defaultValue={editingCollaborator?.country || ""}
                      data-oid="y24-103"
                    />
                  </div>
                </div>
              </div>

              {/* Información fiscal y contractual */}
              <div data-oid="qibcno9">
                <h3
                  className="text-lg font-medium border-b pb-2 mb-4"
                  data-oid="io1.4:2"
                >
                  Información fiscal y contractual
                </h3>
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  data-oid="5.bmcsl"
                >
                  <div data-oid="c::o2v3">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid="2:d7kd1"
                    >
                      CIF/NIF*
                    </label>
                    <Input
                      name="taxId"
                      defaultValue={editingCollaborator?.taxId || ""}
                      required
                      data-oid="o5msf.g"
                    />
                  </div>
                  <div data-oid="0whebfm">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid="w5w1u4q"
                    >
                      Fecha de inicio*
                    </label>
                    <Input
                      type="date"
                      name="startDate"
                      defaultValue={
                        editingCollaborator?.startDate ||
                        new Date().toISOString().split("T")[0]
                      }
                      required
                      data-oid="qoi2c-_"
                    />
                  </div>
                  <div data-oid=".1tgprp">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid="3zr6.rx"
                    >
                      Comisión (%)*
                    </label>
                    <Input
                      type="number"
                      name="commissionRate"
                      defaultValue={editingCollaborator?.commissionRate || 10}
                      required
                      data-oid="d5ho2py"
                    />
                  </div>
                  <div data-oid="3wv6q6q">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid="f17l_4r"
                    >
                      Términos de pago
                    </label>
                    <Input
                      name="paymentTerms"
                      defaultValue={editingCollaborator?.paymentTerms || ""}
                      placeholder="Ej: Pago mensual, 30 días"
                      data-oid="jayr4xg"
                    />
                  </div>
                  <div className="md:col-span-2" data-oid=":pnhcge">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid="gjlb58o"
                    >
                      Cuenta bancaria
                    </label>
                    <Input
                      name="bankAccount"
                      defaultValue={editingCollaborator?.bankAccount || ""}
                      placeholder="ES12 1234 5678 9012 3456 7890"
                      data-oid="zntmwsu"
                    />
                  </div>
                </div>
              </div>

              {/* Zonas, especialidades y certificaciones */}
              <div data-oid="kecmtqt">
                <h3
                  className="text-lg font-medium border-b pb-2 mb-4"
                  data-oid="af0fyf7"
                >
                  Zonas y especialidades
                </h3>
                <div className="grid grid-cols-1 gap-4" data-oid="5bj.jyn">
                  <div data-oid="w88:fza">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid="jzy_m8a"
                    >
                      Zonas de servicio (separadas por comas)
                    </label>
                    <Input
                      name="serviceAreas"
                      defaultValue={
                        editingCollaborator?.serviceAreas
                          ? editingCollaborator.serviceAreas.join(", ")
                          : ""
                      }
                      placeholder="Madrid, Barcelona, Sevilla"
                      data-oid="98j4xil"
                    />

                    <p
                      className="text-xs text-gray-500 mt-1"
                      data-oid="3js5tmb"
                    >
                      Indica las zonas geográficas donde opera el colaborador
                    </p>
                  </div>
                  <div data-oid="pns5uj_">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid="lnrt5nk"
                    >
                      Especialidades (separadas por comas)
                    </label>
                    <Input
                      name="specialties"
                      defaultValue={
                        editingCollaborator?.specialties
                          ? editingCollaborator.specialties.join(", ")
                          : ""
                      }
                      placeholder="Bodas, Eventos corporativos, Traslados aeropuerto"
                      data-oid=".b4evjw"
                    />

                    <p
                      className="text-xs text-gray-500 mt-1"
                      data-oid="9e4yebv"
                    >
                      Tipo de servicios que ofrece el colaborador
                    </p>
                  </div>
                  <div data-oid="zxzn8fu">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid="rwwcjpo"
                    >
                      Certificaciones (separadas por comas)
                    </label>
                    <Input
                      name="certifications"
                      defaultValue={
                        editingCollaborator?.certifications
                          ? editingCollaborator.certifications.join(", ")
                          : ""
                      }
                      placeholder="ISO 9001, Licencia VTC"
                      data-oid="44-80uf"
                    />

                    <p
                      className="text-xs text-gray-500 mt-1"
                      data-oid="hqn8h.p"
                    >
                      Permisos y certificaciones que posee el colaborador
                    </p>
                  </div>
                </div>
              </div>

              {/* Notas adicionales */}
              <div data-oid="jyeg1oi">
                <h3
                  className="text-lg font-medium border-b pb-2 mb-4"
                  data-oid="3jcu5d6"
                >
                  Información adicional
                </h3>
                <div data-oid="_gvk61a">
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    data-oid="3xrf5c4"
                  >
                    Notas
                  </label>
                  <Textarea
                    name="notes"
                    defaultValue={editingCollaborator?.notes || ""}
                    placeholder="Información adicional sobre el colaborador"
                    rows={4}
                    data-oid="3x8bb80"
                  />
                </div>
              </div>

              {/* Botones de acción */}
              <div
                className="flex justify-end mt-6 space-x-3"
                data-oid="wmad1jy"
              >
                <Button
                  type="button"
                  onClick={() => {
                    setShowCollaboratorForm(false);
                    setEditingCollaborator(null);
                  }}
                  variant="outline"
                  data-oid="mm_016u"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-black hover:bg-gray-800"
                  data-oid="rm5rctt"
                >
                  {editingCollaborator ? "Actualizar" : "Crear"} Colaborador
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Filtros y búsqueda */}
          <Card data-oid="bf7xhbp">
            <CardContent className="pt-6" data-oid="dpk4evl">
              <div
                className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4"
                data-oid="26b47kt"
              >
                <div className="flex-1" data-oid="wxhbyu7">
                  <div className="relative" data-oid="jmypzed">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                      data-oid="5rhnjh-"
                    />

                    <input
                      type="text"
                      placeholder="Buscar colaboradores..."
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 pl-10 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      data-oid="259audz"
                    />
                  </div>
                </div>
                <div
                  className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4"
                  data-oid="38a.r0k"
                >
                  <Select
                    defaultValue="all"
                    value={typeFilter}
                    onValueChange={handleTypeFilterChange}
                    data-oid="0t7:-ft"
                  >
                    <SelectTrigger
                      className="w-full md:w-[150px]"
                      data-oid="y3tm-3c"
                    >
                      <SelectValue
                        placeholder="Tipo de colaborador"
                        data-oid="ljdw_e_"
                      />
                    </SelectTrigger>
                    <SelectContent data-oid="e.-qzga">
                      <SelectItem value="all" data-oid="8vp4zhr">
                        Todos los tipos
                      </SelectItem>
                      <SelectItem value="company" data-oid="q:7zyft">
                        Empresas
                      </SelectItem>
                      <SelectItem value="individual" data-oid="rgy7d2:">
                        Particulares
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    defaultValue="all"
                    value={statusFilter}
                    onValueChange={handleStatusFilterChange}
                    data-oid="qxr565m"
                  >
                    <SelectTrigger
                      className="w-full md:w-[150px]"
                      data-oid="77w50xi"
                    >
                      <SelectValue placeholder="Estado" data-oid="z74otvu" />
                    </SelectTrigger>
                    <SelectContent data-oid="-qmcax9">
                      <SelectItem value="all" data-oid="10l.00n">
                        Todos los estados
                      </SelectItem>
                      <SelectItem value="active" data-oid="ekx:8tp">
                        Activos
                      </SelectItem>
                      <SelectItem value="inactive" data-oid="zgq_vk0">
                        Inactivos
                      </SelectItem>
                      <SelectItem value="pending" data-oid="md2fsdc">
                        Pendientes
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabla de colaboradores */}
          <Card data-oid="cytkgy9">
            <CardContent className="p-0" data-oid="pstf1b-">
              <div className="overflow-x-auto" data-oid="0:le.6d">
                <table className="w-full" data-oid="7ta7n1e">
                  <thead data-oid=".s83qwx">
                    <tr className="bg-gray-50 border-b" data-oid="xbdpba.">
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        data-oid="ly69l25"
                      >
                        Colaborador
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        data-oid="dhnlp6s"
                      >
                        Contacto
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        data-oid="f.5i.e5"
                      >
                        Ubicación
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        data-oid="z4xso2b"
                      >
                        Comisión
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        data-oid="_lgn.9o"
                      >
                        Estado
                      </th>
                      <th
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        data-oid="r13er:u"
                      >
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className="bg-white divide-y divide-gray-200"
                    data-oid="i29l1_o"
                  >
                    {collaborators.map((collaborator) => (
                      <tr
                        key={collaborator.id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() =>
                          handleViewCollaboratorDetails(collaborator)
                        }
                        data-oid="y5bu2qe"
                      >
                        <td
                          className="px-6 py-4 whitespace-nowrap"
                          data-oid="_5d_i48"
                        >
                          <div className="flex items-center" data-oid="z-o0fj1">
                            <div
                              className="flex-shrink-0 h-10 w-10 relative"
                              data-oid="xjxss4l"
                            >
                              <img
                                className="h-10 w-10 rounded-full object-cover border-2 border-gray-100"
                                src={collaborator.logo}
                                alt={collaborator.name}
                                data-oid="97xsgox"
                              />

                              <div
                                className={`absolute -bottom-1 -right-1 p-1 rounded-full ${
                                  collaborator.type === "company"
                                    ? "bg-gray-200 text-gray-600 border border-blue-200"
                                    : "bg-amber-100 text-amber-600 border border-amber-200"
                                }`}
                                data-oid="4l9bvf2"
                              >
                                {collaborator.type === "company" ? (
                                  <Building
                                    className="h-3.5 w-3.5"
                                    data-oid="257f-hf"
                                  />
                                ) : (
                                  <Briefcase
                                    className="h-3.5 w-3.5"
                                    data-oid="yg8d3oh"
                                  />
                                )}
                              </div>
                            </div>
                            <div className="ml-4" data-oid="b0hcqvq">
                              <div
                                className="text-sm font-medium text-gray-900"
                                data-oid="qi8hvjy"
                              >
                                {collaborator.name}
                              </div>
                              <div
                                className="text-xs text-gray-500 mt-1 flex items-center"
                                data-oid="nhgq10z"
                              >
                                <span
                                  className={`px-2 py-0.5 rounded-sm text-xs font-medium inline-flex items-center ${
                                    collaborator.type === "company"
                                      ? "bg-gray-100 text-blue-700"
                                      : "bg-amber-50 text-amber-700"
                                  }`}
                                  data-oid="092ir94"
                                >
                                  {collaborator.type === "company"
                                    ? "Empresa"
                                    : "Particular"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap"
                          data-oid="wircplm"
                        >
                          <div
                            className="text-sm text-gray-900"
                            data-oid="hevq.ow"
                          >
                            {collaborator.contactName}
                          </div>
                          <div
                            className="text-sm text-gray-500"
                            data-oid="6tnz5ro"
                          >
                            {collaborator.contactEmail}
                          </div>
                          <div
                            className="text-sm text-gray-500"
                            data-oid="4s-8t_s"
                          >
                            {collaborator.contactPhone}
                          </div>
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap"
                          data-oid="9hg02_s"
                        >
                          <div
                            className="text-sm text-gray-900"
                            data-oid="_7afx24"
                          >
                            {collaborator.city}
                          </div>
                          <div
                            className="text-sm text-gray-500"
                            data-oid="a-bd.31"
                          >
                            {collaborator.country}
                          </div>
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap"
                          data-oid="dg29rl."
                        >
                          <div
                            className="text-sm text-gray-900"
                            data-oid=".vnxr:r"
                          >
                            {collaborator.commissionRate}%
                          </div>
                          <div
                            className="text-sm text-gray-500"
                            data-oid="nx-48c."
                          >
                            {collaborator.paymentTerms}
                          </div>
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap"
                          data-oid="fxxxo:u"
                        >
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              collaborator.status === "active"
                                ? "bg-gray-200 text-green-800"
                                : collaborator.status === "inactive"
                                  ? "bg-gray-100 text-gray-800"
                                  : "bg-gray-200 text-yellow-800"
                            }`}
                            data-oid="0anzi.m"
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full mr-1.5 mt-0.5 ${
                                collaborator.status === "active"
                                  ? "bg-black"
                                  : collaborator.status === "inactive"
                                    ? "bg-gray-600"
                                    : "bg-yellow-600"
                              }`}
                              data-oid="xh68pqc"
                            ></span>
                            {collaborator.status === "active"
                              ? "Activo"
                              : collaborator.status === "inactive"
                                ? "Inactivo"
                                : "Pendiente"}
                          </span>
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                          data-oid="rg-_ik6"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) =>
                              handleDeleteCollaborator(e, collaborator.id)
                            }
                            className="text-gray-600 border-gray-200 hover:bg-gray-100"
                            data-oid="6jlr1o2"
                          >
                            <Trash2 size={16} data-oid="9ixcde:" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {collaborators.length === 0 && (
                  <div className="py-10 text-center" data-oid="8ysjaoa">
                    <p className="text-gray-500" data-oid="ox9nl04">
                      No se encontraron colaboradores
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default CollaboratorsSection;
