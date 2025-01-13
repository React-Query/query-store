import { Product, ProductCard, usePrefetchProduct } from "..";
interface Products {
  products: Product[];
}
export const ProductList = ({ products }: Products) => {
  const prefetchProduct =usePrefetchProduct()
  return (
    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 justify-center max-w-max border-2 border-blue-500 m-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} prefetchProduct={prefetchProduct} />
      ))}
    </div>
  );
};
