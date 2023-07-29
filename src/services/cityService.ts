import { City } from '@prisma/client'
import database from '../database'

class CityService {
  static async store(city: Omit<City, 'id'>) {
    return await database.city.create({
      data: {
        name: city.name,
        stateId: city.stateId,
      },
    })
  }

  static async update(city: City) {
    return await database.city.update({
      where: {
        id: city.id,
      },
      data: city,
    })
  }

  static async delete(cityId: string) {
    return await database.city.delete({
      where: { id: cityId },
    })
  }
}

export default CityService
