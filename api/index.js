import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import pkg from 'body-parser';
const { json } = pkg;
import { typeDefs, resolvers } from './schema.js';
import GuestyAPIDataSource from './guestyAPIDataSource.js'

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});
await server.start();
app.use(
  '/graphql',
  cors(),
  json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      const { cache } = server;
      return {
        // We create new instances of our data sources with each request,
        // passing in our server's cache.
        dataSources: {
          guestyAPI: new GuestyAPIDataSource({ cache })

        },
    }}
  }),
);


export default httpServer
