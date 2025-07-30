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
    <ToastProvider data-oid="4gjcu04">
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} data-oid=".m7zm6x">
            <div className="grid gap-1" data-oid="vnokdg_">
              {title && <ToastTitle data-oid="uxb9.d1">{title}</ToastTitle>}
              {description && (
                <ToastDescription data-oid="-yyn9f-">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose data-oid="jplxn9q" />
          </Toast>
        );
      })}
      <ToastViewport data-oid="26a7cpf" />
    </ToastProvider>
  );
}
