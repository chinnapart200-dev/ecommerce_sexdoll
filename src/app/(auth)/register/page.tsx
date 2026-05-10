"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatDate } from "@/lib/format";
import { validateRegister } from "@/lib/validators";
import type { ApiResponse } from "@/types/api";
import type { RegisterFormValues } from "@/types/user";

type RegisterResponse = ApiResponse<{
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}>;

const initialValues: RegisterFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
};

export default function RegisterPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [values, setValues] = useState<RegisterFormValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    setFormSuccess("");

    const validation = validateRegister(values);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = (await response.json()) as RegisterResponse;

      if (!response.ok || !result.success) {
        throw new Error(!result.success ? result.message : "Unable to create account.");
      }

      setFormSuccess("Account created successfully. Redirecting...");
      startTransition(() => {
        router.push("/account");
        router.refresh();
      });
    } catch (submitError) {
      setFormError(submitError instanceof Error ? submitError.message : "Unable to create account.");
    }
  }

  return (
    <main className="min-h-screen overflow-x-hidden text-[#111111]">
      <section className="mx-auto flex w-full max-w-[1520px] flex-col gap-8 px-4 py-8 sm:px-6 lg:flex-row lg:px-10">
        <div className="flex-1 rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.08)] sm:p-8 lg:p-10">
          <div className="max-w-xl space-y-4">
            <span className="inline-flex w-fit items-center rounded-full border border-black/10 bg-[#d7ff1f] px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-black">
              New account
            </span>
            <h1 className="text-4xl font-black uppercase tracking-[-0.08em] sm:text-5xl">Create account</h1>
            <p className="max-w-2xl text-sm leading-7 text-black/60 sm:text-base">
              Join now to save your details, manage orders, and complete checkout faster next time.
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

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="At least 8 characters"
                value={values.password}
                error={errors.password}
                helperText="Use 8 characters or more."
                onChange={(event) => setValues((current) => ({ ...current, password: event.target.value }))}
              />
              <Input
                label="Confirm password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="Repeat your password"
                value={values.confirmPassword}
                error={errors.confirmPassword}
                onChange={(event) => setValues((current) => ({ ...current, confirmPassword: event.target.value }))}
              />
            </div>

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

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button type="submit" variant="primary" size="lg" className="rounded-full" disabled={isPending}>
                {isPending ? "Creating account..." : "Create account"}
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
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-black underline underline-offset-4">
                Sign in
              </Link>
            </p>
          </form>
        </div>

        <aside className="w-full max-w-xl rounded-[2rem] border border-black/10 bg-[#111111] p-6 text-white shadow-[0_18px_50px_rgba(0,0,0,0.12)] sm:p-8 lg:w-[430px]">
          <div className="space-y-4">
            <span className="inline-flex w-fit items-center rounded-full bg-[#d7ff1f] px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-black">
              Why register
            </span>
            <h2 className="text-3xl font-black uppercase tracking-[-0.08em]">Keep everything in sync</h2>
            <p className="text-sm leading-7 text-white/70">
              A registered account helps you check out faster and gives you a single place to manage your purchases.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            {[
              "Faster checkout with saved details",
              "Manage orders and shipping addresses",
              "Receive updates and confirmations",
            ].map((item) => (
              <div key={item} className="rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85">
                {item}
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-white/45">Today</p>
            <p className="mt-2 text-2xl font-black">{formatDate(new Date())}</p>
            <p className="mt-2 text-sm leading-7 text-white/70">
              Create your account now and continue to shop with less friction.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
