import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, // unique = einzigartig, hier jeder Username nur einmal erlaubt in der db
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    failedLoginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

export default User;
