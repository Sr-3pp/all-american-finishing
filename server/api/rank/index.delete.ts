import { Rank } from "@/server/Models";

export default defineEventHandler(async (event) => {
  const { id } = await readBody(event);

  try {
    await Rank.findOneAndDelete({ _id: id });
    return {
      data: "Rank deleted",
    };
  } catch (error) {
    setResponseStatus(event, 404, "Rank not found");
    return error;
  }
});
