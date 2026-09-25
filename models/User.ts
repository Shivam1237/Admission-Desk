import { model, models, Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["manager", "counsellor"], required: true },
});

export const User = models.User || model("User", userSchema);
