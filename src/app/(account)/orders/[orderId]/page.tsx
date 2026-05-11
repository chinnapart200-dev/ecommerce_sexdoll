import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { formatCurrency, formatDate } from "@/lib/format";
import type { Order, OrderStatus, PaymentStatus } from "@/types/order";

const orders: Order[] = [
  {
    id: 1,
    orderNumber: "WM-2026-0001",
    userId: 1,
    status: "processing",
    paymentStatus: "paid",
    paymentMethod: "credit_card",
    subtotal: 189.0,
    shipping: 18.0,
    discount: 0,
    total: 207.0,
    currency: "THB",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    customerPhone: "+66 8xx xxx xxx",
    shippingAddress: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "+66 8xx xxx xxx",
      addressLine1: "123 Sukhumvit Road",
      addressLine2: "Unit 12A",
      city: "Bangkok",
      state: "Bangkok",
      postalCode: "10110",
      country: "Thailand",
    },
    notes: "Leave the parcel at the front desk.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    items: [
      {
        id: 1,
        orderId: 1,
        productId: 101,
        quantity: 1,
        unitPrice: 129.0,
        totalPrice: 129.0,
        product: {
          id: 101,
          slug: "embroidered-cotton-blouse",
          name: "Embroidered Cotton Blouse",
          description: "Soft cotton blouse with floral embroidery.",
          price: 129.0,
          salePrice: null,
          imageUrl: "/images/products/blouse.jpg",
          categoryId: 1,
          categoryName: "Women",
          isFeatured: true,
          isNew: true,
          stock: 12,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
      {
        id: 2,
        orderId: 1,
        productId: 102,
        quantity: 1,
        unitPrice: 60.0,
        totalPrice: 60.0,
        product: {
          id: 102,
          slug: "linen-button-shirt",
          name: "Linen Button Shirt",
          description: "Lightweight shirt made for warm days.",
          price: 60.0,
          salePrice: null,
          imageUrl: "/images/products/shirt.jpg",
          categoryId: 1,
          categoryName: "Women",
          isFeatured: false,
          isNew: false,
          stock: 8,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
    ],
  },
  {
    id: 2,
    orderNumber: "WM-2026-0002",
    userId: 1,
    status: "shipped",
    paymentStatus: "paid",
    paymentMethod: "bank_transfer",
    subtotal: 299.0,
    shipping: 0,
    discount: 20,
    total: 279.0,
    currency: "THB",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    customerPhone: "+66 8xx xxx xxx",
    shippingAddress: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "+66 8xx xxx xxx",
      addressLine1: "88 Rama 9 Road",
      addressLine2: null,
      city: "Bangkok",
      state: "Bangkok",
      postalCode: "10400",
      country: "Thailand",
    },
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
    items: [
      {
        id: 3,
        orderId: 2,
        productId: 103,
        quantity: 2,
        unitPrice: 149.5,
        totalPrice: 299.0,
        product: {
          id: 103,
          slug: "utility-oversized-jacket",
          name: "Utility Oversized Jacket",
          description: "Relaxed fit jacket with utility pockets.",
          price: 149.5,
          salePrice: null,
          imageUrl: "/images/products/jacket.jpg",
          categoryId: 1,
          categoryName: "Women",
          isFeatured: false,
          isNew: false,
          stock: 5,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
    ],
  },
];

const orderStatusLabel: Record<OrderStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  processing: "Processing",
  shipped: "Shipped",
  completed: "Completed",
  cancelled: "Cancelled",
};

const paymentStatusLabel: Record<PaymentStatus, string> = {
  unpaid: "Unpaid",
  pending: "Pending",
  paid: "Paid",
  failed: "Failed",
  refunded: "Refunded",
};

const statusStyles: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-900",
  confirmed: "bg-sky-100 text-sky-900",
  processing: "bg-violet-100 text-violet-900",
  shipped: "bg-blue-100 text-blue-900",
  completed: "bg-emerald-100 text-emerald-900",
  cancelled: "bg-red-100 text-red-900",
};

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const id = Number(orderId);
  const order = orders.find((item) => item.id === id);

  if (!Number.isInteger(id) || id <= 0 || !order) {
    notFound();
  }

  return (
    <main className="min-h-screen overflow-x-hidden text-[#111111]">
      <section className="mx-auto w-full max-w-[1520px] px-4 py-8 sm:px-6 lg:px-10">
        <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white/80 shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
          <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
            <aside className="flex flex-col justify-between gap-6 bg-[#111111] p-6 text-white sm:p-8 lg:p-10">
              <div className="space-y-4">
                <span className="inline-flex w-fit items-center rounded-full bg-[#d7ff1f] px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-black">
                  Order detail
                </span>
                <h1 className="text-4xl font-black uppercase tracking-[-0.08em] sm:text-5xl">
                  {order.orderNumber}
                </h1>
                <p className="text-sm leading-7 text-white/70">
                  Full timeline, status, address, items, and payment summary for this purchase.
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-white/45">Order status</p>
                  <span className={`mt-3 inline-flex rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] ${statusStyles[order.status]}`}>
                    {orderStatusLabel[order.status]}
                  </span>
                  <p className="mt-3 text-sm leading-7 text-white/70">
                    Payment status: {paymentStatusLabel[order.paymentStatus]}
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-white/45">Created</p>
                  <p className="mt-2 text-lg font-black">{formatDate(order.createdAt)}</p>
                  <p className="mt-2 text-sm leading-7 text-white/70">
                    Last updated {formatDate(order.updatedAt)}.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/orders"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#d7ff1f] px-7 text-sm font-black uppercase tracking-[0.18em] text-black transition duration-200 hover:bg-[#e7ff41]"
                >
                  Back to orders
                </Link>
                <Link
                  href="/account"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-7 text-sm font-black uppercase tracking-[0.18em] text-white transition duration-200 hover:bg-white/5"
                >
                  Account dashboard
                </Link>
              </div>
            </aside>

            <div className="p-6 sm:p-8 lg:p-10">
              <div className="max-w-3xl space-y-4">
                <span className="inline-flex w-fit items-center rounded-full border border-black/10 bg-[#d7ff1f] px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-black">
                  Order summary
                </span>
                <h2 className="text-4xl font-black uppercase tracking-[-0.08em] sm:text-5xl">
                  Track every detail
                </h2>
                <p className="max-w-2xl text-sm leading-7 text-black/60 sm:text-base">
                  This screen shows the breakdown of items, shipping address, and totals so the support flow is easy to follow.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.25rem] border border-black/10 bg-white p-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-black/45">Subtotal</p>
                  <p className="mt-1 text-lg font-black text-black">{formatCurrency(order.subtotal)}</p>
                </div>
                <div className="rounded-[1.25rem] border border-black/10 bg-white p-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-black/45">Shipping</p>
                  <p className="mt-1 text-lg font-black text-black">{formatCurrency(order.shipping)}</p>
                </div>
                <div className="rounded-[1.25rem] border border-black/10 bg-white p-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-black/45">Total</p>
                  <p className="mt-1 text-lg font-black text-black">{formatCurrency(order.total)}</p>
                </div>
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                <section className="rounded-[1.5rem] border border-black/10 bg-black/5 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-black/45">Items</p>
                  <div className="mt-4 space-y-4">
                    {order.items?.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col gap-4 rounded-[1.25rem] border border-black/10 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-16 overflow-hidden rounded-2xl bg-black/5">
                            <Image
                              src={item.product?.imageUrl ?? "/images/products/placeholder.jpg"}
                              alt={item.product?.name ?? "Product"}
                              width={64}
                              height={64}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-base font-black uppercase tracking-[-0.03em]">
                              {item.product?.name ?? `Product #${item.productId}`}
                            </p>
                            <p className="text-sm text-black/55">
                              Qty {item.quantity} • {formatCurrency(item.unitPrice)} each
                            </p>
                          </div>
                        </div>

                        <div className="text-left sm:text-right">
                          <p className="text-xs font-black uppercase tracking-[0.22em] text-black/45">Line total</p>
                          <p className="mt-1 text-lg font-black text-black">{formatCurrency(item.totalPrice)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="space-y-4">
                  <div className="rounded-[1.5rem] border border-black/10 bg-white p-5">
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-black/45">Shipping address</p>
                    <div className="mt-3 space-y-1 text-sm leading-6 text-black/70">
                      <p className="font-black text-black">
                        {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                      </p>
                      <p>{order.shippingAddress.addressLine1}</p>
                      {order.shippingAddress.addressLine2 ? <p>{order.shippingAddress.addressLine2}</p> : null}
                      <p>
                        {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                      </p>
                      <p>{order.shippingAddress.country}</p>
                      <p>{order.shippingAddress.phone}</p>
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] border border-black/10 bg-white p-5">
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-black/45">Payment</p>
                    <div className="mt-3 grid gap-3 text-sm text-black/70">
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-medium">Method</span>
                        <span className="font-black uppercase tracking-[0.18em]">{order.paymentMethod}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-medium">Status</span>
                        <span className="font-black uppercase tracking-[0.18em]">{paymentStatusLabel[order.paymentStatus]}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-medium">Currency</span>
                        <span className="font-black uppercase tracking-[0.18em]">{order.currency}</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] border border-black/10 bg-white p-5">
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-black/45">Customer</p>
                    <div className="mt-3 space-y-2 text-sm leading-6 text-black/70">
                      <p className="font-black text-black">{order.customerName}</p>
                      <p>{order.customerEmail}</p>
                      <p>{order.customerPhone}</p>
                      {order.notes ? <p className="pt-2 text-black/60">{order.notes}</p> : null}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
