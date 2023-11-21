import { NextFunction, Request, Response } from 'express'

import Controller from '../decorators/Controller'
import { Post } from '../decorators/handlerDecorator'
import WithdrawService from '../services/withdrawService'
import UserService from '../services/userService'

@Controller('/withdraw')
class WithdrawController {
  @Post('/')
  public async withdrawUserBalance(req: Request, res: Response, next: NextFunction) {
    try {
      const { withdrawValue } = req.body
      const { userId } = res.locals

      console.log({ withdrawValue, userId })

      await WithdrawService.store(withdrawValue, userId)
      const user = await UserService.withdrawBalance(userId, withdrawValue)

      res.send(user)
    } catch (error) {
      next(error)
    }
  }
}

export default WithdrawController
