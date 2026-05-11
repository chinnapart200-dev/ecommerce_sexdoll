import Link from "next/link";
import type { Metadata } from "next";
import { formatDate } from "@/lib/format";

type SearchParams = Record<string, string | string[] | undefined>;

function getParam(searchParams: SearchParams, key: string) {
  const value = searchParams[key];
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export const metadata: Metadata = {
  title: "Cancel | WOODMART",
  description: "Payment was cancelled and you can safely resume checkout.",
};

export default async function CancelPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const params = (await searchParams) ?? {};

  const orderNumber = getParam(params, "orderNumber") || "WM-2026-0001";
  const paymentMethod = getParam(params, "paymentMethod") || "credit_card";
  const reason = getParam(params, "reason") || "The payment was cancelled before completion.";
  const cancelledAt = new Date();

  return (
    <main className="min-h-screen overflow-x-hidden text-[#111111]">
      <section className="mx-auto w-full max-w-[1520px] px-4 py-8 sm:px-6 lg:px-10">
        <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white/80 shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
          <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
            <aside className="flex flex-col justify-between gap-6 bg-[#111111] p-6 text-white sm:p-8 lg:p-10">
              <div className="space-y-4">
                <span className="inline-flex w-fit items-center rounded-full bg-[#d7ff1f] px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-black">
                  Payment cancelled
                </span>
                <h1 className="text-4xl font-black uppercase tracking-[-0.08em] sm:text-5xl">
                  Checkout paused
                </h1>
                <p className="text-sm leading-7 text-white/70">
                  No payment has been completed yet. You can safely return and continue when you are ready.
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-white/45">Order reference</p>
                  <p className="mt-2 text-lg font-black">{orderNumber}</p>
                  <p className="mt-2 text-sm leading-7 text-white/70">
                    Payment method: {paymentMethod.replace("_", " ")}
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-white/45">Status</p>
                  <p className="mt-2 text-lg font-black uppercase tracking-[0.18em]">Cancelled</p>
                  <p className="mt-2 text-sm leading-7 text-white/70">{reason}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/checkout"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#d7ff1f] px-7 text-sm font-black uppercase tracking-[0.18em] text-black transition duration-200 hover:bg-[#e7ff41]"
                >
                  Return to checkout
                </Link>
                <Link
                  href="/cart"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-7 text-sm font-black uppercase tracking-[0.18em] text-white transition duration-200 hover:bg-white/5"
                >
                  Back to cart
                </Link>
              </div>
            </aside>

            <div className="p-6 sm:p-8 lg:p-10">
              <div className="max-w-3xl space-y-4">
                <span className="inline-flex w-fit items-center rounded-full border border-black/10 bg-[#d7ff1f] px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-black">
                  Cancel summary
                </span>
                <h2 className="text-4xl font-black uppercase tracking-[-0.08em] sm:text-5xl">
                  Payment was not completed
                </h2>
                <p className="max-w-2xl text-sm leading-7 text-black/60 sm:text-base">
                  You can safely retry checkout, choose another payment method, or go back to the cart to make changes.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.25rem] border border-black/10 bg-white p-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-black/45">Cancelled at</p>
                  <p className="mt-1 text-sm font-semibold text-black/70">{formatDate(cancelledAt)}</p>
                </div>
                <div className="rounded-[1.25rem] border border-black/10 bg-white p-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-black/45">Reference</p>
                  <p className="mt-1 break-all text-sm font-black text-black">{orderNumber}</p>
                </div>
                <div className="rounded-[1.25rem] border border-black/10 bg-white p-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-black/45">Method</p>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-black">
                    {paymentMethod.replace("_", " ")}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                <section className="rounded-[1.5rem] border border-black/10 bg-black/5 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-black/45">What you can do</p>
                  <div className="mt-4 space-y-3">
                    {[
                      "Try the payment again with the same order details.",
                      "Switch to a different payment method.",
                      "Go back to the cart and review your items.",
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
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-black/45">Support note</p>
                    <div className="mt-3 space-y-2 text-sm leading-6 text-black/70">
                      <p>No charge has been captured yet.</p>
                      <p>You can safely retry without duplicating this order.</p>
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] border border-black/10 bg-white p-5">
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-black/45">Quick actions</p>
                    <div className="mt-4 flex flex-col gap-3">
                      <Link
                        href="/products"
                        className="inline-flex h-11 items-center justify-center rounded-full bg-[#d7ff1f] px-5 text-sm font-black uppercase tracking-[0.18em] text-black transition duration-200 hover:bg-[#e7ff41]"
                      >
                        Browse products
                      </Link>
                      <Link
                        href="/orders"
                        className="inline-flex h-11 items-center justify-center rounded-full border border-black/15 px-5 text-sm font-black uppercase tracking-[0.18em] text-black transition duration-200 hover:bg-black/5"
                      >
                        View orders
                      </Link>
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
