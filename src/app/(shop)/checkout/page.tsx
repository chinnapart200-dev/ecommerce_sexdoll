"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState, useTransition } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatCurrency } from "@/lib/format";
import { validateCheckout } from "@/lib/validators";
import type { OrderAddress } from "@/types/address";
import type { CheckoutFormValues, PaymentMethod, OrderSummary } from "@/types/order";

type CheckoutLineItem = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
};

const sampleCartItems: CheckoutLineItem[] = [
  {
    id: 1,
    name: "Embroidered Cotton Blouse",
    quantity: 1,
    price: 99,
    imageUrl: "/images/products/blouse.jpg",
  },
  {
    id: 2,
    name: "Floral Print Shirt",
    quantity: 1,
    price: 120,
    imageUrl: "/images/products/shirt.jpg",
  },
];

const paymentOptions: Array<{ value: PaymentMethod; label: string; description: string }> = [
  { value: "cod", label: "Cash on delivery", description: "Pay when your order arrives." },
  { value: "bank_transfer", label: "Bank transfer", description: "Transfer to our business account." },
  { value: "credit_card", label: "Credit card", description: "Pay securely with a card." },
  { value: "paypal", label: "PayPal", description: "Checkout using your PayPal account." },
];

const initialShippingAddress: OrderAddress = {
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
};

const initialValues: CheckoutFormValues = {
  customerName: "John Doe",
  customerEmail: "john@example.com",
  customerPhone: "+66 8xx xxx xxx",
  shippingAddress: initialShippingAddress,
  paymentMethod: "credit_card",
  notes: "Please handle the parcel with care.",
};

function getSummary(items: CheckoutLineItem[]): OrderSummary {
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal >= 200 ? 0 : 18;
  const discount = subtotal >= 250 ? 20 : 0;
  const total = subtotal + shipping - discount;

  return {
    subtotal,
    shipping,
    discount,
    total,
    currency: "USD",
  };
}

function getLineTotal(item: CheckoutLineItem) {
  return item.price * item.quantity;
}

