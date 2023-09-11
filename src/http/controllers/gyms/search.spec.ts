import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Search Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search gyms by title', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'testando search gym 1',
        description: 'testando create gym',
        phone: '29292929229',
        latitude: -4.8385556,
        longitude: -37.7864934,
      })
    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'testando search gym 2',
        description: 'testando create gym',
        phone: '29292929229',
        latitude: -4.8385556,
        longitude: -37.7864934,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        query: '1',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'testando search gym 1',
      }),
    ])
  })
})
