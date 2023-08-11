import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { CreateOrgService } from '../create-org'

export function makeCreateOrgservice () {
  const orgsRepository = new PrismaOrgsRepository()
  const createorgsService = new CreateOrgService(orgsRepository)
  return createorgsService
}