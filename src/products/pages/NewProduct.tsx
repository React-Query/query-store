import { Button, Image, Input, Textarea } from "@nextui-org/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useProductMutation } from "..";
interface FormInputs {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const NewProduct = () => {
  const {productMutation} = useProductMutation();

  const { control, handleSubmit, watch } = useForm<FormInputs>({
    defaultValues: {
      title: "Teclado",
      price: 150.2,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt quae minima voluptatum inventore velit qui cupiditate. Quibusdam quos ipsa repellat, fuga, atque excepturi optio dolores laboriosam dolorem velit voluptate illo.",
      category: "men's clothing",
      image:
        "https://coretms.tecnomegastore.ec/assets/images/lg/23/KEYLOG920010715-1-lg.webp",
    },
  });
  // watch solo hara rerenders con el valor del campo image
  const newImage = watch("image");
  //console.log(newImage)

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const newData = { ...data, price: +data.price };
    console.log(newData);
    productMutation.mutate(data);
  };
  return (
    <div className="w-full flex-col border-2 border-gray-400">
      <h1 className="text-2xl font-bold">Nuevo producto</h1>
      {/* handledSubmit manda a llamar a onSubmit si la validacion sale todo bien. */}
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-around items-center">
          <div className="flex-col w-[500px]">
            {/* como se esta usando inputs de nextui hay que usar el Controller de react hook form */}
            <Controller
              control={control}
              name="title"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  className="mt-2"
                  type="text"
                  label="Titulo del producto"
                />
              )}
            />

            <Controller
              control={control}
              name="price"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  value={field.value?.toString()}
                  onChange={field.onChange}
                  className="mt-2"
                  type="number"
                  label="Precio del producto"
                />
              )}
            />

            <Controller
              control={control}
              name="image"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  className="mt-2"
                  type="url"
                  label="Url del producto"
                />
              )}
            />

            <Controller
              control={control}
              name="description"
              rules={{ required: true }}
              render={({ field }) => (
                <Textarea
                  value={field.value}
                  onChange={field.onChange}
                  className="mt-2"
                  label="Descripcion del producto"
                />
              )}
            />

            <Controller
              control={control}
              name="category"
              rules={{ required: true }}
              render={({ field }) => (
                <select
                  value={field.value}
                  onChange={field.onChange}
                  className="rounded-md p-3 mt-2 bg-gray-800 w-full"
                >
                  <option value="men's clothing">Men's clothing</option>
                  <option value="women's clothing">Women's clothing</option>
                  <option value="jewelery">Jewelery</option>
                  <option value="electronics">Electronics</option>
                </select>
              )}
            />

            <br />
            <Button
              isDisabled={productMutation.isPending}
              type="submit"
              className="mt-2"
              color="primary"
            >
              {productMutation.isPending ? "Grabando..." : "Crear"}
            </Button>
          </div>

          <div
            className="bg-white rounded-2xl p-10 flex items-center"
            style={{
              width: "500px",
              height: "600px",
            }}
          >
            {/* <Image src={"https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"} /> */}
            <Image src={newImage} />
          </div>
        </div>
      </form>
    </div>
  );
};
