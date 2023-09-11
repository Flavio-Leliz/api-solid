import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to registration', async () => {
    const { gym } = await sut.execute({
      title: 'testando gym',
      description: null,
      phone: null,
      latitude: -4.8385556,
      longitude: -37.7864934,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
