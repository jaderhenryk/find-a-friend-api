import { SearchPetsRequest } from '@/@types/interfaces/search-pets-request'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface SearchPetsResponse {
  pets: Pet[]
}

export class SearchPetsService {
  constructor(private petsRepository: PetsRepository) { }

  async execute(data: SearchPetsRequest): Promise<SearchPetsResponse> {
    const pets = await this.petsRepository.search(data)
    return { pets }
  }
}