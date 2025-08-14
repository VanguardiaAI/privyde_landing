import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  Plus,
  Trash2,
  Tag,
  AlertTriangle,
  BarChart,
  BadgeCheck,
  Loader2,
  Building2,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import axiosInstance from "@/config/axios";
import { isAxiosError } from "axios";
// Importar componente de detalles del usuario
import UserDetailsView, { UserExtended } from "./UserDetailsView";

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
    confirmText = "Eliminar",
  } = props;

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      data-oid="_8gt9dt"
    >
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
        data-oid="5o.4_rl"
      ></div>
      <div
        className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        data-oid="3s5.z90"
      >
        <div className="mb-4" data-oid="_ksm1kt">
          <h2 className="text-lg font-semibold" data-oid="0i3wbq0">
            {title}
          </h2>
          <p className="text-gray-500 mt-1" data-oid="afo-s0_">
            {description}
          </p>
        </div>
        <div className="flex justify-end space-x-2" data-oid=".2pn2uu">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            data-oid="7i0f2d3"
          >
            {cancelText}
          </Button>
          <Button
            className="bg-black hover:bg-gray-800 text-white"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            data-oid="y1vofxp"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

// Tipo para usuarios
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "blocked";
  created_at: string;
  avatar?: string;
  tags?: string[];
  totalSpent?: number;
  bookingsCount?: number;
  lastBookingDate?: string;
  phone?: string;
  address?: string;
  profile_completed?: boolean;
  profile?: {
    title?: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    country_code?: string;
    address?: string;
  };
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
};

