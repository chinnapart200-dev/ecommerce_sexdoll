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
  title: "Payment | WOODMART",
  description: "Review payment details and continue to your order confirmation.",
};

export default async function PaymentPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const params = (await searchParams) ?? {};

  const orderNumber = getParam(params, "orderNumber") || "WM-2026-0001";
  const customerName = getParam(params, "customerName") || "John Doe";
  const customerEmail = getParam(params, "customerEmail") || "john@example.com";
  const paymentMethod = getParam(params, "paymentMethod") || "credit_card";
  const total = parseAmount(getParam(params, "total") || "207");
  const status = getParam(params, "status") || "pending";

  const reference = getParam(params, "reference") || `PMT-${orderNumber.replace(/[^A-Z0-9]/gi, "").slice(-8)}`;
  const updatedAt = new Date();

  return (
    <main className="min-h-screen overflow-x-hidden text-[#111111]">
      <section className="mx-auto w-full max-w-[1520px] px-4 py-8 sm:px-6 lg:px-10">
        <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white/80 shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
          <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
            <aside className="flex flex-col justify-between gap-6 bg-[#111111] p-6 text-white sm:p-8 lg:p-10">
              <div className="space-y-4">
                <span className="inline-flex w-fit items-center rounded-full bg-[#d7ff1f] px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-black">
                  Payment review
                </span>
                <h1 className="text-4xl font-black uppercase tracking-[-0.08em] sm:text-5xl">
                  Confirm payment
                </h1>
                <p className="text-sm leading-7 text-white/70">
                  Review your order payment details before the confirmation step. This page is ready to connect to the backend next.
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-white/45">Order</p>
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
                  href="/checkout"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#d7ff1f] px-7 text-sm font-black uppercase tracking-[0.18em] text-black transition duration-200 hover:bg-[#e7ff41]"
                >
                  Back to checkout
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
                  Payment summary
                </span>
                <h2 className="text-4xl font-black uppercase tracking-[-0.08em] sm:text-5xl">
                  Review details
                </h2>
                <p className="max-w-2xl text-sm leading-7 text-black/60 sm:text-base">
                  Payment confirmation can continue from here once your gateway or manual approval step is connected.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.25rem] border border-black/10 bg-white p-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-black/45">Amount</p>
                  <p className="mt-1 text-lg font-black text-black">{formatCurrency(total)}</p>
                </div>
                <div className="rounded-[1.25rem] border border-black/10 bg-white p-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-black/45">Reference</p>
                  <p className="mt-1 break-all text-sm font-black text-black">{reference}</p>
                </div>
                <div className="rounded-[1.25rem] border border-black/10 bg-white p-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-black/45">Updated</p>
                  <p className="mt-1 text-sm font-semibold text-black/70">{formatDate(updatedAt)}</p>
                </div>
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                <section className="rounded-[1.5rem] border border-black/10 bg-black/5 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-black/45">Actions</p>
                  <div className="mt-4 space-y-3">
                    <Link
                      href={`/success?orderNumber=${encodeURIComponent(orderNumber)}&total=${encodeURIComponent(String(total))}&paymentMethod=${encodeURIComponent(paymentMethod)}&customerName=${encodeURIComponent(customerName)}&customerEmail=${encodeURIComponent(customerEmail)}&status=${encodeURIComponent(status)}`}
                      className="flex items-center justify-between rounded-[1.25rem] border border-black/10 bg-white px-4 py-3 text-sm font-black uppercase tracking-[0.18em] text-black transition duration-200 hover:-translate-y-0.5"
                    >
                      Continue to success
                      <span>→</span>
                    </Link>
                    <Link
                      href="/cancel"
                      className="flex items-center justify-between rounded-[1.25rem] border border-black/10 bg-white px-4 py-3 text-sm font-black uppercase tracking-[0.18em] text-black transition duration-200 hover:-translate-y-0.5"
                    >
                      Cancel payment
                      <span>→</span>
                    </Link>
                  </div>
                </section>

                <section className="space-y-4">
                  <div className="rounded-[1.5rem] border border-black/10 bg-white p-5">
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-black/45">Payment method</p>
                    <div className="mt-3 space-y-2 text-sm leading-6 text-black/70">
                      <p className="font-black uppercase tracking-[0.18em] text-black">{paymentMethod.replace("_", " ")}</p>
                      <p>This is a placeholder review screen for the next payment integration step.</p>
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] border border-black/10 bg-white p-5">
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-black/45">What happens next?</p>
                    <div className="mt-3 space-y-3 text-sm leading-6 text-black/65">
                      <p>1. Confirm the payment details.</p>
                      <p>2. Submit the payment request or manual confirmation.</p>
                      <p>3. Redirect to the success page once payment is approved.</p>
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
