import mongoose, { type InferSchemaType } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, index: true },
    email: { type: String, required: true, index: true },
    passwordHash: { type: String, required: true },
    passwordResetToken: { type: String, default: null },
    apiKey: { type: String, default: null },
    isAdmin: { type: Boolean, default: false }
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
    versionKey: false
  }
);

export type User = InferSchemaType<typeof userSchema>;

export const UserModel =
  (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", userSchema);

