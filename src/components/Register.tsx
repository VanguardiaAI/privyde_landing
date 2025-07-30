import { Button } from "../components/ui/button";
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

function Register() {
  const id = useId();
  const { register, error, isLoading, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(email, password, name, "user");
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
      setName("");
      clearError();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange} data-oid="gs3iiqg">
      <DialogTrigger asChild data-oid="vpbz3n1">
        <Button data-oid="kli6e8g">Crear cuenta</Button>
      </DialogTrigger>
      <DialogContent
        className="bg-white border-border shadow-lg"
        data-oid="ueutk:6"
      >
        <div
          className="flex flex-col items-center gap-4 pb-2"
          data-oid="sssj9z4"
        >
          <div
            className="flex size-12 shrink-0 items-center justify-center rounded-full border border-border bg-background"
            aria-hidden="true"
            data-oid="jlq_k6."
          >
            <svg
              className="stroke-primary"
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 32 32"
              aria-hidden="true"
              data-oid="uur3w-h"
            >
              <path
                d="M16 4C12.1 4 9 7.1 9 11C9 13.5 10.2 15.6 12 16.9V17C12 17.6 11.6 18 11 18H8C6.4 18 5 19.4 5 21V25C5 25.6 5.4 26 6 26H26C26.6 26 27 25.6 27 25V21C27 19.4 25.6 18 24 18H21C20.4 18 20 17.6 20 17V16.9C21.8 15.6 23 13.5 23 11C23 7.1 19.9 4 16 4Z"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                data-oid="9hkjpvx"
              />
            </svg>
          </div>
          <DialogHeader className="space-y-2" data-oid="qx5vr0o">
            <DialogTitle
              className="text-center text-xl font-bold"
              data-oid="pu98vrs"
            >
              Crear una cuenta
            </DialogTitle>
            <DialogDescription className="text-center" data-oid="h-mmwqf">
              Completa el formulario para registrarte.
            </DialogDescription>
          </DialogHeader>
        </div>

        {error && (
          <div
            className="bg-gray-100 p-2 rounded border border-gray-200 text-gray-600 text-sm mb-4"
            data-oid="hfn-:fx"
          >
            {error}
          </div>
        )}

        <form
          className="space-y-5 py-2"
          onSubmit={handleSubmit}
          data-oid="53hgydr"
        >
          <div className="space-y-4" data-oid="vu.rf-w">
            <div className="space-y-2" data-oid="es66nz-">
              <Label
                htmlFor={`${id}-name`}
                className="text-foreground"
                data-oid="wplktkj"
              >
                Nombre
              </Label>
              <Input
                id={`${id}-name`}
                placeholder="Tu nombre"
                type="text"
                className="border-input bg-background"
                value={name}
                onChange={(e) => setName(e.target.value)}
                data-oid="007j179"
              />
            </div>
            <div className="space-y-2" data-oid="4np_dmb">
              <Label
                htmlFor={`${id}-email`}
                className="text-foreground"
                data-oid="2ngv0hi"
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
                data-oid=".k5w7-h"
              />
            </div>
            <div className="space-y-2" data-oid="twebgaf">
              <Label
                htmlFor={`${id}-password`}
                className="text-foreground"
                data-oid="n-c:112"
              >
                Contraseña
              </Label>
              <Input
                id={`${id}-password`}
                placeholder="Crea una contraseña"
                type="password"
                required
                className="border-input bg-background"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-oid="35gaogs"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isLoading}
            data-oid="86vrd3."
          >
            {isLoading ? "Registrando..." : "Crear cuenta"}
          </Button>
        </form>

        <div
          className="text-center text-sm text-muted-foreground"
          data-oid="1-82ci_"
        >
          Al registrarte, aceptas nuestros{" "}
          <a href="#" className="underline text-primary" data-oid="ntd9sav">
            términos de servicio
          </a>{" "}
          y{" "}
          <a href="#" className="underline text-primary" data-oid="0._.q:n">
            política de privacidad
          </a>
          .
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { Register };
