import jwt from "jsonwebtoken";
import { User } from "@/server/Models";
import type { User as UserType } from "~/types/User";

const { public: config } = useRuntimeConfig();

export default defineEventHandler(async (e) => {
  const { email, password }: UserType = await readBody(e);
  if (!email || !password) {
    setResponseStatus(e, 500);
    return {
      error: "Email and password are required",
    };
  }

  try {
    const user: any = await User.findOne({ email }).select("+password");
    if (!user) {
      setResponseStatus(e, 404);
      return {
        error: "User not found",
      };
    }

    const validatePassword = await user.verifyPasswordSync(password);

    if (!validatePassword) {
      setResponseStatus(e, 401);
      return {
        error: "Invalid password",
      };
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      config.jwt.secret,
      {
        expiresIn: "2h",
      }
    );

    return {
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          kind: user.kind,
        },
        token,
      },
    };
  } catch (error) {
    setResponseStatus(e, 500);
    return {
      error,
    };
  }
});
