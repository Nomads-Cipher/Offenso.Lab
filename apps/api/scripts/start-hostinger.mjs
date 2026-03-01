import { spawnSync } from "node:child_process";

if (!process.env.HOST) process.env.HOST = "0.0.0.0";
if (!process.env.PORT) process.env.PORT = "4000";

const result = spawnSync("node", ["dist/index.js"], {
  stdio: "inherit",
  shell: process.platform === "win32"
});

process.exit(result.status ?? 1);

