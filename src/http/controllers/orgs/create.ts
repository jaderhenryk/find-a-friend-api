import { makeCreateOrgservice } from '@/services/factories/make-create-org-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(req: FastifyRequest, res: FastifyReply) {
  const createOrgSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    city: z.string(),
    state: z.string(),
    address: z.string(),
    whatsapp: z.string()
  })

  const {
    name,
    email,
    password,
    state,
    address,
    city,
    whatsapp
  } = createOrgSchema.parse(req.body)

  const createOrgService = makeCreateOrgservice()
  const { org } = await createOrgService.execute({
    name,
    email,
    password,
    state,
    address,
    city,
    whatsapp
  })
  return res.status(201).send({
    org
  })
}