"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/format";
import type { CartSummary as CartSummaryType } from "@/types/cart";

type CartSummaryProps = {
  itemCount: number;
  summary: CartSummaryType;
  shippingLabel: string;
  hasItems: boolean;
  updating?: boolean;
  onRefresh: () => void;
  onClearCart: () => void;
};

export function CartSummary({
  itemCount,
  summary,
  shippingLabel,
  hasItems,
  updating = false,
  onRefresh,
  onClearCart,
}: CartSummaryProps) {
  return (
    <aside className="space-y-4">
      <div className="rounded-[1.8rem] border border-black/10 bg-white/80 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
        <div className="space-y-2">
          <span className="inline-flex w-fit items-center rounded-full border border-black/10 bg-[#d7ff1f] px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-black">
            Order summary
          </span>
          <h2 className="text-3xl font-black uppercase tracking-[-0.06em]">Summary</h2>
        </div>

        <div className="mt-6 space-y-4 rounded-[1.4rem] bg-[#f8f6ef] p-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-black/60">Items</span>
            <span className="font-bold">{itemCount}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-black/60">Subtotal</span>
            <span className="font-bold">{formatCurrency(summary.subtotal)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-black/60">Shipping</span>
            <span className="font-bold">{shippingLabel}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-black/60">Discount</span>
            <span className="font-bold">-{formatCurrency(summary.discount)}</span>
          </div>
          <div className="h-px bg-black/10" />
          <div className="flex items-center justify-between">
            <span className="text-sm font-black uppercase tracking-[0.2em] text-black/60">Total</span>
            <span className="text-2xl font-black text-black">{formatCurrency(summary.total)}</span>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <Button variant="dark" size="lg" className="w-full rounded-full" disabled={!hasItems}>
            Proceed to checkout
          </Button>
          <Button
            variant="outline"
            size="md"
            className="w-full rounded-full"
            onClick={onRefresh}
            disabled={updating}
          >
            {updating ? "Updating..." : "Recalculate totals"}
          </Button>
        </div>
      </div>

      <div className="rounded-[1.8rem] border border-black/10 bg-white/80 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
        <h3 className="text-xl font-black uppercase tracking-[-0.05em]">Need help?</h3>
        <p className="mt-3 text-sm leading-7 text-black/60">
          You can keep shopping, update quantities, or clear the cart and start again.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/products"
            className="inline-flex h-9 items-center justify-center rounded-full border border-black/10 bg-white px-4 text-xs font-black uppercase tracking-[0.18em] text-black transition hover:bg-[#f7f5ef]"
          >
            Continue shopping
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full"
            onClick={onClearCart}
            disabled={!hasItems || updating}
          >
            Clear cart
          </Button>
        </div>
      </div>
    </aside>
  );
}

export default CartSummary;
