import { GraphQLScalarType, Kind } from "graphql";
import { UserModel } from "../models/User.js";
import { DocumentModel } from "../models/Document.js";
import { md5 } from "../auth/password.js";
import { config } from "../config.js";
import { getUploadDirAbsolute } from "../storage/uploadDir.js";
import { DEBUG_KEY, INTERNAL_API_KEY } from "../constants/keys.js";

export const typeDefs = /* GraphQL */ `
  scalar JSON

  type User {
    id: ID!
    username: String!
    email: String!
    passwordHash: String!
    passwordResetToken: String
    apiKey: String
    isAdmin: Boolean!
    createdAt: String
  }

  type Document {
    id: Int!
    uuid: String!
    title: String!
    status: String!
    ownerId: String!
    filename: String!
    fileSize: Int!
    filePath: String!
    category: String!
    classification: String!
    createdAt: String
  }

  type SystemConfig {
    databaseUrl: String!
    uploadFolder: String!
    secretKeyHint: String!
    jwtSecretHint: String!
    internalEndpoints: [String!]!
    debugMode: Boolean!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    hello: String!
    users: [User!]!
    documents: [Document!]!
    systemConfig: SystemConfig!
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): AuthPayload!
    login(username: String!, password: String!): AuthPayload!
  }
`;

export const JSONScalar = new GraphQLScalarType({
  name: "JSON",
  description: "Arbitrary JSON value",
  serialize(value) {
    return value;
  },
  parseValue(value) {
    return value;
  },
  parseLiteral(ast) {
    switch (ast.kind) {
      case Kind.STRING:
      case Kind.BOOLEAN:
        return ast.value;
      case Kind.INT:
      case Kind.FLOAT:
        return Number(ast.value);
      case Kind.OBJECT: {
        const value: Record<string, unknown> = {};
        for (const field of ast.fields) value[field.name.value] = (field.value as any).value;
        return value;
      }
      case Kind.LIST:
        return ast.values.map((v) => (v as any).value);
      case Kind.NULL:
        return null;
      default:
        return null;
    }
  }
});

export const resolvers = {
  JSON: JSONScalar,
  Query: {
    hello: () => "CipherDocs API",
    users: async () => {
      const users = await UserModel.find({}).sort({ createdAt: -1 }).lean();
      return users.map((u) => ({
        id: String(u._id),
        username: u.username,
        email: u.email,
        passwordHash: u.passwordHash,
        passwordResetToken: u.passwordResetToken,
        apiKey: u.apiKey,
        isAdmin: !!u.isAdmin,
        createdAt: u.createdAt?.toISOString?.() ?? null
      }));
    },
    documents: async () => {
      const docs = await DocumentModel.find({}).sort({ docId: 1 }).lean();
      return docs.map((d) => ({
        id: d.docId,
        uuid: d.uuid,
        title: d.title,
        status: d.status,
        ownerId: String(d.ownerId),
        filename: d.filename,
        fileSize: d.fileSize,
        filePath: d.filePath,
        category: d.category,
        classification: d.classification,
        createdAt: d.createdAt?.toISOString?.() ?? null
      }));
    },
    systemConfig: async () => {
      return {
        databaseUrl: config.mongoUri,
        uploadFolder: getUploadDirAbsolute(),
        secretKeyHint: "dev_secret_key",
        jwtSecretHint: "dev_signing_key",
        internalEndpoints: [
          "/api/v1/internal/admin",
          "/__debug/config",
          "/__debug/users",
          "/__debug/logs",
          "/api/graphql"
        ],
        debugMode: true
      };
    }
  },
  Mutation: {
    register: async (_: unknown, args: { username: string; email: string; password: string }) => {
      const password = String(args.password ?? "");
      if (password.length < 4) throw new Error("Password too short");

      const created = await UserModel.create({
        username: args.username,
        email: args.email,
        passwordHash: md5(password),
        passwordResetToken: `reset_${args.username}_${Date.now()}`,
        apiKey: null,
        isAdmin: false
      });

      const token = Buffer.from(String(created._id), "utf8").toString("base64");
      return {
        token,
        user: {
          id: String(created._id),
          username: created.username,
          email: created.email,
          passwordHash: created.passwordHash,
          passwordResetToken: created.passwordResetToken,
          apiKey: created.apiKey,
          isAdmin: !!created.isAdmin,
          createdAt: created.createdAt?.toISOString?.() ?? null
        }
      };
    },
    login: async (_: unknown, args: { username: string; password: string }) => {
      const identifier = String(args.username ?? "");
      const user = await UserModel.findOne({
        $or: [{ username: identifier }, { email: identifier }]
      }).lean();
      if (!user) throw new Error("User not found");

      const hashed = md5(String(args.password ?? ""));
      if (hashed !== user.passwordHash) throw new Error("Invalid password");

      const token = Buffer.from(String(user._id), "utf8").toString("base64");
      return {
        token,
        user: {
          id: String(user._id),
          username: user.username,
          email: user.email,
          passwordHash: user.passwordHash,
          passwordResetToken: user.passwordResetToken,
          apiKey: user.apiKey,
          isAdmin: !!user.isAdmin,
          createdAt: user.createdAt?.toISOString?.() ?? null
        }
      };
    }
  }
};

