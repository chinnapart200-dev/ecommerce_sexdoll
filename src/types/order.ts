import type { Product } from "@/types/product";
import type { OrderAddress } from "@/types/address";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "completed"
  | "cancelled";

export type PaymentStatus = "unpaid" | "pending" | "paid" | "failed" | "refunded";

export type PaymentMethod = "cod" | "bank_transfer" | "credit_card" | "paypal";

export type OrderItem = {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  product?: Product;
};

export type Order = {
  id: number;
  orderNumber: string;
  userId?: number | null;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: OrderAddress;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
  items?: OrderItem[];
};

export type OrderSummary = {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
};

export type CheckoutFormValues = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: OrderAddress;
  paymentMethod: PaymentMethod;
  notes?: string;
};

export type CreateOrderInput = {
  sessionId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: OrderAddress;
  paymentMethod: PaymentMethod;
  notes?: string;
};
