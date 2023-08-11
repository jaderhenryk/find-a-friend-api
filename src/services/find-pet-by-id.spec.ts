import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FindPetByIdService } from './find-pet-by-id'

let petRepository: InMemoryPetsRepository
let sut: FindPetByIdService

describe('Search pet use case', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetsRepository()
    sut = new FindPetByIdService(petRepository)
  })

  it('should be able to find a pet by id', async () => {
    const petCreated = await petRepository.create({
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
    const { pet } = await sut.execute(petCreated.id)

    expect(pet).toEqual(expect.objectContaining({ name: 'Lobinho' }))
  })
})