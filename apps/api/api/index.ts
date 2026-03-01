import type { IncomingMessage, ServerResponse } from "node:http";
import express from "express";
import { getApp } from "../src/createApp.js";

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  // Ensure Vercel detects this as an Express-based function
  void express;
  const app = await getApp();
  return app(req as any, res as any);
}

