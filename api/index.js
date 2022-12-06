import { ApolloServer, gql } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import http from 'http'
import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

const httpServer = http.createServer(app)

const apartmentsFromGuesty = [
  {
    id: '631815d66781f70033d49b10',
    title: "Griffith Wood - One Bedroom Apartment",
  }
]

const typeDefs = gql`
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

const startApolloServer = async (app, httpServer) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start()
  server.applyMiddleware({ app })
}

startApolloServer(app, httpServer)

export default httpServer
