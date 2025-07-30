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
    <Dialog data-oid="mkotz8a">
      <DialogTrigger asChild data-oid="elcwq7_">
        <Button variant="outline" data-oid=":g6xgcw">
          Sign in
        </Button>
      </DialogTrigger>
      <DialogContent data-oid="llv71si">
        <div className="flex flex-col items-center gap-2" data-oid="9wutx7v">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
            aria-hidden="true"
            data-oid="mi1aw8d"
          >
            <svg
              className="stroke-zinc-800 dark:stroke-zinc-100"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 32 32"
              aria-hidden="true"
              data-oid="3q210uc"
            >
              <circle
                cx="16"
                cy="16"
                r="12"
                fill="none"
                strokeWidth="8"
                data-oid="..gmej_"
              />
            </svg>
          </div>
          <DialogHeader data-oid="kmcps3k">
            <DialogTitle className="sm:text-center" data-oid="5cd5d.n">
              Welcome back
            </DialogTitle>
            <DialogDescription className="sm:text-center" data-oid="2yk2jsf">
              Enter your credentials to login to your account.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5" data-oid="mtr.b.e">
          <div className="space-y-4" data-oid="3vl2wq-">
            <div className="space-y-2" data-oid="av0xiia">
              <Label htmlFor={`${id}-email`} data-oid="x-eepom">
                Email
              </Label>
              <Input
                id={`${id}-email`}
                placeholder="hi@yourcompany.com"
                type="email"
                required
                data-oid="iiak7n-"
              />
            </div>
            <div className="space-y-2" data-oid="y76kopa">
              <Label htmlFor={`${id}-password`} data-oid="50blieo">
                Password
              </Label>
              <Input
                id={`${id}-password`}
                placeholder="Enter your password"
                type="password"
                required
                data-oid="55xmec9"
              />
            </div>
          </div>
          <div className="flex justify-between gap-2" data-oid="ffq.3:1">
            <div className="flex items-center gap-2" data-oid="22ggvwc">
              <Checkbox id={`${id}-remember`} data-oid="d9.pl0d" />
              <Label
                htmlFor={`${id}-remember`}
                className="font-normal text-muted-foreground"
                data-oid="vzt4a2l"
              >
                Remember me
              </Label>
            </div>
            <a
              className="text-sm underline hover:no-underline"
              href="#"
              data-oid="pkb5p6o"
            >
              Forgot password?
            </a>
          </div>
          <Button type="button" className="w-full" data-oid="74b6z8b">
            Sign in
          </Button>
        </form>

        <div
          className="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border"
          data-oid="2a862n6"
        >
          <span className="text-xs text-muted-foreground" data-oid="g81f.b_">
            Or
          </span>
        </div>

        <Button variant="outline" data-oid="5lx6m3s">
          Login with Google
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export { Component };
