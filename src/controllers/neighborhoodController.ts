import { NextFunction, Request, Response } from 'express'

import Controller from '../decorators/controllerDecorator'
import { AuthContext, Delete, Post } from '../decorators/handlerDecorator'
import BadRequestException from '../exceptions/BadRequestException'
import NeighborhoodService from '../services/neighborhoodService'
import AddressService from '../services/adressService'
import NeighborhoodsOnPreferencesService from '../services/neighborhoodsOnPreferencesService'

@Controller('/neighborhoods')
class NeighborhoodController {
  @Post('/')
  public async addNewNeighborhood(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, cityId } = req.body
      const newNeighborhood = await NeighborhoodService.store({ name, cityId })
      res.send(newNeighborhood)
    } catch (error) {
      next(error)
    }
  }

  @Delete('/:neighborhoodId', AuthContext.Unprotected)
  public async deleteNeighborhood(req: Request, res: Response, next: NextFunction) {
    try {
      const { neighborhoodId } = req.params

      const [address, preference] = await Promise.all([
        AddressService.findFirstByNeighborhood(neighborhoodId),
        NeighborhoodsOnPreferencesService.findFirstByNeighborhood(neighborhoodId),
      ])

      if (address !== null || preference !== null)
        throw new BadRequestException(
          'Não é possível excluir este bairro, existem endereços e preferências atrelados a ele'
        )

      await NeighborhoodService.delete(neighborhoodId)
      res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }
}

export default NeighborhoodController
