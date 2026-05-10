import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { RowDataPacket } from "mysql2/promise";
import { ProductGrid } from "@/components/product/ProductGrid";
import type { ProductCardData } from "@/components/product/ProductCard";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { formatCurrency } from "@/lib/format";
import { query, queryFirst } from "@/lib/mysql";
import { getSiteUrl } from "@/lib/site";

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
  created_at: Date;
  updated_at: Date;
};

type RelatedProductRow = RowDataPacket & {
  id: number;
  slug: string;
  name: string;
  price: string | number;
  sale_price: string | number | null;
  image_url: string;
  category_slug: string;
  is_new: number;
  is_featured: number;
};

const siteUrl = getSiteUrl();

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

function formatNullableCurrency(value: string | number | null) {
  if (value === null) return null;
  return formatCurrency(value);
}

function mapRelatedProduct(row: RelatedProductRow): ProductCardData {
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

async function getProduct(slug: string) {
  const product = await queryFirst<ProductRow>(
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
        p.stock,
        p.created_at,
        p.updated_at
      FROM products p
      INNER JOIN categories c ON c.id = p.category_id
      WHERE p.slug = ?
      LIMIT 1
    `,
    [slug]
  );

  return product;
}

async function getRelatedProducts(categorySlug: string, productId: number) {
  const rows = await query<RelatedProductRow>(
    `
      SELECT
        p.id,
        p.slug,
        p.name,
        p.price,
        p.sale_price,
        p.image_url,
        c.slug AS category_slug,
        p.is_new,
        p.is_featured
      FROM products p
      INNER JOIN categories c ON c.id = p.category_id
      WHERE c.slug = ? AND p.id <> ?
      ORDER BY p.is_featured DESC, p.created_at DESC
      LIMIT 6
    `,
    [categorySlug, productId]
  );

  return rows.map(mapRelatedProduct);
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Product not found",
      description: "The requested product could not be found.",
    };
  }

  const price = formatCurrency(product.sale_price ?? product.price);
  const title = `${product.name} | WOODMART Style Ecommerce`;

  return {
    title,
    description: product.description,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title,
      description: product.description,
      url: `${siteUrl}/products/${product.slug}`,
      type: "website",
      images: [
        {
          url: `${siteUrl}${product.image_url}`,
          width: 1200,
          height: 1200,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: product.description,
    },
    other: {
      "product:price:amount": price ?? "",
      "product:price:currency": "USD",
    },
  };
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProductDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.category_slug, product.id);
  const tone = toneByCategory[product.category_slug] ?? "violet";
  const price = formatCurrency(product.sale_price ?? product.price);
  const oldPrice = formatNullableCurrency(product.sale_price ? product.price : null);

  return (
    <main className="min-h-screen overflow-x-hidden text-[#111111]">
      <section className="mx-auto w-full max-w-[1520px] px-4 pb-8 pt-8 sm:px-6 lg:px-10">
        <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white/80 px-6 py-8 shadow-[0_18px_50px_rgba(0,0,0,0.08)] sm:px-8 lg:px-10">
          <div className="flex flex-col gap-3">
            <span className="inline-flex w-fit items-center rounded-full border border-black/10 bg-[#d7ff1f] px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-black">
              Product detail
            </span>
            <p className="text-sm uppercase tracking-[0.24em] text-black/45">{product.category_name}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1520px] px-4 pb-12 sm:px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <ProductGallery name={product.name} imageUrl={product.image_url} tone={tone} />
          <ProductInfo
            name={product.name}
            description={product.description}
            categoryName={product.category_name}
            price={price}
            oldPrice={oldPrice}
            stock={product.stock}
            updatedAt={product.updated_at}
            isNew={Boolean(product.is_new)}
            isFeatured={Boolean(product.is_featured)}
            swatches={swatchesByTone[tone]}
            tone={tone}
          />
        </div>
      </section>

      {relatedProducts.length ? (
        <section className="mx-auto w-full max-w-[1520px] px-4 pb-12 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-4 border-b border-black/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-3">
              <span className="inline-flex w-fit items-center rounded-full border border-black/10 bg-[#d7ff1f] px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-black">
                Follow Collection
              </span>
              <h2 className="text-3xl font-black uppercase tracking-[-0.06em] text-[#111111] sm:text-4xl">
                Related products
              </h2>
            </div>
          </div>
          <ProductGrid products={relatedProducts} columnsClassName="grid-cols-2 md:grid-cols-3 xl:grid-cols-6" />
        </section>
      ) : null}
    </main>
  );
}
