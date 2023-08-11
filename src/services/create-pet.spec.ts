import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { CreatePetService } from './create-pet'
import { beforeEach, describe, expect, it } from 'vitest'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let petRepository: InMemoryPetsRepository
let sut: CreatePetService
let orgsRepository: OrgsRepository

describe('Create pet use case', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreatePetService(petRepository, orgsRepository)
  })

  it('should be able to create a pet', async () => {
    const { pet } = await sut.execute({
      name: 'Lobinho',
      age: 2,
      about: 'A beautilful and happy puppie',
      address: 'Rua tal',
      city: 'Rolante City',
      state: 'RS',
      adopted: false,
      size: 'Big',
      orgId: '1'
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it.skip('should not be able to create a pet without an ORG', async () => {
    await expect(() => sut.execute({
      name: 'Lobinho',
      age: 2,
      about: 'A beautilful and happy puppie',
      address: 'Rua tal',
      city: 'Rolante City',
      state: 'RS',
      adopted: false,
      size: 'Big',
      orgId: ''
    })).rejects.toBeInstanceOf(Error)
  })
})