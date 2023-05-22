import { Address } from '@prisma/client'
import database from '../database'

class AddressServices {
  static async getAllStateInfo() {
    return await database.state.findMany({
      include: {
        cities: {
          include: {
            neighborhoods: true,
          },
        },
      },
    })
  }

  static async storeAddress(address: Omit<Address, 'id'>) {
    return await database.address.create({
      data: {
        neighborhoodId: address.neighborhoodId,
        description: address.description,
        number: address.number,
      },
    })
  }
}

export default AddressServices
