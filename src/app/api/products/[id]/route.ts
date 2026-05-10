import { NextResponse } from "next/server";
import { queryFirst } from "@/lib/mysql";
import type { RowDataPacket } from "mysql2/promise";
import type { Product } from "@/types/product";
import type { ApiResponse } from "@/types/api";

type ProductRow = RowDataPacket & {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: string | number;
  sale_price: string | number | null;
  image_url: string;
  category_id: number;
  category_name: string | null;
  is_featured: number;
  is_new: number;
  stock: number;
  created_at: Date;
  updated_at: Date;
};

function mapProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    salePrice: row.sale_price === null ? null : Number(row.sale_price),
    imageUrl: row.image_url,
    categoryId: row.category_id,
    categoryName: row.category_name ?? undefined,
    isFeatured: Boolean(row.is_featured),
    isNew: Boolean(row.is_new),
    stock: row.stock,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = Number(id);

    if (!Number.isInteger(productId) || productId < 1) {
      const response: ApiResponse<never> = {
        success: false,
        message: "Invalid product id.",
      };

      return NextResponse.json(response, { status: 400 });
    }

    const row = await queryFirst<ProductRow>(
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
          p.is_featured,
          p.is_new,
          p.stock,
          p.created_at,
          p.updated_at
        FROM products p
        INNER JOIN categories c ON c.id = p.category_id
        WHERE p.id = ?
        LIMIT 1
      `,
      [productId]
    );

    if (!row) {
      const response: ApiResponse<never> = {
        success: false,
        message: "Product not found.",
      };

      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<Product> = {
      success: true,
      data: mapProduct(row),
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse<never> = {
      success: false,
      message: "Failed to load product.",
      error: error instanceof Error ? error.message : "Unknown error",
    };

    return NextResponse.json(response, { status: 500 });
  }
}
