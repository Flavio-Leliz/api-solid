import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list bearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'testando nearby gym: nearby',
        description: 'testando create gym',
        phone: '29292929229',
        latitude: -4.920423,
        longitude: -37.667743,
      })
    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'testando nearby gym: fars',
        description: 'testando create gym',
        phone: '29292929229',
        latitude: -4.839736,
        longitude: -37.784507,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -4.920423,
        longitude: -37.667743,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'testando nearby gym: nearby',
      }),
    ])
  })
})
