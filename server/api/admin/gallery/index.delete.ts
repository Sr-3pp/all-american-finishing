import fs from "fs";
import { join } from "path";
const dir = join(process.cwd(), "public");

export default defineEventHandler(async (event) => {
  const { path, name } = await readBody(event);
  const url = join(dir, path, name);

  if (fs.existsSync(url)) {
    fs.unlinkSync(url);
  }

  return true;
});
