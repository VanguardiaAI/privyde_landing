import { useState, useEffect } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { useAuth } from "../context/AuthContext";
import { ChevronDown, ChevronLeft } from "lucide-react";
import axios from "axios";
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
      const response = await axios.post(
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
        data-oid="a01prnd"
      >
        <div
          className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"
          data-oid="86z9h_p"
        ></div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen" data-oid="vr63cnu">
      <header className="border-b border-gray-200 py-4 px-4" data-oid="zsqaxj_">
        <div
          className="max-w-7xl mx-auto flex justify-between items-center"
          data-oid="s0he0jp"
        >
          <a href="/" className="font-bold text-xl" data-oid="71iju3q">
            PRIVYDE
          </a>
          <div className="flex items-center gap-4" data-oid="rvrw.zz">
            <a
              href="/help"
              className="text-sm text-gray-600"
              data-oid="n.-658c"
            >
              Ayuda
            </a>
            <a
              href="#"
              className="text-sm flex items-center gap-1"
              data-oid="nr95utf"
            >
              Español
              <ChevronDown size={16} data-oid="_1vc0a." />
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto pt-8 pb-16 px-4" data-oid="ryo:9:p">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 mb-6 hover:text-black"
          data-oid="s1ckau9"
        >
          <ChevronLeft size={20} data-oid="c4ynrus" />
          <span data-oid="b4277az">Volver</span>
        </button>

        <h1 className="text-2xl font-bold mb-2" data-oid="us9vx:t">
          Añada sus datos personales
        </h1>
        <p className="text-gray-600 mb-8" data-oid="uw8jj38">
          Complete su perfil para mantener su cuenta actualizada y segura.
        </p>

        {error && (
          <div
            className="bg-gray-100 p-3 rounded border border-gray-200 text-gray-600 text-sm mb-8"
            data-oid="t4j70lx"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} data-oid="h-4xga2">
          <div className="space-y-6" data-oid="l1zkk2e">
            <div data-oid="2wtuq--">
              <Label
                className="block text-sm font-medium text-gray-700 mb-1"
                data-oid="-drftak"
              >
                Título
              </Label>
              <Select value={title} onValueChange={setTitle} data-oid="s2ebyxc">
                <SelectTrigger
                  className="bg-gray-50 border-gray-300 h-12"
                  data-oid="4o83c2r"
                >
                  <SelectValue
                    placeholder="Seleccione un título"
                    data-oid="30:38n7"
                  />
                </SelectTrigger>
                <SelectContent data-oid="_utg52d">
                  <SelectItem value="Mr." data-oid=":lg:77d">
                    Sr.
                  </SelectItem>
                  <SelectItem value="Mrs." data-oid="a1p_0m7">
                    Sra.
                  </SelectItem>
                  <SelectItem value="Ms." data-oid="m67k8g-">
                    Srta.
                  </SelectItem>
                  <SelectItem value="Dr." data-oid="wmlhh4u">
                    Dr.
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div data-oid="zkll0tr">
              <Label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
                data-oid="clrd3dj"
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
                data-oid="u0hrgbf"
              />
            </div>

            <div data-oid="brxfbzv">
              <Label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
                data-oid="-bxcg22"
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
                data-oid="ifwuqzv"
              />
            </div>

            <div data-oid="scnmg8:">
              <Label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
                data-oid="oxkhwuq"
              >
                Número de móvil
              </Label>
              <div className="flex" data-oid="55jjs4c">
                <Select
                  value={countryCode}
                  onValueChange={setCountryCode}
                  data-oid="e850dza"
                >
                  <SelectTrigger
                    className="w-24 bg-gray-50 border-gray-300 h-12 rounded-r-none"
                    data-oid=":fvm.1-"
                  >
                    <SelectValue placeholder="+1" data-oid="9_vn55k" />
                  </SelectTrigger>
                  <SelectContent data-oid="lh1uxdc">
                    <SelectItem value="+1" data-oid="5aqcing">
                      +1
                    </SelectItem>
                    <SelectItem value="+34" data-oid="x68uhxa">
                      +34
                    </SelectItem>
                    <SelectItem value="+44" data-oid="6n_jfsn">
                      +44
                    </SelectItem>
                    <SelectItem value="+52" data-oid="2-hf69i">
                      +52
                    </SelectItem>
                    <SelectItem value="+33" data-oid="zknrqv7">
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
                  data-oid="qj6mti2"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500" data-oid="rvx4hxz">
                Añade tu número de teléfono móvil para recibir notificaciones de
                los trayectos.
              </p>
            </div>

            <div className="text-sm text-gray-500 mt-8" data-oid="6ocx6_f">
              Al añadir sus datos personales, acepta nuestra{" "}
              <a
                href="#"
                className="text-gray-600 hover:underline"
                data-oid="zn2oag5"
              >
                Política de privacidad
              </a>{" "}
              y nuestras{" "}
              <a
                href="#"
                className="text-gray-600 hover:underline"
                data-oid="ef8.n_q"
              >
                Condiciones de uso
              </a>
              .
            </div>

            <div className="pt-4" data-oid="c976acb">
              <Button
                type="submit"
                className="w-full bg-black hover:bg-gray-800 text-white py-3 px-4 rounded-md transition-colors h-12"
                disabled={isLoading}
                data-oid="c721u09"
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
