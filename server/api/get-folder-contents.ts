import fs from "fs";
import { join } from "pathe";

export default defineEventHandler((event) => {
  const { section }: any = getQuery(event);
  const dir = join(process.cwd(), "content", section);

  const folder = fs.readdirSync(dir);
  const items = folder
    .map((name) => {
      if (name != "index.json") {
        const url = join(dir, name, name.includes(".json") ? "" : "index.json");
        const project = JSON.parse(fs.readFileSync(url, "utf8"));
        return project;
      }
    })
    .filter((el) => el)
    .sort((a, b) => a.order - b.order);

  return items;
});
