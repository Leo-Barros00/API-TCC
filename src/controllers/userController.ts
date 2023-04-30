import { NextFunction, Request, Response } from 'express'

import Controller from '../decorators/controllerDecorator'
import { Get, Post } from '../decorators/handlerDecorator'
import UserService from '../services/userServices'
import AddressServices from '../services/adressServices'
import ConflictDataException from '../exceptions/ConflictDataException'
import ResourceNotFoundException from '../exceptions/ResourceNotFoundException'

@Controller('/users')
class UserController {
  @Post('/')
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

      const newUser = await UserService.storeUser({
        name,
        surname,
        email,
        cpf,
        password,
        birthDate,
        gender: gender[0],
        addressId: userAddress.id,
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

  @Post('/signIn')
  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body

      const userCheckEmail = await UserService.findByEmail(email)
      console.log(email, password)
      console.log(userCheckEmail)
      if (userCheckEmail === null || userCheckEmail.password !== password)
        throw new ResourceNotFoundException('Não existe um usuário cadastrado com este e-mail ou senha.')

      res.status(201).send(true)
    } catch (error) {
      next(error)
    }
  }
}

export default UserController
