import Link from "next/link";
import { formatDate } from "@/lib/format";

const quickLinks = [
  {
    href: "/profile",
    title: "Profile",
    description: "Edit your personal details and contact information.",
  },
  {
    href: "/addresses",
    title: "Addresses",
    description: "Manage saved shipping and billing addresses.",
  },
  {
    href: "/orders",
    title: "Orders",
    description: "Review order history, receipts, and delivery status.",
  },
];

const stats = [
  { label: "Orders", value: "12" },
  { label: "Saved addresses", value: "3" },
  { label: "Wishlist items", value: "8" },
];

export default function AccountPage() {
  const today = formatDate(new Date());

  return (
    <main className="min-h-screen overflow-x-hidden text-[#111111]">
      <section className="mx-auto w-full max-w-[1520px] px-4 py-8 sm:px-6 lg:px-10">
        <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white/80 shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
          <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="max-w-3xl space-y-4">
                <span className="inline-flex w-fit items-center rounded-full border border-black/10 bg-[#d7ff1f] px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-black">
                  Account dashboard
                </span>
                <h1 className="text-4xl font-black uppercase tracking-[-0.08em] sm:text-5xl">
                  Welcome back
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-black/60 sm:text-base">
                  Manage your profile, saved addresses, and order history from one place. This dashboard is the center
                  of your customer account flow.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.5rem] border border-black/10 bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-black/45">{item.label}</p>
                    <p className="mt-2 text-3xl font-black tracking-[-0.05em] text-black">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-4">
                {quickLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group rounded-[1.5rem] border border-black/10 bg-[#111111] p-5 text-white transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-lg font-black uppercase tracking-[-0.04em]">{item.title}</p>
                        <p className="mt-1 max-w-xl text-sm leading-6 text-white/65">{item.description}</p>
                      </div>
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#d7ff1f] text-sm font-black text-black transition-transform duration-200 group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <aside className="flex flex-col justify-between gap-6 bg-[#111111] p-6 text-white sm:p-8 lg:p-10">
              <div className="space-y-4">
                <span className="inline-flex w-fit items-center rounded-full bg-[#d7ff1f] px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-black">
                  Account status
                </span>
                <h2 className="text-3xl font-black uppercase tracking-[-0.08em]">Ready for checkout</h2>
                <p className="text-sm leading-7 text-white/70">
                  Keep your information updated so checkout stays fast and your order notifications stay accurate.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  "Track all purchases in one timeline",
                  "Save multiple addresses for shipping",
                  "Update your details anytime",
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
                <p className="mt-2 text-2xl font-black">{today}</p>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  This is the starting point for your account management flow.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/products"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#d7ff1f] px-7 text-sm font-black uppercase tracking-[0.18em] text-black transition duration-200 hover:bg-[#e7ff41]"
                >
                  Continue shopping
                </Link>
                <Link
                  href="/login"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-7 text-sm font-black uppercase tracking-[0.18em] text-white transition duration-200 hover:bg-white/5"
                >
                  Sign in again
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
