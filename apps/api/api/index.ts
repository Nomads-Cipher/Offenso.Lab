import type { IncomingMessage, ServerResponse } from "node:http";
import { getApp } from "../src/createApp.js";

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const app = await getApp();
  return app(req as any, res as any);
}

