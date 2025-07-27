import { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, ShieldCheck, AlertCircle } from "lucide-react";

interface CheckoutFormProps {
  sessionData: any;
  onPaymentSuccess: (paymentResult: any) => void;
}

export default function CheckoutForm({
  sessionData,
  onPaymentSuccess,
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saveCard, setSaveCard] = useState(false);
  const [ready, setReady] = useState(false);

  // Verificar que Stripe y Elements estén listos
  useEffect(() => {
    if (stripe && elements) {
      setReady(true);
    }
  }, [stripe, elements]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !ready) {
      console.error("Stripe no está completamente cargado");
      setError("Por favor, espera a que se carguen los elementos de pago");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("Iniciando confirmación de pago");

      // Confirmar el pago con Stripe
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/booking/${sessionData.sessionId || sessionData.session_id}/confirmation`,
        },
        redirect: "if_required",
      });

      if (result.error) {
        // Mostrar error
        console.error("Error al confirmar el pago:", result.error);
        setError(
          result.error.message || "Ha ocurrido un error al procesar el pago",
        );
      } else if (result.paymentIntent) {
        console.log("Pago confirmado exitosamente:", result.paymentIntent);
        // Llamar a la función callback con el resultado del pago
        onPaymentSuccess(result);
      }
    } catch (err) {
      console.error("Error inesperado durante confirmación:", err);
      setError("Ha ocurrido un error inesperado al procesar el pago");
    } finally {
      setLoading(false);
    }
  };

  // Si aún no están listos los componentes de Stripe, mostrar un indicador de carga
  if (!ready) {
    return (
      <div
        className="flex justify-center items-center py-12"
        data-oid="7qtwrh_"
      >
        <Loader2
          className="h-8 w-8 animate-spin text-primary"
          data-oid="68vhtyj"
        />

        <span className="ml-2 text-gray-600" data-oid=".cmm4_1">
          Cargando opciones de pago...
        </span>
      </div>
    );
  }

  // Obtener el precio total del sessionData
  const totalPrice = sessionData?.payment?.amount || 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-6" data-oid="yuwxy0_">
      <h2 className="text-lg font-semibold mb-4" data-oid="clmib_e">
        Detalles del pago
      </h2>

      <div className="space-y-6" data-oid="bj7go4_">
        <PaymentElement
          options={{
            layout: {
              type: "tabs",
              defaultCollapsed: false,
            },
          }}
          data-oid="-hyxmp-"
        />

        <div className="flex items-center space-x-2" data-oid=".siwucx">
          <Checkbox
            id="saveCard"
            checked={saveCard}
            onCheckedChange={(checked) => setSaveCard(checked === true)}
            data-oid="xnl6lix"
          />

          <label
            htmlFor="saveCard"
            className="text-sm font-medium cursor-pointer"
            data-oid="99rguv9"
          >
            Guarda la tarjeta en tu lista
          </label>
        </div>

        {error && (
          <div
            className="bg-gray-100 p-4 rounded-md text-gray-700 text-sm"
            data-oid="hfzb59v"
          >
            {error}
          </div>
        )}

        <div className="space-y-4 mt-6" data-oid="_5npv7c">
          <div
            className="bg-gray-50 p-4 rounded-md flex items-start gap-3"
            data-oid="441ofju"
          >
            <ShieldCheck
              className="text-gray-700 h-5 w-5 mt-0.5 flex-shrink-0"
              data-oid="sn41hn2"
            />

            <p className="text-sm text-gray-600" data-oid="aw84-b-">
              Nuestros servidores están encriptados con TLS/SSL para garantizar
              la seguridad y la privacidad.
            </p>
          </div>

          <div
            className="bg-gray-50 p-4 rounded-md flex items-start gap-3"
            data-oid="1phkrpz"
          >
            <AlertCircle
              className="text-gray-700 h-5 w-5 mt-0.5 flex-shrink-0"
              data-oid="2mzjwwc"
            />

            <p className="text-sm text-gray-600" data-oid="mt2v_x:">
              El importe se retendrá de su método de pago seleccionado después
              de la reserva. Sólo le cobraremos una vez que el viaje haya
              finalizado.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 mt-6" data-oid="vsg5qtr">
          <div
            className="flex justify-between items-center mb-4"
            data-oid="gux5k6s"
          >
            <span className="text-sm font-medium" data-oid="bbkxr5g">
              Total
            </span>
            <span className="text-xl font-bold" data-oid="07jznti">
              {typeof totalPrice === "number" ? totalPrice.toFixed(2) : "0.00"}{" "}
              €
            </span>
          </div>

          <div className="flex justify-between" data-oid="nskodwx">
            <a
              href="#"
              className="text-sm font-medium underline"
              onClick={(e) => {
                e.preventDefault();
                window.alert("Términos y condiciones");
              }}
              data-oid="8sl1bwz"
            >
              Ver términos y condiciones
            </a>

            <button
              type="submit"
              className="w-48 py-3 px-4 rounded-md text-white font-semibold relative z-20"
              style={{
                background: "#000000",
              }}
              disabled={loading || !stripe || !ready}
              data-oid="9s8nk36"
            >
              {loading ? (
                <div
                  className="flex justify-center items-center"
                  data-oid="rpi29mm"
                >
                  <Loader2
                    className="mr-2 h-4 w-4 animate-spin"
                    data-oid="u8q6z:-"
                  />
                  Procesando...
                </div>
              ) : (
                "Proceder a la compra"
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
