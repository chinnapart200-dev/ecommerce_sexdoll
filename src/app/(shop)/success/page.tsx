import Link from "next/link";
import type { Metadata } from "next";
import { formatCurrency, formatDate } from "@/lib/format";

type SearchParams = Record<string, string | string[] | undefined>;

function getParam(searchParams: SearchParams, key: string) {
  const value = searchParams[key];
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

function parseAmount(value: string) {
  const amount = Number(value);
  return Number.isFinite(amount) ? amount : 0;
}

export const metadata: Metadata = {
  title: "Success | WOODMART",
  description: "Order placed successfully and ready for the next steps.",
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const params = (await searchParams) ?? {};

  const orderNumber = getParam(params, "orderNumber") || "WM-2026-0001";
  const customerName = getParam(params, "customerName") || "John Doe";
  const customerEmail = getParam(params, "customerEmail") || "john@example.com";
  const paymentMethod = getParam(params, "paymentMethod") || "credit_card";
  const status = getParam(params, "status") || "paid";
  const total = parseAmount(getParam(params, "total") || "207");
  const reference = getParam(params, "reference") || `ORD-${orderNumber.replace(/[^A-Z0-9]/gi, "").slice(-8)}`;
  const completedAt = new Date();

  return (
    <main className="min-h-screen overflow-x-hidden text-[#111111]">
      <section className="mx-auto w-full max-w-[1520px] px-4 py-8 sm:px-6 lg:px-10">
        <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white/80 shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
          <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
            <aside className="flex flex-col justify-between gap-6 bg-[#111111] p-6 text-white sm:p-8 lg:p-10">
              <div className="space-y-4">
                <span className="inline-flex w-fit items-center rounded-full bg-[#d7ff1f] px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-black">
                  Order complete
                </span>
                <h1 className="text-4xl font-black uppercase tracking-[-0.08em] sm:text-5xl">
                  Thank you
                </h1>
                <p className="text-sm leading-7 text-white/70">
                  Your order has been placed successfully. You can keep this page as your receipt reference.
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-white/45">Order number</p>
                  <p className="mt-2 text-lg font-black">{orderNumber}</p>
                  <p className="mt-2 text-sm leading-7 text-white/70">
                    {customerName} • {customerEmail}
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-white/45">Status</p>
                  <p className="mt-2 text-lg font-black uppercase tracking-[0.18em]">{status}</p>
                  <p className="mt-2 text-sm leading-7 text-white/70">
                    Payment method: {paymentMethod.replace("_", " ")}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/orders"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#d7ff1f] px-7 text-sm font-black uppercase tracking-[0.18em] text-black transition duration-200 hover:bg-[#e7ff41]"
                >
                  View orders
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
                  Success summary
                </span>
                <h2 className="text-4xl font-black uppercase tracking-[-0.08em] sm:text-5xl">
                  Your order is confirmed
                </h2>
                <p className="max-w-2xl text-sm leading-7 text-black/60 sm:text-base">
                  Save the order reference below. This screen is ready to be wired to backend order confirmation later.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.25rem] border border-black/10 bg-white p-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-black/45">Total paid</p>
                  <p className="mt-1 text-lg font-black text-black">{formatCurrency(total)}</p>
                </div>
                <div className="rounded-[1.25rem] border border-black/10 bg-white p-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-black/45">Reference</p>
                  <p className="mt-1 break-all text-sm font-black text-black">{reference}</p>
                </div>
                <div className="rounded-[1.25rem] border border-black/10 bg-white p-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-black/45">Completed</p>
                  <p className="mt-1 text-sm font-semibold text-black/70">{formatDate(completedAt)}</p>
                </div>
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                <section className="rounded-[1.5rem] border border-black/10 bg-black/5 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-black/45">Next steps</p>
                  <div className="mt-4 space-y-3">
                    {[
                      "Keep this order number for support inquiries.",
                      "Track shipping updates from your orders page.",
                      "Email confirmation should arrive shortly after payment processing.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-[1.25rem] border border-black/10 bg-white px-4 py-3 text-sm text-black/70"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </section>

                <section className="space-y-4">
                  <div className="rounded-[1.5rem] border border-black/10 bg-white p-5">
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-black/45">Payment details</p>
                    <div className="mt-3 space-y-2 text-sm leading-6 text-black/70">
                      <p className="font-black uppercase tracking-[0.18em] text-black">
                        {paymentMethod.replace("_", " ")}
                      </p>
                      <p>Status: {status}</p>
                      <p>Reference: {reference}</p>
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] border border-black/10 bg-white p-5">
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-black/45">Need help?</p>
                    <div className="mt-3 space-y-3 text-sm leading-6 text-black/65">
                      <p>If anything looks wrong, keep this page and contact support with your order number.</p>
                      <p>You can always return to your account to review the order timeline.</p>
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
