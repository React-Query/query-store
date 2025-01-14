import { productsApi } from "../api/productsApi";
import { Product } from "../interfaces/product-interface";

interface GetProductsOPtions {
  filterKey?: string;
}

const sleep = async (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms * 1000);
  });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProducts = async ({
  filterKey,
}: GetProductsOPtions): Promise<Product[]> => {
  //SI no se proporciona el filterKey su valor es undefined
  //console.log({filterKey})
  await sleep(2);
  const query = filterKey ? `?category=${filterKey}` : "";
  const { data } = await productsApi.get<Product[]>(`/products${query}`);
  return data;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductById = async (id: number): Promise<Product> => {
  //SI no se proporciona el filterKey su valor es undefined
  //console.log({filterKey})
  await sleep(2);
  const { data } = await productsApi.get<Product>(`/products/${id}`);
  return data;
};
interface ProductLike {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}
export const createProduct = async (product: ProductLike) => {
  await sleep(2);

  //throw new Error(`Error al crear producto`)
  const { data } = await productsApi.post<Product>(`/products`, product);
  console.log({data})
  return data;
};
