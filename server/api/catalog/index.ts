import { Catalog } from "~/server/Models";

export default defineEventHandler(async (event) => {
  const catalog = await Catalog.find();
  console.log(catalog);
  return {
    data: catalog,
  };
});
