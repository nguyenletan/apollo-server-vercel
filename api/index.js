
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import pkg from 'body-parser';
const { json } = pkg;
//import { typeDefs, resolvers } from './schema';



const apartmentsFromGuesty = [
  {
    id: '631815d66781f70033d49b10',
    title: "Griffith Wood - One Bedroom Apartment",
  }
]

const typeDefs = `#graphql
  type Apartment {
    id: String
    title: String
  }
  
  type Query {
    hello: String
    apartments: [Apartment]
  }
`

const resolvers = {
  Query: {
    hello: () => 'world',
    apartments: () => apartmentsFromGuesty,
  },
}

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();
app.use(
  '/graphql',
  cors(),
  json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  }),
);


export default httpServer
