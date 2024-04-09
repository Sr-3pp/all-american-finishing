import mongoose from "mongoose";
import bcrypt from "mongoose-bcrypt";
const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, bcrypt: true, select: false },
    kind: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true, strict: true, strictQuery: true }
);
schema.plugin(bcrypt);
export default mongoose.model("User", schema, "user");
