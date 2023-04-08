import { Request, Response } from 'express'

import Controller from '../decorators/controllerDecorator'
import { Get } from '../decorators/handlerDecorator'

@Controller('/users')
class UserController {

  @Get('/signup')
  public async signUp(req: Request, res: Response) {
    res.send({ message: 'Hello World!' })
  }
}

export default UserController
