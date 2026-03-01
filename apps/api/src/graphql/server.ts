import { ApolloServer } from "@apollo/server";
import { typeDefs, resolvers } from "./schema.js";

export function createGraphqlServer() {
  return new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true
  });
}

