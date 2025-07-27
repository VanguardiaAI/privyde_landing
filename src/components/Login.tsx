import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useId, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const id = useId();
  const { login, error, isLoading, clearError, setUser, setToken } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    if (!error) {
      setOpen(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      // Limpiar el formulario al cerrar
      setEmail("");
      setPassword("");
      clearError();
    }
  };

  // Nueva función para login con Google
  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      const res = await axios.post("/api/auth/google", {
        credential: credentialResponse.credential,
      });
      setUser(res.data.user);
      setToken(res.data.access_token);
      setOpen(false);
    } catch (err: any) {
      // Puedes mejorar el manejo de errores según tu contexto
      alert(err.response?.data?.error || "Error al iniciar sesión con Google");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange} data-oid=":9i-s69">
      <DialogTrigger asChild data-oid=":9t7:m0">
        <Button variant="outline" data-oid=".y54zru">
          Iniciar sesión
        </Button>
      </DialogTrigger>
      <DialogContent
        className="bg-white border-border shadow-lg"
        data-oid="j-s_4y3"
      >
        <div
          className="flex flex-col items-center gap-4 pb-2"
          data-oid="su-09:v"
        >
          <div
            className="flex size-12 shrink-0 items-center justify-center rounded-full border border-border bg-background"
            aria-hidden="true"
            data-oid="0klbyyf"
          >
            <svg
              className="stroke-primary"
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 32 32"
              aria-hidden="true"
              data-oid="4cs-j:_"
            >
              <circle
                cx="16"
                cy="16"
                r="12"
                fill="none"
                strokeWidth="8"
                data-oid="rqomhum"
              />
            </svg>
          </div>
          <DialogHeader className="space-y-2" data-oid="1i-7k.l">
            <DialogTitle
              className="text-center text-xl font-bold"
              data-oid="h065ajc"
            >
              Bienvenido de nuevo
            </DialogTitle>
            <DialogDescription className="text-center" data-oid="xgznnb4">
              Introduce tus credenciales para acceder a tu cuenta.
            </DialogDescription>
          </DialogHeader>
        </div>

        {error && (
          <div
            className="bg-gray-100 p-2 rounded border border-gray-200 text-gray-600 text-sm mb-4"
            data-oid="vo7e2y-"
          >
            {error}
          </div>
        )}

        <form
          className="space-y-5 py-2"
          onSubmit={handleSubmit}
          data-oid="p_c_uby"
        >
          <div className="space-y-4" data-oid="dw:.32:">
            <div className="space-y-2" data-oid="j11yyul">
              <Label
                htmlFor={`${id}-email`}
                className="text-foreground"
                data-oid="k7:vrja"
              >
                Email
              </Label>
              <Input
                id={`${id}-email`}
                placeholder="hi@tuempresa.com"
                type="email"
                required
                className="border-input bg-background"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-oid="sagxd6_"
              />
            </div>
            <div className="space-y-2" data-oid="3_956nt">
              <Label
                htmlFor={`${id}-password`}
                className="text-foreground"
                data-oid="4_9sgde"
              >
                Contraseña
              </Label>
              <Input
                id={`${id}-password`}
                placeholder="Introduce tu contraseña"
                type="password"
                required
                className="border-input bg-background"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-oid="s.asiu-"
              />
            </div>
          </div>
          <div className="flex justify-between gap-2" data-oid="4fc9u4k">
            <div className="flex items-center gap-2" data-oid="vzrb.vo">
              <Checkbox
                id={`${id}-remember`}
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
                data-oid="lrx2hx7"
              />

              <Label
                htmlFor={`${id}-remember`}
                className="font-normal text-muted-foreground"
                data-oid="fj0o9:w"
              >
                Recuérdame
              </Label>
            </div>
            <a
              className="text-sm text-primary underline hover:no-underline"
              href="#"
              data-oid="fx.7d.8"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isLoading}
            data-oid=".bv2_yu"
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>
        </form>

        <div
          className="flex items-center gap-3 py-2 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border"
          data-oid="71h50:1"
        >
          <span className="text-xs text-muted-foreground" data-oid="mjd1-81">
            O
          </span>
        </div>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => alert("Error al iniciar sesión con Google")}
          data-oid="rmi3u6v"
        />
      </DialogContent>
    </Dialog>
  );
}

export { Login };
