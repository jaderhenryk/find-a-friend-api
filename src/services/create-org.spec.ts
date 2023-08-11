import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { CreateOrgService } from './create-org'
import { beforeEach, describe, expect, it } from 'vitest'

let orgRepository: InMemoryOrgsRepository
let sut: CreateOrgService

describe('Create org use case', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgService(orgRepository)
  })

  it('should be able to create a ORG', async () => {
    const { org } = await sut.execute({
      name: 'Org dos pets',
      address: 'Rua dos Pets',
      city: 'Pet City',
      state: 'MG',
      password: '123456',
      email: 'johndoe@org.net',
      whatsapp: '35999663311',
    })

    expect(org.id).toEqual(expect.any(String))
  })
})