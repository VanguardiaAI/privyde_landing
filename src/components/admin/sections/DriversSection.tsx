import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  Search,
  Trash2,
  AlertTriangle,
  Loader2,
  UserCircle,
  FileText,
  MapPin,
  X } from
"lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue } from
"@/components/ui/select";
import DriverDetailsView from "../DriverDetailsView";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

// Definir el tipo para los chóferes
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
  assignedVehicles?: string[];
  languages: string[];
  specialty?: string;
  notes?: string;
  status: "active" | "inactive" | "pending";
  country: string;
  city: string;
  address?: string;
  collaboratorId?: string;
}

// AlertDialog personalizado para evitar el error de hooks
const CustomAlertDialog = (props: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  description: string;
  cancelText?: string;
  confirmText?: string;
}) => {
  const {
    open,
    onOpenChange,
    onConfirm,
    title,
    description,
    cancelText = "Cancelar",
    confirmText = "Eliminar"
  } = props;

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      data-oid="vrml.n4">

      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
        data-oid="69-_mza">
      </div>
      <div
        className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        data-oid="oj.yyo:">

        <div className="mb-4" data-oid="ks1az:3">
          <h2 className="text-lg font-semibold" data-oid="2-o8wfm">
            {title}
          </h2>
          <p className="text-gray-500 mt-1" data-oid="5whowp1">
            {description}
          </p>
        </div>
        <div className="flex justify-end space-x-2" data-oid="2955xmh">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            data-oid="rk.04yt">

            {cancelText}
          </Button>
          <Button
            className="bg-black hover:bg-gray-800 text-white"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            data-oid=".q:ppmv">

            {confirmText}
          </Button>
        </div>
      </div>
    </div>);

};

