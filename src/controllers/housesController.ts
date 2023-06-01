import { NextFunction, Request, Response } from 'express'

import Controller from '../decorators/controllerDecorator'
import { AuthContext, Get, Post } from '../decorators/handlerDecorator'
import HousesServices from '../services/housesService'
import AddressServices from '../services/adressServices'

@Controller('/house')
class HouseController {
  @Get('/')
  public async getAllHousesFromUser(req: Request, res: Response, next: NextFunction) {
    try {
      const houses = await HousesServices.getAllHousesByuUserId(res.locals.userId)
      console.log(houses)
      res.send(houses)
    } catch (error) {
      next(error)
    }
  }

  @Post('/')
  public async saveHouseFromUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { neighborhoodId, addressDescription, addressNumber, metersBuilt } = req.body

      const newAddress = await AddressServices.storeAddress({
        description: addressDescription,
        neighborhoodId,
        number: addressNumber,
      })

      const userHouse = await HousesServices.storeHouse({
        addressId: newAddress.id,
        metersBuilt: metersBuilt,
        ownerId: res.locals.userId,
      })

      res.send({ status: 201, userHouse })
    } catch (error) {
      next(error)
    }
  }
}

export default HouseController
