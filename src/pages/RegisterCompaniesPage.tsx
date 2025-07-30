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
      <Navbar data-oid=".0n1:go" />
      <div className="w-full bg-gray-50 py-12 md:py-20 px-4" data-oid="o3yd2-f">
        <div className="max-w-7xl mx-auto" data-oid="j_btwfv">
          <div className="max-w-3xl mx-auto mb-16" data-oid="-1y0nob">
            <h1
              className="text-3xl font-bold text-center mb-8"
              data-oid="dofm-un"
            >
              Registro de Empresas
            </h1>

            {isFromCompaniesForm && (
              <div
                className="bg-green-50 p-4 rounded-lg border border-green-200 text-green-700 mb-6 text-center"
                data-oid="1akj_on"
              >
                Casi has terminado. Completa tu registro de empresa para
                continuar.
              </div>
            )}

            <Card
              className="w-full shadow-lg bg-white rounded-xl overflow-hidden border-0 relative z-20"
              data-oid="e1wp9w1"
            >
              <CardContent className="p-6 md:p-8" data-oid="6q610q9">
                {error && (
                  <div
                    className="bg-gray-100 p-3 rounded border border-gray-200 text-gray-600 text-sm mb-6"
                    data-oid="wzl1nx0"
                  >
                    {error}
                  </div>
                )}

                <form
                  className="space-y-6"
                  onSubmit={handleSubmit}
                  data-oid="bk1c83t"
                >
                  <div className="space-y-1" data-oid="o-fr8b:">
                    <h2
                      className="text-xl font-semibold text-gray-800 flex items-center"
                      data-oid="vmo918u"
                    >
                      <User className="h-5 w-5 mr-2" data-oid="09brid4" />
                      Información Personal
                    </h2>
                    <p className="text-sm text-gray-500" data-oid="6:iv2pp">
                      Datos del representante o administrador de la cuenta
                      empresarial
                    </p>
                  </div>

                  <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    data-oid="b075:cf"
                  >
                    <div data-oid="5ip6mcn">
                      <Label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                        data-oid="70oppgk"
                      >
                        Nombre{" "}
                        <span className="text-black" data-oid="rtz_w5l">
                          *
                        </span>
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full ${validationErrors.firstName ? "border-gray-300 focus:border-gray-500 focus:ring-red-500" : ""}`}
                        data-oid="r-7tteo"
                      />

                      {validationErrors.firstName && (
                        <p
                          className="mt-1 text-xs text-gray-600"
                          data-oid="e9k4sx:"
                        >
                          {validationErrors.firstName}
                        </p>
                      )}
                    </div>
                    <div data-oid="ftxw7lp">
                      <Label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                        data-oid="5r5_m:9"
                      >
                        Apellido{" "}
                        <span className="text-black" data-oid="axctcq1">
                          *
                        </span>
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full ${validationErrors.lastName ? "border-gray-300 focus:border-gray-500 focus:ring-red-500" : ""}`}
                        data-oid="x9l04-h"
                      />

                      {validationErrors.lastName && (
                        <p
                          className="mt-1 text-xs text-gray-600"
                          data-oid="tbb.7-_"
                        >
                          {validationErrors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4" data-oid="hvd-ggf">
                    <div data-oid="8:b0q6o">
                      <Label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                        data-oid="g0fhed4"
                      >
                        Email Corporativo{" "}
                        <span className="text-black" data-oid="9-cbnjc">
                          *
                        </span>
                      </Label>
                      <div className="relative" data-oid="-321fb3">
                        <Mail
                          className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                          data-oid="0o6nnqq"
                        />

                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="empresa@dominio.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`pl-10 ${validationErrors.email ? "border-gray-300 focus:border-gray-500 focus:ring-red-500" : ""}`}
                          data-oid="4j50tl8"
                        />
                      </div>
                      {validationErrors.email && (
                        <p
                          className="mt-1 text-xs text-gray-600"
                          data-oid="g4rcv-:"
                        >
                          {validationErrors.email}
                        </p>
                      )}
                    </div>

                    <div data-oid="xbd_.3g">
                      <Label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-1"
                        data-oid="va6zgsl"
                      >
                        Contraseña{" "}
                        <span className="text-black" data-oid="av5_9e2">
                          *
                        </span>
                      </Label>
                      <div className="relative" data-oid="m00rp:m">
                        <Lock
                          className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                          data-oid="8awfox2"
                        />

                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Mínimo 8 caracteres"
                          value={formData.password}
                          onChange={handleInputChange}
                          className={`pl-10 ${validationErrors.password ? "border-gray-300 focus:border-gray-500 focus:ring-red-500" : ""}`}
                          data-oid="j7tn58:"
                        />
                      </div>
                      {validationErrors.password && (
                        <p
                          className="mt-1 text-xs text-gray-600"
                          data-oid="0bqf7fu"
                        >
                          {validationErrors.password}
                        </p>
                      )}
                    </div>

                    <div data-oid="z-07p0x">
                      <Label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700 mb-1"
                        data-oid="o1se84e"
                      >
                        Confirmar Contraseña{" "}
                        <span className="text-black" data-oid="c::6wxn">
                          *
                        </span>
                      </Label>
                      <div className="relative" data-oid="sifep6h">
                        <Lock
                          className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                          data-oid="uey12r5"
                        />

                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          placeholder="Repite tu contraseña"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className={`pl-10 ${validationErrors.confirmPassword ? "border-gray-300 focus:border-gray-500 focus:ring-red-500" : ""}`}
                          data-oid="82:.z7f"
                        />
                      </div>
                      {validationErrors.confirmPassword && (
                        <p
                          className="mt-1 text-xs text-gray-600"
                          data-oid="q14dxez"
                        >
                          {validationErrors.confirmPassword}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1 pt-4" data-oid="og6di_8">
                    <h2
                      className="text-xl font-semibold text-gray-800 flex items-center"
                      data-oid="pcvlx7p"
                    >
                      <Building className="h-5 w-5 mr-2" data-oid="0td2i_c" />
                      Información de la Empresa
                    </h2>
                    <p className="text-sm text-gray-500" data-oid="5lgc1pm">
                      Datos de la empresa para configurar su cuenta corporativa
                    </p>
                  </div>

                  <div data-oid="ome0mv.">
                    <Label
                      htmlFor="companyName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid=".zs97yj"
                    >
                      Nombre de la empresa{" "}
                      <span className="text-black" data-oid="ocxrp4y">
                        *
                      </span>
                    </Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className={`w-full ${validationErrors.companyName ? "border-gray-300 focus:border-gray-500 focus:ring-red-500" : ""}`}
                      data-oid="szz2hk8"
                    />

                    {validationErrors.companyName && (
                      <p
                        className="mt-1 text-xs text-gray-600"
                        data-oid="-kqkx21"
                      >
                        {validationErrors.companyName}
                      </p>
                    )}
                  </div>

                  <div
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    data-oid="msvafnb"
                  >
                    <div data-oid="ga6zgnc">
                      <Label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700 mb-1"
                        data-oid="bx3y76q"
                      >
                        País{" "}
                        <span className="text-black" data-oid="t17f..y">
                          *
                        </span>
                      </Label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        data-oid="zgxre4u"
                      >
                        <option data-oid="m.u7n5h">España</option>
                        <option data-oid="uidrch_">Estados Unidos</option>
                        <option data-oid="7uwno-9">México</option>
                        <option data-oid="uzanhmk">Argentina</option>
                        <option data-oid="46i-xli">Colombia</option>
                        <option data-oid="3s7o0f-">Chile</option>
                        <option data-oid="6c9xjvn">Perú</option>
                        <option data-oid="qs6:iu9">Otro</option>
                      </select>
                    </div>

                    <div data-oid="acx0b0t">
                      <Label
                        htmlFor="phonePrefix"
                        className="block text-sm font-medium text-gray-700 mb-1"
                        data-oid="njze2ou"
                      >
                        Prefijo{" "}
                        <span className="text-black" data-oid="i3vswn9">
                          *
                        </span>
                      </Label>
                      <select
                        id="phonePrefix"
                        name="phonePrefix"
                        value={formData.phonePrefix}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        data-oid="1oe.urt"
                      >
                        <option data-oid="i-3x2le">+34</option>
                        <option data-oid="ign4lm5">+1</option>
                        <option data-oid="c2-mieo">+52</option>
                        <option data-oid="r8cz0br">+54</option>
                        <option data-oid="1tfdi7u">+57</option>
                        <option data-oid="tf5rs.e">+56</option>
                        <option data-oid="2kzkkut">+51</option>
                      </select>
                    </div>

                    <div data-oid="t.ozj0f">
                      <Label
                        htmlFor="phoneNumber"
                        className="block text-sm font-medium text-gray-700 mb-1"
                        data-oid="ilfl3y9"
                      >
                        Número de teléfono{" "}
                        <span className="text-black" data-oid="wda7dez">
                          *
                        </span>
                      </Label>
                      <div className="relative" data-oid="34zg1j_">
                        <Phone
                          className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                          data-oid="vjg9zjb"
                        />

                        <Input
                          id="phoneNumber"
                          name="phoneNumber"
                          type="tel"
                          placeholder="912345678"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          className={`pl-10 ${validationErrors.phoneNumber ? "border-gray-300 focus:border-gray-500 focus:ring-red-500" : ""}`}
                          data-oid="qb7j:ec"
                        />
                      </div>
                      {validationErrors.phoneNumber && (
                        <p
                          className="mt-1 text-xs text-gray-600"
                          data-oid="sjwy_hu"
                        >
                          {validationErrors.phoneNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  <div data-oid="1i8w4:k">
                    <Label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid="k-u5fod"
                    >
                      Ciudad / Ubicación{" "}
                      <span className="text-black" data-oid="ts.-da0">
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
                      data-oid="4hsm36u"
                    />

                    {validationErrors.location && (
                      <p
                        className="mt-1 text-xs text-gray-600"
                        data-oid="qdlg6m1"
                      >
                        {validationErrors.location}
                      </p>
                    )}
                  </div>

                  <div data-oid="hedf_pc">
                    <Label
                      htmlFor="companySize"
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid="zqx20.1"
                    >
                      Tamaño de la empresa
                    </Label>
                    <select
                      id="companySize"
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      data-oid="e0j.gej"
                    >
                      <option data-oid="_vdjkl6">1-10 empleados</option>
                      <option data-oid="wdljij6">11-50 empleados</option>
                      <option data-oid="yr1h7w-">51-200 empleados</option>
                      <option data-oid="k2ploa:">201-500 empleados</option>
                      <option data-oid="r.1n63.">501-1000 empleados</option>
                      <option data-oid="3oduu:x">1000+ empleados</option>
                    </select>
                  </div>

                  <div data-oid="15t9jgu">
                    <Label
                      htmlFor="hearAbout"
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid="it10an2"
                    >
                      ¿Cómo se enteró de nosotros?
                    </Label>
                    <select
                      id="hearAbout"
                      name="hearAbout"
                      value={formData.hearAbout}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      data-oid="e707o8d"
                    >
                      <option data-oid="95knc14">Búsqueda en Google</option>
                      <option data-oid="5o5qd7j">Redes sociales</option>
                      <option data-oid="m0mq_6y">Recomendación</option>
                      <option data-oid="h2p59x7">Publicidad</option>
                      <option data-oid="jokxspb">Otro</option>
                    </select>
                  </div>

                  <div data-oid="o47pu-d">
                    <Label
                      htmlFor="additionalInfo"
                      className="block text-sm font-medium text-gray-700 mb-1"
                      data-oid="d2d2cye"
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
                      data-oid="0nrj-de"
                    />
                  </div>

                  <div
                    className="flex items-start space-x-2"
                    data-oid="at:q66f"
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
                      data-oid="je:exup"
                    />

                    <div data-oid=".lar1-c">
                      <label
                        htmlFor="termsAccepted"
                        className={`block text-sm ${validationErrors.termsAccepted ? "text-gray-600" : "text-gray-500"}`}
                        data-oid="b5z1wr9"
                      >
                        Acepto los{" "}
                        <a
                          href="#"
                          className="text-primary underline"
                          data-oid="6hol-o5"
                        >
                          Términos y Condiciones
                        </a>{" "}
                        y la{" "}
                        <a
                          href="#"
                          className="text-primary underline"
                          data-oid="ay6tlhj"
                        >
                          Política de Privacidad
                        </a>{" "}
                        <span className="text-black" data-oid="kvred6r">
                          *
                        </span>
                      </label>
                      {validationErrors.termsAccepted && (
                        <p
                          className="mt-1 text-xs text-gray-600"
                          data-oid="2hc96sf"
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
                    data-oid="x_uyawt"
                  >
                    {isLoading ? "Registrando..." : "Registrarse"}
                  </Button>
                </form>

                <div className="mt-6 text-center" data-oid="o21zdvm">
                  <p className="text-sm text-gray-600" data-oid="0uwzg.x">
                    ¿Ya tienes una cuenta?{" "}
                    <Link
                      to="/login-companies"
                      className="text-primary font-semibold hover:underline"
                      data-oid="z8uqo5i"
                    >
                      Inicia sesión
                    </Link>
                  </p>
                </div>

                <div
                  className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100"
                  data-oid="qnfxysz"
                >
                  <div className="flex items-start" data-oid=":26c3u5">
                    <Building
                      className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0"
                      data-oid="s33gdv1"
                    />

                    <div data-oid="m1xgocf">
                      <h3
                        className="text-sm font-medium text-gray-800"
                        data-oid="8ds.tu."
                      >
                        Beneficios para empresas
                      </h3>
                      <p
                        className="text-xs text-gray-600 mt-1"
                        data-oid="9zl4g_a"
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
      <Footer data-oid="uhnmf.e" />
    </>
  );
}
