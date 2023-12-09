import { NextFunction, Request, Response } from 'express'

import Controller from '../decorators/Controller'
import { Get, Post, Put } from '../decorators/handlerDecorator'
import ContractService from '../services/contractService'
import UserService from '../services/userService'

@Controller('/contracts')
class ContractController {
  @Post('/send')
  public async sendNewContract(req: Request, res: Response, next: NextFunction) {
    try {
      const { value, startDate, description, houseId, providerId, workHours } = req.body

      const contractModel = {
        avaliationId: null,
        value,
        startDate,
        description,
        contractorId: res.locals.userId,
        houseId,
        providerId,
        accepted: null,
        workHours,
      }

      await ContractService.sendNewContract(contractModel)

      res.status(201).send()
    } catch (error) {
      next(error)
    }
  }

  @Get('/')
  public async getAllContractsByUser(_: Request, res: Response, next: NextFunction) {
    try {
      const contracts = await ContractService.getContractsByUser(res.locals.userId)
      res.send(contracts)
    } catch (error) {
      next(error)
    }
  }

  @Put('/finish/:id')
  public async finishService(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params

      const contract = await ContractService.changeProgressStatus(id, 'completed')

      UserService.addBalance(res.locals.userId, Number(contract.value) * 0.7)

      res.status(200).send()
    } catch (error) {
      next(error)
    }
  }

  @Put('/progress/:id')
  public async changeProgressStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const { progressStatus } = req.body

      await ContractService.changeProgressStatus(id, progressStatus)

      res.status(200).send()
    } catch (error) {
      next(error)
    }
  }

  @Put('/:id/:status')
  public async updateContractStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, status } = req.params

      const contracts = await ContractService.updateContractStatus(id, status === `true`)

      res.status(200).send(contracts)
    } catch (error) {
      next(error)
    }
  }

  @Get('/contractor')
  public async getAllContractsByContractor(_: Request, res: Response, next: NextFunction) {
    try {
      const contratos = await ContractService.getAllContractsByContractor(res.locals.userId)

      res.status(200).send(contratos)
    } catch (erro) {
      next(erro)
    }
  }
}

export default ContractController
