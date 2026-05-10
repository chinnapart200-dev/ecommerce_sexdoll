import type { RowDataPacket } from "mysql2/promise";
import { query } from "@/lib/mysql";
import { formatCurrency } from "@/lib/format";
import type { CartItem, CartSummary } from "@/types/cart";
import type { OrderAddress } from "@/types/address";
import type { OrderItem, OrderSummary, PaymentMethod, CreateOrderInput } from "@/types/order";

type CartRow = RowDataPacket & {
  id: number;
  session_id: string;
  product_id: number;
  quantity: number;
  product_name: string;
  product_slug: string;
  product_description: string;
  product_price: string | number;
  product_sale_price: string | number | null;
  product_image_url: string;
  product_category_id: number;
  product_category_name: string;
  product_is_featured: number;
  product_is_new: number;
  product_stock: number;
  product_created_at: Date;
  product_updated_at: Date;
};

function createOrderItemId(index: number, productId: number) {
  return Number(`${productId}${index + 1}`);
}

function calculateShipping(subtotal: number) {
  if (subtotal <= 0) return 0;
  return subtotal >= 150 ? 0 : 15;
}

function calculateDiscount(subtotal: number) {
  if (subtotal >= 200) {
    return Number((subtotal * 0.1).toFixed(2));
  }

  return 0;
}

export function createOrderNumber(prefix = "WDM") {
  const date = new Date();
  const datePart = date.toISOString().slice(2, 10).replaceAll("-", "");
  const timePart = `${date.getHours()}${date.getMinutes()}${date.getSeconds()}`.padStart(6, "0");
  return `${prefix}-${datePart}-${timePart}`;
}

export function normalizePaymentMethod(method: PaymentMethod) {
  return method;
}

export function mapCartRowToItem(row: CartRow, index = 0): CartItem {
  const quantity = row.quantity;

  return {
    id: row.id,
    productId: row.product_id,
    quantity,
    product: {
      id: row.product_id,
      slug: row.product_slug,
      name: row.product_name,
      description: row.product_description,
      price: Number(row.product_price),
      salePrice: row.product_sale_price === null ? null : Number(row.product_sale_price),
      imageUrl: row.product_image_url,
      categoryId: row.product_category_id,
      categoryName: row.product_category_name,
      isFeatured: Boolean(row.product_is_featured),
      isNew: Boolean(row.product_is_new),
      stock: row.product_stock,
      createdAt: row.product_created_at.toISOString(),
      updatedAt: row.product_updated_at.toISOString(),
    },
  };
}

export function calculateOrderSummary(items: CartItem[]): OrderSummary {
  const subtotal = items.reduce((total, item) => {
    const unitPrice = item.product?.salePrice ?? item.product?.price ?? 0;
    return total + unitPrice * item.quantity;
  }, 0);

  const shipping = calculateShipping(subtotal);
  const discount = calculateDiscount(subtotal);
  const total = subtotal + shipping - discount;

  return {
    subtotal: Number(subtotal.toFixed(2)),
    shipping: Number(shipping.toFixed(2)),
    discount: Number(discount.toFixed(2)),
    total: Number(total.toFixed(2)),
    currency: "USD",
  };
}

export function calculateCartSummary(items: CartItem[]): CartSummary {
  const summary = calculateOrderSummary(items);
  return {
    subtotal: summary.subtotal,
    shipping: summary.shipping,
    discount: summary.discount,
    total: summary.total,
  };
}

export function buildOrderItemsFromCartItems(items: CartItem[]): OrderItem[] {
  return items.map((item, index) => {
    const unitPrice = item.product?.salePrice ?? item.product?.price ?? 0;
    const totalPrice = Number((unitPrice * item.quantity).toFixed(2));

    return {
      id: createOrderItemId(index, item.productId),
      orderId: 0,
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: Number(unitPrice.toFixed(2)),
      totalPrice,
      product: item.product,
    };
  });
}

export function buildOrderAddress(address: OrderAddress): OrderAddress {
  return {
    firstName: address.firstName.trim(),
    lastName: address.lastName.trim(),
    email: address.email?.trim(),
    phone: address.phone.trim(),
    addressLine1: address.addressLine1.trim(),
    addressLine2: address.addressLine2?.trim() || null,
    city: address.city.trim(),
    state: address.state?.trim() || null,
    postalCode: address.postalCode.trim(),
    country: address.country.trim(),
  };
}

export function buildOrderPreview(input: CreateOrderInput, items: CartItem[]) {
  const summary = calculateOrderSummary(items);
  const orderItems = buildOrderItemsFromCartItems(items);
  const orderNumber = createOrderNumber();

  return {
    orderNumber,
    customerName: input.customerName.trim(),
    customerEmail: input.customerEmail.trim().toLowerCase(),
    customerPhone: input.customerPhone.trim(),
    shippingAddress: buildOrderAddress(input.shippingAddress),
    paymentMethod: normalizePaymentMethod(input.paymentMethod),
    notes: input.notes?.trim() || null,
    summary,
    items: orderItems,
    totalLabel: formatCurrency(summary.total),
  };
}

export async function getCartItemsForSession(sessionId: string) {
  const rows = await query<CartRow>(
    `
      SELECT
        ci.id,
        ci.session_id,
        ci.product_id,
        ci.quantity,
        p.name AS product_name,
        p.slug AS product_slug,
        p.description AS product_description,
        p.price AS product_price,
        p.sale_price AS product_sale_price,
        p.image_url AS product_image_url,
        p.category_id AS product_category_id,
        c.name AS product_category_name,
        p.is_featured AS product_is_featured,
        p.is_new AS product_is_new,
        p.stock AS product_stock,
        p.created_at AS product_created_at,
        p.updated_at AS product_updated_at
      FROM cart_items ci
      INNER JOIN products p ON p.id = ci.product_id
      INNER JOIN categories c ON c.id = p.category_id
      WHERE ci.session_id = ?
      ORDER BY ci.updated_at DESC, ci.id DESC
    `,
    [sessionId]
  );

  return rows.map((row, index) => mapCartRowToItem(row, index));
}

export async function getCheckoutPreview(sessionId: string) {
  const items = await getCartItemsForSession(sessionId);
  const summary = calculateOrderSummary(items);
  const orderItems = buildOrderItemsFromCartItems(items);

  return {
    items,
    summary,
    orderItems,
    hasItems: items.length > 0,
    itemCount: items.reduce((total, item) => total + item.quantity, 0),
  };
}
