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
    data-oid=":vu:zjn"
  >
    <div className={`p-4 rounded-xl ${color} mr-4`} data-oid="r-hd2tj">
      {icon}
    </div>
    <div data-oid="ns8uk4x">
      <h3 className="text-sm text-gray-500" data-oid="bc95us6">
        {title}
      </h3>
      <p className="text-2xl font-bold" data-oid="r42ch77">
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
      icon: <Home size={20} data-oid="c61-hto" />,
    },
    {
      id: "users",
      label: "Usuarios",
      icon: <Users size={20} data-oid="_.9blfn" />,
    },
    {
      id: "collaborators",
      label: "Colaboradores",
      icon: <Users size={20} data-oid="cqut_nz" />,
    },
    {
      id: "drivers",
      label: "Chóferes",
      icon: <Users size={20} data-oid=".dqrsyp" />,
    },
    {
      id: "vehicles",
      label: "Vehículos",
      icon: <Car size={20} data-oid="j67:-j." />,
    },
    {
      id: "routes",
      label: "Rutas",
      icon: <Pin size={20} data-oid="04vqykd" />,
    },
    {
      id: "bookings",
      label: "Reservas",
      icon: <CalendarClock size={20} data-oid="9j75m_l" />,
    },
    {
      id: "support",
      label: "Soporte",
      icon: <MessageSquare size={20} data-oid="komcqvp" />,
    },
    {
      id: "blog",
      label: "Blog",
      icon: <FileText size={20} data-oid=".p6jg3j" />,
    },
    {
      id: "stats",
      label: "Estadísticas",
      icon: <BarChart2 size={20} data-oid="c03at.8" />,
    },
    {
      id: "settings",
      label: "Configuración",
      icon: <Settings size={20} data-oid="edl6z9s" />,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100" data-oid="yjbo65d">
      {/* Sidebar - Versión escritorio */}
      <div
        className="hidden md:flex flex-col w-64 border-r bg-white"
        data-oid="7lp02ng"
      >
        <div className="p-5 border-b" data-oid="66kaub7">
          <h1 className="text-xl font-bold text-gray-800" data-oid="64-l0po">
            Panel Admin
          </h1>
          <p className="text-sm text-gray-500 mt-1" data-oid="tj.6-36">
            Privyde Transport
          </p>
        </div>

        <div className="flex-1 overflow-y-auto py-4" data-oid="m9-ye59">
          <nav className="px-2 space-y-1" data-oid="cm_.9rl">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                className={`w-full flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                  activeSection === item.id
                    ? "bg-gray-100 text-gray-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveSection(item.id)}
                data-oid="nvp5b9_"
              >
                <span className="mr-3" data-oid="29.x7am">
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t" data-oid="lbf1q9-">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
            data-oid="-yrk2wp"
          >
            <LogOut size={20} className="mr-3" data-oid="j4.71dx" />
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Sidebar móvil */}
      <div
        className={`md:hidden fixed inset-0 z-50 bg-gray-800 bg-opacity-50 transition-opacity ${menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        data-oid="2jx1yic"
      >
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-white transition-transform transform ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
          data-oid="fez3rip"
        >
          <div
            className="p-5 border-b flex justify-between items-center"
            data-oid="yas.d7v"
          >
            <h1 className="text-xl font-bold text-gray-800" data-oid="wc7eafq">
              Panel Admin
            </h1>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-gray-500"
              data-oid="kclahwe"
            >
              <X size={24} data-oid="tlwgqxu" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4" data-oid="f1.xq48">
            <nav className="px-2 space-y-1" data-oid="80.n5_d">
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
                  data-oid="qgzmuqf"
                >
                  <span className="mr-3" data-oid="cd7_-j4">
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-4 border-t" data-oid="mcn671n">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
              data-oid="2bghu0h"
            >
              <LogOut size={20} className="mr-3" data-oid="dhyo.go" />
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col overflow-hidden" data-oid="y-yg1fq">
        {/* Header */}
        <header
          className="bg-white border-b py-4 px-6 flex items-center justify-between"
          data-oid="a233pd3"
        >
          {/* Left side - Mobile menu toggle + Section title */}
          <div className="flex items-center" data-oid="8pv3jm3">
            <button
              className="md:hidden mr-4 text-gray-500"
              onClick={() => setMenuOpen(true)}
              data-oid="qk46e9o"
            >
              <Menu size={24} data-oid="h34g:9h" />
            </button>
            <h2
              className="text-xl font-semibold text-gray-800 capitalize"
              data-oid="sydswwz"
            >
              {sidebarItems.find((item) => item.id === activeSection)?.label ||
                "Dashboard"}
            </h2>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-4" data-oid="9oj:lka">
            {/* Search */}
            <div
              className="hidden md:flex items-center relative"
              data-oid="_mn_cgr"
            >
              <input
                type="text"
                placeholder="Buscar..."
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-red-500 w-64"
                data-oid="7.9rqh4"
              />

              <Search
                className="w-4 h-4 text-gray-400 absolute left-3"
                data-oid="2nhuw:z"
              />
            </div>

            {/* Notifications */}
            <NotificationsMenu
              onSelectSupportConversation={handleSelectSupportConversation}
              data-oid="vry3trd"
            />

            {/* User dropdown */}
            <div className="relative" data-oid="g7n9avt">
              <button
                className="flex items-center text-gray-700 focus:outline-none"
                data-oid="b_ozewh"
              >
                <div
                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-2"
                  data-oid="3qjt-rk"
                >
                  {user?.name?.charAt(0) || "A"}
                </div>
                <span
                  className="hidden md:block text-sm mr-1"
                  data-oid="34k.d0l"
                >
                  {user?.name || "Admin"}
                </span>
                <ChevronDown
                  className="w-4 h-4 text-gray-500"
                  data-oid="39x6hez"
                />
              </button>
            </div>
          </div>
        </header>

        {/* Contenido dinámico según la sección activa */}
        <main
          className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-6"
          data-oid="3gehrl4"
        >
          {activeSection === "dashboard" && (
            <div className="space-y-6" data-oid="t8wdyjb">
              <div
                className="flex justify-between items-center"
                data-oid="66fh.71"
              >
                <h1
                  className="text-2xl font-bold text-gray-800"
                  data-oid="yu-7adp"
                >
                  Dashboard
                </h1>
                <button
                  className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  data-oid="uliaqdd"
                >
                  <PlusCircle size={18} className="mr-2" data-oid=":mp-m6o" />
                  Nueva acción
                </button>
              </div>

              {/* Tarjetas de estadísticas */}
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                data-oid="u.mt04_"
              >
                <StatCard
                  title="Usuarios activos"
                  value="245"
                  icon={
                    <Users
                      size={24}
                      className="text-black"
                      data-oid="y_5xxg4"
                    />
                  }
                  color="bg-gray-100"
                  data-oid="jd8.1xq"
                />

                <StatCard
                  title="Reservas hoy"
                  value="12"
                  icon={
                    <CalendarClock
                      size={24}
                      className="text-gray-600"
                      data-oid="o224lld"
                    />
                  }
                  color="bg-green-50"
                  data-oid="vl9ubsh"
                />

                <StatCard
                  title="Vehículos disponibles"
                  value="18"
                  icon={
                    <Car
                      size={24}
                      className="text-gray-500"
                      data-oid="l6uai94"
                    />
                  }
                  color="bg-purple-50"
                  data-oid="uc3othk"
                />

                <StatCard
                  title="Ingresos semanales"
                  value="9.854€"
                  icon={
                    <BarChart2
                      size={24}
                      className="text-amber-500"
                      data-oid="splj00:"
                    />
                  }
                  color="bg-amber-50"
                  data-oid="m2jgo.3"
                />
              </div>

              {/* Secciones principales */}
              <div
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                data-oid="fubzd3h"
              >
                {/* Últimas reservas */}
                <div
                  className="lg:col-span-2 bg-white rounded-xl shadow-md p-6"
                  data-oid="bklomiu"
                >
                  <div
                    className="flex justify-between items-center mb-4"
                    data-oid="tl_fnum"
                  >
                    <h2
                      className="text-lg font-semibold text-gray-800"
                      data-oid="cpfja6k"
                    >
                      Últimas reservas
                    </h2>
                    <button
                      className="text-sm text-gray-600 hover:text-gray-700"
                      data-oid="2-93beo"
                    >
                      Ver todas
                    </button>
                  </div>

                  <div className="overflow-x-auto" data-oid="vwrakin">
                    <table className="w-full" data-oid="6w.iwn3">
                      <thead data-oid="6-rabkm">
                        <tr className="border-b" data-oid="-gx0bk7">
                          <th
                            className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            data-oid="chl7gg6"
                          >
                            ID
                          </th>
                          <th
                            className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            data-oid="ce6xppx"
                          >
                            Cliente
                          </th>
                          <th
                            className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            data-oid="szdd2ob"
                          >
                            Destino
                          </th>
                          <th
                            className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            data-oid="3ts18:z"
                          >
                            Fecha
                          </th>
                          <th
                            className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            data-oid="whl5c.p"
                          >
                            Estado
                          </th>
                        </tr>
                      </thead>
                      <tbody
                        className="divide-y divide-gray-200"
                        data-oid="_cw9dj8"
                      >
                        {[1, 2, 3, 4, 5].map((i) => (
                          <tr
                            key={i}
                            className="hover:bg-gray-50"
                            data-oid="hlf6fpd"
                          >
                            <td
                              className="py-4 text-sm text-gray-500"
                              data-oid="s2jf32_"
                            >
                              OP-{1000 + i}
                            </td>
                            <td
                              className="py-4 text-sm text-gray-900"
                              data-oid="eft3mw5"
                            >
                              Cliente {i}
                            </td>
                            <td
                              className="py-4 text-sm text-gray-500"
                              data-oid=".fpux:x"
                            >
                              Madrid
                            </td>
                            <td
                              className="py-4 text-sm text-gray-500"
                              data-oid="0j.8qvm"
                            >
                              23/06/2024
                            </td>
                            <td className="py-4" data-oid="w-ut8n8">
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${
                                  i % 3 === 0
                                    ? "bg-gray-200 text-yellow-800"
                                    : i % 3 === 1
                                      ? "bg-gray-200 text-green-800"
                                      : "bg-gray-200 text-blue-800"
                                }`}
                                data-oid=":cney1t"
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
                  data-oid="s68bc82"
                >
                  <div
                    className="flex justify-between items-center mb-4"
                    data-oid="anu44fc"
                  >
                    <h2
                      className="text-lg font-semibold text-gray-800"
                      data-oid="35dtu7i"
                    >
                      Actividad reciente
                    </h2>
                    <button
                      className="text-sm text-gray-600 hover:text-gray-700"
                      data-oid="g-hiwug"
                    >
                      Ver todo
                    </button>
                  </div>

                  <div className="space-y-5" data-oid="87n-w-e">
                    {[
                      {
                        icon: <Users size={16} data-oid="9e4f6rq" />,
                        text: "Nuevo usuario registrado",
                        time: "Hace 5 min",
                        color: "bg-gray-200 text-gray-600",
                      },
                      {
                        icon: <Car size={16} data-oid="zj5n3rb" />,
                        text: "Reserva completada #OP-1005",
                        time: "Hace 30 min",
                        color: "bg-gray-200 text-green-600",
                      },
                      {
                        icon: <MessageSquare size={16} data-oid="1g.kel9" />,
                        text: "Nuevo mensaje de soporte",
                        time: "Hace 1 hora",
                        color: "bg-amber-100 text-amber-600",
                      },
                      {
                        icon: <Settings size={16} data-oid="eombv-3" />,
                        text: "Mantenimiento programado",
                        time: "Hace 2 horas",
                        color: "bg-gray-200 text-purple-600",
                      },
                      {
                        icon: <Users size={16} data-oid="_uif8ep" />,
                        text: "Nueva empresa registrada",
                        time: "Hace 3 horas",
                        color: "bg-gray-200 text-indigo-600",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start"
                        data-oid="e_veni0"
                      >
                        <div
                          className={`p-2 rounded-full ${item.color} mr-3 flex-shrink-0`}
                          data-oid="em6n_1i"
                        >
                          {item.icon}
                        </div>
                        <div data-oid="4bm3h2o">
                          <p
                            className="text-sm text-gray-900"
                            data-oid="l.q_9ov"
                          >
                            {item.text}
                          </p>
                          <p
                            className="text-xs text-gray-500"
                            data-oid=".c2yolx"
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
            <VehiclesSection data-oid="5pyn-d_" />
          )}

          {activeSection === "drivers" && <DriversSection data-oid="52-k473" />}

          {activeSection === "collaborators" && (
            <CollaboratorsSection data-oid="6.w_m25" />
          )}

          {activeSection === "bookings" && (
            <BookingsSection data-oid="s3q6ihd" />
          )}

          {activeSection === "routes" && <RoutesSection data-oid="n_z6h49" />}

          {activeSection === "stats" && <StatsSection data-oid="qmeq924" />}

          {activeSection === "users" && (
            <div data-oid="tsj-ovu">
              <UsersManager data-oid="n48n7ke" />
            </div>
          )}

          {activeSection === "support" && (
            <SupportSection
              selectedConversationId={selectedConversationId}
              data-oid="qaiw4o6"
            />
          )}

          {activeSection === "blog" && <BlogSection data-oid="l-a6xww" />}

          {activeSection === "settings" && (
            <div
              className="flex flex-col items-center justify-center h-full"
              data-oid="ji8rk74"
            >
              <div
                className="bg-white shadow-lg rounded-xl p-8 max-w-xl w-full text-center"
                data-oid="fc6tu36"
              >
                <h2
                  className="text-2xl font-bold text-gray-800 mb-4"
                  data-oid="nb:9qqz"
                >
                  Sección {activeSection}
                </h2>
                <p className="text-gray-600 mb-6" data-oid="o9x9k67">
                  Esta sección está en desarrollo. Aquí se implementará la
                  gestión de {activeSection}.
                </p>
                <button
                  className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  data-oid="x7x8duv"
                >
                  <PlusCircle size={18} className="mr-2" data-oid="ny7g19:" />
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
