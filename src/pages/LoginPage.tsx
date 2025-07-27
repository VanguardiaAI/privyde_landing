import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Mail, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login, error, isLoading, setUser, setToken, user } = useAuth();
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
    await login(email, password);
  };

  // Función para login con Google
  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      // Usar la URL completa del backend en lugar de URL relativa
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL?.replace(/\/api$/, "") || "http://localhost:5000"}/api/auth/google`,
        {
          credential: credentialResponse.credential,
          role: "user",
        },
      );

      if (res.data && res.data.access_token) {
        localStorage.setItem("authToken", res.data.access_token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        setToken(res.data.access_token);
      } else {
        throw new Error("Respuesta inválida del servidor");
      }

      // El efecto useEffect se encargará de redirigir según el estado del perfil
    } catch (err: any) {
      console.error("Error en login con Google:", err);
      alert(
        "Error al iniciar sesión con Google: " +
          (err.response?.data?.error || err.message || "Error desconocido"),
      );
    }
  };

  return (
    <div className="flex flex-col min-h-screen" data-oid="rqkw-nv">
      <Navbar data-oid="_jc6ei6" />

      <main className="flex-1 bg-white pb-16" data-oid="e409n9o">
        <div
          className="w-full max-w-md mx-auto py-12 md:py-16 px-4"
          data-oid="0krvtkd"
        >
          <h1
            className="text-3xl font-bold text-center mb-8"
            data-oid="7ka-h1:"
          >
            Iniciar sesión
          </h1>

          <Card
            className="w-full shadow-lg bg-white rounded-xl overflow-hidden border-0 relative z-20"
            data-oid="j74_ors"
          >
            <CardContent className="p-6" data-oid="dcazkuk">
              {error && (
                <div
                  className="bg-gray-100 p-3 rounded border border-gray-200 text-gray-600 text-sm mb-4"
                  data-oid="_gvknpr"
                >
                  {error}
                </div>
              )}

              <form
                className="space-y-4"
                onSubmit={handleSubmit}
                data-oid="726p6l5"
              >
                <div className="relative" data-oid="2-e84hy">
                  <Mail
                    className="absolute left-3 top-4 h-5 w-5 text-gray-400"
                    data-oid="t7uv.u4"
                  />

                  <div
                    className="flex flex-col pl-10 pt-1 border rounded-md h-[52px] focus-within:border-black hover:border-gray-400 bg-gray-50"
                    data-oid="qb7bw3c"
                  >
                    <Label
                      className="mb-0 text-left text-xs"
                      data-oid="0d:v34a"
                    >
                      Email
                    </Label>
                    <Input
                      className="border-0 p-0 h-6 focus:ring-0 placeholder:text-gray-400 bg-gray-50"
                      placeholder="tu@email.com"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      data-oid="s:qwfsv"
                    />
                  </div>
                </div>

                <div className="relative" data-oid="b4ylju8">
                  <Lock
                    className="absolute left-3 top-4 h-5 w-5 text-gray-400"
                    data-oid="ozj5.s1"
                  />

                  <div
                    className="flex flex-col pl-10 pt-1 border rounded-md h-[52px] focus-within:border-black hover:border-gray-400 bg-gray-50"
                    data-oid="9iexyd7"
                  >
                    <Label
                      className="mb-0 text-left text-xs"
                      data-oid="-exi6uq"
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
                      data-oid="egwf_gz"
                    />
                  </div>
                </div>

                <div
                  className="flex justify-between items-center"
                  data-oid="n73.p6e"
                >
                  <div
                    className="flex items-center space-x-2"
                    data-oid="jrn:7a8"
                  >
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) =>
                        setRememberMe(checked === true)
                      }
                      data-oid="y4a7ikp"
                    />

                    <label
                      htmlFor="remember"
                      className="text-sm text-gray-500 font-medium"
                      data-oid="48tp2rl"
                    >
                      Recordarme
                    </label>
                  </div>
                  <a
                    href="#"
                    className="text-sm text-primary underline"
                    data-oid="5.9xqxx"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-primary hover:bg-primary/90 select-button text-base"
                  disabled={isLoading}
                  data-oid="z8exz8l"
                >
                  {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
                </Button>
              </form>

              <div
                className="flex items-center gap-3 py-4 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border"
                data-oid="vgrht5v"
              >
                <span
                  className="text-xs text-muted-foreground"
                  data-oid="0_t3mu_"
                >
                  O
                </span>
              </div>

              <div className="flex justify-center" data-oid="kexyjp.">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => alert("Error al iniciar sesión con Google")}
                  data-oid="csl9wk:"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer data-oid="m5h484_" />
    </div>
  );
}
