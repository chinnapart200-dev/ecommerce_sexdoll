import Link from "next/link";
import type { ReactNode } from "react";
import { ProductGrid } from "@/components/product/ProductGrid";
import type { ProductCardData } from "@/components/product/ProductCard";

type FeaturedProductsProps = {
  title: string;
  actionLabel?: string;
  products: ProductCardData[];
};

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SectionTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex w-fit items-center rounded-full border border-black/10 bg-[#d7ff1f] px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-black shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
      {children}
    </span>
  );
}

function SectionTitle({
  title,
  actionLabel = "View all products",
}: {
  title: string;
  actionLabel?: string;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-black/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-3">
        <SectionTag>Follow Collection</SectionTag>
        <h2 className="text-3xl font-black uppercase tracking-[-0.06em] text-[#111111] sm:text-4xl">{title}</h2>
      </div>
      <Link
        href="/products"
        className="group inline-flex items-center gap-2 self-start text-sm font-semibold uppercase tracking-[0.2em] text-[#111111] transition hover:text-[#4c4c4c]"
      >
        <span>{actionLabel}</span>
        <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

export function FeaturedProducts({ title, actionLabel, products }: FeaturedProductsProps) {
  return (
    <section className="mx-auto w-full max-w-[1520px] px-4 pb-12 sm:px-6 lg:px-10">
      <SectionTitle title={title} actionLabel={actionLabel} />
      <ProductGrid products={products} />
    </section>
  );
}

export default FeaturedProducts;
