import type { Metadata } from "next";
import type { RowDataPacket } from "mysql2/promise";
import { ProductGrid } from "@/components/product/ProductGrid";
import type { ProductCardData } from "@/components/product/ProductCard";
import { query } from "@/lib/mysql";
import { formatCurrency } from "@/lib/format";

type ProductRow = RowDataPacket & {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: string | number;
  sale_price: string | number | null;
  image_url: string;
  category_id: number;
  category_name: string;
  category_slug: string;
  is_featured: number;
  is_new: number;
  stock: number;
};

const toneByCategory: Record<string, ProductCardData["tone"]> = {
  women: "rose",
  men: "sky",
  kids: "lime",
  accessories: "violet",
  furniture: "orange",
  shoes: "forest",
  clothing: "rose",
  bags: "orange",
};

const swatchesByTone: Record<ProductCardData["tone"], string[]> = {
  lime: ["#7bcf2b", "#1b1b1b", "#d7ff1f"],
  orange: ["#f97316", "#eab308", "#e5e7eb"],
  rose: ["#ef4444", "#1f2937", "#f9fafb"],
  sky: ["#60a5fa", "#111827", "#94a3b8"],
  forest: ["#84cc16", "#3f6212", "#f8fafc"],
  violet: ["#2563eb", "#dc2626", "#f8fafc"],
};

function mapProduct(row: ProductRow): ProductCardData {
  const tone = toneByCategory[row.category_slug] ?? "violet";

  return {
    name: row.name,
    price: formatCurrency(row.sale_price ?? row.price),
    oldPrice: row.sale_price ? formatCurrency(row.price) : undefined,
    badge: row.is_new ? "NEW" : row.is_featured ? "HOT" : undefined,
    tone,
    swatches: swatchesByTone[tone],
  };
}

export const metadata: Metadata = {
  title: "Products",
  description: "Browse all products in the WOODMART style ecommerce storefront.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getProducts() {
  const rows = await query<ProductRow>(
    `
      SELECT
        p.id,
        p.slug,
        p.name,
        p.description,
        p.price,
        p.sale_price,
        p.image_url,
        p.category_id,
        c.name AS category_name,
        c.slug AS category_slug,
        p.is_featured,
        p.is_new,
        p.stock
      FROM products p
      INNER JOIN categories c ON c.id = p.category_id
      ORDER BY p.created_at DESC, p.id DESC
    `
  );

  return rows.map(mapProduct);
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen overflow-x-hidden text-[#111111]">
      <section className="mx-auto w-full max-w-[1520px] px-4 pb-8 pt-8 sm:px-6 lg:px-10">
        <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white/80 px-6 py-8 shadow-[0_18px_50px_rgba(0,0,0,0.08)] sm:px-8 lg:px-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <span className="inline-flex w-fit items-center rounded-full border border-black/10 bg-[#d7ff1f] px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-black">
                Shop
              </span>
              <h1 className="text-4xl font-black uppercase tracking-[-0.08em] sm:text-5xl">Products</h1>
              <p className="max-w-2xl text-sm leading-7 text-black/65 sm:text-base">
                Browse the latest collection and discover premium pieces curated for the WOODMART-style storefront.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black/65">
                {products.length} items
              </div>
              <label className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black/65">
                <span>Sort</span>
                <select className="bg-transparent outline-none">
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </label>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1520px] px-4 pb-12 sm:px-6 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="rounded-[2rem] border border-black/10 bg-white/80 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
            <div className="space-y-6">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-black">Filters</p>
                <p className="mt-2 text-sm leading-6 text-black/60">
                  Basic browsing filters are ready now and can be wired to database queries next.
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-black/60">Category</p>
                <div className="grid gap-2 text-sm font-medium text-black/70">
                  {["Women", "Men", "Kids", "Accessories"].map((item) => (
                    <label key={item} className="flex items-center gap-3">
                      <input type="checkbox" className="h-4 w-4 rounded border-black/20" />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-black/60">Availability</p>
                <div className="grid gap-2 text-sm font-medium text-black/70">
                  {["In stock", "On sale", "Featured"].map((item) => (
                    <label key={item} className="flex items-center gap-3">
                      <input type="checkbox" className="h-4 w-4 rounded border-black/20" />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div>
            <ProductGrid products={products} columnsClassName="grid-cols-2 md:grid-cols-3 xl:grid-cols-4" />
          </div>
        </div>
      </section>
    </main>
  );
}
