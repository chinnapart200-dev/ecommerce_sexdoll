import type { ReactNode } from "react";
import Link from "next/link";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/home/Hero";
import { getSiteUrl } from "@/lib/site";

type ProductTone = "lime" | "orange" | "rose" | "sky" | "forest" | "violet";
type VisualTone = ProductTone | "electric" | "pink";

type Product = {
  name: string;
  price: string;
  oldPrice?: string;
  badge?: string;
  tone: ProductTone;
  swatches: string[];
};

type Category = {
  name: string;
  tone: VisualTone;
  accent: string;
  subtitle: string;
};

type Step = {
  title: string;
  text: string;
  index: string;
};

const siteUrl = getSiteUrl();

const heroCollections = [
  {
    title: "WOMAN COLLECTION",
    subtitle: "Trendy outfits for every moment.",
    cta: "SHOP WOMAN",
    tone: "lime",
  },
  {
    title: "MAN'S COLLECTION",
    subtitle: "Effortless style for the modern man.",
    cta: "SHOP MAN",
    tone: "electric",
  },
  {
    title: "KID'S COLLECTION",
    subtitle: "Fun, comfy and colorful for little trendsetters.",
    cta: "SHOP KIDS",
    tone: "pink",
  },
] as const;

const latestProducts: Product[] = [
  {
    name: "Embroidered Cotton Blouse",
    price: "$99.00",
    tone: "lime",
    badge: "NEW",
    swatches: ["#7bcf2b", "#1b1b1b", "#d7ff1f"],
  },
  {
    name: "Floral Print Shirt",
    price: "$120.00",
    oldPrice: "$149.00",
    tone: "orange",
    badge: "-15%",
    swatches: ["#f97316", "#eab308", "#e5e7eb"],
  },
  {
    name: "Flower Long Kimono",
    price: "$89.00",
    tone: "rose",
    swatches: ["#ef4444", "#1f2937", "#f9fafb"],
  },
  {
    name: "Classic Cotton Tank",
    price: "$39.00",
    tone: "sky",
    badge: "NEW",
    swatches: ["#60a5fa", "#111827", "#94a3b8"],
  },
  {
    name: "Utility Oversized Jacket",
    price: "$159.00",
    oldPrice: "$199.00",
    tone: "forest",
    badge: "-20%",
    swatches: ["#84cc16", "#3f6212", "#f8fafc"],
  },
  {
    name: "Off-Shoulder Top",
    price: "$79.00",
    tone: "violet",
    swatches: ["#2563eb", "#dc2626", "#f8fafc"],
  },
];

const secondLatestProducts: Product[] = [
  {
    name: "Embroidered Cotton Blouse",
    price: "$99.00",
    tone: "lime",
    swatches: ["#7bcf2b", "#1b1b1b", "#d7ff1f"],
  },
  {
    name: "Floral Print Shirt",
    price: "$120.00",
    oldPrice: "$149.00",
    tone: "orange",
    swatches: ["#f97316", "#eab308", "#e5e7eb"],
  },
  {
    name: "Flower Long Kimono",
    price: "$89.00",
    tone: "rose",
    swatches: ["#ef4444", "#1f2937", "#f9fafb"],
  },
  {
    name: "Classic Cotton Tank",
    price: "$39.00",
    tone: "sky",
    swatches: ["#60a5fa", "#111827", "#94a3b8"],
  },
  {
    name: "Utility Oversized Jacket",
    price: "$159.00",
    oldPrice: "$199.00",
    tone: "forest",
    swatches: ["#84cc16", "#3f6212", "#f8fafc"],
  },
  {
    name: "Linen Button Shirt",
    price: "$69.00",
    tone: "orange",
    swatches: ["#f97316", "#2563eb", "#f8fafc"],
  },
];

const categories: Category[] = [
  {
    name: "FURNITURE",
    tone: "rose",
    accent: "chair",
    subtitle: "Soft shapes for bold rooms.",
  },
  {
    name: "SHOES",
    tone: "electric",
    accent: "shoes",
    subtitle: "Street-ready silhouettes.",
  },
  {
    name: "CLOTHING",
    tone: "lime",
    accent: "shirt",
    subtitle: "Daily pieces with attitude.",
  },
  {
    name: "BAGS",
    tone: "pink",
    accent: "bag",
    subtitle: "Carry the look everywhere.",
  },
  {
    name: "ACCESSORIES",
    tone: "violet",
    accent: "glasses",
    subtitle: "Finish with sharp details.",
  },
];

