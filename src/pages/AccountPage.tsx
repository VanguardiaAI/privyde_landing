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
    <div className="flex flex-col min-h-screen" data-oid="mjz.vzt">
      <Navbar data-oid="uau_5o0" />

      <main className="flex-1 bg-white pb-16" data-oid="9grv2nq">
        <div
          className="container mx-auto px-4 py-8 max-w-5xl"
          data-oid="08hwf-c"
        >
          <h1
            className="text-3xl font-bold text-gray-800 mb-6"
            data-oid="9a2.g2d"
          >
            Cuenta
          </h1>
          <p className="text-gray-600 mb-8" data-oid="-_bfyb7">
            Gestione su información para que Privyde satisfaga sus necesidades.
          </p>

          {/* Información personal */}
          <div className="mb-8" data-oid=".x80q4:">
            <h2
              className="text-xl font-semibold text-gray-800 mb-4"
              data-oid="woon-w3"
            >
              Información personal
            </h2>

            <div
              className="border border-gray-200 rounded-md overflow-hidden"
              data-oid="kh19y5v"
            >
              {/* Nombre */}
              <div
                className="flex justify-between items-center p-4 border-b border-gray-200"
                data-oid=".87j9:4"
              >
                <div data-oid="g1sbwh3">
                  <div
                    className="text-sm text-gray-500 mb-1"
                    data-oid="qw7-q:l"
                  >
                    Nombre
                  </div>
                  <div className="font-medium" data-oid=":m09qrd">
                    {user?.profile?.title || ""}{" "}
                    {user?.profile?.first_name || ""}{" "}
                    {user?.profile?.last_name || ""}
                  </div>
                </div>
                <button
                  className="p-2 text-gray-600 hover:text-black"
                  onClick={() => openModal("name")}
                  data-oid="1ueaj4v"
                >
                  <Edit className="w-5 h-5" data-oid="q1u.czy" />
                </button>
              </div>

              {/* Email */}
              <div
                className="flex justify-between items-center p-4 border-b border-gray-200"
                data-oid="2mn:ym6"
              >
                <div data-oid="p.-i456">
                  <div
                    className="text-sm text-gray-500 mb-1"
                    data-oid="vwq7asu"
                  >
                    Email
                  </div>
                  <div className="font-medium" data-oid="g6lqia7">
                    {user?.email}
                  </div>
                </div>
                <button
                  className="p-2 text-gray-600 hover:text-black"
                  onClick={() => openModal("email")}
                  data-oid="_a8-0nb"
                >
                  <Edit className="w-5 h-5" data-oid="jpbg4c:" />
                </button>
              </div>

              {/* Teléfono móvil */}
              <div
                className="flex justify-between items-center p-4 border-b border-gray-200"
                data-oid="qyuv5_y"
              >
                <div data-oid="6r2cbyy">
                  <div
                    className="text-sm text-gray-500 mb-1"
                    data-oid="8ie:quy"
                  >
                    Teléfono móvil
                  </div>
                  <div className="font-medium" data-oid="xb2eabi">
                    {user?.profile?.country_code || ""}
                    {user?.profile?.phone || ""}
                  </div>
                </div>
                <button
                  className="p-2 text-gray-600 hover:text-black"
                  onClick={() => openModal("phone")}
                  data-oid="yhanru9"
                >
                  <Edit className="w-5 h-5" data-oid="q5x_-8c" />
                </button>
              </div>

              {/* Empresa */}
              <div
                className="flex justify-between items-center p-4 border-b border-gray-200"
                data-oid="fp471lz"
              >
                <div data-oid="0r9cg:r">
                  <div
                    className="text-sm text-gray-500 mb-1"
                    data-oid="1xa7n-_"
                  >
                    Empresa
                  </div>
                  <div className="font-medium" data-oid="ov_pctr">
                    {user?.profile?.company || "—"}
                  </div>
                </div>
                <button
                  className="p-2 text-gray-600 hover:text-black"
                  onClick={() => openModal("company")}
                  data-oid="lzd.9v."
                >
                  <Edit className="w-5 h-5" data-oid="tt6h-pf" />
                </button>
              </div>

              {/* Dirección */}
              <div
                className="flex justify-between items-center p-4"
                data-oid="qr4dbkp"
              >
                <div data-oid="9g3qs4n">
                  <div
                    className="text-sm text-gray-500 mb-1"
                    data-oid="sfy2vrt"
                  >
                    Dirección
                  </div>
                  <div className="font-medium" data-oid="qi5b73j">
                    {user?.profile?.address || "—"}
                  </div>
                </div>
                <button
                  className="p-2 text-gray-600 hover:text-black"
                  onClick={() => openModal("address")}
                  data-oid="gd.vbs1"
                >
                  <Edit className="w-5 h-5" data-oid="i925:vf" />
                </button>
              </div>
            </div>
          </div>

          {/* Contraseña */}
          <div className="mb-8" data-oid="bk39lnj">
            <h2
              className="text-xl font-semibold text-gray-800 mb-4"
              data-oid="dtb7igm"
            >
              Contraseña
            </h2>

            <div
              className="border border-gray-200 rounded-md overflow-hidden"
              data-oid="s9-nh24"
            >
              <div
                className="flex justify-between items-center p-4"
                data-oid="w2a6dqe"
              >
                <div data-oid="aezz5qx">
                  <div
                    className="text-sm text-gray-500 mb-1"
                    data-oid="147yvot"
                  >
                    Contraseña
                  </div>
                  <div className="font-medium" data-oid="gmbmt:b">
                    ••••••••••••••
                  </div>
                </div>
                <button
                  className="p-2 text-gray-600 hover:text-black"
                  onClick={() => openModal("password")}
                  data-oid="zy_6pr_"
                >
                  <Edit className="w-5 h-5" data-oid="9x6ap5e" />
                </button>
              </div>
            </div>
          </div>

          {/* Pago */}
          <div className="mb-8" data-oid="0ncg-8g">
            <h2
              className="text-xl font-semibold text-gray-800 mb-4"
              data-oid=".nnnv:h"
            >
              Pago
            </h2>

            <button
              className="w-full border border-gray-300 rounded-md py-3 px-4 text-center flex items-center justify-center hover:bg-gray-50"
              data-oid="9744w46"
            >
              <span className="text-gray-700 font-medium" data-oid="1t:8th9">
                + Añadir nueva tarjeta
              </span>
            </button>
          </div>

          {/* Promociones */}
          <div className="mb-8" data-oid="x24tx34">
            <h2
              className="text-xl font-semibold text-gray-800 mb-4"
              data-oid="s1d9pr1"
            >
              Promociones
            </h2>
            <p className="text-gray-600" data-oid="1bdb_1z">
              No hay vales disponibles en su cuenta en este momento.
            </p>
          </div>

          {/* Notificaciones */}
          <div className="mb-8" data-oid="ctc9027">
            <h2
              className="text-xl font-semibold text-gray-800 mb-4"
              data-oid="el0k5u9"
            >
              Notificaciones
            </h2>

            <div
              className="border border-gray-200 rounded-md overflow-hidden"
              data-oid="ret6m9e"
            >
              {/* Correos de marketing */}
              <div
                className="flex justify-between items-center p-4 border-b border-gray-200"
                data-oid="rymqn25"
              >
                <div data-oid="nn3:frd">
                  <div
                    className="text-sm text-gray-500 mb-1"
                    data-oid="_48-sg:"
                  >
                    Correos electrónicos de marketing
                  </div>
                  <div className="font-medium" data-oid="z:mguym">
                    On
                  </div>
                </div>
                <button
                  className="p-2 text-gray-600 hover:text-black"
                  onClick={() => openModal("marketing")}
                  data-oid="bzxsd-w"
                >
                  <Edit className="w-5 h-5" data-oid="n8fol3a" />
                </button>
              </div>

              {/* Notificaciones de reserva */}
              <div
                className="flex justify-between items-center p-4"
                data-oid="my0_y:3"
              >
                <div data-oid="05f3742">
                  <div
                    className="text-sm text-gray-500 mb-1"
                    data-oid="-_d1voi"
                  >
                    Notificaciones de reserva
                  </div>
                  <div className="font-medium" data-oid="rg7q8oz">
                    Activado: Correo electrónico y SMS
                  </div>
                </div>
                <button
                  className="p-2 text-gray-600 hover:text-black"
                  onClick={() => openModal("notifications")}
                  data-oid="vufsxyr"
                >
                  <Edit className="w-5 h-5" data-oid="3xr0usn" />
                </button>
              </div>
            </div>
          </div>

          {/* Borrar cuenta */}
          <button
            className="w-full border border-gray-300 rounded-md py-3 px-4 text-center mb-8 hover:bg-gray-50"
            data-oid="_r94vey"
          >
            <span className="text-gray-700 font-medium" data-oid="1_26:sv">
              Borrar mi cuenta
            </span>
          </button>
        </div>
      </main>

      {/* Modal de Edición */}
      {activeModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          data-oid="cijhqre"
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-md w-full"
            data-oid="6qyyoom"
          >
            {/* Editar Nombre */}
            {activeModal === "name" && (
              <div data-oid="k_xi:jk">
                <div
                  className="flex justify-between items-center border-b border-gray-200 p-4"
                  data-oid="1dgr0rp"
                >
                  <h3 className="text-lg font-semibold" data-oid="ygyeqef">
                    Editar nombre
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                    data-oid=":49sd3y"
                  >
                    <X className="w-5 h-5" data-oid="h_v1qvz" />
                  </button>
                </div>
                <form
                  onSubmit={saveNameChanges}
                  className="p-6"
                  data-oid=":qskj2b"
                >
                  <div className="mb-4" data-oid="xijo62o">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid="zq_o-go"
                    >
                      Título
                    </label>
                    <select
                      name="title"
                      value={nameForm.title}
                      onChange={handleNameChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      data-oid="mnvn_8j"
                    >
                      <option value="" data-oid="bk:.o90">
                        Seleccionar...
                      </option>
                      <option value="Sr" data-oid="qzj19i:">
                        Sr.
                      </option>
                      <option value="Sra" data-oid="sgz-ww:">
                        Sra.
                      </option>
                      <option value="Dr" data-oid="4ozfo-p">
                        Dr.
                      </option>
                      <option value="Dra" data-oid="2khgc.u">
                        Dra.
                      </option>
                    </select>
                  </div>
                  <div className="mb-4" data-oid="t7hkxtr">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid="wdqxc0:"
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      value={nameForm.first_name}
                      onChange={handleNameChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      data-oid="mqa4ztq"
                    />
                  </div>
                  <div className="mb-6" data-oid="3.bl1-6">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid="l7km9q:"
                    >
                      Apellido
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      value={nameForm.last_name}
                      onChange={handleNameChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      data-oid="x-k790q"
                    />
                  </div>

                  {saveMessage && (
                    <div
                      className={`p-2 mb-4 rounded-md ${saveMessage.type === "success" ? "bg-gray-200 text-green-700" : "bg-gray-200 text-gray-700"}`}
                      data-oid="5ar8jrb"
                    >
                      {saveMessage.text}
                    </div>
                  )}

                  <div
                    className="flex justify-end space-x-2"
                    data-oid="ve9qbje"
                  >
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      data-oid="mmj41v-"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-md transition-all duration-150 ease-in-out"
                      data-oid="is-kc4a"
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Editar Email (solo informativo) */}
            {activeModal === "email" && (
              <div data-oid=".-aap2:">
                <div
                  className="flex justify-between items-center border-b border-gray-200 p-4"
                  data-oid="ir_jnek"
                >
                  <h3 className="text-lg font-semibold" data-oid="a1tepoh">
                    Correo electrónico
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                    data-oid="pmgbval"
                  >
                    <X className="w-5 h-5" data-oid="50g5v7x" />
                  </button>
                </div>
                <div className="p-6" data-oid="2nigyyi">
                  <p className="text-gray-600 mb-4" data-oid="a7p..x5">
                    No es posible cambiar el correo electrónico asociado a tu
                    cuenta.
                  </p>
                  <p className="text-gray-600 mb-6" data-oid="nn53xk8">
                    Si necesitas usar una dirección diferente, deberás crear una
                    nueva cuenta.
                  </p>
                  <div className="flex justify-end" data-oid="12i1vy0">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      data-oid="tp.4a0-"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Editar Teléfono */}
            {activeModal === "phone" && (
              <div data-oid="p6pii:3">
                <div
                  className="flex justify-between items-center border-b border-gray-200 p-4"
                  data-oid="dhx9jez"
                >
                  <h3 className="text-lg font-semibold" data-oid="s9o7ltl">
                    Editar teléfono
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                    data-oid="0g9unbx"
                  >
                    <X className="w-5 h-5" data-oid="03q0a_g" />
                  </button>
                </div>
                <form
                  onSubmit={savePhoneChanges}
                  className="p-6"
                  data-oid="l.49r:n"
                >
                  <div className="mb-4" data-oid="n3:fr1v">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid="m0kjryf"
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
                      data-oid=".hxyxa1"
                    />
                  </div>
                  <div className="mb-6" data-oid="_ad6gdq">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid="wg_185f"
                    >
                      Número de teléfono
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={phoneForm.phone}
                      onChange={handlePhoneChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      data-oid="02g5yk_"
                    />
                  </div>

                  {saveMessage && (
                    <div
                      className={`p-2 mb-4 rounded-md ${saveMessage.type === "success" ? "bg-gray-200 text-green-700" : "bg-gray-200 text-gray-700"}`}
                      data-oid="cpwyybf"
                    >
                      {saveMessage.text}
                    </div>
                  )}

                  <div
                    className="flex justify-end space-x-2"
                    data-oid="9yz6uz1"
                  >
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      data-oid="plesy93"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-md transition-all duration-150 ease-in-out"
                      data-oid="k2mvid:"
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Editar Empresa */}
            {activeModal === "company" && (
              <div data-oid="ed81t2d">
                <div
                  className="flex justify-between items-center border-b border-gray-200 p-4"
                  data-oid="uw:oija"
                >
                  <h3 className="text-lg font-semibold" data-oid="km1feut">
                    Editar empresa
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                    data-oid="u:k5opf"
                  >
                    <X className="w-5 h-5" data-oid="03jv-p-" />
                  </button>
                </div>
                <form
                  onSubmit={saveCompanyChanges}
                  className="p-6"
                  data-oid="e-ezvhf"
                >
                  <div className="mb-6" data-oid="..f_pdp">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid="im3v2z8"
                    >
                      Nombre de la empresa
                    </label>
                    <input
                      type="text"
                      value={companyForm.company}
                      onChange={handleCompanyChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      data-oid="z7vs_-j"
                    />
                  </div>

                  {saveMessage && (
                    <div
                      className={`p-2 mb-4 rounded-md ${saveMessage.type === "success" ? "bg-gray-200 text-green-700" : "bg-gray-200 text-gray-700"}`}
                      data-oid="vpm:rd8"
                    >
                      {saveMessage.text}
                    </div>
                  )}

                  <div
                    className="flex justify-end space-x-2"
                    data-oid="bygvs8r"
                  >
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      data-oid="yq6mgv6"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-md transition-all duration-150 ease-in-out"
                      data-oid="w:pemm."
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Editar Dirección */}
            {activeModal === "address" && (
              <div data-oid="cgke-b3">
                <div
                  className="flex justify-between items-center border-b border-gray-200 p-4"
                  data-oid="c-qc05y"
                >
                  <h3 className="text-lg font-semibold" data-oid="j3vkuh9">
                    Editar dirección
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                    data-oid="9mje.46"
                  >
                    <X className="w-5 h-5" data-oid="qbzghr7" />
                  </button>
                </div>
                <form
                  onSubmit={saveAddressChanges}
                  className="p-6"
                  data-oid="jr0zx4p"
                >
                  <div className="mb-6" data-oid="82ause_">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid="5oiq22t"
                    >
                      Dirección completa
                    </label>
                    <textarea
                      value={addressForm.address}
                      onChange={handleAddressChange}
                      rows={3}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      data-oid="2kssu-t"
                    />
                  </div>

                  {saveMessage && (
                    <div
                      className={`p-2 mb-4 rounded-md ${saveMessage.type === "success" ? "bg-gray-200 text-green-700" : "bg-gray-200 text-gray-700"}`}
                      data-oid="-rc2y2-"
                    >
                      {saveMessage.text}
                    </div>
                  )}

                  <div
                    className="flex justify-end space-x-2"
                    data-oid="-16yz7y"
                  >
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      data-oid="vda_qo1"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-md transition-all duration-150 ease-in-out"
                      data-oid="dcgwf3f"
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Otros modales se pueden implementar de manera similar */}
            {activeModal === "password" && (
              <div data-oid="e:zq0v0">
                <div
                  className="flex justify-between items-center border-b border-gray-200 p-4"
                  data-oid="nrq10e3"
                >
                  <h3 className="text-lg font-semibold" data-oid="yfzp7mb">
                    Cambiar contraseña
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                    data-oid="p8omyfy"
                  >
                    <X className="w-5 h-5" data-oid="kx7dlg6" />
                  </button>
                </div>
                <div className="p-6" data-oid="jb_ukaz">
                  <p className="text-gray-600 mb-4" data-oid="dmgqk:2">
                    Esta funcionalidad no está implementada en esta versión.
                  </p>
                  <div className="flex justify-end" data-oid="r114ihh">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      data-oid=":ig.sp."
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {(activeModal === "marketing" ||
              activeModal === "notifications") && (
              <div data-oid="sq.xi5-">
                <div
                  className="flex justify-between items-center border-b border-gray-200 p-4"
                  data-oid="n_3ldeu"
                >
                  <h3 className="text-lg font-semibold" data-oid=".oijlzs">
                    Editar preferencias de notificaciones
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                    data-oid="s8t67_r"
                  >
                    <X className="w-5 h-5" data-oid="mz3e898" />
                  </button>
                </div>
                <div className="p-6" data-oid="q5-e_:g">
                  <p className="text-gray-600 mb-4" data-oid="5-gsumk">
                    Esta funcionalidad no está implementada en esta versión.
                  </p>
                  <div className="flex justify-end" data-oid="-vgez-b">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      data-oid="d4v.t5g"
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

      <Footer data-oid="kz5hk8n" />
    </div>
  );
}
