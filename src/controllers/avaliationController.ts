import { NextFunction, Request, Response } from 'express'
import Controller from '../decorators/Controller'
import { AuthContext, Get, Post } from '../decorators/handlerDecorator'
import AvaliationService from '../services/avaliationService'
import 'reflect-metadata'

@Controller('/avaliation')
class AvaliationController {
  @Post('/send')
  public async sendNewAvaliation(req: Request, res: Response, next: NextFunction) {
    try {
      const { value, description, userId } = req.body

      const avaliationModel = {
        userId,
        number: value,
        description,
      }

      await AvaliationService.sendNewAvaliation(avaliationModel)
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
        avaliations.reduce((acc, avaliation) => {
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
