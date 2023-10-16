import { NextFunction, Request, Response } from 'express'

import Controller from '../decorators/Controller'
import { Get, Post } from '../decorators/handlerDecorator'
import AddressService from '../services/adressService'
import HouseService from '../services/houseService'

@Controller('/houses')
class HouseController {
  @Get('/')
  public async getAllHousesFromUser(req: Request, res: Response, next: NextFunction) {
    try {
      const houses = await HouseService.findAllByUserId(res.locals.userId)
      res.send(houses)
    } catch (error) {
      next(error)
    }
  }

  @Post('/')
  public async saveHouseFromUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { neighborhoodId, addressDescription, addressNumber, animals } = req.body

      const newAddress = await AddressService.store({
        description: addressDescription,
        neighborhoodId,
        number: addressNumber,
      })

      const userHouse = await HouseService.store({
        addressId: newAddress.id,
        ownerId: res.locals.userId,
        animals: animals,
      })

      res.send({ status: 201, userHouse })
    } catch (error) {
      next(error)
    }
  }
}

export default HouseController
