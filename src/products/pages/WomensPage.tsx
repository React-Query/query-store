import { ProductList, useProducts } from ".."

export const WomensPage = () => {
  const { isLoading,  products } = useProducts({filterKey:"women's clothing"});
  return (
    <div className="flex-col border-2 border-yellow-500 m-4">
      <h1 className="text-2xl font-bold">Productos para mujeres</h1>
      {isLoading && <p>Cargando... </p>}

      <ProductList products={products} />

    </div>
  )
}