import { Project } from "~/server/Models";

export default defineEventHandler(async (event) => {
  const projects = await Project.find();

  return {
    data: projects,
  };
});
