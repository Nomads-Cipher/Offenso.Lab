import "dotenv/config";
import express from "express";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import { createGraphqlServer } from "./graphql/server.js";
import { connectToMongo } from "./db/connect.js";
import { ensureUploadDir } from "./storage/uploadDir.js";
import { debugRouter } from "./routes/debug.js";
import { internalAdminRouter } from "./routes/internalAdmin.js";
import { documentsRouter } from "./routes/documents.js";
import { commentsRouter } from "./routes/comments.js";
import { uploadRouter } from "./routes/upload.js";

let appPromise: Promise<express.Express> | null = null;

async function initApp() {
  try {
    await ensureUploadDir();
  } catch {
    // In serverless environments the filesystem may be restricted.
    // Continue booting; upload route may fail later.
  }

  try {
    await connectToMongo();
  } catch {
    // If DB connection fails, continue booting so health/errors are visible.
    // Resolvers/routes depending on DB may fail at request time.
  }

  const app = express();

  app.use(cors());
  app.use(express.json({ limit: "2mb" }));

  app.get("/health", (_req, res) => {
    res.json({ ok: true });
  });

  app.use("/__debug", debugRouter);
  app.use("/api/v1/internal", internalAdminRouter);
  app.use("/", documentsRouter);
  app.use("/", commentsRouter);
  app.use("/", uploadRouter);

  const server = createGraphqlServer();
  await server.start();

  app.use(
    "/api/graphql",
    expressMiddleware(server, {
      context: async () => ({})
    })
  );

  return app;
}

export async function getApp() {
  if (!appPromise) appPromise = initApp();
  try {
    return await appPromise;
  } catch (e) {
    // Don't permanently cache a failed init for the whole function instance
    appPromise = null;
    throw e;
  }
}

