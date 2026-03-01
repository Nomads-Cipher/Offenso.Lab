import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/User.js";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
      username: string;
      isAdmin: boolean;
    };
  }
}

function decodeToken(token: string) {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf8");
    return decoded;
  } catch {
    return token;
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.header("Authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice("Bearer ".length).trim() : "";

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  const userId = decodeToken(token);
  if (!mongoose.isValidObjectId(userId)) return res.status(401).json({ error: "Unauthorized" });

  const user = await UserModel.findById(userId).lean();
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  req.user = { id: String(user._id), username: user.username, isAdmin: !!user.isAdmin };
  next();
}

