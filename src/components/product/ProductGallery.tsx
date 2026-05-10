import type { ProductCardData } from "@/components/product/ProductCard";

type ProductGalleryProps = {
  name: string;
  imageUrl: string;
  tone: ProductCardData["tone"];
};

function toneMap(tone: ProductCardData["tone"]) {
  switch (tone) {
    case "lime":
      return "from-[#e8ff4d] via-[#b9f21d] to-[#f7ffcf]";
    case "orange":
      return "from-[#ffd8a8] via-[#ff8a3d] to-[#fff1e0]";
    case "rose":
      return "from-[#ffc6e8] via-[#ff53c4] to-[#ffe2f3]";
    case "sky":
      return "from-[#d4e7ff] via-[#6ea8ff] to-[#f0f7ff]";
    case "forest":
      return "from-[#d9f3ae] via-[#7abf29] to-[#eefad6]";
    case "violet":
    default:
      return "from-[#d3d5ff] via-[#6a72ff] to-[#f2f4ff]";
  }
}

export function ProductGallery({ name, imageUrl, tone }: ProductGalleryProps) {
  const thumbnails = [imageUrl, imageUrl, imageUrl, imageUrl];

  return (
    <div className="rounded-[2rem] border border-black/10 bg-white/80 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
      <div className="relative overflow-hidden rounded-[1.6rem]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.7),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.9),rgba(255,255,255,0.25))]" />
        <div className={`absolute inset-x-[10%] top-[12%] h-[72%] rounded-[40px] bg-gradient-to-br ${toneMap(tone)}`} />
        <div className="absolute left-1/2 top-[10%] h-[18%] w-[16%] -translate-x-1/2 rounded-full bg-[#efcfb4]" />
        <div className="absolute left-[18%] top-[20%] h-[54%] w-[52%] rounded-[44px] bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(255,255,255,0.1))] opacity-80" />
        <div className="absolute bottom-[10%] left-[12%] h-[20%] w-[76%] rounded-[48%_48%_18%_18%] bg-white/40" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.03))]" />
        <div
          className="absolute inset-x-[16%] bottom-[12%] top-[12%] rounded-[32px] bg-cover bg-center bg-no-repeat opacity-[0.92]"
          style={{ backgroundImage: `url("${imageUrl}")` }}
          aria-hidden="true"
        />
        <div className="absolute inset-x-[12%] bottom-[7%] h-[10%] rounded-full bg-white/30 blur-2xl" />
        <div className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-black shadow-[0_10px_20px_rgba(0,0,0,0.08)]">
          {name}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-3">
        {thumbnails.map((thumb, index) => (
          <div
            key={`${thumb}-${index}`}
            className={`overflow-hidden rounded-[1rem] border border-black/10 bg-gradient-to-br ${
              index === 0
                ? "from-[#f5f5f5] to-[#ece8de]"
                : index === 1
                  ? "from-[#f2f0ff] to-[#d8ddff]"
                  : index === 2
                    ? "from-[#fce9f6] to-[#ffd9ef]"
                    : "from-[#eef8df] to-[#dff5b5]"
            }`}
          >
            <div
              className="aspect-square bg-cover bg-center bg-no-repeat opacity-90"
              style={{ backgroundImage: `url("${thumb}")` }}
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductGallery;

