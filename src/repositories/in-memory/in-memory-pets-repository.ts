import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'
import { SearchPetsRequest } from '@/@types/interfaces/search-pets-request'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []
  
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      age: data.age,
      about: data.about,
      address: data.address,
      city: data.city,
      state: data.state,
      size: data.size,
      org_id: data.org_id,
      adopted: data.adopted,
      created_at: new Date()
    }
    this.items.push(pet)
    return pet
  }

  async search(data: SearchPetsRequest) {
    const filteredPets = this.items.filter((pet) => {
      let nameEq = true
      let ageEq = true
      let cityEq = true
      let sizeEq = true
      let isAdopted = true
      if (data.name != null && data.name.trim().length > 0 && data.name !== pet.name) {
        nameEq = false
      }
      if (data.city != null && data.city.trim().length > 0 && data.city !== pet.city) {
        cityEq = false
      }
      if (data.age != null && data.age > 0 && data.age !== pet.age) {
        ageEq = false
      }
      if (data.size != null && data.size.trim().length > 0 && data.size !== pet.size) {
        sizeEq = false
      }
      if (data.adopted != null && data.adopted !== pet.adopted) {
        isAdopted = false
      }
      return nameEq && cityEq && ageEq && sizeEq && isAdopted
    })
    return filteredPets
  }

  async findById(id: string) {
    const pet = this.items.find((pet) => pet.id === id)
    if (!pet) {
      return null
    }
    return pet
  }
}