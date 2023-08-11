import { AuthenticateOrgService } from './authenticate-org'
import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '@/errors/invalid-credentials'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateOrgService

describe('Authenticate ORG use case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateOrgService(orgsRepository)
  })

  it('Should be able to authenticate an ORG', async () => {
    await orgsRepository.create({
      name: 'Org dos pets',
      address: 'Rua dos Pets',
      city: 'Pet City',
      state: 'MG',
      password: await hash('123456', 6),
      email: 'johndoe@org.net',
      whatsapp: '35999663311',
    })

    const { org }  = await sut.execute({
      email: 'johndoe@org.net',
      password: '123456',
    })
    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() => sut.execute({
      email: 'johndoe@email.com',
      password: '123456'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await orgsRepository.create({
      name: 'Org dos pets',
      address: 'Rua dos Pets',
      city: 'Pet City',
      state: 'MG',
      password: await hash('123456', 6),
      email: 'johndoe@org.net',
      whatsapp: '35999663311',
    })
    await expect(() => sut.execute({
      email: 'johndoe@org.net',
      password: '1234567'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})