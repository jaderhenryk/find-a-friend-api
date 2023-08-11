import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SearchPetsService } from '../search-pets'

export function makeSearchPetsService () {
  const petsRepository = new PrismaPetsRepository()
  const createPetsService = new SearchPetsService(petsRepository)
  return createPetsService
}