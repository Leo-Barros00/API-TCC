import { State } from '@prisma/client'
import database from '../database'

class StateService {
  static async getAllStateInfo() {
    return await database.state.findMany({
      include: {
        cities: {
          include: {
            neighborhoods: {
              orderBy: {
                name: 'asc',
              },
            },
          },
          orderBy: {
            name: 'asc',
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    })
  }

  static async update(state: State) {
    return await database.state.update({
      where: {
        id: state.id,
      },
      data: state,
    })
  }

  static async delete(stateId: string) {
    return await database.state.delete({
      where: { id: stateId },
    })
  }
}

export default StateService
