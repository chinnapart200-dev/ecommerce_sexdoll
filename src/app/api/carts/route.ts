import { NextResponse } from "next/server";
import { query } from "@/lib/mysql";
import type { RowDataPacket } from "mysql2/promise";
import type { ApiResponse } from "@/types/api";
import type { CartItem, CartSummary } from "@/types/cart";
import type { Product } from "@/types/product";

type CartRow = RowDataPacket & {
  id: number;
  session_id: string;
  product_id: number;
  quantity: number;
  product_name: string;
  product_slug: string;
  product_description: string;
  product_price: string | number;
  product_sale_price: string | number | null;
  product_image_url: string;
  product_category_id: number;
  product_category_name: string;
  product_is_featured: number;
  product_is_new: number;
  product_stock: number;
  product_created_at: Date;
  product_updated_at: Date;
};

type CartPayload = {
  sessionId?: string;
  productId?: number;
  quantity?: number;
};

function mapProduct(row: CartRow): Product {
  return {
    id: row.product_id,
    slug: row.product_slug,
    name: row.product_name,
    description: row.product_description,
    price: Number(row.product_price),
    salePrice: row.product_sale_price === null ? null : Number(row.product_sale_price),
    imageUrl: row.product_image_url,
    categoryId: row.product_category_id,
    categoryName: row.product_category_name,
    isFeatured: Boolean(row.product_is_featured),
    isNew: Boolean(row.product_is_new),
    stock: row.product_stock,
    createdAt: row.product_created_at.toISOString(),
    updatedAt: row.product_updated_at.toISOString(),
  };
}

function mapCartItem(row: CartRow): CartItem {
  return {
    id: row.id,
    productId: row.product_id,
    quantity: row.quantity,
    product: mapProduct(row),
  };
}

function calculateSummary(items: CartItem[]): CartSummary {
  const subtotal = items.reduce((total, item) => {
    const price = item.product?.salePrice ?? item.product?.price ?? 0;
    return total + price * item.quantity;
  }, 0);

  const shipping = subtotal > 0 ? 15 : 0;
  const discount = 0;

  return {
    subtotal,
    shipping,
    discount,
    total: subtotal + shipping - discount,
  };
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const sessionId = url.searchParams.get("sessionId");

    if (!sessionId) {
      const response: ApiResponse<never> = {
        success: false,
        message: "sessionId is required.",
      };

      return NextResponse.json(response, { status: 400 });
    }

    const rows = await query<CartRow>(
      `
        SELECT
          ci.id,
          ci.session_id,
          ci.product_id,
          ci.quantity,
          p.name AS product_name,
          p.slug AS product_slug,
          p.description AS product_description,
          p.price AS product_price,
          p.sale_price AS product_sale_price,
          p.image_url AS product_image_url,
          p.category_id AS product_category_id,
          c.name AS product_category_name,
          p.is_featured AS product_is_featured,
          p.is_new AS product_is_new,
          p.stock AS product_stock,
          p.created_at AS product_created_at,
          p.updated_at AS product_updated_at
        FROM cart_items ci
        INNER JOIN products p ON p.id = ci.product_id
        INNER JOIN categories c ON c.id = p.category_id
        WHERE ci.session_id = ?
        ORDER BY ci.updated_at DESC, ci.id DESC
      `,
      [sessionId]
    );

    const items = rows.map(mapCartItem);
    const response: ApiResponse<{ items: CartItem[]; summary: CartSummary }> = {
      success: true,
      data: {
        items,
        summary: calculateSummary(items),
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse<never> = {
      success: false,
      message: "Failed to load cart.",
      error: error instanceof Error ? error.message : "Unknown error",
    };

    return NextResponse.json(response, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CartPayload;
    const sessionId = body.sessionId?.trim();
    const productId = Number(body.productId);
    const quantity = Number(body.quantity ?? 1);

    if (!sessionId || !Number.isInteger(productId) || productId < 1 || !Number.isInteger(quantity) || quantity < 1) {
      const response: ApiResponse<never> = {
        success: false,
        message: "Invalid cart payload.",
      };

      return NextResponse.json(response, { status: 400 });
    }

    await query(
      `
        INSERT INTO cart_items (session_id, product_id, quantity)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)
      `,
      [sessionId, productId, quantity]
    );

    const response: ApiResponse<null> = {
      success: true,
      data: null,
      message: "Item added to cart.",
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse<never> = {
      success: false,
      message: "Failed to update cart.",
      error: error instanceof Error ? error.message : "Unknown error",
    };

    return NextResponse.json(response, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const sessionId = url.searchParams.get("sessionId");

    if (!sessionId) {
      const response: ApiResponse<never> = {
        success: false,
        message: "sessionId is required.",
      };

      return NextResponse.json(response, { status: 400 });
    }

    await query("DELETE FROM cart_items WHERE session_id = ?", [sessionId]);

    const response: ApiResponse<null> = {
      success: true,
      data: null,
      message: "Cart cleared.",
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse<never> = {
      success: false,
      message: "Failed to clear cart.",
      error: error instanceof Error ? error.message : "Unknown error",
    };

    return NextResponse.json(response, { status: 500 });
  }
}
