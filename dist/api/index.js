// npm install @apollo/server express graphql cors body-parser
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
//import { json } from 'body-parser';
import pkg from 'body-parser';
const { json } = pkg;
//import { typeDefs, resolvers } from './api/schema';
const apartmentsFromGuesty = [
    {
        id: '631815d66781f70033d49b10',
        title: "Griffith Wood - One Bedroom Apartment",
    }
];
export const typeDefs = `#graphql
type Apartment {
  id: String
  title: String
}

type Query {
  hello: String
  apartments: [Apartment]
}
`;
export const resolvers = {
    Query: {
        hello: () => 'world',
        apartments: () => apartmentsFromGuesty,
    },
};
const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();
app.use('/graphql', cors(), json(), expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
}));
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
export default httpServer;
