import { NextFunction, Request, Response } from 'express'

import Controller from '../decorators/controllerDecorator'
import { AuthContext, Get, Post } from '../decorators/handlerDecorator'
import HousesServices from '../services/housesService'
import AddressServices from '../services/adressServices'

@Controller('/house')
class HouseController {
  @Get('/', AuthContext.Unprotected)
  public async getAllHousesFromUser(req: Request, res: Response, next: NextFunction) {
    try {
      const houses = await HousesServices.getAllHousesByuUserId(res.locals.userId)
      console.log(houses)
      res.send(houses)
    } catch (error) {
      next(error)
    }
  }

  @Post('/', AuthContext.Unprotected)
  public async saveHouseFromUser(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body)
      const { neighborhoodId, addressDescription, addressNumber, ownerId } = req.body

      const newAddress = await AddressServices.storeAddress({
        description: addressDescription,
        neighborhoodId,
        number: addressNumber,
      })

      const userHouse = await HousesServices.storeHouse({
        addressId: newAddress.id,
        metersBuilt: 23,
        ownerId: ownerId,
      })

      res.send({ status: 204, userHouse })
    } catch (error) {
      next(error)
    }
  }
}

export default HouseController