export default function CheckoutPage() {
  const [isPending, startTransition] = useTransition();
  const [values, setValues] = useState<CheckoutFormValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(initialValues.paymentMethod);
  const [items] = useState<CheckoutLineItem[]>(sampleCartItems);

  const summary = useMemo(() => getSummary(items), [items]);
  const itemCount = useMemo(() => items.reduce((total, item) => total + item.quantity, 0), [items]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    setFormSuccess("");

    const payload: CheckoutFormValues = {
      ...values,
      paymentMethod,
    };

    const validation = validateCheckout(payload);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});

    startTransition(() => {
      setFormSuccess("Checkout details saved. Payment integration will be connected next.");
    });
  }

  return (
    <main className="min-h-screen overflow-x-hidden text-[#111111]">
      <section className="mx-auto w-full max-w-[1520px] px-4 pb-8 pt-8 sm:px-6 lg:px-10">
        <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white/80 px-6 py-8 shadow-[0_18px_50px_rgba(0,0,0,0.08)] sm:px-8 lg:px-10">
          <div className="flex flex-col gap-3">
            <span className="inline-flex w-fit items-center rounded-full border border-black/10 bg-[#d7ff1f] px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-black">
              Checkout
            </span>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-2">
                <h1 className="text-4xl font-black uppercase tracking-[-0.08em] sm:text-5xl">Secure checkout</h1>
                <p className="max-w-3xl text-sm uppercase tracking-[0.24em] text-black/45">
                  Complete shipping and payment details before placing your order
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/cart"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-black/15 px-5 text-sm font-black uppercase tracking-[0.18em] text-black transition duration-200 hover:bg-black/5"
                >
                  Back to cart
                </Link>
                <Link
                  href="/products"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-[#d7ff1f] px-5 text-sm font-black uppercase tracking-[0.18em] text-black transition duration-200 hover:bg-[#e7ff41]"
                >
                  Continue shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1520px] px-4 pb-12 sm:px-6 lg:px-10">
        {formError ? (
          <div className="mb-6 rounded-[1.5rem] border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
            {formError}
          </div>
        ) : null}

        {formSuccess ? (
          <div className="mb-6 rounded-[1.5rem] border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-700">
            {formSuccess}
          </div>
        ) : null}

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <div className="rounded-[1.75rem] border border-black/10 bg-white/80 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.08)] sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-black/45">Step 1</p>
                  <h2 className="mt-1 text-2xl font-black uppercase tracking-[-0.05em]">Shipping details</h2>
                </div>
                <div className="rounded-full bg-black/5 px-4 py-2 text-sm font-semibold text-black/65">
                  {itemCount} items
                </div>
              </div>

              <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="Customer name"
                    name="customerName"
                    autoComplete="name"
                    placeholder="John Doe"
                    value={values.customerName}
                    error={errors.customerName}
                    onChange={(event) => setValues((current) => ({ ...current, customerName: event.target.value }))}
                  />
                  <Input
                    label="Customer phone"
                    name="customerPhone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+66 8xx xxx xxx"
                    value={values.customerPhone}
                    error={errors.customerPhone}
                    onChange={(event) => setValues((current) => ({ ...current, customerPhone: event.target.value }))}
                  />
                </div>

                <Input
                  label="Customer email"
                  name="customerEmail"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={values.customerEmail}
                  error={errors.customerEmail}
                  onChange={(event) => setValues((current) => ({ ...current, customerEmail: event.target.value }))}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="Shipping first name"
                    name="shippingFirstName"
                    autoComplete="given-name"
                    placeholder="John"
                    value={values.shippingAddress.firstName}
                    error={errors["shippingAddress.firstName"]}
                    onChange={(event) =>
                      setValues((current) => ({
                        ...current,
                        shippingAddress: { ...current.shippingAddress, firstName: event.target.value },
                      }))
                    }
                  />
                  <Input
                    label="Shipping last name"
                    name="shippingLastName"
                    autoComplete="family-name"
                    placeholder="Doe"
                    value={values.shippingAddress.lastName}
                    error={errors["shippingAddress.lastName"]}
                    onChange={(event) =>
                      setValues((current) => ({
                        ...current,
                        shippingAddress: { ...current.shippingAddress, lastName: event.target.value },
                      }))
                    }
                  />
                </div>

                <Input
                  label="Address line 1"
                  name="addressLine1"
                  placeholder="123 Sukhumvit Road"
                  value={values.shippingAddress.addressLine1}
                  error={errors["shippingAddress.addressLine1"]}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      shippingAddress: { ...current.shippingAddress, addressLine1: event.target.value },
                    }))
                  }
                />

                <Input
                  label="Address line 2"
                  name="addressLine2"
                  placeholder="Apartment, suite, etc."
                  value={values.shippingAddress.addressLine2 ?? ""}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      shippingAddress: { ...current.shippingAddress, addressLine2: event.target.value },
                    }))
                  }
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="City"
                    name="city"
                    placeholder="Bangkok"
                    value={values.shippingAddress.city}
                    error={errors["shippingAddress.city"]}
                    onChange={(event) =>
                      setValues((current) => ({
                        ...current,
                        shippingAddress: { ...current.shippingAddress, city: event.target.value },
                      }))
                    }
                  />
                  <Input
                    label="State / Province"
                    name="state"
                    placeholder="Bangkok"
                    value={values.shippingAddress.state ?? ""}
                    onChange={(event) =>
                      setValues((current) => ({
                        ...current,
                        shippingAddress: { ...current.shippingAddress, state: event.target.value },
                      }))
                    }
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="Postal code"
                    name="postalCode"
                    placeholder="10110"
                    value={values.shippingAddress.postalCode}
                    error={errors["shippingAddress.postalCode"]}
                    onChange={(event) =>
                      setValues((current) => ({
                        ...current,
                        shippingAddress: { ...current.shippingAddress, postalCode: event.target.value },
                      }))
                    }
                  />
                  <Input
                    label="Country"
                    name="country"
                    placeholder="Thailand"
                    value={values.shippingAddress.country}
                    error={errors["shippingAddress.country"]}
                    onChange={(event) =>
                      setValues((current) => ({
                        ...current,
                        shippingAddress: { ...current.shippingAddress, country: event.target.value },
                      }))
                    }
                  />
                </div>

                <Input
                  label="Order notes"
                  name="notes"
                  placeholder="Leave the parcel at the front desk."
                  value={values.notes ?? ""}
                  onChange={(event) => setValues((current) => ({ ...current, notes: event.target.value }))}
                />

                <div className="rounded-[1.5rem] border border-black/10 bg-black/5 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-black/45">Step 2</p>
                  <h3 className="mt-2 text-xl font-black uppercase tracking-[-0.04em]">Payment method</h3>
                  <div className="mt-4 grid gap-3">
                    {paymentOptions.map((option) => (
                      <label
                        key={option.value}
                        className={[
                          "flex cursor-pointer items-start gap-4 rounded-[1.25rem] border p-4 transition duration-200",
                          paymentMethod === option.value
                            ? "border-black bg-black text-white"
                            : "border-black/10 bg-white hover:-translate-y-0.5",
                        ].join(" ")}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={option.value}
                          checked={paymentMethod === option.value}
                          onChange={() => setPaymentMethod(option.value)}
                          className="mt-1 h-4 w-4"
                        />
                        <div>
                          <p className="font-black uppercase tracking-[-0.03em]">{option.label}</p>
                          <p className={paymentMethod === option.value ? "text-sm text-white/70" : "text-sm text-black/55"}>
                            {option.description}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.paymentMethod ? (
                    <p className="mt-3 text-sm font-medium text-red-600">{errors.paymentMethod}</p>
                  ) : null}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button type="submit" variant="primary" size="lg" className="rounded-full" disabled={isPending}>
                    {isPending ? "Saving..." : "Continue to payment"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="rounded-full"
                    onClick={() => {
                      setValues(initialValues);
                      setPaymentMethod(initialValues.paymentMethod);
                      setErrors({});
                      setFormError("");
                      setFormSuccess("");
                    }}
                  >
                    Reset
                  </Button>
                </div>
              </form>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[1.75rem] border border-black/10 bg-white/80 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.08)] sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-black/45">Order summary</p>
                  <h2 className="mt-1 text-2xl font-black uppercase tracking-[-0.05em]">Items in cart</h2>
                </div>
                <span className="rounded-full bg-[#d7ff1f] px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-black">
                  Ready
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 rounded-[1.25rem] border border-black/10 bg-white p-4"
                  >
                    <div className="h-16 w-16 overflow-hidden rounded-2xl bg-black/5">
                      <Image src={item.imageUrl} alt={item.name} width={64} height={64} className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-black uppercase tracking-[-0.03em]">{item.name}</p>
                      <p className="text-sm text-black/55">Qty {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black uppercase tracking-[0.22em] text-black/45">Line total</p>
                      <p className="mt-1 text-sm font-black text-black">{formatCurrency(getLineTotal(item))}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3 rounded-[1.5rem] border border-black/10 bg-black/5 p-5">
                <div className="flex items-center justify-between gap-4 text-sm text-black/70">
                  <span>Subtotal</span>
                  <span className="font-black text-black">{formatCurrency(summary.subtotal)}</span>
                </div>
                <div className="flex items-center justify-between gap-4 text-sm text-black/70">
                  <span>Shipping</span>
                  <span className="font-black text-black">
                    {summary.shipping > 0 ? formatCurrency(summary.shipping) : "Free"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4 text-sm text-black/70">
                  <span>Discount</span>
                  <span className="font-black text-black">{summary.discount > 0 ? `- ${formatCurrency(summary.discount)}` : "0"}</span>
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-black/10 pt-3 text-base">
                  <span className="font-bold text-black">Total</span>
                  <span className="text-lg font-black text-black">{formatCurrency(summary.total)}</span>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-black/10 bg-[#111111] p-6 text-white shadow-[0_18px_50px_rgba(0,0,0,0.08)] sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-white/45">Need help?</p>
              <h3 className="mt-2 text-2xl font-black uppercase tracking-[-0.05em]">Checkout tips</h3>
              <div className="mt-5 space-y-3">
                {[
                  "Use a reachable email address so you receive order updates.",
                  "Double-check your shipping address before placing the order.",
                  "Payment integration will be connected after this page.",
                ].map((item) => (
                  <div key={item} className="rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
