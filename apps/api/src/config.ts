export const config = {
  host: process.env.HOST ?? "127.0.0.1",
  port: Number(process.env.PORT ?? 4000),
  mongoUri: process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/cipherdocs",
  uploadDir: process.env.UPLOAD_DIR ?? "uploads"
};

