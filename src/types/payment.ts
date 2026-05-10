import type { PaymentMethod, PaymentStatus } from "@/types/order";

export type PaymentProvider = "stripe" | "paypal" | "bank_transfer" | "cod";

export type PaymentCurrency = "USD" | "THB";

export type Payment = {
  id: number;
  orderId: number;
  provider: PaymentProvider;
  method: PaymentMethod;
  status: PaymentStatus;
  amount: number;
  currency: PaymentCurrency;
  transactionId?: string | null;
  reference?: string | null;
  paidAt?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type PaymentIntent = {
  id: string;
  orderId: number;
  provider: PaymentProvider;
  method: PaymentMethod;
  amount: number;
  currency: PaymentCurrency;
  status: "requires_payment_method" | "requires_confirmation" | "processing" | "succeeded" | "canceled";
  clientSecret?: string | null;
};

export type PaymentMethodOption = {
  value: PaymentMethod;
  label: string;
  description?: string;
  provider: PaymentProvider;
};

export type PaymentFormValues = {
  method: PaymentMethod;
  provider: PaymentProvider;
  currency: PaymentCurrency;
  saveCard?: boolean;
};

export type PaymentSummary = {
  orderId: number;
  orderNumber: string;
  method: PaymentMethod;
  provider: PaymentProvider;
  status: PaymentStatus;
  amount: number;
  currency: PaymentCurrency;
};

