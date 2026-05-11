"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatDate } from "@/lib/format";

type ResetPasswordFormValues = {
  token: string;
  password: string;
  confirmPassword: string;
};

const initialValues: ResetPasswordFormValues = {
  token: "",
  password: "",
  confirmPassword: "",
};

function validatePassword(values: ResetPasswordFormValues) {
  const errors: Record<string, string> = {};

  if (!values.token.trim()) {
    errors.token = "Reset token is required.";
  }

  if (!values.password.trim()) {
    errors.password = "New password is required.";
  } else if (values.password.trim().length < 8) {
    errors.password = "New password must be at least 8 characters.";
  }

  if (!values.confirmPassword.trim()) {
    errors.confirmPassword = "Confirm password is required.";
  } else if (values.password.trim() !== values.confirmPassword.trim()) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export default function ResetPasswordPage() {
  const [isPending, startTransition] = useTransition();
  const [values, setValues] = useState<ResetPasswordFormValues>({
    ...initialValues,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token") ?? "";

    if (token) {
      setValues((current) => ({
        ...current,
        token,
      }));
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    setFormSuccess("");

    const validation = validatePassword(values);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});

    startTransition(() => {
      setFormSuccess("Your password reset details are ready. Backend flow will be connected next.");
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
            <h1 className="text-4xl font-black uppercase tracking-[-0.08em] sm:text-5xl">Reset password</h1>
            <p className="max-w-2xl text-sm leading-7 text-black/60 sm:text-base">
              Set a new password for your account using the reset token from your email link.
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
              label="Reset token"
              name="token"
              type="text"
              placeholder="Paste the token from your email"
              value={values.token}
              error={errors.token}
              onChange={(event) => setValues((current) => ({ ...current, token: event.target.value }))}
            />

            <Input
              label="New password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="Enter a new password"
              value={values.password}
              error={errors.password}
              helperText="Use at least 8 characters."
              onChange={(event) => setValues((current) => ({ ...current, password: event.target.value }))}
            />

            <Input
              label="Confirm new password"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Repeat the new password"
              value={values.confirmPassword}
              error={errors.confirmPassword}
              onChange={(event) => setValues((current) => ({ ...current, confirmPassword: event.target.value }))}
            />

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button type="submit" variant="primary" size="lg" className="rounded-full" disabled={isPending}>
                {isPending ? "Updating..." : "Reset password"}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="rounded-full"
              onClick={() => {
                setValues({
                  ...initialValues,
                });
                setErrors({});
                setFormError("");
                setFormSuccess("");
                }}
              >
                Reset
              </Button>
            </div>

            <p className="text-sm text-black/55">
              Remembered your password?{" "}
              <Link href="/login" className="font-semibold text-black underline underline-offset-4">
                Sign in
              </Link>
            </p>
          </form>
        </div>

        <aside className="w-full max-w-xl rounded-[2rem] border border-black/10 bg-[#111111] p-6 text-white shadow-[0_18px_50px_rgba(0,0,0,0.12)] sm:p-8 lg:w-[430px]">
          <div className="space-y-4">
            <span className="inline-flex w-fit items-center rounded-full bg-[#d7ff1f] px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-black">
              Security note
            </span>
            <h2 className="text-3xl font-black uppercase tracking-[-0.08em]">Keep your account secure</h2>
            <p className="text-sm leading-7 text-white/70">
              After updating your password, sign back in and review your account details to make sure everything looks right.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            {[
              "Use a strong password you have not used before",
              "Check your inbox for the reset email",
              "The token is usually time-limited for safety",
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
              You can safely continue once the backend reset route is connected.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
