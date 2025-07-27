import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useId } from "react";

function Component() {
  const id = useId();
  return (
    <Dialog data-oid="6zzzq5u">
      <DialogTrigger asChild data-oid=":.i4im7">
        <Button variant="outline" data-oid="8z0hja6">
          Sign in
        </Button>
      </DialogTrigger>
      <DialogContent data-oid="1xq.7x7">
        <div className="flex flex-col items-center gap-2" data-oid="puwofu9">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
            aria-hidden="true"
            data-oid="eme1muo"
          >
            <svg
              className="stroke-zinc-800 dark:stroke-zinc-100"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 32 32"
              aria-hidden="true"
              data-oid=":tu_m0m"
            >
              <circle
                cx="16"
                cy="16"
                r="12"
                fill="none"
                strokeWidth="8"
                data-oid="r_kd-pd"
              />
            </svg>
          </div>
          <DialogHeader data-oid="nqy2g:9">
            <DialogTitle className="sm:text-center" data-oid="3jfxlng">
              Welcome back
            </DialogTitle>
            <DialogDescription className="sm:text-center" data-oid="mcia6d:">
              Enter your credentials to login to your account.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5" data-oid="e5qx73t">
          <div className="space-y-4" data-oid="-jvfdm6">
            <div className="space-y-2" data-oid="kuka0lj">
              <Label htmlFor={`${id}-email`} data-oid="kllmjfo">
                Email
              </Label>
              <Input
                id={`${id}-email`}
                placeholder="hi@yourcompany.com"
                type="email"
                required
                data-oid="gnaf:xb"
              />
            </div>
            <div className="space-y-2" data-oid="97-y-0e">
              <Label htmlFor={`${id}-password`} data-oid="44ipd-_">
                Password
              </Label>
              <Input
                id={`${id}-password`}
                placeholder="Enter your password"
                type="password"
                required
                data-oid="_r83-x-"
              />
            </div>
          </div>
          <div className="flex justify-between gap-2" data-oid="4wetqat">
            <div className="flex items-center gap-2" data-oid="fwcbity">
              <Checkbox id={`${id}-remember`} data-oid="hwx2_8u" />
              <Label
                htmlFor={`${id}-remember`}
                className="font-normal text-muted-foreground"
                data-oid="o8z3a6_"
              >
                Remember me
              </Label>
            </div>
            <a
              className="text-sm underline hover:no-underline"
              href="#"
              data-oid="7uazkbm"
            >
              Forgot password?
            </a>
          </div>
          <Button type="button" className="w-full" data-oid="_d2jo94">
            Sign in
          </Button>
        </form>

        <div
          className="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border"
          data-oid="l7nxdaq"
        >
          <span className="text-xs text-muted-foreground" data-oid="_-2r.t.">
            Or
          </span>
        </div>

        <Button variant="outline" data-oid="9r7n:ik">
          Login with Google
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export { Component };
