import bcrypt from 'bcryptjs'
import { NextFunction, Request, Response } from 'express'

import database from '../database'
import Controller from '../decorators/Controller'
import { AuthContext, Delete, Get, Post, Put } from '../decorators/handlerDecorator'
import BadRequestException from '../exceptions/BadRequestException'
import ConflictDataException from '../exceptions/ConflictDataException'
import AddressService from '../services/adressService'
import HouseService from '../services/houseService'
import UserService from '../services/userService'
import { renameImage } from '../utils/images'
import RejectReasonService from '../services/rejectReasonService'

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

      const userAddress = await AddressService.store({
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
        status: 'pending',
      })

      const userWithoutPassword = {
        ...newUser,
        password: null,
      }

      if (req.files) {
        renameImage('documentImage', newUser.id, req.files)
        renameImage('personImage', newUser.id, req.files)
      }

      res.status(201).send({ userWithoutPassword })
    } catch (error) {
      next(error)
    }
  }

  @Get('/', AuthContext.Unprotected)
  public async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const queryOptions = req.query
      const queryData = await UserService.findAll(queryOptions)

      res.status(200).send(queryData)
    } catch (error) {
      next(error)
    }
  }

  @Put('/status/:userId', AuthContext.Unprotected)
  public async changeUserStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params
      const { status, reason } = req.body

      if (status === 'rejected') {
        await RejectReasonService.store(userId, reason)
      }

      const updatedUser = await UserService.changeStatus(userId, status)

      res.status(200).send(updatedUser)
    } catch (error) {
      next(error)
    }
  }

  @Delete('/:userId', AuthContext.Unprotected)
  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params

      await UserService.delete(userId)

      res.status(204).send()
    } catch (error) {
      next(error)
    }
  }

  @Put('/preferences')
  public async savePreferences(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = res.locals
      const {
        animals,
        neighborhoods,
        workFourHoursPerDay,
        workSixHoursPerDay,
        workEightHoursPerDay,
        priceFourHours,
        priceSixHours,
        priceEightHours,
      } = req.body

      const mappedNeighborhoods = neighborhoods.map((neighborhood: string) => ({
        neighborhoodId: neighborhood,
      }))

      const userUpdated = await database.user.update({
        where: {
          id: userId,
        },
        data: {
          preference: {
            create: {
              animals,
              workFourHoursPerDay: workFourHoursPerDay,
              workSixHoursPerDay: workSixHoursPerDay,
              workEightHoursPerDay: workEightHoursPerDay,
              priceFourHours: priceFourHours,
              priceSixHours: priceSixHours,
              priceEightHours: priceEightHours,
              neighborhoods: {
                createMany: {
                  data: mappedNeighborhoods,
                },
              },
            },
          },
        },
        include: {
          preference: {
            include: {
              neighborhoods: true,
            },
          },
        },
      })

      res.status(201).send(userUpdated.preference)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  @Get('/loggedUser')
  public async getUser(_: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = res.locals

      const user = await UserService.findById(userId)
      console.log(JSON.stringify(user))
      res.status(200).send(user)
    } catch (error) {
      next(error)
    }
  }

  @Get('/providers')
  public async getProviders(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = res.locals
      const { houseId, startDate, workHours } = req.query

      if (!houseId) throw new BadRequestException()

      const houseSelected = await HouseService.findById(<string>houseId)

      if (!houseSelected) throw new BadRequestException()

      const startDateParsed = new Date(startDate as string)
      const endDateParsed = addHours(startDateParsed, Number(workHours))

      const availableProviders = await database.user.findMany({
        where: {
          AND: [
            { id: { not: userId } },
            {
              preference: {
                neighborhoods: {
                  some: {
                    neighborhoodId: {
                      equals: houseSelected.address.neighborhoodId,
                    },
                  },
                },
                ...(houseSelected.animals && {
                  animals: {
                    equals: true,
                  },
                }),
              },
            },
            {
              providerContract: {
                none: {
                  OR: [
                    {
                      // 1. Termina durante
                      startDate: { lte: startDateParsed },
                      endDate: { gte: startDateParsed, lte: endDateParsed },
                    },
                    {
                      // 2. Começa durante
                      startDate: { gte: startDateParsed, lte: endDateParsed },
                      endDate: { gte: endDateParsed },
                    },
                    {
                      // 3. Abrange totalmente
                      startDate: { lte: startDateParsed },
                      endDate: { gte: endDateParsed },
                    },
                    {
                      // 4. Dentro
                      startDate: { gte: startDateParsed },
                      endDate: { lte: endDateParsed },
                    },
                  ],
                },
              },
            },
          ],
        },
        include: {
          preference: true,
        },
      })

      res.status(200).send({ providers: availableProviders })
    } catch (error) {
      next(error)
    }
  }

  @Get('/:userId', AuthContext.Unprotected)
  public async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params

      const user = await UserService.findById(userId)

      res.status(200).send(user)
    } catch (error) {
      next(error)
    }
  }
}

export default UserController
