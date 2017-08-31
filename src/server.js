import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from './schemas/rootSchema'
require('dotenv').config()

const port = process.env.PORT || 4000
const app = express()

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}))

const server = app.listen(port)

export default server
