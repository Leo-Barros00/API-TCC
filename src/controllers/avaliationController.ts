import { NextFunction, Request, Response } from 'express'

import Controller from '../decorators/Controller'
import { AuthContext, Get, Post } from '../decorators/handlerDecorator'
import AvaliationService from '../services/avaliationService'

@Controller('/avaliation')
class AvaliationController {
  @Post('/send', AuthContext.Unprotected)
  public async sendNewAvaliation(req: Request, res: Response, next: NextFunction) {
    try {
      const { value, description, userId } = req.body

      const avaliationModel = {
        userId,
        number: value,
        description: description,
      }
      await AvaliationService.sendNewAvaliation(avaliationModel)
      res.status(201).send()
    } catch (error) {
      next(error)
    }
  }

  @Get('/userAvaliation/:userId', AuthContext.Unprotected)
  public async getAvaliation(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params

      const avaliations = await AvaliationService.getAvaliation(userId)
      res.status(201).send(avaliations)
    } catch (error) {
      next(error)
    }
  }
}

export default AvaliationController
