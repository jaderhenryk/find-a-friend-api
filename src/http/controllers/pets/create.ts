import { makeCreatePetService } from '@/services/factories/make-create-pet-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(req: FastifyRequest, res: FastifyReply) {
  const createPetSchema = z.object({
    name: z.string(),
    age: z.number().min(0),
    size: z.enum(['Small', 'Medium', 'Big']),
    about: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    adopted: z.boolean().default(false),
    orgId: z.string().uuid()
  })

  const {
    name,
    age,
    size,
    address,
    about,
    city,
    state,
    adopted,
    orgId
  } = createPetSchema.parse(req.body)

  const createPetService = makeCreatePetService()
  const { pet } = await createPetService.execute({
    name,
    age,
    size,
    address,
    about,
    city,
    state,
    adopted,
    orgId
  })
  return res.status(201).send({ pet })
}