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
import { useState } from "react";
import {
  X,
  Save,
  Edit,
  CheckCircle,
  AlertTriangle,
  Mail,
  Phone,
  User as UserIcon,
  Building,
  CreditCard,
  Clock,
  FileText,
  Award,
  BookOpen,
  RefreshCw,
  BarChart,
} from "lucide-react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

// Tipo para usuarios con propiedades extendidas
export type UserExtended = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "blocked";
  created_at: string;
  avatar?: string;
  phone?: string;
  address?: string;
  // Datos de transporte y financieros
  totalSpent?: number;
  bookingsCount?: number;
  lastBookingDate?: string;
  favoriteDestinations?: string[];
  // Preferencias
  preferences?: {
    vehicleType?: string;
    paymentMethod?: string;
    notifications?: boolean;
  };
  // Etiquetas
  tags?: string[];
  // Campos de perfil
  profile?: {
    title?: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    country_code?: string;
    address?: string;
  };
  // Campos de perfil de empresa
  company_profile?: {
    companyName?: string;
    phoneNumber?: string;
    country?: string;
    location?: string;
    companySize?: string;
    hearAbout?: string;
    additionalInfo?: string;
    representativeInfo?: {
      firstName?: string;
      lastName?: string;
      email?: string;
    };
    isCompany?: boolean;
  };
  is_company?: boolean;
  profile_completed?: boolean;
};

interface UserDetailsViewProps {
  user: UserExtended;
  onClose: () => void;
  onAssignTag: (userId: string, tag: string) => void;
  onRemoveTag: (userId: string, tag: string) => void;
}

