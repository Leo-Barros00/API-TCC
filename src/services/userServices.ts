import { User } from '@prisma/client'
import database from '../database'

class UserService {
  static async findById(id: string) {
    return await database.user.findUnique({
      where: {
        id,
      },
      include: {
        houses: {
          include: {
            address: {
              include: {
                neighborhood: {
                  include: {
                    city: {
                      include: {
                        state: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        preference: {
          include: {
            neighborhoods: true,
          },
        },
        address: true,
      },
    })
  }

  static async findByEmail(email: string) {
    return await database.user.findFirst({
      where: {
        email,
      },
    })
  }

  static async findByCpf(cpf: string) {
    return await database.user.findFirst({
      where: {
        cpf,
      },
    })
  }

  static async storeUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
    return await database.user.create({
      data: userData,
      include: {
        address: true,
      },
    })
  }
}

export default UserService
