import { Address, City, Neighborhood, State } from '@prisma/client'
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

  static async storeState(state: Omit<State, 'id'>) {
    return await database.state.create({
      data: {
        name: state.name,
        uf: state.uf,
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

export default AddressServices
