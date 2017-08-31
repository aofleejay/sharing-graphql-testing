import { GraphQLString, GraphQLNonNull } from 'graphql'
import sinon from 'sinon'
import { expect } from 'chai'
import rootSchema from '../../src/schemas/rootSchema'
import * as GOTService from '../../src/services/GOTService'

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
  let mockGOTService

  beforeEach(() => {
    mockGOTService = sinon.mock(GOTService)
  })

  afterEach(() => {
    mockGOTService.restore()
  })

  it('has correct characters query', (done) => {
    const charactersQuery = rootSchema._typeMap.Query.getFields().characters
    const expected = [
      { id: '1', name: 'John Snow', gender: { name: 'Male' }}
    ]
    const GOTServiceResponse = Promise.resolve({
      data: [
        { id: '1', name: 'John Snow', gender: { name: 'Male' }}
      ]
    })
    mockGOTService.expects('getCharacters').once().returns(GOTServiceResponse)

    charactersQuery.resolve().then(res => {
      expect(res).to.deep.equals(expected)
      done()
    }).catch(err => {
      done(err)
    })
  })
})
