import { Address } from '@prisma/client'
import database from '../database'

class AddressService {
  static async storeAddress(address: Omit<Address, 'id'>) {
    return await database.address.create({
      data: address,
    })
  }
}

export default AddressService
