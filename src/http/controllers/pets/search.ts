import { makeSearchPetsService } from '@/services/factories/make-search-pets-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(req: FastifyRequest, res: FastifyReply) {
  const searchPetSchema = z.object({
    name: z.string().optional(),
    age: z.coerce.number().optional(),
    size: z.enum(['Small', 'Medium', 'Big']).optional(),
    city: z.string(),
    adopted: z.boolean().default(false).optional(),
  })
  
  const {
    name,
    age,
    size,
    city,
    adopted
  } = searchPetSchema.parse(req.query)
  const searchPetsService = await makeSearchPetsService()
  const { pets } = await searchPetsService.execute({
    name,
    age,
    size,
    city,
    adopted
  })
  return res.status(200).send({ pets })
}