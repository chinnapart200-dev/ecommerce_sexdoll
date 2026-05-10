import Link from "next/link";

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FooterColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="space-y-5">
      <p className="text-sm font-black uppercase tracking-[0.24em] text-white/80">{title}</p>
      <ul className="space-y-3 text-sm text-white/68">
        {items.map((item) => (
          <li key={item}>
            <Link href="/" className="transition hover:text-white">
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-[#111111] text-white">
      <div className="mx-auto w-full max-w-[1520px] px-4 py-14 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.9fr_0.9fr_0.9fr_1.3fr]">
          <div className="space-y-5">
            <Link href="/" className="text-3xl font-black uppercase tracking-[-0.08em]">
              WOODMART<span className="text-[#ff42c5]">.</span>
            </Link>
            <p className="max-w-sm text-sm leading-7 text-white/72">
              WoodMart is a premium ecommerce theme for any kind of online store and marketplace.
            </p>
            <div className="flex gap-3 text-white/60">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10">f</span>
              <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10">x</span>
              <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10">ig</span>
              <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10">yt</span>
            </div>
          </div>

          <FooterColumn
            title="Shop"
            items={["Shop Grid", "Shop List", "Product Page", "Categories", "Wishlist"]}
          />
          <FooterColumn
            title="Information"
            items={["About Us", "Contact Us", "FAQ", "Shipping & Returns", "Privacy Policy"]}
          />
          <FooterColumn
            title="Customer Service"
            items={["My Account", "Order Tracking", "Support Center", "Payment Methods", "Terms & Conditions"]}
          />

          <div className="space-y-5">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-white/80">Newsletter</p>
            <p className="max-w-sm text-sm leading-7 text-white/72">
              Get updates on new products and upcoming sales.
            </p>
            <form className="flex overflow-hidden rounded-full border border-white/10 bg-white/5">
              <input
                type="email"
                placeholder="Your email address"
                className="min-w-0 flex-1 bg-transparent px-5 py-4 text-sm text-white outline-none placeholder:text-white/38"
              />
              <button
                type="submit"
                className="grid shrink-0 place-items-center bg-[#d7ff1f] px-5 text-sm font-black uppercase tracking-[0.18em] text-black transition hover:bg-[#e7ff41]"
                aria-label="Subscribe to newsletter"
              >
                <ArrowIcon className="h-4 w-4" />
              </button>
            </form>
            <div className="flex flex-wrap gap-3 text-xs font-black uppercase tracking-[0.2em] text-white/50">
              <span>Visa</span>
              <span>Mastercard</span>
              <span>PayPal</span>
              <span>Apple Pay</span>
              <span>G Pay</span>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-white/45">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>Copyright 2024 WOODMART. All rights reserved.</p>
            <p>Premium retail storefront concept for phase 1.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

