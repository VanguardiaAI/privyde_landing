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
import axiosInstance from "@/config/axios";
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
      const res = await axiosInstance.post("/api/auth/google", {
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
    <Dialog open={open} onOpenChange={handleOpenChange} data-oid="k-2kxi5">
      <DialogTrigger asChild data-oid="ytgywxv">
        <Button variant="outline" data-oid="6pl02:-">
          Iniciar sesión
        </Button>
      </DialogTrigger>
      <DialogContent
        className="bg-white border-border shadow-lg"
        data-oid="7cekpwi"
      >
        <div
          className="flex flex-col items-center gap-4 pb-2"
          data-oid="d.s983u"
        >
          <div
            className="flex size-12 shrink-0 items-center justify-center rounded-full border border-border bg-background"
            aria-hidden="true"
            data-oid="l1yxenl"
          >
            <svg
              className="stroke-primary"
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 32 32"
              aria-hidden="true"
              data-oid="pd8bwjl"
            >
              <circle
                cx="16"
                cy="16"
                r="12"
                fill="none"
                strokeWidth="8"
                data-oid="cqozu:8"
              />
            </svg>
          </div>
          <DialogHeader className="space-y-2" data-oid="3pa9q8g">
            <DialogTitle
              className="text-center text-xl font-bold"
              data-oid=":er7aoz"
            >
              Bienvenido de nuevo
            </DialogTitle>
            <DialogDescription className="text-center" data-oid="c:2z5l.">
              Introduce tus credenciales para acceder a tu cuenta.
            </DialogDescription>
          </DialogHeader>
        </div>

        {error && (
          <div
            className="bg-gray-100 p-2 rounded border border-gray-200 text-gray-600 text-sm mb-4"
            data-oid="uvd87f1"
          >
            {error}
          </div>
        )}

        <form
          className="space-y-5 py-2"
          onSubmit={handleSubmit}
          data-oid=".b89wzv"
        >
          <div className="space-y-4" data-oid="eeh4.sv">
            <div className="space-y-2" data-oid="7et.0kh">
              <Label
                htmlFor={`${id}-email`}
                className="text-foreground"
                data-oid="xyzo6o2"
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
                data-oid="354c3zx"
              />
            </div>
            <div className="space-y-2" data-oid="6evfs53">
              <Label
                htmlFor={`${id}-password`}
                className="text-foreground"
                data-oid="naaso-g"
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
                data-oid="h-71obk"
              />
            </div>
          </div>
          <div className="flex justify-between gap-2" data-oid="kbwg5ie">
            <div className="flex items-center gap-2" data-oid="s.39qqy">
              <Checkbox
                id={`${id}-remember`}
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
                data-oid="h-zjq1a"
              />

              <Label
                htmlFor={`${id}-remember`}
                className="font-normal text-muted-foreground"
                data-oid="l:m9zgz"
              >
                Recuérdame
              </Label>
            </div>
            <a
              className="text-sm text-primary underline hover:no-underline"
              href="#"
              data-oid="3f15xiu"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isLoading}
            data-oid="8dvs0uu"
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>
        </form>

        <div
          className="flex items-center gap-3 py-2 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border"
          data-oid="e.upp79"
        >
          <span className="text-xs text-muted-foreground" data-oid="zvtfj8l">
            O
          </span>
        </div>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => alert("Error al iniciar sesión con Google")}
          data-oid="3sv29pa"
        />
      </DialogContent>
    </Dialog>
  );
}

export { Login };
