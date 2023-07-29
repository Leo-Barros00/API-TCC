import { State } from '@prisma/client'
import database from '../database'

class StateService {
  static async getAllStateInfo() {
    return await database.state.findMany({
      include: {
        cities: {
          include: {
            neighborhoods: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    })
  }

  static async store(state: Omit<State, 'id'>) {
    return await database.state.create({
      data: {
        name: state.name,
        uf: state.uf,
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
