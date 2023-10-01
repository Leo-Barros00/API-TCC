import { House } from '@prisma/client'
import database from '../database'

class HouseService {
  static async findAllByUserId(ownerId: string) {
    return await database.house.findMany({
      where: {
        ownerId,
      },
    })
  }

  static async store(house: Omit<House, 'id'>) {
    return await database.house.create({
      data: house,
      include: {
        address: {
          include: {
            neighborhood: true,
          },
        },
      },
    })
  }

  static async findById(houseId: string) {
    return await database.house.findUnique({
      where: {
        id: houseId,
      },
      include: {
        address: true,
      },
    })
  }
}

export default HouseService
