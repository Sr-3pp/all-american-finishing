import { Project } from "~/server/Models";
import { parseMultipartData, thumbHandler } from "~/server/utilities";

export default defineEventHandler(async (event) => {
  const data = await readMultipartFormData(event);
  const parsedData = parseMultipartData(data);
  const { _id } = parsedData;

  try {
    const project: any = await Project.findOne({ _id });
    if (parsedData.thumbFiles) {
      parsedData.thumbs = thumbHandler(
        `/projects/${project._id}`,
        project.thumbs,
        parsedData.thumbs,
        parsedData.thumbFiles
      );
    }

    Object.keys(parsedData).forEach((key) => {
      project[key] = parsedData[key];
    });
    await project.save();

    return {
      data: project,
    };
  } catch (error) {
    console.log("error", error);
    return {
      error,
    };
  }
});
