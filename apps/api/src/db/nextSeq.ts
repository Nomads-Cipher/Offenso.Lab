import { CounterModel } from "../models/Counter.js";

export async function nextSequence(key: string) {
  const result = await CounterModel.findOneAndUpdate(
    { key },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  ).lean();

  return result.seq;
}

