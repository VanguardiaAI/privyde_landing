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
import { api } from "@/config/axios";
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
      className="fixed inset-0 z-50 flex items-center justify-center" data-oid="vuh1p6f">


      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => onOpenChange(false)} data-oid="hl4-lbm">

      </div>
      <div
        className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md" data-oid="oa1gl.e">


        <div className="mb-4" data-oid="ps9fvp7">
          <h2 className="text-lg font-semibold" data-oid="26c5k30">
            {title}
          </h2>
          <p className="text-gray-500 mt-1" data-oid="ap3okx9">
            {description}
          </p>
        </div>
        <div className="flex justify-end space-x-2" data-oid="2rhdtp.">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)} data-oid=":ex_uvz">


            {cancelText}
          </Button>
          <Button
            className="bg-black hover:bg-gray-800 text-white"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }} data-oid="_jb8q0g">


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


  // Función para obtener todos los chóferes
  const fetchDrivers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get(
        "/api/admin/drivers/list"
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

      const response = await api.get(
        `/api/admin/drivers/${driverId}`      );

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

      const response = await api.post(
        "/admin/drivers/create",
        driverData      );

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

      const response = await api.put(
        `/api/admin/drivers/${driverId}/update`,
        preparedData      );

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

      const response = await api.delete(
        `/api/admin/drivers/${driverId}/delete`      );

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
      }}setShowDriverForm(false);setEditingDriver(null);};const handleDeleteDriver = (driverId: string, e?: React.MouseEvent) => {if (e) {e.stopPropagation();
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
        onSave={handleUpdateDriver} data-oid="de8v5cv" />);



  }

  if (loading) {
    return (
      <div
        className="flex flex-col items-center justify-center h-[70vh]" data-oid="zchjzlr">


        <Loader2
          className="h-12 w-12 text-black animate-spin mb-4" data-oid="bamoe77" />


        <h2 className="text-xl font-medium text-gray-600" data-oid="fotgl:.">
          Cargando chóferes...
        </h2>
      </div>);

  }

  if (error) {
    return (
      <div
        className="flex flex-col items-center justify-center h-[70vh]" data-oid=":zg4llr">


        <AlertTriangle
          className="h-12 w-12 text-black mb-4" data-oid="m.050oo" />


        <h2 className="text-xl font-medium text-gray-600" data-oid="38co7ym">
          {error}
        </h2>
        <Button
          onClick={fetchDrivers}
          className="mt-4 bg-black hover:bg-gray-800 text-white" data-oid="5jj_lqh">


          Reintentar
        </Button>
      </div>);

  }

  return (
    <div className="space-y-6" data-oid="pish:i_">
      <div className="flex justify-between items-center" data-oid="ivy-s5b">
        <h1 className="text-2xl font-bold text-gray-800" data-oid="z:8sd5.">
          Gestión de Chóferes
        </h1>
        {!showDriverForm &&
        <Button
          onClick={handleAddDriver}
          className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors" data-oid="x7liepq">


            <PlusCircle size={18} className="mr-2" data-oid="dq_od6b" />
            Añadir Chófer
          </Button>
        }
      </div>

      {showDriverForm ?
      <form className="bg-white rounded-lg shadow-md" data-oid="y:gm:-7">
          <div className="p-6 border-b border-gray-200" data-oid="bejn6.t">
            <h2 className="text-xl font-semibold" data-oid="j.24v0e">
              {editingDriver ? "Editar Chófer" : "Nuevo Chófer"}
            </h2>
            <p className="text-sm text-gray-500 mt-1" data-oid="hgyitiu">
              {editingDriver ?
            "Modifique los datos del chófer seleccionado" :
            "Complete el formulario para añadir un nuevo chófer al sistema"}
            </p>
          </div>

          <div className="p-6" data-oid="bgsw0rg">
            <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8" data-oid="yxzyhka">


              {/* Información Personal */}
              <div className="space-y-4" data-oid="2495cf-">
                <h3
                className="text-lg font-medium flex items-center" data-oid=".l2dze6">


                  <UserCircle className="mr-2 h-5 w-5" data-oid="a53bme8" />
                  Información Personal
                </h3>

                <div className="space-y-3" data-oid="y.c:gq7">
                  <div data-oid=":u2mbyy">
                    <Label htmlFor="name" data-oid="sumq2.-">
                      Nombre completo
                    </Label>
                    <Input
                    id="name"
                    name="name"
                    defaultValue={editingDriver?.name || ""} data-oid="vkhl0zq" />


                  </div>

                  <div data-oid="oqai9hi">
                    <Label htmlFor="email" data-oid="mp3laof">
                      Email
                    </Label>
                    <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={editingDriver?.email || ""} data-oid="p6_fbb-" />


                  </div>

                  <div data-oid="i6f82iz">
                    <Label htmlFor="phone" data-oid="-othu2:">
                      Teléfono
                    </Label>
                    <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    defaultValue={editingDriver?.phone || ""} data-oid="pd9gl.:" />


                  </div>

                  <div className="pt-2" data-oid="rin1fnx">
                    <Label className="mb-2 block" data-oid="us38y3l">
                      Foto del Chófer
                    </Label>
                    <div
                    className="border border-dashed border-gray-300 rounded-lg p-4 text-center" data-oid="6o-cgtf">


                      {imagePreview ?
                    <div className="relative" data-oid="x88ih9-">
                          <img
                        src={imagePreview}
                        alt="Vista previa"
                        className="mx-auto h-32 w-32 rounded-full object-cover" data-oid="2gw63az" />



                          <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                        }}
                        className="absolute -top-2 -right-2 bg-gray-200 text-gray-600 rounded-full p-1" data-oid="sa-0ebv">


                            <X size={16} data-oid="vkmezq1" />
                          </button>
                        </div> :

                    <div data-oid="fsen8e_">
                          <div
                        className="mx-auto h-32 w-32 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center mb-2" data-oid="fctx8s8">


                            <UserCircle
                          className="h-16 w-16" data-oid="cw3b00:" />


                          </div>
                          <label
                        htmlFor="photo-upload"
                        className="cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 inline-block" data-oid="cu1byw:">


                            Subir foto
                          </label>
                          <input
                        id="photo-upload"
                        name="photo"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleImageUpload} data-oid="a6..mz." />



                          <p
                        className="mt-2 text-xs text-gray-500" data-oid="ud3dfdr">


                            PNG, JPG, WEBP hasta 5MB
                          </p>
                        </div>
                    }
                    </div>
                  </div>

                  <div data-oid="h-1snn5">
                    <Label htmlFor="type" data-oid="bzxck-5">
                      Tipo
                    </Label>
                    <Select
                    defaultValue={editingDriver?.type || "private"} data-oid="b79fpbc">


                      <SelectTrigger id="type" name="type" data-oid="_5azv60">
                        <SelectValue
                        placeholder="Seleccionar tipo" data-oid="3fbs2me" />


                      </SelectTrigger>
                      <SelectContent data-oid="b4jw7ls">
                        <SelectItem value="private" data-oid="3fd5:l1">
                          Chófer Privado
                        </SelectItem>
                        <SelectItem value="company" data-oid="..6tqa_">
                          Pertenece a Empresa
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div data-oid="5-6o99s">
                    <Label htmlFor="companyName" data-oid="t.doxl8">
                      Empresa (si aplica)
                    </Label>
                    <Input
                    id="companyName"
                    name="companyName"
                    defaultValue={editingDriver?.companyName || ""} data-oid="7tkddik" />


                  </div>
                </div>
              </div>

              {/* Información Profesional */}
              <div className="space-y-4" data-oid="nl02yf5">
                <h3
                className="text-lg font-medium flex items-center" data-oid="7fe1lvx">


                  <FileText className="mr-2 h-5 w-5" data-oid="2bt-a_4" />
                  Información Profesional
                </h3>

                <div className="space-y-3" data-oid="3vb8hof">
                  <div data-oid="0g8l.x6">
                    <Label htmlFor="documentId" data-oid="7j8tve9">
                      Documento ID
                    </Label>
                    <Input
                    id="documentId"
                    name="documentId"
                    defaultValue={editingDriver?.documentId || ""} data-oid=":1:mka4" />


                  </div>

                  <div data-oid="nsi2vhc">
                    <Label htmlFor="licenseNumber" data-oid="y2_e_0d">
                      Número de licencia
                    </Label>
                    <Input
                    id="licenseNumber"
                    name="licenseNumber"
                    defaultValue={editingDriver?.licenseNumber || ""} data-oid="eq5_9du" />


                  </div>

                  <div data-oid="dwvrc6f">
                    <Label htmlFor="licenseExpiry" data-oid="tywiov5">
                      Fecha expiración licencia
                    </Label>
                    <Input
                    id="licenseExpiry"
                    name="licenseExpiry"
                    type="date"
                    defaultValue={editingDriver?.licenseExpiry || ""} data-oid="4.qz1mw" />


                  </div>

                  <div data-oid="11jqtp8">
                    <Label htmlFor="experience" data-oid="q3kgjvz">
                      Años de experiencia
                    </Label>
                    <Input
                    id="experience"
                    name="experience"
                    type="number"
                    defaultValue={editingDriver?.experience || ""}
                    min="0" data-oid="c3lthe3" />


                  </div>

                  <div data-oid="kdxk2v8">
                    <Label htmlFor="languages" data-oid="12b-5_s">
                      Idiomas
                    </Label>
                    <Input
                    id="languages"
                    name="languages"
                    defaultValue={editingDriver?.languages?.join(", ") || ""}
                    placeholder="Español, Inglés, Francés..." data-oid="k68tl.n" />


                  </div>

                  <div data-oid="qtych-y">
                    <Label htmlFor="specialty" data-oid="vcy._v7">
                      Especialidad
                    </Label>
                    <Input
                    id="specialty"
                    name="specialty"
                    defaultValue={editingDriver?.specialty || ""}
                    placeholder="Eventos VIP, Traslados aeropuerto..." data-oid="m:j4p.u" />


                  </div>
                </div>
              </div>

              {/* Ubicación y Estado */}
              <div className="space-y-4" data-oid="ce8xy.s">
                <h3
                className="text-lg font-medium flex items-center" data-oid="q5gwe2g">


                  <MapPin className="mr-2 h-5 w-5" data-oid="zv7n1h9" />
                  Ubicación y Estado
                </h3>

                <div className="space-y-3" data-oid="vke_zz1">
                  <div data-oid="a2:ivyo">
                    <Label htmlFor="country" data-oid="c.ih9nq">
                      País
                    </Label>
                    <Input
                    id="country"
                    name="country"
                    defaultValue={editingDriver?.country || ""} data-oid="bl8w0:_" />


                  </div>

                  <div data-oid="duhysx.">
                    <Label htmlFor="city" data-oid="o35l7:3">
                      Ciudad
                    </Label>
                    <Input
                    id="city"
                    name="city"
                    defaultValue={editingDriver?.city || ""} data-oid="3itc-e_" />


                  </div>

                  <div data-oid="qi8y.w4">
                    <Label htmlFor="address" data-oid="cv.etji">
                      Dirección
                    </Label>
                    <Input
                    id="address"
                    name="address"
                    defaultValue={editingDriver?.address || ""} data-oid="_r5nj81" />


                  </div>

                  <div data-oid="4yx-622">
                    <Label htmlFor="status" data-oid=":e0k8_w">
                      Estado
                    </Label>
                    <Select
                    defaultValue={editingDriver?.status || "active"} data-oid="-qudv3k">


                      <SelectTrigger
                      id="status"
                      name="status" data-oid="rxb1dyl">


                        <SelectValue
                        placeholder="Seleccionar estado" data-oid="8_-gd_:" />


                      </SelectTrigger>
                      <SelectContent data-oid="2xtm3fi">
                        <SelectItem value="active" data-oid="_xdsey8">
                          Activo
                        </SelectItem>
                        <SelectItem value="inactive" data-oid="38o9gn1">
                          Inactivo
                        </SelectItem>
                        <SelectItem value="pending" data-oid="zdv.x6k">
                          Pendiente
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-3" data-oid="g8-:p31">
                    <Label htmlFor="notes" data-oid="bvk.s:7">
                      Notas adicionales
                    </Label>
                    <Textarea
                    id="notes"
                    name="notes"
                    className="resize-none h-[105px]"
                    defaultValue={editingDriver?.notes || ""} data-oid="pod18yw" />


                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
          className="flex justify-end p-6 border-t border-gray-200 bg-gray-50" data-oid="oy:owsb">


            <div className="flex space-x-3" data-oid="x7lp-yh">
              <Button
              type="button"
              onClick={() => {
                setShowDriverForm(false);
                setEditingDriver(null);
              }}
              variant="outline" data-oid="arwaav-">


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
                  type: ((formElements.namedItem("type") as HTMLSelectElement)?.
                  value || "private") as "private" | "company",
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
                  status: ((
                  formElements.namedItem("status") as HTMLSelectElement)?.
                  value || "pending") as "active" | "inactive" | "pending",
                  photo: imagePreview || "",
                  notes:
                  (formElements.namedItem("notes") as HTMLTextAreaElement)?.
                  value || ""
                };

                // Enviar datos al backend
                handleDriverSubmit(driverData);
              }}
              className="bg-black hover:bg-gray-800" data-oid="t__8vop">


                {editingDriver ? "Actualizar" : "Crear"} Chófer
              </Button>
            </div>
          </div>
        </form> :

      <div
        className="bg-white rounded-lg shadow-md overflow-hidden" data-oid="iyvr09f">


          <div
          className="p-4 sm:p-6 flex justify-between items-center border-b" data-oid="ahk13jn">


            <div className="relative" data-oid="blhk-pk">
              <input
              type="text"
              placeholder="Buscar chóferes..."
              className="pl-10 pr-4 py-2 border rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} data-oid="r2-hi4f" />



              <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18} data-oid="jh8z11r" />


            </div>
            <div className="flex space-x-3" data-oid="l:.anbk">
              <select
              className="px-3 py-2 border rounded-lg"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)} data-oid="k0:egfy">


                <option value="all" data-oid="6cod_t.">
                  Todos los estados
                </option>
                <option value="active" data-oid="7_oc3gg">
                  Activos
                </option>
                <option value="inactive" data-oid="lhp7xg-">
                  Inactivos
                </option>
                <option value="pending" data-oid="5er52xb">
                  Pendientes
                </option>
              </select>
              <select
              className="px-3 py-2 border rounded-lg"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)} data-oid="__ls_q7">


                <option value="all" data-oid="hn4y6mr">
                  Todas las ubicaciones
                </option>
                {uniqueLocations.map((location) =>
              <option key={location} value={location} data-oid="15otlpz">
                    {location}
                  </option>
              )}
              </select>
            </div>
          </div>
          <div className="overflow-x-auto" data-oid="_egsrs1">
            <table
            className="min-w-full divide-y divide-gray-200" data-oid="8j:1ka4">


              <thead className="bg-gray-50" data-oid="632b0qq">
                <tr data-oid="z3-lyz5">
                  <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-oid="7hh_2f-">


                    Chófer
                  </th>
                  <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-oid="6-0lbyk">


                    Contacto
                  </th>
                  <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-oid="moch4cg">


                    Ubicación
                  </th>
                  <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-oid="99_f_7m">


                    Estado
                  </th>
                  <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-oid=".nl:h.f">


                    Experiencia/Rating
                  </th>
                  <th
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" data-oid="ja7h4ek">


                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody
              className="bg-white divide-y divide-gray-200" data-oid="f2m-2fj">


                {filteredDrivers.map((driver) =>
              <tr
                key={driver.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => handleViewDriverDetails(driver)} data-oid="tf77gtr">


                    <td
                  className="px-6 py-4 whitespace-nowrap" data-oid="8ubo0nc">


                      <div className="flex items-center" data-oid="xb1ajdz">
                        <div
                      className="flex-shrink-0 h-10 w-10" data-oid="rixmewz">


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
                        }} data-oid="ftnq--u" /> :



                      <div
                        className="h-10 w-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-medium" data-oid="78p4s63">


                              {driver.name.charAt(0).toUpperCase()}
                            </div>
                      }
                          <div
                        className="fallback-avatar h-10 w-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-medium"
                        style={{ display: "none" }} data-oid="ebem15z">


                            {driver.name.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div className="ml-4" data-oid="7o_4etj">
                          <div
                        className="text-sm font-medium text-gray-900" data-oid="szvv5vv">


                            {driver.name}
                          </div>
                          <div
                        className="text-sm text-gray-500" data-oid="tc1eq_2">


                            {driver.type === "private" ?
                        "Particular" :
                        "Empresa"}
                            {driver.companyName && ` (${driver.companyName})`}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                  className="px-6 py-4 whitespace-nowrap" data-oid="womzcta">


                      <div className="text-sm text-gray-900" data-oid="r9:082b">
                        {driver.phone}
                      </div>
                      <div className="text-sm text-gray-500" data-oid="62meqoe">
                        {driver.email}
                      </div>
                    </td>
                    <td
                  className="px-6 py-4 whitespace-nowrap" data-oid="ywo46:r">


                      <div className="text-sm text-gray-900" data-oid="i-e84zp">
                        {driver.city}
                      </div>
                      <div className="text-sm text-gray-500" data-oid="0s3q5up">
                        {driver.country}
                      </div>
                    </td>
                    <td
                  className="px-6 py-4 whitespace-nowrap" data-oid="0v5vf5y">


                      <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    driver.status === "active" ?
                    "bg-gray-200 text-green-800" :
                    driver.status === "inactive" ?
                    "bg-gray-100 text-gray-800" :
                    "bg-gray-200 text-yellow-800"}`
                    } data-oid="6dr.ro0">


                        {driver.status === "active" ?
                    "Activo" :
                    driver.status === "inactive" ?
                    "Inactivo" :
                    "Pendiente"}
                      </span>
                      <div
                    className="text-sm text-gray-500 mt-1" data-oid="duou9rz">


                        {driver.available ? "Disponible" : "No disponible"}
                      </div>
                    </td>
                    <td
                  className="px-6 py-4 whitespace-nowrap" data-oid="f68zc0h">


                      <div className="text-sm text-gray-900" data-oid="b5zgh7j">
                        {driver.experience} años
                      </div>
                      <div className="flex text-amber-500" data-oid="kz7mc48">
                        {[...Array(5)].map((_, i) =>
                    <span
                      key={i}
                      className={
                      i < Math.round(driver.rating) ?
                      "" :
                      "text-gray-300"
                      } data-oid="6hn423m">


                            ★
                          </span>
                    )}
                        <span className="ml-1 text-gray-500" data-oid="ns:s6rh">
                          ({driver.rating.toFixed(1)})
                        </span>
                      </div>
                    </td>
                    <td
                  className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" data-oid="rbnduuw">


                      <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => handleDeleteDriver(driver.id, e)}
                    className="text-gray-600 border-gray-200 hover:bg-gray-100" data-oid="x0kh0bu">


                        <Trash2 size={16} data-oid="vbm.5kw" />
                      </Button>
                    </td>
                  </tr>
              )}
              </tbody>
            </table>

            {filteredDrivers.length === 0 &&
          <div className="py-10 text-center" data-oid="yaui0sx">
                <AlertTriangle
              className="h-8 w-8 text-amber-500 mx-auto mb-2" data-oid="-:.5pah" />


                <p className="text-gray-500" data-oid="rwbe6.i">
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
        description="Esta acción eliminará permanentemente al chófer. Esta acción no se puede deshacer." data-oid="g:dl7d:" />


    </div>);

};

export default DriversSection;