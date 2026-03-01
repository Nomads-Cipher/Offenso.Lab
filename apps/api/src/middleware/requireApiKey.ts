import type { Request, Response, NextFunction } from "express";
import { INTERNAL_API_KEY } from "../constants/keys.js";

export function requireInternalApiKey(req: Request, res: Response, next: NextFunction) {
  const key = req.header("X-API-Key");
  if (key !== INTERNAL_API_KEY) return res.status(401).json({ error: "Unauthorized" });
  next();
}

