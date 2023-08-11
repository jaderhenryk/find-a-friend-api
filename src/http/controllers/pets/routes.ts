import { FastifyInstance } from 'fastify'
import { create } from './create'
import { search } from './search'
import { findById } from './findById'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function petRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJWT] }, create)
  app.get('/pets', search)
  app.get('/pets/:id', findById)
}