import { ProductCard, type ProductCardData } from "@/components/product/ProductCard";

type ProductGridProps = {
  products: ProductCardData[];
  className?: string;
  columnsClassName?: string;
};

export function ProductGrid({
  products,
  className = "",
  columnsClassName = "grid-cols-2 md:grid-cols-3 xl:grid-cols-6",
}: ProductGridProps) {
  return (
    <div className={["mt-6 grid gap-4", columnsClassName, className].filter(Boolean).join(" ")}>
      {products.map((product) => (
        <ProductCard key={`${product.name}-${product.price}`} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;

