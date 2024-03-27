import fs from "fs";
import { join } from "pathe";
const dir = join(process.cwd(), "public", "media");

export default defineEventHandler(async (event) => {
  const { path } = await readBody(event);
  const url = join(dir, path);
  const files = fs.readdirSync(url);
  return files;
});
