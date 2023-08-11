import { Size } from '@prisma/client'

export interface SearchPetsRequest {
  name?: string
  age?: number
  city: string
  size?: Size
  adopted?: boolean
}