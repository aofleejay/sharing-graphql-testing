import { makeExecutableSchema } from 'graphql-tools'
import { getCharacters } from '../services/GOTService'

const typeDefs = `
  type Character {
    id: String!
    name: String
    actor: Actor
  }

  type Actor {
    name: String
  }

  type Query {
    characters: [Character]
  }
`

const resolvers = {
  Query: {
    characters() {
      return getCharacters()
        .then(res => res.data)
    }
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

export default schema
