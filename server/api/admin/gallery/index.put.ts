import fs from "fs";
import { join } from "pathe";
import { randomName } from "~/server/utilities";
const dir = join(process.cwd(), "public");

export default defineEventHandler(async (event) => {
  const body: any = await readMultipartFormData(event);
  const path = body.find((el: any) => el.name === "path").data.toString();
  const file = body.find((el: any) => el.name === "file");
  const newName = randomName(file.filename);
  const url = join(dir, path, newName);
  fs.writeFileSync(url, file.data, "utf-8");
  return newName;
});
