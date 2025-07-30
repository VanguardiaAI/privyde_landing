import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { Edit, X } from "lucide-react";

// Definir el tipo para los modales
type ModalField =
  | "name"
  | "email"
  | "phone"
  | "company"
  | "address"
  | "password"
  | "marketing"
  | "notifications"
  | null;

export default function AccountPage() {
  const { user, updateProfile } = useAuth();
  const [activeModal, setActiveModal] = useState<ModalField>(null);

  // Estados para los formularios de edición
  const [nameForm, setNameForm] = useState({
    title: user?.profile?.title || "",
    first_name: user?.profile?.first_name || "",
    last_name: user?.profile?.last_name || "",
  });

  const [phoneForm, setPhoneForm] = useState({
    country_code: user?.profile?.country_code || "",
    phone: user?.profile?.phone || "",
  });

  const [companyForm, setCompanyForm] = useState({
    company: user?.profile?.company || "",
  });

  const [addressForm, setAddressForm] = useState({
    address: user?.profile?.address || "",
  });

  // Estado para mostrar mensajes de éxito o error
  const [saveMessage, setSaveMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Función para abrir modal
  const openModal = (field: ModalField) => {
    setActiveModal(field);
    setSaveMessage(null);
  };

  // Función para cerrar modal
  const closeModal = () => {
    setActiveModal(null);
    setSaveMessage(null);
  };

  // Función para manejar cambios en el formulario de nombre
  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setNameForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Función para manejar cambios en el formulario de teléfono
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPhoneForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Función para manejar cambios en el formulario de empresa
  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyForm({
      company: e.target.value,
    });
  };

  // Función para manejar cambios en el formulario de dirección
  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setAddressForm({
      address: e.target.value,
    });
  };

  // Función para guardar cambios del nombre
  const saveNameChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({
        title: nameForm.title,
        first_name: nameForm.first_name,
        last_name: nameForm.last_name,
      });
      setSaveMessage({
        type: "success",
        text: "Nombre actualizado con éxito",
      });

      // Cerrar el modal después de un breve delay
      setTimeout(() => {
        closeModal();
      }, 1500);
    } catch (error) {
      setSaveMessage({
        type: "error",
        text: "Error al actualizar el nombre",
      });
    }
  };

  // Función para guardar cambios del teléfono
  const savePhoneChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({
        country_code: phoneForm.country_code,
        phone: phoneForm.phone,
      });
      setSaveMessage({
        type: "success",
        text: "Teléfono actualizado con éxito",
      });

      setTimeout(() => {
        closeModal();
      }, 1500);
    } catch (error) {
      setSaveMessage({
        type: "error",
        text: "Error al actualizar el teléfono",
      });
    }
  };

  // Función para guardar cambios de la empresa
  const saveCompanyChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({
        company: companyForm.company,
      });
      setSaveMessage({
        type: "success",
        text: "Empresa actualizada con éxito",
      });

      setTimeout(() => {
        closeModal();
      }, 1500);
    } catch (error) {
      setSaveMessage({
        type: "error",
        text: "Error al actualizar la empresa",
      });
    }
  };

  // Función para guardar cambios de la dirección
  const saveAddressChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({
        address: addressForm.address,
      });
      setSaveMessage({
        type: "success",
        text: "Dirección actualizada con éxito",
      });

      setTimeout(() => {
        closeModal();
      }, 1500);
    } catch (error) {
      setSaveMessage({
        type: "error",
        text: "Error al actualizar la dirección",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen" data-oid="qp8vt3_">
      <Navbar data-oid="_ki1vrs" />

      <main className="flex-1 bg-white pb-16" data-oid="3ee4z7k">
        <div
          className="container mx-auto px-4 py-8 max-w-5xl"
          data-oid="267yxdn"
        >
          <h1
            className="text-3xl font-bold text-gray-800 mb-6"
            data-oid="zc-ndyt"
          >
            Cuenta
          </h1>
          <p className="text-gray-600 mb-8" data-oid="5hz47c2">
            Gestione su información para que Privyde satisfaga sus necesidades.
          </p>

          {/* Información personal */}
          <div className="mb-8" data-oid="jwx28t6">
            <h2
              className="text-xl font-semibold text-gray-800 mb-4"
              data-oid="zcx7dq9"
            >
              Información personal
            </h2>

            <div
              className="border border-gray-200 rounded-md overflow-hidden"
              data-oid="xqrzuxt"
            >
              {/* Nombre */}
              <div
                className="flex justify-between items-center p-4 border-b border-gray-200"
                data-oid="5-5i.yl"
              >
                <div data-oid="mul4:.p">
                  <div
                    className="text-sm text-gray-500 mb-1"
                    data-oid="g_64w70"
                  >
                    Nombre
                  </div>
                  <div className="font-medium" data-oid="tq.gm57">
                    {user?.profile?.title || ""}{" "}
                    {user?.profile?.first_name || ""}{" "}
                    {user?.profile?.last_name || ""}
                  </div>
                </div>
                <button
                  className="p-2 text-gray-600 hover:text-black"
                  onClick={() => openModal("name")}
                  data-oid="0s4i7ay"
                >
                  <Edit className="w-5 h-5" data-oid=".wtbzt_" />
                </button>
              </div>

              {/* Email */}
              <div
                className="flex justify-between items-center p-4 border-b border-gray-200"
                data-oid="qni.o6y"
              >
                <div data-oid="hdybndk">
                  <div
                    className="text-sm text-gray-500 mb-1"
                    data-oid="ecw1rrg"
                  >
                    Email
                  </div>
                  <div className="font-medium" data-oid="vd82g41">
                    {user?.email}
                  </div>
                </div>
                <button
                  className="p-2 text-gray-600 hover:text-black"
                  onClick={() => openModal("email")}
                  data-oid="fbiar2-"
                >
                  <Edit className="w-5 h-5" data-oid="n784kkw" />
                </button>
              </div>

              {/* Teléfono móvil */}
              <div
                className="flex justify-between items-center p-4 border-b border-gray-200"
                data-oid="16nq3lb"
              >
                <div data-oid="eydz-p6">
                  <div
                    className="text-sm text-gray-500 mb-1"
                    data-oid="ryddwqd"
                  >
                    Teléfono móvil
                  </div>
                  <div className="font-medium" data-oid="mvjs2yd">
                    {user?.profile?.country_code || ""}
                    {user?.profile?.phone || ""}
                  </div>
                </div>
                <button
                  className="p-2 text-gray-600 hover:text-black"
                  onClick={() => openModal("phone")}
                  data-oid="b-45:2k"
                >
                  <Edit className="w-5 h-5" data-oid="kgbq5dr" />
                </button>
              </div>

              {/* Empresa */}
              <div
                className="flex justify-between items-center p-4 border-b border-gray-200"
                data-oid="b7f6qag"
              >
                <div data-oid="54ghf17">
                  <div
                    className="text-sm text-gray-500 mb-1"
                    data-oid="rwykzz_"
                  >
                    Empresa
                  </div>
                  <div className="font-medium" data-oid="-rr6785">
                    {user?.profile?.company || "—"}
                  </div>
                </div>
                <button
                  className="p-2 text-gray-600 hover:text-black"
                  onClick={() => openModal("company")}
                  data-oid="y65cz2g"
                >
                  <Edit className="w-5 h-5" data-oid="di6gh.v" />
                </button>
              </div>

              {/* Dirección */}
              <div
                className="flex justify-between items-center p-4"
                data-oid="z71ba_7"
              >
                <div data-oid="xs1h7lj">
                  <div
                    className="text-sm text-gray-500 mb-1"
                    data-oid="-ju1puw"
                  >
                    Dirección
                  </div>
                  <div className="font-medium" data-oid="6aipxs4">
                    {user?.profile?.address || "—"}
                  </div>
                </div>
                <button
                  className="p-2 text-gray-600 hover:text-black"
                  onClick={() => openModal("address")}
                  data-oid="vkga17:"
                >
                  <Edit className="w-5 h-5" data-oid="ihj__bi" />
                </button>
              </div>
            </div>
          </div>

          {/* Contraseña */}
          <div className="mb-8" data-oid="isvonrt">
            <h2
              className="text-xl font-semibold text-gray-800 mb-4"
              data-oid="oocgrhf"
            >
              Contraseña
            </h2>

            <div
              className="border border-gray-200 rounded-md overflow-hidden"
              data-oid="d8fd96e"
            >
              <div
                className="flex justify-between items-center p-4"
                data-oid="v2uxvek"
              >
                <div data-oid="swvdi2y">
                  <div
                    className="text-sm text-gray-500 mb-1"
                    data-oid="91d.dpj"
                  >
                    Contraseña
                  </div>
                  <div className="font-medium" data-oid="vn-q5uq">
                    ••••••••••••••
                  </div>
                </div>
                <button
                  className="p-2 text-gray-600 hover:text-black"
                  onClick={() => openModal("password")}
                  data-oid="xkw8g2n"
                >
                  <Edit className="w-5 h-5" data-oid="_csfngj" />
                </button>
              </div>
            </div>
          </div>

          {/* Pago */}
          <div className="mb-8" data-oid="y.ltpzr">
            <h2
              className="text-xl font-semibold text-gray-800 mb-4"
              data-oid="67:ywuk"
            >
              Pago
            </h2>

            <button
              className="w-full border border-gray-300 rounded-md py-3 px-4 text-center flex items-center justify-center hover:bg-gray-50"
              data-oid=".mksjoq"
            >
              <span className="text-gray-700 font-medium" data-oid="smvbq8a">
                + Añadir nueva tarjeta
              </span>
            </button>
          </div>

          {/* Promociones */}
          <div className="mb-8" data-oid="nk9105w">
            <h2
              className="text-xl font-semibold text-gray-800 mb-4"
              data-oid="g5u7ird"
            >
              Promociones
            </h2>
            <p className="text-gray-600" data-oid=":jv_v-m">
              No hay vales disponibles en su cuenta en este momento.
            </p>
          </div>

          {/* Notificaciones */}
          <div className="mb-8" data-oid="patdfwh">
            <h2
              className="text-xl font-semibold text-gray-800 mb-4"
              data-oid="h0716h:"
            >
              Notificaciones
            </h2>

            <div
              className="border border-gray-200 rounded-md overflow-hidden"
              data-oid="db68q_:"
            >
              {/* Correos de marketing */}
              <div
                className="flex justify-between items-center p-4 border-b border-gray-200"
                data-oid="0jy2132"
              >
                <div data-oid="ndhc49z">
                  <div
                    className="text-sm text-gray-500 mb-1"
                    data-oid="v:hwc:k"
                  >
                    Correos electrónicos de marketing
                  </div>
                  <div className="font-medium" data-oid="1mb2tl5">
                    On
                  </div>
                </div>
                <button
                  className="p-2 text-gray-600 hover:text-black"
                  onClick={() => openModal("marketing")}
                  data-oid="9p8vnj_"
                >
                  <Edit className="w-5 h-5" data-oid="-uqh6--" />
                </button>
              </div>

              {/* Notificaciones de reserva */}
              <div
                className="flex justify-between items-center p-4"
                data-oid="eetll48"
              >
                <div data-oid="3fd3di.">
                  <div
                    className="text-sm text-gray-500 mb-1"
                    data-oid="y1cee6l"
                  >
                    Notificaciones de reserva
                  </div>
                  <div className="font-medium" data-oid="yb57wyf">
                    Activado: Correo electrónico y SMS
                  </div>
                </div>
                <button
                  className="p-2 text-gray-600 hover:text-black"
                  onClick={() => openModal("notifications")}
                  data-oid="hnwp5:p"
                >
                  <Edit className="w-5 h-5" data-oid="jui.yw4" />
                </button>
              </div>
            </div>
          </div>

          {/* Borrar cuenta */}
          <button
            className="w-full border border-gray-300 rounded-md py-3 px-4 text-center mb-8 hover:bg-gray-50"
            data-oid="5wdwghf"
          >
            <span className="text-gray-700 font-medium" data-oid=".8rt0yp">
              Borrar mi cuenta
            </span>
          </button>
        </div>
      </main>

      {/* Modal de Edición */}
      {activeModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          data-oid="p568099"
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-md w-full"
            data-oid="xq2ctrw"
          >
            {/* Editar Nombre */}
            {activeModal === "name" && (
              <div data-oid="f3wl5e7">
                <div
                  className="flex justify-between items-center border-b border-gray-200 p-4"
                  data-oid="vbf-67_"
                >
                  <h3 className="text-lg font-semibold" data-oid="qppgtoq">
                    Editar nombre
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                    data-oid="-di0h6j"
                  >
                    <X className="w-5 h-5" data-oid="o4fnoy-" />
                  </button>
                </div>
                <form
                  onSubmit={saveNameChanges}
                  className="p-6"
                  data-oid="j596:pu"
                >
                  <div className="mb-4" data-oid="9h9a5_h">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid="_1onmh-"
                    >
                      Título
                    </label>
                    <select
                      name="title"
                      value={nameForm.title}
                      onChange={handleNameChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      data-oid="w76u9t-"
                    >
                      <option value="" data-oid="tn9p93_">
                        Seleccionar...
                      </option>
                      <option value="Sr" data-oid="vplog-f">
                        Sr.
                      </option>
                      <option value="Sra" data-oid="btfvhdh">
                        Sra.
                      </option>
                      <option value="Dr" data-oid="i8-6ip7">
                        Dr.
                      </option>
                      <option value="Dra" data-oid="o-cga8y">
                        Dra.
                      </option>
                    </select>
                  </div>
                  <div className="mb-4" data-oid="zt63o2.">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid="o-unsps"
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      value={nameForm.first_name}
                      onChange={handleNameChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      data-oid="i1v_wh0"
                    />
                  </div>
                  <div className="mb-6" data-oid="9qa-t89">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid="l0_qke1"
                    >
                      Apellido
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      value={nameForm.last_name}
                      onChange={handleNameChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      data-oid="939d07b"
                    />
                  </div>

                  {saveMessage && (
                    <div
                      className={`p-2 mb-4 rounded-md ${saveMessage.type === "success" ? "bg-gray-200 text-green-700" : "bg-gray-200 text-gray-700"}`}
                      data-oid="h75:pkd"
                    >
                      {saveMessage.text}
                    </div>
                  )}

                  <div
                    className="flex justify-end space-x-2"
                    data-oid="g3-l617"
                  >
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      data-oid="e0-vup0"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-md transition-all duration-150 ease-in-out"
                      data-oid="ppijrib"
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Editar Email (solo informativo) */}
            {activeModal === "email" && (
              <div data-oid="s67j-qb">
                <div
                  className="flex justify-between items-center border-b border-gray-200 p-4"
                  data-oid="-lchfzg"
                >
                  <h3 className="text-lg font-semibold" data-oid="nvw2hf-">
                    Correo electrónico
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                    data-oid="dbtoyj0"
                  >
                    <X className="w-5 h-5" data-oid="z:y21.p" />
                  </button>
                </div>
                <div className="p-6" data-oid="ax.x1j0">
                  <p className="text-gray-600 mb-4" data-oid="-_m9qvi">
                    No es posible cambiar el correo electrónico asociado a tu
                    cuenta.
                  </p>
                  <p className="text-gray-600 mb-6" data-oid="um5ze:e">
                    Si necesitas usar una dirección diferente, deberás crear una
                    nueva cuenta.
                  </p>
                  <div className="flex justify-end" data-oid="phz6vb9">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      data-oid="a4vkm9x"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Editar Teléfono */}
            {activeModal === "phone" && (
              <div data-oid="ypxdwok">
                <div
                  className="flex justify-between items-center border-b border-gray-200 p-4"
                  data-oid="qajrimc"
                >
                  <h3 className="text-lg font-semibold" data-oid="_4q083h">
                    Editar teléfono
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                    data-oid="ptuu-n9"
                  >
                    <X className="w-5 h-5" data-oid="9qhi04r" />
                  </button>
                </div>
                <form
                  onSubmit={savePhoneChanges}
                  className="p-6"
                  data-oid="vuxrso0"
                >
                  <div className="mb-4" data-oid="gh6f6pk">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid="22sjuoj"
                    >
                      Código de país
                    </label>
                    <input
                      type="text"
                      name="country_code"
                      value={phoneForm.country_code}
                      onChange={handlePhoneChange}
                      placeholder="+34"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      data-oid=":haw5ho"
                    />
                  </div>
                  <div className="mb-6" data-oid="6dk1iow">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid=".4ed8z5"
                    >
                      Número de teléfono
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={phoneForm.phone}
                      onChange={handlePhoneChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      data-oid="0am5x30"
                    />
                  </div>

                  {saveMessage && (
                    <div
                      className={`p-2 mb-4 rounded-md ${saveMessage.type === "success" ? "bg-gray-200 text-green-700" : "bg-gray-200 text-gray-700"}`}
                      data-oid="67-p2b7"
                    >
                      {saveMessage.text}
                    </div>
                  )}

                  <div
                    className="flex justify-end space-x-2"
                    data-oid="ycao7io"
                  >
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      data-oid="n70gd9m"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-md transition-all duration-150 ease-in-out"
                      data-oid="t-c9fz0"
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Editar Empresa */}
            {activeModal === "company" && (
              <div data-oid="fatb9af">
                <div
                  className="flex justify-between items-center border-b border-gray-200 p-4"
                  data-oid="u4x2xiv"
                >
                  <h3 className="text-lg font-semibold" data-oid="t7ajd69">
                    Editar empresa
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                    data-oid="ppnx3aj"
                  >
                    <X className="w-5 h-5" data-oid="tj:ju-r" />
                  </button>
                </div>
                <form
                  onSubmit={saveCompanyChanges}
                  className="p-6"
                  data-oid="faeyd9r"
                >
                  <div className="mb-6" data-oid=".tn5bem">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid="t6:4b.4"
                    >
                      Nombre de la empresa
                    </label>
                    <input
                      type="text"
                      value={companyForm.company}
                      onChange={handleCompanyChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      data-oid="-3a:53u"
                    />
                  </div>

                  {saveMessage && (
                    <div
                      className={`p-2 mb-4 rounded-md ${saveMessage.type === "success" ? "bg-gray-200 text-green-700" : "bg-gray-200 text-gray-700"}`}
                      data-oid="io-tnq4"
                    >
                      {saveMessage.text}
                    </div>
                  )}

                  <div
                    className="flex justify-end space-x-2"
                    data-oid="_gfwkky"
                  >
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      data-oid="5dalnqi"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-md transition-all duration-150 ease-in-out"
                      data-oid="qaptq_c"
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Editar Dirección */}
            {activeModal === "address" && (
              <div data-oid="io3bm-3">
                <div
                  className="flex justify-between items-center border-b border-gray-200 p-4"
                  data-oid="dobqi5u"
                >
                  <h3 className="text-lg font-semibold" data-oid=":ys_fvn">
                    Editar dirección
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                    data-oid="rcgqvxj"
                  >
                    <X className="w-5 h-5" data-oid="7pa2ejo" />
                  </button>
                </div>
                <form
                  onSubmit={saveAddressChanges}
                  className="p-6"
                  data-oid="rx83yqe"
                >
                  <div className="mb-6" data-oid="9qua5z1">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid="hpaiqsx"
                    >
                      Dirección completa
                    </label>
                    <textarea
                      value={addressForm.address}
                      onChange={handleAddressChange}
                      rows={3}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      data-oid="wqp9e_j"
                    />
                  </div>

                  {saveMessage && (
                    <div
                      className={`p-2 mb-4 rounded-md ${saveMessage.type === "success" ? "bg-gray-200 text-green-700" : "bg-gray-200 text-gray-700"}`}
                      data-oid="ui7.khp"
                    >
                      {saveMessage.text}
                    </div>
                  )}

                  <div
                    className="flex justify-end space-x-2"
                    data-oid="n7u-y:n"
                  >
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      data-oid="uopl0fo"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-md transition-all duration-150 ease-in-out"
                      data-oid="63fmcw6"
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Otros modales se pueden implementar de manera similar */}
            {activeModal === "password" && (
              <div data-oid="c:ts_h9">
                <div
                  className="flex justify-between items-center border-b border-gray-200 p-4"
                  data-oid="5o5oqhj"
                >
                  <h3 className="text-lg font-semibold" data-oid="lxn4p:w">
                    Cambiar contraseña
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                    data-oid="bzp2.wl"
                  >
                    <X className="w-5 h-5" data-oid="a237p9n" />
                  </button>
                </div>
                <div className="p-6" data-oid="gvo2glv">
                  <p className="text-gray-600 mb-4" data-oid="1glusrs">
                    Esta funcionalidad no está implementada en esta versión.
                  </p>
                  <div className="flex justify-end" data-oid="moqrs_l">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      data-oid=":a4bp:9"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {(activeModal === "marketing" ||
              activeModal === "notifications") && (
              <div data-oid="ga87dwx">
                <div
                  className="flex justify-between items-center border-b border-gray-200 p-4"
                  data-oid="v38jxw3"
                >
                  <h3 className="text-lg font-semibold" data-oid="4jntcng">
                    Editar preferencias de notificaciones
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                    data-oid="3j3.zyv"
                  >
                    <X className="w-5 h-5" data-oid="xpfrokp" />
                  </button>
                </div>
                <div className="p-6" data-oid="pgk2cu2">
                  <p className="text-gray-600 mb-4" data-oid="v3j32qj">
                    Esta funcionalidad no está implementada en esta versión.
                  </p>
                  <div className="flex justify-end" data-oid="mv1:f6t">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      data-oid="gpbky6w"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer data-oid="_4.93h_" />
    </div>
  );
}
