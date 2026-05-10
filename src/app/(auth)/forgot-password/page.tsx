"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatDate } from "@/lib/format";

function validateEmail(value: string) {
  const email = value.trim();
  if (!email) {
    return "Email is required.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Email is invalid.";
  }

  return "";
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    startTransition(() => {
      setSuccess(
        "Password reset request UI is ready. We will connect the backend route in the next step."
      );
    });
  }

  return (
    <main className="min-h-screen overflow-x-hidden text-[#111111]">
      <section className="mx-auto flex w-full max-w-[1520px] flex-col gap-8 px-4 py-8 sm:px-6 lg:flex-row lg:px-10">
        <div className="flex-1 rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.08)] sm:p-8 lg:p-10">
          <div className="max-w-xl space-y-4">
            <span className="inline-flex w-fit items-center rounded-full border border-black/10 bg-[#d7ff1f] px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-black">
              Password recovery
            </span>
            <h1 className="text-4xl font-black uppercase tracking-[-0.08em] sm:text-5xl">Forgot password</h1>
            <p className="max-w-2xl text-sm leading-7 text-black/60 sm:text-base">
              Enter your email address and we&apos;ll prepare a reset link flow for your account.
            </p>
          </div>

          <form className="mt-8 max-w-xl space-y-5" onSubmit={handleSubmit}>
            {error ? (
              <div className="rounded-[1.2rem] border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            ) : null}

            {success ? (
              <div className="rounded-[1.2rem] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                {success}
              </div>
            ) : null}

            <Input
              label="Email address"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button type="submit" variant="primary" size="lg" className="rounded-full" disabled={isPending}>
                {isPending ? "Processing..." : "Send reset link"}
              </Button>
              <Link
                href="/login"
                className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 bg-white px-7 text-sm font-black uppercase tracking-[0.18em] text-black transition hover:bg-[#f7f5ef]"
              >
                Back to sign in
              </Link>
            </div>

            <p className="text-sm text-black/55">
              Need a new account?{" "}
              <Link href="/register" className="font-semibold text-black underline underline-offset-4">
                Create one
              </Link>
            </p>
          </form>
        </div>

        <aside className="w-full max-w-xl rounded-[2rem] border border-black/10 bg-[#111111] p-6 text-white shadow-[0_18px_50px_rgba(0,0,0,0.12)] sm:p-8 lg:w-[430px]">
          <div className="space-y-4">
            <span className="inline-flex w-fit items-center rounded-full bg-[#d7ff1f] px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-black">
              Secure recovery
            </span>
            <h2 className="text-3xl font-black uppercase tracking-[-0.08em]">Reset with confidence</h2>
            <p className="text-sm leading-7 text-white/70">
              We will connect the reset email flow, token verification, and new password page in the next steps.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            {[
              "Account recovery via verified email",
              "Prepared for reset token validation",
              "Designed to match the existing auth flow",
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
              Keep this page ready so the backend can plug in without changing the UI.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
