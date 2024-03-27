export default defineEventHandler(async (event) => {
  const productId = getRouterParam(event, "product");
  console.log(productId);

  return {
    id: "1",
    name: "tube",
    price: 300.29,
    dimensions: {
      width: 10,
      height: 10,
      length: 10,
    },
    description: "This is a tube",
    image: "https://picsum.photos/200",
  };
});
