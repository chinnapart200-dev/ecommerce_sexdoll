import type { CartItem as CartItemType } from "@/types/cart";
import { formatCurrency } from "@/lib/format";

type CartItemProps = {
  item: CartItemType;
  onIncrease: (productId: number) => void;
  updating?: boolean;
};

export function CartItem({ item, onIncrease, updating = false }: CartItemProps) {
  const product = item.product;
  const productPrice = product?.salePrice ?? product?.price ?? 0;
  const lineTotal = productPrice * item.quantity;
  const imageUrl = product?.imageUrl ?? "/images/products/placeholder.jpg";
  const categoryName = product?.categoryName ?? "Collection";
  const productName = product?.name ?? "Product";
  const productDescription = product?.description ?? "Item added to your cart.";

  return (
    <article className="rounded-[1.5rem] border border-black/10 bg-white/80 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div
          className="h-32 w-full rounded-[1.2rem] bg-cover bg-center bg-no-repeat sm:w-28 sm:flex-none"
          style={{ backgroundImage: `url("${imageUrl}")` }}
          aria-hidden="true"
        />

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-black/45">{categoryName}</p>
              <h2 className="mt-2 line-clamp-2 text-xl font-black uppercase tracking-[-0.05em]">{productName}</h2>
              <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-7 text-black/60">{productDescription}</p>
            </div>

            <div className="text-left lg:text-right">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-black/45">Price</p>
              <p className="mt-2 text-xl font-black text-black">{formatCurrency(productPrice)}</p>
              {product?.salePrice ? (
                <p className="mt-1 text-sm text-black/45 line-through">{formatCurrency(product.price)}</p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-[0.24em] text-black/45">Qty</span>
              <div className="inline-flex items-center rounded-full border border-black/10 bg-[#f7f5ef]">
                <button
                  type="button"
                  className="grid h-10 w-10 place-items-center rounded-full text-xl font-black text-black/60 transition hover:bg-black/5"
                  aria-label={`Decrease quantity for ${productName}`}
                  disabled
                >
                  -
                </button>
                <span className="min-w-10 px-3 text-sm font-bold">{item.quantity}</span>
                <button
                  type="button"
                  className="grid h-10 w-10 place-items-center rounded-full text-xl font-black text-black transition hover:bg-black/5 disabled:opacity-60"
                  aria-label={`Increase quantity for ${productName}`}
                  onClick={() => onIncrease(item.productId)}
                  disabled={updating}
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-black/45">Line total</p>
                <p className="mt-2 text-xl font-black text-black">{formatCurrency(lineTotal)}</p>
              </div>
              <button
                type="button"
                className="inline-flex h-9 items-center justify-center rounded-full border border-black/10 bg-transparent px-4 text-xs font-black uppercase tracking-[0.18em] text-black/40"
                disabled
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default CartItem;
