import graphqlHTTP from "express-graphql";
import { makeExecutableSchema } from "graphql-tools";

// import resolvers from '../resolvers'
import typeDefs from "../typeDefs";
import { env } from "../config/vars";

export const schema = makeExecutableSchema({
  //resolvers,
  typeDefs
});

export const server = graphqlHTTP({
  schema,
  graphiql: env === "development"
});
