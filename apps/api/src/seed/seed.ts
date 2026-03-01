import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { connectToMongo } from "../db/connect.js";
import { UserModel } from "../models/User.js";
import { DocumentModel } from "../models/Document.js";
import { CommentModel } from "../models/Comment.js";
import { CounterModel } from "../models/Counter.js";
import { md5 } from "../auth/password.js";
import { ensureUploadDir, getUploadDirAbsolute } from "../storage/uploadDir.js";
import { nextSequence } from "../db/nextSeq.js";
import { v4 as uuidv4 } from "uuid";

async function seed() {
  await ensureUploadDir();
  await connectToMongo();

  await Promise.all([
    UserModel.deleteMany({}),
    DocumentModel.deleteMany({}),
    CommentModel.deleteMany({}),
    CounterModel.deleteMany({})
  ]);

  const admin = await UserModel.create({
    username: "admin",
    email: "admin@cipherdocs.local",
    passwordHash: md5("password"),
    passwordResetToken: "reset_admin_token_123",
    apiKey: "nvk_d56f1953e015cc01e79c84028089135d",
    isAdmin: true
  });

  const sarah = await UserModel.create({
    username: "sarah.chen",
    email: "sarah.chen@techflow.io",
    passwordHash: md5("Keepmesafeandwarm"),
    passwordResetToken: "reset_sarah_token_abc",
    apiKey: "user_api_sarah_123",
    isAdmin: false
  });

  const hacker = await UserModel.create({
    username: "hacker_admin",
    email: "hacker@evil.com",
    passwordHash: md5("password123"),
    passwordResetToken: "reset_hacker_token_xyz",
    apiKey: "user_api_hacker_123",
    isAdmin: false
  });

  const uploadDir = getUploadDirAbsolute();

  async function writeSampleFile(name: string, content: string) {
    const fullPath = path.join(uploadDir, name);
    await fs.writeFile(fullPath, content, "utf8");
    const stat = await fs.stat(fullPath);
    return { fullPath, size: stat.size };
  }

  const file1 = await writeSampleFile(
    "quarterly-report-q4.txt",
    "CipherDocs - Quarterly Report Q4\n\nRevenue: $1,234,567\nNotes: internal only\n"
  );
  const file2 = await writeSampleFile(
    "employee-onboarding.txt",
    "Employee Onboarding Checklist\n\n- Laptop\n- Access badges\n- Accounts\n"
  );
  const file3 = await writeSampleFile(
    "incident-notes.txt",
    "Incident Notes\n\nDo not share externally.\nTimeline: ...\n"
  );

  const doc1 = await DocumentModel.create({
    docId: await nextSequence("documents"),
    uuid: uuidv4(),
    title: "Quarterly Report Q4",
    ownerId: admin._id,
    filename: path.basename(file1.fullPath),
    fileSize: file1.size,
    filePath: file1.fullPath,
    category: "finance",
    classification: "confidential"
  });

  const doc2 = await DocumentModel.create({
    docId: await nextSequence("documents"),
    uuid: uuidv4(),
    title: "Employee Onboarding",
    ownerId: sarah._id,
    filename: path.basename(file2.fullPath),
    fileSize: file2.size,
    filePath: file2.fullPath,
    category: "hr",
    classification: "internal"
  });

  const doc3 = await DocumentModel.create({
    docId: await nextSequence("documents"),
    uuid: uuidv4(),
    title: "Incident Notes",
    ownerId: hacker._id,
    filename: path.basename(file3.fullPath),
    fileSize: file3.size,
    filePath: file3.fullPath,
    category: "security",
    classification: "restricted"
  });

  await CommentModel.create([
    { documentId: doc1.docId, authorId: admin._id, body: "Send to board by Friday." },
    { documentId: doc2.docId, authorId: sarah._id, body: "Updated checklist for contractors." },
    { documentId: doc3.docId, authorId: hacker._id, body: "Need to redact names before sharing." }
  ]);

  return { admin, sarah, hacker, docs: [doc1, doc2, doc3] };
}

seed()
  .then(({ docs }) => {
    console.log(`Seeded ${docs.length} documents`);
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

