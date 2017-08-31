import sinon from 'sinon'
import { expect } from 'chai'
import { GraphQLString, GraphQLNonNull } from 'graphql'
import rootSchema from '../../src/schemas/rootSchema'

describe('Test schema', () => {
  it('has correct character schema', () => {
    const characterSchema = rootSchema._typeMap.Character.getFields()

    expect(characterSchema).to.have.property('name')
    expect(characterSchema.name.type).to.deep.equals(GraphQLString)

    expect(characterSchema).to.have.property('id')
    expect(characterSchema.id.type).to.deep.equals(new GraphQLNonNull(GraphQLString))

    expect(characterSchema).to.have.property('gender')
    expect(characterSchema.gender.type).to.deep.equals(rootSchema._typeMap.Gender)
  })

  it('has correct gender schema', () => {
    const genderSchema = rootSchema._typeMap.Gender.getFields()

    expect(genderSchema).to.have.property('name')
    expect(genderSchema.name.type).to.deep.equals(GraphQLString)
  })
})

describe('Test resolvers', () => {
  it('has correct characters query', () => {
    
  })
})