const howWeWork: Step[] = [
  {
    index: "01.",
    title: "CHOOSE PRODUCTS",
    text: "Browse hundreds of items from top categories and pick the look that fits your day.",
  },
  {
    index: "02.",
    title: "SECURE PAYMENT",
    text: "Checkout in a clean, safe flow with the payment methods you trust most.",
  },
  {
    index: "03.",
    title: "FAST DELIVERY",
    text: "We prepare your order quickly and send it straight to your door.",
  },
];

const instagramTiles = [
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
] as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "WOODMART Style Ecommerce",
      url: siteUrl,
      logo: `${siteUrl}/favicon.ico`,
    },
    {
      "@type": "WebSite",
      name: "WOODMART Style Ecommerce",
      url: siteUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/products?search={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "WebPage",
      name: "Home",
      url: siteUrl,
      description:
        "Premium ecommerce storefront inspired by WOODMART with a bold fashion-first layout for product discovery and conversion.",
    },
  ],
};

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
      <path d="M4 8.5 12 4l8 4.5-8 4.5L4 8.5Zm0 0v7l8 4.5 8-4.5v-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
      <rect x="3.5" y="5" width="17" height="14" rx="2.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4.8 9h14.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
      <path d="M3.5 8.5h11v7h-11zM14.5 11h3l3 3v1.5h-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="8" cy="18.5" r="1.7" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="18" cy="18.5" r="1.7" fill="none" stroke="currentColor" strokeWidth="1.6" />
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

function SectionTitle({ title, action }: { title: string; action: string }) {
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
        <span>{action}</span>
        <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

function ToneFrame({ tone }: { tone: VisualTone }) {
  const styleMap: Record<VisualTone, string> = {
    lime: "from-[#e8ff4d] via-[#b9f21d] to-[#f7ffcf]",
    orange: "from-[#ffd8a8] via-[#ff8a3d] to-[#fff1e0]",
    rose: "from-[#ffc6e8] via-[#ff53c4] to-[#ffe2f3]",
    sky: "from-[#d4e7ff] via-[#6ea8ff] to-[#f0f7ff]",
    forest: "from-[#d9f3ae] via-[#7abf29] to-[#eefad6]",
    violet: "from-[#d3d5ff] via-[#6a72ff] to-[#f2f4ff]",
    electric: "from-[#d9e0ff] via-[#4256ff] to-[#eef1ff]",
    pink: "from-[#ffd1ef] via-[#ff4fc8] to-[#ffe3f5]",
  };

  return <div className={`absolute inset-0 bg-gradient-to-br ${styleMap[tone]}`} />;
}

function CategoryCard({ category }: { category: Category }) {
  return (
    <article className="group relative min-h-[180px] overflow-hidden rounded-[1.5rem] border border-black/10 bg-white/80 p-4 shadow-[0_18px_40px_rgba(0,0,0,0.08)] backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.12)]">
      <ToneFrame tone={category.tone} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.65),transparent_22%),linear-gradient(135deg,rgba(255,255,255,0.22),rgba(255,255,255,0))]" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="max-w-[70%] space-y-2">
          <p className="text-[0.65rem] font-black uppercase tracking-[0.34em] text-black/60">{category.accent}</p>
          <h3 className="text-2xl font-black uppercase tracking-[-0.05em] text-[#111111]">{category.name}</h3>
          <p className="text-sm leading-6 text-black/70">{category.subtitle}</p>
        </div>
        <div className="flex items-end justify-between">
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-black/70">Shop now</div>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-[0.8rem] bg-[#111111] text-white transition hover:-translate-y-0.5"
            aria-label={`Open ${category.name}`}
          >
            <ArrowIcon />
          </button>
        </div>
      </div>
    </article>
  );
}

