import { Rank } from "~/server/Models";

export default defineEventHandler(async (e) => {
  const data = await readBody(e);
  console.log(data);
  try {
    await Rank.create(data);
    const rank = await Rank.findOne({ email: data.email });
    return rank;
  } catch (error) {
    return error;
  }
});
