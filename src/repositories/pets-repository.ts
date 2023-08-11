import { SearchPetsRequest } from '@/@types/interfaces/search-pets-request'
import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
    create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
    search(data: SearchPetsRequest): Promise<Pet[]>
    findById(id: string): Promise<Pet | null>
}