import { Project } from "~/server/Models";
import { thumbHandler, parseMultipartData } from "~/server/utilities";

export default defineEventHandler(async (event) => {
  const data = await readMultipartFormData(event);

  const parsedData = parseMultipartData(data);

  const project = await Project.create(parsedData);

  project.thumbs = thumbHandler(
    `/projects/${project._id}`,
    project.thumbs,
    parsedData.thumbs || [],
    parsedData.thumbFiles
  );

  project.save();

  return {
    data: project,
  };
});
