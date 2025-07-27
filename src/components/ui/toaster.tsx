import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider data-oid="2chndbi">
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} data-oid="t1.k.dv">
            <div className="grid gap-1" data-oid="-_yv9aw">
              {title && <ToastTitle data-oid="8b1dnf2">{title}</ToastTitle>}
              {description && (
                <ToastDescription data-oid="h-5_kb7">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose data-oid="avibt45" />
          </Toast>
        );
      })}
      <ToastViewport data-oid="gob:hol" />
    </ToastProvider>
  );
}
