import { NextFunction, Request, Response } from 'express'

import Controller from '../decorators/controllerDecorator'
import { AuthContext, Delete, Get, Post } from '../decorators/handlerDecorator'
import AddressService from '../services/adressService'
import BadRequestException from '../exceptions/BadRequestException'

@Controller('/address')
class AddressController {
  @Post('/states/:stateId/cities')
  public async addNewCity(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body
      const { stateId } = req.params
      const newCity = await AddressService.storeCity({ name, stateId })
      res.send(newCity)
    } catch (error) {
      next(error)
    }
  }

  @Post('/states/:stateId/cities')
  public async addNewNeighborhood(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body
      const { stateId } = req.params
      const newCity = await AddressService.storeCity({ name, stateId })
      res.send(newCity)
    } catch (error) {
      next(error)
    }
  }
}

export default AddressController
