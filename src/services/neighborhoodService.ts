import { Neighborhood } from '@prisma/client'
import database from '../database'

class NeighborhoodService {
  static async store(neighborhood: Omit<Neighborhood, 'id'>) {
    return await database.neighborhood.create({
      data: {
        name: neighborhood.name,
        cityId: neighborhood.cityId,
      },
    })
  }

  static async update(neighborhood: Neighborhood) {
    return await database.neighborhood.update({
      where: {
        id: neighborhood.id,
      },
      data: neighborhood,
    })
  }

  static async delete(neighborhoodId: string) {
    return await database.neighborhood.delete({
      where: { id: neighborhoodId },
    })
  }
}

export default NeighborhoodService
