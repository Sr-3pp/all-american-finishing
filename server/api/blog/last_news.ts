import fs from "fs";
import { join } from "pathe";
import type { DinamyComponent } from "~/types/DinamyComponent";
import type { Entry } from "~/types/Entry";

const dir = join(process.cwd(), "content");

export default defineEventHandler((event) => {
  const { page } = getQuery(event);
  const page_size = 4;

  const url = join(dir, "about_us", "blog", "_entries");
  const files = fs.readdirSync(url);
  const blog: Entry[] = files
    .slice(page ? Number(page) : 0, page_size)
    .map((f: string) => {
      const furl = join(url, f);
      const entry: Entry = JSON.parse(fs.readFileSync(furl, "utf8"));
      const first_text: DinamyComponent = entry.content.find(
        (el) => el.component == "SrText"
      ) as DinamyComponent;
      entry.id = f.replace(".json", "");
      entry.resume = (first_text.props.text as string).slice(0, 300) + "...";

      return entry;
    });

  return {
    data: blog,
  };
});
