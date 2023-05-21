import { NextFunction, Request, Response } from 'express'

import Controller from '../decorators/controllerDecorator'
import { AuthContext, Get } from '../decorators/handlerDecorator'
import HousesServices from '../services/housesService'

@Controller('/house')
class HouseController {
  @Get('/', AuthContext.NormalUser)
  public async getAllHousesFromUser(req: Request, res: Response, next: NextFunction) {
    try {
      const houses = await HousesServices.getAllHousesByuUserId(res.locals.userId)
      console.log(houses)
      res.send(houses)
    } catch (error) {
      next(error)
    }
  }
}

export default HouseController
