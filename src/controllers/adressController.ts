import { NextFunction, Request, Response } from 'express'

import Controller from '../decorators/controllerDecorator'
import { AuthContext, Get } from '../decorators/handlerDecorator'
import AddressServices from '../services/adressServices'

@Controller('/address')
class AddressController {
  @Get('/states', AuthContext.Unprotected)
  public async getAllCitiesWithNeighborhoods(_: Request, res: Response, next: NextFunction) {
    try {
      const cities = await AddressServices.getAllStateInfo()
      res.send(cities)
    } catch (error) {
      next(error)
    }
  }
}

export default AddressController
