import type { Product } from "@/types/product";

export type CartItem = {
  id: number;
  productId: number;
  quantity: number;
  product?: Product;
};

export type CartSummary = {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
};

