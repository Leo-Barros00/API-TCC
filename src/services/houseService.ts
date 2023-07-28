import { House } from '@prisma/client'
import database from '../database'

class HouseService {
  static async getAllHousesByuUserId(ownerId: string) {
    return await database.house.findMany({
      where: {
        ownerId,
      },
    })
  }

  static async storeHouse(house: Omit<House, 'id'>) {
    return await database.house.create({
      data: {
        addressId: house.addressId,
        metersBuilt: house.metersBuilt,
        ownerId: house.ownerId,
        animals: house.animals,
      },
      include: {
        address: {
          include: {
            neighborhood: true,
          },
        },
      },
    })
  }

  static async getHouseById(houseId: string) {
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
