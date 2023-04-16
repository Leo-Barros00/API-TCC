import { NextFunction, Request, Response } from 'express'

import Controller from '../decorators/controllerDecorator'
import { Get } from '../decorators/handlerDecorator'
import AddressServices from '../services/adressServices'

@Controller('/address')
class AddressControler {
  @Get('/cities')
  public async getAllCitiesWithNeighborhoods(_: Request, res: Response, next: NextFunction) {
    try {
      const cities = await AddressServices.getAllCitiesWithNeighborhoods()
      res.send(cities)
    } catch (error) {
      next(error)
    }
  }
}

export default AddressControler
