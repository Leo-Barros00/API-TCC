import { NextFunction, Request, Response } from 'express'

import Controller from '../decorators/Controller'
import { AuthContext, Delete, Get, Put } from '../decorators/handlerDecorator'
import BadRequestException from '../exceptions/BadRequestException'
import AddressService from '../services/adressService'
import NeighborhoodsOnPreferencesService from '../services/neighborhoodsOnPreferencesService'
import StateService from '../services/stateService'

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

  @Put('/:stateId', AuthContext.Unprotected)
  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { stateId } = req.params
      const { name, uf } = req.body

      const newStateData = await StateService.update({ id: stateId, name, uf })
      res.status(200).send(newStateData)
    } catch (error) {
      next(error)
    }
  }

  @Delete('/:stateId', AuthContext.Unprotected)
  public async deleteState(req: Request, res: Response, next: NextFunction) {
    try {
      const { stateId } = req.params

      const [address, preference] = await Promise.all([
        AddressService.findFirstByState(stateId),
        NeighborhoodsOnPreferencesService.findFirstByState(stateId),
      ])

      if (address !== null || preference !== null)
        throw new BadRequestException(
          'Não é possível excluir este estado, existem endereços e preferências atrelados a ele'
        )

      await StateService.delete(stateId)
      res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }
}

export default StateController
