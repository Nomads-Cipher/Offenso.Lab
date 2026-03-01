import { spawnSync } from "node:child_process";

function run(cmd, args) {
  const result = spawnSync(cmd, args, { stdio: "inherit", shell: process.platform === "win32" });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

run("npm", ["--prefix", "apps/web", "install", "--no-fund", "--no-audit"]);
run("npm", ["--prefix", "apps/web", "run", "build"]);

