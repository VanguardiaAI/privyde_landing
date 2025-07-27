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
    <div className="space-y-6 pb-10 max-w-[1200px] mx-auto" data-oid="9a947m3">
      {/* Cabecera mejorada */}
      <div
        className="bg-white border-b shadow-sm py-4 px-6 sticky top-0 z-10"
        data-oid="7_rlu5x"
      >
        <div className="flex justify-between items-center" data-oid="r.yk56p">
          <div className="flex items-center space-x-4" data-oid="aa1n.43">
            <div className="flex flex-col" data-oid="f4awi38">
              <h2
                className="text-2xl font-bold text-gray-800"
                data-oid="y2cg98z"
              >
                {user.name}
                <span className="ml-2 text-lg text-gray-500" data-oid="0-iai94">
                  (
                  {user.role === "admin"
                    ? "Administrador"
                    : user.role === "company"
                      ? "Empresa"
                      : "Usuario"}
                  )
                </span>
              </h2>
              <p className="text-gray-500 text-sm" data-oid="9mebxrv">
                ID: {user.id}
              </p>
            </div>
          </div>
          <div className="flex space-x-2" data-oid="hgqceb0">
            {!isEditing ? (
              <Button
                variant="outline"
                onClick={handleStartEditing}
                disabled={user.role === "admin"}
                className="flex items-center hover:bg-gray-100 transition-colors"
                data-oid="h06z1l_"
              >
                <Edit className="h-4 w-4 mr-2" data-oid="4f_wakr" />
                Editar
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={handleCancelEdit}
                  className="flex items-center hover:bg-gray-100 transition-colors"
                  data-oid="dev9-ru"
                >
                  <X className="h-4 w-4 mr-2" data-oid="pax8mzw" />
                  Cancelar
                </Button>
                <Button
                  variant="default"
                  onClick={handleSaveChanges}
                  disabled={isSaving}
                  className="flex items-center bg-black hover:bg-gray-800 transition-colors"
                  data-oid="kkgimvt"
                >
                  {isSaving ? (
                    <RefreshCw
                      className="h-4 w-4 mr-2 animate-spin"
                      data-oid="2h7daam"
                    />
                  ) : (
                    <Save className="h-4 w-4 mr-2" data-oid="7:kzvhg" />
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
              data-oid="37op.it"
            >
              <X className="h-5 w-5" data-oid="jdstfn9" />
            </Button>
          </div>
        </div>
      </div>

      {/* Contenido principal - Vista única sin pestañas */}
      <div className="px-6 space-y-8" data-oid="mbd8dxg">
        {/* Unificar Perfil de Usuario y Datos Personales en un solo contenedor */}
        <Card
          className="shadow-md hover:shadow-lg transition-shadow overflow-hidden"
          data-oid="wjqg37w"
        >
          <CardHeader className="bg-gray-50 border-b" data-oid="2tkwwrv">
            <CardTitle className="flex items-center text-lg" data-oid=":k15co0">
              <UserIcon
                className="h-5 w-5 mr-2 text-gray-500"
                data-oid="jb8mbcm"
              />
              Información del Usuario
            </CardTitle>
          </CardHeader>
          <CardContent data-oid="lkus8ph">
            <div
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
              data-oid="_muotc2"
            >
              {/* Panel izquierdo - Avatar e información de contacto */}
              <div className="lg:col-span-4" data-oid="tsufekv">
                {/* Avatar y datos básicos */}
                <div
                  className="flex flex-col items-center space-y-4 mb-6"
                  data-oid="ahkfiar"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-24 w-24 rounded-full border-4 border-gray-100 shadow-sm"
                      data-oid="j6vewxp"
                    />
                  ) : (
                    <div
                      className="h-24 w-24 rounded-full bg-gradient-to-br from-red-100 to-red-200 text-gray-600 flex items-center justify-center text-2xl font-bold border-4 border-gray-100 shadow-sm"
                      data-oid="qabhpwy"
                    >
                      {user.name[0].toUpperCase()}
                    </div>
                  )}

                  {!isEditing ? (
                    <>
                      <h3
                        className="text-xl font-medium mt-2"
                        data-oid="ytpr9wt"
                      >
                        {user.name}
                      </h3>
                      <div
                        className="flex flex-wrap gap-2 justify-center"
                        data-oid="5:liplm"
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
                          data-oid="9lnu_4g"
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
                          data-oid="3iuewhn"
                        >
                          <span
                            className={`h-2 w-2 rounded-full mr-1.5 ${
                              user.status === "active" ? "bg-black" : "bg-black"
                            }`}
                            data-oid="ic0179u"
                          ></span>
                          {user.status === "active" ? "Activo" : "Inactivo"}
                        </Badge>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-full space-y-2" data-oid="jqh:a28">
                        <label
                          className="text-sm font-medium text-gray-500"
                          data-oid="jmx.x61"
                        >
                          Nombre:
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                          data-oid="-cax6m."
                        />
                      </div>
                      <div className="w-full space-y-2" data-oid="mer56eb">
                        <label
                          className="text-sm font-medium text-gray-500"
                          data-oid="3_7432m"
                        >
                          Estado:
                        </label>
                        <Select
                          name="status"
                          value={formData.status}
                          onValueChange={(value) =>
                            setFormData({ ...formData, status: value })
                          }
                          data-oid="axm0jop"
                        >
                          <SelectTrigger
                            className="border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                            data-oid="geuzh-b"
                          >
                            <SelectValue
                              placeholder="Seleccionar estado"
                              data-oid="bsk6qjp"
                            />
                          </SelectTrigger>
                          <SelectContent data-oid="3k66k9d">
                            <SelectItem value="active" data-oid="jyb:iis">
                              Activo
                            </SelectItem>
                            <SelectItem value="inactive" data-oid="kspqg9q">
                              Inactivo
                            </SelectItem>
                            <SelectItem value="blocked" data-oid="ybwkka8">
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
                    data-oid="w1lq_rv"
                  >
                    <div className="flex items-center" data-oid="3-8g6sw">
                      <CheckCircle
                        className="h-5 w-5 text-gray-600 mr-2 flex-shrink-0"
                        data-oid=":11lyk5"
                      />

                      <p className="text-sm text-green-700" data-oid="3zwd_80">
                        Perfil completo
                      </p>
                    </div>
                  </div>
                ) : (
                  <div
                    className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md"
                    data-oid="db8oqcj"
                  >
                    <div className="flex items-center" data-oid="ncwhb-2">
                      <AlertTriangle
                        className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0"
                        data-oid="1ns4pal"
                      />

                      <p className="text-sm text-amber-700" data-oid="7uo0:jx">
                        Perfil incompleto
                      </p>
                    </div>
                  </div>
                )}

                {user.role === "admin" && (
                  <div
                    className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md"
                    data-oid="y9fn.5g"
                  >
                    <div className="flex items-center" data-oid="n.ehovf">
                      <AlertTriangle
                        className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0"
                        data-oid="gm1wv4v"
                      />

                      <p className="text-sm text-amber-700" data-oid="x7xjgwl">
                        Los administradores no pueden ser editados
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Panel derecho - Datos específicos según rol */}
              <div className="lg:col-span-8" data-oid="pbgfsjp">
                {/* Información de contacto */}
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
                  data-oid="yt84ce7"
                >
                  <div className="space-y-1" data-oid="4ry263g">
                    <div
                      className="flex items-center text-gray-500"
                      data-oid="4b44696"
                    >
                      <Mail className="h-4 w-4 mr-2" data-oid="5f_eog2" />
                      <span className="text-sm" data-oid="ltueegp">
                        Email:
                      </span>
                    </div>
                    {isEditing ? (
                      <Input
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                        data-oid="otbby91"
                      />
                    ) : (
                      <p
                        className="text-sm font-medium pl-6"
                        data-oid="s8j9ga6"
                      >
                        {user.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1" data-oid="upegbg-">
                    <div
                      className="flex items-center text-gray-500"
                      data-oid="r4b:.ok"
                    >
                      <Phone className="h-4 w-4 mr-2" data-oid="g.07zgo" />
                      <span className="text-sm" data-oid="yj_q_nu">
                        Teléfono:
                      </span>
                    </div>
                    {isEditing ? (
                      <div className="flex pl-6 gap-2" data-oid="vcez846">
                        <Input
                          name="country_code"
                          value={formData.country_code}
                          onChange={handleInputChange}
                          className="mt-1 w-20 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                          placeholder="+52"
                          data-oid="daqo5hc"
                        />

                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="mt-1 flex-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                          data-oid="_rkndtt"
                        />
                      </div>
                    ) : (
                      <p
                        className="text-sm font-medium pl-6"
                        data-oid="9r:d.tx"
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
                  <div data-oid="90ibtx5">
                    <h4
                      className="text-base font-medium mb-4 flex items-center border-b border-gray-200 pb-2"
                      data-oid="xjeg6eb"
                    >
                      <Building
                        className="h-5 w-5 mr-2 text-gray-500"
                        data-oid="6wi:det"
                      />
                      Datos de la Empresa
                    </h4>

                    {!isEditing ? (
                      <div
                        className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3"
                        data-oid="cdvoax7"
                      >
                        <div className="md:space-y-2" data-oid="60692y8">
                          <div className="mb-3" data-oid="6l0lvq:">
                            <p
                              className="text-sm font-medium text-gray-500"
                              data-oid="ln_ra12"
                            >
                              Nombre de la empresa
                            </p>
                            <p className="font-medium" data-oid="t0d2c-m">
                              {user.company_profile &&
                              user.company_profile.companyName
                                ? user.company_profile.companyName
                                : "No especificado"}
                            </p>
                          </div>
                          <div className="mb-3" data-oid="furouov">
                            <p
                              className="text-sm font-medium text-gray-500"
                              data-oid="9a6_7z5"
                            >
                              Ubicación
                            </p>
                            <p className="font-medium" data-oid="f4:3sj4">
                              {user.company_profile &&
                              user.company_profile.location
                                ? user.company_profile.location
                                : "No especificado"}
                            </p>
                          </div>
                          <div className="mb-3" data-oid="377mfo0">
                            <p
                              className="text-sm font-medium text-gray-500"
                              data-oid="z8j3yff"
                            >
                              País
                            </p>
                            <p className="font-medium" data-oid=":vw.2-e">
                              {user.company_profile &&
                              user.company_profile.country
                                ? user.company_profile.country
                                : "No especificado"}
                            </p>
                          </div>
                        </div>

                        <div className="md:space-y-2" data-oid="h1640ib">
                          <div className="mb-3" data-oid="zaim28m">
                            <p
                              className="text-sm font-medium text-gray-500"
                              data-oid="jyl3y7k"
                            >
                              Tamaño de la empresa
                            </p>
                            <p className="font-medium" data-oid="a2pa01x">
                              {user.company_profile &&
                              user.company_profile.companySize
                                ? user.company_profile.companySize
                                : "No especificado"}
                            </p>
                          </div>
                          <div className="mb-3" data-oid="azno09t">
                            <p
                              className="text-sm font-medium text-gray-500"
                              data-oid="a:-ht:p"
                            >
                              ¿Cómo nos conoció?
                            </p>
                            <p className="font-medium" data-oid="2bd6grc">
                              {user.company_profile &&
                              user.company_profile.hearAbout
                                ? user.company_profile.hearAbout
                                : "No especificado"}
                            </p>
                          </div>
                          <div className="mb-3" data-oid="ol797n2">
                            <p
                              className="text-sm font-medium text-gray-500"
                              data-oid="_kg0igp"
                            >
                              Información adicional
                            </p>
                            <p className="font-medium" data-oid="gd15bz3">
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
                        data-oid="b0nl0io"
                      >
                        <div className="space-y-4" data-oid="jcfw-r1">
                          <div data-oid="psip:.x">
                            <label
                              className="text-sm font-medium text-gray-500"
                              data-oid="ic9dgj:"
                            >
                              Nombre de la empresa
                            </label>
                            <Input
                              name="companyName"
                              value={formData.companyName}
                              onChange={handleInputChange}
                              className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                              data-oid="py69ec-"
                            />
                          </div>
                          <div data-oid="2j1i4dg">
                            <label
                              className="text-sm font-medium text-gray-500"
                              data-oid="511208l"
                            >
                              Ubicación
                            </label>
                            <Input
                              name="location"
                              value={formData.location}
                              onChange={handleInputChange}
                              className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                              data-oid="qssxqk7"
                            />
                          </div>
                          <div data-oid="fct6pv9">
                            <label
                              className="text-sm font-medium text-gray-500"
                              data-oid="c1gk.1h"
                            >
                              País
                            </label>
                            <Input
                              name="country"
                              value={formData.country}
                              onChange={handleInputChange}
                              className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                              data-oid="-_cjl49"
                            />
                          </div>
                        </div>

                        <div className="space-y-4" data-oid="dwennp:">
                          <div data-oid="c3xwuon">
                            <label
                              className="text-sm font-medium text-gray-500"
                              data-oid="l0oo.dx"
                            >
                              Tamaño de la empresa
                            </label>
                            <Input
                              name="companySize"
                              value={formData.companySize}
                              onChange={handleInputChange}
                              className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                              data-oid="ns3_yy5"
                            />
                          </div>
                          <div data-oid="ave8r18">
                            <label
                              className="text-sm font-medium text-gray-500"
                              data-oid="1xo9i01"
                            >
                              ¿Cómo nos conoció?
                            </label>
                            <Input
                              name="hearAbout"
                              value={formData.hearAbout}
                              onChange={handleInputChange}
                              className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                              data-oid="iucshl:"
                            />
                          </div>
                          <div data-oid="bpaowqd">
                            <label
                              className="text-sm font-medium text-gray-500"
                              data-oid="urr.uj7"
                            >
                              Información adicional
                            </label>
                            <Textarea
                              name="additionalInfo"
                              value={formData.additionalInfo}
                              onChange={handleInputChange}
                              className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                              rows={3}
                              data-oid="7z9y.hp"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Información del representante */}
                    <div
                      className="mt-5 pt-4 border-t border-gray-200"
                      data-oid="pdy7me:"
                    >
                      <h4
                        className="text-base font-medium mb-4 flex items-center"
                        data-oid="ioebdva"
                      >
                        <UserIcon
                          className="h-4 w-4 mr-2 text-gray-500"
                          data-oid="659.s_c"
                        />
                        Información del Representante
                      </h4>

                      {!isEditing ? (
                        <div
                          className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-3"
                          data-oid="2f8dy1n"
                        >
                          <div className="mb-3" data-oid="gf.tdc.">
                            <p
                              className="text-sm font-medium text-gray-500"
                              data-oid="hxw4l1u"
                            >
                              Nombre
                            </p>
                            <p className="font-medium" data-oid="263p7eh">
                              {user.company_profile &&
                              user.company_profile.representativeInfo &&
                              user.company_profile.representativeInfo.firstName
                                ? user.company_profile.representativeInfo
                                    .firstName
                                : "No especificado"}
                            </p>
                          </div>
                          <div className="mb-3" data-oid="i9:rmlr">
                            <p
                              className="text-sm font-medium text-gray-500"
                              data-oid="rqe1:qw"
                            >
                              Apellido
                            </p>
                            <p className="font-medium" data-oid="e:1fezx">
                              {user.company_profile &&
                              user.company_profile.representativeInfo &&
                              user.company_profile.representativeInfo.lastName
                                ? user.company_profile.representativeInfo
                                    .lastName
                                : "No especificado"}
                            </p>
                          </div>
                          <div className="mb-3" data-oid="c64fszj">
                            <p
                              className="text-sm font-medium text-gray-500"
                              data-oid="s927lox"
                            >
                              Email
                            </p>
                            <p className="font-medium" data-oid="-zldfen">
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
                          data-oid="gp981jg"
                        >
                          <div data-oid="j-jbnvf">
                            <label
                              className="text-sm font-medium text-gray-500"
                              data-oid="xc1o2eb"
                            >
                              Nombre
                            </label>
                            <Input
                              name="representativeFirstName"
                              value={formData.representativeFirstName}
                              onChange={handleInputChange}
                              className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                              data-oid=":3mocc:"
                            />
                          </div>
                          <div data-oid="em8.z:0">
                            <label
                              className="text-sm font-medium text-gray-500"
                              data-oid="_iqan1i"
                            >
                              Apellido
                            </label>
                            <Input
                              name="representativeLastName"
                              value={formData.representativeLastName}
                              onChange={handleInputChange}
                              className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                              data-oid="_y422:7"
                            />
                          </div>
                          <div data-oid="6viy-kq">
                            <label
                              className="text-sm font-medium text-gray-500"
                              data-oid="w7t-w02"
                            >
                              Email
                            </label>
                            <Input
                              name="representativeEmail"
                              value={formData.representativeEmail}
                              onChange={handleInputChange}
                              className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                              data-oid="9:na67t"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  // Datos de usuario regular
                  <div data-oid="6r5mc5n">
                    <h4
                      className="text-base font-medium mb-4 flex items-center border-b border-gray-200 pb-2"
                      data-oid="i5:ldju"
                    >
                      <FileText
                        className="h-5 w-5 mr-2 text-gray-500"
                        data-oid="383c0k5"
                      />
                      Datos Personales
                    </h4>

                    {!isEditing ? (
                      <div
                        className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3"
                        data-oid="xv.bmgq"
                      >
                        <div className="mb-3" data-oid="4ytv7uz">
                          <p
                            className="text-sm font-medium text-gray-500"
                            data-oid="p3r3vur"
                          >
                            Título
                          </p>
                          <p className="font-medium" data-oid="2umqrtz">
                            {user.profile && user.profile.title
                              ? user.profile.title
                              : "No especificado"}
                          </p>
                        </div>
                        <div className="mb-3" data-oid="1v8gawx">
                          <p
                            className="text-sm font-medium text-gray-500"
                            data-oid="q1sz_gj"
                          >
                            Nombre
                          </p>
                          <p className="font-medium" data-oid="cx9b7-l">
                            {user.profile && user.profile.first_name
                              ? user.profile.first_name
                              : "No especificado"}
                          </p>
                        </div>
                        <div className="mb-3" data-oid="24a3hko">
                          <p
                            className="text-sm font-medium text-gray-500"
                            data-oid="fv4ykql"
                          >
                            Apellido
                          </p>
                          <p className="font-medium" data-oid="vpgpgbg">
                            {user.profile && user.profile.last_name
                              ? user.profile.last_name
                              : "No especificado"}
                          </p>
                        </div>
                        <div className="mb-3" data-oid="03a7xfb">
                          <p
                            className="text-sm font-medium text-gray-500"
                            data-oid="kfh6q5_"
                          >
                            Dirección
                          </p>
                          <p className="font-medium" data-oid="a0pdtk9">
                            {user.profile && user.profile.address
                              ? user.profile.address
                              : "No especificado"}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        data-oid=".2u7ffu"
                      >
                        <div className="space-y-4" data-oid="teocs0-">
                          <div data-oid="w0nj0_y">
                            <label
                              className="text-sm font-medium text-gray-500"
                              data-oid="bl69xcr"
                            >
                              Título
                            </label>
                            <Select
                              name="title"
                              value={formData.title || "none"}
                              onValueChange={(value) =>
                                setFormData({ ...formData, title: value })
                              }
                              data-oid="z4p9_17"
                            >
                              <SelectTrigger
                                className="border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                                data-oid="q405bn6"
                              >
                                <SelectValue
                                  placeholder="Seleccionar título"
                                  data-oid="3x5n56h"
                                />
                              </SelectTrigger>
                              <SelectContent data-oid="du3c6a3">
                                <SelectItem value="none" data-oid="v8it2js">
                                  Ninguno
                                </SelectItem>
                                <SelectItem value="Mr." data-oid="z.5-tlq">
                                  Sr.
                                </SelectItem>
                                <SelectItem value="Mrs." data-oid="jzyap--">
                                  Sra.
                                </SelectItem>
                                <SelectItem value="Ms." data-oid="-yymkhq">
                                  Srta.
                                </SelectItem>
                                <SelectItem value="Dr." data-oid="in-zhm8">
                                  Dr.
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div data-oid="ux1ndz-">
                            <label
                              className="text-sm font-medium text-gray-500"
                              data-oid="mhvw5d4"
                            >
                              Nombre
                            </label>
                            <Input
                              name="first_name"
                              value={formData.first_name}
                              onChange={handleInputChange}
                              className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                              data-oid="rx07ac8"
                            />
                          </div>
                        </div>

                        <div className="space-y-4" data-oid="egpn2qh">
                          <div data-oid="tkyo77r">
                            <label
                              className="text-sm font-medium text-gray-500"
                              data-oid="gxk-6lj"
                            >
                              Apellido
                            </label>
                            <Input
                              name="last_name"
                              value={formData.last_name}
                              onChange={handleInputChange}
                              className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                              data-oid="nm:pues"
                            />
                          </div>
                          <div data-oid="4v-3:0e">
                            <label
                              className="text-sm font-medium text-gray-500"
                              data-oid="b:lusg."
                            >
                              Dirección
                            </label>
                            <Textarea
                              name="address"
                              value={formData.address}
                              onChange={handleInputChange}
                              className="mt-1 border-gray-300 focus:border-gray-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md"
                              rows={3}
                              data-oid="qhb5_of"
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
          data-oid=".2k6n9a"
        >
          {/* Estadísticas de actividad */}
          <Card
            className="shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            data-oid="r_u.nzi"
          >
            <CardHeader className="bg-gray-50 border-b pb-3" data-oid="fk9px2x">
              <CardTitle
                className="flex items-center text-lg"
                data-oid="g9wnoff"
              >
                <BarChart
                  className="h-5 w-5 mr-2 text-gray-500"
                  data-oid="ay936p2"
                />
                Estadísticas
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 pb-6" data-oid="e9wbh6v">
              <div className="space-y-4" data-oid="czae0zu">
                <div
                  className="flex items-center justify-between py-2 border-b border-gray-100"
                  data-oid="a1h5ntf"
                >
                  <div className="flex items-center" data-oid="8g-ee_x">
                    <CreditCard
                      className="h-4 w-4 mr-3 text-gray-500"
                      data-oid="jdwcuxv"
                    />

                    <span className="text-sm text-gray-700" data-oid="g0.7utn">
                      Total gastado:
                    </span>
                  </div>
                  <span
                    className="font-medium text-gray-900"
                    data-oid="1vu3rn4"
                  >
                    {user.totalSpent ? `${user.totalSpent.toFixed(2)}€` : "N/A"}
                  </span>
                </div>
                <div
                  className="flex items-center justify-between py-2 border-b border-gray-100"
                  data-oid="i8u::4t"
                >
                  <div className="flex items-center" data-oid="_91l_0r">
                    <BookOpen
                      className="h-4 w-4 mr-3 text-gray-500"
                      data-oid="vwebaw0"
                    />

                    <span className="text-sm text-gray-700" data-oid="sv2ts60">
                      Reservas totales:
                    </span>
                  </div>
                  <span
                    className="font-medium text-gray-900"
                    data-oid=":.ykvip"
                  >
                    {user.bookingsCount || 0}
                  </span>
                </div>
                <div
                  className="flex items-center justify-between py-2"
                  data-oid="v-k:vf-"
                >
                  <div className="flex items-center" data-oid="71gv64f">
                    <Clock
                      className="h-4 w-4 mr-3 text-gray-500"
                      data-oid="4ff225k"
                    />

                    <span className="text-sm text-gray-700" data-oid="x3lvy_s">
                      Última reserva:
                    </span>
                  </div>
                  <span
                    className="font-medium text-gray-900"
                    data-oid="p_f010."
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
                    data-oid="mhtm7.3"
                  >
                    <h4
                      className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3"
                      data-oid="0:76l_:"
                    >
                      Destinos favoritos
                    </h4>
                    <div className="flex flex-wrap gap-2" data-oid="n.5sgn9">
                      {user.favoriteDestinations.map((destination, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="px-2 py-1 bg-gray-100 text-blue-700 hover:bg-gray-200"
                          data-oid="x1e2j27"
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
            data-oid="r2b6wmu"
          >
            <CardHeader className="bg-gray-50 border-b pb-3" data-oid="p6y_msd">
              <CardTitle
                className="flex items-center text-lg"
                data-oid="_j:vswy"
              >
                <Award
                  className="h-5 w-5 mr-2 text-gray-500"
                  data-oid="eccgn0j"
                />
                Etiquetas y Preferencias
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 pb-6" data-oid="akfyaix">
              <div className="space-y-4" data-oid="8d1:i28">
                <div
                  className="flex items-center justify-between py-2 border-b border-gray-100"
                  data-oid="q4ulrnv"
                >
                  <span className="text-sm text-gray-700" data-oid="1vthbjx">
                    Tipo de vehículo:
                  </span>
                  <span
                    className="font-medium text-gray-900"
                    data-oid="h7y1snt"
                  >
                    {user.preferences?.vehicleType || "No especificado"}
                  </span>
                </div>
                <div
                  className="flex items-center justify-between py-2 border-b border-gray-100"
                  data-oid="rcf997i"
                >
                  <span className="text-sm text-gray-700" data-oid="ajcctpq">
                    Método de pago:
                  </span>
                  <span
                    className="font-medium text-gray-900"
                    data-oid="0g6y4zi"
                  >
                    {user.preferences?.paymentMethod || "No especificado"}
                  </span>
                </div>
                <div
                  className="flex items-center justify-between py-2"
                  data-oid="sxf6:_m"
                >
                  <span className="text-sm text-gray-700" data-oid="ll529bp">
                    Notificaciones:
                  </span>
                  <Badge
                    variant="outline"
                    className={`${user.preferences?.notifications ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-100 text-gray-700 border-gray-200"}`}
                    data-oid="rtqni78"
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
                data-oid="xj9a.:_"
              >
                <h4
                  className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3"
                  data-oid="hlc-:rb"
                >
                  Etiquetas asignadas
                </h4>
                <div className="flex flex-wrap gap-2 mb-4" data-oid="5:.ylre">
                  {user.tags && user.tags.length > 0 ? (
                    user.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer group px-3 py-1 border-gray-300 flex items-center"
                        onClick={() => handleRemoveTag(tag)}
                        data-oid="wm8f.i7"
                      >
                        {tag}
                        <X
                          className="ml-1 h-3 w-3 opacity-60 group-hover:opacity-100"
                          data-oid="5..-z59"
                        />
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500" data-oid="lokiaxk">
                      Sin etiquetas asignadas
                    </p>
                  )}
                </div>

                <h4
                  className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3 mt-4"
                  data-oid="0pyjk5d"
                >
                  Asignar etiquetas
                </h4>
                <div className="flex flex-wrap gap-2" data-oid="2dsjetq">
                  {availableTags
                    .filter((tag) => !user.tags?.includes(tag))
                    .map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer hover:bg-gray-200 px-3 py-1 flex items-center"
                        onClick={() => handleAddTag(tag)}
                        data-oid="lny22_d"
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
          data-oid="9ka2fm:"
        >
          <CardHeader className="bg-gray-50 border-b pb-3" data-oid="txc34:p">
            <CardTitle className="flex items-center text-lg" data-oid="q1dz66w">
              <BookOpen
                className="h-5 w-5 mr-2 text-gray-500"
                data-oid="g7eu_7c"
              />
              Historial de Reservas
            </CardTitle>
            <CardDescription data-oid="b_sygft">
              Últimas reservas realizadas por el usuario
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 pb-6" data-oid="r4yierq">
            {user.bookingsCount && user.bookingsCount > 0 ? (
              <div className="overflow-x-auto" data-oid="r7.9xcn">
                <table className="w-full" data-oid="vp4cir3">
                  <thead data-oid="6c_t:n.">
                    <tr className="border-b" data-oid="ywph3s7">
                      <th
                        className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        data-oid="mlg.xv0"
                      >
                        ID
                      </th>
                      <th
                        className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        data-oid="sa6wwg:"
                      >
                        Destino
                      </th>
                      <th
                        className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        data-oid="vb5u4bf"
                      >
                        Fecha
                      </th>
                      <th
                        className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        data-oid="_t1jxj6"
                      >
                        Vehículo
                      </th>
                      <th
                        className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        data-oid="v68rhe6"
                      >
                        Importe
                      </th>
                      <th
                        className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        data-oid="_yj4wio"
                      >
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className="divide-y divide-gray-200"
                    data-oid="1qbh5kj"
                  >
                    {/* Aquí irían los datos de reservas (mockup) */}
                    <tr className="hover:bg-gray-50" data-oid="7cfbl_i">
                      <td
                        className="py-4 text-sm text-gray-500"
                        data-oid="m7fxn.f"
                      >
                        R-12345
                      </td>
                      <td
                        className="py-4 text-sm text-gray-900"
                        data-oid="hp46pp:"
                      >
                        Madrid - Barcelona
                      </td>
                      <td
                        className="py-4 text-sm text-gray-500"
                        data-oid="d4:4ptd"
                      >
                        15/06/2024
                      </td>
                      <td
                        className="py-4 text-sm text-gray-500"
                        data-oid="7l:nqlq"
                      >
                        Mercedes-Benz Clase S
                      </td>
                      <td
                        className="py-4 text-sm text-gray-500"
                        data-oid="itfq470"
                      >
                        450€
                      </td>
                      <td className="py-4" data-oid="k.n8ott">
                        <Badge
                          variant="secondary"
                          className="bg-gray-200 text-green-800 hover:bg-gray-200"
                          data-oid="uwsbui3"
                        >
                          Completado
                        </Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-10 text-center" data-oid="n3551y-">
                <div className="mb-4 flex justify-center" data-oid="a:las57">
                  <BookOpen
                    className="h-12 w-12 text-gray-300"
                    data-oid="ra7dkxi"
                  />
                </div>
                <p className="text-gray-500" data-oid="d1obejp">
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
