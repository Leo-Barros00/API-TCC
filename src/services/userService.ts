import { User } from '@prisma/client'
import database from '../database'

const baseAddressIncludeInfo = {
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
}

const baseUserIncludeInfo = {
  houses: {
    include: {
      address: baseAddressIncludeInfo,
    },
  },
  providerContract: {
    include: {
      provider: true,
    },
  },
  contractorContract: {
    include: {
      contractor: true,
    },
  },
  preference: {
    include: {
      neighborhoods: true,
    },
  },
  address: baseAddressIncludeInfo,
  rejectReasons: true,
}

interface UserQueryOptions {
  orderBy?: string
  order?: 'asc' | 'desc'
  page?: string
  perPage?: string
  email?: string
  name?: string
  surname?: string
  cpf?: string
  birthDate?: string
  gender?: string
  createdAt?: string
  approved?: string
}

class UserService {
  static async findAll({ order, orderBy, page, perPage, ...filters }: UserQueryOptions) {
    const whereClause = Object.entries(filters).reduce((acc, [key, value]) => {
      return [
        ...acc,
        {
          [key]: {
            contains: value,
            mode: 'insensitive',
          },
        },
      ]
    }, [] as any[])

    const [users, totalCount] = await Promise.all([
      database.user.findMany({
        where: {
          AND: whereClause,
        },
        include: {
          ...baseUserIncludeInfo,
        },
        ...{
          ...(orderBy && {
            orderBy: {
              [orderBy || 'createdAt']: order || 'asc',
            },
          }),
        },
        take: parseInt(perPage || '10'),
        skip: parseInt(page || '0'),
      }),
      database.user.count({}),
    ])

    return { users, totalCount }
  }

  static async findById(id: string) {
    return await database.user.findUnique({
      where: {
        id,
      },
      include: {
        ...baseUserIncludeInfo,
        rejectReasons: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
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

  static async storeUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'balance'>) {
    return await database.user.create({
      data: userData,
      include: {
        address: true,
      },
    })
  }

  static async changeStatus(userId: string, newStatus: string) {
    return await database.user.update({
      where: {
        id: userId,
      },
      data: {
        status: newStatus,
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
