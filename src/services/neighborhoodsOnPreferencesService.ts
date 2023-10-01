import { Neighborhood } from '@prisma/client'
import database from '../database'

class NeighborhoodsOnPreferencesService {
  static async findFirstByState(stateId: string) {
    return await database.neighborhoodsOnPreferences.findFirst({
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
    return await database.neighborhoodsOnPreferences.findFirst({
      where: {
        neighborhood: {
          cityId,
        },
      },
    })
  }

  static async findFirstByNeighborhood(neighborhoodId: string) {
    return await database.neighborhoodsOnPreferences.findFirst({
      where: {
        neighborhoodId,
      },
    })
  }
}

export default NeighborhoodsOnPreferencesService
