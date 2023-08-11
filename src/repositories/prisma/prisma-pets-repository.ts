import { Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'
import { SearchPetsRequest } from '@/@types/interfaces/search-pets-request'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data
    })
    return pet
  }

  async search(data: SearchPetsRequest) {
    const {name, city, age, size, adopted} = data
    const pets = await prisma.pet.findMany({
      where: {
        name,
        age,
        city,
        size,
        adopted
      }
    })
    return pets
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id
      }
    })
    return pet
  }
}