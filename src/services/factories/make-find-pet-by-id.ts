import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FindPetByIdService } from '../find-pet-by-id'

export function makeFindPetByIdService () {
  const petsRepository = new PrismaPetsRepository()
  const createPetsService = new FindPetByIdService(petsRepository)
  return createPetsService
}