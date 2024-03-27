import { User } from "~/server/Models";

export default defineEventHandler(async (event) => {
  const { id } = await readBody(event);

  try {
    await User.findByIdAndDelete({ _id: id });
    return {
      data: "User deleted",
    };
  } catch (error) {
    setResponseStatus(event, 404, "User not found");
    return error;
  }
});
