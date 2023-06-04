import { House } from '@prisma/client'
import database from '../database'

class HousesServices {
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
    })
  }
}

export default HousesServices
