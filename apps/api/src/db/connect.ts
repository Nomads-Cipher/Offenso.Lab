import mongoose from "mongoose";
import { config } from "../config.js";

export async function connectToMongo() {
  await mongoose.connect(config.mongoUri, {
    serverSelectionTimeoutMS: 8000
  });
  return mongoose.connection;
}

