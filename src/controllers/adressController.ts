import { NextFunction, Request, Response } from 'express'

import Controller from '../decorators/controllerDecorator'
import { AuthContext, Get, Post } from '../decorators/handlerDecorator'
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

  @Post('/states')
  public async addNewState(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, uf } = req.body
      const newState = await AddressServices.storeState({ name, uf })
      res.send(newState)
    } catch (error) {
      next(error)
    }
  }

  @Post('/states/:stateId/cities')
  public async addNewCity(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body
      const { stateId } = req.params
      const newCity = await AddressServices.storeCity({ name, stateId })
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
      const newCity = await AddressServices.storeCity({ name, stateId })
      res.send(newCity)
    } catch (error) {
      next(error)
    }
  }
}

export default AddressController
