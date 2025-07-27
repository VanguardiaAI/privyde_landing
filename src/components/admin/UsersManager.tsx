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
import axios from "axios";
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
      data-oid="-.7mxht"
    >
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
        data-oid="toge8vb"
      ></div>
      <div
        className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        data-oid="pdkbc4p"
      >
        <div className="mb-4" data-oid="ov3d3tc">
          <h2 className="text-lg font-semibold" data-oid="9a00jys">
            {title}
          </h2>
          <p className="text-gray-500 mt-1" data-oid="87_zbjh">
            {description}
          </p>
        </div>
        <div className="flex justify-end space-x-2" data-oid="wg7q5f7">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            data-oid="yqrb895"
          >
            {cancelText}
          </Button>
          <Button
            className="bg-black hover:bg-gray-800 text-white"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            data-oid="upyoo_p"
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

      const response = await axios.get("/api/admin/users/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          role: roleFilter !== "all" ? roleFilter : "",
          status: statusFilter !== "all" ? statusFilter : "",
          tag: tagFilter !== "all" ? tagFilter : "",
        },
      });

      setUsers(response.data.users);
      setError(null);
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
      if (axios.isAxiosError(err) && err.response?.status === 403) {
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

        await axios.delete(`/api/admin/users/${selectedUserId}/delete`, {
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
        const response = await axios.put(
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
        const response = await axios.post("/api/admin/users/create", userData, {
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
          axios.isAxiosError(err) && err.response?.data?.error
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

      const response = await axios.get(`/api/admin/users/${userId}`, {
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

        const response = await axios.get("/api/admin/users/list", {
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

      const response = await axios.post(
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

      const response = await axios.post(
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
        data-oid="o_5ip6u"
      >
        <AlertTriangle
          className="h-12 w-12 text-black mb-4"
          data-oid="pwzre:t"
        />

        <h2 className="text-2xl font-bold text-black" data-oid="lniwjql">
          Error
        </h2>
        <p className="text-gray-600 mt-2" data-oid="ijgpxh4">
          {error}
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div
        className="flex flex-col items-center justify-center h-[70vh]"
        data-oid=".hdpd12"
      >
        <Loader2
          className="h-12 w-12 text-black animate-spin mb-4"
          data-oid="p7mdc43"
        />

        <h2 className="text-xl font-medium text-gray-600" data-oid="a2kv2u9">
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
        data-oid="g-27533"
      />
    );
  }

  // Renderizar la tabla de usuarios
  return (
    <div className="space-y-6" data-oid="73d5nrr">
      <div className="flex justify-between items-center" data-oid="3hzmh82">
        <h1 className="text-2xl font-bold text-gray-800" data-oid="wx43ufb">
          Gestión de Usuarios
        </h1>
        <Button
          onClick={handleAddUser}
          className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          data-oid="7ktfsfs"
        >
          <Plus size={18} className="mr-2" data-oid="ppf078-" />
          Añadir Usuario
        </Button>
      </div>

      {/* Filtros y búsqueda */}
      <Card data-oid="b7x7.it">
        <CardContent className="pt-6" data-oid="lyui_eq">
          <div
            className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4"
            data-oid="h15qm2o"
          >
            <div className="flex-1" data-oid="rr3:7b7">
              <div className="relative" data-oid="qzt7qgg">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                  data-oid="z31l9g:"
                />

                <input
                  type="text"
                  placeholder="Buscar usuarios..."
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 pl-10 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-oid="d23_oxu"
                />
              </div>
            </div>
            <div
              className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4"
              data-oid="_ra.1kd"
            >
              <Select
                value={roleFilter}
                onValueChange={setRoleFilter}
                data-oid="cs0rrpq"
              >
                <SelectTrigger
                  className="w-full md:w-[150px]"
                  data-oid="0nn7k_m"
                >
                  <SelectValue
                    placeholder="Filtrar por rol"
                    data-oid=":gemtw9"
                  />
                </SelectTrigger>
                <SelectContent data-oid="zoy3i2j">
                  <SelectItem value="all" data-oid="2avnf-9">
                    Todos los roles
                  </SelectItem>
                  <SelectItem value="admin" data-oid="ujpd6n_">
                    Administrador
                  </SelectItem>
                  <SelectItem value="company" data-oid="6drkh:d">
                    Empresa
                  </SelectItem>
                  <SelectItem value="user" data-oid="ibwt2gg">
                    Usuario
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
                data-oid="g3a5i20"
              >
                <SelectTrigger
                  className="w-full md:w-[150px]"
                  data-oid="1-4fdd2"
                >
                  <SelectValue
                    placeholder="Filtrar por estado"
                    data-oid="jidplla"
                  />
                </SelectTrigger>
                <SelectContent data-oid="m8ihqdx">
                  <SelectItem value="all" data-oid="ge5385d">
                    Todos
                  </SelectItem>
                  <SelectItem value="active" data-oid="ypkx__8">
                    Activo
                  </SelectItem>
                  <SelectItem value="inactive" data-oid=":goqkqa">
                    Inactivo
                  </SelectItem>
                  <SelectItem value="blocked" data-oid="317eum.">
                    Bloqueado
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={tagFilter}
                onValueChange={setTagFilter}
                data-oid="jxqa3-8"
              >
                <SelectTrigger
                  className="w-full md:w-[180px]"
                  data-oid="9kydahl"
                >
                  <SelectValue
                    placeholder="Filtrar por etiqueta"
                    data-oid="hi38_n3"
                  />
                </SelectTrigger>
                <SelectContent data-oid="meulj65">
                  <SelectItem value="all" data-oid="bdl-3es">
                    Todas las etiquetas
                  </SelectItem>
                  {allTags.map((tag) => (
                    <SelectItem key={tag} value={tag} data-oid="shuy39t">
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
        data-oid="kfr2wu4"
      >
        <Card data-oid=".gmqefi">
          <CardContent className="pt-6" data-oid="19:z49u">
            <div className="flex items-center" data-oid="ea7kuvo">
              <div
                className="p-2 rounded-full bg-gray-200 text-gray-600 mr-4"
                data-oid="2g.l7c:"
              >
                <BadgeCheck size={20} data-oid="9_ki6o_" />
              </div>
              <div data-oid="91pqewi">
                <p className="text-sm text-gray-500" data-oid="8ea4lar">
                  Usuarios activos
                </p>
                <h3 className="text-2xl font-bold" data-oid="8mlm0ng">
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
        <Card data-oid="gx2owzp">
          <CardContent className="pt-6" data-oid="r288t5i">
            <div className="flex items-center" data-oid=".giildb">
              <div
                className="p-2 rounded-full bg-gray-200 text-indigo-600 mr-4"
                data-oid="o3oz53f"
              >
                {" "}
                <Building2 size={20} data-oid="geyz-iy" />{" "}
              </div>
              <div data-oid="dw4:2mv">
                <p className="text-sm text-gray-500" data-oid="bhcg1bl">
                  Empresas registradas
                </p>
                <h3 className="text-2xl font-bold" data-oid="l99u2s-">
                  {users.filter((u) => u.role === "company").length}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card data-oid="r1o02:-">
          <CardContent className="pt-6" data-oid="yap7njh">
            <div className="flex items-center" data-oid="yk5jx00">
              <div
                className="p-2 rounded-full bg-gray-200 text-purple-600 mr-4"
                data-oid="i2jjaag"
              >
                <BarChart size={20} data-oid="5:yld6n" />
              </div>
              <div data-oid="u9b2r52">
                <p className="text-sm text-gray-500" data-oid="6dvdinb">
                  Gasto promedio
                </p>
                <h3 className="text-2xl font-bold" data-oid="5jm:q84">
                  {users.length > 0
                    ? `${(users.reduce((acc, user) => acc + (user.totalSpent || 0), 0) / users.length).toFixed(2)}€`
                    : "0€"}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card data-oid="7ip.uul">
          <CardContent className="pt-6" data-oid="v5c:i71">
            <div className="flex items-center" data-oid="fcb8004">
              <div
                className="p-2 rounded-full bg-amber-100 text-amber-600 mr-4"
                data-oid="g1elrs8"
              >
                <Tag size={20} data-oid="rcvzes5" />
              </div>
              <div data-oid="w2r_nx8">
                <p className="text-sm text-gray-500" data-oid="scbm00p">
                  Usuarios VIP
                </p>
                <h3 className="text-2xl font-bold" data-oid="vv8_3_5">
                  {users.filter((u) => u.tags?.includes("VIP")).length}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card data-oid="25sep5s">
          <CardContent className="pt-6" data-oid="fr-_lki">
            <div className="flex items-center" data-oid="vhsnq9n">
              <div
                className="p-2 rounded-full bg-gray-200 text-gray-600 mr-4"
                data-oid=".pqqocw"
              >
                <AlertTriangle size={20} data-oid=".0n-e63" />
              </div>
              <div data-oid="m..tw0l">
                <p className="text-sm text-gray-500" data-oid="42414nc">
                  Usuarios inactivos
                </p>
                <h3 className="text-2xl font-bold" data-oid="y_ux1gr">
                  {users.filter((u) => u.status === "inactive").length}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de usuarios */}
      <Card data-oid="3bucz.3">
        <CardContent className="p-0" data-oid="4hf_uly">
          <div className="overflow-x-auto" data-oid="b4tg5_d">
            <table className="w-full" data-oid="slqe:wx">
              <thead data-oid=":fhfu_4">
                <tr className="bg-gray-50 border-b" data-oid="77jevfz">
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    data-oid="jo0fdpg"
                  >
                    Usuario
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    data-oid="gm_5m6d"
                  >
                    Email
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    data-oid="gl4c66c"
                  >
                    Rol
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    data-oid="eoov5vc"
                  >
                    Etiquetas
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    data-oid="mjm56g."
                  >
                    Gasto Total
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    data-oid="glr:6mi"
                  >
                    Estado
                  </th>
                  <th
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    data-oid="zqoqn:z"
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody
                className="bg-white divide-y divide-gray-200"
                data-oid="2r0v.e2"
              >
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleViewUserDetails(user.id)}
                    data-oid="n4v-w7y"
                  >
                    <td
                      className="px-6 py-4 whitespace-nowrap"
                      data-oid="jb4.kx3"
                    >
                      <div className="flex items-center" data-oid="6_c6-2-">
                        <div
                          className="h-10 w-10 flex-shrink-0"
                          data-oid="xykxjub"
                        >
                          {user.avatar ? (
                            <img
                              className="h-10 w-10 rounded-full"
                              src={user.avatar}
                              alt={user.name}
                              data-oid="-6ab_1i"
                            />
                          ) : (
                            <div
                              className="h-10 w-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-medium"
                              data-oid="qxsg8c9"
                            >
                              {user.name[0].toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className="ml-4" data-oid="v0.4vd9">
                          <div
                            className="text-sm font-medium text-gray-900"
                            data-oid="45x8.i0"
                          >
                            {user.name}
                          </div>
                          <div
                            className="text-sm text-gray-500"
                            data-oid="st.nm:x"
                          >
                            ID: {user.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      data-oid="1nm8og0"
                    >
                      {user.email}
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap"
                      data-oid="w_52qx_"
                    >
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          user.role === "admin"
                            ? "bg-gray-200 text-purple-800"
                            : user.role === "company"
                              ? "bg-gray-200 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                        data-oid="kg9e_88"
                      >
                        {user.role === "admin"
                          ? "Administrador"
                          : user.role === "company"
                            ? "Empresa"
                            : "Usuario"}
                      </span>
                    </td>
                    <td className="px-6 py-4" data-oid="y_02mkg">
                      <div className="flex flex-wrap gap-1" data-oid=".xh5bxy">
                        {user.tags && user.tags.length > 0 ? (
                          user.tags.slice(0, 2).map((tag, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                              data-oid=":7vwm-f"
                            >
                              {tag}
                            </span>
                          ))
                        ) : (
                          <span
                            className="text-gray-400 text-xs"
                            data-oid="l::1-0j"
                          >
                            Sin etiquetas
                          </span>
                        )}
                        {user.tags && user.tags.length > 2 && (
                          <span
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                            data-oid="vxjhq_f"
                          >
                            +{user.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm"
                      data-oid="veck98e"
                    >
                      {user.totalSpent ? (
                        <span className="font-medium" data-oid=":nb5.z3">
                          {user.totalSpent.toFixed(2)}€
                        </span>
                      ) : (
                        <span className="text-gray-400" data-oid="adrtr_-">
                          0€
                        </span>
                      )}
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap"
                      data-oid="1awk5bm"
                    >
                      <span
                        className={`px-2 py-1 text-xs rounded-full flex items-center w-fit ${
                          user.status === "active"
                            ? "bg-gray-200 text-green-800"
                            : user.status === "inactive"
                              ? "bg-gray-200 text-gray-800"
                              : "bg-gray-200 text-yellow-800"
                        }`}
                        data-oid="0-39xen"
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full mr-1.5 ${
                            user.status === "active"
                              ? "bg-black"
                              : user.status === "inactive"
                                ? "bg-black"
                                : "bg-yellow-600"
                          }`}
                          data-oid="v6kemae"
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
                      data-oid="fk88zcb"
                    >
                      <div
                        className="flex justify-end space-x-2"
                        data-oid="f6l.rpv"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation(); // Evitar que se abra el detalle al hacer clic aquí
                            handleDeleteUser(user.id);
                          }}
                          className="text-gray-600 border-gray-200 hover:bg-gray-100"
                          data-oid="vkz.qrj"
                        >
                          <Trash2 size={16} data-oid="n.ifv7:" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className="py-10 text-center" data-oid="7mga7yq">
                <p className="text-gray-500" data-oid="zt9se3m">
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
        data-oid="9r7g4es"
      />

      {/* Formulario de usuario */}
      <Dialog
        open={userFormOpen}
        onOpenChange={setUserFormOpen}
        data-oid="rqouppw"
      >
        <DialogContent
          className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto"
          data-oid="qx4zf0w"
        >
          <DialogHeader data-oid="pc7a1bn">
            <DialogTitle data-oid="qkg3rd9">
              {editingUser ? "ar Usuario" : "Añadir Usuario"}
            </DialogTitle>
            <DialogDescription data-oid="5j4k2h9">
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
            data-oid="mp:t8:v"
          >
            <div className="grid gap-4 py-4" data-oid="e_z632f">
              {/* Campos comunes para todos los tipos de usuario */}
              <div
                className="grid grid-cols-4 items-center gap-4"
                data-oid="b1:57eq"
              >
                <label
                  htmlFor="name"
                  className="text-right text-sm"
                  data-oid="bkrd17w"
                >
                  Nombre
                </label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={editingUser?.name || ""}
                  className="col-span-3"
                  required
                  data-oid="q50re1g"
                />
              </div>
              <div
                className="grid grid-cols-4 items-center gap-4"
                data-oid="sbjum__"
              >
                <label
                  htmlFor="email"
                  className="text-right text-sm"
                  data-oid="9nbld6w"
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
                  data-oid="ws_291_"
                />
              </div>

              {/* Contraseña (solo para nuevos usuarios) */}
              {!editingUser && (
                <div
                  className="grid grid-cols-4 items-center gap-4"
                  data-oid="p01vlpd"
                >
                  <label
                    htmlFor="password"
                    className="text-right text-sm"
                    data-oid="d5m_n-l"
                  >
                    Contraseña
                  </label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    className="col-span-3"
                    data-oid="tc20dzu"
                  />
                </div>
              )}

              {/* Selector de rol (solo para nuevos usuarios) */}
              {!editingUser && (
                <div
                  className="grid grid-cols-4 items-center gap-4"
                  data-oid="tx5epdx"
                >
                  <label
                    htmlFor="role"
                    className="text-right text-sm"
                    data-oid="sj664wd"
                  >
                    Rol
                  </label>
                  <Select
                    name="role"
                    defaultValue="user"
                    onValueChange={(value) => setNewUserRole(value)}
                    data-oid=".86rvu5"
                  >
                    <SelectTrigger className="col-span-3" data-oid="rky3m_p">
                      <SelectValue
                        placeholder="Seleccionar rol"
                        data-oid="kc9q5lq"
                      />
                    </SelectTrigger>
                    <SelectContent data-oid="7r1l19:">
                      <SelectItem value="admin" data-oid="euc3-hh">
                        Administrador
                      </SelectItem>
                      <SelectItem value="company" data-oid="oqpljq6">
                        Empresa
                      </SelectItem>
                      <SelectItem value="user" data-oid="kcofxhm">
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
                  data-oid="1:ynam0"
                >
                  <label
                    htmlFor="role"
                    className="text-right text-sm"
                    data-oid="c5dwktb"
                  >
                    Rol
                  </label>
                  <div className="col-span-3" data-oid="p5hkzwf">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        editingUser.role === "admin"
                          ? "bg-gray-200 text-purple-800"
                          : editingUser.role === "company"
                            ? "bg-gray-200 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                      data-oid="cjmqjwt"
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
                      data-oid="thglvd:"
                    />
                  </div>
                </div>
              )}

              {/* Mostrar estado solo para usuarios existentes */}
              {editingUser && (
                <div
                  className="grid grid-cols-4 items-center gap-4"
                  data-oid="sbwnq8y"
                >
                  <label
                    htmlFor="status"
                    className="text-right text-sm"
                    data-oid="fenuyyc"
                  >
                    Estado
                  </label>
                  <Select
                    name="status"
                    defaultValue={editingUser?.status || "active"}
                    data-oid="k9hggsa"
                  >
                    <SelectTrigger className="col-span-3" data-oid="o5qv4bb">
                      <SelectValue
                        placeholder="Seleccionar estado"
                        data-oid="0q4f5ov"
                      />
                    </SelectTrigger>
                    <SelectContent data-oid="z9sxo7_">
                      <SelectItem value="active" data-oid="etnmctq">
                        Activo
                      </SelectItem>
                      <SelectItem value="inactive" data-oid="qagx2xf">
                        Inactivo
                      </SelectItem>
                      <SelectItem value="blocked" data-oid="yqvb64:">
                        Bloqueado
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Campos específicos para usuarios regulares */}
              {(!editingUser || editingUser.role === "user") && (
                <>
                  <div className="mt-4 mb-2" data-oid="-7a:d:x">
                    <h3 className="text-md font-medium" data-oid="wzd0m8b">
                      Información personal
                    </h3>
                    <hr className="mt-2" data-oid="qmvu-:5" />
                  </div>

                  <div
                    className="grid grid-cols-4 items-center gap-4"
                    data-oid="g6ipag8"
                  >
                    <label
                      htmlFor="title"
                      className="text-right text-sm"
                      data-oid="dokh:vf"
                    >
                      Título
                    </label>
                    <Select
                      name="title"
                      defaultValue={editingUser?.profile?.title || ""}
                      data-oid="p:4-p26"
                    >
                      <SelectTrigger className="col-span-3" data-oid="jqme5_5">
                        <SelectValue
                          placeholder="Seleccionar título"
                          data-oid="9b6de5n"
                        />
                      </SelectTrigger>
                      <SelectContent data-oid="3oa:blz">
                        <SelectItem value="Mr." data-oid="cciahea">
                          Sr.
                        </SelectItem>
                        <SelectItem value="Mrs." data-oid="k_qeqgm">
                          Sra.
                        </SelectItem>
                        <SelectItem value="Ms." data-oid="oy1dc9a">
                          Srta.
                        </SelectItem>
                        <SelectItem value="Dr." data-oid="uhr-jvo">
                          Dr.
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div
                    className="grid grid-cols-4 items-center gap-4"
                    data-oid=":237p6s"
                  >
                    <label
                      htmlFor="first_name"
                      className="text-right text-sm"
                      data-oid="p0k2nd-"
                    >
                      Nombre
                    </label>
                    <Input
                      id="first_name"
                      name="first_name"
                      defaultValue={editingUser?.profile?.first_name || ""}
                      className="col-span-3"
                      data-oid="sjffdy5"
                    />
                  </div>

                  <div
                    className="grid grid-cols-4 items-center gap-4"
                    data-oid="yxf1d2w"
                  >
                    <label
                      htmlFor="last_name"
                      className="text-right text-sm"
                      data-oid="x2purs5"
                    >
                      Apellidos
                    </label>
                    <Input
                      id="last_name"
                      name="last_name"
                      defaultValue={editingUser?.profile?.last_name || ""}
                      className="col-span-3"
                      data-oid="z2r5kbu"
                    />
                  </div>

                  <div
                    className="grid grid-cols-4 items-center gap-4"
                    data-oid=":wxj:-t"
                  >
                    <label
                      htmlFor="country_code"
                      className="text-right text-sm"
                      data-oid="c5bx.d1"
                    >
                      Código de país
                    </label>
                    <Input
                      id="country_code"
                      name="country_code"
                      placeholder="+34, +52..."
                      defaultValue={editingUser?.profile?.country_code || ""}
                      className="col-span-3"
                      data-oid="agsao6h"
                    />
                  </div>

                  <div
                    className="grid grid-cols-4 items-center gap-4"
                    data-oid="0zr0sn1"
                  >
                    <label
                      htmlFor="phone"
                      className="text-right text-sm"
                      data-oid=".ub5f.k"
                    >
                      Teléfono
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      defaultValue={editingUser?.profile?.phone || ""}
                      className="col-span-3"
                      data-oid="6p8dke_"
                    />
                  </div>

                  <div
                    className="grid grid-cols-4 items-center gap-4"
                    data-oid="c83ocls"
                  >
                    <label
                      htmlFor="address"
                      className="text-right text-sm"
                      data-oid="fulsf0w"
                    >
                      Dirección
                    </label>
                    <Input
                      id="address"
                      name="address"
                      defaultValue={editingUser?.profile?.address || ""}
                      className="col-span-3"
                      data-oid="a3mxbsf"
                    />
                  </div>
                </>
              )}

              {/* Campos específicos para empresas */}
              {((!editingUser && newUserRole === "company") ||
                (editingUser && editingUser.role === "company")) && (
                <>
                  <div className="mt-4 mb-2" data-oid="l20hjuy">
                    <h3 className="text-md font-medium" data-oid="z.vk77y">
                      Información de la empresa
                    </h3>
                    <hr className="mt-2" data-oid="f0wbu6:" />
                  </div>

                  <div
                    className="grid grid-cols-4 items-center gap-4"
                    data-oid="iw2ew7c"
                  >
                    <label
                      htmlFor="companyName"
                      className="text-right text-sm"
                      data-oid="sp._q7p"
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
                      data-oid="2.qglv-"
                    />
                  </div>

                  <div
                    className="grid grid-cols-4 items-center gap-4"
                    data-oid="19z1mkp"
                  >
                    <label
                      htmlFor="phoneNumber"
                      className="text-right text-sm"
                      data-oid="5_is1py"
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
                      data-oid="opuku.t"
                    />
                  </div>

                  <div
                    className="grid grid-cols-4 items-center gap-4"
                    data-oid="4f3vddr"
                  >
                    <label
                      htmlFor="country"
                      className="text-right text-sm"
                      data-oid="dobti.l"
                    >
                      País
                    </label>
                    <Input
                      id="country"
                      name="country"
                      defaultValue={editingUser?.company_profile?.country || ""}
                      className="col-span-3"
                      data-oid="b:23qg7"
                    />
                  </div>

                  <div
                    className="grid grid-cols-4 items-center gap-4"
                    data-oid="061a0tc"
                  >
                    <label
                      htmlFor="location"
                      className="text-right text-sm"
                      data-oid="tobohjj"
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
                      data-oid="wsq2skm"
                    />
                  </div>

                  <div
                    className="grid grid-cols-4 items-center gap-4"
                    data-oid="che4lzk"
                  >
                    <label
                      htmlFor="companySize"
                      className="text-right text-sm"
                      data-oid=":x7g_dq"
                    >
                      Tamaño de la empresa
                    </label>
                    <Select
                      name="companySize"
                      defaultValue={
                        editingUser?.company_profile?.companySize || ""
                      }
                      data-oid="bujmcr6"
                    >
                      <SelectTrigger className="col-span-3" data-oid="-:n1ccj">
                        <SelectValue
                          placeholder="Seleccionar tamaño"
                          data-oid="e-dnjzz"
                        />
                      </SelectTrigger>
                      <SelectContent data-oid="m6j4ixt">
                        <SelectItem value="1-10 empleados" data-oid="5uck9yk">
                          1-10 empleados
                        </SelectItem>
                        <SelectItem value="11-50 empleados" data-oid="cwt.p1b">
                          11-50 empleados
                        </SelectItem>
                        <SelectItem value="51-200 empleados" data-oid="xb0cjd.">
                          51-200 empleados
                        </SelectItem>
                        <SelectItem
                          value="201-500 empleados"
                          data-oid="encabiq"
                        >
                          201-500 empleados
                        </SelectItem>
                        <SelectItem value="501+ empleados" data-oid="oyj4g80">
                          501+ empleados
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div
                    className="grid grid-cols-4 items-center gap-4"
                    data-oid="635v3fw"
                  >
                    <label
                      htmlFor="hearAbout"
                      className="text-right text-sm"
                      data-oid="f8yg3zs"
                    >
                      ¿Cómo nos conociste?
                    </label>
                    <Select
                      name="hearAbout"
                      defaultValue={
                        editingUser?.company_profile?.hearAbout || ""
                      }
                      data-oid="cbgvoee"
                    >
                      <SelectTrigger className="col-span-3" data-oid="dg3-r8e">
                        <SelectValue
                          placeholder="Seleccionar"
                          data-oid="xc9liqx"
                        />
                      </SelectTrigger>
                      <SelectContent data-oid="k10i6.3">
                        <SelectItem
                          value="Búsqueda en Google"
                          data-oid="29f:1ga"
                        >
                          Búsqueda en Google
                        </SelectItem>
                        <SelectItem value="Redes sociales" data-oid="0reo:g.">
                          Redes sociales
                        </SelectItem>
                        <SelectItem value="Recomendación" data-oid=":9gih6b">
                          Recomendación
                        </SelectItem>
                        <SelectItem value="Publicidad" data-oid="fi:r.nm">
                          Publicidad
                        </SelectItem>
                        <SelectItem value="Otros" data-oid="tnf-:ze">
                          Otros
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div
                    className="grid grid-cols-4 items-center gap-4"
                    data-oid="35phc2r"
                  >
                    <label
                      htmlFor="additionalInfo"
                      className="text-right text-sm align-top pt-2"
                      data-oid="-rcgjxq"
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
                      data-oid="l0vxga."
                    />
                  </div>

                  <div className="mt-4 mb-2" data-oid="owx__n1">
                    <h3 className="text-md font-medium" data-oid="gs:101j">
                      Información del representante
                    </h3>
                    <hr className="mt-2" data-oid="c2n:t4-" />
                  </div>

                  <div
                    className="grid grid-cols-4 items-center gap-4"
                    data-oid="lv4oa9t"
                  >
                    <label
                      htmlFor="representativeFirstName"
                      className="text-right text-sm"
                      data-oid=":c44-nr"
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
                      data-oid="_m_33ks"
                    />
                  </div>

                  <div
                    className="grid grid-cols-4 items-center gap-4"
                    data-oid="e3ji77m"
                  >
                    <label
                      htmlFor="representativeLastName"
                      className="text-right text-sm"
                      data-oid="zd.lnd7"
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
                      data-oid="eng1py6"
                    />
                  </div>

                  <div
                    className="grid grid-cols-4 items-center gap-4"
                    data-oid="ofsxmcx"
                  >
                    <label
                      htmlFor="representativeEmail"
                      className="text-right text-sm"
                      data-oid="ljy2a6n"
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
                      data-oid="39wco5-"
                    />
                  </div>
                </>
              )}
            </div>
            <DialogFooter data-oid="_l-a1t5">
              {editingUser?.role === "admin" ? (
                <p
                  className="text-amber-600 text-sm mr-auto"
                  data-oid="73v:3te"
                >
                  Los administradores no pueden ser editados
                </p>
              ) : null}
              <Button
                type="submit"
                disabled={editingUser?.role === "admin"}
                data-oid="1qa.npt"
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
