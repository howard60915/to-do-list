import { ApolloServer } from "apollo-server-lambda";
import resolvers from "./resolvers";
import schema from "./schema";

const server = new ApolloServer({
  typeDefs: schema,
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
  playground: {
    tracing: true
  }
});

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: "*"
  }
});
