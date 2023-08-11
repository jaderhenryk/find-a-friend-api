import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'

interface CreateOrgRequest {
  name: string,
  email: string,
  password: string,
  address: string,
  city: string,
  state: string,
  whatsapp: string,
}

interface CreateOrgResponse {
  org: Org
}

export class CreateOrgService {
  constructor(private orgsRepository: OrgsRepository) { }

  async execute({
    name,
    email,
    password,
    address,
    city,
    state,
    whatsapp
  }: CreateOrgRequest): Promise<CreateOrgResponse> {
    const passwordHash = await hash(password, 6)
    const org = await this.orgsRepository.create({
      name,
      email,
      password: passwordHash,
      address,
      city,
      state,
      whatsapp
    })
    return { org }
  }
}