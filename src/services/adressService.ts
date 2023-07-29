import { Address } from '@prisma/client'
import database from '../database'

class AddressService {
  static async store(address: Omit<Address, 'id'>) {
    return await database.address.create({
      data: address,
    })
  }

  static async findByState(stateId: string) {
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

  static async findByCity(cityId: string) {
    return await database.address.findMany({
      where: {
        neighborhood: {
          cityId,
        },
      },
    })
  }

  static async findByNeighborhood(neighborhoodId: string) {
    return await database.address.findMany({
      where: {
        neighborhoodId,
      },
    })
  }
}

export default AddressService
