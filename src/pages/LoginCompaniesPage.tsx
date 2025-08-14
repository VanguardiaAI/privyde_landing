import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "@/config/axios";
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
      const response = await axiosInstance.post(
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
      <Navbar data-oid="41hjsb7" />
      <div className="w-full bg-gray-50 py-12 md:py-20 px-4" data-oid="mp34d.w">
        <div className="max-w-7xl mx-auto" data-oid="fhyl_88">
          <div className="max-w-md mx-auto mb-16" data-oid="ikl9503">
            <h1
              className="text-3xl font-bold text-center mb-8"
              data-oid="ys0n0ba"
            >
              Iniciar sesión para Empresas
            </h1>

            <Card
              className="w-full shadow-lg bg-white rounded-xl overflow-hidden border-0 relative z-20"
              data-oid="l0j.wcq"
            >
              <CardContent className="p-6" data-oid="so-qkdo">
                {error && (
                  <div
                    className="bg-gray-100 p-3 rounded border border-gray-200 text-gray-600 text-sm mb-4"
                    data-oid="aeyq4rr"
                  >
                    {error}
                  </div>
                )}

                <form
                  className="space-y-4"
                  onSubmit={handleSubmit}
                  data-oid="y_-1ky:"
                >
                  <div className="relative" data-oid="-.8_.13">
                    <Mail
                      className="absolute left-3 top-4 h-5 w-5 text-gray-400"
                      data-oid="woz80u5"
                    />

                    <div
                      className="flex flex-col pl-10 pt-1 border rounded-md h-[52px] focus-within:border-black hover:border-gray-400 bg-gray-50"
                      data-oid="b25tbyq"
                    >
                      <Label
                        className="mb-0 text-left text-xs"
                        data-oid="ol:d4vq"
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
                        data-oid="ls_vimn"
                      />
                    </div>
                  </div>

                  <div className="relative" data-oid="u92s_pq">
                    <Lock
                      className="absolute left-3 top-4 h-5 w-5 text-gray-400"
                      data-oid="ocxvem1"
                    />

                    <div
                      className="flex flex-col pl-10 pt-1 border rounded-md h-[52px] focus-within:border-black hover:border-gray-400 bg-gray-50"
                      data-oid="0h2snh7"
                    >
                      <Label
                        className="mb-0 text-left text-xs"
                        data-oid="y88y.bb"
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
                        data-oid="ltr3k6d"
                      />
                    </div>
                  </div>

                  <div
                    className="flex justify-between items-center"
                    data-oid="9oix454"
                  >
                    <div
                      className="flex items-center space-x-2"
                      data-oid=":8rtw6_"
                    >
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) =>
                          setRememberMe(checked === true)
                        }
                        data-oid="n:20.2d"
                      />

                      <label
                        htmlFor="remember"
                        className="text-sm text-gray-500 font-medium"
                        data-oid="zwi7mf_"
                      >
                        Recordarme
                      </label>
                    </div>
                    <a
                      href="#"
                      className="text-sm text-primary underline"
                      data-oid="jrfxioq"
                    >
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-primary hover:bg-primary/90 select-button text-base"
                    disabled={isLoading}
                    data-oid="r1it5ju"
                  >
                    {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
                  </Button>
                </form>

                <div className="mt-4 text-center" data-oid="u6i3bg.">
                  <p className="text-sm text-gray-600" data-oid="._xk:jx">
                    ¿No tienes una cuenta?{" "}
                    <Link
                      to="/register-companies"
                      className="text-primary font-semibold hover:underline"
                      data-oid="2of.see"
                    >
                      Registra tu empresa
                    </Link>
                  </p>
                </div>

                <div
                  className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100"
                  data-oid="65jrwii"
                >
                  <div className="flex items-start" data-oid="fvwo9dz">
                    <Building
                      className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0"
                      data-oid="8ae3t7y"
                    />

                    <div data-oid="mgpg46y">
                      <h3
                        className="text-sm font-medium text-gray-800"
                        data-oid="s0e1j_m"
                      >
                        Beneficios para empresas
                      </h3>
                      <p
                        className="text-xs text-gray-600 mt-1"
                        data-oid="2_14rcx"
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
      <Footer data-oid="siez-:0" />
    </>
  );
}