const UserDetailsView = ({
  user,
  onClose,
  onAssignTag,
  onRemoveTag,
}: UserDetailsViewProps) => {
  const { toast } = useToast();

  // Estados para edición
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);

  // Consola para depuración - Ver la estructura exacta de usuario recibida
  console.log("Datos de usuario recibidos:", JSON.stringify(user, null, 2));

  // Etiquetas disponibles para asignar
  const availableTags = [
    "VIP",
    "Corporativo",
    "Frecuente",
    "Internacional",
    "Evento Especial",
    "Pago Rápido",
    "Primera Clase",
    "Regular",
    "Ocasional",
    "Premium",
    "Facturación Mensual",
  ];

  // Manejar la asignación de una nueva etiqueta
  const handleAddTag = (tag: string) => {
    // Verificar si el usuario ya tiene esta etiqueta
    if (!user.tags?.includes(tag)) {
      onAssignTag(user.id, tag);
    }
  };

  // Manejar la eliminación de una etiqueta
  const handleRemoveTag = (tag: string) => {
    onRemoveTag(user.id, tag);
  };

  // Iniciar modo edición
  const handleStartEditing = () => {
    // Preparar datos iniciales para el formulario según el rol
    let initialData: any = {
      name: user.name,
      email: user.email,
      status: user.status,
    };

    if (user.role === "user") {
      initialData = {
        ...initialData,
        title: user.profile?.title || "none",
        first_name: user.profile?.first_name || "",
        last_name: user.profile?.last_name || "",
        phone: user.profile?.phone || "",
        country_code: user.profile?.country_code || "",
        address: user.profile?.address || "",
      };
    } else if (user.role === "company") {
      initialData = {
        ...initialData,
        companyName: user.company_profile?.companyName || "",
        phoneNumber: user.company_profile?.phoneNumber || "",
        country: user.company_profile?.country || "",
        location: user.company_profile?.location || "",
        companySize: user.company_profile?.companySize || "",
        hearAbout: user.company_profile?.hearAbout || "",
        additionalInfo: user.company_profile?.additionalInfo || "",
        representativeFirstName:
          user.company_profile?.representativeInfo?.firstName || "",
        representativeLastName:
          user.company_profile?.representativeInfo?.lastName || "",
        representativeEmail:
          user.company_profile?.representativeInfo?.email || "",
      };
    }

    setFormData(initialData);
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

  // Guardar cambios
  const handleSaveChanges = async () => {
    // Si el usuario es administrador, no permitir la edición
    if (user.role === "admin") {
      toast({
        title: "Acción no permitida",
        description: "Los administradores no pueden ser editados",
        variant: "destructive",
      });
      setIsEditing(false);
      return;
    }

    try {
      setIsSaving(true);

      // Preparar los datos para enviar al backend según el rol
      let dataToSend: any = { ...formData };

      // Si el título es "none", establecerlo como cadena vacía para la API
      if (dataToSend.title === "none") {
        dataToSend.title = "";
      }

      // Obtener token de autenticación
      const token = localStorage.getItem("authToken");

      if (!token) {
        toast({
          title: "Error",
          description: "No hay sesión activa. Por favor inicie sesión",
          variant: "destructive",
        });
        return;
      }

      console.log("Enviando datos:", dataToSend);

      // Enviar los datos al backend
      await axios.put(`/api/admin/users/${user.id}/update`, dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast({
        title: "Usuario actualizado",
        description:
          "Los datos del usuario han sido actualizados correctamente",
      });

      // Actualizar UI con los datos actualizados
      // Idealmente deberíamos recargar el usuario actualizado, pero por ahora simulamos la actualización

      setIsEditing(false);
    } catch (err) {
      console.error("Error al actualizar usuario:", err);
      toast({
        title: "Error",
        description:
          axios.isAxiosError(err) && err.response?.data?.error
            ? err.response.data.error
            : "No se pudo actualizar el usuario. Intente nuevamente",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 pb-10 max-w-[1200px] mx-auto" data-oid="dapejl.">
      {/* Cabecera mejorada */}
      <div
        className="bg-white border-b shadow-sm py-4 px-6 sticky top-0 z-10"
        data-oid="lkb9wla"
      >
        <div className="flex justify-between items-center" data-oid="qqmloiz">
          <div className="flex items-center space-x-4" data-oid="vzcdwtx">
            <div className="flex flex-col" data-oid="4pd6.-l">
              <h2
                className="text-2xl font-bold text-gray-800"
                data-oid="9rcyi49"
              >
                {user.name}
                <span className="ml-2 text-lg text-gray-500" data-oid="z6s2uwj">
                  (
                  {user.role === "admin"
                    ? "Administrador"
                    : user.role === "company"
                      ? "Empresa"
                      : "Usuario"}
                  )
                </span>
              </h2>
              <p className="text-gray-500 text-sm" data-oid="wfui5cj">
                ID: {user.id}
              </p>
            </div>
          </div>
          <div className="flex space-x-2" data-oid="l9zloov">
            {!isEditing ? (
              <Button
                variant="outline"
                onClick={handleStartEditing}
                disabled={user.role === "admin"}
                className="flex items-center hover:bg-gray-100 transition-colors"
                data-oid="ct5ma4g"
              >
                <Edit className="h-4 w-4 mr-2" data-oid="rzj8jtw" />
                Editar
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={handleCancelEdit}
                  className="flex items-center hover:bg-gray-100 transition-colors"
                  data-oid="pspgf.-"
                >
                  <X className="h-4 w-4 mr-2" data-oid="wbvrwwy" />
                  Cancelar
                </Button>
                <Button
                  variant="default"
                  onClick={handleSaveChanges}
                  disabled={isSaving}
                  className="flex items-center bg-black hover:bg-gray-800 transition-colors"
                  data-oid="ruh87mv"
                >
                  {isSaving ? (
                    <RefreshCw
                      className="h-4 w-4 mr-2 animate-spin"
                      data-oid="s3e426:"
                    />
                  ) : (
                    <Save className="h-4 w-4 mr-2" data-oid="cf:cwz8" />
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
              data-oid="4bjke35"
            >
              <X className="h-5 w-5" data-oid="dwvufbp" />
            </Button>
          </div>
        </div>
      </div>

      {/* Contenido principal - Vista única sin pestañas */}
      <div className="px-6 space-y-8" data-oid="h-egbr:">
        {/* Unificar Perfil de Usuario y Datos Personales en un solo contenedor */}
        <Card
          className="shadow-md hover:shadow-lg transition-shadow overflow-hidden"
          data-oid="dg74bmk"
        >
          <CardHeader className="bg-gray-50 border-b" data-oid="k2ztvsw">
            <CardTitle className="flex items-center text-lg" data-oid="kyqr84p">
              <UserIcon
                className="h-5 w-5 mr-2 text-gray-500"
                data-oid="30mvup9"
              />
              Información del Usuario
            </CardTitle>
          </CardHeader>
          <CardContent data-oid="a1xynkf">
            <div
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
              data-oid="xsl4j9j"
            >
              {/* Panel izquierdo - Avatar e información de contacto */}
              <div className="lg:col-span-4" data-oid="neu0-q.">
                {/* Avatar y datos básicos */}
                <div
                  className="flex flex-col items-center space-y-4 mb-6"
                  data-oid="zzci-7g"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-24 w-24 rounded-full border-4 border-gray-100 shadow-sm"
                      data-oid="5:d27yd"
                    />
                  ) : (
                    <div
                      className="h-24 w-24 rounded-full bg-gradient-to-br from-red-100 to-red-200 text-gray-600 flex items-center justify-center text-2xl font-bold border-4 border-gray-100 shadow-sm"
                      data-oid="ua7ruw5"
                    >
                      {user.name[0].toUpperCase()}
                    </div>
                  )}

                  {!isEditing ? (
                    <>
                      <h3
                        className="text-xl font-medium mt-2"
                        data-oid="5e.5yct"
                      >
                        {user.name}
                      </h3>
                      <div
                        className="flex flex-wrap gap-2 justify-center"
                        data-oid="tw77ecx"
                      >
                        <Badge
                          className={cn(
                            "px-3 py-1 flex items-center",
                            user.role === "admin"
                              ? "bg-gray-200 text-purple-800 hover:bg-gray-200"
                              : user.role === "company"
                                ? "bg-gray-200 text-blue-800 hover:bg-gray-200"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-100",
                          )}
                          data-oid="9hkplws"
                        >
                          {user.role === "admin"
                            ? "Administrador"
                            : user.role === "company"
                              ? "Empresa"
                              : "Usuario"}
                        </Badge>
                        <Badge
                          className={cn(
                            "px-3 py-1 flex items-center",
                            user.status === "active"
                              ? "bg-gray-200 text-green-800 hover:bg-gray-200"
                              : "bg-gray-200 text-gray-800 hover:bg-gray-200",
                          )}
                          data-oid="bukfyy9"
                        >
                          <span
                            className={`h-2 w-2 rounded-full mr-1.5 ${
                              user.status === "active" ? "bg-black" : "bg-black"
                            }`}
                            data-oid="lri5vhp"
                          ></span>
                          {user.status === "active" ? "Activo" : "Inactivo"}
                        </Badge>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-full space-y-2" data-oid="y_-zdm_">
                        <label
                          className="text-sm font-medium text-gray-500"
                          data-oid="lx6g9is"
                        >
                          Nombre:
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                          data-oid="pehetit"
                        />
                      </div>
                      <div className="w-full space-y-2" data-oid="__dpb2t">
                        <label
                          className="text-sm font-medium text-gray-500"
                          data-oid="lg:ukpa"
                        >
                          Estado:
                        </label>
                        <Select
                          name="status"
                          value={formData.status}
                          onValueChange={(value) =>
                            setFormData({ ...formData, status: value })
                          }
                          data-oid="u7m:52r"
                        >
                          <SelectTrigger
                            className="border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                            data-oid="akbztob"
                          >
                            <SelectValue
                              placeholder="Seleccionar estado"
                              data-oid="jukaq5d"
                            />
                          </SelectTrigger>
                          <SelectContent data-oid="k:h2hdp">
                            <SelectItem value="active" data-oid="9b9b.z3">
                              Activo
                            </SelectItem>
                            <SelectItem value="inactive" data-oid="eypekvl">
                              Inactivo
                            </SelectItem>
                            <SelectItem value="blocked" data-oid="vjwp5q9">
                              Bloqueado
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                </div>

                {user.profile_completed ? (
                  <div
                    className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md"
                    data-oid="1kezuwj"
                  >
                    <div className="flex items-center" data-oid=".q3e31.">
                      <CheckCircle
                        className="h-5 w-5 text-gray-600 mr-2 flex-shrink-0"
                        data-oid="wh45.9m"
                      />

                      <p className="text-sm text-green-700" data-oid="692pxdf">
                        Perfil completo
                      </p>
                    </div>
                  </div>
                ) : (
                  <div
                    className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md"
                    data-oid="znva-w5"
                  >
                    <div className="flex items-center" data-oid="124kv87">
                      <AlertTriangle
                        className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0"
                        data-oid="ub18pi-"
                      />

                      <p className="text-sm text-amber-700" data-oid="vdd8qol">
                        Perfil incompleto
                      </p>
                    </div>
                  </div>
                )}

                {user.role === "admin" && (
                  <div
                    className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md"
                    data-oid="56lnax-"
                  >
                    <div className="flex items-center" data-oid="2:.vdb_">
                      <AlertTriangle
                        className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0"
                        data-oid="vr68f43"
                      />

                      <p className="text-sm text-amber-700" data-oid="ffa1yrg">
                        Los administradores no pueden ser editados
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Panel derecho - Datos específicos según rol */}
              <div className="lg:col-span-8" data-oid="c4khh:c">
                {/* Información de contacto */}
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
                  data-oid="_4l1ph3"
                >
                  <div className="space-y-1" data-oid="4z:erk6">
                    <div
                      className="flex items-center text-gray-500"
                      data-oid="xpvngyu"
                    >
                      <Mail className="h-4 w-4 mr-2" data-oid="k4zvcag" />
                      <span className="text-sm" data-oid="a6teijb">
                        Email:
                      </span>
                    </div>
                    {isEditing ? (
                      <Input
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                        data-oid="6-4117j"
                      />
                    ) : (
                      <p
                        className="text-sm font-medium pl-6"
                        data-oid="f5.i.81"
                      >
                        {user.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1" data-oid=":c5cwf3">
                    <div
                      className="flex items-center text-gray-500"
                      data-oid="9tb5v9q"
                    >
                      <Phone className="h-4 w-4 mr-2" data-oid="fs_sl:x" />
                      <span className="text-sm" data-oid="rb01l8p">
                        Teléfono:
                      </span>
                    </div>
                    {isEditing ? (
                      <div className="flex pl-6 gap-2" data-oid="teedf7w">
                        <Input
                          name="country_code"
                          value={formData.country_code}
                          onChange={handleInputChange}
                          className="mt-1 w-20 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                          placeholder="+52"
                          data-oid="4if6d00"
                        />

                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="mt-1 flex-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                          data-oid="fitw.6g"
                        />
                      </div>
                    ) : (
                      <p
                        className="text-sm font-medium pl-6"
                        data-oid="onmrrzj"
                      >
                        {user.role === "company"
                          ? user.company_profile &&
                            user.company_profile.phoneNumber
                            ? user.company_profile.phoneNumber
                            : "No especificado"
                          : user.profile &&
                              user.profile.country_code &&
                              user.profile.phone
                            ? `${user.profile.country_code} ${user.profile.phone}`
                            : "No especificado"}
                      </p>
                    )}
                  </div>
                </div>

                {user.role === "company" ? (
                  // Datos de empresa
                  <div data-oid="jqza3am">
                    <h4
                      className="text-base font-medium mb-4 flex items-center border-b border-gray-200 pb-2"
                      data-oid="owdmzq."
                    >
                      <Building
                        className="h-5 w-5 mr-2 text-gray-500"
                        data-oid="3icz66n"
                      />
                      Datos de la Empresa
                    </h4>

                    {!isEditing ? (
                      <div
                        className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3"
                        data-oid="6m_z144"
                      >
                        <div className="md:space-y-2" data-oid="kqpkqvi">
                          <div className="mb-3" data-oid="mgm8mn4">
                            <p
                              className="text-sm font-medium text-gray-500"
                              data-oid="udf17gb"
                            >
                              Nombre de la empresa
                            </p>
                            <p className="font-medium" data-oid="742.cz3">
                              {user.company_profile &&
                              user.company_profile.companyName
                                ? user.company_profile.companyName
                                : "No especificado"}
                            </p>
                          </div>
                          <div className="mb-3" data-oid="svhohew">
                            <p
                              className="text-sm font-medium text-gray-500"
                              data-oid="9g5t79p"
                            >
                              Ubicación
                            </p>
                            <p className="font-medium" data-oid="fu0t.ni">
                              {user.company_profile &&
                              user.company_profile.location
                                ? user.company_profile.location
                                : "No especificado"}
                            </p>
                          </div>
                          <div className="mb-3" data-oid="gpm7zl2">
                            <p
                              className="text-sm font-medium text-gray-500"
                              data-oid="gnvux_p"
                            >
                              País
                            </p>
                            <p className="font-medium" data-oid="dmc56.z">
                              {user.company_profile &&
                              user.company_profile.country
                                ? user.company_profile.country
                                : "No especificado"}
                            </p>
                          </div>
                        </div>

                        <div className="md:space-y-2" data-oid="glnmacq">
                          <div className="mb-3" data-oid="a1xb86t">
                            <p
                              className="text-sm font-medium text-gray-500"
                              data-oid="f--xp0n"
                            >
                              Tamaño de la empresa
                            </p>
                            <p className="font-medium" data-oid="27pm7-s">
                              {user.company_profile &&
                              user.company_profile.companySize
                                ? user.company_profile.companySize
                                : "No especificado"}
                            </p>
                          </div>
                          <div className="mb-3" data-oid="ah3qyf8">
                            <p
                              className="text-sm font-medium text-gray-500"
                              data-oid="1vxrv0v"
                            >
                              ¿Cómo nos conoció?
                            </p>
                            <p className="font-medium" data-oid="sdtixc5">
                              {user.company_profile &&
                              user.company_profile.hearAbout
                                ? user.company_profile.hearAbout
                                : "No especificado"}
                            </p>
                          </div>
                          <div className="mb-3" data-oid="1muri84">
                            <p
                              className="text-sm font-medium text-gray-500"
                              data-oid="_80s8f0"
                            >
                              Información adicional
                            </p>
                            <p className="font-medium" data-oid="eciwi8d">
                              {user.company_profile &&
                              user.company_profile.additionalInfo
                                ? user.company_profile.additionalInfo
                                : "No especificado"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Modo edición para empresa
                      <div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        data-oid="548nk5c"
                      >
                        <div className="space-y-4" data-oid="kzb8p-q">
                          <div data-oid="hnf42q_">
                            <label
                              className="text-sm font-medium text-gray-500"
                              data-oid="gfm:x2_"
                            >
                              Nombre de la empresa
                            </label>
                            <Input
                              name="companyName"
                              value={formData.companyName}
                              onChange={handleInputChange}
                              className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                              data-oid="exr1v65"
                            />
                          </div>
                          <div data-oid="h96k9gz">
                            <label
                              className="text-sm font-medium text-gray-500"
                              data-oid="aicd5w7"
                            >
                              Ubicación
                            </label>
                            <Input
                              name="location"
                              value={formData.location}
                              onChange={handleInputChange}
                              className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                              data-oid="3c_zw--"
                            />
                          </div>
                          <div data-oid="6r:.hsb">
                            <label
                              className="text-sm font-medium text-gray-500"
                              data-oid="pe17vmg"
                            >
                              País
                            </label>
                            <Input
                              name="country"
                              value={formData.country}
                              onChange={handleInputChange}
                              className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                              data-oid="1n0h.cx"
                            />
                          </div>
                        </div>

                        <div className="space-y-4" data-oid="x0:l_wy">
                          <div data-oid="t2qq_u0">
                            <label
                              className="text-sm font-medium text-gray-500"
                              data-oid="9gs28a2"
                            >
                              Tamaño de la empresa
                            </label>
                            <Input
                              name="companySize"
                              value={formData.companySize}
                              onChange={handleInputChange}
                              className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                              data-oid="cbjyqrj"
                            />
                          </div>
                          <div data-oid="qnkg4t6">
                            <label
                              className="text-sm font-medium text-gray-500"
                              data-oid="w8y56-2"
                            >
                              ¿Cómo nos conoció?
                            </label>
                            <Input
                              name="hearAbout"
                              value={formData.hearAbout}
                              onChange={handleInputChange}
                              className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                              data-oid="ydavd6m"
                            />
                          </div>
                          <div data-oid="kql8ln5">
                            <label
                              className="text-sm font-medium text-gray-500"
                              data-oid="nhim0f."
                            >
                              Información adicional
                            </label>
                            <Textarea
                              name="additionalInfo"
                              value={formData.additionalInfo}
                              onChange={handleInputChange}
                              className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                              rows={3}
                              data-oid="_dtl_fm"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Información del representante */}
                    <div
                      className="mt-5 pt-4 border-t border-gray-200"
                      data-oid="d_hnj_g"
                    >
                      <h4
                        className="text-base font-medium mb-4 flex items-center"
                        data-oid=":8gyzsl"
                      >
                        <UserIcon
                          className="h-4 w-4 mr-2 text-gray-500"
                          data-oid="5-1rh-r"
                        />
                        Información del Representante
                      </h4>

                      {!isEditing ? (
                        <div
                          className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-3"
                          data-oid="3dgh9fr"
                        >
                          <div className="mb-3" data-oid="u:obhgw">
                            <p
                              className="text-sm font-medium text-gray-500"
                              data-oid="rrfqvph"
                            >
                              Nombre
                            </p>
                            <p className="font-medium" data-oid="-p0r95v">
                              {user.company_profile &&
                              user.company_profile.representativeInfo &&
                              user.company_profile.representativeInfo.firstName
                                ? user.company_profile.representativeInfo
                                    .firstName
                                : "No especificado"}
                            </p>
                          </div>
                          <div className="mb-3" data-oid="9p5r20w">
                            <p
                              className="text-sm font-medium text-gray-500"
                              data-oid="hgci.6a"
                            >
                              Apellido
                            </p>
                            <p className="font-medium" data-oid="22azg._">
                              {user.company_profile &&
                              user.company_profile.representativeInfo &&
                              user.company_profile.representativeInfo.lastName
                                ? user.company_profile.representativeInfo
                                    .lastName
                                : "No especificado"}
                            </p>
                          </div>
                          <div className="mb-3" data-oid="1g.fudv">
                            <p
                              className="text-sm font-medium text-gray-500"
                              data-oid="twuzqds"
                            >
                              Email
                            </p>
                            <p className="font-medium" data-oid="xs1uqdj">
                              {user.company_profile &&
                              user.company_profile.representativeInfo &&
                              user.company_profile.representativeInfo.email
                                ? user.company_profile.representativeInfo.email
                                : "No especificado"}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="grid grid-cols-1 md:grid-cols-3 gap-6"
                          data-oid="qdnxkyf"
                        >
                          <div data-oid="0lb38fr">
                            <label
                              className="text-sm font-medium text-gray-500"
                              data-oid="kl.8bo:"
                            >
                              Nombre
                            </label>
                            <Input
                              name="representativeFirstName"
                              value={formData.representativeFirstName}
                              onChange={handleInputChange}
                              className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                              data-oid="2ow..o."
                            />
                          </div>
                          <div data-oid=".8ppsvl">
                            <label
                              className="text-sm font-medium text-gray-500"
                              data-oid="w3hwsc-"
                            >
                              Apellido
                            </label>
                            <Input
                              name="representativeLastName"
                              value={formData.representativeLastName}
                              onChange={handleInputChange}
                              className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                              data-oid="7evkqnd"
                            />
                          </div>
                          <div data-oid="ijy664b">
                            <label
                              className="text-sm font-medium text-gray-500"
                              data-oid="ul7i959"
                            >
                              Email
                            </label>
                            <Input
                              name="representativeEmail"
                              value={formData.representativeEmail}
                              onChange={handleInputChange}
                              className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                              data-oid="shib4rq"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  // Datos de usuario regular
                  <div data-oid="1896602">
                    <h4
                      className="text-base font-medium mb-4 flex items-center border-b border-gray-200 pb-2"
                      data-oid="js.93qi"
                    >
                      <FileText
                        className="h-5 w-5 mr-2 text-gray-500"
                        data-oid="h7c2-89"
                      />
                      Datos Personales
                    </h4>

                    {!isEditing ? (
                      <div
                        className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3"
                        data-oid="q3atb1i"
                      >
                        <div className="mb-3" data-oid="f2v.y0g">
                          <p
                            className="text-sm font-medium text-gray-500"
                            data-oid="zf:74.y"
                          >
                            Título
                          </p>
                          <p className="font-medium" data-oid="a6h-6rh">
                            {user.profile && user.profile.title
                              ? user.profile.title
                              : "No especificado"}
                          </p>
                        </div>
                        <div className="mb-3" data-oid="e::x1p1">
                          <p
                            className="text-sm font-medium text-gray-500"
                            data-oid=".bqaekt"
                          >
                            Nombre
                          </p>
                          <p className="font-medium" data-oid="66_9du6">
                            {user.profile && user.profile.first_name
                              ? user.profile.first_name
                              : "No especificado"}
                          </p>
                        </div>
                        <div className="mb-3" data-oid="-5mdeum">
                          <p
                            className="text-sm font-medium text-gray-500"
                            data-oid="r9cys-h"
                          >
                            Apellido
                          </p>
                          <p className="font-medium" data-oid=":bx584:">
                            {user.profile && user.profile.last_name
                              ? user.profile.last_name
                              : "No especificado"}
                          </p>
                        </div>
                        <div className="mb-3" data-oid="25tct5j">
                          <p
                            className="text-sm font-medium text-gray-500"
                            data-oid="cc9fsfo"
                          >
                            Dirección
                          </p>
                          <p className="font-medium" data-oid="e_57y7-">
                            {user.profile && user.profile.address
                              ? user.profile.address
                              : "No especificado"}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        data-oid="driy-jy"
                      >
                        <div className="space-y-4" data-oid="nim4m71">
                          <div data-oid="r9csmiv">
                            <label
                              className="text-sm font-medium text-gray-500"
                              data-oid="mwh6:cp"
                            >
                              Título
                            </label>
                            <Select
                              name="title"
                              value={formData.title || "none"}
                              onValueChange={(value) =>
                                setFormData({ ...formData, title: value })
                              }
                              data-oid="de-erit"
                            >
                              <SelectTrigger
                                className="border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                                data-oid="f5-hq8u"
                              >
                                <SelectValue
                                  placeholder="Seleccionar título"
                                  data-oid="bh84ktw"
                                />
                              </SelectTrigger>
                              <SelectContent data-oid="-y6::vb">
                                <SelectItem value="none" data-oid="bd_dahb">
                                  Ninguno
                                </SelectItem>
                                <SelectItem value="Mr." data-oid="o.o8q8-">
                                  Sr.
                                </SelectItem>
                                <SelectItem value="Mrs." data-oid="d16k37q">
                                  Sra.
                                </SelectItem>
                                <SelectItem value="Ms." data-oid="_97n9q_">
                                  Srta.
                                </SelectItem>
                                <SelectItem value="Dr." data-oid="vrzqz1p">
                                  Dr.
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div data-oid="jf71t4b">
                            <label
                              className="text-sm font-medium text-gray-500"
                              data-oid="zr.kg:b"
                            >
                              Nombre
                            </label>
                            <Input
                              name="first_name"
                              value={formData.first_name}
                              onChange={handleInputChange}
                              className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                              data-oid="lc8o-_j"
                            />
                          </div>
                        </div>

                        <div className="space-y-4" data-oid="p5--6cr">
                          <div data-oid="dyq1-sf">
                            <label
                              className="text-sm font-medium text-gray-500"
                              data-oid="6.cq._x"
                            >
                              Apellido
                            </label>
                            <Input
                              name="last_name"
                              value={formData.last_name}
                              onChange={handleInputChange}
                              className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                              data-oid="tax9sm3"
                            />
                          </div>
                          <div data-oid="b5c7c_7">
                            <label
                              className="text-sm font-medium text-gray-500"
                              data-oid="7nh5_u0"
                            >
                              Dirección
                            </label>
                            <Textarea
                              name="address"
                              value={formData.address}
                              onChange={handleInputChange}
                              className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                              rows={3}
                              data-oid="aupld94"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Estadísticas y Preferencias */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6"
          data-oid="9.lefeo"
        >
          {/* Estadísticas de actividad */}
          <Card
            className="shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            data-oid="k4tru_v"
          >
            <CardHeader className="bg-gray-50 border-b pb-3" data-oid="k6un3m4">
              <CardTitle
                className="flex items-center text-lg"
                data-oid="wj9d9i6"
              >
                <BarChart
                  className="h-5 w-5 mr-2 text-gray-500"
                  data-oid="9dqpx3v"
                />
                Estadísticas
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 pb-6" data-oid="6wk0djb">
              <div className="space-y-4" data-oid="qka9itv">
                <div
                  className="flex items-center justify-between py-2 border-b border-gray-100"
                  data-oid="254q9oi"
                >
                  <div className="flex items-center" data-oid="6uol9ye">
                    <CreditCard
                      className="h-4 w-4 mr-3 text-gray-500"
                      data-oid="0b.bjza"
                    />

                    <span className="text-sm text-gray-700" data-oid="fz4jf7_">
                      Total gastado:
                    </span>
                  </div>
                  <span
                    className="font-medium text-gray-900"
                    data-oid="et2wevm"
                  >
                    {user.totalSpent ? `${user.totalSpent.toFixed(2)}€` : "N/A"}
                  </span>
                </div>
                <div
                  className="flex items-center justify-between py-2 border-b border-gray-100"
                  data-oid="esi3pjf"
                >
                  <div className="flex items-center" data-oid="bvig.9o">
                    <BookOpen
                      className="h-4 w-4 mr-3 text-gray-500"
                      data-oid="w2wp:6r"
                    />

                    <span className="text-sm text-gray-700" data-oid="g7botpf">
                      Reservas totales:
                    </span>
                  </div>
                  <span
                    className="font-medium text-gray-900"
                    data-oid="c8x-aic"
                  >
                    {user.bookingsCount || 0}
                  </span>
                </div>
                <div
                  className="flex items-center justify-between py-2"
                  data-oid="7mxw1-u"
                >
                  <div className="flex items-center" data-oid="urkrs8g">
                    <Clock
                      className="h-4 w-4 mr-3 text-gray-500"
                      data-oid="wrf157d"
                    />

                    <span className="text-sm text-gray-700" data-oid="n2_yigx">
                      Última reserva:
                    </span>
                  </div>
                  <span
                    className="font-medium text-gray-900"
                    data-oid="mjjq0at"
                  >
                    {user.lastBookingDate || "N/A"}
                  </span>
                </div>
              </div>

              {/* Destinos favoritos */}
              {user.favoriteDestinations &&
                user.favoriteDestinations.length > 0 && (
                  <div
                    className="mt-6 pt-4 border-t border-gray-200"
                    data-oid="poqj:4:"
                  >
                    <h4
                      className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3"
                      data-oid="cppit:r"
                    >
                      Destinos favoritos
                    </h4>
                    <div className="flex flex-wrap gap-2" data-oid="tfxgezj">
                      {user.favoriteDestinations.map((destination, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="px-2 py-1 bg-gray-100 text-blue-700 hover:bg-gray-200"
                          data-oid="kqo86g3"
                        >
                          {destination}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
            </CardContent>
          </Card>

          {/* Preferencias */}
          <Card
            className="shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            data-oid="dm-epbz"
          >
            <CardHeader className="bg-gray-50 border-b pb-3" data-oid=":bxgn71">
              <CardTitle
                className="flex items-center text-lg"
                data-oid="ap:67_q"
              >
                <Award
                  className="h-5 w-5 mr-2 text-gray-500"
                  data-oid="6ds33a9"
                />
                Etiquetas y Preferencias
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 pb-6" data-oid="68rhg3k">
              <div className="space-y-4" data-oid="mfye34:">
                <div
                  className="flex items-center justify-between py-2 border-b border-gray-100"
                  data-oid="6jf4c4a"
                >
                  <span className="text-sm text-gray-700" data-oid="y4nl0xw">
                    Tipo de vehículo:
                  </span>
                  <span
                    className="font-medium text-gray-900"
                    data-oid="hh3o1qr"
                  >
                    {user.preferences?.vehicleType || "No especificado"}
                  </span>
                </div>
                <div
                  className="flex items-center justify-between py-2 border-b border-gray-100"
                  data-oid="9jj9.ek"
                >
                  <span className="text-sm text-gray-700" data-oid="7_qb-60">
                    Método de pago:
                  </span>
                  <span
                    className="font-medium text-gray-900"
                    data-oid="b7wemhp"
                  >
                    {user.preferences?.paymentMethod || "No especificado"}
                  </span>
                </div>
                <div
                  className="flex items-center justify-between py-2"
                  data-oid="6yybcrq"
                >
                  <span className="text-sm text-gray-700" data-oid="mdkc1k9">
                    Notificaciones:
                  </span>
                  <Badge
                    variant="outline"
                    className={`${user.preferences?.notifications ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-100 text-gray-700 border-gray-200"}`}
                    data-oid="p5y7n_-"
                  >
                    {user.preferences?.notifications
                      ? "Activadas"
                      : "Desactivadas"}
                  </Badge>
                </div>
              </div>

              {/* Etiquetas asignadas */}
              <div
                className="mt-6 pt-4 border-t border-gray-200"
                data-oid="c_0j3ru"
              >
                <h4
                  className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3"
                  data-oid=".905gi."
                >
                  Etiquetas asignadas
                </h4>
                <div className="flex flex-wrap gap-2 mb-4" data-oid="r6q3smf">
                  {user.tags && user.tags.length > 0 ? (
                    user.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer group px-3 py-1 border-gray-300 flex items-center"
                        onClick={() => handleRemoveTag(tag)}
                        data-oid="l5.529x"
                      >
                        {tag}
                        <X
                          className="ml-1 h-3 w-3 opacity-60 group-hover:opacity-100"
                          data-oid="gv7asn8"
                        />
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500" data-oid="g2mflj.">
                      Sin etiquetas asignadas
                    </p>
                  )}
                </div>

                <h4
                  className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3 mt-4"
                  data-oid="pmbzcc_"
                >
                  Asignar etiquetas
                </h4>
                <div className="flex flex-wrap gap-2" data-oid="w94svr8">
                  {availableTags
                    .filter((tag) => !user.tags?.includes(tag))
                    .map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer hover:bg-gray-200 px-3 py-1 flex items-center"
                        onClick={() => handleAddTag(tag)}
                        data-oid="ow_tci8"
                      >
                        + {tag}
                      </Badge>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Historial de Reservas */}
        <Card
          className="shadow-md hover:shadow-lg transition-shadow overflow-hidden"
          data-oid="jefil57"
        >
          <CardHeader className="bg-gray-50 border-b pb-3" data-oid="5mvae0l">
            <CardTitle className="flex items-center text-lg" data-oid=".bppw1e">
              <BookOpen
                className="h-5 w-5 mr-2 text-gray-500"
                data-oid="le:jwu2"
              />
              Historial de Reservas
            </CardTitle>
            <CardDescription data-oid="yca62:i">
              Últimas reservas realizadas por el usuario
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 pb-6" data-oid="owe2eg-">
            {user.bookingsCount && user.bookingsCount > 0 ? (
              <div className="overflow-x-auto" data-oid="omyohqx">
                <table className="w-full" data-oid="jg536vv">
                  <thead data-oid="z.trlki">
                    <tr className="border-b" data-oid="75_lv1.">
                      <th
                        className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        data-oid="oj4y6:p"
                      >
                        ID
                      </th>
                      <th
                        className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        data-oid="m4:r26e"
                      >
                        Destino
                      </th>
                      <th
                        className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        data-oid="wjp.k1y"
                      >
                        Fecha
                      </th>
                      <th
                        className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        data-oid="131h_9m"
                      >
                        Vehículo
                      </th>
                      <th
                        className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        data-oid="bvdwetm"
                      >
                        Importe
                      </th>
                      <th
                        className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        data-oid="_p020d_"
                      >
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className="divide-y divide-gray-200"
                    data-oid="f6z5vep"
                  >
                    {/* Aquí irían los datos de reservas (mockup) */}
                    <tr className="hover:bg-gray-50" data-oid="0rvu7p6">
                      <td
                        className="py-4 text-sm text-gray-500"
                        data-oid="-a4ik1a"
                      >
                        R-12345
                      </td>
                      <td
                        className="py-4 text-sm text-gray-900"
                        data-oid=":5ja_f:"
                      >
                        Madrid - Barcelona
                      </td>
                      <td
                        className="py-4 text-sm text-gray-500"
                        data-oid="mcjelm9"
                      >
                        15/06/2024
                      </td>
                      <td
                        className="py-4 text-sm text-gray-500"
                        data-oid="_g7uyxh"
                      >
                        Mercedes-Benz Clase S
                      </td>
                      <td
                        className="py-4 text-sm text-gray-500"
                        data-oid="z_ap9-d"
                      >
                        450€
                      </td>
                      <td className="py-4" data-oid="3vl.en7">
                        <Badge
                          variant="secondary"
                          className="bg-gray-200 text-green-800 hover:bg-gray-200"
                          data-oid="ysl3xsx"
                        >
                          Completado
                        </Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-10 text-center" data-oid="jw033n6">
                <div className="mb-4 flex justify-center" data-oid="nxa.k24">
                  <BookOpen
                    className="h-12 w-12 text-gray-300"
                    data-oid="p-tmbyz"
                  />
                </div>
                <p className="text-gray-500" data-oid="1r24c5y">
                  No hay reservas registradas
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDetailsView;
