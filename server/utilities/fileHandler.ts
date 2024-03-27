import fs from "fs";
import { join } from "pathe";

const dir = join(process.cwd(), "public");

export class FileHandler {
  constructor() {}

  deleteFile = (path: string, isDir: boolean = false) => {
    const url = join(dir, path);
    if (fs.existsSync(url)) {
      if (isDir) {
        fs.rmdirSync(url, { recursive: true });
      } else {
        fs.unlinkSync(url);
      }
    }
  };

  saveFile = (path: string, data: any) => {
    const url = join(dir, path);
    if (fs.existsSync(url)) {
      fs.mkdirSync(url, { recursive: true });
    }
    fs.writeFileSync(url, data, "utf-8");
  };
}
