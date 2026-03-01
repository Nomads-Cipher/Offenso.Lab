import mongoose, { type InferSchemaType } from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    docId: { type: Number, required: true, unique: true, index: true },
    uuid: { type: String, required: true, index: true },
    title: { type: String, required: true },
    status: { type: String, default: "ACTIVE" },
    ownerId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
    filename: { type: String, required: true },
    fileSize: { type: Number, required: true },
    filePath: { type: String, required: true },
    category: { type: String, default: "general" },
    classification: { type: String, default: "internal" }
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
    versionKey: false
  }
);

export type Document = InferSchemaType<typeof documentSchema>;

export const DocumentModel =
  (mongoose.models.Document as mongoose.Model<Document>) ||
  mongoose.model<Document>("Document", documentSchema);

