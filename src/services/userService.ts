import { User } from '@prisma/client'
import database from '../database'

const baseUserIncludeInfo = {
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
}

class UserService {
  static async findAll() {
    return await database.user.findMany({
      include: baseUserIncludeInfo,
    })
  }

  static async findById(id: string) {
    return await database.user.findUnique({
      where: {
        id,
      },
      include: baseUserIncludeInfo,
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

  static async approve(userId: string) {
    return await database.user.update({
      where: {
        id: userId,
      },
      data: {
        approved: true,
      },
      include: baseUserIncludeInfo,
    })
  }

  static async delete(userId: string) {
    return await database.user.delete({
      where: {
        id: userId,
      },
    })
  }
}

export default UserService
