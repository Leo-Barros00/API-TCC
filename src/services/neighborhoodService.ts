import { Neighborhood } from '@prisma/client'
import database from '../database'

class NeighborhoodService {
  static async storeNeighborhood(neighborhood: Omit<Neighborhood, 'id'>) {
    return await database.neighborhood.create({
      data: {
        name: neighborhood.name,
        cityId: neighborhood.cityId,
      },
    })
  }

  static async deleteNeighborhood(neighborhoodId: string) {
    return await database.neighborhood.delete({
      where: { id: neighborhoodId },
    })
  }

  static async getAllNeighborhoodAddresses(neighborhoodId: string) {
    return await database.address.findMany({
      where: {
        neighborhoodId,
      },
    })
  }

  static async getAllNeighborhoodsOnPreferences(neighborhoodId: string) {
    return await database.neighborhoodsOnPreferences.findMany({
      where: {
        neighborhoodId,
      },
    })
  }
}

export default NeighborhoodService
