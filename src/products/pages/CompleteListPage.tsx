import { ProductList, useProducts } from "..";

export const CompleteListPage = () => {
  const { isLoading,  products } = useProducts({});
  return (
    <div className="flex-col border-2 border-green-500 m-4">
      <h1 className="text-2xl font-bold">Todos los productos</h1>
      {isLoading && <p>Cargando... </p>}

      <ProductList products={products}/>
    </div>
  );
};
