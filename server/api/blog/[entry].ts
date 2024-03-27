import fs from "fs";
import { join } from "pathe";
import type { Entry } from "~/types/Entry";

const dir = join(process.cwd(), "content");

export default defineEventHandler((event) => {
  const { entry: id } = getRouterParams(event);

  const url = join(dir, "about_us", "blog", "_entries", String(id) + ".json");
  try {
    const entry: Entry = JSON.parse(fs.readFileSync(url, "utf8"));

    return {
      data: entry,
    };
  } catch (error) {
    return {
      error,
    };
  }
});
