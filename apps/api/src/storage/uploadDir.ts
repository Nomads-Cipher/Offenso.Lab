import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "../config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getUploadDirAbsolute() {
  return path.resolve(__dirname, "../../", config.uploadDir);
}

export async function ensureUploadDir() {
  await fs.mkdir(getUploadDirAbsolute(), { recursive: true });
}

