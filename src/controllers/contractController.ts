import { NextFunction, Request, Response } from 'express'

import Controller from '../decorators/Controller'
import { Get, Post, Put } from '../decorators/handlerDecorator'
import ContractService from '../services/contractService'
import UserService from '../services/userService'
import { stat } from 'fs'

@Controller('/contracts')
class ContractController {
  @Post('/send')
  public async sendNewContract(req: Request, res: Response, next: NextFunction) {
    try {
      const { value, startDate, description, houseId, providerId, workHours } = req.body

      const contractModel = {
        avaliationId:'',
        value,
        startDate,
        description,
        contractorId: res.locals.userId,
        houseId,
        providerId,
        accepted: null,
        workHours,
        progressStatus: 'pending',
      }

      const response = await ContractService.sendNewContract(contractModel)
      
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

  @Put('/finish/:id')
  public async finishContract(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params

      // WIP contract status endpoint

      // const contract = await ContractService.finishContract(id)

      // UserService.addBalance(res.locals.userId, Number(contract.value))

      // res.status(200).send(contract)
    } catch (error) {
      next(error)
    }
  }

  @Get('/contractor')
  public async getAllContractsByContractor(_: Request, res: Response, next: NextFunction) {
    try {
      const contratos = await ContractService.getAllContractsByContractor(res.locals.userId)

      console.log(contratos);

      res.status(200).send(contratos)
    } catch (erro) {
      next(erro)
    }
  }
}

export default ContractController
