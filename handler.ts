import { ApolloServer, gql } from "apollo-server-lambda";
import resolvers from "./resolvers";
import schema from "./schema";

const server = new ApolloServer({
  typeDefs: gql(schema),
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context
  }),
  introspection: true,
});

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: "*"
  }
});
