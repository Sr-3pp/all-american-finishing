import fs from "fs";
import { join } from "path";

import { Catalog } from "../../../server/Models";
import { randomName } from "~/server/utilities";

const dir = join(process.cwd(), "public", "catalog");

const processThumbFiles = (product: any, thumbFiles: any) => {
  const names: any = [];
  const url = join(dir, product._id.toString());
  if (!fs.existsSync(url)) {
    fs.mkdirSync(url, { recursive: true });
  }
  thumbFiles.forEach((file: any) => {
    const newName = randomName(file.filename);
    const newUrl = join(url, newName);
    names.push(join("/catalog", product._id.toString(), newName));
    fs.writeFileSync(newUrl, file.data, "utf-8");
  });

  return names;
};

export default defineEventHandler(async (event) => {
  const data = await readMultipartFormData(event);
  const parsedData: any = {};

  const thumbFiles: any = [];

  data?.forEach((el: any) => {
    if (el.name.includes("thumbFiles")) {
      thumbFiles.push(el);
    } else if (el.name.includes("dimensions")) {
      const [key, subKey] = el.name.split("_");
      if (!parsedData[key]) parsedData[key] = {};
      parsedData[key][subKey] = Number(el.data.toString());
    } else if (el.name == "price") {
      parsedData[el.name] = Number(el.data.toString());
    } else {
      parsedData[el.name] = el.data.toString();
    }
  });

  const product = await Catalog.create(parsedData);

  if (thumbFiles.length === 0) return product;

  const thumbs = processThumbFiles(product, thumbFiles);

  product.thumbs = thumbs;
  await product.save();
  return {
    data: product,
  };
});
