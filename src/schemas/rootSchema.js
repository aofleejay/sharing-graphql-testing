import { makeExecutableSchema } from 'graphql-tools'
import {
  typeDefs as charactersTypeDefs,
  resolvers as charactersResolvers,
} from './characters'

const typeDefs = `
  ${charactersTypeDefs}

  type Query {
    characters: [Character]
  }
`

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: charactersResolvers,
})

export default schema
