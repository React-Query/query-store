import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product, productActions } from "..";

export const useProductMutation = () => {
  const queryClient = useQueryClient();

  const productMutation = useMutation({
    mutationFn: productActions.createProduct,
    //onSuccess: () => console.log("Producto Creado"),
    //product es la respuesta a la peticion http

    //!product son los datos que se estan enviando al productActions.createProduct
    onMutate: (product) => {
      console.log(`Mutando datos optimistic ${product}`);
      //Creamos el product Optimistic
      const optimisticProduct: Product = { id: Math.random(), ...product };
      console.log(optimisticProduct);
      //Almacenar el producto en el cache del queryClient
      queryClient.setQueryData<Product[]>(
        //Este es el query donde vamos a insertar la lista de los productos
        ["products", { filterKey: product.category }],
        (oldList) => {
          console.log({ product });
          console.log({ oldList });

          //se puede dar el caso que el query ["products", { filterKey: product.category }] nunca se haya solicitado por lo tanto va a devolver undefined y lo tenemos que validar.
          if (!oldList) return [optimisticProduct];
          return [...oldList, optimisticProduct];
        }
      );
      //!Para uso del context en onSucces
      return {
        optimisticProduct,
      };
    },
    //!En este punto el product ya es el resultado del post, variables son los datos que se envian al Api y context es el producto Optimistic que regresa en onMutate
    onSuccess: (product, variables, context) => {
      console.log({ product, variables, context });
      console.log(product.category);
      console.log(`Producto creado`);
      //!Por cada producto nuevo invalidamos el queryKey y mandamos hacer de nuevo el fetch
      //queryClient.invalidateQueries({queryKey:['products',{'filterKey':data.category}]})

      //Removemos del cache el producto Optimistic
      queryClient.removeQueries({
        queryKey: ["products", { filterKey: context.optimisticProduct.id }],
      });
      //! De manera Optimista
      queryClient.setQueryData<Product[]>(
        //Este es el query donde vamos a insertar la lista de los productos
        ["products", { filterKey: product.category }],
        (oldList) => {
          console.log({ product });
          console.log({ oldList });

          //se puede dar el caso que el query ["products", { filterKey: product.category }] nunca se haya solicitado por lo tanto va a devolver undefined y lo tenemos que validar.
          if (!oldList) return [product];
          //return [...oldList, product];
          return oldList.map((cacheProduct) => {
            return cacheProduct.id === context.optimisticProduct.id
              ? product
              : cacheProduct;
          });
        }
      );
    },
    onError: (error, variables, context) => {
      console.log({ error, variables, context });
      //Removemos del cache el producto Optimistic
      queryClient.removeQueries({
        queryKey: ["products", { filterKey: context?.optimisticProduct.id }],
      });

      queryClient.setQueryData<Product[]>(
        //Este es el query donde vamos a insertar la lista de los productos
        ["products", { filterKey: variables.category }],
        (oldList) => {
          if (!oldList) return [];
          //!Removemos el producto optimista de la lista
          return oldList.filter((cacheProduct) => {
            return cacheProduct.id !== context?.optimisticProduct.id;
          });
        }
      );
    },
    //onSettled:()=>console.log("on Settle")
  });
  return { productMutation };
};
