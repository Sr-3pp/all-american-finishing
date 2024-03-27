import { User } from "~/server/Models";

export default defineEventHandler(async (event) => {
  const data = await readBody(event);

  try {
    await User.findOneAndUpdate({ email: data.email }, data);
    const user = await User.findOne({ email: data.email });
    return {
      data: user,
    };
  } catch (error) {
    setResponseStatus(event, 404, "User not found");
    return error;
  }
});
