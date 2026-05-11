"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatDate } from "@/lib/format";
import { validateAddress } from "@/lib/validators";
import type { Address, AddressFormValues } from "@/types/address";

const initialValues: AddressFormValues = {
  label: "Home",
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
  isDefault: true,
};

const sampleAddresses: Address[] = [
  {
    id: 1,
    userId: 1,
    label: "Home",
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
    isDefault: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    userId: 1,
    label: "Office",
    firstName: "John",
    lastName: "Doe",
    email: "john.work@example.com",
    phone: "+66 9xx xxx xxx",
    addressLine1: "88 Rama 9 Road",
    addressLine2: "",
    city: "Bangkok",
    state: "Bangkok",
    postalCode: "10400",
    country: "Thailand",
    isDefault: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

function addressToValues(address: Address): AddressFormValues {
  return {
    label: address.label,
    firstName: address.firstName,
    lastName: address.lastName,
    email: address.email ?? "",
    phone: address.phone,
    addressLine1: address.addressLine1,
    addressLine2: address.addressLine2 ?? "",
    city: address.city,
    state: address.state ?? "",
    postalCode: address.postalCode,
    country: address.country,
    isDefault: address.isDefault,
  };
}

function valuesToAddress(values: AddressFormValues, id: number, nowIso: string): Address {
  return {
    id,
    userId: 1,
    label: values.label.trim(),
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
    email: values.email?.trim() ? values.email.trim() : null,
    phone: values.phone.trim(),
    addressLine1: values.addressLine1.trim(),
    addressLine2: values.addressLine2?.trim() ? values.addressLine2.trim() : null,
    city: values.city.trim(),
    state: values.state?.trim() ? values.state.trim() : null,
    postalCode: values.postalCode.trim(),
    country: values.country.trim(),
    isDefault: Boolean(values.isDefault),
    createdAt: nowIso,
    updatedAt: nowIso,
  };
}

export default function AddressesPage() {
  const [isPending, startTransition] = useTransition();
  const [addresses, setAddresses] = useState<Address[]>(sampleAddresses);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(sampleAddresses[0]?.id ?? null);
  const [values, setValues] = useState<AddressFormValues>(addressToValues(sampleAddresses[0]!));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const selectedAddress = useMemo(
    () => addresses.find((address) => address.id === selectedAddressId) ?? null,
    [addresses, selectedAddressId]
  );

  function handleSelect(address: Address) {
    setSelectedAddressId(address.id);
    setValues(addressToValues(address));
    setErrors({});
    setFormError("");
    setFormSuccess("");
  }

  function handleNewAddress() {
    setSelectedAddressId(null);
    setValues(initialValues);
    setErrors({});
    setFormError("");
    setFormSuccess("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    setFormSuccess("");

    const validation = validateAddress(values);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});

    startTransition(() => {
      const nowIso = new Date().toISOString();
      const nextId = selectedAddressId ?? Math.max(0, ...addresses.map((address) => address.id)) + 1;
      const nextAddress = valuesToAddress(values, nextId, nowIso);

      setAddresses((current) => {
        const others = current.filter((address) => address.id !== nextId);
        const updated = values.isDefault
          ? others.map((address) => ({ ...address, isDefault: false }))
          : others;

        return [...updated, nextAddress];
      });

      if (values.isDefault) {
        setAddresses((current) =>
          current.map((address) => ({
            ...address,
            isDefault: address.id === nextId,
          }))
        );
      }

      setSelectedAddressId(nextId);
      setFormSuccess("Address saved successfully. Backend integration will come next.");
    });
  }

  function handleDelete(addressId: number) {
    setAddresses((current) => {
      const remaining = current.filter((address) => address.id !== addressId);
      if (remaining.length === 0) {
        setSelectedAddressId(null);
        setValues(initialValues);
        return remaining;
      }

      if (selectedAddressId === addressId) {
        const fallback = remaining[0];
        setSelectedAddressId(fallback.id);
        setValues(addressToValues(fallback));
      }

      return remaining;
    });
  }

  return (
    <main className="min-h-screen overflow-x-hidden text-[#111111]">
      <section className="mx-auto w-full max-w-[1520px] px-4 py-8 sm:px-6 lg:px-10">
        <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white/80 shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
          <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
            <aside className="flex flex-col justify-between gap-6 bg-[#111111] p-6 text-white sm:p-8 lg:p-10">
              <div className="space-y-4">
                <span className="inline-flex w-fit items-center rounded-full bg-[#d7ff1f] px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-black">
                  Address book
                </span>
                <h1 className="text-4xl font-black uppercase tracking-[-0.08em] sm:text-5xl">
                  Manage addresses
                </h1>
                <p className="text-sm leading-7 text-white/70">
                  Save shipping details for faster checkout and keep your default destination ready for new orders.
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-white/45">Saved addresses</p>
                  <p className="mt-2 text-3xl font-black">{addresses.length}</p>
                  <p className="mt-2 text-sm leading-7 text-white/70">
                    You can create, edit, and remove addresses from this screen.
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-white/45">Default</p>
                  <p className="mt-2 text-lg font-black">{selectedAddress?.label ?? "No address selected"}</p>
                  <p className="mt-2 text-sm leading-7 text-white/70">
                    {selectedAddress
                      ? `${selectedAddress.firstName} ${selectedAddress.lastName}, ${selectedAddress.city}`
                      : "Select an address to update it or create a new one."}
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
                <Button type="button" variant="outline" size="lg" className="rounded-full border-white/20 text-white" onClick={handleNewAddress}>
                  Add new address
                </Button>
              </div>
            </aside>

            <div className="p-6 sm:p-8 lg:p-10">
              <div className="max-w-3xl space-y-4">
                <span className="inline-flex w-fit items-center rounded-full border border-black/10 bg-[#d7ff1f] px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-black">
                  Address settings
                </span>
                <h2 className="text-4xl font-black uppercase tracking-[-0.08em] sm:text-5xl">
                  Edit shipping address
                </h2>
                <p className="max-w-2xl text-sm leading-7 text-black/60 sm:text-base">
                  Choose a saved address from the list or fill in a new one. This page is ready to connect to the
                  backend next.
                </p>
              </div>

              <div className="mt-8 grid gap-4">
                {addresses.map((address) => (
                  <button
                    key={address.id}
                    type="button"
                    onClick={() => handleSelect(address)}
                    className={[
                      "rounded-[1.5rem] border p-5 text-left transition duration-200",
                      selectedAddressId === address.id
                        ? "border-black bg-black text-white"
                        : "border-black/10 bg-white hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]",
                    ].join(" ")}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-lg font-black uppercase tracking-[-0.04em]">
                          {address.label}
                          {address.isDefault ? " • Default" : ""}
                        </p>
                        <p className={selectedAddressId === address.id ? "mt-1 text-sm text-white/70" : "mt-1 text-sm text-black/55"}>
                          {address.firstName} {address.lastName}
                        </p>
                      </div>

                      <span
                        className={[
                          "rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.22em]",
                          address.isDefault ? "bg-[#d7ff1f] text-black" : "bg-black/5 text-black/60",
                        ].join(" ")}
                      >
                        {address.country}
                      </span>
                    </div>

                    <p className={selectedAddressId === address.id ? "mt-4 text-sm leading-6 text-white/75" : "mt-4 text-sm leading-6 text-black/60"}>
                      {address.addressLine1}
                      {address.addressLine2 ? `, ${address.addressLine2}` : ""}, {address.city}, {address.postalCode}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <span className={selectedAddressId === address.id ? "text-xs font-medium text-white/60" : "text-xs font-medium text-black/45"}>
                        Updated {formatDate(address.updatedAt)}
                      </span>
                      <span className={selectedAddressId === address.id ? "text-xs font-medium text-white/60" : "text-xs font-medium text-black/45"}>
                        {address.email ?? "No email"}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleDelete(address.id);
                        }}
                        className={[
                          "rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.18em] transition duration-200",
                          selectedAddressId === address.id
                            ? "border-white/20 text-white hover:bg-white/10"
                            : "border-black/10 text-black hover:bg-black/5",
                        ].join(" ")}
                      >
                        Delete
                      </button>
                    </div>
                  </button>
                ))}
              </div>

              <form className="mt-8 max-w-3xl space-y-5" onSubmit={handleSubmit}>
                {formError ? (
                  <div className="rounded-[1.2rem] border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {formError}
                  </div>
                ) : null}

                {formSuccess ? (
                  <div className="rounded-[1.2rem] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                    {formSuccess}
                  </div>
                ) : null}

                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="Label"
                    name="label"
                    placeholder="Home"
                    value={values.label}
                    error={errors.label}
                    onChange={(event) => setValues((current) => ({ ...current, label: event.target.value }))}
                  />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={values.email ?? ""}
                    error={errors.email}
                    onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="First name"
                    name="firstName"
                    autoComplete="given-name"
                    placeholder="John"
                    value={values.firstName}
                    error={errors.firstName}
                    onChange={(event) => setValues((current) => ({ ...current, firstName: event.target.value }))}
                  />
                  <Input
                    label="Last name"
                    name="lastName"
                    autoComplete="family-name"
                    placeholder="Doe"
                    value={values.lastName}
                    error={errors.lastName}
                    onChange={(event) => setValues((current) => ({ ...current, lastName: event.target.value }))}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="Phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+66 8xx xxx xxx"
                    value={values.phone}
                    error={errors.phone}
                    onChange={(event) => setValues((current) => ({ ...current, phone: event.target.value }))}
                  />
                  <Input
                    label="Address line 1"
                    name="addressLine1"
                    placeholder="123 Sukhumvit Road"
                    value={values.addressLine1}
                    error={errors.addressLine1}
                    onChange={(event) =>
                      setValues((current) => ({ ...current, addressLine1: event.target.value }))
                    }
                  />
                </div>

                <Input
                  label="Address line 2"
                  name="addressLine2"
                  placeholder="Apartment, suite, etc."
                  value={values.addressLine2 ?? ""}
                  onChange={(event) => setValues((current) => ({ ...current, addressLine2: event.target.value }))}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="City"
                    name="city"
                    placeholder="Bangkok"
                    value={values.city}
                    error={errors.city}
                    onChange={(event) => setValues((current) => ({ ...current, city: event.target.value }))}
                  />
                  <Input
                    label="State / Province"
                    name="state"
                    placeholder="Bangkok"
                    value={values.state ?? ""}
                    onChange={(event) => setValues((current) => ({ ...current, state: event.target.value }))}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="Postal code"
                    name="postalCode"
                    placeholder="10110"
                    value={values.postalCode}
                    error={errors.postalCode}
                    onChange={(event) => setValues((current) => ({ ...current, postalCode: event.target.value }))}
                  />
                  <Input
                    label="Country"
                    name="country"
                    placeholder="Thailand"
                    value={values.country}
                    error={errors.country}
                    onChange={(event) => setValues((current) => ({ ...current, country: event.target.value }))}
                  />
                </div>

                <label className="flex items-center gap-3 text-sm font-medium text-black/70">
                  <input
                    type="checkbox"
                    checked={Boolean(values.isDefault)}
                    onChange={(event) => setValues((current) => ({ ...current, isDefault: event.target.checked }))}
                    className="h-4 w-4 rounded border-black/20"
                  />
                  Set as default address
                </label>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button type="submit" variant="primary" size="lg" className="rounded-full" disabled={isPending}>
                    {isPending ? "Saving..." : "Save address"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="rounded-full"
                    onClick={() => {
                      if (selectedAddress) {
                        setValues(addressToValues(selectedAddress));
                      } else {
                        setValues(initialValues);
                      }
                      setErrors({});
                      setFormError("");
                      setFormSuccess("");
                    }}
                  >
                    Reset
                  </Button>
                </div>

                <p className="text-sm text-black/55">
                  Need to update your personal details instead?{" "}
                  <Link href="/profile" className="font-semibold text-black underline underline-offset-4">
                    Go to profile
                  </Link>
                  .
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
