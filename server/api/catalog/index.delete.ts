import fs from "fs";
import { join } from "pathe";

import { Catalog } from "~/server/Models";

const dir = join(process.cwd(), "public", "catalog");

export default defineEventHandler(async (event) => {
  const { _id } = await readBody(event);

  try {
    const url = join(dir, _id);
    fs.rmdirSync(url, { recursive: true });

    await Catalog.findByIdAndDelete({ _id: _id });

    return {
      data: true,
    };
  } catch (error) {
    return {
      error,
    };
  }
});
