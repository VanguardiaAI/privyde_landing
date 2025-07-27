import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Mail, Lock, Building, User, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate, Link } from "react-router-dom";

type CompanyRegistrationData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  phonePrefix: string;
  phoneNumber: string;
  country: string;
  location: string;
  companySize: string;
  hearAbout: string;
  additionalInfo: string;
  termsAccepted: boolean;
};

const initialFormData: CompanyRegistrationData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  companyName: "",
  phonePrefix: "+34",
  phoneNumber: "",
  country: "España",
  location: "",
  companySize: "1-10 empleados",
  hearAbout: "Búsqueda en Google",
  additionalInfo: "",
  termsAccepted: false,
};

export default function RegisterCompaniesPage() {
  const { register, error, isLoading, setUser, setError } = useAuth();
  const [formData, setFormData] =
    useState<CompanyRegistrationData>(initialFormData);
  const [validationErrors, setValidationErrors] = useState<
    Partial<Record<keyof CompanyRegistrationData, string>>
  >({});
  const [isFromCompaniesForm, setIsFromCompaniesForm] = useState(false);
  const navigate = useNavigate();

  // Cargar datos de localStorage si existen
  useEffect(() => {
    const savedContactData = localStorage.getItem("companyContactData");
    if (savedContactData) {
      setIsFromCompaniesForm(true);
      try {
        const contactData = JSON.parse(savedContactData);
        // Actualizar el estado con los datos guardados
        setFormData((prevData) => ({
          ...prevData,
          firstName: contactData.firstName || prevData.firstName,
          lastName: contactData.lastName || prevData.lastName,
          companyName: contactData.companyName || prevData.companyName,
          phonePrefix: contactData.phonePrefix || prevData.phonePrefix,
          phoneNumber: contactData.phoneNumber || prevData.phoneNumber,
          country: contactData.country || prevData.country,
          location: contactData.location || prevData.location,
          companySize: contactData.companySize || prevData.companySize,
          hearAbout: contactData.hearAbout || prevData.hearAbout,
          additionalInfo: contactData.message || prevData.additionalInfo,
        }));

        // Limpiar datos guardados después de cargarlos
        localStorage.removeItem("companyContactData");
      } catch (err) {
        console.error("Error al cargar los datos de contacto:", err);
      }
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar error de validación al editar
    if (validationErrors[name as keyof CompanyRegistrationData]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      termsAccepted: checked,
    }));

    if (validationErrors.termsAccepted) {
      setValidationErrors((prev) => ({
        ...prev,
        termsAccepted: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof CompanyRegistrationData, string>> = {};

    // Validaciones básicas
    if (!formData.firstName.trim()) errors.firstName = "El nombre es requerido";
    if (!formData.lastName.trim()) errors.lastName = "El apellido es requerido";
    if (!formData.email.trim()) errors.email = "El email es requerido";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Email inválido";

    if (!formData.password) errors.password = "La contraseña es requerida";
    else if (formData.password.length < 8)
      errors.password = "La contraseña debe tener al menos 8 caracteres";

    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Las contraseñas no coinciden";

    if (!formData.companyName.trim())
      errors.companyName = "El nombre de la empresa es requerido";
    if (!formData.phoneNumber.trim())
      errors.phoneNumber = "El número de teléfono es requerido";
    if (!formData.location.trim())
      errors.location = "La ubicación es requerida";

    if (!formData.termsAccepted)
      errors.termsAccepted = "Debe aceptar los términos y condiciones";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // 1. Registrar el usuario básico (autenticación) con rol "company"
      await register(
        formData.email,
        formData.password,
        `${formData.firstName} ${formData.lastName}`,
        "company",
      );

      // 2. Obtener el token de autenticación (generado por el registro)
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error(
          "No se pudo obtener el token de autenticación después del registro",
        );
      }

      // 3. Preparar los datos de la empresa
      const companyData = {
        companyName: formData.companyName,
        phoneNumber: `${formData.phonePrefix}${formData.phoneNumber}`,
        country: formData.country,
        location: formData.location,
        companySize: formData.companySize,
        hearAbout: formData.hearAbout,
        additionalInfo: formData.additionalInfo,
        // Añadir información del representante
        representativeInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
        },
        isCompany: true, // Marcar que es una empresa
      };

      // 4. Enviar los datos de la empresa al backend
      const companyResponse = await axios.post(
        `${import.meta.env.VITE_API_URL?.replace(/\/api$/, "") || "http://localhost:5000"}/api/profile/update-company`,
        companyData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!companyResponse.data.success) {
        throw new Error("Error al guardar los datos de la empresa");
      }

      // 5. Actualizar el usuario en localStorage con los datos de la empresa
      if (companyResponse.data.user) {
        localStorage.setItem("user", JSON.stringify(companyResponse.data.user));
        setUser(companyResponse.data.user);
      }

      // 6. Redirigir según el estado del perfil
      navigate("/complete-profile");
    } catch (err: any) {
      console.error("Error en registro:", err);
      // Si hay un error en la segunda petición, asegurarse de que el usuario sepa que algo falló
      if (err.response) {
        setError(
          err.response.data.error || "Error al guardar los datos de la empresa",
        );
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Error desconocido durante el registro de la empresa");
      }

      // Si falló la segunda petición, pero el usuario ya fue creado,
      // podemos mantener la sesión iniciada y solo mostrar un mensaje
    }
  };

  return (
    <>
      <Navbar data-oid="gl8qdlo" />
      <div className="w-full bg-gray-50 py-12 md:py-20 px-4" data-oid="qzulllb">
        <div className="max-w-7xl mx-auto" data-oid="x2wywiw">
          <div className="max-w-3xl mx-auto mb-16" data-oid="ks6rpjk">
            <h1
              className="text-3xl font-bold text-center mb-8"
              data-oid=":kim3sf"
            >
              Registro de Empresas
            </h1>

            {isFromCompaniesForm && (
              <div
                className="bg-green-50 p-4 rounded-lg border border-green-200 text-green-700 mb-6 text-center"
                data-oid="zustomx"
              >
                Casi has terminado. Completa tu registro de empresa para
                continuar.
              </div>
            )}

            <Card
              className="w-full shadow-lg bg-white rounded-xl overflow-hidden border-0 relative z-20"
              data-oid=".kqa94a"
            >
              <CardContent className="p-6 md:p-8" data-oid="n9og-m8">
                {error && (
                  <div
                    className="bg-gray-100 p-3 rounded border border-gray-200 text-gray-600 text-sm mb-6"
                    data-oid="v-sw92b"
                  >
                    {error}
                  </div>
                )}

                <form
                  className="space-y-6"
                  onSubmit={handleSubmit}
                  data-oid="szcplu2"
                >
                  <div className="space-y-1" data-oid="yrrpglm">
                    <h2
                      className="text-xl font-semibold text-gray-800 flex items-center"
                      data-oid="sibhmsi"
                    >
                      <User className="h-5 w-5 mr-2" data-oid="l0:cao1" />
                      Información Personal
                    </h2>
                    <p className="text-sm text-gray-500" data-oid="f:vhadx">
                      Datos del representante o administrador de la cuenta
                      empresarial
                    </p>
                  </div>

                  <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    data-oid="3jexlwa"
                  >
                    <div data-oid="cpnhm9i">
                      <Label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                        data-oid="2:evife"
                      >
                        Nombre{" "}
                        <span className="text-black" data-oid="::g26ms">
                          *
                        </span>
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full ${validationErrors.firstName ? "border-gray-300 focus:border-gray-500 focus:ring-red-500" : ""}`}
                        data-oid="i7yyjl0"
                      />

                      {validationErrors.firstName && (
                        <p
                          className="mt-1 text-xs text-gray-600"
                          data-oid="xtycxy7"
                        >
                          {validationErrors.firstName}
                        </p>
                      )}
                    </div>
                    <div data-oid="66sjtib">
                      <Label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                        data-oid="rahizy_"
                      >
                        Apellido{" "}
                        <span className="text-black" data-oid="jbs3yde">
                          *
                        </span>
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full ${validationErrors.lastName ? "border-gray-300 focus:border-gray-500 focus:ring-red-500" : ""}`}
                        data-oid="di:g5l."
                      />

                      {validationErrors.lastName && (
                        <p
                          className="mt-1 text-xs text-gray-600"
                          data-oid="y:xi6s-"
                        >
                          {validationErrors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4" data-oid=".tc:.xf">
                    <div data-oid="9j_vrpz">
                      <Label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                        data-oid="03lkv:."
                      >
                        Email Corporativo{" "}
                        <span className="text-black" data-oid="5m11lag">
                          *
                        </span>
                      </Label>
                      <div className="relative" data-oid="21zy3uv">
                        <Mail
                          className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                          data-oid="wrxr84z"
                        />

                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="empresa@dominio.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`pl-10 ${validationErrors.email ? "border-gray-300 focus:border-gray-500 focus:ring-red-500" : ""}`}
                          data-oid="dr.59d2"
                        />
                      </div>
                      {validationErrors.email && (
                        <p
                          className="mt-1 text-xs text-gray-600"
                          data-oid="b-f:j-3"
                        >
                          {validationErrors.email}
                        </p>
                      )}
                    </div>

                    <div data-oid="i9hs:2s">
                      <Label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-1"
                        data-oid="2dl6sc3"
                      >
                        Contraseña{" "}
                        <span className="text-black" data-oid="l3e-z31">
                          *
                        </span>
                      </Label>
                      <div className="relative" data-oid="5inuhnl">
                        <Lock
                          className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                          data-oid="ujkjkr2"
                        />

                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Mínimo 8 caracteres"
                          value={formData.password}
                          onChange={handleInputChange}
                          className={`pl-10 ${validationErrors.password ? "border-gray-300 focus:border-gray-500 focus:ring-red-500" : ""}`}
                          data-oid="jox.9cp"
                        />
                      </div>
                      {validationErrors.password && (
                        <p
                          className="mt-1 text-xs text-gray-600"
                          data-oid="vt-l_t6"
                        >
                          {validationErrors.password}
                        </p>
                      )}
                    </div>

                    <div data-oid=".u_0he:">
                      <Label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700 mb-1"
                        data-oid="knpnw8g"
                      >
                        Confirmar Contraseña{" "}
                        <span className="text-black" data-oid="v8mn9wn">
                          *
                        </span>
                      </Label>
                      <div className="relative" data-oid="ewewnv-">
                        <Lock
                          className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                          data-oid="8nr7bzq"
                        />

                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          placeholder="Repite tu contraseña"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className={`pl-10 ${validationErrors.confirmPassword ? "border-gray-300 focus:border-gray-500 focus:ring-red-500" : ""}`}
                          data-oid="l3rmx2."
                        />
                      </div>
                      {validationErrors.confirmPassword && (
                        <p
                          className="mt-1 text-xs text-gray-600"
                          data-oid="0pbn..m"
                        >
                          {validationErrors.confirmPassword}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1 pt-4" data-oid="corga_0">
                    <h2
                      className="text-xl font-semibold text-gray-800 flex items-center"
                      data-oid="csgh0ac"
                    >
                      <Building className="h-5 w-5 mr-2" data-oid="u77marp" />
                      Información de la Empresa
                    </h2>
                    <p className="text-sm text-gray-500" data-oid="j5m_6sw">
                      Datos de la empresa para configurar su cuenta corporativa
                    </p>
                  </div>

                  <div data-oid="-bd.yzq">
                    <Label
                      htmlFor="companyName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid="oquks24"
                    >
                      Nombre de la empresa{" "}
                      <span className="text-black" data-oid="i.c2-3k">
                        *
                      </span>
                    </Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className={`w-full ${validationErrors.companyName ? "border-gray-300 focus:border-gray-500 focus:ring-red-500" : ""}`}
                      data-oid="4x2b0of"
                    />

                    {validationErrors.companyName && (
                      <p
                        className="mt-1 text-xs text-gray-600"
                        data-oid="jxj131t"
                      >
                        {validationErrors.companyName}
                      </p>
                    )}
                  </div>

                  <div
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    data-oid="6-sx2un"
                  >
                    <div data-oid="5s_c84i">
                      <Label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700 mb-1"
                        data-oid="rwadoq."
                      >
                        País{" "}
                        <span className="text-black" data-oid="cnirmcc">
                          *
                        </span>
                      </Label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        data-oid=":rv4rqm"
                      >
                        <option data-oid="uq9h5r2">España</option>
                        <option data-oid="6uqyxpp">Estados Unidos</option>
                        <option data-oid="17vtn0b">México</option>
                        <option data-oid="znyimmb">Argentina</option>
                        <option data-oid="az455x5">Colombia</option>
                        <option data-oid="vj41r-c">Chile</option>
                        <option data-oid="jq1dweb">Perú</option>
                        <option data-oid="pp625_g">Otro</option>
                      </select>
                    </div>

                    <div data-oid="fa6vu8r">
                      <Label
                        htmlFor="phonePrefix"
                        className="block text-sm font-medium text-gray-700 mb-1"
                        data-oid="_xywsn3"
                      >
                        Prefijo{" "}
                        <span className="text-black" data-oid="kcyd.ii">
                          *
                        </span>
                      </Label>
                      <select
                        id="phonePrefix"
                        name="phonePrefix"
                        value={formData.phonePrefix}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        data-oid="9h46xgq"
                      >
                        <option data-oid="mckh_ra">+34</option>
                        <option data-oid="rrcoh25">+1</option>
                        <option data-oid=":dya0l2">+52</option>
                        <option data-oid="14hphj2">+54</option>
                        <option data-oid="3812yv1">+57</option>
                        <option data-oid="0ihwv57">+56</option>
                        <option data-oid="ovm4ib:">+51</option>
                      </select>
                    </div>

                    <div data-oid=".vpfdmt">
                      <Label
                        htmlFor="phoneNumber"
                        className="block text-sm font-medium text-gray-700 mb-1"
                        data-oid="2lo3.:u"
                      >
                        Número de teléfono{" "}
                        <span className="text-black" data-oid="kvuei0n">
                          *
                        </span>
                      </Label>
                      <div className="relative" data-oid="drdkwu:">
                        <Phone
                          className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                          data-oid="h82k:r5"
                        />

                        <Input
                          id="phoneNumber"
                          name="phoneNumber"
                          type="tel"
                          placeholder="912345678"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          className={`pl-10 ${validationErrors.phoneNumber ? "border-gray-300 focus:border-gray-500 focus:ring-red-500" : ""}`}
                          data-oid="yg_szx7"
                        />
                      </div>
                      {validationErrors.phoneNumber && (
                        <p
                          className="mt-1 text-xs text-gray-600"
                          data-oid="zrhsloi"
                        >
                          {validationErrors.phoneNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  <div data-oid="0g1_y12">
                    <Label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid="0m0ir.6"
                    >
                      Ciudad / Ubicación{" "}
                      <span className="text-black" data-oid="ymq6m4z">
                        *
                      </span>
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="Ej: Madrid, Barcelona, etc."
                      value={formData.location}
                      onChange={handleInputChange}
                      className={`w-full ${validationErrors.location ? "border-gray-300 focus:border-gray-500 focus:ring-red-500" : ""}`}
                      data-oid="uw_xjhu"
                    />

                    {validationErrors.location && (
                      <p
                        className="mt-1 text-xs text-gray-600"
                        data-oid="tyxgfis"
                      >
                        {validationErrors.location}
                      </p>
                    )}
                  </div>

                  <div data-oid="g42qqw.">
                    <Label
                      htmlFor="companySize"
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid="wo6mj1f"
                    >
                      Tamaño de la empresa
                    </Label>
                    <select
                      id="companySize"
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      data-oid="_rfid81"
                    >
                      <option data-oid="4-16ki3">1-10 empleados</option>
                      <option data-oid="cwzd207">11-50 empleados</option>
                      <option data-oid="3kpdpm9">51-200 empleados</option>
                      <option data-oid="h9smr7q">201-500 empleados</option>
                      <option data-oid="pzy6p2v">501-1000 empleados</option>
                      <option data-oid="zw3kmsx">1000+ empleados</option>
                    </select>
                  </div>

                  <div data-oid=".ct3ij5">
                    <Label
                      htmlFor="hearAbout"
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid="j_qunv_"
                    >
                      ¿Cómo se enteró de nosotros?
                    </Label>
                    <select
                      id="hearAbout"
                      name="hearAbout"
                      value={formData.hearAbout}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      data-oid="-4k9y6y"
                    >
                      <option data-oid=".4ol9e_">Búsqueda en Google</option>
                      <option data-oid="1b-waj-">Redes sociales</option>
                      <option data-oid="61x96nx">Recomendación</option>
                      <option data-oid="8xot373">Publicidad</option>
                      <option data-oid="l_8e3:.">Otro</option>
                    </select>
                  </div>

                  <div data-oid="vldhl1l">
                    <Label
                      htmlFor="additionalInfo"
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid="l576i_a"
                    >
                      Información adicional o necesidades específicas
                    </Label>
                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      rows={4}
                      value={formData.additionalInfo}
                      onChange={handleInputChange}
                      placeholder="Descríbanos las necesidades específicas de transporte de su empresa"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      data-oid="mphsv.t"
                    />
                  </div>

                  <div
                    className="flex items-start space-x-2"
                    data-oid="ipd0kc8"
                  >
                    <Checkbox
                      id="termsAccepted"
                      checked={formData.termsAccepted}
                      onCheckedChange={handleCheckboxChange}
                      className={
                        validationErrors.termsAccepted
                          ? "border-gray-300 data-[state=checked]:bg-gray-1000"
                          : ""
                      }
                      data-oid="x6nz9ct"
                    />

                    <div data-oid="j959x-p">
                      <label
                        htmlFor="termsAccepted"
                        className={`block text-sm ${validationErrors.termsAccepted ? "text-gray-600" : "text-gray-500"}`}
                        data-oid="kms6hy."
                      >
                        Acepto los{" "}
                        <a
                          href="#"
                          className="text-primary underline"
                          data-oid="dcnh0la"
                        >
                          Términos y Condiciones
                        </a>{" "}
                        y la{" "}
                        <a
                          href="#"
                          className="text-primary underline"
                          data-oid="ot1trp8"
                        >
                          Política de Privacidad
                        </a>{" "}
                        <span className="text-black" data-oid="u0f2_dt">
                          *
                        </span>
                      </label>
                      {validationErrors.termsAccepted && (
                        <p
                          className="mt-1 text-xs text-gray-600"
                          data-oid="_n6h0rx"
                        >
                          {validationErrors.termsAccepted}
                        </p>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-primary hover:bg-primary/90 select-button text-base"
                    disabled={isLoading}
                    data-oid=".na784g"
                  >
                    {isLoading ? "Registrando..." : "Registrarse"}
                  </Button>
                </form>

                <div className="mt-6 text-center" data-oid="s372th8">
                  <p className="text-sm text-gray-600" data-oid="-s_qmhv">
                    ¿Ya tienes una cuenta?{" "}
                    <Link
                      to="/login-companies"
                      className="text-primary font-semibold hover:underline"
                      data-oid="brahai."
                    >
                      Inicia sesión
                    </Link>
                  </p>
                </div>

                <div
                  className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100"
                  data-oid="jl_1jpw"
                >
                  <div className="flex items-start" data-oid="v_c0nqq">
                    <Building
                      className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0"
                      data-oid="sv2fyg0"
                    />

                    <div data-oid="d3u-19m">
                      <h3
                        className="text-sm font-medium text-gray-800"
                        data-oid="aoc2qzt"
                      >
                        Beneficios para empresas
                      </h3>
                      <p
                        className="text-xs text-gray-600 mt-1"
                        data-oid="s5020s:"
                      >
                        Al registrarse, su empresa tendrá acceso a tarifas
                        corporativas especiales, facturación centralizada, panel
                        de administración exclusivo y atención personalizada.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer data-oid="0dinlc7" />
    </>
  );
}
