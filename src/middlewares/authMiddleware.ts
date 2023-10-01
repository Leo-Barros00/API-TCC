import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import UnauthorizedException from '../exceptions/UnauthorizedException'

class AuthMiddleware {
  static normalUserHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers

      if (!authorization) throw new UnauthorizedException('Token de autorização não encontrado.')

      const [prefix, token] = authorization?.split(' ')

      if (prefix !== 'Bearer' || !token)
        throw new UnauthorizedException('Token de autorização inválido.')

      jwt.verify(token, process.env.SECRET_KEY || '', function (err, decoded: any) {
        if (err !== null) throw new UnauthorizedException('Erro ao validar token enviado.')

        res.locals.userId = decoded?.userId

        next()
      })
    } catch (error) {
      next(error)
    }
  }

  static adminHandler(req: Request, _: Response, next: NextFunction) {
    const { authorization } = req.headers

    console.log({ admin: authorization })

    next()
  }
}

export default AuthMiddleware
