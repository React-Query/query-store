import { useQuery } from "@tanstack/react-query";
import { productActions } from "..";

interface Options {
  id: number;
}
export const useProduct = ({ id }: Options) => {
  //cuando se usa opjetos en las opciones de configurtacion del useQUery no importa el orden de las propiedades.
  const {
    isLoading,
    isFetching,
    data: product,
    isError,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: () => productActions.getProductById(id),
    staleTime: 1000 * 60 * 60,
  });

  return { isLoading, isFetching, product, isError };
};
