import { useAuth } from "../context/AuthContext";

import { useState, useEffect } from "react";
import {
  Users,
  Car,
  CalendarClock,
  MessageSquare,
  BarChart2,
  Settings,
  FileText,
  LogOut,
  Home,
  PlusCircle,
  Search,
  ChevronDown,
  Menu,
  Pin,
  X,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import NotificationsMenu from "@/components/admin/NotificationsMenu";

// Importar la sección de vehículos modularizada
import VehiclesSection from "@/components/admin/sections/VehiclesSection";

// Importar la sección de chóferes modularizada
import DriversSection from "@/components/admin/sections/DriversSection";

// Importar la sección de colaboradores modularizada
import CollaboratorsSection from "@/components/admin/sections/CollaboratorsSection";

// Importar la sección de reservas modularizada
import BookingsSection from "@/components/admin/sections/BookingsSection";

// Importar la sección de rutas modularizada
import RoutesSection from "@/components/admin/sections/RoutesSection";

// Importar StatsSection
import StatsSection from "@/components/admin/StatsSection";

// Importar UsersManager con la ruta correcta
import UsersManager from "@/components/admin/UsersManager";

// Importar SupportSection
import SupportSection from "@/components/admin/sections/SupportSection";

// Importar la sección de blog modularizada
import BlogSection from "@/components/admin/sections/BlogSection";

// Definir el tipo para las reservas
export interface Booking {
  id: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  status:
    | "pending"
    | "confirmed"
    | "in_progress"
    | "completed"
    | "cancelled"
    | "no_show";
  pickupDateTime: string;
  pickupLocation: string;
  pickupCoordinates?: { lat: number; lng: number };
  dropoffLocation: string;
  dropoffCoordinates?: { lat: number; lng: number };
  stops?: { location: string; coordinates?: { lat: number; lng: number } }[];
  serviceType: "one_way" | "round_trip" | "hourly" | "full_day";
  vehicleId?: string;
  vehicleInfo?: {
    brand: string;
    model: string;
    licensePlate: string;
    image?: string;
  };
  driverId?: string;
  driverInfo?: {
    name: string;
    phone: string;
    photo?: string;
  };
  passengers: number;
  luggage: number;
  price: {
    amount: number;
    currency: string;
    paymentMethod:
      | "credit_card"
      | "paypal"
      | "cash"
      | "bank_transfer"
      | "invoice";
    paymentStatus: "pending" | "paid" | "refunded" | "failed";
  };
  notes?: string;
  specialRequests?: string[];
  createdAt: string;
  updatedAt: string;
  incidentHistory?: {
    timestamp: string;
    type: "delay" | "cancellation" | "change" | "complaint" | "other";
    description: string;
    resolvedBy?: string;
    resolution?: string;
    status: "pending" | "in_progress" | "resolved";
  }[];
}

// Componente para mostrar una tarjeta de estadísticas
const StatCard = ({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}) => (
  <div
    className="bg-white rounded-xl shadow-md p-6 flex items-center"
    data-oid="-s:ul86"
  >
    <div className={`p-4 rounded-xl ${color} mr-4`} data-oid="mortesx">
      {icon}
    </div>
    <div data-oid=":lb_hl7">
      <h3 className="text-sm text-gray-500" data-oid="sygk4fh">
        {title}
      </h3>
      <p className="text-2xl font-bold" data-oid="-0wxczx">
        {value}
      </p>
    </div>
  </div>
);

export default function AdminPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);

  // Función para obtener parámetros de URL
  const getUrlParams = () => {
    const searchParams = new URLSearchParams(location.search);
    const section = searchParams.get("section");
    const conversation = searchParams.get("conversation");
    return { section, conversation };
  };

  // Forzar redirección si no es administrador
  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  // Procesar parámetros de URL al cargar la página
  useEffect(() => {
    const { section, conversation } = getUrlParams();

    if (section) {
      setActiveSection(section);
    }

    if (conversation) {
      setSelectedConversationId(conversation);
    }
  }, [location.search]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Función para manejar selección de conversación desde notificaciones
  const handleSelectSupportConversation = (conversationId: string) => {
    setActiveSection("support");
    setSelectedConversationId(conversationId);

    // Actualizar URL para reflejar el cambio sin recargar la página
    const newUrl = conversationId
      ? `/admin?section=support&conversation=${conversationId}`
      : `/admin?section=support`;

    window.history.pushState({}, "", newUrl);
  };

  const sidebarItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <Home size={20} data-oid="mvy5--y" />,
    },
    {
      id: "users",
      label: "Usuarios",
      icon: <Users size={20} data-oid="_iugh5m" />,
    },
    {
      id: "collaborators",
      label: "Colaboradores",
      icon: <Users size={20} data-oid="d1-58xf" />,
    },
    {
      id: "drivers",
      label: "Chóferes",
      icon: <Users size={20} data-oid="c2wmz0-" />,
    },
    {
      id: "vehicles",
      label: "Vehículos",
      icon: <Car size={20} data-oid="zkot4f9" />,
    },
    {
      id: "routes",
      label: "Rutas",
      icon: <Pin size={20} data-oid="0grefl7" />,
    },
    {
      id: "bookings",
      label: "Reservas",
      icon: <CalendarClock size={20} data-oid="b-o54:3" />,
    },
    {
      id: "support",
      label: "Soporte",
      icon: <MessageSquare size={20} data-oid=".2a4ltb" />,
    },
    {
      id: "blog",
      label: "Blog",
      icon: <FileText size={20} data-oid="dz:_5ef" />,
    },
    {
      id: "stats",
      label: "Estadísticas",
      icon: <BarChart2 size={20} data-oid="rjso5r9" />,
    },
    {
      id: "settings",
      label: "Configuración",
      icon: <Settings size={20} data-oid="9m_36ub" />,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100" data-oid="8.nis_t">
      {/* Sidebar - Versión escritorio */}
      <div
        className="hidden md:flex flex-col w-64 border-r bg-white"
        data-oid="f2d6n5s"
      >
        <div className="p-5 border-b" data-oid="ne4zvt9">
          <h1 className="text-xl font-bold text-gray-800" data-oid="_6ncg3u">
            Panel Admin
          </h1>
          <p className="text-sm text-gray-500 mt-1" data-oid="yq_hta4">
            Privyde Transport
          </p>
        </div>

        <div className="flex-1 overflow-y-auto py-4" data-oid="lngi1vm">
          <nav className="px-2 space-y-1" data-oid="awml-i4">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                className={`w-full flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                  activeSection === item.id
                    ? "bg-gray-100 text-gray-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveSection(item.id)}
                data-oid="ovsxn2-"
              >
                <span className="mr-3" data-oid="gapu4h.">
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t" data-oid="68_4vwx">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
            data-oid="g.u5hzg"
          >
            <LogOut size={20} className="mr-3" data-oid="r76mzva" />
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Sidebar móvil */}
      <div
        className={`md:hidden fixed inset-0 z-50 bg-gray-800 bg-opacity-50 transition-opacity ${menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        data-oid=":ilatk3"
      >
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-white transition-transform transform ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
          data-oid="fo8mdg:"
        >
          <div
            className="p-5 border-b flex justify-between items-center"
            data-oid="peenpe."
          >
            <h1 className="text-xl font-bold text-gray-800" data-oid="y.ojg-j">
              Panel Admin
            </h1>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-gray-500"
              data-oid="vorkl:j"
            >
              <X size={24} data-oid="z31zj-x" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4" data-oid="nb3em-d">
            <nav className="px-2 space-y-1" data-oid="gxr99:3">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  className={`w-full flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                    activeSection === item.id
                      ? "bg-gray-100 text-gray-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setActiveSection(item.id);
                    setMenuOpen(false);
                  }}
                  data-oid="4f1e_t2"
                >
                  <span className="mr-3" data-oid="j0ktreu">
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-4 border-t" data-oid="j6o4e-x">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
              data-oid="68t2g26"
            >
              <LogOut size={20} className="mr-3" data-oid="j8e1g1:" />
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col overflow-hidden" data-oid=":-2im2t">
        {/* Header */}
        <header
          className="bg-white border-b py-4 px-6 flex items-center justify-between"
          data-oid="c5rs36r"
        >
          {/* Left side - Mobile menu toggle + Section title */}
          <div className="flex items-center" data-oid="rbqa3m8">
            <button
              className="md:hidden mr-4 text-gray-500"
              onClick={() => setMenuOpen(true)}
              data-oid="fdysava"
            >
              <Menu size={24} data-oid="-.6mesm" />
            </button>
            <h2
              className="text-xl font-semibold text-gray-800 capitalize"
              data-oid="tpvulpc"
            >
              {sidebarItems.find((item) => item.id === activeSection)?.label ||
                "Dashboard"}
            </h2>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-4" data-oid="p7j:x2t">
            {/* Search */}
            <div
              className="hidden md:flex items-center relative"
              data-oid="f1kl0u_"
            >
              <input
                type="text"
                placeholder="Buscar..."
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-red-500 w-64"
                data-oid="mm-kd1u"
              />

              <Search
                className="w-4 h-4 text-gray-400 absolute left-3"
                data-oid="m.jvi8a"
              />
            </div>

            {/* Notifications */}
            <NotificationsMenu
              onSelectSupportConversation={handleSelectSupportConversation}
              data-oid="xl70g9g"
            />

            {/* User dropdown */}
            <div className="relative" data-oid="uku3lg_">
              <button
                className="flex items-center text-gray-700 focus:outline-none"
                data-oid="4xm46-3"
              >
                <div
                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-2"
                  data-oid="2rlxlkv"
                >
                  {user?.name?.charAt(0) || "A"}
                </div>
                <span
                  className="hidden md:block text-sm mr-1"
                  data-oid=".cjutpr"
                >
                  {user?.name || "Admin"}
                </span>
                <ChevronDown
                  className="w-4 h-4 text-gray-500"
                  data-oid="273xfgc"
                />
              </button>
            </div>
          </div>
        </header>

        {/* Contenido dinámico según la sección activa */}
        <main
          className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-6"
          data-oid=":-8lc80"
        >
          {activeSection === "dashboard" && (
            <div className="space-y-6" data-oid="upntf.o">
              <div
                className="flex justify-between items-center"
                data-oid="rkv8un7"
              >
                <h1
                  className="text-2xl font-bold text-gray-800"
                  data-oid=":ndsq30"
                >
                  Dashboard
                </h1>
                <button
                  className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  data-oid="2jh6bzc"
                >
                  <PlusCircle size={18} className="mr-2" data-oid="7q:gv:n" />
                  Nueva acción
                </button>
              </div>

              {/* Tarjetas de estadísticas */}
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                data-oid="qqwkfu5"
              >
                <StatCard
                  title="Usuarios activos"
                  value="245"
                  icon={
                    <Users
                      size={24}
                      className="text-black"
                      data-oid="iapqk8p"
                    />
                  }
                  color="bg-gray-100"
                  data-oid="inqkuqu"
                />

                <StatCard
                  title="Reservas hoy"
                  value="12"
                  icon={
                    <CalendarClock
                      size={24}
                      className="text-gray-600"
                      data-oid="fo:hncr"
                    />
                  }
                  color="bg-green-50"
                  data-oid="fsy0861"
                />

                <StatCard
                  title="Vehículos disponibles"
                  value="18"
                  icon={
                    <Car
                      size={24}
                      className="text-gray-500"
                      data-oid="nss66se"
                    />
                  }
                  color="bg-purple-50"
                  data-oid="24hr3my"
                />

                <StatCard
                  title="Ingresos semanales"
                  value="9.854€"
                  icon={
                    <BarChart2
                      size={24}
                      className="text-amber-500"
                      data-oid="m1d46ei"
                    />
                  }
                  color="bg-amber-50"
                  data-oid="o-ld970"
                />
              </div>

              {/* Secciones principales */}
              <div
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                data-oid="-wd336-"
              >
                {/* Últimas reservas */}
                <div
                  className="lg:col-span-2 bg-white rounded-xl shadow-md p-6"
                  data-oid="2-c6r.g"
                >
                  <div
                    className="flex justify-between items-center mb-4"
                    data-oid="n-a-qk1"
                  >
                    <h2
                      className="text-lg font-semibold text-gray-800"
                      data-oid="mwdukkd"
                    >
                      Últimas reservas
                    </h2>
                    <button
                      className="text-sm text-gray-600 hover:text-gray-700"
                      data-oid="-pocigi"
                    >
                      Ver todas
                    </button>
                  </div>

                  <div className="overflow-x-auto" data-oid="1kspr85">
                    <table className="w-full" data-oid="r3n-i5o">
                      <thead data-oid="xqnoa7s">
                        <tr className="border-b" data-oid="odemecr">
                          <th
                            className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            data-oid="_:ola-4"
                          >
                            ID
                          </th>
                          <th
                            className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            data-oid="ayvxh26"
                          >
                            Cliente
                          </th>
                          <th
                            className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            data-oid="lm6tv46"
                          >
                            Destino
                          </th>
                          <th
                            className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            data-oid="gt6tk8b"
                          >
                            Fecha
                          </th>
                          <th
                            className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            data-oid="9tad2od"
                          >
                            Estado
                          </th>
                        </tr>
                      </thead>
                      <tbody
                        className="divide-y divide-gray-200"
                        data-oid="uva-it0"
                      >
                        {[1, 2, 3, 4, 5].map((i) => (
                          <tr
                            key={i}
                            className="hover:bg-gray-50"
                            data-oid="-f31z00"
                          >
                            <td
                              className="py-4 text-sm text-gray-500"
                              data-oid="l4eeayc"
                            >
                              OP-{1000 + i}
                            </td>
                            <td
                              className="py-4 text-sm text-gray-900"
                              data-oid="::v5z3k"
                            >
                              Cliente {i}
                            </td>
                            <td
                              className="py-4 text-sm text-gray-500"
                              data-oid="dyrg.-b"
                            >
                              Madrid
                            </td>
                            <td
                              className="py-4 text-sm text-gray-500"
                              data-oid="t581rcs"
                            >
                              23/06/2024
                            </td>
                            <td className="py-4" data-oid="f8mpm_e">
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${
                                  i % 3 === 0
                                    ? "bg-gray-200 text-yellow-800"
                                    : i % 3 === 1
                                      ? "bg-gray-200 text-green-800"
                                      : "bg-gray-200 text-blue-800"
                                }`}
                                data-oid="x-0hfov"
                              >
                                {i % 3 === 0
                                  ? "Pendiente"
                                  : i % 3 === 1
                                    ? "Completado"
                                    : "En proceso"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Actividad reciente */}
                <div
                  className="bg-white rounded-xl shadow-md p-6"
                  data-oid="09-:t:t"
                >
                  <div
                    className="flex justify-between items-center mb-4"
                    data-oid="lbglg_2"
                  >
                    <h2
                      className="text-lg font-semibold text-gray-800"
                      data-oid="38409mk"
                    >
                      Actividad reciente
                    </h2>
                    <button
                      className="text-sm text-gray-600 hover:text-gray-700"
                      data-oid="k7_9r99"
                    >
                      Ver todo
                    </button>
                  </div>

                  <div className="space-y-5" data-oid="77i67pi">
                    {[
                      {
                        icon: <Users size={16} data-oid="wz-sxkz" />,
                        text: "Nuevo usuario registrado",
                        time: "Hace 5 min",
                        color: "bg-gray-200 text-gray-600",
                      },
                      {
                        icon: <Car size={16} data-oid="zket0gw" />,
                        text: "Reserva completada #OP-1005",
                        time: "Hace 30 min",
                        color: "bg-gray-200 text-green-600",
                      },
                      {
                        icon: <MessageSquare size={16} data-oid="4rd4z-." />,
                        text: "Nuevo mensaje de soporte",
                        time: "Hace 1 hora",
                        color: "bg-amber-100 text-amber-600",
                      },
                      {
                        icon: <Settings size={16} data-oid="wdnqgzc" />,
                        text: "Mantenimiento programado",
                        time: "Hace 2 horas",
                        color: "bg-gray-200 text-purple-600",
                      },
                      {
                        icon: <Users size={16} data-oid="s9cvswn" />,
                        text: "Nueva empresa registrada",
                        time: "Hace 3 horas",
                        color: "bg-gray-200 text-indigo-600",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start"
                        data-oid="8fnjz2g"
                      >
                        <div
                          className={`p-2 rounded-full ${item.color} mr-3 flex-shrink-0`}
                          data-oid="..vcqpu"
                        >
                          {item.icon}
                        </div>
                        <div data-oid="0qx-uxj">
                          <p
                            className="text-sm text-gray-900"
                            data-oid="d826fl."
                          >
                            {item.text}
                          </p>
                          <p
                            className="text-xs text-gray-500"
                            data-oid="_9c35ia"
                          >
                            {item.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "vehicles" && (
            <VehiclesSection data-oid="rmy5.5p" />
          )}

          {activeSection === "drivers" && <DriversSection data-oid="t8was0-" />}

          {activeSection === "collaborators" && (
            <CollaboratorsSection data-oid="bxv132w" />
          )}

          {activeSection === "bookings" && (
            <BookingsSection data-oid="68uu91o" />
          )}

          {activeSection === "routes" && <RoutesSection data-oid="0agzt-_" />}

          {activeSection === "stats" && <StatsSection data-oid="0j6tbvh" />}

          {activeSection === "users" && (
            <div data-oid="7unwtpr">
              <UsersManager data-oid="_2m1:iw" />
            </div>
          )}

          {activeSection === "support" && (
            <SupportSection
              selectedConversationId={selectedConversationId}
              data-oid="uw8t.ly"
            />
          )}

          {activeSection === "blog" && <BlogSection data-oid="0.ihuyg" />}

          {activeSection === "settings" && (
            <div
              className="flex flex-col items-center justify-center h-full"
              data-oid="4oh9yz5"
            >
              <div
                className="bg-white shadow-lg rounded-xl p-8 max-w-xl w-full text-center"
                data-oid="xlxwgpz"
              >
                <h2
                  className="text-2xl font-bold text-gray-800 mb-4"
                  data-oid="h-7tbdg"
                >
                  Sección {activeSection}
                </h2>
                <p className="text-gray-600 mb-6" data-oid="g_ug:m1">
                  Esta sección está en desarrollo. Aquí se implementará la
                  gestión de {activeSection}.
                </p>
                <button
                  className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  data-oid="rilqqyx"
                >
                  <PlusCircle size={18} className="mr-2" data-oid="9vymeq-" />
                  Continuar desarrollo
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
