import { InvalidCredentialsError } from '@/errors/invalid-credentials'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { compare } from 'bcryptjs'

interface AuthenticateRequest {
  email: string,
  password: string
}

interface AutheticateResponse {
  org: Org
}

export class AuthenticateOrgService {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password
  }: AuthenticateRequest): Promise<AutheticateResponse> {
    const org = await this.orgsRepository.findByEmail(email)
    if (!org) {
      throw new InvalidCredentialsError()
    }
    const doesPasswordMatch = await compare(password, org.password)
    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError()
    }
    return { org }
  }
}