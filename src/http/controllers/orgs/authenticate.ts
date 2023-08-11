import { InvalidCredentialsError } from '@/errors/invalid-credentials'
import { makeAuthenticateOrgService } from '@/services/factories/make-authenticate-orgs-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const authenticateSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })
  const { email, password } = authenticateSchema.parse(req.body)
  try {
    const authenticateService = makeAuthenticateOrgService()
    const { org } = await authenticateService.execute({
      email, password
    })
    const token = await res.jwtSign({}, {
      sign: {
        sub: org.id
      }
    })
    const refreshToken = await res.jwtSign({}, {
      sign: {
        sub: org.id,
        expiresIn: '7d'
      }
    })
    return res
      .setCookie('refresh-token', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true
      })
      .status(200)
      .send({ token })
  } catch (err) {
    if (err instanceof InvalidCredentialsError)
      return res.status(403).send({ message: err.message })

    throw err
  }
}