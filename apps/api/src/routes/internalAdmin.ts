import express from "express";
import { requireInternalApiKey } from "../middleware/requireApiKey.js";
import { requireInternalIp } from "../middleware/internalIpCheck.js";
import { config } from "../config.js";
import { getUploadDirAbsolute } from "../storage/uploadDir.js";

export const internalAdminRouter = express.Router();

internalAdminRouter.get("/admin", requireInternalApiKey, requireInternalIp, (_req, res) => {
  res.json({
    databaseUrl: config.mongoUri,
    uploadFolder: getUploadDirAbsolute(),
    secret_key: "53a3c616f4f5b2b5c9e8a9f9a0b1c2d3",
    jwtSecretHint: "dev_signing_key",
    internalEndpoints: ["/api/v1/internal/admin", "/__debug/config", "/__debug/logs", "/__debug/users"],
    debugMode: true
  });
});

