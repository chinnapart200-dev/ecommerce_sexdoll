import type { PaymentFormValues, PaymentIntent, PaymentMethodOption, PaymentSummary, PaymentProvider } from "@/types/payment";
import type { OrderSummary, PaymentMethod, PaymentStatus } from "@/types/order";

const paymentMethodOptions: PaymentMethodOption[] = [
  {
    value: "cod",
    label: "Cash on delivery",
    description: "Pay when your order arrives.",
    provider: "cod",
  },
  {
    value: "bank_transfer",
    label: "Bank transfer",
    description: "Transfer to our account before shipping.",
    provider: "bank_transfer",
  },
  {
    value: "credit_card",
    label: "Credit card",
    description: "Secure card payment flow.",
    provider: "stripe",
  },
  {
    value: "paypal",
    label: "PayPal",
    description: "Pay using your PayPal account.",
    provider: "paypal",
  },
];

function createPaymentIntentId(orderId: number) {
  return `pi_${orderId}_${Date.now()}`;
}

function createClientSecret(orderId: number) {
  return `secret_${orderId}_${Math.random().toString(36).slice(2, 10)}`;
}

export function getPaymentMethodOptions() {
  return [...paymentMethodOptions];
}

export function getPaymentMethodOption(method: PaymentMethod) {
  return paymentMethodOptions.find((option) => option.value === method) ?? null;
}

export function getProviderForMethod(method: PaymentMethod): PaymentProvider {
  return getPaymentMethodOption(method)?.provider ?? "cod";
}

export function createPaymentFormValues(method: PaymentMethod): PaymentFormValues {
  const option = getPaymentMethodOption(method);

  return {
    method,
    provider: option?.provider ?? "cod",
    currency: "USD",
    saveCard: method === "credit_card",
  };
}

export function createPaymentIntent(orderId: number, summary: OrderSummary, method: PaymentMethod): PaymentIntent {
  const provider = getProviderForMethod(method);

  return {
    id: createPaymentIntentId(orderId),
    orderId,
    provider,
    method,
    amount: summary.total,
    currency: summary.currency === "THB" ? "THB" : "USD",
    status: method === "cod" ? "requires_confirmation" : "requires_payment_method",
    clientSecret: method === "credit_card" ? createClientSecret(orderId) : null,
  };
}

export function createPaymentSummary(orderId: number, orderNumber: string, summary: OrderSummary, method: PaymentMethod): PaymentSummary {
  return {
    orderId,
    orderNumber,
    method,
    provider: getProviderForMethod(method),
    status: method === "cod" ? "pending" : "unpaid",
    amount: summary.total,
    currency: summary.currency === "THB" ? "THB" : "USD",
  };
}

export function getPaymentStatusForMethod(method: PaymentMethod): PaymentStatus {
  switch (method) {
    case "cod":
      return "pending";
    case "bank_transfer":
      return "pending";
    case "credit_card":
      return "paid";
    case "paypal":
      return "paid";
    default:
      return "unpaid";
  }
}

export function canAutoConfirmPayment(method: PaymentMethod) {
  return method === "credit_card" || method === "paypal";
}

export function shouldShowManualPaymentInstructions(method: PaymentMethod) {
  return method === "cod" || method === "bank_transfer";
}

