import { Avaliation } from '@prisma/client'
import database from '../database'

class AvaliationService {
  static async sendNewAvaliation(avaliation: Omit<Avaliation, 'id'>) {
    return await database.avaliation.create({
      data: avaliation,
    })
  }

  static async getAvaliation(userId: string) {
    return await database.avaliation.findMany({
      where: {
        userId,
      },
    })
  }
}

export default AvaliationService
