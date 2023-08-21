import { NextFunction, Request, Response } from 'express'

import Controller from '../decorators/controllerDecorator'
import { AuthContext, Delete, Get, Post, Put } from '../decorators/handlerDecorator'
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
      const newState = await StateService.store({ name, uf })
      res.send(newState)
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
