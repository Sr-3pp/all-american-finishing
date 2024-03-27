import fs from "fs";
import { join } from "pathe";

import { Project } from "~/server/Models";
import { FileHandler } from "~/server/utilities";
import type { Project as _Project } from "~/types";

const dir = join(process.cwd(), "public");

export default defineEventHandler(async (event) => {
  const { _id } = await readBody(event);

  const project: _Project = await Project.findOne({ _id: _id });

  const fileHandler = new FileHandler();

  if (project.thumbs.length > 0) {
    const folderUrl = project.thumbs[0].split("/").slice(0, -1).join("/");
    fileHandler.deleteFile(folderUrl, true);
  }

  await Project.deleteOne({ _id });

  return true;
});
