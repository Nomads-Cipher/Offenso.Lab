import type { IncomingMessage, ServerResponse } from "node:http";
import express from "express";
import { getApp } from "../dist/createApp.js";

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  // Ensure Vercel detects this as an Express-based function
  void express;
  try {
    const app = await getApp();
    return app(req as any, res as any);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify({ error: "FUNCTION_INVOCATION_FAILED", message: String((e as any)?.message ?? e) }));
  }
}

