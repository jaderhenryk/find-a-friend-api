import { ResourceNotFoundError } from '@/errors/resource-not-found'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet, Size } from '@prisma/client'

interface CreatePetRequest {
  name: string
  age: number
  size: Size
  about: string
  address: string
  city: string
  state: string
  adopted: boolean
  orgId: string
}

interface CreatePetResponse {
  pet: Pet
}

export class CreatePetService {
  constructor(
    private petRepository: PetsRepository,
    private orgRepository: OrgsRepository
  ) { }

  async execute({
    name,
    age,
    size,
    about,
    address,
    city,
    state,
    adopted,
    orgId
  }: CreatePetRequest): Promise<CreatePetResponse> {
    const org = this.orgRepository.findById(orgId)
    if (!org) {
      throw new ResourceNotFoundError()
    }
    const pet = await this.petRepository.create({
      name,
      age,
      size,
      about,
      address,
      city,
      state,
      adopted,
      org_id: orgId
    })
    return { pet }
  }
}