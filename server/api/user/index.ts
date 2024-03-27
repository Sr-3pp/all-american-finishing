import { User } from "~/server/Models";

export default defineEventHandler(async () => {
  try {
    const users = await User.find();
    return {
      data: users,
    };
  } catch (error) {
    return {
      data: [],
      error,
    };
  }
});
