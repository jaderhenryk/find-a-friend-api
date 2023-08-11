import { FastifyReply, FastifyRequest } from 'fastify'

export async function refreshToken(req: FastifyRequest, res: FastifyReply) {
  await req.jwtVerify({ onlyCookie: true })
  
  const token = await res.jwtSign({}, {
    sign: {
      sub: req.user.sub
    }
  })
  const refreshToken = await res.jwtSign({}, {
    sign: {
      sub: req.user.sub,
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
}