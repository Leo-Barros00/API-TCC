import { NextFunction, Request, Response } from 'express'
import Controller from '../decorators/Controller'
import { AuthContext, Get, Post } from '../decorators/handlerDecorator'
import AvaliationService from '../services/avaliationService'
import 'reflect-metadata'
import ContractService from '../services/contractService'

@Controller('/avaliation')
class AvaliationController {
  @Post('/send/:id')
  public async sendNewAvaliation(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: contractId } = req.params
      const { value, description, userId } = req.body

      const avaliationModel = {
        userId,
        number: value,
        description,
      }
      
      const avaliation = await AvaliationService.sendNewAvaliation(avaliationModel)

      const contract = await ContractService.updateAvaliation(contractId, avaliation.id)
      
      res.status(201).send()
    } catch (error) {
      next(error)
    }
  }

  @Get('/:userId')
  public async getAvaliation(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params

      const avaliations = await AvaliationService.getAvaliation(userId)

      const media =
        avaliations.reduce((acc: any, avaliation: any) => {
          return acc + Number(avaliation.number)
        }, 0) / avaliations.length

      res.status(200).send({ media })
    } catch (error) {
      next(error)
    }
  }

  @Get('/')
  public async getAllAvaliation(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params

      const avaliations = await AvaliationService.getAllAvaliation()
      res.status(200).send({ avaliations })
    } catch (error) {
      next(error)
    }
  }
}

export default AvaliationController
