import sinon from 'sinon'
import { expect } from 'chai'
import supertest from 'supertest'
import axios from 'axios'
import server from '../../src/server'
import { GOT_SERVICE } from '../../src/constants/endpoints'

describe('Test query', () => {
  it('has correct characters query', (done) => {
    const request = supertest.agent(server)
    const query = {
      query: `
        query {
          characters {
            id
            name
            gender {
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
          gender: {
            name: "Male"
          }
        }
      ]
    }
    const serviceResponse = [
      {
        id: "1",
        name: "John Snow",
        gender: {
          name: "Male"
        },
      },
    ]
    const mockAxios = sinon.mock(axios)
    mockAxios.expects('get').withArgs(`${GOT_SERVICE}/characters`).once().returns(Promise.resolve({ data: serviceResponse }))

    request.post('/graphql')
    .set('Accept', 'application/json')
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