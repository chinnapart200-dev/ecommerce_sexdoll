import Link from "next/link";
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
    items: [],
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
    items: [],
  },
  {
    id: 3,
    orderNumber: "WM-2026-0003",
    userId: 1,
    status: "completed",
    paymentStatus: "paid",
    paymentMethod: "cod",
    subtotal: 119.0,
    shipping: 15.0,
    discount: 0,
    total: 134.0,
    currency: "THB",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    customerPhone: "+66 8xx xxx xxx",
    shippingAddress: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "+66 8xx xxx xxx",
      addressLine1: "25 Phahonyothin Road",
      addressLine2: null,
      city: "Bangkok",
      state: "Bangkok",
      postalCode: "10900",
      country: "Thailand",
    },
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    updatedAt: new Date().toISOString(),
    items: [],
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

export default function OrdersPage() {
  return (
    <main className="min-h-screen overflow-x-hidden text-[#111111]">
      <section className="mx-auto w-full max-w-[1520px] px-4 py-8 sm:px-6 lg:px-10">
        <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white/80 shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
          <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
            <aside className="flex flex-col justify-between gap-6 bg-[#111111] p-6 text-white sm:p-8 lg:p-10">
              <div className="space-y-4">
                <span className="inline-flex w-fit items-center rounded-full bg-[#d7ff1f] px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-black">
                  Order history
                </span>
                <h1 className="text-4xl font-black uppercase tracking-[-0.08em] sm:text-5xl">
                  Track orders
                </h1>
                <p className="text-sm leading-7 text-white/70">
                  Review your purchase timeline, payment status, and shipping details from one account page.
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-white/45">Total orders</p>
                  <p className="mt-2 text-3xl font-black">{orders.length}</p>
                  <p className="mt-2 text-sm leading-7 text-white/70">
                    This section will connect to the orders API next.
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-white/45">Latest update</p>
                  <p className="mt-2 text-lg font-black">{formatDate(orders[0].updatedAt)}</p>
                  <p className="mt-2 text-sm leading-7 text-white/70">
                    The newest order appears at the top of the timeline.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/account"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#d7ff1f] px-7 text-sm font-black uppercase tracking-[0.18em] text-black transition duration-200 hover:bg-[#e7ff41]"
                >
                  Back to dashboard
                </Link>
                <Link
                  href="/products"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-7 text-sm font-black uppercase tracking-[0.18em] text-white transition duration-200 hover:bg-white/5"
                >
                  Continue shopping
                </Link>
              </div>
            </aside>

            <div className="p-6 sm:p-8 lg:p-10">
              <div className="max-w-3xl space-y-4">
                <span className="inline-flex w-fit items-center rounded-full border border-black/10 bg-[#d7ff1f] px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-black">
                  Orders
                </span>
                <h2 className="text-4xl font-black uppercase tracking-[-0.08em] sm:text-5xl">
                  Recent purchases
                </h2>
                <p className="max-w-2xl text-sm leading-7 text-black/60 sm:text-base">
                  Each order card summarizes status, payment, shipping, and totals so the account page stays easy to scan.
                </p>
              </div>

              <div className="mt-8 grid gap-4">
                {orders.map((order) => (
                  <article
                    key={order.id}
                    className="rounded-[1.5rem] border border-black/10 bg-white p-5 shadow-[0_12px_30px_rgba(0,0,0,0.05)]"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-xl font-black uppercase tracking-[-0.04em]">
                            {order.orderNumber}
                          </h3>
                          <span className={`rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] ${statusStyles[order.status]}`}>
                            {orderStatusLabel[order.status]}
                          </span>
                          <span className="rounded-full bg-black/5 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-black/60">
                            {paymentStatusLabel[order.paymentStatus]}
                          </span>
                        </div>

                        <p className="text-sm leading-6 text-black/60">
                          Ordered by {order.customerName} on {formatDate(order.createdAt)} using {order.paymentMethod}.
                        </p>

                        <div className="grid gap-3 sm:grid-cols-3">
                          <div className="rounded-[1.25rem] border border-black/10 bg-black/5 p-4">
                            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-black/45">Subtotal</p>
                            <p className="mt-1 text-lg font-black text-black">{formatCurrency(order.subtotal)}</p>
                          </div>
                          <div className="rounded-[1.25rem] border border-black/10 bg-black/5 p-4">
                            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-black/45">Shipping</p>
                            <p className="mt-1 text-lg font-black text-black">{formatCurrency(order.shipping)}</p>
                          </div>
                          <div className="rounded-[1.25rem] border border-black/10 bg-black/5 p-4">
                            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-black/45">Total</p>
                            <p className="mt-1 text-lg font-black text-black">{formatCurrency(order.total)}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 lg:min-w-[220px]">
                        <Link
                          href={`/orders/${order.id}`}
                          className="inline-flex h-11 items-center justify-center rounded-full bg-[#d7ff1f] px-5 text-sm font-black uppercase tracking-[0.18em] text-black transition duration-200 hover:bg-[#e7ff41]"
                        >
                          View details
                        </Link>
                        <div className="rounded-[1.25rem] border border-black/10 bg-black/5 p-4 text-sm text-black/65">
                          {order.shippingAddress.addressLine1}
                          {order.shippingAddress.addressLine2 ? `, ${order.shippingAddress.addressLine2}` : ""}
                          <br />
                          {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
