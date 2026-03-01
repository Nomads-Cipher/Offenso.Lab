import mongoose, { type InferSchemaType } from "mongoose";

const counterSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    seq: { type: Number, required: true, default: 0 }
  },
  { versionKey: false }
);

export type Counter = InferSchemaType<typeof counterSchema>;

export const CounterModel =
  (mongoose.models.Counter as mongoose.Model<Counter>) ||
  mongoose.model<Counter>("Counter", counterSchema);

