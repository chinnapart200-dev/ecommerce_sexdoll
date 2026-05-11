"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatDate } from "@/lib/format";

type ProfileFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatarUrl: string;
};

const initialValues: ProfileFormValues = {
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  phone: "+66 8xx xxx xxx",
  avatarUrl: "",
};

function validateProfile(values: ProfileFormValues) {
  const errors: Record<string, string> = {};

  if (!values.firstName.trim()) {
    errors.firstName = "First name is required.";
  }

  if (!values.lastName.trim()) {
    errors.lastName = "Last name is required.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Email is invalid.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Phone is required.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export default function ProfilePage() {
  const [isPending, startTransition] = useTransition();
  const [values, setValues] = useState<ProfileFormValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    setFormSuccess("");

    const validation = validateProfile(values);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});

    startTransition(() => {
      setFormSuccess("Profile updated successfully. Backend sync will be connected next.");
    });
  }

  return (
    <main className="min-h-screen overflow-x-hidden text-[#111111]">
      <section className="mx-auto w-full max-w-[1520px] px-4 py-8 sm:px-6 lg:px-10">
        <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white/80 shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="max-w-3xl space-y-4">
                <span className="inline-flex w-fit items-center rounded-full border border-black/10 bg-[#d7ff1f] px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-black">
                  Profile settings
                </span>
                <h1 className="text-4xl font-black uppercase tracking-[-0.08em] sm:text-5xl">
                  Edit profile
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-black/60 sm:text-base">
                  Update your personal details, contact information, and avatar so your checkout and account experience
                  stays accurate.
                </p>
              </div>

              <form className="mt-8 max-w-2xl space-y-5" onSubmit={handleSubmit}>
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

                <Input
                  label="Email address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={values.email}
                  error={errors.email}
                  onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
                />

                <Input
                  label="Phone number"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+66 8xx xxx xxx"
                  value={values.phone}
                  error={errors.phone}
                  onChange={(event) => setValues((current) => ({ ...current, phone: event.target.value }))}
                />

                <Input
                  label="Avatar URL"
                  name="avatarUrl"
                  type="url"
                  placeholder="https://example.com/avatar.jpg"
                  value={values.avatarUrl}
                  helperText="Optional. Leave blank to use the default avatar."
                  onChange={(event) => setValues((current) => ({ ...current, avatarUrl: event.target.value }))}
                />

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button type="submit" variant="primary" size="lg" className="rounded-full" disabled={isPending}>
                    {isPending ? "Saving..." : "Save profile"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="rounded-full"
                    onClick={() => {
                      setValues(initialValues);
                      setErrors({});
                      setFormError("");
                      setFormSuccess("");
                    }}
                  >
                    Reset
                  </Button>
                </div>

                <p className="text-sm text-black/55">
                  Return to your{" "}
                  <Link href="/account" className="font-semibold text-black underline underline-offset-4">
                    account dashboard
                  </Link>
                  .
                </p>
              </form>
            </div>

            <aside className="flex flex-col justify-between gap-6 bg-[#111111] p-6 text-white sm:p-8 lg:p-10">
              <div className="space-y-4">
                <span className="inline-flex w-fit items-center rounded-full bg-[#d7ff1f] px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-black">
                  Profile preview
                </span>
                <h2 className="text-3xl font-black uppercase tracking-[-0.08em]">Keep your details current</h2>
                <p className="text-sm leading-7 text-white/70">
                  Accurate profile information makes checkout, delivery updates, and order support much smoother.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  "Use a real email for order notifications",
                  "Keep your phone number current for delivery calls",
                  "Add an avatar to personalize your account",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-white/45">Today</p>
                <p className="mt-2 text-2xl font-black">{formatDate(new Date())}</p>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  Your profile settings can be connected to the backend next.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
