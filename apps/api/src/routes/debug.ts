import express from "express";
import fs from "node:fs/promises";
import path from "node:path";
import { requireDebugKey } from "../middleware/requireDebugKey.js";
import { config } from "../config.js";
import { getUploadDirAbsolute } from "../storage/uploadDir.js";
import { UserModel } from "../models/User.js";
import { DEBUG_KEY, INTERNAL_API_KEY } from "../constants/keys.js";

export const debugRouter = express.Router();

debugRouter.use(requireDebugKey);

debugRouter.get("/config", (_req, res) => {
  res.json({
    debugMode: true,
    debugKey: DEBUG_KEY,
    mongoUri: config.mongoUri,
    uploadFolder: getUploadDirAbsolute(),
    internalEndpoints: ["/__debug/config", "/__debug/users", "/__debug/logs", "/api/v1/internal/admin"],
    internalApiKey: INTERNAL_API_KEY,
    env: process.env
  });
});

debugRouter.get("/users", async (_req, res) => {
  const users = await UserModel.find({}).lean();
  res.json({
    count: users.length,
    users: users.map((u) => ({
      id: String(u._id),
      username: u.username,
      email: u.email,
      passwordHash: u.passwordHash,
      passwordResetToken: u.passwordResetToken,
      apiKey: u.apiKey,
      isAdmin: !!u.isAdmin
    }))
  });
});

debugRouter.get("/metrics", (_req, res) => {
  res.json({
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    pid: process.pid
  });
});

function looksLikeProcSelfEnviron(file: string) {
  const normalized = file.replaceAll("\\", "/").toLowerCase();
  return normalized.endsWith("/proc/self/environ");
}

debugRouter.get("/logs", async (req, res) => {
  const file = String(req.query.file ?? "");

  if (!file) {
    return res.status(500).json({
      error: "No such file or directory",
      path: "/var/log/cipherdocs/app.log"
    });
  }

  if (looksLikeProcSelfEnviron(file)) {
    const environ = Object.entries(process.env)
      .map(([k, v]) => `${k}=${v ?? ""}`)
      .join("\u0000");
    return res.json({ file, content: environ });
  }

  const abs = path.isAbsolute(file) ? file : path.resolve(process.cwd(), file);
  const content = await fs.readFile(abs, "utf8");
  res.json({ file, content });
});

