import { User } from "~/server/Models";

export default defineEventHandler(async (e) => {
  const data = await readBody(e);

  try {
    await User.create(data);
    const user = await User.findOne({ email: data.email });
    return {
      data: user,
    };
  } catch (error) {
    return error;
  }
});
