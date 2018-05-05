import sinon from 'sinon'
import { expect } from 'chai'
import supertest from 'supertest'
import axios from 'axios'
import server from '../../src/server'
import { GOT_SERVICE } from '../../src/constants/endpoints'

describe('Test query', () => {
  let mockAxios

  beforeEach(() => {
    mockAxios = sinon.mock(axios)
  })

  afterEach(() => {
    mockAxios.restore()
  })

  it('has correct characters query', (done) => {
    const query = {
      query: `
        query {
          characters {
            id
            name
            actor {
              name
            }
          }
        }
      `
    }
    const expected = {
      characters: [
        {
          id: "1",
          name: "John Snow",
          actor: {
            name: "Kit Harington"
          }
        }
      ]
    }
    mockAxios.expects('get').withArgs(`${GOT_SERVICE}/characters`).once().returns(Promise.resolve({
      data: [
        {
          id: "1",
          name: "John Snow",
          actor: {
            name: "Kit Harington"
          }
        }
      ]
    }))

    supertest.agent(server)
      .post('/graphql')
      .send(query)
      .then(res => {
        mockAxios.verify()
        expect(res.body.data).to.deep.equals(expected)
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})