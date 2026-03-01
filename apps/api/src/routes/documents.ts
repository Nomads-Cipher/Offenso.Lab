import express from "express";
import { DocumentModel } from "../models/Document.js";
import { requireAuth } from "../middleware/requireAuth.js";
import fs from "node:fs/promises";

export const documentsRouter = express.Router();

documentsRouter.get("/documents/:id", requireAuth, async (req, res) => {
  const docId = Number(req.params.id);
  const doc = await DocumentModel.findOne({ docId }).lean();
  if (!doc) return res.status(404).json({ error: "Not found" });

  res.json({
    id: doc.docId,
    uuid: doc.uuid,
    title: doc.title,
    status: doc.status,
    ownerId: String(doc.ownerId),
    filename: doc.filename,
    fileSize: doc.fileSize,
    filePath: doc.filePath,
    category: doc.category,
    classification: doc.classification,
    createdAt: doc.createdAt
  });
});

documentsRouter.get("/documents/:id/download", requireAuth, async (req, res) => {
  const docId = Number(req.params.id);
  const doc = await DocumentModel.findOne({ docId }).lean();
  if (!doc) return res.status(404).json({ error: "Not found" });
  return res.download(doc.filePath, doc.filename);
});

documentsRouter.post("/documents/:id/delete", requireAuth, async (req, res) => {
  const docId = Number(req.params.id);
  const doc = await DocumentModel.findOne({ docId }).lean();
  if (!doc) return res.status(404).json({ error: "Not found" });

  await DocumentModel.deleteOne({ docId });
  await fs.unlink(doc.filePath).catch(() => {});

  res.json({ ok: true, deleted: docId });
});

