import { Contract } from '@prisma/client'
import database from '../database'

class ContractService {
  static async sendNewContract(contract: Omit<Contract, 'id'>) {
    return await database.contract.create({
      data: {
        value: contract.value,
        date: contract.date,
        description: contract.description,
        contractorId: contract.contractorId,
        houseId: contract.houseId,
        providerId: contract.providerId,
      },
    })
  }
}

export default ContractService
