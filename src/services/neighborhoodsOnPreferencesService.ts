import { Neighborhood } from '@prisma/client'
import database from '../database'

class NeighborhoodsOnPreferencesService {
  static async getNeighborhoodsOnPreferencesByState(stateId: string) {
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

  static async getNeighborhoodsOnPreferencesByCity(cityId: string) {
    return await database.neighborhoodsOnPreferences.findMany({
      where: {
        neighborhood: {
          cityId,
        },
      },
    })
  }

  static async getNeighborhoodsOnPreferencesByNeighborhood(neighborhoodId: string) {
    return await database.neighborhoodsOnPreferences.findMany({
      where: {
        neighborhoodId,
      },
    })
  }
}

export default NeighborhoodsOnPreferencesService
