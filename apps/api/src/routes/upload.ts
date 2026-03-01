import express from "express";
import multer from "multer";
import path from "node:path";
import { requireAuth } from "../middleware/requireAuth.js";
import { ensureUploadDir, getUploadDirAbsolute } from "../storage/uploadDir.js";
import { nextSequence } from "../db/nextSeq.js";
import { DocumentModel } from "../models/Document.js";
import { v4 as uuidv4 } from "uuid";

export const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination: async (_req, _file, cb) => {
    try {
      await ensureUploadDir();
      cb(null, getUploadDirAbsolute());
    } catch (e) {
      cb(e as Error, getUploadDirAbsolute());
    }
  },
  filename: (_req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

uploadRouter.post("/documents/upload", requireAuth, upload.single("file"), async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: "Missing file" });

  const title = String(req.body?.title ?? path.parse(file.originalname).name);
  const category = String(req.body?.category ?? "general");
  const classification = String(req.body?.classification ?? "internal");

  const doc = await DocumentModel.create({
    docId: await nextSequence("documents"),
    uuid: uuidv4(),
    title,
    status: "ACTIVE",
    ownerId: req.user!.id,
    filename: file.originalname,
    fileSize: file.size,
    filePath: file.path,
    category,
    classification
  });

  res.json({
    id: doc.docId,
    uuid: doc.uuid,
    title: doc.title,
    ownerId: String(doc.ownerId),
    filename: doc.filename,
    fileSize: doc.fileSize,
    filePath: doc.filePath
  });
});

