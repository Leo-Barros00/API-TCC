import { Address } from '@prisma/client'
import database from '../database'

class AddressService {
  static async storeAddress(address: Omit<Address, 'id'>) {
    return await database.address.create({
      data: address,
    })
  }

  static async getAddressByState(stateId: string) {
    return await database.address.findMany({
      where: {
        neighborhood: {
          city: {
            stateId,
          },
        },
      },
    })
  }

  static async getAddressByCity(cityId: string) {
    return await database.address.findMany({
      where: {
        neighborhood: {
          cityId,
        },
      },
    })
  }

  static async getAddressByNeighborhood(neighborhoodId: string) {
    return await database.address.findMany({
      where: {
        neighborhoodId,
      },
    })
  }
}

export default AddressService