function SocialTile({ src, index }: { src: string; index: number }) {
  return (
    <div
      className="group relative aspect-square overflow-hidden rounded-[1.25rem] border border-black/10 bg-white/80 shadow-[0_16px_30px_rgba(0,0,0,0.09)]"
      role="img"
      aria-label={`Instagram look ${index + 1}`}
    >
      <div
        className="h-full w-full bg-cover bg-center transition duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url("${src}")` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/28 via-transparent to-transparent opacity-80" />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="mx-auto w-full max-w-[1520px] px-4 pb-8 pt-5 sm:px-6 lg:px-10">
      <div className="relative overflow-hidden rounded-[2.2rem] border border-black/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(255,255,255,0.58))] px-5 py-6 shadow-[0_24px_80px_rgba(0,0,0,0.08)] sm:px-8 sm:py-8 lg:px-10 lg:py-10">
        <div className="absolute left-6 top-7 hidden rounded-full border border-black/10 bg-white/80 px-3 py-1 text-[11px] font-black uppercase tracking-[0.28em] text-[#2d2d2d] lg:block">
          New season. New vibes.
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-4">
              <div className="hidden h-px w-20 bg-black/15 lg:block" />
              <p className="text-[0.72rem] font-black uppercase tracking-[0.38em] text-[#6b6258]">
                Bold looks that speak louder
              </p>
            </div>

            <div className="space-y-3">
              <h1 className="max-w-[10ch] text-[clamp(4.8rem,14vw,10.5rem)] font-black uppercase leading-[0.83] tracking-[-0.09em] text-[#111111] drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
                Color
              </h1>
              <p className="max-w-2xl text-[clamp(1rem,1.3vw,1.2rem)] font-semibold uppercase tracking-[0.18em] text-[#111111]">
                New season. New vibes.
                <span className="ml-2 text-[#ff42c5]">Bold looks that speak louder.</span>
              </p>
            </div>

            <p className="max-w-xl text-base leading-8 text-[#4d4a44] sm:text-lg">
              WOODMART-style fashion retail with a premium look, bright accent colors, and a layout built to keep the
              spotlight on product discovery.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/products"
                className="group inline-flex items-center gap-3 rounded-full bg-[#d7ff1f] px-7 py-4 text-sm font-black uppercase tracking-[0.2em] text-black shadow-[0_18px_35px_rgba(215,255,31,0.35)] transition hover:-translate-y-0.5"
              >
                <span>Explore collection</span>
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-3 rounded-full border border-black/15 bg-white/90 px-7 py-4 text-sm font-black uppercase tracking-[0.2em] text-black transition hover:-translate-y-0.5 hover:bg-white"
              >
                Shop now
              </Link>
            </div>
          </div>

          <div className="relative min-h-[580px] lg:min-h-[680px]">
            <button
              type="button"
              className="absolute left-0 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-black/10 bg-white/90 text-black shadow-[0_18px_40px_rgba(0,0,0,0.12)]"
              aria-label="Previous slide"
            >
              <ArrowIcon className="h-4 w-4 rotate-180" />
            </button>
            <button
              type="button"
              className="absolute right-0 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-black/10 bg-white/90 text-black shadow-[0_18px_40px_rgba(0,0,0,0.12)]"
              aria-label="Next slide"
            >
              <ArrowIcon className="h-4 w-4" />
            </button>

            <div className="absolute inset-0">
              <div className="absolute left-[10%] top-[9%] h-[46%] w-[54%] rounded-[3rem] border-[16px] border-[#ff42c5] opacity-95 shadow-[0_0_60px_rgba(255,66,197,0.22)]" />
              <div className="absolute right-[10%] top-[13%] h-[25%] w-[18%] rounded-full bg-[#d7ff1f]/35 blur-[80px]" />
              <div className="absolute left-[4%] top-[28%] h-[16%] w-[8px] rounded-full bg-[#d7ff1f]" />
              <div className="absolute right-[8%] top-[9%] h-[10px] w-[10px] rounded-full bg-[#ff42c5]" />
              <div className="absolute right-[8%] top-[28%] grid h-20 w-20 place-items-center rounded-[1.8rem] border border-black/10 bg-white/75 shadow-[0_18px_50px_rgba(0,0,0,0.12)]">
                <span className="text-3xl font-light text-black/75">+</span>
              </div>
              <div className="absolute bottom-[3%] right-[2%] h-[12px] w-[12px] rounded-full bg-[#111111]" />
              <div className="absolute inset-x-[6%] bottom-[8%] h-[12px] rounded-full bg-white/25 blur-2xl" />
            </div>

            <div className="relative z-10 h-full rounded-[2rem]">
              <FashionHeroFigure />
              <div className="absolute right-[5%] top-[17%] w-[280px] rounded-[1.6rem] border border-black/10 bg-white/85 p-5 shadow-[0_25px_60px_rgba(0,0,0,0.14)] backdrop-blur-lg">
                <span className="inline-flex rounded-full bg-[#f7e8ff] px-3 py-1 text-[10px] font-black uppercase tracking-[0.26em] text-[#ff42c5]">
                  New in
                </span>
                <h2 className="mt-4 text-4xl font-black uppercase tracking-[-0.08em] text-[#111111]">
                  Spring / Summer
                </h2>
                <p className="mt-2 text-sm uppercase tracking-[0.24em] text-[#4a4742]">Collection 2024</p>
                <Link
                  href="/products"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#111111] px-5 py-3 text-xs font-black uppercase tracking-[0.22em] text-white transition hover:bg-black"
                >
                  Discover
                  <ArrowIcon className="h-4 w-4" />
                </Link>
              </div>
              <div className="absolute left-[4%] bottom-[12%] hidden w-[210px] rounded-[1.4rem] border border-black/10 bg-[#d7ff1f] p-5 shadow-[0_25px_55px_rgba(0,0,0,0.1)] lg:block">
                <p className="text-[11px] font-black uppercase tracking-[0.28em] text-black/55">New in</p>
                <p className="mt-3 text-3xl font-black uppercase tracking-[-0.06em] text-black">Bold looks</p>
                <p className="mt-2 text-sm leading-6 text-black/75">Seasonal freshness with a strong retail punch.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryPromos() {
  return (
    <section className="mx-auto w-full max-w-[1520px] px-4 pb-10 sm:px-6 lg:px-10">
      <div className="grid gap-4 md:grid-cols-3">
        {heroCollections.map((collection) => (
          <article
            key={collection.title}
            className="group relative overflow-hidden rounded-[1.8rem] border border-black/10 bg-white/85 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.1)] transition hover:-translate-y-1"
          >
            <div
              className={`absolute inset-0 ${
                collection.tone === "lime"
                  ? "bg-[linear-gradient(135deg,#e7ff41,#bdf400)]"
                  : collection.tone === "electric"
                    ? "bg-[linear-gradient(135deg,#3348ff,#5e7bff)]"
                    : "bg-[linear-gradient(135deg,#ff5ccf,#ff95c9)]"
              }`}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_25%,rgba(255,255,255,0.35),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(0,0,0,0.06))]" />
            <div className="relative flex min-h-[210px] flex-col justify-between">
              <div className="max-w-[55%]">
                <h3 className="text-3xl font-black uppercase tracking-[-0.07em] text-black">{collection.title}</h3>
                <p className="mt-3 text-sm leading-6 text-black/75">{collection.subtitle}</p>
              </div>
              <div className="flex items-end justify-between">
                <Link
                  href="/products"
                  className="group inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.24em] text-black"
                >
                  <span>{collection.cta}</span>
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <div className="relative h-28 w-28">
                  <span className="absolute inset-0 rounded-full bg-white/24 blur-md" />
                  <span className="absolute inset-x-3 bottom-0 top-6 rounded-[40%_40%_28%_28%] bg-white/45" />
                  <span className="absolute inset-x-9 top-4 h-10 rounded-full bg-black/14" />
                  <span className="absolute bottom-2 left-5 h-16 w-6 rounded-full bg-black/12" />
                  <span className="absolute bottom-2 right-5 h-16 w-6 rounded-full bg-black/12" />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function CategorySection() {
  return (
    <section className="mx-auto w-full max-w-[1520px] px-4 pb-12 sm:px-6 lg:px-10">
      <SectionTitle title="Top Categories" action="View all categories" />
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {categories.map((category) => (
          <CategoryCard key={category.name} category={category} />
        ))}
      </div>
    </section>
  );
}

function HowWeWorkSection() {
  return (
    <section className="mx-auto w-full max-w-[1520px] px-4 pb-12 sm:px-6 lg:px-10">
      <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
        <div className="space-y-4">
          <SectionTag>Follow collection</SectionTag>
          <h2 className="max-w-[8ch] text-4xl font-black uppercase tracking-[-0.08em] text-[#111111] sm:text-5xl">
            How we work
          </h2>
          <p className="max-w-sm text-base leading-8 text-[#5f5950]">
            A simple customer flow that feels premium from browsing to delivery.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {howWeWork.map((step) => (
            <article
              key={step.index}
              className="rounded-[1.6rem] border border-black/10 bg-white/85 p-6 shadow-[0_18px_42px_rgba(0,0,0,0.08)] backdrop-blur-sm"
            >
              <div className="flex items-start justify-between">
                <span className="text-4xl font-black tracking-[-0.08em] text-[#d7ff1f] drop-shadow-[0_2px_0_rgba(0,0,0,0.15)]">
                  {step.index}
                </span>
                <span className="grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-[#f7f5ef] text-[#111111]">
                  {step.index === "01." ? <BoxIcon /> : step.index === "02." ? <CardIcon /> : <TruckIcon />}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-black uppercase tracking-[-0.05em] text-[#111111]">{step.title}</h3>
              <p className="mt-3 max-w-sm text-sm leading-7 text-[#5d5850]">{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function InstagramSection() {
  return (
    <section className="mx-auto w-full max-w-[1520px] px-4 pb-12 sm:px-6 lg:px-10">
      <div className="grid gap-4 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="rounded-[1.8rem] border border-black/10 bg-[#111111] p-6 text-white shadow-[0_18px_42px_rgba(0,0,0,0.18)]">
          <SectionTag>Follow us</SectionTag>
          <h2 className="mt-5 text-3xl font-black uppercase tracking-[-0.07em] sm:text-4xl">
            Woodmart on Instagram
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/70">
            Curated outfits, editorial style notes, and bright visual energy to keep your storefront feeling alive.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#d7ff1f] px-6 py-4 text-sm font-black uppercase tracking-[0.2em] text-black transition hover:-translate-y-0.5"
          >
            Follow @woodmart
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {instagramTiles.map((src, index) => (
            <SocialTile key={src} src={src} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FashionHeroFigure() {
  return (
    <div className="relative h-[580px] overflow-hidden rounded-[2rem] lg:h-[680px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.95),rgba(245,242,236,0.4)_35%,rgba(235,229,221,0.85)),linear-gradient(135deg,#f7f4ef,#efebe4)]" />
      <div className="absolute left-[12%] top-[14%] h-[60%] w-[56%] rounded-[40px] border-[18px] border-[#ff42c5] shadow-[0_0_60px_rgba(255,66,197,0.2)]" />
      <div className="absolute left-[25%] top-[8%] h-[18%] w-[20%] rounded-full bg-[#26201d] shadow-[0_14px_25px_rgba(0,0,0,0.15)]" />
      <div className="absolute left-[28%] top-[11%] h-[12%] w-[12%] rounded-[999px] bg-[#caa48f]" />
      <div className="absolute left-[31%] top-[14%] h-[5%] w-[18%] -rotate-6 rounded-full bg-[#111111]" />
      <div className="absolute left-[21%] top-[22%] h-[48%] w-[38%] rounded-[45%_45%_25%_25%] bg-[radial-gradient(circle_at_50%_30%,#ffd4bf,#d7826f_55%,#3d2632_100%)] shadow-[0_25px_65px_rgba(0,0,0,0.12)]" />
      <div className="absolute left-[18%] top-[30%] h-[34%] w-[42%] rounded-[36px] bg-[linear-gradient(180deg,rgba(255,66,197,0.9),rgba(103,95,255,0.95))] shadow-[0_25px_70px_rgba(82,66,255,0.35)]" />
      <div className="absolute left-[16%] top-[28%] h-[38%] w-[45%] rounded-[38px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.48),rgba(255,255,255,0.1))]" />
      <div className="absolute left-[11%] top-[26%] h-[48%] w-[16%] -rotate-12 rounded-[999px] bg-[linear-gradient(180deg,rgba(241,79,210,0.95),rgba(103,95,255,0.95))] shadow-[0_20px_55px_rgba(255,66,197,0.28)]" />
      <div className="absolute right-[20%] top-[28%] h-[38%] w-[18%] rotate-12 rounded-[999px] bg-[linear-gradient(180deg,rgba(241,79,210,0.95),rgba(103,95,255,0.95))] shadow-[0_20px_55px_rgba(255,66,197,0.28)]" />
      <div className="absolute left-[35%] top-[29%] h-[18%] w-[26%] rounded-[30px] border border-white/25 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,255,255,0.08))] blur-[0.3px]" />
      <div className="absolute left-[37%] top-[42%] h-[22%] w-[18%] rounded-[999px] bg-[#121212] opacity-90" />
      <div className="absolute right-[18%] top-[25%] h-[28%] w-[24%] rounded-[28px] bg-[linear-gradient(135deg,#111111,#202020)] shadow-[0_25px_45px_rgba(0,0,0,0.2)]" />
      <div className="absolute right-[13%] top-[20%] h-[12px] w-[12px] rounded-full bg-[#ff42c5]" />
      <div className="absolute bottom-[10%] left-[12%] h-[18%] w-[76%] rounded-[48%_48%_18%_18%] bg-[linear-gradient(180deg,rgba(255,255,255,0.6),rgba(255,255,255,0.05))]" />
      <div className="absolute bottom-[8%] left-[30%] h-[7%] w-[6%] rounded-full bg-[#111111]" />
      <div className="absolute bottom-[8%] right-[34%] h-[7%] w-[6%] rounded-full bg-[#111111]" />
      <div className="absolute inset-x-[8%] bottom-[3%] h-[12%] rounded-full bg-white/30 blur-2xl" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="page-shell min-h-screen overflow-x-hidden text-[#111111]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <Hero />
      <CategoryPromos />
      <FeaturedProducts title="Latest Products" products={latestProducts} />
      <CategorySection />
      <FeaturedProducts title="Latest Products" products={secondLatestProducts} />
      <HowWeWorkSection />
      <InstagramSection />
      <Footer />
    </main>
  );
}
