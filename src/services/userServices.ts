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

  static async approveUser(userId: string) {
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
}

export default UserService
