import fs from "fs";
import { join } from "pathe";

import { Catalog } from "~/server/Models";
import { randomName, thumbHandler } from "~/server/utilities";

const dir = join(process.cwd(), "public", "catalog");

const syncThumbs = (
  product: any,
  dataThumbs: any,
  thumbFiles: Array<any> = []
) => {
  //remove deleted ones
  const erase: any = [];
  product.thumbs.forEach((thumb: string, idx: number) => {
    const pic = dataThumbs?.find((th: string) => th.includes(thumb));
    if (!pic) {
      erase.push(thumb);
    }
  });

  //remove files
  erase.forEach((th: string) => {
    const url = join(dir.replace("/catalog", ""), th);
    //fs.unlinkSync(url);
  });

  //upload thumbs
  let fileNames: Array<string> = [];
  if (thumbFiles.length > 0) {
    fileNames = thumbFiles.map((thumb) => {
      const fileName = randomName(thumb.filename);
      const url = join(dir, product._id.toString(), fileName);
      fs.writeFileSync(url, thumb.data, "utf-8");
      const fileUrl = join("/catalog", product._id.toString(), fileName);
      product.thumbs.push(fileUrl);

      return fileUrl;
    });
  }

  return [...(dataThumbs || []), ...fileNames];
};

export default defineEventHandler(async (event) => {
  const data = await readMultipartFormData(event);
  const parsedData: any = {};

  data?.forEach((item: any) => {
    if (item.name.includes("thumbFiles") || item.name.includes("thumb")) {
      const key = item.name.includes("thumbFiles") ? "thumbFiles" : "thumbs";
      if (!parsedData[key]) {
        parsedData[key] = [];
      }
      parsedData[key].push(key == "thumbs" ? item.data.toString() : item);
    } else if (item.name.includes("dimensions")) {
      const keys = item.name.split(".");
      const name = keys.pop();
      if (!parsedData.dimensions) {
        parsedData.dimensions = {};
      }
      parsedData.dimensions[name] = item.data.toString();
    } else {
      parsedData[item.name] = item.data.toString();
    }
  });
  const product: any = await Catalog.findOne({ _id: parsedData._id });

  Object.keys(parsedData).forEach((key: string) => {
    if (key == "dimensions") {
      Object.keys(parsedData[key]).forEach((j) => {
        product.dimensions[j] = parsedData.dimensions[j];
      });
    } else if (key !== "thumbs" && parsedData[key]) {
      product[key] = parsedData[key];
    }
  });

  product.thumbs = thumbHandler(
    "/catalog/" + product._id,
    product.thumbs,
    parsedData.thumbs,
    parsedData.thumbFiles
  );

  //console.log(product.thumbs);
  await product.save();

  return {
    data: product,
  };
});
