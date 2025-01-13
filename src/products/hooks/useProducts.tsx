import { useQuery } from "@tanstack/react-query";
import { productActions } from "..";

interface Options {
  filterKey?: string;
}
export const useProducts = ({ filterKey }: Options) => {
  //cuando se usa opjetos en las opciones de configurtacion del useQUery no importa el orden de las propiedades.
  const {
    isLoading,
    isFetching,
    data: products=[],
    isError,
  } = useQuery({
    queryKey: ["products", { filterKey }],
    queryFn: () => productActions.getProducts({ filterKey }),
    staleTime: 1000*60*60
  });

  return { isLoading, isFetching, products, isError };
};
