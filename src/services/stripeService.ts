import axiosInstance from '@/config/axios';
import { loadStripe } from '@stripe/stripe-js';
const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

// Inicializar Stripe
let stripePromise: Promise<any> | null = null;
if (STRIPE_PUBLIC_KEY) {
  stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
}

export interface PaymentIntentData {
  amount: number;
  currency: string;
  description?: string;
  metadata?: {
    booking_code?: string;
    client_name?: string;
    client_email?: string;
    service_type?: string;
  };
}

class StripeService {
  /**
   * Crea un Payment Intent en el backend
   */
  async createPaymentIntent(data: PaymentIntentData): Promise<{
    clientSecret: string;
    paymentIntentId: string;
  }> {
    try {
      const response = await axiosInstance.post(`/api/payments/create-intent`, data);
      return {
        clientSecret: response.data.client_secret,
        paymentIntentId: response.data.payment_intent_id
      };
    } catch (error) {
      console.error('Error al crear Payment Intent:', error);
      throw error;
    }
  }

  /**
   * Confirma un pago con los detalles de la tarjeta
   */
  async confirmCardPayment(
    clientSecret: string,
    paymentElement: any
  ): Promise<{
    success: boolean;
    paymentIntentId?: string;
    error?: string;
  }> {
    try {
      if (!stripePromise) {
        throw new Error('Stripe no está configurado');
      }

      const stripe = await stripePromise;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentElement
      });

      if (result.error) {
        return {
          success: false,
          error: result.error.message
        };
      }

      return {
        success: true,
        paymentIntentId: result.paymentIntent.id
      };
    } catch (error) {
      console.error('Error al confirmar pago:', error);
      return {
        success: false,
        error: 'Error al procesar el pago'
      };
    }
  }

  /**
   * Verifica el estado de un Payment Intent
   */
  async getPaymentStatus(paymentIntentId: string): Promise<{
    status: string;
    amount: number;
    currency: string;
  }> {
    try {
      const response = await axiosInstance.get(`/api/payments/status/${paymentIntentId}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener estado del pago:', error);
      throw error;
    }
  }

  /**
   * Crea un reembolso para un pago
   */
  async createRefund(paymentIntentId: string, amount?: number): Promise<{
    success: boolean;
    refundId?: string;
    error?: string;
  }> {
    try {
      const response = await axiosInstance.post(`/api/payments/refund`, {
        payment_intent_id: paymentIntentId,
        amount: amount // Si no se especifica, reembolso total
      });

      return {
        success: true,
        refundId: response.data.refund_id
      };
    } catch (error: any) {
      console.error('Error al crear reembolso:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Error al procesar reembolso'
      };
    }
  }

  /**
   * Obtiene la instancia de Stripe
   */
  async getStripe() {
    if (!stripePromise) {
      throw new Error('Stripe no está configurado. Verifique VITE_STRIPE_PUBLISHABLE_KEY');
    }
    return stripePromise;
  }

  /**
   * Verifica si Stripe está configurado
   */
  isConfigured(): boolean {
    return !!STRIPE_PUBLIC_KEY;
  }
}

// Exportar una instancia única del servicio
export const stripeService = new StripeService();