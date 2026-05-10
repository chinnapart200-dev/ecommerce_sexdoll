type ProductTone = "lime" | "orange" | "rose" | "sky" | "forest" | "violet";

export type ProductCardData = {
  name: string;
  price: string;
  oldPrice?: string;
  badge?: string;
  tone: ProductTone;
  swatches: string[];
};

type ProductCardProps = {
  product: ProductCardData;
};

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="M12 20.25s-7.5-4.55-9.4-8.6C.72 8.6 2.2 5.5 5.4 4.7c1.7-.4 3.5.13 4.8 1.42.14.14.27.29.4.45.13-.16.26-.31.4-.45 1.3-1.29 3.1-1.82 4.8-1.42 3.2.8 4.68 3.9 2.8 6.95-1.9 4.05-9.4 8.6-9.4 8.6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ToneFrame({ tone }: { tone: ProductTone }) {
  const styleMap: Record<ProductTone, string> = {
    lime: "from-[#e8ff4d] via-[#b9f21d] to-[#f7ffcf]",
    orange: "from-[#ffd8a8] via-[#ff8a3d] to-[#fff1e0]",
    rose: "from-[#ffc6e8] via-[#ff53c4] to-[#ffe2f3]",
    sky: "from-[#d4e7ff] via-[#6ea8ff] to-[#f0f7ff]",
    forest: "from-[#d9f3ae] via-[#7abf29] to-[#eefad6]",
    violet: "from-[#d3d5ff] via-[#6a72ff] to-[#f2f4ff]",
  };

  return <div className={`absolute inset-0 bg-gradient-to-br ${styleMap[tone]}`} />;
}

function ProductPreview({ tone }: { tone: ProductTone }) {
  const variant = {
    lime: "from-[#f6fff0] via-[#d8ff57] to-[#1d7b23]",
    orange: "from-[#fff0df] via-[#ff9d41] to-[#b44512]",
    rose: "from-[#fff0fa] via-[#ff63c8] to-[#5b1d56]",
    sky: "from-[#f3f8ff] via-[#7ab0ff] to-[#23347f]",
    forest: "from-[#f4ffdd] via-[#8cc83e] to-[#2d5a13]",
    violet: "from-[#f2f0ff] via-[#7380ff] to-[#263099]",
  }[tone];

  return (
    <div className="relative mx-auto flex h-full w-full items-end justify-center overflow-hidden rounded-[2rem]">
      <ToneFrame tone={tone} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.65),transparent_30%),linear-gradient(180deg,transparent,rgba(0,0,0,0.04))]" />
      <div className={`absolute bottom-0 h-[72%] w-[44%] rounded-t-[46%] bg-gradient-to-b ${variant} shadow-[inset_0_-18px_24px_rgba(0,0,0,0.12)]`} />
      <div className="absolute left-1/2 top-[9%] h-[18%] w-[18%] -translate-x-1/2 rounded-full bg-[#efcfb4] shadow-[0_10px_30px_rgba(0,0,0,0.12)]" />
      <div className="absolute left-1/2 top-[15%] h-[15%] w-[38%] -translate-x-1/2 rounded-[999px] bg-[#141414] opacity-90" />
      <div className="absolute bottom-[13%] left-1/2 h-[35%] w-[56%] -translate-x-1/2 rounded-[48%_48%_24%_24%] bg-gradient-to-b from-[#fefefe] via-[#fefefe] to-[#cfd5e6]" />
      <div className="absolute bottom-[18%] left-[28%] h-[42%] w-[14%] -rotate-8 rounded-[999px] bg-white/85" />
      <div className="absolute bottom-[18%] right-[28%] h-[42%] w-[14%] rotate-8 rounded-[999px] bg-white/85" />
      <div className="absolute top-[26%] left-[20%] h-[6%] w-[7%] rounded-[999px] bg-[#101010] opacity-90" />
      <div className="absolute top-[26%] right-[20%] h-[6%] w-[7%] rounded-[999px] bg-[#101010] opacity-90" />
      <div className="absolute bottom-[25%] left-1/2 h-[42%] w-[68%] -translate-x-1/2 rounded-[48%_48%_30%_30%] bg-gradient-to-b from-transparent via-white/35 to-transparent" />
      <div className="absolute left-[12%] top-[16%] h-[42%] w-[44%] rounded-[36px] border-[14px] border-[#ff4fc8] shadow-[0_0_70px_rgba(255,79,200,0.45)]" />
      <div className="absolute right-[9%] top-[18%] h-[18%] w-[14%] rounded-[24px] border border-black/10 bg-white/85 shadow-[0_20px_40px_rgba(0,0,0,0.14)]" />
      <div className="absolute inset-x-[14%] bottom-[7%] h-[8%] rounded-full bg-white/25 blur-2xl" />
      <div className="absolute left-[7%] top-[23%] h-[18%] w-[8px] rounded-full bg-[#d7ff1f]" />
      <div className="absolute right-[14%] top-[12%] h-[8px] w-[8px] rounded-full bg-[#ff4fc8]" />
      <div className="absolute bottom-[8%] right-[10%] h-[10px] w-[10px] rounded-full bg-[#101010]" />
      <div className="absolute bottom-[11%] left-[9%] h-[8px] w-[8px] rounded-full bg-[#101010]" />
      <div className="absolute inset-0 rounded-[2rem] ring-1 ring-black/10" />
      <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]" />
    </div>
  );
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-[1.7rem] border border-black/10 bg-white/88 p-3 shadow-[0_18px_50px_rgba(0,0,0,0.08)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(0,0,0,0.12)]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.3rem] bg-white">
        <ProductPreview tone={product.tone} />
        <div className="absolute left-3 top-3 rounded-full bg-[#d7ff1f] px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-black shadow-[0_8px_18px_rgba(0,0,0,0.12)]">
          {product.badge ?? "NEW"}
        </div>
        <button
          type="button"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white/90 text-black transition hover:scale-105"
          aria-label={`Add ${product.name} to wishlist`}
        >
          <HeartIcon />
        </button>
        <button
          type="button"
          className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-[0.8rem] bg-[#111111] text-white transition hover:bg-black"
          aria-label={`Add ${product.name} to cart`}
        >
          <PlusIcon />
        </button>
      </div>
      <div className="space-y-3 px-1 pb-2 pt-3">
        <h3 className="line-clamp-2 min-h-[2.75rem] text-[0.95rem] font-medium leading-6 text-[#111111]">{product.name}</h3>
        <div className="flex items-end gap-2">
          <span className="text-base font-bold text-[#111111]">{product.price}</span>
          {product.oldPrice ? <span className="pb-[1px] text-sm text-[#8f8a80] line-through">{product.oldPrice}</span> : null}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            {product.swatches.map((swatch) => (
              <span key={swatch} className="h-3.5 w-3.5 rounded-full border border-black/15" style={{ backgroundColor: swatch }} />
            ))}
          </div>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-[0.7rem] border border-black/10 bg-[#111111] text-white transition hover:-translate-y-0.5 hover:bg-black"
            aria-label={`Quick add ${product.name}`}
          >
            <PlusIcon />
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;