const DriversSection = () => {
  const { toast } = useToast();

  // Estados para la gestión de chóferes
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [showDriverForm, setShowDriverForm] = useState(false);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
  const [isDriverDetailsViewOpen, setIsDriverDetailsViewOpen] = useState(false);
  const [selectedDriverDetails, setSelectedDriverDetails] =
  useState<Driver | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Cargar datos de chóferes desde la API
  useEffect(() => {
    fetchDrivers();
  }, []);

  // Función para obtener el token de autenticación
  const getAuthToken = () => {
    return localStorage.getItem("authToken");
  };

  // Configurar headers para las peticiones
  const getAuthHeaders = () => {
    const token = getAuthToken();
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : ""
      }
    };
  };

  // Función para obtener todos los chóferes
  const fetchDrivers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        "/api/admin/drivers/list",
        getAuthHeaders()
      );

      if (response.data && response.data.drivers) {
        setDrivers(response.data.drivers);
      }
    } catch (error) {
      console.error("Error al cargar chóferes:", error);
      setError(
        "Error al cargar los datos de chóferes. Por favor, intente de nuevo más tarde."
      );

      // En desarrollo, cargar datos simulados como fallback
      if (process.env.NODE_ENV === "development") {
        console.log("Cargando datos simulados en desarrollo");
        setDrivers([
        {
          id: "d1",
          name: "Carlos Rodríguez",
          photo: "https://randomuser.me/api/portraits/men/32.jpg",
          phone: "+34 612 345 678",
          email: "carlos.rodriguez@email.com",
          documentId: "12345678X",
          licenseNumber: "L-987654321",
          licenseExpiry: "2026-05-10",
          type: "private",
          experience: 8,
          rating: 4.9,
          available: true,
          assignedVehicles: ["1", "3"],
          languages: ["Español", "Inglés", "Francés"],
          specialty: "Eventos VIP",
          notes: "Conductor principal para eventos corporativos",
          status: "active",
          country: "España",
          city: "Madrid"
        },
        {
          id: "d2",
          name: "Laura Martínez",
          photo: "https://randomuser.me/api/portraits/women/45.jpg",
          phone: "+34 623 456 789",
          email: "laura.martinez@email.com",
          documentId: "87654321Y",
          licenseNumber: "L-123456789",
          licenseExpiry: "2025-08-15",
          type: "company",
          companyName: "Luxury Fleet SL",
          experience: 5,
          rating: 4.7,
          available: true,
          assignedVehicles: ["2"],
          languages: ["Español", "Inglés", "Italiano"],
          specialty: "Traslados aeropuerto",
          status: "active",
          country: "España",
          city: "Barcelona"
        },
        {
          id: "d3",
          name: "Javier López",
          photo: "https://randomuser.me/api/portraits/men/67.jpg",
          phone: "+34 634 567 890",
          email: "javier.lopez@email.com",
          documentId: "23456789Z",
          licenseNumber: "L-234567890",
          licenseExpiry: "2024-12-20",
          type: "company",
          companyName: "VIP Transports Ltd.",
          experience: 12,
          rating: 4.8,
          available: false,
          assignedVehicles: ["3"],
          languages: ["Español", "Inglés", "Alemán"],
          status: "inactive",
          country: "España",
          city: "Valencia",
          notes: "De vacaciones hasta 15/07/2024"
        },
        {
          id: "d4",
          name: "Ana García",
          photo: "https://randomuser.me/api/portraits/women/22.jpg",
          phone: "+34 645 678 901",
          email: "ana.garcia@email.com",
          documentId: "34567890A",
          licenseNumber: "L-345678901",
          licenseExpiry: "2025-03-25",
          type: "private",
          experience: 6,
          rating: 4.5,
          available: true,
          assignedVehicles: [],
          languages: ["Español", "Inglés"],
          specialty: "Eventos corporativos",
          status: "active",
          country: "España",
          city: "Madrid"
        },
        {
          id: "d5",
          name: "Miguel Torres",
          photo: "https://randomuser.me/api/portraits/men/53.jpg",
          phone: "+34 656 789 012",
          email: "miguel.torres@email.com",
          documentId: "45678901B",
          licenseNumber: "L-456789012",
          licenseExpiry: "2026-09-30",
          type: "company",
          companyName: "Executive Cars SL",
          experience: 9,
          rating: 4.6,
          available: true,
          assignedVehicles: ["5"],
          languages: ["Español", "Inglés", "Portugués"],
          specialty: "Bodas y eventos especiales",
          status: "pending",
          country: "España",
          city: "Sevilla"
        }]
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener un chófer específico
  const fetchDriverDetails = async (driverId: string) => {
    try {
      setLoading(true);

      const response = await axios.get(
        `/api/admin/drivers/${driverId}`,
        getAuthHeaders()
      );

      if (response.data && response.data.driver) {
        return response.data.driver;
      }

      return null;
    } catch (error) {
      console.error(`Error al cargar detalles del chófer ${driverId}:`, error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los detalles del chófer",
        variant: "destructive"
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Función para crear un nuevo chófer
  const createDriver = async (driverData: Partial<Driver>) => {
    try {
      setLoading(true);

      const response = await axios.post(
        "/api/admin/drivers/create",
        driverData,
        getAuthHeaders()
      );

      if (response.status === 201) {
        toast({
          title: "Éxito",
          description: "Chófer creado correctamente"
        });

        // Actualizar lista de chóferes
        fetchDrivers();
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error al crear chófer:", error);
      toast({
        title: "Error",
        description: "No se pudo crear el chófer",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Función para actualizar un chófer existente
  const updateDriver = async (
  driverId: string,
  driverData: Partial<Driver>) =>
  {
    try {
      setLoading(true);

      // Asegurar que los campos numéricos sean del tipo correcto
      const preparedData = {
        ...driverData,
        rating:
        typeof driverData.rating === "string" ?
        parseFloat(driverData.rating) :
        driverData.rating,
        experience:
        typeof driverData.experience === "string" ?
        parseInt(driverData.experience as string, 10) :
        driverData.experience
      };

      const response = await axios.put(
        `/api/admin/drivers/${driverId}/update`,
        preparedData,
        getAuthHeaders()
      );

      if (response.status === 200) {
        toast({
          title: "Éxito",
          description: "Chófer actualizado correctamente"
        });

        // Actualizar lista de chóferes
        fetchDrivers();
        return true;
      }

      return false;
    } catch (error) {
      console.error(`Error al actualizar chófer ${driverId}:`, error);
      // Si los datos se actualizaron pero hubo un error de servidor posterior,
      // evitamos mostrar un error al usuario si no es necesario
      if ((error as any).response?.status === 500) {
        console.log(
          "Posible error en el servidor, pero los datos pueden haberse actualizado correctamente"
        );

        // Verificar si los datos se actualizaron a pesar del error
        await fetchDrivers();

        toast({
          title: "Advertencia",
          description:
          "Posible error en el servidor, pero los datos podrían haberse actualizado correctamente",
          variant: "default"
        });
        return true;
      } else {
        toast({
          title: "Error",
          description: "No se pudo actualizar el chófer",
          variant: "destructive"
        });
        return false;
      }
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar un chófer
  const deleteDriver = async (driverId: string) => {
    try {
      setLoading(true);

      const response = await axios.delete(
        `/api/admin/drivers/${driverId}/delete`,
        getAuthHeaders()
      );

      if (response.status === 200) {
        toast({
          title: "Éxito",
          description: "Chófer eliminado correctamente"
        });

        // Actualizar lista de chóferes
        fetchDrivers();
        return true;
      }

      return false;
    } catch (error) {
      console.error(`Error al eliminar chófer ${driverId}:`, error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el chófer",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Funciones para la gestión de chóferes
  const handleAddDriver = () => {
    setEditingDriver(null);
    setShowDriverForm(true);
  };

  /*
  const handleEditDriver = (driver: Driver) => {
    setEditingDriver(driver);
    setShowDriverForm(true);
  };
  */

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDriverSubmit = async (driverData: any) => {
    if (editingDriver) {
      // Actualizar un chófer existente
      const success = await updateDriver(editingDriver.id, driverData);
      if (success) {
        setDrivers((prev) =>
        prev.map((d) =>
        d.id === editingDriver.id ? { ...driverData, id: d.id } : d
        )
        );
      }
    } else {
      // Crear un nuevo chófer
      const success = await createDriver(driverData);
      if (success) {


        // No es necesario hacer nada ya que fetchDrivers() actualizará la lista
      }}setShowDriverForm(false);
    setEditingDriver(null);
  };

  const handleDeleteDriver = (driverId: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setSelectedDriverId(driverId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedDriverId) {
      await deleteDriver(selectedDriverId);
      setDeleteDialogOpen(false);
      setSelectedDriverId(null);
    }
  };

  const handleViewDriverDetails = async (driver: Driver) => {
    // Intentar obtener detalles actualizados del chófer
    const driverDetails = await fetchDriverDetails(driver.id);
    setSelectedDriverDetails(driverDetails || driver);
    setIsDriverDetailsViewOpen(true);
  };

  const handleCloseDriverDetails = () => {
    setIsDriverDetailsViewOpen(false);
    setSelectedDriverDetails(null);
    setEditingDriver(null);
  };

  // Manejar actualización desde la vista detallada
  const handleUpdateDriver = async (updatedDriver: Driver) => {
    await updateDriver(updatedDriver.id, updatedDriver);
    fetchDrivers();
  };

  // Filtrar drivers
  const filteredDrivers = drivers.filter((driver) => {
    // Filtrar por búsqueda
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
    !searchQuery.trim() ||
    driver.name.toLowerCase().includes(searchLower) ||
    driver.email.toLowerCase().includes(searchLower) ||
    driver.phone.toLowerCase().includes(searchLower) ||
    driver.companyName &&
    driver.companyName.toLowerCase().includes(searchLower);

    // Filtrar por estado
    const matchesStatus =
    statusFilter === "all" || driver.status === statusFilter;

    // Filtrar por ubicación
    const matchesLocation =
    locationFilter === "all" ||
    driver.city.toLowerCase() === locationFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesLocation;
  });

  // Obtener ubicaciones únicas para filtro
  const uniqueLocations = Array.from(new Set(drivers.map((d) => d.city)));

  // Renderizar la vista detallada del chófer
  if (isDriverDetailsViewOpen && selectedDriverDetails) {
    return (
      <DriverDetailsView
        driver={selectedDriverDetails}
        onClose={handleCloseDriverDetails}
        onSave={handleUpdateDriver}
        data-oid="n-ge5ta" />);


  }

  if (loading) {
    return (
      <div
        className="flex flex-col items-center justify-center h-[70vh]"
        data-oid=".lzo-w1">

        <Loader2
          className="h-12 w-12 text-black animate-spin mb-4"
          data-oid="o6pj-q7" />

        <h2 className="text-xl font-medium text-gray-600" data-oid="uq6owo1">
          Cargando chóferes...
        </h2>
      </div>);

  }

  if (error) {
    return (
      <div
        className="flex flex-col items-center justify-center h-[70vh]"
        data-oid="a_qjh_g">

        <AlertTriangle
          className="h-12 w-12 text-black mb-4"
          data-oid="kk193r6" />

        <h2 className="text-xl font-medium text-gray-600" data-oid="68rr.9l">
          {error}
        </h2>
        <Button
          onClick={fetchDrivers}
          className="mt-4 bg-black hover:bg-gray-800 text-white"
          data-oid=".8kofcn">

          Reintentar
        </Button>
      </div>);

  }

  return (
    <div className="space-y-6" data-oid="7lhnf:n">
      <div className="flex justify-between items-center" data-oid="hpv:dpk">
        <h1 className="text-2xl font-bold text-gray-800" data-oid="bkotl_w">
          Gestión de Chóferes
        </h1>
        {!showDriverForm &&
        <Button
          onClick={handleAddDriver}
          className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          data-oid="w_yt5io">

            <PlusCircle size={18} className="mr-2" data-oid="j5pa6jz" />
            Añadir Chófer
          </Button>
        }
      </div>

      {showDriverForm ?
      <form className="bg-white rounded-lg shadow-md" data-oid="n76:hh.">
          <div className="p-6 border-b border-gray-200" data-oid="okqv8zy">
            <h2 className="text-xl font-semibold" data-oid=".k0tej8">
              {editingDriver ? "Editar Chófer" : "Nuevo Chófer"}
            </h2>
            <p className="text-sm text-gray-500 mt-1" data-oid="fptkbtz">
              {editingDriver ?
            "Modifique los datos del chófer seleccionado" :
            "Complete el formulario para añadir un nuevo chófer al sistema"}
            </p>
          </div>

          <div className="p-6" data-oid="usvu.ya">
            <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            data-oid="_g:6q8e">

              {/* Información Personal */}
              <div className="space-y-4" data-oid="p9vl98s">
                <h3
                className="text-lg font-medium flex items-center"
                data-oid="t9yadbm">

                  <UserCircle className="mr-2 h-5 w-5" data-oid="kc.ywba" />
                  Información Personal
                </h3>

                <div className="space-y-3" data-oid="g6anzq2">
                  <div data-oid="q:zp-5a">
                    <Label htmlFor="name" data-oid="ffb6bdv">
                      Nombre completo
                    </Label>
                    <Input
                    id="name"
                    name="name"
                    defaultValue={editingDriver?.name || ""}
                    data-oid="0x:fv_g" />

                  </div>

                  <div data-oid="aaqtc9d">
                    <Label htmlFor="email" data-oid="dgqp:tc">
                      Email
                    </Label>
                    <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={editingDriver?.email || ""}
                    data-oid="wr9i74m" />

                  </div>

                  <div data-oid="np43ke2">
                    <Label htmlFor="phone" data-oid="p2hd0zy">
                      Teléfono
                    </Label>
                    <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    defaultValue={editingDriver?.phone || ""}
                    data-oid="4tqcxij" />

                  </div>

                  <div className="pt-2" data-oid="xxcq794">
                    <Label className="mb-2 block" data-oid="a8aoxdi">
                      Foto del Chófer
                    </Label>
                    <div
                    className="border border-dashed border-gray-300 rounded-lg p-4 text-center"
                    data-oid="hih8hw7">

                      {imagePreview ?
                    <div className="relative" data-oid="5gi2da_">
                          <img
                        src={imagePreview}
                        alt="Vista previa"
                        className="mx-auto h-32 w-32 rounded-full object-cover"
                        data-oid="sqj4ycm" />


                          <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                        }}
                        className="absolute -top-2 -right-2 bg-gray-200 text-gray-600 rounded-full p-1"
                        data-oid="r5-pz6x">

                            <X size={16} data-oid="wk.e0:2" />
                          </button>
                        </div> :

                    <div data-oid="gtl861l">
                          <div
                        className="mx-auto h-32 w-32 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center mb-2"
                        data-oid="ple281t">

                            <UserCircle
                          className="h-16 w-16"
                          data-oid="f75njft" />

                          </div>
                          <label
                        htmlFor="photo-upload"
                        className="cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 inline-block"
                        data-oid="kjv33p1">

                            Subir foto
                          </label>
                          <input
                        id="photo-upload"
                        name="photo"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleImageUpload}
                        data-oid="uoa7qtn" />


                          <p
                        className="mt-2 text-xs text-gray-500"
                        data-oid="1.kfmcj">

                            PNG, JPG, WEBP hasta 5MB
                          </p>
                        </div>
                    }
                    </div>
                  </div>

                  <div data-oid="hgcaghn">
                    <Label htmlFor="type" data-oid="kkehp18">
                      Tipo
                    </Label>
                    <Select
                    defaultValue={editingDriver?.type || "private"}
                    data-oid="9zr4ql.">

                      <SelectTrigger id="type" name="type" data-oid="oz49u8g">
                        <SelectValue
                        placeholder="Seleccionar tipo"
                        data-oid="z:f0iqm" />

                      </SelectTrigger>
                      <SelectContent data-oid="6z8_ybw">
                        <SelectItem value="private" data-oid="cotiw73">
                          Chófer Privado
                        </SelectItem>
                        <SelectItem value="company" data-oid="nj6llgx">
                          Pertenece a Empresa
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div data-oid="bm2dzmt">
                    <Label htmlFor="companyName" data-oid="1sd:u5c">
                      Empresa (si aplica)
                    </Label>
                    <Input
                    id="companyName"
                    name="companyName"
                    defaultValue={editingDriver?.companyName || ""}
                    data-oid="utx5e-7" />

                  </div>
                </div>
              </div>

              {/* Información Profesional */}
              <div className="space-y-4" data-oid="mvtjhki">
                <h3
                className="text-lg font-medium flex items-center"
                data-oid="wsevlm6">

                  <FileText className="mr-2 h-5 w-5" data-oid="urz1zkj" />
                  Información Profesional
                </h3>

                <div className="space-y-3" data-oid="pi42.mh">
                  <div data-oid="sq4x:.u">
                    <Label htmlFor="documentId" data-oid="kgz66n5">
                      Documento ID
                    </Label>
                    <Input
                    id="documentId"
                    name="documentId"
                    defaultValue={editingDriver?.documentId || ""}
                    data-oid="ap7-z89" />

                  </div>

                  <div data-oid="zln1ubh">
                    <Label htmlFor="licenseNumber" data-oid="kapc90x">
                      Número de licencia
                    </Label>
                    <Input
                    id="licenseNumber"
                    name="licenseNumber"
                    defaultValue={editingDriver?.licenseNumber || ""}
                    data-oid="_f0g3c7" />

                  </div>

                  <div data-oid="9qifpoa">
                    <Label htmlFor="licenseExpiry" data-oid="kw4l_86">
                      Fecha expiración licencia
                    </Label>
                    <Input
                    id="licenseExpiry"
                    name="licenseExpiry"
                    type="date"
                    defaultValue={editingDriver?.licenseExpiry || ""}
                    data-oid="cr37ej0" />

                  </div>

                  <div data-oid="wy70h8f">
                    <Label htmlFor="experience" data-oid="_abu3b1">
                      Años de experiencia
                    </Label>
                    <Input
                    id="experience"
                    name="experience"
                    type="number"
                    defaultValue={editingDriver?.experience || ""}
                    min="0"
                    data-oid="kjnvfx_" />

                  </div>

                  <div data-oid="748zg0.">
                    <Label htmlFor="languages" data-oid="-ilcvjp">
                      Idiomas
                    </Label>
                    <Input
                    id="languages"
                    name="languages"
                    defaultValue={editingDriver?.languages?.join(", ") || ""}
                    placeholder="Español, Inglés, Francés..."
                    data-oid="1lqgkyb" />

                  </div>

                  <div data-oid="kmdem__">
                    <Label htmlFor="specialty" data-oid="qx39u.l">
                      Especialidad
                    </Label>
                    <Input
                    id="specialty"
                    name="specialty"
                    defaultValue={editingDriver?.specialty || ""}
                    placeholder="Eventos VIP, Traslados aeropuerto..."
                    data-oid="xhabi71" />

                  </div>
                </div>
              </div>

              {/* Ubicación y Estado */}
              <div className="space-y-4" data-oid="go08.x0">
                <h3
                className="text-lg font-medium flex items-center"
                data-oid="9m0p_vn">

                  <MapPin className="mr-2 h-5 w-5" data-oid="mp3j9s3" />
                  Ubicación y Estado
                </h3>

                <div className="space-y-3" data-oid="g7u9yrf">
                  <div data-oid="dc:6a:u">
                    <Label htmlFor="country" data-oid="nbt32id">
                      País
                    </Label>
                    <Input
                    id="country"
                    name="country"
                    defaultValue={editingDriver?.country || ""}
                    data-oid="p8z-9qh" />

                  </div>

                  <div data-oid="3yg7211">
                    <Label htmlFor="city" data-oid="bk14._j">
                      Ciudad
                    </Label>
                    <Input
                    id="city"
                    name="city"
                    defaultValue={editingDriver?.city || ""}
                    data-oid="gfv0p6c" />

                  </div>

                  <div data-oid="4gncoom">
                    <Label htmlFor="address" data-oid="snu9eug">
                      Dirección
                    </Label>
                    <Input
                    id="address"
                    name="address"
                    defaultValue={editingDriver?.address || ""}
                    data-oid="_dhehvh" />

                  </div>

                  <div data-oid="husudap">
                    <Label htmlFor="status" data-oid="x4me9e2">
                      Estado
                    </Label>
                    <Select
                    defaultValue={editingDriver?.status || "active"}
                    data-oid="xurq3yr">

                      <SelectTrigger
                      id="status"
                      name="status"
                      data-oid=":sxj._z">

                        <SelectValue
                        placeholder="Seleccionar estado"
                        data-oid="we5ay40" />

                      </SelectTrigger>
                      <SelectContent data-oid="nnqwyw:">
                        <SelectItem value="active" data-oid="3:gzfny">
                          Activo
                        </SelectItem>
                        <SelectItem value="inactive" data-oid="1l0lucr">
                          Inactivo
                        </SelectItem>
                        <SelectItem value="pending" data-oid="vtdjuhb">
                          Pendiente
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-3" data-oid="i4rn_rq">
                    <Label htmlFor="notes" data-oid=":bhz7ht">
                      Notas adicionales
                    </Label>
                    <Textarea
                    id="notes"
                    name="notes"
                    className="resize-none h-[105px]"
                    defaultValue={editingDriver?.notes || ""}
                    data-oid="w4j436e" />

                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
          className="flex justify-end p-6 border-t border-gray-200 bg-gray-50"
          data-oid="a:d6n74">

            <div className="flex space-x-3" data-oid="z_apnm3">
              <Button
              type="button"
              onClick={() => {
                setShowDriverForm(false);
                setEditingDriver(null);
              }}
              variant="outline"
              data-oid=".e7yi4g">

                Cancelar
              </Button>
              <Button
              type="button"
              onClick={() => {
                // Obtener todos los datos del formulario
                const form = document.querySelector(
                  "form"
                ) as HTMLFormElement;
                const formElements = form?.elements;

                if (!formElements) {
                  return;
                }

                // Recoger datos del formulario
                const driverData: Partial<Driver> = {
                  name:
                  (formElements.namedItem("name") as HTMLInputElement)?.
                  value || "",
                  email:
                  (formElements.namedItem("email") as HTMLInputElement)?.
                  value || "",
                  phone:
                  (formElements.namedItem("phone") as HTMLInputElement)?.
                  value || "",
                  documentId:
                  (formElements.namedItem("documentId") as HTMLInputElement)?.
                  value || "",
                  licenseNumber:
                  (
                  formElements.namedItem(
                    "licenseNumber"
                  ) as HTMLInputElement)?.
                  value || "",
                  licenseExpiry:
                  (
                  formElements.namedItem(
                    "licenseExpiry"
                  ) as HTMLInputElement)?.
                  value || "",
                  type: (formElements.namedItem("type") as HTMLSelectElement)?.
                  value as "private" | "company",
                  companyName:
                  (
                  formElements.namedItem(
                    "companyName"
                  ) as HTMLInputElement)?.
                  value || "",
                  experience: parseInt(
                    (formElements.namedItem("experience") as HTMLInputElement)?.
                    value || "0"
                  ),
                  languages:
                  (
                  formElements.namedItem("languages") as HTMLInputElement)?.
                  value.
                  split(",").
                  map((lang) => lang.trim()) || [],
                  country:
                  (formElements.namedItem("country") as HTMLInputElement)?.
                  value || "",
                  city:
                  (formElements.namedItem("city") as HTMLInputElement)?.
                  value || "",
                  address:
                  (formElements.namedItem("address") as HTMLInputElement)?.
                  value || "",
                  specialty:
                  (formElements.namedItem("specialty") as HTMLInputElement)?.
                  value || "",
                  status: (
                  formElements.namedItem("status") as HTMLSelectElement)?.
                  value as "active" | "inactive" | "pending",
                  photo: imagePreview || "",
                  notes:
                  (formElements.namedItem("notes") as HTMLTextAreaElement)?.
                  value || ""
                };

                // Enviar datos al backend
                handleDriverSubmit(driverData);
              }}
              className="bg-black hover:bg-gray-800"
              data-oid="0au9u72">

                {editingDriver ? "Actualizar" : "Crear"} Chófer
              </Button>
            </div>
          </div>
        </form> :

      <div
        className="bg-white rounded-lg shadow-md overflow-hidden"
        data-oid="btksfm8">

          <div
          className="p-4 sm:p-6 flex justify-between items-center border-b"
          data-oid="5:q1bce">

            <div className="relative" data-oid="gyny1ul">
              <input
              type="text"
              placeholder="Buscar chóferes..."
              className="pl-10 pr-4 py-2 border rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-oid="mc8rvgd" />


              <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
              data-oid="y5dsz0h" />

            </div>
            <div className="flex space-x-3" data-oid="yrrl839">
              <select
              className="px-3 py-2 border rounded-lg"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              data-oid="t0q.mn6">

                <option value="all" data-oid="if7d6gw">
                  Todos los estados
                </option>
                <option value="active" data-oid="k8fmytg">
                  Activos
                </option>
                <option value="inactive" data-oid="_2fi8.0">
                  Inactivos
                </option>
                <option value="pending" data-oid="cv876ir">
                  Pendientes
                </option>
              </select>
              <select
              className="px-3 py-2 border rounded-lg"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              data-oid="kld8cph">

                <option value="all" data-oid="5ifmzui">
                  Todas las ubicaciones
                </option>
                {uniqueLocations.map((location) =>
              <option key={location} value={location} data-oid="k0xxs.q">
                    {location}
                  </option>
              )}
              </select>
            </div>
          </div>
          <div className="overflow-x-auto" data-oid="0rnogz1">
            <table
            className="min-w-full divide-y divide-gray-200"
            data-oid=":si126.">

              <thead className="bg-gray-50" data-oid="rub5mnc">
                <tr data-oid="ny2o3v_">
                  <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  data-oid="70inqt1">

                    Chófer
                  </th>
                  <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  data-oid="aio1i6.">

                    Contacto
                  </th>
                  <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  data-oid="rpfgui1">

                    Ubicación
                  </th>
                  <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  data-oid="ol1lb-.">

                    Estado
                  </th>
                  <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  data-oid="m5xi4xh">

                    Experiencia/Rating
                  </th>
                  <th
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  data-oid="hbq:kw1">

                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody
              className="bg-white divide-y divide-gray-200"
              data-oid=".86z1_v">

                {filteredDrivers.map((driver) =>
              <tr
                key={driver.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => handleViewDriverDetails(driver)}
                data-oid="vmj8-nc">

                    <td
                  className="px-6 py-4 whitespace-nowrap"
                  data-oid="b6zsk7w">

                      <div className="flex items-center" data-oid="pioo-vs">
                        <div
                      className="flex-shrink-0 h-10 w-10"
                      data-oid="x_sua1:">

                          {driver.photo ?
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={driver.photo}
                        alt={driver.name}
                        onError={(e) => {
                          const target =
                          e.currentTarget as HTMLImageElement;
                          target.style.display = "none";
                          const parent =
                          target.parentElement as HTMLDivElement;
                          const fallback = parent.querySelector(
                            ".fallback-avatar"
                          ) as HTMLDivElement;
                          fallback.style.display = "flex";
                        }}
                        data-oid="cld21jq" /> :


                      <div
                        className="h-10 w-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-medium"
                        data-oid="1j60xzg">

                              {driver.name.charAt(0).toUpperCase()}
                            </div>
                      }
                          <div
                        className="fallback-avatar h-10 w-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-medium"
                        style={{ display: "none" }}
                        data-oid="im3xh0b">

                            {driver.name.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div className="ml-4" data-oid="j_jy:9s">
                          <div
                        className="text-sm font-medium text-gray-900"
                        data-oid="i3g63v3">

                            {driver.name}
                          </div>
                          <div
                        className="text-sm text-gray-500"
                        data-oid="p0ac279">

                            {driver.type === "private" ?
                        "Particular" :
                        "Empresa"}
                            {driver.companyName && ` (${driver.companyName})`}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                  className="px-6 py-4 whitespace-nowrap"
                  data-oid="cwvqkuw">

                      <div className="text-sm text-gray-900" data-oid="_jamtfv">
                        {driver.phone}
                      </div>
                      <div className="text-sm text-gray-500" data-oid="zewvq3m">
                        {driver.email}
                      </div>
                    </td>
                    <td
                  className="px-6 py-4 whitespace-nowrap"
                  data-oid="n4r9oj5">

                      <div className="text-sm text-gray-900" data-oid="69olpin">
                        {driver.city}
                      </div>
                      <div className="text-sm text-gray-500" data-oid="vy2w48z">
                        {driver.country}
                      </div>
                    </td>
                    <td
                  className="px-6 py-4 whitespace-nowrap"
                  data-oid="d5_g5v5">

                      <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    driver.status === "active" ?
                    "bg-gray-200 text-green-800" :
                    driver.status === "inactive" ?
                    "bg-gray-100 text-gray-800" :
                    "bg-gray-200 text-yellow-800"}`
                    }
                    data-oid=".9vntzr">

                        {driver.status === "active" ?
                    "Activo" :
                    driver.status === "inactive" ?
                    "Inactivo" :
                    "Pendiente"}
                      </span>
                      <div
                    className="text-sm text-gray-500 mt-1"
                    data-oid="fo5ojxv">

                        {driver.available ? "Disponible" : "No disponible"}
                      </div>
                    </td>
                    <td
                  className="px-6 py-4 whitespace-nowrap"
                  data-oid="bymqh3g">

                      <div className="text-sm text-gray-900" data-oid="mbg67hm">
                        {driver.experience} años
                      </div>
                      <div className="flex text-amber-500" data-oid="d2b3phk">
                        {[...Array(5)].map((_, i) =>
                    <span
                      key={i}
                      className={
                      i < Math.round(driver.rating) ?
                      "" :
                      "text-gray-300"
                      }
                      data-oid="0vjt75b">

                            ★
                          </span>
                    )}
                        <span className="ml-1 text-gray-500" data-oid="o7jv4h4">
                          ({driver.rating.toFixed(1)})
                        </span>
                      </div>
                    </td>
                    <td
                  className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                  data-oid="qb4tos5">

                      <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => handleDeleteDriver(driver.id, e)}
                    className="text-gray-600 border-gray-200 hover:bg-gray-100"
                    data-oid="lz:5evh">

                        <Trash2 size={16} data-oid="v9_so_:" />
                      </Button>
                    </td>
                  </tr>
              )}
              </tbody>
            </table>

            {filteredDrivers.length === 0 &&
          <div className="py-10 text-center" data-oid="2v22q39">
                <AlertTriangle
              className="h-8 w-8 text-amber-500 mx-auto mb-2"
              data-oid="dp48ltz" />

                <p className="text-gray-500" data-oid="65-:sbc">
                  No se encontraron chóferes que coincidan con los criterios de
                  búsqueda
                </p>
              </div>
          }
          </div>
        </div>
      }

      {/* Diálogo de confirmación para eliminar */}
      <CustomAlertDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        title="¿Estás seguro?"
        description="Esta acción eliminará permanentemente al chófer. Esta acción no se puede deshacer."
        data-oid="hxd06yb" />

    </div>);

};

export default DriversSection;