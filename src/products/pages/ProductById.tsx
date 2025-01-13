//import { ProductList, useProducts } from "..";

import { useParams } from "react-router-dom";
import { ProductCard, useProduct } from "..";
import { useEffect } from "react";


export const ProductById = () => {
  const { id } = useParams();

  const { isLoading, product } = useProduct({ id: +id! });
  console.log({ product });
  useEffect(() => {
    window.scrollTo(0,0)
  }, [])
  
  return (
    <div className="flex-col border-2 border-green-500 m-4">
      <h1 className="text-2xl font-bold">Producto</h1>
      {isLoading && <p>Cargando... </p>}
      
      {product && (
        <ProductCard product={product} fullDescription={true}  />
      ) }
      
    </div>
  );
};
