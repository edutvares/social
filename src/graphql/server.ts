import { createServer } from "node:http";
import { createYoga, createSchema } from "graphql-yoga";
import { services } from "../container.js";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";
import type { Ctx } from "./context.js";

const yoga = createYoga<object, Ctx>({
  schema: createSchema({ typeDefs, resolvers }),
  context: () => ({ services }),
});

createServer(yoga).listen(4000, () => {
  console.log("GraphQL em http://localhost:4000/graphql");
});
