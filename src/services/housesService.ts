import database from '../database'

class HousesServices {
  static async getAllHousesByuUserId(ownerId: string) {
    return await database.house.findMany({
      where: {
        ownerId: ownerId,
      },
    })
  }

  //   static async storeHouse(address: Omit<House, 'id'>) {
  //     return await database.address.create({
  //       data: {
  //         neighborhoodId: address.neighborhoodId,
  //         description: address.description,
  //         number: address.number,
  //       },
  //     })
  //   }
}

export default HousesServices
