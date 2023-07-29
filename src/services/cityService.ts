import { City } from '@prisma/client'
import database from '../database'

class CityService {
  static async storeCity(city: Omit<City, 'id'>) {
    return await database.city.create({
      data: {
        name: city.name,
        stateId: city.stateId,
      },
    })
  }

  static async deleteCity(cityId: string) {
    return await database.city.delete({
      where: { id: cityId },
    })
  }

  static async getAllCityAddresses(cityId: string) {
    return await database.address.findMany({
      where: {
        neighborhood: {
          cityId,
        },
      },
    })
  }

  static async getAllCityNeighborhoodsOnPreferences(cityId: string) {
    return await database.neighborhoodsOnPreferences.findMany({
      where: {
        neighborhood: {
          cityId,
        },
      },
    })
  }
}

export default CityService
