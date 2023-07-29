import { NextFunction, Request, Response } from 'express'

import Controller from '../decorators/controllerDecorator'
import { AuthContext, Delete, Post } from '../decorators/handlerDecorator'
import BadRequestException from '../exceptions/BadRequestException'
import CityService from '../services/cityService'

@Controller('/cities')
class CityController {
  @Post('/')
  public async addNewCity(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, stateId } = req.body
      const newCity = await CityService.storeCity({ name, stateId })
      res.send(newCity)
    } catch (error) {
      next(error)
    }
  }

  @Delete('/:cityId', AuthContext.Unprotected)
  public async deleteCity(req: Request, res: Response, next: NextFunction) {
    try {
      const { cityId } = req.params

      const [addresses, preferences] = await Promise.all([
        CityService.getAllCityAddresses(cityId),
        CityService.getAllCityNeighborhoodsOnPreferences(cityId),
      ])

      if (addresses.length > 0 || preferences.length > 0)
        throw new BadRequestException(
          'Não é possível excluir este estado, existem endereços e preferências atrelados a ele'
        )

      await CityService.deleteCity(cityId)
      res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }
}

export default CityController
