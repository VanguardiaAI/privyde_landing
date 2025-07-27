import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Mail, Lock, Building } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate, Link } from "react-router-dom";

export default function LoginCompaniesPage() {
  const { error, isLoading, setUser, setToken, user, setError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Si ya hay un usuario autenticado, redirigir según su estado
    if (user) {
      if (!user.profile_completed) {
        navigate("/complete-profile");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // La funciónno acepta directamente el rol, así que usamos un enfoque similar al de Google
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL?.replace(/\/api$/, "") || "http://localhost:5000"}/api/auth/`,
        {
          email,
          password,
          role: "company", // Asignar rol de empresa
        },
      );

      if (response.data && response.data.access_token) {
        localStorage.setItem("authToken", response.data.access_token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user);
        setToken(response.data.access_token);
      } else {
        throw new Error("Respuesta inválida del servidor");
      }
    } catch (err: any) {
      console.error("Error al iniciar sesión:", err);
      setError(
        err.response?.data?.error ||
          err.message ||
          "Error desconocido al iniciar sesión",
      );
    }
  };

  return (
    <>
      <Navbar data-oid="o9e7_0j" />
      <div className="w-full bg-gray-50 py-12 md:py-20 px-4" data-oid="jb7reue">
        <div className="max-w-7xl mx-auto" data-oid="ld0b2rp">
          <div className="max-w-md mx-auto mb-16" data-oid="08i8tak">
            <h1
              className="text-3xl font-bold text-center mb-8"
              data-oid="pqq_ena"
            >
              Iniciar sesión para Empresas
            </h1>

            <Card
              className="w-full shadow-lg bg-white rounded-xl overflow-hidden border-0 relative z-20"
              data-oid=":373ju4"
            >
              <CardContent className="p-6" data-oid="t3df5ei">
                {error && (
                  <div
                    className="bg-gray-100 p-3 rounded border border-gray-200 text-gray-600 text-sm mb-4"
                    data-oid=".dpcs9:"
                  >
                    {error}
                  </div>
                )}

                <form
                  className="space-y-4"
                  onSubmit={handleSubmit}
                  data-oid="f_27:6v"
                >
                  <div className="relative" data-oid="ohe:eue">
                    <Mail
                      className="absolute left-3 top-4 h-5 w-5 text-gray-400"
                      data-oid="p3z.yq8"
                    />

                    <div
                      className="flex flex-col pl-10 pt-1 border rounded-md h-[52px] focus-within:border-black hover:border-gray-400 bg-gray-50"
                      data-oid="rci7zbp"
                    >
                      <Label
                        className="mb-0 text-left text-xs"
                        data-oid="snyxs7r"
                      >
                        Email Corporativo
                      </Label>
                      <Input
                        className="border-0 p-0 h-6 focus:ring-0 placeholder:text-gray-400 bg-gray-50"
                        placeholder="empresa@dominio.com"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        data-oid="i251vl6"
                      />
                    </div>
                  </div>

                  <div className="relative" data-oid="9rrqix8">
                    <Lock
                      className="absolute left-3 top-4 h-5 w-5 text-gray-400"
                      data-oid="6xvmvw7"
                    />

                    <div
                      className="flex flex-col pl-10 pt-1 border rounded-md h-[52px] focus-within:border-black hover:border-gray-400 bg-gray-50"
                      data-oid="x3e4jw2"
                    >
                      <Label
                        className="mb-0 text-left text-xs"
                        data-oid="_mu35.k"
                      >
                        Contraseña
                      </Label>
                      <Input
                        className="border-0 p-0 h-6 focus:ring-0 placeholder:text-gray-400 bg-gray-50"
                        placeholder="Contraseña"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        data-oid="dhn0ayj"
                      />
                    </div>
                  </div>

                  <div
                    className="flex justify-between items-center"
                    data-oid="-_y:7qi"
                  >
                    <div
                      className="flex items-center space-x-2"
                      data-oid="fzr0vcs"
                    >
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) =>
                          setRememberMe(checked === true)
                        }
                        data-oid="wsm3:p6"
                      />

                      <label
                        htmlFor="remember"
                        className="text-sm text-gray-500 font-medium"
                        data-oid="53vw44n"
                      >
                        Recordarme
                      </label>
                    </div>
                    <a
                      href="#"
                      className="text-sm text-primary underline"
                      data-oid="o3ab-7a"
                    >
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-primary hover:bg-primary/90 select-button text-base"
                    disabled={isLoading}
                    data-oid="_l38:wi"
                  >
                    {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
                  </Button>
                </form>

                <div className="mt-4 text-center" data-oid="l4jdgh:">
                  <p className="text-sm text-gray-600" data-oid="unt:czu">
                    ¿No tienes una cuenta?{" "}
                    <Link
                      to="/register-companies"
                      className="text-primary font-semibold hover:underline"
                      data-oid="yh1eojn"
                    >
                      Registra tu empresa
                    </Link>
                  </p>
                </div>

                <div
                  className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100"
                  data-oid="g-b5.q1"
                >
                  <div className="flex items-start" data-oid="6s:fuk-">
                    <Building
                      className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0"
                      data-oid="mxd_oy:"
                    />

                    <div data-oid="yt0f0k1">
                      <h3
                        className="text-sm font-medium text-gray-800"
                        data-oid="dsywo6:"
                      >
                        Beneficios para empresas
                      </h3>
                      <p
                        className="text-xs text-gray-600 mt-1"
                        data-oid="yqmz5w_"
                      >
                        Acceda a tarifas corporativas especiales, facturación
                        centralizada y panel de administración exclusivo para su
                        empresa.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer data-oid="-a2ly8g" />
    </>
  );
}
