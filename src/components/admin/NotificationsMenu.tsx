import React, { useState, useEffect, useRef } from "react";
import { BellIcon, CheckIcon, TrashIcon, XIcon } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import notificationService, {
  Notification,
} from "@/services/notificationService";

interface NotificationsMenuProps {
  className?: string;
  onSelectSupportConversation?: (conversationId: string) => void;
}

const NotificationsMenu: React.FC<NotificationsMenuProps> = ({
  className = "",
  onSelectSupportConversation,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Cargar notificaciones iniciales
  useEffect(() => {
    loadNotifications();

    // Solicitar permiso para notificaciones nativas
    notificationService.requestNotificationPermission();
  }, []);

  // Refrescar notificaciones cuando se abre el menú
  useEffect(() => {
    if (isOpen) {
      loadNotifications(true);
    }
  }, [isOpen]);

  // Configurar listener para notificaciones en tiempo real
  useEffect(() => {
    // Iniciar socket y escuchar nuevas notificaciones
    const handleNewNotification = (notification: Notification) => {
      console.log(
        "[NotificationsMenu] Nueva notificación recibida:",
        notification,
      );

      // Añadir a la lista de notificaciones al inicio si el menú está abierto
      setNotifications((prev) => {
        // Verificar si ya existe para evitar duplicados
        const exists = prev.some((n) => n.id === notification.id);
        if (exists) return prev;
        return [notification, ...prev];
      });

      // Incrementar contador de no leídos
      setUnreadCount((prev) => prev + 1);
    };

    // Registrar callback
    notificationService.onNewNotification(handleNewNotification);

    // Limpiar al desmontar
    return () => {
      notificationService.offNewNotification(handleNewNotification);
    };
  }, []);

  // Manejar cierre del menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Cargar contador de no leídos periódicamente
  useEffect(() => {
    const loadUnreadCount = async () => {
      try {
        const count = await notificationService.getUnreadCount();
        setUnreadCount(count);
      } catch (error) {
        console.error(
          "[NotificationsMenu] Error al cargar contador de no leídas:",
          error,
        );
      }
    };

    loadUnreadCount();

    // Actualizar cada 15 segundos en lugar de cada minuto
    const interval = setInterval(loadUnreadCount, 15000);

    return () => clearInterval(interval);
  }, []);

  // Función para abrir/cerrar el menú y refrescar notificaciones
  const toggleMenu = () => {
    const newState = !isOpen;
    setIsOpen(newState);
  };

  // Cargar notificaciones desde la API
  const loadNotifications = async (refresh = false) => {
    try {
      setLoading(true);
      setError(null);

      const currentPage = refresh ? 1 : page;
      const response = await notificationService.getNotifications(
        currentPage,
        10,
        false,
      );

      const newNotifications = response.notifications;

      // Actualizar notificaciones
      if (refresh || currentPage === 1) {
        setNotifications(newNotifications);
      } else {
        setNotifications((prev) => [...prev, ...newNotifications]);
      }

      // Actualizar paginación
      setPage(currentPage + 1);
      setHasMore(newNotifications.length === 10);

      // Actualizar contador de no leídas
      setUnreadCount(response.unread);
    } catch (error) {
      console.error(
        "[NotificationsMenu] Error al cargar notificaciones:",
        error,
      );
      setError(
        "No se pudieron cargar las notificaciones. Por favor, inténtalo de nuevo.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Marcar una notificación como leída
  const handleMarkAsRead = async (notification: Notification) => {
    try {
      if (notification.read) return;

      await notificationService.markAsRead(notification.id);

      // Actualizar estado local
      setNotifications((prev) =>
        prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n)),
      );

      // Actualizar contador
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("[NotificationsMenu] Error al marcar como leída:", error);
    }
  };

  // Marcar todas las notificaciones como leídas
  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();

      // Actualizar estado local
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

      // Actualizar contador
      setUnreadCount(0);
    } catch (error) {
      console.error(
        "[NotificationsMenu] Error al marcar todas como leídas:",
        error,
      );
    }
  };

  // Eliminar una notificación
  const handleDeleteNotification = async (notificationId: string) => {
    try {
      await notificationService.deleteNotification(notificationId);

      // Actualizar estado local
      setNotifications((prev) => prev.filter((n) => n.id !== notificationId));

      // Actualizar contador si era no leída
      const wasUnread =
        notifications.find((n) => n.id === notificationId)?.read === false;
      if (wasUnread) {
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error(
        "[NotificationsMenu] Error al eliminar notificación:",
        error,
      );
    }
  };

  // Extraer ID de conversación de la URL de acción
  const extractConversationId = (url: string): string | null => {
    try {
      // Buscar patrones como /admin/support?conversation=1234 o /support?conversation=1234
      const match = url.match(/[?&]conversation=([^&]+)/);
      return match ? match[1] : null;
    } catch (e) {
      return null;
    }
  };

  // Manejar click en notificación
  const handleNotificationClick = (notification: Notification) => {
    // Marcar como leída automáticamente
    if (!notification.read) {
      handleMarkAsRead(notification);
    }

    // Para notificaciones de tipo soporte, manejar de forma especial
    if (notification.type === "support_message" && notification.actionUrl) {
      const conversationId = extractConversationId(notification.actionUrl);

      if (conversationId) {
        console.log(
          `[NotificationsMenu] Navegando a conversación de soporte: ${conversationId}`,
        );

        // Si estamos en la página de admin, simplemente cambiar a la sección de soporte
        if (location.pathname === "/admin") {
          // El componente padre puede usar esta función para actualizar la sección activa
          if (onSelectSupportConversation) {
            onSelectSupportConversation(conversationId);
          }
        } else {
          // Navegar a la página de admin con un parámetro adicional para la conversación
          navigate(`/admin?section=support&conversation=${conversationId}`);
        }
      } else {
        // Si no pudimos extraer un ID, simplemente navegar a la sección de soporte
        if (location.pathname === "/admin") {
          if (onSelectSupportConversation) {
            onSelectSupportConversation("");
          }
        } else {
          navigate("/admin?section=support");
        }
      }
    }
    // Para otros tipos de notificaciones, usar el comportamiento normal
    else if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }

    // Cerrar el menú
    setIsOpen(false);
  };

  // Cargar más notificaciones
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      loadNotifications();
    }
  };

  // Formatear timestamp
  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();

      // Menos de un minuto
      if (diffMs < 60000) {
        return "Hace un momento";
      }

      // Menos de una hora
      if (diffMs < 3600000) {
        const minutes = Math.floor(diffMs / 60000);
        return `Hace ${minutes} ${minutes === 1 ? "minuto" : "minutos"}`;
      }

      // Menos de un día
      if (diffMs < 86400000) {
        const hours = Math.floor(diffMs / 3600000);
        return `Hace ${hours} ${hours === 1 ? "hora" : "horas"}`;
      }

      // Menos de una semana
      if (diffMs < 604800000) {
        const days = Math.floor(diffMs / 86400000);
        return `Hace ${days} ${days === 1 ? "día" : "días"}`;
      }

      // Fecha completa
      return date.toLocaleDateString();
    } catch (e) {
      return "";
    }
  };

  // Obtener icono según tipo de notificación
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "support_message":
        return (
          <div
            className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center"
            data-oid="nq-r4f2"
          >
            <span className="text-xs" data-oid="qdv-c95">
              CS
            </span>
          </div>
        );

      case "new_booking":
        return (
          <div
            className="w-8 h-8 rounded-full bg-gray-200 text-green-600 flex items-center justify-center"
            data-oid="_bagfpg"
          >
            <span className="text-xs" data-oid=".:e_ey8">
              NR
            </span>
          </div>
        );

      case "booking_canceled":
        return (
          <div
            className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center"
            data-oid="5wu137i"
          >
            <span className="text-xs" data-oid=".ou:nwg">
              RC
            </span>
          </div>
        );

      case "payment_success":
        return (
          <div
            className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center"
            data-oid="bg:wbe7"
          >
            <span className="text-xs" data-oid="p5pg7lb">
              PO
            </span>
          </div>
        );

      default:
        return (
          <div
            className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center"
            data-oid="v4ov2.o"
          >
            <span className="text-xs" data-oid="1337qsy">
              SYS
            </span>
          </div>
        );
    }
  };

  return (
    <div className={`relative ${className}`} ref={menuRef} data-oid="f1bxxlg">
      {/* Botón de la campana */}
      <button
        className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none"
        onClick={toggleMenu}
        aria-label="Notificaciones"
        data-oid=":9jbbve"
      >
        <BellIcon className="h-6 w-6 text-gray-600" data-oid="c0wazni" />

        {/* Indicador de notificaciones no leídas */}
        {unreadCount > 0 && (
          <span
            className="absolute top-1 right-1 h-5 w-5 flex items-center justify-center text-xs font-semibold text-white bg-gray-1000 rounded-full"
            data-oid="-sp.3i7"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Menú desplegable de notificaciones */}
      {isOpen && (
        <div
          className="absolute right-0 z-50 mt-2 w-80 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1 text-sm"
          data-oid="kt2u45k"
        >
          <div
            className="p-3 flex justify-between items-center border-b"
            data-oid="ykoz_pk"
          >
            <h3 className="font-semibold text-gray-800" data-oid="570wao7">
              Notificaciones
            </h3>
            <div className="flex space-x-2" data-oid=":k1iu0j">
              {unreadCount > 0 && (
                <button
                  className="text-xs text-gray-600 hover:text-blue-800 flex items-center"
                  onClick={handleMarkAllAsRead}
                  data-oid=":bqht5g"
                >
                  <CheckIcon className="h-3 w-3 mr-1" data-oid="z9jb_hf" />
                  Marcar todas como leídas
                </button>
              )}
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setIsOpen(false)}
                data-oid="8gqos65"
              >
                <XIcon className="h-4 w-4" data-oid="-8ya32j" />
              </button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto" data-oid="d.v9bb1">
            {/* Lista de notificaciones */}
            {loading && notifications.length === 0 ? (
              <div
                className="py-8 text-center text-gray-500"
                data-oid="vlnvr3p"
              >
                <p data-oid="hpyee08">Cargando notificaciones...</p>
              </div>
            ) : notifications.length === 0 ? (
              <div
                className="py-8 text-center text-gray-500"
                data-oid="qmljmin"
              >
                <p data-oid=".lsrl9g">No tienes notificaciones</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100" data-oid=":7unw._">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 hover:bg-gray-50 transition-colors cursor-pointer flex justify-between ${
                      notification.read ? "bg-white" : "bg-gray-100"
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                    data-oid="72yf9r-"
                  >
                    <div className="flex space-x-3" data-oid="k5ppsll">
                      {getNotificationIcon(notification.type)}
                      <div data-oid="lrip_oc">
                        <p
                          className={`text-sm font-medium ${notification.read ? "text-gray-700" : "text-gray-900"}`}
                          data-oid="_0.058i"
                        >
                          {notification.title}
                        </p>
                        <p
                          className="text-xs text-gray-500 line-clamp-2 mt-0.5"
                          data-oid="alp8sk0"
                        >
                          {notification.message}
                        </p>
                        <span
                          className="text-xs text-gray-400 mt-1"
                          data-oid="-fmcpdg"
                        >
                          {formatTimestamp(notification.timestamp)}
                        </span>
                      </div>
                    </div>
                    <div
                      className="flex flex-col space-y-1 ml-2"
                      data-oid="_i5sem6"
                    >
                      {!notification.read && (
                        <button
                          className="text-black hover:text-blue-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkAsRead(notification);
                          }}
                          aria-label="Marcar como leída"
                          data-oid="d0qmc6:"
                        >
                          <CheckIcon className="h-4 w-4" data-oid="fw2pcnn" />
                        </button>
                      )}
                      <button
                        className="text-gray-400 hover:text-gray-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteNotification(notification.id);
                        }}
                        aria-label="Eliminar notificación"
                        data-oid="_9qqun3"
                      >
                        <TrashIcon className="h-4 w-4" data-oid="5ko1v1:" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Cargar más */}
            {hasMore && notifications.length > 0 && (
              <div className="p-2 text-center" data-oid="s2k9amt">
                <button
                  className="text-sm text-gray-600 hover:text-blue-800"
                  onClick={handleLoadMore}
                  disabled={loading}
                  data-oid="84u5ou9"
                >
                  {loading ? "Cargando..." : "Cargar más"}
                </button>
              </div>
            )}
          </div>

          {/* Footer del menú */}
          <div className="p-2 border-t text-center" data-oid="wb1z3n7">
            <Link
              to="/admin/notifications"
              className="text-xs text-gray-600 hover:text-blue-800"
              onClick={() => setIsOpen(false)}
              data-oid="e_7d6me"
            >
              Ver todas las notificaciones
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsMenu;