const UsersManager = () => {
  const { toast } = useToast();

  // Estado para usuarios
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estado para filtros
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [tagFilter, setTagFilter] = useState<string>("all");

  // Estado para diálogos
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [userFormOpen, setUserFormOpen] = useState(false);
  const [editingUser, setingUser] = useState<User | null>(null);
  const [newUserRole, setNewUserRole] = useState<string>("user");

  // Estado para vista de detalles
  const [detailsViewOpen, setDetailsViewOpen] = useState(false);
  const [selectedUserDetails, setSelectedUserDetails] =
    useState<UserExtended | null>(null);

  // Filtrar usuarios localmente
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;

    const searchLower = searchQuery.toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        (user.company_profile?.companyName || "")
          .toLowerCase()
          .includes(searchLower),
    );
  }, [users, searchQuery]);

  // Cargar usuarios cuando cambian los filtros
  useEffect(() => {
    fetchUsers();
  }, [roleFilter, statusFilter, tagFilter]);

  // Efecto para actualizar campos cuando cambia el rol
  useEffect(() => {
    // Este efecto solo se ejecuta cuando se está creando un nuevo usuario
    if (!editingUser && userFormOpen) {
      // Reiniciar formulario según el rol seleccionado
      console.log("Cambiando formulario para rol:", newUserRole);
    }
  }, [newUserRole, editingUser, userFormOpen]);

  // Función para obtener token de autenticación
  const getAuthToken = () => {
    return localStorage.getItem("authToken");
  };

  // Extraer la función fetchUsers
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = getAuthToken();

      if (!token) {
        setError("No hay sesión activa. Por favor inicie sesión");
        setLoading(false);
        return;
      }

      // Build params object only with non-empty values
      const params: any = {};
      if (roleFilter !== "all") params.role = roleFilter;
      if (statusFilter !== "all") params.status = statusFilter;
      if (tagFilter !== "all") params.tag = tagFilter;

      const response = await axiosInstance.get("/api/admin/users/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      });

      setUsers(response.data.users);
      setError(null);
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
      if (isAxiosError(err) && err.response?.status === 403) {
        setError("No tiene permisos de administrador para ver esta página");
      } else {
        setError("Error al cargar los usuarios. Intente nuevamente");
      }
    } finally {
      setLoading(false);
    }
  };

  // Obtener todos los tags únicos
  const allTags = Array.from(new Set(users.flatMap((user) => user.tags || [])));

  // Funciones para gestionar usuarios
  const handleAddUser = () => {
    setingUser(null);
    setNewUserRole("user");
    setUserFormOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    setSelectedUserId(userId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedUserId) {
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

        await axiosInstance.delete(`/api/admin/users/${selectedUserId}/delete`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(users.filter((user) => user.id !== selectedUserId));
        toast({
          title: "Usuario eliminado",
          description: "El usuario ha sido eliminado correctamente",
        });
      } catch (err) {
        console.error("Error al eliminar usuario:", err);
        toast({
          title: "Error",
          description: "No se pudo eliminar el usuario. Intente nuevamente",
          variant: "destructive",
        });
      } finally {
        setDeleteDialogOpen(false);
        setSelectedUserId(null);
      }
    }
  };

  const handleUserSubmit = async (formData: any) => {
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

      // Comprobar si es administrador (no se puede editar)
      if (editingUser && editingUser.role === "admin") {
        toast({
          title: "Acción no permitida",
          description:
            "Los administradores no pueden ser editados una vez creados",
          variant: "destructive",
        });
        setUserFormOpen(false);
        return;
      }

      // Preparar los datos según el tipo de usuario
      const userData: any = { ...formData };

      // Estructurar los datos del perfil
      if (
        editingUser?.role === "user" ||
        (formData.role === "user" && !editingUser)
      ) {
        userData.profile = {
          title: formData.title || "",
          first_name: formData.first_name || "",
          last_name: formData.last_name || "",
          phone: formData.phone || "",
          country_code: formData.country_code || "",
          address: formData.address || "",
        };
      }

      // Estructurar los datos de la empresa
      if (
        editingUser?.role === "company" ||
        (formData.role === "company" && !editingUser)
      ) {
        userData.is_company = true;
        userData.company_profile = {
          companyName: formData.companyName || "",
          phoneNumber: formData.phoneNumber || "",
          country: formData.country || "",
          location: formData.location || "",
          companySize: formData.companySize || "",
          hearAbout: formData.hearAbout || "",
          additionalInfo: formData.additionalInfo || "",
          representativeInfo: {
            firstName: formData.representativeFirstName || "",
            lastName: formData.representativeLastName || "",
            email: formData.representativeEmail || formData.email || "",
          },
          isCompany: true,
        };
      }

      if (editingUser) {
        // Actualizar usuario existente
        const response = await axiosInstance.put(
          `/api/admin/users/${editingUser.id}/update`,
          userData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setUsers(
          users.map((user) =>
            user.id === editingUser.id
              ? { ...user, ...response.data.user }
              : user,
          ),
        );

        toast({
          title: "Usuario actualizado",
          description: "El usuario ha sido actualizado correctamente",
        });
      } else {
        // Crear nuevo usuario
        const response = await axiosInstance.post("/api/admin/users/create", userData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const newUser: User = {
          ...response.data.user,
          tags: [],
          totalSpent: 0,
          bookingsCount: 0,
        };

        setUsers([...users, newUser]);

        toast({
          title: "Usuario creado",
          description: "El usuario ha sido creado correctamente",
        });
      }
    } catch (err) {
      console.error("Error al guardar usuario:", err);
      toast({
        title: "Error",
        description:
          isAxiosError(err) && err.response?.data?.error
            ? err.response.data.error
            : "No se pudo guardar el usuario. Intente nuevamente",
        variant: "destructive",
      });
    } finally {
      setUserFormOpen(false);
      setingUser(null);
    }
  };

  // Funciones para detalles de usuario
  const handleViewUserDetails = async (userId: string) => {
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

      const response = await axiosInstance.get(`/api/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSelectedUserDetails(response.data.user);
      setDetailsViewOpen(true);
    } catch (err) {
      console.error("Error al obtener detalles del usuario:", err);
      toast({
        title: "Error",
        description: "No se pudieron cargar los detalles del usuario",
        variant: "destructive",
      });
    }
  };

  // Agregar función para manejar el cierre del detalle y actualizar datos
  const handleCloseUserDetails = () => {
    setDetailsViewOpen(false);

    // Recargar los usuarios con los parámetros actuales
    const reloadUsers = async () => {
      try {
        setLoading(true);
        const token = getAuthToken();

        if (!token) {
          setError("No hay sesión activa. Por favor inicie sesión");
          return;
        }

        const response = await axiosInstance.get("/api/admin/users/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            role: roleFilter !== "all" ? roleFilter : "",
            status: statusFilter !== "all" ? statusFilter : "",
            search: searchQuery,
            tag: tagFilter !== "all" ? tagFilter : "",
          },
        });

        setUsers(response.data.users);
      } catch (err) {
        console.error("Error al recargar usuarios:", err);
      } finally {
        setLoading(false);
      }
    };

    reloadUsers();
  };

  // Función para asignar etiqueta
  const handleAssignTag = async (userId: string, tag: string) => {
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

      const response = await axiosInstance.post(
        `/api/admin/users/${userId}/tags`,
        {
          action: "add",
          tag,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Actualizar estado de usuarios
      setUsers(
        users.map((user) => {
          if (user.id === userId) {
            return { ...user, tags: response.data.tags };
          }
          return user;
        }),
      );

      // Actualizar detalles de usuario si están abiertos
      if (selectedUserDetails && selectedUserDetails.id === userId) {
        setSelectedUserDetails({
          ...selectedUserDetails,
          tags: response.data.tags,
        });
      }

      toast({
        title: "Etiqueta asignada",
        description: `La etiqueta "${tag}" ha sido asignada correctamente`,
      });
    } catch (err) {
      console.error("Error al asignar etiqueta:", err);
      toast({
        title: "Error",
        description: "No se pudo asignar la etiqueta",
        variant: "destructive",
      });
    }
  };

  // Función para eliminar etiqueta
  const handleRemoveTag = async (userId: string, tag: string) => {
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

      const response = await axiosInstance.post(
        `/api/admin/users/${userId}/tags`,
        {
          action: "remove",
          tag,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Actualizar estado de usuarios
      setUsers(
        users.map((user) => {
          if (user.id === userId) {
            return { ...user, tags: response.data.tags };
          }
          return user;
        }),
      );

      // Actualizar detalles de usuario si están abiertos
      if (selectedUserDetails && selectedUserDetails.id === userId) {
        setSelectedUserDetails({
          ...selectedUserDetails,
          tags: response.data.tags,
        });
      }

      toast({
        title: "Etiqueta eliminada",
        description: `La etiqueta "${tag}" ha sido eliminada correctamente`,
      });
    } catch (err) {
      console.error("Error al eliminar etiqueta:", err);
      toast({
        title: "Error",
        description: "No se pudo eliminar la etiqueta",
        variant: "destructive",
      });
    }
  };

  // Renderizar mensaje de error o carga
  if (error) {
    return (
      <div
        className="flex flex-col items-center justify-center h-[70vh]"
        data-oid="higyyi7"
      >
        <AlertTriangle
          className="h-12 w-12 text-black mb-4"
          data-oid="4jh:zhw"
        />

        <h2 className="text-2xl font-bold text-black" data-oid=".orvx5c">
          Error
        </h2>
        <p className="text-gray-600 mt-2" data-oid="oaxuk4f">
          {error}
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div
        className="flex flex-col items-center justify-center h-[70vh]"
        data-oid="2tc0721"
      >
        <Loader2
          className="h-12 w-12 text-black animate-spin mb-4"
          data-oid="kaiagc0"
        />

        <h2 className="text-xl font-medium text-gray-600" data-oid="jopcuke">
          Cargando usuarios...
        </h2>
      </div>
    );
  }

  // Renderizar la interfaz
  if (detailsViewOpen && selectedUserDetails) {
    return (
      <UserDetailsView
        user={selectedUserDetails}
        onClose={handleCloseUserDetails}
        onAssignTag={handleAssignTag}
        onRemoveTag={handleRemoveTag}
        data-oid="uh_e733"
      />
    );
  }

  // Renderizar la tabla de usuarios
  return (
    <div className="space-y-6" data-oid="28l84op">
      <div className="flex justify-between items-center" data-oid="jbwxeku">
        <h1 className="text-2xl font-bold text-gray-800" data-oid="_-w_xrf">
          Gestión de Usuarios
        </h1>
        <Button
          onClick={handleAddUser}
          className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          data-oid="h9qe11t"
        >
          <Plus size={18} className="mr-2" data-oid="jpa81du" />
          Añadir Usuario
        </Button>
      </div>

      {/* Filtros y búsqueda */}
      <Card data-oid="evc_kva">
        <CardContent className="pt-6" data-oid="z9z7.a2">
          <div
            className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4"
            data-oid="vzbb1tt"
          >
            <div className="flex-1" data-oid="mmezq3_">
              <div className="relative" data-oid="blpil6g">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                  data-oid="hvl.1b3"
                />

                <input
                  type="text"
                  placeholder="Buscar usuarios..."
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 pl-10 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-oid="61-x.:_"
                />
              </div>
            </div>
            <div
              className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4"
              data-oid="6cqr19w"
            >
              <Select
                value={roleFilter}
                onValueChange={setRoleFilter}
                data-oid=":e1hhmj"
              >
                <SelectTrigger
                  className="w-full md:w-[150px]"
                  data-oid="n4dd929"
                >
                  <SelectValue
                    placeholder="Filtrar por rol"
                    data-oid="0lg9jdw"
                  />
                </SelectTrigger>
                <SelectContent data-oid="sdbzxf5">
                  <SelectItem value="all" data-oid="b6.7e1r">
                    Todos los roles
                  </SelectItem>
                  <SelectItem value="admin" data-oid="207kg-y">
                    Administrador
                  </SelectItem>
                  <SelectItem value="company" data-oid="oa.mwob">
                    Empresa
                  </SelectItem>
                  <SelectItem value="user" data-oid="cceoixr">
                    Usuario
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
                data-oid=":2r.arn"
              >
                <SelectTrigger
                  className="w-full md:w-[150px]"
                  data-oid="oww:xj:"
                >
                  <SelectValue
                    placeholder="Filtrar por estado"
                    data-oid="emzszg3"
                  />
                </SelectTrigger>
                <SelectContent data-oid="b:ajsx:">
                  <SelectItem value="all" data-oid="q5jwtpt">
                    Todos
                  </SelectItem>
                  <SelectItem value="active" data-oid=".fnbsoe">
                    Activo
                  </SelectItem>
                  <SelectItem value="inactive" data-oid="3rwslq2">
                    Inactivo
                  </SelectItem>
                  <SelectItem value="blocked" data-oid="5s14uz-">
                    Bloqueado
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={tagFilter}
                onValueChange={setTagFilter}
                data-oid="wah-fd2"
              >
                <SelectTrigger
                  className="w-full md:w-[180px]"
                  data-oid="shgez:l"
                >
                  <SelectValue
                    placeholder="Filtrar por etiqueta"
                    data-oid=".3curpx"
                  />
                </SelectTrigger>
                <SelectContent data-oid="a5nj_ec">
                  <SelectItem value="all" data-oid=":8ojmk4">
                    Todas las etiquetas
                  </SelectItem>
                  {allTags.map((tag) => (
                    <SelectItem key={tag} value={tag} data-oid="vz36p1h">
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas rápidas */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
        data-oid="71np18t"
      >
        <Card data-oid="e4e_mn0">
          <CardContent className="pt-6" data-oid="-hycj8:">
            <div className="flex items-center" data-oid="rs2t7px">
              <div
                className="p-2 rounded-full bg-gray-200 text-gray-600 mr-4"
                data-oid="8meqlg_"
              >
                <BadgeCheck size={20} data-oid="_zpp_m5" />
              </div>
              <div data-oid="5h50wci">
                <p className="text-sm text-gray-500" data-oid="vy0gjcf">
                  Usuarios activos
                </p>
                <h3 className="text-2xl font-bold" data-oid="s4e8uz5">
                  {
                    users.filter(
                      (u) => u.status === "active" && u.role === "user",
                    ).length
                  }
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card data-oid="_8e6v7g">
          <CardContent className="pt-6" data-oid="gb2g1ln">
            <div className="flex items-center" data-oid="s.saa_s">
              <div
                className="p-2 rounded-full bg-gray-200 text-indigo-600 mr-4"
                data-oid="5-hswsv"
              >
                {" "}
                <Building2 size={20} data-oid="g37-cx1" />{" "}
              </div>
              <div data-oid="-_res.0">
                <p className="text-sm text-gray-500" data-oid="q_n4lm3">
                  Empresas registradas
                </p>
                <h3 className="text-2xl font-bold" data-oid=".6u0tmv">
                  {users.filter((u) => u.role === "company").length}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card data-oid="_cs95cy">
          <CardContent className="pt-6" data-oid="ye4sxxj">
            <div className="flex items-center" data-oid="_ee91-b">
              <div
                className="p-2 rounded-full bg-gray-200 text-purple-600 mr-4"
                data-oid="ddharsr"
              >
                <BarChart size={20} data-oid="3472-me" />
              </div>
              <div data-oid="_m-84.i">
                <p className="text-sm text-gray-500" data-oid="y2g66:o">
                  Gasto promedio
                </p>
                <h3 className="text-2xl font-bold" data-oid="gt-5-8d">
                  {users.length > 0
                    ? `${(users.reduce((acc, user) => acc + (user.totalSpent || 0), 0) / users.length).toFixed(2)}€`
                    : "0€"}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card data-oid="sb2u1h:">
          <CardContent className="pt-6" data-oid="35yr-py">
            <div className="flex items-center" data-oid="gh44noq">
              <div
                className="p-2 rounded-full bg-amber-100 text-amber-600 mr-4"
                data-oid="g35iwzs"
              >
                <Tag size={20} data-oid="nhfaz0h" />
              </div>
              <div data-oid="1rkz3.n">
                <p className="text-sm text-gray-500" data-oid=":7gyj6m">
                  Usuarios VIP
                </p>
                <h3 className="text-2xl font-bold" data-oid="4y2u0sv">
                  {users.filter((u) => u.tags?.includes("VIP")).length}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card data-oid="dq7kg4s">
          <CardContent className="pt-6" data-oid="rguu8w8">
            <div className="flex items-center" data-oid="ydli3qg">
              <div
                className="p-2 rounded-full bg-gray-200 text-gray-600 mr-4"
                data-oid="4tu5bks"
              >
                <AlertTriangle size={20} data-oid="6ivx1gd" />
              </div>
              <div data-oid="jsza_3o">
                <p className="text-sm text-gray-500" data-oid="kvbb39x">
                  Usuarios inactivos
                </p>
                <h3 className="text-2xl font-bold" data-oid="zhh7ccm">
                  {users.filter((u) => u.status === "inactive").length}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de usuarios */}
      <Card data-oid="874cwvv">
        <CardContent className="p-0" data-oid="wy45wbs">
          <div className="overflow-x-auto" data-oid="o4syt5m">
            <table className="w-full" data-oid="1n9yo:.">
              <thead data-oid="jg_dhyv">
                <tr className="bg-gray-50 border-b" data-oid="kfoyuhr">
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    data-oid="522idg7"
                  >
                    Usuario
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    data-oid="r5_g3.x"
                  >
                    Email
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    data-oid="36gdj3c"
                  >
                    Rol
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    data-oid="cl7vx1i"
                  >
                    Etiquetas
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    data-oid="j5qcvc6"
                  >
                    Gasto Total
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    data-oid="x1h93l4"
                  >
                    Estado
                  </th>
                  <th
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    data-oid="zxl3l0c"
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody
                className="bg-white divide-y divide-gray-200"
                data-oid="kaou:an"
              >
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleViewUserDetails(user.id)}
                    data-oid="pl3b_ne"
                  >
                    <td
                      className="px-6 py-4 whitespace-nowrap"
                      data-oid="btrgf5s"
                    >
                      <div className="flex items-center" data-oid="2al0-f7">
                        <div
                          className="h-10 w-10 flex-shrink-0"
                          data-oid="jte3s3v"
                        >
                          {user.avatar ? (
                            <img
                              className="h-10 w-10 rounded-full"
                              src={user.avatar}
                              alt={user.name}
                              data-oid="v4rq_eb"
                            />
                          ) : (
                            <div
                              className="h-10 w-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-medium"
                              data-oid="0uh.dgx"
                            >
                              {user.name[0].toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className="ml-4" data-oid="_qwl7.:">
                          <div
                            className="text-sm font-medium text-gray-900"
                            data-oid="g8:7-i5"
                          >
                            {user.name}
                          </div>
                          <div
                            className="text-sm text-gray-500"
                            data-oid="bkfopcy"
                          >
                            ID: {user.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      data-oid="cyebjs7"
                    >
                      {user.email}
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap"
                      data-oid="rtz4tw3"
                    >
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          user.role === "admin"
                            ? "bg-gray-200 text-purple-800"
                            : user.role === "company"
                              ? "bg-gray-200 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                        data-oid="9ebh4.m"
                      >
                        {user.role === "admin"
                          ? "Administrador"
                          : user.role === "company"
                            ? "Empresa"
                            : "Usuario"}
                      </span>
                    </td>
                    <td className="px-6 py-4" data-oid="ac0hqlk">
                      <div className="flex flex-wrap gap-1" data-oid="0b4f42u">
                        {user.tags && user.tags.length > 0 ? (
                          user.tags.slice(0, 2).map((tag, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                              data-oid="bx4cc1-"
                            >
                              {tag}
                            </span>
                          ))
                        ) : (
                          <span
                            className="text-gray-400 text-xs"
                            data-oid="19my-ew"
                          >
                            Sin etiquetas
                          </span>
                        )}
                        {user.tags && user.tags.length > 2 && (
                          <span
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                            data-oid="9gq.tar"
                          >
                            +{user.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm"
                      data-oid="xrqvqa9"
                    >
                      {user.totalSpent ? (
                        <span className="font-medium" data-oid="8dk1_e_">
                          {user.totalSpent.toFixed(2)}€
                        </span>
                      ) : (
                        <span className="text-gray-400" data-oid="ya5iu6j">
                          0€
                        </span>
                      )}
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap"
                      data-oid="6giq5v_"
                    >
                      <span
                        className={`px-2 py-1 text-xs rounded-full flex items-center w-fit ${
                          user.status === "active"
                            ? "bg-gray-200 text-green-800"
                            : user.status === "inactive"
                              ? "bg-gray-200 text-gray-800"
                              : "bg-gray-200 text-yellow-800"
                        }`}
                        data-oid="efxc-i8"
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full mr-1.5 ${
                            user.status === "active"
                              ? "bg-black"
                              : user.status === "inactive"
                                ? "bg-black"
                                : "bg-yellow-600"
                          }`}
                          data-oid="g-0mtv:"
                        ></span>
                        {user.status === "active"
                          ? "Activo"
                          : user.status === "inactive"
                            ? "Inactivo"
                            : "Bloqueado"}
                      </span>
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                      data-oid="_b2vpcz"
                    >
                      <div
                        className="flex justify-end space-x-2"
                        data-oid="17ab38i"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation(); // Evitar que se abra el detalle al hacer clic aquí
                            handleDeleteUser(user.id);
                          }}
                          className="text-gray-600 border-gray-200 hover:bg-gray-100"
                          data-oid="vvrdl0z"
                        >
                          <Trash2 size={16} data-oid="utbjd7z" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className="py-10 text-center" data-oid="t19jw82">
                <p className="text-gray-500" data-oid=":w:b:-z">
                  No se encontraron usuarios que coincidan con los criterios de
                  búsqueda
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Diálogo personalizado de eliminar usuario */}
      <CustomAlertDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        title="¿Estás seguro?"
        description="Esta acción eliminará permanentemente al usuario. Esta acción no se puede deshacer."
        data-oid="9tx834x"
      />

      {/* Formulario de usuario */}
      <Dialog
        open={userFormOpen}
        onOpenChange={setUserFormOpen}
        data-oid="1h2tfdj"
      >
        <DialogContent
          className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto"
          data-oid="appqyr4"
        >
          <DialogHeader data-oid="5gw88gy">
            <DialogTitle data-oid="rbmofnu">
              {editingUser ? "ar Usuario" : "Añadir Usuario"}
            </DialogTitle>
            <DialogDescription data-oid="_yhsqu7">
              {editingUser
                ? "Actualiza los datos del usuario"
                : "Completa el formulario para crear un nuevo usuario"}
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const data: any = {};

              // Recopilar todos los valores del formulario
              for (const [key, value] of formData.entries()) {
                data[key] = value;
              }

              handleUserSubmit(data);
            }}
            data-oid="7cc8e:."
          >
            <div className="grid gap-4 py-4" data-oid="0p7w9vx">
              {/* Campos comunes para todos los tipos de usuario */}
              <div
                className="grid grid-cols-4 items-center gap-4"
                data-oid="e4vozaf"
              >
                <label
                  htmlFor="name"
                  className="text-right text-sm"
                  data-oid="po6s4.k"
                >
                  Nombre
                </label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={editingUser?.name || ""}
                  className="col-span-3"
                  required
                  data-oid="3rm2fks"
                />
              </div>
              <div
                className="grid grid-cols-4 items-center gap-4"
                data-oid="lhvfxt-"
              >
                <label
                  htmlFor="email"
                  className="text-right text-sm"
                  data-oid="8c3py1i"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={editingUser?.email || ""}
                  className="col-span-3"
                  required
                  data-oid="j.nr1jj"
                />
              </div>

              {/* Contraseña (solo para nuevos usuarios) */}
              {!editingUser && (
                <div
                  className="grid grid-cols-4 items-center gap-4"
                  data-oid="gck86va"
                >
                  <label
                    htmlFor="password"
                    className="text-right text-sm"
                    data-oid="i3y4r2p"
                  >
                    Contraseña
                  </label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    className="col-span-3"
                    data-oid="xw1r_wx"
                  />
                </div>
              )}

              {/* Selector de rol (solo para nuevos usuarios) */}
              {!editingUser && (
                <div
                  className="grid grid-cols-4 items-center gap-4"
                  data-oid="nv6qr62"
                >
                  <label
                    htmlFor="role"
                    className="text-right text-sm"
                    data-oid="jaf:hzs"
                  >
                    Rol
                  </label>
                  <Select
                    name="role"
                    defaultValue="user"
                    onValueChange={(value) => setNewUserRole(value)}
                    data-oid="-looh4a"
                  >
                    <SelectTrigger className="col-span-3" data-oid="ccgb6e4">
                      <SelectValue
                        placeholder="Seleccionar rol"
                        data-oid="p34h:de"
                      />
                    </SelectTrigger>
                    <SelectContent data-oid="6u8ol1p">
                      <SelectItem value="admin" data-oid="5pq4wgu">
                        Administrador
                      </SelectItem>
                      <SelectItem value="company" data-oid="wesfam0">
                        Empresa
                      </SelectItem>
                      <SelectItem value="user" data-oid="6i4ux-q">
                        Usuario
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Mostrar rol como etiqueta para usuarios existentes */}
              {editingUser && (
                <div
                  className="grid grid-cols-4 items-center gap-4"
                  data-oid="e2z9xj:"
                >
                  <label
                    htmlFor="role"
                    className="text-right text-sm"
                    data-oid="i:ji6ni"
                  >
                    Rol
                  </label>
                  <div className="col-span-3" data-oid="2g0i3-l">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        editingUser.role === "admin"
                          ? "bg-gray-200 text-purple-800"
                          : editingUser.role === "company"
                            ? "bg-gray-200 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                      data-oid="eatmz6e"
                    >
                      {editingUser.role === "admin"
                        ? "Administrador"
                        : editingUser.role === "company"
                          ? "Empresa"
                          : "Usuario"}
                    </span>
                    <input
                      type="hidden"
                      name="role"
                      value={editingUser.role}
                      data-oid="kiooalh"
                    />
                  </div>
                </div>
              )}

              {/* Mostrar estado solo para usuarios existentes */}
              {editingUser && (
                <div
                  className="grid grid-cols-4 items-center gap-4"
                  data-oid="1yum04k"
                >
                  <label
                    htmlFor="status"
                    className="text-right text-sm"
                    data-oid="9669ssa"
                  >
                    Estado
                  </label>
                  <Select
                    name="status"
                    defaultValue={editingUser?.status || "active"}
                    data-oid="3vpij0:"
                  >
                    <SelectTrigger className="col-span-3" data-oid="2y80v88">
                      <SelectValue
                        placeholder="Seleccionar estado"
                        data-oid="2xl.m43"
                      />
                    </SelectTrigger>
                    <SelectContent data-oid="atwdioe">
                      <SelectItem value="active" data-oid="u777m3.">
                        Activo
                      </SelectItem>
                      <SelectItem value="inactive" data-oid="-b1a522">
                        Inactivo
                      </SelectItem>
                      <SelectItem value="blocked" data-oid="7omhpwe">
                        Bloqueado
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Campos específicos para usuarios regulares */}
              {(!editingUser || editingUser.role === "user") && (
                <>
                  <div className="mt-4 mb-2" data-oid="6nuug:0">
                    <h3 className="text-md font-medium" data-oid="y.51vu_">
                      Información personal
                    </h3>
                    <hr className="mt-2" data-oid="rjqzvsc" />
                  </div>

                  <div
                    className="grid grid-cols-4 items-center gap-4"
                    data-oid="685y2zv"
                  >
                    <label
                      htmlFor="title"
                      className="text-right text-sm"
                      data-oid="2hxid.b"
                    >
                      Título
                    </label>
                    <Select
                      name="title"
                      defaultValue={editingUser?.profile?.title || ""}
                      data-oid="p:km2_a"
                    >
                      <SelectTrigger className="col-span-3" data-oid=".iehf-a">
                        <SelectValue
                          placeholder="Seleccionar título"
                          data-oid="u6j1chs"
                        />
                      </SelectTrigger>
                      <SelectContent data-oid="q6z-tdi">
                        <SelectItem value="Mr." data-oid="4gzqz1y">
                          Sr.
                        </SelectItem>
                        <SelectItem value="Mrs." data-oid="avor6y6">
                          Sra.
                        </SelectItem>
                        <SelectItem value="Ms." data-oid="4czru3c">
                          Srta.
                        </SelectItem>
                        <SelectItem value="Dr." data-oid="1gsa240">
                          Dr.
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div
                    className="grid grid-cols-4 items-center gap-4"
                    data-oid="es11zmf"
                  >
                    <label
                      htmlFor="first_name"
                      className="text-right text-sm"
                      data-oid="v_3leej"
                    >
                      Nombre
                    </label>
                    <Input
                      id="first_name"
                      name="first_name"
                      defaultValue={editingUser?.profile?.first_name || ""}
                      className="col-span-3"
                      data-oid="-i-3t6_"
                    />
                  </div>

                  <div
                    className="grid grid-cols-4 items-center gap-4"
                    data-oid="h_kvle4"
                  >
                    <label
                      htmlFor="last_name"
                      className="text-right text-sm"
                      data-oid="wvgst2i"
                    >
                      Apellidos
                    </label>
                    <Input
                      id="last_name"
                      name="last_name"
                      defaultValue={editingUser?.profile?.last_name || ""}
                      className="col-span-3"
                      data-oid="8fy:gw_"
                    />
                  </div>

                  <div
                    className="grid grid-cols-4 items-center gap-4"
                    data-oid="b_1m66r"
                  >
                    <label
                      htmlFor="country_code"
                      className="text-right text-sm"
                      data-oid="h28hy6e"
                    >
                      Código de país
                    </label>
                    <Input
                      id="country_code"
                      name="country_code"
                      placeholder="+34, +52..."
                      defaultValue={editingUser?.profile?.country_code || ""}
                      className="col-span-3"
                      data-oid="ymdkdgi"
                    />
                  </div>

                  <div
                    className="grid grid-cols-4 items-center gap-4"
                    data-oid="bc0m575"
                  >
                    <label
                      htmlFor="phone"
                      className="text-right text-sm"
                      data-oid="lamyd-w"
                    >
                      Teléfono
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      defaultValue={editingUser?.profile?.phone || ""}
                      className="col-span-3"
                      data-oid="654iv.e"
                    />
                  </div>

                  <div
                    className="grid grid-cols-4 items-center gap-4"
                    data-oid="7s7vv2u"
                  >
                    <label
                      htmlFor="address"
                      className="text-right text-sm"
                      data-oid="-877xhc"
                    >
                      Dirección
                    </label>
                    <Input
                      id="address"
                      name="address"
                      defaultValue={editingUser?.profile?.address || ""}
                      className="col-span-3"
                      data-oid="4_::3dh"
                    />
                  </div>
                </>
              )}

              {/* Campos específicos para empresas */}
              {((!editingUser && newUserRole === "company") ||
                (editingUser && editingUser.role === "company")) && (
                <>
                  <div className="mt-4 mb-2" data-oid="lut9lwc">
                    <h3 className="text-md font-medium" data-oid="pybchhe">
                      Información de la empresa
                    </h3>
                    <hr className="mt-2" data-oid="hg_55vi" />
                  </div>

                  <div
                    className="grid grid-cols-4 items-center gap-4"
                    data-oid="h36er1v"
                  >
                    <label
                      htmlFor="companyName"
                      className="text-right text-sm"
                      data-oid="sd3n72c"
                    >
                      Nombre de la empresa
                    </label>
                    <Input
                      id="companyName"
                      name="companyName"
                      defaultValue={
                        editingUser?.company_profile?.companyName || ""
                      }
                      className="col-span-3"
                      data-oid="xmhgdn3"
                    />
                  </div>

                  <div
                    className="grid grid-cols-4 items-center gap-4"
                    data-oid="2aka17r"
                  >
                    <label
                      htmlFor="phoneNumber"
                      className="text-right text-sm"
                      data-oid="0o:x.q4"
                    >
                      Teléfono de contacto
                    </label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      defaultValue={
                        editingUser?.company_profile?.phoneNumber || ""
                      }
                      className="col-span-3"
                      data-oid="j3o2mbt"
                    />
                  </div>

                  <div
                    className="grid grid-cols-4 items-center gap-4"
                    data-oid="_8elpiv"
                  >
                    <label
                      htmlFor="country"
                      className="text-right text-sm"
                      data-oid="_xq1rbg"
                    >
                      País
                    </label>
                    <Input
                      id="country"
                      name="country"
                      defaultValue={editingUser?.company_profile?.country || ""}
                      className="col-span-3"
                      data-oid="t1es2aq"
                    />
                  </div>

                  <div
                    className="grid grid-cols-4 items-center gap-4"
                    data-oid="c66ajui"
                  >
                    <label
                      htmlFor="location"
                      className="text-right text-sm"
                      data-oid="vw:c-wm"
                    >
                      Ubicación
                    </label>
                    <Input
                      id="location"
                      name="location"
                      defaultValue={
                        editingUser?.company_profile?.location || ""
                      }
                      className="col-span-3"
                      data-oid="30pf9-z"
                    />
                  </div>

                  <div
                    className="grid grid-cols-4 items-center gap-4"
                    data-oid="pggy1zv"
                  >
                    <label
                      htmlFor="companySize"
                      className="text-right text-sm"
                      data-oid="o55buo:"
                    >
                      Tamaño de la empresa
                    </label>
                    <Select
                      name="companySize"
                      defaultValue={
                        editingUser?.company_profile?.companySize || ""
                      }
                      data-oid="nsso:he"
                    >
                      <SelectTrigger className="col-span-3" data-oid="9_z_09k">
                        <SelectValue
                          placeholder="Seleccionar tamaño"
                          data-oid="rwils3j"
                        />
                      </SelectTrigger>
                      <SelectContent data-oid="_fgiive">
                        <SelectItem value="1-10 empleados" data-oid="0fzxct2">
                          1-10 empleados
                        </SelectItem>
                        <SelectItem value="11-50 empleados" data-oid="t_usf1z">
                          11-50 empleados
                        </SelectItem>
                        <SelectItem value="51-200 empleados" data-oid="v7y920v">
                          51-200 empleados
                        </SelectItem>
                        <SelectItem
                          value="201-500 empleados"
                          data-oid="mlirrt4"
                        >
                          201-500 empleados
                        </SelectItem>
                        <SelectItem value="501+ empleados" data-oid="m4tq_3a">
                          501+ empleados
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div
                    className="grid grid-cols-4 items-center gap-4"
                    data-oid="eayn16b"
                  >
                    <label
                      htmlFor="hearAbout"
                      className="text-right text-sm"
                      data-oid="9.f88l:"
                    >
                      ¿Cómo nos conociste?
                    </label>
                    <Select
                      name="hearAbout"
                      defaultValue={
                        editingUser?.company_profile?.hearAbout || ""
                      }
                      data-oid="::6jrq0"
                    >
                      <SelectTrigger className="col-span-3" data-oid="-chd2xi">
                        <SelectValue
                          placeholder="Seleccionar"
                          data-oid="8aaigwi"
                        />
                      </SelectTrigger>
                      <SelectContent data-oid="tu7u0b9">
                        <SelectItem
                          value="Búsqueda en Google"
                          data-oid="mouk1uj"
                        >
                          Búsqueda en Google
                        </SelectItem>
                        <SelectItem value="Redes sociales" data-oid="5ao2:ny">
                          Redes sociales
                        </SelectItem>
                        <SelectItem value="Recomendación" data-oid="1z6w2oe">
                          Recomendación
                        </SelectItem>
                        <SelectItem value="Publicidad" data-oid="ag5jk23">
                          Publicidad
                        </SelectItem>
                        <SelectItem value="Otros" data-oid="gh3d_bm">
                          Otros
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div
                    className="grid grid-cols-4 items-center gap-4"
                    data-oid="1k-laqx"
                  >
                    <label
                      htmlFor="additionalInfo"
                      className="text-right text-sm align-top pt-2"
                      data-oid="i85yc3a"
                    >
                      Información adicional
                    </label>
                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      defaultValue={
                        editingUser?.company_profile?.additionalInfo || ""
                      }
                      className="col-span-3 min-h-[80px] px-3 py-2 border rounded-md"
                      data-oid="50obzxl"
                    />
                  </div>

                  <div className="mt-4 mb-2" data-oid="3x4q6:u">
                    <h3 className="text-md font-medium" data-oid="mkbhzw5">
                      Información del representante
                    </h3>
                    <hr className="mt-2" data-oid=":nfxvky" />
                  </div>

                  <div
                    className="grid grid-cols-4 items-center gap-4"
                    data-oid="hbuhnpg"
                  >
                    <label
                      htmlFor="representativeFirstName"
                      className="text-right text-sm"
                      data-oid="mksbi-7"
                    >
                      Nombre
                    </label>
                    <Input
                      id="representativeFirstName"
                      name="representativeFirstName"
                      defaultValue={
                        editingUser?.company_profile?.representativeInfo
                          ?.firstName || ""
                      }
                      className="col-span-3"
                      data-oid="y1fnd.1"
                    />
                  </div>

                  <div
                    className="grid grid-cols-4 items-center gap-4"
                    data-oid="qiycx39"
                  >
                    <label
                      htmlFor="representativeLastName"
                      className="text-right text-sm"
                      data-oid=":xxb74s"
                    >
                      Apellidos
                    </label>
                    <Input
                      id="representativeLastName"
                      name="representativeLastName"
                      defaultValue={
                        editingUser?.company_profile?.representativeInfo
                          ?.lastName || ""
                      }
                      className="col-span-3"
                      data-oid="sd8enk6"
                    />
                  </div>

                  <div
                    className="grid grid-cols-4 items-center gap-4"
                    data-oid="9p:vlxn"
                  >
                    <label
                      htmlFor="representativeEmail"
                      className="text-right text-sm"
                      data-oid="6msh-s9"
                    >
                      Email de contacto
                    </label>
                    <Input
                      id="representativeEmail"
                      name="representativeEmail"
                      defaultValue={
                        editingUser?.company_profile?.representativeInfo
                          ?.email || ""
                      }
                      className="col-span-3"
                      data-oid="47jfr5-"
                    />
                  </div>
                </>
              )}
            </div>
            <DialogFooter data-oid="58gq14h">
              {editingUser?.role === "admin" ? (
                <p
                  className="text-amber-600 text-sm mr-auto"
                  data-oid="yliavyd"
                >
                  Los administradores no pueden ser editados
                </p>
              ) : null}
              <Button
                type="submit"
                disabled={editingUser?.role === "admin"}
                data-oid="lvxi_aj"
              >
                {editingUser ? "Guardar Cambios" : "Crear Usuario"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersManager;
