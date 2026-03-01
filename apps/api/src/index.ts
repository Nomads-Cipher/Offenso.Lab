import "dotenv/config";
import express from "express";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import { createGraphqlServer } from "./graphql/server.js";
import { connectToMongo } from "./db/connect.js";
import { config } from "./config.js";
import { ensureUploadDir } from "./storage/uploadDir.js";
import { debugRouter } from "./routes/debug.js";
import { internalAdminRouter } from "./routes/internalAdmin.js";
import { documentsRouter } from "./routes/documents.js";
import { commentsRouter } from "./routes/comments.js";
import { uploadRouter } from "./routes/upload.js";

async function main() {
  await ensureUploadDir();
  await connectToMongo();

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

  app.listen(config.port, config.host, () => {
    // keep stdout clean for dev; a single line is enough
    console.log(`API listening on http://${config.host}:${config.port}`);
    console.log(`GraphQL ready at http://${config.host}:${config.port}/api/graphql`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

