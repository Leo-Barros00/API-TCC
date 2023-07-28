import { State } from '@prisma/client'
import database from '../database'

class StateServices {
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

  static async storeState(state: Omit<State, 'id'>) {
    return await database.state.create({
      data: {
        name: state.name,
        uf: state.uf,
      },
    })
  }

  static async deleteState(stateId: string) {
    return await database.state.delete({
      where: { id: stateId },
    })
  }

  static async getAllStateAddresses(stateId: string) {
    return await database.address.findMany({
      where: {
        neighborhood: {
          city: {
            stateId,
          },
        },
      },
    })
  }

  static async getAllStateNeighborhoodsOnPreferences(stateId: string) {
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
}

export default StateServices
