import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { CommentModel } from "../models/Comment.js";

export const commentsRouter = express.Router();

commentsRouter.get("/documents/:id/comments", requireAuth, async (req, res) => {
  const documentId = Number(req.params.id);
  const comments = await CommentModel.find({ documentId }).sort({ createdAt: 1 }).lean();
  res.json({
    documentId,
    count: comments.length,
    comments: comments.map((c) => ({
      id: String(c._id),
      documentId: c.documentId,
      authorId: String(c.authorId),
      body: c.body,
      createdAt: c.createdAt
    }))
  });
});

commentsRouter.post("/documents/:id/comments", requireAuth, async (req, res) => {
  const documentId = Number(req.params.id);
  const body = String(req.body?.body ?? "");

  const created = await CommentModel.create({
    documentId,
    authorId: req.user!.id,
    body
  });

  res.json({
    id: String(created._id),
    documentId: created.documentId,
    authorId: String(created.authorId),
    body: created.body,
    createdAt: created.createdAt
  });
});

