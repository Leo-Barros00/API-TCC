import { Address } from '@prisma/client'
import database from '../database'

class AddressService {
  static async store(address: Omit<Address, 'id'>) {
    return await database.address.create({
      data: address,
    })
  }

  static async findFirstByState(stateId: string) {
    return await database.address.findFirst({
      where: {
        neighborhood: {
          city: {
            stateId,
          },
        },
      },
    })
  }

  static async findFirstByCity(cityId: string) {
    return await database.address.findFirst({
      where: {
        neighborhood: {
          cityId,
        },
      },
    })
  }

  static async findFirstByNeighborhood(neighborhoodId: string) {
    return await database.address.findFirst({
      where: {
        neighborhoodId,
      },
    })
  }
}

export default AddressService
