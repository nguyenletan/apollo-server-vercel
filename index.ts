import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import pkg from 'body-parser';
const {json} = pkg;
//import { typeDefs, resolvers } from './api/schema';


const apartmentsFromGuesty = [
  {
    id: '631815d66781f70033d49b10',
    title: "Griffith Wood - One Bedroom Apartment",
  }
]


export const typeDefs = `#graphql
type Apartment {
  id: String
  title: String
}

type Query {
  hello: String
  apartments: [Apartment]
}
`

export const resolvers = {
  Query: {
    hello: () => 'world',
    apartments: () => apartmentsFromGuesty,
  },
}


interface MyContext {
  token?: String;
}

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
});
await server.start();
app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  json(),
  expressMiddleware(server, {
    context: async ({req}) => ({token: req.headers.token}),
  }),
);

await new Promise<void>((resolve) => httpServer.listen({port: 4000}, resolve));
console.log(`🚀 Server ready at http://localhost:4000/graphql`);

export default httpServer