import { Neighborhood } from '@prisma/client'
import database from '../database'

class NeighborhoodsOnPreferencesService {
  static async findByState(stateId: string) {
    return await database.neighborhoodsOnPreferences.findMany({
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
    return await database.neighborhoodsOnPreferences.findMany({
      where: {
        neighborhood: {
          cityId,
        },
      },
    })
  }

  static async findByNeighborhood(neighborhoodId: string) {
    return await database.neighborhoodsOnPreferences.findMany({
      where: {
        neighborhoodId,
      },
    })
  }
}

export default NeighborhoodsOnPreferencesService
