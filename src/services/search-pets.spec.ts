import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchPetsService } from './search-pets'

let petRepository: InMemoryPetsRepository
let sut: SearchPetsService

describe('Search pet use case', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetsRepository()
    sut = new SearchPetsService(petRepository)
  })

  it('should be able to search a pet by its characteristics', async () => {
    await petRepository.create({
      name: 'Lobinho',
      age: 2,
      about: 'A beautilful and happy puppie',
      address: 'Rua tal',
      city: 'Rolante City',
      state: 'RS',
      adopted: false,
      size: 'Big',
      org_id: '1'
    })
    await petRepository.create({
      name: 'Tobi',
      age: 4,
      about: 'A silent and nice dog.',
      address: 'Rua do tobi',
      city: 'Rolante City',
      state: 'RS',
      adopted: false,
      size: 'Big',
      org_id: '1'
    })
    const { pets } = await sut.execute({
      city: 'Rolante City',
      size: 'Big'
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'Lobinho' }),
      expect.objectContaining({ name: 'Tobi' }),
    ])
  })
})