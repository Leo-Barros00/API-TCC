import { Contract } from '@prisma/client'
import { addHours } from 'date-fns'

import database from '../database'

class ContractService {
  static async sendNewContract(contract: Omit<Contract, 'id' | 'endDate' | 'progressStatus'>) {
    const endDate = addHours(new Date(contract.startDate), contract.workHours)

    return await database.contract.create({
      data: {
        ...contract,
        endDate,
      },
    })
  }

  static async getContractsByUser(ownerId: string) {
    return await database.contract.findMany({
      where: {
        provider: {
          id: ownerId,
        },
      },
      include: {
        contractor: true,
        provider: true,
        house: {
          include: {
            address: {
              include: {
                neighborhood: {
                  include: {
                    city: {
                      include: {
                        state: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    })
  }

  static async getAllContractsByContractor(ownerId: string) {
    return await database.contract.findMany({
      where: {
        contractor: {
          id: ownerId,
        },
      },
      include: {
        contractor: true,
        provider: true,
        house: {
          include: {
            address: {
              include: {
                neighborhood: {
                  include: {
                    city: {
                      include: {
                        state: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    })
  }

  static async updateContractStatus(id: string, status: boolean) {
    return await database.contract.update({
      where: {
        id,
      },
      data: {
        accepted: status,
      },
    })
  }

  static async changeProgressStatus(id: string, newProgressStatus: string) {
    return await database.contract.update({
      where: {
        id,
      },
      data: {
        progressStatus: newProgressStatus,
      },
    })
  }
}

export default ContractService
