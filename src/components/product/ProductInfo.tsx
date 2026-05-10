import { Button } from "@/components/ui/Button";
import type { ProductCardData } from "@/components/product/ProductCard";
import { formatDate } from "@/lib/format";

type ProductInfoProps = {
  name: string;
  description: string;
  categoryName: string;
  price: string;
  oldPrice?: string | null;
  stock: number;
  updatedAt: string | Date;
  isNew: boolean;
  isFeatured: boolean;
  swatches: string[];
  tone: ProductCardData["tone"];
};

export function ProductInfo({
  name,
  description,
  categoryName,
  price,
  oldPrice,
  stock,
  updatedAt,
  isNew,
  isFeatured,
  swatches,
  tone,
}: ProductInfoProps) {
  const stockLabel = stock > 0 ? `In stock (${stock})` : "Out of stock";
  const accentBadgeClass =
    tone === "lime"
      ? "bg-[#d7ff1f]"
      : tone === "orange"
        ? "bg-[#ffbf5c]"
        : tone === "rose"
          ? "bg-[#ff7acc]"
          : tone === "sky"
            ? "bg-[#6ea8ff]"
            : tone === "forest"
              ? "bg-[#8cc83e]"
              : "bg-[#8d93ff]";

  return (
    <div className="rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.08)] sm:p-8">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          {isNew ? (
            <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-black ${accentBadgeClass}`}>
              New
            </span>
          ) : null}
          {isFeatured ? (
            <span className="inline-flex rounded-full bg-black px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-white">
              Featured
            </span>
          ) : null}
          <span className="inline-flex rounded-full border border-black/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-black/60">
            {stockLabel}
          </span>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-black/45">{categoryName}</p>
          <h1 className="text-4xl font-black uppercase tracking-[-0.08em] sm:text-5xl">{name}</h1>
          <div className="flex flex-wrap items-end gap-3">
            <span className="text-3xl font-black text-[#111111]">{price}</span>
            {oldPrice ? <span className="pb-1 text-lg text-black/45 line-through">{oldPrice}</span> : null}
          </div>
          <p className="max-w-2xl text-base leading-8 text-black/65">{description}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Button variant="primary" size="lg" className="rounded-full">
          Add to cart
        </Button>
        <Button variant="secondary" size="lg" className="rounded-full">
          Buy now
        </Button>
      </div>

      <div className="mt-8 grid gap-4 rounded-[1.5rem] border border-black/10 bg-[#f8f6ef] p-5 sm:grid-cols-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-black/45">Category</p>
          <p className="mt-2 text-sm font-semibold text-black">{categoryName}</p>
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-black/45">Stock</p>
          <p className="mt-2 text-sm font-semibold text-black">{stock}</p>
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-black/45">Updated</p>
          <p className="mt-2 text-sm font-semibold text-black">{formatDate(updatedAt)}</p>
        </div>
      </div>

      <div className="mt-8 space-y-3">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-black/45">Color options</p>
        <div className="flex gap-2">
          {swatches.map((swatch) => (
            <span
              key={swatch}
              className="h-5 w-5 rounded-full border border-black/15"
              style={{ backgroundColor: swatch }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
