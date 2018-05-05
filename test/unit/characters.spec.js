import sinon from 'sinon'
import { expect } from 'chai'
import { GraphQLString, GraphQLNonNull } from 'graphql'
import characterSchema from '../../src/schemas/character'
import * as GOTService from '../../src/services/GOTService'

describe('Test schema', () => {
  const characterTypeMap = characterSchema.getTypeMap()

  describe('has correct character schema', () => {
    const characterFields = characterTypeMap.Character.getFields()

    it('Should have required field id where type is String', () => {
      expect(characterFields).to.have.property('id')
      expect(characterFields.id.type).to.deep.equals(new GraphQLNonNull(GraphQLString))
    })

    it('Should have field name where type is String', () => {
      expect(characterFields).to.have.property('name')
      expect(characterFields.name.type).to.deep.equals(GraphQLString)
    })

    it('Should have field actor where type is Actor', () => {
      expect(characterFields).to.have.property('actor')
      expect(characterFields.actor.type).to.deep.equals(characterSchema.getTypeMap().Actor)
    })
  })

  describe('has correct Actor schema', () => {
    const actorFields = characterTypeMap.Actor.getFields()

    it('Should have field name where type is String', () => {
      expect(actorFields).to.have.property('name')
      expect(actorFields.name.type).to.deep.equals(GraphQLString)
    })
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
    const charactersQuery = characterSchema.getTypeMap().Query.getFields().characters
    const expected = [
      { id: '1', name: 'John Snow', actor: { name: 'Kit Harington' }}
    ]
    const GOTServiceResponse = Promise.resolve({
      data: [
        { id: '1', name: 'John Snow', actor: { name: 'Kit Harington' }}
      ]
    })
    mockGOTService.expects('getCharacters').once().returns(GOTServiceResponse)
    
    charactersQuery.resolve()
      .then(res => {
        expect(res).to.deep.equals(expected)
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})
