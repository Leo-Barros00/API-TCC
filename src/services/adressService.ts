import { Address, City, Neighborhood, State } from '@prisma/client'
import database from '../database'

class AddressService {
  static async storeAddress(address: Omit<Address, 'id'>) {
    return await database.address.create({
      data: {
        neighborhoodId: address.neighborhoodId,
        description: address.description,
        number: address.number,
      },
    })
  }

  static async storeCity(city: Omit<City, 'id'>) {
    return await database.city.create({
      data: {
        name: city.name,
        stateId: city.stateId,
      },
    })
  }

  static async storeNeighborhood(neighborhood: Omit<Neighborhood, 'id'>) {
    return await database.neighborhood.create({
      data: {
        name: neighborhood.name,
        cityId: neighborhood.cityId,
      },
    })
  }
}

export default AddressService
