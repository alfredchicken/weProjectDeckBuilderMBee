import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, 
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: "user" },
    failedLoginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

export default User;
