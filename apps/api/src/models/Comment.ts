import mongoose, { type InferSchemaType } from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    documentId: { type: Number, required: true, index: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
    body: { type: String, required: true }
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
    versionKey: false
  }
);

export type Comment = InferSchemaType<typeof commentSchema>;

export const CommentModel =
  (mongoose.models.Comment as mongoose.Model<Comment>) ||
  mongoose.model<Comment>("Comment", commentSchema);

