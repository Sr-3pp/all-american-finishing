import { Rank } from "~/server/Models";

export default defineEventHandler(async () => {
  try {
    const ranks = await Rank.find();
    return {
      data: ranks,
    };
  } catch (error) {
    return {
      data: [],
      error,
    };
  }
});
