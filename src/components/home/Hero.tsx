import Link from "next/link";

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
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

export function Hero() {
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

export default Hero;

