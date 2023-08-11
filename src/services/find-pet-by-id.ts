import { ResourceNotFoundError } from '@/errors/resource-not-found'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FindPetByIdResponse {
  pet: Pet
}

export class FindPetByIdService {
  constructor(private petsRepository: PetsRepository) { }

  async execute(id: string): Promise<FindPetByIdResponse> {
    const pet = await this.petsRepository.findById(id)
    if (!pet) {
      throw new ResourceNotFoundError()
    }
    return { pet }
  }
}