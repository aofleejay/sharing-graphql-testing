import { getCharacters } from '../services/GOTService'

const typeDefs = `
  type Character {
    id: String!
    name: String
    gender: Gender
  }

  type Gender {
    name: String
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

export {
  typeDefs,
  resolvers,
}
