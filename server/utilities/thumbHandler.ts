import fs from "fs";
import { join } from "pathe";
import { randomName } from "./randomName";
const dir = join(process.cwd(), "public");

export const thumbHandler = (
  path: string,
  savedThumbs: string[],
  currentThumbs: string[],
  thumbs: []
) => {
  //remove deleted ones
  const erase: any = [];
  savedThumbs.forEach((thumb: string, idx: number) => {
    const pic = currentThumbs?.find((th: string) => {
      return th.includes(thumb);
    });
    if (!pic) {
      erase.push(thumb);
    }
  });

  //remove files
  erase.forEach((th: string) => {
    const url = join(dir, th);
    if (fs.existsSync(url)) {
      fs.unlinkSync(url);
    }
  });

  const url = join(dir, path);
  //upload thumbs
  let fileNames: Array<string> = [];
  if (thumbs.length > 0) {
    fileNames = thumbs.map((thumb: any) => {
      const fileName = randomName(thumb.filename);
      const writeUrl = join(url, fileName);
      if (!fs.existsSync(url)) {
        fs.mkdirSync(url, { recursive: true });
      }
      fs.writeFileSync(writeUrl, thumb.data, "utf-8");
      const fileUrl = join(path, fileName);
      return fileUrl;
    });
  }

  console.log([...(currentThumbs || []), ...fileNames]);

  return [...(currentThumbs || []), ...fileNames];
};
