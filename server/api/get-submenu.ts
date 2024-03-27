import fs from "fs";
import { join } from "pathe";

const dir = join(process.cwd(), "content");

export default defineEventHandler((event) => {
  const { section } = getQuery(event);
  const sec_dir = join(dir, String(section));

  const buildSubmenu = (url: string, dir: any) => {
    const files = fs.readdirSync(url, { withFileTypes: true });

    files
      .sort((a: any, b: any) => {
        const getOrder = (file: any) => {
          if (file.name[0] == "_") return 0;
          let fileContent: any;
          if (!file.isDirectory()) {
            fileContent = JSON.parse(
              fs.readFileSync(join(url, file.name), "utf-8")
            );
          } else {
            fileContent = JSON.parse(
              fs.readFileSync(join(url, file.name, "index.json"), "utf-8")
            );
          }

          return fileContent.order || 0;
        };

        const orderA: any = getOrder(a);
        const orderB: any = getOrder(b);
        return orderA - orderB;
      })
      .forEach((file) => {
        if (file.name !== "index.json") {
          dir[file.name.replace(".json", "")] = { files: [] };
        }
        if (file.isDirectory()) {
          buildSubmenu(join(url, file.name), dir[file.name]);
        } else {
          if (!dir.files) {
            dir.files = [];
          }
          dir.files.push(file.name);
        }
      });

    return directory;
  };
  let directory: any = {};
  if (section != "index") {
    buildSubmenu(sec_dir, directory);
  }

  const orderedDirectory: any = {};

  Object.keys(directory).forEach((key) => {
    orderedDirectory[key] = directory[key].files;
  });

  //console.log("seuuu, ", orderedDirectory);

  return orderedDirectory;
});
