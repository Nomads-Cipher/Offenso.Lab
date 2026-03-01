import type { Request, Response, NextFunction } from "express";
import { DEBUG_KEY } from "../constants/keys.js";

export function requireDebugKey(req: Request, res: Response, next: NextFunction) {
  const key = req.header("X-Debug-Key");
  if (key !== DEBUG_KEY) return res.status(401).json({ error: "Unauthorized" });
  next();
}

