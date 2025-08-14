import { useState, useEffect } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { useAuth } from "../context/AuthContext";
import { ChevronDown, ChevronLeft } from "lucide-react";
import axiosInstance from "@/config/axios";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export default function CompleteProfilePage() {
  const { user, isLoading: authLoading, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Estados para los campos del formulario
  const [title, setTitle] = useState("Mr.");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    // Si el usuario ya completó su perfil, redirigir a inicio
    if (user && user.profile_completed) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("authToken");
      const response = await axiosInstance.post(
        "/api/profile/complete",
        {
          title,
          first_name: firstName,
          last_name: lastName,
          country_code: countryCode,
          phone: phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      // Actualizar datos del usuario en el contexto
      if (response.data.user) {
        setUser(response.data.user);
      }

      // Redirigir a la página principal
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.error || "Error al actualizar el perfil");
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div
        className="flex items-center justify-center h-screen"
        data-oid="krvhtl6"
      >
        <div
          className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"
          data-oid="jf0zs4j"
        ></div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen" data-oid="st_mkj8">
      <header className="border-b border-gray-200 py-4 px-4" data-oid="530:dyr">
        <div
          className="max-w-7xl mx-auto flex justify-between items-center"
          data-oid="y6wlyae"
        >
          <a href="/" className="font-bold text-xl" data-oid="04maxx4">
            PRIVYDE
          </a>
          <div className="flex items-center gap-4" data-oid="ujrq4t5">
            <a
              href="/help"
              className="text-sm text-gray-600"
              data-oid="9jzvmme"
            >
              Ayuda
            </a>
            <a
              href="#"
              className="text-sm flex items-center gap-1"
              data-oid="0okfe7q"
            >
              Español
              <ChevronDown size={16} data-oid="uv810tp" />
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto pt-8 pb-16 px-4" data-oid="yi.e8bx">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 mb-6 hover:text-black"
          data-oid="xe01h1k"
        >
          <ChevronLeft size={20} data-oid="u86z37h" />
          <span data-oid="t.x95zl">Volver</span>
        </button>

        <h1 className="text-2xl font-bold mb-2" data-oid="fffnadn">
          Añada sus datos personales
        </h1>
        <p className="text-gray-600 mb-8" data-oid="ar4gcmp">
          Complete su perfil para mantener su cuenta actualizada y segura.
        </p>

        {error && (
          <div
            className="bg-gray-100 p-3 rounded border border-gray-200 text-gray-600 text-sm mb-8"
            data-oid="jj::0e-"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} data-oid="h7pdt0t">
          <div className="space-y-6" data-oid="buzs6e_">
            <div data-oid="q0:4:xa">
              <Label
                className="block text-sm font-medium text-gray-700 mb-1"
                data-oid="6n3-21d"
              >
                Título
              </Label>
              <Select value={title} onValueChange={setTitle} data-oid="b-jm67g">
                <SelectTrigger
                  className="bg-gray-50 border-gray-300 h-12"
                  data-oid="8ox:nzc"
                >
                  <SelectValue
                    placeholder="Seleccione un título"
                    data-oid="ou:xd96"
                  />
                </SelectTrigger>
                <SelectContent data-oid="79a9fdw">
                  <SelectItem value="Mr." data-oid="2h78pyj">
                    Sr.
                  </SelectItem>
                  <SelectItem value="Mrs." data-oid="fi62cx6">
                    Sra.
                  </SelectItem>
                  <SelectItem value="Ms." data-oid="amc:33a">
                    Srta.
                  </SelectItem>
                  <SelectItem value="Dr." data-oid="d9pmap2">
                    Dr.
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div data-oid="-jyxojb">
              <Label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
                data-oid="_jf4xpx"
              >
                Nombre
              </Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="bg-gray-50 border-gray-300 h-12"
                placeholder="Ingrese su nombre"
                data-oid="onfkf89"
              />
            </div>

            <div data-oid="up87vzu">
              <Label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
                data-oid="bjt0iin"
              >
                Apellido
              </Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="bg-gray-50 border-gray-300 h-12"
                placeholder="Ingrese su apellido"
                data-oid="a3y6naf"
              />
            </div>

            <div data-oid="ojbbo39">
              <Label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
                data-oid="98er__x"
              >
                Número de móvil
              </Label>
              <div className="flex" data-oid="cctkv-:">
                <Select
                  value={countryCode}
                  onValueChange={setCountryCode}
                  data-oid="_l4hl4s"
                >
                  <SelectTrigger
                    className="w-24 bg-gray-50 border-gray-300 h-12 rounded-r-none"
                    data-oid="ntr5de1"
                  >
                    <SelectValue placeholder="+1" data-oid="g2mz:4c" />
                  </SelectTrigger>
                  <SelectContent data-oid="t6-z4s-">
                    <SelectItem value="+1" data-oid="cm52yrk">
                      +1
                    </SelectItem>
                    <SelectItem value="+34" data-oid="kct50tr">
                      +34
                    </SelectItem>
                    <SelectItem value="+44" data-oid="3r3k55c">
                      +44
                    </SelectItem>
                    <SelectItem value="+52" data-oid="zde0nrd">
                      +52
                    </SelectItem>
                    <SelectItem value="+33" data-oid="i:rk7_m">
                      +33
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="flex-1 bg-gray-50 border-gray-300 h-12 rounded-l-none"
                  placeholder="Ingrese su número de teléfono"
                  type="tel"
                  data-oid="1ei-d:s"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500" data-oid="l3b.p91">
                Añade tu número de teléfono móvil para recibir notificaciones de
                los trayectos.
              </p>
            </div>

            <div className="text-sm text-gray-500 mt-8" data-oid="rgh96r_">
              Al añadir sus datos personales, acepta nuestra{" "}
              <a
                href="#"
                className="text-gray-600 hover:underline"
                data-oid=".ei4apv"
              >
                Política de privacidad
              </a>{" "}
              y nuestras{" "}
              <a
                href="#"
                className="text-gray-600 hover:underline"
                data-oid="kcrf1pv"
              >
                Condiciones de uso
              </a>
              .
            </div>

            <div className="pt-4" data-oid="niqp:n0">
              <Button
                type="submit"
                className="w-full bg-black hover:bg-gray-800 text-white py-3 px-4 rounded-md transition-colors h-12"
                disabled={isLoading}
                data-oid="k_8rdo_"
              >
                {isLoading ? "Guardando..." : "Guardar y continuar"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
