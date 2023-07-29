import { NextFunction, Request, Response } from 'express'

import Controller from '../decorators/controllerDecorator'
import { AuthContext, Delete, Get, Post } from '../decorators/handlerDecorator'
import StateService from '../services/stateService'
import AddressService from '../services/adressService'
import BadRequestException from '../exceptions/BadRequestException'
import NeighborhoodsOnPreferencesService from '../services/neighborhoodsOnPreferencesService'

@Controller('/states')
class StateController {
  @Get('/', AuthContext.Unprotected)
  public async getAllStatesData(_: Request, res: Response, next: NextFunction) {
    try {
      const cities = await StateService.getAllStateInfo()
      res.send(cities)
    } catch (error) {
      next(error)
    }
  }

  @Post('/', AuthContext.Unprotected)
  public async addNewState(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, uf } = req.body
      const newState = await StateService.storeState({ name, uf })
      res.send(newState)
    } catch (error) {
      next(error)
    }
  }

  @Delete('/:stateId', AuthContext.Unprotected)
  public async deleteState(req: Request, res: Response, next: NextFunction) {
    try {
      const { stateId } = req.params

      const [addresses, preferences] = await Promise.all([
        AddressService.getAddressByState(stateId),
        NeighborhoodsOnPreferencesService.getNeighborhoodsOnPreferencesByState(stateId),
      ])

      if (addresses.length > 0 || preferences.length > 0)
        throw new BadRequestException(
          'Não é possível excluir este estado, existem endereços e preferências atrelados a ele'
        )

      await StateService.deleteState(stateId)
      res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }
}

export default StateController
