"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CartItem as CartItemRow } from "@/components/cart/CartItem";
import { CartSummary as CartSummaryPanel } from "@/components/cart/CartSummary";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/format";
import type { ApiResponse } from "@/types/api";
import type { CartItem, CartSummary } from "@/types/cart";

const CART_SESSION_KEY = "woodmart-cart-session-id";

type CartData = {
  items: CartItem[];
  summary: CartSummary;
};

function getOrCreateSessionId() {
  if (typeof window === "undefined") return "";

  const existing = window.localStorage.getItem(CART_SESSION_KEY);
  if (existing) {
    return existing;
  }

  const created = window.crypto.randomUUID();
  window.localStorage.setItem(CART_SESSION_KEY, created);
  return created;
}

function CartLineSkeleton() {
  return (
    <div className="rounded-[1.5rem] border border-black/10 bg-white/80 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
      <div className="flex gap-4">
        <div className="h-28 w-24 rounded-[1.2rem] bg-gradient-to-br from-[#ececec] to-[#d8d8d8]" />
        <div className="flex-1 space-y-3">
          <div className="h-4 w-32 rounded-full bg-black/10" />
          <div className="h-3 w-full rounded-full bg-black/5" />
          <div className="h-3 w-3/4 rounded-full bg-black/5" />
          <div className="flex gap-3 pt-2">
            <div className="h-9 w-20 rounded-full bg-black/10" />
            <div className="h-9 w-20 rounded-full bg-black/10" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  const [sessionId, setSessionId] = useState("");
  const [items, setItems] = useState<CartItem[]>([]);
  const [summary, setSummary] = useState<CartSummary>({
    subtotal: 0,
    shipping: 0,
    discount: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    setSessionId(getOrCreateSessionId());
  }, []);

  useEffect(() => {
    if (!sessionId) return;

    const controller = new AbortController();

    async function loadCart() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`/api/carts?sessionId=${encodeURIComponent(sessionId)}`, {
          signal: controller.signal,
          cache: "no-store",
        });

        const result = (await response.json()) as ApiResponse<CartData>;

        if (!response.ok || !result.success) {
          throw new Error(!result.success ? result.message : "Failed to load cart.");
        }

        setItems(result.data.items);
        setSummary(result.data.summary);
      } catch (fetchError) {
        if (fetchError instanceof DOMException && fetchError.name === "AbortError") {
          return;
        }

        setError(fetchError instanceof Error ? fetchError.message : "Failed to load cart.");
      } finally {
        setLoading(false);
      }
    }

    void loadCart();

    return () => controller.abort();
  }, [sessionId]);

  const hasItems = items.length > 0;
  const itemCount = useMemo(() => items.reduce((total, item) => total + item.quantity, 0), [items]);
  const shippingLabel = summary.shipping > 0 ? formatCurrency(summary.shipping) : "Free";

  async function refreshCart() {
    if (!sessionId) return;

    setUpdating(true);

    try {
      const response = await fetch(`/api/carts?sessionId=${encodeURIComponent(sessionId)}`, {
        cache: "no-store",
      });
      const result = (await response.json()) as ApiResponse<CartData>;

      if (!response.ok || !result.success) {
        throw new Error(!result.success ? result.message : "Failed to refresh cart.");
      }

      setItems(result.data.items);
      setSummary(result.data.summary);
    } catch (refreshError) {
      setError(refreshError instanceof Error ? refreshError.message : "Failed to refresh cart.");
    } finally {
      setUpdating(false);
    }
  }

  async function handleClearCart() {
    if (!sessionId || !hasItems) return;

    setUpdating(true);
    setError("");

    try {
      const response = await fetch(`/api/carts?sessionId=${encodeURIComponent(sessionId)}`, {
        method: "DELETE",
      });
      const result = (await response.json()) as ApiResponse<null>;

      if (!response.ok || !result.success) {
        throw new Error(!result.success ? result.message : "Failed to clear cart.");
      }

      setItems([]);
      setSummary({
        subtotal: 0,
        shipping: 0,
        discount: 0,
        total: 0,
      });
    } catch (clearError) {
      setError(clearError instanceof Error ? clearError.message : "Failed to clear cart.");
    } finally {
      setUpdating(false);
    }
  }

  async function handleAddOne(productId: number) {
    if (!sessionId) return;

    setUpdating(true);
    setError("");

    try {
      const response = await fetch("/api/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
          productId,
          quantity: 1,
        }),
      });

      const result = (await response.json()) as ApiResponse<null>;

      if (!response.ok || !result.success) {
        throw new Error(!result.success ? result.message : "Failed to update cart.");
      }

      await refreshCart();
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Failed to update cart.");
    } finally {
      setUpdating(false);
    }
  }

  return (
    <main className="min-h-screen overflow-x-hidden text-[#111111]">
      <section className="mx-auto w-full max-w-[1520px] px-4 pb-8 pt-8 sm:px-6 lg:px-10">
        <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white/80 px-6 py-8 shadow-[0_18px_50px_rgba(0,0,0,0.08)] sm:px-8 lg:px-10">
          <div className="flex flex-col gap-3">
            <span className="inline-flex w-fit items-center rounded-full border border-black/10 bg-[#d7ff1f] px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-black">
              Shopping cart
            </span>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-2">
                <h1 className="text-4xl font-black uppercase tracking-[-0.08em] sm:text-5xl">Your cart</h1>
                <p className="max-w-3xl text-sm uppercase tracking-[0.24em] text-black/45">
                  Review your selected items before checkout
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="secondary"
                  size="sm"
                  className="rounded-full"
                  onClick={() => void refreshCart()}
                  disabled={!sessionId || loading || updating}
                >
                  Refresh
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => void handleClearCart()}
                  disabled={!hasItems || updating}
                >
                  Clear cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1520px] px-4 pb-12 sm:px-6 lg:px-10">
        {error ? (
          <div className="mb-6 rounded-[1.5rem] border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
            {error}
          </div>
        ) : null}

        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="space-y-4">
            {loading ? (
              <>
                <CartLineSkeleton />
                <CartLineSkeleton />
              </>
            ) : hasItems ? (
              items.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onIncrease={handleAddOne}
                  updating={updating}
                />
              ))
            ) : (
              <div className="rounded-[1.8rem] border border-black/10 bg-white/80 p-8 text-center shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#d7ff1f] text-2xl font-black text-black">
                  0
                </div>
                <h2 className="mt-6 text-3xl font-black uppercase tracking-[-0.06em]">Your cart is empty</h2>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-black/60">
                  Add products from the shop to start building your order.
                </p>
                <div className="mt-6">
                  <Link
                    href="/products"
                    className="inline-flex h-11 items-center justify-center rounded-full bg-[#d7ff1f] px-5 text-sm font-black uppercase tracking-[0.18em] text-black transition hover:bg-[#e7ff41]"
                  >
                    Browse products
                  </Link>
                </div>
              </div>
            )}
          </div>

          <CartSummaryPanel
            itemCount={itemCount}
            summary={summary}
            shippingLabel={shippingLabel}
            hasItems={hasItems}
            updating={updating || loading || !sessionId}
            onRefresh={() => void refreshCart()}
            onClearCart={() => void handleClearCart()}
          />
        </div>
      </section>
    </main>
  );
}
