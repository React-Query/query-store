import { ProductList, useProducts } from "..";

export const MensPage = () => {
  const { isLoading, products } = useProducts({ filterKey: "men's clothing" });
  return (
    <div className="flex-col border-2 border-orange-500 m-4">
      <h1 className="text-2xl font-bold">Productos para hombres</h1>

      {isLoading && <p>Cargando... </p>}

      <ProductList products={products} />
    </div>
  );
};
