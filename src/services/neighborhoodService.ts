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

  static async updateNeighborhood(neighborhood: Neighborhood) {
    return await database.neighborhood.update({
      where: {
        id: neighborhood.id,
      },
      data: neighborhood,
    })
  }

  static async deleteNeighborhood(neighborhoodId: string) {
    return await database.neighborhood.delete({
      where: { id: neighborhoodId },
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
