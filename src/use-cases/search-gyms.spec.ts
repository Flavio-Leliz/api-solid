import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'academia 1',
      description: null,
      phone: null,
      latitude: -4.8385556,
      longitude: -37.7864934,
    })
    await gymsRepository.create({
      title: 'academia 2',
      description: null,
      phone: null,
      latitude: -4.8385556,
      longitude: -37.7864934,
    })

    const { gyms } = await sut.execute({
      query: '1',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'academia 1' })])
  })

  it('should be able to fech paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `academia ${i}`,
        description: null,
        phone: null,
        latitude: -4.8385556,
        longitude: -37.7864934,
      })
    }

    const { gyms } = await sut.execute({
      query: 'academia',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'academia 21' }),
      expect.objectContaining({ title: 'academia 22' }),
    ])
  })
})
