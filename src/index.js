import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import path from 'path'
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'
import cors from 'cors'
// import jwt from 'jsonwebtoken'

import database from './database'
// import { refreshTokens } from './auth'
// REFAC: remove all process.env from here and get it from a config file
const configMongo = {
  uri: process.env.MONGO_URI
}

const { repositories, storages } = database.factory(configMongo)
// REFAC: remove all process.env from here and get it from a config file
// const SECRET = process.env.SECRET
// REFAC: remove all process.env from here and get it from a config file
// const SECRET2 = process.env.SECRET2

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')))

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')))

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const app = express()

app.use(cors('*'))

// const addUser = async (req, res, next) => {
//   const token = req.headers['x-token']
//   if (token) {
//     try {
//       const { user } = jwt.verify(token, SECRET)
//       req.user = user
//     } catch (err) {
//       const refreshToken = req.headers['x-refresh-token']
//       const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET2)
//       if (newTokens.token && newTokens.refreshToken) {
//         res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token')
//         res.set('x-token', newTokens.token)
//         res.set('x-refresh-token', newTokens.refreshToken)
//       }
//       req.user = newTokens.user
//     }
//   }
//   next()
// }

// app.use(addUser)

const graphqlEndpoint = '/graphql'

app.use(
  graphqlEndpoint,
  bodyParser.json(),
  graphqlExpress(req => ({
    schema,
    context: { repositories, storages },
  })),
)

app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndpoint }))

// REFAC: remove all process.env from here and get it from a config file
const port = process.env.PORT | 3000
app.listen(port)
console.log(`Listening at ${port}`)
