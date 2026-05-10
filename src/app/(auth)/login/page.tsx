"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatDate } from "@/lib/format";
import { validateLogin } from "@/lib/validators";
import type { LoginFormValues } from "@/types/user";
import type { ApiResponse } from "@/types/api";

type LoginResponse = ApiResponse<{
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}>;

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [values, setValues] = useState<LoginFormValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    setFormSuccess("");

    const validation = validateLogin(values);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = (await response.json()) as LoginResponse;

      if (!response.ok || !result.success) {
        throw new Error(!result.success ? result.message : "Unable to sign in.");
      }

      setFormSuccess("Signed in successfully. Redirecting...");
      startTransition(() => {
        router.push("/account");
        router.refresh();
      });
    } catch (submitError) {
      setFormError(submitError instanceof Error ? submitError.message : "Unable to sign in.");
    }
  }

  return (
    <main className="min-h-screen overflow-x-hidden text-[#111111]">
      <section className="mx-auto flex w-full max-w-[1520px] flex-col gap-8 px-4 py-8 sm:px-6 lg:flex-row lg:px-10">
        <div className="flex-1 rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.08)] sm:p-8 lg:p-10">
          <div className="max-w-xl space-y-4">
            <span className="inline-flex w-fit items-center rounded-full border border-black/10 bg-[#d7ff1f] px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-black">
              Account access
            </span>
            <h1 className="text-4xl font-black uppercase tracking-[-0.08em] sm:text-5xl">Sign in</h1>
            <p className="max-w-2xl text-sm leading-7 text-black/60 sm:text-base">
              Access your account to track orders, save addresses, and continue checkout faster.
            </p>
          </div>

          <form className="mt-8 max-w-xl space-y-5" onSubmit={handleSubmit}>
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
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={values.password}
              error={errors.password}
              onChange={(event) => setValues((current) => ({ ...current, password: event.target.value }))}
            />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label className="flex items-center gap-2 text-sm text-black/65">
                <input type="checkbox" className="h-4 w-4 rounded border-black/20" />
                Remember me
              </label>
              <Link href="/forgot-password" className="text-sm font-semibold text-black underline underline-offset-4">
                Forgot password?
              </Link>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button type="submit" variant="primary" size="lg" className="rounded-full" disabled={isPending}>
                {isPending ? "Signing in..." : "Sign in"}
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
              New here?{" "}
              <Link href="/register" className="font-semibold text-black underline underline-offset-4">
                Create an account
              </Link>
            </p>
          </form>
        </div>

        <aside className="w-full max-w-xl rounded-[2rem] border border-black/10 bg-[#111111] p-6 text-white shadow-[0_18px_50px_rgba(0,0,0,0.12)] sm:p-8 lg:w-[430px]">
          <div className="space-y-4">
            <span className="inline-flex w-fit items-center rounded-full bg-[#d7ff1f] px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-black">
              Why sign in
            </span>
            <h2 className="text-3xl font-black uppercase tracking-[-0.08em]">Fast checkout, better tracking</h2>
            <p className="text-sm leading-7 text-white/70">
              Your account will keep your saved details ready for the next purchase and help us personalize the experience.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            {[
              "Track your orders in one place",
              "Save addresses for faster checkout",
              "Receive order and shipping updates",
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
              Sign in now to continue your order flow from where you left off.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
