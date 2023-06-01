import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcryptjs'

import Controller from '../decorators/controllerDecorator'
import { AuthContext, Get, Post, Put } from '../decorators/handlerDecorator'
import UserService from '../services/userServices'
import AddressServices from '../services/adressServices'
import ConflictDataException from '../exceptions/ConflictDataException'
import database from '../database'

@Controller('/users')
class UserController {
  @Post('/', AuthContext.Unprotected)
  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, cpf } = req.body

      const userCheckEmail = await UserService.findByEmail(email)
      if (userCheckEmail !== null)
        throw new ConflictDataException('Já existe um usuário cadastrado com este e-mail.')

      const userCheckCpf = await UserService.findByCpf(cpf)
      if (userCheckCpf !== null)
        throw new ConflictDataException('Já existe um usuário cadastrado com este CPF.')

      const { neighborhoodId, addressDescription, addressNumber } = req.body

      const userAddress = await AddressServices.storeAddress({
        description: addressDescription,
        neighborhoodId,
        number: addressNumber,
      })

      const { name, surname, password, birthDate, gender } = req.body

      const salt = bcrypt.genSaltSync(12)
      const hashPassword = bcrypt.hashSync(password, salt)

      const newUser = await UserService.storeUser({
        name,
        surname,
        email,
        cpf,
        password: hashPassword,
        birthDate,
        gender: gender[0],
        addressId: userAddress.id,
        preferenceId: null,
      })

      const userWithoutPassword = {
        ...newUser,
        password: null,
      }

      res.status(201).send({ userWithoutPassword })
    } catch (error) {
      next(error)
    }
  }

  @Put('/preferences')
  public async savePreferences(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = res.locals
      const { animals, maximumMetersBuilt, neighborhoods } = req.body

      const mappedNeighborhoods = neighborhoods.map((neighborhood: string) => ({
        neighborhoodId: neighborhood,
      }))

      await database.user.update({
        where: {
          id: userId,
        },
        data: {
          preference: {
            create: {
              animals,
              maximumMetersBuilt,
              neighborhoods: {
                createMany: {
                  data: mappedNeighborhoods,
                },
              },
            },
          },
        },
      })

      res.status(201).send({})
    } catch (error) {
      next(error)
    }
  }

  @Get('/providers')
  public async getAllProviders(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = res.locals

      const providers = await database.user.findMany({
        where: {
          AND: [{ id: { not: userId } }, { preferenceId: { not: null } }],
        },
      })

      res.status(200).send(providers)
    } catch (error) {
      next(error)
    }
  }

  @Get('/')
  public async getUser(_: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = res.locals

      const user = await database.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          houses: true,
        },
      })

      res.status(200).send(user)
    } catch (error) {
      next(error)
    }
  }
}

export default UserController
