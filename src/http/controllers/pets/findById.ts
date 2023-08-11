import { makeFindPetByIdService } from '@/services/factories/make-find-pet-by-id'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function findById(req: FastifyRequest, res: FastifyReply) {
  const findByIdPetSchema = z.object({
    id: z.string(),
  })
  
  const { id } = findByIdPetSchema.parse(req.params)
  const findPetByidService = await makeFindPetByIdService()
  const { pet } = await findPetByidService.execute(id)
  return res.status(200).send({ pet })
}